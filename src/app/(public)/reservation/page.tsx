import { BookingFlow } from "@/components/BookingFlow";

export default function ReservationPage() {
    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block mb-4">Réservation</span>
                <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Réserver l'Expérience</h1>
                <p className="max-w-2xl mx-auto text-stone-500 font-light leading-relaxed mb-4">
                    Prenez rendez-vous dès maintenant pour votre prochaine séance.
                    Nous nous assurerons de vous offrir le meilleur de notre art.
                </p>
            </div>
            <BookingFlow />
            <div className="bg-stone-50 py-32 px-6">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-serif mb-12">Informations de <br /><span className="italic font-light">Réservation</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 bg-white shadow-2xl rounded-2xl space-y-4">
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Horaires</span>
                            <p className="text-lg font-serif">Mardi - Samedi<br />10h - 19h</p>
                        </div>
                        <div className="p-10 bg-white shadow-2xl rounded-2xl space-y-4">
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Téléphone</span>
                            <p className="text-lg font-serif">+33 1 23 45 67 89<br />Appel Uniquement</p>
                        </div>
                        <div className="p-10 bg-white shadow-2xl rounded-2xl space-y-4">
                            <span className="text-accent text-xs font-bold tracking-widest uppercase">Engagement</span>
                            <p className="text-lg font-serif">Retard de 15min<br />Annulation de séance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
