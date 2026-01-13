'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IntelligenceReport, MarketInsight } from '@/lib/intelligence/comparables';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info, BarChart3 } from 'lucide-react';

interface InsightsPanelProps {
    report: IntelligenceReport | null;
    isLoading?: boolean;
}

function InsightBadge({ insight }: { insight: MarketInsight }) {
    const config = {
        opportunity: {
            bg: 'bg-green-500/10',
            border: 'border-green-500/30',
            text: 'text-green-400',
            icon: CheckCircle
        },
        risk: {
            bg: 'bg-red-500/10',
            border: 'border-red-500/30',
            text: 'text-red-400',
            icon: AlertTriangle
        },
        neutral: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30',
            text: 'text-blue-400',
            icon: Info
        }
    };

    const style = config[insight.type];
    const Icon = style.icon;

    return (
        <div className={`${style.bg} ${style.border} border rounded-lg p-3`}>
            <div className="flex items-start gap-2">
                <Icon className={`w-4 h-4 mt-0.5 ${style.text}`} />
                <div>
                    <p className={`font-medium text-sm ${style.text}`}>{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                </div>
            </div>
        </div>
    );
}

export function InsightsPanel({ report, isLoading }: InsightsPanelProps) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Market Intelligence
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!report) {
        return (
            <Card className="border-dashed">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="w-5 h-5" />
                        Market Intelligence
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Add property details to generate market insights.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const { comparables, insights, topDrivers, topRisks, confidenceScore } = report;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Market Intelligence
                    </CardTitle>
                    <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className={`font-medium ${confidenceScore >= 70 ? 'text-green-500' :
                                confidenceScore >= 40 ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                            {confidenceScore}%
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Area Comparables */}
                <div>
                    <h4 className="text-sm font-medium mb-3">Area Comparables</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {comparables.areaAveragePrice && (
                            <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground">Area Average</p>
                                <p className="text-lg font-bold">
                                    £{comparables.areaAveragePrice.toLocaleString()}
                                </p>
                            </div>
                        )}
                        {comparables.averageRent && (
                            <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground">Avg Rent/Month</p>
                                <p className="text-lg font-bold">
                                    £{comparables.averageRent.toLocaleString()}
                                </p>
                            </div>
                        )}
                        {comparables.rentalYieldBenchmark && (
                            <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground">Yield Benchmark</p>
                                <p className="text-lg font-bold">
                                    {comparables.rentalYieldBenchmark}%
                                </p>
                            </div>
                        )}
                        {comparables.yearOnYearChange !== null && (
                            <div className="bg-muted/30 rounded-lg p-3">
                                <p className="text-xs text-muted-foreground">YoY Change</p>
                                <p className={`text-lg font-bold flex items-center gap-1 ${comparables.yearOnYearChange >= 0 ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {comparables.yearOnYearChange >= 0 ? (
                                        <TrendingUp className="w-4 h-4" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4" />
                                    )}
                                    {comparables.yearOnYearChange}%
                                </p>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Source: {comparables.source}
                    </p>
                </div>

                {/* Insights */}
                {insights.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium mb-3">Key Insights</h4>
                        <div className="space-y-2">
                            {insights.map((insight, i) => (
                                <InsightBadge key={i} insight={insight} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Drivers & Risks Summary */}
                <div className="grid grid-cols-2 gap-4">
                    {topDrivers.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-green-500 mb-2">Top Drivers</h4>
                            <ul className="text-xs space-y-1">
                                {topDrivers.map((d, i) => (
                                    <li key={i} className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-green-500 rounded-full" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {topRisks.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-red-500 mb-2">Top Risks</h4>
                            <ul className="text-xs space-y-1">
                                {topRisks.map((r, i) => (
                                    <li key={i} className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
