"use client";

import { SPECIALTY_OPTIONS } from "@/lib/constants";

interface SpecialtySelectProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function SpecialtySelect({ value, onChange, disabled }: SpecialtySelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="w-full bg-white dark:bg-gray-800 
               border-2 border-bluelight-1/40 
               rounded-2xl px-5 py-4 text-gray-800 dark:text-gray-200
               focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
               outline-none transition-all duration-300
               hover:border-bluelight-1/60
               cursor-pointer text-base font-medium
               shadow-sm hover:shadow-md appearance-none
               disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233b82f6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
            }}
            required
        >
            <option value="" disabled>
                Select your specialty
            </option>
            {SPECIALTY_OPTIONS.map((specialty) => (
                <option
                    key={specialty.value}
                    value={specialty.value}
                    className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 py-2"
                >
                    {specialty.label}
                </option>
            ))}
        </select>
    );
}