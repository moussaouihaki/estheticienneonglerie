"use client";

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
    {
        id: "signature",
        name: "Vise-en-beauté Signature",
        description: "Notre manucure emblématique alliant soin, précision et élégance suisse.",
        duration: 60,
        price: 85,
        color: "#F59E0B",
        icon: "✨",
        image: "/images/services/signature.png",
        visible: true,
    },
    {
        id: "gelx",
        name: "Pose de prestige Gel-X",
        description: "Extension semi-permanente ultra-légère pour des ongles parfaits et durables.",
        duration: 120,
        price: 145,
        color: "#8B5CF6",
        icon: "💎",
        image: "/images/services/gelx.png",
        visible: true,
    },
    {
        id: "spa",
        name: "Rituel Spa Mains & Pieds",
        description: "Un moment de luxe absolu pour chouchouter vos mains et vos pieds.",
        duration: 75,
        price: 95,
        color: "#10B981",
        icon: "🌿",
        image: "/images/services/spa.png",
        visible: true,
    },
];

const STORAGE_KEY = "aurelia_services";

// ─── Read / Write ─────────────────────────────────────────────────────────────
export function getServices(): Service[] {
    if (typeof window === "undefined") return DEFAULT_SERVICES;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_SERVICES;
        return JSON.parse(raw) as Service[];
    } catch {
        return DEFAULT_SERVICES;
    }
}

export function saveServices(services: Service[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    // Dispatch a custom event so other components can react
    window.dispatchEvent(new Event("aurelia_services_changed"));
}

export function resetServices(): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SERVICES));
    window.dispatchEvent(new Event("aurelia_services_changed"));
}

// ─── React hook ──────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";

export function useServices() {
    const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);

    const refresh = useCallback(() => setServices(getServices()), []);

    useEffect(() => {
        refresh();
        window.addEventListener("aurelia_services_changed", refresh);
        return () => window.removeEventListener("aurelia_services_changed", refresh);
    }, [refresh]);

    const update = (updated: Service[]) => {
        saveServices(updated);
        setServices(updated);
    };

    return { services, update };
}
