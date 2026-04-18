"use client";
import { motion, Variants } from "framer-motion";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";

interface AuthHeaderProps {
    title?: string;
    subtitle: string;
    description?: string;

}

const fadeUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" as const }
    },
};

export function AuthHeader({
    title = "AI Disease Progression Predictor",
    subtitle,
    description
}: AuthHeaderProps) {
    return (
        <>
            <motion.div variants={fadeUp} className="w-full mt-1 sm:mt-4">
                <Title className="text-[1.6rem] sm:text-[1.9rem] md:text-[2.2rem] 
                          text-bluelight-1 mb-3 leading-tight px-2 sm:px-4">
                    {title}
                </Title>
                <motion.div variants={fadeUp} transition={{ delay: 0.2 }}>
                    <SubTitle className="text-[1.1rem] sm:text-[1.2rem] text-bluelight-1/70">
                        {subtitle}
                    </SubTitle>
                </motion.div>
            </motion.div>

            {description && (
                <motion.div
                    variants={fadeUp}
                    className="text-bluelight-1/80 text-sm sm:text-base text-center max-w-[400px]"
                >
                    {description}
                </motion.div>
            )}
        </>
    );
}