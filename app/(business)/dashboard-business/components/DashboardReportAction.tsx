"use client";
import React, { useState } from "react";
import GenerateReportButton from "../../components/GenerateReportButton";

export default function DashboardReportAction() {
    const [generating, setGenerating] = useState(false);

    const handleGenerateReport = () => {
        setGenerating(true);
        setTimeout(() => {
            alert("PDF report generation for dashboard statistics will be implemented by Backend");
            setGenerating(false);
        }, 1500);
    };

    return (
        <GenerateReportButton
            onClick={handleGenerateReport}
            loading={generating}
        />
    );
}
