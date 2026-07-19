'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Plus, Save, Trash2, Users, Target, Pencil, MapPin, WalletCards, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  createInvestorProfile,
  defaultInvestorDraft,
  deleteInvestor,
  InvestorDraft,
  InvestorProfile,
  loadInvestors,
  saveInvestors,
  upsertInvestor,
  validateInvestorDraft,
} from '@/lib/investors/investorStore';

function listToText(values: string[]): string {
  return values.join(', ');
}

function textToList(value: string): string[] {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
}

export default function InvestorsPage() {
  const [investors, setInvestors] = useState<InvestorProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<InvestorDraft>(defaultInvestorDraft);
  const [locationText, setLocationText] = useState(listToText(defaultInvestorDraft.locationFocus));
  const [strategyText, setStrategyText] = useState(listToText(defaultInvestorDraft.strategyFocus));
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadInvestors();
    setInvestors(loaded);
    if (loaded[0]) {
      const investor = loaded[0];
      setSelectedId(investor.id);
      setDraft({
        name: investor.name,
        email: investor.email,
        phone: investor.phone || '',
        locationFocus: investor.locationFocus,
        strategyFocus: investor.strategyFocus,
        budgetMin: investor.budgetMin,
        budgetMax: investor.budgetMax,
        targetRoi: investor.targetRoi,
        riskProfile: investor.riskProfile,
        notes: investor.notes,
        requirements: investor.requirements,
      });
      setLocationText(listToText(investor.locationFocus));
      setStrategyText(listToText(investor.strategyFocus));
    }
  }, []);

  const activeInvestor = useMemo(
    () => investors.find((investor) => investor.id === selectedId) || null,
    [investors, selectedId],
  );

  function selectInvestor(investor: InvestorProfile): void {
    setSelectedId(investor.id);
    setDraft({
      name: investor.name,
      email: investor.email,
      phone: investor.phone || '',
      locationFocus: investor.locationFocus,
      strategyFocus: investor.strategyFocus,
      budgetMin: investor.budgetMin,
      budgetMax: investor.budgetMax,
      targetRoi: investor.targetRoi,
      riskProfile: investor.riskProfile,
      notes: investor.notes,
      requirements: investor.requirements,
    });
    setLocationText(listToText(investor.locationFocus));
    setStrategyText(listToText(investor.strategyFocus));
    setMessage(null);
  }

  function resetDraft(): void {
    setSelectedId(null);
    setDraft(defaultInvestorDraft);
    setLocationText(listToText(defaultInvestorDraft.locationFocus));
    setStrategyText(listToText(defaultInvestorDraft.strategyFocus));
    setMessage(null);
  }

  function handleSave(): void {
    const cleanDraft: InvestorDraft = {
      ...draft,
      locationFocus: textToList(locationText),
      strategyFocus: textToList(strategyText),
    };
    const errors = validateInvestorDraft(cleanDraft);
    if (errors.length) {
      setMessage(errors.join(' '));
      return;
    }
    const profile = createInvestorProfile(cleanDraft, selectedId || undefined);
    const next = upsertInvestor(investors, activeInvestor ? { ...profile, createdAt: activeInvestor.createdAt } : profile);
    setInvestors(next);
    saveInvestors(next);
    setSelectedId(profile.id);
    setMessage('Investor saved.');
  }

  function handleDelete(id: string): void {
    const next = deleteInvestor(investors, id);
    setInvestors(next);
    saveInvestors(next);
    if (selectedId === id) {
      if (next[0]) selectInvestor(next[0]);
      else resetDraft();
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#10b98122,transparent_30%),linear-gradient(135deg,#020617,#0f172a_45%,#111827)] p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">Investor intelligence</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight lg:text-5xl">Investor CRM</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Turn the old static investor page into a living matching board: criteria, appetite, budget, strategy focus, and deal notes.
            </p>
          </div>
          <Button onClick={resetDraft} className="rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400">
            <Plus className="mr-2 h-4 w-4" /> New investor
          </Button>
        </header>

        <section className="grid gap-5 md:grid-cols-4">
          <Metric icon={Users} label="Investors" value={investors.length.toString()} />
          <Metric icon={WalletCards} label="Combined max budget" value={formatCurrency(investors.reduce((sum, investor) => sum + investor.budgetMax, 0))} />
          <Metric icon={Target} label="Avg target ROI" value={`${Math.round(investors.reduce((sum, investor) => sum + investor.targetRoi, 0) / Math.max(investors.length, 1))}%`} />
          <Metric icon={MapPin} label="Locations tracked" value={new Set(investors.flatMap((investor) => investor.locationFocus)).size.toString()} />
        </section>

        {message && (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4 text-sm text-amber-100">{message}</div>
        )}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <GlassCard className="overflow-hidden">
            <div className="border-b border-white/10 p-4">
              <h2 className="font-bold">Investor list</h2>
              <p className="text-sm text-slate-400">Click to edit criteria.</p>
            </div>
            <div className="divide-y divide-white/10">
              {investors.map((investor) => (
                <button
                  key={investor.id}
                  onClick={() => selectInvestor(investor)}
                  className={`w-full p-4 text-left transition hover:bg-white/5 ${selectedId === investor.id ? 'bg-emerald-400/10' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{investor.name}</p>
                      <p className="text-xs text-slate-400">{investor.strategyFocus.join(' · ')}</p>
                    </div>
                    <span className="rounded-full border border-emerald-300/30 px-2 py-1 text-xs text-emerald-200">{investor.riskProfile}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{formatCurrency(investor.budgetMin)} to {formatCurrency(investor.budgetMax)}</p>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedId ? 'Edit investor' : 'Add investor'}</h2>
                <p className="text-sm text-slate-400">Capture exactly what they are looking for before packaging deals.</p>
              </div>
              {selectedId && (
                <Button variant="destructive" onClick={() => handleDelete(selectedId)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name"><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
              <Field label="Email"><Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
              <Field label="Phone"><Input value={draft.phone || ''} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></Field>
              <Field label="Risk profile">
                <Select value={draft.riskProfile} onValueChange={(riskProfile) => setDraft({ ...draft, riskProfile: riskProfile as InvestorDraft['riskProfile'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Minimum budget"><Input type="number" value={draft.budgetMin} onChange={(e) => setDraft({ ...draft, budgetMin: Number(e.target.value) })} /></Field>
              <Field label="Maximum budget"><Input type="number" value={draft.budgetMax} onChange={(e) => setDraft({ ...draft, budgetMax: Number(e.target.value) })} /></Field>
              <Field label="Target ROI %"><Input type="number" value={draft.targetRoi} onChange={(e) => setDraft({ ...draft, targetRoi: Number(e.target.value) })} /></Field>
              <Field label="Strategies, comma-separated"><Input value={strategyText} onChange={(e) => setStrategyText(e.target.value)} placeholder="BTL, HMO, BRRR" /></Field>
              <Field label="Location focus" className="md:col-span-2"><Input value={locationText} onChange={(e) => setLocationText(e.target.value)} placeholder="Manchester, Leeds, North West" /></Field>
              <Field label="What they are looking for" className="md:col-span-2">
                <Textarea rows={5} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Cashflow target, hands-off preference, refurb appetite, finance notes, timelines..." />
              </Field>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400">
                {selectedId ? <Pencil className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                Save investor
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-1 text-2xl font-black">{value}</p>
        </div>
        <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-300"><Icon className="h-5 w-5" /></div>
      </div>
    </GlassCard>
  );
}

function Field({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
