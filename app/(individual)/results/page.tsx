"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";
import MainButton from "@/components/custom/MainButton";
import { getResultsData } from "@/lib/services/individual.service";
import { tempStorage } from "@/lib/utils/storage";
import type { ResultsPageData } from "@/types/individual.types";
import ErrorState from "./components/ErrorState";
import NavigationHeader from "./components/NavigationHeader";
import VitalSignsGrid from "./components/VitalSignsGrid";
import PredictionDisplay from "./components/PredictionDisplay";
import AnalysisSection from "./components/AnalysisSection";
import LoadingSpinner from "./components/LoadingSpinner";

export default function ResultsPage() {
    const router = useRouter();

    // ==========================================
    // STATE
    // ==========================================
    const [data, setData] = useState<ResultsPageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ==========================================
    // LOAD RESULTS DATA
    // ==========================================
    useEffect(() => {
        let mounted = true;

        const loadResultsData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Try to get submission ID (optional)
                const submissionId = tempStorage.get<string>("lastSubmissionId");

                // Fetch results (service handles missing ID with mock data)
                const resultsData = await getResultsData(submissionId || undefined);

                if (mounted) {
                    setData(resultsData);
                }
            } catch (err) {
                console.error("Error loading results:", err);
                if (mounted) {
                    setError(err instanceof Error ? err.message : "Failed to load results data");
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadResultsData();

        return () => {
            mounted = false;
        };
    }, []);

    // ==========================================
    // HANDLERS
    // ==========================================
    const handleAnalyze = () => {
        if (data) {
            tempStorage.set("resultsData", data);
        }
        router.push("/dashboard");
    };

    const handleNewAnalysis = () => {
        tempStorage.remove("lastSubmissionId");
        tempStorage.remove("submittedHealthData");
        router.push("/medical-data");
    };

    // ==========================================
    // RENDER STATES
    // ==========================================
    if (isLoading) return <LoadingSpinner />;

    if (error || !data) {
        return (
            <ErrorState
                error={error || "Unable to load results"}
                onNewAnalysis={handleNewAnalysis}
                onGoToDashboard={() => router.push("/dashboard")}
            />
        );
    }

    // ==========================================
    // RENDER RESULTS
    // ==========================================
    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <NavigationHeader
                    onBack={handleNewAnalysis}
                    onHome={() => router.push("/")}
                />

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-bluelight-1 mb-3 sm:mb-4 px-2">
                        AI Disease Progression Predictor
                    </Title>
                    <SubTitle className="text-base sm:text-lg md:text-xl text-bluelight-1/70 px-2">
                        Prediction Results - {data.patient.name}
                    </SubTitle>
                </motion.div>

                {/* Results Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8 sm:space-y-12"
                >
                    <VitalSignsGrid vitals={data.vitals} />

                    <div className="border-t border-bluelight-1/30 my-8"></div>

                    <PredictionDisplay prediction={data.prediction} />

                    <div className="border-t border-bluelight-1/30 my-8"></div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        <AnalysisSection
                            title="Health Analysis"
                            items={data.analysis}
                            type="analysis"
                        />
                        <AnalysisSection
                            title="Recommendations"
                            items={data.recommendations}
                            type="recommendations"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8">
                        <MainButton
                            onClick={handleNewAnalysis}
                            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10 transition-all duration-300 w-full sm:w-auto"
                        >
                            New Analysis
                        </MainButton>

                        <MainButton
                            onClick={handleAnalyze}
                            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border transition-all duration-300 bg-bluelight-2 hover:bg-transparent hover:scale-105 w-full sm:w-auto"
                        >
                            View Full Dashboard
                        </MainButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}