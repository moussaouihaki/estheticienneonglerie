"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Upload, X, GripVertical, Eye, EyeOff, Tag } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type GalleryImage = {
    id: string;
    url: string;
    title: string;
    tag: string;
    visible: boolean;
};

const TAGS = ["Signature", "Gel-X", "Spa", "Nail Art", "French", "Saisonnière"];

const INIT_IMAGES: GalleryImage[] = [
    { id: "G1", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80", title: "Pose Neutre Signature", tag: "Signature", visible: true },
    { id: "G2", url: "https://images.unsplash.com/photo-1604654894577-4d3e71a57e95?auto=format&fit=crop&w=800&q=80", title: "French Gold Art", tag: "French", visible: true },
    { id: "G3", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80", title: "Gel-X Prestige Ivoire", tag: "Gel-X", visible: true },
    { id: "G4", url: "https://images.unsplash.com/photo-1604654894577-4d3e71a57e95?auto=format&fit=crop&w=800&q=80", title: "Nail Art Floral", tag: "Nail Art", visible: true },
    { id: "G5", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80", title: "Spa — Soin Mains Luxe", tag: "Spa", visible: false },
    { id: "G6", url: "https://images.unsplash.com/photo-1604654894577-4d3e71a57e95?auto=format&fit=crop&w=800&q=80", title: "Édition Noël 2025", tag: "Saisonnière", visible: true },
];

export default function GaleriePage() {
    const [images, setImages] = useState<GalleryImage[]>(INIT_IMAGES);
    const [preview, setPreview] = useState<GalleryImage | null>(null);
    const [filter, setFilter] = useState<string>("Tous");
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editTag, setEditTag] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const visible = images.filter(i => i.visible).length;
    const filtered = filter === "Tous" ? images : images.filter(i => i.tag === filter);

    const toggleVisible = (id: string) =>
        setImages(prev => prev.map(i => i.id === id ? { ...i, visible: !i.visible } : i));

    const deleteImage = (id: string) =>
        setImages(prev => prev.filter(i => i.id !== id));

    const startEdit = (img: GalleryImage) => {
        setEditId(img.id);
        setEditTitle(img.title);
        setEditTag(img.tag);
    };

    const saveEdit = () => {
        setImages(prev => prev.map(i => i.id === editId ? { ...i, title: editTitle, tag: editTag } : i));
        setEditId(null);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImages(prev => [...prev, {
            id: `G${Date.now()}`,
            url,
            title: file.name.replace(/\.[^.]+$/, ""),
            tag: "Signature",
            visible: true,
        }]);
    };

    return (
        <div className="space-y-8">

            {/* Header stats */}
            <div className="flex items-center gap-6">
                <div className="px-6 py-4 bg-white border border-stone-100 rounded-2xl shadow-sm">
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Total photos</p>
                    <p className="text-2xl font-serif text-stone-900">{images.length}</p>
                </div>
                <div className="px-6 py-4 bg-white border border-stone-100 rounded-2xl shadow-sm">
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Visibles sur le site</p>
                    <p className="text-2xl font-serif text-emerald-600">{visible}</p>
                </div>
                <div className="px-6 py-4 bg-white border border-stone-100 rounded-2xl shadow-sm">
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">Masquées</p>
                    <p className="text-2xl font-serif text-stone-400">{images.length - visible}</p>
                </div>

                <div className="ml-auto">
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#B08D57] transition-all"
                    >
                        <Upload size={14} /> Ajouter une photo
                    </button>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
                {["Tous", ...TAGS].map(tag => (
                    <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                            filter === tag
                                ? "bg-stone-950 text-white border-stone-950"
                                : "bg-white text-stone-400 border-stone-100 hover:border-stone-300"
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filtered.map(img => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={cn(
                                "group relative rounded-2xl overflow-hidden border bg-white shadow-sm transition-all hover:shadow-xl",
                                !img.visible ? "border-stone-200 opacity-60" : "border-stone-100"
                            )}
                        >
                            {/* Image */}
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                                    onClick={() => setPreview(img)}
                                />
                            </div>

                            {/* Overlay actions */}
                            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => toggleVisible(img.id)}
                                    className={cn("p-1.5 rounded-lg shadow backdrop-blur-sm text-white", img.visible ? "bg-emerald-500/80" : "bg-stone-500/80")}
                                    title={img.visible ? "Masquer" : "Afficher"}
                                >
                                    {img.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                </button>
                                <button
                                    onClick={() => deleteImage(img.id)}
                                    className="p-1.5 rounded-lg shadow bg-red-500/80 backdrop-blur-sm text-white"
                                    title="Supprimer"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            {/* Hidden badge */}
                            {!img.visible && (
                                <div className="absolute top-2 left-2 bg-stone-800/70 backdrop-blur-sm text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <EyeOff size={9} /> Masqué
                                </div>
                            )}

                            {/* Info footer */}
                            <div className="p-4 space-y-2">
                                {editId === img.id ? (
                                    <div className="space-y-2">
                                        <input
                                            value={editTitle}
                                            onChange={e => setEditTitle(e.target.value)}
                                            className="w-full text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#B08D57]"
                                        />
                                        <select
                                            value={editTag}
                                            onChange={e => setEditTag(e.target.value)}
                                            className="w-full text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#B08D57]"
                                        >
                                            {TAGS.map(t => <option key={t}>{t}</option>)}
                                        </select>
                                        <div className="flex gap-2">
                                            <button onClick={saveEdit} className="flex-1 py-1 bg-stone-950 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-[#B08D57] transition-all">Enregistrer</button>
                                            <button onClick={() => setEditId(null)} className="px-2 py-1 border border-stone-100 text-stone-400 rounded-lg"><X size={10} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start justify-between gap-2 cursor-pointer" onClick={() => startEdit(img)}>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-stone-800 truncate">{img.title}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Tag size={9} className="text-[#B08D57]" />
                                                <span className="text-[9px] text-[#B08D57] font-bold uppercase tracking-widest">{img.tag}</span>
                                            </div>
                                        </div>
                                        <GripVertical size={14} className="text-stone-200 flex-shrink-0 mt-0.5" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Upload placeholder */}
                    <motion.button
                        layout
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={() => fileRef.current?.click()}
                        className="aspect-square rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-3 hover:border-[#B08D57] hover:bg-[#B08D57]/5 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-stone-100 group-hover:bg-[#B08D57]/10 flex items-center justify-center transition-colors">
                            <Plus size={20} className="text-stone-400 group-hover:text-[#B08D57]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-[#B08D57] font-bold">Ajouter</span>
                    </motion.button>
                </AnimatePresence>
            </div>

            {/* Preview modal */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
                        onClick={() => setPreview(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="relative max-w-3xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={preview.url} alt={preview.title} className="w-full rounded-3xl shadow-2xl" />
                            <button onClick={() => setPreview(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/80"><X size={16} /></button>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-3xl">
                                <p className="text-white font-bold">{preview.title}</p>
                                <p className="text-white/60 text-xs">{preview.tag}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
