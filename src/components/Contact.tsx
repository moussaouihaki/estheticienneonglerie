"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Contact() {
    const { settings } = useSiteSettings();

    return (
        <section id="contact" className="py-32 px-6 bg-stone-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block">Contact</span>
                            <h2 className="text-5xl md:text-7xl font-serif leading-tight">Parlons de <br /><span className="italic font-light">votre projet</span></h2>
                            <p className="text-stone-400 font-light leading-relaxed max-w-md">
                                Prête pour une transformation ? Réservez votre séance ou posez-nous vos questions.
                                Nous vous répondrons avec plaisir.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
                                    <Phone size={20} className="text-stone-300 group-hover:text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Téléphone</span>
                                    <p className="text-lg font-medium">{settings.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
                                    <Mail size={20} className="text-stone-300 group-hover:text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Email</span>
                                    <p className="text-lg font-medium">{settings.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
                                    <MapPin size={20} className="text-stone-300 group-hover:text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Studio</span>
                                    <p className="text-lg font-medium">{settings.address}</p>
                                </div>
                            </div>
                        </div>

                        {(settings.instagram || settings.tiktok) && (
                            <div className="pt-8 flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    {settings.instagram && (
                                        <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-stone-800 hover:bg-accent transition-colors group">
                                            <Instagram size={20} />
                                        </a>
                                    )}
                                    {settings.tiktok && (
                                        <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-stone-800 hover:bg-stone-100 hover:text-stone-900 transition-colors group">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.59 3.84-1.78 5.4-1.35 1.77-3.4 2.92-5.59 3.08-2.19.14-4.43-.45-6.12-1.89-1.79-1.51-2.79-3.79-2.69-6.12.06-2.22 1-4.38 2.68-5.83 1.58-1.37 3.66-2.02 5.74-1.92v4.02c-1.05-.09-2.13.16-3.03.73-.77.49-1.34 1.29-1.48 2.19-.11.8.06 1.64.48 2.32.48.78 1.28 1.34 2.17 1.54 1.26.28 2.65-.08 3.52-1.02.6-.63.92-1.47.89-2.33-.01-2.31 0-4.63 0-6.95z" /></svg>
                                        </a>
                                    )}
                                </div>
                                <span className="text-sm font-light text-stone-500 italic">Rejoignez-nous sur les réseaux</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-stone-800/50 p-10 md:p-16 rounded-3xl backdrop-blur-sm border border-stone-700/50"
                    >
                        <div id="booking" className="space-y-8">
                            <div className="space-y-4 text-center mb-10">
                                <h3 className="text-3xl font-serif">Réservation Rapide</h3>
                                <div className="w-12 h-px bg-accent mx-auto" />
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-stone-400">Nom Complet</label>
                                        <input type="text" className="w-full bg-stone-900/50 border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Votre nom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-stone-400">Email</label>
                                        <input type="email" className="w-full bg-stone-900/50 border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="votre@email.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400">Prestation souhaitée</label>
                                    <select className="w-full bg-stone-900/50 border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                                        <option>Manucure Signature</option>
                                        <option>Pose Gel & Décoration</option>
                                        <option>Soins Bien-être</option>
                                        <option>Autres</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400">Message (Optionnel)</label>
                                    <textarea rows={4} className="w-full bg-stone-900/50 border border-stone-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Dites-nous tout..."></textarea>
                                </div>

                                <button className="w-full py-5 bg-accent text-white font-bold uppercase tracking-[0.3em] rounded-lg hover:bg-white hover:text-stone-900 transition-all duration-500 shadow-2xl flex items-center justify-center gap-3">
                                    Envoyer la demande
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
