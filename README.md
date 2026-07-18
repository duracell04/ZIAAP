# ZIAAP

> **ZIAAP aims to transform arbitration from a largely bespoke,
> document-driven professional service into a structured, technology-native
> production system.**

Parties align critical rules before conflict. Software organises the record and
performs explicit calculations. AI maintains source-linked, structured and
contestable analysis. Independent human arbitrators retain full authority over
procedure, judgment and any future award.

> **Standardise the cockpit. Automate the instruments. Preserve the captain.**

## Current status

This repository is a **C0 high-fidelity interactive concept demonstrator**, with
high fidelity limited to workflow and interaction fidelity. It uses synthetic
data, client-local resettable state, curated simulation fixtures, and optional
live-unverified execution.

It is not an externally validated system, arbitral institution, legal
appointment, operative award process, production arbitration service, identity
system, confidential matter store, or predictor of a future dispute result.

The future institutional, partner-ownership, market and economic propositions
are hypotheses. No current cost, speed, capacity, scalability, legal-effect or
commercial result is claimed.

## AI Resolution Officer

The AI Resolution Officer is a governed software capability. It is not a legal
office, arbitral institution, arbitrator, or autonomous decision-maker. It may
structure, compare, retrieve, calculate, test, challenge, explain, and prepare
reviewable analysis. A properly appointed human arbitrator retains procedural
authority, independent judgment, and responsibility for any legally operative
decision.

## Operating model

ZIAAP's future operating model has three protocol layers and six matter gates:

| Layer | Gates |
|---|---|
| **I0 · Flight Plan** | 1. Alignment; 2. Configuration |
| **I1 · Cockpit** | 3. Appointment & Configuration Freeze; 4. Case Production |
| **I2 · Captain in Command** | 5. Independent Adjudication; 6. Award & Black Box |

The current demonstrator calls Gate 6 **Simulated Outcome & Procedural Black
Box** and never presents a fictional result as an award. The
[canonical operating model](docs/product/operating-model.md) defines the
institutional ambition, authority boundaries, evidence qualifications and
current C0 limits.

## Hyper-minimal public concept experiment

`/demo` is a separate four-minute, deterministic walkthrough for unfamiliar
business and international-trade audiences. It uses one synthetic SaaS clause
to show:

> **Agree the rules before the dispute. AI prepares the case if conflict
> occurs. Parties can challenge it. A human arbitrator decides.**

The public walkthrough has five plain-language steps—Align, Test, Dispute,
Review and Outcome—which project the six canonical gates without
creating a competing lifecycle model. It makes no API or model call and stores
resettable walkthrough state in the browser session.

The existing root experience remains the current six-gate C0 reference during
external comprehension review and is also available at `/reference`.
`/feedback` prepares an unsubmitted local research response. No positive
comprehension, usability, legal-framing or commercial-value result is claimed.

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

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev
```

Open `http://localhost:3000`. Live execution and retrieval remain disabled
unless server-only policy flags explicitly enable them.

## Verification

```powershell
pnpm.cmd typecheck
pnpm.cmd lint
pnpm.cmd test
pnpm.cmd build
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
2. [Product charter](docs/00-product-charter.md)
3. [Maturity model](docs/product/maturity-model.md)
4. [Canonical glossary](docs/product/glossary.md)
5. [Claims register](docs/product/claims-register.md)
6. [Release scorecard](docs/product/release-scorecard.md)
7. [Sprint 0 acceptance record](docs/review/sprint-0-acceptance-record.md)
8. [Technical roadmap v1.1](docs/roadmap/ZIAAP_Concept_to_Validated_Product_Technical_Roadmap_v1.1.md)

The older numbered documents have moved to `docs/reference/`. The Git tag
`prototype-showcase-v1.0-review-candidate` preserves the frozen historical
candidate; its name does not classify the current roadmap-era working tree.

## Acceptance gate

The prior Sprint 0 baseline remains preserved in Git history. This
category-defining operating-model refactor is a bounded C0 concept change, not
Sprint 1. It requires machine verification plus product/founder, legal-framing,
corporate-governance and unfamiliar-reader review before merge.

Sprints 1–34 are provisional, funding-dependent future development. The
existing later-stage interface remains a design reference. Prototype planning
begins only after an angel-financing decision and a new prototype charter.

No reviewer participation, comprehension result, usability result, independent
validation, product approval, legal-framing review, partner-ownership approval
or economic evidence may be inferred from repository artifacts. Pending human
evidence is recorded explicitly in the scorecard.
