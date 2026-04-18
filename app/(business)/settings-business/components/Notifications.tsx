"use client";
import React from "react";
import { Mail, Smartphone, AlertTriangle } from "lucide-react";

export default function Notifications({
    notifications,
    onToggle
}: {
    notifications: { email: boolean; sms: boolean; highRiskAlerts: boolean };
    onToggle: (k: "email" | "sms" | "highRiskAlerts") => void;
}) {
    return (
        <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-bluelight-1/40 bg-white/50 dark:bg-transparent">
                <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${notifications.email ? 'bg-bluelight-1/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <Mail className={notifications.email ? 'text-bluelight-1' : 'text-gray-400'} size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-bluelight-1">Email Notifications</div>
                        <div className="text-sm text-bluelight-1/60 mt-1">
                            Receive updates to your inbox
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => onToggle("email")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${notifications.email
                        ? "bg-bluelight-2 text-white"
                        : "border border-bluelight-1/30 text-bluelight-1"
                        }`}
                    aria-pressed={notifications.email}
                >
                    {notifications.email ? "On" : "Off"}
                </button>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-bluelight-1/40 bg-white/50 dark:bg-transparent">
                <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${notifications.sms ? 'bg-bluelight-1/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <Smartphone className={notifications.sms ? 'text-bluelight-1' : 'text-gray-400'} size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-bluelight-1">SMS Notifications</div>
                        <div className="text-sm text-bluelight-1/60 mt-1">
                            Quick text alerts for critical events
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => onToggle("sms")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${notifications.sms
                        ? "bg-bluelight-2 text-white"
                        : "border border-bluelight-1/30 text-bluelight-1"
                        }`}
                    aria-pressed={notifications.sms}
                >
                    {notifications.sms ? "On" : "Off"}
                </button>
            </div>

            {/* High Risk Alerts */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-bluelight-1/40 bg-white/50 dark:bg-transparent">
                <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${notifications.highRiskAlerts ? 'bg-red-100 dark:bg-red-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <AlertTriangle className={notifications.highRiskAlerts ? 'text-red-500' : 'text-gray-400'} size={18} />
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-bluelight-1">High-Risk Alerts</div>
                        <div className="text-sm text-bluelight-1/60 mt-1">
                            Priority alerts for high-risk patients
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => onToggle("highRiskAlerts")}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${notifications.highRiskAlerts
                        ? "bg-red-600 text-white"
                        : "border border-bluelight-1/30 text-bluelight-1"
                        }`}
                    aria-pressed={notifications.highRiskAlerts}
                >
                    {notifications.highRiskAlerts ? "On" : "Off"}
                </button>
            </div>
        </div>
    );
}