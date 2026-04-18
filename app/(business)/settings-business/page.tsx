"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Trash2, Activity, MessageSquare } from "lucide-react";
import { tempStorage } from "@/lib/utils/storage";
import Notifications from "./components/Notifications";
import ContactForm from "./components/ContactForm";

type NotificationsState = {
    email: boolean;
    sms: boolean;
    highRiskAlerts: boolean;
};

const DEFAULT_SETTINGS: NotificationsState = {
    email: true,
    sms: false,
    highRiskAlerts: true,
};

const STORAGE_KEY = 'business_notifications';

export default function SettingsPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [notifications, setNotifications] = useState<NotificationsState>(DEFAULT_SETTINGS);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // LOAD SETTINGS
    // ==========================================
    useEffect(() => {
        try {
            const saved = tempStorage.get<NotificationsState>(STORAGE_KEY);
            if (saved) {
                setNotifications(saved);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // ==========================================
    // TOGGLE NOTIFICATION
    // ==========================================
    const toggleNotification = (key: keyof NotificationsState) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
        setDirty(true);
    };

    // ==========================================
    // RESET SETTINGS
    // ==========================================
    const reset = () => {
        if (confirm('Are you sure you want to reset all settings to default values?')) {
            setNotifications(DEFAULT_SETTINGS);
            setDirty(true);
            tempStorage.remove(STORAGE_KEY);
        }
    };

    // ==========================================
    // SAVE SETTINGS
    // ==========================================
    const save = async () => {
        if (!dirty) return;

        setSaving(true);
        try {
            // Save to temp storage
            tempStorage.set(STORAGE_KEY, notifications);

            // TODO: Replace with actual API call when backend is ready
            // await updateSettings({ notifications });

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            setDirty(false);

            // Show success message
            showSuccessMessage('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert("Failed to save settings. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // CONTACT FORM HANDLER
    // ==========================================
    const handleSendMessage = (payload: {
        name: string;
        email: string;
        message: string
    }) => {
        const subject = encodeURIComponent("Dashboard Feedback / Support");
        const body = encodeURIComponent(
            `Name: ${payload.name || 'Anonymous'}\nEmail: ${payload.email || 'Not provided'}\n\n${payload.message}`
        );
        window.location.href = `mailto:support@yourcompany.com?subject=${subject}&body=${body}`;
    };

    // ==========================================
    // LOADING STATE
    // ==========================================
    if (loading) {
        return (
            <div className="w-full space-y-6">
                <PageHeader />
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-bluelight-1 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-bluelight-1/70">Loading settings...</p>
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // RENDER SETTINGS
    // ==========================================
    return (
        <div className="w-full space-y-8">
            <PageHeader />

            {/* Settings Content */}
            <div className="space-y-6">
                {/* Notifications Card */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-bluelight-1" size={24} />
                        <h2 className="text-xl font-semibold text-bluelight-1">
                            Notifications
                        </h2>
                    </div>
                    <Notifications
                        notifications={notifications}
                        onToggle={toggleNotification}
                    />
                </div>

                {/* Contact Form Card */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="text-bluelight-1" size={24} />
                        <h2 className="text-xl font-semibold text-bluelight-1">
                            Contact Support
                        </h2>
                    </div>
                    <ContactForm onSend={handleSendMessage} />
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t-2 border-bluelight-1/30">
                <button
                    onClick={reset}
                    disabled={!dirty}
                    className={`
                        inline-flex items-center gap-2 px-4 py-2.5 rounded-lg 
                        transition-all font-medium
                        ${dirty
                            ? 'border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10 active:scale-95'
                            : 'border-2 border-bluelight-1/20 text-bluelight-1/40 cursor-not-allowed'
                        }
                    `}
                >
                    <Trash2 size={16} />
                    Reset to Default
                </button>

                <button
                    onClick={save}
                    disabled={!dirty || saving}
                    className={`
                        inline-flex items-center gap-2 px-6 py-2.5 rounded-lg 
                        transition-all font-medium
                        ${dirty && !saving
                            ? "bg-bluelight-2 text-white hover:bg-bluelight-1 active:scale-95"
                            : "bg-bluelight-2/50 text-white/70 cursor-not-allowed"
                        }
                    `}
                >
                    {saving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Save Settings
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

// ==========================================
// PAGE HEADER COMPONENT
// ==========================================
function PageHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold text-bluelight-1 mb-2">
                Settings
            </h1>
            <p className="text-bluelight-1/70">
                Manage notifications and contact the development team
            </p>
        </motion.div>
    );
}

// ==========================================
// HELPER FUNCTION
// ==========================================
function showSuccessMessage(message: string) {
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right';
    successMsg.textContent = message;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
}