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

                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-serif text-3xl tracking-widest uppercase text-accent">{settings.studioName.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500">Nail Art Studio</span>
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
