"use client";

import React, { useRef, useEffect, KeyboardEvent } from "react";
import { Send, Paperclip, Mic, MicOff, X, FileText, Image, File } from "lucide-react";

interface ChatInputProps {
    value: string;
    attachedFile: File | null;
    onChange: (value: string) => void;
    onSend: () => void;
    onFileUpload: (file: File) => void;
    onFileRemove?: () => void;
    onVoiceInput?: () => void;
    isListening?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export default function ChatInput({
    value,
    attachedFile,
    onChange,
    onSend,
    onFileUpload,
    onFileRemove,
    onVoiceInput,
    isListening = false,
    disabled = false,
    placeholder = "Write your message here..."
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-resize textarea based on content
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(Math.max(textarea.scrollHeight, 56), 120);
            textarea.style.height = `${newHeight}px`;
        }
    }, [value]);

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim() || attachedFile) {
                onSend();
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("File size must be less than 10MB");
                return;
            }
            onFileUpload(file);
        }
        e.target.value = '';
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) return <FileText className="text-red-500" size={16} />;
        if (fileType.includes('image')) return <Image className="text-green-500" size={16} />;
        return <File className="text-bluelight-1" size={16} />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="space-y-3">
            {/* File Preview */}
          
            {/* Main Input Container */}
            <div className="relative bg-white/95 dark:bg-gray-900/95 border-2 border-bluelight-1/30 rounded-xl p-3 backdrop-blur-sm">
                {/* Text Input Area */}
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={attachedFile ? "Write your message here..." : placeholder}
                        disabled={disabled}
                        className="w-full px-3 py-2 pr-24 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none text-sm disabled:opacity-50"
                        rows={2}
                    />

                    {/* Send Button */}
                    <button
                        onClick={onSend}
                        disabled={disabled || (!value.trim() && !attachedFile)}
                        className={`
                            absolute right-2 top-2 p-2 rounded-lg transition-all
                            flex items-center justify-center
                            ${disabled || (!value.trim() && !attachedFile)
                                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50"
                                : "bg-linear-to-r from-bluelight-1 to-cyan-500 hover:from-bluelight-2 hover:to-cyan-600 active:scale-95"
                            }
                        `}
                        title="Send message"
                    >
                        <Send className="text-white" size={18} />
                    </button>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between  pt-2 border-t border-bluelight-1/10">
                    {/* Action Buttons - زر الإرفاق وزر المايك بجانب بعض */}
                    <div className="flex items-center gap-2">
                        {/* زر الإرفاق */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={disabled}
                            className={`
                                p-2 rounded-lg transition-colors
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${attachedFile
                                    ? 'bg-bluelight-1/20 text-bluelight-1'
                                    : 'bg-bluelight-1/10 hover:bg-bluelight-1/20 text-bluelight-1'
                                }
                            `}
                            title="Attach file"
                        >
                            <Paperclip size={16} />
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png,.csv,.xlsx"
                            disabled={disabled}
                        />

                        {/* زر المايك */}
                        <button
                            onClick={onVoiceInput}
                            disabled={disabled}
                            className={`
                                p-2 rounded-lg transition-colors
                                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${isListening
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-bluelight-1/10 hover:bg-bluelight-1/20 text-bluelight-1'
                                }
                            `}
                            title={isListening ? "Listening... Click to stop" : "Voice input"}
                        >
                            {isListening ? (
                                <MicOff size={16} />
                            ) : (
                                <Mic size={16} />
                            )}
                        </button>
                    </div>

                    {/* Simple Hint */}
                    <div className="text-xs text-gray-400">
                        Press Enter to Send
                    </div>
                </div>
            </div>
        </div>
    );
}