"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, UserCheck, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, delay },
});

export function ExpertiseStrip() {
    const items = [
        { icon: Heart, title: "Bienveillance", desc: "Un accompagnement doux et personnalisé." },
        { icon: UserCheck, title: "Expertise", desc: "Savoir-faire certifié et précis." },
        { icon: Sparkles, title: "Qualité", desc: "Produits premium et hygiène stricte." },
    ];

    return (
        <section className="bg-white border-y border-stone-100 py-10">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                    {items.map((item, i) => (
                        <motion.div 
                            key={i} 
                            {...fadeUp(i * 0.1)}
                            className="flex items-center gap-6 px-12 py-6 md:py-0"
                        >
                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-accent shrink-0">
                                <item.icon size={20} />
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-900 mb-1">{item.title}</h3>
                                <p className="text-[11px] text-stone-400 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ServicesGrid() {
    const services = [
        { title: "Ongles en Gel", subtitle: "Architecture & Solidité", img: "/images/sections/gel.png", href: "/prestations" },
        { title: "Vernis Permanent", subtitle: "Brillance & Tenue", img: "/images/sections/vernis.png", href: "/prestations" },
        { title: "Soins & Détente", subtitle: "Douceur & Nutrition", img: "/images/sections/soin.png", href: "/prestations" },
    ];

    return (
        <section className="py-24 bg-background overflow-hidden px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div {...fadeUp(0)} className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">Mes Prestations</h2>
                    <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-black">L'excellence au bout des doigts</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((svc, i) => (
                        <motion.div 
                            key={i} 
                            {...fadeUp(0.1 + i * 0.1)}
                            className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-xl"
                        >
                            <img 
                                src={svc.img} 
                                alt={svc.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            
                            <div className="absolute inset-x-0 bottom-0 p-10 text-center">
                                <h3 className="text-2xl font-serif text-white mb-2">{svc.title}</h3>
                                <p className="text-[10px] uppercase tracking-widest text-white/70 mb-8">{svc.subtitle}</p>
                                <Link 
                                    href={svc.href}
                                    className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] uppercase tracking-[0.3em] font-black rounded-full hover:bg-white hover:text-stone-900 transition-all duration-500"
                                >
                                    Découvrir
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function QuoteSection() {
    return (
        <section className="bg-accent py-32 px-6 relative overflow-hidden">
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div {...fadeUp(0)} className="mb-12 opacity-40 text-white flex justify-center">
                    <MessageCircle size={40} strokeWidth={1} />
                </motion.div>
                <motion.h2 {...fadeUp(0.2)} className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-12">
                    "La beauté est un moment pour soi, une reconnexion subtile entre le corps et l'esprit."
                </motion.h2>
                <motion.div {...fadeUp(0.4)} className="flex flex-col items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/80 font-black">— ELISA</span>
                    <Link 
                        href="/a-propos"
                        className="mt-8 px-12 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full text-[9px] uppercase tracking-[0.4em] font-black flex items-center gap-4 transition-all"
                    >
                        Mon parcours
                        <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export function ContactCTA() {
    return (
        <section className="py-32 px-6 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <motion.span {...fadeUp(0)} className="text-[10px] uppercase tracking-[0.6em] text-accent font-black block mb-8">
                    Prête à rayonner ?
                </motion.span>
                <motion.h2 {...fadeUp(0.2)} className="text-4xl md:text-7xl font-serif text-stone-900 mb-6">
                    Prête à <span className="italic font-light opacity-60">commencer ?</span>
                </motion.h2>
                <motion.p {...fadeUp(0.3)} className="text-stone-400 font-sans text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
                    Réservez votre moment suspendu et laissez-vous porter par une expérience de soin unique à Tavannes.
                </motion.p>
                
                <motion.div 
                    {...fadeUp(0.4)}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <Link 
                        href="/reservation"
                        className="w-full md:w-auto px-12 py-6 bg-accent text-white rounded-full text-[10px] uppercase tracking-[0.4em] font-black flex items-center justify-center gap-4 hover:bg-stone-900 transition-all shadow-xl shadow-accent/20"
                    >
                        Me Contacter
                        <ArrowRight size={16} />
                    </Link>
                    <a 
                        href="https://wa.me/41763697207"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto px-12 py-6 border-2 border-stone-100 text-stone-900 rounded-full text-[10px] uppercase tracking-[0.4em] font-black flex items-center justify-center gap-4 hover:border-accent transition-all"
                    >
                        <Phone size={16} className="text-accent" />
                        WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
