/**
 * EPC (Energy Performance Certificate) Lookup
 * Uses the GOV.UK Open Data API for EPC ratings
 * https://epc.opendatacommunities.org/docs/api
 * 
 * NOTE: Production usage requires API key registration
 */

export type EPCRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'unknown';

export interface EPCResult {
    rating: EPCRating;
    score: number | null;
    validUntil: string | null;
    recommendations: EPCRecommendation[];
    estimatedCosts: {
        current: number | null;
        potential: number | null;
    };
    confidence: 'high' | 'medium' | 'low';
    source: 'api' | 'estimate';
}

export interface EPCRecommendation {
    measure: string;
    indicativeCost: string;
    typicalSaving: string;
}

// EPC rating thresholds
const EPC_THRESHOLDS: Record<EPCRating, { min: number; max: number }> = {
    'A': { min: 92, max: 100 },
    'B': { min: 81, max: 91 },
    'C': { min: 69, max: 80 },
    'D': { min: 55, max: 68 },
    'E': { min: 39, max: 54 },
    'F': { min: 21, max: 38 },
    'G': { min: 1, max: 20 },
    'unknown': { min: 0, max: 0 }
};

// Property type to average EPC mappings (for estimates when API unavailable)
const PROPERTY_TYPE_EPC_ESTIMATES: Record<string, EPCRating> = {
    'Flat': 'C',
    'Terraced': 'D',
    'Semi-Detached': 'D',
    'Detached': 'E',
    'Bungalow': 'E',
    'Other': 'D'
};

/**
 * Look up EPC rating for a property
 * Falls back to property-type estimates if API unavailable
 */
export async function getEPCRating(
    postcode: string,
    addressLine1?: string,
    propertyType?: string
): Promise<EPCResult> {
    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();

    // Try API lookup first (requires API key in production)
    const apiResult = await fetchEPCFromAPI(cleanPostcode, addressLine1);
    if (apiResult) {
        return apiResult;
    }

    // Fall back to property type estimate
    const estimatedRating = propertyType
        ? PROPERTY_TYPE_EPC_ESTIMATES[propertyType] || 'D'
        : 'D';

    return {
        rating: estimatedRating,
        score: getAverageScore(estimatedRating),
        validUntil: null,
        recommendations: getDefaultRecommendations(estimatedRating),
        estimatedCosts: {
            current: null,
            potential: null
        },
        confidence: 'low',
        source: 'estimate'
    };
}

/**
 * Fetch EPC from GOV.UK Open Data API
 */
async function fetchEPCFromAPI(
    postcode: string,
    addressLine1?: string
): Promise<EPCResult | null> {
    const apiKey = process.env.EPC_API_KEY;

    if (!apiKey) {
        console.log('[EPC] No API key configured, using estimates');
        return null;
    }

    try {
        const searchParams = new URLSearchParams({
            postcode: postcode,
            size: '1'
        });

        if (addressLine1) {
            searchParams.append('address', addressLine1);
        }

        const response = await fetch(
            `https://epc.opendatacommunities.org/api/v1/domestic/search?${searchParams}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`
                },
                next: { revalidate: 86400 } // Cache for 24 hours
            }
        );

        if (!response.ok) {
            console.warn('[EPC] API error:', response.status);
            return null;
        }

        const data = await response.json();

        if (!data.rows || data.rows.length === 0) {
            return null;
        }

        const cert = data.rows[0];
        const rating = (cert['current-energy-rating'] || 'unknown').toUpperCase() as EPCRating;

        return {
            rating: ['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(rating) ? rating : 'unknown',
            score: parseInt(cert['current-energy-efficiency']) || null,
            validUntil: cert['lodgement-date'] ? addYearsToDate(cert['lodgement-date'], 10) : null,
            recommendations: [],
            estimatedCosts: {
                current: parseInt(cert['heating-cost-current']) || null,
                potential: parseInt(cert['heating-cost-potential']) || null
            },
            confidence: 'high',
            source: 'api'
        };

    } catch (error) {
        console.error('[EPC] API fetch failed:', error);
        return null;
    }
}

function addYearsToDate(dateStr: string, years: number): string {
    try {
        const date = new Date(dateStr);
        date.setFullYear(date.getFullYear() + years);
        return date.toISOString().split('T')[0];
    } catch {
        return '';
    }
}

function getAverageScore(rating: EPCRating): number {
    const threshold = EPC_THRESHOLDS[rating];
    return Math.round((threshold.min + threshold.max) / 2);
}

function getDefaultRecommendations(rating: EPCRating): EPCRecommendation[] {
    if (['E', 'F', 'G'].includes(rating)) {
        return [
            {
                measure: 'Loft insulation (270mm)',
                indicativeCost: '£300 - £500',
                typicalSaving: '£150/year'
            },
            {
                measure: 'Cavity wall insulation',
                indicativeCost: '£500 - £1,500',
                typicalSaving: '£200/year'
            },
            {
                measure: 'Upgrade boiler to A-rated condensing',
                indicativeCost: '£2,300 - £3,000',
                typicalSaving: '£250/year'
            }
        ];
    }
    return [];
}

/**
 * Check if EPC rating meets minimum rental requirements
 * From April 2025: Minimum E rating required for new tenancies
 * From 2028: Minimum C rating proposed
 */
export function meetsRentalRequirements(rating: EPCRating): {
    meetsCurrentRequirement: boolean;
    meets2028Requirement: boolean;
    upgradeNeeded: boolean;
} {
    const passingRatings2024 = ['A', 'B', 'C', 'D', 'E'];
    const passingRatings2028 = ['A', 'B', 'C'];

    return {
        meetsCurrentRequirement: passingRatings2024.includes(rating),
        meets2028Requirement: passingRatings2028.includes(rating),
        upgradeNeeded: !passingRatings2028.includes(rating)
    };
}

/**
 * Estimate upgrade cost to reach target rating
 */
export function estimateUpgradeCost(
    currentRating: EPCRating,
    targetRating: EPCRating
): number | null {
    const upgradeCosts: Record<string, number> = {
        'G->F': 3000,
        'F->E': 5000,
        'E->D': 8000,
        'D->C': 12000,
        'C->B': 20000,
        'B->A': 35000
    };

    const ratings: EPCRating[] = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const currentIndex = ratings.indexOf(currentRating);
    const targetIndex = ratings.indexOf(targetRating);

    if (currentIndex < 0 || targetIndex < 0 || targetIndex <= currentIndex) {
        return null;
    }

    let totalCost = 0;
    for (let i = currentIndex; i < targetIndex; i++) {
        const key = `${ratings[i]}->${ratings[i + 1]}`;
        totalCost += upgradeCosts[key] || 0;
    }

    return totalCost;
}
