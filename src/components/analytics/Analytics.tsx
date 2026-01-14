'use client';

import Script from 'next/script';

interface AnalyticsProps {
    gaId?: string;
}

/**
 * Google Analytics 4 component.
 * 
 * To enable, add NEXT_PUBLIC_GA_MEASUREMENT_ID to your .env.local file.
 * Get your Measurement ID from Google Analytics: https://analytics.google.com/
 * 
 * Example: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export function Analytics({ gaId }: AnalyticsProps) {
    const measurementId = gaId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!measurementId) {
        return null; // Analytics disabled - no measurement ID configured
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}

/**
 * Track custom events for analytics.
 * 
 * Usage:
 * import { trackEvent } from '@/components/analytics/Analytics';
 * trackEvent('button_click', { button_name: 'save_deal' });
 */
export function trackEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
    if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, parameters);
    }
}
