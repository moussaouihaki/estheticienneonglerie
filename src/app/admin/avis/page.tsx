"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, Trash2, Clock, MessageSquare, AlertCircle } from "lucide-react";
import { useReviews, Review } from "@/lib/reviewsStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ReviewModerationPage() {
    const { reviews, approveReview, deleteReview } = useReviews();
    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const approvedReviews = reviews.filter(r => r.status === 'approved');

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-serif text-stone-900 italic leading-tight">Modération des Avis</h1>
                <p className="text-xs md:text-sm text-stone-500 font-light">Gérez les témoignages de vos clients avant leur publication.</p>
            </div>

            {/* Pending Reviews */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Clock className="text-amber-500" size={20} />
                    <h2 className="text-xl font-serif">En attente ({pendingReviews.length})</h2>
                </div>
                
                {pendingReviews.length === 0 ? (
                    <div className="bg-stone-50 border border-dashed border-stone-200 rounded-3xl p-12 text-center space-y-3">
                        <Check className="mx-auto text-stone-300" size={32} />
                        <p className="text-stone-400 italic">Aucun avis en attente de validation.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        <AnimatePresence mode="popLayout">
                            {pendingReviews.map((review) => (
                                <ReviewCard 
                                    key={review.id} 
                                    review={review} 
                                    onApprove={() => approveReview(review.id)} 
                                    onDelete={() => deleteReview(review.id)}
                                    isPending
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Approved Reviews */}
            <div className="space-y-6 pt-10 border-t border-stone-100">
                <div className="flex items-center gap-3">
                    <MessageSquare className="text-emerald-500" size={20} />
                    <h2 className="text-xl font-serif">Publiés ({approvedReviews.length})</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {approvedReviews.map((review) => (
                        <ReviewCard 
                            key={review.id} 
                            review={review} 
                            onDelete={() => deleteReview(review.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ 
    review, 
    onApprove, 
    onDelete, 
    isPending = false 
}: { 
    review: Review; 
    onApprove?: () => void; 
    onDelete: () => void;
    isPending?: boolean;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
                "p-5 md:p-8 rounded-[2rem] border transition-all",
                isPending ? "bg-amber-50/20 border-amber-100 shadow-sm" : "bg-white border-stone-100"
            )}
        >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-start sm:gap-4 gap-2">
                        <h3 className="font-serif text-lg md:text-xl text-stone-900 italic">{review.name}</h3>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={14} 
                                    className={cn(i < review.rating ? "fill-[#B08D57] text-[#B08D57]" : "text-stone-100")} 
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-stone-600 text-sm italic leading-relaxed md:text-base">
                        "{review.text}"
                    </p>
                    <div className="text-[9px] uppercase tracking-widest text-stone-300 font-black">
                        {new Date(review.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>

                <div className="flex sm:flex-row lg:flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-50">
                    {onApprove && (
                        <button
                            onClick={onApprove}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-lg shadow-stone-900/10"
                        >
                            <Check size={14} /> Approuver
                        </button>
                    )}
                    <button
                        onClick={onDelete}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-rose-100 text-rose-500 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all font-bold"
                    >
                        <Trash2 size={14} /> {isPending ? "Rejeter" : "Supprimer"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
