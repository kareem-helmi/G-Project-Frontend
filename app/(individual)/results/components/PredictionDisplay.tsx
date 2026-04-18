"use client";
import { motion } from "framer-motion";
import { PredictionResult, RiskLevel } from "@/types/individual.types";
import PredictionCircle from "./PredictionCircle";

interface PredictionDisplayProps {
    prediction: PredictionResult;
    title?: string;
}

export default function PredictionDisplay({ prediction, title = "Predict Result" }: PredictionDisplayProps) {
    const getRiskColors = (riskLevel: RiskLevel) => {
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

    const colors = getRiskColors(prediction.riskLevel);

    return (
        <div className="space-y-8 text-center">
            <h3 className="text-2xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-3">
                {title}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <PredictionCircle
                    percentage={prediction.percentage}
                    riskLevel={prediction.riskLevel}
                />

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col justify-center space-y-6"
                >
                    <div className={`p-6 ${colors.bg} border ${colors.border} rounded-xl`}>
                        <p className={`${colors.text} text-2xl font-semibold leading-relaxed`}>
                            {prediction.message}
                        </p>
                    </div>

                    <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <p className="text-yellow-500 text-lg leading-relaxed">
                            {prediction.additionalInfo}
                        </p>
                        {prediction.confidence && (
                            <p className="text-bluelight-1/70 text-sm mt-3">
                                Confidence Level: <span className="font-bold">{prediction.confidence}%</span>
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}