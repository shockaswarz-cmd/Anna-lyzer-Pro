'use client';

import Link from 'next/link';
import {
    BarChart3,
    Home,
    TrendingUp,
    PiggyBank,
    AlertTriangle,
    ArrowRight,
    Building2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for dashboard - in production this would come from Supabase
const mockPortfolioStats = {
    totalDeals: 12,
    totalValue: 2450000,
    avgRoi: 14.2,
    avgCashflow: 485,
    topStrategy: 'HMO',
    activeRisks: 3
};

const mockRecentDeals = [
    { id: '1', address: '42 Victoria Road, Manchester', postcode: 'M14 5RB', price: 195000, roi: 18.2, strategy: 'HMO', status: 'analyzing' },
    { id: '2', address: '15 Park Lane, Leeds', postcode: 'LS6 2QE', price: 165000, roi: 15.1, strategy: 'BTL', status: 'offer_made' },
    { id: '3', address: '8 Station Street, Brighton', postcode: 'BN1 4DE', price: 285000, roi: 9.8, strategy: 'BRRR', status: 'purchased' },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Navigation Header */}
            <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Anna Lyzer
                        </h1>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium text-emerald-400">Dashboard</Link>
                            <Link href="/analyser" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Analyser</Link>
                            <Link href="/pipeline" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pipeline</Link>
                            <Link href="/settings" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Settings</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900">
                            MA
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 space-y-8">
                {/* Page Title */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Portfolio Dashboard</h2>
                        <p className="text-slate-400 mt-1">Track your property investments at a glance</p>
                    </div>
                    <Link
                        href="/analyser"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-sm font-medium text-white hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        <span>Analyze New Deal</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Deals</CardTitle>
                            <Building2 className="w-4 h-4 text-emerald-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">{mockPortfolioStats.totalDeals}</div>
                            <p className="text-xs text-slate-500 mt-1">Active properties</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Portfolio Value</CardTitle>
                            <PiggyBank className="w-4 h-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">£{(mockPortfolioStats.totalValue / 1000000).toFixed(2)}M</div>
                            <p className="text-xs text-slate-500 mt-1">Combined asset value</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Average ROI</CardTitle>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">{mockPortfolioStats.avgRoi}%</div>
                            <p className="text-xs text-slate-500 mt-1">Across all strategies</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Avg Monthly Cashflow</CardTitle>
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">£{mockPortfolioStats.avgCashflow}</div>
                            <p className="text-xs text-slate-500 mt-1">Per property</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Deals & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Deals Table */}
                    <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Deals</CardTitle>
                            <CardDescription className="text-slate-400">Your latest property analyses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockRecentDeals.map((deal) => (
                                    <div
                                        key={deal.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                                <Home className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{deal.address}</p>
                                                <p className="text-xs text-slate-400">{deal.postcode}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-white">£{deal.price.toLocaleString()}</p>
                                                <p className="text-xs text-slate-400">{deal.strategy}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-emerald-400">{deal.roi}% ROI</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${deal.status === 'purchased' ? 'bg-green-500/20 text-green-400' :
                                                    deal.status === 'offer_made' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {deal.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions & Alerts */}
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Alerts</CardTitle>
                            <CardDescription className="text-slate-400">Items requiring attention</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Article 4 Alert</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    42 Victoria Road is in an Article 4 area. Check HMO planning requirements.
                                </p>
                            </div>

                            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Strategy Suggestion</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    15 Park Lane shows 23% higher ROI with HMO strategy vs BTL.
                                </p>
                            </div>

                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                    <PiggyBank className="w-4 h-4" />
                                    <span>Milestone</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    Portfolio exceeded £2M total value! 🎉
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Strategy Distribution */}
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Strategy Distribution</CardTitle>
                        <CardDescription className="text-slate-400">Portfolio breakdown by investment strategy</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-4 rounded-full bg-slate-700 overflow-hidden flex">
                                <div className="bg-emerald-500 w-[40%]" title="HMO" />
                                <div className="bg-cyan-500 w-[30%]" title="BTL" />
                                <div className="bg-purple-500 w-[20%]" title="BRRR" />
                                <div className="bg-yellow-500 w-[10%]" title="R2R" />
                            </div>
                        </div>
                        <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-xs text-slate-400">HMO (40%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                <span className="text-xs text-slate-400">BTL (30%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                                <span className="text-xs text-slate-400">BRRR (20%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="text-xs text-slate-400">R2R (10%)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
