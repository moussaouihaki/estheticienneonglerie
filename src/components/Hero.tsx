"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function Hero() {
    const { settings } = useSiteSettings();
    
    return (
        <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image with Parallax-like overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/hero.png" 
                    alt="Palma Institut Luxury Studio" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
            </div>
            <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10 py-20 gap-8">
                {/* Brand Name - Brun 805836 */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center gap-1"
                >
                    <h1 className="sr-only">Palma Institut - Beauty Salon</h1>
                    <img 
                        src={settings.logo} 
                        alt="Palma Institut" 
                        className="w-[280px] md:w-[450px] h-auto object-contain mx-auto transition-transform duration-700 hover:scale-105"
                    />
                </motion.div>

                {/* Slogan & Certification */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-2 md:mt-4 space-y-8"
                >
                    <p className="text-xl md:text-3xl font-serif text-stone-500 italic font-light">
                        "Votre parenthèse beauté"
                    </p>
                    <div className="pt-2">
                        <span 
                            style={{ color: '#805836', borderColor: '#80583640' }}
                            className="inline-block px-6 py-2 border rounded-full text-[10px] uppercase tracking-[0.4em] font-black bg-white/50 backdrop-blur-sm"
                        >
                            Esthéticienne diplômée
                        </span>
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col md:flex-row gap-10 items-center pt-8"
                >
                    <Link
                        href="/reservation"
                        className="group relative px-14 py-6 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] font-black overflow-hidden rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 transition-colors duration-500">Réserver</span>
                        <div className="absolute inset-0 bg-[#CFC4AC] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </Link>

                    <Link
                        href="/prestations"
                        className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-stone-900 relative"
                    >
                        <span className="relative">
                            Prestations
                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#805836]/30 group-hover:w-full group-hover:bg-[#805836] transition-all duration-500" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
