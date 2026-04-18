"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatContainer from "./ChatContainer";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ModelInfo from "./ModelInfo";
import FileAttachment from "./FileAttachment";

import { ChatMessage } from "@/types/chat.types";
import { ModelInsights } from "@/types/business.types";
import { generateAIResponse, sendChatMessage } from "@/lib/services/chat.service";
import { generateMessageId, getExamplePrompts, isScrolledToBottom } from "@/lib/utils/chat.utils";

interface AIChatProps {
    insights: ModelInsights;
}

export default function AIChat({ insights }: AIChatProps) {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            content: "Hello! I'm your AI Health Assistant. I can help you analyze patient data, explain medical insights, and answer health-related questions. How can I assist you today?",
            sender: "ai",
            timestamp: new Date(Date.now() - 60000),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

    // ==========================================
    // REFS
    // ==========================================
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // ==========================================
    // CONSTANTS
    // ==========================================
    const examplePrompts = getExamplePrompts();

    // ==========================================
    // AUTO-SCROLL EFFECT
    // ==========================================
    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom();
        }
    }, [messages, isTyping, isAtBottom]);

    // ==========================================
    // SCROLL DETECTION
    // ==========================================
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const atBottom = isScrolledToBottom(container);
            setIsAtBottom(atBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // ==========================================
    // SCROLL TO BOTTOM HANDLER
    // ==========================================
    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }, 100);
    }, []);

    // ==========================================
    // SEND MESSAGE HANDLER
    // ==========================================
    const handleSend = useCallback(async () => {
        if (!input.trim() && !attachedFile) return;

        // Create user message
        const userMessage: ChatMessage = {
            id: generateMessageId(),
            content: input || (attachedFile ? `📎 Attached file: ${attachedFile.name}` : ""),
            sender: "user",
            timestamp: new Date(),
            status: "sending",
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        const currentFile = attachedFile;
        setAttachedFile(null);
        setIsTyping(true);
        setIsAtBottom(true);

        try {
            // Save user message (backend call)
            await sendChatMessage(userMessage);

            // Generate AI response
            const aiResponseContent = await generateAIResponse({
                query: input,
                attachments: currentFile ? [{ file: currentFile }] : undefined,
            });

            // Add AI response to chat
            const aiMessage: ChatMessage = {
                id: generateMessageId(),
                content: aiResponseContent,
                sender: "ai",
                timestamp: new Date(),
                status: "sent",
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);

            // Show error message
            const errorMessage: ChatMessage = {
                id: generateMessageId(),
                content: "Sorry, I encountered an error. Please try again.",
                sender: "ai",
                timestamp: new Date(),
                status: "error",
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [input, attachedFile]);

    // ==========================================
    // FILE UPLOAD HANDLER
    // ==========================================
    const handleFileUpload = useCallback((file: File) => {
        setAttachedFile(file);
    }, []);

    // ==========================================
    // REMOVE ATTACHMENT HANDLER
    // ==========================================
    const removeAttachment = useCallback(() => {
        setAttachedFile(null);
    }, []);

    // ==========================================
    // PROMPT CLICK HANDLER
    // ==========================================
    const handlePromptClick = useCallback((prompt: string) => {
        setInput(prompt);
    }, []);

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <div className="w-full min-h-screen p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Area - 2/3 width */}
                <div className="lg:col-span-2">
                    <ChatContainer
                        messageCount={messages.length}
                        isAtBottom={isAtBottom}
                        onScrollToBottom={scrollToBottom}
                    >
                        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
                            <MessageList
                                messages={messages}
                                isTyping={isTyping}
                                examplePrompts={examplePrompts.map(p => p.text)}
                                onPromptClick={handlePromptClick}
                            >
                                <div ref={messagesEndRef} className="h-4" />
                            </MessageList>
                        </div>
                    </ChatContainer>

                    {/* Attached File Preview */}
                    {attachedFile && (
                        <FileAttachment
                            file={attachedFile}
                            onRemove={removeAttachment}
                        />
                    )}

                    {/* Input Area */}
                    <div className="mt-1">
                    <ChatInput
   value={input}
   onChange={setInput}
   onSend={handleSend}
   onFileUpload={handleFileUpload}
   onFileRemove={removeAttachment}
   attachedFile={attachedFile}
   disabled={isTyping}
/>
                    </div>
                </div>

                {/* Model Info - 1/3 width */}
                <div className="space-y-6">
                    <ModelInfo
                        accuracy={insights.accuracy}
                        modelVersion={insights.modelVersion}
                        lastUpdated={insights.lastUpdated}
                        features={insights.features}
                        loading={false}
                    />
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-4 text-center">
                <p className="text-xs text-bluelight-1/50">
                    AI Medical Assistant • Responses may not be accurate • Consult your doctor
                </p>
            </div>
        </div>
    );
}