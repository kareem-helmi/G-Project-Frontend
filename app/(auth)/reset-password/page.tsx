"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { containerVariants } from "../shared/motion-variants";

function Fallback() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-[380px]">
      {[1, 2].map((i) => (
        <div key={i} className="h-12 bg-bluelight-1/10 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthContainer minHeight="600px">

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full relative z-0">
        <AuthHeader title="AI Disease Progression Predictor" subtitle="Reset Password" />
        <p className="text-sm text-bluelight-1/70 text-center mt-2">Create a new strong password for your account</p>
      </motion.div>

      <Suspense fallback={<Fallback />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthContainer>
  );
}
