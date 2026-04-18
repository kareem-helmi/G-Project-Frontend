"use client";
import { motion, Variants } from "framer-motion";
import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    touched?: boolean;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" as const }
    },
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    function FormInput({
        error,
        touched,
        showPasswordToggle,
        showPassword,
        onTogglePassword,
        type = "text",
        className = "",
        disabled,
        ...props
    }, ref) {
        const inputType = showPasswordToggle
            ? (showPassword ? 'text' : 'password')
            : type;

        return (
            <motion.div variants={fadeUp} className="space-y-1">
                <div className={showPasswordToggle ? 'relative' : ''}>
                    <input
                        ref={ref}
                        type={inputType}
                        disabled={disabled}
                        className={`w-full bg-transparent border ${error && touched
                                ? 'border-red-500'
                                : 'border-bluelight-1/40'
                            } 
            rounded-xl px-4 py-3.5 text-bluelight-1 
            focus:border-bluelight-2 outline-none 
            transition-all duration-300
            placeholder:text-bluelight-1/60
            disabled:opacity-50 disabled:cursor-not-allowed
            text-base ${className}`}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${props.name}-error` : undefined}
                        {...props}
                    />

                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            disabled={disabled}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm select-none
                text-bluelight-2 opacity-90 hover:opacity-100
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-opacity duration-200"
                            aria-pressed={showPassword}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    )}
                </div>

                {error && touched && (
                    <p
                        id={`${props.name}-error`}
                        className="text-red-500 text-xs text-left px-1"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </motion.div>
        );
    }
);