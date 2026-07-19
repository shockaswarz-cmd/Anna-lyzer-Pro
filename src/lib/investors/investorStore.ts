export type InvestorRiskProfile = 'conservative' | 'balanced' | 'growth' | 'aggressive';

export interface InvestorRequirement {
  id: string;
  label: string;
  value: string;
}

export interface InvestorProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  locationFocus: string[];
  strategyFocus: string[];
  budgetMin: number;
  budgetMax: number;
  targetRoi: number;
  riskProfile: InvestorRiskProfile;
  notes: string;
  requirements: InvestorRequirement[];
  createdAt: string;
  updatedAt: string;
}

export type InvestorDraft = Omit<InvestorProfile, 'id' | 'createdAt' | 'updatedAt'>;

export const INVESTOR_STORAGE_KEY = 'anna-lyzer-investors-v1';

export const defaultInvestorDraft: InvestorDraft = {
  name: '',
  email: '',
  phone: '',
  locationFocus: ['Manchester', 'Liverpool'],
  strategyFocus: ['BTL', 'HMO'],
  budgetMin: 100000,
  budgetMax: 350000,
  targetRoi: 12,
  riskProfile: 'balanced',
  notes: '',
  requirements: [
    { id: 'yield', label: 'Minimum net yield', value: '7%+' },
    { id: 'cashflow', label: 'Monthly cashflow', value: '£250+ after finance' },
  ],
};

export function createInvestorProfile(draft: InvestorDraft, id = `investor-${Date.now()}`): InvestorProfile {
  const now = new Date().toISOString();
  return {
    ...draft,
    id,
    name: draft.name.trim(),
    email: draft.email.trim(),
    phone: draft.phone?.trim(),
    locationFocus: draft.locationFocus.map(cleanToken).filter(Boolean),
    strategyFocus: draft.strategyFocus.map(cleanToken).filter(Boolean),
    budgetMin: normaliseMoney(draft.budgetMin),
    budgetMax: Math.max(normaliseMoney(draft.budgetMax), normaliseMoney(draft.budgetMin)),
    targetRoi: Number.isFinite(draft.targetRoi) ? Math.max(0, draft.targetRoi) : 0,
    notes: draft.notes.trim(),
    requirements: draft.requirements
      .map((req) => ({ ...req, label: req.label.trim(), value: req.value.trim() }))
      .filter((req) => req.label || req.value),
    createdAt: now,
    updatedAt: now,
  };
}

export function validateInvestorDraft(draft: InvestorDraft): string[] {
  const errors: string[] = [];
  if (!draft.name.trim()) errors.push('Investor name is required.');
  if (!draft.email.trim() || !/^\S+@\S+\.\S+$/.test(draft.email.trim())) errors.push('A valid investor email is required.');
  if (draft.budgetMax <= 0) errors.push('Maximum budget must be greater than zero.');
  if (draft.budgetMin > draft.budgetMax) errors.push('Minimum budget cannot exceed maximum budget.');
  if (draft.strategyFocus.length === 0) errors.push('Add at least one strategy focus.');
  return errors;
}

export function loadInvestors(): InvestorProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(INVESTOR_STORAGE_KEY);
    if (!raw) return seedInvestors();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedInvestors();
  } catch {
    return seedInvestors();
  }
}

export function saveInvestors(investors: InvestorProfile[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(INVESTOR_STORAGE_KEY, JSON.stringify(investors));
}

export function upsertInvestor(investors: InvestorProfile[], investor: InvestorProfile): InvestorProfile[] {
  const existingIndex = investors.findIndex((item) => item.id === investor.id);
  const next = { ...investor, updatedAt: new Date().toISOString() };
  if (existingIndex === -1) return [next, ...investors];
  return investors.map((item, index) => (index === existingIndex ? next : item));
}

export function deleteInvestor(investors: InvestorProfile[], investorId: string): InvestorProfile[] {
  return investors.filter((item) => item.id !== investorId);
}

function seedInvestors(): InvestorProfile[] {
  return [
    createInvestorProfile({
      ...defaultInvestorDraft,
      name: 'Yield-focused private investor',
      email: 'investor@example.com',
      budgetMin: 150000,
      budgetMax: 400000,
      targetRoi: 14,
      locationFocus: ['North West', 'Midlands'],
      strategyFocus: ['BTL', 'BRRR', 'HMO'],
      notes: 'Seed profile for demo mode. Replace with real investor criteria.',
    }, 'seed-yield-investor'),
  ];
}

function cleanToken(value: string): string {
  return value.trim();
}

function normaliseMoney(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}
