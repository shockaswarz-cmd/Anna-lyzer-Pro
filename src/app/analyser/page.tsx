'use client';

import { useState } from 'react';
import { DealInput, ManualPropertyData } from '@/components/deal/DealInput';
import { scrapeDeal, createDealFromManual } from '@/lib/scraper/service';
import { Deal, StrategyType } from '@/lib/types/deal';
import { calculateMetrics } from '@/lib/calculators/calculator';
import { AcquisitionCostsParams } from '@/components/strategies/AcquisitionCostsParams';
import { MortgageParams } from '@/components/strategies/MortgageParams';
import { IncomeParams } from '@/components/strategies/IncomeParams';
import { HMOParams } from '@/components/strategies/HMOParams';
import { BRRRParams, BRRRValues } from '@/components/strategies/BRRRParams';
import { StrategySummary } from '@/components/strategies/StrategySummary';
import { StrategyComparison } from '@/components/strategies/StrategyComparison';
import { RiskPanel } from '@/components/deal/RiskPanel';
import { assessDealRisk } from '@/lib/risk/assessment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, MapPin, Bed, Bath, Building2, Save, Loader2, Ruler, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { DealGallery } from '@/components/deal/DealGallery';
import { saveDeal } from '@/lib/firestore/deals';
import { useAuth } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function AnalyserPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [deal, setDeal] = useState<Deal | null>(null);
    const [activeStrategy, setActiveStrategy] = useState<StrategyType>('BTL');
    const [error, setError] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleAnalyze = async (url: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await scrapeDeal(url);
            setDeal(result);
            if (result.strategies.R2R.isActive) {
                setActiveStrategy('R2R');
            }
        } catch (err: any) {
            console.error('Failed to analyze:', err);
            setError(err.message || 'Failed to analyze the property. Try Manual Entry instead.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleManualEntry = (data: ManualPropertyData) => {
        setError(null);
        const result = createDealFromManual(data);
        setDeal(result);
        if (data.transactionType === 'rent') {
            setActiveStrategy('R2R');
        }
    };

    const handleSaveDeal = async () => {
        if (!user) {
            alert('Please login to save deals');
            return;
        }
        if (!deal) return;

        setIsSaving(true);
        try {
            const dealId = await saveDeal(user.uid, deal);
            if (dealId) {
                setDeal(prev => prev ? { ...prev, id: dealId } : null);
                const choice = window.confirm(
                    'Deal saved successfully!\n\nClick OK to generate an Investor Pack.\nClick Cancel to go to your Pipeline.'
                );
                if (choice) {
                    router.push(`/packs?deal=${dealId}&strategy=${activeStrategy}`);
                } else {
                    router.push('/pipeline');
                }
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            console.error('Error saving deal:', error);
            alert('Failed to save deal. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCostChange = (newCosts: any) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = { ...prev, strategies: { ...prev.strategies, [activeStrategy]: { ...prev.strategies[activeStrategy], assumptions: { ...prev.strategies[activeStrategy].assumptions, acquisition: newCosts } } } };
            const strat = updated.strategies[activeStrategy];
            strat.results = calculateMetrics(strat.assumptions.acquisition, strat.assumptions.mortgage, strat.assumptions.income);
            return updated;
        });
    };

    const handleMortgageChange = (newMortgage: any) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = { ...prev, strategies: { ...prev.strategies, [activeStrategy]: { ...prev.strategies[activeStrategy], assumptions: { ...prev.strategies[activeStrategy].assumptions, mortgage: newMortgage } } } };
            const strat = updated.strategies[activeStrategy];
            strat.results = calculateMetrics(strat.assumptions.acquisition, strat.assumptions.mortgage, strat.assumptions.income);
            return updated;
        });
    };

    const handleIncomeChange = (newIncome: any) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = { ...prev, strategies: { ...prev.strategies, [activeStrategy]: { ...prev.strategies[activeStrategy], assumptions: { ...prev.strategies[activeStrategy].assumptions, income: newIncome } } } };
            const strat = updated.strategies[activeStrategy];
            strat.results = calculateMetrics(strat.assumptions.acquisition, strat.assumptions.mortgage, strat.assumptions.income);
            return updated;
        });
    };

    const handleHMORoomsChange = (totalRent: number) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = { ...prev, strategies: { ...prev.strategies, HMO: { ...prev.strategies.HMO, assumptions: { ...prev.strategies.HMO.assumptions, income: { ...prev.strategies.HMO.assumptions.income, grossMonthlyRent: totalRent } } } } };
            const strat = updated.strategies.HMO;
            strat.results = calculateMetrics(strat.assumptions.acquisition, strat.assumptions.mortgage, strat.assumptions.income);
            return updated;
        });
    };

    const activateStrategy = (type: StrategyType) => {
        setActiveStrategy(type);
    }

    // Helper to truncate description
    const truncatedDescription = deal?.property.description?.slice(0, 300) || '';
    const hasLongDescription = (deal?.property.description?.length || 0) > 300;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {!deal ? (
                <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 px-4">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            Anna Lyzer
                        </h1>
                        <p className="text-xl text-slate-400 max-w-[600px] mx-auto">
                            Professional deal sourcing logic. Analyze purchases or R2R opportunities.
                        </p>
                    </div>
                    <DealInput onAnalyze={handleAnalyze} onManualEntry={handleManualEntry} isLoading={isLoading} />
                    {error && (
                        <div className="w-full max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                </div>
            ) : (
                // SINGLE UNIFIED SCROLL CONTAINER
                <div className="h-screen overflow-y-auto custom-scrollbar">
                    {/* ===== TOP SECTION: CONTEXT ===== */}
                    <div className="border-b border-slate-800 bg-slate-900/30">
                        <div className="flex flex-col xl:flex-row">
                            {/* Left: Gallery */}
                            <div className="xl:w-[30%] p-3 border-b xl:border-b-0 xl:border-r border-slate-800">
                                <DealGallery
                                    images={deal.property.images}
                                    title={deal.property.address.line1}
                                    className="h-[250px] xl:h-[300px]"
                                />
                            </div>

                            {/* Right: Property Details */}
                            <div className="xl:w-[70%] flex flex-col p-4">
                                {/* Header Row */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{deal.property.address.line1}</h2>
                                        <p className="text-slate-400 flex items-center gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-emerald-500" />
                                            {deal.property.address.city}, {deal.property.address.postcode}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={handleSaveDeal}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-all font-medium text-xs disabled:opacity-50"
                                        >
                                            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                            Save Deal
                                        </button>
                                        <button onClick={() => setDeal(null)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors border border-slate-700 rounded-lg hover:border-slate-500">
                                            New Search
                                        </button>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                    <MetricCard icon={Home} label="Price" value={`£${deal.property.askingPrice.toLocaleString()}`} color="text-emerald-400" />
                                    <MetricCard icon={Bed} label="Beds" value={deal.property.bedrooms} color="text-purple-400" />
                                    <MetricCard icon={Bath} label="Baths" value={deal.property.bathrooms} color="text-amber-400" />
                                    <MetricCard icon={Building2} label="Type" value={deal.property.propertyType} color="text-cyan-400" />
                                    {deal.property.size && (
                                        <MetricCard icon={Ruler} label="Size" value={`${deal.property.size} ${deal.property.sizeUnit}`} color="text-pink-400" />
                                    )}
                                </div>

                                {/* Description - Collapsible, not sticky */}
                                {deal.property.description && (
                                    <div className="p-3 bg-slate-950/30 rounded-lg border border-slate-800/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                                <FileText className="w-3 h-3 text-slate-500" /> Property Description
                                            </h4>
                                            {hasLongDescription && (
                                                <button
                                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                                                >
                                                    {showFullDescription ? <><ChevronUp className="w-3 h-3" /> Less</> : <><ChevronDown className="w-3 h-3" /> More</>}
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">
                                            {showFullDescription ? deal.property.description : truncatedDescription}
                                            {!showFullDescription && hasLongDescription && '...'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== BOTTOM SECTION: ANALYSIS ===== */}
                    <div className="flex flex-col xl:flex-row min-h-[60vh] bg-slate-950">
                        {/* INPUTS (Left) */}
                        <div className="xl:w-[60%] border-b xl:border-b-0 xl:border-r border-slate-800">
                            <Tabs value={activeStrategy} onValueChange={(v) => activateStrategy(v as StrategyType)} className="h-full flex flex-col">
                                <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/20 sticky top-0 z-10 backdrop-blur-md">
                                    <TabsList className="grid grid-cols-4 w-full max-w-md">
                                        <TabsTrigger value="BTL">Buy to Let</TabsTrigger>
                                        <TabsTrigger value="BRRR">BRRR</TabsTrigger>
                                        <TabsTrigger value="HMO">HMO</TabsTrigger>
                                        <TabsTrigger value="R2R">Rent to Rent</TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="p-4">
                                    <TabsContent value="BTL" className="space-y-6 mt-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-6">
                                                <AcquisitionCostsParams data={deal.strategies.BTL.assumptions.acquisition} onChange={handleCostChange} />
                                                <MortgageParams data={deal.strategies.BTL.assumptions.mortgage} acquisition={deal.strategies.BTL.assumptions.acquisition} onChange={handleMortgageChange} />
                                            </div>
                                            <div>
                                                <IncomeParams data={deal.strategies.BTL.assumptions.income} isR2R={false} onChange={handleIncomeChange} />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="BRRR" className="space-y-6 mt-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-6">
                                                <AcquisitionCostsParams data={deal.strategies.BRRR.assumptions.acquisition} onChange={handleCostChange} />
                                                <BRRRParams purchasePrice={deal.strategies.BRRR.assumptions.acquisition.purchasePrice} refurbCost={deal.strategies.BRRR.assumptions.acquisition.refurbishmentCost} onBRRRChange={() => { }} />
                                                <MortgageParams data={deal.strategies.BRRR.assumptions.mortgage} acquisition={deal.strategies.BRRR.assumptions.acquisition} onChange={handleMortgageChange} />
                                            </div>
                                            <div>
                                                <IncomeParams data={deal.strategies.BRRR.assumptions.income} isR2R={false} onChange={handleIncomeChange} />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="HMO" className="space-y-6 mt-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-6">
                                                <AcquisitionCostsParams data={deal.strategies.HMO.assumptions.acquisition} onChange={handleCostChange} />
                                                <HMOParams bedrooms={deal.property.bedrooms} onRoomsChange={handleHMORoomsChange} />
                                                <MortgageParams data={deal.strategies.HMO.assumptions.mortgage} acquisition={deal.strategies.HMO.assumptions.acquisition} onChange={handleMortgageChange} />
                                            </div>
                                            <div>
                                                <IncomeParams data={deal.strategies.HMO.assumptions.income} isR2R={false} onChange={handleIncomeChange} />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="R2R" className="space-y-6 mt-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-6">
                                                <AcquisitionCostsParams data={deal.strategies.R2R.assumptions.acquisition} onChange={handleCostChange} />
                                                <div className="p-3 text-xs text-sky-400 bg-sky-950/20 border border-sky-900 rounded">
                                                    R2R Analysis uses Monthly Rent to Owner instead of Purchase Price.
                                                </div>
                                            </div>
                                            <div>
                                                <IncomeParams data={deal.strategies.R2R.assumptions.income} isR2R={true} onChange={handleIncomeChange} />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>

                        {/* RESULTS (Right) */}
                        <div className="xl:w-[40%] p-4 space-y-4 bg-slate-900/10">
                            <StrategySummary
                                results={deal.strategies[activeStrategy]?.results || deal.strategies.BTL.results}
                                title={activeStrategy}
                            />
                            <StrategyComparison
                                deal={deal}
                                onSelectStrategy={(type) => setActiveStrategy(type)}
                            />
                            <RiskPanel
                                assessment={assessDealRisk(
                                    deal.property,
                                    deal.strategies[activeStrategy].assumptions.acquisition,
                                    deal.strategies[activeStrategy].assumptions.income,
                                    deal.strategies[activeStrategy].assumptions.mortgage
                                )}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: any, color: string }) {
    return (
        <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800/50 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">
                <Icon className={`w-3 h-3 ${color}`} />
                {label}
            </div>
            <div className="text-sm font-bold text-white truncate max-w-full px-1">
                {value ?? '-'}
            </div>
        </div>
    );
}
