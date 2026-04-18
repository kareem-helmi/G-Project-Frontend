
import {
    Patient,
    PatientDetails,
    BusinessStats,
    DiseaseProgressionPoint,
    RiskFactor,
    Report,
    AnalyticsTrend,
    AIExplanation,
    UploadedFile,
    Settings,
    PatientAnalyticsData,
    RiskLevel
} from "@/types/business.types";


// ==========================================
// MOCK DATA - TO BE REPLACED WITH REAL API
// ==========================================

const MOCK_DELAY = 500;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// BUSINESS DASHBOARD STATS
// ==========================================

export async function getBusinessStats(): Promise<BusinessStats> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API call
    // const response = await fetch(`${API_BASE_URL}/business/stats`);
    // return response.json();

    return {
        totalPatients: 120,
        highRiskPatients: 24,
        mediumRiskPatients: 48,
        lowRiskPatients: 48,
        predictionAccuracy: 87,
        newPatientsThisMonth: 8,
        averageAge: 48.5,
    };
}

export async function getDiseaseProgression(): Promise<DiseaseProgressionPoint[]> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return [
        { month: "Jan", patients: 110, highRisk: 28, mediumRisk: 45, lowRisk: 37 },
        { month: "Feb", patients: 112, highRisk: 26, mediumRisk: 46, lowRisk: 40 },
        { month: "Mar", patients: 115, highRisk: 25, mediumRisk: 47, lowRisk: 43 },
        { month: "Apr", patients: 116, highRisk: 24, mediumRisk: 48, lowRisk: 44 },
        { month: "May", patients: 118, highRisk: 24, mediumRisk: 48, lowRisk: 46 },
        { month: "Jun", patients: 120, highRisk: 24, mediumRisk: 48, lowRisk: 48 },
    ];
}

export async function getRiskFactors(): Promise<RiskFactor[]> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return [
        { name: "Blood Glucose Levels", value: 35, category: "Metabolic" },
        { name: "BMI (Body Mass Index)", value: 25, category: "Physical" },
        { name: "Blood Pressure", value: 20, category: "Cardiovascular" },
        { name: "Age Factor", value: 20, category: "Demographic" },
    ];
}

// ==========================================
// PATIENTS API
// ==========================================

const MOCK_PATIENTS: Patient[] = [
    {
        id: "p001",
        name: "Ahmed Ali Hassan",
        age: 54,
        gender: "Male",
        risk: "High",
        lastVisit: "2025-11-15",
        email: "ahmed.ali@email.com",
        phone: "+20 123 456 7890",
        address: "Cairo, Egypt"
    },
    {
        id: "p002",
        name: "Mona Salah Ibrahim",
        age: 46,
        gender: "Female",
        risk: "Medium",
        lastVisit: "2025-10-20",
        email: "mona.salah@email.com",
        phone: "+20 123 456 7891",
        address: "Alexandria, Egypt"
    },
    {
        id: "p003",
        name: "Youssef Hamdy Mohamed",
        age: 32,
        gender: "Male",
        risk: "Low",
        lastVisit: "2025-09-02",
        email: "youssef.h@email.com",
        phone: "+20 123 456 7892",
        address: "Giza, Egypt"
    },
    {
        id: "p004",
        name: "Sara Fathy Mahmoud",
        age: 67,
        gender: "Female",
        risk: "High",
        lastVisit: "2025-11-01",
        email: "sara.fathy@email.com",
        phone: "+20 123 456 7893",
        address: "Cairo, Egypt"
    }
];

export async function getAllPatients(
    searchQuery?: string,
    riskFilter?: RiskLevel | "All"
): Promise<Patient[]> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API
    // const params = new URLSearchParams({ search: searchQuery, risk: riskFilter });
    // const response = await fetch(`${API_BASE_URL}/patients?${params}`);

    let patients = [...MOCK_PATIENTS];

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        patients = patients.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.email.toLowerCase().includes(query) ||
            p.id.toLowerCase().includes(query)
        );
    }

    if (riskFilter && riskFilter !== 'All') {
        patients = patients.filter(p => p.risk === riskFilter);
    }

    return patients;
}

