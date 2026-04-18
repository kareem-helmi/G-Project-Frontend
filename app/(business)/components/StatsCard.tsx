"use client";
import React from "react";

type Props = {
    title: string;
    value: string | number;
    loading?: boolean;
    color?: "red" | "yellow" | "blue" | "bluelight"; // إضافة خيار bluelight
};

const numberColorMap: Record<string, string> = {
    red: "text-red-500",
    yellow: "text-yellow-500",
    blue: "text-blue-500",
    bluelight: "text-bluelight-1", // إضافة هذا
};

export default function StatsCard({ title, value, loading = false, color = "blue" }: Props) {
    return (
        <div className="rounded-xl border-2 border-bluelight-1/40 p-5 bg-transparent">
            <div className="text-sm text-bluelight-1/70">{title}</div>
            <div className={`mt-2 text-3xl font-bold ${numberColorMap[color]}`}>
                {loading ? "—" : value}
            </div>
        </div>
    );
}