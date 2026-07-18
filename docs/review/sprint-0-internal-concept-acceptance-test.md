# Sprint 0 Internal Concept-Demonstrator Acceptance Test

> **Historical, non-normative verification record.** The
> [ZIAAP Operating Model](../product/operating-model.md) supersedes its
> lifecycle and artifact language. Its results do not verify the current
> refactor.

**Status:** Pass — internally verified candidate; external acceptance pending

This record documents an internal technical and arbitrator-perspective exercise
of the corrected C0 concept demonstrator. It is not evidence of independent
arbitrator participation, unfamiliar-reader comprehension, legal-framing
acceptance, external validation, or production readiness.

## Candidate identity

| Field | Value |
|---|---|
| Branch | `sprint/00-product-charter` |
| Source corrections tested from commit | `a011fb9f1b4a9b49d789cb53ce029c483adc2a5f` |
| Verification tree | Source candidate plus the acceptance-document changes recorded after the browser run |
| Frozen candidate HEAD | Reported in the task completion record; not self-embedded in this commit |
| Verification date | 2026-07-17, Europe/Zurich |
| Node.js | `v20.18.0` |
| pnpm | `9.15.9` |
| Runtime exercised | Next.js 16.1.6 production build at `http://localhost:3000` |

Acceptance documentation was added after verification. The resulting frozen
candidate HEAD is reported in the task completion record and repository status.

## Machine verification

Machine acceptance requires successful dependency installation and successful
completion of all five quality and integrity checks.

| Check | Exact command | Result |
|---|---|---|
| Frozen dependency installation | `pnpm.cmd install --frozen-lockfile` | Pass — lockfile current; already up to date |
| Type-check | `pnpm.cmd typecheck` | Pass — no diagnostics |
| Lint | `pnpm.cmd lint` | Pass — no findings |
| Tests | `pnpm.cmd test` | Pass — 7 files and 37 tests |
| Production build | `pnpm.cmd build` | Pass — static application and five dynamic API routes |
| Whitespace integrity | `git diff --check` | Pass — no whitespace errors |

The package and lockfile remained unchanged:

| File | SHA-256 |
|---|---|
| `package.json` | `86BD43ED11C6E3708F65B3F44A6E04A502E8B2AB93053B5AE6E97066E3E895D6` |
| `pnpm-lock.yaml` | `FBD98B74CCBF8DF535B1DA900CE3D066F315F859394ACEE4B8E2871178E5B32` |

Before the exact acceptance run, the existing local `node_modules` tree was
missing package files. The first sandboxed restoration could not fetch registry
metadata. An approved host-context frozen restoration reused 532 cached
packages, after which the exact frozen installation and all checks passed. This
was classified as an environment failure, not a source failure.

## Six-stage production-browser journey

The production build was exercised from opening through reset with synthetic
data only.

| Area | Internal result |
|---|---|
| Guided Stage 1 | Incomplete Continue and sidebar navigation stayed on Stage 1 and displayed the seven-condition warning |
| Explore Stage 1 | Navigation required the explicit “Continue for exploration only” action; the next stage retained an incomplete-Stage-1 notice |
| Stage 1 readiness | Two profiles, eligible analysis, three bilateral exact-version clause confirmations, and the derived final readiness condition converged |
| Deterministic calculation | Confirmed synthetic inputs produced the reproducible CHF 1,500 service credit |
| Protocol and scenarios | Constitution v1 and four illustrative scenario artifacts were bilaterally acknowledged |
| Disabled live execution | The route failed closed, displayed the disabled-live notice, returned no results, and created no selected artifact; the automated route test confirms HTTP 403 |
| Configuration Manifest | Prepared digest `sha256:7b780539ff642cff457285db1ee6795b512e7ece8c8523b5d6a4d50f06bc6059` |
| Ceremony notice precedence | Prepared instruction, bilateral acknowledgement confirmation, and simulated integrity-success states displayed from current state |
| Maturity wording | The fictional identity was described as used only in the simulation-only concept demonstrator; the old fixture wording was absent |
| Settlement firewall | One fictional party declined; the CHF 30,000 proposal term was absent from the provisional determination and final dossier |
| Human control | A fictional pre-assessment preceded the software output; the fictional human record modified the provisional result after four review checks |
| Audit Dossier | 12 of 12 artifacts available; external validation remained pending |
| Reset | Returned to draft Stage 1, removed the manifest and decision, cleared navigation warnings, and preserved only the initially eligible illustrative analysis |
| Browser console | No application warnings or errors |

The recurring browser-control telemetry warning was external to the application
and did not appear in the application console. It is not classified as a ZIAAP
source failure.

## Responsive and print presentation

| Viewport | Summary layout | Artifact index | Horizontal overflow | Result |
|---|---|---|---|---|
| 1600 × 900 | Three separated columns | Four rows | 0 px | Pass |
| 1366 × 768 | Three separated columns | Four rows | 0 px | Pass |
| 1024 × 768 | Two rows without overlap | Six rows | 0 px | Pass |
| 390 × 844 | Three stacked cards | Twelve rows | 0 px | Pass |

At every viewport the dark dossier cover contained the score, summary cards did
not overlap, all twelve index items remained distinct, and long titles wrapped.
The print stylesheet continued to hide application chrome, give the cover a
page break, keep artifact cards together, and expose open artifact contents.

## Four correction findings

| Finding | Resolution | Evidence |
|---|---|---|
| Stage 1 prerequisites were easy to miss | Seven visible conditions plus guided interception and explicit Explore bypass | Browser journey and `tests/protocol.test.ts` |
| Dossier summary was visually compressed | Adaptive cover, summary, score, and index layout | Four-viewport geometry and visual inspection |
| Fixture used current “prototype” wording | Replaced with simulation-only concept-demonstrator wording | `tests/terminology.test.ts` |
| Manifest instruction became stale | State-derived notice precedence | `tests/ceremony-notice.test.ts` and browser journey |

## Acceptance boundary

This is an internal concept-demonstrator acceptance test only. It shows that the
synthetic explanation is coherent enough to present for external concept review.
It does not show that an external reviewer understood it.

The candidate status is:

> Sprint 0 corrected concept candidate, internally verified, external acceptance
> pending.

Product/founder approval, legal-framing and authority-boundary review, the
independent arbitration/dispute-resolution reviewer, and the independent
business/commercial/investment reviewer all remain pending.

No local LLM, persistent matter, authenticated party, separate party session,
confidential-document handling, production model execution, digital signature,
institutional appointment, external validation, or operative award process was
added or demonstrated.
