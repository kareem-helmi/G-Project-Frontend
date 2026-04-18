import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

interface BusinessLayoutProps {
    children: ReactNode;
}

/**
 * Business dashboard layout
 * Features:
 * - Responsive sidebar (drawer on mobile, fixed on desktop)
 * - Sticky sidebar on desktop for easy navigation
 * - Background styling
 * - Proper spacing and max-width container
 */
export default function BusinessLayout({ children }: BusinessLayoutProps) {
    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pt-16 lg:pt-0">
                {/* 
                    Sidebar Section
                    - Mobile: Hamburger menu (drawer)
                    - Desktop: Fixed sidebar with sticky positioning
                */}
                <aside
                    className="w-full lg:w-72 shrink-0 lg:sticky lg:top-8"
                    style={{ maxHeight: 'calc(100vh - 4rem)' }}
                >
                    <Sidebar />
                </aside>

                {/* 
                    Main Content Area
                    - Full width on mobile
                    - Flex-1 to fill remaining space on desktop
                */}
                <main className="flex-1 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}