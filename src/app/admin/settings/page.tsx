"use client";

import { useState, useRef } from "react";
import { Save, Clock, CalendarDays, CheckCircle2, XCircle, Upload, Plus, Smartphone, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useBusinessHours } from "@/lib/businessHoursStore";
import { useSiteSettings } from "@/lib/siteSettingsStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SettingsPage() {
    const { settings, updateSettings, loading: settingsLoading } = useSiteSettings();
    const [saved, setSaved] = useState(false);
    const { hours, updateDay, loading: hoursLoading } = useBusinessHours();
    const heroFileRef = useRef<HTMLInputElement>(null);
    const logoFileRef = useRef<HTMLInputElement>(null);
    const aboutFileRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (settingsLoading || hoursLoading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-stone-100 border-t-[#B08D57] rounded-full animate-spin" />
        </div>
    );

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

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            updateSettings({ logo: result });
        };
        reader.readAsDataURL(file);
    };

    const handleAboutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            updateSettings({ aboutImage: result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="max-w-4xl space-y-10 pb-24">

            {/* Visuals */}
            <div className="bg-white border border-stone-100 rounded-[2.5rem] shadow-xl p-7 md:p-10 space-y-10">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-stone-50 text-[#B08D57] shadow-inner">
                        <CalendarDays size={20} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="font-serif text-xl md:text-2xl text-stone-900 italic">Identité Visuelle</h3>
                        <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-300 font-black">Personnalisez votre vitrine digitale</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4 w-full lg:w-44">
                        <div
                            onClick={() => heroFileRef.current?.click()}
                            className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl bg-stone-50 relative group cursor-pointer"
                        >
                            <img src={settings.heroImage} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus size={32} className="text-stone-900" />
                            </div>
                        </div>
                        <p className="text-[7px] uppercase tracking-widest text-stone-300 font-bold text-center">Hero</p>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full lg:w-44">
                        <div
                            onClick={() => aboutFileRef.current?.click()}
                            className="w-full aspect-square rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl bg-stone-50 relative group cursor-pointer"
                        >
                            <img src={settings.aboutImage || "/images/elisa.png"} alt="About Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus size={32} className="text-stone-900" />
                            </div>
                        </div>
                        <p className="text-[7px] uppercase tracking-widest text-stone-300 font-bold text-center">Photo Elisa</p>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full lg:w-44">
                        <div
                            onClick={() => logoFileRef.current?.click()}
                            className="w-full aspect-square rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl bg-white relative group cursor-pointer p-4 flex items-center justify-center"
                        >
                            <img src={settings.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain transition-opacity group-hover:opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus size={32} className="text-stone-900" />
                            </div>
                        </div>
                        <p className="text-[7px] uppercase tracking-widest text-stone-300 font-bold text-center">Logo</p>
                    </div>

                    <div className="flex-1 space-y-5 pt-4">
                        <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-light italic">
                            "L'identité visuelle de votre studio est la première chose que vos clients verront. Assurez-vous d'utiliser une photo chaleureuse pour la section 'À Propos'."
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => heroFileRef.current?.click()}
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-stone-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10"
                            >
                                <Upload size={14} /> Hero
                            </button>
                            <button
                                onClick={() => aboutFileRef.current?.click()}
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-stone-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10"
                            >
                                <Upload size={14} /> Photo
                            </button>
                            <button
                                onClick={() => logoFileRef.current?.click()}
                                className="flex items-center justify-center gap-3 px-6 py-4 border border-stone-200 text-stone-700 bg-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-stone-50 transition-all shadow-xl"
                            >
                                <Upload size={14} /> Logo
                            </button>
                        </div>
                        <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
                        <input ref={logoFileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                        <input ref={aboutFileRef} type="file" accept="image/*" className="hidden" onChange={handleAboutUpload} />
                    </div>
                </div>
            </div>

            {/* Studio info */}
            <div className="bg-white border border-stone-100 rounded-[2.5rem] shadow-xl p-7 md:p-10 space-y-10">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-stone-50 text-[#B08D57] shadow-inner">
                        <Smartphone size={20} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="font-serif text-xl md:text-2xl text-stone-900 italic">Informations Studio</h3>
                        <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-300 font-black">Coordonnées et réseaux sociaux</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                        { label: "Nom du studio", key: "studioName", icon: <MapPin size={12} /> },
                        { label: "Instagram", key: "instagram", icon: <Instagram size={12} />, placeholder: "@votrecompte" },
                        { label: "Téléphone", key: "phone", icon: <Phone size={12} /> },
                        { label: "Email", key: "email", icon: <Mail size={12} /> },
                        { label: "Adresse complète", key: "address", icon: <MapPin size={12} /> },
                    ].map(({ label, key, placeholder, icon }) => (
                        <div key={label} className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1 flex items-center gap-1.5">
                                {icon} {label}
                            </label>
                            <input
                                value={settings[key as keyof typeof settings] || ""}
                                onChange={e => updateSettings({ [key]: e.target.value })}
                                placeholder={placeholder}
                                className="w-full border border-stone-50 bg-stone-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-inner transition-all"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Hours */}
            <div className="bg-white border border-stone-100 rounded-[2.5rem] shadow-xl p-7 md:p-10 space-y-10">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-stone-50 text-[#B08D57] shadow-inner">
                        <Clock size={20} />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="font-serif text-xl md:text-2xl text-stone-900 italic">Disponibilités</h3>
                        <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-300 font-black">Vos horaires hebdomadaires</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {hours.map((item) => (
                        <div key={item.day} className={cn(
                            "flex flex-col lg:flex-row lg:items-center gap-6 p-6 md:p-8 rounded-[2rem] border transition-all",
                            item.isOpen ? "bg-white border-stone-50 shadow-sm" : "bg-stone-50/30 border-transparent opacity-60"
                        )}>
                            <div className="flex items-center justify-between lg:justify-start lg:gap-8 lg:min-w-[180px]">
                                <span className={cn("text-base font-bold", item.isOpen ? "text-stone-900" : "text-stone-300")}>
                                    {item.day}
                                </span>
                                <button
                                    onClick={() => updateDay(item.day, { isOpen: !item.isOpen })}
                                    className={cn(
                                        "w-12 h-6.5 rounded-full relative transition-colors duration-300",
                                        item.isOpen ? "bg-stone-900" : "bg-stone-100 shadow-inner"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-300 shadow-sm",
                                        item.isOpen ? "translate-x-5.5" : "translate-x-0"
                                    )} />
                                </button>
                            </div>

                            {item.isOpen ? (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-8 flex-1 pt-6 lg:pt-0 border-t lg:border-t-0 border-stone-50">
                                    <div className="flex items-center gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[7px] uppercase tracking-widest text-stone-300 font-black ml-1">Début</p>
                                            <input type="time" value={item.openTime} onChange={(e) => updateDay(item.day, { openTime: e.target.value })}
                                                className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-xs font-bold text-stone-800 shadow-inner focus:outline-none focus:border-[#B08D57]" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[7px] uppercase tracking-widest text-stone-300 font-black ml-1">Fin</p>
                                            <input type="time" value={item.closeTime} onChange={(e) => updateDay(item.day, { closeTime: e.target.value })}
                                                className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-xs font-bold text-stone-800 shadow-inner focus:outline-none focus:border-[#B08D57]" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 sm:pl-8 sm:border-l border-stone-100">
                                        <div className="flex items-center gap-2.5">
                                            <input type="checkbox" id={`break-${item.day}`} checked={item.hasBreak} onChange={e => updateDay(item.day, { hasBreak: e.target.checked })}
                                                className="w-4.5 h-4.5 rounded-lg border-stone-200 text-stone-900 focus:ring-stone-900 transition-all cursor-pointer" />
                                            <label htmlFor={`break-${item.day}`} className="text-[9px] uppercase tracking-widest text-stone-400 font-black cursor-pointer bg-stone-100/50 px-2 py-1 rounded-md">Pause</label>
                                        </div>
                                        {item.hasBreak && (
                                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500">
                                                <input type="time" value={item.breakStart} onChange={(e) => updateDay(item.day, { breakStart: e.target.value })}
                                                    className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-xs font-bold text-stone-800 shadow-inner focus:outline-none focus:border-[#B08D57]" />
                                                <span className="text-[8px] text-stone-200 font-bold">→</span>
                                                <input type="time" value={item.breakEnd} onChange={(e) => updateDay(item.day, { breakEnd: e.target.value })}
                                                    className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-xs font-bold text-stone-800 shadow-inner focus:outline-none focus:border-[#B08D57]" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-[9px] uppercase tracking-[0.4em] font-black text-rose-200 pt-2 lg:pt-0 italic">Journée non réservable</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Save */}
            <div className="fixed bottom-8 right-8 z-40 md:static md:flex md:justify-end">
                <button
                    onClick={handleSave}
                    className={cn(
                        "flex items-center gap-3 px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
                        saved ? "bg-emerald-500 text-white" : "bg-stone-900 text-white hover:bg-[#B08D57] hover:scale-[1.05]"
                    )}
                >
                    {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                    {saved ? "Modifications enregistrées" : "Enregistrer tout"}
                </button>
            </div>
        </div>
    );
}
