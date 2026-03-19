"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useReviews } from "@/lib/reviewsStore";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

export default function AvisPage() {
    const { reviews, addReview } = useReviews();
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: "", text: "", rating: 5 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addReview(formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", text: "", rating: 5 });
        }, 3000);
    };

    return (
        <div className="min-h-screen pt-40 md:pt-60 pb-0 relative overflow-hidden">

            {/* Header - Beige */}
            <div className="bg-background py-20 px-6">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div {...fadeUp(0)} className="text-center">
                        <span style={{ fontFamily: 'var(--font-caps)' }} className="text-[10px] uppercase tracking-[0.5em] text-stone-700 block mb-4">
                            L'expérience Palma
                        </span>
                        <h1 className="text-6xl md:text-8xl font-serif text-stone-900 leading-[1.1]">
                            Avis <span className="italic font-light text-stone-700/60">Clients</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Inline Form - White */}
            <div className="bg-white py-24 px-6 relative">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div {...fadeUp(0.1)} className="bg-stone-50 rounded-[2.5rem] p-12 border border-stone-100 shadow-sm relative overflow-hidden group">
                        {submitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10 space-y-6"
                            >
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                        <CheckCircle2 size={32} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-serif">Merci pour votre avis !</h3>
                                <p className="max-w-md mx-auto text-stone-500 font-light px-4 leading-relaxed">
                                    Votre message a été transmis et sera publié après validation par Elisa.
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                                <div>
                                    <h3 className="text-3xl font-serif mb-4 text-stone-900">Votre <span className="italic text-accent/80">Expérience</span></h3>
                                    <p className="text-stone-500 font-light leading-relaxed mb-8">
                                        Partagez votre ressenti sur votre moment à l'institut. Vos mots nous aident à perfectionner notre art.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                                <Star size={18} className="fill-accent" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest font-black text-stone-400">Qualité Premium</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent shadow-sm">
                                                <CheckCircle2 size={18} />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest font-black text-stone-400">Vérifié par l'équipe</span>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[2rem] shadow-xl shadow-stone-200/40 border border-stone-50">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Prénom / Nom</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full border-b border-stone-100 py-3 focus:border-accent outline-none transition-colors font-serif text-lg text-stone-900"
                                            placeholder="Marie L."
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Note</label>
                                        <div className="flex gap-2 py-2">
                                            {[1,2,3,4,5].map(star => (
                                                <button 
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData({...formData, rating: star})}
                                                    className="transition-all hover:scale-125 focus:outline-none"
                                                >
                                                    <Star 
                                                        size={24} 
                                                        className={star <= formData.rating ? "fill-accent text-accent" : "text-stone-100"} 
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-stone-400">Votre Avis</label>
                                        <textarea 
                                            required
                                            rows={3}
                                            value={formData.text}
                                            onChange={e => setFormData({...formData, text: e.target.value})}
                                            className="w-full border-none bg-stone-50 rounded-2xl p-4 focus:ring-1 focus:ring-accent outline-none transition-all font-sans text-sm italic text-stone-600"
                                            placeholder="Racontez-nous..."
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full py-5 bg-stone-900 text-white rounded-2xl font-caps text-xs tracking-[0.3em] hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                                    >
                                        ENVOYER MON AVIS
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Reviews list - Beige */}
            <div className="bg-background py-24 px-6 relative">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-600 mb-1">Témoignages</h3>
                            <p className="text-xl font-serif text-stone-900">Les mots de nos clients</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {approvedReviews.map((review, i) => (
                            <motion.div
                                key={review.id}
                                {...fadeUp(0.2 + i * 0.08)}
                                className="bg-white border border-stone-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative"
                            >
                                <div className="flex items-center gap-0.5 mb-5">
                                    {[...Array(review.rating)].map((_, j) => (
                                        <Star key={j} size={12} className="fill-accent text-accent" />
                                    ))}
                                </div>
                                <p className="text-stone-600 font-sans text-sm leading-relaxed italic mb-8">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center justify-between border-t border-stone-50 pt-5">
                                    <span className="font-serif text-stone-900 text-base">{review.name}</span>
                                    <span style={{ fontFamily: 'var(--font-caps)' }} className="text-[9px] uppercase tracking-widest font-black text-stone-300">
                                        {new Date(review.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Secure Note */}
                    <motion.div {...fadeUp(0.6)} className="mt-24 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/40 border border-white/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-stone-600">
                                Avis modérés pour garantir une authenticité totale
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
