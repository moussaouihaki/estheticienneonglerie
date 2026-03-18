"use client";

import Link from "next/link";
import { Lock, Instagram } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Footer() {
    const { settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-20 px-6 bg-background text-foreground border-t border-accent/10 relative overflow-hidden">
             {/* Subtle background element */}
             <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 opacity-[0.03] rotate-12 pointer-events-none">
                <img src={settings.logo} alt="" className="w-full h-full object-contain" />
             </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

                <div className="flex flex-col items-center md:items-start gap-6">
                        <img 
                            src={settings.logo} 
                            alt={settings.studioName} 
                            className="h-40 w-auto object-contain"
                        />

                    <div className="flex items-center gap-4">
                        {settings.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-accent-dark hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 shadow-sm">
                                <Instagram size={18} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
                    <div 
                        style={{ fontFamily: 'var(--font-caps)' }}
                        className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-10"
                    >
                        <Link href="/" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Accueil</Link>
                        <Link href="/prestations" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Prestations</Link>
                        <Link href="/studio" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">À propos</Link>
                        <Link href="/galerie" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Galerie</Link>
                        <Link href="/avis" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Avis Clients</Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-accent/10 gap-6 w-full mt-10">
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                            &copy; {currentYear} {settings.studioName}.
                        </p>
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                            Fait avec amour par <a href="https://syntalys.ch" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors underline decoration-blue-500/30 underline-offset-4">Syntalys</a> pour Elisa Palma
                        </p>
                        <div className="flex items-center gap-8 text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                            <Link href="/mentions-legales" className="hover:text-stone-900 transition-colors">Légal</Link>
                            <Link href="/politique-de-confidentialite" className="hover:text-stone-900 transition-colors">Confidentialité</Link>
                            <Link
                                href="/admin"
                                className="text-stone-300 hover:text-accent-dark transition-all duration-500"
                                title="Admin"
                            >
                                <Lock size={12} />
                            </Link>
                        </div>
                    </div>
                    
                    <p className="text-[10px] text-stone-400 italic font-medium uppercase tracking-widest pt-4">
                        La Chaux-de-Fonds, Suisse
                    </p>
                </div>

            </div>
        </footer>
    );
}
