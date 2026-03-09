"use client";

import { useState } from "react";
import { Save, Clock, CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import { useBusinessHours } from "@/lib/businessHoursStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SettingsPage() {
    const [studioName, setStudioName] = useState("Aurélia Nail Studio");
    const [phone, setPhone] = useState("+41 79 123 45 67");
    const [email, setEmail] = useState("hello@aurelianails.ch");
    const [address, setAddress] = useState("Rue du Luxe 15, 1201 Genève");
    const [saved, setSaved] = useState(false);

    const { hours, updateDay } = useBusinessHours();

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-4xl space-y-10 pb-20">

            {/* Studio info */}
            <div className="bg-white border border-stone-100 rounded-3xl shadow-sm p-10 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-stone-50 text-stone-400">
                        <CalendarDays size={18} />
                    </div>
                    <h3 className="font-serif text-xl text-stone-900">Informations du Studio</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                        { label: "Nom du studio", value: studioName, setter: setStudioName },
                        { label: "Téléphone", value: phone, setter: setPhone },
                        { label: "Email de contact", value: email, setter: setEmail },
                        { label: "Adresse", value: address, setter: setAddress },
                    ].map(({ label, value, setter }) => (
                        <div key={label} className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-stone-400">{label}</label>
                            <input
                                value={value}
                                onChange={e => setter(e.target.value)}
                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57] transition-all bg-white hover:border-stone-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Hours */}
            <div className="bg-white border border-stone-100 rounded-3xl shadow-sm p-10 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-stone-50 text-stone-400">
                        <Clock size={18} />
                    </div>
                    <h3 className="font-serif text-xl text-stone-900">Horaires d'Ouverture</h3>
                </div>

                <p className="text-xs text-stone-400 max-w-lg">
                    Définissez vos horaires pour chaque jour de la semaine. Les jours désactivés ne seront pas disponibles pour la réservation en ligne.
                </p>

                <div className="space-y-3">
                    {hours.map((item) => (
                        <div key={item.day} className={cn(
                            "group flex items-center justify-between p-4 rounded-2xl border transition-all",
                            item.isOpen ? "bg-white border-stone-100 shadow-sm" : "bg-stone-50 border-stone-100 opacity-60"
                        )}>
                            <div className="flex items-center gap-4 min-w-[120px]">
                                <button
                                    onClick={() => updateDay(item.day, { isOpen: !item.isOpen })}
                                    className={cn(
                                        "w-10 h-6 rounded-full relative transition-colors duration-300",
                                        item.isOpen ? "bg-[#B08D57]" : "bg-stone-300"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300",
                                        item.isOpen ? "translate-x-4" : "translate-x-0"
                                    )} />
                                </button>
                                <span className={cn("text-sm font-bold", item.isOpen ? "text-stone-900" : "text-stone-400")}>
                                    {item.day}
                                </span>
                            </div>

                            {item.isOpen ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-[9px] uppercase tracking-widest text-stone-300 font-bold">De</label>
                                        <input
                                            type="time"
                                            value={item.openTime}
                                            onChange={(e) => updateDay(item.day, { openTime: e.target.value })}
                                            className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#B08D57]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-[9px] uppercase tracking-widest text-stone-300 font-bold">À</label>
                                        <input
                                            type="time"
                                            value={item.closeTime}
                                            onChange={(e) => updateDay(item.day, { closeTime: e.target.value })}
                                            className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#B08D57]"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <span className="text-[10px] uppercase tracking-widest font-black text-rose-300">Fermé</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button Overlay (fixed bottom right for convenience or just here) */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    className={cn(
                        "flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 shadow-2xl",
                        saved ? "bg-emerald-500 text-white" : "bg-stone-950 text-white hover:bg-[#B08D57] hover:scale-[1.02]"
                    )}
                >
                    {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
                    {saved ? "Modifications enregistrées" : "Enregistrer les réglages"}
                </button>
            </div>
        </div>
    );
}
