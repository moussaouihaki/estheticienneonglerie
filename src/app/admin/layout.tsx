"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, Users, Images, Settings, Lock, ChevronRight, Scissors, LogOut, Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { href: "/admin", label: "Tableau de bord", slug: "01" },
    { href: "/admin/calendrier", label: "Calendrier", slug: "02" },
    { href: "/admin/services", label: "Services", slug: "03" },
    { href: "/admin/clients", label: "Clients", slug: "04" },
    { href: "/admin/galerie", label: "Galerie", slug: "05" },
    { href: "/admin/settings", label: "Paramètres", slug: "06" },
];

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                if (pathname !== "/admin/login") {
                    router.push("/admin/login");
                }
                setIsAuth(false);
            } else {
                setIsAuth(true);
                if (pathname === "/admin/login") {
                    router.push("/admin");
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [pathname, router]);

    const handleLogout = async () => {
        try {
            if (auth) await signOut(auth);
            router.push("/admin/login");
        } catch (e) {
            console.error("Logout error:", e);
        }
    };

    const pageTitle: Record<string, string> = {
        "/admin": "Tableau de bord",
        "/admin/calendrier": "Calendrier & Disponibilités",
        "/admin/services": "Gestion des Services",
        "/admin/clients": "Gestion des Clients",
        "/admin/galerie": "Gestion de la Galerie",
        "/admin/avis": "Modération des Avis",
        "/admin/settings": "Paramètres du Studio",
        "/admin/login": "Connexion Sécurisée",
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="font-serif text-[#CFC4AC] animate-pulse tracking-[0.3em] uppercase">Chargement...</div>
            </div>
        );
    }

    // If it's the login page, don't show sidebar/header
    if (pathname === "/admin/login") {
        return (
            <div className={cn("bg-stone-50 text-stone-950 min-h-screen", inter.className)}>
                {children}
            </div>
        );
    }

    if (!isAuth) return null;

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-8 py-10 border-b border-stone-800 flex items-center justify-between lg:block">
                <Link href="/" className="group" onClick={() => setIsSidebarOpen(false)}>
                    <span className="font-serif text-2xl tracking-widest text-[#CFC4AC]">PALMA</span>
                    <span className="block text-[8px] uppercase tracking-[0.5em] text-stone-600 mt-0.5 group-hover:text-stone-400 transition-colors">Administration</span>
                </Link>
                <button className="lg:hidden text-stone-500 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                    <X size={24} />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-8 space-y-1">
                {navItems.map(({ href, label, slug }) => {
                    const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-xl transition-all group",
                                active
                                    ? "text-[#CFC4AC]"
                                    : "text-stone-500 hover:text-white"
                            )}
                        >
                            <span className={cn(
                                "text-[10px] font-black tracking-widest transition-opacity",
                                active ? "opacity-100" : "opacity-20 group-hover:opacity-100"
                            )}>
                                {slug}
                            </span>
                            <span className={cn(
                                "text-xs font-bold uppercase tracking-[0.2em] transition-all",
                                active ? "translate-x-1" : "group-hover:translate-x-1"
                            )}>{label}</span>
                            {active && <div className="ml-auto w-1 h-1 rounded-full bg-[#CFC4AC]" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-stone-800 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#CFC4AC]/20 flex items-center justify-center text-[#CFC4AC] font-black text-sm">E</div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-white uppercase tracking-widest">Elisa P.</p>
                        <button onClick={handleLogout} className="text-[9px] text-[#CFC4AC] uppercase tracking-widest font-black hover:underline flex items-center gap-1">
                            Déconnexion <LogOut size={8} />
                        </button>
                    </div>
                </div>
                <Link href="/" className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-stone-600 hover:text-[#CFC4AC] transition-colors">
                    <Lock size={10} />
                    Retour au site
                </Link>
            </div>
        </div>
    );

    return (
        <div className={cn("flex h-screen overflow-hidden bg-stone-50 text-stone-950", inter.className)}>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-stone-950 text-white flex-col h-screen sticky top-0 flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-stone-950 text-white z-[101] lg:hidden overflow-y-auto"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Top bar */}
                <header className="h-16 md:h-20 bg-white border-b border-stone-100 flex items-center justify-between px-6 md:px-10 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 hover:bg-stone-50 rounded-lg text-stone-600"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-stone-500 truncate max-w-[150px] md:max-w-none">
                            {pageTitle[pathname] ?? "Admin"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#CFC4AC]/10 flex items-center justify-center text-[#CFC4AC] font-black text-sm">E</div>
                        <span className="hidden sm:inline text-xs font-bold text-stone-700 uppercase tracking-widest truncate">Elisa P.</span>
                    </div>
                </header>
                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-10">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
