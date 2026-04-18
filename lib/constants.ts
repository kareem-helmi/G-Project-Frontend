
// ==================================================================
// AUTH ROUTES
// ==================================================================
export const AUTH_ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    REGISTER_BUSINESS: "/register-business",
    REGISTER_DOCTOR: "/register-business/doctor",
    REGISTER_INSTITUTION: "/register-business/institution",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFICATION_CODE: "/verification-code",
    RESET_PASSWORD: "/reset-password",
    DASHBOARD_BUSINESS: "/dashboard-business",
    MEDICAL_DATA: "/medical-data",
} as const;

// ==================================================================
// VALIDATION RULES
// ==================================================================
export const VALIDATION_RULES = {
    EMAIL: {
        REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        MIN_LENGTH: 5,
        MAX_LENGTH: 255,
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
        REGEX: {
            UPPERCASE: /[A-Z]/,
            LOWERCASE: /[a-z]/,
            NUMBER: /[0-9]/,
            SPECIAL: /[!@#$%^&*(),.?":{}|<>]/,
        },
    },
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        REGEX: /^[a-zA-Z0-9_-]+$/,
    },
    VERIFICATION: {
        CODE_LENGTH: 6,
        RESEND_COOLDOWN: 60,
    },
} as const;

// ==================================================================
// BUSINESS OPTIONS
// ==================================================================
export const SPECIALTY_OPTIONS = [
    { value: "general", label: "General Practitioner" },
    { value: "cardiologist", label: "Cardiologist" },
    { value: "neurologist", label: "Neurologist" },
    { value: "oncologist", label: "Oncologist" },
    { value: "pediatrician", label: "Pediatrician" },
    { value: "surgeon", label: "Surgeon" },
    { value: "dermatologist", label: "Dermatologist" },
    { value: "psychiatrist", label: "Psychiatrist" },
    { value: "other", label: "Other Specialist" },
] as const;

export const BUSINESS_TYPE_OPTIONS = [
    { value: "hospital", label: "Hospital" },
    { value: "clinic", label: "Clinic" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "lab", label: "Medical Laboratory" },
    { value: "research", label: "Research Center" },
    { value: "other", label: "Other" },
] as const;

export const EMPLOYEE_COUNT_OPTIONS = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "200+", label: "More than 200" },
] as const;

// ==================================================================
// BUSINESS DASHBOARD NAVIGATION
// ==================================================================
/**
 * Business dashboard navigation items
 */
export const BUSINESS_NAV_ITEMS = [
    { title: "Dashboard", href: "/dashboard-business" },
    { title: "Patients", href: "/patients" },
    { title: "Analytics", href: "/analytics" },
    { title: "AI Explanations", href: "/ai-explanations" },
    { title: "Upload Data", href: "/upload-data" },
    { title: "Reports", href: "/reports" },
    { title: "Settings", href: "/settings-business" },
] as const;

/**
 * Business dashboard routes
 */
export const BUSINESS_ROUTES = {
    DASHBOARD: "/dashboard-business",
    PATIENTS: "/patients",
    ANALYTICS: "/analytics",
    AI_EXPLANATIONS: "/ai-explanations",
    UPLOAD_DATA: "/upload-data",
    REPORTS: "/reports",
    SETTINGS: "/settings-business",
} as const;

// ==================================================================
// CHART COLORS
// ==================================================================
/**
 * Chart colors for data visualization
 */
export const CHART_COLORS = {
    PRIMARY: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    RISK: {
        HIGH: '#ef4444',
        MEDIUM: '#f59e0b',
        LOW: '#10b981',
    },
    ACCENT: '#0eb2b1',
} as const;

// ==================================================================
// FILE UPLOAD LIMITS
// ==================================================================
/**
 * File upload constraints
 */
export const UPLOAD_LIMITS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
        'application/pdf',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
    ],
} as const;

// ==================================================================
// ANALYTICS TIME RANGES
// ==================================================================
/**
 * Available time ranges for analytics
 */
export const TIME_RANGES = {
    ONE_MONTH: "1",
    THREE_MONTHS: "3",
    SIX_MONTHS: "6",
} as const;