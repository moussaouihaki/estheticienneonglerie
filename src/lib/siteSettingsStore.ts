"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type SiteSettings = {
    heroImage: string;
    studioName: string;
    phone: string;
    email: string;
    address: string;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: SiteSettings = {
    heroImage: "/images/hero.png",
    studioName: "Aurélia Nail Studio",
    phone: "+41 79 123 45 67",
    email: "hello@aurelianails.ch",
    address: "Rue du Luxe 15, 1201 Genève",
};

const STORAGE_KEY = "aurelia_site_settings";

// ─── Read / Write ─────────────────────────────────────────────────────────────
export function getSiteSettings(): SiteSettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_SETTINGS;
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

export function saveSiteSettings(settings: SiteSettings): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("aurelia_settings_changed"));
}

// ─── React Hook ──────────────────────────────────────────────────────────────
export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

    const refresh = useCallback(() => {
        setSettings(getSiteSettings());
    }, []);

    useEffect(() => {
        refresh();
        window.addEventListener("aurelia_settings_changed", refresh);
        return () => window.removeEventListener("aurelia_settings_changed", refresh);
    }, [refresh]);

    const updateSettings = (partial: Partial<SiteSettings>) => {
        const next = { ...settings, ...partial };
        saveSiteSettings(next);
        setSettings(next);
    };

    return { settings, updateSettings };
}
