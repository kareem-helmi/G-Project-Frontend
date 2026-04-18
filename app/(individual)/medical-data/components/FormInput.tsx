interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    step?: string;
}

export default function FormInput({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    error,
    required,
    step
}: FormInputProps) {
    return (
        <div>
            <label className="text-bluelight-1 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 block font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                step={step}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-transparent border-2 ${error ? "border-red-500 dark:border-red-400" : "border-bluelight-1/40"
                    } rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-sm sm:text-base md:text-lg`}
                aria-invalid={!!error}
                aria-describedby={error ? `${label}-error` : undefined}
            />
            {error && (
                <p
                    id={`${label}-error`}
                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}