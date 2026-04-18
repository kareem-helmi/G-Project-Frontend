
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Edit2 } from "lucide-react";
import { Patient } from "@/types";

// ==========================================
// PAGE HEADER COMPONENT
// ==========================================
export function PageHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold text-bluelight-1 mb-2">
                Patients
            </h1>
            <p className="text-bluelight-1/70 text-sm">
                Manage patient records and risk assessments
            </p>
        </motion.div>
    );
}

// ==========================================
// EXPORT CSV BUTTON COMPONENT
// ==========================================
interface ExportButtonProps {
    patients: Patient[];
}

export function ExportButton({ patients }: ExportButtonProps) {
    const [exporting, setExporting] = useState(false);

    const handleExport = () => {
        setExporting(true);

        try {
            // Create CSV content
            const headers = ['ID', 'Name', 'Age', 'Gender', 'Risk Level', 'Last Visit', 'Email', 'Phone'];
            const rows = patients.map(p => [
                p.id,
                p.name,
                p.age,
                p.gender,
                p.risk,
                p.lastVisit,
                p.email,
                p.phone
            ]);

            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
            ].join('\n');

            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // TODO: When backend is ready, replace with API call
            // await exportPatientsCSV();
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export CSV. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={exporting || patients.length === 0}
            className={`
                px-4 py-3 rounded-xl border-2 border-bluelight-1/40 
                text-bluelight-1 font-medium
                transition-all duration-200
                flex items-center gap-2
                ${exporting || patients.length === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#0eb2b1]/10 hover:border-bluelight-1/60 active:scale-95'
                }
            `}
        >
            {exporting ? (
                <>
                    <div className="w-4 h-4 border-2 border-bluelight-1/30 border-t-bluelight-1 rounded-full animate-spin"></div>
                    Exporting...
                </>
            ) : (
                <>
                    <Download size={16} />
                    Export CSV
                </>
            )}
        </button>
    );
}

// ==========================================
// EDIT BUTTON COMPONENT
// ==========================================
interface EditButtonProps {
    patientId: string;
}

export function EditButton({ patientId }: EditButtonProps) {
    const handleEdit = () => {
        // TODO: Replace with actual edit modal/page when backend is ready
        alert(`Edit patient ${patientId} - Will be implemented with backend`);
    };

    return (
        <button
            className="
                px-3 py-1.5 border border-bluelight-1/40 rounded-lg 
                text-xs font-medium text-bluelight-1 
                hover:bg-[#0eb2b1]/10 transition-colors
                flex items-center gap-1.5
            "
            onClick={handleEdit}
        >
            <Edit2 size={12} />
            Edit
        </button>
    );
}