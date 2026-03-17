"use client";

import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function ConceptPage() {
    const { settings } = useSiteSettings();

    return (
        <div className="pt-24 min-h-screen bg-background relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute right-[-10%] top-[10%] w-[500px] h-[500px] opacity-[0.02] rotate-12 pointer-events-none">
                <img src="/gingko-pattern.png" alt="" className="w-full h-full object-contain" />
             </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <span className="text-accent-dark text-[10px] font-bold uppercase tracking-[0.5em] block mb-6">L'Essence Palma</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-12 text-foreground leading-[0.9]">L'Excellence <br /><span className="italic font-light text-accent-dark/60">du Détail</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 text-stone-500 font-sans tracking-wide leading-relaxed text-xl">
                        <p>
                            {settings.studioName} est né d'une vision : transformer l'onglerie en une expérience de haute couture.
                            Dans mon studio à La Chaux-de-Fonds, chaque soin est une sculpture de l'élégance.
                        </p>
                        <p>
                            Mon approche combine la rigueur technologique suisse avec une sensibilité artistique sans pareille.
                            Chaque client bénéficie d'un diagnostic personnalisé et d'un protocole d'hygiène irréprochable, pour une beauté sans compromis.
                        </p>
                        <div className="pt-10 flex gap-16 border-t border-accent/10">
                            <div>
                                <span className="block text-5xl font-serif text-accent-dark font-light italic">100%</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] text-accent-dark/40 font-black">Précision Artisane</span>
                            </div>
                            <div>
                                <span className="block text-5xl font-serif text-accent-dark font-light italic">Or</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] text-accent-dark/40 font-black">Hygiène Certifiée</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group border border-accent/5">
                        <img
                            src="/images/hero.png"
                            alt="Concept View"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[10s] ease-out"
                        />
                        <div className="absolute inset-0 bg-accent-dark/5 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute top-10 right-10 w-24 h-24 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                            <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Luxe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
