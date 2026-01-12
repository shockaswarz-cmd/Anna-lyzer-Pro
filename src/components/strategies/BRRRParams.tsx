'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCcw, ArrowRight, TrendingUp } from 'lucide-react';

interface BRRRParamsProps {
    purchasePrice: number;
    refurbCost: number;
    onBRRRChange: (params: BRRRValues) => void;
}

export interface BRRRValues {
    gdv: number; // Gross Development Value (post-refurb value)
    refinanceLTV: number;
    refinanceRate: number;
    newMortgageAmount: number;
    cashLeftIn: number;
    recycledCapital: number;
}

export function BRRRParams({ purchasePrice, refurbCost, onBRRRChange }: BRRRParamsProps) {
    const [gdv, setGdv] = useState(purchasePrice * 1.25); // Default 25% uplift
    const [refinanceLTV, setRefinanceLTV] = useState(75);
    const [refinanceRate, setRefinanceRate] = useState(5.5);

    const totalInvested = purchasePrice + refurbCost;
    const newMortgageAmount = gdv * (refinanceLTV / 100);
    const cashLeftIn = Math.max(0, totalInvested - newMortgageAmount);
    const recycledCapital = Math.max(0, newMortgageAmount - totalInvested);
    const equityCreated = gdv - purchasePrice - refurbCost;

    useEffect(() => {
        onBRRRChange({
            gdv,
            refinanceLTV,
            refinanceRate,
            newMortgageAmount,
            cashLeftIn,
            recycledCapital
        });
    }, [gdv, refinanceLTV, refinanceRate, newMortgageAmount, cashLeftIn, recycledCapital, onBRRRChange]);

    const isAllMoneyOut = cashLeftIn <= 0;

    return (
        <Card className="border-purple-200 bg-purple-50/30">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <RefreshCcw className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg">BRRR Refinance Calculator</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                    Buy, Refurbish, Refinance, Rent - Calculate your recycled capital
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Investment Phase */}
                <div className="p-4 bg-white rounded-lg border space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">1</span>
                        Investment Phase
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-xs text-muted-foreground">Purchase</p>
                            <p className="font-semibold">£{purchasePrice.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">+ Refurb</p>
                            <p className="font-semibold">£{refurbCost.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="pt-2 border-t text-center">
                        <p className="text-xs text-muted-foreground">Total Cash In</p>
                        <p className="text-lg font-bold text-purple-600">£{totalInvested.toLocaleString()}</p>
                    </div>
                </div>

                {/* Refinance Phase */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
                        Refinance Phase
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Post-Refurb Value (GDV)</Label>
                            <Input
                                type="number"
                                value={gdv}
                                onChange={(e) => setGdv(Number(e.target.value))}
                            />
                            <p className="text-xs text-muted-foreground">
                                +{((gdv / purchasePrice - 1) * 100).toFixed(0)}% uplift
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Refinance LTV (%)</Label>
                            <Input
                                type="number"
                                min="0"
                                max="85"
                                value={refinanceLTV}
                                onChange={(e) => setRefinanceLTV(Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>New Rate (%)</Label>
                            <Input
                                type="number"
                                step="0.1"
                                value={refinanceRate}
                                onChange={(e) => setRefinanceRate(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Phase */}
                <div className="p-4 bg-white rounded-lg border space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">3</span>
                        Capital Recycling
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-slate-50 rounded">
                            <p className="text-xs text-muted-foreground">New Mortgage</p>
                            <p className="font-semibold">£{newMortgageAmount.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded">
                            <p className="text-xs text-muted-foreground">Equity Created</p>
                            <p className="font-semibold text-green-600">£{equityCreated.toLocaleString()}</p>
                        </div>
                        <div className={`text-center p-3 rounded ${isAllMoneyOut ? 'bg-green-100' : 'bg-amber-50'}`}>
                            <p className="text-xs text-muted-foreground">Cash Left In</p>
                            <p className={`font-bold ${isAllMoneyOut ? 'text-green-600' : 'text-amber-600'}`}>
                                £{cashLeftIn.toLocaleString()}
                            </p>
                        </div>
                        <div className={`text-center p-3 rounded ${recycledCapital > 0 ? 'bg-green-100' : 'bg-slate-50'}`}>
                            <p className="text-xs text-muted-foreground">Recycled Capital</p>
                            <p className={`font-bold ${recycledCapital > 0 ? 'text-green-600' : ''}`}>
                                £{recycledCapital.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {isAllMoneyOut && (
                        <div className="flex items-center gap-2 p-2 bg-green-100 text-green-800 rounded text-sm">
                            <TrendingUp className="h-4 w-4" />
                            <span><strong>All Money Out!</strong> Infinite ROI potential - capital fully recycled.</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
