"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

export default function PrestationsPage() {
    return (
        <div className="min-h-screen bg-white pt-28 pb-24 px-6 relative overflow-hidden">

            <div className="max-w-3xl mx-auto relative z-10">

                {/* Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-serif text-foreground">
                        Prestations
                    </h1>
                </motion.div>

                {/* ── GEL ── */}
                <motion.div {...fadeUp(0.1)} className="mb-12">
                    <h2 className="text-3xl font-serif text-accent-dark mb-1">GEL</h2>
                    <p style={{ fontFamily: 'var(--font-caps)' }} className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4">Pose Complète</p>
                    <div className="border-t border-accent/20 divide-y divide-accent/10">
                        {[
                            { label: "Taille XL", price: "90.-" },
                            { label: "Taille L",  price: "85.-" },
                            { label: "Taille M",  price: "80.-" },
                            { label: "Taille S",  price: "75.-" },
                        ].map((row) => (
                            <div key={row.label} className="flex justify-between items-center py-3">
                                <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">{row.label}</span>
                                <span className="font-serif text-lg text-accent-dark">{row.price}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── ACRYGEL ── */}
                <motion.div {...fadeUp(0.2)} className="mb-12">
                    <h2 className="text-3xl font-serif text-accent-dark mb-1">ACRYGEL</h2>
                    <p style={{ fontFamily: 'var(--font-caps)' }} className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4">Pose Complète</p>
                    <div className="border-t border-accent/20 divide-y divide-accent/10">
                        {[
                            { label: "Taille XL", price: "95.-" },
                            { label: "Taille L",  price: "90.-" },
                            { label: "Taille M",  price: "85.-" },
                            { label: "Taille S",  price: "80.-" },
                        ].map((row) => (
                            <div key={row.label} className="flex justify-between items-center py-3">
                                <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">{row.label}</span>
                                <span className="font-serif text-lg text-accent-dark">{row.price}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Autres ── */}
                <motion.div {...fadeUp(0.3)} className="border-t border-accent/20 divide-y divide-accent/10 mb-12">
                    {[
                        { label: "Remplissage", sub: "max 4 semaines", price: "45.-" },
                        { label: "Nail Art", sub: null, price: "+5 à 10.-" },
                    ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center py-4">
                            <div>
                                <span className="text-2xl font-serif text-accent-dark">{row.label}</span>
                                {row.sub && <span className="text-xs text-stone-400 ml-2">({row.sub})</span>}
                            </div>
                            <span className="font-serif text-lg text-accent-dark">{row.price}</span>
                        </div>
                    ))}
                </motion.div>

                {/* ── Suppléments ── */}
                <motion.div {...fadeUp(0.4)} className="border-t border-accent/20 divide-y divide-accent/10 mb-12">
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-serif text-accent-dark">Ongles Cassés</span>
                            <span></span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">(+ 3 ongles)</span>
                            <span className="font-serif text-lg text-accent-dark">+10.-</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">(+ 5 ongles)</span>
                            <span className="font-serif text-lg text-accent-dark">+15.-</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <span className="text-2xl font-serif text-accent-dark">Dépose</span>
                        <span className="font-serif text-lg text-accent-dark">15.-</span>
                    </div>
                </motion.div>

                {/* ── Note bas de page ── */}
                <motion.div {...fadeUp(0.5)} className="border-t border-accent/20 pt-8">
                    <p className="text-xs text-stone-500 italic leading-relaxed text-center">
                        Afin de garantir l'hygiène et la qualité de mon travail, je n'effectue pas de remplissage
                        sur une pose réalisée par une autre prothésiste ongulaire. Une dépose sera donc nécessaire
                        avant toute nouvelle prestation.
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div {...fadeUp(0.6)} className="text-center mt-16">
                    <Link
                        href="/reservation"
                        className="inline-block px-12 py-5 bg-foreground text-background text-xs uppercase tracking-[0.3em] font-bold rounded-full shadow-xl hover:bg-accent-dark transition-all hover:scale-105"
                    >
                        Réserver un moment
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
