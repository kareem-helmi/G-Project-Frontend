import React from "react";
import { Plus } from "lucide-react";

interface GenerateButtonProps {
    onClick: () => void;
    generating: boolean;
}

export default function GenerateButton({ onClick, generating }: GenerateButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={generating}
            className={`
                w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                font-medium transition-all text-sm sm:text-base
                ${generating
                    ? 'bg-bluelight-2/50 text-white/70 cursor-not-allowed'
                    : 'bg-bluelight-2 text-white hover:bg-bluelight-1 active:scale-95 shadow-lg shadow-bluelight-2/20'
                }
            `}
        >
            {generating ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                </>
            ) : (
                <>
                    <Plus size={18} />
                    <span>Generate New Report</span>
                </>
            )}
        </button>
    );
}