import React from 'react';
import { Card } from '../../components/ui';

export const StrategyToggle = ({ activeStrategy, onStrategyChange }) => {
    const strategies = [
        { id: 'btl', label: 'BTL (Single Let)' },
        { id: 'hmo', label: 'HMO' },
        { id: 'brrr', label: 'BRRR' },
        { id: 'sa', label: 'Serviced Accommodation' },
        { id: 'flip', label: 'Flip' }
    ];

    return (
        <div className="strategy-toggle-container">
            {strategies.map((strat) => (
                <button
                    key={strat.id}
                    onClick={() => onStrategyChange(strat.id)}
                    className={`strategy-toggle-btn ${activeStrategy === strat.id ? 'active' : ''}`}
                >
                    {strat.label}
                </button>
            ))}
        </div>
    );
};
