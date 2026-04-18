"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { RegisterForm } from "./components/RegisterForm";
import { containerVariants } from "../shared/motion-variants";

function Fallback() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[380px]">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-bluelight-1/10 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AuthHeader
          title="AI Disease Progression Predictor"
          subtitle="Create Account"
        />
      </motion.div>

      <Suspense fallback={<Fallback />}>
        <RegisterForm />
      </Suspense>
    </AuthContainer>
  );
}
