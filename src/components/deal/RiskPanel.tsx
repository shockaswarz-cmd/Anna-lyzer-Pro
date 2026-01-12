'use client';

import { RiskAssessment, RiskFlag, RiskSeverity } from '@/lib/risk/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Info, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskPanelProps {
    assessment: RiskAssessment;
}

const severityConfig: Record<RiskSeverity, { icon: typeof AlertTriangle; color: string; bg: string }> = {
    danger: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
    warning: { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' }
};

function RiskFlagItem({ flag }: { flag: RiskFlag }) {
    const config = severityConfig[flag.severity];
    const Icon = config.icon;

    return (
        <div className={cn('p-3 rounded-lg border', config.bg)}>
            <div className="flex items-start gap-3">
                <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', config.color)} />
                <div className="flex-1 min-w-0">
                    <h4 className={cn('font-semibold text-sm', config.color)}>{flag.title}</h4>
                    <p className="text-sm text-slate-600 mt-0.5">{flag.description}</p>
                    {flag.recommendation && (
                        <p className="text-xs text-slate-500 mt-1 italic">💡 {flag.recommendation}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function ScoreIndicator({ score }: { score: number }) {
    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-green-600 bg-green-100';
        if (s >= 60) return 'text-amber-600 bg-amber-100';
        return 'text-red-600 bg-red-100';
    };

    const getScoreIcon = (s: number) => {
        if (s >= 80) return ShieldCheck;
        if (s >= 60) return ShieldAlert;
        return ShieldX;
    };

    const Icon = getScoreIcon(score);

    return (
        <div className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full', getScoreColor(score))}>
            <Icon className="h-4 w-4" />
            <span className="font-bold text-sm">{score}/100</span>
        </div>
    );
}

function ConfidenceIndicator({ level }: { level: 'high' | 'medium' | 'low' }) {
    const config = {
        high: { label: 'High', color: 'text-green-600', dots: 3 },
        medium: { label: 'Medium', color: 'text-amber-600', dots: 2 },
        low: { label: 'Low', color: 'text-red-600', dots: 1 }
    };

    const c = config[level];

    return (
        <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500">Data Confidence:</span>
            <span className={cn('font-medium', c.color)}>{c.label}</span>
            <div className="flex gap-0.5 ml-1">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            'w-1.5 h-1.5 rounded-full',
                            i <= c.dots ? c.color.replace('text-', 'bg-') : 'bg-slate-200'
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

export function RiskPanel({ assessment }: RiskPanelProps) {
    const dangerFlags = assessment.flags.filter(f => f.severity === 'danger');
    const warningFlags = assessment.flags.filter(f => f.severity === 'warning');
    const infoFlags = assessment.flags.filter(f => f.severity === 'info');

    return (
        <Card className="border-l-4 border-l-slate-400">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    <ScoreIndicator score={assessment.overallScore} />
                </div>
                <ConfidenceIndicator level={assessment.dataConfidence} />
            </CardHeader>
            <CardContent className="space-y-3">
                {assessment.flags.length === 0 ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                        <div>
                            <p className="font-medium text-green-800">No Red Flags Detected</p>
                            <p className="text-sm text-green-600">This deal passes initial risk screening.</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {dangerFlags.map((flag) => (
                            <RiskFlagItem key={flag.id} flag={flag} />
                        ))}
                        {warningFlags.map((flag) => (
                            <RiskFlagItem key={flag.id} flag={flag} />
                        ))}
                        {infoFlags.length > 0 && (
                            <details className="group">
                                <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                                    + {infoFlags.length} informational note{infoFlags.length > 1 ? 's' : ''}
                                </summary>
                                <div className="mt-2 space-y-2">
                                    {infoFlags.map((flag) => (
                                        <RiskFlagItem key={flag.id} flag={flag} />
                                    ))}
                                </div>
                            </details>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
