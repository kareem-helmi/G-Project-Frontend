"use client";

import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

interface HealthTrendChartProps {
    data: Array<{ month: string; glucose: number; bloodPressure: number }>;
    timeRange: "1" | "3" | "6";
}

export default function HealthTrendChart({ data, timeRange }: HealthTrendChartProps) {
    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A90E2" opacity={0.3} />
                    <XAxis
                        dataKey="month"
                        stroke="#4A90E2"
                        fontSize={12}
                    />
                    <YAxis
                        stroke="#4A90E2"
                        fontSize={12}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1E3A8A',
                            border: '1px solid #4A90E2',
                            borderRadius: '8px',
                            color: 'white'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="glucose"
                        stroke="#0088FE"
                        strokeWidth={2}
                        dot={{ fill: '#0088FE', r: 4 }}
                        name="Glucose"
                    />
                    <Line
                        type="monotone"
                        dataKey="bloodPressure"
                        stroke="#00C49F"
                        strokeWidth={2}
                        dot={{ fill: '#00C49F', r: 4 }}
                        name="Blood Pressure"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}