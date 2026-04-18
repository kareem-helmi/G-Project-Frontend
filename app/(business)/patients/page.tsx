"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Patient } from "@/types";
import { getAllPatients } from "@/lib/services/business.service";
import SearchInput from "./components/SearchInput";
import { PageHeader, ExportButton, EditButton } from "./components/client-components";

export default function PatientsPage() {
    // ==========================================
    // STATE
    // ==========================================
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false); // New state for search in progress
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");

    // ==========================================
    // FETCH PATIENTS (LIVE SEARCH)
    // ==========================================
    useEffect(() => {
        const handler = setTimeout(() => {
            async function fetchPatients() {
                try {
                    setIsSearching(true); // Set searching state
                    const data = await getAllPatients(searchQuery);
                    setPatients(data);
                    setError(null);
                } catch (err) {
                    setError("Failed to load patients");
                } finally {
                    setIsSearching(false);
                    setLoading(false); // Only set initial loading false after first fetch
                }
            }
            fetchPatients();
        }, 300); // Reduced to 300ms debounce for better UX

        return () => clearTimeout(handler);
    }, [searchQuery]);


    // ==========================================
    // INITIAL LOADING STATE (ONLY FOR FIRST LOAD)
    // ==========================================
    if (loading) {
        return (
            <div className="w-full space-y-6">
                <PageHeader />
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-bluelight-1 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-bluelight-1/70">Loading patients...</p>
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================
    if (error) {
        return (
            <div className="w-full space-y-6">
                <PageHeader />
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-bluelight-1 text-white rounded-lg hover:bg-bluelight-2 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // RENDER PATIENTS TABLE
    // ==========================================
    return (
        <div className="w-full space-y-6">
            <PageHeader />

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchInput
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                    placeholder="Search by name, email or ID..."
                />

                <div className="flex gap-3">
                    <ExportButton patients={patients} />
                </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-4 relative"> {/* Added relative for overlay */}
                {isSearching && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10">
                        <div className="w-8 h-8 border-4 border-bluelight-1 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {patients.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-bluelight-1/60">
                            {searchQuery
                                ? `No patients found matching "${searchQuery}"`
                                : "No patients found."}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-left">
                            <thead>
                                <tr className="text-sm text-bluelight-1/70 border-b border-bluelight-1/20">
                                    <th className="px-4 py-3 font-semibold">Name</th>
                                    <th className="px-4 py-3 font-semibold">Age</th>
                                    <th className="px-4 py-3 font-semibold">Gender</th>
                                    <th className="px-4 py-3 font-semibold">Risk</th>
                                    <th className="px-4 py-3 font-semibold">Last Visit</th>
                                    <th className="px-4 py-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        className="border-t border-bluelight-1/20 hover:bg-bluelight-1/5 transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-bluelight-1">
                                                {patient.name}
                                            </div>
                                            <div className="text-xs text-bluelight-1/60">
                                                {patient.email}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-bluelight-1/80">
                                            {patient.age}
                                        </td>
                                        <td className="px-4 py-3 text-bluelight-1/80">
                                            {patient.gender}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${patient.risk === "High"
                                                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                                    : patient.risk === "Medium"
                                                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                    }`}
                                            >
                                                {patient.risk}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-bluelight-1/80 text-sm">
                                            {new Date(patient.lastVisit).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/analytics?patientId=${patient.id}`}
                                                    className="px-3 py-1.5 border border-bluelight-1/40 rounded-lg text-xs font-medium text-bluelight-1 hover:bg-[#0eb2b1]/10 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                                <EditButton patientId={patient.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Results Count */}
            {patients.length > 0 && (
                <div className="text-center text-sm text-bluelight-1/60">
                    Showing {patients.length} patient{patients.length !== 1 ? "s" : ""}
                </div>
            )}
        </div>
    );
}
