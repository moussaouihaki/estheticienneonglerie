"use client";

import Link from "next/link";
import { useSiteSettings } from "@/lib/siteSettingsStore";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
    const { settings } = useSiteSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background py-24 px-6 border-t border-stone-200/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    
                    {/* Column 1: Brand & Bio */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block">
                            <img 
                                src={settings.logo} 
                                alt={settings.studioName} 
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-[13px] text-stone-500 leading-relaxed max-w-[240px] font-sans">
                            {settings.description || "Votre studio de bien-être spécialisé dans l'onglerie et le soin de soi. Une expérience unique au cœur de la ville."}
                        </p>
                        <div className="flex items-center gap-5">
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                                    <Instagram size={18} strokeWidth={1.5} />
                                </a>
                            )}
                            <a href={`tel:${settings.phone}`} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                                <Phone size={18} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900">Explorer</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Accueil</Link></li>
                            <li><Link href="/prestations" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Prestations</Link></li>
                            <li><Link href="/a-propos" className="text-[13px] text-stone-500 hover:text-accent transition-colors">À Propos</Link></li>
                            <li><Link href="/galerie" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Galerie</Link></li>
                            <li><Link href="/avis" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Avis</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Admin */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900">Informations</h4>
                        <ul className="space-y-4">
                            <li><Link href="/mentions-legales" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Mentions Légales</Link></li>
                            <li><Link href="/politique-de-confidentialite" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Confidentialité</Link></li>
                            <li><Link href="/admin" className="text-[13px] text-stone-500 hover:text-accent transition-colors">Espace Pro</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Location */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900">Le Studio</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <MapPin size={16} className="text-accent mt-0.5" />
                                <p className="text-[13px] text-stone-500 leading-relaxed font-sans">
                                    {settings.address || "La Chaux-de-Fonds, Suisse"}
                                </p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Mail size={16} className="text-accent mt-0.5" />
                                <p className="text-[13px] text-stone-500 font-sans">
                                    {settings.email || "hello@palmainstitut.ch"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-stone-200/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                        &copy; {currentYear} {settings.studioName}. Tous droits réservés.
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                        Fait avec passion par <a href="https://syntalys.ch" target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-accent transition-colors font-bold">Syntalys</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
