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
        <div className="min-h-screen pt-32 md:pt-40 pb-0 relative overflow-hidden">

            {/* Header - Beige */}
            <div className="bg-background py-20 px-6">
                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.div {...fadeUp(0)} className="text-center">
                        <h1 className="text-6xl md:text-8xl font-serif text-foreground">
                            Prestations
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* ── GEL ── White */}
            {gelServices.length > 0 && (
                <div className="bg-white py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div {...fadeUp(0.1)} className="">
                            <h2 className="text-3xl font-serif text-accent mb-1">GEL</h2>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-8">Pose Complète</p>
                            <div className="border-t border-stone-100 divide-y divide-stone-50">
                                {gelServices.map((svc) => (
                                    <div key={svc.id} className="flex justify-between items-center py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">{svc.name.replace("GEL — ", "")}</span>
                                            <span className="text-[9px] text-stone-300 flex items-center gap-1 mt-0.5"><Clock size={9} /> {svc.duration} min</span>
                                        </div>
                                        <span className="font-serif text-lg text-stone-900">{svc.price}.-</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* ── ACRYGEL ── Beige */}
            {acrygelServices.length > 0 && (
                <div className="bg-background py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div {...fadeUp(0.2)} className="">
                            <h2 className="text-3xl font-serif text-accent mb-1">ACRYGEL</h2>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-8">Pose Complète</p>
                            <div className="border-t border-white/20 divide-y divide-white/10">
                                {acrygelServices.map((svc) => (
                                    <div key={svc.id} className="flex justify-between items-center py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-widest text-stone-700 font-bold">{svc.name.replace("ACRYGEL — ", "")}</span>
                                            <span className="text-[9px] text-stone-400 flex items-center gap-1 mt-0.5"><Clock size={9} /> {svc.duration} min</span>
                                        </div>
                                        <span className="font-serif text-lg text-stone-900">{svc.price}.-</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* ── Autres ── White */}
            {otherServices.length > 0 && (
                <div className="bg-white py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div {...fadeUp(0.3)} className="border-t border-stone-100 divide-y divide-stone-50">
                            {otherServices.map((svc) => (
                                <div key={svc.id} className="flex justify-between items-center py-6">
                                    <div>
                                        <span className="text-2xl font-serif text-accent">{svc.name}</span>
                                        {svc.description && !svc.name.includes("Remplissage") && (
                                            <p className="text-[10px] text-stone-400 italic mt-1">{svc.description}</p>
                                        )}
                                        {svc.name.includes("Remplissage") && (
                                            <span className="text-xs text-stone-400 ml-2">(max 4 semaines)</span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <span className="font-serif text-lg text-stone-900">
                                            {svc.name.includes("Nail Art") ? "+" : ""}{svc.price}.-
                                        </span>
                                        <p className="text-[9px] text-stone-300 mt-1">{svc.duration} min</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* ── Footer / CTA ── Beige */}
            <div className="bg-background py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Note bas de page */}
                    <motion.div {...fadeUp(0.5)} className="border-t border-white/20 pt-8 mb-16">
                        <p className="text-xs text-stone-700 italic leading-relaxed text-center">
                            Afin de garantir l'hygiène et la qualité de mon travail, je n'effectue pas de remplissage
                            sur une pose réalisée par une autre prothésiste ongulaire. Une dépose sera donc nécessaire
                            avant toute nouvelle prestation.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div {...fadeUp(0.6)} className="text-center">
                        <Link
                            href="/reservation"
                            className="inline-block px-12 py-6 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] font-black rounded-full shadow-xl hover:bg-stone-800 transition-all hover:scale-105"
                        >
                            Réserver un moment
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
