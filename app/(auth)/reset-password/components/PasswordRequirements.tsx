"use client";

import { motion } from "framer-motion";
import { VALIDATION_RULES } from "@/lib/constants";

interface PasswordRequirementsProps {
    password: string;
}

interface Requirement {
    text: string;
    met: boolean;
}

const FADE_UP = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
    const requirements: Requirement[] = [
        {
            text: "At least 8 characters",
            met: password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH
        },
        {
            text: "One uppercase letter",
            met: VALIDATION_RULES.PASSWORD.REGEX.UPPERCASE.test(password)
        },
        {
            text: "One lowercase letter",
            met: VALIDATION_RULES.PASSWORD.REGEX.LOWERCASE.test(password)
        },
        {
            text: "One number",
            met: VALIDATION_RULES.PASSWORD.REGEX.NUMBER.test(password)
        },
        {
            text: "One special character",
            met: VALIDATION_RULES.PASSWORD.REGEX.SPECIAL.test(password)
        }
    ];
    return (
        <motion.div
            variants={FADE_UP}
            className="text-xs text-bluelight-1/60 text-left bg-bluelight-2/10 p-4 rounded-lg border border-bluelight-1/20"
        >
            <p className="font-semibold mb-2 text-bluelight-1">Password requirements:</p>
            <ul className="space-y-1">
                {requirements.map((req, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-2 transition-colors duration-200 ${req.met ? "text-green-500" : "text-bluelight-1/60"
                            }`}
                    >
                        <span className="text-sm">{req.met ? "✓" : "○"}</span>
                        {req.text}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}