"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function Hero() {
    const { settings } = useSiteSettings();
    
    return (
        <section id="accueil" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-24 md:pt-32">
            {/* Background Image with Parallax-like overlay */}
            <div className="absolute inset-x-0 bottom-0 top-24 md:top-32 z-0">
                <img 
                    src="/images/hero.png" 
                    alt="Palma Institut Studio" 
                    className="w-full h-full object-cover opacity-60"
                />
            </div>
            {/* Atmospheric Overlay */}
            <div className="absolute inset-0 z-[5] bg-stone-900/40 backdrop-blur-[2px]" />
            
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white/80 font-black mb-8 block lg:mb-12"
                >
                    Studio de Prothésie Ongulaire
                </motion.span>
                
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-serif text-white leading-[1.1] mb-12 drop-shadow-2xl"
                >
                    Palma <br />
                    <span className="italic font-light opacity-60">Institut</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="text-white/80 font-sans text-lg md:text-xl max-w-2xl mb-16 leading-relaxed"
                >
                    L'excellence du soin et l'art de la précision au service de votre beauté, dans un écrin de douceur à La Chaux-de-Fonds.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-6 items-center pt-6"
                >
                    <Link
                        href="/reservation"
                        className="group relative px-16 py-6 bg-accent text-white text-[10px] uppercase tracking-[0.4em] font-black overflow-hidden rounded-full shadow-2xl transition-all hover:bg-stone-900 hover:shadow-xl active:scale-95 flex items-center gap-3"
                    >
                        Réserver un moment
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>

                    <Link
                        href="/prestations"
                        className="group relative px-16 py-6 border border-white/30 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.4em] font-black rounded-full transition-all hover:bg-white/10 hover:border-white active:scale-95"
                    >
                        Les Prestations
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
