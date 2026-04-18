import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, HardDrive } from "lucide-react";
import { Report } from "@/types";

interface ReportCardProps {
    report: Report;
    onDownload: (report: Report) => void;
}

export default function ReportCard({ report, onDownload }: ReportCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-bluelight-1/20 rounded-xl hover:border-bluelight-1/40 hover:bg-bluelight-1/5 transition-all gap-4"
        >
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="p-2 sm:p-3 bg-bluelight-1/10 rounded-lg shrink-0">
                    <FileText className="text-bluelight-1" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-bluelight-1 mb-1 truncate text-sm sm:text-base">
                        {report.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-bluelight-1/70">
                        <span className="flex items-center gap-1">
                            <FileText size={12} />
                            {report.type}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(report.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-nowrap">
                            <HardDrive size={12} />
                            {report.size}
                        </span>
                    </div>
                </div>
            </div>
            
            <button
                onClick={() => onDownload(report)}
                className="w-full sm:w-auto px-4 py-2.5 border-2 border-bluelight-1/40 text-bluelight-1 text-sm rounded-lg hover:bg-bluelight-1 hover:text-white transition-all inline-flex items-center justify-center gap-2"
            >
                <Download size={16} />
                Download
            </button>
        </motion.div>
    );
}