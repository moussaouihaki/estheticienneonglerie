import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <div className="bg-stone-50 py-40 px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-serif mb-12 italic">Une Expérience Unique</h2>
                <p className="max-w-3xl mx-auto text-xl text-stone-500 font-light leading-relaxed">
                    Découvrez notre studio où chaque détail est pensé pour votre bien-être.
                    Situé au cœur de la ville, nous vous accueillons dans un cadre luxueux et serein.
                </p>
                <div className="mt-16 flex justify-center gap-8">
                    <div className="text-center">
                        <span className="block text-4xl font-serif text-accent">10+</span>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400">Années d'Art</span>
                    </div>
                    <div className="w-px h-12 bg-stone-200" />
                    <div className="text-center">
                        <span className="block text-4xl font-serif text-accent">100%</span>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400">Qualité Suisse</span>
                    </div>
                </div>
            </div>
            <Services />
            <Portfolio />
        </div>
    );
}
