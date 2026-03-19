"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone, Sparkles } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSiteSettings } from "@/lib/siteSettingsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Prestations", href: "/prestations" },
    { name: "À Propos", href: "/studio" },
    { name: "Galerie", href: "/galerie" },
    { name: "Avis Clients", href: "/avis" },
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
                "fixed top-0 left-0 right-0 z-[110] transition-all duration-700 h-24 md:h-32 flex items-center",
                isScrolled ? "bg-white/95 backdrop-blur-2xl border-b border-stone-100 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="w-full max-w-[1800px] mx-auto flex items-center px-6 md:px-12">

                {/* Left: Brand Logo */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="group flex items-center">
                        <img
                            src={settings.logo}
                            alt="Palma Institut"
                            className="h-14 md:h-20 w-auto object-contain transition-all duration-700 group-hover:scale-105"
                        />
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden lg:flex items-center justify-center space-x-10 flex-[2]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900/70 hover:text-stone-900 hover:italic transition-all relative group whitespace-nowrap"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/connexion"
                        className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-900/70 hover:text-stone-900 hover:italic transition-all relative group whitespace-nowrap"
                    >
                        Connexion
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
                    </Link>
                </div>

                {/* Right: Action Button */}
                <div className="hidden lg:flex items-center justify-end space-x-6 flex-1">
                    <Link
                        href="/reservation"
                        className="px-8 py-4 bg-stone-900 text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-all duration-700 rounded-full shadow-2xl"
                    >
                        Réserver
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-3.5 text-stone-950 bg-stone-50/80 rounded-full backdrop-blur-md shadow-sm border border-stone-100 relative z-[200]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 150 }}
                        className="fixed inset-0 bg-background z-[150] lg:hidden flex flex-col p-12 text-center"
                    >
                        <div className="flex flex-col items-center justify-center flex-1 space-y-10">
                            <Sparkles className="text-[#B08D57]/20 mb-4" size={48} strokeWidth={1} />
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl md:text-5xl font-serif text-stone-900 hover:italic transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-stone-50 space-y-8">
                            <Link
                                href="/reservation"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full inline-block py-6 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] font-black rounded-full shadow-2xl"
                            >
                                Prendre rendez-vous
                            </Link>
                            <div className="flex items-center justify-center gap-6 pb-6">
                                {settings.instagram && (
                                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-stone-50 rounded-full text-stone-900 shadow-inner">
                                        <Instagram size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
