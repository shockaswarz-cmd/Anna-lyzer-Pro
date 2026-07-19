'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Home,

  Loader2,
  MapPinned,
  PiggyBank,
  Radar,
  Search,
  ShieldAlert,
  Sparkles,

  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { GlassCard, GlassCardContent, StatCard } from '@/components/ui/GlassCard';
import { AnimatedCounter, AnimatedCurrency, AnimatedPercentage } from '@/components/ui/AnimatedCounter';
import { useAuth } from '@/components/auth/AuthContext';
import { getUserDeals } from '@/lib/firestore/deals';
import { Deal } from '@/lib/types/deal';
import { loadInvestors } from '@/lib/investors/investorStore';
import { cn } from '@/lib/utils';

interface PortfolioStats {
  totalDeals: number;
  totalValue: number;
  avgRoi: number;
  avgCashflow: number;
  strategyBreakdown: Record<string, number>;
  highPotentialDeals: number;
  riskWatchCount: number;
  investorCount: number;
}

function calculatePortfolioStats(deals: Deal[], investorCount: number): PortfolioStats {
  if (deals.length === 0) {
    return {
      totalDeals: 0,
      totalValue: 0,
      avgRoi: 0,
      avgCashflow: 0,
      strategyBreakdown: {},
      highPotentialDeals: 0,
      riskWatchCount: 0,
      investorCount,
    };
  }

  let totalValue = 0;
  let totalRoi = 0;
  let totalCashflow = 0;
  let strategiesWithResults = 0;
  let highPotentialDeals = 0;
  let riskWatchCount = 0;
  const strategyCount: Record<string, number> = {};

  deals.forEach((deal) => {
    totalValue += deal.property.askingPrice || 0;
    const activeStrategy = Object.values(deal.strategies).find((strategy) => strategy.isActive) || deal.strategies.BTL;
    const roi = activeStrategy?.results?.roi || 0;
    const cashflow = activeStrategy?.results?.monthlyCashflow || 0;

    if (activeStrategy?.results) {
      strategiesWithResults += 1;
      totalRoi += roi;
      totalCashflow += cashflow;
    }

    if (roi >= 12 && cashflow > 0) highPotentialDeals += 1;
    if (!deal.property.address.postcode || deal.property.tenure === 'Leasehold') riskWatchCount += 1;
    strategyCount[activeStrategy?.type || 'BTL'] = (strategyCount[activeStrategy?.type || 'BTL'] || 0) + 1;
  });

  const divisor = Math.max(strategiesWithResults, 1);
  return {
    totalDeals: deals.length,
    totalValue,
    avgRoi: totalRoi / divisor,
    avgCashflow: totalCashflow / divisor,
    strategyBreakdown: strategyCount,
    highPotentialDeals,
    riskWatchCount,
    investorCount,
  };
}

