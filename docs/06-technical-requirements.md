# Technical Requirements

## Version-Locked Appointment Prototype

## 1. Stack

- Next.js 16 App Router, React 19, and TypeScript;
- Zod schemas shared across fixture, routes, UI, and tests;
- AI SDK structured output with direct OpenAI access inside route handlers;
- Web Crypto SHA-256 over canonical JSON;
- deterministic TypeScript calculation for mechanical remedies; and
- Vitest for domain and invariant tests.

There is no database, authentication, production signature provider, or legally
operative award service.

## 2. Core State

`ContractState` contains the matter, party profiles, contract clauses and
decisions, legal sources, `ArbitratorConstitution`, four
`CalibrationScenario` records, `AppointmentRecord`, `DisputeSession`, sealed
`SettlementTrack`, optional `ProposedDetermination`, `HumanDecision`, and ledger.

Every fixture and material route response is schema validated.

## 3. Manifest and Hashing

`buildProtocolManifest` includes:

- matter identity;
- contract decisions without transient confirmation UI state;
- constitution and human-arbitrator identity without transient lifecycle status; and
- calibration inputs and observed results without party-approval UI state.

`canonicalize` sorts object keys recursively without reordering arrays.
`computeProtocolHash` returns `sha256:<64 lowercase hex characters>`.

Behavior-affecting edits call one invalidation function that increments the
constitution, clears calibration, clears appointment, unbinds the dispute, and
removes any proposed or human decision.

## 4. Route Handlers

### `POST /api/analyze`

Compares party contract expectations only. It is not an adjudication endpoint.

### `POST /api/calibrate`

Accepts mode, candidate constitution, and exactly four scenarios. It returns a
schema-constrained result for each scenario plus live, cached, or fallback
metadata. A different configured model cannot act as the declared model.

### `POST /api/settlement-preview`

Accepts validated state, requires an appointed matching manifest and bilateral
consent, and returns one sealed, non-binding proposal based on the shared record.

### `POST /api/dispute-preview`

Accepts mode and validated state. It requires appointed status, recomputes the
manifest hash, verifies the dispute binding, and returns a provisional
determination. Its prompt payload excludes the settlement track entirely.

### `POST /api/legal-source`

Preserves the bounded Article 100 legal-source retrieval and cached fallback.

## 5. Protocol Identity and Failure

The fixture pins provider, model, prompt version, retrieval pack, tool policy,
and engine. Live execution compares the configured model to that identity. A
mismatch blocks live authority; it does not silently update the appointment.

Cached fixtures represent validated output for the same declared manifest and
must be labelled as cached or fallback. They do not claim that a substitute live
model acted under the appointment.

## 6. Settlement Segregation

Settlement proposal content and responses exist only in `SettlementTrack`.
Adjudication requests are constructed explicitly from constitution, appointment
hash, contract decisions, shared dispute record, and legal sources. They must not
spread or serialize the settlement object into the merits prompt.

The operational merits record stores only occurrence or final outcome status.

## 7. Human Decision Gate

Signing requires:

- a proposed determination;
- non-empty preliminary human assessment;
- adopted, modified, or rejected status;
- non-empty independent rationale;
- confirmation that sources, objections, and calibration were reviewed; and
- confirmation of independent judgment.

The prototype signature is a timestamped display record and is explicitly not a
qualified or production electronic signature.

## 8. Test Requirements

- complete fixture validation;
- exact-version contract confirmation;
- deterministic CHF 1,500 result and disputed-input blocking;
- canonical hash stability and behavior-change sensitivity;
- full downstream invalidation after amendment;
- four-case pass and bilateral approval gating;
- exact-hash appointment and human-acceptance gating;
- mismatch and unavailable-model blocking;
- bilateral settlement activation and merits non-leakage;
- provisional determination status and no independent legal effect; and
- independent human signature gate.

Run type checking, lint, tests, production build, and responsive browser
verification of the complete cached path.
