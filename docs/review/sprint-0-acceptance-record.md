# Sprint 0 Concept Acceptance Record

> **Historical, non-normative acceptance record.** The
> [ZIAAP Operating Model](../product/operating-model.md) supersedes its
> lifecycle and artifact language. The recorded Sprint 0 evidence remains
> historical and is not evidence for the current refactor.

**Status:** Corrected concept candidate internally verified; external acceptance pending

This record covers Sprint 0 concept acceptance only. It does not approve or
begin any later roadmap capability.

## Candidate identity

| Field | Value |
|---|---|
| Branch | `sprint/00-product-charter` |
| Baseline commit | `bd4a85fe7e90b6babaaf9ff6544ce54a2ffa5c7a` |
| Source corrections tested from commit | `a011fb9f1b4a9b49d789cb53ce029c483adc2a5f` |
| Verification tree | Source candidate plus acceptance-document changes |
| Frozen candidate HEAD | Reported in the task completion record; not self-embedded |
| Verification date | 2026-07-17, Europe/Zurich |
| Node.js | `v20.18.0` |
| pnpm | `9.15.9` |
| Lifecycle | `simulation_only` |
| Legal effect | `false` |
| Human-review candidate commit | Use the frozen candidate HEAD reported at task completion; no human participation is inferred |

## Technical non-goals

> Sprint 0 does not require or demonstrate a local LLM, persistent matters,
> authenticated users, separate party sessions, confidential-document handling,
> production model execution, digital signatures, institutional appointment,
> external validation, or an operative award process. These capabilities belong
> to future funded development stages.

Machine verification establishes only that the current synthetic concept
implementation builds and satisfies its declared source checks. It is not
evidence of legal validity, external comprehension, production readiness,
security, provider execution, or future-result accuracy.

## Machine verification

Dependency installation and all five quality and integrity checks completed
successfully in the approved Windows host context.

| Check | Exact command | Result | Evidence |
|---|---|---|---|
| Frozen dependency installation | `pnpm.cmd install --frozen-lockfile` | Pass | Lockfile current; installation completed with pnpm 9.15.9 |
| Type-check | `pnpm.cmd typecheck` | Pass | TypeScript completed with no diagnostics |
| Lint | `pnpm.cmd lint` | Pass | ESLint completed with no findings |
| Tests | `pnpm.cmd test` | Pass | 7 test files and 37 tests passed, including readiness, ceremony-notice, and 6 terminology tests |
| Production build | `pnpm.cmd build` | Pass | Next.js 16.1.6 optimized build; static application and five dynamic API routes |
| Whitespace integrity | `git diff --check` | Pass | No whitespace errors |

Supporting automated evidence:

- [`tests/terminology.test.ts`](../../tests/terminology.test.ts) enforces the
  canonical proposition, six-stage vocabulary, maturity boundaries, required
  wording, and prohibited legacy claims.
- [`config/terminology-rules.json`](../../config/terminology-rules.json)
  contains the required and forbidden public-language phrases.
- [`docs/product/release-scorecard.md`](../product/release-scorecard.md)
  separates completed machine checks from pending human evidence.

## Dependency and tracked-file integrity

| File | SHA-256 before installation | SHA-256 after verification | Result |
|---|---|---|---|
| `package.json` | `86BD43ED11C6E3708F65B3F44A6E04A502E8B2AB93053B5AE6E97066E3E895D6` | `86BD43ED11C6E3708F65B3F44A6E04A502E8B2AB93053B5AE6E97066E3E895D6` | Unchanged |
| `pnpm-lock.yaml` | `FBD98B74CCCBF8DF535B1DA900CE3D066F315F859394ACEE4B8E2871178E5B32` | `FBD98B74CCCBF8DF535B1DA900CE3D066F315F859394ACEE4B8E2871178E5B32` | Unchanged |

The acceptance diff is limited to Sprint 0 concept clarity, presentation,
terminology, internal evidence, public status, and roadmap-execution
documentation. No application API, domain schema, persistence, authentication,
model infrastructure, or later-sprint capability is changed.

## Internal concept-demonstrator acceptance test

The corrected production build completed the six-stage synthetic journey and
the 1600 × 900, 1366 × 768, 1024 × 768, and 390 × 844 presentation checks.
Guided and Explore Stage 1 behavior, state-derived ceremony notices, the
settlement firewall, fictional human control, 12-of-12 dossier, browser console,
print rules, and reset behavior passed.

