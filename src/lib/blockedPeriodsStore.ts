"use client";

import { useState, useEffect } from "react";
import { db } from "./firebase";
import { 
    collection, 
    onSnapshot, 
    doc, 
    setDoc, 
    deleteDoc,
    query,
    addDoc
} from "firebase/firestore";

export type BlockedPeriod = {
    id: string;
    startDate: string; // ISO
    endDate: string;   // ISO
    label: string;
    type: "vacation" | "holiday" | "other";
};

const COLLECTION_NAME = "blocked_periods";

export function useBlockedPeriods() {
    const [blocked, setBlocked] = useState<BlockedPeriod[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, COLLECTION_NAME));
        const unsubscribe = onSnapshot(q, (snap) => {
            const cloudBlocked = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BlockedPeriod[];
            setBlocked(cloudBlocked);
            setLoading(false);
        }, (err) => {
            console.error("Firestore blocked periods error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addBlock = async (newBlock: Omit<BlockedPeriod, "id">) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            await addDoc(collection(db, COLLECTION_NAME), newBlock);
        } catch (e) {
            console.error("Error adding blocked period:", e);
        }
    };

    const removeBlock = async (id: string) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch (e) {
            console.error("Error removing blocked period:", e);
        }
    };

    const isDateBlocked = (dateStr: string) => {
        const d = new Date(dateStr).getTime();
        return blocked.some((b) => {
            const start = new Date(b.startDate).getTime();
            const end = new Date(b.endDate).getTime();
            // Compare timestamps (ignoring time if ISO date only)
            const dateOnly = new Date(dateStr);
            dateOnly.setHours(0,0,0,0);
            const startOnly = new Date(b.startDate);
            startOnly.setHours(0,0,0,0);
            const endOnly = new Date(b.endDate);
            endOnly.setHours(23,59,59,999);
            
            return dateOnly.getTime() >= startOnly.getTime() && dateOnly.getTime() <= endOnly.getTime();
        });
    };

    return { blocked, addBlock, removeBlock, isDateBlocked, loading };
}
