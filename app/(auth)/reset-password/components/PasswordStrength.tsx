"use client";
import { VALIDATION_RULES } from "@/lib/constants";

interface PasswordStrengthProps {
    password: string;
}

interface StrengthResult {
    strength: number;
    color: string;
    label: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    function getPasswordStrength(password: string): StrengthResult {
        if (!password) {
            return { strength: 0, color: "bg-gray-300", label: "" };
        }

        const requirements = [
            password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH,
            VALIDATION_RULES.PASSWORD.REGEX.UPPERCASE.test(password),
            VALIDATION_RULES.PASSWORD.REGEX.LOWERCASE.test(password),
            VALIDATION_RULES.PASSWORD.REGEX.NUMBER.test(password),
            VALIDATION_RULES.PASSWORD.REGEX.SPECIAL.test(password)
        ];

        const metRequirements = requirements.filter(Boolean).length;
        const strength = (metRequirements / requirements.length) * 100;

        if (strength <= 40) return { strength, color: "bg-red-500", label: "Weak" };
        if (strength <= 70) return { strength, color: "bg-yellow-500", label: "Medium" };
        return { strength, color: "bg-green-500", label: "Strong" };
    }

    const { strength, color, label } = getPasswordStrength(password);

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-300 ${color}`}
                    style={{ width: `${strength}%` }}
                />
            </div>
            <p className="text-xs text-bluelight-1/60 mt-1 text-left">
                Password strength: <span className="font-medium">{label}</span>
            </p>
        </div>
    );
}
