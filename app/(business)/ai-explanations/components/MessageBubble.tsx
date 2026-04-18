"use client";

import React from "react";
import { Bot, User, Clock } from "lucide-react";
import { ChatMessage } from "@/types/chat.types";
import { formatChatTime, truncateMessage, parseMessageLine } from "@/lib/utils/chat.utils";

interface MessageBubbleProps {
    message: ChatMessage;
    showAvatar?: boolean;
}

export default function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
    const isAI = message.sender === "ai";

    // Truncate long messages
    const { content: displayContent, isTruncated } = truncateMessage(message.content);

    // ==========================================
    // RENDER MESSAGE LINE
    // ==========================================
    const renderLine = (line: string, idx: number) => {
        // Handle truncation marker
        if (line === '[Message truncated. Click to expand.]') {
            return (
                <div key={idx} className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                    {line}
                </div>
            );
        }

        const parsed = parseMessageLine(line);

        switch (parsed.type) {
            case 'heading':
                return (
                    <div key={idx} className={`font-bold text-sm mt-2 mb-1.5 wrap-break-word ${isAI ? 'text-bluelight-1' : 'text-purple-600 dark:text-purple-400'
                        }`}>
                        {parsed.content}
                    </div>
                );

            case 'bullet':
                return (
                    <div key={idx} className="flex gap-1.5 ml-1 my-1 wrap-break-word">
                        <span className={`shrink-0 ${isAI ? 'text-bluelight-1' : 'text-purple-600'
                            }`}>•</span>
                        <span className="wrap-break-word">{parsed.content}</span>
                    </div>
                );

            case 'checkmark':
                return (
                    <div key={idx} className="flex gap-1.5 ml-1 my-1 wrap-break-word">
                        <span className="text-green-500 shrink-0">✓</span>
                        <span className="wrap-break-word">{parsed.content}</span>
                    </div>
                );

            case 'numbered':
                return (
                    <div key={idx} className="flex gap-1.5 ml-1 my-1 wrap-break-word">
                        <span className={`font-semibold shrink-0 ${isAI ? 'text-bluelight-1' : 'text-purple-600'
                            }`}>
                            {line.match(/^\d+\./)?.[0]}
                        </span>
                        <span className="wrap-break-word">{parsed.content}</span>
                    </div>
                );

            case 'text':
            default:
                return line ? (
                    <p key={idx} className="my-1 wrap-break-word">{parsed.content}</p>
                ) : (
                    <br key={idx} />
                );
        }
    };

    // ==========================================
    // RENDER COMPONENT
    // ==========================================
    return (
        <div className={`flex gap-2 sm:gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Avatar */}
            {showAvatar && (
                <div className="shrink-0 mt-1">
                    {isAI ? (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-bluelight-1 to-cyan-500 flex items-center justify-center shadow-sm">
                            <Bot className="text-white" size={14} />
                        </div>
                    ) : (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
                            <User className="text-white" size={14} />
                        </div>
                    )}
                </div>
            )}

            {/* Message Content */}
            <div className={`flex-1 min-w-0 ${!isAI && 'flex justify-end'}`}>
                <div className={`rounded-xl p-3 max-w-full ${isAI
                        ? 'bg-white/90 dark:bg-gray-800/90 border border-bluelight-1/30'
                        : 'bg-linear-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`font-medium text-xs truncate ${isAI ? 'text-bluelight-1' : 'text-purple-600 dark:text-purple-400'
                                }`}>
                                {isAI ? "AI Assistant" : "You"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-70 shrink-0">
                            <Clock size={10} className={
                                isAI ? 'text-bluelight-1/70' : 'text-purple-500/70'
                            } />
                            <span className={
                                isAI ? 'text-bluelight-1/70' : 'text-purple-500/70'
                            }>
                                {formatChatTime(new Date(message.timestamp))}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`text-sm leading-relaxed ${isAI ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                        {displayContent.split('\n').map((line, idx) => renderLine(line, idx))}
                    </div>
                </div>
            </div>
        </div>
    );
}