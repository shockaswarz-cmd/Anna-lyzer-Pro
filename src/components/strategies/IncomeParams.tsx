'use client';

import { IncomeExpenses, AcquisitionCosts } from '@/lib/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PoundSterling, Percent } from 'lucide-react';

interface IncomeParamsProps {
    data: IncomeExpenses;
    isR2R: boolean;
    onChange: (data: IncomeExpenses) => void;
}

export function IncomeParams({ data, isR2R, onChange }: IncomeParamsProps) {

    const handleChange = (field: keyof IncomeExpenses, value: number) => {
        const newData = { ...data, [field]: value };

        // Auto-calculate management fee if rate changes
        if (field === 'managementFeeRate') {
            newData.managementFeeMonthly = Math.round(newData.grossMonthlyRent * (value / 100));
        }

        onChange(newData);
    };

    const totalExpenses =
        data.managementFeeMonthly +
        data.utilitiesMonthly +
        data.insuranceMonthly +
        data.councilTaxMonthly +
        data.maintenanceMonthly +
        data.otherMonthlyCosts;

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">Income & Running Costs</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Income Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b">
                    <div className="space-y-2">
                        <Label>Gross Monthly Rent</Label>
                        <Input
                            type="number"
                            value={data.grossMonthlyRent}
                            onChange={(e) => handleChange('grossMonthlyRent', Number(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground">£{(data.grossMonthlyRent * 12).toLocaleString()}/year</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Expected Occupancy (%)</Label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            value={data.occupancyRate}
                            onChange={(e) => handleChange('occupancyRate', Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Expenses Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1">
                            Management
                            <span className="text-xs text-muted-foreground">({data.managementFeeRate}%)</span>
                        </Label>
                        <Input
                            type="number"
                            value={data.managementFeeMonthly}
                            onChange={(e) => handleChange('managementFeeMonthly', Number(e.target.value))}
                        />
                    </div>

                    {isR2R && (
                        <>
                            <div className="space-y-2">
                                <Label>Utilities</Label>
                                <Input
                                    type="number"
                                    value={data.utilitiesMonthly}
                                    onChange={(e) => handleChange('utilitiesMonthly', Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Council Tax</Label>
                                <Input
                                    type="number"
                                    value={data.councilTaxMonthly}
                                    onChange={(e) => handleChange('councilTaxMonthly', Number(e.target.value))}
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label>Insurance</Label>
                        <Input
                            type="number"
                            value={data.insuranceMonthly}
                            onChange={(e) => handleChange('insuranceMonthly', Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Maintenance</Label>
                        <Input
                            type="number"
                            value={data.maintenanceMonthly}
                            onChange={(e) => handleChange('maintenanceMonthly', Number(e.target.value))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Other Costs</Label>
                        <Input
                            type="number"
                            value={data.otherMonthlyCosts}
                            onChange={(e) => handleChange('otherMonthlyCosts', Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="pt-3 border-t flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Monthly OPEX:</span>
                    <span className="font-semibold">£{totalExpenses.toLocaleString()}</span>
                </div>
            </CardContent>
        </Card>
    );
}
