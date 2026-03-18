"use client";

import Link from "next/link";
import { Lock, Instagram } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Footer() {
    const { settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-6 bg-background text-foreground border-t border-accent/10 relative overflow-hidden">
             {/* Subtle background element */}
             <div className="absolute right-[-2%] bottom-[-2%] w-32 h-32 opacity-[0.02] rotate-12 pointer-events-none">
                <img src={settings.logo} alt="" className="w-full h-full object-contain" />
             </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

                <div className="flex flex-col items-center md:items-start gap-3">
                    <img 
                        src={settings.logo} 
                        alt={settings.studioName} 
                        className="h-16 w-auto object-contain"
                    />
                </div>

                <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
                    <div 
                        style={{ fontFamily: 'var(--font-caps)' }}
                        className="flex flex-wrap justify-center md:justify-end gap-5 md:gap-8"
                    >
                        <Link href="/" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Accueil</Link>
                        <Link href="/prestations" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Prestations</Link>
                        <Link href="/studio" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">À propos</Link>
                        <Link href="/galerie" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Galerie</Link>
                        <Link href="/avis" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-accent-dark transition-colors font-bold">Avis Clients</Link>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-accent/5 gap-4 w-full mt-2">
                        <p className="text-[8px] uppercase tracking-widest text-stone-300 font-bold">
                            &copy; {currentYear} {settings.studioName}.
                        </p>
                        <p className="text-[8px] uppercase tracking-widest text-stone-300 font-bold">
                            Fait avec amour par <a href="https://syntalys.ch" target="_blank" rel="noopener noreferrer" className="text-blue-400/60 hover:text-blue-500 transition-colors underline decoration-blue-400/20 underline-offset-4">Syntalys</a> pour Elisa Palma
                        </p>
                        <div className="flex items-center gap-5 text-[8px] uppercase tracking-[0.2em] text-stone-300 font-bold">
                            <Link href="/mentions-legales" className="hover:text-stone-900 transition-colors">Légal</Link>
                            <Link href="/politique-de-confidentialite" className="hover:text-stone-900 transition-colors">Confidentialité</Link>
                            <Link
                                href="/admin"
                                className="text-stone-200 hover:text-accent-dark transition-all duration-300"
                                title="Admin"
                            >
                                <Lock size={10} />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
