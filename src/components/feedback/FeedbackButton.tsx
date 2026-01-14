'use client';

import { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeedbackModal } from './FeedbackModal';

export function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
                size="icon"
                aria-label="Send feedback"
            >
                <MessageSquarePlus className="h-5 w-5" />
            </Button>

            <FeedbackModal open={isOpen} onOpenChange={setIsOpen} />
        </>
    );
}
