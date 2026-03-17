"use client";

import { motion } from "framer-motion";

export function PhilosophySection() {
    return (
        <section className="bg-white py-24 px-6 overflow-hidden relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center space-y-4"
                >
                    <div 
                        style={{ fontFamily: 'var(--font-serif)', color: '#CFC4AC' }}
                        className="text-6xl md:text-8xl mb-4"
                    >
                        PI
                    </div>
                    
                    <h2 
                        style={{ fontFamily: 'var(--font-serif)', color: '#805836' }}
                        className="text-4xl md:text-5xl tracking-wide"
                    >
                        Diplômée d'un CFC
                    </h2>
                    
                    <p 
                        style={{ fontFamily: 'var(--font-caps)', color: '#000000', letterSpacing: '0.3em' }}
                        className="text-xs md:text-sm uppercase pt-4"
                    >
                        Expertise & Précision au service de votre beauté
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
