"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, Check, Sparkles, MapPin, Phone, Mail, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useBlockedPeriods } from "@/lib/blockedPeriodsStore";
import { useSiteSettings } from "@/lib/siteSettingsStore";
import { useServices } from "@/lib/servicesStore";
import { useBusinessHours } from "@/lib/businessHoursStore";
import { useAppointments, Appointment } from "@/lib/appointmentsStore";
import { useClients } from "@/lib/clientsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function generateTimeSlots(
    openStr: string, 
    closeStr: string, 
    hasBreak: boolean, 
    bStartStr: string, 
    bEndStr: string,
    durationMin: number
): string[] {
    const slots: string[] = [];
    const [openH, openM] = openStr.split(":").map(Number);
    const [closeH, closeM] = closeStr.split(":").map(Number);
    const [bStartH, bStartM] = bStartStr.split(":").map(Number);
    const [bEndH, bEndM] = bEndStr.split(":").map(Number);

    const startTotal = openH * 60 + openM;
    const endTotal = closeH * 60 + closeM;
    const breakStartTotal = bStartH * 60 + bStartM;
    const breakEndTotal = bEndH * 60 + bEndM;

    let current = startTotal;
    while (current + durationMin <= endTotal) {
        const slotEnd = current + durationMin;
        const overlapsBreak = hasBreak && (
            (current < breakStartTotal && slotEnd > breakStartTotal) || 
            (current >= breakStartTotal && current < breakEndTotal)
        );

        if (!overlapsBreak) {
            const h = Math.floor(current / 60);
            const m = current % 60;
            slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        }
        current += 30;
    }
    return slots;
}

