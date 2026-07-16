# ZIAAP

> **Test your dispute-resolution system before you sign the contract.**

ZIAAP helps parties align contractual meaning and test the observable behaviour
of an agreed dispute-resolution process before signing, using a governed AI
Resolution Officer to augment a properly appointed human arbitrator who retains
legal authority.

## Current status

This repository is a **C0 high-fidelity interactive concept demonstrator**, with
high fidelity limited to workflow and interaction fidelity. It uses synthetic
data, client-local resettable state, curated simulation fixtures, and optional
live-unverified execution.

It is not an externally validated system, legal appointment, operative award
process, production arbitration service, identity system, confidential matter
store, or predictor of a future dispute result.

The target concept is a **digital twin of the agreed dispute-resolution process
and its observable behaviour, not a predictor of the future result**.

## AI Resolution Officer

The AI Resolution Officer is a governed software capability. It is not a legal
office, arbitral institution, arbitrator, or autonomous decision-maker. It may
structure, compare, retrieve, calculate, test, challenge, explain, and prepare
reviewable analysis. A properly appointed human arbitrator retains procedural
authority, independent judgment, and responsibility for any legally operative
decision.

## Six-stage lifecycle

1. **Party Alignment**
2. **Protocol Constitution**
3. **Scenario Laboratory**
4. **Configuration Manifest**
5. **Later Dispute**
6. **Audit Dossier**

These names are canonical across the current public surfaces. Sprint 4 will
complete the broader guided/explore, funding-roadmap, and review-session rebuild.

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

1. [Product charter](docs/00-product-charter.md)
2. [Maturity model](docs/product/maturity-model.md)
3. [Canonical glossary](docs/product/glossary.md)
4. [Claims register](docs/product/claims-register.md)
5. [Release scorecard](docs/product/release-scorecard.md)
6. [Technical roadmap v1.1](docs/roadmap/ZIAAP_Concept_to_Validated_Product_Technical_Roadmap_v1.1.md)

The older numbered documents have moved to `docs/reference/`. The Git tag
`prototype-showcase-v1.0-review-candidate` preserves the frozen historical
candidate; its name does not classify the current roadmap-era working tree.

## Stage gate

Sprints 0–4 form the Concept Integrity Release. Work stops after Sprint 4 for
Gate C1: audit the concept, collect real reviewer and commercial evidence,
re-estimate Sprints 5–34, and record a **go, refine, narrow, or hold** decision.
Later estimates are provisional, and the 70-week sequential total is arithmetic
planning only—not an upfront funding or delivery commitment.

No reviewer participation, comprehension result, usability result, independent
validation, product approval, or legal approval may be inferred from repository
artifacts. Pending human evidence is recorded explicitly in the scorecard.
