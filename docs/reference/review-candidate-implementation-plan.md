# Historical Review-Candidate Implementation Plan

> Historical reference for the frozen `prototype-showcase-v1.0-review-candidate`
> tag. The [ZIAAP Operating Model](../product/operating-model.md), roadmap v1.1,
> product charter and sprint plans supersede this document.

## Decision-Complete Foundation Before Implementation

This plan originally governed the authority foundation and Party Alignment alpha.
The sequencing amendment in `goal-objective.md` now extends the same decisions
through the complete review candidate before external evaluation. It remains
limited to a synthetic, simulation-only showcase. It
does not design production arbitration infrastructure, identity, signatures,
institutional appointment, operative awards, sovereign runtime deployment,
Council-of-LLMs orchestration, DLT execution, or smart-contract enforcement.

## 1. Baseline Findings

The repository already contains a coherent five-stage Next.js demonstration,
typed fixture, deterministic service-credit calculator, manifest hashing,
settlement firewall, and basic tests. The alpha cannot build on its present
authority model unchanged because:

- workflow progress is split across overlapping `constitution.status`,
  `appointment.status`, matter-stage strings, and scenario `passed` flags;
- cached fixtures are presented as validated and appointment-eligible;
- live errors silently return cached success;
- model output assigns its own `passed` verdict;
- appointment is a synchronous browser mutation using client-controlled fields;
- the manifest omits party-profile confirmation state and exact artifact
  references needed by the transition checks;
- Stage 1 does not expose the analysis, source, option, calculator, and Annex
  data already present in the domain model; and
- the application opens inside the workspace without first explaining ZIAAP.

The working tree was clean at inspection. The checked-in dependency declaration
is coherent, but the existing local `node_modules` is incomplete (the TypeScript
binary is missing). That is an environment/setup issue to resolve at the clean
verification gate, not evidence of a source-code failure.

## 2. Exact Authority and Schema Changes

`lib/case-model.ts` will export the following canonical enums without adding a
second simulation-status vocabulary:

```ts
type LifecycleMode = "simulation_only" | "authoritative";
type ExecutionStatus =
  | "not_executed"
  | "illustrative_only"
  | "executed_unverified"
  | "validated"
  | "failed";
type LifecycleStatus =
  | "draft"
  | "manifest_prepared"
  | "manifest_acknowledged"
  | "appointment_simulated"
  | "dispute_simulated"
  | "closed";
```

The generic enums document reserved values. The showcase state schema will
enforce `lifecycleMode: "simulation_only"`, `legalEffect: false`, and will reject
`executionStatus: "validated"`. No command or route will be able to create
`authoritative` or `validated` state.

`ContractState` will gain these root fields:

```ts
lifecycleMode: "simulation_only";
lifecycleStatus: LifecycleStatus;
legalEffect: false;
syntheticData: true;
```

Every material artifact will carry an `authority` envelope:

```ts
{
  lifecycleMode: "simulation_only";
  executionStatus: ExecutionStatus;
  legalEffect: false;
  syntheticData: true;
  provenance: string;
  limitations: {
    productionIdentityVerified: false;
    institutionalAppointment: false;
    productionSignature: false;
    operativeAward: false;
  };
}
```

Non-model artifacts use `not_executed`; curated model-like fixtures use
`illustrative_only`; successful live model artifacts use
`executed_unverified`. `failed` belongs to an execution attempt and is never
simulation-eligible.

The current overlapping fields will change as follows:

- remove `constitution.status`; infer readiness from `lifecycleStatus`, exact
  artifact state, and synchronous predicates;
- remove `appointment.status`; use only `lifecycleStatus` for workflow progress;
- remove scenario `passed`; a model result reports observations, not an
  authoritative validation verdict;
- replace scenario `approvals` with exact-artifact
  `simulatedAcknowledgements`, each storing the acknowledged artifact ID;
- replace appointment `confirmations` with exact-hash
  `simulatedAcknowledgements`;
- replace `arbitratorAccepted` with `simulatedArbitratorAccepted`;
- replace simulated signature strings with plainly named simulation records so
  no UI or schema suggests a production signature;
- replace API metadata `mode: cached | live | fallback` with
  `executionMode: illustrative | live`, canonical `executionStatus`, artifact
  ID, declared configuration, provenance, and optional failure detail; and
