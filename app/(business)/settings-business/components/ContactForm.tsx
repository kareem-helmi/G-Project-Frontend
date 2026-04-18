"use client";
import React, { useState } from "react";
import { Send, X, Mail, User, MessageCircle } from "lucide-react";

export default function ContactForm({
    onSend
}: {
    onSend: (payload: { name: string; email: string; message: string }) => void;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const submit = () => {
        if (!message.trim()) {
            alert("Please write a message before sending.");
            return;
        }

        setSending(true);
        try {
            onSend({ name: name.trim(), email: email.trim(), message: message.trim() });
            // Clear form after sending
            setTimeout(() => {
                setName("");
                setEmail("");
                setMessage("");
                setSending(false);
            }, 1000);
        } catch (error) {
            setSending(false);
        }
    };

    const clear = () => {
        setName("");
        setEmail("");
        setMessage("");
    };

    const isFormValid = message.trim().length > 0;

    return (
        <div className="space-y-4">
            {/* Name Input */}
            <div>
                <label className="block text-sm font-medium text-bluelight-1 mb-1.5">
                    Your Name (Optional)
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bluelight-1/40" size={16} />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-bluelight-1/40 bg-white/50 dark:bg-transparent text-bluelight-1 placeholder-bluelight-1/40 focus:outline-none focus:border-bluelight-1"
                    />
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label className="block text-sm font-medium text-bluelight-1 mb-1.5">
                    Your Email (Optional)
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bluelight-1/40" size={16} />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        type="email"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-bluelight-1/40 bg-white/50 dark:bg-transparent text-bluelight-1 placeholder-bluelight-1/40 focus:outline-none focus:border-bluelight-1"
                    />
                </div>
            </div>

            {/* Message Input */}
            <div>
                <label className="block text-sm font-medium text-bluelight-1 mb-1.5">
                    Message *
                </label>
                <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 text-bluelight-1/40" size={16} />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Please describe your issue, suggestion, or feedback..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-bluelight-1/40 bg-white/50 dark:bg-transparent text-bluelight-1 placeholder-bluelight-1/40 focus:outline-none focus:border-bluelight-1 resize-none"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    onClick={clear}
                    disabled={!name && !email && !message}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all flex-1 ${name || email || message
                        ? 'border border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10'
                        : 'border border-bluelight-1/20 text-bluelight-1/40 cursor-not-allowed'
                        }`}
                >
                    <X size={16} />
                    Clear
                </button>

                <button
                    onClick={submit}
                    disabled={!isFormValid || sending}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium flex-1 ${isFormValid && !sending
                        ? "bg-bluelight-2 text-white hover:bg-bluelight-1 active:scale-95"
                        : "bg-bluelight-2/50 text-white/70 cursor-not-allowed"
                        }`}
                >
                    {sending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={16} />
                            Send Message
                        </>
                    )}
                </button>
            </div>

            {/* Footer Note */}
            <div className="pt-4 border-t border-bluelight-1/30">
                <p className="text-xs text-bluelight-1/60">
                    Or email the devs directly:{' '}
                    <a
                        href="mailto:devs@yourcompany.com"
                        className="text-bluelight-2 hover:underline"
                    >
                        devs@yourcompany.com
                    </a>
                </p>
            </div>
        </div>
    );
}