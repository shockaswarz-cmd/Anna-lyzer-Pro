
export type StrategyType = 'BTL' | 'HMO' | 'BRRR' | 'SA' | 'R2R' | 'FLIP';

export interface Address {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
}

export interface PropertyDetails {
    sourceUrl?: string;
    askingPrice: number;
    propertyType: 'Flat' | 'Terraced' | 'Semi-Detached' | 'Detached' | 'Bungalow' | 'Other';
    bedrooms: number;
    bathrooms: number;
    address: Address;
    tenure: 'Freehold' | 'Leasehold' | 'Share of Freehold';
    leaseYearsRemaining?: number;
    groundRent?: number;
    serviceCharge?: number;
    size?: number;
    sizeUnit?: 'sqft' | 'sqm';
    description?: string;
    images: string[];
    agentName?: string;
}

export interface AcquisitionCosts {
    isR2R: boolean; // Flag to distinguish Strategy
    purchasePrice: number; // For Purchase
    rentToOwner?: number; // For R2R (Monthly)
    stampDuty: number; // SDLT (Purchase)
    surveyFees: number; // Purchase
    legalFees: number; // Purchase (setup fee for R2R)
    sourcingFee: number;
    refurbishmentCost: number;
    furnitureCost: number;
    otherCosts: number;
}

export interface MortgageDetails {
    ltv: number; // Loan to Value %
    interestRate: number; // %
    termYears: number;
    productFee: number;
    monthlyPayment: number;
    isInterestOnly: boolean;
}

export interface IncomeExpenses {
    grossMonthlyRent: number;
    occupancyRate: number; // %
    managementFeeRate: number; // %
    managementFeeMonthly: number;
    utilitiesMonthly: number;
    insuranceMonthly: number;
    councilTaxMonthly: number; // Usually 0 for BTL if tenant pays, but relevant for HMO/SA
    maintenanceMonthly: number;
    otherMonthlyCosts: number; // e.g. License, Subscription
}

export interface AnalysisResults {
    totalCashRequired: number;
    totalInvestment: number; // Cash in deal
    grossYield: number; // %
    netYield: number; // %
    monthlyCashflow: number;
    annualCashflow: number;
    roi: number; // % Return on Investment
    paybackMonths: number;
}

export interface StrategyResult {
    type: StrategyType;
    isActive: boolean;
    assumptions: {
        acquisition: AcquisitionCosts;
        mortgage: MortgageDetails;
        income: IncomeExpenses;
        params: Record<string, any>; // Strategy specific params (e.g. SA nightly rate)
    };
    results: AnalysisResults;
}

export interface Deal {
    id: string;
    createdAt: string;
    updatedAt: string;
    property: PropertyDetails;
    strategies: Record<StrategyType, StrategyResult>;
    notes?: string;
}
