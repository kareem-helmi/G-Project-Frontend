"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Title from "@/components/custom/Title";
import { DashboardData } from "@/types/individual.types";
import { getDashboardData, generateReport } from "@/lib/services/individual.service";
import UserProfileCard from "./components/UserProfileCard";
import VitalSignsPanel from "./components/VitalSignsPanel";
import HealthTrendChart from "./components/HealthTrendChart";
import CircularProgress from "./components/CircularProgress";
import RiskFactorsChart from "./components/RiskFactorsChart";
import GenerateReportButton from "../../(business)/components/GenerateReportButton";

export default function DashboardPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [generatingReport, setGeneratingReport] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ==========================================
    // LOAD DASHBOARD DATA
    // ==========================================
    useEffect(() => {
        let mounted = true;

        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const dashboardData = await getDashboardData();

                if (mounted) {
                    setData(dashboardData);
                }
            } catch (err) {
                console.error("Error loading dashboard:", err);
                if (mounted) {
                    setError("Failed to load dashboard data");
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadDashboardData();

        return () => {
            mounted = false;
        };
    }, []);

    // ==========================================
    // GENERATE REPORT HANDLER
    // ==========================================
    const handleGenerateReport = async () => {
        if (!data) return;

        try {
            setGeneratingReport(true);
            const result = await generateReport(data.patient.id);

            if (result.success) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMsg.textContent = result.message || 'Report generated successfully!';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
            }
        } catch (error) {
            console.error("Error generating report:", error);
            alert("Failed to generate report");
        } finally {
            setGeneratingReport(false);
        }
    };

    // ==========================================
    // LOADING STATE
    // ==========================================
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-14 w-14 border-4 border-bluelight-1/30 border-t-bluelight-1 rounded-full animate-spin" />
                    <p className="text-bluelight-1 text-lg font-medium tracking-wide">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================
    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md px-4"
                >
                    <Title className="text-2xl md:text-3xl text-bluelight-1 mb-4">
                        Unable to Load Dashboard
                    </Title>
                    <p className="text-bluelight-1/70 mb-6">
                        {error || "There was an error loading your dashboard data."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-bluelight-2 text-white rounded-lg hover:bg-bluelight-1 transition-colors"
                    >
                        Refresh Page
                    </button>
                </motion.div>
            </div>
        );
    }

    // ==========================================
    // RENDER DASHBOARD
    // ==========================================
    return (
        <div className="min-h-screen bg-cover bg-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 sm:mb-6 md:mb-8"
                >
                    <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-bluelight-1">
                        Patient Dashboard - {data.patient.name}
                    </Title>
                    <p className="text-xs sm:text-sm md:text-base text-bluelight-1/70 mt-1 sm:mt-2">
                        Last updated: {new Date(data.lastUpdated).toLocaleString()}
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-80 shrink-0">
                        <UserProfileCard patient={data.patient} />
                    </div>

                    {/* Dashboard Content */}
                    <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
                        {/* Vital Signs */}
                        <VitalSignsPanel vitals={data.vitals} />

                        <div className="border-t border-bluelight-1/30 my-8"></div>

                        {/* Health Trend */}
                        <HealthTrendChart data={data.healthTrend} />

                        {/* Prediction & Risk Factors */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <CircularProgress prediction={data.prediction} />
                            <RiskFactorsChart factors={data.riskFactors} />
                        </div>

                        {/* Risk Factors Detail */}
                        <div className="mt-4 sm:mt-6 md:mt-8">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-bluelight-1 mb-4 sm:mb-6">
                                Risk Factors
                            </h3>
                            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {data.riskFactors.map((factor) => (
                                        <div key={factor.id} className="border border-bluelight-1/30 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-bluelight-1">
                                                    {factor.name}
                                                </h4>
                                                <span className="text-bluelight-1 font-bold">
                                                    {factor.value}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-bluelight-1/70">
                                                {factor.description}
                                            </p>
                                            <div className="mt-3">
                                                <div className="h-2 bg-bluelight-1/20 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-bluelight-1"
                                                        style={{ width: `${factor.value}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-bluelight-1/30 my-8"></div>

                        {/* Generate Report Button */}
                        <div className="flex justify-center pt-4">
                            <GenerateReportButton
                                onClick={handleGenerateReport}
                                loading={generatingReport}
                                disabled={!data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}