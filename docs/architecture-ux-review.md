# Anna Lyzer Pro Architecture & UX Review

Status: completed by Courtina/Hermes because the Multica Claude Code runtime remains blocked by `Invalid API key · Please run /login` on the Mac runtime.

## Scope reviewed

- Dashboard command centre
- Analyzer URL/manual-entry flow
- Investor CRM
- Scraper validation and fallback behaviour
- Production readiness and deployment gates
- Dependency/security posture

## Architecture review

### Strengths

- The app now has explicit validation seams in `src/lib/validation/propertyInput.ts` rather than scattering postcode/portal logic across UI and API routes.
- `/api/scrape` validates portal URL scheme/host server-side before Firecrawl/fallback execution, reducing unsafe input risk.
- Manual property creation flows through `createDealFromManual`, which normalises postcode, retains source URL, tenure, size, and description, and returns a consistent `Deal` shape.
- Investor data has a dedicated local store helper in `src/lib/investors/investorStore.ts` with tests. This keeps browser persistence isolated and replaceable when Firestore is wired.
- `Deal.pipelineStatus` is now typed, removing the previous `@ts-ignore`/`any` in the pipeline board.
- Hosting requirements are now explicit in `docs/hosting-plan.md`, with approval gates and rollback paths.

### Risks and tradeoffs

- Firebase is not configured on `hermes-brain`, so investor CRM is demo/local-storage mode. This is acceptable for preview, not production multi-device persistence.
- Firecrawl is not configured on `hermes-brain`, so scraper reliability depends on the legacy fallback until `FIRECRAWL_API_KEY` is supplied.
- Next/PostCSS audit still reports 2 moderate advisories after upgrading to Next 16.2.10. `npm audit` proposes an unsafe/breaking downgrade path, so no forced fix was applied.
- `/packs` still contains demo/mock-path assumptions and should be the next persistence integration target after Firebase is configured.

## UX review

### Dashboard

The dashboard now works as a deal command centre rather than a static landing page:

- primary action rail for Analyze, Investors, Pipeline, Packs,
- KPI cards for deal flow context,
- workflow/deal board framing,
- diligence watch and competitor-informed cues around yield, ROI, cashflow, comparables, and local-market context.

Recommendation: once real deal storage is wired, replace static/demo dashboard metrics with Firestore-derived counts and recent deal activity.

### Analyzer

The analyzer flow now handles the important operator modes:

- URL mode accepts supported property portals only,
- unsafe schemes like `javascript:` are rejected,
- manual mode captures enough deal context to produce a useful pack,
- source listing link is preserved into analysis output.

Recommendation: add a visible “scraper fallback mode” badge when Firecrawl is absent so Marcus can tell whether a deal came from reliable extraction or best-effort parsing.

### Investors

The `/investors` page is now a useful lightweight CRM:

- add/edit/delete profiles,
- budget min/max,
- ROI/yield target,
- risk profile,
- locations,
- strategies,
- criteria and notes.

Recommendation: add Firestore-backed persistence as the next upgrade once Firebase env exists, keeping the current local-storage store as an offline fallback.

## Acceptance decision

Accepted for preview/demo and PR review:

- Unit tests pass.
- Lint is clean.
- Production build passes.
- Local production route smoke checks pass.
- Security posture improved by removing the unused deprecated MCP GitHub server dependency.
- Production deployment is deliberately gated pending Marcus approval and env/domain decisions.

Not accepted for permanent production until:

- Firebase env is configured,
- Firecrawl key is configured,
- deployment target is approved,
- domain/TLS/public exposure is approved,
- post-deploy smoke checklist is run.
