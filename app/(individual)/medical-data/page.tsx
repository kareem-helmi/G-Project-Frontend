"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";
import MainButton from "@/components/custom/MainButton";
import FormInput from "./components/FormInput";
import FileUpload from "./components/FileUpload";
import { submitHealthData } from "@/lib/services/individual.service";
import { tempStorage } from "@/lib/utils/storage";
import { validateHealthForm } from "@/lib/utils/validation";
import { showSuccess, showError } from "@/components/ui/Toast";

import type {
    HealthFormData,
    FormValidationErrors,
} from "@/types/individual.types";

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function MedicalDataPage() {
    const router = useRouter();

    const [formData, setFormData] = useState<HealthFormData>({
        age: "",
        bloodPressure: "",
        bloodSugar: "",
        bmi: "",
        weight: "",
        SleepHours: "",
        additionalInfo: "",
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ------------------------
    // Handlers
    // ------------------------
    const handleChange = (
        field: keyof HealthFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };

    const handleSubmit = async () => {
        const validationErrors = validateHealthForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await submitHealthData({
                ...formData,
                file: selectedFile || undefined,
            });

            if (result.success) {
                tempStorage.set("lastSubmissionId", result.id);
                tempStorage.set("submittedHealthData", formData);

                showSuccess("Health data submitted successfully!");
                router.push("/results");
            }
        } catch (error) {
            console.error("Submit error:", error);
            showError("Failed to submit data. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid =
        formData.age &&
        formData.bloodPressure &&
        formData.bloodSugar &&
        formData.bmi &&
        Object.keys(errors).length === 0;

    // ------------------------
    // UI
    // ------------------------
    return (
        <div className="min-h-screen py-6 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <Title className="text-3xl text-bluelight-1 mb-3">
                        AI Disease Progression Predictor
                    </Title>
                    <SubTitle className="text-lg text-bluelight-1/70">
                        Enter Patient Information
                    </SubTitle>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-10"
                >
                    {/* Basic Info */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-2">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Age"
                                type="number"
                                placeholder="enter your age"
                                value={formData.age}
                                onChange={(v) => handleChange("age", v)}
                                error={errors.age}
                                required
                            />
                            <FormInput
                                label="weight"
                                type="number"
                                placeholder="enter weight in kg"
                                step="1"
                                value={formData.weight}
                                onChange={(v) => handleChange("weight", v)}
                                error={errors.weight}
                                required
                            />
                            <FormInput
                                label="SleepHours"
                                type="number"
                                placeholder="enter your Sleep Hours"
                                step="1"
                                value={formData.SleepHours}
                                onChange={(v) => handleChange("SleepHours", v)}
                                error={errors.bmi}
                                required
                            />
                            <FormInput
                                label="Blood Pressure"
                                value={formData.bloodPressure}
                                onChange={(v) =>
                                    handleChange("bloodPressure", v)
                                }
                                placeholder="e.g. 120/80 mmHg"
                                error={errors.bloodPressure}
                                required
                            />


                            <FormInput
                                label="Blood Sugar"
                                type="number"
                                value={formData.bloodSugar}
                                onChange={(v) =>
                                    handleChange("bloodSugar", v)
                                }
                                placeholder="mg/dL"
                                error={errors.bloodSugar}
                                required
                            />

                            <FormInput
                                label="BMI"
                                type="number"
                                placeholder="enter your Body Mass Index"
                                step="0.1"
                                value={formData.bmi}
                                onChange={(v) => handleChange("bmi", v)}
                                error={errors.bmi}
                                required
                            />

                        </div>
                    </section>

                    {/* Additional Info */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-2">
                            Additional Information (Optional)
                        </h3>

                        <textarea
                            rows={4}
                            value={formData.additionalInfo}
                            onChange={(e) =>
                                handleChange("additionalInfo", e.target.value)
                            }
                            placeholder="Enter any additional health details..."
                            className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition resize-none"
                        />

                        <FileUpload
                            selectedFile={selectedFile}
                            onFileChange={setSelectedFile}
                        />
                    </section>

                    {/* Submit */}
                    <motion.div
                        className="flex justify-center"
                    >
                        <MainButton
                            onClick={handleSubmit}
                            disabled={!isFormValid || isSubmitting}
                            className="w-full max-w-md text-xl px-10 py-4 border relative overflow-hidden"
                            background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                        >
                            {isSubmitting ? "Processing..." : "Predict"}
                        </MainButton>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
