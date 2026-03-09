import { Services } from "@/components/Services";

export default function ServicesPage() {
    return (
        <div className="pt-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">Nos Prestations</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Le Luxe à Portée de Main</h1>
                <p className="max-w-2xl mx-auto text-stone-500 font-light leading-relaxed mb-16">
                    Chaque soin est conçu pour offrir une parenthèse enchantée.
                    De la manucure russe aux poses Gel-X les plus sophistiquées,
                    nous utilisons exclusivement des produits de prestige pour garantir la santé de vos ongles.
                </p>
            </div>
            <Services />
        </div>
    );
}
