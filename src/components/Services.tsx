"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, CircleDollarSign } from "lucide-react";
import { useServices } from "@/lib/servicesStore";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Services() {
    const { settings } = useSiteSettings();
    const { services } = useServices();
    const visibleServices = services.filter(s => s.visible);

    return (
        <section id="services" className="py-40 px-6 bg-stone-900 text-white overflow-hidden relative">

            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-stone-800/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <div className="text-center space-y-8 mb-24 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <span className="text-accent text-xs font-bold uppercase tracking-[0.5em] block">Nos collections de soins</span>
                        <div className="w-16 h-px bg-accent/40" />
                    </motion.div>
                    <h2 className="text-6xl md:text-8xl font-serif leading-tight">L&apos;Excellence <br /><span className="italic font-light text-stone-400">Suisse</span></h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
                    {visibleServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative bg-[#1A1A1A]/80 border border-stone-800 p-10 md:p-14 hover:border-white/20 transition-all duration-700 backdrop-blur-xl rounded-sm hover:-translate-y-4 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-8 right-8 text-4xl font-serif text-stone-800 opacity-20 transition-colors">
                                0{index + 1}
                            </div>

                            {/* Glow overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700 rounded-sm"
                                style={{ background: service.color }}
                            />

                            {/* Image Visual */}
                            <div className="mb-10 w-full h-48 rounded-sm overflow-hidden relative shadow-2xl group-hover:shadow-accent/20 transition-all duration-700">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-700" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                            </div>

                            <div className="space-y-4 mb-10">
                                <h3 className="text-2xl md:text-3xl font-serif text-white">
                                    {service.name}
                                </h3>
                                <p className="text-sm text-stone-400 font-light leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-4 pt-2">
                                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: service.color }}>
                                        <Clock size={12} /> {service.duration} MIN
                                    </span>
                                    <div className="w-4 h-px bg-stone-700" />
                                    <span className="flex items-center gap-1.5 text-xl font-light text-stone-300">
                                        <CircleDollarSign size={16} className="text-stone-500" />
                                        CHF {service.price}
                                    </span>
                                </div>
                            </div>

                            {/* Color underline on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: service.color }} />

                            <Link
                                href="/reservation"
                                className="w-full py-4 border border-stone-700 text-xs font-bold uppercase tracking-widest transition-all duration-500 block text-center mt-8 hover:text-stone-950"
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = service.color; (e.currentTarget as HTMLElement).style.borderColor = service.color; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "#44403c"; }}
                            >
                                Réserver ce rituel
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="mt-20 flex flex-col items-center gap-6">
                    <div className="w-px h-20 bg-gradient-to-b from-accent/50 to-transparent" />
                    <Link
                        href="/reservation"
                        className="px-20 py-8 bg-white text-stone-950 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-accent hover:text-white transition-all duration-700 shadow-2xl rounded-sm"
                    >
                        Réserver un instant de grâce
                    </Link>
                </div>

            </div>
        </section>
    );
}