export function BookingFlow() {
    const { settings } = useSiteSettings();
    const { services } = useServices();
    const { hours } = useBusinessHours();
    const { isDateBlocked } = useBlockedPeriods();
    const { appointments, addAppointment, init } = useAppointments();
    const { clients, addClient, updateClient } = useClients();

    useEffect(() => {
        const unsubscribe = init();
        return () => unsubscribe && unsubscribe();
    }, [init]);

    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        service: null as string | null,
        date: "",
        time: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [viewDate, setViewDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const displayMonth = viewDate.toLocaleString('fr-FR', { month: 'long' });
    const displayYear = viewDate.getFullYear();

    const changeMonth = (offset: number) => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleServiceSelect = (serviceId: string) => {
        setBookingData({ ...bookingData, service: serviceId });
        nextStep();
    };

    const handleConfirmBooking = async () => {
        if (!bookingData.name || !bookingData.email || !bookingData.phone) {
            alert("Veuillez remplir vos coordonnées.");
            return;
        }
        setIsSubmitting(true);
        const service = services.find(s => s.id === bookingData.service);
        await addAppointment({
            client: bookingData.name, email: bookingData.email, phone: bookingData.phone,
            address: bookingData.address, service: bookingData.service!,
            date: bookingData.date, time: bookingData.time
        });
        const existingClient = clients.find(c => c.email.toLowerCase() === bookingData.email.toLowerCase());
        if (existingClient) {
            const newVisits = (existingClient.visits || 0) + 1;
            const currentTotal = parseInt(String(existingClient.totalSpent).replace(/[^\d]/g, '')) || 0;
            const newTotal = currentTotal + (service?.price || 0);
            await updateClient(existingClient.id, {
                visits: newVisits, totalSpent: `CHF ${newTotal}`,
                lastVisit: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                lastService: service?.id || bookingData.service!,
                status: newVisits >= 10 ? "VIP" : (newVisits >= 3 ? "Régulier" : "Nouveau")
            });
        } else {
            await addClient({
                name: bookingData.name, email: bookingData.email, phone: bookingData.phone,
                visits: 1, totalSpent: `CHF ${service?.price || 0}`,
                lastVisit: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                lastService: service?.id || bookingData.service!,
                status: "Nouveau"
            });
        }
        setIsSubmitting(false);
        setBookingSuccess(true);
    };

    if (bookingSuccess) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-24 px-6 max-w-2xl mx-auto text-center space-y-10">
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-[#B08D57]/5 rounded-full flex items-center justify-center text-[#B08D57] shadow-inner border border-[#B08D57]/10">
                        <Check size={48} strokeWidth={1.5} />
                    </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Réservation <span className="italic font-light">Confirmée</span></h2>
                <p className="text-stone-500 font-light leading-relaxed max-w-lg mx-auto">
                    Merci <span className="text-stone-900 font-medium">{bookingData.name}</span>. Votre séance pour le <span className="text-stone-900 font-medium">{new Date(bookingData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span> à <span className="text-stone-900 font-medium">{bookingData.time}</span> est enregistrée.
                </p>
                <div className="p-8 bg-stone-50 rounded-[2rem] border border-stone-100 text-[9px] uppercase tracking-[0.3em] text-stone-400 font-black leading-loose">
                    Un email de confirmation vous sera envoyé par le studio.
                </div>
                <button onClick={() => window.location.href = '/'} className="px-10 py-5 bg-stone-900 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#B08D57] transition-all duration-700 shadow-2xl">
                    RETOURNER À L'ACCUEIL
                </button>
            </motion.div>
        );
    }

    return (
        <section className="py-12 md:py-24 px-6 max-w-5xl mx-auto min-h-[700px]">
            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-16 md:mb-24 relative max-w-md mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-100 -z-10" />
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700 border text-[10px] font-black",
                        step >= num ? "bg-stone-900 border-stone-900 text-white shadow-2xl scale-110" : "bg-white border-stone-100 text-stone-300"
                    )}>
                        {step > num ? <Check size={16} strokeWidth={3} /> : num}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Quelle <span className="italic font-light text-stone-400">prestation</span> ?</h2>
                            <p className="text-stone-400 font-light text-sm italic">"Chaque soin est une signature unique pour vos mains."</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {services.filter(s => s.visible).map(svc => (
                                <button key={svc.id} onClick={() => handleServiceSelect(svc.id)} className="group p-6 rounded-[2rem] border border-stone-100 bg-white flex items-center justify-between transition-all duration-700 hover:shadow-2xl hover:border-stone-900/5 hover:-translate-y-1">
                                    <div className="flex items-center gap-5">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 relative group-hover:shadow-xl transition-all duration-700">
                                            <img src={svc.image} alt={svc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-serif text-lg text-stone-900 italic leading-tight">{svc.name}</h3>
                                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-stone-300 mt-2 block">{svc.duration} minutes</span>
                                        </div>
                                    </div>
                                    <div className="font-serif text-xl text-stone-900 border-l border-stone-50 pl-6">CHF {svc.price}</div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-50 pb-8">
                            <div className="text-left">
                                <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Quelle <span className="italic font-light text-stone-400">date</span> ?</h2>
                                <p className="text-stone-400 font-light text-sm mt-1">{displayMonth} {displayYear}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => changeMonth(-1)} className="p-3 border border-stone-100 rounded-xl hover:bg-stone-50 text-stone-400 transition-all"><ChevronLeft size={20} /></button>
                                <button onClick={() => changeMonth(1)} className="p-3 border border-stone-100 rounded-xl hover:bg-stone-50 text-stone-400 transition-all"><ChevronRight size={20} /></button>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-10 rounded-[3rem] border border-stone-50 shadow-2xl shadow-stone-900/5">
                            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
                                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => <div key={d} className="text-[9px] uppercase tracking-widest text-[#B08D57] font-black py-4">{d}</div>)}
                                {(() => {
                                    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
                                    const empty = first === 0 ? 6 : first - 1;
                                    return [...Array(empty)].map((_, i) => <div key={`e-${i}`} />);
                                })()}
                                {[...Array(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate())].map((_, i) => {
                                    const dNum = i + 1;
                                    const dObj = new Date(viewDate.getFullYear(), viewDate.getMonth(), dNum);
                                    const today = new Date(); today.setHours(0,0,0,0);
                                    const dName = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][dObj.getDay()];
                                    const bDay = hours.find(h => h.day === dName);
                                    const iso = `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, "0")}-${String(dNum).padStart(2, "0")}`;
                                    const disabled = dObj < today || !bDay?.isOpen || isDateBlocked(iso);
                                    return (
                                        <button key={i} disabled={disabled} onClick={() => { setBookingData({ ...bookingData, date: iso }); nextStep(); }}
                                            className={cn("aspect-square rounded-2xl flex items-center justify-center text-sm md:text-base transition-all relative",
                                                disabled ? "text-stone-100 cursor-not-allowed" : "hover:bg-[#B08D57]/5 hover:text-[#B08D57] font-serif hover:italic",
                                                bookingData.date === iso ? "bg-stone-900 text-white hover:bg-stone-900 shadow-xl" : "")}>
                                            <span className="relative z-10">{dNum}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <button onClick={prevStep} className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-stone-300 hover:text-stone-900 transition-all"><ChevronLeft size={16} /> Retour</button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">À quelle <span className="italic font-light text-stone-400">heure</span> ?</h2>
                            <p className="text-stone-400 font-light text-sm italic">{new Date(bookingData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {(() => {
                                const dateObj = new Date(bookingData.date);
                                const dayName = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"][dateObj.getDay()];
                                const bDay = hours.find(h => h.day === dayName);
                                if (!bDay || !bDay.isOpen) return <p className="col-span-full text-center text-stone-300 py-12 italic">Indisponible ce jour.</p>;
                                const svc = services.find(s => s.id === bookingData.service);
                                const duration = svc?.duration || 60;
                                const slots = generateTimeSlots(bDay.openTime, bDay.closeTime, bDay.hasBreak, bDay.breakStart, bDay.breakEnd, duration);
                                const taken = appointments.filter(a => a.date === bookingData.date && a.status !== 'cancelled');
                                const available = slots.filter(time => {
                                    const [h, m] = time.split(':').map(Number);
                                    const start = h * 60 + m;
                                    const end = start + duration;
                                    return !taken.some(a => {
                                        const [ah, am] = a.time.split(':').map(Number);
                                        const aSvc = services.find(s => s.id === a.service);
                                        const aDuration = aSvc?.duration || 60;
                                        const aStart = ah * 60 + am;
                                        const aEnd = aStart + aDuration;
                                        return (start < aEnd && end > aStart);
                                    });
                                });
                                if (available.length === 0) return <p className="col-span-full text-center text-stone-300 py-12 italic">Aucune place disponible ce jour.</p>;
                                return available.map(time => (
                                    <button key={time} onClick={() => { setBookingData({ ...bookingData, time }); nextStep(); }}
                                        className={cn("py-6 rounded-3xl border border-stone-50 transition-all duration-700 font-serif text-xl italic hover:scale-105",
                                            bookingData.time === time ? "bg-stone-900 border-stone-900 text-white shadow-2xl" : "bg-white hover:border-stone-200 text-stone-900 shadow-sm")}>
                                        {time}
                                    </button>
                                ));
                            })()}
                        </div>
                        <button onClick={prevStep} className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-stone-300 hover:text-stone-900 transition-all"><ChevronLeft size={16} /> Retour au calendrier</button>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Dernière <span className="italic font-light text-stone-400">étape</span></h2>
                            <p className="text-stone-400 font-light text-sm italic">"Un moment d'exception n'attend que vous."</p>
                        </div>
                        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-stone-50 shadow-2xl shadow-stone-900/5 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { label: "Nom complet", key: "name", type: "text", icon: <User size={14} />, placeholder: "Elisa Palma" },
                                    { label: "Email", key: "email", type: "email", icon: <Mail size={14} />, placeholder: "votre@email.com" },
                                    { label: "Téléphone", key: "phone", type: "tel", icon: <Phone size={14} />, placeholder: "+41 79 000 00 00" },
                                    { label: "Adresse (Optionnel)", key: "address", type: "text", icon: <MapPin size={14} />, placeholder: "Pour le déplacement..." },
                                ].map((field) => (
                                    <div key={field.key} className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-stone-300 font-black ml-1 flex items-center gap-2">
                                            {field.icon} {field.label}
                                        </label>
                                        <input type={field.type} value={bookingData[field.key as keyof typeof bookingData] || ""}
                                            onChange={(e) => setBookingData({ ...bookingData, [field.key]: e.target.value })}
                                            className="w-full bg-stone-50/50 border border-stone-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-inner transition-all"
                                            placeholder={field.placeholder} />
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 bg-stone-50/30 rounded-3xl border border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#B08D57]">Récapitulatif</p>
                                    <p className="font-serif text-xl text-stone-900 italic">
                                        {services.find(s => s.id === bookingData.service)?.name} — {new Date(bookingData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à {bookingData.time}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">Total estimé</p>
                                    <p className="font-serif text-2xl text-stone-900">CHF {services.find(s => s.id === bookingData.service)?.price}.-</p>
                                </div>
                            </div>

                            <button onClick={handleConfirmBooking} disabled={isSubmitting}
                                className={cn("w-full py-6 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full transition-all duration-700 shadow-2xl flex items-center justify-center gap-4",
                                    isSubmitting ? "bg-stone-300 cursor-not-allowed" : "bg-stone-900 hover:bg-[#B08D57] shadow-stone-900/20")}>
                                {isSubmitting ? "Confirmation en cours..." : "Confirmer ma séance"}
                            </button>
                        </div>
                        <button onClick={prevStep} className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-stone-300 hover:text-stone-900 transition-all"><ChevronLeft size={16} /> Modifier l'heure</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