const strategyColors: Record<string, { bg: string; text: string }> = {
  BTL: { bg: 'bg-cyan-500', text: 'text-cyan-300' },
  HMO: { bg: 'bg-emerald-500', text: 'text-emerald-300' },
  BRRR: { bg: 'bg-purple-500', text: 'text-purple-300' },
  R2R: { bg: 'bg-amber-500', text: 'text-amber-300' },
  SA: { bg: 'bg-pink-500', text: 'text-pink-300' },
  FLIP: { bg: 'bg-rose-500', text: 'text-rose-300' },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [investorCount, setInvestorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setInvestorCount(loadInvestors().length);
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setDeals(await getUserDeals(user.uid));
      } catch (error) {
        console.error('Failed to fetch deals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const stats = useMemo(() => calculatePortfolioStats(deals, investorCount), [deals, investorCount]);
  const topDeals = deals.slice(0, 4);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#10b98122,transparent_28%),radial-gradient(circle_at_80%_0%,#22d3ee1e,transparent_24%),linear-gradient(135deg,#020617,#0f172a_45%,#111827)] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="px-6 py-5 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Anna Lyzer Pro</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight lg:text-4xl">Deal command centre</h1>
              <p className="mt-1 text-sm text-slate-400">Sourcing, analysis, investor matching, and pack readiness in one place.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ActionButton href="/analyser" icon={Sparkles} label="Analyse deal" primary />
              <ActionButton href="/investors" icon={Users} label="Investors" />
              <ActionButton href="/pipeline" icon={ClipboardList} label="Pipeline" />
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-8 px-6 py-8 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-emerald-300" /></div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Deals analysed" value={<AnimatedCounter value={stats.totalDeals} />} subtext="Saved pipeline assets" icon={<Building2 className="h-5 w-5" />} gradient="emerald" />
              <StatCard label="Portfolio value" value={<AnimatedCurrency value={stats.totalValue} compact />} subtext="Combined asking price" icon={<PiggyBank className="h-5 w-5" />} gradient="cyan" />
              <StatCard label="Average ROI" value={<AnimatedPercentage value={stats.avgRoi} />} subtext="Across active strategy" icon={<TrendingUp className="h-5 w-5" />} gradient="purple" />
              <StatCard label="Investor profiles" value={<AnimatedCounter value={stats.investorCount} />} subtext="Editable criteria book" icon={<Users className="h-5 w-5" />} gradient="amber" />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <GlassCard className="overflow-hidden">
                <div className="border-b border-white/10 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Live deal board</h2>
                      <p className="text-sm text-slate-400">Fast read on best candidates and missing diligence.</p>
                    </div>
                    <Link href="/pipeline" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200">Open pipeline →</Link>
                  </div>
                </div>
                <GlassCardContent className="p-0">
                  {topDeals.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <div className="divide-y divide-white/10">
                      {topDeals.map((deal) => {
                        const activeStrategy = Object.values(deal.strategies).find((strategy) => strategy.isActive) || deal.strategies.BTL;
                        const roi = activeStrategy?.results?.roi || 0;
                        const cashflow = activeStrategy?.results?.monthlyCashflow || 0;
                        return (
                          <Link key={deal.id} href={`/packs?deal=${deal.id}`} className="group grid gap-4 p-5 transition hover:bg-white/[0.03] md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold group-hover:text-emerald-300">{deal.property.address.line1 || 'Unnamed property'}</h3>
                                <span className={cn('rounded-full px-2 py-0.5 text-xs', strategyColors[activeStrategy?.type || 'BTL']?.bg, 'bg-opacity-15', strategyColors[activeStrategy?.type || 'BTL']?.text)}>{activeStrategy?.type || 'BTL'}</span>
                              </div>
                              <p className="mt-1 flex items-center gap-2 text-sm text-slate-400"><MapPinned className="h-4 w-4" />{deal.property.address.city || 'City unknown'} · {deal.property.address.postcode || 'Postcode missing'}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-right text-sm">
                              <MiniMetric label="Price" value={`£${deal.property.askingPrice.toLocaleString()}`} />
                              <MiniMetric label="ROI" value={`${roi.toFixed(1)}%`} highlight={roi >= 12} />
                              <MiniMetric label="Cashflow" value={`£${Math.round(cashflow)}/mo`} highlight={cashflow > 0} />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </GlassCardContent>
              </GlassCard>

              <div className="space-y-6">
                <InsightCard icon={Radar} title="Competitor pattern added" tone="emerald" items={[
                  'Postcode-first market context, inspired by PropertyData.',
                  'Clear verdict metrics: yield, ROI, cashflow, risk watch.',
                  'Investor criteria captured before generating packs.',
                ]} />
                <InsightCard icon={ShieldAlert} title="Diligence watch" tone="amber" items={[
                  `${stats.riskWatchCount} deal(s) need postcode or tenure review.`,
                  'Use manual notes for lease length, refurb scope, and source URL.',
                  'Firecrawl key is not configured here, fallback scraper will run when hosted with env set.',
                ]} />
              </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-3">
              <WorkflowCard icon={Search} title="1. Source" body="Paste a portal URL or manually enter postcode, source URL, size, tenure and notes." href="/analyser" />
              <WorkflowCard icon={BarChart3} title="2. Analyse" body="Compare BTL, BRRR, HMO and R2R with editable assumptions and risk intelligence." href="/analyser" />
              <WorkflowCard icon={FileText} title="3. Package" body="Save the deal, match it to investor criteria, and generate an investor pack." href="/packs" />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function ActionButton({ href, icon: Icon, label, primary = false }: { href: string; icon: LucideIcon; label: string; primary?: boolean }) {
  return (
    <Link href={href} className={cn('inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition', primary ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-300 hover:to-cyan-300' : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10')}>
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <Home className="mx-auto mb-4 h-12 w-12 text-slate-600" />
      <h3 className="text-lg font-bold">No saved deals yet</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">Start with the analyser. Manual mode now captures postcode, source URL, tenure, size and notes, so no more half-useful cards.</p>
      <Link href="/analyser" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950 hover:bg-emerald-400">Analyse first deal <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}

function MiniMetric({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div><p className="text-xs text-slate-500">{label}</p><p className={cn('font-bold', highlight ? 'text-emerald-300' : 'text-white')}>{value}</p></div>;
}

function InsightCard({ icon: Icon, title, items, tone }: { icon: LucideIcon; title: string; items: string[]; tone: 'emerald' | 'amber' }) {
  const color = tone === 'emerald' ? 'text-emerald-300 bg-emerald-400/10' : 'text-amber-300 bg-amber-400/10';
  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-3"><div className={cn('rounded-2xl p-3', color)}><Icon className="h-5 w-5" /></div><h3 className="font-bold">{title}</h3></div>
      <ul className="space-y-3 text-sm text-slate-300">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</li>)}</ul>
    </GlassCard>
  );
}

function WorkflowCard({ icon: Icon, title, body, href }: { icon: LucideIcon; title: string; body: string; href: string }) {
  return (
    <Link href={href} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-300/40 hover:bg-white/[0.06]">
      <Icon className="mb-4 h-6 w-6 text-emerald-300" />
      <h3 className="font-bold group-hover:text-emerald-200">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{body}</p>
    </Link>
  );
}
