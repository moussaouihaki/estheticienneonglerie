"use client";

import { useEffect, useState, use } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Calendar, Clock, AlertCircle, CheckCircle2, Scissors, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function CancelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { settings } = useSiteSettings();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [canCancel, setCanCancel] = useState(false);

    useEffect(() => {
        const fetchAppointment = async () => {
            if (!db) return;
            try {
                const docRef = doc(db, "appointments", id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAppointment(data);
                    
                    // Logic for 24h check
                    const apptDate = new Date(`${data.date}T${data.time}`);
                    const now = new Date();
                    const diffMs = apptDate.getTime() - now.getTime();
                    const diffHours = diffMs / (1000 * 60 * 60);
                    
                    if (diffHours >= 24) {
                        setCanCancel(true);
                    } else if (diffHours < 0) {
                        setError("Ce rendez-vous est déjà passé.");
                    } else {
                        setError("L'annulation est impossible moins de 24h avant le rendez-vous.");
                    }
                } else {
                    setError("Rendez-vous introuvable.");
                }
            } catch (e) {
                console.error(e);
                setError("Erreur lors de la récupération du rendez-vous.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    const handleCancel = async () => {
        setIsCancelling(true);
        try {
            const docRef = doc(db, "appointments", id);
            await updateDoc(docRef, { status: 'cancelled' });
            setIsSuccess(true);
        } catch (e) {
            console.error(e);
            setError("Erreur lors de l'annulation.");
        } finally {
            setIsCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="font-serif animate-pulse text-[#CFC4AC] text-4xl tracking-widest uppercase">Palma</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 relative overflow-hidden">
             {/* Background Decor */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CFC4AC]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-200/20 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
             >
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden relative">
                    <div className="h-2 bg-[#CFC4AC]" />
                    
                    <div className="p-10 md:p-14 space-y-10 text-center">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center">
                                <Scissors className="text-[#CFC4AC]" size={32} strokeWidth={1} />
                            </div>
                        </div>

                        {isSuccess ? (
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <CheckCircle2 className="text-green-500" size={64} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="font-serif text-3xl text-stone-900 tracking-tight">Rendez-vous annulé</h1>
                                    <p className="text-sm text-stone-400 font-light italic">Votre annulation a bien été prise en compte. À bientôt !</p>
                                </div>
                                <div className="pt-6">
                                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#CFC4AC] hover:text-stone-900 transition-colors">
                                        <ArrowLeft size={14} /> Retour à l'accueil
                                    </Link>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <AlertCircle className="text-amber-500" size={64} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="font-serif text-4xl text-stone-900 tracking-tight">{error}</h1>
                                    <p className="text-sm text-stone-400 font-light italic leading-relaxed">
                                        Comme indiqué dans nos conditions, toute annulation doit être faite au moins 24h avant l'heure prévue.
                                    </p>
                                </div>
                                <div className="pt-8">
                                    <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black text-stone-400 hover:text-stone-950 transition-colors">
                                        <ArrowLeft size={16} /> Quitter cette page
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-black">Confirmation d'annulation</p>
                                    <h1 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">Souhaitez-vous vraiment annuler ?</h1>
                                </div>

                                <div className="bg-stone-50 rounded-3xl p-8 space-y-4">
                                    <div className="flex items-center gap-4 text-left">
                                        <Calendar className="text-[#CFC4AC]" size={18} />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Date du rendez-vous</p>
                                            <p className="text-sm font-bold text-stone-800 uppercase tracking-widest">{appointment.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-left">
                                        <Clock className="text-[#CFC4AC]" size={18} />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Heure</p>
                                            <p className="text-sm font-bold text-stone-800 uppercase tracking-widest">{appointment.time}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 pt-4">
                                    <button
                                        onClick={handleCancel}
                                        disabled={isCancelling}
                                        className="w-full py-5 bg-red-600 text-white text-[10px] uppercase tracking-[0.4em] font-black rounded-2xl shadow-xl hover:bg-red-700 transition-all disabled:opacity-50"
                                    >
                                        {isCancelling ? "Annulation..." : "Confirmer l'annulation"}
                                    </button>
                                    <Link
                                        href="/"
                                        className="w-full py-5 bg-stone-100 text-stone-900 text-[10px] uppercase tracking-[0.4em] font-black rounded-2xl hover:bg-stone-200 transition-all"
                                    >
                                        Finalement, non
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">
                    &copy; {new Date().getFullYear()} {settings.studioName}
                </div>
             </motion.div>
        </div>
    );
}
