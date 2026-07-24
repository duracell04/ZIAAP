# ZIAAP Contract Alignment

**Category thesis:** Computational Private Ordering

> **ZIAAP is a scenario-based contract-alignment system for complex commercial
> agreements. It converts selected clauses into concrete operational scenarios,
> collects the parties' independent expectations, identifies materially
> different outcomes, and produces a versioned record of what was aligned,
> deliberately left open, or incorporated into the contract.**

The sole active commercial wedge is pre-signature alignment for selected
high-impact clauses in complex enterprise systems-integration MSAs. Lifecycle
re-alignment, segregated mediation and structured handover to independent
professionals or institutions are deferred architectural extensions.

## Current status

This repository is a **C0 high-fidelity interactive concept demonstrator**, with
high fidelity limited to workflow and interaction fidelity. It uses synthetic
data, client-local resettable state, curated simulation fixtures, and optional
live-unverified execution.

It is not an implemented Contract Alignment product, externally validated
system, arbitral institution, legal appointment, operative award process,
production arbitration service, identity system, confidential matter store, or
predictor of a future dispute result.

No current cost, speed, capacity, scalability, legal-effect or commercial
result is claimed. The partner-owned institutional model and earlier two-wedge
go-to-market comparison are preserved only as superseded research history.

## Governed software boundary

Models may propose scenarios and normalised representations. They never control
authoritative state, reveal a sealed response, assign legal status, lock a
version or create legal effect. Each party confirms its own position, both
parties control shared dispositions, and transaction counsel controls any
external adoption process.

The AI Resolution Officer remains a governed software capability in the
long-term architecture. It is not a legal office, arbitral institution,
arbitrator, or autonomous decision-maker.

## Operating model

ZIAAP's long-term operating model has three protocol layers and six matter
gates. Pilot 01 is limited to I0:

| Layer | Gates |
|---|---|
| **I0 · Flight Plan** | 1. Alignment; 2. Configuration |
| **I1 · Cockpit** | 3. Appointment & Configuration Freeze; 4. Case Production |
| **I2 · Captain in Command** | 5. Independent Adjudication; 6. Award & Black Box |

The current demonstrator calls Gate 6 **Simulated Outcome & Procedural Black
Box** and never presents a fictional result as an award. The
[Pilot 01 Protocol](docs/product/pilot-01-protocol.md) controls the active
product and validation specification; the [operating model](docs/product/operating-model.md)
controls the deferred I0–I2 architecture.

## Hyper-minimal public concept experiment

`/demo` is a four-minute deterministic concept walkthrough using one synthetic
clause. Align and Test scenarios illustrate the current Contract Alignment
wedge. Structure dispute, Human review and Procedural record are labelled as
deferred future architecture. The walkthrough makes no API or model call and
stores resettable state in the browser session.

The deployed root redirects to this public walkthrough for a bounded pilot.
The six-gate C0 expert experience remains available at `/reference`.
`/feedback` sends required-email research responses through FormSubmit under
the [temporary feedback-pilot governance](docs/product/feedback-pilot-governance.md).
Root publication is not evidence of comprehension, usability, legal-framing,
privacy-governance or commercial value.

## Authority and execution model

```ts
lifecycleMode: "simulation_only" | "authoritative"
executionStatus:
  | "not_executed"
  | "illustrative_only"
  | "executed_unverified"
  | "validated"
  | "failed"
legalEffect: false
```

Only `simulation_only` is available. `authoritative` and `validated` are
reserved and unreachable in the current concept. A curated fixture is
`illustrative_only`; a successful declared live call is
`executed_unverified`; a live failure returns `failed` and never silently
substitutes an illustrative success.

Every consequential artifact remains synthetic and without legal effect. No
checkbox proves identity, authority, informed consent, provenance, signature,
appointment, or enforceability.

## Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Live execution and retrieval remain disabled
unless server-only policy flags explicitly enable them.

On local Windows PowerShell installations that require executable suffixes,
use `pnpm.cmd` for the same commands.

## Verification

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
git diff --check
```

## Repository map

- `app/` — App Router page, styles, and fail-closed route handlers
- `components/` — opening, alignment, protocol, dispute, and dossier views
- `lib/` — schemas, language, eligibility, hashing, transitions, and calculations
- `data/` — curated synthetic fixture
- `tests/` — schema, route, transition, firewall, calculation, and terminology tests
- `docs/` — roadmap-era canonical documents, reference material, and review protocols

## Canonical documents

1. [Operating model](docs/product/operating-model.md)
2. [Pilot 01 Protocol](docs/product/pilot-01-protocol.md)
3. [Product charter](docs/00-product-charter.md)
4. [Maturity model](docs/product/maturity-model.md)
5. [Canonical glossary](docs/product/glossary.md)
6. [Claims register](docs/product/claims-register.md)
7. [Release scorecard](docs/product/release-scorecard.md)
8. [Superseded feedback disposition and validation plan](docs/product/feedback-disposition-and-validation-plan.md)
9. [Sprint 0 acceptance record](docs/review/sprint-0-acceptance-record.md)
10. [Technical roadmap v1.1](docs/roadmap/ZIAAP_Concept_to_Validated_Product_Technical_Roadmap_v1.1.md)

The older numbered documents have moved to `docs/reference/`. The Git tag
`prototype-showcase-v1.0-review-candidate` preserves the frozen historical
candidate; its name does not classify the current roadmap-era working tree.

## Acceptance gate

The prior Sprint 0 baseline remains preserved in Git history. This
strategy and wording reconciliation is a bounded C0 concept change, not Sprint
1. Product direction was approved on 2026-07-24. Legal-framing, privacy,
security, market, usability, production and unfamiliar-reader review remain
pending.

Sprints 1–34 are provisional, funding-dependent future development. The
existing later-stage interface remains a design reference. Prototype planning
begins only after an angel-financing decision and a new prototype charter.

No reviewer participation, comprehension result, usability result, independent
validation, legal-framing approval, privacy or security approval, pilot result
or economic evidence may be inferred from repository artifacts. Pending human
evidence is recorded explicitly in the scorecard.
