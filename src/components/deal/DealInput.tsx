'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, PenLine, Link2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isValidUkPostcode, normalizePostcode, validatePropertyPortalUrl } from '@/lib/validation/propertyInput';

interface DealInputProps {
    onAnalyze: (url: string) => void;
    onManualEntry: (data: ManualPropertyData) => void;
    isLoading: boolean;
}

export interface ManualPropertyData {
    address: string;
    postcode: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
    transactionType: 'sale' | 'rent';
    tenure: 'Freehold' | 'Leasehold' | 'Share of Freehold';
    size?: number;
    sizeUnit?: 'sqft' | 'sqm';
    sourceUrl?: string;
    description?: string;
}

export function DealInput({ onAnalyze, onManualEntry, isLoading }: DealInputProps) {
    const [url, setUrl] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const [manualData, setManualData] = useState<ManualPropertyData>({
        address: '',
        postcode: '',
        price: 0,
        bedrooms: 3,
        bathrooms: 1,
        propertyType: 'Terraced',
        transactionType: 'sale',
        tenure: 'Freehold',
        size: 0,
        sizeUnit: 'sqft'
    });

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validatePropertyPortalUrl(url);
        if (!validation.ok) {
            setValidationError(validation.error);
            return;
        }
        setValidationError(null);
        onAnalyze(validation.url);
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: string[] = [];
        if (!manualData.address.trim()) errors.push('Address is required.');
        if (!isValidUkPostcode(manualData.postcode)) errors.push('Enter a valid UK postcode, for example M14 6AF.');
        if (manualData.price <= 0) errors.push(manualData.transactionType === 'rent' ? 'Monthly rent must be greater than zero.' : 'Asking price must be greater than zero.');
        if (manualData.bedrooms < 1) errors.push('Bedrooms must be at least 1.');
        if (manualData.bathrooms < 1) errors.push('Bathrooms must be at least 1.');
        if (manualData.sourceUrl) {
            const sourceUrlValidation = validatePropertyPortalUrl(manualData.sourceUrl);
            if (!sourceUrlValidation.ok) errors.push(`Source URL: ${sourceUrlValidation.error}`);
        }

        if (errors.length) {
            setValidationError(errors.join(' '));
            return;
        }

        setValidationError(null);
        onManualEntry({
            ...manualData,
            postcode: normalizePostcode(manualData.postcode),
            sourceUrl: manualData.sourceUrl?.trim() || undefined,
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Analyze a New Deal</CardTitle>
                <CardDescription className="text-center">
                    Paste a portal URL or enter property details manually.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs id="deal-input-tabs" defaultValue="url" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="url">
                            <Search className="mr-2 h-4 w-4" />
                            From URL
                        </TabsTrigger>
                        <TabsTrigger value="manual">
                            <PenLine className="mr-2 h-4 w-4" />
                            Manual Entry
                        </TabsTrigger>
                    </TabsList>

                    {validationError && (
                        <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>{validationError}</p>
                        </div>
                    )}

                    <TabsContent value="url">
                        <form onSubmit={handleUrlSubmit} className="flex flex-col gap-3 md:flex-row">
                            <Input
                                placeholder="https://www.rightmove.co.uk/properties/..."
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                    setValidationError(null);
                                }}
                                disabled={isLoading}
                                className="flex-1 h-12 text-lg"
                            />
                            <Button type="submit" size="lg" disabled={isLoading || !url.trim()} className="h-12 px-8">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Analyze
                                    </>
                                )}
                            </Button>
                        </form>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Supports Rightmove, Zoopla, and OnTheMarket links
                        </p>
                    </TabsContent>

                    <TabsContent value="manual">
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        placeholder="123 High Street, Manchester"
                                        value={manualData.address}
                                        onChange={(e) => setManualData({ ...manualData, address: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="sourceUrl" className="flex items-center gap-2"><Link2 className="h-3.5 w-3.5" /> Optional source URL</Label>
                                    <Input
                                        id="sourceUrl"
                                        placeholder="Rightmove, Zoopla, or OnTheMarket link used for reference"
                                        value={manualData.sourceUrl || ''}
                                        onChange={(e) => setManualData({ ...manualData, sourceUrl: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Postcode</Label>
                                    <Input
                                        placeholder="M14 6AF"
                                        value={manualData.postcode}
                                        onChange={(e) => setManualData({ ...manualData, postcode: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Transaction Type</Label>
                                    <Select
                                        value={manualData.transactionType}
                                        onValueChange={(v) => setManualData({ ...manualData, transactionType: v as 'sale' | 'rent' })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sale">For Sale (Purchase)</SelectItem>
                                            <SelectItem value="rent">To Rent (R2R)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">{manualData.transactionType === 'rent' ? 'Monthly Rent (£)' : 'Asking Price (£)'}</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder={manualData.transactionType === 'rent' ? '1200' : '250000'}
                                        value={manualData.price || ''}
                                        onChange={(e) => setManualData({ ...manualData, price: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Bedrooms</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={manualData.bedrooms}
                                        onChange={(e) => setManualData({ ...manualData, bedrooms: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Bathrooms</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={manualData.bathrooms}
                                        onChange={(e) => setManualData({ ...manualData, bathrooms: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Property Type</Label>
                                    <Select
                                        value={manualData.propertyType}
                                        onValueChange={(v) => setManualData({ ...manualData, propertyType: v })}
                                    >
                                        <SelectTrigger aria-label="Property Type">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Flat">Flat / Apartment</SelectItem>
                                            <SelectItem value="Terraced">Terraced</SelectItem>
                                            <SelectItem value="Semi-Detached">Semi-Detached</SelectItem>
                                            <SelectItem value="Detached">Detached</SelectItem>
                                            <SelectItem value="Bungalow">Bungalow</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Tenure</Label>
                                    <Select
                                        value={manualData.tenure}
                                        onValueChange={(v) => setManualData({ ...manualData, tenure: v as 'Freehold' | 'Leasehold' | 'Share of Freehold' })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Freehold">Freehold</SelectItem>
                                            <SelectItem value="Leasehold">Leasehold</SelectItem>
                                            <SelectItem value="Share of Freehold">Share of Freehold</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <Label>Size</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            min={0}
                                            placeholder="e.g. 850"
                                            value={manualData.size || ''}
                                            onChange={(e) => setManualData({ ...manualData, size: Number(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <Select
                                            value={manualData.sizeUnit}
                                            onValueChange={(v) => setManualData({ ...manualData, sizeUnit: v as 'sqft' | 'sqm' })}
                                        >
                                            <SelectTrigger className="w-[100px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sqft">sq ft</SelectItem>
                                                <SelectItem value="sqm">sq m</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Notes / property description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Lease length, refurb scope, local demand notes, agent comments..."
                                        value={manualData.description || ''}
                                        onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12" disabled={!manualData.address.trim() || manualData.price <= 0}>
                                <PenLine className="mr-2 h-4 w-4" />
                                Analyze This Deal
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
