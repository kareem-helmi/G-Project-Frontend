"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { BUSINESS_NAV_ITEMS } from "@/lib/constants";

const drawerVariants = {
    hidden: { x: "-100%" },
    visible: {
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 30
        }
    },
};

export default function Sidebar() {
    const pathname = usePathname() || "";
    const [openMobile, setOpenMobile] = useState(false);

    // Close drawer on route change
    useEffect(() => {
        setOpenMobile(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
                <button
                    onClick={() => setOpenMobile(true)}
                    aria-label="Open menu"
                    className="fixed top-4 left-4 z-50 bg-bluelight-2 text-white p-3 rounded-xl shadow-lg hover:bg-bluelight-1 transition"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col gap-6">
                <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-2xl px-6 py-6 backdrop-blur-sm shadow-lg flex flex-col items-center">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center w-full relative z-10">
                        <div className="w-16 h-16 bg-linear-to-br from-[#0eb2b1] to-[#0c9190] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            UN
                        </div>
                        <span className="mt-3 text-bluelight-1 font-semibold text-sm">
                            User Name
                        </span>
                    </div>

                    {/* Navigation */}
                    <div className="w-full mt-6">
                        <div className="h-px bg-bluelight-1/40 rounded-full mb-6"></div>

                        <nav className="space-y-3 w-full">
                            {BUSINESS_NAV_ITEMS.map((item: typeof BUSINESS_NAV_ITEMS[number]) => {
                                const isActive =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/");

                                return (
                                    <Link key={item.href} href={item.href} className="block">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.12 }}
                                            className={`
                                                w-full px-5 py-3.5 rounded-xl font-medium text-sm 
                                                tracking-wide border transition-all duration-200 text-center
                                                ${isActive
                                                    ? "bg-[#0eb2b1] text-white border-[#0eb2b1] shadow-[0_0_12px_rgba(14,178,177,0.45)]"
                                                    : "bg-transparent text-bluelight-1 border-transparent hover:bg-[#0eb2b1]/25 hover:text-[#0eb2b1] hover:border-[#0eb2b1]/40"
                                                }
                                            `}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.title}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Theme Toggle */}
                    <div className="w-full mt-6 pt-4 border-t border-bluelight-1/30 flex items-center justify-center">
                        <ThemeToggleDefault />
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {openMobile && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpenMobile(false)}
                            className="fixed inset-0 bg-black/50 z-40"
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={drawerVariants}
                            className="fixed top-0 left-0 z-50 h-full w-72 p-6"
                        >
                            <div className="bg-white/95 dark:bg-[#0b1220]/95 border-2 border-bluelight-1/40 dark:border-bluelight-1/20 rounded-2xl px-4 py-6 shadow-lg h-full flex flex-col">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#0eb2b1] to-[#0c9190] flex items-center justify-center text-white font-bold">
                                            UN
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-bluelight-1">
                                                User Name
                                            </div>
                                            <div className="text-xs text-bluelight-1/70">
                                                Business
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setOpenMobile(false)}
                                        aria-label="Close menu"
                                        className="p-2 text-bluelight-1 hover:bg-bluelight-1/10 rounded-lg transition"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Mobile Navigation */}
                                <nav className="flex-1 space-y-3">
                                    {BUSINESS_NAV_ITEMS.map((item: typeof BUSINESS_NAV_ITEMS[number]) => {
                                        const isActive =
                                            pathname === item.href ||
                                            pathname.startsWith(item.href + "/");

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="block"
                                            >
                                                <motion.div
                                                    onClick={() => setOpenMobile(false)}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`
                                                        w-full px-4 py-3 rounded-lg text-sm font-medium 
                                                        text-center transition
                                                        ${isActive
                                                            ? "bg-[#0eb2b1] text-white shadow-[0_0_10px_rgba(14,178,177,0.25)]"
                                                            : "bg-transparent text-bluelight-1 hover:bg-[#0eb2b1]/10 hover:text-[#0eb2b1]"
                                                        }
                                                    `}
                                                >
                                                    {item.title}
                                                </motion.div>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Mobile Theme Toggle */}
                                <div className="mt-4 pt-4 border-t border-bluelight-1/30">
                                    <div className="flex items-center justify-center">
                                        <ThemeToggleDefault />
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}