- retain material-type labels (`source`, `party_assertion`,
  `provisional_ai_analysis`, `reproducible_calculation`, and so on) because they
  describe content type, not authority or workflow state.

`calibrationResultSchema` will report summary, behavior, safeguards observed,
limitations, and outcome without `passed`. `calibrationScenarioSchema` will
identify the selected artifact and exact bilateral simulated acknowledgements.
Scenario references in the appointment record must be present, unique, and
resolve to the selected artifacts.

`appointmentRecordSchema` will contain `manifestVersion`, `manifestHash`, the
Constitution version, exact scenario/artifact references, exact-hash simulated
acknowledgements, disclosure review, simulated arbitrator acceptance, and a
simulation record timestamp. It will not contain ordinary `appointed` status.

For Party Alignment:

- `optionSchema` gains `commercialConsequence`, `evidenceRequirements`,
  `legalReviewBoundary`, and `selectionConsequence`;
- `divergenceFindingSchema` gains finding-level `unresolvedMatters`;
- an `alignmentScenarioSchema` records the uptime test inputs, decision-version
  reference, selected-option reference, and deterministic result;
- analysis artifacts receive the authority envelope and an artifact ID;
- the selected analysis artifact is tracked separately from the last failed
  attempt so a valid artifact can be preserved but not silently reselected; and
- `buildAlignmentAnnex` emits only selected, exact-version, bilaterally confirmed
  terms together with the authority envelope and source provenance.

The fixture in `data/demo-case.json` will be migrated to these exact fields and
remain synthetic and domain-neutral enough for public demonstration.

## 3. Lifecycle, Eligibility, and Valid Combinations

The only forward lifecycle is:

```text
draft
→ manifest_prepared
→ manifest_acknowledged
→ appointment_simulated
→ dispute_simulated
→ closed
```

Simulation eligibility is a single shared function:

| Execution status | Display | Simulated acknowledgement | Simulated ceremony | Authoritative approval |
|---|---:|---:|---:|---:|
| `not_executed` | yes | no | no | no |
| `illustrative_only` | yes | yes | yes | no |
| `executed_unverified` | yes | yes | yes | no |
| `failed` | yes | no | no | no |
| `validated` | future only | future only | future only | future only |

The party action is always **“Acknowledge for simulated ceremony.”** Nearby copy
states that it has no legal or authoritative effect.

The state schema and transition verifier reject, at minimum:

- `authoritative` lifecycle mode in this build;
- `validated` execution status in this build;
- `manifest_prepared` without a current hash and eligible selected artifacts;
- `manifest_acknowledged` without two acknowledgements of the exact hash;
- `appointment_simulated` without every integrity check;
- `dispute_simulated` without a simulated appointment bound to the exact hash;
- duplicate, missing, stale, or unresolved scenario references; and
- any ordinary authoritative `appointed` value, which is removed from the
  schemas rather than merely hidden in the UI.

## 4. API Failure Contract

`POST /api/analyze`, `POST /api/calibrate`, and
`POST /api/dispute-preview` will expose two explicit request modes:
`illustrative` and `live`. Illustrative mode returns a curated fixture with
`illustrative_only`. A successful live call returns `executed_unverified`.

Live mode never returns an illustrative success as fallback. Errors use:

```ts
{
  executionStatus: "failed";
  code:
    | "model_mismatch"
    | "credentials_unavailable"
    | "live_execution_disabled"
    | "timeout"
    | "invalid_output"
    | "provider_failure"
    | "configuration_unavailable";
  reason: string;
  retryable: boolean;
}
```

Status codes are `400` for malformed input, `403` for public live execution
disabled by policy, `409` for declared-model or lifecycle mismatch, `422` for
schema-invalid model output, `503` for unavailable credentials/configuration,
`502` for provider failure, and `504` for timeout. UI handlers preserve the last
valid artifact, select no eligible artifact after a failed live attempt, show
the reason, and require a deliberate **“View illustrative example”** action or a
successful rerun before acknowledgement and manifest preparation can continue.

`POST /api/legal-source` adopts the same no-fallback-on-live-error rule.
`POST /api/settlement-preview` remains deterministic and fail-closed. All route
errors are distinguishable from transport/parsing errors in the UI.

Public showcase deployments default live execution and unrestricted retrieval
to disabled through server-only configuration. No provider credential is
exposed to the browser and there is no uncontrolled spending path.

