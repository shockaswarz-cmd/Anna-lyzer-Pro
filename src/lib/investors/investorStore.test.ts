import { describe, expect, it } from 'vitest';
import { createInvestorProfile, defaultInvestorDraft, deleteInvestor, upsertInvestor, validateInvestorDraft } from './investorStore';

describe('investor store helpers', () => {
  it('validates required investor fields', () => {
    expect(validateInvestorDraft({ ...defaultInvestorDraft, name: '', email: 'bad' })).toContain('Investor name is required.');
    expect(validateInvestorDraft({ ...defaultInvestorDraft, name: 'Alice', email: 'alice@example.com' })).toEqual([]);
  });

  it('normalises and upserts investor profiles', () => {
    const investor = createInvestorProfile({ ...defaultInvestorDraft, name: ' Alice ', email: ' alice@example.com ', budgetMin: 500000, budgetMax: 200000 }, 'i-1');
    expect(investor.name).toBe('Alice');
    expect(investor.email).toBe('alice@example.com');
    expect(investor.budgetMax).toBe(500000);

    const inserted = upsertInvestor([], investor);
    expect(inserted).toHaveLength(1);

    const updated = upsertInvestor(inserted, { ...investor, notes: 'Updated' });
    expect(updated).toHaveLength(1);
    expect(updated[0].notes).toBe('Updated');
    expect(deleteInvestor(updated, 'i-1')).toEqual([]);
  });
});
