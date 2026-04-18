"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormInput } from "../../shared/FormInput";
import MainButton from "@/components/custom/MainButton";

const FADE_UP = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function validateEmail(value: string): boolean {
        if (!value.trim()) {
            setError("Email is required");
            return false;
        }
        if (!EMAIL_REGEX.test(value)) {
            setError("Please enter a valid email");
            return false;
        }
        setError("");
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validateEmail(email)) return;

        setLoading(true);
        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // ✅ FIX: Navigate with email in URL params
            router.push(`/verification-code?email=${encodeURIComponent(email.trim())}`);
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-[380px] mt-4">
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    role="alert"
                >
                    {error}
                </motion.div>
            )}

            <motion.div variants={FADE_UP}>
                <FormInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    disabled={loading}
                    required
                    autoComplete="email"
                />
            </motion.div>

            <motion.div variants={FADE_UP}>
                <MainButton
                    type="submit"
                    disabled={loading}
                    className="w-full text-[1rem] px-7 py-3.5 border"
                    background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                >
                    {loading ? "Sending..." : "Send Verification Code"}
                </MainButton>
            </motion.div>

            <motion.div variants={FADE_UP} className="text-center text-sm text-bluelight-1/70">
                Remember your password?{" "}
                <Link href="/login" className="text-bluelight-2 hover:underline transition-all duration-300">
                    Back to Login
                </Link>
            </motion.div>
        </form>
    );
}