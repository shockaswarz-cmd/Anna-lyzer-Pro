// Risk Assessment Engine for UK Property Deals
// Detects red flags based on tenure, lease, flood, and financial ratios

import { PropertyDetails, AcquisitionCosts, IncomeExpenses, MortgageDetails } from '../types/deal';
import { getFloodRisk, FloodRiskResult } from './floodRisk';
import { getEPCRating, meetsRentalRequirements, EPCResult } from './epcLookup';

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

// Known Article 4 Direction areas (major UK cities with HMO restrictions)
// These postcodes have blanket or partial Article 4 directions requiring planning permission for HMOs
const ARTICLE_4_AREAS: { [key: string]: string } = {
    'B': 'Birmingham - Article 4 in multiple wards',
    'BS': 'Bristol - City-wide Article 4',
    'BN': 'Brighton - Article 4 in central areas',
    'CB': 'Cambridge - City-wide Article 4',
    'CF': 'Cardiff - Multiple Article 4 zones',
    'CV': 'Coventry - Article 4 in student areas',
    'EX': 'Exeter - City-wide Article 4',
    'GL': 'Gloucester - Article 4 zones',
    'HU': 'Hull - Article 4 in specific wards',
    'LE': 'Leicester - Article 4 in inner city',
    'LN': 'Lincoln - Article 4 zones',
    'LS': 'Leeds - Article 4 in Headingley/Hyde Park',
    'L': 'Liverpool - Multiple Article 4 zones',
    'M': 'Manchester - Article 4 in South Manchester',
    'NE': 'Newcastle - Article 4 in Jesmond',
    'NG': 'Nottingham - City-wide Article 4',
    'OX': 'Oxford - City-wide Article 4',
    'PO': 'Portsmouth - City-wide Article 4',
    'RG': 'Reading - Article 4 zones',
    'S': 'Sheffield - Article 4 in specific wards',
    'SO': 'Southampton - Article 4 in multiple areas',
    'ST': 'Stoke - Article 4 in Hanley',
    'YO': 'York - City-wide Article 4'
};

// Flood risk indicator postcodes (simplified - in production would use EA API)
const FLOOD_RISK_PREFIXES = ['PE', 'LN', 'DN', 'HU', 'YO', 'CA', 'SR', 'TS', 'DL', 'GL', 'WR', 'HR'];

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