## 5. Transition and Invalidation Rules

`lib/protocol.ts` will separate:

1. synchronous readiness predicates used only for button state, labels, and
   guidance; and
2. `simulateAppointmentTransition`, an asynchronous integrity-enforcing command
   that returns either a new state or a typed rejection while preserving the
   prior state.

Immediately before mutation, the command will rebuild the exact protocol
manifest, recompute SHA-256, compare it with the stored hash, and verify:

- both party profiles are confirmed;
- every exact clause version is bilaterally confirmed;
- every referenced execution artifact exists and is selected;
- every execution status is simulation-eligible;
- all artifact acknowledgements point to the exact selected artifact;
- Constitution version and appointment record version match;
- lifecycle status is `manifest_acknowledged`;
- both manifest acknowledgements equal the recomputed hash;
- scenario references are complete and unique;
- disclosure review is complete; and
- simulated arbitrator acceptance is recorded.

It rejects stale, forged, incomplete, inconsistent, or bypassed state and makes
no identity, consent, provenance, signature, or legal-authority claim.

Invalidation is deterministic:

- party-expectation edits clear that party’s profile confirmation, mark the
  current analysis stale/inactive, and invalidate every prepared downstream
  manifest state;
- option or clause-language edits increment the decision version, clear exact
  confirmations, invalidate scenario results tied to the former decision, and
  reset downstream lifecycle to `draft`;
- alignment-scenario input edits recompute the deterministic result and reset
  downstream lifecycle to `draft`;
- Constitution or stress-scenario edits increment the Constitution version,
  clear selected results and acknowledgements, and reset downstream lifecycle;
- new illustrative/live artifacts clear acknowledgements for the replaced
  selection and reset prepared manifest state;
- a failed live attempt preserves prior artifacts but deselects eligibility;
- revoking an exact-hash acknowledgement moves
  `manifest_acknowledged → manifest_prepared`;
- any behavior-affecting edit after manifest preparation clears the stored hash,
  hash acknowledgements, disclosure review, simulated acceptance, simulated
  appointment record, dispute binding, and later-decision state; and
- reset restores a fresh clone of the original synthetic fixture, including all
  execution and failure states.

## 6. Exact Protocol Manifest

`buildProtocolManifest` will identify selected contractual decisions, legal
architecture, Constitution, declared model identity, prompt/retrieval/tool/engine
versions, exact stress-test or simulation artifacts and their execution status,
human-arbitrator record, alignment scenario, and change policy. Party UI
acknowledgement booleans are excluded from the content hash; exact artifact
identity and version are included.

All UI and canonical documentation will call this the **Exact protocol
manifest**. It is expressly not a complete executable-build attestation,
dependency digest, provider-side execution proof, deployed-environment or
runtime attestation, or production cryptographic signature.

## 7. Opening Experience States

The application starts in an opening view, not in the workspace. It contains
the canonical one-sentence definition, commercial problem, pre-conflict thesis,
human/protocol distinction, complete lifecycle diagram, scope boundary, and a
persistent synthetic/simulation-only disclosure.

Its explicit states are:

- `opening`: default first view with no hidden loading dependency;
- `guided`: entered through **“Begin guided demonstration”**, opens Party
  Alignment with ordered guidance and guarded Continue actions; and
- `explore`: entered through **“Explore the workflow”**, opens the workspace
  overview with direct navigation and truthful incomplete-state indicators.

Both paths retain a route back to the opening. Desktop and mobile layouts keep
the authority disclosure and lifecycle legible without horizontal page scroll.

## 8. Party Alignment Alpha States

The Stage 1 sequence is:

```text
Draft contract
→ independent party expectations
→ divergence analysis
→ source-linked issues
→ options and trade-offs
→ deterministic scenario testing
→ revised contractual language
→ exact-version bilateral confirmation
→ Alignment Annex
```

The interface has designed states for:

- illustrative analysis selected (`illustrative_only`);
- live analysis loading;
- successful live analysis (`executed_unverified`);
- failed live analysis with preserved but inactive prior artifact;
- stale analysis after expectation edits;
- source loading, available, review-required, and failed states;
- unresolved option selection;
- selected option with structured terms, commercial consequence, evidence
  requirements, legal-review boundary, scenario result, and selection effect;
