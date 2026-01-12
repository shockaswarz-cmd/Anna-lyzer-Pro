'use client';

import { useState, useRef } from 'react';
import { InvestorPackPreview } from '@/components/pack/InvestorPackPreview';
import { PackControls } from '@/components/pack/PackControls';
import { StrategyType, Deal } from '@/lib/types/deal';
import { FileText, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock deal for demo - in production this would come from URL params or state
const mockDeal: Deal = {
    id: 'demo-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    property: {
        sourceUrl: 'https://rightmove.co.uk/...',
        askingPrice: 195000,
        propertyType: 'Terraced',
        bedrooms: 4,
        bathrooms: 2,
        address: {
            line1: '42 Victoria Road',
            city: 'Manchester',
            postcode: 'M14 5RB'
        },
        tenure: 'Freehold',
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
        agentName: 'Purple Bricks'
    },
    strategies: {
        BTL: {
            type: 'BTL',
            isActive: true,
            assumptions: {
                acquisition: { isR2R: false, purchasePrice: 195000, stampDuty: 5850, surveyFees: 500, legalFees: 1500, sourcingFee: 0, refurbishmentCost: 15000, furnitureCost: 0, otherCosts: 0 },
                mortgage: { ltv: 75, interestRate: 5.5, termYears: 25, productFee: 995, monthlyPayment: 0, isInterestOnly: true },
                income: { grossMonthlyRent: 1200, occupancyRate: 95, managementFeeRate: 10, managementFeeMonthly: 120, utilitiesMonthly: 0, insuranceMonthly: 35, councilTaxMonthly: 0, maintenanceMonthly: 50, otherMonthlyCosts: 0 },
                params: {}
            },
            results: { totalCashRequired: 68845, totalInvestment: 217845, grossYield: 7.4, netYield: 4.2, monthlyCashflow: 327, annualCashflow: 3924, roi: 5.7, paybackMonths: 210 }
        },
        HMO: {
            type: 'HMO',
            isActive: false,
            assumptions: {
                acquisition: { isR2R: false, purchasePrice: 195000, stampDuty: 5850, surveyFees: 500, legalFees: 1500, sourcingFee: 0, refurbishmentCost: 25000, furnitureCost: 5000, otherCosts: 1500 },
                mortgage: { ltv: 75, interestRate: 5.5, termYears: 25, productFee: 995, monthlyPayment: 0, isInterestOnly: true },
                income: { grossMonthlyRent: 2200, occupancyRate: 92, managementFeeRate: 12, managementFeeMonthly: 264, utilitiesMonthly: 180, insuranceMonthly: 55, councilTaxMonthly: 0, maintenanceMonthly: 100, otherMonthlyCosts: 50 },
                params: {}
            },
            results: { totalCashRequired: 84845, totalInvestment: 234345, grossYield: 13.5, netYield: 9.1, monthlyCashflow: 883, annualCashflow: 10596, roi: 12.5, paybackMonths: 96 }
        },
        BRRR: {
            type: 'BRRR',
            isActive: false,
            assumptions: {
                acquisition: { isR2R: false, purchasePrice: 195000, stampDuty: 5850, surveyFees: 500, legalFees: 1500, sourcingFee: 0, refurbishmentCost: 20000, furnitureCost: 0, otherCosts: 0 },
                mortgage: { ltv: 75, interestRate: 5.5, termYears: 25, productFee: 995, monthlyPayment: 0, isInterestOnly: true },
                income: { grossMonthlyRent: 1200, occupancyRate: 95, managementFeeRate: 10, managementFeeMonthly: 120, utilitiesMonthly: 0, insuranceMonthly: 35, councilTaxMonthly: 0, maintenanceMonthly: 50, otherMonthlyCosts: 0 },
                params: {}
            },
            results: { totalCashRequired: 45000, totalInvestment: 222850, grossYield: 7.4, netYield: 4.0, monthlyCashflow: 285, annualCashflow: 3420, roi: 7.6, paybackMonths: 158 }
        },
        SA: {
            type: 'SA',
            isActive: false,
            assumptions: { acquisition: { isR2R: false, purchasePrice: 0, stampDuty: 0, surveyFees: 0, legalFees: 0, sourcingFee: 0, refurbishmentCost: 0, furnitureCost: 0, otherCosts: 0 }, mortgage: { ltv: 0, interestRate: 0, termYears: 0, productFee: 0, monthlyPayment: 0, isInterestOnly: false }, income: { grossMonthlyRent: 0, occupancyRate: 0, managementFeeRate: 0, managementFeeMonthly: 0, utilitiesMonthly: 0, insuranceMonthly: 0, councilTaxMonthly: 0, maintenanceMonthly: 0, otherMonthlyCosts: 0 }, params: {} },
            results: { totalCashRequired: 0, totalInvestment: 0, grossYield: 0, netYield: 0, monthlyCashflow: 0, annualCashflow: 0, roi: 0, paybackMonths: 0 }
        },
        R2R: {
            type: 'R2R',
            isActive: false,
            assumptions: { acquisition: { isR2R: true, purchasePrice: 0, rentToOwner: 950, stampDuty: 0, surveyFees: 0, legalFees: 500, sourcingFee: 1500, refurbishmentCost: 2000, furnitureCost: 3000, otherCosts: 0 }, mortgage: { ltv: 0, interestRate: 0, termYears: 0, productFee: 0, monthlyPayment: 0, isInterestOnly: false }, income: { grossMonthlyRent: 1800, occupancyRate: 90, managementFeeRate: 12, managementFeeMonthly: 216, utilitiesMonthly: 150, insuranceMonthly: 40, councilTaxMonthly: 150, maintenanceMonthly: 75, otherMonthlyCosts: 0 }, params: {} },
            results: { totalCashRequired: 7000, totalInvestment: 7000, grossYield: 0, netYield: 0, monthlyCashflow: 219, annualCashflow: 2628, roi: 37.5, paybackMonths: 32 }
        },
        FLIP: {
            type: 'FLIP',
            isActive: false,
            assumptions: { acquisition: { isR2R: false, purchasePrice: 0, stampDuty: 0, surveyFees: 0, legalFees: 0, sourcingFee: 0, refurbishmentCost: 0, furnitureCost: 0, otherCosts: 0 }, mortgage: { ltv: 0, interestRate: 0, termYears: 0, productFee: 0, monthlyPayment: 0, isInterestOnly: false }, income: { grossMonthlyRent: 0, occupancyRate: 0, managementFeeRate: 0, managementFeeMonthly: 0, utilitiesMonthly: 0, insuranceMonthly: 0, councilTaxMonthly: 0, maintenanceMonthly: 0, otherMonthlyCosts: 0 }, params: {} },
            results: { totalCashRequired: 0, totalInvestment: 0, grossYield: 0, netYield: 0, monthlyCashflow: 0, annualCashflow: 0, roi: 0, paybackMonths: 0 }
        },
    }
};

