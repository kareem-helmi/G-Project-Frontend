"use client";

import React, { useEffect, useState } from "react";
import DashboardClient from "./components/DashboardClient";
import { BusinessStats, DiseaseProgressionPoint, RiskFactor } from "@/types";
import {
    getBusinessStats,
    getDiseaseProgression,
    getRiskFactors
} from "@/lib/services/business.service";

export default function DashboardBusinessPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [stats, setStats] = useState<BusinessStats | null>(null);
    const [progression, setProgression] = useState<DiseaseProgressionPoint[]>([]);
    const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ==========================================
    // FETCH DATA
    // ==========================================
    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);

                // Fetch all data in parallel
                const [statsData, progressionData, riskFactorsData] = await Promise.all([
                    getBusinessStats(),
                    getDiseaseProgression(),
                    getRiskFactors()
                ]);

                setStats(statsData);
                setProgression(progressionData);
                setRiskFactors(riskFactorsData);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    // ==========================================
    // LOADING STATE
    // ==========================================
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-bluelight-1 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-bluelight-1 font-medium">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                        {error}
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
    // RENDER DASHBOARD
    // ==========================================
    return (
        <DashboardClient
            stats={stats}
            progression={progression}
            riskFactors={riskFactors}
        />
    );
}