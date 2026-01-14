'use client';

import { useState } from 'react';
import { X, Send, Bug, Lightbulb, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitFeedback } from '@/lib/firestore/feedback';

interface FeedbackModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type FeedbackType = 'bug' | 'feature' | 'general';

const feedbackTypes: { value: FeedbackType; label: string; icon: typeof Bug }[] = [
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'general', label: 'General Feedback', icon: MessageCircle },
];

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
    const [type, setType] = useState<FeedbackType>('general');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        try {
            await submitFeedback({
                type,
                message,
                email: email || undefined,
                page: typeof window !== 'undefined' ? window.location.pathname : '',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            });
            setSubmitted(true);
            setTimeout(() => {
                onOpenChange(false);
                // Reset after animation
                setTimeout(() => {
                    setSubmitted(false);
                    setMessage('');
                    setEmail('');
                    setType('general');
                }, 300);
            }, 1500);
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white">Send Feedback</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                        className="text-slate-400 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {submitted ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Thank you!</h3>
                        <p className="text-slate-400">Your feedback has been submitted.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-4 space-y-4">
                        {/* Type Selection */}
                        <div>
                            <label className="text-sm font-medium text-slate-300 mb-2 block">Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                {feedbackTypes.map((ft) => {
                                    const Icon = ft.icon;
                                    return (
                                        <button
                                            key={ft.value}
                                            type="button"
                                            onClick={() => setType(ft.value)}
                                            className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${type === ft.value
                                                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                                    : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="text-xs">{ft.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="feedback-message" className="text-sm font-medium text-slate-300 mb-2 block">
                                Message
                            </label>
                            <textarea
                                id="feedback-message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us what's on your mind..."
                                className="w-full h-28 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                required
                            />
                        </div>

                        {/* Email (optional) */}
                        <div>
                            <label htmlFor="feedback-email" className="text-sm font-medium text-slate-300 mb-2 block">
                                Email <span className="text-slate-500">(optional)</span>
                            </label>
                            <input
                                id="feedback-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={!message.trim() || isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Send Feedback
                                </span>
                            )}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
