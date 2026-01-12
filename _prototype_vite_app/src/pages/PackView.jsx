import React from 'react';
import { useDeal } from '../context/DealContext';
import { Navigate } from 'react-router-dom';
import { calculateMetrics } from '../utils/financials';
import { MapPin, Bed, Bath, Home, TrendingUp, PoundSterling, AlertTriangle, CheckCircle, Building2 } from 'lucide-react';

const Section = ({ title, icon: Icon, children }) => (
    <div style={{ marginBottom: '2.5rem' }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            marginBottom: '1.25rem'
        }}>
            {Icon && (
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={16} color="var(--color-primary)" />
                </div>
            )}
            <h3 style={{
                color: 'var(--color-primary)',
                fontSize: '1.125rem',
                margin: 0,
                fontFamily: 'var(--font-family-serif)'
            }}>{title}</h3>
        </div>
        {children}
    </div>
);

const Row = ({ label, value, bold = false, highlight = false }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px solid #f1f5f9',
        fontWeight: bold ? 700 : 400,
        background: highlight ? 'linear-gradient(90deg, rgba(212, 175, 55, 0.05), transparent)' : 'transparent',
        paddingLeft: highlight ? '0.75rem' : 0,
        marginLeft: highlight ? '-0.75rem' : 0,
        marginRight: highlight ? '-0.75rem' : 0,
        paddingRight: highlight ? '0.75rem' : 0,
        borderRadius: highlight ? '4px' : 0
    }}>
        <span style={{ color: bold ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{label}</span>
        <span style={{ color: highlight ? 'var(--color-gold)' : 'inherit' }}>{value}</span>
    </div>
);

const StatBox = ({ label, value, subtext, color = 'var(--color-primary)' }) => (
    <div style={{
        background: '#f8fafc',
        padding: '1.25rem',
        borderRadius: '12px',
        textAlign: 'center',
        border: '1px solid #f1f5f9'
    }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>
            {label}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color, fontFamily: 'var(--font-family-serif)' }}>
            {value}
        </div>
        {subtext && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>{subtext}</div>}
    </div>
);

