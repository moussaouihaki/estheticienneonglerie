"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, RotateCcw, Eye, EyeOff, Clock, CircleDollarSign, Upload } from "lucide-react";
import { useServices, resetServices } from "@/lib/servicesStore";
import type { Service } from "@/lib/servicesStore";

const PRESET_COLORS = [
    "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#3B82F6", "#06B6D4",
    "#10B981", "#84CC16", "#F97316", "#B08D57", "#6B7280", "#1C1917",
];

const PRESET_ICONS = ["✨", "💎", "🌿", "💅", "🌸", "🌙", "🦋", "🌹", "🪷", "💆", "🌺", "🍃"];

function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

type EditForm = Omit<Service, "id"> & { id?: string };

const EMPTY_FORM: EditForm = {
    name: "", description: "", duration: 60, price: 0,
    color: "#B08D57", icon: "✨", image: "/images/services/signature.png", visible: true,
};

export default function ServicesAdminPage() {
    const { services, update } = useServices();
    const [editing, setEditing] = useState<EditForm | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [customColor, setCustomColor] = useState("#B08D57");
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

    const openNew = () => {
        setEditing({ ...EMPTY_FORM });
        setIsNew(true);
    };

    const openEdit = (svc: Service) => {
        setEditing({ ...svc });
        setCustomColor(svc.color);
        setIsNew(false);
    };

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

    const deleteService = (id: string) => {
        if (confirm("Supprimer ce service ?")) update(services.filter(s => s.id !== id));
    };

    const toggleVisible = (id: string) =>
        update(services.map(s => s.id === id ? { ...s, visible: !s.visible } : s));

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                        {services.length} service{services.length > 1 ? "s" : ""} — {services.filter(s => s.visible).length} visible{services.filter(s => s.visible).length > 1 ? "s" : ""} sur le site
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => { if (confirm("Réinitialiser les services par défaut ?")) resetServices(); }}
                        className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-500 hover:bg-stone-50 transition-all">
                        <RotateCcw size={13} /> Réinitialiser
                    </button>
                    <button onClick={openNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all">
                        <Plus size={14} /> Nouveau service
                    </button>
                </div>
            </div>

            {/* Services cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {services.map(svc => (
                        <motion.div
                            key={svc.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`bg-white border rounded-3xl shadow-sm overflow-hidden group transition-all hover:shadow-lg ${!svc.visible ? "opacity-60" : ""}`}
                            style={{ borderColor: svc.color + "40" }}
                        >
                            {/* Color header */}
                            <div className="h-2" style={{ background: svc.color }} />

                            <div className="p-7 space-y-5">
                                {/* Icon + name */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                            <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-stone-900 leading-tight">{svc.name}</h4>
                                            {!svc.visible && (
                                                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-black flex items-center gap-1 mt-0.5">
                                                    <EyeOff size={9} /> Masqué
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-stone-500 leading-relaxed">{svc.description}</p>

                                {/* Duration + price */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5" style={{ color: svc.color }}>
                                        <Clock size={13} />
                                        <span className="text-xs font-bold">{svc.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1.5" style={{ color: svc.color }}>
                                        <CircleDollarSign size={13} />
                                        <span className="text-xs font-bold">CHF {svc.price}</span>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1.5">
                                        <div className="w-4 h-4 rounded-full border-2 border-white shadow" style={{ background: svc.color }} />
                                        <span className="text-[9px] font-mono text-stone-400">{svc.color}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2 border-t border-stone-50">
                                    <button onClick={() => openEdit(svc)}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-600 transition-all">
                                        <Pencil size={12} /> Modifier
                                    </button>
                                    <button onClick={() => toggleVisible(svc.id)}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-600 transition-all">
                                        {svc.visible ? <EyeOff size={12} /> : <Eye size={12} />}
                                        {svc.visible ? "Masquer" : "Afficher"}
                                    </button>
                                    <button onClick={() => deleteService(svc.id)}
                                        className="ml-auto p-2 rounded-lg text-red-400 hover:bg-red-50 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* ─── Edit / Create Modal ─────────────────────────────────────── */}
            <AnimatePresence>
                {editing && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={e => e.target === e.currentTarget && closeEdit()}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            {/* Modal header with live color preview */}
                            <div className="h-2" style={{ background: editing.color }} />
                            <div className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-serif text-stone-900">
                                        {isNew ? "Nouveau service" : "Modifier le service"}
                                    </h3>
                                    <button onClick={closeEdit} className="p-2 rounded-full hover:bg-stone-100"><X size={16} /></button>
                                </div>

                                <div className="space-y-5">
                                    {/* Name */}
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Nom du service</label>
                                        <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}
                                            placeholder="ex: Manucure Russe Prestige"
                                            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]" />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Description</label>
                                        <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })}
                                            placeholder="Décrivez le service en quelques mots..."
                                            rows={2}
                                            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57] resize-none" />
                                    </div>

                                    {/* Duration + Price */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Durée (minutes)</label>
                                            <input type="number" min={15} step={15} value={editing.duration}
                                                onChange={e => setEditing({ ...editing, duration: Number(e.target.value) })}
                                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Prix (CHF)</label>
                                            <input type="number" min={0} step={5} value={editing.price}
                                                onChange={e => setEditing({ ...editing, price: Number(e.target.value) })}
                                                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B08D57]" />
                                        </div>
                                    </div>

                                    {/* Image Selection */}
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Photo du service (Upload)</label>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-20 h-20 rounded-2xl bg-stone-50 overflow-hidden border border-stone-100 flex-shrink-0 relative group">
                                                <img src={editing.image} alt="" className="w-full h-full object-cover transition-opacity group-hover:opacity-40" />
                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                                >
                                                    <Plus size={20} className="text-stone-900" />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-600 hover:bg-stone-50 transition-all"
                                                >
                                                    Changer la photo
                                                </button>
                                                <p className="text-[9px] text-stone-400 leading-tight">
                                                    Format recommandé: 1:1 (carré) ou 4:5. <br />
                                                    La photo s'affichera dans le catalogue.
                                                </p>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Icône</label>
                                        <div className="flex flex-wrap gap-2">
                                            {PRESET_ICONS.map(ic => (
                                                <button key={ic} onClick={() => setEditing({ ...editing, icon: ic })}
                                                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border-2 transition-all ${editing.icon === ic ? "border-stone-900 bg-stone-50" : "border-transparent hover:bg-stone-50"}`}>
                                                    {ic}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Color */}
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">Couleur du service</label>
                                        <div className="flex flex-wrap gap-2">
                                            {PRESET_COLORS.map(c => (
                                                <button key={c} onClick={() => setEditing({ ...editing, color: c })}
                                                    className={`w-8 h-8 rounded-full border-4 transition-all ${editing.color === c ? "border-stone-900 scale-110" : "border-transparent hover:scale-105"}`}
                                                    style={{ background: c }} />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3 mt-2">
                                            <input type="color" value={editing.color}
                                                onChange={e => setEditing({ ...editing, color: e.target.value })}
                                                className="w-10 h-10 rounded-xl cursor-pointer border border-stone-200" />
                                            <span className="text-xs font-mono text-stone-500">{editing.color}</span>
                                            <div className="ml-auto px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: editing.color }}>
                                                Aperçu
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-stone-100">
                                    <button onClick={closeEdit}
                                        className="flex-1 py-3 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-50">
                                        Annuler
                                    </button>
                                    <button onClick={saveEdit}
                                        className="flex-1 py-3 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all flex items-center justify-center gap-2">
                                        <Save size={13} /> Enregistrer
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
