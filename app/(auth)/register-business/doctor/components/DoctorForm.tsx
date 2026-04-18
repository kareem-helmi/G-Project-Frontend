"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLabel } from "../../../shared/FormLabel";
import { SpecialtySelect } from "./SpecialtySelect";
import MainButton from "@/components/custom/MainButton";
import { validateRequired, validateNumber } from "@/lib/utils/validation";
import type { DoctorData } from "@/types/auth.types";
const FADE_UP = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const INPUT_CLASS = `
  w-full bg-white/50 dark:bg-gray-800/50 
  border-2 border-bluelight-1/30 
  rounded-2xl px-5 py-4 text-bluelight-1 
  focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
  outline-none transition-all duration-300
  placeholder:text-bluelight-1/50
  text-base hover:border-bluelight-1/50
  disabled:opacity-50 disabled:cursor-not-allowed
`.replace(/\s+/g, ' ').trim();


interface FormErrors {
  name?: string;
  specialty?: string;
  expectedPatients?: string;
  institutionId?: string;
  general?: string;
}

export function DoctorForm() {
  const router = useRouter();
  const [form, setForm] = useState<DoctorData>({
    type: "doctor",
    name: "",
    specialty: "",
    expectedPatients: "",
    isAffiliated: false,
    institutionId: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof DoctorData>(
    field: K,
    value: DoctorData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    // Name validation
    const nameResult = validateRequired(form.name, "Doctor name");
    if (!nameResult.isValid) {
      newErrors.name = nameResult.error;
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Specialty validation
    const specialtyResult = validateRequired(form.specialty, "Specialty");
    if (!specialtyResult.isValid) {
      newErrors.specialty = specialtyResult.error;
    }

    // Expected patients validation
    const patientsResult = validateNumber(form.expectedPatients, "Expected patients", 1);
    if (!patientsResult.isValid) {
      newErrors.expectedPatients = patientsResult.error;
    }

    // Institution ID validation (if affiliated)
    if (form.isAffiliated) {
      const institutionResult = validateRequired(form.institutionId, "Institution ID");
      if (!institutionResult.isValid) {
        newErrors.institutionId = institutionResult.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleContinue() {
    if (!validate()) return;

    setLoading(true);
    try {
      // Save to localStorage temporarily
      localStorage.setItem(
        "temp_doctor_data",
        JSON.stringify({
          data: form,
          timestamp: Date.now()
        })
      );      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/register?userType=business");
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Failed to save data. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-[420px] space-y-6 mt-4"
    >
      {/* General Error */}
      {errors.general && (
        <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {errors.general}
        </div>
      )}

      {/* Doctor Name */}
      <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <div className="space-y-2">
          <FormLabel required>Doctor Name</FormLabel>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter your full name"
            disabled={loading}
            className={INPUT_CLASS}
            required
          />
          {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>}
        </div>
      </motion.div>

      {/* Specialty */}
      <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
        <div className="space-y-2">
          <FormLabel required>Specialty</FormLabel>
          <SpecialtySelect value={form.specialty} onChange={(value) => updateField("specialty", value)} disabled={loading} />
          {errors.specialty && <p className="text-xs text-red-500 mt-1 ml-1">{errors.specialty}</p>}
        </div>
      </motion.div>

      {/* Expected Patients */}
      <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
        <div className="space-y-2">
          <FormLabel required>Expected Monthly Patients</FormLabel>
          <input
            type="number"
            min="1"
            value={form.expectedPatients}
            onChange={(e) => updateField("expectedPatients", e.target.value)}
            placeholder="e.g., 100"
            disabled={loading}
            className={INPUT_CLASS}
            required
          />
          {errors.expectedPatients && <p className="text-xs text-red-500 mt-1 ml-1">{errors.expectedPatients}</p>}
        </div>
      </motion.div>

      {/* Affiliation */}
      <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
        <div className="space-y-2">
          <FormLabel>Are you affiliated with an institution?</FormLabel>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => updateField("isAffiliated", true)}
              disabled={loading}
              className={`flex-1 py-3.5 rounded-xl border-2 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${form.isAffiliated
                  ? "bg-bluelight-2/20 border-bluelight-2 text-bluelight-1 font-medium"
                  : "border-bluelight-1/30 text-bluelight-1/70 hover:border-bluelight-1/50"
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({ ...prev, isAffiliated: false, institutionId: "" }));
                setErrors((prev) => ({ ...prev, institutionId: "" }));
              }}
              disabled={loading}
              className={`flex-1 py-3.5 rounded-xl border-2 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${!form.isAffiliated
                  ? "bg-bluelight-2/20 border-bluelight-2 text-bluelight-1 font-medium"
                  : "border-bluelight-1/30 text-bluelight-1/70 hover:border-bluelight-1/50"
                }`}
            >
              No
            </button>
          </div>
        </div>
      </motion.div>

      {/* Institution ID */}
      {form.isAffiliated && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <div className="space-y-2">
            <FormLabel required>Institution ID</FormLabel>
            <input
              type="text"
              value={form.institutionId}
              onChange={(e) => updateField("institutionId", e.target.value)}
              placeholder="Enter institution ID"
              disabled={loading}
              className={INPUT_CLASS}
              required={form.isAffiliated}
            />
            {errors.institutionId && <p className="text-xs text-red-500 mt-1 ml-1">{errors.institutionId}</p>}
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div variants={FADE_UP} initial="hidden" animate="visible" transition={{ delay: 0.8 }} className="pt-4">
        <MainButton
          onClick={handleContinue}
          className="w-full text-[1.05rem] sm:text-[1.15rem] px-8 py-4 border-2 border-bluelight-2"
          background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
          disabled={loading}
        >
          <span className="flex items-center justify-center gap-3">
            <span>{loading ? "Processing..." : "Continue to Registration"}</span>
            {!loading && <span className="text-lg">→</span>}
          </span>
        </MainButton>
      </motion.div>
    </motion.div>
  );
}
