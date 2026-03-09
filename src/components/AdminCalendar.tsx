"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Phone, Mail, Clock, Scissors, Sparkles, Heart, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ─── Service config ────────────────────────────────────────────────────────────
const SERVICE_CONFIG = {
    signature: {
        label: "Vise-en-beauté Signature",
        duration: 60,
        color: "bg-amber-400",
        colorLight: "bg-amber-50",
        colorText: "text-amber-700",
        colorBorder: "border-amber-300",
        hex: "#F59E0B",
        icon: <Sparkles size={12} />,
    },
    gelx: {
        label: "Pose de prestige Gel-X",
        duration: 120,
        color: "bg-violet-500",
        colorLight: "bg-violet-50",
        colorText: "text-violet-700",
        colorBorder: "border-violet-300",
        hex: "#8B5CF6",
        icon: <Scissors size={12} />,
    },
    spa: {
        label: "Rituel Spa Mains & Pieds",
        duration: 75,
        color: "bg-emerald-500",
        colorLight: "bg-emerald-50",
        colorText: "text-emerald-700",
        colorBorder: "border-emerald-300",
        hex: "#10B981",
        icon: <Heart size={12} />,
    },
};

type ServiceKey = keyof typeof SERVICE_CONFIG;
type Appointment = {
    id: string;
    client: string;
    phone: string;
    email: string;
    service: ServiceKey;
    day: number; // 0 = Mon
    startHour: number;
    startMin: number;
    status: "confirmed" | "pending" | "cancelled";
    notes?: string;
};

// ─── Mock data ─────────────────────────────────────────────────────────────────
const APPOINTMENTS: Appointment[] = [
    { id: "RE-5421", client: "Marie Laurent", phone: "+41 79 123 45 67", email: "marie@email.com", service: "signature", day: 0, startHour: 10, startMin: 0, status: "confirmed" },
    { id: "RE-5422", client: "Sophie Martin", phone: "+41 78 987 65 43", email: "sophie@email.com", service: "gelx", day: 0, startHour: 13, startMin: 30, status: "pending", notes: "Ongles courts, forme amande" },
    { id: "RE-5423", client: "Emma Dubois", phone: "+41 76 543 21 09", email: "emma@email.com", service: "spa", day: 1, startHour: 11, startMin: 0, status: "confirmed" },
    { id: "RE-5424", client: "Alice Girard", phone: "+41 79 888 77 66", email: "alice@email.com", service: "gelx", day: 1, startHour: 16, startMin: 0, status: "cancelled", notes: "A annulé 24h avant" },
    { id: "RE-5425", client: "Clara Fontaine", phone: "+41 77 234 56 78", email: "clara@email.com", service: "signature", day: 2, startHour: 9, startMin: 30, status: "confirmed" },
    { id: "RE-5426", client: "Léa Bernard", phone: "+41 79 345 67 89", email: "lea@email.com", service: "spa", day: 2, startHour: 14, startMin: 0, status: "confirmed" },
    { id: "RE-5427", client: "Jade Moreau", phone: "+41 78 456 78 90", email: "jade@email.com", service: "gelx", day: 3, startHour: 10, startMin: 30, status: "confirmed", notes: "French manucure milky" },
    { id: "RE-5428", client: "Camille Petit", phone: "+41 76 567 89 01", email: "camille@email.com", service: "signature", day: 3, startHour: 15, startMin: 0, status: "pending" },
    { id: "RE-5429", client: "Inès Dupont", phone: "+41 77 678 90 12", email: "ines@email.com", service: "spa", day: 4, startHour: 11, startMin: 30, status: "confirmed" },
    { id: "RE-5430", client: "Noémie Simon", phone: "+41 79 789 01 23", email: "noemie@email.com", service: "gelx", day: 4, startHour: 17, startMin: 0, status: "confirmed" },
];

const WEEK_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const DAYS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
const WEEK_DATES = [10, 11, 12, 13, 14]; // March 10–14
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8h → 18h

const HOUR_HEIGHT = 80; // px per hour

