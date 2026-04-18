"use client";

import React, { useEffect, useState } from "react";
import AnalyticsHeader from "./components/AnalyticsHeader";
import PatientSelector from "./components/PatientSelector";
import TimeRangeSelector from "./components/TimeRangeSelector";
import VitalSignsGrid from "./components/VitalSignsGrid";
import HealthTrendChart from "./components/HealthTrendChart";
import RiskGauge from "./components/RiskGauge";
import RiskFactors from "./components/RiskFactors";
import GenerateReportButton from "../components/GenerateReportButton";

import { Patient, PatientAnalyticsData } from "@/types/business.types";
import { TimeRange } from "@/types/analytics.types";
import { getAllPatients, getPatientAnalytics } from "@/lib/services/business.service";
import { toPatientSelectorOptions, filterHealthTrendByTimeRange } from "@/lib/utils/analytics.utils";

export default function AnalyticsPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [selectedPatient, setSelectedPatient] = useState<string>("p001");
    const [timeRange, setTimeRange] = useState<TimeRange>("6");
    const [data, setData] = useState<PatientAnalyticsData | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [generatingReport, setGeneratingReport] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ==========================================
    // LOAD PATIENTS LIST
    // ==========================================
    useEffect(() => {
        async function loadPatients() {
            try {
                const patientsData = await getAllPatients();
                setPatients(patientsData);
            } catch (err) {
                console.error("Failed to load patients:", err);
                setError("Failed to load patients list");
            }
        }

        loadPatients();
    }, []);

    // ==========================================
    // LOAD ANALYTICS DATA
    // ==========================================
    useEffect(() => {
        let mounted = true;

        async function loadAnalytics() {
            if (!selectedPatient) return;

            setLoading(true);
            setError(null);

            try {
                const patientData = await getPatientAnalytics(selectedPatient);

                if (!mounted) return;

                if (!patientData) {
                    setError(`No analytics data found for patient ${selectedPatient}`);
                    setData(null);
                    return;
                }

                // Filter health trend by time range
                const filteredData: PatientAnalyticsData = {
                    ...patientData,
                    healthTrend: filterHealthTrendByTimeRange(
                        patientData.healthTrend,
                        timeRange
                    )
                };

                setData(filteredData);
            } catch (err) {
                console.error("Failed to load analytics:", err);
                setError("Failed to load analytics data");
                setData(null);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadAnalytics();

        return () => {
            mounted = false;
        };
    }, [selectedPatient, timeRange]);

    // ==========================================
    // GENERATE REPORT HANDLER
    // ==========================================
    const handleGenerateReport = async () => {
        if (!data) return;

        setGeneratingReport(true);

        try {
            // TODO: Replace with real API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert(`Report generation for ${data.patientName} will be implemented by Backend`);
        } catch (err) {
            console.error("Failed to generate report:", err);
            alert("Failed to generate report");
        } finally {
            setGeneratingReport(false);
        }
    };

    // ==========================================
    // CONVERT PATIENTS TO SELECTOR OPTIONS
    // ==========================================
    const patientOptions = toPatientSelectorOptions(patients);

    // ==========================================
    // LOADING STATE
    // ==========================================
    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-bluelight-1 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-bluelight-1 font-medium">Loading analytics...</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================
    if (error || !data) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-4">
                        {error || "No analytics data available"}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-bluelight-1 text-white rounded-lg hover:bg-bluelight-2 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // MAIN RENDER
    // ==========================================
    return (
        <div className="w-full space-y-6">
            {/* Header with Filters */}
            <AnalyticsHeader title="Analytics Dashboard">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <PatientSelector
                            patients={patientOptions}
                            selectedPatient={selectedPatient}
                            onPatientChange={setSelectedPatient}
                        />
                    </div>
                    <div className="sm:w-64">
                        <label className="block text-sm font-medium text-bluelight-1/70 mb-2">
                            Time Range
                        </label>
                        <TimeRangeSelector
                            timeRange={timeRange}
                            onTimeRangeChange={setTimeRange}
                        />
                    </div>
                </div>
            </AnalyticsHeader>

            {/* Vital Signs */}
            <div>
                <h2 className="text-xl font-semibold text-bluelight-1 mb-4">
                    Current Vital Signs
                </h2>
                <VitalSignsGrid vitalSigns={data.vitalSigns} />
            </div>

            {/* Health Trend & Risk Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">
                        Health Trend - Last {timeRange} Month{timeRange !== "1" ? "s" : ""}
                    </h3>
                    <HealthTrendChart
                        data={data.healthTrend}
                        timeRange={timeRange}
                    />
                </div>

                <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6 backdrop-blur-sm flex flex-col items-center justify-center">
                    <RiskGauge
                        value={data.futureRisk.value}
                        status={data.futureRisk.status}
                    />
                </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-bluelight-1 mb-6">
                    Top Factors Influencing Prediction
                </h3>
                <RiskFactors riskFactors={data.riskFactors} />

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-bluelight-1/30 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-bluelight-1/70">Low</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-bluelight-1/70">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs text-bluelight-1/70">High</span>
                    </div>
                </div>
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-center pt-4">
                <GenerateReportButton
                    onClick={handleGenerateReport}
                    loading={generatingReport}
                    disabled={!data}
                />
            </div>
        </div>
    );
}