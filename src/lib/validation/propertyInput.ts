export const UK_POSTCODE_REGEX = /^(GIR ?0AA|[A-PR-UWYZ][0-9][0-9]? ?[0-9][ABD-HJLNP-UW-Z]{2}|[A-PR-UWYZ][A-HK-Y][0-9][0-9]? ?[0-9][ABD-HJLNP-UW-Z]{2}|[A-PR-UWYZ][0-9][A-HJKSTUW] ?[0-9][ABD-HJLNP-UW-Z]{2}|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRV-Y] ?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

const SUPPORTED_PORTAL_HOSTS = [
  'rightmove.co.uk',
  'www.rightmove.co.uk',
  'zoopla.co.uk',
  'www.zoopla.co.uk',
  'onthemarket.com',
  'www.onthemarket.com',
];

export function normalizePostcode(input: string): string {
  const compact = input.replace(/\s+/g, '').toUpperCase();
  if (compact.length <= 3) return compact;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function isValidUkPostcode(input: string): boolean {
  return UK_POSTCODE_REGEX.test(normalizePostcode(input));
}

export function validatePropertyPortalUrl(input: string): { ok: true; url: string; host: string } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: 'Paste a Rightmove, Zoopla, or OnTheMarket property URL.' };

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { ok: false, error: 'Enter a full property URL starting with https://.' };
  }

  if (!['https:', 'http:'].includes(parsed.protocol)) {
    return { ok: false, error: 'Only http or https property URLs are supported.' };
  }

  const host = parsed.hostname.toLowerCase();
  const isSupported = SUPPORTED_PORTAL_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  if (!isSupported) {
    return { ok: false, error: 'Supported portals: Rightmove, Zoopla, and OnTheMarket.' };
  }

  return { ok: true, url: parsed.toString(), host };
}

export function splitAddress(input: string): { line1: string; city: string } {
  const parts = input.split(',').map((part) => part.trim()).filter(Boolean);
  return {
    line1: parts[0] || input.trim(),
    city: parts.slice(1).join(', '),
  };
}

export function toPositiveNumber(value: number, fallback = 0): number {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}
