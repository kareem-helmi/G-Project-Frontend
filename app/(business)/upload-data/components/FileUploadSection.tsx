"use client";

import React, { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadSectionProps {
    onUpload: (file: File) => Promise<void>;
    loading?: boolean;
}

export default function FileUploadSection({ onUpload, loading }: FileUploadSectionProps) {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && isValidFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && isValidFile(droppedFile)) {
            setFile(droppedFile);
        }
    };

    const handleUpload = async () => {
        if (file) {
            await onUpload(file);
        }
    };

    const isValidFile = (file: File) => {
        const validTypes = ['.csv', '.xlsx', '.xls', '.json'];
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return validTypes.includes(extension);
    };

    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragActive
                        ? "border-bluelight-2 bg-bluelight-1/10"
                        : "border-bluelight-1/40 hover:border-bluelight-1"
                    }`}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="batch-file-upload"
                    accept=".csv,.xlsx,.xls,.json"
                />

                <label htmlFor="batch-file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="p-4 bg-bluelight-1/10 rounded-full">
                            <Upload className="text-bluelight-1" size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-bluelight-1">
                                {file ? "File Selected" : "Upload Patient Data File"}
                            </h3>
                            <p className="text-bluelight-1/70 mt-2">
                                {file
                                    ? `Ready to upload: ${file.name}`
                                    : "Drag & drop or click to select Excel/CSV file"
                                }
                            </p>
                        </div>
                        <div className="text-sm text-bluelight-1/60">
                            Supports: Excel (.xlsx, .xls), CSV (.csv), JSON (.json)
                        </div>
                    </div>
                </label>
            </div>

            {/* File Preview */}
            {file && (
                <div className="bg-bluelight-1/5 border border-bluelight-1/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileText className="text-bluelight-1" size={24} />
                            <div>
                                <div className="font-medium text-bluelight-1">{file.name}</div>
                                <div className="text-sm text-bluelight-1/70">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || "Unknown type"}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <X className="text-red-500" size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="w-full py-4 bg-linear-to-r from-bluelight-1 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Uploading & Processing...
                    </>
                ) : (
                    <>
                        <Upload size={20} />
                        {file ? "Upload & Process File" : "Select a file to upload"}
                    </>
                )}
            </button>

            {/* Requirements */}
            <div className="bg-bluelight-1/5 border border-bluelight-1/20 rounded-xl p-4">
                <h4 className="font-medium text-bluelight-1 mb-2">File Requirements:</h4>
                <ul className="text-sm text-bluelight-1/70 space-y-1">
                    <li>• Maximum file size: 10MB</li>
                    <li>• Required columns for Excel/CSV: Age, Weight, Blood Pressure, Blood Sugar, BMI</li>
                    <li>• JSON files should follow the patient data schema</li>
                    <li>• All data should be properly formatted</li>
                </ul>
            </div>
        </div>
    );
}