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
            <div className="flex items-center justify-between p-3 mb-3">
                <div className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full', color)} />
                    <h3 className="font-semibold text-white text-sm">{title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-700 text-xs text-slate-300 font-medium">
                    {count}
                </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 space-y-3 p-2 rounded-lg bg-slate-900/50 border border-slate-800/50 min-h-[300px] overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
