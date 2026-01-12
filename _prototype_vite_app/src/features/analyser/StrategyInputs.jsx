import React from 'react';
import { Card, Input, Label, Select } from '../../components/ui';
import { Hammer, PoundSterling, Percent, Home, Shield } from 'lucide-react';

const SectionTitle = ({ icon: Icon, children }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1.25rem',
        marginBottom: '0.75rem'
    }}>
        {Icon && <Icon size={14} color="var(--color-gold)" />}
        <span style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-gold)',
            fontWeight: '700'
        }}>
            {children}
        </span>
    </div>
);

export const StrategyInputs = ({ activeStratData, dealMode, activeTab, onInput }) => {
    return (
        <Card className="gold-accent-top" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Gold top accent */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))'
            }} />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #f1f5f9'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Hammer size={18} color="var(--color-primary)" />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{activeStratData.label}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Input Parameters</span>
                </div>
            </div>

            <div className="inputs-grid">
                {dealMode === 'sale' ? (
                    <>
                        <SectionTitle icon={PoundSterling}>Acquisition</SectionTitle>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <Label>Purchase Price</Label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontWeight: '600' }}>£</span>
                                    <Input type="number" style={{ paddingLeft: '28px' }} value={activeStratData.price} onChange={(e) => onInput('price', e.target.value)} />
                                </div>
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <Label>Refurb Cost</Label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontWeight: '600' }}>£</span>
                                    <Input type="number" style={{ paddingLeft: '28px' }} value={activeStratData.refurb} onChange={(e) => onInput('refurb', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label>Legal Fees</Label>
                                <Input type="number" value={activeStratData.legalFees} onChange={(e) => onInput('legalFees', e.target.value)} />
                            </div>
                            <div>
                                <Label>Survey</Label>
                                <Input type="number" value={activeStratData.surveyFees} onChange={(e) => onInput('surveyFees', e.target.value)} />
                            </div>
                            <div>
                                <Label>Broker Fees</Label>
                                <Input type="number" value={activeStratData.brokerFees || 0} onChange={(e) => onInput('brokerFees', e.target.value)} />
                            </div>
                        </div>

                        {(activeTab === 'flip' || activeTab === 'brrr') && (
                            <>
                                <SectionTitle icon={Percent}>Exit / Refinance</SectionTitle>
                                <div className="input-row">
                                    <div>
                                        <Label>{activeTab === 'flip' ? 'Resale (GDV)' : 'End Value'}</Label>
                                        <Input type="number" value={activeStratData.gdv || 0} onChange={(e) => onInput('gdv', e.target.value)} />
                                    </div>
                                    {activeTab === 'flip' ? (
                                        <div>
                                            <Label>Holding (months)</Label>
                                            <Input type="number" value={activeStratData.holdingMonths || 6} onChange={(e) => onInput('holdingMonths', e.target.value)} />
                                        </div>
                                    ) : (
                                        <div>
                                            <Label>Refi LTV %</Label>
                                            <Input type="number" value={activeStratData.refiLtv || 75} onChange={(e) => onInput('refiLtv', e.target.value)} />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <SectionTitle icon={Percent}>Finance & Operating Costs</SectionTitle>
                        <div className="input-row">
                            <div>
                                <Label>Deposit %</Label>
                                <Input type="number" value={activeStratData.depositPercent || 25} onChange={(e) => onInput('depositPercent', e.target.value)} />
                            </div>
                            <div>
                                <Label>Interest Rate %</Label>
                                <Input type="number" value={activeStratData.mortgageRate || 5} onChange={(e) => onInput('mortgageRate', e.target.value)} />
                            </div>
                            <div>
                                <Label>Monthly Rent</Label>
                                <Input type="number" value={activeStratData.monthlyRent || 0} onChange={(e) => onInput('monthlyRent', e.target.value)} />
                            </div>
                            <div>
                                <Label>Insurance (pm)</Label>
                                <Input type="number" value={activeStratData.insurance || 0} onChange={(e) => onInput('insurance', e.target.value)} />
                            </div>
                        </div>

                        <SectionTitle icon={Home}>Tenure & Regulation</SectionTitle>
                        <div className="input-row">
                            <div>
                                <Label>Tenure</Label>
                                <Select
                                    value={activeStratData.tenure || 'freehold'}
                                    onChange={(e) => onInput('tenure', e.target.value)}
                                >
                                    <option value="freehold">Freehold</option>
                                    <option value="leasehold">Leasehold</option>
                                </Select>
                            </div>
                            <div>
                                <Label>Service Charge (pm)</Label>
                                <Input type="number" value={activeStratData.serviceCharge || 0} onChange={(e) => onInput('serviceCharge', e.target.value)} />
                            </div>
                        </div>
                        {activeStratData.tenure === 'leasehold' && (
                            <div className="input-row" style={{ marginTop: '0.75rem' }}>
                                <div>
                                    <Label>Lease Years</Label>
                                    <Input type="number" value={activeStratData.leaseYears || 99} onChange={(e) => onInput('leaseYears', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Ground Rent (pa)</Label>
                                    <Input type="number" value={activeStratData.groundRent || 0} onChange={(e) => onInput('groundRent', e.target.value)} />
                                </div>
                            </div>
                        )}

                        <SectionTitle icon={Shield}>Compliance Checks</SectionTitle>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                color: activeStratData.isArticle4 ? 'var(--color-warning)' : 'var(--color-text-muted)'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={activeStratData.isArticle4}
                                    onChange={(e) => onInput('isArticle4', e.target.checked)}
                                    style={{ accentColor: 'var(--color-gold)' }}
                                />
                                Article 4 Area
                            </label>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                color: activeStratData.isSelectiveLicensing ? 'var(--color-warning)' : 'var(--color-text-muted)'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={activeStratData.isSelectiveLicensing}
                                    onChange={(e) => onInput('isSelectiveLicensing', e.target.checked)}
                                    style={{ accentColor: 'var(--color-gold)' }}
                                />
                                Selective Licensing
                            </label>
                        </div>
                    </>
                ) : (
                    <>
                        <SectionTitle icon={PoundSterling}>Initial Investment</SectionTitle>
                        <div className="input-row">
                            <div>
                                <Label>Deposit to Landlord</Label>
                                <Input type="number" value={activeStratData.deposit || 0} onChange={(e) => onInput('deposit', e.target.value)} />
                            </div>
                            <div>
                                <Label>Furnishing</Label>
                                <Input type="number" value={activeStratData.furnishing || 0} onChange={(e) => onInput('furnishing', e.target.value)} />
                            </div>
                            <div>
                                <Label>Refurb</Label>
                                <Input type="number" value={activeStratData.refurb || 0} onChange={(e) => onInput('refurb', e.target.value)} />
                            </div>
                        </div>

                        <SectionTitle icon={Percent}>Performance</SectionTitle>
                        {activeTab === 'sa' ? (
                            <div className="input-row">
                                <div>
                                    <Label>Nightly Rate</Label>
                                    <Input type="number" value={activeStratData.nightlyRate || 0} onChange={(e) => onInput('nightlyRate', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Occupancy %</Label>
                                    <Input type="number" value={activeStratData.occupancy || 70} onChange={(e) => onInput('occupancy', e.target.value)} />
                                </div>
                            </div>
                        ) : (
                            <div className="input-row">
                                <div>
                                    <Label>Rent to Landlord</Label>
                                    <Input type="number" value={activeStratData.rentToLandlord || 0} onChange={(e) => onInput('rentToLandlord', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Expected Income (pm)</Label>
                                    <Input type="number" value={activeStratData.expectedIncome || 0} onChange={(e) => onInput('expectedIncome', e.target.value)} />
                                </div>
                            </div>
                        )}

                        <SectionTitle icon={Home}>Monthly Costs</SectionTitle>
                        <div className="input-row">
                            <div>
                                <Label>Bills</Label>
                                <Input type="number" value={activeStratData.bills || 0} onChange={(e) => onInput('bills', e.target.value)} />
                            </div>
                            <div>
                                <Label>Council Tax</Label>
                                <Input type="number" value={activeStratData.councilTax || 0} onChange={(e) => onInput('councilTax', e.target.value)} />
                            </div>
                            <div>
                                <Label>Cleaning</Label>
                                <Input type="number" value={activeStratData.cleaning || 0} onChange={(e) => onInput('cleaning', e.target.value)} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};
