//context/ThemeContext

"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
        </NextThemesProvider>
    );
}

export function useTheme() {
    return useNextTheme();
}