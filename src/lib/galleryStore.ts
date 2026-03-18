"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "./firebase";
import { 
    collection, 
    onSnapshot,
    doc,
    setDoc,
    query
} from "firebase/firestore";

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
    { id: "G1", url: "/images/gallery-1.png", title: "Manucure Russe Signature", tag: "Soin", visible: true },
    { id: "G2", url: "/images/gallery-2.png", title: "Nail Art Minimaliste", tag: "Art", visible: true },
    { id: "G3", url: "/images/gallery-3.png", title: "Avant / Après - Restructuration", tag: "Transformation", visible: true },
    { id: "G4", url: "/images/gallery-4.png", title: "Pose Gel Complète", tag: "Prestige", visible: true },
];

const STORAGE_KEY = "palma_gallery";

// ─── React Hook ──────────────────────────────────────────────────────────────
export function useGallery() {
    const [images, setImages] = useState<GalleryImage[]>(DEFAULT_IMAGES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, "gallery"));
        const unsubscribe = onSnapshot(q, (snap) => {
            if (snap.empty) {
                setImages(DEFAULT_IMAGES);
            } else {
                const cloudImages = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as GalleryImage[];
                setImages(cloudImages);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore gallery error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateGallery = async (updated: GalleryImage[]) => {
        setImages(updated);
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            for (const img of updated) {
                await setDoc(doc(db, "gallery", img.id), img);
            }
        } catch (e) {
            console.error("Error updating gallery:", e);
        }
        
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
    };

    return { images, updateGallery, loading };
}
