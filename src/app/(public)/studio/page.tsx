import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";

export default function StudioPage() {
    return (
        <div className="min-h-screen pt-24">
            {/* Header - Beige */}
            <div className="bg-background py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-serif text-stone-900"
                    >
                        À Propos
                    </motion.h1>
                </div>
            </div>

            {/* Content - White background is set in Contact component already */}
            <Contact />
        </div>
    );
}
