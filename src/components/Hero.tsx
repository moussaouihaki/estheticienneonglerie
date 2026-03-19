"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function Hero() {
    const { settings } = useSiteSettings();
    
    return (
        <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-background">
            {/* Background Image with Parallax-like overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/hero.png" 
                    alt="Palma Institut Studio" 
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
            </div>
            <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10 py-20 gap-10">
                {/* Brand Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-1"
                >
                    <h1 className="sr-only">Palma Institut</h1>
                    <img 
                        src={settings.logo} 
                        alt="Palma Institut" 
                        className="w-[300px] md:w-[480px] h-auto object-contain mx-auto transition-transform duration-1000 group-hover:scale-105"
                    />
                </motion.div>

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
                    className="flex flex-col md:flex-row gap-8 items-center pt-6"
                >
                    <Link
                        href="/reservation"
                        className="group relative px-16 py-6 bg-stone-900 text-white text-[10px] uppercase tracking-[0.5em] font-black overflow-hidden rounded-full shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl active:scale-95"
                    >
                        Réserver
                    </Link>

                    <Link
                        href="/prestations"
                        className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-black text-stone-800 relative"
                    >
                        <span className="relative">
                            Découvrir
                            <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-stone-800 transition-all duration-500 group-hover:w-full" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
