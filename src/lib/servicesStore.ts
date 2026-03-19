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
export type Service = {
    id: string;
    name: string;
    description: string;
    duration: number; // minutes
    price: number;    // CHF
    color: string;    // hex e.g. "#B08D57"
    icon: string;     // emoji (fallback)
    image: string;    // Premium image path
    visible: boolean;
};

// ─── Default services ─────────────────────────────────────────────────────────
const DEFAULT_SERVICES: Service[] = [
    { id: "gel-s", name: "GEL — Taille S", description: "Pose complète en gel. Taille S.", duration: 90, price: 75, color: "#CFC4AC", icon: "✨", image: "/images/services/gel.png", visible: true },
    { id: "gel-m", name: "GEL — Taille M", description: "Pose complète en gel. Taille M.", duration: 90, price: 80, color: "#CFC4AC", icon: "✨", image: "/images/services/gel.png", visible: true },
    { id: "gel-l", name: "GEL — Taille L", description: "Pose complète en gel. Taille L.", duration: 105, price: 85, color: "#CFC4AC", icon: "✨", image: "/images/services/gel.png", visible: true },
    { id: "gel-xl", name: "GEL — Taille XL", description: "Pose complète en gel. Taille XL.", duration: 120, price: 90, color: "#CFC4AC", icon: "✨", image: "/images/services/gel.png", visible: true },
    { id: "acrygel-s", name: "ACRYGEL — Taille S", description: "Pose complète en acrygel. Taille S.", duration: 105, price: 80, color: "#805836", icon: "💎", image: "/images/services/acrygel.png", visible: true },
    { id: "acrygel-m", name: "ACRYGEL — Taille M", description: "Pose complète en acrygel. Taille M.", duration: 105, price: 85, color: "#805836", icon: "💎", image: "/images/services/acrygel.png", visible: true },
    { id: "acrygel-l", name: "ACRYGEL — Taille L", description: "Pose complète en acrygel. Taille L.", duration: 120, price: 90, color: "#805836", icon: "💎", image: "/images/services/acrygel.png", visible: true },
    { id: "acrygel-xl", name: "ACRYGEL — Taille XL", description: "Pose complète en acrygel. Taille XL.", duration: 135, price: 95, color: "#805836", icon: "💎", image: "/images/services/acrygel.png", visible: true },
    { id: "remplissage", name: "Remplissage", description: "Entretien de votre pose, max 4 semaines.", duration: 60, price: 45, color: "#CFC4AC", icon: "💅", image: "/images/services/fill.png", visible: true },
    { id: "nail-art", name: "Nail Art", description: "Décorations personnalisées pour vos ongles.", duration: 30, price: 5, color: "#805836", icon: "🎨", image: "/images/services/art.png", visible: true },
    { id: "depose", name: "Dépose seul", description: "Retrait complet de la pose.", duration: 45, price: 15, color: "#000000", icon: "✂️", image: "/images/services/gel.png", visible: true }
];

const STORAGE_KEY = "palma_services";

export function useServices() {
    const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, "services"));
        const unsubscribe = onSnapshot(q, (snap) => {
            if (snap.empty) {
                setServices(DEFAULT_SERVICES);
            } else {
                const cloudServices = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Service[];
                setServices(cloudServices);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore services error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const update = async (updated: Service[]) => {
        setServices(updated);
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            for (const s of updated) {
                await setDoc(doc(db, "services", s.id), s);
            }
        } catch (e) {
            console.error("Error updating services:", e);
        }
        
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
    };

    const resetServices = async () => {
        await update(DEFAULT_SERVICES);
    };

    return { services, update, resetServices, loading };
}
