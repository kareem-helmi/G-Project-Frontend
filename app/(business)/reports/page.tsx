"use client";

import React, { useEffect, useState } from "react";
import { Report } from "@/types";
import { getReports, generateBusinessReport } from "@/lib/services/business.service";
import PageHeader from "./components/PageHeader";
import GenerateButton from "./components/GenerateButton";
import ReportCard from "./components/ReportCard";
import EmptyState from "./components/EmptyState";
import { showSuccess, showError } from "@/components/ui/Toast";
import { RefreshCw } from "lucide-react";

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getReports();
            setReports(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load reports. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            await generateBusinessReport();
            showSuccess("Report generated successfully!");
            await fetchReports();
        } catch (err) {
            console.error(err);
            showError("Failed to generate report. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    const handleDownload = (report: Report) => {
        if (report.url) {
            window.open(report.url, "_blank");
        }
    };

    if (loading) {
        return (
            <div className="w-full space-y-8 px-4 sm:px-0 py-6">
                <PageHeader />
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-bluelight-2 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-bluelight-1/60 animate-pulse text-sm">Loading your reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 px-4 sm:px-0 py-6 max-w-5xl mx-auto">
            <PageHeader />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-bluelight-1/60 text-sm order-2 sm:order-1 font-medium">
                    {reports.length} report{reports.length !== 1 ? 's' : ''} available
                </p>
                <div className="order-1 sm:order-2">
                    <GenerateButton onClick={handleGenerate} generating={generating} />
                </div>
            </div>

            <div className="bg-white/5 border-2 border-bluelight-1/10 rounded-2xl p-4 sm:p-6 shadow-sm">
                {error ? (
                    <div className="py-10 text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={fetchReports}
                            className="inline-flex items-center gap-2 text-bluelight-2 font-semibold"
                        >
                            <RefreshCw size={18} /> Retry
                        </button>
                    </div>
                ) : reports.length === 0 ? (
                    <EmptyState onGenerate={handleGenerate} />
                ) : (
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <ReportCard key={report.id} report={report} onDownload={handleDownload} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}