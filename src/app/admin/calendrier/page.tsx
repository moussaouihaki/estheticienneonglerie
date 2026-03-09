"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, X, BanIcon, Sparkles,
    Clock, Phone, Mail, CalendarDays,
    CheckCircle2, XCircle, RefreshCw, Smartphone
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useServices } from "@/lib/servicesStore";
import { useBusinessHours, BusinessDay } from "@/lib/businessHoursStore";
import { useBlockedPeriods, BlockedPeriod } from "@/lib/blockedPeriodsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── Config ───────────────────────────────────────────────────────────────────
const SERVICE_CONFIG: Record<string, { label: string; duration: number; dot: string; hex: string; icon: string }> = {
    signature: { label: "Signature", duration: 60, dot: "bg-amber-400", hex: "#F59E0B", icon: "✨" },
    gelx: { label: "Gel-X", duration: 120, dot: "bg-violet-500", hex: "#8B5CF6", icon: "💎" },
    spa: { label: "Spa", duration: 75, dot: "bg-emerald-500", hex: "#10B981", icon: "🌿" },
};

type Appointment = {
    id: string; client: string; phone: string; email: string;
    service: keyof typeof SERVICE_CONFIG;
    date: string;  // ISO "YYYY-MM-DD"
    startHour: number; startMin: number;
    status: "confirmed" | "pending" | "cancelled"; notes?: string;
};

