"use client";

import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function ConceptPage() {
    const { settings } = useSiteSettings();

    return (
        <div className="pt-24 min-h-screen bg-stone-50/50">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">L'Essence Aurelia</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-12 text-stone-900 leading-[0.9]">L'Excellence <br /><span className="italic font-light text-stone-400">du Détail</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8 text-stone-600 font-light leading-relaxed text-xl">
                        <p>
                            {settings.studioName} est né d'une vision : transformer l'onglerie en une expérience de haute couture.
                            Dans notre sanctuaire genevois, nous ne faisons pas que des soins, nous sculptons l'élégance.
                        </p>
                        <p>
                            Notre approche combine la rigueur technologique suisse avec une sensibilité artistique sans pareille.
                            Chaque cliente bénéficie d'un diagnostic personnalisé et d'un protocole d'hygiène de grade hospitalier, pour une beauté sans compromis.
                        </p>
                        <div className="pt-10 flex gap-12 border-t border-stone-200">
                            <div>
                                <span className="block text-5xl font-serif text-[#B08D57]">100%</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-black">Précision Artisanale</span>
                            </div>
                            <div>
                                <span className="block text-5xl font-serif text-[#B08D57]">O+</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-black">Hygiène Certifiée</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
                        <img
                            src={settings.heroImage}
                            alt="Concept View"
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[10s] ease-out"
                        />
                        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute top-10 right-10 w-24 h-24 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white text-[10px] uppercase tracking-widest font-bold">Luxe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
