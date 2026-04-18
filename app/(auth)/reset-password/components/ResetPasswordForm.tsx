"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormInput } from "../../shared/FormInput";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordRequirements } from "./PasswordRequirements";
import { useSearchParams } from "next/navigation";
import MainButton from "@/components/custom/MainButton";
import { validatePassword, validateConfirmPassword } from "@/lib/utils/validation";
import { authService } from "@/lib/api/auth.service";

const FADE_UP = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

interface FormData {
    newPassword: string;
    confirmPassword: string;
}

interface FormErrors {
    newPassword: string;
    confirmPassword: string;
}

interface TouchedFields {
    newPassword: boolean;
    confirmPassword: boolean;
}

export function ResetPasswordForm() {
    const router = useRouter();

    const [form, setForm] = useState<FormData>({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<FormErrors>({
        newPassword: "",
        confirmPassword: ""
    });
    const [touched, setTouched] = useState<TouchedFields>({
        newPassword: false,
        confirmPassword: false
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Handle field change
    function handleChange(field: keyof FormData, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));

        if (touched[field]) {
            if (field === "newPassword") {
                const passwordResult = validatePassword(value);
                const confirmResult = validateConfirmPassword(value, form.confirmPassword);
                setErrors((prev) => ({
                    ...prev,
                    newPassword: passwordResult.isValid ? "" : passwordResult.error || "",
                    confirmPassword: confirmResult.isValid ? "" : confirmResult.error || ""
                }));
            } else {
                const confirmResult = validateConfirmPassword(form.newPassword, value);
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: confirmResult.isValid ? "" : confirmResult.error || ""
                }));
            }
        }
    }

    // Handle field blur
    function handleBlur(field: keyof FormData) {
        setTouched((prev) => ({ ...prev, [field]: true }));

        if (field === "newPassword") {
            const passwordResult = validatePassword(form.newPassword);
            const confirmResult = validateConfirmPassword(form.newPassword, form.confirmPassword);
            setErrors((prev) => ({
                ...prev,
                newPassword: passwordResult.isValid ? "" : passwordResult.error || "",
                confirmPassword: confirmResult.isValid ? "" : confirmResult.error || ""
            }));
        } else {
            const confirmResult = validateConfirmPassword(form.newPassword, form.confirmPassword);
            setErrors((prev) => ({
                ...prev,
                confirmPassword: confirmResult.isValid ? "" : confirmResult.error || ""
            }));
        }
    }

    // Handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setTouched({ newPassword: true, confirmPassword: true });

        const passwordResult = validatePassword(form.newPassword);
        const confirmResult = validateConfirmPassword(form.newPassword, form.confirmPassword);

        setErrors({
            newPassword: passwordResult.isValid ? "" : passwordResult.error || "",
            confirmPassword: confirmResult.isValid ? "" : confirmResult.error || ""
        });

        if (!passwordResult.isValid || !confirmResult.isValid) return;

        setLoading(true);
        try {
            // Get reset token (in real app, this would come from URL params or previous step)
            const searchParams = useSearchParams();
            const resetToken = searchParams.get("token") || "";
            if (!resetToken) {
                setErrors(prev => ({
                   ...prev,
                   newPassword: "Invalid reset session"
                }));
                return;
             }

            await authService.resetPassword(resetToken, form.newPassword);

            setSuccess(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            router.push("/");
        } catch (error) {
            console.error("Reset failed:", error);
            setErrors((prev) => ({
                ...prev,
                newPassword: "Failed to reset password. Please try again."
            }));
        } finally {
            setLoading(false);
        }
    }

    const isFormValid =
    validatePassword(form.newPassword).isValid &&
    validateConfirmPassword(form.newPassword, form.confirmPassword).isValid;
    return (
        <motion.form onSubmit={handleSubmit} initial="hidden" animate="visible" className="flex flex-col gap-5 w-full max-w-[380px] mt-4">
            {/* Success Message */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">Password Changed Successfully!</span>
                    </div>
                    <p className="text-sm">Redirecting to Home...</p>
                </motion.div>
            )}

            {/* New Password */}
            <motion.div variants={FADE_UP}>
                <FormInput
                    type="password"
                    placeholder="New Password"
                    value={form.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                    onBlur={() => handleBlur("newPassword")}
                    disabled={loading || success}
                    required
                    autoComplete="new-password"
                />
                <PasswordStrength password={form.newPassword} />
                {errors.newPassword && touched.newPassword && (
                    <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1">
                        <span>⚠</span>
                        {errors.newPassword}
                    </p>
                )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={FADE_UP}>
                <FormInput
                    type="password"
                    placeholder="Confirm New Password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    disabled={loading || success}
                    required
                    autoComplete="new-password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1">
                        <span>⚠</span>
                        {errors.confirmPassword}
                    </p>
                )}
            </motion.div>

            {/* Password Requirements */}
            <PasswordRequirements password={form.newPassword} />

            {/* Submit Button */}
            <motion.div variants={FADE_UP}>
                <MainButton
                    type="submit"
                    disabled={!isFormValid || loading || success}
                    className="w-full text-[1rem] px-7 py-3.5 border"
                    background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                >
                    <span className="flex items-center justify-center gap-2">
                        {loading && (
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {loading ? "Resetting..." : success ? "✅ Success!" : "Reset Password"}
                    </span>
                </MainButton>
            </motion.div>

            {/* Back to Login */}
            <motion.div variants={FADE_UP} className="text-sm text-center text-bluelight-1/70">
                <Link href="/login" className="text-bluelight-2 hover:underline font-medium">
                    Back to Login
                </Link>
            </motion.div>
        </motion.form>
    );
}