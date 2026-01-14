'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
    title: string;
    count: number;
    color: string;
    children: ReactNode;
}

export function KanbanColumn({ title, count, color, children }: KanbanColumnProps) {
    return (
        <div className="flex-1 min-w-[280px] flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between p-3.5 mb-3 bg-slate-900/40 border border-slate-800/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                    <div className={cn('w-2.5 h-2.5 rounded-full shadow-[0_0_8px] shadow-current', color.replace('bg-', 'text-'))} />
                    <h3 className="font-semibold text-white text-sm tracking-tight">{title}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-800/50 border border-slate-700/50 text-[11px] font-bold text-slate-400">
                    {count}
                </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 space-y-3 p-2 rounded-xl bg-slate-950/30 border border-slate-800/30 min-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {children}
            </div>
        </div>
    );
}
