
import { ExamplePrompt } from "@/types/chat.types";

/**
 * Format timestamp for display
 */
export function formatChatTime(date: Date): string {
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Get file icon type
 */
export function getFileType(mimeType: string): 'pdf' | 'image' | 'document' {
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('image')) return 'image';
    return 'document';
}

/**
 * Truncate long messages for preview
 */
export function truncateMessage(
    content: string,
    maxLines: number = 15
): { content: string; isTruncated: boolean } {
    const lines = content.split('\n');

    if (lines.length > maxLines) {
        const truncated = lines.slice(0, maxLines).join('\n');
        return {
            content: `${truncated}\n\n[Message truncated. Click to expand.]`,
            isTruncated: true
        };
    }

    return { content, isTruncated: false };
}

/**
 * Generate unique message ID
 */
export function generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get example prompts for chat
 */
export function getExamplePrompts(): ExamplePrompt[] {
    return [
        {
            id: "1",
            text: "Analyze diabetes risk for age 45",
            category: "analysis"
        },
        {
            id: "2",
            text: "Explain blood pressure 130/85",
            category: "explanation"
        },
        {
            id: "3",
            text: "Diet recommendations for heart patients",
            category: "recommendation"
        },
        {
            id: "4",
            text: "How to interpret cholesterol test?",
            category: "explanation"
        },
        {
            id: "5",
            text: "Anxiety symptoms and management",
            category: "general"
        }
    ];
}

/**
 * Parse markdown-style formatting in messages
 */
export function parseMessageLine(line: string): {
    type: 'heading' | 'bullet' | 'checkmark' | 'numbered' | 'text';
    content: string;
} {
    // Heading: **Text**
    if (line.startsWith('**') && line.endsWith('**')) {
        return {
            type: 'heading',
            content: line.replace(/\*\*/g, '')
        };
    }

    // Bullet point: • Text
    if (line.startsWith('•')) {
        return {
            type: 'bullet',
            content: line.substring(1).trim()
        };
    }

    // Checkmark: ✓ Text
    if (line.startsWith('✓')) {
        return {
            type: 'checkmark',
            content: line.substring(1).trim()
        };
    }

    // Numbered: 1. Text
    if (line.match(/^\d+\./)) {
        return {
            type: 'numbered',
            content: line.replace(/^\d+\./, '').trim()
        };
    }

    // Regular text
    return {
        type: 'text',
        content: line
    };
}

/**
 * Check if user is scrolled to bottom
 */
export function isScrolledToBottom(
    element: HTMLElement | null,
    threshold: number = 10
): boolean {
    if (!element) return true;

    const { scrollTop, scrollHeight, clientHeight } = element;
    return Math.abs(scrollHeight - scrollTop - clientHeight) < threshold;
}

/**
 * Scroll element to bottom smoothly
 */
export function scrollToBottom(element: HTMLElement | null): void {
    if (!element) return;

    setTimeout(() => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, 100);
}