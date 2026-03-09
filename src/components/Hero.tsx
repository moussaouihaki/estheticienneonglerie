"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Hero() {
    const { settings } = useSiteSettings();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const titleLines = ["L'Art", "du Détail", "Éternel."];

    return (
        <section id="accueil" className="relative min-h-[110vh] flex items-center bg-stone-50 overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Text Content */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-12">
                    <div className="flex items-center gap-4 mb-8">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1 }}
                            className="h-px w-12 bg-accent origin-left"
                        />
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-xs uppercase tracking-[0.6em] text-accent font-semibold"
                        >
                            Haute Esthétique Suisse
                        </motion.span>
                    </div>

                    <h1 className="text-[12vw] md:text-[8vw] xl:text-[7vw] font-serif leading-[0.85] text-stone-950">
                        {titleLines.map((line, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={i === 1 ? "italic font-light text-stone-400 block pl-[10%] my-2" : i === 2 ? "font-black tracking-tighter uppercase block" : "block"}
                            >
                                {line}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="text-lg md:text-2xl text-stone-500 font-light max-w-xl leading-relaxed italic"
                    >
                        "La perfection n'est pas un détail, mais les détails font la perfection."
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="flex flex-wrap gap-10 items-center"
                    >
                        <Link
                            href="/reservation"
                            className="group relative px-16 py-7 bg-stone-950 text-white text-[10px] uppercase tracking-[0.4em] font-black overflow-hidden rounded-sm shadow-2xl"
                        >
                            <span className="relative z-10 group-hover:text-stone-950 transition-colors duration-500">Réserver l'expérience</span>
                            <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                        </Link>

                        <Link
                            href="/galerie"
                            className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black text-stone-950 relative"
                        >
                            <span className="relative">
                                Voir la Galerie
                                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-stone-200 group-hover:bg-accent transition-colors" />
                            </span>
                            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-950 group-hover:border-stone-950 transition-all duration-500">
                                <ArrowRight className="w-4 h-4 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Subtle Social Links */}
                    {(settings.instagram || settings.tiktok) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="flex items-center gap-8 pt-4"
                        >
                            <span className="text-[8px] uppercase tracking-[0.4em] text-stone-400 font-bold">Nous suivre —</span>
                            <div className="flex items-center gap-6">
                                {settings.instagram && (
                                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-500 hover:text-stone-950 transition-colors">Instagram</a>
                                )}
                                {settings.tiktok && (
                                    <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-500 hover:text-stone-950 transition-colors">TikTok</a>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Visual Layer */}
                <div className="lg:col-span-12 xl:col-span-5 relative">
                    <motion.div style={{ y: y1 }} className="relative z-20 aspect-[4/5] w-full shadow-[0_80px_150px_-30px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden border-[15px] border-white group">
                        <img
                            src={settings.heroImage}
                            alt="Luxe Onglerie"
                            className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110"
                        />
                        {/* Glass Box Detail */}
                        <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                    </motion.div>

                    <motion.div
                        style={{ y: y2 }}
                        className="absolute -right-20 -top-20 z-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] opacity-40"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute -bottom-10 -right-10 z-30 bg-stone-950 p-10 shadow-3xl space-y-2 rounded-sm border-l-4 border-accent"
                    >
                        <span className="block text-5xl font-serif text-accent italic">Aurelia</span>
                        <span className="block text-[8px] uppercase tracking-[0.8em] text-stone-400 font-bold">Studio de Prestige</span>
                    </motion.div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-100/50 -z-10" />
            <div className="absolute -bottom-[5%] -left-[5%] text-[30vw] font-serif text-stone-200/20 select-none pointer-events-none -z-10 leading-none">
                CH
            </div>
        </section>
    );
}
