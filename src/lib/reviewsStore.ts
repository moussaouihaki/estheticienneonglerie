"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "./firebase";
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

export type Review = {
    id: string;
    name: string;
    text: string;
    rating: number; // 1-5
    date: any; 
    status: 'approved' | 'pending';
};

export function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const revs = snap.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    date: data.date?.toDate?.()?.toISOString() || new Date().toISOString()
                };
            }) as Review[];
            setReviews(revs);
            setLoading(false);
        }, (err) => {
            console.error("Firestore reviews error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addReview = async (newReview: Omit<Review, 'id' | 'status' | 'date'>) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            await addDoc(collection(db, "reviews"), {
                ...newReview,
                date: serverTimestamp(),
                status: 'pending'
            });
        } catch (e) {
            console.error("Error adding review:", e);
        }
    };

    const approveReview = async (id: string) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            const docRef = doc(db, "reviews", id);
            await updateDoc(docRef, { status: 'approved' });
        } catch (e) {
            console.error("Error approving review:", e);
        }
    };

    const deleteReview = async (id: string) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            await deleteDoc(doc(db, "reviews", id));
        } catch (e) {
            console.error("Error deleting review:", e);
        }
    };

    return { reviews, addReview, approveReview, deleteReview, loading };
}
