"use client";
import { motion } from "framer-motion";
import { RiskLevel } from "@/types/individual.types";

interface PredictionCircleProps {
    percentage: number;
    riskLevel: RiskLevel;
}

export default function PredictionCircle({ percentage, riskLevel }: PredictionCircleProps) {
    const getRiskColors = () => {
        switch (riskLevel) {
            case 'High': return {
                border: 'border-red-500/30',
                text: 'text-red-500',
                bg: 'bg-red-500/10'
            };
            case 'Medium': return {
                border: 'border-yellow-500/30',
                text: 'text-yellow-500',
                bg: 'bg-yellow-500/10'
            };
            case 'Low': return {
                border: 'border-green-500/30',
                text: 'text-green-500',
                bg: 'bg-green-500/10'
            };
            default: return {
                border: 'border-gray-500/30',
                text: 'text-gray-500',
                bg: 'bg-gray-500/10'
            };
        }
    };

    const colors = getRiskColors();

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex justify-center"
        >
            <div className="relative">
                <div className={`w-64 h-64 rounded-full border-8 ${colors.border} flex items-center justify-center mx-auto`}>
                    <div className="text-center">
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 }}
                            className={`text-6xl font-bold ${colors.text} block`}
                        >
                            {percentage}%
                        </motion.span>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className={`${colors.text} font-semibold mt-4 text-xl`}
                        >
                            {riskLevel} Risk
                        </motion.p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}