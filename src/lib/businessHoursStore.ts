"use client";

import { useState, useEffect, useCallback } from "react";

export type BusinessDay = {
    day: string;
    isOpen: boolean;
    openTime: string;  // "HH:mm"
    closeTime: string; // "HH:mm"
    hasBreak: boolean;
    breakStart: string; // "HH:mm"
    breakEnd: string;   // "HH:mm"
};

const DEFAULT_HOURS: BusinessDay[] = [
    { day: "Lundi", isOpen: true, openTime: "09:00", closeTime: "18:00", hasBreak: true, breakStart: "12:00", breakEnd: "14:00" },
    { day: "Mardi", isOpen: true, openTime: "09:00", closeTime: "18:00", hasBreak: true, breakStart: "12:00", breakEnd: "14:00" },
    { day: "Mercredi", isOpen: true, openTime: "09:00", closeTime: "18:00", hasBreak: true, breakStart: "12:00", breakEnd: "14:00" },
    { day: "Jeudi", isOpen: true, openTime: "09:00", closeTime: "18:00", hasBreak: true, breakStart: "12:00", breakEnd: "14:00" },
    { day: "Vendredi", isOpen: true, openTime: "09:00", closeTime: "18:00", hasBreak: true, breakStart: "12:00", breakEnd: "14:00" },
    { day: "Samedi", isOpen: true, openTime: "10:00", closeTime: "16:00", hasBreak: false, breakStart: "12:00", breakEnd: "13:00" },
    { day: "Dimanche", isOpen: false, openTime: "00:00", closeTime: "00:00", hasBreak: false, breakStart: "00:00", breakEnd: "00:00" },
];

const STORAGE_KEY = "aurelia_business_hours";

export function getBusinessHours(): BusinessDay[] {
    if (typeof window === "undefined") return DEFAULT_HOURS;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_HOURS;
        const parsed = JSON.parse(raw);
        // Ensure legacy data gets the new fields
        return parsed.map((day: any) => ({
            ...day,
            hasBreak: day.hasBreak ?? false,
            breakStart: day.breakStart ?? "12:00",
            breakEnd: day.breakEnd ?? "14:00",
        })) as BusinessDay[];
    } catch {
        return DEFAULT_HOURS;
    }
}

export function saveBusinessHours(hours: BusinessDay[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hours));
    window.dispatchEvent(new Event("aurelia_business_hours_changed"));
}

export function useBusinessHours() {
    const [hours, setHours] = useState<BusinessDay[]>(DEFAULT_HOURS);

    const refresh = useCallback(() => setHours(getBusinessHours()), []);

    useEffect(() => {
        refresh();
        window.addEventListener("aurelia_business_hours_changed", refresh);
        return () => window.removeEventListener("aurelia_business_hours_changed", refresh);
    }, [refresh]);

    const update = (updated: BusinessDay[]) => {
        saveBusinessHours(updated);
        setHours(updated);
    };

    const updateDay = (dayName: string, updates: Partial<BusinessDay>) => {
        setHours(prev => {
            const next = prev.map(h => h.day === dayName ? { ...h, ...updates } : h);
            saveBusinessHours(next);
            return next;
        });
    };

    return { hours, update, updateDay };
}
