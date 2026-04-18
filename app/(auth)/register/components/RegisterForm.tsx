"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { UserType } from "@/types/auth.types";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AUTH_ROUTES } from "@/lib/constants";
import { FormInput } from "../../shared/FormInput";
import { AuthDivider } from "../../shared/AuthDivider";
import MainButton from "@/components/custom/MainButton";
import { validateEmail, validateUsername, validatePassword, validateConfirmPassword } from "@/lib/utils/validation";
import { authService } from "@/lib/api/auth.service";

const FADE_UP = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

type FieldName = "username" | "email" | "password" | "confirmPassword";

interface BusinessData {
    type: "doctor" | "institution";
    name: string;
    specialty?: string;
    businessType?: string;
    expectedPatients?: string;
    employees?: string;
    isAffiliated?: boolean;
    institutionId?: string;
}

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormField {
    name: FieldName;
    type: string;
    placeholder: string;
    autocomplete: string;
}

export function RegisterForm() {
    const router = useRouter();
    const params = useSearchParams();

    const [form, setForm] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [userType, setUserType] = useState<UserType>("individual");
    const [businessData, setBusinessData] = useState<BusinessData | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const type = params.get("userType") as UserType;
        if (type === "business" || type === "individual") {
            setUserType(type);
            if (type === "business") loadBusinessData();
        }
    }, [params]);

    function loadBusinessData() {
        try {
            const doctor = localStorage.getItem("temp_doctor_data");
            const institution = localStorage.getItem("temp_institution_data");

            if (doctor) {
                const parsedDoctor = JSON.parse(doctor);

                if (Date.now() - parsedDoctor.timestamp < 10 * 60 * 1000) {
                   setBusinessData(parsedDoctor.data);
                }            } else if (institution) {
                setBusinessData({ type: "institution", ...JSON.parse(institution) });
            }
        } catch (error) {
            console.error("Failed to load business data:", error);
        }
    }

    function updateField(field: FieldName, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function validate(): boolean {
        const newErrors: Record<string, string> = {};

        const usernameResult = validateUsername(form.username);
        if (!usernameResult.isValid) {
            newErrors.username = usernameResult.error || "Invalid username";
        }

        const emailResult = validateEmail(form.email);
        if (!emailResult.isValid) {
            newErrors.email = emailResult.error || "Invalid email";
        }

        const passwordResult = validatePassword(form.password);
        if (!passwordResult.isValid) {
            newErrors.password = passwordResult.error || "Invalid password";
        }

        const confirmResult = validateConfirmPassword(form.password, form.confirmPassword);
        if (!confirmResult.isValid) {
            newErrors.confirmPassword = confirmResult.error || "Passwords don't match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const userData = {
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
                userType,
                ...(businessData && { businessData })
            };

            const response = await authService.register(userData);

            if (typeof window !== "undefined") {
                localStorage.setItem("auth_token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));

                if (userType === "business") {
                    localStorage.removeItem("temp_doctor_data");
                    localStorage.removeItem("temp_institution_data");
                }
            }

            router.push(userType === "business" ? AUTH_ROUTES.DASHBOARD_BUSINESS : AUTH_ROUTES.MEDICAL_DATA);
        } catch (error) {
            console.error("Registration error:", error);
            setErrors({ general: "Registration failed. Please try again." });
        } finally {
            setLoading(false);
        }
    }

    function handleGoogle() {
        console.log("Google signup:", userType);
        // TODO: Implement Google OAuth
    }

    const FIELDS: FormField[] = [
        { name: "username", type: "text", placeholder: "Username", autocomplete: "username" },
        { name: "email", type: "email", placeholder: "Email Address", autocomplete: "email" },
        { name: "password", type: "password", placeholder: "Password", autocomplete: "new-password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password", autocomplete: "new-password" }
    ];

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 w-full max-w-[380px]"
        >
            {/* General Error */}
            {errors.general && (
                <motion.div
                    variants={FADE_UP}
                    className="p-3 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg"
                    role="alert"
                >
                    {errors.general}
                </motion.div>
            )}


            {/* Form Fields */}
            {FIELDS.map(({ name, type, placeholder, autocomplete }) => (
                <motion.div key={name} variants={FADE_UP}>
                    <FormInput
                        type={type}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={(e) => updateField(name, e.target.value)}
                        disabled={loading}
                        required
                        autoComplete={autocomplete}
                    />
                    {errors[name] && (
                        <p className="text-xs text-red-500 mt-1 ml-1">{errors[name]}</p>
                    )}
                </motion.div>
            ))}

            {/* Submit Button */}
            <motion.div variants={FADE_UP}>
                <MainButton
                    type="submit"
                    disabled={loading}
                    className="w-full text-[1rem] px-7 py-3.5 border"
                    background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </MainButton>
            </motion.div>

            <AuthDivider />

            {/* Google Sign Up */}
            <motion.div variants={FADE_UP}>
                <MainButton
                    type="button"
                    onClick={handleGoogle}
                    className="w-full text-[1rem] px-7 py-3.5 border bg-bluelight-2/10"
                    classHover="bg-bluelight-2 w-full h-full top-full group-hover:top-0"
                >
                    <span className="flex items-center justify-center gap-4">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Sign up with Google
                    </span>
                </MainButton>
            </motion.div>

            {/* Footer Links */}
            <motion.div variants={FADE_UP} className="text-center space-y-2 text-sm text-bluelight-1/70">
                <p>
                    Already have an account?{" "}
                    <Link href={`/login?userType=${userType}`} className="text-bluelight-2 hover:underline font-medium">
                        Login
                    </Link>
                </p>
                <p>
                    {userType === "individual" ? "Business user?" : "Individual user?"}{" "}
                    <Link
                        href={userType === "individual" ? "/register-business" : "/register?userType=individual"}
                        className="text-bluelight-2 hover:underline font-medium"
                    >
                        {userType === "individual" ? "Register Business" : "Register here"}
                    </Link>
                </p>
            </motion.div>
        </motion.form>
    );
}