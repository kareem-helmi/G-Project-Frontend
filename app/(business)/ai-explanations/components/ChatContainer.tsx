"use client";

import React, { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ChatContainerProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    messageCount?: number;
    isAtBottom?: boolean;
    onScrollToBottom?: () => void;
}

export default function ChatContainer({
    children,
    title = "AI Health Assistant",
    subtitle = "Real-time medical insights and patient analysis powered by AI",
    messageCount = 0,
    isAtBottom = true,
    onScrollToBottom
}: ChatContainerProps) {
    return (
        <div className="flex flex-col h-[calc(100vh-220px)] min-h-[400px] max-h-[700px] bg-white dark:bg-gray-900 rounded-xl border-2 border-bluelight-1/30 shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-2 sm:px-5 sm:py-3 bg-linear-to-r from-bluelight-1 to-cyan-500">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <div className="text-white font-bold text-xs">AI</div>
                        </div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 border border-white animate-pulse"></div>
                    </div>
                    <div>
                        <h1 className="text-sm sm:text-base font-bold text-white">
                            {title}
                        </h1>
                        <p className="text-white/90 text-xs">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <span className="text-white text-xs font-medium">
                        {messageCount} {messageCount === 1 ? 'msg' : 'msgs'}
                    </span>
                </div>
            </div>

            {/* Chat Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
                <div className="flex-1 overflow-y-auto p-3 bg-white/95 dark:bg-gray-900/95 dark:via-gray-800/70 dark:to-gray-900/90">
                    <div className="space-y-3">
                        {children}
                    </div>
                </div>

                {/* Gradient overlay for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-white/90 dark:from-gray-900 to-transparent pointer-events-none"></div>

                {/* Scroll to bottom button */}
                {!isAtBottom && onScrollToBottom && (
                    <button
                        onClick={onScrollToBottom}
                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 p-2 bg-linear-to-r from-bluelight-1 to-cyan-500 hover:from-bluelight-2 hover:to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-bluelight-1/30 border border-white/20"
                        aria-label="Scroll to bottom"
                    >
                        <ChevronDown size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}