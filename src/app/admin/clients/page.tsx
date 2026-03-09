"use client";

import React, { useState } from "react";
import { Search, Phone, Mail, MoreVertical, ChevronRight, Sparkles, Scissors, Heart } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
    signature: <Sparkles size={12} className="text-amber-500" />,
    gelx: <Scissors size={12} className="text-violet-500" />,
    spa: <Heart size={12} className="text-emerald-500" />,
};

const SERVICE_COLORS: Record<string, string> = {
    signature: "bg-amber-400",
    gelx: "bg-violet-500",
    spa: "bg-emerald-500",
};

const CLIENTS = [
    { id: "C1", name: "Marie Laurent", phone: "+41 79 123 45 67", email: "marie@email.com", lastService: "signature", visits: 8, totalSpent: "CHF 680", lastVisit: "15 Mars 2026", status: "VIP" },
    { id: "C2", name: "Sophie Martin", phone: "+41 78 987 65 43", email: "sophie@email.com", lastService: "gelx", visits: 5, totalSpent: "CHF 725", lastVisit: "15 Mars 2026", status: "Régulière" },
    { id: "C3", name: "Emma Dubois", phone: "+41 76 543 21 09", email: "emma@email.com", lastService: "spa", visits: 3, totalSpent: "CHF 285", lastVisit: "16 Mars 2026", status: "Régulière" },
    { id: "C4", name: "Alice Girard", phone: "+41 79 888 77 66", email: "alice@email.com", lastService: "gelx", visits: 12, totalSpent: "CHF 1740", lastVisit: "16 Mars 2026", status: "VIP" },
    { id: "C5", name: "Clara Fontaine", phone: "+41 77 234 56 78", email: "clara@email.com", lastService: "signature", visits: 2, totalSpent: "CHF 170", lastVisit: "12 Mars 2026", status: "Nouvelle" },
    { id: "C6", name: "Léa Bernard", phone: "+41 79 345 67 89", email: "lea@email.com", lastService: "spa", visits: 6, totalSpent: "CHF 570", lastVisit: "12 Mars 2026", status: "Régulière" },
    { id: "C7", name: "Jade Moreau", phone: "+41 78 456 78 90", email: "jade@email.com", lastService: "gelx", visits: 9, totalSpent: "CHF 1305", lastVisit: "13 Mars 2026", status: "VIP" },
    { id: "C8", name: "Camille Petit", phone: "+41 76 567 89 01", email: "camille@email.com", lastService: "signature", visits: 1, totalSpent: "CHF 85", lastVisit: "13 Mars 2026", status: "Nouvelle" },
];

const STATUS_STYLES: Record<string, string> = {
    VIP: "bg-amber-100 text-amber-700",
    Régulière: "bg-violet-100 text-violet-700",
    Nouvelle: "bg-emerald-100 text-emerald-700",
};

export default function ClientsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Tous");

    const filters = ["Tous", "VIP", "Régulière", "Nouvelle"];
    const filtered = CLIENTS.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "Tous" || c.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="space-y-8">

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "Total Clients", val: CLIENTS.length, color: "text-stone-900" },
                    { label: "VIP", val: CLIENTS.filter(c => c.status === "VIP").length, color: "text-amber-500" },
                    { label: "Régulières", val: CLIENTS.filter(c => c.status === "Régulière").length, color: "text-violet-500" },
                    { label: "Nouvelles", val: CLIENTS.filter(c => c.status === "Nouvelle").length, color: "text-emerald-500" },
                ].map(s => (
                    <div key={s.label} className="p-6 bg-white border border-stone-100 rounded-2xl shadow-sm">
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black mb-1">{s.label}</p>
                        <p className={cn("text-3xl font-serif", s.color)}>{s.val}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Chercher un client…"
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-100 rounded-xl text-xs shadow-sm focus:outline-none focus:border-[#B08D57]"
                    />
                </div>
                <div className="flex items-center gap-2 bg-stone-100 rounded-xl p-1">
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                                filter === f ? "bg-white shadow text-stone-900" : "text-stone-400 hover:text-stone-600"
                            )}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-stone-100 rounded-3xl shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                            {["Client", "Contact", "Dernier service", "Visites", "Total dépensé", "Statut", ""].map(col => (
                                <th key={col} className="px-7 py-5 text-[9px] uppercase tracking-widest text-stone-400 font-black">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {filtered.map(client => (
                            <tr key={client.id} className="hover:bg-stone-50/50 transition-colors group">
                                <td className="px-7 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm", SERVICE_COLORS[client.lastService])}>
                                            {client.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-stone-900">{client.name}</p>
                                            <p className="text-[9px] text-stone-400">{client.lastVisit}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-7 py-5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs text-stone-600">
                                            <Phone size={10} className="text-stone-300" />{client.phone}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-stone-400">
                                            <Mail size={10} className="text-stone-300" />{client.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-7 py-5">
                                    <div className="flex items-center gap-1.5">
                                        {SERVICE_ICONS[client.lastService]}
                                        <span className="text-xs text-stone-700 font-medium capitalize">{client.lastService}</span>
                                    </div>
                                </td>
                                <td className="px-7 py-5">
                                    <span className="text-sm font-bold text-stone-900">{client.visits}</span>
                                    <span className="text-[10px] text-stone-400 ml-1">séances</span>
                                </td>
                                <td className="px-7 py-5">
                                    <span className="text-sm font-bold text-stone-900">{client.totalSpent}</span>
                                </td>
                                <td className="px-7 py-5">
                                    <span className={cn("text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest", STATUS_STYLES[client.status])}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-7 py-5">
                                    <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-stone-100 transition-all">
                                        <ChevronRight size={14} className="text-stone-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
