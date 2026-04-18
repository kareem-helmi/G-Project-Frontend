"use client";

import React from "react";
import { motion } from "framer-motion";
import { getRiskGaugeColor } from "@/lib/utils/analytics.utils";

interface RiskGaugeProps {
    value: number;
    status: string;
}

export default function RiskGauge({ value, status }: RiskGaugeProps) {
    const color = getRiskGaugeColor(value);
    const circumference = 251.2;
    const offset = circumference - (circumference * value) / 100;

    return (
        <div className="relative w-full max-w-xs mx-auto">
            {/* SVG Gauge */}
            <svg
                className="w-full h-auto"
                viewBox="0 0 200 120"
                role="img"
                aria-label={`Risk level: ${value}%`}
            >
                {/* Background Arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#4A90E2"
                    strokeWidth="12"
                    opacity="0.2"
                />

                {/* Animated Progress Arc */}
                <motion.path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Value Text */}
                <motion.text
                    x="100"
                    y="85"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {value}%
                </motion.text>
            </svg>

            {/* Labels */}
            <div className="text-center mt-2">
                <p className="text-lg font-semibold text-bluelight-1">Future Risk</p>
                <p className="text-sm text-bluelight-1/70">{status}</p>
            </div>
        </div>
    );
}