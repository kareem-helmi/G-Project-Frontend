"use client";
import { motion, Variants } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { AuthDivider } from "../shared/AuthDivider";
import MainButton from "@/components/custom/MainButton";

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
};

export default function RoleSelectionPage() {
  return (
    <AuthContainer minHeight="500px">
      <AuthHeader subtitle="Select Registration Type" />

      <motion.div
        variants={fadeUp}

        className="flex flex-col gap-5 sm:gap-6 w-full max-w-[380px] mt-2"
      >
        <MainButton
          href="/register-business/doctor"
          className="w-full text-[1rem] sm:text-[1.1rem] 
                     px-7 py-3.5 border bg-bluelight-2 
                     hover:bg-transparent transition-all duration-300"
          background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
        >
          <span className="flex flex-col items-center">
            <span className="text-lg font-semibold">Register as Doctor</span>
            <span className="text-sm opacity-80 mt-1">For individual medical practitioners</span>
          </span>
        </MainButton>

        <MainButton
          href="/register-business/institution"
          className="w-full text-[1rem] sm:text-[1.1rem] 
                     px-7 py-3.5 border bg-bluelight-2/20 
                     hover:bg-bluelight-2/40 transition-all duration-300"
          classHover="bg-bluelight-2/30 w-full h-full top-full group-hover:top-0"
        >
          <span className="flex flex-col items-center">
            <span className="text-lg font-semibold">Register as Institution</span>
            <span className="text-sm opacity-80 mt-1">For hospitals, clinics, research centers</span>
          </span>
        </MainButton>

        <AuthDivider />

        <div className="text-sm text-center text-bluelight-1/70">
          Already have an account?{" "}
          <a href="./login?userType=business" className="text-bluelight-2 hover:underline transition-all duration-300">
            Login here
          </a>
        </div>
      </motion.div>
    </AuthContainer>
  );
}