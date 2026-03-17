"use client";

import { useState, useEffect } from "react";
import { db } from "./firebase";
import { 
    doc, 
    onSnapshot, 
    setDoc, 
    collection, 
    getDocs 
} from "firebase/firestore";

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

const COLLECTION_NAME = "business_hours";

export function useBusinessHours() {
    const [hours, setHours] = useState<BusinessDay[]>(DEFAULT_HOURS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, COLLECTION_NAME), (snap) => {
            if (snap.empty) {
                setHours(DEFAULT_HOURS);
            } else {
                const cloudHours = snap.docs.map(doc => doc.data() as BusinessDay);
                // Ensure correct order
                const sorted = DEFAULT_HOURS.map(d => cloudHours.find(ch => ch.day === d.day) || d);
                setHours(sorted);
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore business hours error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const update = async (updated: BusinessDay[]) => {
        setHours(updated);
        try {
            for (const d of updated) {
                await setDoc(doc(db, COLLECTION_NAME, d.day), d);
            }
        } catch (e) {
            console.error("Error updating business hours:", e);
        }
    };

    const updateDay = async (dayName: string, updates: Partial<BusinessDay>) => {
        const updated = hours.map(h => h.day === dayName ? { ...h, ...updates } : h);
        await update(updated);
    };

    return { hours, update, updateDay, loading };
}
