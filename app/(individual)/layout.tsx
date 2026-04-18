//individual layout
"use client";

import { motion } from "framer-motion";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
        min-h-screen 
        w-full 
        flex 
        bg-cover 
        bg-center 
        overflow-x-hidden   /* 👈 يمنع أي scroll عرضي */
        overflow-y-auto     /* 👈 يسمح بالتمرير الرأسي */
        relative
      "
        >
            {/* Theme Toggle ثابت فوق اليمين */}
            <div className="fixed top-4 right-6 z-50">
                <ThemeToggleDefault />
            </div>

            {/* محتوى الصفحة */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 min-w-0"  // 👈 مهم جدًا لمنع تمدد العنصر أفقيًا
            >
                {children}
            </motion.div>
        </div>
    );
}
