import { AnalysisResults } from '@/lib/types/deal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StrategySummaryProps {
    results: AnalysisResults;
    title: string;
}

export function StrategySummary({ results, title }: StrategySummaryProps) {
    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
                <CardTitle>{title} Results</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Total Cash Required</p>
                    <p className="text-xl font-bold">£{results.totalCashRequired.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Monthly Cashflow</p>
                    <p className={`text-xl font-bold ${results.monthlyCashflow > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        £{results.monthlyCashflow.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="text-lg font-semibold">{results.roi.toFixed(1)}%</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Net Yield</p>
                    <p className="text-lg font-semibold">{results.netYield.toFixed(1)}%</p>
                </div>
            </CardContent>
        </Card>
    );
}
