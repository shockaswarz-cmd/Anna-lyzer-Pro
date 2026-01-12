import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInitialStrategies } from '../utils/strategyCalculators';

const DealContext = createContext();

export const DealProvider = ({ children }) => {
    const [currentDeal, setCurrentDeal] = useState(null);
    const [savedDeals, setSavedDeals] = useState([]);

    // New Global State for Deep Analysis
    const [dealMode, setDealMode] = useState('sale'); // 'sale' | 'rent'
    const [strategies, setStrategies] = useState(null);

    // When a new deal is set, initialize its strategies
    useEffect(() => {
        if (currentDeal && !currentDeal.strategies) {
            setStrategies(getInitialStrategies(currentDeal));
        } else if (currentDeal && currentDeal.strategies) {
            setStrategies(currentDeal.strategies);
        }
    }, [currentDeal]);

    const updateStrategy = (key, updates) => {
        setStrategies(prev => ({
            ...prev,
            [key]: { ...prev[key], ...updates }
        }));
    };

    const saveDeal = (deal) => {
        const dealToSave = {
            ...deal,
            strategies, // Save the independent analysis
            mode: dealMode,
            id: deal.id || Date.now()
        };
        setSavedDeals([...savedDeals, dealToSave]);
    };

    return (
        <DealContext.Provider value={{
            currentDeal,
            setDeal: setCurrentDeal,
            savedDeals,
            saveDeal,
            dealMode,
            setDealMode,
            strategies,
            updateStrategy
        }}>
            {children}
        </DealContext.Provider>
    );
};

export const useDeal = () => useContext(DealContext);
