"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VALIDATION_RULES } from "@/lib/constants";

const FADE_UP = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};


export function ResendCode() {
    const [timer, setTimer] = useState<number>(
        VALIDATION_RULES.VERIFICATION.RESEND_COOLDOWN );
        const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    function handleResend() {
        setTimer(VALIDATION_RULES.VERIFICATION.RESEND_COOLDOWN);
        setCanResend(false);

        // TODO: Call resend API
        console.log("Resending code...");
    }

    return (
        <motion.div variants={FADE_UP} className="text-sm text-center text-bluelight-1/70">
            {canResend ? (
                <>
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResend}
                        className="text-bluelight-2 hover:underline font-medium"
                    >
                        Resend Code
                    </button>
                </>
            ) : (
                <>
                    Resend code in{" "}
                    <span className="text-bluelight-2 font-semibold">{timer}s</span>
                </>
            )}
        </motion.div>
    );
}