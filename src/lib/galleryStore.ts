"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type GalleryImage = {
    id: string;
    url: string;
    title: string;
    tag: string;
    visible: boolean;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_IMAGES: GalleryImage[] = [
    { id: "G1", url: "/images/gallery-1.png", title: "Pose Neutre Signature", tag: "Signature", visible: true },
    { id: "G2", url: "/images/gallery-2.png", title: "French Gold Art", tag: "French", visible: true },
    { id: "G3", url: "/images/gallery-3.png", title: "Gel-X Prestige Ivoire", tag: "Gel-X", visible: true },
    { id: "G4", url: "/images/gallery-4.png", title: "Nail Art Floral", tag: "Nail Art", visible: true },
];

const STORAGE_KEY = "aurelia_gallery";

// ─── Read / Write ─────────────────────────────────────────────────────────────
export function getGallery(): GalleryImage[] {
    if (typeof window === "undefined") return DEFAULT_IMAGES;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_IMAGES;
        return JSON.parse(raw) as GalleryImage[];
    } catch {
        return DEFAULT_IMAGES;
    }
}

export function saveGallery(images: GalleryImage[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    window.dispatchEvent(new Event("aurelia_gallery_changed"));
}

// ─── React Hook ──────────────────────────────────────────────────────────────
export function useGallery() {
    const [images, setImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);

    const refresh = useCallback(() => {
        setImages(getGallery());
    }, []);

    useEffect(() => {
        refresh();
        window.addEventListener("aurelia_gallery_changed", refresh);
        return () => window.removeEventListener("aurelia_gallery_changed", refresh);
    }, [refresh]);

    const updateGallery = (updated: GalleryImage[]) => {
        saveGallery(updated);
        setImages(updated);
    };

    return { images, updateGallery };
}
