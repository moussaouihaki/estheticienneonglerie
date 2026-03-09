"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, Check, CircleDollarSign } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useServices } from "@/lib/servicesStore";
import { useBusinessHours, BusinessDay } from "@/lib/businessHoursStore";
import { useBlockedPeriods } from "@/lib/blockedPeriodsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function getDayName(dateStr: string): string {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    // Assume dateStr is "DD Month YYYY" from our mock or a real Date
    // For the mock "X Mars 2024", we'll need better parsing.
    // Let's use a real Date object if possible or a simple mapping.
    // However, the current mock uses strings. Let's make it work with real Dates for better logic.
    const date = new Date(dateStr);
    return days[date.getDay()];
}

function generateTimeSlots(openStr: string, closeStr: string, interval = 15): string[] {
    const slots: string[] = [];
    const [openH, openM] = openStr.split(":").map(Number);
    const [closeH, closeM] = closeStr.split(":").map(Number);

    let current = openH * 60 + openM;
    const end = closeH * 60 + closeM;

    while (current + 60 <= end) { // Simplified: assume 1h slots for now or dynamic
        const h = Math.floor(current / 60);
        const m = current % 60;
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        current += 75; // 1h15 steps like in original
    }
    return slots;
}

function ServiceStep({ onSelect, selectedId }: { onSelect: (id: string) => void; selectedId: string | null }) {
    const { services } = useServices();
    const visible = services.filter(s => s.visible);
    return (
        <div className="grid grid-cols-1 gap-6">
            {visible.map(service => (
                <button
                    key={service.id}
                    onClick={() => onSelect(service.id)}
                    className={cn(
                        "group w-full p-8 rounded-2xl border-2 flex items-center justify-between transition-all duration-500 hover:scale-[1.02]",
                        selectedId === service.id ? "border-current bg-stone-50" : "border-stone-100 hover:border-stone-300 bg-white"
                    )}
                    style={selectedId === service.id ? { borderColor: service.color, background: service.color + "0D" } : {}}
                >
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-2xl text-2xl transition-transform group-hover:scale-110" style={{ background: service.color + "22" }}>
                            {service.icon}
                        </div>
                        <div className="text-left">
                            <h3 className="text-xl font-serif text-stone-900">{service.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: service.color }}>
                                    {service.duration} min
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="text-lg font-light text-stone-900">CHF {service.price}</span>
                </button>
            ))}
        </div>
    );
}

