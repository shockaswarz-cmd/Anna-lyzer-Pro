import { describe, it, expect } from 'vitest';
import { assessDealRisk, RiskAssessment } from '../assessment';
import { PropertyDetails, AcquisitionCosts, IncomeExpenses, MortgageDetails } from '../../types/deal';

// Test fixtures
const createMockProperty = (overrides: Partial<PropertyDetails> = {}): PropertyDetails => ({
    sourceUrl: 'https://rightmove.co.uk/property/123',
    askingPrice: 200000,
    propertyType: 'Terraced',
    bedrooms: 3,
    bathrooms: 1,
    address: {
        line1: '42 Test Street',
        city: 'Manchester',
        postcode: 'M14 5RB',
    },
    tenure: 'Freehold',
    ...overrides,
});

const createMockCosts = (overrides: Partial<AcquisitionCosts> = {}): AcquisitionCosts => ({
    stamp: 1500,
    legal: 1500,
    survey: 500,
    refurbCost: 0,
    otherCosts: 0,
    isR2R: false,
    ...overrides,
});

const createMockIncome = (overrides: Partial<IncomeExpenses> = {}): IncomeExpenses => ({
    grossMonthlyRent: 1200,
    managementPercent: 10,
    maintenancePercent: 5,
    voidPercent: 5,
    insurance: 20,
    ...overrides,
});

const createMockMortgage = (overrides: Partial<MortgageDetails> = {}): MortgageDetails => ({
    ltv: 75,
    interestRate: 5.5,
    termYears: 25,
    repaymentType: 'interest-only',
    ...overrides,
});

describe('Risk Assessment Engine', () => {
    describe('assessDealRisk', () => {
        it('should return assessment with score and flags', () => {
            const result = assessDealRisk(
                createMockProperty(),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            expect(result).toHaveProperty('overallScore');
            expect(result).toHaveProperty('flags');
            expect(result).toHaveProperty('dataConfidence');
            expect(typeof result.overallScore).toBe('number');
            expect(Array.isArray(result.flags)).toBe(true);
        });

        it('should return high score for low-risk properties', () => {
            const result = assessDealRisk(
                createMockProperty({ tenure: 'Freehold' }),
                createMockCosts(),
                createMockIncome({ grossMonthlyRent: 1500 }), // Good rent
                createMockMortgage()
            );

            expect(result.overallScore).toBeGreaterThan(70);
        });
    });

    describe('Tenure Risk Detection', () => {
        it('should flag critical short lease (<80 years)', () => {
            const result = assessDealRisk(
                createMockProperty({
                    tenure: 'Leasehold',
                    leaseYearsRemaining: 65,
                }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const shortLeaseFlag = result.flags.find(f => f.id === 'short-lease-critical');
            expect(shortLeaseFlag).toBeDefined();
            expect(shortLeaseFlag?.severity).toBe('danger');
        });

        it('should flag warning for lease 80-100 years', () => {
            const result = assessDealRisk(
                createMockProperty({
                    tenure: 'Leasehold',
                    leaseYearsRemaining: 90,
                }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const shortLeaseFlag = result.flags.find(f => f.id === 'short-lease-warning');
            expect(shortLeaseFlag).toBeDefined();
            expect(shortLeaseFlag?.severity).toBe('warning');
        });

        it('should flag high ground rent (>£250)', () => {
            const result = assessDealRisk(
                createMockProperty({
                    tenure: 'Leasehold',
                    groundRent: 350,
                }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const groundRentFlag = result.flags.find(f => f.id === 'high-ground-rent');
            expect(groundRentFlag).toBeDefined();
        });
    });

    describe('Article 4 Detection', () => {
        it('should flag Manchester (M) postcode for Article 4', () => {
            const result = assessDealRisk(
                createMockProperty({ address: { line1: '42 Test St', city: 'Manchester', postcode: 'M14 5RB' } }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const article4Flag = result.flags.find(f => f.id === 'article-4-direction');
            expect(article4Flag).toBeDefined();
            expect(article4Flag?.description).toContain('Manchester');
        });

        it('should flag Nottingham (NG) postcode for Article 4', () => {
            const result = assessDealRisk(
                createMockProperty({ address: { line1: '42 Test St', city: 'Nottingham', postcode: 'NG7 2HT' } }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const article4Flag = result.flags.find(f => f.id === 'article-4-direction');
            expect(article4Flag).toBeDefined();
        });

        it('should NOT flag Article 4 for non-Article 4 areas', () => {
            const result = assessDealRisk(
                createMockProperty({ address: { line1: '42 Test St', city: 'Rural Town', postcode: 'TQ12 4AB' } }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const article4Flag = result.flags.find(f => f.id === 'article-4-direction');
            expect(article4Flag).toBeUndefined();
        });
    });

    describe('Financial Risk Detection', () => {
        it('should flag low yield (<5%)', () => {
            const result = assessDealRisk(
                createMockProperty({ askingPrice: 400000 }), // £400k property
                createMockCosts(),
                createMockIncome({ grossMonthlyRent: 1200 }), // £1200/month = 3.6% yield
                createMockMortgage()
            );

            const lowYieldFlag = result.flags.find(f => f.id === 'low-yield');
            expect(lowYieldFlag).toBeDefined();
        });

        it('should flag ICR below 125%', () => {
            const result = assessDealRisk(
                createMockProperty({ askingPrice: 200000 }),
                createMockCosts(),
                createMockIncome({ grossMonthlyRent: 600 }), // Too low rent for ICR
                createMockMortgage({ ltv: 75, interestRate: 6 })
            );

            const icrFlag = result.flags.find(f => f.id === 'icr-fail');
            expect(icrFlag).toBeDefined();
            expect(icrFlag?.severity).toBe('danger');
        });
    });

    describe('HMO Licensing Detection', () => {
        it('should flag mandatory HMO license for 5+ beds', () => {
            const result = assessDealRisk(
                createMockProperty({ bedrooms: 6 }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const hmoFlag = result.flags.find(f => f.id === 'mandatory-hmo-license');
            expect(hmoFlag).toBeDefined();
            expect(hmoFlag?.severity).toBe('info');
        });

        it('should flag possible additional licensing for 3-4 beds', () => {
            const result = assessDealRisk(
                createMockProperty({ bedrooms: 4 }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            const licensingFlag = result.flags.find(f => f.id === 'possible-additional-licensing');
            expect(licensingFlag).toBeDefined();
        });
    });

    describe('Data Confidence', () => {
        it('should return low confidence for minimal data', () => {
            const result = assessDealRisk(
                createMockProperty({ sourceUrl: undefined, description: undefined }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            expect(result.dataConfidence).toBe('low');
        });

        it('should return higher confidence with more data', () => {
            const result = assessDealRisk(
                createMockProperty({
                    sourceUrl: 'https://rightmove.co.uk/...',
                    tenure: 'Leasehold',
                    leaseYearsRemaining: 120,
                    groundRent: 200,
                    serviceCharge: 1500,
                    description: 'A lovely property in a quiet area with excellent transport links and local amenities nearby.',
                    images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
                }),
                createMockCosts(),
                createMockIncome(),
                createMockMortgage()
            );

            expect(result.dataConfidence).toBe('high');
        });
    });
});
