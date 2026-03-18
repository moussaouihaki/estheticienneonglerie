"use client";

import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function MentionsLegalesPage() {
    const { settings } = useSiteSettings();

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-background">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="space-y-4">
                    <span className="text-accent-dark text-[10px] uppercase tracking-widest font-black">Légal</span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 leading-tight">Mentions Légales</h1>
                </header>

                <div className="space-y-10 text-stone-600 font-sans leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">1. Éditeur de l'Application</h2>
                        <p>
                            L'application "Palma Institut" est éditée par :<br />
                            <strong>{settings.studioName}</strong><br />
                            Responsable : Elisa Palma<br />
                            Adresse : {settings.address}<br />
                            Email : {settings.email}<br />
                            Téléphone : {settings.phone}
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">2. Hébergement</h2>
                        <p>
                            Ce site est hébergé par :<br />
                            <strong>Vercel Inc.</strong><br />
                            440 N Barranca Ave #4133<br />
                            Covina, CA 91723<br />
                            États-Unis
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">3. Développement et Design</h2>
                        <p>
                            Design et Développement : <br />
                            <strong>Syntalys</strong><br />
                            Site web : <a href="https://syntalys.ch" className="text-blue-500 underline decoration-blue-500/30">syntalys.ch</a>
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">4. Propriété Intellectuelle</h2>
                        <p>
                            L'ensemble des éléments constituant ce site (textes, graphismes, logos, photos, images, etc.) sont la propriété exclusive de {settings.studioName} ou de leurs auteurs respectifs. Toute reproduction, même partielle, est interdite sans autorisation préalable.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
