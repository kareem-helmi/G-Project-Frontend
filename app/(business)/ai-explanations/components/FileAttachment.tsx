"use client";

import React from "react";
import { Paperclip, X } from "lucide-react";

interface FileAttachmentProps {
    file: File;
    onRemove: () => void;
}

export default function FileAttachment({ file, onRemove }: FileAttachmentProps) {
    return (
        <div className="mt-3 p-3 bg-bluelight-1/10 border border-bluelight-1/30 rounded-lg flex items-center justify-between animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 bg-bluelight-1/20 rounded-lg">
                    <Paperclip className="text-bluelight-1" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-bluelight-1 truncate">
                        {file.name}
                    </div>
                    <div className="text-xs text-bluelight-1/70">
                        {(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </div>
                </div>
            </div>
            <button
                onClick={onRemove}
                className="ml-2 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Remove attachment"
            >
                <X className="text-red-500" size={14} />
            </button>
        </div>
    );
}