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

import { getSiteSettings } from "./siteSettingsStore";

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
            
            // 1. Create the appointment in Firestore
            const apptRef = await addDoc(collection(db, "appointments"), {
                ...data,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            // 2. Send the confirmation email via our new API route
            const settings = await getSiteSettings();
            const studioName = settings.studioName || "Palma Institut";
            const cancelUrl = `${window.location.origin}/annuler-rdv/${apptRef.id}`;
            const logoUrl = settings.logo.startsWith('http') ? settings.logo : `${window.location.origin}${settings.logo}`;
            
            // Format date for the email (ex: Mardi 18 mars 2026)
            const formattedDate = new Date(data.date).toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });

            await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: data.email,
                    subject: `Confirmation de réservation - ${studioName}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
                            <div style="text-align: center; padding: 40px 0;">
                                <img src="${logoUrl}" alt="${studioName}" style="height: 80px; width: auto; object-contain: contain;">
                            </div>
                            <div style="padding: 30px; border: 1px solid #f5f5f4; border-radius: 30px; background-color: #fafaf9;">
                                <h2 style="font-size: 20px; color: #1c1917; margin-top: 0;">Bonjour ${data.client},</h2>
                                <p style="line-height: 1.6;">Votre demande de rendez-vous a été enregistrée avec succès. Voici les détails de votre prestation de prestige :</p>
                                
                                <div style="margin: 30px 0; border-left: 4px solid #CFC4AC; padding: 10px 25px; background-color: white; border-radius: 0 15px 15px 0;">
                                    <p style="margin: 8px 0; text-transform: capitalize;"><b>Date :</b> ${formattedDate}</p>
                                    <p style="margin: 8px 0;"><b>Heure :</b> ${data.time}</p>
                                    <p style="margin: 8px 0;"><b>Prestation :</b> ${data.service}</p>
                                </div>

                                <p style="font-size: 13px; font-style: italic; color: #78716c; margin-bottom: 30px; background-color: #fef2f2; padding: 15px; border-radius: 10px;">
                                    ⚠️ <b>Politique d'annulation :</b> Toute modification ou annulation doit être effectuée au moins <b>24h avant</b> l'heure du rendez-vous.
                                </p>

                                <div style="text-align: center;">
                                    <a href="${cancelUrl}" style="display: inline-block; background-color: #1c1917; color: white; padding: 18px 30px; text-decoration: none; border-radius: 15px; font-weight: bold; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">
                                        Gérer mon rendez-vous
                                    </a>
                                </div>
                            </div>
                            <div style="text-align: center; padding: 30px; font-size: 10px; color: #a8a29e; letter-spacing: 1px; text-transform: uppercase;">
                                &copy; ${new Date().getFullYear()} ${studioName} • La Chaux-de-Fonds, Suisse
                            </div>
                        </div>
                    `,
                })
            });
        } catch (e) {
            console.error("Critical error in appointment process:", e);
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
