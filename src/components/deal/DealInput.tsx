'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, PenLine } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
}

export function DealInput({ onAnalyze, onManualEntry, isLoading }: DealInputProps) {
    const [url, setUrl] = useState('');
    const [manualData, setManualData] = useState<ManualPropertyData>({
        address: '',
        postcode: '',
        price: 0,
        bedrooms: 3,
        bathrooms: 1,
        propertyType: 'Terraced',
        transactionType: 'sale'
    });

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onAnalyze(url);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualData.address && manualData.price > 0) {
            onManualEntry(manualData);
        }
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
                <Tabs defaultValue="url" className="w-full">
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

                    <TabsContent value="url">
                        <form onSubmit={handleUrlSubmit} className="flex gap-4">
                            <Input
                                placeholder="https://www.rightmove.co.uk/properties/..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isLoading}
                                className="flex-1 h-12 text-lg"
                            />
                            <Button type="submit" size="lg" disabled={isLoading || !url} className="h-12 px-8">
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
                                    <Label>Address</Label>
                                    <Input
                                        placeholder="123 High Street, Manchester"
                                        value={manualData.address}
                                        onChange={(e) => setManualData({ ...manualData, address: e.target.value })}
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
                                    <Label>{manualData.transactionType === 'rent' ? 'Monthly Rent (£)' : 'Asking Price (£)'}</Label>
                                    <Input
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
                                        <SelectTrigger>
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
                            </div>

                            <Button type="submit" className="w-full h-12" disabled={!manualData.address || manualData.price <= 0}>
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
