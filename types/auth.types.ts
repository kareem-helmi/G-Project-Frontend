
/**
 * نوع المستخدم في النظام
 */
export type UserType = "individual" | "business";

/**
 * نوع البيزنس
 */
export type BusinessType = "doctor" | "institution";

/**
 * بيانات المستخدم الأساسية
 */
export interface User {
    id: string;
    email: string;
    username: string;
    userType: UserType;
    businessData?: DoctorData | InstitutionData;
}

/**
 * بيانات الدكتور
 */
export interface DoctorData {
    type: "doctor";
    name: string;
    specialty: string;
    expectedPatients: string;
    isAffiliated: boolean;
    institutionId: string;
}

/**
 * بيانات المؤسسة
 */
export interface InstitutionData {
    type: "institution";
    name: string;
    businessType: string;
    expectedPatients: string;
    employees: string;
}

/**
 * Response من الـ API بعد Login أو Register
 */
export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

/**
 * Error من الـ API
 */
export interface ApiError {
    message: string;
    code?: string;
    field?: string;
}
