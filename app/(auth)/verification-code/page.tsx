"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { VerificationInputs } from "./components/VerificationInputs";
import { ResendCode } from "./components/ResendCode";
import MainButton from "@/components/custom/MainButton";
import { containerVariants } from "../shared/motion-variants";

const FADE_UP = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

function Fallback() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[380px]">
      <div className="h-12 bg-bluelight-1/10 rounded-xl animate-pulse" />
    </div>
  );
}

function VerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      // No email in URL, redirect back
      router.push("/forgot-password");
    }
  }, [router, searchParams]);

  const isCodeComplete = code.every((digit) => digit !== "");

  async function handleVerify() {
    if (!isCodeComplete || loading) return;

    setLoading(true);
    try {
      const verificationCode = code.join("");
      console.log("Verifying code:", verificationCode);

      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/reset-password");
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 w-full max-w-[380px] mt-4"
    >
      <motion.div variants={FADE_UP} className="text-bluelight-1/80 text-sm text-center">
        We sent a 6-digit verification code to
        <br />
        <span className="text-bluelight-2 font-semibold break-all">
          {email || "Loading..."}
        </span>
      </motion.div>

      <VerificationInputs code={code} setCode={setCode} />

      <motion.div variants={FADE_UP}>
        <MainButton
          onClick={handleVerify}
          disabled={!isCodeComplete || loading}
          className="w-full text-[1rem] px-7 py-3.5 border"
          background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </MainButton>
      </motion.div>

      <ResendCode />

      <motion.div variants={FADE_UP} className="text-sm text-center text-bluelight-1/70">
        <a href="/login" className="text-bluelight-2 hover:underline font-medium">
          Back to Login
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function VerificationCodePage() {
  return (
    <AuthContainer minHeight="550px">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-0"
      >
        <AuthHeader
          title="AI Disease Progression Predictor"
          subtitle="Verification Code"
        />
      </motion.div>

      <Suspense fallback={<Fallback />}>
        <VerificationContent />
      </Suspense>
    </AuthContainer>
  );
}
