'use client';

import { Deal, StrategyType } from '@/lib/types/deal';
import { Home, MapPin, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DealCardProps {
    id: string;
    address: string;
    postcode: string;
    price: number;
    roi: number;
    strategy: StrategyType;
    status: string;
    imageUrl?: string;
    onClick?: () => void;
    onStatusChange?: (newStatus: string) => void;
}

const strategyColors: Record<StrategyType, string> = {
    BTL: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    BRRR: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    HMO: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    SA: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    R2R: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    FLIP: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export function DealCard({
    id,
    address,
    postcode,
    price,
    roi,
    strategy,
    status,
    imageUrl,
    onClick,
    onStatusChange
}: DealCardProps) {
    return (
        <div
            onClick={onClick}
            className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800 transition-all cursor-pointer group"
        >
            {/* Property Image (if available) */}
            {imageUrl && (
                <div className="aspect-video rounded-md overflow-hidden mb-3 bg-slate-700">
                    <img src={imageUrl} alt={address} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Address */}
            <div className="flex items-start gap-2 mb-2">
                <Home className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-medium text-white text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {address}
                    </p>
                    <p className="text-xs text-slate-500">{postcode}</p>
                </div>
            </div>

            {/* Price & ROI */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
                <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="font-semibold text-white">£{price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">ROI</p>
                    <p className={cn('font-bold', roi > 10 ? 'text-emerald-400' : 'text-amber-400')}>
                        {roi.toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Strategy Badge */}
            <div className="flex items-center justify-between mt-3">
                <span className={cn(
                    'px-2 py-0.5 rounded text-xs font-medium border',
                    strategyColors[strategy]
                )}>
                    {strategy}
                </span>
                <TrendingUp className="w-3 h-3 text-slate-500" />
            </div>

            {/* Status Quick Move */}
            {onStatusChange && (
                <div onClick={(e) => e.stopPropagation()} className="mt-3 pt-3 border-t border-slate-700/50">
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500 outline-none"
                    >
                        <option value="leads">Leads</option>
                        <option value="viewing">Viewing</option>
                        <option value="offer">Offer Made</option>
                        <option value="purchased">Purchased</option>
                        <option value="renting">Renting</option>
                    </select>
                </div>
            )}
        </div>
    );
}
