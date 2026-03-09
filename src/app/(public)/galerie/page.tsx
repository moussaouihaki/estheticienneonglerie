import { Portfolio } from "@/components/Portfolio";

export default function GaleriePage() {
    return (
        <div className="pt-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">La Galerie d'Art</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-8">Reflets de la <br /><span className="italic font-light">Perfection</span></h1>
                <p className="max-w-2xl mx-auto text-stone-500 font-light leading-relaxed mb-16">
                    Une sélection de nos poses les plus emblématiques.
                    Laissez-vous inspirer par nos créations pour choisir votre prochain style.
                </p>
            </div>
            <Portfolio />
        </div>
    );
}
