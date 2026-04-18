"use client";

import React, { useEffect, useState } from "react";
import { Activity, FileText } from "lucide-react";
import { UploadedFile } from "@/types";
import {
    getUploadedFiles,
    deleteUploadedFile,
    uploadFile
} from "@/lib/services/business.service";
import UploadOptions from "./components/UploadOptions";
import SinglePatientForm from "./components/SinglePatientForm";
import FileUploadSection from "./components/FileUploadSection";
import AnalysisResult from "./components/AnalysisResult";

type UploadOption = "single" | "batch";

interface PatientFormData {
    age: string;
    weight: string;
    sleepHours: string;
    bloodPressure: string;
    bloodSugar: string;
    bmi: string;
    additionalInfo: string;
}

interface AnalysisData {
    status: string;
    riskLevel: number;
    advice: string[];
}

export default function UploadDataPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [selectedOption, setSelectedOption] = useState<UploadOption>("single");
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);

    // ==========================================
    // LOAD UPLOADED FILES
    // ==========================================
    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setLoading(true);
        try {
            const data = await getUploadedFiles();
            setFiles(data);
        } catch (err) {
            console.error("Failed to load files:", err);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // HANDLE SINGLE PATIENT ANALYSIS
    // ==========================================
    const handleSinglePatientSubmit = async (
        data: PatientFormData,
        file?: File
    ) => {
        setAnalyzing(true);
        try {
            // TODO: Replace with real API call
            // const result = await analyzePatientData(data, file);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock analysis result (replace with real API response)
            const mockResult: AnalysisData = {
                status: "Stable",
                riskLevel: 35,
                advice: [
                    "Maintain balanced diet and regular exercise",
                    "Monitor blood sugar levels weekly",
                    "Get 7-8 hours of sleep daily",
                    "Schedule follow-up appointment in 3 months",
                    "Consider reducing stress through meditation or yoga"
                ]
            };

            setAnalysisResult(mockResult);
        } catch (err) {
            console.error("Analysis failed:", err);
            alert("Analysis failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    // ==========================================
    // HANDLE FILE UPLOAD
    // ==========================================
    const handleFileUpload = async (file: File) => {
        setUploading(true);
        try {
            const result = await uploadFile(file);

            if (result.success) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right';
                successMsg.textContent = 'File uploaded successfully!';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);

                // Reload files list
                await loadFiles();
            } else {
                alert(result.error || "Upload failed. Please try again.");
            }
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    // ==========================================
    // HANDLE FILE DELETE
    // ==========================================
    const handleDelete = async (id: string) => {
        try {
            const result = await deleteUploadedFile(id);
            if (result.success) {
                setFiles(prev => prev.filter(f => f.id !== id));
            }
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete file");
        }
    };

    // ==========================================
    // RESET ANALYSIS
    // ==========================================
    const resetAnalysis = () => {
        setAnalysisResult(null);
    };

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-bluelight-1 mb-2">
                    Patient Health Analysis
                </h1>
                <p className="text-bluelight-1/60">
                    Upload patient data for AI-powered health risk analysis
                </p>
            </div>

            {/* Show Analysis Result */}
            {analysisResult ? (
                <AnalysisResult
                    status={analysisResult.status}
                    riskLevel={analysisResult.riskLevel}
                    advice={analysisResult.advice}
                    onNewAnalysis={resetAnalysis}
                />
            ) : (
                <>
                    {/* Upload Options */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-bluelight-1">
                            Select Analysis Type
                        </h2>
                        <UploadOptions
                            selectedOption={selectedOption}
                            onOptionSelect={setSelectedOption}
                        />
                    </div>

                    {/* Single Patient Form */}
                    {selectedOption === "single" && (
                        <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="text-bluelight-1" size={24} />
                                <h2 className="text-xl font-semibold text-bluelight-1">
                                    Enter Patient Data
                                </h2>
                            </div>
                            <SinglePatientForm
                                onSubmit={handleSinglePatientSubmit}
                                loading={analyzing}
                            />
                        </div>
                    )}

                    {/* Batch File Upload */}
                    {selectedOption === "batch" && (
                        <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-bluelight-1" size={24} />
                                <h2 className="text-xl font-semibold text-bluelight-1">
                                    Upload Patients Data File
                                </h2>
                            </div>
                            <FileUploadSection
                                onUpload={handleFileUpload}
                                loading={uploading}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}