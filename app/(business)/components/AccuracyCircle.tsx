"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
    value?: number;
    size?: number;
    strokeColor?: string;
    strokeWidth?: number;
};

export default function AccuracyCircle({
    value = 0,
    size = 120,
    strokeColor = "#4A90E2",
    strokeWidth = 8,
}: Props) {
    const display = Math.round(Math.max(0, Math.min(100, Number(value || 0))));
    const radius = 45;
    const dash = 2 * Math.PI * radius;
    const offset = dash - (dash * display) / 100;

    return (
        <div style={{ width: size, height: size }} className="relative  mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    opacity={0.15}
                />

                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    initial={{ strokeDashoffset: dash }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    transform="rotate(-90 50 50)"
                />

                <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="700"
                    fill={strokeColor}
                >
                    {display}%
                </text>
            </svg>
        </div>
    );
}