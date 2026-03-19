"use client";

import { motion } from "framer-motion";

export function PhilosophySection() {
    return (
        <section className="bg-white py-32 px-6 overflow-hidden relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center space-y-6"
                >
                    <h2 
                        className="text-4xl md:text-5xl tracking-wide font-serif text-stone-900"
                    >
                        Une parenthèse de bien-être
                    </h2>
                    
                    <p 
                        className="text-xs md:text-sm uppercase pt-4 text-stone-600 tracking-[0.4em] font-black"
                    >
                        L'art du détail & le soin de soi
                    </p>

                    <div className="w-12 h-px bg-stone-300 mx-auto mt-6" />
                </motion.div>
            </div>
        </section>
    );
}
