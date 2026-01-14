'use client';

import { Deal, StrategyType } from '@/lib/types/deal';
import { Home, MapPin, TrendingUp, FileText } from 'lucide-react';
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

const strategyColors: Record<StrategyType, { bg: string; text: string; border: string }> = {
    BTL: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    BRRR: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    HMO: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    SA: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
    R2R: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    FLIP: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
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
    const colors = strategyColors[strategy] || strategyColors.BTL;

    return (
        <div
            onClick={onClick}
            className="group relative p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 backdrop-blur-sm cursor-pointer"
        >
            {/* Property Image (if available) */}
            {imageUrl && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-slate-800/50">
                    <img src={imageUrl} alt={address} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
            )}

            {/* Address */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                    <Home className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                    <p className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {address}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {postcode}
                    </p>
                </div>
            </div>

            {/* Price & ROI */}
            <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-800/50">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Price</p>
                    <p className="font-semibold text-white mt-0.5">£{price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">ROI</p>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                        <TrendingUp className={cn('w-3 h-3', roi > 10 ? 'text-emerald-400' : 'text-amber-400')} />
                        <p className={cn('font-bold', roi > 10 ? 'text-emerald-400' : 'text-amber-400')}>
                            {roi.toFixed(1)}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Strategy Badge & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                <span className={cn(
                    'px-2 py-1 rounded text-[10px] font-semibold border uppercase tracking-wide',
                    colors.bg,
                    colors.text,
                    colors.border
                )}>
                    {strategy}
                </span>

                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // Optional: navigate to specific action
                            window.location.href = `/packs?deal=${id}`;
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title="Generate Investor Pack"
                    >
                        <FileText className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Status Quick Move (Only show on hover or always if needed, currently styled to blend in) */}
            {onStatusChange && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-emerald-500/50 outline-none cursor-pointer"
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
