'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DealCard } from '@/components/pipeline/DealCard';
import { KanbanColumn } from '@/components/pipeline/KanbanColumn';
import { Plus, Filter, Search } from 'lucide-react';
import { StrategyType } from '@/lib/types/deal';

import { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getUserDeals, updateDeal, FirestoreDeal } from '@/lib/firestore/deals';
import { Deal } from '@/lib/types/deal';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PipelineData {
    [key: string]: Deal[];
}

const columns = [
    { key: 'leads', title: 'Leads', color: 'bg-blue-500' },
    { key: 'viewing', title: 'Viewing', color: 'bg-yellow-500' },
    { key: 'offer', title: 'Offer Made', color: 'bg-orange-500' },
    { key: 'purchased', title: 'Purchased', color: 'bg-purple-500' },
    { key: 'renting', title: 'Renting', color: 'bg-emerald-500' },
];

export default function PipelinePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [deals, setDeals] = useState<Deal[]>([]);

    useEffect(() => {
        async function loadDeals() {
            if (authLoading) return;

            if (user?.uid) {
                setLoading(true);
                const userDeals = await getUserDeals(user.uid);
                setDeals(userDeals);
            }
            setLoading(false);
        }
        loadDeals();
    }, [user, authLoading]);

    const handleStatusChange = async (dealId: string, newStatus: string) => {
        // Optimistic update
        setDeals(prev => prev.map(d =>
            d.id === dealId ? { ...d, pipelineStatus: newStatus } as any : d
        ));

        const success = await updateDeal(dealId, { pipelineStatus: newStatus as any });
        if (!success) {
            // Revert on failure
            const userDeals = await getUserDeals(user?.uid || '');
            setDeals(userDeals);
        }
    };

    // Group deals by status
    const pipelineData: PipelineData = {
        leads: [],
        viewing: [],
        offer: [],
        purchased: [],
        renting: []
    };

    deals.forEach(deal => {
        // @ts-ignore - pipelineStatus might not exist on old deals or be typed strictly
        const status = deal['pipelineStatus'] || 'leads';
        if (pipelineData[status]) {
            pipelineData[status].push(deal);
        } else {
            // Fallback for unknown statuses
            pipelineData['leads'].push(deal);
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
                    <p className="text-slate-400 mt-1">Track and manage your property deals</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search deals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <Link
                        href="/analyser"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-sm font-medium text-white hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add Deal
                    </Link>
                </div>
            </div>

            {/* Pipeline Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                {columns.map((col) => {
                    const colDeals = pipelineData[col.key] || [];
                    const totalValue = colDeals.reduce((sum, d) => sum + (d.property.askingPrice || 0), 0);
                    return (
                        <div key={col.key} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                                <span className="text-xs text-slate-400">{col.title}</span>
                            </div>
                            <p className="text-lg font-bold text-white">£{(totalValue / 1000).toFixed(0)}k</p>
                            <p className="text-xs text-slate-500">{colDeals.length} deals</p>
                        </div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((col) => {
                    const colDeals = pipelineData[col.key] || [];
                    const filteredDeals = searchQuery
                        ? colDeals.filter(d =>
                            d.property.address.line1.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            d.property.address.postcode.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : colDeals;

                    return (
                        <KanbanColumn
                            key={col.key}
                            title={col.title}
                            count={filteredDeals.length}
                            color={col.color}
                        >
                            {filteredDeals.map((deal) => (
                                <DealCard
                                    key={deal.id}
                                    id={deal.id}
                                    address={deal.property.address.line1}
                                    postcode={deal.property.address.postcode}
                                    price={deal.property.askingPrice}
                                    // Use the first active strategy's ROI or fallback
                                    roi={Object.values(deal.strategies).find(s => s.isActive)?.results.roi || 0}
                                    strategy={Object.values(deal.strategies).find(s => s.isActive)?.type as StrategyType || 'BTL'}
                                    status={col.key}
                                    onStatusChange={(newStatus) => handleStatusChange(deal.id, newStatus)}
                                    onClick={() => router.push(`/packs?deal=${deal.id}`)}
                                />
                            ))}
                            {filteredDeals.length === 0 && (
                                <div className="p-4 text-center text-slate-500 text-sm">
                                    No deals
                                </div>
                            )}
                        </KanbanColumn>
                    );
                })}
            </div>
        </div>
    );
}
