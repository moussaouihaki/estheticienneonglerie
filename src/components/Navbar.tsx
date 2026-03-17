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
    { name: "Accueil",      href: "/" },
    { name: "Prestations",  href: "/prestations" },
    { name: "À Propos",     href: "/studio" },
    { name: "Galerie",      href: "/galerie" },
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
                "fixed top-0 left-0 right-0 z-[110] transition-all duration-700 h-24 flex items-center",
                isScrolled ? "bg-background/95 backdrop-blur-2xl border-b border-accent/10 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between px-6 md:px-12">

                {/* Left Links */}
                <div className="hidden lg:flex items-center space-x-12 flex-1">
                    {navLinks.slice(0, 3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground hover:text-accent-dark transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-dark transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Brand Center — Logo uniquement */}
                <div className="flex flex-col items-center flex-1">
                    <Link href="/" className="group flex flex-col items-center">
                        <img
                            src="/logo.png"
                            alt="Palma Institut"
                            className="h-14 md:h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                        />
                    </Link>
                </div>

                {/* Right Links & Action */}
                <div className="hidden lg:flex items-center justify-end space-x-12 flex-1">
                    {navLinks.slice(3, 5).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground hover:text-accent-dark transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-dark transition-all duration-500 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/reservation"
                        className="px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] font-black hover:bg-accent-dark transition-all duration-500 rounded-full shadow-lg"
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
                        className="fixed inset-0 bg-background z-[99] lg:hidden flex flex-col p-12 text-center items-center justify-center space-y-12"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-4xl font-serif text-foreground hover:italic hover:text-accent-dark transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px w-24 bg-accent/20" />

                        <div className="flex items-center gap-6">
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-accent-dark shadow-sm">
                                    <Instagram size={24} />
                                </a>
                            )}
                        </div>

                        <Link
                            href="/reservation"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-12 py-6 bg-foreground text-background text-xs uppercase tracking-[0.3em] font-bold rounded-full shadow-xl"
                        >
                            Prendre rendez-vous
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