- deterministic calculation blocked by missing/unconfirmed inputs;
- deterministic calculation complete with visible formula and inputs;
- draft revised language;
- one-party and two-party exact-version confirmation;
- Annex locked by incomplete confirmation; and
- Annex generated from the selected and bilaterally confirmed exact versions.

Source text, party assertion, AI-supported analysis, legal constraint,
deterministic calculation, proposed option, and agreed contractual text use
distinct semantic labels and treatments. Every consequential surface shows
actor, authority status, lifecycle mode, execution status, version, consequence,
provenance, and legal-effect boundary.

## 9. File-Level Change Set

| File | Planned review-candidate change |
|---|---|
| `docs/00-alpha-implementation-plan.md` | Freeze these implementation decisions and record verification outcomes. |
| `lib/case-model.ts` | Add canonical authority/lifecycle schemas, artifact envelopes, Party Alignment fields, refinements, and remove overlapping statuses/verdicts. |
| `lib/protocol.ts` | Build the expanded manifest; add eligibility/readiness helpers, invalidation, and async verified simulation transition. |
| `lib/scenario.ts` | Keep deterministic arithmetic pure; add decision/scenario reference checks where needed. |
| `lib/execution.ts` (new) | Centralize execution result/failure construction and status eligibility. |
| `data/demo-case.json` | Migrate fixture to the locked schema and truthful illustrative labels. |
| `app/api/analyze/route.ts` | Separate illustrative/live actions and fail closed. |
| `app/api/calibrate/route.ts` | Remove self-validation/pass verdicts, separate actions, and fail closed. |
| `app/api/dispute-preview/route.ts` | Return illustrative/live execution status and never fallback after live failure. |
| `app/api/legal-source/route.ts` | Remove silent live fallback and expose explicit failure. |
| `app/api/settlement-preview/route.ts` | Align lifecycle/manifest checks and authority metadata. |
| `app/page.tsx`, `app/layout.tsx` | Start at the opening experience and correct canonical metadata. |
| `components/opening-experience.tsx` (new) | Build the one-minute proposition and lifecycle entry view. |
| `components/demo-workspace.tsx` | Add opening/guided/explore modes, execution-state handling, invalidation, and async transition command. |
| `components/case-upload.tsx` | Expand Party Alignment into the complete alpha journey and state set. |
| `components/evidence-card.tsx` | Use exact-manifest and simulated-acknowledgement language plus verified async transition errors. |
| `components/reasoning-card.tsx` | Present illustrative/executed-unverified artifacts without validation claims. |
| `components/case-map.tsx`, `components/reasoning-card.tsx`, `components/evidence-card.tsx`, `components/decision-panel.tsx` | Complete distinct Calibration, Stress Testing, Manifest/Simulated Appointment, and Later Synthetic Dispute experiences. |
| `components/dossier-view.tsx`, `lib/dossier.ts` | Generate and present the twelve-artifact state-derived dossier with print layout. |
| `components/authority-strip.tsx` (new) | Reuse visible artifact authority and limitation metadata. |
| `app/globals.css` | Add opening, lifecycle, semantic-material, responsive, failure, and print styles. |
| `tests/case-model.test.ts` | Test schema combinations, reserved states, artifact references, and Annex generation. |
| `tests/protocol.test.ts` | Add transition/invalidation attacks and state-preservation assertions. |
| `tests/routes.test.ts` (new) | Test illustrative/live status and fail-closed API behavior. |
| `tests/scenario.test.ts` | Extend deterministic and missing/duplicate reference coverage. |
| `README.md`, `docs/01-project-charter.md`, `docs/02-service-blueprint.md`, `docs/04-product-requirements.md`, `docs/05-hci-information-architecture.md`, `docs/06-technical-requirements.md`, `docs/07-brand-book.md` | Checkpoint A synchronization. |
| `docs/03-legal-governance.md` | Change only inconsistent validation, appointment, authority, manifest, and simulation-boundary claims. |
| `docs/review/*` (new) | Reviewer script, questionnaire, findings template, and local demonstration procedure. |

## 10. Documentation Checkpoint A

After the authority foundation passes tests, README and the seven canonical
documents will use the same definitions, lifecycle statuses, eligibility matrix,
failure behavior, exact-manifest meaning, public-exposure policy, and simulation
limitations. Cached output will be called illustrative, never validated.

Appendices remain explicitly future-facing and non-normative. They will only be
edited before the human gate if a statement appears to describe the current
showcase as having a production capability.

