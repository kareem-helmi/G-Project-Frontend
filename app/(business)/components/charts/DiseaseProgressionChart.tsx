"use client";
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { DiseaseProgressionPoint } from "@/types";

export default function DiseaseProgressionChart({ data = [], loading = false }: { data?: DiseaseProgressionPoint[]; loading?: boolean }) {
    if (loading) return <div className="h-full flex items-center justify-center text-bluelight-1/60">Loading chart...</div>;
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A90E2" opacity={0.3} />
                <XAxis dataKey="month" stroke="#4A90E2" />
                <YAxis stroke="#4A90E2" />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#4A90E2" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
