

/**
 * Message sender type
 */
export type MessageSender = "user" | "ai";

/**
 * Message status for tracking delivery/read state
 */
export type MessageStatus = "sending" | "sent" | "error";

/**
 * Chat message interface
 */
export interface ChatMessage {
    id: string;
    content: string;
    sender: MessageSender;
    timestamp: Date;
    status?: MessageStatus;
    attachmentUrl?: string;
    attachmentName?: string;
}

/**
 * File attachment interface
 */
export interface FileAttachment {
    file: File;
    previewUrl?: string;
}

/**
 * Chat input state interface
 */
export interface ChatInputState {
    value: string;
    attachedFile: File | null;
    isListening: boolean;
    disabled: boolean;
}

/**
 * AI Response generation context
 */
export interface AIResponseContext {
    query: string;
    patientId?: string;
    attachments?: FileAttachment[];
}

/**
 * Example prompt interface
 */
export interface ExamplePrompt {
    id: string;
    text: string;
    category: "analysis" | "explanation" | "recommendation" | "general";
}

/**
 * Chat container state
 */
export interface ChatContainerState {
    isAtBottom: boolean;
    messageCount: number;
    isTyping: boolean;
}