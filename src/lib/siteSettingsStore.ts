"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

// ─── Types ────────────────────────────────────────────────────────────────────
export type SiteSettings = {
    heroImage: string;
    studioName: string;
    phone: string;
    email: string;
    address: string;
    instagram?: string;
    tiktok?: string;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: SiteSettings = {
    heroImage: "/images/hero.png",
    studioName: "Palma Institut",
    phone: "+41 76 369 72 07",
    email: "palmaelisa49@gmail.com",
    address: "Rue du Progrès 99a, 2300 La Chaux-de-Fonds",
    instagram: "https://www.instagram.com/elisa_institut/",
    tiktok: "",
};

const STORAGE_KEY = "palma_site_settings";

const SETTINGS_DOC_ID = "main_settings";

// ─── Read / Write ─────────────────────────────────────────────────────────────
export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const docRef = doc(db, "settings", SETTINGS_DOC_ID);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            return { ...DEFAULT_SETTINGS, ...snap.data() } as SiteSettings;
        }
    } catch (e) {
        console.error("Firebase error getting settings:", e);
    }
    
    // Fallback to localStorage if firebase fails
    if (typeof window !== "undefined") {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
        } catch {}
    }
    return DEFAULT_SETTINGS;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
    try {
        const docRef = doc(db, "settings", SETTINGS_DOC_ID);
        await setDoc(docRef, settings);
    } catch (e) {
        console.error("Firebase error saving settings:", e);
    }

    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
}

// ─── React Hook ──────────────────────────────────────────────────────────────
export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time synchronization with Firestore
        const docRef = doc(db, "settings", SETTINGS_DOC_ID);
        
        const unsubscribe = onSnapshot(docRef, (snap) => {
            if (snap.exists()) {
                setSettings({ ...DEFAULT_SETTINGS, ...snap.data() } as SiteSettings);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore snapshot error:", err);
            // On error, try one-time fetch or use default/local
            getSiteSettings().then(setSettings).finally(() => setLoading(false));
        });

        return () => unsubscribe();
    }, []);

    const updateSettings = async (partial: Partial<SiteSettings>) => {
        const next = { ...settings, ...partial };
        setSettings(next);
        await saveSiteSettings(next);
    };

    return { settings, updateSettings, loading };
}
