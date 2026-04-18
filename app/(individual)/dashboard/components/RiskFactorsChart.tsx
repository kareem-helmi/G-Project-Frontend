"use client";
import { motion } from "framer-motion";
import { RiskFactor } from "@/types/individual.types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RiskFactorsChartProps {
    factors: RiskFactor[];
    title?: string;
    height?: number;
}

const CHART_COLORS = ['#0EB2B1', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'];

export default function RiskFactorsChart({ factors, title = "Risk Factors Analysis", height = 320 }: RiskFactorsChartProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full"
        >
            <h3 className="text-2xl lg:text-3xl font-bold text-bluelight-1 mb-6 text-center">{title}</h3>
            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={factors}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#0EB2B1" opacity={0.3} />
                        <XAxis
                            type="number"
                            stroke="#0EB2B1"
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#0EB2B1"
                            width={110}
                            fontSize={14}
                        />
                        <Tooltip
                            formatter={(value: number) => [`${value}%`, 'Impact']}
                            contentStyle={{
                                backgroundColor: 'rgba(14, 178, 177, 0.95)',
                                border: '1px solid #0EB2B1',
                                borderRadius: '8px',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                            {factors.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}