function timeToTop(hour: number, min: number): number {
    return (hour - 8) * HOUR_HEIGHT + (min / 60) * HOUR_HEIGHT;
}

function durationToHeight(minutes: number): number {
    return (minutes / 60) * HOUR_HEIGHT;
}

export function AdminCalendar() {
    const [selected, setSelected] = useState<Appointment | null>(null);
    const [weekOffset, setWeekOffset] = useState(0);

    const monthLabel = `Mars ${new Date().getFullYear()}`;

    return (
        <div className="flex gap-6 h-full">
            {/* ─── Calendar ──────────────────────────────────────────────────── */}
            <div className="flex-1 bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setWeekOffset(w => w - 1)}
                            className="p-2 border border-stone-100 rounded-full hover:bg-stone-50 hover:border-stone-200 transition-all"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div>
                            <h3 className="text-xl font-serif text-stone-900">{monthLabel}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                                Semaine du {WEEK_DATES[0] + weekOffset * 5} au {WEEK_DATES[4] + weekOffset * 5}
                            </p>
                        </div>
                        <button
                            onClick={() => setWeekOffset(w => w + 1)}
                            className="p-2 border border-stone-100 rounded-full hover:bg-stone-50 hover:border-stone-200 transition-all"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-6">
                        {Object.entries(SERVICE_CONFIG).map(([key, cfg]) => (
                            <div key={key} className="flex items-center gap-2">
                                <div className={cn("w-3 h-3 rounded-full", cfg.color)} />
                                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                                    {key === "signature" ? "Signature" : key === "gelx" ? "Gel-X" : "Spa"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="flex flex-1 overflow-y-auto">
                    {/* Time column */}
                    <div className="w-16 flex-shrink-0 border-r border-stone-100">
                        <div className="h-14" /> {/* spacer for day header */}
                        {HOURS.map(h => (
                            <div key={h} style={{ height: HOUR_HEIGHT }} className="border-t border-stone-50 flex items-start justify-end pr-3 pt-1">
                                <span className="text-[10px] text-stone-400 font-medium">{h}h</span>
                            </div>
                        ))}
                    </div>

                    {/* Days columns */}
                    {WEEK_DAYS.map((day, dayIdx) => {
                        const dayAppts = APPOINTMENTS.filter(a => a.day === dayIdx);
                        return (
                            <div key={day} className="flex-1 border-r border-stone-50 last:border-r-0">
                                {/* Day header */}
                                <div className="h-14 flex flex-col items-center justify-center border-b border-stone-100 sticky top-0 bg-white z-10">
                                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-black">{DAYS_SHORT[dayIdx]}</span>
                                    <span className="text-xl font-serif text-stone-900">{WEEK_DATES[dayIdx] + weekOffset * 5}</span>
                                </div>

                                {/* Hours area */}
                                <div className="relative" style={{ height: HOURS.length * HOUR_HEIGHT }}>
                                    {/* Hour lines */}
                                    {HOURS.map(h => (
                                        <div
                                            key={h}
                                            className="absolute left-0 right-0 border-t border-stone-50"
                                            style={{ top: (h - 8) * HOUR_HEIGHT }}
                                        />
                                    ))}

                                    {/* Appointments */}
                                    {dayAppts.map(appt => {
                                        const cfg = SERVICE_CONFIG[appt.service];
                                        const top = timeToTop(appt.startHour, appt.startMin);
                                        const height = durationToHeight(cfg.duration);
                                        const isSelected = selected?.id === appt.id;

                                        return (
                                            <motion.button
                                                key={appt.id}
                                                onClick={() => setSelected(isSelected ? null : appt)}
                                                whileHover={{ scale: 1.02, zIndex: 20 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={cn(
                                                    "absolute left-1 right-1 rounded-xl p-2 text-left overflow-hidden transition-all duration-200 border-l-4",
                                                    cfg.colorLight,
                                                    cfg.colorBorder,
                                                    isSelected ? "ring-2 ring-stone-900 shadow-lg" : "shadow-sm hover:shadow-md",
                                                    appt.status === "cancelled" ? "opacity-40 grayscale" : ""
                                                )}
                                                style={{ top, height: height - 4, zIndex: isSelected ? 20 : 10 }}
                                            >
                                                <div className={cn("flex items-center gap-1 mb-1", cfg.colorText)}>
                                                    {cfg.icon}
                                                    <span className="text-[9px] font-black uppercase tracking-widest truncate">
                                                        {appt.startHour}:{appt.startMin === 0 ? "00" : appt.startMin}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] font-bold text-stone-800 truncate leading-tight">
                                                    {appt.client}
                                                </p>
                                                {height > 50 && (
                                                    <p className={cn("text-[9px] truncate mt-0.5 font-medium", cfg.colorText)}>
                                                        {cfg.label}
                                                    </p>
                                                )}
                                                {height > 70 && (
                                                    <p className="text-[9px] text-stone-400 mt-1">
                                                        {cfg.duration} min
                                                    </p>
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

            {/* ─── Detail Panel ──────────────────────────────────────────────── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 30, width: 0 }}
                        animate={{ opacity: 1, x: 0, width: 320 }}
                        exit={{ opacity: 0, x: 30, width: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="flex-shrink-0 bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden"
                        style={{ width: 320 }}
                    >
                        {(() => {
                            const cfg = SERVICE_CONFIG[selected.service];
                            const statusConfig = {
                                confirmed: { label: "Confirmé", classes: "bg-green-100 text-green-700" },
                                pending: { label: "En attente", classes: "bg-orange-100 text-orange-700" },
                                cancelled: { label: "Annulé", classes: "bg-red-100 text-red-600" },
                            }[selected.status];

                            return (
                                <>
                                    {/* Panel header with service color */}
                                    <div className={cn("p-8 relative", cfg.colorLight)}>
                                        <button
                                            onClick={() => setSelected(null)}
                                            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/60 hover:bg-white transition-colors"
                                        >
                                            <X size={14} className="text-stone-600" />
                                        </button>
                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", cfg.color, "text-white shadow-lg")}>
                                            {cfg.icon}
                                        </div>
                                        <h4 className="text-xl font-serif text-stone-900 mb-1">{selected.client}</h4>
                                        <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest", statusConfig.classes)}>
                                            {statusConfig.label}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", cfg.colorLight)}>
                                                    <Clock size={14} className={cfg.colorText} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Horaire</p>
                                                    <p className="text-sm font-bold text-stone-900">
                                                        {selected.startHour}:{selected.startMin === 0 ? "00" : selected.startMin} — {cfg.duration} min
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", cfg.colorLight)}>
                                                    <Sparkles size={14} className={cfg.colorText} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Service</p>
                                                    <p className="text-sm font-bold text-stone-900">{cfg.label}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", cfg.colorLight)}>
                                                    <Phone size={14} className={cfg.colorText} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Téléphone</p>
                                                    <p className="text-sm font-bold text-stone-900">{selected.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", cfg.colorLight)}>
                                                    <Mail size={14} className={cfg.colorText} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Email</p>
                                                    <p className="text-sm font-bold text-stone-900 break-all">{selected.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {selected.notes && (
                                            <div className={cn("p-4 rounded-2xl", cfg.colorLight, "border", cfg.colorBorder)}>
                                                <p className="text-[9px] uppercase tracking-widest font-black mb-2" style={{ color: cfg.hex }}>Notes</p>
                                                <p className="text-xs text-stone-700 italic">{selected.notes}</p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="space-y-3 pt-2">
                                            {selected.status !== "confirmed" && selected.status !== "cancelled" && (
                                                <button className="w-full py-3 bg-stone-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent transition-all duration-500">
                                                    Confirmer le RDV
                                                </button>
                                            )}
                                            {selected.status !== "cancelled" && (
                                                <button className="w-full py-3 border border-red-200 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-50 transition-all duration-300">
                                                    Annuler le RDV
                                                </button>
                                            )}
                                            <div className="text-center">
                                                <span className="text-[9px] uppercase tracking-widest text-stone-300 font-bold">
                                                    Réf. {selected.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
