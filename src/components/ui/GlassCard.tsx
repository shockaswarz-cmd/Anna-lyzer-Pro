'use client';

import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: 'none' | 'emerald' | 'purple' | 'cyan' | 'amber';
}

const gradientBorders = {
    none: '',
    emerald: 'hover:border-emerald-500/30',
    purple: 'hover:border-purple-500/30',
    cyan: 'hover:border-cyan-500/30',
    amber: 'hover:border-amber-500/30',
};

const gradientGlows = {
    none: '',
    emerald: 'hover:shadow-emerald-500/5',
    purple: 'hover:shadow-purple-500/5',
    cyan: 'hover:shadow-cyan-500/5',
    amber: 'hover:shadow-amber-500/5',
};

export function GlassCard({
    children,
    className,
    hover = true,
    gradient = 'emerald'
}: GlassCardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-xl',
                'transition-all duration-300',
                hover && [
                    'hover:bg-slate-800/50',
                    'hover:shadow-xl',
                    gradientBorders[gradient],
                    gradientGlows[gradient],
                ],
                className
            )}
        >
            {children}
        </div>
    );
}

// Header variant for section headers
export function GlassCardHeader({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('p-5 border-b border-slate-800/50', className)}>
            {children}
        </div>
    );
}

// Content variant
export function GlassCardContent({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('p-5', className)}>
            {children}
        </div>
    );
}

// Stat card variant for metrics
interface StatCardProps {
    label: string;
    value: React.ReactNode;
    subtext?: string;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        positive: boolean;
    };
    gradient?: 'emerald' | 'purple' | 'cyan' | 'amber';
}

export function StatCard({
    label,
    value,
    subtext,
    icon,
    trend,
    gradient = 'emerald'
}: StatCardProps) {
    const gradientColors = {
        emerald: 'from-emerald-500/20 to-cyan-500/20',
        purple: 'from-purple-500/20 to-pink-500/20',
        cyan: 'from-cyan-500/20 to-blue-500/20',
        amber: 'from-amber-500/20 to-orange-500/20',
    };

    const iconColors = {
        emerald: 'text-emerald-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400',
        amber: 'text-amber-400',
    };

    return (
        <GlassCard gradient={gradient} className="overflow-hidden">
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-medium text-slate-400">{label}</p>
                    {icon && (
                        <div className={cn(
                            'p-2 rounded-lg bg-gradient-to-br',
                            gradientColors[gradient]
                        )}>
                            <div className={iconColors[gradient]}>{icon}</div>
                        </div>
                    )}
                </div>
                <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-white">{value}</p>
                    {trend && (
                        <span className={cn(
                            'text-xs font-medium px-1.5 py-0.5 rounded',
                            trend.positive
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                        )}>
                            {trend.positive ? '+' : ''}{trend.value}%
                        </span>
                    )}
                </div>
                {subtext && (
                    <p className="text-xs text-slate-500 mt-1">{subtext}</p>
                )}
            </div>
        </GlassCard>
    );
}
