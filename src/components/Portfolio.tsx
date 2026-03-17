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
        <section id="galerie" className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <span 
                            style={{ fontFamily: 'var(--font-caps)', color: '#805836' }}
                            className="text-[10px] uppercase tracking-[0.5em] block"
                        >
                            Inspiration
                        </span>
                        <h2 
                            style={{ color: '#805836' }}
                            className="text-5xl md:text-7xl font-serif"
                        >
                            Notre <span className="italic font-light opacity-60">Galerie</span>
                        </h2>
                    </div>
                    <p 
                        style={{ fontFamily: 'var(--font-caps)', color: '#000000', letterSpacing: '0.2em' }}
                        className="max-w-sm text-[10px] uppercase leading-relaxed font-bold"
                    >
                        Découvrez une sélection de nos poses : Précision, Art et Passion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {visibleImages.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-50 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <Image
                                src={project.url}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                                <span className="text-[10px] uppercase tracking-[0.3em] mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                    <div className="mt-24 text-center">
                        <a
                            href={settings.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-10 h-px bg-accent/30 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                            <span 
                                style={{ fontFamily: 'var(--font-caps)' }}
                                className="text-[10px] uppercase tracking-[0.4em] text-foreground font-bold"
                            >
                                Galerie complète sur Instagram
                            </span>
                            <div className="w-10 h-px bg-accent/30 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
