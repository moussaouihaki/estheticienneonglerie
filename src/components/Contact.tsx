"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Contact() {
    const { settings } = useSiteSettings();

    return (
        <section id="a-propos" className="py-24 px-6 bg-white overflow-hidden relative border-t border-accent/10">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <span 
                                style={{ fontFamily: 'var(--font-caps)', color: '#805836' }}
                                className="text-[10px] uppercase tracking-[0.5em] block"
                            >
                                À Propos & Contact
                            </span>
                            <h2 
                                style={{ color: '#805836' }}
                                className="text-5xl md:text-7xl font-serif leading-tight"
                            >
                                Elisa Palma <br />
                                <span className="italic font-light opacity-60">Prothésiste Ongulaire</span>
                            </h2>
                            <p className="text-stone-500 font-sans tracking-wide leading-relaxed max-w-md italic">
                                Bienvenue chez Palma Institut. Je vous accueille dans mon studio à La Chaux-de-Fonds pour des prestations personnalisées alliant esthétique et bien-être.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500 text-accent-dark group-hover:text-white">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <span style={{ fontFamily: 'var(--font-caps)' }} className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">Téléphone (WhatsApp uniquement)</span>
                                    <p className="text-lg font-serif text-foreground">{settings.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500 text-accent-dark group-hover:text-white">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <span style={{ fontFamily: 'var(--font-caps)' }} className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">Email</span>
                                    <p className="text-lg font-serif text-foreground underline decoration-accent/30">{settings.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500 text-accent-dark group-hover:text-white">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <span style={{ fontFamily: 'var(--font-caps)' }} className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">Studio</span>
                                    <p className="text-lg font-serif text-foreground">{settings.address}</p>
                                </div>
                            </div>
                        </div>

                        {settings.instagram && (
                            <div className="pt-8 flex items-center gap-6">
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-accent-dark">
                                    <Instagram size={24} />
                                </a>
                                <span className="text-sm font-serif italic text-stone-500">Suivez mes créations sur Instagram</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="aspect-video bg-white p-12 shadow-2xl rounded-2xl border border-accent/10 flex flex-col justify-center relative overflow-hidden group">
                           <div className="relative z-10 flex flex-col items-center">
                                <img src="/logo.png" alt="Logo" className="w-40 mb-8 opacity-90 transition-opacity" />
                                <div className="text-center space-y-2">
                                    <h3 
                                        style={{ color: '#805836' }}
                                        className="text-3xl font-serif tracking-widest"
                                    >
                                        ELISA PALMA
                                    </h3>
                                    <span 
                                        style={{ fontFamily: 'var(--font-caps)', color: '#000000', letterSpacing: '0.4em' }}
                                        className="text-[10px] uppercase font-bold"
                                    >
                                        Prothésiste Ongulaire
                                    </span>
                                </div>
                           </div>
                        </div>
                        <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-accent/5 rounded-2xl" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
