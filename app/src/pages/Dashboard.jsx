import React from 'react';
import { useDeal } from '../context/DealContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import {
    Search,
    Plus,
    TrendingUp,
    Building2,
    PoundSterling,
    ArrowRight,
    Lightbulb,
    AlertCircle,
    CheckCircle,
    Sparkles,
    FileText,
    Calculator,
    ChevronRight,
    Home,
    Percent
} from 'lucide-react';
import { calculateMetrics } from '../utils/financials';
import './Dashboard.css';

// Safe number formatting helpers
const safeNumber = (value, fallback = 0) => {
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) return fallback;
    return num;
};

const formatCurrency = (value, options = {}) => {
    const num = safeNumber(value, 0);
    const { showSign = false, compact = false } = options;

    if (compact) {
        if (Math.abs(num) >= 1000000) {
            return `£${(num / 1000000).toFixed(1)}m`;
        }
        if (Math.abs(num) >= 1000) {
            return `£${(num / 1000).toFixed(0)}k`;
        }
        return `£${Math.round(num).toLocaleString()}`;
    }

    const sign = showSign && num > 0 ? '+' : '';
    return `${sign}£${Math.round(num).toLocaleString()}`;
};

const formatPercent = (value, decimals = 1) => {
    const num = safeNumber(value, 0);
    return `${num.toFixed(decimals)}%`;
};

// Safe metrics calculation wrapper
const safeCalculateMetrics = (deal) => {
    if (!deal) return null;

    // Ensure required fields have valid defaults
    const safeDeal = {
        price: safeNumber(deal.price, 0),
        rentMonthly: safeNumber(deal.rentMonthly, 0),
        refurb: safeNumber(deal.refurb, 0),
        fees: safeNumber(deal.fees, 0),
        mortgageRate: safeNumber(deal.mortgageRate, 5),
        ltv: safeNumber(deal.ltv, 75),
        ...deal
    };

    // Skip calculation if price is 0 or invalid
    if (safeDeal.price <= 0) {
        return {
            totalCashIn: 0,
            stampDuty: 0,
            deposit: 0,
            loanAmount: 0,
            grossRentAnnual: 0,
            totalCostsAnnual: 0,
            netProfitAnnual: 0,
            netProfitMonthly: 0,
            grossYield: 0,
            roi: 0
        };
    }

    try {
        const metrics = calculateMetrics(safeDeal);
        // Sanitize all returned values
        return {
            totalCashIn: safeNumber(metrics.totalCashIn, 0),
            stampDuty: safeNumber(metrics.stampDuty, 0),
            deposit: safeNumber(metrics.deposit, 0),
            loanAmount: safeNumber(metrics.loanAmount, 0),
            grossRentAnnual: safeNumber(metrics.grossRentAnnual, 0),
            totalCostsAnnual: safeNumber(metrics.totalCostsAnnual, 0),
            netProfitAnnual: safeNumber(metrics.netProfitAnnual, 0),
            netProfitMonthly: safeNumber(metrics.netProfitMonthly, 0),
            grossYield: safeNumber(metrics.grossYield, 0),
            roi: safeNumber(metrics.roi, 0)
        };
    } catch (error) {
        console.error('Error calculating metrics:', error);
        return {
            totalCashIn: 0,
            stampDuty: 0,
            deposit: 0,
            loanAmount: 0,
            grossRentAnnual: 0,
            totalCostsAnnual: 0,
            netProfitAnnual: 0,
            netProfitMonthly: 0,
            grossYield: 0,
            roi: 0
        };
    }
};

// Premium Stat Card Component
const StatCard = ({ label, value, icon: Icon, trend, trendValue, accentColor, bgGradient }) => (
    <div
        className="stat-card animate-fade-in"
        style={{ '--stat-accent': accentColor, '--stat-bg': bgGradient, '--stat-color': accentColor }}
    >
        <div className="stat-card-header">
            <div className="stat-card-icon">
                <Icon size={22} />
            </div>
            {trend && (
                <div className={`stat-card-trend ${trend}`}>
                    {trend === 'up' && <TrendingUp size={12} />}
                    {trend === 'down' && <TrendingUp size={12} style={{ transform: 'rotate(180deg)' }} />}
                    {trendValue}
                </div>
            )}
        </div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
    </div>
);

// Quick Action Card Component
const QuickActionCard = ({ to, icon: Icon, title, description }) => (
    <Link to={to} className="quick-action-card">
        <div className="quick-action-icon">
            <Icon size={22} />
        </div>
        <div className="quick-action-content">
            <div className="quick-action-title">{title}</div>
            <div className="quick-action-desc">{description}</div>
        </div>
        <ChevronRight size={18} style={{ color: 'var(--color-text-light)' }} />
    </Link>
);

