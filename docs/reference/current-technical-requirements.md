# Current Concept Technical Requirements

> Normative C0 technical reference. The
> [Pilot 01 Protocol](../product/pilot-01-protocol.md) controls the proposed
> Contract Alignment state and status model. The
> [operating model](../product/operating-model.md) controls deferred layers,
> gates and authority language.

## 1. Architecture boundary

The application is a Next.js App Router concept demonstrator. State is
synthetic, client-local and resettable. Public demo state is stored only in
`sessionStorage`. Expert optional live execution uses existing fail-closed route
handlers; the public walkthrough performs no model or application-API call.
The optional feedback form is the sole public-path network exception and uses a
native browser POST to the temporary FormSubmit processor.

No backend persistence, authentication, identity, confidential matter store,
signature, legal appointment, award or legal effect is implemented.

This branch is documentation and public-language reconciliation only. It does
not implement the Pilot 01 state machine, recruit participants, accept a real
contract or run a pricing experiment.

## 2. Authoritative state

`ContractState` remains the expert reference state. Its operational
`lifecycleStatus` values are retained for compatibility and readiness.

The only material schema rename in this refactor is:

- `proposedDetermination` → `reasoningMemorandum`;
- `proposed_determination` → `reasoning_memorandum`; and
- artifact `appointmentHash` → `configurationHash`.

The dispute’s existing `appointmentHash` binding remains unchanged.

`MinimalDemoState` remains schema version 1 under
`ziaap:minimal-demo:v1`; no field changed solely for terminology.

The Pilot 01 state sequence and orthogonal `recordKind` and `legalEffect`
fields are specifications for a future authorised prototype. They do not
silently redefine `ContractState` or create a second authoritative state in C0.

## 3. Pure operating-model projections

`lib/operating-model.ts` exposes:

- `getActiveMatterGate(state)`;
- `getGateReadiness(state, gate)`;
- `buildStructuredCaseState(state)`;
- `buildReasoningMemorandumInput(state, configurationHash)`; and
- `buildProceduralBlackBox(state)`.

These functions derive meaning from structured state. They add no persisted
lifecycle state.

## 4. Structured case state

The case projection separates contract rules, Constitution identity, claims,
defences, agreed and disputed facts, evidence, missing evidence, applicable
rules, deterministic calculations, objections, uncertainty, possible
dispositions and human-control events.

The reasoning memorandum is derived from this state and never replaces it.
Sealed settlement terms, concessions and responses are excluded from memorandum
input.

## 5. Constitution and configuration integrity

The Constitution is the versioned software control plane. Behavior-affecting
changes increment its version and invalidate scenario artifacts, the
configuration manifest, simulated acknowledgements, dispute binding, reasoning
memorandum and fictional human-decision state.

The configuration manifest and SHA-256 digest support only internal change
detection. They do not attest provider execution, build, dependencies, runtime,
identity, signature or legal effect.

## 6. Procedural black box

The black-box projection is generated from ledger events and includes
configuration identity, party objections and human-control markers. It omits
the text of fictional preliminary assessments and rationales, and marks
`privateDeliberationIncluded: false`.

It is not an award, legal record, runtime attestation or proof of validity.

## 7. Route stability

The following user routes remain stable:

- `/` (server redirect to `/demo`);
- `/reference`;
- `/demo`;
- `/demo/align`;
- `/demo/test`;
- `/demo/dispute`;
- `/demo/review`;
- `/demo/outcome`; and
- `/feedback`.

Existing route-handler paths also remain stable. `/api/dispute-preview` now
returns a reasoning-memorandum schema without changing its URL.

## 8. Execution status and failure

Only `simulation_only` is available. `authoritative` and `validated` remain
reserved and unreachable.

Curated fixtures are `illustrative_only`; successful declared live calls are
`executed_unverified`; failures are `failed` and never silently replaced with a
successful fixture.

The route binds any live reasoning memorandum to the server-recomputed
configuration hash rather than accepting a model-supplied hash.

## 9. Verification

Automated coverage must include gate ordering and mapping, readiness,
invalidation, structured case content, sealed-settlement isolation,
reasoning-memorandum authority, human pre-assessment order, human controls,
event-derived black box, route stability, public persistence, no public model
or application-API calls, native feedback-form boundaries, Pilot 01 protocol
contracts, the current/future public split, terminology and claim
qualifications.

Required commands:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
git diff --check
```

Local Windows PowerShell execution may use `pnpm.cmd` for these commands.

Browser verification covers `/`, `/reference`, the complete `/demo` path and
`/feedback` at desktop, laptop, tablet and 390 px, including console inspection.
