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
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { getDeal } from '@/lib/firestore/deals';
import { getUserProfile } from '@/lib/firestore/user';

export default function PacksPage() {
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const [deal, setDeal] = useState<Deal | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeStrategy, setActiveStrategy] = useState<StrategyType>('HMO');
    const [branding, setBranding] = useState({
        companyName: 'Bourarro Properties',
        logoUrl: '',
        primaryColor: '#10b981'
    });

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const dealId = searchParams?.get('deal');
            const strategyParam = searchParams?.get('strategy') as StrategyType;

            // Load Deal
            if (dealId) {
                const fetchedDeal = await getDeal(dealId);
                if (fetchedDeal) {
                    setDeal(fetchedDeal);
                    // Use param strategy, or fetch active one, or default
                    if (strategyParam && fetchedDeal.strategies[strategyParam]) {
                        setActiveStrategy(strategyParam);
                    } else {
                        // Find active strategy
                        const active = Object.values(fetchedDeal.strategies).find(s => s.isActive);
                        if (active) setActiveStrategy(active.type as StrategyType);
                    }
                }
            }

            // Load User Branding
            if (user?.uid) {
                const profile = await getUserProfile(user.uid);
                if (profile && profile.branding) {
                    setBranding(profile.branding);
                }
            }
            setIsLoading(false);
        }

        loadData();
    }, [searchParams, user]);
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
            const address = deal!.property.address.line1.replace(/[^a-zA-Z0-9]/g, '_');
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
        if (!deal) return;
        // Generate shareable link with deal ID
        const shareUrl = `${window.location.origin}/packs?deal=${deal.id}&strategy=${activeStrategy}`;
        navigator.clipboard.writeText(shareUrl);
        alert('Shareable link copied to clipboard!');
    };

    if (isLoading && !deal) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    // Check if deal exists
    if (!deal && !isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
                <FileText className="w-12 h-12 text-slate-600 mb-4" />
                <h2 className="text-xl font-bold mb-2">No Deal Selected</h2>
                <p className="text-slate-400 mb-6 text-center max-w-md">
                    Please select a deal from your pipeline or analyser to generate an investor pack.
                </p>
                <div className="flex gap-4">
                    <Link href="/pipeline" className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                        Go to Pipeline
                    </Link>
                    <Link href="/analyser" className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors font-medium">
                        Analyze New Deal
                    </Link>
                </div>
            </div>
        );
    }

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
                                deal={deal!}
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
