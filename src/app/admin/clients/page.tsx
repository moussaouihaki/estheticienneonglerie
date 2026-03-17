"use client";

import React, { useState } from "react";
import { Search, Phone, Mail, MoreVertical, ChevronRight, Sparkles, Scissors, Heart, UserPlus, Loader2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useClients, type Client } from "@/lib/clientsStore";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
    signature: <Sparkles size={12} className="text-amber-500" />,
    gelx: <Scissors size={12} className="text-violet-500" />,
    spa: <Heart size={12} className="text-emerald-500" />,
    acrygel: <Sparkles size={12} className="text-stone-500" />,
    gel: <Scissors size={12} className="text-stone-500" />,
    fill: <Scissors size={12} className="text-stone-500" />,
    art: <Heart size={12} className="text-stone-500" />,
};

const SERVICE_COLORS: Record<string, string> = {
    signature: "bg-amber-400",
    gelx: "bg-violet-500",
    spa: "bg-emerald-500",
    acrygel: "bg-stone-500",
    gel: "bg-[#CFC4AC]",
    fill: "bg-[#805836]",
    art: "bg-rose-400",
};

const STATUS_STYLES: Record<string, string> = {
    VIP: "bg-amber-100 text-amber-700",
    Régulier: "bg-violet-100 text-violet-700",
    Régulière: "bg-violet-100 text-violet-700",
    Nouveau: "bg-emerald-100 text-emerald-700",
    Nouvelle: "bg-emerald-100 text-emerald-700",
};

export default function ClientsPage() {
    const { clients, loading, addClient, deleteClient } = useClients();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Tous");
    const [isAdding, setIsAdding] = useState(false);
    const [newClient, setNewClient] = useState({
        name: "", email: "", phone: "", status: "Nouveau" as const,
        visits: 0, totalSpent: "CHF 0", lastVisit: "Jamais", lastService: "gel"
    });

    const filters = ["Tous", "VIP", "Régulier", "Nouveau"];
    const filtered = clients.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "Tous" || c.status === filter || (filter === "Régulier" && c.status === "Régulière") || (filter === "Nouveau" && c.status === "Nouvelle");
        return matchSearch && matchFilter;
    });

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        await addClient({
            ...newClient,
            lastVisit: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        });
        setIsAdding(false);
        setNewClient({
            name: "", email: "", phone: "", status: "Nouveau",
            visits: 0, totalSpent: "CHF 0", lastVisit: "Jamais", lastService: "gel"
        });
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Supprimer le client ${name} ?`)) {
            await deleteClient(id);
        }
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="animate-spin text-stone-300" size={40} />
        </div>
    );

    return (
        <div className="space-y-8">

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "Total Clients", val: clients.length, color: "text-stone-900" },
                    { label: "VIP", val: clients.filter(c => c.status === "VIP").length, color: "text-amber-500" },
                    { label: "Réguliers", val: clients.filter(c => c.status === "Régulier" || c.status === "Régulière").length, color: "text-violet-500" },
                    { label: "Nouveaux", val: clients.filter(c => c.status === "Nouveau" || c.status === "Nouvelle").length, color: "text-emerald-500" },
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
                <button 
                    onClick={() => setIsAdding(true)}
                    className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all"
                >
                    <UserPlus size={14} /> Ajouter
                </button>
            </div>

            {/* Table */}
            {clients.length === 0 ? (
                <div className="bg-white border border-dashed border-stone-200 rounded-3xl p-20 text-center space-y-4">
                    <Sparkles className="mx-auto text-stone-200" size={40} />
                    <p className="text-stone-400 italic font-light">Votre base de données clients est vide.</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">Les clients s'ajouteront au fur et à mesure des réservations.</p>
                </div>
            ) : (
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
                                            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm", SERVICE_COLORS[client.lastService] || "bg-stone-400")}>
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
                                    <td className="px-7 py-5 text-right">
                                        <button 
                                            onClick={() => handleDelete(client.id, client.name)}
                                            className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-rose-50 text-rose-400 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Client Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-serif text-stone-900">Nouveau Client</h3>
                                    <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>

                                <form onSubmit={handleAddClient} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Nom complet</label>
                                        <input 
                                            required
                                            value={newClient.name}
                                            onChange={e => setNewClient({...newClient, name: e.target.value})}
                                            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]"
                                            placeholder="Marie L."
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Email</label>
                                        <input 
                                            required
                                            type="email"
                                            value={newClient.email}
                                            onChange={e => setNewClient({...newClient, email: e.target.value})}
                                            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]"
                                            placeholder="marie@email.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Téléphone</label>
                                        <input 
                                            required
                                            value={newClient.phone}
                                            onChange={e => setNewClient({...newClient, phone: e.target.value})}
                                            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]"
                                            placeholder="+41..."
                                        />
                                    </div>
                                    <div className="pt-4 flex gap-3">
                                        <button 
                                            type="button"
                                            onClick={() => setIsAdding(false)}
                                            className="flex-1 py-3 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-50"
                                        >
                                            Annuler
                                        </button>
                                        <button 
                                            type="submit"
                                            className="flex-1 py-3 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all"
                                        >
                                            Ajouter
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
