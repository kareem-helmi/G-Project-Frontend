"use client";

import React from "react";

interface AnalyticsHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export default function AnalyticsHeader({ title, children }: AnalyticsHeaderProps) {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-bluelight-1 mb-4">
                {title}
            </h1>
            {children}
        </div>
    );
}