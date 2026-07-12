# Technical Requirements

## Simulation-Only Next.js Showcase

## 1. Stack and boundary

Next.js 16 App Router, React 19, TypeScript strict mode, Zod, Vitest, Tailwind CSS,
and AI SDK route handlers. The synthetic fixture loads in a Server Component and
is passed into a focused client workspace. Provider credentials remain server
only. No database, auth, signing, or production integration is required.

## 2. Canonical state

`ContractState` contains root `lifecycleMode`, `lifecycleStatus`, `legalEffect`,
and `syntheticData`. Execution status belongs to each executable artifact and is
orthogonal to workflow progress. Material-status fields describe content type,
not authority.

The current-state schema rejects authoritative mode, validated artifacts,
ordinary appointment status, unresolved or duplicate references, ineligible
selected artifacts, and impossible prepared/simulated lifecycle combinations.

## 3. Status meanings

- `not_executed`: no model execution;
- `illustrative_only`: curated offline fixture;
- `executed_unverified`: successful live call without independent evaluation;
- `validated`: reserved and unreachable; and
- `failed`: no usable artifact; blocks acknowledgement.

Only illustrative and executed-unverified artifacts are simulation-eligible.

## 4. Exact protocol manifest

Canonical JSON contains root boundaries, matter ID, party-profile confirmation,
contract decisions and versions, alignment scenario, Constitution, legal
architecture, fictional human record, model/prompt/retrieval/tool/engine identity,
selected stress artifacts and execution status, and change policy. Object keys
are sorted recursively before SHA-256.

The digest is change detection for selected protocol configuration, not full
runtime/build/dependency/provider/environment/signature attestation.

## 5. Transition functions

Synchronous functions may calculate UI readiness only.
`simulateAppointmentTransition` is async and recomputes the digest immediately
before mutation. It checks lifecycle/authority, party profiles, exact clause
versions, selected artifacts and eligibility, bilateral artifact acknowledgements,
unique complete references, Constitution version, exact hash acknowledgements,
disclosure review, and simulated arbitrator acceptance. It returns a typed result
and preserves the exact input state on rejection.

## 6. Invalidation

Expectation, decision, scenario, Constitution, or artifact changes reset
downstream lifecycle and clear hash, acknowledgements, disclosure, simulated
acceptance, dispute binding, and later decisions as specified by the governing
review-candidate objective.
Live failure preserves prior artifacts but clears selected eligibility. Reset
clones the original fixture.

## 7. Route contracts

`POST /api/analyze`, `/api/calibrate`, and `/api/dispute-preview` accept
`executionMode: illustrative | live`. Illustrative returns
`illustrative_only`. Live success returns `executed_unverified`. Live errors
return `{ executionStatus: "failed", code, reason, retryable }` and no artifact.

Error status mapping:

- `400` invalid request;
- `403` public live policy disabled;
- `409` model/lifecycle mismatch;
- `422` invalid structured output;
- `502` provider failure;
- `503` credentials/config unavailable; and
- `504` timeout.

`/api/legal-source` follows the same no-silent-fallback rule.
`/api/settlement-preview` is deterministic and requires matching manifest state
and separate bilateral simulated consent.

## 8. Public policy

`ZIAAP_LIVE_EXECUTION_ENABLED` and `ZIAAP_LIVE_RETRIEVAL_ENABLED` are disabled
unless explicitly set server-side. Public deployment exposes no credential or
uncontrolled spend path and uses curated deterministic artifacts.

## 9. Test requirements

Automated tests cover schema parsing, deterministic arithmetic, manifest hashing,
settlement segregation, illustrative/live route semantics, model mismatch,
no-fallback failures, reserved authority, stale and forged hashes, post-prepare
edits, revoked acknowledgement, inconsistent versions, direct bypass, state
preservation, invalid routes/status combinations, reset, and missing/duplicate
references.

Internal verification additionally requires frozen install, type-check, lint,
tests, build, desktop/mobile browser paths, loading/blocked/failure/reset states,
opening navigation, complete Stages 1–5, dossier generation, and print layout.

## 10. State-derived dossier

`buildDemonstrationDossier` projects twelve artifacts from the canonical
`ContractState`. It marks missing lifecycle evidence pending rather than inventing
completion and excludes sealed settlement proposal content. Every artifact carries
actor, authority status, lifecycle mode, execution status, version, provenance,
consequence, and `legalEffect: false`.

## 11. Security and legal limits

Client-side hashing and transitions provide only internal showcase consistency.
They do not authenticate actors, prove consent or provenance, secure confidential
data, produce signatures, establish legal effect, or independently validate AI.
