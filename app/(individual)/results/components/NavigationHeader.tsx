import { motion } from "framer-motion";

interface NavigationHeaderProps {
    onBack: () => void;
    onHome: () => void;
}

export default function NavigationHeader({ onBack, onHome }: NavigationHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between"
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-bluelight-1/40 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-all duration-300"
                aria-label="Back to medical data"
            >
                <span>←</span>
                <span className="hidden sm:inline">Back </span>
                <span className="sm:hidden">Back</span>
            </button>

        </motion.div>
    );
}