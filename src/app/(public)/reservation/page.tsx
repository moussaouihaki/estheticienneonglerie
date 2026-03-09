"use client";

import { BookingFlow } from "@/components/BookingFlow";
import { useSiteSettings } from "@/lib/siteSettingsStore";
import { useBusinessHours } from "@/lib/businessHoursStore";

export default function ReservationPage() {
    const { settings } = useSiteSettings();
    const { hours } = useBusinessHours();

    // Logic to format business days (e.g., "Mardi - Samedi")
    const openDays = hours.filter(h => h.isOpen);
    const dayLabels = openDays.length > 0
        ? `${openDays[0].day} — ${openDays[openDays.length - 1].day}`
        : "Sur rendez-vous";

    // Logic to get typical hours (using first open day as reference)
    const firstDay = openDays[0];
    const hourLabel = firstDay
        ? `${firstDay.openTime.replace(':', 'h')} — ${firstDay.closeTime.replace(':', 'h')}`
        : "";

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">Réservation</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Réserver l'Expérience</h1>
                <p className="max-w-2xl mx-auto text-stone- Stone-500 font-light leading-relaxed mb-4">
                    Prenez rendez-vous dès maintenant pour votre prochaine séance.
                    Nous nous assurerons de vous offrir le meilleur de notre art.
                </p>
            </div>

            <BookingFlow />

            <div className="bg-stone-50 py-32 px-6">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-serif mb-12">Informations de <br /><span className="italic font-light">Réservation</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 bg-white shadow-2xl rounded-2xl space-y-4 border border-stone-100">
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Horaires</span>
                            <div className="space-y-1">
                                <p className="text-lg font-serif text-stone-900">{dayLabels}</p>
                                <p className="text-sm font-light text-stone-500">{hourLabel}</p>
                            </div>
                        </div>
                        <div className="p-10 bg-white shadow-2xl rounded-2xl space-y-4 border border-stone-100">
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Téléphone</span>
                            <div className="space-y-1">
                                <p className="text-lg font-serif text-stone-900">{settings.phone}</p>
                                <p className="text-sm font-light text-stone-500">Appel ou WhatsApp</p>
                            </div>
                        </div>
                        <div className="p-10 bg-white shadow-2xl rounded-2xl space-y-4 border border-stone-100">
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Engagement</span>
                            <div className="space-y-1">
                                <p className="text-lg font-serif text-stone-900">Retard de 15min</p>
                                <p className="text-sm font-light text-stone-500">Annulation automatique</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
