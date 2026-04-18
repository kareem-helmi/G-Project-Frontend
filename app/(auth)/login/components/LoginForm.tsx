"use client";

import { motion } from "framer-motion";
import { useState, useEffect, FormEvent, ChangeEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FormInput } from "../../shared/FormInput";
import { AuthDivider } from "../../shared/AuthDivider";
import { fadeUp } from "../../shared/motion-variants";
import { validateEmail } from "@/lib/utils/validation";
import { authService } from "@/lib/api/auth.service";
import { AUTH_ROUTES } from "@/lib/constants";
import type { UserType } from "@/types/auth.types";

// 1. مكون فرعي لمعالجة الروابط بدون تعطيل الفورم الأساسية
function QueryTypeHandler({ setUserType }: { setUserType: (type: UserType) => void }) {
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const typeFromUrl = searchParams.get("userType");
        if (typeFromUrl === "business" || typeFromUrl === "individual") {
            setUserType(typeFromUrl);
        }
    }, [searchParams, setUserType]);

    return null; // مكون خفي مش بيظهر حاجة
}

export function LoginForm() {
    const router = useRouter();
    // 2. حذفنا useSearchParams من هنا

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userType, setUserType] = useState<UserType>("individual");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError("");

        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setError(emailValidation.error || "Invalid email");
            return;
        }

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        setLoading(true);

        try {
            const response = await authService.login(email.trim(), password, userType);
            if (typeof window !== "undefined") {
                localStorage.setItem("auth_token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
            }
            router.push(userType === "business" ? AUTH_ROUTES.DASHBOARD_BUSINESS : AUTH_ROUTES.MEDICAL_DATA);
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        setError("");
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setError("");
    };

    return (
        <motion.form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 w-full max-w-[380px] mt-2">
            
            {/* 3. هنا وضعنا المكون اللي فيه useSearchParams داخل Suspense 
                بكده الـ Build هينجح، والفورم مش هتختفي لأنها برا الـ Suspense */}
            <Suspense fallback={null}>
                <QueryTypeHandler setUserType={setUserType} />
            </Suspense>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-600"
                    role="alert"
                >
                    {error}
                </motion.div>
            )}

            <motion.div variants={fadeUp}>
                <FormInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={loading}
                    required
                    autoComplete="email"
                    name="email"
                />
            </motion.div>

            <motion.div variants={fadeUp}>
                <FormInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    required
                    autoComplete="current-password"
                    name="password"
                />
            </motion.div>

            <motion.div variants={fadeUp} className="text-right">
                <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className="text-sm text-bluelight-2 hover:underline transition-all duration-300">
                    Forgot Password?
                </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
                <button
                    type="submit"
                    disabled={!email.trim() || !password.trim() || loading}
                    className="w-full py-3.5 rounded-xl text-white font-medium bg-linear-to-r from-bluelight-2 to-bluelight-1
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group
                     hover:scale-[1.05] active:scale-[0.90] hover:shadow-lg"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </motion.div>

            <AuthDivider />

            <motion.div variants={fadeUp} className="text-center space-y-2">
                <p className="text-sm text-bluelight-1/70">
                    Don't have an account?{" "}
                    <Link href={AUTH_ROUTES.REGISTER_BUSINESS} className="text-bluelight-2 hover:underline transition-all duration-300">
                        Register Business
                    </Link>
                </p>
                <p className="text-sm text-bluelight-1/70">
                    Individual user?{" "}
                    <Link href={`${AUTH_ROUTES.REGISTER}?userType=individual`} className="text-bluelight-2 hover:underline transition-all duration-300">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </motion.form>
    );
}