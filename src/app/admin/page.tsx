"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Calendar as CalendarIcon, Sparkles, TrendingUp, ChevronRight, Clock, MoreVertical, BanIcon, Images, MessageSquare } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useReviews } from "@/lib/reviewsStore";
import { useAppointments, Appointment } from "@/lib/appointmentsStore";
import { useClients } from "@/lib/clientsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
    const { reviews } = useReviews();
    const { appointments, init } = useAppointments();
    const { clients } = useClients();
    
    useEffect(() => {
        if (init) {
            const unsubscribe = init();
            return () => unsubscribe && unsubscribe();
        }
    }, [init]);

    const pendingReviews = reviews.filter(r => r.status === 'pending').length;
    const pendingAppts = appointments.filter((a: Appointment) => a.status === 'pending').length;

    const stats = [
        { label: "Réservations totales", val: appointments.length, change: "+12.5%", icon: CalendarIcon, iconColor: "text-amber-500", bgColor: "bg-amber-50" },
        { label: "Total Clients", val: clients.length, change: clients.length > 0 ? "Base active" : "À créer", icon: Users, iconColor: "text-violet-500", bgColor: "bg-violet-50" },
        { label: "Avis en attente", val: pendingReviews, change: pendingReviews > 0 ? "Action requise" : "À jour", icon: MessageSquare, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
        { label: "RDV en attente", val: pendingAppts, change: pendingAppts > 0 ? "À confirmer" : "À jour", icon: Sparkles, iconColor: "text-[#B08D57]", bgColor: "bg-[#B08D57]/10" },
    ];

    const quickActions = [
        { href: "/admin/calendrier", image: "/images/dashboard/calendar.png", label: "Voir le Calendrier", desc: "Gérer les RDV et disponibilités" },
        { href: "/admin/avis", image: "/images/dashboard/clients.png", label: "Modération Avis", desc: "Gérer les témoignages clients" },
        { href: "/admin/galerie", image: "/images/dashboard/gallery.png", label: "Gérer la Galerie", desc: "Ajouter et modifier les photos" },
        { href: "/admin/settings", image: "/images/dashboard/settings.png", label: "Bloquer des Jours", desc: "Vacances et jours fériés" },
    ];

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayApptsReal = appointments.filter((a: Appointment) => a.date === todayStr && a.status !== 'cancelled');
    const upcomingApptsReal = appointments.filter((a: Appointment) => a.date > todayStr && a.status !== 'cancelled')
        .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
        .slice(0, 5);

    return (
        <div className="space-y-6 md:space-y-10">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="p-4 md:p-7 bg-white border border-stone-100 rounded-2xl md:rounded-3xl shadow-sm space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center", stat.bgColor)}>
                                    <Icon size={16} className={stat.iconColor} />
                                </div>
                                <span className={cn(
                                    "text-[7px] md:text-[9px] font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-full uppercase tracking-widest",
                                    (stat.change === "+12.5%" || stat.change === "+8.2%" || stat.change === "+4.1%") ? "bg-green-50 text-green-600" : "bg-stone-100 text-stone-400"
                                )}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className="space-y-0.5">
                                <span className="text-[7px] md:text-[9px] uppercase tracking-widest text-stone-400 font-black">{stat.label}</span>
                                <p className="text-xl md:text-2xl font-serif text-stone-900">{stat.val}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                {/* Today's appointments */}
                <div className="lg:col-span-1 bg-white border border-stone-100 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 md:p-7 border-b border-stone-100 flex items-center justify-between bg-stone-50/30">
                        <div>
                            <h3 className="font-serif text-base md:text-lg text-stone-900">Aujourd'hui</h3>
                            <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-400 font-black mt-0.5">
                                {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                            </p>
                        </div>
                        <Link href="/admin/calendrier" className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#B08D57] font-black hover:underline flex items-center gap-1">
                            Tous <ChevronRight size={10} />
                        </Link>
                    </div>
                    <div className="p-5 md:p-7 space-y-4 flex-1">
                        {todayApptsReal.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3 opacity-30">
                                <Clock size={24} className="text-stone-300" />
                                <p className="text-xs text-stone-400 italic">Aucun RDV aujourd'hui</p>
                            </div>
                        ) : todayApptsReal.map((appt: Appointment, i: number) => (
                            <div key={appt.id} className="flex items-center gap-4 p-4 rounded-xl md:rounded-2xl bg-stone-50 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className={cn("absolute left-0 top-0 bottom-0 w-1 bg-amber-400")} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-stone-900 truncate">{appt.client}</p>
                                    <p className="text-[9px] md:text-[10px] text-stone-400 uppercase tracking-widest truncate">{appt.service}</p>
                                </div>
                                <span className="text-xs font-bold text-stone-700 bg-white px-2 py-1 rounded-lg shadow-sm">{appt.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming appointments */}
                <div className="lg:col-span-2 bg-white border border-stone-100 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 md:p-7 border-b border-stone-100 flex items-center justify-between bg-stone-50/30">
                        <div>
                            <h3 className="font-serif text-base md:text-lg text-stone-900">Prochains Rendez-vous</h3>
                            <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-400 font-black mt-0.5">Planning à venir</p>
                        </div>
                        <Link href="/admin/calendrier" className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#B08D57] font-black hover:underline flex items-center gap-1">
                            Calendrier <ChevronRight size={10} />
                        </Link>
                    </div>
                    <div className="divide-y divide-stone-50 flex-1 overflow-x-auto">
                        {upcomingApptsReal.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3 opacity-30">
                                <CalendarIcon size={24} className="text-stone-300" />
                                <p className="p-10 text-center text-xs text-stone-400 italic">Aucun rendez-vous à venir</p>
                            </div>
                        ) : upcomingApptsReal.map((appt: Appointment, i: number) => (
                            <div key={appt.id} className="px-5 md:px-7 py-4 flex items-center gap-4 hover:bg-stone-50 transition-colors group">
                                <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#CFC4AC]")} />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-stone-400 w-12 md:w-24">
                                    {new Date(appt.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                </span>
                                <span className="text-xs font-bold text-stone-600 w-10 md:w-12">{appt.time}</span>
                                <span className="text-sm font-bold text-stone-900 flex-1 truncate">{appt.client}</span>
                                <span className="hidden sm:inline text-xs text-stone-400 uppercase tracking-widest text-[9px] truncate max-w-[100px]">{appt.service}</span>
                                <Link
                                    href="/admin/calendrier"
                                    className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-[#B08D57]/10 text-[#B08D57] text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all hover:bg-[#B08D57] hover:text-white"
                                >
                                    Gérer
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div>
                <h3 className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-stone-400 mb-4 md:mb-5">Accès rapide</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {quickActions.map(({ href, image, label, desc }) => (
                        <Link key={href + label} href={href}
                            className="group relative h-28 sm:h-40 md:h-48 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
                        >
                            <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                                <p className="text-xs md:text-sm font-bold text-white mb-1">{label}</p>
                                <p className="text-[8px] md:text-[9px] text-stone-200 leading-relaxed group-hover:opacity-100 transition-opacity duration-500 opacity-60 line-clamp-2 md:line-clamp-none">{desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
