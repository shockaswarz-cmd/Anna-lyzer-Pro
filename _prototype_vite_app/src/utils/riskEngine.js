/**
 * Phase 2 - Intelligence & Risk Engine
 * Provides heuristics for risk detection and ROI drivers.
 */

export const calculateConfidence = (inputs, source) => {
    let score = 70; // Base score
    if (source === 'manual') score -= 10;

    // Check for missing key assumptions
    const keys = ['refurb', 'monthlyRent', 'insurance'];
    keys.forEach(k => {
        if (!inputs[k] || inputs[k] === 0) score -= 10;
    });

    if (score < 40) return { label: 'Low', color: '#ef4444', value: score };
    if (score < 70) return { label: 'Medium', color: '#eab308', value: score };
    return { label: 'High', color: '#22c55e', value: score };
};

export const detectRisks = (inputs, activeTab) => {
    const risks = [];

    // Leasehold Risks
    if (inputs.tenure === 'leasehold') {
        if (inputs.leaseYears < 85) {
            risks.push({
                label: 'Short Lease',
                status: 'danger',
                details: `Only ${inputs.leaseYears} years remaining. Lending may be restricted.`
            });
        }
        if (inputs.groundRent > (inputs.price * 0.001)) { // Ground rent > 0.1% price
            risks.push({
                label: 'Escalating Ground Rent',
                status: 'warning',
                details: 'Ground rent is high relative to property value. Check for doubling clauses.'
            });
        }
    }

    // Service Charge
    if (inputs.serviceCharge > (inputs.monthlyRent * 0.20)) {
        risks.push({
            label: 'High Service Charge',
            status: 'warning',
            details: 'Service charge consumes > 20% of monthly gross rent.'
        });
    }

    // Regulation
    if (inputs.isArticle4) {
        risks.push({
            label: 'Article 4 Area',
            status: 'warning',
            details: 'Article 4 direction in place. Conversion to HMO requires Planning Permission.'
        });
    }

    // SA Viability
    if (activeTab === 'sa' && inputs.occupancy < 55) {
        risks.push({
            label: 'Low SA Occupancy',
            status: 'danger',
            details: 'Occupancy below 55% often leads to negative cashflow for SA.'
        });
    }

    return risks;
};

export const getDrivers = (results, inputs) => {
    const drivers = [];

    // Heuristic: What contributed most?
    if (results.roi > 15) {
        if (inputs.refurb < 5000) drivers.push({ label: 'Low Refurb Cost', impact: 'high' });
        if (inputs.depositPercent < 25) drivers.push({ label: 'High Leverage (Low Deposit)', impact: 'med' });
    }

    if (results.annualProfit > 5000) {
        drivers.push({ label: 'Strong Rental Demand', impact: 'high' });
    }

    // Default driver if ROI is ok
    if (drivers.length === 0 && results.roi > 5) {
        drivers.push({ label: 'Stable Yield', impact: 'med' });
    }

    return drivers.slice(0, 3);
};
