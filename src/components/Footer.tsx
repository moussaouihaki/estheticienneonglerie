"use client";

import Link from "next/link";
import { Heart, Lock } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Footer() {
    const { settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-20 px-6 bg-stone-950 text-white border-t border-stone-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-serif text-3xl tracking-widest uppercase text-accent">{settings.studioName.split(' ')[0]}</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500">Nail Art Studio</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {settings.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-accent transition-all duration-500">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        )}
                        {settings.tiktok && (
                            <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-accent transition-all duration-500">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.59 3.84-1.78 5.4-1.35 1.77-3.4 2.92-5.59 3.08-2.19.14-4.43-.45-6.12-1.89-1.79-1.51-2.79-3.79-2.69-6.12.06-2.22 1-4.38 2.68-5.83 1.58-1.37 3.66-2.02 5.74-1.92v4.02c-1.05-.09-2.13.16-3.03.73-.77.49-1.34 1.29-1.48 2.19-.11.8.06 1.64.48 2.32.48.78 1.28 1.34 2.17 1.54 1.26.28 2.65-.08 3.52-1.02.6-.63.92-1.47.89-2.33-.01-2.31 0-4.63 0-6.95z" /></svg>
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-8 mb-4">
                        <Link href="/" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-white transition-colors">Accueil</Link>
                        <Link href="/concept" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-white transition-colors">Concept</Link>
                        <Link href="/services" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-white transition-colors">Services</Link>
                        <Link href="/galerie" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-white transition-colors">Galerie</Link>
                        <Link href="/reservation" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-white transition-colors">Réservation</Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 text-xs font-light text-stone-500 tracking-wide">
                        <div>
                            © {currentYear} {settings.studioName}. Conçu avec <Heart size={12} className="text-accent fill-accent inline mx-1 animate-pulse" /> en Suisse.
                        </div>
                        <p className="text-[10px] text-stone-600 italic">Précision & Élégance à chaque pose.</p>
                        <Link
                            href="/admin"
                            className="bg-stone-900 text-accent hover:bg-accent hover:text-white transition-all duration-500 mt-6 p-3 rounded-full shadow-lg border border-accent/20 flex items-center justify-center"
                            title="Administration"
                        >
                            <Lock size={16} />
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
