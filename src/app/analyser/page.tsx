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
import { Home, MapPin, Bed, Bath, Building2, Save, Loader2 } from 'lucide-react';
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
                // Update deal with the saved ID for navigation
                setDeal(prev => prev ? { ...prev, id: dealId } : null);

                // Offer navigation options
                const choice = window.confirm(
                    'Deal saved successfully!\n\n' +
                    'Click OK to generate an Investor Pack for this deal.\n' +
                    'Click Cancel to go to your Pipeline.'
                );

                if (choice) {
                    // Go to Investor Pack with deal ID and active strategy
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
            const updated = {
                ...prev,
                strategies: {
                    ...prev.strategies,
                    [activeStrategy]: {
                        ...prev.strategies[activeStrategy],
                        assumptions: {
                            ...prev.strategies[activeStrategy].assumptions,
                            acquisition: newCosts
                        }
                    }
                }
            };

            const strat = updated.strategies[activeStrategy];
            strat.results = calculateMetrics(
                strat.assumptions.acquisition,
                strat.assumptions.mortgage,
                strat.assumptions.income
            );

            return updated;
        });
    };

    const handleMortgageChange = (newMortgage: any) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = {
                ...prev,
                strategies: {
                    ...prev.strategies,
                    [activeStrategy]: {
                        ...prev.strategies[activeStrategy],
                        assumptions: {
                            ...prev.strategies[activeStrategy].assumptions,
                            mortgage: newMortgage
                        }
                    }
                }
            };
            const strat = updated.strategies[activeStrategy];
            strat.results = calculateMetrics(
                strat.assumptions.acquisition,
                strat.assumptions.mortgage,
                strat.assumptions.income
            );
            return updated;
        });
    };

    const handleIncomeChange = (newIncome: any) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = {
                ...prev,
                strategies: {
                    ...prev.strategies,
                    [activeStrategy]: {
                        ...prev.strategies[activeStrategy],
                        assumptions: {
                            ...prev.strategies[activeStrategy].assumptions,
                            income: newIncome
                        }
                    }
                }
            };
            const strat = updated.strategies[activeStrategy];
            strat.results = calculateMetrics(
                strat.assumptions.acquisition,
                strat.assumptions.mortgage,
                strat.assumptions.income
            );
            return updated;
        });
    };

    const handleHMORoomsChange = (totalRent: number) => {
        if (!deal) return;
        setDeal(prev => {
            if (!prev) return null;
            const updated = {
                ...prev,
                strategies: {
                    ...prev.strategies,
                    HMO: {
                        ...prev.strategies.HMO,
                        assumptions: {
                            ...prev.strategies.HMO.assumptions,
                            income: {
                                ...prev.strategies.HMO.assumptions.income,
                                grossMonthlyRent: totalRent
                            }
                        }
                    }
                }
            };
            const strat = updated.strategies.HMO;
            strat.results = calculateMetrics(
                strat.assumptions.acquisition,
                strat.assumptions.mortgage,
                strat.assumptions.income
            );
            return updated;
        });
    };

    const activateStrategy = (type: StrategyType) => {
        setActiveStrategy(type);
    }

    return (
        <div className="container mx-auto py-12 px-4 space-y-8 min-h-screen bg-slate-50">

            {!deal ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Anna Lyzer
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                            Professional deal sourcing logic. Analyze purchases or R2R opportunities.
                        </p>
                    </div>
                    <DealInput onAnalyze={handleAnalyze} onManualEntry={handleManualEntry} isLoading={isLoading} />
                    {error && (
                        <div className="w-full max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            <strong>Scraping Error:</strong> {error}
                            <p className="mt-2 text-xs">Tip: Use "Manual Entry" tab to input property details directly.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <header className="flex justify-between items-start pb-6 border-b">
                        <div>
                            <h2 className="text-2xl font-bold">{deal.property.address.line1}</h2>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {deal.property.address.city} {deal.property.address.postcode}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSaveDeal}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save to Pipeline
                            </button>
                            <button onClick={() => setDeal(null)} className="text-sm font-medium text-slate-500 hover:text-slate-700">New Search</button>
                        </div>
                    </header>

                    {/* Property Summary Bar */}
                    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center gap-2">
                            <Home className="h-5 w-5 text-slate-500" />
                            <span className="font-semibold">£{deal.property.askingPrice.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">{deal.strategies.R2R.isActive ? 'pcm' : ''}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-slate-500" />
                            <span>{deal.property.propertyType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bed className="h-5 w-5 text-slate-500" />
                            <span>{deal.property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath className="h-5 w-5 text-slate-500" />
                            <span>{deal.property.bathrooms} Baths</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Input Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Strategy Comparison Dashboard */}
                            <StrategyComparison
                                deal={deal}
                                onSelectStrategy={(type) => setActiveStrategy(type)}
                            />

                            <Tabs value={activeStrategy} onValueChange={(v) => activateStrategy(v as StrategyType)}>
                                <TabsList className="mb-4">
                                    <TabsTrigger value="BTL">Buy-to-Let</TabsTrigger>
                                    <TabsTrigger value="BRRR">BRRR</TabsTrigger>
                                    <TabsTrigger value="HMO">HMO</TabsTrigger>
                                    <TabsTrigger value="R2R">Rent-to-Rent</TabsTrigger>
                                </TabsList>

                                <TabsContent value="BTL" className="space-y-6">
                                    <AcquisitionCostsParams
                                        data={deal.strategies.BTL.assumptions.acquisition}
                                        onChange={handleCostChange}
                                    />
                                    <MortgageParams
                                        data={deal.strategies.BTL.assumptions.mortgage}
                                        acquisition={deal.strategies.BTL.assumptions.acquisition}
                                        onChange={handleMortgageChange}
                                    />
                                    <IncomeParams
                                        data={deal.strategies.BTL.assumptions.income}
                                        isR2R={false}
                                        onChange={handleIncomeChange}
                                    />
                                </TabsContent>

                                <TabsContent value="BRRR" className="space-y-6">
                                    <AcquisitionCostsParams
                                        data={deal.strategies.BRRR.assumptions.acquisition}
                                        onChange={handleCostChange}
                                    />
                                    <BRRRParams
                                        purchasePrice={deal.strategies.BRRR.assumptions.acquisition.purchasePrice}
                                        refurbCost={deal.strategies.BRRR.assumptions.acquisition.refurbishmentCost}
                                        onBRRRChange={(params) => {
                                            // Store BRRR-specific params - could extend strategy params
                                            console.log('BRRR params:', params);
                                        }}
                                    />
                                    <MortgageParams
                                        data={deal.strategies.BRRR.assumptions.mortgage}
                                        acquisition={deal.strategies.BRRR.assumptions.acquisition}
                                        onChange={handleMortgageChange}
                                    />
                                    <IncomeParams
                                        data={deal.strategies.BRRR.assumptions.income}
                                        isR2R={false}
                                        onChange={handleIncomeChange}
                                    />
                                </TabsContent>

                                <TabsContent value="HMO" className="space-y-6">
                                    <AcquisitionCostsParams
                                        data={deal.strategies.HMO.assumptions.acquisition}
                                        onChange={handleCostChange}
                                    />
                                    <HMOParams
                                        bedrooms={deal.property.bedrooms}
                                        onRoomsChange={handleHMORoomsChange}
                                    />
                                    <MortgageParams
                                        data={deal.strategies.HMO.assumptions.mortgage}
                                        acquisition={deal.strategies.HMO.assumptions.acquisition}
                                        onChange={handleMortgageChange}
                                    />
                                    <IncomeParams
                                        data={deal.strategies.HMO.assumptions.income}
                                        isR2R={false}
                                        onChange={handleIncomeChange}
                                    />
                                </TabsContent>

                                <TabsContent value="R2R" className="space-y-6">
                                    <AcquisitionCostsParams
                                        data={deal.strategies.R2R.assumptions.acquisition}
                                        onChange={handleCostChange}
                                    />
                                    <IncomeParams
                                        data={deal.strategies.R2R.assumptions.income}
                                        isR2R={true}
                                        onChange={handleIncomeChange}
                                    />
                                    <div className="p-4 text-sm text-slate-500 bg-sky-50 rounded">
                                        R2R Analysis uses Monthly Rent to Owner instead of Purchase Price. Capital Deployed = Setup costs only.
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Right Column: Results & Property Info */}
                        <div className="space-y-6">
                            <StrategySummary
                                results={deal.strategies[activeStrategy]?.results || deal.strategies.BTL.results}
                                title={activeStrategy}
                            />

                            <RiskPanel
                                assessment={assessDealRisk(
                                    deal.property,
                                    deal.strategies[activeStrategy].assumptions.acquisition,
                                    deal.strategies[activeStrategy].assumptions.income,
                                    deal.strategies[activeStrategy].assumptions.mortgage
                                )}
                            />

                            {deal.property.images && deal.property.images[0] && (
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden shadow-sm">
                                    <img src={deal.property.images[0]} alt="Property" className="object-cover w-full h-full" />
                                </div>
                            )}

                            {deal.property.description && (
                                <div className="p-4 bg-white rounded border">
                                    <h3 className="font-semibold mb-2">Deal Notes</h3>
                                    <p className="text-sm text-muted-foreground">{deal.property.description?.substring(0, 200)}...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
