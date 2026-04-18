
import { Patient } from "@/types/business.types";
import { PatientSelectorOption, TimeRange } from "@/types/analytics.types";
import type { VitalStatus, ImpactLevel } from "@/types";

/**
 * Convert full Patient data to selector option
 */
export function toPatientSelectorOption(patient: Patient): PatientSelectorOption {
    return {
        id: patient.id,
        name: patient.name,
        risk: patient.risk
    };
}

/**
 * Convert multiple patients to selector options
 */
export function toPatientSelectorOptions(patients: Patient[]): PatientSelectorOption[] {
    return patients.map(toPatientSelectorOption);
}

/**
 * Get color for risk gauge based on value
 */
export function getRiskGaugeColor(value: number): string {
    if (value < 30) return "#10B981"; // green
    if (value < 60) return "#F59E0B"; // yellow
    return "#EF4444"; // red
}

/**
 * Get risk level text based on value
 */
export function getRiskLevelText(value: number): string {
    if (value < 30) return "Low Risk - Continue Current Lifestyle";
    if (value < 50) return "Stable - Good Progress";
    if (value < 70) return "Moderate - Monitoring Required";
    if (value < 80) return "High Risk - Action Required";
    return "Critical - Immediate Attention";
}

/**
 * Filter health trend data by time range
 */
export function filterHealthTrendByTimeRange<T extends { month: string }>(
    data: T[],
    timeRange: TimeRange
): T[] {
    const monthsToShow = parseInt(timeRange);
    return data.slice(-monthsToShow);
}

/**
 * Format time range label
 */
export function formatTimeRangeLabel(timeRange: TimeRange): string {
    const labels: Record<TimeRange, string> = {
        "1": "Last Month",
        "3": "Last 3 Months",
        "6": "Last 6 Months"
    };
    return labels[timeRange];
}

/**
 * Get vital sign status color class
 */
export function getVitalStatusColor(status:VitalStatus): string {
    const colors = {
        normal: "text-green-600",
        warning: "text-yellow-600",
        danger: "text-red-600"
    };
    return colors[status];
}

/**
 * Get impact level color classes
 */
export function getImpactColorClasses(impact: ImpactLevel): {
    bg: string;
    text: string;
} {
    const colors = {
        Low: { bg: "bg-green-500", text: "text-green-600" },
        Medium: { bg: "bg-yellow-500", text: "text-yellow-600" },
        High: { bg: "bg-red-500", text: "text-red-600" }
    };
    return colors[impact];
}