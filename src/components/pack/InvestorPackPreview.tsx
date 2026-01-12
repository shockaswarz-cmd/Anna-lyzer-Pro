'use client';

import { Deal, StrategyType, AnalysisResults } from '@/lib/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, Bed, Bath, Building2, TrendingUp, ShieldCheck, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvestorPackPreviewProps {
    deal: Deal;
    strategy: StrategyType;
    branding: {
        companyName: string;
        logoUrl?: string;
        primaryColor: string;
    };
}

export function InvestorPackPreview({ deal, strategy, branding }: InvestorPackPreviewProps) {
    const results = deal.strategies[strategy]?.results;
    const property = deal.property;

    return (
        <div className="bg-white text-slate-900 rounded-lg shadow-xl overflow-hidden max-w-[800px] mx-auto">
            {/* Cover Page */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
                {/* Branding Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        {branding.logoUrl ? (
                            <img src={branding.logoUrl} alt={branding.companyName} className="h-10" />
                        ) : (
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: branding.primaryColor }}
                            >
                                {branding.companyName.charAt(0)}
                            </div>
                        )}
                        <span className="font-semibold text-lg">{branding.companyName}</span>
                    </div>
                    <div className="text-right text-sm text-slate-400">
                        <p>Investment Analysis</p>
                        <p>{new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                </div>

                {/* Property Hero */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        {property.images?.[0] && (
                            <div className="aspect-video rounded-lg overflow-hidden bg-slate-700">
                                <img
                                    src={property.images[0]}
                                    alt={property.address.line1}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold mb-2">{property.address.line1}</h1>
                        <p className="text-slate-400 flex items-center gap-1 mb-4">
                            <MapPin className="w-4 h-4" />
                            {property.address.city} {property.address.postcode}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                                <Bed className="w-4 h-4" /> {property.bedrooms} beds
                            </span>
                            <span className="flex items-center gap-1">
                                <Bath className="w-4 h-4" /> {property.bathrooms} baths
                            </span>
                            <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" /> {property.propertyType}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics Section */}
            <div className="p-8 border-b">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" style={{ color: branding.primaryColor }} />
                    Executive Summary - {strategy} Strategy
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    <MetricBox
                        label="Asking Price"
                        value={`£${property.askingPrice.toLocaleString()}`}
                    />
                    <MetricBox
                        label="Total Cash Required"
                        value={`£${results?.totalCashRequired.toLocaleString() || '0'}`}
                    />
                    <MetricBox
                        label="Monthly Cashflow"
                        value={`£${results?.monthlyCashflow.toLocaleString() || '0'}`}
                        highlight={results && results.monthlyCashflow > 0}
                    />
                    <MetricBox
                        label="ROI"
                        value={`${results?.roi.toFixed(1) || '0'}%`}
                        highlight={results && results.roi > 10}
                    />
                </div>
            </div>

            {/* Financial Breakdown */}
            <div className="p-8 border-b">
                <h2 className="text-lg font-bold mb-4">Financial Breakdown</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 mb-3">ACQUISITION COSTS</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <FinanceRow label="Purchase Price" value={deal.strategies[strategy]?.assumptions.acquisition.purchasePrice || 0} />
                                <FinanceRow label="Stamp Duty (SDLT)" value={deal.strategies[strategy]?.assumptions.acquisition.stampDuty || 0} />
                                <FinanceRow label="Legal Fees" value={deal.strategies[strategy]?.assumptions.acquisition.legalFees || 0} />
                                <FinanceRow label="Refurbishment" value={deal.strategies[strategy]?.assumptions.acquisition.refurbishmentCost || 0} />
                                <FinanceRow label="Total Investment" value={results?.totalInvestment || 0} highlight />
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 mb-3">MONTHLY INCOME</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <FinanceRow label="Gross Monthly Rent" value={deal.strategies[strategy]?.assumptions.income.grossMonthlyRent || 0} />
                                <FinanceRow label="Management Fee" value={-(deal.strategies[strategy]?.assumptions.income.managementFeeMonthly || 0)} isNegative />
                                <FinanceRow label="Insurance" value={-(deal.strategies[strategy]?.assumptions.income.insuranceMonthly || 0)} isNegative />
                                <FinanceRow label="Maintenance" value={-(deal.strategies[strategy]?.assumptions.income.maintenanceMonthly || 0)} isNegative />
                                <FinanceRow label="Net Monthly Cashflow" value={results?.monthlyCashflow || 0} highlight />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 text-center text-xs text-slate-500">
                <p>This analysis is provided for informational purposes only. Past performance is not indicative of future results.</p>
                <p className="mt-1">Generated by {branding.companyName} using Anna Lyzer</p>
            </div>
        </div>
    );
}

function MetricBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={cn('p-4 rounded-lg', highlight ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50')}>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className={cn('text-xl font-bold', highlight ? 'text-emerald-600' : 'text-slate-900')}>{value}</p>
        </div>
    );
}

function FinanceRow({ label, value, highlight, isNegative }: { label: string; value: number; highlight?: boolean; isNegative?: boolean }) {
    return (
        <tr className={cn(highlight && 'font-semibold bg-slate-100')}>
            <td className="py-1.5 pr-4">{label}</td>
            <td className={cn('py-1.5 text-right', isNegative && 'text-red-600')}>
                {isNegative ? `-£${Math.abs(value).toLocaleString()}` : `£${value.toLocaleString()}`}
            </td>
        </tr>
    );
}