// ─── Mock data ─────────────────────────────────────────────────────────────────
const INIT_APPTS: Appointment[] = [
    { id: "A1", client: "Marie Laurent", phone: "+41 79 123 45 67", email: "marie@email.com", service: "signature", date: "2026-03-10", startHour: 10, startMin: 0, status: "confirmed" },
    { id: "A2", client: "Sophie Martin", phone: "+41 78 987 65 43", email: "sophie@email.com", service: "gelx", date: "2026-03-10", startHour: 13, startMin: 30, status: "pending", notes: "Forme amande" },
    { id: "A3", client: "Emma Dubois", phone: "+41 76 543 21 09", email: "emma@email.com", service: "spa", date: "2026-03-11", startHour: 11, startMin: 0, status: "confirmed" },
    { id: "A4", client: "Alice Girard", phone: "+41 79 888 77 66", email: "alice@email.com", service: "gelx", date: "2026-03-11", startHour: 16, startMin: 0, status: "cancelled" },
    { id: "A5", client: "Clara Fontaine", phone: "+41 77 234 56 78", email: "clara@email.com", service: "signature", date: "2026-03-12", startHour: 9, startMin: 30, status: "confirmed" },
    { id: "A6", client: "Léa Bernard", phone: "+41 79 345 67 89", email: "lea@email.com", service: "spa", date: "2026-03-12", startHour: 14, startMin: 0, status: "confirmed" },
    { id: "A7", client: "Jade Moreau", phone: "+41 78 456 78 90", email: "jade@email.com", service: "gelx", date: "2026-03-13", startHour: 10, startMin: 30, status: "confirmed", notes: "French milky" },
    { id: "A8", client: "Camille Petit", phone: "+41 76 567 89 01", email: "camille@email.com", service: "signature", date: "2026-03-13", startHour: 15, startMin: 0, status: "pending" },
    { id: "A9", client: "Inès Dupont", phone: "+41 77 678 90 12", email: "ines@email.com", service: "spa", date: "2026-03-14", startHour: 11, startMin: 30, status: "confirmed" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8);
const HOUR_H = 72;
const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_NAMES = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

function toISODate(d: Date) {
    return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
}

function isDateInRange(date: string, start: string, end: string) {
    return date >= start && date <= end;
}

function toTop(h: number, m: number) { return (h - 8) * HOUR_H + (m / 60) * HOUR_H; }
function toHeight(min: number) { return (min / 60) * HOUR_H; }

function formatDateFR(iso: string) {
    const [y, m, d] = iso.split("-");
    return `${parseInt(d)} ${MONTH_NAMES[parseInt(m) - 1]} ${y}`;
}

// ─── Block Dialog ──────────────────────────────────────────────────────────────
function BlockDialog({ onClose, onSave }: {
    onClose: () => void;
    onSave: (b: Omit<BlockedPeriod, "id">) => void;
}) {
    const today = toISODate(new Date());
    const [label, setLabel] = useState("");
    const [startDate, setStart] = useState(today);
    const [endDate, setEnd] = useState(today);
    const [type, setType] = useState<"vacation" | "holiday" | "other">("vacation");

    const valid = label.trim().length > 0 && endDate >= startDate;
    const nbDays = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            >
                <div className="p-8 space-y-7">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-serif text-stone-900">Bloquer une période</h3>
                            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">Les clientes ne pourront pas réserver</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100"><X size={16} /></button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Motif</label>
                        <input
                            value={label}
                            onChange={e => setLabel(e.target.value)}
                            placeholder="ex: Vacances d'été, Jour férié, Fermeture…"
                            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57] transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Date de début</label>
                            <input
                                type="date"
                                value={startDate}
                                min={today}
                                onChange={e => { setStart(e.target.value); if (e.target.value > endDate) setEnd(e.target.value); }}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57] cursor-pointer"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Date de fin</label>
                            <input
                                type="date"
                                value={endDate}
                                min={startDate}
                                onChange={e => setEnd(e.target.value)}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57] cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    {valid && (
                        <div className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border text-sm font-medium",
                            type === "holiday" ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-red-50 border-red-200 text-red-700"
                        )}>
                            <BanIcon size={16} />
                            <div>
                                <p className="font-bold">{label || "Période bloquée"}</p>
                                <p className="text-[11px] opacity-70">
                                    {formatDateFR(startDate)} → {formatDateFR(endDate)}
                                    {nbDays > 1 ? ` (${nbDays} jours)` : " (1 jour)"}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Type</label>
                        <div className="flex gap-2">
                            {(["vacation", "holiday", "other"] as const).map(t => (
                                <button key={t} onClick={() => setType(t)}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl border-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                                        type === t ? "border-[#B08D57] bg-[#B08D57]/10 text-[#B08D57]" : "border-stone-100 text-stone-400 hover:border-stone-300"
                                    )}>
                                    {t === "vacation" ? "🏝️ Congés" : t === "holiday" ? "🔔 Férié" : "📍 Autre"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={onClose}
                            className="flex-1 py-3 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-50 transition-all">
                            Annuler
                        </button>
                        <button
                            disabled={!valid}
                            onClick={() => { onSave({ label: label.trim(), startDate, endDate, type }); onClose(); }}
                            className={cn(
                                "flex-1 py-3 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                valid ? "bg-stone-950 hover:bg-[#B08D57]" : "bg-stone-200 cursor-not-allowed"
                            )}
                        >
                            <BanIcon size={12} /> Bloquer
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Sync Dialog ───────────────────────────────────────────────────────────────
function ICalDialog({ onClose }: { onClose: () => void }) {
    const [copiedW, setCopiedW] = useState(false);
    const [copiedG, setCopiedG] = useState(false);
    const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";
    const origin = typeof window !== "undefined" ? window.location.origin : "https://aurelianails.ch";
    const webcalUrl = `webcal://${isDev ? "localhost:3000" : "aurelianails.ch"}/api/calendar`;
    const httpUrl = `${origin}/api/calendar`;
    const googleUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(httpUrl)}`;
    const copy = (text: string, w: "w" | "g") => {
        navigator.clipboard.writeText(text);
        if (w === "w") { setCopiedW(true); setTimeout(() => setCopiedW(false), 2500); }
        else { setCopiedG(true); setTimeout(() => setCopiedG(false), 2500); }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="px-8 pt-8 pb-5 border-b border-stone-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-serif text-stone-900">Sync automatique</h3>
                            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">Vos RDV sur votre téléphone — en temps réel</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100"><X size={16} /></button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl">
                        <RefreshCw size={12} className="text-green-600 flex-shrink-0" />
                        <p className="text-xs text-green-700 font-medium">Abonnez-vous une seule fois — tout se met à jour automatiquement</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {/* Apple */}
                    <div className="bg-[#F5F5F7] rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🍎</span>
                                <div>
                                    <p className="font-bold text-sm text-stone-900">iPhone · iPad · Mac</p>
                                    <p className="text-[10px] text-stone-500">Calendrier Apple — sync automatique toutes les heures</p>
                                </div>
                            </div>
                            <span className="text-[9px] px-2 py-1 rounded-full font-black uppercase bg-green-100 text-green-700">1 clic</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-white/80 rounded-xl px-3 py-2 text-[9px] font-mono text-stone-400 overflow-hidden text-ellipsis whitespace-nowrap">{webcalUrl}</div>
                            <button onClick={() => copy(webcalUrl, "w")} className={cn("px-3 rounded-xl text-[9px] font-black uppercase transition-all", copiedW ? "bg-green-500 text-white" : "bg-white text-stone-600 hover:bg-stone-100")}>{copiedW ? "✓" : "Copier"}</button>
                        </div>
                        <button onClick={() => window.open(webcalUrl, "_blank")} className="w-full py-3 bg-stone-950 hover:bg-[#B08D57] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                            Ouvrir dans Calendrier Apple →
                        </button>
                    </div>
                    {/* Google */}
                    <div className="bg-blue-50 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📅</span>
                                <div>
                                    <p className="font-bold text-sm text-stone-900">Google Agenda</p>
                                    <p className="text-[10px] text-stone-500">Ajouter via URL — synchronisation automatique</p>
                                </div>
                            </div>
                            <span className="text-[9px] px-2 py-1 rounded-full font-black uppercase bg-blue-100 text-blue-700">2 clics</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-white/80 rounded-xl px-3 py-2 text-[9px] font-mono text-stone-400 overflow-hidden text-ellipsis whitespace-nowrap">{httpUrl}</div>
                            <button onClick={() => copy(httpUrl, "g")} className={cn("px-3 rounded-xl text-[9px] font-black uppercase transition-all", copiedG ? "bg-green-500 text-white" : "bg-white text-stone-600 hover:bg-stone-100")}>{copiedG ? "✓" : "Copier"}</button>
                        </div>
                        <button onClick={() => window.open(googleUrl, "_blank")} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                            Ouvrir Google Agenda →
                        </button>
                    </div>
                </div>
                <div className="px-6 pb-6">
                    <button onClick={onClose} className="w-full py-3 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest text-stone-400 hover:bg-stone-50">Fermer</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function CalendrierPage() {
    const [appts] = useState<Appointment[]>(INIT_APPTS);
    const { hours } = useBusinessHours();
    const { blocked, addBlock, removeBlock, isDateBlocked } = useBlockedPeriods();
    const [selected, setSelected] = useState<Appointment | null>(null);
    const [showBlock, setShowBlock] = useState(false);
    const [showIcal, setShowIcal] = useState(false);
    const [weekOffset, setWeekOffset] = useState(0);

    // Compute week start (Monday)
    const weekStart = useMemo(() => {
        const base = new Date(2026, 2, 9); // Mon March 9
        return addDays(base, weekOffset * 7);
    }, [weekOffset]);

    const dayDates = useMemo(() =>
        Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
        [weekStart]
    );

    const weekRange = `${dayDates[0].getDate()} ${MONTH_NAMES[dayDates[0].getMonth()]} — ${dayDates[6].getDate()} ${MONTH_NAMES[dayDates[6].getMonth()]} ${dayDates[6].getFullYear()}`;

    return (
        <div className="h-full flex flex-col gap-4">

            {/* ─── Header ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 border border-stone-200 rounded-full hover:bg-white shadow-sm transition-all"><ChevronLeft size={16} /></button>
                    <div className="px-4 py-2 bg-white border border-stone-100 rounded-xl shadow-sm min-w-56 text-center">
                        <span className="text-sm font-bold text-stone-700">{weekRange}</span>
                    </div>
                    <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 border border-stone-200 rounded-full hover:bg-white shadow-sm transition-all"><ChevronRight size={16} /></button>
                    <button onClick={() => setWeekOffset(0)} className="px-3 py-2 text-[9px] font-black uppercase tracking-widest border border-stone-200 rounded-full hover:bg-white shadow-sm text-stone-400 transition-all">
                        Aujourd'hui
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Legend */}
                    <div className="flex items-center gap-4 bg-white border border-stone-100 rounded-xl px-4 py-2 shadow-sm">
                        {Object.entries(SERVICE_CONFIG).map(([k, c]) => (
                            <div key={k} className="flex items-center gap-1.5">
                                <span className="text-sm">{c.icon}</span>
                                <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">{c.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* iCal */}
                    <button
                        onClick={() => setShowIcal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-50 shadow-sm transition-all"
                    >
                        <CalendarDays size={14} className="text-blue-500" /> Sync Calendrier
                    </button>

                    {/* Block */}
                    <button
                        onClick={() => setShowBlock(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-sm"
                    >
                        <BanIcon size={14} /> Bloquer des dates
                    </button>
                </div>
            </div>

            {/* ─── Blocked periods pills ───────────────────────────────────── */}
            {blocked.length > 0 && (
                <div className="flex gap-3 flex-wrap flex-shrink-0">
                    {blocked.map(b => {
                        const nbDays = Math.round((new Date(b.endDate).getTime() - new Date(b.startDate).getTime()) / 86400000) + 1;
                        return (
                            <div key={b.id} className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border",
                                b.type === "holiday" ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-red-50 border-red-200 text-red-600"
                            )}>
                                <BanIcon size={11} />
                                <span>{b.label}</span>
                                <span className="opacity-60 font-normal">
                                    {formatDateFR(b.startDate)}{b.startDate !== b.endDate ? ` → ${formatDateFR(b.endDate)}` : ""} · {nbDays}j
                                </span>
                                <button onClick={() => removeBlock(b.id)} className="ml-1 hover:opacity-60 transition-opacity"><X size={10} /></button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ─── Calendar grid ──────────────────────────────────────────── */}
            <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
                <div className="flex-1 bg-white rounded-3xl border border-stone-100 shadow-xl overflow-auto">
                    <div className="flex" style={{ minWidth: 700 }}>

                        {/* Time column */}
                        <div className="w-14 flex-shrink-0 border-r border-stone-100 sticky left-0 bg-white z-20">
                            <div className="h-14 border-b border-stone-100" />
                            {HOURS.map(h => (
                                <div key={h} style={{ height: HOUR_H }} className="border-t border-stone-50 flex items-start justify-end pr-2 pt-1">
                                    <span className="text-[9px] text-stone-300 font-medium">{h}h</span>
                                </div>
                            ))}
                        </div>

                        {/* Day columns */}
                        {dayDates.map((date, dayIdx) => {
                            const isoDate = toISODate(date);
                            const dayAppts = appts.filter(a => a.date === isoDate);
                            const isBlocked = isDateBlocked(isoDate);
                            const isWeekend = dayIdx >= 5;
                            const isToday = isoDate === toISODate(new Date());

                            return (
                                <div key={dayIdx} className={cn("flex-1 border-r border-stone-50 last:border-r-0", isWeekend && "bg-stone-50/40")}>
                                    {/* Day header */}
                                    <div className={cn(
                                        "h-14 flex flex-col items-center justify-center border-b border-stone-100 sticky top-0 z-10",
                                        isBlocked ? "bg-red-50" : isToday ? "bg-[#B08D57]/5" : "bg-white"
                                    )}>
                                        <span className="text-[9px] uppercase tracking-widest text-stone-400 font-black">{DAY_NAMES[dayIdx]}</span>
                                        <div className={cn(
                                            "w-7 h-7 flex items-center justify-center rounded-full mt-0.5",
                                            isToday ? "bg-[#B08D57] text-white" : "text-stone-900"
                                        )}>
                                            <span className="text-sm font-serif">{date.getDate()}</span>
                                        </div>
                                    </div>

                                    {/* Hour cells */}
                                    <div className="relative" style={{ height: HOURS.length * HOUR_H }}>
                                        {HOURS.map(h => (
                                            <div key={h} className="absolute left-0 right-0 border-t border-stone-50" style={{ top: (h - 8) * HOUR_H }} />
                                        ))}

                                        {/* Business Hours Overlays */}
                                        {(() => {
                                            const bDay = hours.find((h: BusinessDay) => h.day === DAY_NAMES[dayIdx]);
                                            if (!bDay) return null;

                                            // If day is closed
                                            if (!bDay.isOpen) {
                                                return (
                                                    <div className="absolute inset-0 bg-stone-100/50 backdrop-blur-[1px] z-[5] flex items-center justify-center opacity-70">
                                                        <div className="flex flex-col items-center gap-1.5 grayscale">
                                                            <Clock size={16} className="text-stone-300" />
                                                            <span className="text-[8px] text-stone-400 font-black uppercase tracking-[0.2em]">Fermé</span>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            // If open, shade non-business hours
                                            const [openH, openM] = bDay.openTime.split(":").map(Number);
                                            const [closeH, closeM] = bDay.closeTime.split(":").map(Number);
                                            const morningHeight = toTop(openH, openM);
                                            const eveningTop = toTop(closeH, closeM);
                                            const eveningHeight = (HOURS.length * HOUR_H) - eveningTop;

                                            return (
                                                <>
                                                    {morningHeight > 0 && (
                                                        <div
                                                            className="absolute top-0 left-0 right-0 bg-stone-50/70 stripe-bg z-[5] opacity-50 border-b border-stone-100"
                                                            style={{ height: morningHeight }}
                                                        />
                                                    )}
                                                    {eveningHeight > 0 && (
                                                        <div
                                                            className="absolute bottom-0 left-0 right-0 bg-stone-50/70 stripe-bg z-[5] opacity-50 border-t border-stone-100"
                                                            style={{ height: eveningHeight }}
                                                        />
                                                    )}
                                                </>
                                            );
                                        })()}

                                        {/* Blocked overlay (holidays/vacations) */}
                                        {isBlocked && (
                                            <div className="absolute inset-0 bg-rose-50/90 z-[7] flex flex-col items-center justify-center gap-2 border-x border-rose-100">
                                                <BanIcon size={20} className="text-rose-300" />
                                                <span className="text-[9px] text-rose-400 font-bold uppercase tracking-widest text-center px-4 leading-relaxed">
                                                    {blocked.find(b => isDateInRange(isoDate, b.startDate, b.endDate))?.label ?? "Fermé"}
                                                </span>
                                            </div>
                                        )}

                                        {/* Appointments */}
                                        {!isBlocked && dayAppts.map(appt => {
                                            const cfg = SERVICE_CONFIG[appt.service];
                                            const top = toTop(appt.startHour, appt.startMin);
                                            const height = toHeight(cfg.duration);
                                            const sel = selected?.id === appt.id;

                                            return (
                                                <motion.button
                                                    key={appt.id}
                                                    onClick={() => setSelected(sel ? null : appt)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    style={{
                                                        top, height: height - 4, zIndex: sel ? 20 : 10,
                                                        background: cfg.hex + "18",
                                                        borderLeftColor: cfg.hex,
                                                        boxShadow: sel ? `0 0 0 2px ${cfg.hex}` : undefined,
                                                    }}
                                                    className={cn(
                                                        "absolute left-1 right-1 rounded-xl p-2 text-left border-l-4 transition-all duration-200",
                                                        appt.status === "cancelled" ? "opacity-35 grayscale" : "shadow-sm hover:shadow-md"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-1 mb-0.5">
                                                        <span className="text-[10px]">{cfg.icon}</span>
                                                        <span className="text-[9px] font-black" style={{ color: cfg.hex }}>
                                                            {appt.startHour}:{appt.startMin === 0 ? "00" : appt.startMin}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] font-bold text-stone-800 truncate">{appt.client}</p>
                                                    {height > 55 && <p className="text-[9px] font-medium truncate mt-0.5" style={{ color: cfg.hex }}>{cfg.label}</p>}
                                                    {height > 75 && (
                                                        <p className="text-[9px] text-stone-400 mt-0.5">{cfg.duration} min</p>
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Detail panel ──────────────────────────────────────── */}
                <AnimatePresence>
                    {selected && (() => {
                        const cfg = SERVICE_CONFIG[selected.service];
                        const statusCfg = {
                            confirmed: { l: "Confirmé", c: "bg-green-100 text-green-700", icon: <CheckCircle2 size={12} className="text-green-500" /> },
                            pending: { l: "En attente", c: "bg-orange-100 text-orange-700", icon: <Clock size={12} className="text-orange-500" /> },
                            cancelled: { l: "Annulé", c: "bg-red-100 text-red-600", icon: <XCircle size={12} className="text-red-500" /> },
                        }[selected.status];

                        return (
                            <motion.div
                                initial={{ opacity: 0, x: 20, width: 0 }} animate={{ opacity: 1, x: 0, width: 300 }} exit={{ opacity: 0, x: 20, width: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="flex-shrink-0 bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden flex flex-col"
                                style={{ width: 300 }}
                            >
                                {/* Header */}
                                <div className="p-7 relative" style={{ background: cfg.hex + "18" }}>
                                    <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/60 hover:bg-white transition-colors">
                                        <X size={13} />
                                    </button>
                                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl mb-3" style={{ background: cfg.hex + "28" }}>
                                        {cfg.icon}
                                    </div>
                                    <h4 className="text-lg font-serif text-stone-900 mb-2">{selected.client}</h4>
                                    <div className="flex items-center gap-1.5">
                                        {statusCfg.icon}
                                        <span className={cn("text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest", statusCfg.c)}>{statusCfg.l}</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-7 space-y-5 flex-1">
                                    {[
                                        { icon: <Clock size={12} />, label: "Date & Heure", val: `${formatDateFR(selected.date)} à ${selected.startHour}:${selected.startMin === 0 ? "00" : selected.startMin}` },
                                        { icon: <Sparkles size={12} />, label: "Service", val: `${cfg.label} · ${cfg.duration} min` },
                                        { icon: <Phone size={12} />, label: "Téléphone", val: selected.phone },
                                        { icon: <Mail size={12} />, label: "Email", val: selected.email },
                                    ].map(({ icon, label, val }) => (
                                        <div key={label} className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: cfg.hex + "18" }}>
                                                <span style={{ color: cfg.hex }}>{icon}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">{label}</p>
                                                <p className="text-xs font-bold text-stone-900 break-words">{val}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {selected.notes && (
                                        <div className="p-3 rounded-xl border text-xs italic text-stone-600" style={{ background: cfg.hex + "10", borderColor: cfg.hex + "30" }}>
                                            💬 {selected.notes}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="px-7 pb-7 space-y-2">
                                    {selected.status === "pending" && (
                                        <button className="w-full py-3 bg-stone-950 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-[#B08D57] transition-all">
                                            <CheckCircle2 size={11} className="inline mr-1.5" /> Confirmer
                                        </button>
                                    )}
                                    {selected.status !== "cancelled" && (
                                        <button className="w-full py-3 border border-red-200 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-50 transition-all">
                                            <XCircle size={11} className="inline mr-1.5" /> Annuler le RDV
                                        </button>
                                    )}
                                    <p className="text-center text-[9px] text-stone-300 font-mono">{selected.id}</p>
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>

            {/* ─── Modals ─────────────────────────────────────────────────── */}
            <AnimatePresence>
                {showBlock && <BlockDialog onClose={() => setShowBlock(false)} onSave={(b) => { addBlock(b); setShowBlock(false); }} />}
                {showIcal && <ICalDialog onClose={() => setShowIcal(false)} />}
            </AnimatePresence>
        </div>
    );
}
