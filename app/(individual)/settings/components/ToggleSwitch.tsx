interface ToggleSwitchProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function ToggleSwitch({
    label,
    description,
    checked,
    onChange
}: ToggleSwitchProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-bluelight-1 font-semibold">{label}</h3>
                <p className="text-bluelight-1/70 text-sm">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-bluelight-1/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bluelight-2"></div>
            </label>
        </div>
    );
}