## 11. Attack-Oriented Test Matrix

Before review-candidate verification, automated tests will cover:

- illustrative output attempting authoritative approval;
- illustrative output attempting authoritative appointment;
- executed-unverified output attempting authoritative appointment;
- failed execution attempting simulated acknowledgement;
- failed live execution returning fallback success;
- stale manifest hash;
- Constitution edit after manifest preparation;
- contract-decision edit after manifest preparation;
- scenario-result edit after manifest preparation;
- revoked acknowledgement;
- inconsistent Constitution and lifecycle versions;
- direct transition bypassing UI readiness;
- forged matching stored hash fields;
- model mismatch;
- prior-state preservation after rejected transition;
- simulation artifacts entering an authoritative route;
- ordinary `appointed` status in simulation-only mode;
- invalid execution/lifecycle combinations;
- reset after failure; and
- duplicate or missing scenario references.

Route tests will inject model/configuration failures without making network calls.
Browser verification will cover loading, blocked, failure, deliberate fixture
selection, reset, opening navigation, full Party Alignment, and Annex generation.

## 12. Review-Candidate Acceptance Criteria

The review candidate is frozen only when:

1. a first-time viewer can explain the problem, pre-conflict timing,
   human/protocol split, full lifecycle, and simulation boundary from the opening;
2. both opening actions work on desktop and mobile;
3. Party Alignment visibly completes the required source-to-Annex chain;
4. every divergence and option exposes all required decision information;
5. material types and authority statuses cannot reasonably be confused;
6. illustrative and live actions are separate and accurately labelled;
7. live failures preserve prior data, show a reason, return no fallback success,
   and block acknowledgement until deliberate recovery;
8. no current route or transition can create `authoritative`, `validated`, or
   ordinary `appointed` state;
9. the async transition verifier rejects every attack case without state mutation;
10. canonical documentation matches code, fixture, API metadata, and UI copy;
11. clean install, type-check, lint, unit/route tests, production build, desktop
    path, mobile path, loading/blocked/failure/reset paths, authority labels,
    opening navigation, and Alignment Annex all pass; and
12. complete Stages 2–5 and the twelve-artifact dossier pass desktop/mobile and
    print checks; and
13. the reviewer script, questionnaire, findings template, expert instructions,
    invitation text, and local demo procedure are complete.

The repository is then frozen as `prototype-showcase-v1.0-review-candidate`.
External reviewer sessions begin in the next cycle. No reviewer result is inferred
or fabricated.

## 13. Dependencies and Risks

Dependencies remain Next.js, React, Zod, Vitest, Tailwind, the AI SDK, and the
existing OpenAI provider adapter. No database, authentication system, signing
service, institution integration, DLT layer, or new production dependency is
needed for the review candidate.

Principal risks and controls:

- **Client state can be edited:** the verifier provides internal simulation
  consistency only; UI copy must never imply identity or consent proof.
- **Status migration is broad:** migrate schema, fixture, routes, UI, and tests in
  one reviewable foundation commit before visual expansion.
- **Stage 2–5 conceptual density:** preserve the distinction between
  configuration, observed behavior, manifest identity, provisional output, and
  fictional human control through progressive disclosure.
- **Live-provider nondeterminism:** tests inject provider outcomes; the public
  showcase remains illustrative-only and deterministic.
- **Manifest scope can be overstated:** display the explicit inclusion and
  exclusion list wherever the digest is consequential.
- **Legal-source currency:** retain source dates, authority class, and targeted
  professional-review boundaries; do not claim legal advice.
- **Visual density:** use progressive disclosure and one primary action per
  section while preserving inspectable detail.
- **Local dependency corruption:** perform a clean locked install and report any
  environment failure separately from source failures.

## 14. Implementation Order

1. migrate schemas, fixture, execution contract, manifest, transition verifier,
   invalidation, and attack tests;
2. synchronize canonical documentation checkpoint A;
3. build the opening experience;
4. build and polish the expanded Party Alignment experience;
5. complete Calibration, Stress Testing, Manifest/Simulated Appointment, Later
   Synthetic Dispute, and the twelve-artifact dossier;
6. synchronize canonical documentation and reviewer materials;
7. run automated, production-build, browser, responsive, dossier, and print
   checks; and
8. freeze `prototype-showcase-v1.0-review-candidate` before external evaluation.
