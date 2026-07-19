# Anna Lyzer Pro Hosting & Production Readiness Plan

Status: ready for operator approval, not permanently deployed.

## Current verified state

- Framework: Next.js App Router on Next 16.2.10.
- Local production build passes with `npm run build`.
- Runtime command: `npm run start -- -p 3100`.
- Verified routes in local production mode:
  - `/dashboard`
  - `/analyser`
  - `/investors`
  - `/packs`
  - `/pipeline`
  - `/settings`
  - `/api/scrape` validation failure path

## Required environment

Copy `docs/env.template` to `.env.local` locally, or configure equivalent provider secrets in Vercel/Netlify/DigitalOcean.

### Required for full product mode

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

Without Firebase, the app can still run, but authenticated deal persistence and the production investor CRM path are incomplete. The current `/investors` page uses browser local storage as a safe demo fallback.

### Required for robust scraping

```text
FIRECRAWL_API_KEY
```

Without Firecrawl, `/api/scrape` falls back to the legacy HTTP parser where possible. It is suitable for smoke testing, not reliable production scraping.

### Optional enhancements

```text
EPC_API_KEY
NEXT_PUBLIC_GOOGLE_MAPS_KEY
```

## Recommended deployment options

### Option A: Vercel, recommended for fastest production

Best for: quick domain/TLS/preview deployment with lowest ops burden.

Steps after approval:

1. Connect GitHub repo to Vercel.
2. Set environment variables in Vercel Project Settings.
3. Build command: `npm run build`.
4. Framework preset: Next.js.
5. Deploy preview branch first.
6. Smoke test preview routes.
7. Promote to production after approval.

Rollback: use Vercel deployment history to promote the previous green deployment.

### Option B: Netlify

Repo already has `netlify.toml`.

Steps after approval:

1. Connect repo to Netlify.
2. Confirm `@netlify/plugin-nextjs` is installed/available during build.
3. Set environment variables in Netlify Site Settings.
4. Deploy preview first.
5. Smoke test all key routes.
6. Promote to production after approval.

Rollback: Netlify deploy history.

### Option C: DigitalOcean droplet, self-hosted

Best for: keeping it on Marcus's existing DO fleet, but higher ops burden.

Steps after approval:

1. Pull repo on selected droplet.
2. Create `.env.local` with production secrets, mode `0600`.
3. Run `npm ci` and `npm run build`.
4. Create a systemd service running `npm run start -- -p 3100` from the repo.
5. Put Nginx/Caddy in front with TLS.
6. Configure firewall for 80/443 only, keep app port internal if possible.
7. Smoke test via domain.

Rollback: keep previous release directory and switch systemd symlink back, then reload service.

## Approval gates

Do not proceed without Marcus approval for:

- production deploy,
- domain/DNS changes,
- firewall exposure,
- reverse proxy/TLS setup,
- inserting live secrets,
- paid provider changes.

## Production smoke checklist

Run after every deploy:

```bash
npm run test:run -- --reporter=dot
npm run lint
npm run build
```

Then HTTP checks:

```text
/                 200
/dashboard        200
/analyser         200
/investors        200
/packs            200
/pipeline         200
/settings         200
/api/scrape bad unsupported URL returns 400
```

## Current blockers

- Firebase values are not present on this server.
- Firecrawl key is not present on this server.
- Permanent public deployment still needs target approval.

## Recommended next decision

Use Vercel unless Marcus specifically wants Anna Lyzer on the DigitalOcean fleet. It gives previews, rollback, TLS, and GitHub deploy integration with less faff.
