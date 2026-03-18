"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useServices, Service } from "@/lib/servicesStore";
import { Clock } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

export default function PrestationsPage() {
    const { services, loading } = useServices();
    const activeServices = services.filter(s => s.visible);

    // Grouping logic
    const gelServices = activeServices.filter(s => s.name.toUpperCase().includes("GEL") && !s.name.toUpperCase().includes("ACRYGEL") && !s.name.toLowerCase().includes("dépose"));
    const acrygelServices = activeServices.filter(s => s.name.toUpperCase().includes("ACRYGEL"));
    const otherServices = activeServices.filter(s => 
        !gelServices.find(g => g.id === s.id) && 
        !acrygelServices.find(a => a.id === s.id)
    );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-stone-100 border-t-accent-dark rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-background pt-28 pb-24 px-6 relative overflow-hidden">

            <div className="max-w-3xl mx-auto relative z-10">

                {/* Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-serif text-foreground">
                        Prestations
                    </h1>
                </motion.div>

                {/* ── GEL ── */}
                {gelServices.length > 0 && (
                    <motion.div {...fadeUp(0.1)} className="mb-12">
                        <h2 className="text-3xl font-serif text-accent-dark mb-1">GEL</h2>
                        <p style={{ fontFamily: 'var(--font-caps)' }} className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4">Pose Complète</p>
                        <div className="border-t border-accent/20 divide-y divide-accent/10">
                            {gelServices.map((svc) => (
                                <div key={svc.id} className="flex justify-between items-center py-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">{svc.name.replace("GEL — ", "")}</span>
                                        <span className="text-[9px] text-stone-300 flex items-center gap-1 mt-0.5"><Clock size={9} /> {svc.duration} min</span>
                                    </div>
                                    <span className="font-serif text-lg text-accent-dark">{svc.price}.-</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── ACRYGEL ── */}
                {acrygelServices.length > 0 && (
                    <motion.div {...fadeUp(0.2)} className="mb-12">
                        <h2 className="text-3xl font-serif text-accent-dark mb-1">ACRYGEL</h2>
                        <p style={{ fontFamily: 'var(--font-caps)' }} className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-4">Pose Complète</p>
                        <div className="border-t border-accent/20 divide-y divide-accent/10">
                            {acrygelServices.map((svc) => (
                                <div key={svc.id} className="flex justify-between items-center py-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">{svc.name.replace("ACRYGEL — ", "")}</span>
                                        <span className="text-[9px] text-stone-300 flex items-center gap-1 mt-0.5"><Clock size={9} /> {svc.duration} min</span>
                                    </div>
                                    <span className="font-serif text-lg text-accent-dark">{svc.price}.-</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Autres ── */}
                {otherServices.length > 0 && (
                    <motion.div {...fadeUp(0.3)} className="border-t border-accent/20 divide-y divide-accent/10 mb-12">
                        {otherServices.map((svc) => (
                            <div key={svc.id} className="flex justify-between items-center py-4">
                                <div>
                                    <span className="text-2xl font-serif text-accent-dark">{svc.name}</span>
                                    {svc.description && !svc.name.includes("Remplissage") && (
                                        <p className="text-[10px] text-stone-400 italic mt-1">{svc.description}</p>
                                    )}
                                    {svc.name.includes("Remplissage") && (
                                        <span className="text-xs text-stone-400 ml-2">(max 4 semaines)</span>
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className="font-serif text-lg text-accent-dark">
                                        {svc.name.includes("Nail Art") ? "+" : ""}{svc.price}.-
                                    </span>
                                    <p className="text-[9px] text-stone-300 mt-1">{svc.duration} min</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

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
