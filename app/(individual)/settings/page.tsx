"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MainButton from "@/components/custom/MainButton";
import { useUserType } from "@/context/UserTypeContext";
import { tempStorage } from "@/lib/utils/storage";
import { updateProfile } from "@/lib/services/individual.service";
import { showSuccess, showError } from "@/components/ui/Toast";
import type { UserSettings, UserProfile } from "@/types/individual.types";
import ToggleSwitch from "./components/ToggleSwitch";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";

// ==========================================
// CONSTANTS
// ==========================================
const SETTINGS_KEY = "individual_settings";
const USER_INFO_KEY = "individual_user_info";

const defaultSettings: UserSettings = {
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    language: "english",
    timezone: "UTC+2",
    dataSharing: false,
};

const defaultUserInfo: UserProfile = {
    id: "user_" + Date.now(),
    name: "User Name",
    email: "user@example.com",
    phone: "+1234567890",
    birthDate: "1990-01-01",
};

export default function SettingsPage() {
    const router = useRouter();
    const { logout } = useUserType();

    // ==========================================
    // STATE
    // ==========================================
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);
    const [userInfo, setUserInfo] = useState<UserProfile>(defaultUserInfo);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // ==========================================
    // LOAD SETTINGS
    // ==========================================
    useEffect(() => {
        const savedSettings = tempStorage.get<UserSettings>(SETTINGS_KEY);
        const savedUserInfo = tempStorage.get<UserProfile>(USER_INFO_KEY);

        if (savedSettings) {
            setSettings({ ...defaultSettings, ...savedSettings });
        }
        if (savedUserInfo) {
            setUserInfo({ ...defaultUserInfo, ...savedUserInfo });
        }
    }, []);

    // ==========================================
    // HANDLERS
    // ==========================================
    const handleSettingChange = (key: keyof UserSettings, value: boolean | string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setIsDirty(true);
    };

    const handleUserInfoChange = (key: keyof UserProfile, value: string) => {
        setUserInfo((prev) => ({ ...prev, [key]: value }));
        setIsDirty(true);
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            tempStorage.set(SETTINGS_KEY, settings);
            tempStorage.set(USER_INFO_KEY, userInfo);
            await updateProfile(userInfo);

            if (settings.darkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            setIsDirty(false);
            showSuccess("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            showError("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to reset all settings to default values?")) {
            setSettings(defaultSettings);
            setUserInfo(defaultUserInfo);
            setIsDirty(true);
            tempStorage.remove(SETTINGS_KEY);
            tempStorage.remove(USER_INFO_KEY);
            showSuccess("Settings reset to default");
        }
    };

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <div className="min-h-screen bg-cover bg-center">
            <div className="w-full flex">
                <div className="flex-1 py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 min-w-0">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 sm:mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bluelight-1 mb-2 text-center">
                            Settings
                        </h1>
                        <p className="text-sm sm:text-base text-bluelight-1/70 text-center">
                            Manage your account settings and preferences
                        </p>
                    </motion.div>

                    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
                        {/* Personal Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-lg sm:rounded-xl p-4 sm:p-6"
                        >
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-bluelight-1 mb-3 sm:mb-4">
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <TextInput
                                    label="Full Name"
                                    value={userInfo.name}
                                    onChange={(v) => handleUserInfoChange("name", v)}
                                />
                                <TextInput
                                    label="Email"
                                    value={userInfo.email}
                                    onChange={(v) => handleUserInfoChange("email", v)}
                                    type="email"
                                />
                                <TextInput
                                    label="Phone Number"
                                    value={userInfo.phone}
                                    onChange={(v) => handleUserInfoChange("phone", v)}
                                    type="tel"
                                />
                                <TextInput
                                    label="Birth Date"
                                    value={userInfo.birthDate}
                                    onChange={(v) => handleUserInfoChange("birthDate", v)}
                                    type="date"
                                />
                            </div>
                        </motion.div>

                        {/* Notification Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold text-bluelight-1 mb-4">
                                Notification Settings
                            </h2>
                            <div className="space-y-4">
                                <ToggleSwitch
                                    label="Push Notifications"
                                    description="Receive notifications about your health status"
                                    checked={settings.notifications}
                                    onChange={(v) => handleSettingChange("notifications", v)}
                                />
                                <ToggleSwitch
                                    label="Email Updates"
                                    description="Receive weekly health reports via email"
                                    checked={settings.emailUpdates}
                                    onChange={(v) => handleSettingChange("emailUpdates", v)}
                                />
                            </div>
                        </motion.div>

                        {/* Preferences */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold text-bluelight-1 mb-4">
                                Preferences
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectInput
                                    label="Language"
                                    value={settings.language}
                                    onChange={(v) => handleSettingChange("language", v)}
                                    options={[
                                        { value: "english", label: "English" },
                                        { value: "arabic", label: "Arabic" },
                                        { value: "spanish", label: "Spanish" },
                                        { value: "french", label: "French" }
                                    ]}
                                />
                                <SelectInput
                                    label="Timezone"
                                    value={settings.timezone}
                                    onChange={(v) => handleSettingChange("timezone", v)}
                                    options={[
                                        { value: "UTC+2", label: "UTC+2 (Cairo)" },
                                        { value: "UTC+0", label: "UTC+0 (London)" },
                                        { value: "UTC-5", label: "UTC-5 (New York)" },
                                        { value: "UTC+8", label: "UTC+8 (Singapore)" }
                                    ]}
                                />
                            </div>
                        </motion.div>

                        {/* Privacy Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold text-bluelight-1 mb-4">
                                Privacy & Data
                            </h2>
                            <ToggleSwitch
                                label="Data Sharing"
                                description="Allow anonymous data for research purposes"
                                checked={settings.dataSharing}
                                onChange={(v) => handleSettingChange("dataSharing", v)}
                            />
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-between mt-8 max-w-4xl mx-auto"
                    >
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 border-2 border-bluelight-1/40 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-all duration-300"
                            >
                                Reset to Default
                            </button>
                            <button
                                 onClick={() => router.back()}
                                className="px-6 py-3 border-2 border-red-500/40 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300"
                            >
                                Exit
                            </button>
                        </div>
                        <MainButton
                            onClick={handleSaveSettings}
                            disabled={!isDirty || isSaving}
                            className={`px-6 py-3 border transition-all duration-300 ${isDirty && !isSaving
                                    ? "bg-bluelight-2 hover:bg-transparent"
                                    : "bg-bluelight-2/50 cursor-not-allowed opacity-60"
                                }`}
                        >
                            {isSaving ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                "Save Settings"
                            )}
                        </MainButton>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}