"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Calendar, Users, Images, Settings, Lock, ChevronRight, Scissors, LogOut } from "lucide-react";
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("aurelia_auth");
        if (!auth && pathname !== "/admin/login") {
            router.push("/admin/login");
        } else {
            setIsAuth(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("aurelia_auth");
        router.push("/admin/login");
    };

    const pageTitle: Record<string, string> = {
        "/admin": "Tableau de bord",
        "/admin/calendrier": "Calendrier & Disponibilités",
        "/admin/services": "Gestion des Services",
        "/admin/clients": "Gestion des Clients",
        "/admin/galerie": "Gestion de la Galerie",
        "/admin/settings": "Paramètres",
        "/admin/login": "Connexion Sécurisée",
    };

    // If it's the login page, don't show sidebar/header
    if (pathname === "/admin/login") {
        return (
            <html lang="fr" className={inter.className}>
                <body className="bg-stone-50 text-stone-950">
                    {children}
                </body>
            </html>
        );
    }

    if (!isAuth) return null;

    return (
        <html lang="fr" className={inter.className}>
            <body className="bg-stone-50 text-stone-950">
                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <aside className="w-64 bg-stone-950 text-white flex flex-col h-screen sticky top-0 flex-shrink-0">
                        {/* Brand */}
                        <div className="px-8 py-10 border-b border-stone-800">
                            <Link href="/" className="group">
                                <span className="font-serif text-2xl tracking-widest text-[#B08D57]">AURELIA</span>
                                <span className="block text-[8px] uppercase tracking-[0.5em] text-stone-600 mt-0.5 group-hover:text-stone-400 transition-colors">Administration</span>
                            </Link>
                        </div>

                        {/* Nav */}
                        <nav className="flex-1 px-4 py-8 space-y-1">
                            {navItems.map(({ href, label, slug }) => {
                                const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-4 rounded-xl transition-all group",
                                            active
                                                ? "text-[#B08D57]"
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
                                        {active && <div className="ml-auto w-1 h-1 rounded-full bg-[#B08D57]" />}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer */}
                        <div className="px-8 py-6 border-t border-stone-800 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#B08D57]/20 flex items-center justify-center text-[#B08D57] font-black text-sm">A</div>
                                <div>
                                    <p className="text-xs font-bold text-white">Aurélia M.</p>
                                    <button onClick={handleLogout} className="text-[9px] text-[#B08D57] uppercase tracking-widest font-black hover:underline flex items-center gap-1">
                                        Déconnexion <LogOut size={8} />
                                    </button>
                                </div>
                            </div>
                            <Link href="/" className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-stone-600 hover:text-[#B08D57] transition-colors">
                                <Lock size={10} />
                                Retour au site
                            </Link>
                        </div>
                    </aside>

                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Top bar */}
                        <header className="h-16 bg-white border-b border-stone-100 flex items-center justify-between px-10 flex-shrink-0">
                            <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
                                {pageTitle[pathname] ?? "Admin"}
                            </h1>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#B08D57]/10 flex items-center justify-center text-[#B08D57] font-black text-sm">A</div>
                                <span className="text-xs font-bold text-stone-700 uppercase tracking-widest">Aurélia M.</span>
                            </div>
                        </header>
                        {/* Page content */}
                        <main className="flex-1 overflow-y-auto p-10">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