export async function getPatientById(id: string): Promise<PatientDetails | null> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API
    // const response = await fetch(`${API_BASE_URL}/patients/${id}`);

    return null; // Mock: return patient details
}

// ==========================================
// ANALYTICS API
// ==========================================

export async function getAnalyticsTrends(): Promise<AnalyticsTrend[]> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return [
        { month: "Jan", totalPatients: 110, highRisk: 28, predictions: 450, accuracy: 84 },
        { month: "Feb", totalPatients: 112, highRisk: 26, predictions: 468, accuracy: 85 },
        // ... more data
    ];
}
export async function getPatientAnalytics(
    patientId: string
): Promise<PatientAnalyticsData | null> {
    await delay(MOCK_DELAY);

    return MOCK_PATIENT_ANALYTICS[patientId] ?? null;
}


const MOCK_PATIENT_ANALYTICS: Record<string, PatientAnalyticsData> = {
    p001: {
        patientId: "p001",
        patientName: "Ahmed Ali Hassan",
        vitalSigns: {
            heartRate: { value: 88, unit: "bpm", status: "normal" },
            glucose: { value: 145, unit: "mg/dL", status: "danger" },
            bloodPressure: { value: 130, unit: "mmHg", status: "normal" },
            bloodSugar: { value: 145, unit: "mg/dL", status: "danger" },
        },
        healthTrend: [
            { month: "Jan", glucose: 145, bloodPressure: 130 },
            { month: "Feb", glucose: 140, bloodPressure: 128 },
        ],
        futureRisk: { value: 72, status: "High" },
        riskFactors: [
            { title: "Blood Glucose", value: 35, impact: "High" },
            { title: "BMI", value: 25, impact: "Medium" },
        ],
    },

    p002: {
        patientId: "p002",
        patientName: "Mona Salah Ibrahim",
        vitalSigns: {
            heartRate: { value: 76, unit: "bpm", status: "normal" },
            glucose: { value: 118, unit: "mg/dL", status: "normal" },
            bloodPressure: { value: 122, unit: "mmHg", status: "normal" },
            bloodSugar: { value: 118, unit: "mg/dL", status: "normal" },
        },
        healthTrend: [
            { month: "Jan", glucose: 120, bloodPressure: 124 },
            { month: "Feb", glucose: 118, bloodPressure: 122 },
        ],
        futureRisk: { value: 38, status: "Low" },
        riskFactors: [
            { title: "Age Factor", value: 15, impact: "Low" },
            { title: "BMI", value: 18, impact: "Low" },
        ],
    },
    p003: {
        patientId: "p003",
        patientName: "Youssef Hamdy Mohamed",
        vitalSigns: {
            heartRate: { value: 72, unit: "bpm", status: "normal" },
            glucose: { value: 102, unit: "mg/dL", status: "normal" },
            bloodPressure: { value: 118, unit: "mmHg", status: "normal" },
            bloodSugar: { value: 102, unit: "mg/dL", status: "normal" },
        },
        healthTrend: [
            { month: "Jan", glucose: 105, bloodPressure: 120 },
            { month: "Feb", glucose: 103, bloodPressure: 118 },
            { month: "Mar", glucose: 102, bloodPressure: 117 },
            { month: "Apr", glucose: 100, bloodPressure: 116 },
            { month: "May", glucose: 101, bloodPressure: 115 },
            { month: "Jun", glucose: 102, bloodPressure: 118 },
        ],
        futureRisk: { value: 22, status: "Low" },
        riskFactors: [
            { title: "Age Factor", value: 10, impact: "Low" },
            { title: "BMI", value: 12, impact: "Low" },
            { title: "Blood Pressure", value: 8, impact: "Low" },
        ],
    },
    p004: {
        patientId: "p004",
        patientName: "Sara Fathy Mahmoud",
        vitalSigns: {
            heartRate: { value: 94, unit: "bpm", status: "danger" },
            glucose: { value: 168, unit: "mg/dL", status: "danger" },
            bloodPressure: { value: 148, unit: "mmHg", status: "danger" },
            bloodSugar: { value: 168, unit: "mg/dL", status: "danger" },
        },
        healthTrend: [
            { month: "Jan", glucose: 160, bloodPressure: 145 },
            { month: "Feb", glucose: 162, bloodPressure: 147 },
            { month: "Mar", glucose: 165, bloodPressure: 148 },
            { month: "Apr", glucose: 170, bloodPressure: 150 },
            { month: "May", glucose: 168, bloodPressure: 149 },
            { month: "Jun", glucose: 172, bloodPressure: 152 },
        ],
        futureRisk: { value: 85, status: "High" },
        riskFactors: [
            { title: "Blood Glucose", value: 40, impact: "High" },
            { title: "Blood Pressure", value: 30, impact: "High" },
            { title: "Age Factor", value: 15, impact: "Medium" },
        ],
    },


};



