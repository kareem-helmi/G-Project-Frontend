"use client";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" as const }
    },
};

export function AuthDivider() {
    return (
        <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 text-bluelight-1/70 text-sm"
        >
            <span className="flex-1 h-px bg-bluelight-1/30"></span>
            <span>or</span>
            <span className="flex-1 h-px bg-bluelight-1/30"></span>
        </motion.div>
    );
}
