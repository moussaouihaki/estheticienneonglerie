"use client";

import { useState, useRef } from "react";
import { Save, Clock, CalendarDays, CheckCircle2, XCircle, Upload, Plus } from "lucide-react";
import { useBusinessHours } from "@/lib/businessHoursStore";
import { useSiteSettings } from "@/lib/siteSettingsStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SettingsPage() {
    const { settings, updateSettings } = useSiteSettings();
    const [saved, setSaved] = useState(false);
    const { hours, updateDay } = useBusinessHours();
    const heroFileRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            updateSettings({ heroImage: result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="max-w-4xl space-y-10 pb-20">

            {/* Visuals & Theme */}
            <div className="bg-white border border-stone-100 rounded-3xl shadow-sm p-10 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-stone-50 text-stone-400">
                        <CalendarDays size={18} />
                    </div>
                    <h3 className="font-serif text-xl text-stone-900">Visuels du Site</h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[9px] uppercase tracking-[0.2em] font-black text-stone-400">Photo de la page d'accueil (Hero)</label>
                        <div className="flex gap-8 items-start">
                            <div
                                onClick={() => heroFileRef.current?.click()}
                                className="w-48 aspect-[4/5] rounded-2xl overflow-hidden border border-stone-200 shadow-lg flex-shrink-0 bg-stone-50 relative group cursor-pointer"
                            >
                                <img src={settings.heroImage} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-40" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus size={32} className="text-stone-900" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <p className="text-xs text-stone-500 leading-relaxed font-light">
                                    Cette photo est la première chose que vos clientes voient. <br />
                                    Utilisez une image de haute qualité au format portrait (4:5).
                                </p>

                                <input
                                    ref={heroFileRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleHeroUpload}
                                />

                                <button
                                    onClick={() => heroFileRef.current?.click()}
                                    className="flex items-center gap-2 px-6 py-3 border border-stone-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-600 hover:bg-stone-50 transition-all"
                                >
                                    <Upload size={14} /> Télécharger une nouvelle photo
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-100/50">
                        <p className="text-[10px] text-amber-700 font-medium italic">Astuce : Si vous changez de collection ou de saison, changez simplement la photo pour rafraîchir l'accueil de votre site.</p>
                    </div>
                </div>
            </div>

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
                        { label: "Nom du studio", key: "studioName" },
                        { label: "Téléphone", key: "phone" },
                        { label: "Email de contact", key: "email" },
                        { label: "Adresse", key: "address" },
                        { label: "Lien Instagram", key: "instagram", placeholder: "https://instagram.com/..." },
                        { label: "Lien TikTok", key: "tiktok", placeholder: "https://tiktok.com/@..." },
                    ].map(({ label, key, placeholder }) => (
                        <div key={label} className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-stone-400">{label}</label>
                            <input
                                value={settings[key as keyof typeof settings] || ""}
                                onChange={e => updateSettings({ [key]: e.target.value })}
                                placeholder={placeholder}
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
                                <div className="flex items-center gap-6 flex-1 justify-end">
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

                                    {/* Break Section */}
                                    <div className="flex items-center gap-4 pl-6 border-l border-stone-100">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`break-${item.day}`}
                                                checked={item.hasBreak}
                                                onChange={e => updateDay(item.day, { hasBreak: e.target.checked })}
                                                className="w-3.5 h-3.5 rounded border-stone-300 text-[#B08D57] focus:ring-[#B08D57]"
                                            />
                                            <label htmlFor={`break-${item.day}`} className="text-[9px] uppercase tracking-widest text-stone-400 font-black cursor-pointer">Pause midi</label>
                                        </div>
                                        {item.hasBreak && (
                                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                                <input
                                                    type="time"
                                                    value={item.breakStart}
                                                    onChange={(e) => updateDay(item.day, { breakStart: e.target.value })}
                                                    className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#B08D57]"
                                                />
                                                <span className="text-[9px] text-stone-300 uppercase font-bold">à</span>
                                                <input
                                                    type="time"
                                                    value={item.breakEnd}
                                                    onChange={(e) => updateDay(item.day, { breakEnd: e.target.value })}
                                                    className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#B08D57]"
                                                />
                                            </div>
                                        )}
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
