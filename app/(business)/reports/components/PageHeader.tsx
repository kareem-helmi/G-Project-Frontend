import React from "react";
import { motion } from "framer-motion";

export default function PageHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-1"
        >
            <h1 className="text-2xl sm:text-3xl font-bold text-bluelight-1">Reports</h1>
            <p className="text-bluelight-1/70 text-xs sm:text-sm leading-relaxed">
                Generate and download business analytics reports
            </p>
        </motion.div>
    );
}