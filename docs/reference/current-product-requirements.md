# Current Concept Product Requirements

> Normative requirements for the current C0 implementation. The
> [operating model](../product/operating-model.md) controls institutional and
> lifecycle terminology.

## 1. Objective and boundary

Enable arbitration experts, commercial lawyers, design partners, institutions,
business owners and investors to understand the future operating model without
mistaking:

- simulation for authority;
- execution for independent validation;
- the AI Resolution Officer for a legal actor;
- the reasoning memorandum for a verdict;
- partner ownership for a current corporate fact; or
- the aviation analogy for mechanical outcome predictability.

The repository remains a high-fidelity interactive concept demonstrator, where
high fidelity is limited to workflow and interaction fidelity.

## 2. Expert experience: three layers and six gates

The preserved `/reference` experience uses six screens:

1. **I0 · Alignment** compares independent expectations and confirms exact
   language.
2. **I0 · Configuration** combines the Constitution control plane and scenario
   testing.
3. **I1 · Appointment & Configuration Freeze** prepares the exact manifest and
   contains an explicitly fictional appointment interaction.
4. **I1 · Case Production** presents claims, defences, facts, evidence, missing
   evidence, calculations and objections as structured state.
5. **I2 · Independent Adjudication** records a preliminary fictional human view
   before revealing the advisory reasoning memorandum and exposes adopt,
   modify, reject and request-more-evidence controls.
6. **I2 · Simulated Outcome & Procedural Black Box** presents the event-derived
   record and existing artifacts without calling the result an award.

Configuration manifest remains a Gate 3 technical artifact, not a lifecycle
stage. The reasoning memorandum is a Gate 5 advisory artifact, not the
authoritative case model.

## 3. Public experience

The root redirects to `/demo`, which remains a deterministic five-step
projection:

| Public step | Canonical gates |
|---|---|
| Align | Gate 1 |
| Test | Gate 2 plus Gate 3 configuration integrity |
| Dispute | Gate 4 |
| Review | Gate 5 |
| Outcome | Gate 6 |

The legal appointment portion of Gate 3 is unavailable in the public
simulation. Public routes, the `MinimalDemoState` v1 schema, golden case, source
drawer, one-action progression, session persistence, Back/Forward behavior and
offline execution remain stable.

## 4. State requirements

- Existing `ContractState` lifecycle statuses remain operational readiness
  state.
- `getActiveMatterGate` and `getGateReadiness` are pure projections.
- `buildStructuredCaseState` is the primary case projection.
- `buildReasoningMemorandumInput` excludes sealed settlement content.
- `buildProceduralBlackBox` is generated from recorded events and excludes
  private fictional deliberation text.
- Behavior-affecting configuration changes invalidate manifests, dispute
  binding and downstream reasoning artifacts.

## 5. Authority requirements

- Enforce `simulation_only` and `legalEffect: false`.
- Keep execution and lifecycle status separate.
- Make `authoritative`, `validated` and ordinary appointed state unreachable.
- Label actor, status, version, consequence, provenance and limitation on
  consequential artifacts.
- A properly appointed human arbitrator retains judgment and any future
  signature.
- Engineers, investors and the future institution have no live-case merits
  authority.

## 6. Execution and failure requirements

Expert reference routes may expose distinct curated-simulation and live actions.
Fixtures return `illustrative_only`; successful declared live calls return
`executed_unverified`; every live error returns `failed` with a reason and no
fallback success.

The public walkthrough makes zero model or application-API calls. Its optional
feedback form is a disclosed exception to offline operation: the browser posts
the required-email research response directly to the temporary FormSubmit
processor. It does not add an application backend.

## 7. Accessibility and responsive requirements

Keyboard focus is visible; semantic controls and status regions are used;
colour is never the sole status cue; desktop and mobile have no page-level
horizontal scroll; and dense detail uses progressive disclosure. Required
browser widths include desktop, laptop, tablet and 390 px.

## 8. Claims requirements

The north star, category thesis, partner target and economic thesis may be
stated only with the qualifications in the claims register. “First,” CHF
50,000–500,000, faster, predictable, economically viable and scalable remain
hypotheses.

External sources establish context or precedent only. They do not validate
ZIAAP, establish AI Act classification or prove enforceability.

## 9. Acceptance

The refactor requires typecheck, lint, tests, production build,
`git diff --check`, complete expert and public critical paths, responsive
browser checks and no console errors.

Product/founder, legal-framing, corporate-governance and unfamiliar-reader
evidence remains pending. Root publication is a pilot routing decision and
does not satisfy any acceptance gate. Privacy-governance review of the
temporary feedback processor also remains pending.

## 10. Non-goals

No application backend, authentication, confidential data, real appointment, corporate
ownership implementation, signature, award, production case management,
independent validation, sovereign runtime, Council of LLMs, DLT or enforcement
is included.
