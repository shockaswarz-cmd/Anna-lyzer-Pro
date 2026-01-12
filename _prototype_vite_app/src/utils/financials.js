// UK Stamp Duty Land Tax (SDLT) - Standard Residential + 3% Surcharge default
export const calculateSDLT = (price, isAdditionalProperty = true) => {
    let tax = 0;
    const surcharge = isAdditionalProperty ? 0.03 : 0;

    // 0 - 250k
    if (price > 250000) {
        tax += 250000 * (0 + surcharge);
        // 250k - 925k
        if (price > 925000) {
            tax += (925000 - 250000) * (0.05 + surcharge);
            // 925k - 1.5m
            if (price > 1500000) {
                tax += (1500000 - 925000) * (0.10 + surcharge);
                // 1.5m+
                tax += (price - 1500000) * (0.12 + surcharge);
            } else {
                tax += (price - 250000) * (0.05 + surcharge);
            }
        } else {
            tax += (price - 250000) * (0.05 + surcharge);
        }
    } else {
        tax += price * (0 + surcharge);
    }

    // Simplified logic for MVP (Standard bands + 3%)
    // Real implementation needs exact bands: 0-250k @ 3%, 250-925 @ 8%, etc.

    // Correction for exact current bands for Additional Property:
    // 0 - 250,000 : 3%
    // 250,001 - 925,000 : 8%
    // 925,001 - 1,500,000 : 13%
    // Over 1,500,000 : 15%

    let exactTax = 0;
    let remainingParams = price;

    // Band 1: 0 - 250k
    const band1 = Math.min(remainingParams, 250000);
    exactTax += band1 * 0.03;
    remainingParams -= band1;

    if (remainingParams > 0) {
        // Band 2: 250k - 925k (675k width)
        const band2 = Math.min(remainingParams, 675000);
        exactTax += band2 * 0.08;
        remainingParams -= band2;
    }

    if (remainingParams > 0) {
        // Band 3: 925k - 1.5m (575k width)
        const band3 = Math.min(remainingParams, 575000);
        exactTax += band3 * 0.13;
        remainingParams -= band3;
    }

    if (remainingParams > 0) {
        // Band 4: 1.5m+
        exactTax += remainingParams * 0.15;
    }

    return exactTax;
};

export const calculateMortgage = (loanAmount, rate, type = 'interestOnly') => {
    const monthlyRate = rate / 100 / 12;
    if (type === 'interestOnly') {
        return (loanAmount * (rate / 100)) / 12;
    } else {
        // Repayment (standard 25yr term default for calc)
        const terms = 25 * 12;
        return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -terms));
    }
};

export const calculateMetrics = (dealData) => {
    const { price, rentMonthly, refurb, fees, mortgageRate, ltv } = dealData;

    // Cash In
    const deposit = price * (1 - (ltv / 100));
    const loanAmount = price * (ltv / 100);
    const stampDuty = calculateSDLT(price);
    const totalCashIn = deposit + stampDuty + refurb + fees;

    // Annual Income
    const grossRentAnnual = rentMonthly * 12;

    // Costs
    const mortgageAnnual = calculateMortgage(loanAmount, mortgageRate, 'interestOnly') * 12;
    const managementFee = grossRentAnnual * 0.10; // 10% default
    const maintenance = grossRentAnnual * 0.05; // 5% default
    const insurance = 350; // default

    const totalCostsAnnual = mortgageAnnual + managementFee + maintenance + insurance;
    const netProfitAnnual = grossRentAnnual - totalCostsAnnual;
    const netProfitMonthly = netProfitAnnual / 12;

    // Returns
    const grossYield = (grossRentAnnual / price) * 100;
    const netYield = (netProfitAnnual / totalCashIn) * 100; // Simplified net yield on cash employed
    const roi = (netProfitAnnual / totalCashIn) * 100;

    return {
        totalCashIn,
        stampDuty,
        deposit,
        loanAmount,
        grossRentAnnual,
        totalCostsAnnual,
        netProfitAnnual,
        netProfitMonthly,
        grossYield,
        roi
    };
};
