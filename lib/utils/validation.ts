
import { VALIDATION_RULES } from "../constants";
import type { FormValidationErrors } from "@/types/individual.types";

// ==========================================
// VALIDATION RESULT INTERFACE
// ==========================================
export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

// ==========================================
// AUTH VALIDATION (Email, Password, Username)
// ==========================================
export const validateEmail = (email: string): ValidationResult => {
    const trimmed = email.trim();

    if (!trimmed) {
        return { isValid: false, error: "Email is required" };
    }

    if (trimmed.length < VALIDATION_RULES.EMAIL.MIN_LENGTH) {
        return { isValid: false, error: "Email is too short" };
    }

    if (trimmed.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
        return { isValid: false, error: "Email is too long" };
    }

    if (!VALIDATION_RULES.EMAIL.REGEX.test(trimmed)) {
        return { isValid: false, error: "Please enter a valid email address" };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: "Password is required" };
    }

    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
        return {
            isValid: false,
            error: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
        };
    }

    if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
        return { isValid: false, error: "Password is too long" };
    }

    if (!VALIDATION_RULES.PASSWORD.REGEX.UPPERCASE.test(password)) {
        return { isValid: false, error: "Password must contain an uppercase letter" };
    }

    if (!VALIDATION_RULES.PASSWORD.REGEX.LOWERCASE.test(password)) {
        return { isValid: false, error: "Password must contain a lowercase letter" };
    }

    if (!VALIDATION_RULES.PASSWORD.REGEX.NUMBER.test(password)) {
        return { isValid: false, error: "Password must contain a number" };
    }

    if (!VALIDATION_RULES.PASSWORD.REGEX.SPECIAL.test(password)) {
        return { isValid: false, error: "Password must contain a special character" };
    }

    return { isValid: true };
};

export const validateUsername = (username: string): ValidationResult => {
    const trimmed = username.trim();

    if (!trimmed) {
        return { isValid: false, error: "Username is required" };
    }

    if (trimmed.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
        return {
            isValid: false,
            error: `Username must be at least ${VALIDATION_RULES.USERNAME.MIN_LENGTH} characters`,
        };
    }

    if (trimmed.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
        return {
            isValid: false,
            error: `Username must not exceed ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`,
        };
    }

    if (!VALIDATION_RULES.USERNAME.REGEX.test(trimmed)) {
        return {
            isValid: false,
            error: "Username can only contain letters, numbers, hyphens, and underscores",
        };
    }

    return { isValid: true };
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): ValidationResult => {
    if (!confirmPassword) {
        return { isValid: false, error: "Please confirm your password" };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: "Passwords do not match" };
    }

    return { isValid: true };
};

// ==========================================
// MEDICAL DATA VALIDATION (Age, BP, BMI, etc.)
// ==========================================
export const validateAge = (age: string): string | null => {
    const ageNum = parseFloat(age);
    if (!age || ageNum <= 0 || ageNum > 150) {
        return "Please enter a valid age (1-150)";
    }
    return null;
};

export const validateBloodPressure = (bp: string): string | null => {
    if (!bp || !/^\d+\/\d+\s*(mmHg)?$/i.test(bp.trim())) {
        return "Please enter blood pressure in format: 120/80 mmHg";
    }
    return null;
};

export const validateBloodSugar = (sugar: string): string | null => {
    const sugarNum = parseFloat(sugar);
    if (!sugar || sugarNum <= 0 || sugarNum > 1000) {
        return "Please enter a valid blood sugar level (mg/dL)";
    }
    return null;
};

export const validateBMI = (bmi: string): string | null => {
    const bmiNum = parseFloat(bmi);
    if (!bmi || bmiNum <= 0 || bmiNum > 100) {
        return "Please enter a valid BMI (1-100)";
    }
    return null;
};

// ==========================================
// FILE VALIDATION
// ==========================================
export const validateFile = (file: File | null): string | null => {
    if (!file) return null;

    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
        return "File size must be less than 10MB";
    }

    if (!allowedTypes.includes(file.type)) {
        return "Invalid file type. Allowed: PDF, JPG, PNG, DOC";
    }

    return null;
};

// ==========================================
// PHONE VALIDATION
// ==========================================
export const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;

    if (!phone) return null; // Optional field

    if (!phoneRegex.test(phone)) {
        return "Please enter a valid phone number";
    }

    if (phone.replace(/\D/g, '').length < 10) {
        return "Phone number must be at least 10 digits";
    }

    return null;
};

// ==========================================
// GENERIC VALIDATION
// ==========================================
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
    if (!value.trim()) {
        return { isValid: false, error: `${fieldName} is required` };
    }
    return { isValid: true };
};

export const validateNumber = (
    value: string,
    fieldName: string,
    min?: number
): ValidationResult => {
    const num = parseInt(value, 10);

    if (isNaN(num)) {
        return { isValid: false, error: `${fieldName} must be a valid number` };
    }

    if (min !== undefined && num < min) {
        return { isValid: false, error: `${fieldName} must be at least ${min}` };
    }

    return { isValid: true };
};

// ==========================================
// FORM VALIDATION (Medical Data Form)
// ==========================================
export const validateHealthForm = (formData: {
    age: string;
    bloodPressure: string;
    bloodSugar: string;
    bmi: string;
}): FormValidationErrors => {
    const errors: FormValidationErrors = {};

    const ageError = validateAge(formData.age);
    if (ageError) errors.age = ageError;

    const bpError = validateBloodPressure(formData.bloodPressure);
    if (bpError) errors.bloodPressure = bpError;

    const sugarError = validateBloodSugar(formData.bloodSugar);
    if (sugarError) errors.bloodSugar = sugarError;

    const bmiError = validateBMI(formData.bmi);
    if (bmiError) errors.bmi = bmiError;

    return errors;
};