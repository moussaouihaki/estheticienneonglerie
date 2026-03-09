"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Calendar as CalendarIcon, Sparkles, TrendingUp, ChevronRight, Clock, MoreVertical, BanIcon, Images } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const stats = [
    { label: "Réservations ce mois", val: "124", change: "+12.5%", icon: CalendarIcon, iconColor: "text-amber-500", bgColor: "bg-amber-50" },
    { label: "Nouveaux Clients", val: "42", change: "+8.2%", icon: Users, iconColor: "text-violet-500", bgColor: "bg-violet-50" },
    { label: "Prestations Actives", val: "3", change: "Stable", icon: Sparkles, iconColor: "text-emerald-500", bgColor: "bg-emerald-50" },
    { label: "Chiffre d'Affaire", val: "CHF 12,450", change: "+4.1%", icon: TrendingUp, iconColor: "text-[#B08D57]", bgColor: "bg-[#B08D57]/10" },
];

const todayAppointments = [
    { time: "10:00", client: "Marie Laurent", service: "Signature", duration: "60 min", color: "bg-amber-400" },
    { time: "13:30", client: "Sophie Martin", service: "Gel-X", duration: "120 min", color: "bg-violet-500" },
];

const upcomingAppointments = [
    { date: "Lun 10", client: "Marie Laurent", service: "Signature", time: "10:00", color: "bg-amber-400" },
    { date: "Lun 10", client: "Sophie Martin", service: "Gel-X", time: "13:30", color: "bg-violet-500" },
    { date: "Mar 11", client: "Emma Dubois", service: "Spa", time: "11:00", color: "bg-emerald-500" },
    { date: "Mer 12", client: "Clara Fontaine", service: "Signature", time: "09:30", color: "bg-amber-400" },
    { date: "Mer 12", client: "Léa Bernard", service: "Spa", time: "14:00", color: "bg-emerald-500" },
];

const quickActions = [
    { href: "/admin/calendrier", image: "/images/dashboard/calendar.png", label: "Voir le Calendrier", desc: "Gérer les RDV et disponibilités" },
    { href: "/admin/clients", image: "/images/dashboard/clients.png", label: "Gestion Clients", desc: "Voir et gérer vos clientes" },
    { href: "/admin/galerie", image: "/images/dashboard/gallery.png", label: "Gérer la Galerie", desc: "Ajouter et modifier les photos" },
    { href: "/admin/calendrier", image: "/images/dashboard/settings.png", label: "Bloquer des Jours", desc: "Vacances et jours fériés" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="p-7 bg-white border border-stone-100 rounded-2xl shadow-sm space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bgColor)}>
                                    <Icon size={18} className={stat.iconColor} />
                                </div>
                                <span className={cn(
                                    "text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest",
                                    stat.change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-stone-100 text-stone-400"
                                )}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-black">{stat.label}</span>
                                <p className="text-2xl font-serif text-stone-900">{stat.val}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Today's appointments */}
                <div className="lg:col-span-1 bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-7 border-b border-stone-100 flex items-center justify-between">
                        <div>
                            <h3 className="font-serif text-lg text-stone-900">Aujourd'hui</h3>
                            <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black mt-0.5">
                                {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                            </p>
                        </div>
                        <Link href="/admin/calendrier" className="text-[9px] uppercase tracking-widest text-[#B08D57] font-black hover:underline flex items-center gap-1">
                            Tout voir <ChevronRight size={10} />
                        </Link>
                    </div>
                    <div className="p-7 space-y-4">
                        {todayAppointments.length === 0 ? (
                            <p className="text-sm text-stone-400 italic text-center py-8">Aucun RDV aujourd'hui</p>
                        ) : todayAppointments.map((appt, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 relative overflow-hidden">
                                <div className={cn("absolute left-0 top-0 bottom-0 w-1", appt.color)} />
                                <Clock size={14} className="text-stone-400 ml-2" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-stone-900 truncate">{appt.client}</p>
                                    <p className="text-[10px] text-stone-400">{appt.service} · {appt.duration}</p>
                                </div>
                                <span className="text-xs font-bold text-stone-700">{appt.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming appointments */}
                <div className="lg:col-span-2 bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-7 border-b border-stone-100 flex items-center justify-between">
                        <div>
                            <h3 className="font-serif text-lg text-stone-900">Prochains Rendez-vous</h3>
                            <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black mt-0.5">Cette semaine</p>
                        </div>
                        <Link href="/admin/calendrier" className="text-[9px] uppercase tracking-widest text-[#B08D57] font-black hover:underline flex items-center gap-1">
                            Calendrier complet <ChevronRight size={10} />
                        </Link>
                    </div>
                    <div className="divide-y divide-stone-50">
                        {upcomingAppointments.map((appt, i) => (
                            <div key={i} className="px-7 py-4 flex items-center gap-4 hover:bg-stone-50 transition-colors group">
                                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", appt.color)} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 w-14">{appt.date}</span>
                                <span className="text-xs font-bold text-stone-600 w-12">{appt.time}</span>
                                <span className="text-sm font-bold text-stone-900 flex-1">{appt.client}</span>
                                <span className="text-xs text-stone-400">{appt.service}</span>
                                <button
                                    className="opacity-0 group-hover:opacity-100 px-4 py-1.5 rounded-full bg-[#B08D57]/10 text-[#B08D57] text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#B08D57] hover:text-white"
                                >
                                    Gérer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div>
                <h3 className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-5">Accès rapide</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickActions.map(({ href, image, label, desc }) => (
                        <Link key={href + label} href={href}
                            className="group relative h-48 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
                        >
                            <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-sm font-bold text-white mb-1">{label}</p>
                                <p className="text-[9px] text-stone-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
