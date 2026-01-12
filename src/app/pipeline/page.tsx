'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DealCard } from '@/components/pipeline/DealCard';
import { KanbanColumn } from '@/components/pipeline/KanbanColumn';
import { Plus, Filter, Search } from 'lucide-react';
import { StrategyType } from '@/lib/types/deal';

// Mock pipeline data - in production this would come from Supabase
const mockPipelineData = {
    leads: [
        { id: '1', address: '42 Victoria Road', postcode: 'M14 5RB', price: 195000, roi: 18.2, strategy: 'HMO' as StrategyType },
        { id: '2', address: '88 Queens Drive', postcode: 'M20 6TX', price: 155000, roi: 12.5, strategy: 'BTL' as StrategyType },
        { id: '7', address: '17 Mill Lane', postcode: 'WA14 3EQ', price: 225000, roi: 14.8, strategy: 'BRRR' as StrategyType },
    ],
    viewing: [
        { id: '3', address: '15 Park Lane', postcode: 'LS6 2QE', price: 165000, roi: 15.1, strategy: 'BTL' as StrategyType },
    ],
    offer: [
        { id: '4', address: '8 Station Street', postcode: 'BN1 4DE', price: 285000, roi: 9.8, strategy: 'BRRR' as StrategyType },
        { id: '5', address: '23 High Street', postcode: 'BS1 2ND', price: 320000, roi: 11.2, strategy: 'HMO' as StrategyType },
    ],
    purchased: [
        { id: '6', address: '55 River Road', postcode: 'OX1 4TY', price: 275000, roi: 16.3, strategy: 'BRRR' as StrategyType },
    ],
    renting: [
        { id: '8', address: '12 Garden Close', postcode: 'B15 3PP', price: 180000, roi: 13.7, strategy: 'BTL' as StrategyType },
        { id: '9', address: '34 Oak Avenue', postcode: 'NG7 2HT', price: 145000, roi: 19.5, strategy: 'HMO' as StrategyType },
    ],
};

const columns = [
    { key: 'leads', title: 'Leads', color: 'bg-blue-500' },
    { key: 'viewing', title: 'Viewing', color: 'bg-yellow-500' },
    { key: 'offer', title: 'Offer Made', color: 'bg-orange-500' },
    { key: 'purchased', title: 'Purchased', color: 'bg-purple-500' },
    { key: 'renting', title: 'Renting', color: 'bg-emerald-500' },
];

export default function PipelinePage() {
    const [searchQuery, setSearchQuery] = useState('');

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
                    const deals = mockPipelineData[col.key as keyof typeof mockPipelineData];
                    const totalValue = deals.reduce((sum, d) => sum + d.price, 0);
                    return (
                        <div key={col.key} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                                <span className="text-xs text-slate-400">{col.title}</span>
                            </div>
                            <p className="text-lg font-bold text-white">£{(totalValue / 1000).toFixed(0)}k</p>
                            <p className="text-xs text-slate-500">{deals.length} deals</p>
                        </div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((col) => {
                    const deals = mockPipelineData[col.key as keyof typeof mockPipelineData];
                    const filteredDeals = searchQuery
                        ? deals.filter(d =>
                            d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            d.postcode.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        : deals;

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
                                    address={deal.address}
                                    postcode={deal.postcode}
                                    price={deal.price}
                                    roi={deal.roi}
                                    strategy={deal.strategy}
                                    status={col.key}
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
