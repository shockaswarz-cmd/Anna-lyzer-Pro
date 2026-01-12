'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Link2, Palette, Building } from 'lucide-react';
import { StrategyType } from '@/lib/types/deal';

interface PackControlsProps {
    activeStrategy: StrategyType;
    onStrategyChange: (strategy: StrategyType) => void;
    branding: {
        companyName: string;
        logoUrl: string;
        primaryColor: string;
    };
    onBrandingChange: (field: string, value: string) => void;
    onExportPDF: () => void;
    onCopyLink: () => void;
}

const colorPresets = [
    { name: 'Emerald', value: '#10b981' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Slate', value: '#475569' },
];

export function PackControls({
    activeStrategy,
    onStrategyChange,
    branding,
    onBrandingChange,
    onExportPDF,
    onCopyLink
}: PackControlsProps) {
    return (
        <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-400" />
                    Pack Settings
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Strategy Selection */}
                <div className="space-y-2">
                    <Label className="text-slate-300">Strategy to Display</Label>
                    <Select value={activeStrategy} onValueChange={(v) => onStrategyChange(v as StrategyType)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BTL">Buy-to-Let</SelectItem>
                            <SelectItem value="BRRR">BRRR</SelectItem>
                            <SelectItem value="HMO">HMO</SelectItem>
                            <SelectItem value="R2R">Rent-to-Rent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Branding */}
                <div className="space-y-4 pt-4 border-t border-slate-700">
                    <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Branding
                    </h4>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Company Name</Label>
                        <Input
                            value={branding.companyName}
                            onChange={(e) => onBrandingChange('companyName', e.target.value)}
                            placeholder="Your Company Ltd"
                            className="bg-slate-700 border-slate-600 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Logo URL (optional)</Label>
                        <Input
                            value={branding.logoUrl}
                            onChange={(e) => onBrandingChange('logoUrl', e.target.value)}
                            placeholder="https://..."
                            className="bg-slate-700 border-slate-600 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Brand Color</Label>
                        <div className="flex items-center gap-2">
                            {colorPresets.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => onBrandingChange('primaryColor', color.value)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${branding.primaryColor === color.value
                                            ? 'border-white scale-110'
                                            : 'border-transparent hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Export Actions */}
                <div className="space-y-2 pt-4 border-t border-slate-700">
                    <Button
                        onClick={onExportPDF}
                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </Button>
                    <Button
                        onClick={onCopyLink}
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                        <Link2 className="w-4 h-4 mr-2" />
                        Copy Shareable Link
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
