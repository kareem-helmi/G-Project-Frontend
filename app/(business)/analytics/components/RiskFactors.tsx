"use client";

import React from "react";
import { motion } from "framer-motion";
import { getImpactColorClasses } from "@/lib/utils/analytics.utils";

interface RiskFactor {
    title: string;
    impact: "Low" | "Medium" | "High";
    value: number;
}

interface RiskFactorsProps {
    riskFactors: RiskFactor[];
}

export default function RiskFactors({ riskFactors }: RiskFactorsProps) {
    return (
        <div className="space-y-5">
            {riskFactors.map((factor, index) => {
                const colors = getImpactColorClasses(factor.impact);

                return (
                    <div key={factor.title} className="space-y-2">
                        {/* Factor Label */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-bluelight-1">
                                {factor.title}
                            </span>
                            <span className={`text-xs font-semibold ${colors.text}`}>
                                {factor.impact} Impact
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-bluelight-1/20 dark:bg-gray-700/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${factor.value}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full ${colors.bg}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}