"use client";

import React, { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { ChatMessage } from "@/types/chat.types";

interface MessageListProps {
    messages: ChatMessage[];
    isTyping?: boolean;
    examplePrompts?: string[];
    onPromptClick?: (prompt: string) => void;
    children?: ReactNode;
}

export default function MessageList({
    messages,
    isTyping = false,
    examplePrompts = [],
    onPromptClick,
    children
}: MessageListProps) {
    // ==========================================
    // TYPING INDICATOR COMPONENT
    // ==========================================
    const TypingIndicator = () => (
        <div className="flex gap-2 sm:gap-3">
            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-r from-bluelight-1 to-cyan-500 flex items-center justify-center">
                <div className="text-white text-sm font-semibold">AI</div>
            </div>
            <div className="bg-bluelight-1/10 border border-bluelight-1/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-bluelight-1 animate-bounce" />
                    <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-bluelight-1 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    />
                    <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-bluelight-1 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                    />
                </div>
            </div>
        </div>
    );

    // ==========================================
    // EMPTY STATE
    // ==========================================
    if (messages.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-r from-bluelight-1/20 to-cyan-500/20 flex items-center justify-center mb-4">
                        <Sparkles className="text-bluelight-1" size={24} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-bluelight-1 mb-3">
                        Start a Conversation
                    </h2>
                    <p className="text-bluelight-1/70 text-sm sm:text-base max-w-sm mb-6">
                        Ask me about patient analysis, medical insights, or health recommendations
                    </p>

                    {/* Example Prompts */}
                    {examplePrompts.length > 0 && onPromptClick && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-xs">
                            {examplePrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onPromptClick(prompt)}
                                    className="px-3 py-2 text-xs sm:text-sm bg-bluelight-1/10 hover:bg-bluelight-1/20 text-bluelight-1 rounded-lg transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ==========================================
    // MESSAGES LIST
    // ==========================================
    return (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="space-y-4 sm:space-y-6">
                {/* Date Separator */}
                <div className="flex items-center justify-center my-4">
                    <div className="text-xs text-bluelight-1/50 bg-bluelight-1/5 px-3 py-1 rounded-full">
                        Today • {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Messages */}
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        showAvatar={true}
                    />
                ))}

                {/* Typing Indicator */}
                {isTyping && <TypingIndicator />}

                {children}
            </div>
        </div>
    );
}