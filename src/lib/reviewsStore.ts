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
        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const revs = snap.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // If date is a Firestore timestamp, convert to ISO for components if needed, 
                    // or just pass as is if components handle it.
                    // For now keeping it simple.
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
            const docRef = doc(db, "reviews", id);
            await updateDoc(docRef, { status: 'approved' });
        } catch (e) {
            console.error("Error approving review:", e);
        }
    };

    const deleteReview = async (id: string) => {
        try {
            await deleteDoc(doc(db, "reviews", id));
        } catch (e) {
            console.error("Error deleting review:", e);
        }
    };

    return { reviews, addReview, approveReview, deleteReview, loading };
}
