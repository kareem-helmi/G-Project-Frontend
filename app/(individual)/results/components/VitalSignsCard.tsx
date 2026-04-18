"use client";
import { motion } from "framer-motion";
import { VitalSign } from "@/types/individual.types";

interface VitalSignCardProps {
    vital: VitalSign;
    index: number;
}

export default function VitalSignCard({ vital, index }: VitalSignCardProps) {
    const getStatusColor = () => {
        switch (vital.status) {
            case 'high': return {
                border: 'border-red-500/30 hover:border-red-500',
                text: 'text-red-500'
            };
            case 'low': return {
                border: 'border-yellow-500/30 hover:border-yellow-500',
                text: 'text-yellow-500'
            };
            default: return {
                border: 'border-green-500/30 hover:border-green-500',
                text: 'text-green-500'
            };
        }
    };

    const colors = getStatusColor();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-transparent border-2 ${colors.border} rounded-xl px-6 py-6 text-center transition-all duration-300`}
        >
            <label className="text-bluelight-1 text-xl mb-3 block font-medium">
                {vital.name}
            </label>
            <p className="text-bluelight-1 text-3xl font-bold">
                {vital.value} <span className="text-lg">{vital.unit}</span>
            </p>
            <p className={`${colors.text} text-sm mt-2`}>
                {vital.description || `${vital.status.charAt(0).toUpperCase() + vital.status.slice(1)} Range`}
            </p>
        </motion.div>
    );
}