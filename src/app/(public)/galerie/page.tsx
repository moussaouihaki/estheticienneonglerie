"use client";

import { Portfolio } from "@/components/Portfolio";
import { motion } from "framer-motion";

export default function GaleriePage() {
    return (
        <div className="min-h-screen pt-40 md:pt-60">
            {/* Header - Beige */}
            <div className="bg-background py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-serif text-stone-900"
                    >
                        Galerie
                    </motion.h1>
                </div>
            </div>

            <Portfolio />
        </div>
    );
}
