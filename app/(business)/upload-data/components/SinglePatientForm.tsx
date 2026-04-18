"use client";

import React, { useState } from "react";
import { Upload, Info } from "lucide-react";

interface PatientFormData {
    age: string;
    weight: string;
    sleepHours: string;
    bloodPressure: string;
    bloodSugar: string;
    bmi: string;
    additionalInfo: string;
}

interface SinglePatientFormProps {
    onSubmit: (data: PatientFormData, file?: File) => void;
    loading?: boolean;
}

export default function SinglePatientForm({ onSubmit, loading }: SinglePatientFormProps) {
    const [formData, setFormData] = useState<PatientFormData>({
        age: "",
        weight: "",
        sleepHours: "",
        bloodPressure: "",
        bloodSugar: "",
        bmi: "",
        additionalInfo: "",
    });
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData, file || undefined);
    };

    const inputFields = [
        { name: "age", label: "Age", placeholder: "Enter age", type: "number", unit: "years" },
        { name: "weight", label: "Weight", placeholder: "Enter weight", type: "number", unit: "kg" },
        { name: "sleepHours", label: "Sleep Hours", placeholder: "Enter sleep hours", type: "number", unit: "hours" },
        { name: "bloodPressure", label: "Blood Pressure", placeholder: "120/80", type: "text", unit: "mmHg" },
        { name: "bloodSugar", label: "Blood Sugar", placeholder: "Enter blood sugar level", type: "number", unit: "mg/dL" },
        { name: "bmi", label: "BMI", placeholder: "Enter BMI", type: "number", unit: "kg/m²" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                        <label className="block text-sm font-medium text-bluelight-1">
                            {field.label}
                            <span className="ml-1 text-bluelight-1/60">({field.unit})</span>
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof PatientFormData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl text-bluelight-1 focus:border-bluelight-2 focus:outline-none"
                        />
                    </div>
                ))}
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-bluelight-1 flex items-center gap-2">
                    <Info size={16} />
                    Enter More Information (Optional)
                </label>
                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Enter any additional medical information, history, or notes..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl text-bluelight-1 focus:border-bluelight-2 focus:outline-none resize-none"
                />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-bluelight-1 items-center gap-2">
                    <Upload size={16} />
                    Upload File (Optional)
                </label>
                <div className="border-2 border-dashed border-bluelight-1/40 rounded-xl p-6 text-center hover:border-bluelight-1 transition-colors">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png,.txt"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Upload className="text-bluelight-1/60" size={32} />
                            <span className="text-bluelight-1 font-medium">
                                {file ? file.name : "Click to upload medical documents"}
                            </span>
                            <span className="text-sm text-bluelight-1/60">
                                Supports PDF, images, text files
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-linear-to-r from-bluelight-1 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Analyzing..." : "Analyze Patient Data"}
            </button>
        </form>
    );
}