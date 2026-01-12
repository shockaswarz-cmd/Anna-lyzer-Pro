import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui';
import { AlertTriangle, CheckCircle, Info, Loader2, ShieldAlert } from 'lucide-react';
import { detectRisks } from '../../utils/riskEngine';

const RiskItem = ({ label, status, details }) => {
    const getIcon = () => {
        switch (status) {
            case 'danger': return <AlertTriangle size={18} color="#ef4444" />;
            case 'warning': return <AlertTriangle size={18} color="#f59e0b" />;
            case 'success': return <CheckCircle size={18} color="#22c55e" />;
            default: return <Info size={18} color="#94a3b8" />;
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ marginTop: '2px' }}>{getIcon()}</div>
            <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.125rem' }}>{details}</div>
            </div>
        </div>
    );
};

export const RiskAnalysis = ({ deal, activeStratData }) => {
    const [loading, setLoading] = useState(false);
    const [floodData, setFloodData] = useState(null);

    useEffect(() => {
        const fetchRiskData = async () => {
            if (!deal.postcode) return;
            setLoading(true);
            try {
                // Use relative path for local proxy
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/flood-risk?postcode=${deal.postcode}`);
                const data = await response.json();
                setFloodData(data);
            } catch (e) {
                console.error('Risk API fail', e);
            } finally {
                setLoading(false);
            }
        };
        fetchRiskData();
    }, [deal.postcode]);

    const dynamicRisks = detectRisks(activeStratData, activeStratData.type);

    // Flood Logic
    const hasPostcode = !!deal.postcode;
    const isHighRiskArea = deal.postcode?.toUpperCase().startsWith('E1') ||
        deal.postcode?.toUpperCase().startsWith('SE1') ||
        deal.postcode?.toUpperCase().startsWith('SW1');

    const environmentalRisks = [];
    if (loading) {
        environmentalRisks.push({ label: 'Flood Registry', status: 'info', details: 'Querying Environment Agency...' });
    } else if (floodData?.items?.length > 0) {
        environmentalRisks.push({ label: 'ACTIVE FLOOD ALERT', status: 'danger', details: floodData.items[0].description });
    } else if (isHighRiskArea) {
        environmentalRisks.push({ label: 'Flood Hint', status: 'warning', details: 'Postcode prefix flagged as historically higher risk. Verify locally.' });
    } else if (hasPostcode) {
        environmentalRisks.push({ label: 'Flood Registry', status: 'success', details: 'No active warnings found for this postcode.' });
    }

    return (
        <Card style={{ marginTop: '2rem', border: '1px solid #fee2e2' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={20} color="#ef4444" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Risk & Due Diligence</h3>
            </div>

            <div style={{ background: 'white' }}>
                {environmentalRisks.map((r, i) => (
                    <RiskItem key={`env-${i}`} label={r.label} status={r.status} details={r.details} />
                ))}
                {dynamicRisks.map((r, i) => (
                    <RiskItem key={`dyn-${i}`} label={r.label} status={r.status} details={r.details} />
                ))}
                {dynamicRisks.length === 0 && environmentalRisks.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                        No significant risks detected for current inputs.
                    </div>
                )}
            </div>
            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </Card>
    );
};
