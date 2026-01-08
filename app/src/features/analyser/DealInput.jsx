import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Label, Select } from '../../components/ui';
import { Search, PenTool, Link as LinkIcon, ArrowRight, Loader2, Building2, MapPin, Sparkles } from 'lucide-react';
import { scrapeDeal } from '../../utils/scraper';
import { useDeal } from '../../context/DealContext';

const DealInput = () => {
    const navigate = useNavigate();
    const { setDeal } = useDeal();
    const [loading, setLoading] = useState(false);

    const [mode, setMode] = useState('url'); // 'url' or 'manual'
    const [url, setUrl] = useState('');

    const [formData, setFormData] = useState({
        address: '', postcode: '', price: '', type: 'terraced', bedrooms: '', tenure: 'freehold'
    });

    const handleManualSubmit = (e) => {
        e.preventDefault();
        const deal = {
            id: Date.now().toString(), type: formData.type, ...formData,
            price: Number(formData.price), bedrooms: Number(formData.bedrooms),
            rentMonthly: Number(formData.price) * 0.005, refurb: 10000, fees: 2000, mortgageRate: 5.5, ltv: 75
        };
        setDeal(deal);
        navigate('/analysis');
    };

    const handleUrlSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;
        setLoading(true);
        try {
            const scrapedData = await scrapeDeal(url);
            const deal = {
                ...scrapedData,
                rentMonthly: scrapedData.estimatedRent || 1000, refurb: scrapedData.estimatedRefurb || 0,
                fees: 2000, mortgageRate: 5.5, ltv: 75
            };
            setDeal(deal);
            navigate('/analysis');
        } catch (error) {
            console.error('Failed to scrape:', error);
            alert('Failed to import deal. Please try again or use manual entry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="deal-input-wrapper" style={{ paddingTop: '1rem' }}>
            {/* Hero Header */}
            <div className="premium-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)',
                        borderRadius: '16px',
                        marginBottom: '1.25rem',
                        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
                    }}>
                        <Sparkles size={28} color="var(--color-primary)" />
                    </div>
                    <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Source New Deal</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px', margin: '0 auto' }}>
                        Import from property portals or enter details manually
                    </p>
                </div>
            </div>

            {/* Mode Toggle */}
            <div className="deal-input-modes" style={{ marginBottom: '1.5rem' }}>
                <Button
                    variant={mode === 'url' ? 'primary' : 'outline'}
                    onClick={() => setMode('url')}
                    style={{ minWidth: '160px' }}
                >
                    <LinkIcon size={16} /> Import from URL
                </Button>
                <Button
                    variant={mode === 'manual' ? 'primary' : 'outline'}
                    onClick={() => setMode('manual')}
                    style={{ minWidth: '160px' }}
                >
                    <PenTool size={16} /> Manual Entry
                </Button>
            </div>

            {/* Main Card */}
            <Card className="animate-fade-in-up" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Gold top accent */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))'
                }} />

                {mode === 'url' ? (
                    <form onSubmit={handleUrlSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <Label htmlFor="url" style={{ marginBottom: '0.5rem', display: 'block' }}>
                                Property Portal URL
                            </Label>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                                Supports Rightmove, Zoopla, OnTheMarket & more
                            </p>
                            <div style={{ position: 'relative' }}>
                                <Search size={20} style={{
                                    position: 'absolute',
                                    left: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-light)'
                                }} />
                                <Input
                                    id="url"
                                    placeholder="https://www.rightmove.co.uk/properties/..."
                                    style={{ paddingLeft: '44px', fontSize: '0.95rem' }}
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Supported Portals */}
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap'
                        }}>
                            {['Rightmove', 'Zoopla', 'OnTheMarket', 'Gumtree'].map(portal => (
                                <span key={portal} style={{
                                    padding: '0.375rem 0.75rem',
                                    background: '#f8fafc',
                                    borderRadius: '99px',
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    {portal}
                                </span>
                            ))}
                        </div>

                        <Button
                            type="submit"
                            className={loading ? '' : 'btn-gold'}
                            style={{ width: '100%' }}
                            disabled={loading || !url}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="spin" />
                                    Analysing Property...
                                </>
                            ) : (
                                <>
                                    Start Analysis
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleManualSubmit}>
                        <div className="inputs-grid">
                            {/* Address Section */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                <MapPin size={16} color="var(--color-gold)" />
                                <span style={{
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--color-gold)',
                                    fontWeight: '700'
                                }}>
                                    Property Location
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div>
                                    <Label>Address</Label>
                                    <Input
                                        placeholder="123 High Street, London"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Postcode</Label>
                                    <Input
                                        placeholder="SW1A 1AA"
                                        value={formData.postcode}
                                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Property Details */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                <Building2 size={16} color="var(--color-gold)" />
                                <span style={{
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--color-gold)',
                                    fontWeight: '700'
                                }}>
                                    Property Details
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div>
                                    <Label>Asking Price</Label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--color-text-muted)',
                                            fontWeight: '600'
                                        }}>£</span>
                                        <Input
                                            type="number"
                                            placeholder="250,000"
                                            style={{ paddingLeft: '28px' }}
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Bedrooms</Label>
                                    <Input
                                        type="number"
                                        placeholder="3"
                                        value={formData.bedrooms}
                                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Property Type</Label>
                                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="detached">Detached</option>
                                        <option value="semi-detached">Semi-Detached</option>
                                        <option value="terraced">Terraced</option>
                                        <option value="flat">Flat / Apartment</option>
                                        <option value="bungalow">Bungalow</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Tenure</Label>
                                    <Select value={formData.tenure} onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}>
                                        <option value="freehold">Freehold</option>
                                        <option value="leasehold">Leasehold</option>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
                            Create Deal & Analyse
                            <ArrowRight size={18} />
                        </Button>
                    </form>
                )}
            </Card>

            {/* Help text */}
            <p style={{
                textAlign: 'center',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginTop: '1.5rem'
            }}>
                Data is automatically extracted and can be edited during analysis
            </p>
        </div>
    );
};

export default DealInput;
