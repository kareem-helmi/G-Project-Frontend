
import {
    Patient,
    VitalSign,
    PredictionResult,
    ResultsPageData,
    DashboardData,
    HealthTrendPoint,
    RiskFactor,
    ActivityItem,
    AnalysisItem,
    HealthFormData,
    UserProfile
} from "@/types/individual.types";

// ==========================================
// CONSTANTS
// ==========================================
const MOCK_DELAY = 500;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// MOCK DATA
// ==========================================
const MOCK_PATIENT: Patient = {
    id: 'p001',
    name: 'Ahmed Mohamed',
    initials: 'AM',
    age: 45,
    gender: 'male',
    risk: 'High',
    lastVisit: '2024-02-15',
    nextAppointment: '2024-03-20 10:30 AM',
    doctor: 'Dr. Sarah Johnson',
    email: 'ahmed.mohamed@example.com',
    phone: '+20 123 456 7890'
};

const MOCK_VITALS: VitalSign[] = [
    { id: '1', name: 'Heart Rate', value: 72, unit: 'bpm', status: 'normal', description: 'Normal Range', trend: 'stable' },
    { id: '2', name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', description: 'Normal Range', trend: 'stable' },
    { id: '3', name: 'Glucose Level', value: 115, unit: 'mg/dL', status: 'high', description: 'Above Normal', trend: 'up' },
    { id: '4', name: 'Blood Sugar', value: 115, unit: 'mg/L', status: 'high', description: 'Above Normal', trend: 'up' }
];

const MOCK_HEALTH_TREND: HealthTrendPoint[] = [
    { id: '1', month: 'Jan', risk: 65, healthScore: 70, visits: 2 },
    { id: '2', month: 'Feb', risk: 70, healthScore: 65, visits: 1 },
    { id: '3', month: 'Mar', risk: 58, healthScore: 75, visits: 3 },
    { id: '4', month: 'Apr', risk: 62, healthScore: 72, visits: 2 },
    { id: '5', month: 'May', risk: 55, healthScore: 78, visits: 1 },
    { id: '6', month: 'Jun', risk: 55, healthScore: 78, visits: 2 }
];

const MOCK_RISK_FACTORS: RiskFactor[] = [
    { id: '1', name: 'Diet & Nutrition', value: 35, impact: 'high', description: 'High carbohydrate intake' },
    { id: '2', name: 'Physical Activity', value: 25, impact: 'medium', description: 'Insufficient exercise' },
    { id: '3', name: 'Medication Adherence', value: 20, impact: 'medium', description: 'Missed doses occasionally' },
    { id: '4', name: 'Stress Levels', value: 20, impact: 'high', description: 'Work-related stress' }
];

const MOCK_ACTIVITIES: ActivityItem[] = [
    {
        id: '1',
        type: 'measurement',
        title: 'Blood Pressure Check',
        description: 'Home monitoring - 140/90 mmHg',
        date: '2024-02-20',
        status: 'completed'
    },
    {
        id: '2',
        type: 'appointment',
        title: 'Cardiologist Visit',
        description: 'Follow-up consultation',
        date: '2024-02-15',
        status: 'completed'
    }
];

// ==========================================
// DASHBOARD API
// ==========================================
export async function getDashboardData(): Promise<DashboardData> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API call

    return {
        patient: MOCK_PATIENT,
        vitals: MOCK_VITALS,
        healthTrend: MOCK_HEALTH_TREND,
        riskFactors: MOCK_RISK_FACTORS,
        prediction: {
            percentage: 55,
            riskLevel: 'Medium',
            message: 'Moderate risk of disease progression in the next 6 months',
            additionalInfo: 'Continue monitoring and follow recommended lifestyle changes',
            confidence: 85,
            timeframe: '6 months'
        },
        recentActivities: MOCK_ACTIVITIES,
        lastUpdated: new Date().toISOString()
    };
}

// ==========================================
// RESULTS API
// ==========================================
export async function getResultsData(submissionId?: string): Promise<ResultsPageData> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API call

    const MOCK_ANALYSIS: AnalysisItem[] = [
        { text: 'Elevated glucose levels indicating pre-diabetic condition', color: 'red' },
        { text: 'High risk of developing type 2 diabetes', color: 'red' },
        { text: 'Potential cardiovascular complications', color: 'red' },
        { text: 'Immediate lifestyle changes recommended', color: 'red' }
    ];

    const MOCK_RECOMMENDATIONS: AnalysisItem[] = [
        { text: 'Consult with healthcare specialist immediately', color: 'green' },
        { text: 'Implement balanced diet with reduced carbohydrates', color: 'green' },
        { text: 'Regular physical activity (30 min daily)', color: 'green' },
        { text: 'Monitor blood sugar levels regularly', color: 'green' }
    ];

    return {
        patient: MOCK_PATIENT,
        vitals: MOCK_VITALS,
        prediction: {
            percentage: 71,
            riskLevel: 'High',
            message: 'High risk of disease progression in the next 3 months',
            additionalInfo: 'Immediate medical consultation and lifestyle changes are strongly recommended',
            confidence: 92,
            timeframe: '3 months'
        },
        analysis: MOCK_ANALYSIS,
        recommendations: MOCK_RECOMMENDATIONS,
        lastUpdated: new Date().toISOString()
    };
}

// ==========================================
// HEALTH DATA SUBMISSION
// ==========================================
export async function submitHealthData(
    data: HealthFormData
): Promise<{ success: boolean; id: string; message?: string }> {
    await delay(1500);
    // TODO: Replace with real API call

    return {
        success: true,
        id: `submission_${Date.now()}`,
        message: 'Health data submitted successfully'
    };
}

// ==========================================
// PROFILE UPDATE
// ==========================================
export async function updateProfile(
    data: UserProfile
): Promise<{ success: boolean; message: string }> {
    await delay(800);
    // TODO: Replace with real API call

    return {
        success: true,
        message: 'Profile updated successfully'
    };
}

// ==========================================
// REPORT GENERATION
// ==========================================
export async function generateReport(
    userId: string
): Promise<{ success: boolean; url?: string; message?: string }> {
    await delay(2000);
    // TODO: Replace with real API call

    return {
        success: true,
        message: 'Report generated successfully'
    };
}

// ==========================================
// ADDITIONAL APIs
// ==========================================
export async function getVitalSigns(): Promise<VitalSign[]> {
    await delay(MOCK_DELAY);
    return MOCK_VITALS;
}

export async function getHealthTrend(): Promise<HealthTrendPoint[]> {
    await delay(MOCK_DELAY);
    return MOCK_HEALTH_TREND;
}

export async function getRiskFactors(): Promise<RiskFactor[]> {
    await delay(MOCK_DELAY);
    return MOCK_RISK_FACTORS;
}

export async function getPatientData(): Promise<Patient> {
    await delay(MOCK_DELAY);
    return MOCK_PATIENT;
}