'use client';

import { MortgageDetails, AcquisitionCosts } from '@/lib/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Wallet } from 'lucide-react';

interface MortgageParamsProps {
    data: MortgageDetails;
    acquisition: AcquisitionCosts;
    onChange: (data: MortgageDetails) => void;
}

export function MortgageParams({ data, acquisition, onChange }: MortgageParamsProps) {
    // Don't show for R2R
    if (acquisition.isR2R) return null;

    const handleChange = (field: keyof MortgageDetails, value: number | boolean) => {
        onChange({ ...data, [field]: value });
    };

    const mortgageAmount = acquisition.purchasePrice * (data.ltv / 100);
    const monthlyPayment = data.isInterestOnly
        ? (mortgageAmount * (data.interestRate / 100)) / 12
        : (mortgageAmount * ((data.interestRate / 100) / 12) * Math.pow(1 + (data.interestRate / 100) / 12, data.termYears * 12)) / (Math.pow(1 + (data.interestRate / 100) / 12, data.termYears * 12) - 1);

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-slate-600" />
                    <CardTitle className="text-lg">Mortgage Details</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>LTV (%)</Label>
                    <Input
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        value={data.ltv}
                        onChange={(e) => handleChange('ltv', Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">£{mortgageAmount.toLocaleString()} borrowed</p>
                </div>

                <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={data.interestRate}
                        onChange={(e) => handleChange('interestRate', Number(e.target.value))}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Product Fee</Label>
                    <Input
                        type="number"
                        value={data.productFee}
                        onChange={(e) => handleChange('productFee', Number(e.target.value))}
                    />
                </div>

                <div className="md:col-span-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Switch
                            id="interest-only"
                            checked={data.isInterestOnly}
                            onCheckedChange={(c) => handleChange('isInterestOnly', c)}
                        />
                        <Label htmlFor="interest-only">Interest Only</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Est. Monthly Payment: <span className="font-semibold text-slate-900">£{monthlyPayment.toFixed(0)}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