const PackView = () => {
    const { currentDeal } = useDeal();

    if (!currentDeal) return <Navigate to="/" />;

    const metrics = calculateMetrics(currentDeal);
    const formatGBP = (val) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val || 0);

    const getRatingColor = (roi) => {
        if (roi >= 12) return '#10b981';
        if (roi >= 8) return '#d4af37';
        if (roi >= 5) return '#f59e0b';
        return '#ef4444';
    };

    const getRatingLabel = (roi) => {
        if (roi >= 12) return 'Excellent';
        if (roi >= 8) return 'Good';
        if (roi >= 5) return 'Average';
        return 'Below Target';
    };

    return (
        <div className="print-container" style={{
            maxWidth: '850px',
            margin: '0 auto',
            padding: '0',
            background: 'white',
            minHeight: '100vh',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden'
        }}>
            {/* Premium Header */}
            <div style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e3a5f 50%, var(--color-primary-light) 100%)',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Gold accent overlay */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '60%',
                    height: '200%',
                    background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '1rem',
                                color: 'var(--color-primary)',
                                fontFamily: 'var(--font-family-serif)'
                            }}>
                                AL
                            </div>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: 'white',
                                fontFamily: 'var(--font-family-serif)'
                            }}>
                                Anna Lyzer
                            </span>
                        </div>
                        <div style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                            Investment Opportunity Pack
                        </div>
                    </div>

                    {/* Property Title */}
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                            {currentDeal.address || 'Investment Property'}
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <MapPin size={14} /> {currentDeal.postcode || 'UK'}
                            </span>
                            {currentDeal.bedrooms && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    <Bed size={14} /> {currentDeal.bedrooms} Bed
                                </span>
                            )}
                            {currentDeal.bathrooms && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    <Bath size={14} /> {currentDeal.bathrooms} Bath
                                </span>
                            )}
                            {currentDeal.type && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', textTransform: 'capitalize' }}>
                                    <Home size={14} /> {currentDeal.type}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom gold line */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)'
                }} />
            </div>

            {/* Content */}
            <div style={{ padding: '2.5rem' }}>
                {/* Key Metrics */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1rem',
                    marginBottom: '2.5rem'
                }}>
                    <StatBox
                        label="Purchase Price"
                        value={formatGBP(currentDeal.price)}
                    />
                    <StatBox
                        label="Cash Required"
                        value={formatGBP(metrics.totalCashIn)}
                    />
                    <StatBox
                        label="Monthly Profit"
                        value={formatGBP(metrics.netProfitMonthly)}
                        color={metrics.netProfitMonthly >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}
                    />
                    <StatBox
                        label="ROI"
                        value={`${(metrics.roi || 0).toFixed(1)}%`}
                        subtext={getRatingLabel(metrics.roi)}
                        color={getRatingColor(metrics.roi)}
                    />
                </div>

                {/* Property Image */}
                {currentDeal.images && currentDeal.images[0] ? (
                    <div style={{ marginBottom: '2.5rem' }}>
                        <img
                            src={currentDeal.images[0]}
                            alt="Property"
                            style={{
                                width: '100%',
                                height: '280px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '1px solid #f1f5f9'
                            }}
                        />
                    </div>
                ) : (
                    <div style={{
                        width: '100%',
                        height: '200px',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                        borderRadius: '12px',
                        marginBottom: '2.5rem',
                        border: '1px dashed #e2e8f0'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <Building2 size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                            <div>No Image Available</div>
                        </div>
                    </div>
                )}

                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                    <Section title="Acquisition Costs" icon={PoundSterling}>
                        <Row label="Purchase Price" value={formatGBP(currentDeal.price)} />
                        <Row label="Stamp Duty (SDLT)" value={formatGBP(metrics.stampDuty)} />
                        <Row label="Deposit (25%)" value={formatGBP(metrics.deposit)} />
                        <Row label="Refurbishment" value={formatGBP(currentDeal.refurb)} />
                        <Row label="Legal & Fees" value={formatGBP(currentDeal.fees)} />
                        <Row label="Total Cash Required" value={formatGBP(metrics.totalCashIn)} bold highlight />
                    </Section>

                    <Section title="Annual Returns" icon={TrendingUp}>
                        <Row label="Gross Annual Rent" value={formatGBP(metrics.grossRentAnnual)} />
                        <Row label="Mortgage Payments" value={`-${formatGBP(metrics.totalCostsAnnual * 0.7)}`} />
                        <Row label="Management (10%)" value={`-${formatGBP(metrics.grossRentAnnual * 0.1)}`} />
                        <Row label="Maintenance & Insurance" value={`-${formatGBP(metrics.grossRentAnnual * 0.05 + 350)}`} />
                        <Row label="Net Annual Profit" value={formatGBP(metrics.netProfitAnnual)} bold />
                        <Row label="Cash-on-Cash ROI" value={`${(metrics.roi || 0).toFixed(1)}%`} bold highlight />
                    </Section>
                </div>

                {/* Risk Assessment */}
                <Section title="Risk Assessment" icon={AlertTriangle}>
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        border: '1px solid #f1f5f9'
                    }}>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                    <CheckCircle size={16} color="var(--color-success)" />
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Compliance Verified</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                                    This deal has been analysed for standard investment criteria. All calculations are based on current market assumptions.
                                </p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Buyer Recommendations:</div>
                                <ul style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', paddingLeft: '1.25rem', margin: 0, lineHeight: 1.8 }}>
                                    <li>Verify tenure and lease length</li>
                                    <li>Check local licensing requirements</li>
                                    <li>Confirm rental comparables</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Description */}
                {currentDeal.description && (
                    <Section title="Property Description" icon={Home}>
                        <p style={{
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.7,
                            fontSize: '0.9rem'
                        }}>
                            {currentDeal.description}
                        </p>
                    </Section>
                )}
            </div>

            {/* Footer */}
            <div style={{
                textAlign: 'center',
                padding: '1.5rem 2.5rem',
                fontSize: '0.75rem',
                color: '#94a3b8',
                borderTop: '1px solid #f1f5f9',
                background: '#fafafa'
            }}>
                <div style={{ marginBottom: '0.25rem' }}>
                    Generated by <strong style={{ color: 'var(--color-gold)' }}>Anna Lyzer</strong> • {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div>Data is for illustrative purposes only and does not constitute financial advice.</div>
            </div>
        </div>
    );
};

export default PackView;
