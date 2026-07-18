# ZIAAP Repository Instructions

## Current product boundary

ZIAAP is a high-fidelity interactive concept demonstrator. High fidelity refers
only to workflow and interaction fidelity. The repository uses synthetic data,
client-local resettable state, and simulation-only actions with no legal effect.

The AI Resolution Officer is a governed software capability. It is not a legal
office, arbitral institution, arbitrator, or autonomous decision-maker. A
properly appointed human arbitrator retains legal authority and responsibility.

The canonical future operating model is defined in
`docs/product/operating-model.md`: I0 Flight Plan, I1 Cockpit and I2 Captain in
Command, projected through six matter gates. The partner-owned institution,
CHF 50,000–500,000 target range, “first” category position and economic benefits
are hypotheses, not current product or company facts.

## Sprint execution

- Implement one roadmap sprint per task and branch.
- Do not begin the next sprint until the current diff, verification, evidence,
  and definition of done have been reviewed.
- Preserve the simulation-only boundary unless a later approved sprint
  explicitly changes it.
- Sprints 0–4 are sequential because they overlap in schemas, fixtures, docs,
  and workflow components.
- Stop after Sprint 4 for Gate C1 and a go, refine, narrow, or hold decision.

## Engineering conventions

- Treat structured state and pure projections as authoritative; UI-local state
  may represent only navigation, loading, notices, and research-session UI.
- Treat the reasoning memorandum as a state-derived advisory artifact and the
  procedural black box as an event-derived record that excludes private human
  deliberation.
- Keep illustrative, live-unverified, deterministic, and human-simulated
  outputs visibly distinct.
- Never fabricate legal, institutional, reviewer, comprehension, usability,
  validation, security, or production evidence.
- Update code, tests, fixtures, and canonical documentation together.
- Keep public wording consistent with `lib/product-language.ts` and
  `docs/product/glossary.md`.

## Verification

Run all checks relevant to the sprint before requesting review:

```powershell
pnpm.cmd typecheck
pnpm.cmd lint
pnpm.cmd test
pnpm.cmd build
```

Also run `git diff --check`. Report environment failures separately from source
failures and list any human approval or evidence still pending.
