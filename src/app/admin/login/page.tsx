"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulating a luxury authentication delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (id === "admin" && password === "aurelia2026") {
            // In a real app, we would set a secure cookie here
            localStorage.setItem("aurelia_auth", "true");
            router.push("/admin");
        } else {
            setError("Accès refusé. Veuillez vérifier vos identifiants.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B08D57]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-200/20 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                {/* Brand */}
                <div className="text-center mb-12 space-y-2">
                    <span className="font-serif text-4xl tracking-[0.3em] text-[#B08D57]">AURELIA</span>
                    <p className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold">Administration de Prestige</p>
                </div>

                <div className="bg-white border border-stone-100 rounded-3xl shadow-2xl p-10 relative overflow-hidden">
                    {/* Top bar Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#B08D57]" />

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-serif text-stone-900">Connexion</h2>
                            <p className="text-xs text-stone-400 mt-1 font-light italic">Veuillez entrer vos accès de sécurité</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Identifiant</label>
                                    <div className="relative">
                                        <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" />
                                        <input
                                            type="text"
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                            placeholder="admin"
                                            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-sm focus:outline-none focus:border-[#B08D57] transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest font-black text-stone-400 ml-1">Mot de passe</label>
                                    <div className="relative">
                                        <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-sm focus:outline-none focus:border-[#B08D57] transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-[10px] text-red-500 font-bold bg-red-50 p-3 rounded-xl text-center border border-red-100"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative group h-14 bg-stone-900 text-white rounded-2xl text-[10px] uppercase tracking-[0.4em] font-black overflow-hidden transition-all shadow-xl hover:shadow-[#B08D57]/20 disabled:opacity-50"
                            >
                                <span className={`relative z-10 flex items-center justify-center gap-3 transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100 group-hover:text-stone-900'}`}>
                                    Accéder au panel <ArrowRight size={14} />
                                </span>
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <Sparkles className="animate-spin text-accent" size={20} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-[#B08D57] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 text-center text-[9px] text-stone-400 uppercase tracking-widest leading-relaxed">
                    <p>© 2026 Aurelia Nail Studio</p>
                    <p className="mt-1">Sécurité de niveau bancaire activée</p>
                </div>
            </motion.div>
        </div>
    );
}
