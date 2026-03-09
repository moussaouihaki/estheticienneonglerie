"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSiteSettings } from "@/lib/siteSettingsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Concept", href: "/concept" },
    { name: "Services", href: "/services" },
    { name: "Galerie d'Art", href: "/galerie" },
    { name: "Studio", href: "/studio" },
];

export function Navbar() {
    const { settings } = useSiteSettings();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[110] transition-all duration-700 h-24 flex items-center",
                isScrolled ? "bg-white/90 backdrop-blur-2xl border-b border-stone-100 shadow-xl" : "bg-transparent"
            )}
        >
            <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between px-6 md:px-12">

                {/* Left Links */}
                <div className="hidden lg:flex items-center space-x-12 flex-1">
                    {navLinks.slice(0, 2).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-950 hover:text-accent transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 pl-4 border-l border-stone-200/50">
                        {settings.instagram && (
                            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-950 transition-colors">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        )}
                        {settings.tiktok && (
                            <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-950 transition-colors">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.59 3.84-1.78 5.4-1.35 1.77-3.4 2.92-5.59 3.08-2.19.14-4.43-.45-6.12-1.89-1.79-1.51-2.79-3.79-2.69-6.12.06-2.22 1-4.38 2.68-5.83 1.58-1.37 3.66-2.02 5.74-1.92v4.02c-1.05-.09-2.13.16-3.03.73-.77.49-1.34 1.29-1.48 2.19-.11.8.06 1.64.48 2.32.48.78 1.28 1.34 2.17 1.54 1.26.28 2.65-.08 3.52-1.02.6-.63.92-1.47.89-2.33-.01-2.31 0-4.63 0-6.95z" /></svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Brand Center */}
                <div className="flex flex-col items-center flex-1">
                    <Link href="/" className="group flex flex-col items-center">
                        <span className="font-serif text-3xl md:text-5xl tracking-[0.2em] transition-all group-hover:tracking-[0.4em] duration-1000 uppercase">
                            {settings.studioName.split(' ')[0]}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-8 h-px bg-accent/30 group-hover:bg-accent transition-all" />
                            <span className="text-[8px] uppercase tracking-[0.6em] text-accent translate-x-[0.3em]">Nail Studio</span>
                            <div className="w-8 h-px bg-accent/30 group-hover:bg-accent transition-all" />
                        </div>
                    </Link>
                </div>

                {/* Right Links & Action */}
                <div className="hidden lg:flex items-center justify-end space-x-12 flex-1">
                    {navLinks.slice(2).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-950 hover:text-accent transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/reservation"
                        className="px-10 py-5 bg-accent text-white text-[10px] uppercase tracking-[0.3em] font-black hover:bg-stone-950 hover:scale-105 transition-all duration-500 shadow-2xl shadow-accent/40 rounded-full"
                    >
                        Réservation
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-3 text-stone-950 bg-stone-100/50 rounded-full backdrop-blur-md"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[99] lg:hidden flex flex-col p-12 text-center items-center justify-center space-y-12"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-4xl font-serif text-stone-950 hover:italic hover:text-accent transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px w-24 bg-stone-100" />

                        <div className="flex items-center gap-6">
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-stone-50 rounded-full text-stone-950">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                            )}
                            {settings.tiktok && (
                                <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="p-4 bg-stone-50 rounded-full text-stone-950">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.59 3.84-1.78 5.4-1.35 1.77-3.4 2.92-5.59 3.08-2.19.14-4.43-.45-6.12-1.89-1.79-1.51-2.79-3.79-2.69-6.12.06-2.22 1-4.38 2.68-5.83 1.58-1.37 3.66-2.02 5.74-1.92v4.02c-1.05-.09-2.13.16-3.03.73-.77.49-1.34 1.29-1.48 2.19-.11.8.06 1.64.48 2.32.48.78 1.28 1.34 2.17 1.54 1.26.28 2.65-.08 3.52-1.02.6-.63.92-1.47.89-2.33-.01-2.31 0-4.63 0-6.95z" /></svg>
                                </a>
                            )}
                        </div>

                        <Link
                            href="/reservation"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-12 py-6 bg-accent text-white text-xs uppercase tracking-[0.3em] font-bold rounded-full shadow-2xl shadow-accent/40"
                        >
                            Prendre rendez-vous
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
