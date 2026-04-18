"use client";
import { motion } from "framer-motion";
import { PredictionResult } from "@/types/individual.types";

interface CircularProgressProps {
    prediction: PredictionResult;
    size?: number;
}

export default function CircularProgress({ prediction, size = 160 }: CircularProgressProps) {
    const getRiskColor = () => {
        return "#F59E0B";
    };


    const radius = size / 2 - 10;

    const padding = 10;
    const svgRadius = (size / 2) - padding;
    const circumference = 2 * Math.PI * svgRadius;
    const pct = Math.max(0, Math.min(100, Number(prediction.percentage ?? 0)));
    const targetOffset = circumference * (1 - pct / 100);



    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full"
        >
            <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-bluelight-1 mb-6">
                    Future Risk Prediction
                </h2>

                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6 flex flex-col items-center justify-center h-80">
                    <div className="relative" style={{ width: size, height: size }}>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#0EB2B1"
                                strokeWidth="8"
                                opacity="0.12"
                            />

                            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={svgRadius}
                                    fill="none"
                                    stroke="#0EB2B1"
                                    strokeWidth="8"
                                    opacity="0.12"
                                />

                                <motion.circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={svgRadius}
                                    fill="none"
                                    stroke={getRiskColor()}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: targetOffset }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                                />
                            </svg>

                            {/* Center Percentage Text */}
                            <text
                                x="50"
                                y="45"
                                textAnchor="middle"
                                fontSize="20"
                                fontWeight="bold"
                                fill={getRiskColor()}
                            >
                                {pct}%
                            </text>

                            <text x="50" y="60" textAnchor="middle" fontSize="10" fill="#0EB2B1">
                                {prediction.riskLevel} Risk
                            </text>
                        </svg>
                    </div>

                    <p className="mt-6 text-bluelight-1/80 text-center max-w-md">{prediction.message}</p>
                </div>
            </div>
        </motion.div>
    );
}
