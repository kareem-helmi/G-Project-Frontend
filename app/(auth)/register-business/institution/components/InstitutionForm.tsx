"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AUTH_ROUTES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { FormLabel } from "../../../shared/FormLabel";
import MainButton from "@/components/custom/MainButton";
import { validateRequired, validateNumber } from "@/lib/utils/validation";
import { BUSINESS_TYPE_OPTIONS, EMPLOYEE_COUNT_OPTIONS } from "@/lib/constants";
import type { InstitutionData } from "@/types/auth.types";
const FADE_UP = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const INPUT_CLASS = `
  w-full bg-white/50 dark:bg-gray-800/50 
  border-2 border-bluelight-1/30 
  rounded-2xl px-5 py-4 text-bluelight-1 
  focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
  outline-none transition-all duration-300
  placeholder:text-bluelight-1/50
  text-base hover:border-bluelight-1/50
  disabled:opacity-50 disabled:cursor-not-allowed
`.replace(/\s+/g, ' ').trim();

const SELECT_CLASS = `
  w-full bg-white dark:bg-gray-800 
  border-2 border-bluelight-1/30 
  rounded-2xl px-5 py-4 text-gray-800 dark:text-gray-200
  focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
  outline-none transition-all duration-300
  hover:border-bluelight-1/50 cursor-pointer
  disabled:opacity-50 disabled:cursor-not-allowed
`.replace(/\s+/g, ' ').trim();



interface FormErrors {
    name?: string;
    businessType?: string;
    expectedPatients?: string;
    employees?: string;
    general?: string;
}

export function InstitutionForm() {
    const router = useRouter();

    const [form, setForm] = useState<InstitutionData>({
        type: "institution",
        name: "",
        businessType: "",
        expectedPatients: "",
        employees: ""
     })
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    function updateField<K extends keyof InstitutionData>(field: K, value: InstitutionData[K]) {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function validate(): boolean {
        const newErrors: FormErrors = {};

        // Name validation
        const nameResult = validateRequired(form.name, "Institution name");
        if (!nameResult.isValid) {
            newErrors.name = nameResult.error;
        } else if (form.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

        // Business type validation
        const typeResult = validateRequired(form.businessType, "Business type");
        if (!typeResult.isValid) {
            newErrors.businessType = typeResult.error;
        }

        // Expected patients validation
        const patientsResult = validateNumber(form.expectedPatients, "Expected patients", 1);
        if (!patientsResult.isValid) {
            newErrors.expectedPatients = patientsResult.error;
        }

        // Employees validation
        const employeesResult = validateRequired(form.employees, "Employee count");
        if (!employeesResult.isValid) {
            newErrors.employees = employeesResult.error;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleContinue() {
        if (!validate()) return;

        setLoading(true);
        try {
            localStorage.setItem("temp_institution_data", JSON.stringify(form));
            await new Promise((resolve) => setTimeout(resolve, 500));
            router.push(`${AUTH_ROUTES.REGISTER}?userType=business`)
        } catch (error) {
            console.error("Error:", error);
            setErrors({ general: "Failed to save data. Please try again." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-[420px] space-y-6 mt-4"
        >
            {/* General Error */}
            {errors.general && (
                <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg">{errors.general}</div>
            )}

            {/* Institution Name */}
            <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <div className="space-y-2">
                    <FormLabel required>Institution Name</FormLabel>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Enter institution name"
                        disabled={loading}
                        className={INPUT_CLASS}
                        required
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
                </div>
            </motion.div>

            {/* Business Type */}
            <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <div className="space-y-2">
                    <FormLabel required>Business Type</FormLabel>
                    <select value={form.businessType} onChange={(e) => updateField("businessType", e.target.value)} disabled={loading} className={SELECT_CLASS} required>
                        <option value="">Select institution type</option>
                        {BUSINESS_TYPE_OPTIONS.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {errors.businessType && <p className="text-xs text-red-500 mt-1 ml-1">{errors.businessType}</p>}
                </div>
            </motion.div>

            {/* Expected Patients */}
            <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                <div className="space-y-2">
                    <FormLabel required>Expected Monthly Patients</FormLabel>
                    <input
                        type="number"
                        min="1"
                        value={form.expectedPatients}
                        onChange={(e) => updateField("expectedPatients", e.target.value)}
                        placeholder="e.g., 1000"
                        disabled={loading}
                        className={INPUT_CLASS}
                        required
                    />
                    {errors.expectedPatients && <p className="text-xs text-red-500 mt-1 ml-1">{errors.expectedPatients}</p>}
                </div>
            </motion.div>

            {/* Number of Employees */}
            <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                <div className="space-y-2">
                    <FormLabel required>Number of Employees</FormLabel>
                    <select value={form.employees} onChange={(e) => updateField("employees", e.target.value)} disabled={loading} className={SELECT_CLASS} required>
                        <option value="">Select employee count</option>
                        {EMPLOYEE_COUNT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.employees && <p className="text-xs text-red-500 mt-1 ml-1">{errors.employees}</p>}
                </div>
            </motion.div>

            {/* Continue Button */}
            <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.7 }} className="pt-4">
                <MainButton
                    onClick={handleContinue}
                    className="w-full text-[1.05rem] sm:text-[1.15rem] px-8 py-4 border-2 border-bluelight-2"
                    background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                    disabled={loading}
                >
                    <span className="flex items-center justify-center gap-3">
                        <span>{loading ? "Processing..." : "Continue to Registration"}</span>
                        {!loading && <span className="text-lg">→</span>}
                    </span>
                </MainButton>
            </motion.div>
        </motion.div>
    );
}
