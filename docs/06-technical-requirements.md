# Technical Requirements

## I0-First Prototype Architecture

## 1. Stack

- Next.js 16 App Router, React 19, and TypeScript;
- Tailwind CSS with owned shadcn-style primitives;
- Zod schemas shared by fixture, API, and application;
- AI SDK v6 structured output with direct OpenAI provider access;
- Vitest for domain and schema tests; and
- no database, authentication, or production signature provider.

## 2. Application Architecture

The root Server Component validates the cached fixture and passes it to one
interactive client workspace. The workspace owns four visual steps and a single
session-scoped `ContractState`. A reset restores the validated fixture.

## 3. Core State

`ContractState` contains matter metadata, two `PartyProfile` objects, three
`Clause` objects, `AlignmentAnalysis`, three `AlignmentDecision` objects,
`LegalConstraint`, the future event, `ResidualReviewPacket`, and ledger entries.

Material types are Zod-backed. Cached and live paths use identical schemas.

## 4. Analysis API

`POST /api/analyze`

Request:

```json
{ "mode": "cached | live", "parties": ["two validated PartyProfile objects"] }
```

Response is `AlignmentAnalysis` with exactly three findings, legal sources, and
metadata identifying cached, live, or fallback mode.

Live mode uses `generateText` with `Output.object`, a 12-second abort signal,
and a server-only API key. Failure or invalid output returns validated cached
analysis with a visible notice. Provider clients are invoked only inside the
request path; secrets never enter client bundles.

## 5. Legal Sources

The prototype limits analysis to three bounded questions. `POST /api/legal-source`
returns the cached verified Article 100 constraint by default or optionally uses
OmniLex OAuth client credentials and MCP `get_article` for `ch-fedlex--220--100`.
Live and cached modes are labelled independently; the demo does not depend on
network availability.

## 6. Deterministic Engine

`calculateServiceCredit` consumes a `ServiceCreditRule`, actual uptime in integer
basis points, and input-confirmation state. The fixture computes three complete
10-basis-point steps × 5% × CHF 10,000 = CHF 1,500, capped at 100%. Missing or
disputed inputs return a blocked result.

## 7. Consent and Versioning

Each `AlignmentDecision` stores language, version, selected option, and separate
supplier/customer version confirmations. Editing language increments the version
and resets both confirmations. Annex readiness requires all decisions to pass
the bilateral-version predicate.

## 8. Ledger

The session ledger records actor, timestamp, action, object, detail, and authority
class. It is demonstrative and in-memory; refreshing the page restores fixture
state.

## 9. Security and Privacy

- Keep all credentials server-only and Git-ignored.
- Send only seeded party profiles to the analysis route.
- Do not persist confidential party data.
- Treat generated legal comparison as advisory and schema constrained.
- Use explicit external links and verification status for legal sources.

## 10. Deployment and Failure Behaviour

The application must build as a standard Node.js Next.js deployment. Cached mode
works without AI or MCP network access. Live failure preserves the last valid
state and announces fallback rather than blanking or partially replacing the
matrix.

## 11. Test Requirements

- fixture schema validation;
- required source linkage;
- bilateral exact-version confirmation;
- confirmation invalidation after edits;
- CHF 1,500 deterministic result, complete-step rounding, and cap enforcement;
- selected-option propagation into the Annex and future preview;
- cached/live AI and OmniLex mode labels;
- blocked result for disputed inputs;
- type, lint, test, and production-build checks; and
- responsive browser verification of the complete cached path.
