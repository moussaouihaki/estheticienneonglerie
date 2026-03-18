"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
    ChevronLeft, 
    ChevronRight, 
    Clock, 
    Smartphone, 
    BanIcon, 
    X, 
    CheckCircle2, 
    XCircle, 
    Phone, 
    Mail, 
    Sparkles, 
    RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAppointments, type Appointment } from "@/lib/appointmentsStore";
import { useServices } from "@/lib/servicesStore";
import { useBusinessHours, type BusinessDay } from "@/lib/businessHoursStore";
import { useBlockedPeriods, type BlockedPeriod } from "@/lib/blockedPeriodsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 08:00 to 20:00
const HOUR_H = 100; // pixels per hour

const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const DAY_MAP_FULL = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function toISODate(date: Date) {
    return date.toISOString().split('T')[0];
}

function formatDateFR(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

// ─── Dialogs ──────────────────────────────────────────────────────────────────
function BlockDialog({ onClose, onSave }: { onClose: () => void, onSave: (b: Omit<BlockedPeriod, "id">) => void }) {
    const [label, setLabel] = useState("");
    const [startDate, setStartDate] = useState(toISODate(new Date()));
    const [endDate, setEndDate] = useState(toISODate(new Date()));
    const [type, setType] = useState<BlockedPeriod["type"]>("vacation");

    const valid = label.trim().length > 0 && startDate <= endDate;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
                <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-serif text-stone-900">Bloquer des dates</h3>
                        <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full"><X size={18} /></button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Motif</label>
                            <input
                                autoFocus
                                value={label} onChange={e => setLabel(e.target.value)}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]"
                                placeholder="Congés annuels, etc."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Du</label>
                                <input
                                    type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Au (inclus)</label>
                                <input
                                    type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {(["vacation", "holiday", "other"] as const).map(t => (
                                <button
                                    key={t} onClick={() => setType(t)}
                                    className={cn(
                                        "flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                                        type === t ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-400 border-stone-100"
                                    )}
                                >
                                    {t === 'vacation' ? 'Vacances' : t === 'holiday' ? 'Férié' : 'Autre'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 border border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:bg-stone-50 transition-all">
                            Annuler
                        </button>
                        <button
                            disabled={!valid}
                            onClick={() => { onSave({ label: label.trim(), startDate, endDate, type }); onClose(); }}
                            className={cn(
                                "flex-1 py-4 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl",
                                valid ? "bg-stone-950 hover:bg-[#B08D57] shadow-stone-900/20" : "bg-stone-200 cursor-not-allowed"
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

function ICalDialog({ onClose }: { onClose: () => void }) {
    const [copiedW, setCopiedW] = useState(false);
    const [copiedG, setCopiedG] = useState(false);
    const origin = typeof window !== "undefined" ? window.location.origin : "https://palma-institut.ch";
    const webcalUrl = `webcal://${window.location.host}/api/calendar`;
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
                            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">Vos RDV sur votre téléphone</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100"><X size={16} /></button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl">
                        <RefreshCw size={12} className="text-green-600 flex-shrink-0" />
                        <p className="text-xs text-green-700 font-medium">Tout se met à jour automatiquement</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-[#F5F5F7] rounded-2xl p-5 space-y-3">
                        <p className="font-bold text-sm text-stone-900">Apple Calendar (iPhone/Mac)</p>
                        <button onClick={() => window.open(webcalUrl, "_blank")} className="w-full py-3 bg-stone-900 hover:bg-[#B08D57] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                            S'abonner →
                        </button>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-5 space-y-3">
                        <p className="font-bold text-sm text-stone-900">Google Calendar</p>
                        <button onClick={() => window.open(googleUrl, "_blank")} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                            Ajouter à mon agenda →
                        </button>
                    </div>
                </div>
                <div className="px-6 pb-6 text-center">
                    <p className="text-[10px] text-stone-300 font-mono break-all">{httpUrl}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CalendrierPage() {
    const { appointments, updateStatus, init } = useAppointments();
    const { services } = useServices();
    const { hours } = useBusinessHours();
    const { blocked, addBlock, removeBlock, isDateBlocked } = useBlockedPeriods();
    
    const [selected, setSelected] = useState<any | null>(null);
    const [showBlock, setShowBlock] = useState(false);
    const [showIcal, setShowIcal] = useState(false);
    const [weekOffset, setWeekOffset] = useState(0);

    // Responsive state
    const [isMobile, setIsMobile] = useState(false);
    const [mobileSelectedDay, setMobileSelectedDay] = useState(0);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        if (init) {
            const unsubscribe = init();
            return () => unsubscribe && unsubscribe();
        }
    }, [init]);

    // Compute week start (Monday)
    const weekStart = useMemo(() => {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const base = new Date(now.setDate(diff));
        base.setHours(0,0,0,0);
        return addDays(base, weekOffset * 7);
    }, [weekOffset]);

    const dayDates = useMemo(() =>
        Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
        [weekStart]
    );

    useEffect(() => {
        // Default to today if within current week
        const todayStr = toISODate(new Date());
        const idx = dayDates.findIndex(d => toISODate(d) === todayStr);
        if (idx !== -1) setMobileSelectedDay(idx);
        else setMobileSelectedDay(0);
    }, [dayDates]);

    const weekRange = isMobile 
        ? `${dayDates[mobileSelectedDay].getDate()} ${MONTH_NAMES[dayDates[mobileSelectedDay].getMonth()]} ${dayDates[mobileSelectedDay].getFullYear()}`
        : `${dayDates[0].getDate()} ${MONTH_NAMES[dayDates[0].getMonth()]} — ${dayDates[6].getDate()} ${MONTH_NAMES[dayDates[6].getMonth()]} ${dayDates[6].getFullYear()}`;

    const weekAppointments = useMemo(() => {
        const start = toISODate(dayDates[0]);
        const end = toISODate(dayDates[6]);
        return appointments.filter(a => a.date >= start && a.date <= end && a.status !== 'cancelled');
    }, [appointments, dayDates]);

    const toTop = (h: number, m: number) => (h - 8) * HOUR_H + (m / 60) * HOUR_H;
    const toHeight = (dur: number) => (dur / 60) * HOUR_H;

    return (
        <div className="h-full flex flex-col gap-4 md:gap-6">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                    <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 border border-stone-200 rounded-full hover:bg-white shadow-sm transition-all"><ChevronLeft size={16} /></button>
                    <div className="flex-1 lg:flex-none px-4 py-2 bg-white border border-stone-100 rounded-xl shadow-sm min-w-[200px] text-center">
                        <span className="text-xs md:text-sm font-bold text-stone-700">{weekRange}</span>
                    </div>
                    <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 border border-stone-200 rounded-full hover:bg-white shadow-sm transition-all"><ChevronRight size={16} /></button>
                    <button onClick={() => setWeekOffset(0)} className="px-3 py-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-stone-200 rounded-full hover:bg-white shadow-sm text-stone-400 transition-all">
                        Today
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <button onClick={() => setShowBlock(true)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100/30 whitespace-nowrap">
                        <BanIcon size={12} /> Bloquer
                    </button>
                    <button onClick={() => setShowIcal(true)} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10 whitespace-nowrap">
                        <Smartphone size={12} /> Synchro
                    </button>
                </div>
            </div>

            {/* Mobile Day Picker */}
            {isMobile && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {dayDates.map((date, idx) => {
                        const isToday = toISODate(date) === toISODate(new Date());
                        const active = mobileSelectedDay === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => setMobileSelectedDay(idx)}
                                className={cn(
                                    "flex-1 min-w-[56px] py-3 rounded-xl border flex flex-col items-center transition-all",
                                    active ? "bg-stone-900 text-white border-stone-900 shadow-md" : "bg-white border-stone-100 text-stone-400"
                                )}
                            >
                                <span className="text-[7px] uppercase font-black mb-1">{DAY_NAMES[idx]}</span>
                                <span className={cn("text-sm font-serif", active ? "italic" : "")}>{date.getDate()}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Grid */}
            <div className="flex-1 bg-white border border-stone-100 rounded-3xl shadow-xl overflow-hidden relative font-sans">
                <div className={cn("grid divide-x divide-stone-50 h-full", isMobile ? "grid-cols-[50px_1fr]" : "grid-cols-[80px_repeat(7,1fr)]")} style={!isMobile ? { gridTemplateColumns: '80px repeat(7, 1fr)' } : {}}>
                    
                    {/* Time Column */}
                    <div className="bg-stone-50/50 pt-20 flex flex-col items-center border-r border-stone-100 overflow-hidden">
                        {HOURS.map(h => (
                            <div key={h} className="text-[8px] md:text-[9px] font-black tracking-widest text-stone-300 relative" style={{ height: HOUR_H }}>
                                <span className="absolute -top-1.5 right-2 md:right-4">{h}:00</span>
                            </div>
                        ))}
                    </div>

                    {/* Columns */}
                    {(isMobile ? [dayDates[mobileSelectedDay]] : dayDates).map((date) => {
                        const iso = toISODate(date);
                        const isToday = iso === toISODate(new Date());
                        const isBlocked = isDateBlocked(iso);
                        const dayIdx = date.getDay() === 0 ? 6 : date.getDay() - 1;
                        const appts = weekAppointments.filter(a => a.date === iso);

                        return (
                            <div key={date.toString()} className="h-full relative overflow-y-auto overflow-x-hidden">
                                {isBlocked && (
                                    <div className="absolute inset-0 bg-red-50/30 backdrop-blur-[2px] z-30 flex items-center justify-center p-4">
                                        <div className="bg-white/90 p-4 rounded-2xl shadow-xl border border-red-100 text-center max-w-[150px]">
                                            <BanIcon size={20} className="mx-auto text-red-400 mb-2" />
                                            <p className="text-[9px] uppercase font-black tracking-widest text-red-600">Période bloquée</p>
                                        </div>
                                    </div>
                                )}

                                {/* Day Header */}
                                <div className={cn(
                                    "h-20 md:h-28 flex flex-col items-center justify-center border-b border-stone-100 bg-white sticky top-0 z-20",
                                    isToday ? "bg-stone-50" : ""
                                )}>
                                    <span className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">{DAY_NAMES[dayIdx]}</span>
                                    <div className={cn(
                                        "w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full mt-1.5 shadow-sm transition-all",
                                        isToday ? "bg-[#B08D57] text-white" : "bg-stone-50 text-stone-900"
                                    )}>
                                        <span className="text-sm font-serif">{date.getDate()}</span>
                                    </div>
                                </div>

                                {/* Hour Grid */}
                                <div className="relative group" style={{ height: HOURS.length * HOUR_H }}>
                                    {HOURS.map(h => (
                                        <div key={h} className="absolute left-0 right-0 border-t border-stone-50" style={{ top: (h - 8) * HOUR_H }} />
                                    ))}

                                    {/* Business Hours Overlay */}
                                    {(() => {
                                        const bDay = hours.find((h: BusinessDay) => h.day === DAY_MAP_FULL[dayIdx]);
                                        if (!bDay || !bDay.isOpen) return (
                                            <div className="absolute inset-0 bg-stone-100/40 z-[1] backdrop-blur-[1px] flex items-center justify-center">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400 rotate-90">Fermé</span>
                                            </div>
                                        );
                                        const [oh, om] = bDay.openTime.split(':').map(Number);
                                        const [ch, cm] = bDay.closeTime.split(':').map(Number);
                                        const openTop = toTop(oh, om);
                                        const closeTop = toTop(ch, cm);
                                        return (
                                            <>
                                                {openTop > 0 && <div className="absolute top-0 left-0 right-0 bg-stone-100/30 z-[1]" style={{ height: openTop }} />}
                                                <div className="absolute left-0 right-0 bg-stone-100/30 z-[1]" style={{ top: closeTop, bottom: 0 }} />
                                                {bDay.hasBreak && (
                                                    <div className="absolute left-0 right-0 bg-stone-100/60 z-[2] border-y border-stone-100/50 flex items-center justify-center"
                                                        style={{
                                                            top: toTop(...bDay.breakStart.split(':').map(Number) as [number, number]),
                                                            height: toHeight((Number(bDay.breakEnd.split(':')[0]) * 60 + Number(bDay.breakEnd.split(':')[1])) - (Number(bDay.breakStart.split(':')[0]) * 60 + Number(bDay.breakStart.split(':')[1])))
                                                        }}
                                                    >
                                                        <span className="text-[7px] font-black uppercase text-stone-400 tracking-widest opacity-40">Pause</span>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}

                                    {/* Appointments */}
                                    {appts.map(a => {
                                        const [h, m] = a.time.split(':').map(Number);
                                        const srv = services.find(s => s.name === a.service);
                                        const duration = srv?.duration || 60;
                                        return (
                                            <motion.button
                                                key={a.id}
                                                whileHover={{ scale: 0.98, x: 2 }}
                                                onClick={() => setSelected(a)}
                                                className={cn(
                                                    "absolute left-1 right-1 rounded-xl p-2 md:p-3 text-left shadow-lg z-10 overflow-hidden border-l-[3px] transition-all",
                                                    a.status === 'pending' ? 'ring-2 ring-amber-400 ring-offset-2' : ''
                                                )}
                                                style={{
                                                    top: toTop(h, m),
                                                    height: Math.max(toHeight(duration), 30),
                                                    backgroundColor: (srv?.color || '#B08D57') + 'EE',
                                                    borderLeftColor: srv?.color || '#B08D57',
                                                    color: 'white'
                                                }}
                                            >
                                                <p className="text-[10px] md:text-sm font-bold truncate leading-tight">{a.client}</p>
                                                <p className="text-[7px] md:text-[9px] uppercase font-black tracking-widest opacity-70 truncate mt-0.5">{a.service}</p>
                                                <p className="text-[7px] md:text-[9px] font-mono mt-0.5">{a.time}</p>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Selection Sidebar (Overlay on mobile) */}
                <AnimatePresence>
                    {selected && (() => {
                        const srv = services.find(s => s.name === selected.service);
                        return (
                            <motion.div
                                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                                className="absolute right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-40 border-l border-stone-100 flex flex-col overflow-y-auto"
                            >
                                <div className="p-7 md:p-10 bg-stone-50 border-b border-stone-100 relative">
                                    <button onClick={() => setSelected(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 transition-all text-stone-400"><X size={18} /></button>
                                    <div className="pr-12">
                                        <div className={cn("text-[9px] px-2 py-0.5 rounded-full inline-block mb-3 font-black uppercase tracking-widest",
                                            selected.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                                        )}>
                                            {selected.status}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-stone-900 leading-tight">{selected.client}</h3>
                                        <p className="text-[11px] uppercase tracking-widest text-stone-400 mt-2 font-black italic">{selected.service}</p>
                                    </div>
                                </div>

                                <div className="p-7 md:p-10 space-y-8 flex-1">
                                    {[
                                        { icon: <Clock size={14} />, label: "Date & Heure", val: `${formatDateFR(selected.date)} à ${selected.time}` },
                                        { icon: <Phone size={14} />, label: "Téléphone", val: selected.phone },
                                        { icon: <Mail size={14} />, label: "Email", val: selected.email },
                                    ].map(({ icon, label, val }) => (
                                        <div key={label} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-stone-50 text-stone-400 shadow-sm border border-stone-100">
                                                {icon}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-black mb-1">{label}</p>
                                                <p className="text-sm font-bold text-stone-900 break-words">{val}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {selected.notes && (
                                        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 text-sm italic text-stone-600 leading-relaxed">
                                            <span className="block not-italic text-[9px] uppercase tracking-widest font-black text-stone-300 mb-2">Note du client :</span>
                                            "{selected.notes}"
                                        </div>
                                    )}
                                </div>

                                <div className="p-7 md:p-10 pb-12 space-y-3 mt-auto border-t border-stone-50">
                                    {selected.status === "pending" && (
                                        <button 
                                            onClick={() => {
                                                updateStatus(selected.id, 'confirmed');
                                                setSelected({ ...selected, status: 'confirmed' });
                                            }}
                                            className="w-full py-4 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-200"
                                        >
                                            <CheckCircle2 size={14} className="inline mr-2" /> Confirmer RDV
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => {
                                            if (confirm("Annuler ce rendez-vous ?")) {
                                                updateStatus(selected.id, 'cancelled');
                                                setSelected(null);
                                            }
                                        }}
                                        className="w-full py-4 border border-rose-100 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-50 transition-all font-bold"
                                    >
                                        <XCircle size={14} className="inline mr-2" /> Annuler le RDV
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showBlock && <BlockDialog onClose={() => setShowBlock(false)} onSave={(b) => { addBlock(b); setShowBlock(false); }} />}
                {showIcal && <ICalDialog onClose={() => setShowIcal(false)} />}
            </AnimatePresence>
        </div>
    );
}
