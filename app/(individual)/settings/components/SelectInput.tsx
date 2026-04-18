interface SelectInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export default function SelectInput({
    label,
    value,
    onChange,
    options
}: SelectInputProps) {
    return (
        <div>
            <label className="text-bluelight-1 text-sm font-medium mb-2 block">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}