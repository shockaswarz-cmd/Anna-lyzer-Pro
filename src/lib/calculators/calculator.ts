import { AcquisitionCosts, AnalysisResults, IncomeExpenses, MortgageDetails } from "../types/deal";

export function calculateAcquisitionTotal(costs: AcquisitionCosts): number {
    const base = costs.refurbishmentCost + costs.furnitureCost + costs.legalFees + costs.sourcingFee + costs.otherCosts;
    if (costs.isR2R) {
        // For R2R, we don't purchase the property.
        // Usually need 1st month rent + deposit (often ~1 month rent equivalent) if not included in "other"
        // But let's assume 'legalFees' covers setup and 'sourcing' covers fee.
        return base;
    } else {
        return base + costs.purchasePrice + costs.stampDuty + costs.surveyFees;
    }
}

export function calculateCashRequired(costs: AcquisitionCosts, mortgage: MortgageDetails): number {
    const totalCost = calculateAcquisitionTotal(costs);
    if (costs.isR2R) {
        return totalCost; // All costs are cash in R2R
    }

    // Purchase: Cash = Total Cost - Mortgage Amount
    const mortgageAmount = costs.purchasePrice * (mortgage.ltv / 100);
    return totalCost - mortgageAmount;
}

export function calculateMonthlyExpenses(income: IncomeExpenses, mortgage: MortgageDetails, costs: AcquisitionCosts): number {
    let mortgagePayment = 0;

    if (!costs.isR2R) {
        const mortgageAmount = costs.purchasePrice * (mortgage.ltv / 100);
        // Simple interest only calc for MVP
        mortgagePayment = (mortgageAmount * (mortgage.interestRate / 100)) / 12;
    } else {
        // R2R: The "Mortgage" is effectively the Rent to Owner
        mortgagePayment = costs.rentToOwner || 0;
    }

    const totalOpex =
        income.managementFeeMonthly +
        income.utilitiesMonthly +
        income.insuranceMonthly +
        income.councilTaxMonthly +
        income.maintenanceMonthly +
        income.otherMonthlyCosts;

    return mortgagePayment + totalOpex;
}

export function calculateMetrics(
    costs: AcquisitionCosts,
    mortgage: MortgageDetails,
    income: IncomeExpenses
): AnalysisResults {

    const cashRequired = calculateCashRequired(costs, mortgage);
    const monthlyExpenses = calculateMonthlyExpenses(income, mortgage, costs);
    const monthlyCashflow = income.grossMonthlyRent - monthlyExpenses;
    const annualCashflow = monthlyCashflow * 12;

    // ROI = Annual Cashflow / Cash Invested
    const roi = cashRequired > 0 ? (annualCashflow / cashRequired) * 100 : 0;

    // Net Yield (Total Income - Costs) / Property Value. 
    // For R2R, "Yield" is less standard, often just ROI is used.
    // We'll use Price for Purchase, and maybe "Capital Deployed" for R2R denominator? or 0.
    const propertyValue = costs.purchasePrice || 0;
    const netYield = (!costs.isR2R && propertyValue > 0)
        ? (annualCashflow / propertyValue) * 100
        : 0; // Yield doesn't make sense for R2R in the same way

    const grossYield = (!costs.isR2R && propertyValue > 0)
        ? ((income.grossMonthlyRent * 12) / propertyValue) * 100
        : 0;

    return {
        totalCashRequired: cashRequired,
        totalInvestment: calculateAcquisitionTotal(costs),
        grossYield,
        netYield,
        monthlyCashflow,
        annualCashflow,
        roi,
        paybackMonths: annualCashflow > 0 ? (cashRequired / (annualCashflow / 12)) : 0
    };
}
