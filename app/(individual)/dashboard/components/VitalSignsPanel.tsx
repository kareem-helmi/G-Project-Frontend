"use client";
import { motion } from "framer-motion";
import { VitalSign } from "@/types/individual.types";
import { TrendingUp, TrendingDown, Minus, Lightbulb, Info } from "lucide-react";

interface VitalSignsPanelProps {
    vitals: VitalSign[];
}

export default function VitalSignsPanel({ vitals }: VitalSignsPanelProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "high":
                return "text-red-500";
            case "low":
                return "text-yellow-500";
            default:
                return "text-green-500";
        }
    };

    const getTrendIcon = (trend?: string) => {
        switch (trend) {
            case "up":
                return <TrendingUp className="text-red-500" size={16} />;
            case "down":
                return <TrendingDown className="text-green-500" size={16} />;
            default:
                return <Minus className="text-gray-500" size={16} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
            {/* Vital Signs List */}
            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-bluelight-1 mb-6">
                    Current Vital Signs
                </h2>

                <div className="space-y-4">
                    {vitals.slice(0, 4).map((sign) => (
                        <div
                            key={sign.id}
                            className="flex items-center justify-between p-3 hover:bg-bluelight-1/5 rounded-lg transition"
                        >
                            <div className="flex items-center gap-3">

                                <span className="text-bluelight-1 font-medium">
                                    {sign.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-bluelight-1 text-xl font-bold">
                                    {sign.value}{" "}
                                    <span className="text-sm font-normal">
                                        {sign.unit}
                                    </span>
                                </span>
                                {getTrendIcon(sign.trend)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New General Section - Insights & Highlights */}
            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-bluelight-1 mb-6 text-center">
                    Insights & Highlights
                </h3>

                <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="p-4 border border-bluelight-1/20 rounded-lg hover:bg-bluelight-1/5 transition">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="text-yellow-400 mt-1" size={20} />
                            <div>
                                <p className="font-semibold text-bluelight-1">
                                    Daily Health Tip
                                </p>
                                <p className="text-sm text-bluelight-1/70 mt-1">
                                    Staying hydrated can help stabilize heart rate and improve
                                    energy levels.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-4 border border-bluelight-1/20 rounded-lg hover:bg-bluelight-1/5 transition">
                        <div className="flex items-start gap-3">
                            <Info className="text-blue-400 mt-1" size={20} />
                            <div>
                                <p className="font-semibold text-bluelight-1">
                                    System Summary
                                </p>
                                <p className="text-sm text-bluelight-1/70 mt-1">
                                    Your vitals are mostly within a normal range. Only mild
                                    fluctuations were detected today.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-4 border border-bluelight-1/20 rounded-lg hover:bg-bluelight-1/5 transition">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="text-green-400 mt-1" size={20} />
                            <div>
                                <p className="font-semibold text-bluelight-1">
                                    Quick Insight
                                </p>
                                <p className="text-sm text-bluelight-1/70 mt-1">
                                    Regular activity helps maintain stable oxygen saturation
                                    and improves overall wellness.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
