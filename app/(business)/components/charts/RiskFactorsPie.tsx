"use client";
import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";
import { RiskFactor } from "@/types";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function RiskFactorsPie({ data = [] }: { data?: RiskFactor[] }) {

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const formattedData = data.map(d => ({
        name: d.name,
        value: d.value
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={formattedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={90}
                >
                    {formattedData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(value: number) => {
                        const percent = ((value / total) * 100).toFixed(1);
                        return [`${value} (${percent}%)`, "Value"];
                    }}
                />

                <Legend
                    verticalAlign="bottom"
                    formatter={(value: string, entry: any) => {
                        const val = entry.payload.value;
                        const percent = total
                            ? ((val / total) * 100).toFixed(1)
                            : 0;

                        return `${value} - ${percent}%`;
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}