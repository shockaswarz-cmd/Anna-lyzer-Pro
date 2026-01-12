'use client';

import { AcquisitionCosts } from '@/lib/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AcquisitionCostsProps {
    data: AcquisitionCosts;
    onChange: (data: AcquisitionCosts) => void;
}

export function AcquisitionCostsParams({ data, onChange }: AcquisitionCostsProps) {

    const handleChange = (field: keyof AcquisitionCosts, value: number | boolean) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Acquisition Costs</CardTitle>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="r2r-mode" className="text-sm">R2R Mode</Label>
                        <Switch
                            id="r2r-mode"
                            checked={data.isR2R}
                            onCheckedChange={(c) => handleChange('isR2R', c)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {data.isR2R ? (
                    <>
                        <div className="space-y-2">
                            <Label>Agreed Monthly Rent to Owner</Label>
                            <Input
                                type="number"
                                value={data.rentToOwner || 0}
                                onChange={(e) => handleChange('rentToOwner', Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Sourcing Fee</Label>
                            <Input
                                type="number"
                                value={data.sourcingFee}
                                onChange={(e) => handleChange('sourcingFee', Number(e.target.value))}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label>Purchase Price</Label>
                            <Input
                                type="number"
                                value={data.purchasePrice}
                                onChange={(e) => handleChange('purchasePrice', Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Stamp Duty (SDLT)</Label>
                            <Input
                                type="number"
                                value={data.stampDuty}
                                onChange={(e) => handleChange('stampDuty', Number(e.target.value))}
                            />
                        </div>
                    </>
                )}

                {/* Common Costs */}
                <div className="space-y-2">
                    <Label>{data.isR2R ? 'Setup/Legal Fees' : 'Legal Fees'}</Label>
                    <Input
                        type="number"
                        value={data.legalFees}
                        onChange={(e) => handleChange('legalFees', Number(e.target.value))}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Refurbishment</Label>
                    <Input
                        type="number"
                        value={data.refurbishmentCost}
                        onChange={(e) => handleChange('refurbishmentCost', Number(e.target.value))}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Furniture Pack</Label>
                    <Input
                        type="number"
                        value={data.furnitureCost}
                        onChange={(e) => handleChange('furnitureCost', Number(e.target.value))}
                    />
                </div>

            </CardContent>
        </Card>
    );
}