See the
[`Sprint 0 Internal Concept-Demonstrator Acceptance Test`](sprint-0-internal-concept-acceptance-test.md)
and the
[`Corrected Concept Candidate Freeze`](sprint-0-concept-candidate-freeze.md).
This is internal technical evidence, not unfamiliar-reader or expert evidence.

## Failure investigation

The first sandboxed install attempt could not fetch npm registry metadata. The
frozen installation then completed in the approved host context without changing
dependency declarations or the lockfile.

The sandbox could enumerate the restored pnpm package files but could not read
their contents because of Windows ACL isolation. This caused a sandbox-only
`MODULE_NOT_FOUND` result for TypeScript. Type-check, lint, tests, and build all
passed when rerun against the same working tree and dependency installation in
the approved host context. This is classified as an execution-environment
failure, not a source failure. No source change was made in response.

The first test run after replacing “legal-lead approval” with the narrower
legal-framing review failed because one Sprint 0 terminology assertion still
required the old phrase. The assertion and prohibited-language rules were
updated to enforce the new boundary. The frozen install and complete
verification suite were then rerun successfully.

## Product/founder approval record

| Field | Value |
|---|---|
| Approver identity | Pending |
| Role/capacity | Pending |
| Reviewed candidate commit | Pending |
| Decision | Pending: approve / changes required |
| Date and timezone | Pending |
| Evidence reference | Pending |
| Comments or conditions | Pending |

The product/founder approval checkbox must remain open until every field required
for the decision has actual evidence.

## Legal-framing and authority-boundary review

> This review concerns the accuracy of the concept's legal framing and
> disclaimers. It is not an opinion on enforceability, regulatory compliance, or
> production readiness.

The reviewer is asked to confirm only that:

- the concept description is legally responsible;
- the AI Resolution Officer is not represented as a legal office or autonomous
  arbitrator;
- a properly appointed human arbitrator retains legal authority;
- simulation is not confused with appointment or adjudication;
- scenario testing is not represented as legal validation; and
- no enforceability claim is made.

| Field | Value |
|---|---|
| Reviewer identity | Pending |
| Role/capacity | Pending |
| Reviewed candidate commit | Pending |
| Decision | Pending: framing accepted / changes required |
| Date and timezone | Pending |
| Evidence reference | Pending |
| Comments or conditions | Pending |

## Unfamiliar-reader evidence

Both reviewers must have no prior involvement with ZIAAP and must complete the
uncoached process in the
[`Sprint 0 Human Acceptance Packet`](sprint-0-human-acceptance-packet.md).

| Audience | Reviewer ID | Candidate commit | Findings log | Result |
|---|---|---|---|---|
| Arbitration or dispute-resolution professional | Pending | Pending | Pending | Pending |
| Business, commercial, or investment reviewer | Pending | Pending | Pending | Pending |

Any authority-category error blocks acceptance until the relevant language or
experience is corrected and independently retested. Blank rows are preparation,
not evidence.

## External feedback memorandum disposition — 2026-07-23

The anonymised synthesis supplied on 2026-07-23 is recorded as **refine/narrow
research input only** in the
[feedback disposition and pre-prototype validation plan](../product/feedback-disposition-and-validation-plan.md).
It does not satisfy either unfamiliar-reviewer row, product/founder approval,
legal-framing review, market validation or independent validation.

The synthesis lacks a frozen candidate commit, required session metadata,
verbatim unassisted responses, completed per-reviewer findings logs and
no-coaching evidence. It must not be reverse-engineered into acceptance data or
combined with later formal sessions as if their methods were equivalent. All
pending fields and checkboxes in this record remain unchanged.

## Acceptance state

- [x] Frozen dependency installation completed without package or lockfile changes
- [x] Type-check passed
- [x] Lint passed
- [x] 7 test files and 37 tests passed
- [x] Production build passed
- [x] `git diff --check` passed
- [x] Corrected six-stage internal concept-demonstrator journey passed
- [x] Required desktop, laptop, and mobile dossier presentation checks passed
- [ ] Product/founder approval supplied
- [ ] Legal-framing and authority-boundary review supplied
- [ ] Unfamiliar arbitration/dispute-resolution reviewer evidence supplied
- [ ] Unfamiliar business/commercial/investment reviewer evidence supplied
- [ ] Accepted concept baseline merged

Sprint 0 is a corrected concept candidate, internally verified and ready for
external concept review. Human acceptance remains open. No later implementation
is authorised by the internal verification result.
