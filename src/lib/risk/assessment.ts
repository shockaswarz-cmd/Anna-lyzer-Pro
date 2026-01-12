// Risk Assessment Engine for UK Property Deals
// Detects red flags based on tenure, lease, flood, and financial ratios

import { PropertyDetails, AcquisitionCosts, IncomeExpenses, MortgageDetails } from '../types/deal';

export type RiskSeverity = 'info' | 'warning' | 'danger';

export interface RiskFlag {
    id: string;
    category: 'tenure' | 'financial' | 'legal' | 'location' | 'regulatory';
    severity: RiskSeverity;
    title: string;
    description: string;
    recommendation?: string;
}

export interface RiskAssessment {
    overallScore: number; // 0-100 (100 = no risk)
    flags: RiskFlag[];
    dataConfidence: 'high' | 'medium' | 'low';
}

// Tenure & Leasehold Risk Detection
function assessTenureRisks(property: PropertyDetails): RiskFlag[] {
    const flags: RiskFlag[] = [];

    // Leasehold with short lease
    if (property.tenure === 'Leasehold' && property.leaseYearsRemaining) {
        if (property.leaseYearsRemaining < 80) {
            flags.push({
                id: 'short-lease-critical',
                category: 'tenure',
                severity: 'danger',
                title: 'Critical Short Lease',
                description: `Only ${property.leaseYearsRemaining} years remaining. Most lenders require 80+ years at end of mortgage term.`,
                recommendation: 'Factor in lease extension costs (£10-50k+). Negotiate price reduction or avoid.'
            });
        } else if (property.leaseYearsRemaining < 100) {
            flags.push({
                id: 'short-lease-warning',
                category: 'tenure',
                severity: 'warning',
                title: 'Short Lease Warning',
                description: `${property.leaseYearsRemaining} years remaining. Will need extension within mortgage term.`,
                recommendation: 'Budget for lease extension (typically £5-15k for 90+ years).'
            });
        }
    }

    // High Ground Rent
    if (property.groundRent && property.groundRent > 250) {
        const severity = property.groundRent > 500 ? 'danger' : 'warning';
        flags.push({
            id: 'high-ground-rent',
            category: 'tenure',
            severity,
            title: 'High Ground Rent',
            description: `£${property.groundRent}/year may affect mortgageability. Some lenders cap at £250/year.`,
            recommendation: 'Check for escalation clauses. May need specialist lender.'
        });
    }

    // High Service Charge (if provided)
    if (property.serviceCharge && property.serviceCharge > 3000) {
        flags.push({
            id: 'high-service-charge',
            category: 'financial',
            severity: property.serviceCharge > 5000 ? 'danger' : 'warning',
            title: 'High Service Charge',
            description: `£${property.serviceCharge}/year significantly impacts cashflow and yield.`,
            recommendation: 'Request breakdown and last 3 years history. Check reserve fund.'
        });
    }

    return flags;
}