// Insight Item Component
const InsightItem = ({ type, title, description }) => (
    <div className="insight-item">
        <div className={`insight-icon ${type}`}>
            {type === 'tip' && <Lightbulb size={18} />}
            {type === 'alert' && <AlertCircle size={18} />}
            {type === 'success' && <CheckCircle size={18} />}
        </div>
        <div className="insight-content">
            <h5>{title}</h5>
            <p>{description}</p>
        </div>
    </div>
);

// ROI Badge Component
const getRoiBadgeClass = (roi) => {
    const safeRoi = safeNumber(roi, 0);
    if (safeRoi >= 12) return 'excellent';
    if (safeRoi >= 8) return 'good';
    if (safeRoi >= 5) return 'average';
    return 'poor';
};

// Deal Table Row
const DealTableRow = ({ deal, onSelect }) => {
    // Guard against null/undefined deal
    if (!deal) return null;

    const metrics = safeCalculateMetrics(deal);
    if (!metrics) return null;

    const roiClass = getRoiBadgeClass(metrics.roi);
    const isPositiveCashflow = metrics.netProfitMonthly >= 0;

    // Safe field access with fallbacks
    const address = deal.address || 'Unknown Address';
    const postcode = deal.postcode || '';
    const price = safeNumber(deal.price, 0);
    const type = deal.type || 'unknown';

    return (
        <tr onClick={() => onSelect(deal)}>
            <td>
                <div className="deal-address">{address}</div>
                {postcode && <div className="deal-postcode">{postcode}</div>}
            </td>
            <td className="deal-price">£{price.toLocaleString()}</td>
            <td>
                <span className="deal-type-badge">{type}</span>
            </td>
            <td className={`deal-cashflow ${!isPositiveCashflow ? 'negative' : ''}`}>
                {isPositiveCashflow ? '+' : ''}£{Math.round(metrics.netProfitMonthly)}/mo
            </td>
            <td>
                <span className={`roi-badge ${roiClass}`}>
                    <Percent size={12} />
                    {metrics.roi.toFixed(1)}
                </span>
            </td>
        </tr>
    );
};

