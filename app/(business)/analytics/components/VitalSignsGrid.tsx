"use client";

import React from "react";
import { Heart, Droplet, Activity, TrendingUp, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { PatientVitalSigns } from "@/types/business.types";
import { getVitalStatusColor } from "@/lib/utils/analytics.utils";

interface VitalSignsGridProps {
    vitalSigns: PatientVitalSigns;
}

interface VitalCard {
    key: keyof PatientVitalSigns;
    icon: LucideIcon;
    title: string;
}

const VITAL_CARDS: VitalCard[] = [
    {
        key: "heartRate",
        icon: Heart,
        title: "Heart Rate",
    },
    {
        key: "glucose",
        icon: Droplet,
        title: "Glucose Level",
    },
    {
        key: "bloodPressure",
        icon: Activity,
        title: "Blood Pressure",
    },
    {
        key: "bloodSugar",
        icon: TrendingUp,
        title: "Blood Sugar",
    },
];

export default function VitalSignsGrid({ vitalSigns }: VitalSignsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VITAL_CARDS.map((card, index) => {
                const Icon = card.icon;
                const vital = vitalSigns[card.key];
                const statusColor = getVitalStatusColor(vital.status);

                return (
                    <motion.div
                        key={card.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/80 dark:bg-gray-800/80 border-2 border-bluelight-1/40 rounded-xl p-4 backdrop-blur-sm"
                    >
                        {/* Icon */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-bluelight-1/10 dark:bg-bluelight-1/20 rounded-lg">
                                <Icon className="text-bluelight-1" size={24} />
                            </div>
                        </div>

                        {/* Value */}
                        <div className="space-y-1">
                            <p className="text-sm text-bluelight-1/70">{card.title}</p>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-2xl font-bold ${statusColor}`}>
                                    {vital.value}
                                </span>
                                <span className="text-sm text-bluelight-1/60">
                                    {vital.unit}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}