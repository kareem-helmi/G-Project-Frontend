// app > (auth) > register-business > doctor > page.tsx
"use client";
import { useRouter } from "next/navigation";
import AuthContainer from "../../shared/AuthContainer";
import { AuthHeader } from "../../shared/AuthHeader";
import { DoctorForm } from "./components/DoctorForm";

export default function DoctorRegisterPage() {
    const router = useRouter();

    return (
        <AuthContainer
            showBackButton
            onBack={() => router.back()}
        >
            <AuthHeader
                subtitle="Complete your professional details"
                title="Doctor Info"
            />
            <DoctorForm />
        </AuthContainer>
    );
}