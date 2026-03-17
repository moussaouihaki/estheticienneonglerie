"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useServices } from "@/lib/servicesStore";

export function Services() {
    const { services } = useServices();
    const visibleServices = services.filter(s => s.visible);

    return (
        <section id="prestations" className="py-24 px-6 bg-white overflow-hidden relative border-t border-accent/5">
            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                <div className="text-center space-y-6 mb-20 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <span 
                            style={{ fontFamily: 'var(--font-caps)', color: '#805836' }}
                            className="text-[10px] uppercase tracking-[0.6em] block"
                        >
                            Nos Prestations
                        </span>
                        <div className="w-12 h-px bg-accent/30" />
                    </motion.div>
                    
                    <h2 
                        style={{ color: '#805836' }}
                        className="text-5xl md:text-7xl font-serif"
                    >
                        Art & <span className="italic font-light opacity-60">Précision</span>
                    </h2>
                    
                    <p 
                        style={{ fontFamily: 'var(--font-caps)', color: '#000000', letterSpacing: '0.4em' }}
                        className="text-[10px] uppercase font-bold"
                    >
                        Prenez soin de vous à La Chaux-de-Fonds
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 w-full max-w-5xl">
                    {visibleServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative bg-white border border-accent/10 p-10 hover:border-accent/40 transition-all duration-500 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl md:text-3xl font-serif text-foreground group-hover:text-accent-dark transition-colors">
                                    {service.name}
                                </h3>
                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1.5">
                                        <span className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Dès</span>
                                        <span className="text-2xl font-serif text-accent-dark">
                                            {service.price}.-
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-stone-500 font-sans text-sm leading-relaxed mb-8 flex-grow">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-6 pt-6 border-t border-accent/5">
                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-dark">
                                    <Clock size={14} className="opacity-50" /> {service.duration} MIN
                                </span>
                                <Link
                                    href="/reservation"
                                    className="ml-auto text-[10px] uppercase tracking-[0.2em] font-bold text-foreground hover:text-accent-dark transition-colors flex items-center gap-2 group/btn"
                                >
                                    Réserver <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Extra info */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-8 border border-dashed border-accent/20 rounded-2xl text-center max-w-2xl bg-white"
                >
                    <p 
                        style={{ fontFamily: 'var(--font-caps)', color: '#000000', letterSpacing: '0.3em' }}
                        className="text-[10px] uppercase font-bold mb-6"
                    >
                        Informations Complémentaires
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-stone-600">
                        <div>
                            <p className="font-serif italic mb-1 text-foreground">Ongles cassés</p>
                            <p className="text-accent-dark font-sans font-bold">+10.- (3+ ongles) / +15.- (5+ ongles)</p>
                        </div>
                        <div>
                            <p className="font-serif italic mb-1 text-foreground">Dépose</p>
                            <p className="text-accent-dark font-sans font-bold">15.-</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