interface BookingData {
    service: string | null;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export function BookingFlow() {
    const [step, setStep] = useState(1);
    const { hours } = useBusinessHours();
    const { services } = useServices();
    const { isDateBlocked } = useBlockedPeriods();

    const [bookingData, setBookingData] = useState<BookingData>({
        service: null,
        date: "", // Will be ISO "YYYY-MM-DD"
        time: "",
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleServiceSelect = (serviceId: string) => {
        setBookingData({ ...bookingData, service: serviceId });
        nextStep();
    };

    const handleDateSelect = (date: string) => {
        setBookingData({ ...bookingData, date });
        nextStep();
    };

    const handleTimeSelect = (time: string) => {
        setBookingData({ ...bookingData, time });
        nextStep();
    };

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto min-h-[600px]">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-20 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-200 -z-10" />
                {[1, 2, 3, 4].map((num) => (
                    <div
                        key={num}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                            step >= num ? "bg-accent border-accent text-white shadow-xl scale-110" : "bg-white border-stone-200 text-stone-400"
                        )}
                    >
                        {step > num ? <Check size={16} /> : num}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-serif">Choisissez votre <span className="italic">prestation</span></h2>
                            <p className="text-stone-500 font-light">Sélectionnez le soin qui sublimera vos mains aujourd'hui.</p>
                        </div>
                        <ServiceStep
                            onSelect={handleServiceSelect}
                            selectedId={bookingData.service}
                        />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-serif">Sélectionnez la <span className="italic">date</span></h2>
                            <p className="text-stone-500 font-light">Quand souhaitez-vous venir au studio ?</p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-stone-100">
                            <div className="grid grid-cols-7 gap-4 text-center">
                                {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map(d => (
                                    <div key={d} className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">{d}</div>
                                ))}
                                {[...Array(28)].map((_, i) => {
                                    const dayNum = i + 1;
                                    const dateObj = new Date(2026, 2, dayNum); // March 2026 for demo
                                    const dayName = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][dateObj.getDay()];
                                    const businessDay = hours.find(h => h.day === dayName);
                                    const iso = `2026-03-${String(dayNum).padStart(2, "0")}`;
                                    const isDisabled = !businessDay?.isOpen || dayNum < 10 || isDateBlocked(iso);

                                    return (
                                        <button
                                            key={i}
                                            disabled={isDisabled}
                                            onClick={() => handleDateSelect(iso)}
                                            className={cn(
                                                "aspect-square rounded-full flex items-center justify-center text-sm transition-all relative overflow-hidden",
                                                isDisabled ? "text-stone-200 cursor-not-allowed" : "hover:bg-accent/10 hover:text-accent font-medium",
                                                bookingData.date === iso ? "bg-accent text-white hover:bg-accent" : ""
                                            )}
                                        >
                                            <span className="relative z-10">{dayNum}</span>
                                            {!isDisabled && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-accent/20" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <button onClick={prevStep} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors">
                            <ChevronLeft size={20} /> Retour aux services
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-serif">Choisissez l'<span className="italic">heure</span></h2>
                            <p className="text-stone-500 font-light">Date sélectionnée : <span className="text-accent font-medium">{bookingData.date}</span></p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(() => {
                                const dateObj = new Date(bookingData.date);
                                const dayName = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][dateObj.getDay()];
                                const bDay = hours.find(h => h.day === dayName);
                                if (!bDay || !bDay.isOpen) return <p className="col-span-full text-center text-stone-400">Studio fermé ce jour.</p>;

                                const slots = generateTimeSlots(bDay.openTime, bDay.closeTime);
                                return slots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={cn(
                                            "py-6 rounded-2xl border-2 transition-all duration-300 font-serif text-xl",
                                            bookingData.time === time ? "bg-accent border-accent text-white shadow-lg" : "bg-white border-stone-100 hover:border-accent text-stone-900"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ));
                            })()}
                        </div>
                        <button onClick={prevStep} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors">
                            <ChevronLeft size={20} /> Retour au calendrier
                        </button>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-serif">Finalisez votre <span className="italic">rendez-vous</span></h2>
                            <p className="text-stone-500 font-light">Une dernière étape pour confirmer votre moment de luxe.</p>
                        </div>
                        <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Nom Complet</label>
                                    <input
                                        type="text"
                                        value={bookingData.name}
                                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Email</label>
                                    <input
                                        type="email"
                                        value={bookingData.email}
                                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Téléphone</label>
                                    <input
                                        type="tel"
                                        value={bookingData.phone}
                                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="+41 79 123 45 67"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Adresse</label>
                                    <input
                                        type="text"
                                        value={bookingData.address}
                                        onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="Votre adresse (en option)"
                                    />
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
                                <h4 className="text-xs uppercase tracking-widest text-accent font-black">Récapitulatif</h4>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400 font-light">Prestation</span>
                                    <span className="text-stone-950 font-medium">{services.find(s => s.id === bookingData.service)?.name ?? "Non sélectionné"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-400 font-light">Date & Heure</span>
                                    <span className="text-stone-950 font-medium">
                                        {(() => {
                                            if (!bookingData.date) return "-";
                                            const d = new Date(bookingData.date);
                                            return `${d.getDate()} Mars 2026 à ${bookingData.time}`;
                                        })()}
                                    </span>
                                </div>
                            </div>
                            <button className="w-full py-6 bg-stone-950 text-white font-bold uppercase tracking-[0.4em] rounded-xl hover:bg-accent transition-all duration-700 shadow-2xl">
                                Confirmer ma séance
                            </button>
                        </div>
                        <button onClick={prevStep} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors">
                            <ChevronLeft size={20} /> Retour à l'heure
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
