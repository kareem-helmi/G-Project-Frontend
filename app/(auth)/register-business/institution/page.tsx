"use client";
import { useRouter } from "next/navigation";
import AuthContainer from "../../shared/AuthContainer";
import { AuthHeader } from "../../shared/AuthHeader";
import { InstitutionForm } from "./components/InstitutionForm";

export default function InstitutionRegisterPage() {
    const router = useRouter();

    return (
        <AuthContainer onBack={() => router.back()}>
            <AuthHeader
                title="Institution Information"
                subtitle="Complete your organization details"
            />
            <InstitutionForm />
        </AuthContainer>
    );
}