// Financial Viability Risks
function assessFinancialRisks(
    property: PropertyDetails,
    costs: AcquisitionCosts,
    income: IncomeExpenses,
    mortgage: MortgageDetails
): RiskFlag[] {
    const flags: RiskFlag[] = [];

    // If purchase deal
    if (!costs.isR2R) {
        const annualRent = income.grossMonthlyRent * 12;
        const grossYield = property.askingPrice > 0
            ? (annualRent / property.askingPrice) * 100
            : 0;

        // Low Yield Warning
        if (grossYield > 0 && grossYield < 5) {
            flags.push({
                id: 'low-yield',
                category: 'financial',
                severity: grossYield < 4 ? 'danger' : 'warning',
                title: 'Low Gross Yield',
                description: `${grossYield.toFixed(1)}% gross yield is below the typical 5%+ target for BTL.`,
                recommendation: 'Re-negotiate purchase price or explore higher-income strategies (HMO/SA).'
            });
        }

        // ICR Check (Landlord stress test)
        const mortgageAmount = property.askingPrice * (mortgage.ltv / 100);
        const monthlyMortgage = (mortgageAmount * (mortgage.interestRate / 100)) / 12;
        const icr = monthlyMortgage > 0 ? income.grossMonthlyRent / monthlyMortgage : 0;

        if (icr > 0 && icr < 1.25) {
            flags.push({
                id: 'icr-fail',
                category: 'financial',
                severity: 'danger',
                title: 'ICR Below 125%',
                description: `Interest Coverage Ratio is ${(icr * 100).toFixed(0)}%. Lenders typically require 125-145%.`,
                recommendation: 'Increase deposit (lower LTV) or increase rent to pass stress tests.'
            });
        }
    } else {
        // R2R Specific: Margin too thin
        const rentToOwner = costs.rentToOwner || 0;
        const margin = income.grossMonthlyRent - rentToOwner;

        if (margin > 0 && margin < 300) {
            flags.push({
                id: 'r2r-thin-margin',
                category: 'financial',
                severity: margin < 200 ? 'danger' : 'warning',
                title: 'Thin R2R Margin',
                description: `£${margin}/month margin leaves little room for voids, repairs, or bills.`,
                recommendation: 'Aim for £400+ margin minimum. Consider room-by-room letting.'
            });
        }
    }

    return flags;
}

// Property Type / Location Indicators
function assessPropertyRisks(property: PropertyDetails): RiskFlag[] {
    const flags: RiskFlag[] = [];

    // Flat type - often more complex
    if (property.propertyType === 'Flat') {
        flags.push({
            id: 'flat-considerations',
            category: 'legal',
            severity: 'info',
            title: 'Flat/Apartment Considerations',
            description: 'Flats typically have leasehold tenure, service charges, and freeholder permissions may be needed.',
            recommendation: 'Check lease for subletting restrictions, pet policies, and HMO clauses.'
        });
    }

    // Description keyword scanning for flood/subsidence hints
    const desc = (property.description || '').toLowerCase();
    if (desc.includes('flood') || desc.includes('subsidence') || desc.includes('underpinning')) {
        flags.push({
            id: 'flood-subsidence-mention',
            category: 'location',
            severity: 'warning',
            title: 'Flood/Subsidence Mentioned',
            description: 'Listing or description mentions potential flood or subsidence history.',
            recommendation: 'Check Environment Agency flood maps and request specialist survey.'
        });
    }

    return flags;
}

// Calculate overall risk score
function calculateRiskScore(flags: RiskFlag[]): number {
    let score = 100;

    for (const flag of flags) {
        if (flag.severity === 'danger') score -= 25;
        else if (flag.severity === 'warning') score -= 10;
        else if (flag.severity === 'info') score -= 2;
    }

    return Math.max(0, score);
}

// Determine data confidence
function assessDataConfidence(property: PropertyDetails): 'high' | 'medium' | 'low' {
    let score = 0;

    if (property.sourceUrl) score += 2;
    if (property.tenure && property.tenure !== 'Freehold') score += 1; // Leasehold data available
    if (property.leaseYearsRemaining) score += 2;
    if (property.groundRent !== undefined) score += 1;
    if (property.serviceCharge !== undefined) score += 1;
    if (property.description && property.description.length > 100) score += 1;
    if (property.images && property.images.length > 2) score += 1;

    if (score >= 6) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
}

// Main Assessment Function
export function assessDealRisk(
    property: PropertyDetails,
    costs: AcquisitionCosts,
    income: IncomeExpenses,
    mortgage: MortgageDetails
): RiskAssessment {
    const allFlags: RiskFlag[] = [
        ...assessTenureRisks(property),
        ...assessFinancialRisks(property, costs, income, mortgage),
        ...assessPropertyRisks(property)
    ];

    return {
        overallScore: calculateRiskScore(allFlags),
        flags: allFlags,
        dataConfidence: assessDataConfidence(property)
    };
}
