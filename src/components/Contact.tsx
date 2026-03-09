"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Clock } from "lucide-react";

export function Contact() {
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
                                    <p className="text-lg font-medium">+33 1 23 45 67 89</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
                                    <Mail size={20} className="text-stone-300 group-hover:text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Email</span>
                                    <p className="text-lg font-medium">hello@aurelianails.fr</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
                                    <MapPin size={20} className="text-stone-300 group-hover:text-white" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Studio</span>
                                    <p className="text-lg font-medium">15 Rue du Luxe, 75008 Paris</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex items-center gap-6">
                            <a href="#" className="p-4 rounded-full bg-stone-800 hover:bg-accent transition-colors group">
                                <Instagram size={20} />
                            </a>
                            <span className="text-sm font-light text-stone-500 italic">Rejoignez notre communauté</span>
                        </div>
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
