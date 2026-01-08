import React from 'react';
import { Card } from '../../components/ui';
import { RiskAnalysis } from './RiskAnalysis';
import { ComparisonView } from './ComparisonView';
import { calculateConfidence, getDrivers } from '../../utils/riskEngine';
import { TrendingUp, PoundSterling, Clock, Percent, Zap } from 'lucide-react';

const RatingBadge = ({ rating }) => (
    <span className="rating-badge" style={{
        background: rating.color,
        boxShadow: `0 2px 8px ${rating.color}40`
    }}>
        {rating.label}
    </span>
);

const MetricCard = ({ label, value, icon: Icon, color = 'var(--color-primary)', subtext }) => (
    <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: color
        }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
                <div className="result-item-label">{label}</div>
                <div className="result-item-value" style={{ color }}>{value}</div>
                {subtext && <div style={{ fontSize: '0.7rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>{subtext}</div>}
            </div>
            {Icon && (
                <div style={{
                    width: '36px',
                    height: '36px',
                    background: `${color}15`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={18} color={color} />
                </div>
            )}
        </div>
    </div>
);

export const StrategyResults = ({ currentDeal, activeStratData, dealMode, results, formatGBP }) => {
    const confidence = calculateConfidence(activeStratData, currentDeal.type);
    const drivers = getDrivers(results, activeStratData);

    return (
        <div>
            <Card style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Gold top accent */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))'
                }} />

                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.75rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TrendingUp size={18} color="var(--color-primary)" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Financial Summary</h2>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        Strategy: <strong style={{ color: 'var(--color-primary)' }}>{activeStratData.label}</strong>
                                    </span>
                                    <span style={{
                                        fontSize: '0.65rem',
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '99px',
                                        background: `${confidence.color}15`,
                                        color: confidence.color,
                                        fontWeight: 700
                                    }}>
                                        {confidence.label} Confidence
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RatingBadge rating={results.rating} />
                </div>

                {/* Metrics Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.75rem'
                }}>
                    <MetricCard
                        label="Total Cash In"
                        value={formatGBP(results.totalCashIn)}
                        icon={PoundSterling}
                        color="var(--color-primary)"
                    />
                    <MetricCard
                        label="Cash-on-Cash"
                        value={`${results.cashOnCash.toFixed(1)}%`}
                        icon={Percent}
                        color={results.cashOnCash >= 8 ? 'var(--color-success)' : results.cashOnCash >= 5 ? 'var(--color-gold)' : 'var(--color-danger)'}
                    />
                    <MetricCard
                        label="Monthly Profit"
                        value={formatGBP(results.monthlyProfit)}
                        icon={TrendingUp}
                        color={results.monthlyProfit >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}
                    />
                    <MetricCard
                        label="Payback Period"
                        value={results.paybackMonths === Infinity ? '∞' : `${results.paybackMonths.toFixed(0)}m`}
                        icon={Clock}
                        color="var(--color-info)"
                        subtext={results.paybackMonths !== Infinity ? `${(results.paybackMonths / 12).toFixed(1)} years` : 'Never'}
                    />
                </div>

                {/* Intelligence Layer */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
                    <div style={{
                        padding: '1.25rem',
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #f1f5f9'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}>
                            <Zap size={14} color="var(--color-gold)" />
                            <h4 style={{
                                fontSize: '0.7rem',
                                color: 'var(--color-gold)',
                                margin: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontWeight: 700,
                                fontFamily: 'var(--font-family-sans)'
                            }}>ROI Drivers</h4>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {drivers.map((d, i) => (
                                <span key={i} style={{
                                    padding: '0.375rem 0.75rem',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'var(--color-text-main)'
                                }}>
                                    {d.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {(activeStratData.type === 'flip' || activeStratData.type === 'brrr') && (
                        <div style={{
                            padding: '1.25rem',
                            background: 'white',
                            borderRadius: '12px',
                            border: '1px solid #f1f5f9'
                        }}>
                            {activeStratData.type === 'flip' ? (
                                <>
                                    <div className="result-item-label" style={{ marginBottom: '0.25rem' }}>Profit Margin</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                                        {(results.margin || 0).toFixed(1)}%
                                    </div>
                                    <div className="result-item-label" style={{ marginBottom: '0.25rem' }}>Annualised ROI</div>
                                    <div style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: (results.annualizedRoi || 0) >= 20 ? 'var(--color-success)' : 'var(--color-gold)'
                                    }}>
                                        {(results.annualizedRoi || 0).toFixed(1)}%
                                    </div>
                                </>
                            ) : results.brrr && (
                                <>
                                    <div className="result-item-label" style={{ marginBottom: '0.25rem' }}>Equity Created</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: '1rem' }}>
                                        {formatGBP(results.brrr.equityCreated)}
                                    </div>
                                    <div className="result-item-label" style={{ marginBottom: '0.25rem' }}>Cash Left in Deal</div>
                                    <div style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: results.brrr.cashLeftInDeal <= 0 ? 'var(--color-success)' : 'var(--color-warning)'
                                    }}>
                                        {formatGBP(results.brrr.cashLeftInDeal)}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Breakdown Table */}
                <div style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9'
                }}>
                    <h4 style={{
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <PoundSterling size={16} color="var(--color-gold)" />
                        Cost & Yield Breakdown
                    </h4>
                    <table className="breakdown-table">
                        <tbody>
                            {dealMode === 'sale' && (
                                <>
                                    <tr>
                                        <td style={{ color: 'var(--color-text-muted)' }}>Gross Yield</td>
                                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{(results.grossYield || 0).toFixed(2)}%</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: 'var(--color-text-muted)' }}>Net Yield</td>
                                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{(results.netYield || 0).toFixed(2)}%</td>
                                    </tr>
                                </>
                            )}
                            <tr style={{ background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.05), transparent)' }}>
                                <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Annual Net Profit</td>
                                <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-gold)' }}>{formatGBP(results.annualProfit)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

            <ComparisonView />
            <RiskAnalysis deal={currentDeal} activeStratData={activeStratData} />
        </div>
    );
};
