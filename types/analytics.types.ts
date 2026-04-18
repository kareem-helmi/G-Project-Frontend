
/**
 * Time range options for analytics
 */
import type { RiskLevel } from "./business.types";
export type TimeRange = "1" | "3" | "6";

/**
 * Patient selector display data
 * Simplified version of Patient for dropdowns
 */

export interface PatientSelectorOption {
    id: string;
    name: string;
    risk: RiskLevel;
}

/**
 * Analytics filter state
 */
export interface AnalyticsFilters {
    patientId: string;
    timeRange: TimeRange;
}

/**
 * Chart data point for health trends
 */
export interface HealthTrendDataPoint {
    month: string;
    glucose: number;
    bloodPressure: number;
}

/**
 * Risk gauge display data
 */
export interface RiskGaugeData {
    value: number;
    status: string;
    color?: string;
}

/**
 * Analytics page state
 */
export interface AnalyticsPageState {
    selectedPatient: string;
    timeRange: TimeRange;
    loading: boolean;
    error: string | null;
}

