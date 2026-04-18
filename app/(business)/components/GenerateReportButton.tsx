"use client";

import React from "react";
import { FileText } from "lucide-react";

interface GenerateReportButtonProps {
    onClick?: () => void;
    loading?: boolean;
    label?: string;
    disabled?: boolean;
}

export default function GenerateReportButton({
    onClick,
    loading = false,
    label = "Generate Report (PDF)",
    disabled = false
}: GenerateReportButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={loading || disabled}
            className={`
                px-8 py-4 bg-bluelight-2 text-white rounded-xl 
                hover:bg-bluelight-1 transition-all duration-300 
                text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105
                flex items-center justify-center gap-3 min-w-[220px]
                ${loading || disabled ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}
            `}
        >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                </>
            ) : (
                <>
                    <FileText size={20} />
                    {label}
                </>
            )}
        </button>
    );
}