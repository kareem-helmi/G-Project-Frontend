
// ==========================================
// BASE TYPES
// ==========================================
export type RiskLevel = 'High' | 'Medium' | 'Low';
export type HealthStatus = 'normal' | 'high' | 'low';
export type ActivityStatus = 'completed' | 'upcoming' | 'missed';
export type TrendDirection = 'up' | 'down' | 'stable';

// ==========================================
// PATIENT TYPES
// ==========================================
export interface Patient {
    id: string;
    name: string;
    initials: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    risk: RiskLevel;
    lastVisit: string;
    nextAppointment?: string;
    doctor: string;
    email?: string;
    phone?: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
}

// ==========================================
// VITAL SIGNS TYPES
// ==========================================
export interface VitalSign {
    id: string;
    name: string;
    value: string | number;
    unit: string;
    status: HealthStatus;
    description?: string;
    trend?: TrendDirection;
}

// ==========================================
// PREDICTION TYPES
// ==========================================
export interface PredictionResult {
    percentage: number;
    riskLevel: RiskLevel;
    message: string;
    additionalInfo: string;
    confidence?: number;
    timeframe?: string;
}

// ==========================================
// ANALYSIS TYPES
// ==========================================
export interface AnalysisItem {
    text: string;
    color: 'red' | 'green' | 'yellow' | 'blue';
    icon?: string;
}

// ==========================================
// HEALTH TREND TYPES
// ==========================================
export interface HealthTrendPoint {
    id: string;
    month: string;
    risk: number;
    healthScore: number;
    visits: number;
}

// ==========================================
// RISK FACTOR TYPES
// ==========================================
export interface RiskFactor {
    id: string;
    name: string;
    value: number;
    impact: 'high' | 'medium' | 'low';
    description: string;
}

// ==========================================
// ACTIVITY TYPES
// ==========================================
export interface ActivityItem {
    id: string;
    type: 'measurement' | 'appointment' | 'medication' | 'analysis';
    title: string;
    description: string;
    date: string;
    status: ActivityStatus;
}

// ==========================================
// FORM TYPES
// ==========================================
export interface HealthFormData {
    age: string;
    bloodPressure: string;
    bloodSugar: string;
    bmi: string;
    weight: string;
    SleepHours: string;
    additionalInfo: string;
    file?: File;
}

export interface FormValidationErrors {
    age?: string;
    bloodPressure?: string;
    bloodSugar?: string;
    bmi?: string;
    [key: string]: string | undefined;
}

// ==========================================
// SETTINGS TYPES
// ==========================================
export interface UserSettings {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
    dataSharing: boolean;
}

// ==========================================
// PAGE DATA TYPES
// ==========================================
export interface DashboardData {
    patient: Patient;
    vitals: VitalSign[];
    healthTrend: HealthTrendPoint[];
    riskFactors: RiskFactor[];
    prediction: PredictionResult;
    recentActivities: ActivityItem[];
    lastUpdated: string;
}

export interface ResultsPageData {
    patient: Patient;
    vitals: VitalSign[];
    prediction: PredictionResult;
    analysis: AnalysisItem[];
    recommendations: AnalysisItem[];
    lastUpdated: string;
}

// ==========================================
// CHART CONFIG TYPES
// ==========================================
export interface ChartConfig {
    cartesianGrid: {
        strokeDasharray: string;
        stroke: string;
        opacity: number;
    };
    axis: {
        stroke: string;
        fontSize: number;
        fill?: string;
    };
    tooltip: {
        contentStyle: {
            backgroundColor: string;
            border: string;
            borderRadius: string;
            color: string;
            backdropFilter?: string;
        };
    };
}

// ==========================================
// CONSTANTS
// ==========================================
export const CHART_COLORS = ['#0EB2B1', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'];

export const RISK_COLORS = {
    High: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' },
    Medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30' },
    Low: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' }
};