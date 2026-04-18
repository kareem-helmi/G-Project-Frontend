"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const FADE_UP = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

interface VerificationInputsProps {
    code: string[];
    setCode: Dispatch<SetStateAction<string[]>>;
}

export function VerificationInputs({ code, setCode }: VerificationInputsProps) {
    function handleChange(index: number, value: string) {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                nextInput?.focus();
            }
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    }

    function handlePaste(e: React.ClipboardEvent) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newCode = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
            setCode(newCode);
            const lastFilledIndex = Math.min(pastedData.length - 1, 5);
            document.getElementById(`code-${lastFilledIndex}`)?.focus();
        }
    }

    return (
        <motion.div variants={FADE_UP} className="w-full">
            <div className="flex justify-between gap-2">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-12 sm:w-14 sm:h-14 
                     bg-white/50 dark:bg-gray-800/50
                     border-2 border-bluelight-1/30
                     rounded-xl text-bluelight-1 
                     text-center text-xl font-bold 
                     focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30
                     outline-none transition-all duration-300
                     hover:border-bluelight-1/50"
                        aria-label={`Digit ${index + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
}