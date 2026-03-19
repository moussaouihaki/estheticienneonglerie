"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, UserPlus } from "lucide-react";
import { useSiteSettings } from "@/lib/siteSettingsStore";

export default function ConnexionPage() {
    const { settings } = useSiteSettings();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Implementation for public auth would go here
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 pt-32 pb-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px] -z-10 translate-y-[-20%]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-stone-900/5 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[480px] space-y-12"
            >
                {/* Header */}
                <div className="text-center space-y-6">
                    <img 
                        src={settings.logo} 
                        alt={settings.studioName} 
                        className="h-20 w-auto object-contain mx-auto mb-8"
                    />
                    <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">Bonjour à nouveau</h1>
                    <p className="text-stone-600 font-sans italic text-lg font-light">
                        "Prenez un moment pour vous, reconnectez-vous."
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 md:p-14 shadow-2xl shadow-stone-900/5 relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400 ml-4">Email</label>
                                <div className="relative group">
                                    <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-stone-900" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="votre@email.com"
                                        className="w-full pl-16 pr-6 py-5 bg-white/60 border border-transparent rounded-3xl text-stone-900 placeholder:text-stone-300 focus:outline-none focus:bg-white focus:border-stone-200 transition-all duration-500 shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">Mot de passe</label>
                                    <Link href="/mot-de-passe-oublie" className="text-[9px] uppercase tracking-[0.2em] font-black text-accent hover:text-stone-900 transition-colors">Oublié ?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-stone-900" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-16 pr-6 py-5 bg-white/60 border border-transparent rounded-3xl text-stone-900 placeholder:text-stone-300 focus:outline-none focus:bg-white focus:border-stone-200 transition-all duration-500 shadow-inner"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group h-18 bg-stone-900 text-white rounded-[32px] text-[10px] uppercase tracking-[0.4em] font-black flex items-center justify-center gap-4 transition-all duration-700 hover:bg-stone-800 hover:shadow-2xl active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500 text-accent" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <div className="text-center space-y-8">
                    <p className="text-stone-500 text-[11px] uppercase tracking-[0.2em] font-medium">
                        Pas encore de compte ?{" "}
                        <Link href="/inscription" className="text-stone-900 font-black hover:italic transition-all inline-flex items-center gap-2 group">
                            S'inscrire <UserPlus size={12} className="group-hover:scale-110 transition-transform text-accent" />
                        </Link>
                    </p>
                    
                    <div className="pt-8 flex items-center justify-center gap-6">
                        <Link href="/" className="text-[9px] uppercase tracking-[0.4em] font-black text-stone-400 hover:text-stone-900 transition-colors">Retour à l'accueil</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
