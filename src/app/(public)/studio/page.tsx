"use client";

import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function StudioPage() {
    const { settings } = useSiteSettings();

    return (
        <div className="pt-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">Le Studio</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-8 italics text-stone-900">L'Écrin de Beauté</h1>
                <p className="max-w-2xl mx-auto text-stone-500 font-light leading-relaxed mb-16">
                    Nous vous accueillons dans un cadre chic et minimaliste au cœur de {settings.address.split(',')[1]?.trim() || 'Suisse'},
                    conçu pour votre confort et votre détente absolue.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left max-w-4xl mx-auto mb-20">
                    <div className="p-10 bg-white border border-stone-100 rounded-2xl shadow-sm">
                        <h3 className="font-serif text-2xl mb-4 text-stone-900">Notre adresse</h3>
                        <p className="text-stone-500 font-light italic whitespace-pre-line leading-relaxed">
                            {settings.address}
                        </p>
                    </div>
                    <div className="p-10 bg-white border border-stone-100 rounded-2xl shadow-sm">
                        <h3 className="font-serif text-2xl mb-4 text-stone-900">Accès & Contact</h3>
                        <p className="text-stone-500 font-light text-sm space-y-3">
                            <span className="block">• Accès privilégié en centre-ville</span>
                            <span className="block">• Téléphone : {settings.phone}</span>
                            <span className="block">• Email : {settings.email}</span>
                        </p>
                    </div>
                </div>

                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 max-w-5xl mx-auto group">
                    <img
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                        alt="Studio Location"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]"
                    />
                    <div className="absolute inset-0 bg-stone-900/20" />
                    <div className="absolute bottom-10 left-10 text-white text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80 mb-2 block text-accent">Lieu de Prestige</span>
                        <h4 className="text-3xl font-serif">{settings.studioName}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
