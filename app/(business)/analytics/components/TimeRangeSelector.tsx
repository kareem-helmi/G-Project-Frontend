"use client";

import React from "react";
import { TimeRange } from "@/types/analytics.types";
import { formatTimeRangeLabel } from "@/lib/utils/analytics.utils";

interface TimeRangeSelectorProps {
    timeRange: TimeRange;
    onTimeRangeChange: (range: TimeRange) => void;
}

export default function TimeRangeSelector({
    timeRange,
    onTimeRangeChange
}: TimeRangeSelectorProps) {
    const timeRanges: TimeRange[] = ["1", "3", "6"];

    return (
        <div className="flex gap-2">
            {timeRanges.map((range) => (
                <button
                    key={range}
                    onClick={() => onTimeRangeChange(range)}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${timeRange === range
                            ? "bg-bluelight-2 text-white shadow-md"
                            : "bg-white/80 dark:bg-gray-800/80 border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10"
                        }`}
                >
                    {formatTimeRangeLabel(range)}
                </button>
            ))}
        </div>
    );
}