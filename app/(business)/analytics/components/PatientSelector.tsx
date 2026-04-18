"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { PatientSelectorOption } from "@/types/analytics.types";

interface PatientSelectorProps {
    patients: PatientSelectorOption[];
    selectedPatient: string;
    onPatientChange: (patientId: string) => void;
}

export default function PatientSelector({
    patients,
    selectedPatient,
    onPatientChange
}: PatientSelectorProps) {
    // Find selected patient info
    const selectedPatientInfo = patients.find(p => p.id === selectedPatient);

    // Risk badge color classes
    const getRiskBadgeClasses = (risk: "High" | "Medium" | "Low"): string => {
        const classes = {
            High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
            Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        };
        return classes[risk];
    };

    return (
        <div className="space-y-3">
            {/* Dropdown */}
            <div className="relative">
                <select
                    value={selectedPatient}
                    onChange={(e) => onPatientChange(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-white/80 dark:bg-gray-800/80 border-2 border-bluelight-1/40 rounded-xl text-bluelight-1 font-medium focus:border-bluelight-2 focus:outline-none appearance-none cursor-pointer transition-colors"
                >
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name} ({patient.risk} Risk)
                        </option>
                    ))}
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-bluelight-1 pointer-events-none"
                    size={20}
                />
            </div>

            {/* Selected Patient Info Badge */}
            {selectedPatientInfo && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-bluelight-1/10 dark:bg-bluelight-1/20 rounded-lg">
                    <span className="text-sm text-bluelight-1/70">Viewing:</span>
                    <span className="font-semibold text-bluelight-1">
                        {selectedPatientInfo.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskBadgeClasses(selectedPatientInfo.risk)}`}>
                        {selectedPatientInfo.risk} Risk
                    </span>
                </div>
            )}
        </div>
    );
}