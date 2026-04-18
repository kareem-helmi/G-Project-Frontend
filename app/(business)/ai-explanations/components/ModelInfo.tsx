"use client";

import React from "react";
import { Brain, Target, Zap, Shield } from "lucide-react";

interface ModelInfoProps {
    accuracy: number;
    modelVersion: string;
    lastUpdated: string;
    features: Array<{ name: string; value: number; category: string }>;
    loading?: boolean;
}

export default function ModelInfo({
    accuracy,
    modelVersion,
    lastUpdated,
    features,
    loading = false
}: ModelInfoProps) {
    if (loading) {
        return (
            <div className="bg-linear-to-br from-bluelight-1/5 to-cyan-500/5 border-2 border-bluelight-1/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-pulse">
                <div className="h-6 bg-bluelight-1/20 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-bluelight-1/20 rounded w-1/2 mb-6"></div>
                <div className="h-32 bg-bluelight-1/20 rounded"></div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-br from-bluelight-1/5 to-cyan-500/5 border-2 border-bluelight-1/40 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 bg-linear-to-r from-bluelight-1 to-cyan-500 rounded-lg sm:rounded-xl">
                        <Brain className="text-white" size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-bluelight-1">AI Model</h3>
                        <p className="text-bluelight-1/70 text-sm">Health analysis engine</p>
                    </div>
                </div>
                <div className="px-2 py-1 sm:px-3 sm:py-1 bg-bluelight-1/20 text-bluelight-1 rounded-full text-xs sm:text-sm font-medium">
                    v{modelVersion}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 sm:mb-6">
                {/* Accuracy Card */}
                <div className="p-3 sm:p-4 bg-white/50 dark:bg-transparent border border-bluelight-1/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="text-bluelight-1" size={18} />
                        <h4 className="font-semibold text-bluelight-1 text-sm sm:text-base">Accuracy</h4>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl sm:text-3xl font-bold text-bluelight-1">{accuracy}%</span>
                        <span className="text-xs sm:text-sm text-bluelight-1/70">Overall</span>
                    </div>
                    <div className="w-full h-1.5 sm:h-2 bg-bluelight-1/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-linear-to-r from-bluelight-1 to-cyan-500"
                            style={{ width: `${accuracy}%` }}
                        />
                    </div>
                </div>

                {/* Last Updated */}
                <div className="p-3 sm:p-4 bg-white/50 dark:bg-transparent border border-bluelight-1/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="text-bluelight-1" size={18} />
                        <h4 className="font-semibold text-bluelight-1 text-sm sm:text-base">Updated</h4>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-bluelight-1 mb-1">
                        {new Date(lastUpdated).toLocaleDateString()}
                    </div>
                    <p className="text-xs sm:text-sm text-bluelight-1/70">
                        Latest medical data
                    </p>
                </div>
            </div>


            <div className="pt-3 sm:pt-4 border-t border-bluelight-1/20">
                <p className="text-xs sm:text-sm text-bluelight-1/70">
                    HIPAA compliant • Encrypted data • Secure processing
                </p>
            </div>
        </div>
    );
}