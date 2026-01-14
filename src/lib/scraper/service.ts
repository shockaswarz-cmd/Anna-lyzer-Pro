import { PropertyDetails, Deal, StrategyType, AcquisitionCosts, MortgageDetails, IncomeExpenses, AnalysisResults } from "../types/deal";
import { ManualPropertyData } from "@/components/deal/DealInput";

interface ScrapedData {
    source: string;
    transactionType: 'sale' | 'rent';
    url: string;
    address: string;
    postcode: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    features: string[];
    propertyType: string;
    images: string[];
    description: string;
    tenure?: 'Freehold' | 'Leasehold' | 'Share of Freehold';
    size?: number;
    sizeUnit?: 'sqft' | 'sqm';
}

// Default assumptions for calculations
const getDefaultAcquisition = (price: number, isR2R: boolean, rentToOwner?: number): AcquisitionCosts => ({
    isR2R,
    purchasePrice: isR2R ? 0 : price,
    rentToOwner: isR2R ? (rentToOwner || price) : undefined,
    stampDuty: isR2R ? 0 : calculateSDLT(price),
    surveyFees: isR2R ? 0 : 500,
    legalFees: isR2R ? 500 : 1500,
    sourcingFee: isR2R ? 1500 : 0,
    refurbishmentCost: isR2R ? 2000 : 10000,
    furnitureCost: isR2R ? 3000 : 0,
    otherCosts: 0
});

const getDefaultMortgage = (price: number): MortgageDetails => ({
    ltv: 75,
    interestRate: 5.5,
    termYears: 25,
    productFee: 995,
    monthlyPayment: 0,
    isInterestOnly: true
});

const getDefaultIncome = (price: number, isR2R: boolean, bedrooms: number): IncomeExpenses => {
    const estimatedRent = isR2R
        ? bedrooms * 550
        : Math.round(price * 0.005);

    return {
        grossMonthlyRent: estimatedRent,
        occupancyRate: 95,
        managementFeeRate: 10,
        managementFeeMonthly: Math.round(estimatedRent * 0.10),
        utilitiesMonthly: isR2R ? 150 : 0,
        insuranceMonthly: 30,
        councilTaxMonthly: isR2R ? 150 : 0,
        maintenanceMonthly: 50,
        otherMonthlyCosts: 0
    };
};

const getEmptyResults = (): AnalysisResults => ({
    totalCashRequired: 0,
    totalInvestment: 0,
    grossYield: 0,
    netYield: 0,
    monthlyCashflow: 0,
    annualCashflow: 0,
    roi: 0,
    paybackMonths: 0
});

// Simple SDLT calculator (residential, additional property rates)
function calculateSDLT(price: number): number {
    if (price <= 250000) return Math.round(price * 0.03);
    if (price <= 925000) return Math.round(7500 + (price - 250000) * 0.08);
    if (price <= 1500000) return Math.round(7500 + 54000 + (price - 925000) * 0.13);
    return Math.round(7500 + 54000 + 74750 + (price - 1500000) * 0.15);
}

function mapPropertyType(type: string): PropertyDetails['propertyType'] {
    const t = type.toLowerCase();
    if (t.includes('flat') || t.includes('apartment')) return 'Flat';
    if (t.includes('terraced') || t.includes('terrace')) return 'Terraced';
    if (t.includes('semi')) return 'Semi-Detached';
    if (t.includes('detached')) return 'Detached';
    if (t.includes('bungalow')) return 'Bungalow';
    return 'Other';
}

// Create strategy helper
function createStrategy(type: StrategyType, isActive: boolean, price: number, bedrooms: number, forceR2R = false, rentToOwner?: number) {
    return {
        type,
        isActive,
        assumptions: {
            acquisition: getDefaultAcquisition(price, forceR2R, rentToOwner),
            mortgage: getDefaultMortgage(price),
            income: getDefaultIncome(price, forceR2R, bedrooms),
            params: {}
        },
        results: getEmptyResults()
    };
}

// Create deal from manual entry
export function createDealFromManual(data: ManualPropertyData): Deal {
    const isRental = data.transactionType === 'rent';
    const price = data.price;
    const bedrooms = data.bedrooms || 3;

    const property: PropertyDetails = {
        askingPrice: price,
        propertyType: mapPropertyType(data.propertyType),
        bedrooms: bedrooms,
        bathrooms: data.bathrooms || 1,
        address: {
            line1: data.address.split(',')[0] || data.address,
            city: data.address.split(',')[1]?.trim() || '',
            postcode: data.postcode
        },
        tenure: 'Freehold', // Manual default, will update later
        size: undefined,
        sizeUnit: 'sqft',
        description: '',
        images: [],
        agentName: 'Manual Entry'
    };

    return {
        id: `deal-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        property,
        strategies: {
            BTL: createStrategy('BTL', !isRental, price, bedrooms),
            HMO: createStrategy('HMO', false, price, bedrooms),
            BRRR: createStrategy('BRRR', false, price, bedrooms),
            SA: createStrategy('SA', false, price, bedrooms),
            R2R: createStrategy('R2R', isRental, price, bedrooms, true, isRental ? price : undefined),
            FLIP: createStrategy('FLIP', false, price, bedrooms)
        }
    };
}

// Scrape deal from URL
export async function scrapeDeal(url: string): Promise<Deal> {
    const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error || 'Scraping failed');
    }

    const scraped: ScrapedData = result.data;
    const isRental = scraped.transactionType === 'rent';
    const price = scraped.price;
    const bedrooms = scraped.bedrooms || 3;

    const property: PropertyDetails = {
        sourceUrl: scraped.url,
        askingPrice: price,
        propertyType: mapPropertyType(scraped.propertyType),
        bedrooms: bedrooms,
        bathrooms: scraped.bathrooms || 1,
        address: {
            line1: scraped.address.split(',')[0] || scraped.address,
            city: scraped.address.split(',')[1]?.trim() || '',
            postcode: scraped.postcode
        },
        tenure: scraped.tenure || 'Freehold',
        size: scraped.size || 0,
        sizeUnit: scraped.sizeUnit || 'sqft',
        description: scraped.description,
        images: scraped.images.filter(Boolean),
        agentName: scraped.source
    };

    return {
        id: `deal-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        property,
        strategies: {
            BTL: createStrategy('BTL', !isRental, price, bedrooms),
            HMO: createStrategy('HMO', false, price, bedrooms),
            BRRR: createStrategy('BRRR', false, price, bedrooms),
            SA: createStrategy('SA', false, price, bedrooms),
            R2R: createStrategy('R2R', isRental, price, bedrooms, true, isRental ? price : undefined),
            FLIP: createStrategy('FLIP', false, price, bedrooms)
        }
    };
}
