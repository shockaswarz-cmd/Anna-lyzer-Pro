import React from 'react';
import { useDeal } from '../../context/DealContext';
import { calculateStrategy } from '../../utils/strategyCalculators';
import { Card } from '../../components/ui';

const StrategyColumn = ({ title, results, best = false }) => (
    <div style={{
        flex: 1,
        minWidth: '200px',
        border: best ? '2px solid var(--color-gold)' : '1px solid #e2e8f0',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        background: best ? 'rgba(212, 175, 55, 0.05)' : 'white',
        position: 'relative'
    }}>
        {best && <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-gold)',
            color: 'white',
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '10px',
            fontWeight: 600
        }}>Top Performer</div>}

        <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-primary)' }}>{title}</h4>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Invested</span>
                <span style={{ fontWeight: 600 }}>£{Math.round(results.totalCashIn).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Annual Profit</span>
                <span style={{ fontWeight: 600 }}>£{Math.round(results.annualProfit).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>ROI</span>
                <span style={{ fontWeight: 600, color: results.rating.color }}>{results.roi.toFixed(1)}%</span>
            </div>
            <div style={{
                marginTop: '0.5rem',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: results.rating.color,
                border: `1px solid ${results.rating.color}`,
                padding: '4px',
                borderRadius: '4px'
            }}>
                {results.rating.label}
            </div>
        </div>
    </div>
);

export const ComparisonView = () => {
    const { strategies, dealMode } = useDeal();

    if (!strategies) return null;

    // Calculate results for all strategies
    const results = Object.values(strategies).map(strat => ({
        ...strat,
        result: calculateStrategy(dealMode, strat.type, strat)
    }));

    // Find best performing strategy based on ROI
    const sorted = [...results].sort((a, b) => b.result.roi - a.result.roi);
    const bestType = sorted[0].type;

    return (
        <Card style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Strategy Comparison ({dealMode === 'sale' ? 'For Sale' : 'For Rent'})</h3>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                {results.map(item => (
                    <StrategyColumn
                        key={item.type}
                        title={item.label}
                        results={item.result}
                        best={item.type === bestType}
                    />
                ))}
            </div>
        </Card>
    );
};
