import React from "react";
import { FileText } from "lucide-react";

interface EmptyStateProps {
    onGenerate: () => void;
}

export default function EmptyState({ onGenerate }: EmptyStateProps) {
    return (
        <div className="py-10 sm:py-16 text-center px-4">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-bluelight-1/30 mx-auto mb-4" />
            <p className="text-bluelight-1/60 mb-6 text-sm sm:text-base">No reports available yet</p>
            <button
                onClick={onGenerate}
                className="w-full sm:w-auto px-8 py-3 bg-bluelight-2 text-white rounded-lg hover:bg-bluelight-1 transition-colors font-medium"
            >
                Generate Your First Report
            </button>
        </div>
    );
}