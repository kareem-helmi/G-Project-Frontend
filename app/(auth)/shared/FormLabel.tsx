"use client";

interface FormLabelProps {
    htmlFor?: string;
    required?: boolean;
    children: React.ReactNode;
}

export function FormLabel({ htmlFor, required, children }: FormLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-bluelight-1/90 mb-1 text-left"
        >
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );
}