"use client";
import React from "react";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function RiskFactorBar({ name, value, colorIndex = 0 }: { name: string; value: number; colorIndex?: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-bluelight-1">{name}</span>
                <span className="font-bold text-bluelight-1">{value}%</span>
            </div>
            <div className="w-full rounded-full h-2 bg-bluelight-1/30">
                <div className="h-2 rounded-full" style={{ width: `${value}%`, backgroundColor: COLORS[colorIndex % COLORS.length] }} />
            </div>
        </div>
    );
}
