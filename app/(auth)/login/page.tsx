//latest version by kareem helmy
"use client";
import { motion } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { LoginForm } from "./components/LoginForm";
import { containerVariants } from "../shared/motion-variants";

export default function LoginPage() {
  return (
    <AuthContainer >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-0"
      >
        <AuthHeader
          subtitle="Login"
        />
      </motion.div>

      {/* الفورم هتظهر فوراً ومش هتختفي في الريفرش */}
      <LoginForm />
      
    </AuthContainer>
  );
}