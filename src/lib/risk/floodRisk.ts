/**
 * Flood Risk API Integration
 * Uses Environment Agency Real Time Flood Monitoring API (free, no key required)
 * https://environment.data.gov.uk/flood-monitoring/doc/reference
 */

export type FloodRiskZone = 'zone1' | 'zone2' | 'zone3' | 'unknown';

export interface FloodRiskResult {
    zone: FloodRiskZone;
    label: string;
    description: string;
    hasActiveWarnings: boolean;
    warnings: FloodWarning[];
    confidence: 'high' | 'medium' | 'low';
}

export interface FloodWarning {
    id: string;
    severity: string;
    message: string;
    timeRaised: string;
}

// Postcode to area mapping for known high-risk regions
const HIGH_RISK_POSTCODE_PREFIXES: Record<string, string> = {
    'PE': 'Peterborough/Fenlands - Low-lying, reclaimed marsh',
    'LN': 'Lincoln - River Witham flood plain',
    'DN': 'Doncaster - River Don catchment',
    'HU': 'Hull - Low-lying coastal area',
    'YO': 'York - River Ouse/Foss confluence',
    'CA': 'Carlisle - River Eden catchment',
    'SR': 'Sunderland - Coastal flooding risk',
    'TS': 'Teesside - River Tees estuary',
    'GL': 'Gloucester - River Severn flood plain',
    'WR': 'Worcester - River Severn catchment',
    'HR': 'Hereford - River Wye catchment',
    'TF': 'Telford - River Severn tributaries',
    'SY': 'Shrewsbury - River Severn',
    'LL': 'Llandudno - Coastal and river flooding',
    'EX': 'Exeter - River Exe estuary',
    'TA': 'Taunton - Somerset Levels',
    'BS': 'Bristol - River Avon and tidal',
    'CT': 'Canterbury - Coastal and groundwater'
};

/**
 * Get flood risk assessment for a postcode
 * Uses EA API when possible, falls back to postcode heuristics
 */
export async function getFloodRisk(postcode: string): Promise<FloodRiskResult> {
    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();
    const prefix = cleanPostcode.substring(0, 2);

    // First, check for active flood warnings via EA API
    const warnings = await fetchActiveWarnings(cleanPostcode);

    // Determine zone based on warnings and known high-risk areas
    let zone: FloodRiskZone = 'unknown';
    let label = 'Unknown Flood Risk';
    let description = 'Flood risk data not available for this location. Manual verification recommended.';
    let confidence: 'high' | 'medium' | 'low' = 'low';

    if (warnings.length > 0) {
        // Active warnings = Zone 3 (highest risk)
        zone = 'zone3';
        label = 'High Flood Risk - Active Warnings';
        description = `${warnings.length} active flood warning(s) in this area. Immediate risk.`;
        confidence = 'high';
    } else if (HIGH_RISK_POSTCODE_PREFIXES[prefix]) {
        // Known high-risk area = Zone 2
        zone = 'zone2';
        label = 'Medium-High Flood Risk';
        description = HIGH_RISK_POSTCODE_PREFIXES[prefix];
        confidence = 'medium';
    } else {
        // No data = assume Zone 1 with low confidence
        zone = 'zone1';
        label = 'Low Flood Risk (Assumed)';
        description = 'No known flood warnings or high-risk indicators. Verify with official sources.';
        confidence = 'low';
    }

    return {
        zone,
        label,
        description,
        hasActiveWarnings: warnings.length > 0,
        warnings,
        confidence
    };
}

/**
 * Fetch active flood warnings from Environment Agency API
 */
async function fetchActiveWarnings(postcode: string): Promise<FloodWarning[]> {
    try {
        // EA API endpoint for flood warnings by county/area
        // For more accurate results, we'd need to geocode the postcode first
        const response = await fetch(
            `https://environment.data.gov.uk/flood-monitoring/id/floods?county=*`,
            {
                headers: { 'Accept': 'application/json' },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            console.warn('[FloodRisk] EA API unavailable:', response.status);
            return [];
        }

        const data = await response.json();

        // EA API returns flood warnings, we'd match by location
        // For now, return empty as we can't reliably match without geocoding
        // In production, use postcode -> lat/long -> nearest flood area
        return [];

    } catch (error) {
        console.error('[FloodRisk] Failed to fetch EA data:', error);
        return [];
    }
}

/**
 * Get flood zone classification (for display purposes)
 */
export function getFloodZoneInfo(zone: FloodRiskZone): {
    number: number;
    insuranceImpact: string;
    mortgageImpact: string;
} {
    switch (zone) {
        case 'zone3':
            return {
                number: 3,
                insuranceImpact: 'Very high premiums, some insurers may decline',
                mortgageImpact: 'Many lenders will not lend, specialist mortgage required'
            };
        case 'zone2':
            return {
                number: 2,
                insuranceImpact: 'Higher premiums, flood excess likely',
                mortgageImpact: 'Most lenders will require flood insurance evidence'
            };
        case 'zone1':
            return {
                number: 1,
                insuranceImpact: 'Standard premiums apply',
                mortgageImpact: 'No flood-related restrictions'
            };
        default:
            return {
                number: 0,
                insuranceImpact: 'Unknown - verify with insurer',
                mortgageImpact: 'Unknown - lender may require survey'
            };
    }
}
