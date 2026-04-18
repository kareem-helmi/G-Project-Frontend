"use client";
import { motion } from "framer-motion";
import { AnalysisItem } from "@/types/individual.types";

interface AnalysisSectionProps {
    title: string;
    items: AnalysisItem[];
    type: 'analysis' | 'recommendations';
}

export default function AnalysisSection({ title, items, type }: AnalysisSectionProps) {
    const getBulletColor = (color: string) => {
        switch (color) {
            case 'red': return 'text-red-500';
            case 'green': return 'text-green-500';
            case 'yellow': return 'text-yellow-500';
            default: return 'text-bluelight-1';
        }
    };

    const getTitleColor = () => {
        return type === 'analysis' ? 'text-bluelight-1' : 'text-bluelight-1';
    };

    return (
        <div className="space-y-6">
            <h3 className={`text-2xl font-semibold ${getTitleColor()} border-b border-bluelight-1/30 pb-3 text-center`}>
                {title}
            </h3>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-8 hover:border-bluelight-2 transition-all duration-300"
            >
                <ul className="space-y-4 text-bluelight-1 text-xl">
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: type === 'analysis' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <span className={`${getBulletColor(item.color)} text-2xl mt-1`}>•</span>
                            <span>{item.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}