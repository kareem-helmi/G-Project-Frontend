"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { containerVariants } from "../shared/motion-variants";

function Fallback() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-[380px] mt-4">
      <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthContainer>
      <ThemeToggleDefault />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full flex flex-col items-center gap-6">
        <AuthHeader
          subtitle="Forgot Password"
          description="Please enter your email address to search for your account."
        />
        <Suspense fallback={<Fallback />}>
          <ForgotPasswordForm />
        </Suspense>
      </motion.div>
    </AuthContainer>
  );
}