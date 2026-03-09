"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useGallery } from "@/lib/galleryStore";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export function Portfolio() {
    const { settings } = useSiteSettings();
    const { images } = useGallery();
    const visibleImages = images.filter(img => img.visible);
    return (
        <section id="portfolio" className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <span className="text-accent text-xs font-semibold uppercase tracking-[0.4em] block">Portfolio</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-stone-900">Nos dernières <br /><span className="italic font-light">créations</span></h2>
                    </div>
                    <p className="max-w-sm text-stone-500 text-sm leading-relaxed font-light">
                        Chaque pose est une œuvre d'art unique, conçue pour refléter votre personnalité et sublimer votre style naturel.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {visibleImages.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-100 cursor-pointer"
                        >
                            <Image
                                src={project.url}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                                <span className="text-[10px] uppercase tracking-[0.2em] mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {project.tag}
                                </span>
                                <h3 className="text-xl font-serif translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {project.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {settings.instagram && (
                    <div className="mt-20 text-center">
                        <a
                            href={settings.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block relative group cursor-pointer"
                        >
                            <span className="text-sm font-medium uppercase tracking-[0.3em] text-stone-900 pb-2 border-b border-stone-200 group-hover:border-accent transition-colors">
                                Suivez-nous sur Instagram @{settings.instagram.split('instagram.com/')[1]?.replace(/\/$/, '') || 'aurelianails'}
                            </span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
