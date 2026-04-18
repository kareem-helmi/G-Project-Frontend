"use client";
import { motion } from "framer-motion";
import { HealthTrendPoint } from "@/types/individual.types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HealthTrendChartProps {
    data: HealthTrendPoint[];
    title?: string;
    height?: number;
}

const CHART_CONFIG = {
    cartesianGrid: {
        strokeDasharray: '3 3',
        stroke: '#0EB2B1',
        opacity: 0.3,
    },
    axis: {
        stroke: '#0EB2B1',
        fontSize: 12,
        fill: '#0EB2B1',
    },
    tooltip: {
        contentStyle: {
            backgroundColor: 'rgba(14, 178, 177, 0.95)',
            border: '1px solid #0EB2B1',
            borderRadius: '8px',
            color: 'white',
            backdropFilter: 'blur(10px)',
        },
    },
};

export default function HealthTrendChart({ data, title = "Health Trend - Last 6 Months", height = 320 }: HealthTrendChartProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
        >
            <h3 className="text-2xl font-semibold text-bluelight-1 mb-6">{title}</h3>
            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                            <XAxis dataKey="month" {...CHART_CONFIG.axis} />
                            <YAxis {...CHART_CONFIG.axis} />
                            <Tooltip {...CHART_CONFIG.tooltip} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="risk"
                                name="Risk Level"
                                stroke="#EF4444"
                                strokeWidth={3}
                                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#DC2626' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="healthScore"
                                name="Health Score"
                                stroke="#0EB2B1"
                                strokeWidth={3}
                                dot={{ fill: '#0EB2B1', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#0D9488' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}