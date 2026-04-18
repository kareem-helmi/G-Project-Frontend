"use client";

import React from "react";
import { CheckCircle, AlertTriangle, TrendingDown, Activity } from "lucide-react";

interface AnalysisResultProps {
    status: string;
    riskLevel: number;
    advice: string[];
    onNewAnalysis?: () => void;
}

export default function AnalysisResult({ status, riskLevel, advice, onNewAnalysis }: AnalysisResultProps) {
    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case "stable": return "text-green-500";
            case "warning": return "text-yellow-500";
            case "critical": return "text-red-500";
            default: return "text-bluelight-1";
        }
    };

    const getRiskColor = () => {
        if (riskLevel < 30) return "text-green-500";
        if (riskLevel < 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getRiskLabel = () => {
        if (riskLevel < 30) return "Low Risk";
        if (riskLevel < 60) return "Medium Risk";
        return "High Risk";
    };

    return (
        <div className="bg-linear-to-br from-bluelight-1/5 to-cyan-500/5 border-2 border-bluelight-1/40 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-bluelight-1">Analysis Results</h3>
                {onNewAnalysis && (
                    <button
                        onClick={onNewAnalysis}
                        className="px-4 py-2 border-2 border-bluelight-1 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-colors text-sm font-medium"
                    >
                        New Analysis
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Status */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className={`${getStatusColor()}`} size={24} />
                        <h4 className="font-semibold text-bluelight-1">Current Status</h4>
                    </div>
                    <div className={`text-3xl font-bold ${getStatusColor()}`}>
                        {status}
                    </div>
                    <p className="text-bluelight-1/70">
                        Based on the provided data, the patient's health status is {status.toLowerCase()}.
                    </p>
                </div>

                {/* Risk Level */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className={`${getRiskColor()}`} size={24} />
                        <h4 className="font-semibold text-bluelight-1">Risk Level</h4>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-bold ${getRiskColor()}`}>
                            {riskLevel}%
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor().replace('text-', 'bg-')}/20 ${getRiskColor()}`}>
                            {getRiskLabel()}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-bluelight-1/20 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getRiskColor().replace('text-', 'bg-')}`}
                            style={{ width: `${Math.min(riskLevel, 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Advice Section */}
            <div className="mt-8 pt-6 border-t border-bluelight-1/30">
                <div className="flex items-center gap-3 mb-4">
                    <Activity className="text-bluelight-1" size={20} />
                    <h4 className="font-semibold text-bluelight-1">Recommendations & Advice</h4>
                </div>
                <div className="space-y-3">
                    {advice.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-white/50 dark:bg-transparent border border-bluelight-1/20 rounded-lg"
                        >
                            <TrendingDown className="text-bluelight-1 mt-1" size={16} />
                            <span className="text-bluelight-1">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Steps */}
            <div className="mt-6 p-4 bg-bluelight-1/10 rounded-xl">
                <p className="text-sm text-bluelight-1/80">
                    <strong>Next Steps:</strong> Consider scheduling a follow-up consultation and monitoring
                    the recommended metrics regularly. Share these results with healthcare providers if needed.
                </p>
            </div>
        </div>
    );
}