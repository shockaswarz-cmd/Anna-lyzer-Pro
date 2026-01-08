// UK Strategy Logic - England implementation (Phase 1.5 Completeness)
export const calculateStampDuty = (price) => {
    const bands = [
        { max: 250000, rate: 0.00 },
        { max: 925000, rate: 0.05 },
        { max: 1500000, rate: 0.10 },
        { max: Infinity, rate: 0.12 }
    ];
    const surchargeRate = 0.03;
    let totalStampDuty = 0;
    let prevMax = 0;
    for (const band of bands) {
        if (price > prevMax) {
            const taxableInBand = Math.min(price, band.max) - prevMax;
            totalStampDuty += taxableInBand * band.rate;
            prevMax = band.max;
        } else break;
    }
    return totalStampDuty + (price * surchargeRate);
};

export const getDealRating = (mode, roi, monthlyProfit, strategyType) => {
    if (monthlyProfit < 0 && !['flip', 'brrr'].includes(strategyType)) return { label: 'Poor', color: '#ef4444' };
    const thresholds = mode === 'rent' ? { poor: 10, fair: 15, good: 25 } : { poor: 8, fair: 12, good: 20 };
    if (roi >= thresholds.good) return { label: 'Excellent', color: '#15803d' };
    if (roi >= thresholds.fair) return { label: 'Good', color: '#22c55e' };
    if (roi >= thresholds.poor) return { label: 'Fair', color: '#eab308' };
    return { label: 'Poor', color: '#ef4444' };
};

const calculateSaleMetric = (inputs, type) => {
    const {
        price = 0, refurb = 0, legalFees = 1500, brokerFees = 1000, surveyFees = 500,
        depositPercent = 25, mortgageRate = 5, monthlyRent = 0, gdv = 0, agentFeePercent = 1.5,
        voidsPercent = 5, managementFeePercent = 10, maintenancePercent = 5, insurance = 30,
        refiLtv = 75, refiRate = 5.5, holdingMonths = 6
    } = inputs;

    const sdlt = calculateStampDuty(price);
    const deposit = price * (depositPercent / 100);
    const purchaseCosts = price + sdlt + legalFees + brokerFees + surveyFees + refurb;
    const totalCashIn = deposit + sdlt + legalFees + brokerFees + surveyFees + refurb;

    if (type === 'flip') {
        const resalePrice = gdv || (price * 1.3);
        const sellingCosts = (resalePrice * (agentFeePercent / 100)) + legalFees;
        const totalNetProfit = resalePrice - purchaseCosts - sellingCosts;
        const margin = resalePrice > 0 ? (totalNetProfit / resalePrice) * 100 : 0;
        const annualizedRoi = totalCashIn > 0 ? ((totalNetProfit / totalCashIn) * (12 / holdingMonths)) * 100 : 0;
        return {
            totalCashIn, monthlyProfit: 0, annualProfit: totalNetProfit,
            roi: totalCashIn > 0 ? (totalNetProfit / totalCashIn) * 100 : 0, margin, annualizedRoi,
            rating: getDealRating('sale', (totalNetProfit / totalCashIn) * 100, 0, 'flip')
        };
    }

    const mortgageAmount = price - deposit;
    const mortgageMonthly = (mortgageAmount * (mortgageRate / 100)) / 12;
    const managementFees = monthlyRent * (managementFeePercent / 100);
    const voids = monthlyRent * (voidsPercent / 100);
    const maintenance = monthlyRent * (maintenancePercent / 100);
    const monthlyCosts = mortgageMonthly + managementFees + voids + maintenance + insurance;
    const monthlyCashflow = monthlyRent - monthlyCosts;
    const annualNetProfit = monthlyCashflow * 12;
    const cashOnCash = totalCashIn > 0 ? (annualNetProfit / totalCashIn) * 100 : 0;
    const paybackMonths = monthlyCashflow > 0 ? totalCashIn / monthlyCashflow : Infinity;

    // BRRR Specifics
    let brrr = null;
    if (type === 'brrr') {
        const endValue = gdv || (price + refurb * 1.5);
        const newMortgage = endValue * (refiLtv / 100);
        const cashOut = newMortgage - mortgageAmount;
        const cashLeftInDeal = totalCashIn - cashOut;
        const equityCreated = endValue - purchaseCosts;
        brrr = { endValue, cashLeftInDeal, equityCreated, cashOut };
    }

    return {
        totalCashIn, monthlyProfit: monthlyCashflow, annualProfit: annualNetProfit,
        roi: cashOnCash, cashOnCash, grossYield: price > 0 ? ((monthlyRent * 12) / price) * 100 : 0,
        netYield: price > 0 ? (annualNetProfit / price) * 100 : 0, paybackMonths, brrr,
        rating: getDealRating('sale', cashOnCash, monthlyCashflow, type)
    };
};

