
/**
 * Risk levels للمرضى
 */
export type RiskLevel = "High" | "Medium" | "Low";

/**
 * Gender types
 */
export type Gender = "Male" | "Female";

/**
 * Status types للملفات المرفوعة
 */
export type FileStatus = "Processing" | "Completed" | "Failed";

/**
 * Vital signs status
 */
export type VitalStatus = "normal" | "warning" | "danger";

/**
 * Risk factor impact levels
 */
export type ImpactLevel = "Low" | "Medium" | "High";

// ==================================================================
// Patient Related Types
// ==================================================================

/**
 * بيانات المريض الأساسية
 */
export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: Gender;
    risk: RiskLevel;
    lastVisit: string;
    email: string;
    phone: string;
    address: string;
}

/**
 * تفاصيل المريض الكاملة
 */
export interface PatientDetails extends Patient {
    medicalHistory: string[];
    riskFactors: Array<{
        name: string;
        value: number;
        unit: string;
    }>;
    predictions: Array<{
        date: string;
        risk: number;
        confidence: number;
    }>;
    medications: string[];
    allergies: string[];
    notes: string;
}

/**
 * Vital signs للمريض
 */
export interface PatientVitalSigns {
    heartRate: {
        value: number | string;
        unit: string;
        status: VitalStatus;
    };
    glucose: {
        value: number | string;
        unit: string;
        status: VitalStatus;
    };
    bloodPressure: {
        value: number | string;
        unit: string;
        status: VitalStatus;
    };
    bloodSugar: {
        value: number | string;
        unit: string;
        status: VitalStatus;
    };
}

/**
 * Patient analytics data
 */
export interface PatientAnalyticsData {
    patientId: string;
    patientName: string;
    vitalSigns: PatientVitalSigns;
    healthTrend: Array<{
        month: string;
        glucose: number;
        bloodPressure: number;
    }>;
    futureRisk: {
        value: number;
        status: string;
    };
    riskFactors: Array<{
        title: string;
        impact: ImpactLevel;
        value: number;
    }>;
}

// ==================================================================
// Business Statistics & Analytics
// ==================================================================

/**
 * إحصائيات Dashboard الخاصة بالبيزنس
 */
export interface BusinessStats {
    totalPatients: number;
    highRiskPatients: number;
    mediumRiskPatients: number;
    lowRiskPatients: number;
    predictionAccuracy: number;
    newPatientsThisMonth: number;
    averageAge: number;
}

/**
 * Disease progression data point
 */
export interface DiseaseProgressionPoint {
    month: string;
    patients: number;
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    patientsCount?: number; // Optional alias
}

/**
 * Analytics trends over time
 */
export interface AnalyticsTrend {
    month: string;
    totalPatients: number;
    highRisk: number;
    predictions: number;
    accuracy: number;
}

// ==================================================================
// AI & Risk Analysis
// ==================================================================

/**
 * Risk factor data
 */
export interface RiskFactor {
    name: string;
    value: number;
    category: string;
}

/**
 * AI explanation للـ predictions
 */
export interface AIExplanation {
    patientId: string;
    factors: Array<{
        factor: string;
        impact: number;
        explanation: string;
        recommendation: string;
    }>;
    overallRisk: number;
    confidence: number;
}

/**
 * Model insights & accuracy
 */
export interface ModelInsights {
    accuracy: number;
    features: RiskFactor[];
    modelVersion: string;
    lastUpdated: string;
}

// ==================================================================
// Reports & Files
// ==================================================================

/**
 * Report data
 */
export interface Report {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
    url: string;
}

/**
 * Uploaded file metadata
 */
export interface UploadedFile {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    status: FileStatus;
    records: number;
}

// ==================================================================
// Settings & Configuration
// ==================================================================

/**
 * System settings
 */
export interface Settings {
    notifications: {
        email: boolean;
        sms: boolean;
        highRiskAlerts: boolean;
    };
    dataRetention: {
        keepDataFor: number; // in days
        autoDelete: boolean;
    };
    apiSettings: {
        predictionModel: string;
        updateFrequency: string;
    };
}
