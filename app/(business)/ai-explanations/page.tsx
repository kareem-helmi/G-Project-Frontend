"use client";

import React, { useEffect, useState } from "react";
import AIChat from "./components/AIChat";
import { ModelInsights } from "@/types/business.types";
import { getModelInsights } from "@/lib/services/chat.service";

export default function AIExplanationsPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [insights, setInsights] = useState<ModelInsights | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ==========================================
    // FETCH MODEL INSIGHTS
    // ==========================================
    useEffect(() => {
        async function fetchInsights() {
            try {
                setLoading(true);
                const data = await getModelInsights();
                setInsights(data);
            } catch (err) {
                console.error("Failed to fetch model insights:", err);
                setError("Failed to load AI model information");
            } finally {
                setLoading(false);
            }
        }

        fetchInsights();
    }, []);

    // ==========================================
    // LOADING STATE
    // ==========================================
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-bluelight-1 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-bluelight-1 font-medium">Loading AI Assistant...</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================
    if (error || !insights) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                        {error || "Failed to load AI Assistant"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-bluelight-1 text-white rounded-lg hover:bg-bluelight-2 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // RENDER CHAT
    // ==========================================
    return <AIChat insights={insights} />;
}