const calculateRentMetric = (inputs, type) => {
    const {
        deposit = 3000, refurb = 1000, furnishing = 1000, rentToLandlord = 1000,
        expectedIncome = 2500, bills = 300, councilTax = 150, internet = 30,
        cleaning = 100, management = 0, voidsPercent = 5, nightlyRate = 0, occupancy = 70
    } = inputs;

    let income = expectedIncome;
    if (type === 'sa' && nightlyRate > 0) {
        income = nightlyRate * (occupancy / 100) * 30.42; // Avg days in month
    }

    const upfrontCosts = deposit + furnishing + refurb;
    const voids = income * (voidsPercent / 100);
    const monthlyCosts = rentToLandlord + bills + councilTax + internet + cleaning + management + voids;
    const monthlyCashflow = income - monthlyCosts;
    const annualNetProfit = monthlyCashflow * 12;
    const cashOnCash = upfrontCosts > 0 ? (annualNetProfit / upfrontCosts) * 100 : 0;
    const paybackMonths = monthlyCashflow > 0 ? upfrontCosts / monthlyCashflow : Infinity;

    return {
        totalCashIn: upfrontCosts, monthlyProfit: monthlyCashflow, annualProfit: annualNetProfit,
        roi: cashOnCash, cashOnCash, paybackMonths,
        rating: getDealRating('rent', cashOnCash, monthlyCashflow, type)
    };
};

export const calculateStrategy = (mode, strategy, inputs) => {
    return mode === 'rent' ? calculateRentMetric(inputs, strategy) : calculateSaleMetric(inputs, strategy);
};

export const getInitialStrategies = (baseDeal) => {
    const common = {
        price: baseDeal.price, monthlyRent: baseDeal.rentMonthly || 1000, refurb: 0,
        legalFees: 1500, brokerFees: 1000, surveyFees: 500, depositPercent: 25,
        mortgageRate: 5.5, agentFeePercent: 1.5, voidsPercent: 5,
        managementFeePercent: 10, maintenancePercent: 5, insurance: 30, holdingMonths: 6
    };
    return {
        btl: { ...common, label: 'BTL', type: 'btl' },
        hmo: { ...common, monthlyRent: common.monthlyRent * 2.5, refurb: 15000, label: 'HMO', type: 'hmo' },
        brrr: { ...common, refurb: 20000, gdv: baseDeal.price * 1.4, refiLtv: 75, label: 'BRRR', type: 'brrr' },
        flip: { ...common, gdv: baseDeal.price * 1.4, refurb: 25000, label: 'Flip', type: 'flip' },
        sa: { ...common, label: 'SA', type: 'sa', nightlyRate: 120, occupancy: 70 },
        r2r_single: { deposit: 3000, refurb: 1000, furnishing: 1500, rentToLandlord: 800, expectedIncome: 1200, label: 'R2R Single', type: 'r2r_single' },
        r2r_hmo: { deposit: 5000, refurb: 2000, furnishing: 3000, rentToLandlord: 1500, expectedIncome: 3500, label: 'R2R HMO', type: 'r2r_hmo' }
    };
};
