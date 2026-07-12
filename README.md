# ZIAAP

Zero-Instance Algorithmic Arbitration Protocol.

> ZIAAP is an AI-native dispute-governance and arbitration protocol that parties
> configure, test, and acknowledge before conflict, then simulate applying under
> a human arbitrator when a later dispute arises.

This repository is a frozen-showcase workstream built from synthetic data. It is
designed to explain why dispute governance should be configured while commercial
interests are still aligned.

## What the showcase distinguishes

- The **human arbitrator** is the legal decision-maker in the future product
  concept. The showcase uses only a fictional record and makes no appointment.
- The **ZIAAP protocol** identifies selected contractual, procedural, reasoning,
  evidence, model, tool, and change-policy configuration.
- **Party Alignment** resolves contractual expectations before reasoning
  calibration begins.
- **Arbitral reasoning calibration** changes inference-time instructions and
  safeguards. Model weights remain unchanged.
- **Stress testing** displays observed illustrative or live-unverified behavior.
  It is not independent validation.
- A protocol output is provisional. The showcase creates no award.

## Authority and status model

The dimensions are orthogonal:

```ts
lifecycleMode: "simulation_only" | "authoritative"
executionStatus:
  | "not_executed"
  | "illustrative_only"
  | "executed_unverified"
  | "validated"
  | "failed"
lifecycleStatus:
  | "draft"
  | "manifest_prepared"
  | "manifest_acknowledged"
  | "appointment_simulated"
  | "dispute_simulated"
  | "closed"
legalEffect: false
```

Only `simulation_only` is available. `authoritative` and `validated` are reserved
and unreachable. Every artifact is synthetic and has `legalEffect: false`.

| Execution status | Display | Simulated acknowledgement | Simulated ceremony | Authoritative approval |
|---|---:|---:|---:|---:|
| `not_executed` | yes | no | no | no |
| `illustrative_only` | yes | yes | yes | no |
| `executed_unverified` | yes | yes | yes | no |
| `failed` | yes | no | no | no |
| `validated` | future only | future only | future only | future only |

The party action is **Acknowledge for simulated ceremony**. It has no legal or
authoritative effect.

## Demonstrated lifecycle

```text
Opening explanation
→ Party Alignment
→ arbitral reasoning calibration
→ stress testing
→ Exact protocol manifest
→ simulated appointment under the acknowledged protocol manifest
→ later synthetic dispute
→ optional sealed settlement facilitation
→ provisional simulation-only determination
→ simulated human decision
```

The current human-review alpha focuses on the opening and complete Party
Alignment journey. Stages 2–5 retain truthful authority boundaries and are
completed only after real reviewer feedback.

## Exact protocol manifest

The manifest identifies selected contractual decisions, legal architecture,
Constitution, declared model identity, prompt/retrieval/tool/engine versions,
stress-test artifacts, fictional human-arbitrator record, and change policy.

It is not a complete build attestation, dependency digest, provider-side proof,
deployed-environment or runtime attestation, or production cryptographic
signature.

## Failure behavior

Illustrative and live actions are separate. A curated fixture returns
`illustrative_only`; a successful live call returns `executed_unverified`. Missing
credentials, disabled live policy, model mismatch, timeout, provider failure, or
invalid output returns `failed`. A failed live call never returns an illustrative
success as fallback. The last valid artifact is preserved but must be deliberately
reselected before simulated acknowledgement.

## Run locally

```powershell
pnpm.cmd install --frozen-lockfile
pnpm.cmd dev
```

Open `http://localhost:3000`. Live execution and retrieval are disabled unless
server-only policy flags explicitly enable them. The public showcase is
illustrative-only, deterministic, synthetic, and simulation-only.

## Verification

```powershell
pnpm.cmd typecheck
pnpm.cmd lint
pnpm.cmd test
pnpm.cmd build
```

## Repository map

- `app/` — App Router UI, styles, and fail-closed route handlers;
- `components/` — opening, Party Alignment, and lifecycle views;
- `lib/` — schemas, eligibility, hashing, transition verification, and calculator;
- `data/` — curated synthetic fixture;
- `tests/` — schema, route, attack, firewall, and calculation tests; and
- `docs/` — implementation plan, seven canonical documents, and appendices.

## Canonical documents

1. [Project Charter](docs/01-project-charter.md)
2. [Service Blueprint](docs/02-service-blueprint.md)
3. [Legal Governance](docs/03-legal-governance.md)
4. [Product Requirements](docs/04-product-requirements.md)
5. [HCI and Information Architecture](docs/05-hci-information-architecture.md)
6. [Technical Requirements](docs/06-technical-requirements.md)
7. [Institutional Brand Book](docs/07-brand-book.md)

Appendices are future-facing and non-normative. They do not expand the current
showcase boundary.
