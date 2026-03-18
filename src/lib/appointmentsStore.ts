import { create } from 'zustand';
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
    serverTimestamp,
    Timestamp
} from "firebase/firestore";

export interface Appointment {
    id: string;
    client: string;
    phone: string;
    email: string;
    address?: string;
    service: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: any;
}

interface AppointmentsState {
    appointments: Appointment[];
    loading: boolean;
    init: () => () => void;
    addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => Promise<void>;
    updateStatus: (id: string, status: Appointment['status']) => Promise<void>;
    deleteAppointment: (id: string) => Promise<void>;
}

export const useAppointments = create<AppointmentsState>((set) => ({
    appointments: [],
    loading: true,

    init: () => {
        if (!db) {
            set({ loading: false });
            return () => {};
        }

        const q = query(collection(db, "appointments"), orderBy("date", "asc"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const appts = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Appointment[];
            set({ appointments: appts, loading: false });
        }, (err) => {
            console.error("Firestore error in appointments:", err);
            set({ loading: false });
        });
        return unsubscribe;
    },

    addAppointment: async (data) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            await addDoc(collection(db, "appointments"), {
                ...data,
                status: 'pending',
                createdAt: serverTimestamp(),
            });
        } catch (e) {
            console.error("Error adding appointment:", e);
        }
    },

    updateStatus: async (id, status) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            const docRef = doc(db, "appointments", id);
            await updateDoc(docRef, { status });
        } catch (e) {
            console.error("Error updating status:", e);
        }
    },

    deleteAppointment: async (id) => {
        try {
            if (!db) throw new Error("Firebase Service 'db' uninitialized");
            await deleteDoc(doc(db, "appointments", id));
        } catch (e) {
            console.error("Error deleting appointment:", e);
        }
    },
}));
