"use client";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { ReactNode } from "react";

interface AuthContainerProps {
    children: ReactNode;
    minHeight?: string;
    showBackButton?: boolean;
    onBack?: () => void;  
}

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" as const }
    },
};

export default function AuthContainer({
    children,
    minHeight = "auto",
    showBackButton = true,
    onBack
}: AuthContainerProps) {
    const router = useRouter();
    const handleBack = onBack ?? (() => router.back()); // لو مفيش onBack يعمل router.back

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-[500px] p-6 sm:p-9 relative flex flex-col 
                   gap-6 sm:gap-8 items-center justify-center
                   rounded-[25px] sm:rounded-[30px]
                   shadow-[-1px_-3px_62px_11px_var(--color-bluelight-shade)]
                   text-center"
                style={{ minHeight }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10"
                >
                    <ThemeToggleDefault />
                </motion.div>

                {showBackButton && (  
                    <button
                        onClick={handleBack}
                        className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10
                       text-bluelight-1/80 hover:text-bluelight-1
                       transition-all duration-300
                       flex items-center gap-2 text-sm sm:text-base
                       hover:scale-105 active:scale-95"
                    >
                        <span className="text-2xl">←</span>
                        <span className="hidden sm:inline">Back</span>
                    </button>
                )}

                {children}
            </motion.div>
        </div>
    );
}