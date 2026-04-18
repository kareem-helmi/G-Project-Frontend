"use client";
import { VitalSign } from "@/types/individual.types";
import VitalSignCard from "./VitalSignsCard";

interface VitalSignsGridProps {
    vitals: VitalSign[];
    title?: string;
}

export default function VitalSignsGrid({ vitals, title = "Current Vital Signs" }: VitalSignsGridProps) {
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-3 text-center">
                {title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {vitals.map((vital, index) => (
                    <VitalSignCard key={vital.id} vital={vital} index={index} />
                ))}
            </div>
        </div>
    );
}