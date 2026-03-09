"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, Images, Settings, Lock, ChevronRight, Scissors } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/calendrier", label: "Calendrier", icon: Calendar },
    { href: "/admin/services", label: "Services", icon: Scissors },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/galerie", label: "Galerie", icon: Images },
    { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

function Sidebar({ pathname }: { pathname: string }) {
    return (
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
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm group",
                                active
                                    ? "bg-[#B08D57]/20 text-[#B08D57] font-bold"
                                    : "text-stone-500 hover:text-white hover:bg-stone-900"
                            )}
                        >
                            <Icon size={16} className={active ? "text-[#B08D57]" : ""} />
                            <span className="tracking-wide">{label}</span>
                            {active && <ChevronRight size={12} className="ml-auto text-[#B08D57]" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-stone-800 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B08D57]/20 flex items-center justify-center text-[#B08D57] font-black text-sm">A</div>
                    <div>
                        <p className="text-xs font-bold text-white">Aurélia M.</p>
                        <p className="text-[9px] text-stone-600">Propriétaire</p>
                    </div>
                </div>
                <Link href="/" className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-stone-600 hover:text-[#B08D57] transition-colors">
                    <Lock size={10} />
                    Retour au site
                </Link>
            </div>
        </aside>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const pageTitle: Record<string, string> = {
        "/admin": "Tableau de bord",
        "/admin/calendrier": "Calendrier & Disponibilités",
        "/admin/services": "Gestion des Services",
        "/admin/clients": "Gestion des Clients",
        "/admin/galerie": "Gestion de la Galerie",
        "/admin/settings": "Paramètres",
    };

    return (
        <html lang="fr" className={inter.className}>
            <body className="bg-stone-50 text-stone-950">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar pathname={pathname} />
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
