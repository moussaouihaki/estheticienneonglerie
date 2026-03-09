export default function StudioPage() {
    return (
        <div className="pt-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">Le Studio</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-8 italics">L'Écrin de Beauté</h1>
                <p className="max-w-2xl mx-auto text-stone-500 font-light leading-relaxed mb-16">
                    Nous vous accueillons dans un cadre chic et minimaliste,
                    conçu pour votre confort et votre détente absolue.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left max-w-4xl mx-auto mb-20">
                    <div className="p-10 bg-white border border-stone-100 rounded-2xl shadow-sm">
                        <h3 className="font-serif text-2xl mb-4">Notre adresse</h3>
                        <p className="text-stone-500 font-light italic">
                            15 Rue du Luxe<br />
                            75008 Paris<br />
                            France
                        </p>
                    </div>
                    <div className="p-10 bg-white border border-stone-100 rounded-2xl shadow-sm">
                        <h3 className="font-serif text-2xl mb-4">Accès</h3>
                        <p className="text-stone-500 font-light text-sm space-y-2">
                            <span className="block">• Métro Ligne 1, 8, 12: Station Concorde</span>
                            <span className="block">• Parking disponible à proximité (Parking Indigo Place de la Concorde)</span>
                        </p>
                    </div>
                </div>

                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 max-w-5xl mx-auto">
                    <img
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                        alt="Studio Location"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-900/20" />
                    <div className="absolute bottom-10 left-10 text-white text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80 mb-2 block">Lieu de Prestige</span>
                        <h4 className="text-3xl font-serif">Au coeur du Triangle d'Or</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
