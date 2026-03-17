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
    orderBy,
    addDoc
} from "firebase/firestore";

export type Client = {
    id: string;
    name: string;
    phone: string;
    email: string;
    lastService: string;
    visits: number;
    totalSpent: string; // e.g. "CHF 680"
    lastVisit: string;   // DD Month YYYY
    status: "VIP" | "Régulier" | "Régulière" | "Nouveau" | "Nouvelle";
    notes?: string;
};

const COLLECTION_NAME = "clients";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, COLLECTION_NAME), orderBy("name", "asc"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const cloudClients = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Client[];
            setClients(cloudClients);
            setLoading(false);
        }, (err) => {
            console.error("Firestore clients error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addClient = async (newClient: Omit<Client, "id">) => {
        try {
            await addDoc(collection(db, COLLECTION_NAME), newClient);
        } catch (e) {
            console.error("Error adding client:", e);
        }
    };

    const updateClient = async (id: string, updates: Partial<Client>) => {
        try {
            await setDoc(doc(db, COLLECTION_NAME, id), updates, { merge: true });
        } catch (e) {
            console.error("Error updating client:", e);
        }
    };

    const deleteClient = async (id: string) => {
        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch (e) {
            console.error("Error deleting client:", e);
        }
    };

    return { clients, addClient, updateClient, deleteClient, loading };
}
