import { Hero } from "@/components/Hero";

export default function ConceptPage() {
    return (
        <div className="pt-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">Notre Concept</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-12">L'Excellence <br /><span className="italic font-light">du Détail</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-stone-600 font-light leading-relaxed text-lg">
                        <p>
                            Aurelia Studio est né d'une passion pour la précision et l'art de l'onglerie.
                            Nous croyons que vos mains sont le reflet de votre élégance et méritent une attention sans compromis.
                        </p>
                        <p>
                            Notre approche combine les techniques traditionnelles les plus sûres avec les innovations les plus récentes du domaine.
                            Du soin des cuticules à la finition haute brillance, chaque étape est réalisée avec une minutie artisanale.
                        </p>
                        <div className="pt-10 flex gap-10">
                            <div>
                                <span className="block text-4xl font-serif text-accent">100%</span>
                                <span className="text-[10px] uppercase tracking-widest text-stone-500">Précision Suisse</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-serif text-accent">O+</span>
                                <span className="text-[10px] uppercase tracking-widest text-stone-500">Hygiène Normée</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <img src="/images/hero.png" alt="Concept View" className="object-cover w-full h-full hover:scale-110 transition-transform duration-[3s]" />
                    </div>
                </div>
            </div>
            <Hero />
        </div>
    );
}