// Regulatory Risks - Article 4, Licensing, EPC
function assessRegulatoryRisks(property: PropertyDetails): RiskFlag[] {
    const flags: RiskFlag[] = [];
    const postcode = property.address.postcode?.toUpperCase() || '';

    // Extract postcode area (letters before numbers)
    const postcodeArea = postcode.match(/^([A-Z]{1,2})/)?.[1] || '';

    // Article 4 Direction Check
    if (postcodeArea && ARTICLE_4_AREAS[postcodeArea]) {
        flags.push({
            id: 'article-4-direction',
            category: 'regulatory',
            severity: 'warning',
            title: 'Potential Article 4 Area',
            description: `${ARTICLE_4_AREAS[postcodeArea]}. HMO conversion may require planning permission.`,
            recommendation: 'Check local council planning portal. Apply for prior approval before converting to HMO.'
        });
    }

    // HMO Licensing reminder for 5+ bed
    if (property.bedrooms >= 5) {
        flags.push({
            id: 'mandatory-hmo-license',
            category: 'regulatory',
            severity: 'info',
            title: 'Mandatory HMO Licensing',
            description: `${property.bedrooms} bedroom property requires mandatory HMO license if let to 5+ unrelated tenants.`,
            recommendation: 'Budget £500-1500 for license application. Ensure fire safety compliance.'
        });
    } else if (property.bedrooms >= 3) {
        flags.push({
            id: 'possible-additional-licensing',
            category: 'regulatory',
            severity: 'info',
            title: 'Possible Additional Licensing',
            description: 'Many councils have Additional/Selective Licensing schemes for smaller HMOs.',
            recommendation: 'Check local council HMO licensing requirements for this area.'
        });
    }

    // Flood risk based on postcode
    if (postcodeArea && FLOOD_RISK_PREFIXES.includes(postcodeArea)) {
        flags.push({
            id: 'flood-zone-check',
            category: 'location',
            severity: 'warning',
            title: 'Potential Flood Risk Area',
            description: 'Postcode is in a region with higher flood risk properties.',
            recommendation: 'Check gov.uk/check-flooding for exact flood zone. May affect insurance costs.'
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

    // EPC rating detection from description
    const epcMatch = desc.match(/epc[:\s]*([a-g])/i);
    if (epcMatch) {
        const rating = epcMatch[1].toUpperCase();
        if (rating === 'F' || rating === 'G') {
            flags.push({
                id: 'low-epc-rating',
                category: 'regulatory',
                severity: 'danger',
                title: `EPC Rating ${rating} - Below Legal Minimum`,
                description: 'Properties rated F or G cannot legally be let without improvements.',
                recommendation: 'Budget for EPC improvements (insulation, heating, windows). Typical cost £5-20k.'
            });
        } else if (rating === 'E') {
            flags.push({
                id: 'epc-borderline',
                category: 'regulatory',
                severity: 'warning',
                title: 'EPC Rating E - Borderline',
                description: 'Rating may drop below legal minimum after re-assessment. 2028 target is C rating.',
                recommendation: 'Plan for improvements to future-proof the investment.'
            });
        }
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

// Main Assessment Function (Synchronous - uses heuristics only)
export function assessDealRisk(
    property: PropertyDetails,
    costs: AcquisitionCosts,
    income: IncomeExpenses,
    mortgage: MortgageDetails
): RiskAssessment {
    const allFlags: RiskFlag[] = [
        ...assessTenureRisks(property),
        ...assessRegulatoryRisks(property),
        ...assessFinancialRisks(property, costs, income, mortgage),
        ...assessPropertyRisks(property)
    ];

    return {
        overallScore: calculateRiskScore(allFlags),
        flags: allFlags,
        dataConfidence: assessDataConfidence(property)
    };
}

// ============================================================================
// ENHANCED ASSESSMENT WITH LIVE API DATA
// ============================================================================

export interface EnhancedRiskAssessment extends RiskAssessment {
    floodData?: FloodRiskResult;
    epcData?: EPCResult;
    apiDataLoaded: boolean;
}

/**
 * Enhanced assessment that fetches real-time data from external APIs
 * Use this when you need accurate flood/EPC data for a property
 */
export async function assessDealRiskEnhanced(
    property: PropertyDetails,
    costs: AcquisitionCosts,
    income: IncomeExpenses,
    mortgage: MortgageDetails
): Promise<EnhancedRiskAssessment> {
    // Start with basic synchronous assessment
    const baseAssessment = assessDealRisk(property, costs, income, mortgage);
    const additionalFlags: RiskFlag[] = [];

    let floodData: FloodRiskResult | undefined;
    let epcData: EPCResult | undefined;

    const postcode = property.address.postcode || '';

    try {
        // Fetch flood risk data
        if (postcode) {
            floodData = await getFloodRisk(postcode);

            // Add flood risk flags based on API data
            if (floodData.hasActiveWarnings) {
                additionalFlags.push({
                    id: 'flood-active-warning',
                    category: 'location',
                    severity: 'danger',
                    title: 'Active Flood Warning',
                    description: `${floodData.warnings.length} active flood warning(s). ${floodData.description}`,
                    recommendation: 'Check Environment Agency site immediately. Avoid purchase until warnings cleared.'
                });
            } else if (floodData.zone === 'zone3') {
                additionalFlags.push({
                    id: 'flood-zone-3',
                    category: 'location',
                    severity: 'danger',
                    title: 'High Flood Risk (Zone 3)',
                    description: floodData.description,
                    recommendation: 'Specialist insurance required. Many lenders will not lend. Factor in £500+/year insurance.'
                });
            } else if (floodData.zone === 'zone2') {
                additionalFlags.push({
                    id: 'flood-zone-2',
                    category: 'location',
                    severity: 'warning',
                    title: 'Medium Flood Risk (Zone 2)',
                    description: floodData.description,
                    recommendation: 'Check with insurers before purchase. May have higher premiums.'
                });
            }
        }

        // Fetch EPC data
        if (postcode) {
            epcData = await getEPCRating(
                postcode,
                property.address.line1,
                property.propertyType
            );

            const rentalReqs = meetsRentalRequirements(epcData.rating);

            // Add EPC flags
            if (!rentalReqs.meetsCurrentRequirement) {
                additionalFlags.push({
                    id: 'epc-illegal-to-let',
                    category: 'regulatory',
                    severity: 'danger',
                    title: `EPC Rating ${epcData.rating} - Cannot Legally Let`,
                    description: `Current EPC (${epcData.rating}) is below minimum E rating. Property cannot be let until improved.`,
                    recommendation: `Estimated upgrade cost: £${estimateUpgradeCost(epcData.rating)}. Factor into acquisition.`
                });
            } else if (!rentalReqs.meets2028Requirement) {
                additionalFlags.push({
                    id: 'epc-2028-non-compliant',
                    category: 'regulatory',
                    severity: 'warning',
                    title: `EPC Rating ${epcData.rating} - 2028 Upgrade Required`,
                    description: 'From 2028, minimum C rating may be required. Plan for upgrades.',
                    recommendation: `Budget £${estimateUpgradeCost(epcData.rating)} for EPC improvements before 2028.`
                });
            }

            if (epcData.source === 'estimate') {
                additionalFlags.push({
                    id: 'epc-estimated',
                    category: 'regulatory',
                    severity: 'info',
                    title: 'EPC Rating Estimated',
                    description: `No EPC certificate found. Estimated as ${epcData.rating} based on property type.`,
                    recommendation: 'Request actual EPC from vendor or order new assessment (£60-120).'
                });
            }
        }
    } catch (error) {
        console.error('[EnhancedAssessment] API fetch error:', error);
    }

    // Merge flags, avoiding duplicates by id
    const existingIds = new Set(baseAssessment.flags.map(f => f.id));
    const mergedFlags = [
        ...baseAssessment.flags,
        ...additionalFlags.filter(f => !existingIds.has(f.id))
    ];

    return {
        overallScore: calculateRiskScore(mergedFlags),
        flags: mergedFlags,
        dataConfidence: floodData && epcData ? 'high' : baseAssessment.dataConfidence,
        floodData,
        epcData,
        apiDataLoaded: Boolean(floodData || epcData)
    };
}

// Helper to estimate upgrade costs
function estimateUpgradeCost(rating: string): string {
    const costs: Record<string, string> = {
        'G': '15,000 - 25,000',
        'F': '10,000 - 18,000',
        'E': '8,000 - 15,000',
        'D': '5,000 - 10,000',
        'C': '3,000 - 8,000'
    };
    return costs[rating] || '5,000 - 15,000';
}
