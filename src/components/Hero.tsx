"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function Hero() {
    const { settings } = useSiteSettings();
    
    return (
        <section id="accueil" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-40 md:pt-56">
            {/* Background Image with Parallax-like overlay */}
            <div className="absolute inset-x-0 bottom-0 top-40 md:top-56 z-0">
                <img 
                    src="/images/hero.png" 
                    alt="Palma Institut Studio" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
            </div>
            <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10 py-20 gap-10">


                {/* Slogan & Certification */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-center space-y-8"
                >
                    <p className="text-xl md:text-2xl font-serif text-stone-600/80 italic font-light tracking-wide">
                        "Votre parenthèse beauté au cœur de la ville"
                    </p>
                    <div className="pt-2">
                        <span 
                            className="inline-block px-10 py-3 border border-stone-300 rounded-full text-[9px] uppercase tracking-[0.5em] font-black bg-white/30 backdrop-blur-md text-stone-800"
                        >
                            Esthéticienne diplômée
                        </span>
                    </div>
                </motion.div>

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
                        className="group relative px-16 py-6 border border-stone-300 text-stone-900 text-[10px] uppercase tracking-[0.4em] font-black rounded-full transition-all hover:bg-white/50 hover:border-stone-900 active:scale-95"
                    >
                        Les Prestations
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
