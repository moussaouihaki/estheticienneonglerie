"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useServices, Service } from "@/lib/servicesStore";
import { Clock, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
});

export default function ReservationPage() {
    const { services, loading } = useServices();
    const [selectedCategory, setSelectedCategory] = useState<string>("TOUT");
    
    const activeServices = services.filter(s => s.visible);
    const categories = ["TOUT", "GEL", "ACRYGEL", "SOINS", "AUTRES"];

    const filteredServices = activeServices.filter(s => {
        if (selectedCategory === "TOUT") return true;
        if (selectedCategory === "GEL") return s.name.toUpperCase().includes("GEL") && !s.name.toUpperCase().includes("ACRYGEL");
        if (selectedCategory === "ACRYGEL") return s.name.toUpperCase().includes("ACRYGEL");
        if (selectedCategory === "SOINS") return s.name.toLowerCase().includes("soin") || s.name.toLowerCase().includes("manucure");
        return !s.name.toUpperCase().includes("GEL") && !s.name.toUpperCase().includes("ACRYGEL") && !s.name.toLowerCase().includes("soin");
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-10 h-10 border-4 border-stone-200 border-t-accent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen pt-32 md:pt-40 pb-20 bg-background overflow-hidden relative">
            
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-16">
                <motion.span {...fadeUp(0)} className="text-[10px] uppercase tracking-[0.5em] text-accent font-black block mb-6">
                    Votre Moment
                </motion.span>
                <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-serif text-stone-900 mb-8">
                    Réserver une <span className="italic font-light opacity-60">Prestation</span>
                </motion.h1>
                <motion.p {...fadeUp(0.2)} className="text-stone-500 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
                    Choisissez votre soin et réservez votre moment de détente en quelques clics.
                </motion.p>
            </div>

            {/* Category Filter - Pill Style from coredefemme */}
            <div className="max-w-5xl mx-auto px-6 mb-16 overflow-x-auto">
                <motion.div {...fadeUp(0.3)} className="flex items-center justify-center gap-3 min-w-max pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 ${
                                selectedCategory === cat 
                                ? "bg-accent text-white shadow-lg shadow-accent/20" 
                                : "bg-white text-stone-400 border border-stone-100 hover:border-accent/40"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Services List */}
            <div className="max-w-4xl mx-auto px-6 space-y-6">
                {filteredServices.map((service, i) => (
                    <motion.div
                        key={service.id}
                        {...fadeUp(0.4 + i * 0.05)}
                        className="group bg-white rounded-[2.5rem] p-8 md:p-10 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h3 className="text-2xl font-serif text-stone-900">{service.name}</h3>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-stone-400">
                                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black">
                                    <Clock size={14} className="text-accent" />
                                    {service.duration} min
                                </span>
                                <span className="w-1 h-1 rounded-full bg-stone-200" />
                                <span className="text-[10px] uppercase tracking-widest font-black">
                                    Soin Individuel
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-right flex flex-col items-center md:items-end">
                                <span className="text-3xl font-serif text-stone-900">{service.price}.-</span>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">TVA incluse</span>
                            </div>
                            
                            <a 
                                href={`https://wa.me/41763697207?text=Bonjour,%20je%20souhaite%20réserver%20la%20prestation%20:%20${encodeURIComponent(service.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-5 bg-stone-900 text-white rounded-full text-[9px] uppercase tracking-[0.4em] font-black hover:bg-accent transition-all duration-500 shadow-lg group-hover:shadow-accent/20"
                            >
                                Choisir
                            </a>
                        </div>
                    </motion.div>
                ))}

                {filteredServices.length === 0 && (
                    <div className="text-center py-20 bg-white/50 rounded-[3rem] border border-dashed border-stone-200">
                        <p className="text-stone-400 font-sans italic">Aucun service disponible dans cette catégorie pour le moment.</p>
                    </div>
                )}
            </div>

            {/* Bottom Note */}
            <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
                <p className="text-[11px] text-stone-400 font-sans italic leading-relaxed max-w-lg mx-auto">
                    Besoin d'un conseil ? N'hésitez pas à nous contacter directement. 
                    Toute annulation doit être faite 24h à l'avance.
                </p>
            </div>
        </div>
    );
}
