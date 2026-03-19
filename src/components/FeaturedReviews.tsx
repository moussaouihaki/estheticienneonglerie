"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useReviews } from "@/lib/reviewsStore";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

export function FeaturedReviews() {
    const { reviews } = useReviews();
    const approvedReviews = reviews.filter(r => r.status === 'approved').slice(0, 3);

    if (approvedReviews.length === 0) return null;

    return (
        <section className="py-32 bg-background overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div {...fadeUp(0)} className="max-w-xl">
                        <span style={{ fontFamily: 'var(--font-caps)' }} className="text-[10px] uppercase tracking-[0.5em] text-accent-dark block mb-4">
                            Témoignages
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[1.1]">
                            Ce que nos <span className="italic font-light text-accent-dark/60">clients</span> disent
                        </h2>
                    </motion.div>
                    
                    <motion.div {...fadeUp(0.2)}>
                        <Link 
                            href="/avis"
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-accent-dark hover:text-stone-900 transition-colors border-b border-accent-dark/20 pb-2"
                        >
                            VOIR TOUS LES AVIS
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {approvedReviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            {...fadeUp(0.1 + i * 0.1)}
                            className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, j) => (
                                        <Star key={j} size={14} className="fill-accent-dark text-accent-dark" />
                                    ))}
                                </div>
                                <p className="text-stone-600 font-sans text-base leading-relaxed italic mb-8">
                                    "{review.text}"
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                <span className="font-serif text-stone-900 text-lg">{review.name}</span>
                                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                                    {new Date(review.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
