import { describe, expect, it } from 'vitest';
import { isValidUkPostcode, normalizePostcode, splitAddress, validatePropertyPortalUrl } from './propertyInput';

describe('property input validation', () => {
  it('normalises UK postcodes into outward and inward code format', () => {
    expect(normalizePostcode('m146af')).toBe('M14 6AF');
    expect(normalizePostcode(' SW1A1AA ')).toBe('SW1A 1AA');
  });

  it('validates real-looking UK postcodes and rejects junk', () => {
    expect(isValidUkPostcode('M14 6AF')).toBe(true);
    expect(isValidUkPostcode('SW1A 1AA')).toBe(true);
    expect(isValidUkPostcode('NOT A POSTCODE')).toBe(false);
  });

  it('allows only supported property portal URLs', () => {
    expect(validatePropertyPortalUrl('https://www.rightmove.co.uk/properties/123').ok).toBe(true);
    expect(validatePropertyPortalUrl('https://www.zoopla.co.uk/for-sale/details/123').ok).toBe(true);
    expect(validatePropertyPortalUrl('https://www.onthemarket.com/details/123').ok).toBe(true);
    expect(validatePropertyPortalUrl('javascript:alert(1)').ok).toBe(false);
    expect(validatePropertyPortalUrl('https://example.com/property').ok).toBe(false);
  });

  it('splits manual addresses without losing later city parts', () => {
    expect(splitAddress('10 High Street, Salford, Manchester')).toEqual({
      line1: '10 High Street',
      city: 'Salford, Manchester',
    });
  });
});
