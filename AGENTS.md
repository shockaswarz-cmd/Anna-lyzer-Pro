# AGENTS.md Architecture

# Antigravity v3.4 Protocol

This document defines the multi-agent orchestration framework for the Anna Lyzer project.

---

## 1. The Effort Parameter (Thinking Budgets)

Declare thinking mode at the start of complex tasks:

| Mode | Budget | Use Case |
|------|--------|----------|
| **[Thinking: Deep/32k]** | 32k tokens | Financial logic, Auth, DB Migrations, Security Audits |
| **[Thinking: Standard/8k]** | 8k tokens | Default for features, refactoring, CSS |
| **[Thinking: Turbo/2k]** | 2k tokens | Documentation, unit tests, simple fixes |

---

## 2. The State Bridge & Artifact Protocol

### Core Artifacts

- **`docs/progress.txt`** - Persistent memory. Every turn concludes with:
  - `[GIT_HASH]`: Current commit
  - `[STATUS]`: B-series/F-series subtask status
  - `[BLOCKERS]`: Missing data or logic gaps

- **`docs/active_schema.json`** - Strict Type Contract
  - Claude defines backend types here
  - Gemini must not deviate when building UI

- **`docs/memory_layer/`** - Semantic Cache
  - Check for previously successful plans before regenerating logic

### MCP Integration

Use Model Context Protocol tools to query real-time data from:

- GitHub (commits, branches, PRs)
- Terminal (build status, test output)
- Browser (live app state)

**Never guess the repo state - query it.**

---

## 3. Strategic Delegation & Parallel Execution

| Agent | Role | Responsibilities |
|-------|------|-----------------|
| **Claude 4.5** | Orchestrator | Blueprint design, code audits, verification gates |
| **Gemini 3.0** | Executor | Long-context analysis, UI generation, high-volume coding |

### Verification Gate

Claude must run a **Reflexion Loop** on all Gemini-generated code before marking as "Verified" in `progress.txt`.

---

## 4. Token & Context Optimization

- **The Delta Rule**: Only output changed lines using `// ... existing code`
- **Semantic Caching**: Check `docs/memory_layer/` before expensive regeneration
- **Context Compaction**: After "Verified" status, summarize to `progress.txt` and prune context

---

## 5. 3-Layer Architecture

```
┌─────────────────────────────────────┐
│     Risk & Intelligence Layer       │
│  (Analytics, Red Flags, Confidence) │
├─────────────────────────────────────┤
│     Strategy & Simulation Layer     │
│   (BTL, HMO, BRRR, SA, R2R, FLIP)   │
├─────────────────────────────────────┤
│     Integration & API Layer         │
│  (Scrapers, External Data, Supabase)│
└─────────────────────────────────────┘
```

---

## 6. File Structure

```
Anna Lyzer 1/
├── docs/
│   ├── progress.txt         # State Bridge
│   ├── active_schema.json   # Type Contract
│   └── memory_layer/        # Semantic Cache
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # UI components
│   └── lib/
│       ├── types/           # TypeScript definitions
│       ├── risk/            # Risk assessment engine
│       ├── strategies/      # Strategy calculators
│       └── scraper/         # Property data ingestion
└── AGENTS.md                # This file
```

---

## Initialization Sequence

When a PRD is provided, respond with:

```
[Antigravity v3.4 Initialized]
Project: [Name]
Active Budget: [Thinking Mode]
Orchestration Plan: [B-Series vs F-Series Split]
First Artifact: [Link to mission_plan.md]
```