// ==========================================
// REPORTS API
// ==========================================

const MOCK_REPORTS: Report[] = [
    {
        id: "r001",
        name: "Monthly Report - December 2025",
        type: "Monthly Summary",
        date: "2025-12-31",
        size: "2.4 MB",
        url: "/reports/monthly-dec-2025.pdf",
    },
    {
        id: "r002",
        name: "Patient Risk Analysis Report",
        type: "Risk Analysis",
        date: "2025-12-25",
        size: "1.8 MB",
        url: "/reports/risk-analysis-dec.pdf",
    },
    {
        id: "r003",
        name: "Quarterly Statistics Q4 2025",
        type: "Quarterly Report",
        date: "2025-12-20",
        size: "3.2 MB",
        url: "/reports/q4-2025.pdf",
    }
];

export async function getReports(): Promise<Report[]> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return MOCK_REPORTS;
}

export async function generateBusinessReport(): Promise<{
    reportId: string;
    downloadUrl: string;
}> {
    await delay(2000);
    // TODO: Replace with real API

    return {
        reportId: `rep${Date.now()}`,
        downloadUrl: "/reports/generated-report.pdf"
    };
}

// ==========================================
// UPLOAD API
// ==========================================

const MOCK_UPLOADED_FILES: UploadedFile[] = [
    {
        id: "f001",
        name: "patient_data_december.csv",
        type: "CSV",
        size: "2.1 MB",
        uploadDate: "2025-12-20",
        status: "Completed",
        records: 150
    },
    {
        id: "f002",
        name: "lab_results_november.xlsx",
        type: "Excel",
        size: "3.4 MB",
        uploadDate: "2025-12-18",
        status: "Processing",
        records: 89
    },
    {
        id: "f003",
        name: "medical_history_october.csv",
        type: "CSV",
        size: "1.8 MB",
        uploadDate: "2025-12-15",
        status: "Completed",
        records: 203
    }
];

export async function uploadFile(
    file: File
): Promise<{ success: boolean; fileId?: string; error?: string }> {
    await delay(2000);

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
        return { success: false, error: "File size too large (max 10MB)" };
    }

    // Validate file type
    const validTypes = ['.csv', '.xlsx', '.xls', '.json'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!validTypes.includes(extension)) {
        return { success: false, error: "Invalid file type. Only CSV, Excel, and JSON files are allowed." };
    }

    // TODO: Replace with real upload
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch(`${API_BASE_URL}/upload`, {
    //   method: 'POST',
    //   body: formData
    // });

    return {
        success: true,
        fileId: `f${Date.now()}`
    };
}

export async function getUploadedFiles(): Promise<UploadedFile[]> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return MOCK_UPLOADED_FILES;
}

export async function deleteUploadedFile(
    fileId: string
): Promise<{ success: boolean }> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return { success: true };
}

// ==========================================
// SETTINGS API
// ==========================================

export async function getSettings(): Promise<Settings> {
    await delay(MOCK_DELAY);
    // TODO: Replace with real API

    return {
        notifications: {
            email: true,
            sms: false,
            highRiskAlerts: true
        },
        dataRetention: {
            keepDataFor: 365,
            autoDelete: true
        },
        apiSettings: {
            predictionModel: "v2.1",
            updateFrequency: "daily"
        }
    };
}

export async function updateSettings(
    settings: Partial<Settings>
): Promise<{ success: boolean }> {
    await delay(800);
    // TODO: Replace with real API

    return { success: true };
}