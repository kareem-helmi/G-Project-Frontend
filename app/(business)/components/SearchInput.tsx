"use client";

import React from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    // Simple debounce could be added here if needed

    return (
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-bluelight-1/60" size={16} />
            <input
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-bluelight-1/40 bg-white/80 dark:bg-transparent text-bluelight-1 placeholder:text-bluelight-1/60 focus:border-bluelight-2 transition"
            />
        </div>
    );
}