export default function PacksPage() {
    const [activeStrategy, setActiveStrategy] = useState<StrategyType>('HMO');
    const [branding, setBranding] = useState({
        companyName: 'Bourarro Properties',
        logoUrl: '',
        primaryColor: '#10b981'
    });
    const [isExporting, setIsExporting] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const handleBrandingChange = (field: string, value: string) => {
        setBranding(prev => ({ ...prev, [field]: value }));
    };

    const handleExportPDF = async () => {
        if (!previewRef.current) return;

        setIsExporting(true);
        try {
            // Capture the preview element as canvas
            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // Create PDF (A4 size)
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Calculate dimensions to fit A4
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add image to PDF
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Generate filename
            const address = mockDeal.property.address.line1.replace(/[^a-zA-Z0-9]/g, '_');
            const filename = `Investor_Pack_${address}_${activeStrategy}.pdf`;

            // Download
            pdf.save(filename);
        } catch (error) {
            console.error('PDF export failed:', error);
            alert('Failed to export PDF. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleCopyLink = () => {
        // Generate shareable link with deal ID
        const shareUrl = `${window.location.origin}/packs?deal=${mockDeal.id}&strategy=${activeStrategy}`;
        navigator.clipboard.writeText(shareUrl);
        alert('Shareable link copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            {/* Loading overlay */}
            {isExporting && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                        <span className="text-white">Generating PDF...</span>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/analyser"
                        className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FileText className="w-6 h-6 text-emerald-400" />
                            Investor Pack Generator
                        </h1>
                        <p className="text-slate-400 mt-1">Create professional investment summaries</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Controls Sidebar */}
                <div className="lg:col-span-1">
                    <PackControls
                        activeStrategy={activeStrategy}
                        onStrategyChange={setActiveStrategy}
                        branding={branding}
                        onBrandingChange={handleBrandingChange}
                        onExportPDF={handleExportPDF}
                        onCopyLink={handleCopyLink}
                    />
                </div>

                {/* Pack Preview */}
                <div className="lg:col-span-3 overflow-auto">
                    <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-700">
                        <div ref={previewRef}>
                            <InvestorPackPreview
                                deal={mockDeal}
                                strategy={activeStrategy}
                                branding={branding}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
