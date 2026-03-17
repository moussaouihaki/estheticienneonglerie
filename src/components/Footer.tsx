"use client";

import Link from "next/link";
import { Heart, Lock, Instagram } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Footer() {
    const { settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-20 px-6 bg-background text-foreground border-t border-accent/10 relative overflow-hidden">
             {/* Subtle background element */}
             <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 opacity-[0.03] rotate-12 pointer-events-none">
                <img src="/logo.png" alt="" className="w-full h-full object-contain" />
             </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span 
                            style={{ color: '#805836' }}
                            className="font-serif text-3xl tracking-wide"
                        >
                            Palma Institut
                        </span>
                        <span 
                            style={{ fontFamily: 'var(--font-caps)', color: '#000000', letterSpacing: '0.4em' }}
                            className="text-[10px] uppercase ml-1"
                        >
                            Beauty Salon
                        </span>
                    </div>

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

                    <div className="flex flex-col items-center md:items-end gap-3 text-xs font-light text-stone-500 tracking-wide">
                        <div className="flex items-center gap-1">
                            © {currentYear} {settings.studioName}. Fait avec  
                            <Heart size={14} className="text-secondary fill-accent animate-pulse mx-1" /> 
                            pour Elisa Palma.
                        </div>
                        <p className="text-[10px] text-stone-400 italic font-medium uppercase tracking-widest border-t border-accent/5 pt-3">
                            La Chaux-de-Fonds, Suisse
                        </p>
                        
                        <Link
                            href="/admin"
                            className="bg-white text-stone-300 hover:text-accent-dark transition-all duration-500 mt-6 p-4 rounded-full shadow-sm border border-accent/10 flex items-center justify-center group"
                            title="Espace Administration"
                        >
                            <Lock size={14} className="group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
