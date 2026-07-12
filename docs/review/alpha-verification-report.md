# Alpha Internal Verification Report

## Scope

Opening experience, expanded Party Alignment, authority model, fail-closed API
behavior, exact-manifest transition foundation, documentation checkpoint A, and
reviewer package.

## Environment

- Date: 2026-07-12
- OS/shell: Windows / PowerShell
- Node.js: 20.18.0
- Framework: Next.js 16.1.6 / React 19.2.4

An existing `node_modules` tree was incomplete and initially lacked the TypeScript
binary. A clean frozen install required access to the package store and completed
successfully. This was an environment/setup failure, not a source-code failure.

## Automated results

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | pass after clean reinstall |
| Type-check | pass |
| ESLint | pass |
| Unit and route tests | pass — 26 tests in 4 files |
| Production build | pass — 1 static page, 5 dynamic route handlers |
| `git diff --check` | pass |

## Attack coverage

Passing tests cover reserved authoritative/validated/appointed state, failed
artifact acknowledgement, no fallback success, model mismatch, stale manifest,
Constitution/decision/scenario mutation, revoked acknowledgement, inconsistent
versions, direct transition bypass, forged stored fields, rejected-transition
state preservation, invalid artifact selection, reset, duplicate/missing scenario
references, and settlement segregation.

## Browser results

The bundled standalone browser CLI was unavailable, so verification used the
available in-app browser control surface against the same local dev server.

| Browser check | Result |
|---|---|
| Page load and meaningful content | pass |
| Error overlay | none |
| Console warnings/errors | none |
| Desktop page-level overflow | none |
| Opening guided/explore actions | pass |
| Opening disclosure | pass |
| Three divergence cards | pass |
| Illustrative selection | pass |
| Live-disabled failure reason | pass |
| Prior findings preserved after failure | pass — 3 |
| Eligibility blocked after failure | pass |
| Deliberate illustrative recovery | pass |
| Two profile confirmations | pass |
| Six exact-version confirmations | pass |
| CHF 1,500 calculation | pass |
| Generated Alignment Annex | pass |
| Mobile viewport | pass at 390×844 |
| Mobile page-level overflow | none; local horizontal workflow navigation only |

## Source failures

None remain in the required alpha checks.

## Known boundaries and risks

- Client state and hashing establish internal simulation consistency only.
- Live execution remains policy-disabled by default and was not provider-tested.
- The long Party Alignment page is intentionally information-dense; reviewer
  sessions must test whether progressive disclosure is sufficient.
- Stages 2–5 are truthful previews, not completed post-feedback experiences.
- Print layout has build/CSS coverage but requires final dossier-era visual QA.

## Gate decision

The internal alpha gate passes. Work must stop at the human reviewer gate until
real feedback from at least five representative reviewers is supplied.
