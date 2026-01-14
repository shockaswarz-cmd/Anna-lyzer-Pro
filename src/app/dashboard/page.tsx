'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    Home,
    TrendingUp,
    PiggyBank,
    AlertTriangle,
    ArrowRight,
    Building2,
    FileText,
    Loader2,
    Sparkles
} from 'lucide-react';
import { GlassCard, GlassCardHeader, GlassCardContent, StatCard } from '@/components/ui/GlassCard';
import { AnimatedCurrency, AnimatedPercentage, AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useAuth } from '@/components/auth/AuthContext';
import { getUserDeals } from '@/lib/firestore/deals';
import { Deal, StrategyType } from '@/lib/types/deal';
import { cn } from '@/lib/utils';

interface PortfolioStats {
    totalDeals: number;
    totalValue: number;
    avgRoi: number;
    avgCashflow: number;
    strategyBreakdown: Record<string, number>;
}

function calculatePortfolioStats(deals: Deal[]): PortfolioStats {
    if (deals.length === 0) {
        return {
            totalDeals: 0,
            totalValue: 0,
            avgRoi: 0,
            avgCashflow: 0,
            strategyBreakdown: {},
        };
    }

    let totalValue = 0;
    let totalRoi = 0;
    let totalCashflow = 0;
    const strategyCount: Record<string, number> = {};

    deals.forEach((deal) => {
        totalValue += deal.property.askingPrice;

        // Find active strategy
        const activeStrategy = Object.values(deal.strategies).find(s => s.isActive);
        if (activeStrategy) {
            totalRoi += activeStrategy.results?.roi || 0;
            totalCashflow += activeStrategy.results?.monthlyCashflow || 0;
            strategyCount[activeStrategy.type] = (strategyCount[activeStrategy.type] || 0) + 1;
        }
    });

    return {
        totalDeals: deals.length,
        totalValue,
        avgRoi: totalRoi / deals.length,
        avgCashflow: totalCashflow / deals.length,
        strategyBreakdown: strategyCount,
    };
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<PortfolioStats | null>(null);

    useEffect(() => {
        async function fetchDeals() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                const userDeals = await getUserDeals(user.uid);
                setDeals(userDeals);
                setStats(calculatePortfolioStats(userDeals));
            } catch (error) {
                console.error('Failed to fetch deals:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDeals();
    }, [user]);

    // Strategy colors for chart
    const strategyColors: Record<string, { bg: string; text: string }> = {
        BTL: { bg: 'bg-cyan-500', text: 'text-cyan-400' },
        HMO: { bg: 'bg-emerald-500', text: 'text-emerald-400' },
        BRRR: { bg: 'bg-purple-500', text: 'text-purple-400' },
        R2R: { bg: 'bg-amber-500', text: 'text-amber-400' },
        SA: { bg: 'bg-pink-500', text: 'text-pink-400' },
        FLIP: { bg: 'bg-rose-500', text: 'text-rose-400' },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Page Header */}
            <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
                            <p className="text-sm text-slate-400 mt-0.5">Track your property investments at a glance</p>
                        </div>
                        <Link
                            href="/analyser"
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-sm font-semibold text-white hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Analyze New Deal</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="px-6 lg:px-8 py-8 space-y-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <StatCard
                                label="Total Deals"
                                value={<AnimatedCounter value={stats?.totalDeals || 0} />}
                                subtext="Active properties"
                                icon={<Building2 className="w-5 h-5" />}
                                gradient="emerald"
                            />
                            <StatCard
                                label="Portfolio Value"
                                value={<AnimatedCurrency value={stats?.totalValue || 0} compact />}
                                subtext="Combined asset value"
                                icon={<PiggyBank className="w-5 h-5" />}
                                gradient="cyan"
                            />
                            <StatCard
                                label="Average ROI"
                                value={<AnimatedPercentage value={stats?.avgRoi || 0} />}
                                subtext="Across all strategies"
                                icon={<TrendingUp className="w-5 h-5" />}
                                trend={stats && stats.avgRoi > 0 ? { value: 2.3, positive: true } : undefined}
                                gradient="purple"
                            />
                            <StatCard
                                label="Avg Monthly Cashflow"
                                value={<AnimatedCurrency value={stats?.avgCashflow || 0} />}
                                subtext="Per property"
                                icon={<BarChart3 className="w-5 h-5" />}
                                gradient="amber"
                            />
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Deals */}
                            <GlassCard className="lg:col-span-2">
                                <GlassCardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Recent Deals</h2>
                                            <p className="text-sm text-slate-400">Your latest property analyses</p>
                                        </div>
                                        <Link
                                            href="/pipeline"
                                            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                                        >
                                            View all →
                                        </Link>
                                    </div>
                                </GlassCardHeader>
                                <GlassCardContent className="p-0">
                                    {deals.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <Home className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                                            <p className="text-slate-400">No deals yet</p>
                                            <p className="text-sm text-slate-500 mt-1">Analyze your first property to get started</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-slate-800/50">
                                            {deals.slice(0, 5).map((deal) => {
                                                const activeStrategy = Object.values(deal.strategies).find(s => s.isActive);
                                                const roi = activeStrategy?.results?.roi || 0;

                                                return (
                                                    <Link
                                                        key={deal.id}
                                                        href={`/packs?deal=${deal.id}`}
                                                        className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-colors">
                                                                <Home className="w-5 h-5 text-emerald-400" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                                                                    {deal.property.address.line1}
                                                                </p>
                                                                <p className="text-xs text-slate-500">{deal.property.address.postcode}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <div className="text-right">
                                                                <p className="text-sm font-semibold text-white">
                                                                    £{deal.property.askingPrice.toLocaleString()}
                                                                </p>
                                                                <span className={cn(
                                                                    'text-xs px-2 py-0.5 rounded-full',
                                                                    strategyColors[activeStrategy?.type || 'BTL']?.bg + '/20',
                                                                    strategyColors[activeStrategy?.type || 'BTL']?.text
                                                                )}>
                                                                    {activeStrategy?.type || 'BTL'}
                                                                </span>
                                                            </div>
                                                            <div className="text-right min-w-[70px]">
                                                                <p className={cn(
                                                                    'text-sm font-bold',
                                                                    roi >= 10 ? 'text-emerald-400' : roi >= 5 ? 'text-amber-400' : 'text-slate-400'
                                                                )}>
                                                                    {roi.toFixed(1)}% ROI
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </GlassCardContent>
                            </GlassCard>

                            {/* Strategy Distribution & Actions */}
                            <div className="space-y-6">
                                {/* Strategy Breakdown */}
                                <GlassCard>
                                    <GlassCardHeader>
                                        <h2 className="text-lg font-semibold text-white">Strategy Mix</h2>
                                        <p className="text-sm text-slate-400">Portfolio breakdown</p>
                                    </GlassCardHeader>
                                    <GlassCardContent>
                                        {stats && Object.keys(stats.strategyBreakdown).length > 0 ? (
                                            <>
                                                <div className="h-3 rounded-full bg-slate-800 overflow-hidden flex">
                                                    {Object.entries(stats.strategyBreakdown).map(([strategy, count]) => {
                                                        const percentage = (count / stats.totalDeals) * 100;
                                                        return (
                                                            <div
                                                                key={strategy}
                                                                className={cn('h-full', strategyColors[strategy]?.bg)}
                                                                style={{ width: `${percentage}%` }}
                                                                title={`${strategy}: ${count} deals`}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <div className="flex flex-wrap gap-3 mt-4">
                                                    {Object.entries(stats.strategyBreakdown).map(([strategy, count]) => {
                                                        const percentage = Math.round((count / stats.totalDeals) * 100);
                                                        return (
                                                            <div key={strategy} className="flex items-center gap-1.5">
                                                                <div className={cn('w-2.5 h-2.5 rounded-full', strategyColors[strategy]?.bg)} />
                                                                <span className="text-xs text-slate-400">{strategy} ({percentage}%)</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-sm text-slate-500 text-center py-4">No data yet</p>
                                        )}
                                    </GlassCardContent>
                                </GlassCard>

                                {/* Quick Actions */}
                                <GlassCard>
                                    <GlassCardHeader>
                                        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
                                    </GlassCardHeader>
                                    <GlassCardContent className="space-y-2">
                                        <Link
                                            href="/analyser"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            <span className="font-medium">Analyze New Property</span>
                                        </Link>
                                        <Link
                                            href="/pipeline"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                                        >
                                            <Building2 className="w-5 h-5" />
                                            <span className="font-medium">View Full Pipeline</span>
                                        </Link>
                                        <Link
                                            href="/packs"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors"
                                        >
                                            <FileText className="w-5 h-5" />
                                            <span className="font-medium">Generate Investor Pack</span>
                                        </Link>
                                    </GlassCardContent>
                                </GlassCard>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
