"use client";

import React, { useState, useEffect } from "react";
import { Search, Phone, Mail, MoreVertical, Sparkles, Scissors, Heart, UserPlus, Loader2, Trash2, User } from "lucide-react";
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
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
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
        <div className="space-y-6 md:space-y-10">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                    { label: "Total Clients", val: clients.length, color: "text-stone-900" },
                    { label: "VIP", val: clients.filter(c => c.status === "VIP").length, color: "text-amber-500" },
                    { label: "Réguliers", val: clients.filter(c => c.status === "Régulier" || c.status === "Régulière").length, color: "text-violet-500" },
                    { label: "Nouveaux", val: clients.filter(c => c.status === "Nouveau" || c.status === "Nouvelle").length, color: "text-emerald-500" },
                ].map(s => (
                    <div key={s.label} className="p-4 md:p-6 bg-white border border-stone-100 rounded-2xl md:rounded-3xl shadow-sm">
                        <p className="text-[7px] md:text-[9px] uppercase tracking-widest text-stone-400 font-black mb-1">{s.label}</p>
                        <p className={cn("text-xl md:text-3xl font-serif", s.color)}>{s.val}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1 group">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#B08D57] transition-colors" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Chercher par nom, email ou tél…"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-stone-100 rounded-2xl text-xs md:text-sm shadow-sm focus:outline-none focus:border-[#B08D57] focus:ring-4 focus:ring-[#B08D57]/5 transition-all"
                    />
                </div>
                
                <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide">
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={cn("px-4 md:px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                filter === f ? "bg-white shadow-sm text-stone-900" : "text-stone-400 hover:text-stone-600"
                            )}>
                            {f}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-950 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10"
                >
                    <UserPlus size={14} /> Ajouter
                </button>
            </div>

            {/* List */}
            {clients.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-stone-100 rounded-[2.5rem] py-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto">
                        <User className="text-stone-200" size={32} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-stone-900 font-serif text-xl">Aucun client pour le moment</p>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold max-w-xs mx-auto leading-relaxed">Les clients enregistrés lors des réservations apparaîtront ici automatiquement.</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Desktop View */}
                    <div className="hidden lg:block bg-white border border-stone-100 rounded-[2.5rem] shadow-xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50/50 border-b border-stone-50">
                                    {["Client", "Contact", "Dernier service", "Visites", "Statut", ""].map(col => (
                                        <th key={col} className="px-10 py-6 text-[9px] uppercase tracking-[0.3em] text-stone-400 font-black">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {filtered.map(client => (
                                    <tr key={client.id} className="hover:bg-stone-50/30 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-sm", SERVICE_COLORS[client.lastService] || "bg-stone-400")}>
                                                    {client.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-stone-900 leading-tight">{client.name}</p>
                                                    <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest font-black italic">Dernier : {client.lastVisit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                                                    <Phone size={12} className="text-[#B08D57]" />{client.phone}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-stone-400 font-medium">
                                                    <Mail size={12} className="text-stone-300" />{client.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-100">
                                                    {SERVICE_ICONS[client.lastService]}
                                                </div>
                                                <span className="text-[10px] uppercase tracking-widest text-stone-700 font-black">{client.lastService}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-lg font-serif italic text-stone-900">{client.visits}</span>
                                                <span className="text-[8px] text-stone-400 font-black uppercase tracking-widest">séances</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={cn("text-[8px] px-3 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-sm", STATUS_STYLES[client.status])}>
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button 
                                                onClick={() => handleDelete(client.id, client.name)}
                                                className="opacity-0 group-hover:opacity-100 p-3 rounded-2xl hover:bg-rose-50 text-rose-300 hover:text-rose-500 transition-all border border-transparent hover:border-rose-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden space-y-4">
                        {filtered.map((client, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={client.id}
                                className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm space-y-5"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-sm", SERVICE_COLORS[client.lastService] || "bg-stone-400")}>
                                            {client.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-stone-900 leading-tight">{client.name}</p>
                                            <span className={cn("inline-block mt-1 text-[7px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-sm", STATUS_STYLES[client.status])}>
                                                {client.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(client.id, client.name)}
                                        className="p-2.5 rounded-xl bg-rose-50 text-rose-400 border border-rose-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1 border-t border-stone-50">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
                                            <Phone size={12} className="text-[#B08D57]" /> {client.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-stone-400 truncate pr-2">
                                            <Mail size={12} /> {client.email}
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-1.5 justify-end">
                                            {SERVICE_ICONS[client.lastService]}
                                            <span className="text-[9px] uppercase tracking-widest text-stone-700 font-black">{client.lastService}</span>
                                        </div>
                                        <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">Visites: <span className="text-stone-900 ml-1">{client.visits}</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 100 }}
                            className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-8 md:p-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-3xl font-serif text-stone-900 italic">Nouveau Client</h3>
                                    <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-stone-50 rounded-full transition-colors text-stone-400">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleAddClient} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Identité</label>
                                        <input required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})}
                                            className="w-full border border-stone-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-sm bg-stone-50/30"
                                            placeholder="Ex: Sarah Martin"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Email</label>
                                        <input required type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})}
                                            className="w-full border border-stone-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-sm bg-stone-50/30"
                                            placeholder="sarah@email.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Téléphone mobile</label>
                                        <input required value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})}
                                            className="w-full border border-stone-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-sm bg-stone-50/30"
                                            placeholder="+41 7x xxx xx xx"
                                        />
                                    </div>
                                    <div className="pt-6 flex flex-col md:flex-row gap-3">
                                        <button type="submit"
                                            className="w-full order-first md:order-last py-4 bg-stone-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10"
                                        >
                                            Enregistrer le client
                                        </button>
                                        <button type="button" onClick={() => setIsAdding(false)}
                                            className="w-full py-4 border border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:bg-stone-50 transition-all font-bold"
                                        >
                                            Annuler
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

function X({ size, className }: { size?: number, className?: string }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
}
