"use client";

import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function PolitiqueConfidentialitePage() {
    const { settings } = useSiteSettings();

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-background">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="space-y-4">
                    <span className="text-accent-dark text-[10px] uppercase tracking-widest font-black">Confidentialité</span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 leading-tight">Politique de Confidentialité</h1>
                </header>

                <div className="space-y-10 text-stone-600 font-sans leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">1. Introduction</h2>
                        <p>
                            Chez <strong>{settings.studioName}</strong>, la protection de vos données personnelles est une priorité absolue. Cette politique explique comment nous traitons vos informations lors de l'utilisation de notre plateforme de réservation.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">2. Données Collectées</h2>
                        <p>
                            Lorsque vous effectuez une réservation sur notre site, nous collectons les informations suivantes : <br />
                            - Nom et prénom <br />
                            - Adresse email <br />
                            - Numéro de téléphone <br />
                            - Service demandé <br />
                            - Date et heure du rendez-vous
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">3. Utilisation des Données</h2>
                        <p>
                            Vos données sont exclusivement utilisées pour : <br />
                            - Gérer votre réservation et vous envoyer une confirmation. <br />
                            - Vous contacter en cas de modification d'horaire ou d'imprévu. <br />
                            - Créer un historique de vos visites pour un meilleur suivi personnalisé.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">4. Partage des Données</h2>
                        <p>
                            Vos informations personnelles ne seront jamais vendues ni partagées avec des tiers à des fins commerciales. Elles sont uniquement consultées par l'administratrice de {settings.studioName}.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">5. Stockage et Sécurité</h2>
                        <p>
                            Les données sont stockées sur les serveurs sécurisés de <strong>Firebase (Google Cloud)</strong> et l'hébergement du site est assuré par <strong>Vercel</strong>. Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos informations contre tout accès non autorisé.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-serif text-stone-900 border-b border-stone-100 pb-2">6. Vos Droits</h2>
                        <p>
                            Conformément à la protection des données (LPD et RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>{settings.email}</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
