'use client';

import { Deal, StrategyType, AnalysisResults } from '@/lib/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Minus, Trophy, TrendingUp, Wallet, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StrategyComparisonProps {
    deal: Deal;
    onSelectStrategy: (type: StrategyType) => void;
}

const STRATEGY_LABELS: Record<StrategyType, { name: string; color: string }> = {
    BTL: { name: 'Buy-to-Let', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    BRRR: { name: 'BRRR', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    HMO: { name: 'HMO', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    SA: { name: 'Serviced Accom', color: 'bg-teal-100 text-teal-700 border-teal-200' },
    R2R: { name: 'Rent-to-Rent', color: 'bg-sky-100 text-sky-700 border-sky-200' },
    FLIP: { name: 'Flip', color: 'bg-rose-100 text-rose-700 border-rose-200' }
};

const ACTIVE_STRATEGIES: StrategyType[] = ['BTL', 'BRRR', 'HMO', 'R2R'];

function MetricCell({
    value,
    format,
    isHighlight,
    isBest
}: {
    value: number;
    format: 'currency' | 'percent' | 'months';
    isHighlight?: boolean;
    isBest?: boolean;
}) {
    const formattedValue = format === 'currency'
        ? `£${Math.round(value).toLocaleString()}`
        : format === 'percent'
            ? `${value.toFixed(1)}%`
            : `${Math.round(value)} mo`;

    const isPositive = value > 0;
    const isNegative = value < 0;

    return (
        <div className={cn(
            'text-center py-2 px-1 rounded transition-colors',
            isBest && 'bg-green-50 ring-2 ring-green-200',
            isHighlight && !isBest && 'bg-slate-50'
        )}>
            <span className={cn(
                'font-semibold',
                format === 'currency' && isPositive && 'text-green-600',
                format === 'currency' && isNegative && 'text-red-600',
                format === 'percent' && value > 10 && 'text-green-600',
                format === 'percent' && value < 5 && 'text-amber-600'
            )}>
                {formattedValue}
            </span>
            {isBest && <Trophy className="inline-block ml-1 h-3 w-3 text-green-600" />}
        </div>
    );
}

function findBestStrategy(
    strategies: Record<StrategyType, { results: AnalysisResults }>,
    metric: keyof AnalysisResults,
    invert: boolean = false
): StrategyType | null {
    let best: StrategyType | null = null;
    let bestValue = invert ? Infinity : -Infinity;

    for (const type of ACTIVE_STRATEGIES) {
        const value = strategies[type]?.results?.[metric] ?? 0;
        if (invert ? value < bestValue : value > bestValue) {
            bestValue = value;
            best = type;
        }
    }

    return bestValue !== 0 ? best : null;
}

export function StrategyComparison({ deal, onSelectStrategy }: StrategyComparisonProps) {
    const bestROI = findBestStrategy(deal.strategies, 'roi');
    const bestCashflow = findBestStrategy(deal.strategies, 'monthlyCashflow');
    const bestYield = findBestStrategy(deal.strategies, 'grossYield');
    const lowestCash = findBestStrategy(deal.strategies, 'totalCashRequired', true);

    const metrics = [
        { key: 'totalCashRequired' as keyof AnalysisResults, label: 'Cash Required', format: 'currency' as const, icon: Wallet, best: lowestCash },
        { key: 'monthlyCashflow' as keyof AnalysisResults, label: 'Monthly Cashflow', format: 'currency' as const, icon: TrendingUp, best: bestCashflow },
        { key: 'roi' as keyof AnalysisResults, label: 'ROI', format: 'percent' as const, icon: ArrowUpRight, best: bestROI },
        { key: 'grossYield' as keyof AnalysisResults, label: 'Gross Yield', format: 'percent' as const, icon: Trophy, best: bestYield },
        { key: 'paybackMonths' as keyof AnalysisResults, label: 'Payback', format: 'months' as const, icon: Clock, best: null },
    ];

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Strategy Comparison
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                        Click to select strategy
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 px-2 font-medium text-muted-foreground w-32">Metric</th>
                                {ACTIVE_STRATEGIES.map((type) => (
                                    <th
                                        key={type}
                                        className="text-center py-2 px-2 cursor-pointer hover:bg-slate-50 transition-colors"
                                        onClick={() => onSelectStrategy(type)}
                                    >
                                        <Badge
                                            variant="outline"
                                            className={cn('text-xs', STRATEGY_LABELS[type].color)}
                                        >
                                            {STRATEGY_LABELS[type].name}
                                        </Badge>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((metric, idx) => (
                                <tr key={metric.key} className={cn('border-b last:border-0', idx % 2 === 0 && 'bg-slate-50/50')}>
                                    <td className="py-2 px-2 font-medium text-muted-foreground flex items-center gap-1">
                                        <metric.icon className="h-3 w-3" />
                                        {metric.label}
                                    </td>
                                    {ACTIVE_STRATEGIES.map((type) => (
                                        <td key={type} className="py-1">
                                            <MetricCell
                                                value={deal.strategies[type]?.results?.[metric.key] ?? 0}
                                                format={metric.format}
                                                isBest={metric.best === type}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recommendation */}
                {bestROI && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-green-800">
                                Best ROI: <strong>{STRATEGY_LABELS[bestROI].name}</strong> at {deal.strategies[bestROI].results.roi.toFixed(1)}%
                            </p>
                            <p className="text-xs text-green-600">
                                Monthly cashflow: £{deal.strategies[bestROI].results.monthlyCashflow.toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
