interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}

export default function TextInput({
    label,
    value,
    onChange,
    type = "text"
}: TextInputProps) {
    return (
        <div>
            <label className="text-bluelight-1 text-sm font-medium mb-2 block">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
            />
        </div>
    );
}