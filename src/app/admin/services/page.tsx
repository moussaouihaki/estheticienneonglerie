"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, RotateCcw, Eye, EyeOff, Clock, Upload } from "lucide-react";
import { useServices } from "@/lib/servicesStore";
import type { Service } from "@/lib/servicesStore";

const PRESET_COLORS = [
    "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#3B82F6", "#06B6D4",
    "#10B981", "#84CC16", "#F97316", "#B08D57", "#6B7280", "#1C1917",
];

const PRESET_ICONS = ["✨", "💎", "🌿", "💅", "🌸", "🌙", "🦋", "🌹", "🪷", "💆", "🌺", "🍃"];

type EditForm = Omit<Service, "id"> & { id?: string };

const EMPTY_FORM: EditForm = {
    name: "", description: "", duration: 60, price: 0,
    color: "#B08D57", icon: "✨", image: "/images/services/signature.png", visible: true,
};

export default function ServicesAdminPage() {
    const { services, update, resetServices, loading } = useServices();
    const [editing, setEditing] = useState<EditForm | null>(null);
    const [isNew, setIsNew] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editing) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            setEditing({ ...editing, image: result });
        };
        reader.readAsDataURL(file);
    };

    const openNew = () => { setEditing({ ...EMPTY_FORM }); setIsNew(true); };
    const openEdit = (svc: Service) => { setEditing({ ...svc }); setIsNew(false); };
    const closeEdit = () => { setEditing(null); setIsNew(false); };

    const saveEdit = () => {
        if (!editing) return;
        if (isNew) {
            update([...services, { ...editing, id: `svc_${Date.now()}` } as Service]);
        } else {
            update(services.map(s => s.id === editing.id ? { ...editing as Service } : s));
        }
        closeEdit();
    };

    const deleteService = (id: string) => { if (confirm("Supprimer ce service ?")) update(services.filter(s => s.id !== id)); };
    const toggleVisible = (id: string) => update(services.map(s => s.id === id ? { ...s, visible: !s.visible } : s));

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-stone-100 border-t-[#B08D57] rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-8 md:space-y-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-serif text-stone-900 italic leading-tight">Services & Prestations</h1>
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                        {services.length} prestations — {services.filter(s => s.visible).length} actives sur le site
                    </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <button onClick={() => { if (confirm("Réinitialiser les services ?")) resetServices(); }}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 rounded-2xl text-[9px] font-black uppercase tracking-widest text-stone-400 hover:bg-stone-50 transition-all font-bold">
                        <RotateCcw size={12} /> Reset
                    </button>
                    <button onClick={openNew}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-stone-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10"
                    >
                        <Plus size={14} /> Nouveau
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {services.map(svc => (
                        <motion.div
                            key={svc.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`bg-white border border-stone-100 rounded-[2.5rem] shadow-sm overflow-hidden group transition-all hover:shadow-xl ${!svc.visible ? "opacity-60 grayscale-[0.5]" : ""}`}
                        >
                            <div className="h-1.5" style={{ background: svc.color }} />
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 border border-stone-50 bg-stone-50">
                                            <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-lg text-stone-900 leading-tight">{svc.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-[#B08D57] bg-[#B08D57]/5 px-2 py-0.5 rounded-full">CHF {svc.price}</span>
                                                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> {svc.duration}m</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => toggleVisible(svc.id)} className="p-2.5 rounded-xl hover:bg-stone-50 text-stone-300 transition-colors">
                                        {svc.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                </div>

                                <p className="text-xs text-stone-500 leading-relaxed italic line-clamp-2">"{svc.description}"</p>

                                <div className="flex items-center gap-2 pt-4 border-t border-stone-50">
                                    <button onClick={() => openEdit(svc)} className="flex-1 py-3 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all">
                                        Modifier
                                    </button>
                                    <button onClick={() => deleteService(svc.id)} className="p-3 rounded-xl hover:bg-rose-50 text-rose-300 hover:text-rose-500 transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {editing && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={e => e.target === e.currentTarget && closeEdit()}>
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] relative"
                        >
                            <div className="h-2 sticky top-0 z-10" style={{ background: editing.color }} />
                            <div className="p-8 md:p-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-3xl font-serif text-stone-900 italic">{isNew ? "Nouveau Service" : "Détails Prestation"}</h3>
                                    <button onClick={closeEdit} className="p-3 hover:bg-stone-50 rounded-full text-stone-300"><X size={20} /></button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Nom</label>
                                        <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}
                                            className="w-full border border-stone-50 bg-stone-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-inner" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Description</label>
                                        <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })}
                                            rows={2} className="w-full border border-stone-50 bg-stone-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-inner resize-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Durée (min)</label>
                                            <input type="number" step={15} value={editing.duration} onChange={e => setEditing({ ...editing, duration: Number(e.target.value) })}
                                                className="w-full border border-stone-50 bg-stone-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-inner" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Prix (CHF)</label>
                                            <input type="number" step={5} value={editing.price} onChange={e => setEditing({ ...editing, price: Number(e.target.value) })}
                                                className="w-full border border-stone-50 bg-stone-50/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#B08D57] shadow-inner" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Visuel</label>
                                        <div className="flex gap-4 items-center">
                                            <img src={editing.image} className="w-20 h-20 rounded-2xl object-cover border border-stone-100 shadow-sm" />
                                            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-3 border border-stone-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-stone-400 hover:bg-stone-50">
                                                <Upload size={12} /> Télécharger
                                            </button>
                                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Couleur thématique</label>
                                        <div className="flex flex-wrap gap-2.5">
                                            {PRESET_COLORS.map(c => (
                                                <button key={c} onClick={() => setEditing({ ...editing, color: c })}
                                                    className={`w-8 h-8 rounded-full transition-all border-4 ${editing.color === c ? "border-stone-900 scale-110 shadow-lg" : "border-transparent"}`}
                                                    style={{ background: c }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-stone-50">
                                    <button onClick={saveEdit} className="w-full order-first sm:order-last py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#B08D57] transition-all shadow-xl shadow-stone-900/10">
                                        Enregistrer
                                    </button>
                                    <button onClick={closeEdit} className="w-full py-4 border border-stone-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 hover:bg-stone-50 transition-all font-bold">
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
