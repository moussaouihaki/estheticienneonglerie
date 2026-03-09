"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
                </div>

                {/* Brand Center */}
                <div className="flex flex-col items-center flex-1">
                    <Link href="/" className="group flex flex-col items-center">
                        <span className="font-serif text-3xl md:text-5xl tracking-[0.2em] transition-all group-hover:tracking-[0.4em] duration-1000">
                            AURELIA
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
                        className="fixed inset-0 bg-stone-50 z-[99] lg:hidden flex flex-col p-12 text-center items-center justify-center space-y-12"
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
                        <div className="h-px w-24 bg-stone-200" />
                        <Link
                            href="/reservation"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-12 py-6 bg-accent text-white text-xs uppercase tracking-[0.3em] font-bold rounded-full"
                        >
                            Prendre rendez-vous
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
