import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuration Firebase
// On vérifie que les clés existent et ne soient pas des placeholders vides
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Vérification de la validité basique du config pour éviter le crash au build Vercel
const isConfigValid = firebaseConfig.apiKey && 
                     firebaseConfig.apiKey.length > 20 && 
                     !firebaseConfig.apiKey.includes("undefined");

let app: any;
let db: any;
let auth: any;
let storage: any;

// On n'initialise Firebase côté serveur pendant le build que si on a des clés valides.
// Sinon, on expose des objets null pour éviter les erreurs de type "invalid-api-key".
if (isConfigValid) {
    try {
        app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage(app);
    } catch (error) {
        console.error("Firebase init error:", error);
    }
} else {
    if (typeof window !== "undefined") {
        console.warn("Firebase: Configuration manquante ou invalide. Le site fonctionnera en mode déconnecté.");
    }
}

export { app, db, auth, storage };
