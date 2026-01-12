import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDeal } from '../context/DealContext';
import { Button } from '../components/ui';
import { calculateStrategy } from '../utils/strategyCalculators';
import { Save, FileText, TrendingUp, MapPin } from 'lucide-react';
import { StrategyInputs } from '../features/analyser/StrategyInputs';
import { StrategyResults } from '../features/analyser/StrategyResults';

const StrategyTab = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`strategy-tab-btn ${active ? 'active' : ''}`}>
        {label}
    </button>
);

const Analysis = () => {
    const { currentDeal, dealMode, setDealMode, strategies, updateStrategy, saveDeal } = useDeal();
    const [activeTab, setActiveTab] = useState('btl');
    const navigate = useNavigate();

    if (!currentDeal || !strategies) {
        return <Navigate to="/new-deal" />;
    }

    const activeStratData = strategies[activeTab] || {};
    const results = calculateStrategy(dealMode, activeTab, activeStratData);
    const formatGBP = (val) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val || 0);

    const handleInput = (field, val) => {
        updateStrategy(activeTab, { [field]: Number(val) });
    };

    const handleSave = () => {
        saveDeal(currentDeal);
        // Show a brief toast or notification would be nice here
    };

    return (
        <div className="analysis-container">
            {/* Premium Header */}
            <div className="premium-hero" style={{ marginBottom: '1.5rem', padding: '1.75rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <TrendingUp size={20} color="var(--color-gold)" />
                            <span style={{
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'var(--color-gold)',
                                fontWeight: '700'
                            }}>
                                Deep Analysis
                            </span>
                        </div>
                        <h1 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.375rem' }}>
                            Strategy Calculator
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                            <MapPin size={14} />
                            <span style={{ fontSize: '0.9rem' }}>{currentDeal.address || 'Property Analysis'}</span>
                            {currentDeal.postcode && (
                                <span style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '0.125rem 0.5rem',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem'
                                }}>
                                    {currentDeal.postcode}
                                </span>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        {/* Mode Toggle */}
                        <div className="mode-toggle" style={{ background: 'rgba(255,255,255,0.1)', marginRight: '0.5rem' }}>
                            <button
                                onClick={() => setDealMode('sale')}
                                className={`mode-toggle-btn ${dealMode === 'sale' ? 'active' : ''}`}
                                style={dealMode === 'sale' ? { background: 'white', color: 'var(--color-primary)' } : { color: 'rgba(255,255,255,0.7)' }}
                            >
                                For Sale
                            </button>
                            <button
                                onClick={() => setDealMode('rent')}
                                className={`mode-toggle-btn ${dealMode === 'rent' ? 'active' : ''}`}
                                style={dealMode === 'rent' ? { background: 'white', color: 'var(--color-primary)' } : { color: 'rgba(255,255,255,0.7)' }}
                            >
                                R2R
                            </button>
                        </div>
                        <Button variant="outline" onClick={handleSave} style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                            <Save size={16} /> Save
                        </Button>
                        <Button className="btn-gold" onClick={() => navigate('/pack')}>
                            <FileText size={16} /> Generate Pack
                        </Button>
                    </div>
                </div>
            </div>

            {/* Strategy Tabs */}
            <div className="strategy-tabs">
                {Object.values(strategies).map(s => (
                    <StrategyTab key={s.type} label={s.label} active={activeTab === s.type} onClick={() => setActiveTab(s.type)} />
                ))}
            </div>

            <div className="analysis-grid">
                {/* Left: Inputs */}
                <div>
                    <StrategyInputs
                        activeStratData={activeStratData}
                        dealMode={dealMode}
                        activeTab={activeTab}
                        onInput={handleInput}
                    />
                </div>

                {/* Right: Results */}
                <div>
                    <StrategyResults
                        currentDeal={currentDeal}
                        activeStratData={activeStratData}
                        dealMode={dealMode}
                        results={results}
                        formatGBP={formatGBP}
                    />
                </div>
            </div>
        </div>
    );
};

export default Analysis;
