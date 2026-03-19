"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Heart, Sparkles, Award, Clock } from "lucide-react";
import Link from "next/link";
import { useSiteSettings } from "@/lib/siteSettingsStore";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, delay },
});

export default function AboutPage() {
    const { settings } = useSiteSettings();

    return (
        <div className="min-h-screen pt-40 md:pt-60 pb-0 bg-background overflow-hidden relative">
            
            {/* Header - Large Brown Banner */}
            <div className="bg-accent py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span {...fadeUp(0)} className="text-[10px] uppercase tracking-[0.6em] text-white/60 font-black block mb-8">
                        L'âme de {settings.studioName}
                    </motion.span>
                    <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-8xl font-serif text-white mb-8">
                        Je suis <span className="italic font-light opacity-80 text-white/40">Elisa</span>
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} className="text-white/70 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
                        Passionnée par l'art de la manucure et le bien-être, j'ai créé {settings.studioName} pour offrir un espace de douceur et d'excellence.
                    </motion.p>
                </div>
            </div>

            {/* Mon Parcours - Image & Text */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
                    <motion.div 
                        {...fadeUp(0)}
                        className="relative w-full md:w-1/2 aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        <img 
                            src={settings.aboutImage || "/images/elisa.png"} 
                            alt={`Elisa - Fondatrice de ${settings.studioName}`} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
                    </motion.div>
                    
                    <motion.div {...fadeUp(0.2)} className="w-full md:w-1/2 space-y-8">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-black block">Mon Histoire</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                            Une approche unique de <span className="italic font-light opacity-60">la beauté</span>
                        </h2>
                        <div className="space-y-6 text-stone-500 font-sans text-lg leading-relaxed">
                            <p>
                                Depuis toujours, j'accorde une importance capitale aux détails. Pour moi, une manucure n'est pas qu'un simple soin, c'est une forme d'expression de soi et un moment volé au tumulte du quotidien.
                            </p>
                            <p>
                                Après plusieurs années de formation et de pratique, j'ai choisi de m'installer à La Chaux-de-Fonds pour partager ma vision de la prothésie ongulaire : un mélange de technicité rigoureuse, d'hygiène irréprochable et de bienveillance sincère.
                            </p>
                            <p>
                                Mon objectif ? Que chaque cliente reparte non seulement avec des ongles parfaits, mais aussi avec le sentiment d'avoir été écoutée et choyée.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-background py-20 px-6 border-y border-stone-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">
                        {[
                            { label: "Années d'expérience", val: "5+" },
                            { label: "Clientes ravies", val: "1000+" },
                            { label: "Formations suivies", val: "6+" },
                            { label: "Produits Premium", val: "100%" },
                        ].map((stat, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.1)}>
                                <span className="text-4xl md:text-5xl font-serif text-accent block mb-2">{stat.val}</span>
                                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-stone-400">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Formations Grid */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp(0)} className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">Mes Formations</h2>
                        <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-black">Un savoir-faire en constante évolution</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Prothésiste Ongulaire Certifiée", org: "Excellence Nails Academy" },
                            { title: "Spécialisation Acrygel", org: "Nails Design Paris" },
                            { title: "Nail Art Avancé", org: "Modern Art Workshop" },
                            { title: "Hygiène & Sécurité", org: "Health & Beauty Swiss" },
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                {...fadeUp(0.1 + i * 0.1)}
                                className="bg-background/40 border border-stone-100 p-8 rounded-[2rem] flex items-center gap-6"
                            >
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    <Check size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif text-stone-900 mb-1">{item.title}</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{item.org}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valeurs Section */}
            <section className="bg-background py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: ShieldCheck, title: "Hygiène", desc: "Protocoles sanitaires stricts pour votre sécurité." },
                            { icon: Heart, title: "Écoute", desc: "Chaque prestation commence par un échange." },
                            { icon: Award, title: "Excellence", desc: "Utilisation exclusive de produits certifiés." },
                            { icon: Clock, title: "Précision", desc: "Le temps nécessaire pour un résultat impeccable." },
                        ].map((v, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center md:text-left space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-accent/5 flex items-center justify-center text-accent mx-auto md:mx-0">
                                    <v.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900">{v.title}</h3>
                                <p className="text-[11px] text-stone-400 font-sans leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 px-6 bg-white text-center">
                <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-12">Discutons de <span className="italic font-light opacity-60">vos envies</span></h2>
                    <Link 
                        href="/reservation"
                        className="inline-block px-16 py-7 bg-stone-900 text-white rounded-full text-[10px] uppercase tracking-[0.5em] font-black hover:bg-accent transition-all shadow-2xl"
                    >
                        Réserver un rendez-vous
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