// Mini Performance Chart
const PerformanceChart = ({ deals }) => {
    // Safely calculate chart data
    const safeDeals = Array.isArray(deals) ? deals : [];

    const chartData = safeDeals.length > 0
        ? safeDeals.slice(-8).map(d => {
            const m = safeCalculateMetrics(d);
            if (!m) return 10;
            // Clamp ROI between reasonable bounds for visualization
            // Max height at 15% ROI, min at 0%
            const normalizedRoi = Math.max(0, Math.min(15, m.roi));
            return Math.max(10, (normalizedRoi / 15) * 100);
        })
        : [30, 45, 35, 60, 50, 70, 55, 65];

    const avgRoi = safeDeals.length > 0
        ? safeDeals.reduce((acc, d) => {
            const m = safeCalculateMetrics(d);
            return acc + (m ? m.roi : 0);
        }, 0) / safeDeals.length
        : 0;

    return (
        <div className="performance-chart">
            <div className="chart-header">
                <span>Average ROI</span>
                <span className="chart-value">{formatPercent(avgRoi)}</span>
            </div>
            <div className="mini-chart">
                {chartData.map((height, i) => (
                    <div
                        key={i}
                        className="chart-bar"
                        style={{ height: `${Math.min(100, Math.max(10, height))}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { savedDeals, setDeal } = useDeal();
    const navigate = useNavigate();

    // Ensure savedDeals is always an array
    const deals = Array.isArray(savedDeals) ? savedDeals : [];

    const handleDealClick = (deal) => {
        if (!deal) return;
        setDeal(deal);
        navigate('/analysis');
    };

    // Calculate aggregated stats with safe operations
    const totalPipelineValue = deals.reduce((acc, deal) => {
        return acc + safeNumber(deal?.price, 0);
    }, 0);

    const totalMonthlyIncome = deals.reduce((acc, deal) => {
        const metrics = safeCalculateMetrics(deal);
        return acc + (metrics ? metrics.netProfitMonthly : 0);
    }, 0);

    const avgRoi = deals.length > 0
        ? deals.reduce((acc, deal) => {
            const metrics = safeCalculateMetrics(deal);
            return acc + (metrics ? metrics.roi : 0);
        }, 0) / deals.length
        : 0;

    const profitableDeals = deals.filter(deal => {
        const metrics = safeCalculateMetrics(deal);
        return metrics && metrics.roi >= 8;
    }).length;

    // Generate insights based on data
    const insights = [];
    if (deals.length === 0) {
        insights.push({
            type: 'tip',
            title: 'Get Started',
            description: 'Import a property from Rightmove, Zoopla, or enter details manually to begin your analysis.'
        });
    }
    if (deals.length > 0 && avgRoi < 8) {
        insights.push({
            type: 'alert',
            title: 'ROI Opportunity',
            description: 'Consider exploring HMO or SA strategies to improve your average return on investment.'
        });
    }
    if (profitableDeals > 0) {
        insights.push({
            type: 'success',
            title: `${profitableDeals} Strong Deal${profitableDeals > 1 ? 's' : ''}`,
            description: `You have ${profitableDeals} deal${profitableDeals > 1 ? 's' : ''} with ROI above 8%. Ready for investor presentation.`
        });
    }
    if (deals.length >= 3) {
        insights.push({
            type: 'tip',
            title: 'Compare Strategies',
            description: 'Use the comparison view to see all strategies side-by-side and find the best approach.'
        });
    }
    // Default insight if no others
    if (insights.length === 0) {
        insights.push({
            type: 'tip',
            title: 'Pro Tip',
            description: 'BRRR strategies often yield the best ROI when you can refinance at 75% of the new value.'
        });
    }

    return (
        <div className="dashboard">
            {/* Hero Section */}
            <div className="dashboard-hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Welcome back, <span>French Polo</span></h1>
                        <p>Your property investment command centre</p>
                        <Link to="/new-deal">
                            <Button className="btn-gold">
                                <Plus size={18} style={{ marginRight: '8px' }} />
                                Analyse New Deal
                            </Button>
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">{deals.length}</div>
                            <div className="hero-stat-label">Active Deals</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">
                                {formatCurrency(totalPipelineValue, { compact: true })}
                            </div>
                            <div className="hero-stat-label">Pipeline Value</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">{formatPercent(avgRoi)}</div>
                            <div className="hero-stat-label">Avg ROI</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatCard
                    label="Total Pipeline"
                    value={formatCurrency(totalPipelineValue, { compact: true })}
                    icon={PoundSterling}
                    trend={deals.length > 0 ? 'up' : 'neutral'}
                    trendValue={deals.length > 0 ? 'Active' : 'Start'}
                    accentColor="#d4af37"
                    bgGradient="linear-gradient(135deg, #fef9c3 0%, #fde047 100%)"
                />
                <StatCard
                    label="Monthly Cashflow"
                    value={formatCurrency(totalMonthlyIncome)}
                    icon={TrendingUp}
                    trend={totalMonthlyIncome > 0 ? 'up' : totalMonthlyIncome < 0 ? 'down' : 'neutral'}
                    trendValue={totalMonthlyIncome > 0 ? 'Positive' : totalMonthlyIncome < 0 ? 'Negative' : 'N/A'}
                    accentColor="#10b981"
                    bgGradient="linear-gradient(135deg, #dcfce7 0%, #86efac 100%)"
                />
                <StatCard
                    label="Properties"
                    value={deals.length}
                    icon={Building2}
                    trend="neutral"
                    trendValue="In Analysis"
                    accentColor="#3b82f6"
                    bgGradient="linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)"
                />
                <StatCard
                    label="Strong Deals"
                    value={profitableDeals}
                    icon={Sparkles}
                    trend={profitableDeals > 0 ? 'up' : 'neutral'}
                    trendValue={profitableDeals > 0 ? 'ROI > 8%' : 'None yet'}
                    accentColor="#8b5cf6"
                    bgGradient="linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)"
                />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <QuickActionCard
                    to="/new-deal"
                    icon={Plus}
                    title="New Analysis"
                    description="Import or add a property"
                />
                <QuickActionCard
                    to="/analysis"
                    icon={Calculator}
                    title="Strategy Calculator"
                    description="Compare investment strategies"
                />
                <QuickActionCard
                    to="/pack"
                    icon={FileText}
                    title="Generate Pack"
                    description="Create investor presentation"
                />
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Deals Table */}
                <div className="deals-card">
                    <div className="deals-card-header">
                        <h3>
                            <Home size={18} />
                            Recent Deals
                            {deals.length > 0 && (
                                <span className="badge">{deals.length}</span>
                            )}
                        </h3>
                        {deals.length > 0 && (
                            <Link to="/analysis" className="view-all-link">
                                View All <ArrowRight size={14} />
                            </Link>
                        )}
                    </div>

                    {deals.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <Search size={32} />
                            </div>
                            <h4>No deals analysed yet</h4>
                            <p>Start by importing a property from Rightmove, Zoopla, or enter details manually.</p>
                            <Link to="/new-deal">
                                <Button className="btn-gold pulse-gold">
                                    <Plus size={16} style={{ marginRight: '8px' }} />
                                    Add Your First Deal
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <table className="deals-table">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Price</th>
                                    <th>Type</th>
                                    <th>Cashflow</th>
                                    <th>ROI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deals.slice(0, 5).map((deal, index) => (
                                    <DealTableRow
                                        key={deal?.id || `deal-${index}`}
                                        deal={deal}
                                        onSelect={handleDealClick}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Insights Panel */}
                <div className="insights-panel">
                    <div className="insights-header">
                        <h3>
                            <Lightbulb size={18} />
                            Insights
                        </h3>
                    </div>
                    <div className="insights-content">
                        {insights.slice(0, 3).map((insight, index) => (
                            <InsightItem
                                key={index}
                                type={insight.type}
                                title={insight.title}
                                description={insight.description}
                            />
                        ))}
                    </div>
                    <PerformanceChart deals={deals} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
