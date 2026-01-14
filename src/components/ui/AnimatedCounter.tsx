'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    value,
    prefix = '',
    suffix = '',
    decimals = 0,
    duration = 1500,
    className,
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const startTime = useRef<number | null>(null);
    const animationFrame = useRef<number | null>(null);

    useEffect(() => {
        startTime.current = null;

        const animate = (timestamp: number) => {
            if (!startTime.current) {
                startTime.current = timestamp;
            }

            const progress = Math.min((timestamp - startTime.current) / duration, 1);

            // Easing function (ease-out-expo)
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentValue = easeOutExpo * value;
            setDisplayValue(currentValue);

            if (progress < 1) {
                animationFrame.current = requestAnimationFrame(animate);
            }
        };

        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [value, duration]);

    const formattedValue = displayValue.toLocaleString('en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return (
        <span className={cn('tabular-nums', className)}>
            {prefix}{formattedValue}{suffix}
        </span>
    );
}

// Currency variant
interface AnimatedCurrencyProps {
    value: number;
    currency?: string;
    compact?: boolean;
    className?: string;
}

export function AnimatedCurrency({
    value,
    currency = '£',
    compact = false,
    className,
}: AnimatedCurrencyProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const startTime = useRef<number | null>(null);
    const animationFrame = useRef<number | null>(null);

    useEffect(() => {
        startTime.current = null;

        const animate = (timestamp: number) => {
            if (!startTime.current) {
                startTime.current = timestamp;
            }

            const progress = Math.min((timestamp - startTime.current) / 1500, 1);
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setDisplayValue(easeOutExpo * value);

            if (progress < 1) {
                animationFrame.current = requestAnimationFrame(animate);
            }
        };

        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [value]);

    const formatValue = (val: number) => {
        if (compact) {
            if (val >= 1000000) {
                return `${(val / 1000000).toFixed(2)}M`;
            } else if (val >= 1000) {
                return `${(val / 1000).toFixed(0)}K`;
            }
        }
        return val.toLocaleString('en-GB', { maximumFractionDigits: 0 });
    };

    return (
        <span className={cn('tabular-nums', className)}>
            {currency}{formatValue(displayValue)}
        </span>
    );
}

// Percentage variant
interface AnimatedPercentageProps {
    value: number;
    decimals?: number;
    className?: string;
}

export function AnimatedPercentage({
    value,
    decimals = 1,
    className,
}: AnimatedPercentageProps) {
    return (
        <AnimatedCounter
            value={value}
            suffix="%"
            decimals={decimals}
            className={className}
        />
    );
}
