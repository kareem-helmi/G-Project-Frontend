"use client";

import React from "react";
import { User, Users, Upload } from "lucide-react";

interface UploadOptionsProps {
    selectedOption: "single" | "batch";
    onOptionSelect: (option: "single" | "batch") => void;
}

export default function UploadOptions({ selectedOption, onOptionSelect }: UploadOptionsProps) {
    const options = [
        {
            id: "single",
            title: "Single Patient Analysis",
            description: "Enter individual patient data for personalized analysis",
            icon: User,
            color: "bg-blue-500",
        },
        {
            id: "batch",
            title: "Batch Patient Data",
            description: "Upload Excel/CSV file containing multiple patient records",
            icon: Users,
            color: "bg-green-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOption === option.id;

                return (
                    <button
                        key={option.id}
                        onClick={() => onOptionSelect(option.id as "single" | "batch")}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${isSelected
                                ? "border-bluelight-1 bg-bluelight-1/10"
                                : "border-bluelight-1/40 hover:border-bluelight-1 hover:bg-bluelight-1/5"
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${option.color} text-white`}>
                                <Icon size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-bluelight-1 text-lg">
                                    {option.title}
                                </h3>
                                <p className="text-sm text-bluelight-1/70 mt-2">
                                    {option.description}
                                </p>
                            </div>
                        </div>

                        {isSelected && (
                            <div className="flex items-center gap-2 mt-4 text-sm text-bluelight-1">
                                <div className="w-2 h-2 rounded-full bg-bluelight-1 animate-pulse" />
                                <span>Selected</span>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}