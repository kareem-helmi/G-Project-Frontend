"use client";

import React from "react";
import dynamic from "next/dynamic";
import StatsCard from "../../components/StatsCard";
import DashboardReportAction from "./DashboardReportAction";
import { BusinessStats, DiseaseProgressionPoint, RiskFactor } from "@/types";

// Dynamic imports for charts (Client-side only)
const DiseaseProgressionChart = dynamic(
    () => import("../../components/charts/DiseaseProgressionChart"),
    { ssr: false }
);
const RiskFactorBar = dynamic(
    () => import("../../components/RiskFactorBar"),
    { ssr: true }
);
const RiskFactorsPie = dynamic(
    () => import("../../components/charts/RiskFactorsPie"),
    { ssr: false }
);
const AccuracyCircle = dynamic(
    () => import("../../components/AccuracyCircle"),
    { ssr: false }
);

interface DashboardClientProps {
    stats: BusinessStats | null;
    progression: DiseaseProgressionPoint[];
    riskFactors: RiskFactor[];
}

export default function DashboardClient({
    stats,
    progression,
    riskFactors
}: DashboardClientProps) {
    return (
        <div className="w-full space-y-8">
            {/* Page Header */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-3xl font-bold text-bluelight-1 mb-2">Dashboard</h1>
                <p className="text-bluelight-1/70">
                    Overview of your business health analytics
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Patients"
                    value={stats?.totalPatients ?? "—"}
                    color="bluelight"
                />
                <StatsCard
                    title="High Risk"
                    value={stats?.highRiskPatients ?? "—"}
                    color="red"
                />
                <StatsCard
                    title="Medium Risk"
                    value={stats?.mediumRiskPatients ?? "—"}
                    color="yellow"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Disease Progression Chart */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">
                        Disease Progression
                    </h3>
                    <div className="h-48">
                        <DiseaseProgressionChart
                            data={progression}
                            loading={false}
                        />
                    </div>
                </div>

                {/* Risk Factors Bars */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">
                        Risk Factors
                    </h3>
                    <div className="space-y-4">
                        {riskFactors.length > 0 ? (
                            riskFactors.map((factor, index) => (
                                <RiskFactorBar
                                    key={factor.name}
                                    name={factor.name}
                                    value={factor.value}
                                    colorIndex={index}
                                />
                            ))
                        ) : (
                            <div className="text-center text-bluelight-1/60 py-4">
                                No risk factors data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Prediction Accuracy */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">
                        Prediction Accuracy
                    </h3>
                    <div className="flex flex-col items-center justify-center h-48">
                        <AccuracyCircle
                            value={stats?.predictionAccuracy ?? 0}
                            strokeColor="#0eb2b1"
                        />
                        <div className="text-center text-bluelight-1/80 mt-2">
                            <div className="font-semibold">AI Model Accuracy</div>
                            <div className="text-sm">Performance Metric</div>
                        </div>
                    </div>
                </div>

                {/* Risk Factors Distribution (Pie) */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4 text-center">
                        Risk Factors Distribution
                    </h3>
                    <div className="h-80 w-full">                  
                          <RiskFactorsPie data={riskFactors} />
                    </div>
                </div>
            </div>

            {/* Report Generation */}
            <div className="flex justify-center pt-4">
                <DashboardReportAction />
            </div>
        </div>
    );
}