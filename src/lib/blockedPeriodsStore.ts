"use client";

import { useState, useEffect, useCallback } from "react";

export type BlockedPeriod = {
    id: string;
    startDate: string; // ISO
    endDate: string;   // ISO
    label: string;
    type: "vacation" | "holiday" | "other";
};

const STORAGE_KEY = "aurelia_blocked_periods";

export function getBlockedPeriods(): BlockedPeriod[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as BlockedPeriod[];
    } catch {
        return [];
    }
}

export function saveBlockedPeriods(periods: BlockedPeriod[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
    window.dispatchEvent(new Event("aurelia_blocked_changed"));
}

export function useBlockedPeriods() {
    const [blocked, setBlocked] = useState<BlockedPeriod[]>([]);

    const refresh = useCallback(() => setBlocked(getBlockedPeriods()), []);

    useEffect(() => {
        refresh();
        window.addEventListener("aurelia_blocked_changed", refresh);
        return () => window.removeEventListener("aurelia_blocked_changed", refresh);
    }, [refresh]);

    const addBlock = (newBlock: Omit<BlockedPeriod, "id">) => {
        const block = { ...newBlock, id: Math.random().toString(36).substr(2, 9) };
        const updated = [...getBlockedPeriods(), block];
        saveBlockedPeriods(updated);
        setBlocked(updated);
    };

    const removeBlock = (id: string) => {
        const updated = getBlockedPeriods().filter((b) => b.id !== id);
        saveBlockedPeriods(updated);
        setBlocked(updated);
    };

    const isDateBlocked = (dateStr: string) => {
        const d = new Date(dateStr).getTime();
        return blocked.some((b) => {
            const start = new Date(b.startDate).getTime();
            const end = new Date(b.endDate).getTime();
            return d >= start && d <= end;
        });
    };

    return { blocked, addBlock, removeBlock, isDateBlocked };
}
