import React from "react";
import { motion } from "framer-motion";

export default function SettingsHeader() {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-bluelight-1">Settings</h1>
                    <p className="text-sm text-bluelight-1/70 mt-1">Manage notifications and data retention for your workspace</p>
                </div>
            </div>
        </motion.div>
    );
}