# ZIAAP Review-Candidate Internal Verification Report

> Historical, non-normative verification evidence for the frozen
> review-candidate tag. The
> [ZIAAP Operating Model](../product/operating-model.md), current charter and
> scorecard supersede its lifecycle and artifact language.

- **Verification date:** 2026-07-12 (Europe/Zurich)
- **Candidate:** `prototype-showcase-v1.0-review-candidate`
- **Lifecycle:** `simulation_only`
- **External validation:** pending

## Outcome

The complete synthetic review-candidate path passes internal source, transition,
production-build, desktop, and mobile verification. This report does not claim
expert participation, comprehension, usability validation, legal validation,
provider attestation, production identity proof, or independent evaluation.

## Automated verification

| Check | Result | Evidence |
|---|---|---|
| Frozen dependency install | Pass | Lockfile current; 405 packages restored with `pnpm install --frozen-lockfile` |
| Type-check | Pass | `pnpm typecheck` |
| Lint | Pass | `pnpm lint` |
| Tests | Pass | 5 files, 29 tests |
| Production build | Pass | Next.js 16.1.6 optimized build; static `/` plus five dynamic API routes |
| Diff whitespace | Pass | `git diff --check` |

The initial sandboxed dependency restoration could not remove several pnpm store
folders because of Windows ACL isolation. Repeating the same frozen install in
the approved host context completed in 17.2 seconds without changing dependency
declarations. This was an execution-environment issue, not an application test
failure.

## Browser verification

### Complete synthetic journey

The production build was exercised from a fresh opening through:

1. Party Alignment;
2. Arbitral Reasoning Calibration;
3. Stress Testing;
4. Exact protocol manifest and simulated appointment;
5. Later Synthetic Dispute; and
6. the final demonstration dossier.

The final mobile run used a 390 × 844 viewport and passed every transition with
no page-level horizontal overflow. A full desktop run used a 1600 × 890 viewport.
The final CSS change after that desktop run was limited to safe digest wrapping
and the mobile two-column workflow grid; the same final production build was
then exercised end to end on mobile.

### Verified state and authority behavior

- Public live execution failed closed with the explicit message that live
  execution is disabled.
- The failed live path did not silently substitute the illustrative fixture.
- Reset removed notices, acknowledgements, and derived state.
- Party Alignment required two confirmed profiles and six exact-version party
  acknowledgements before the Annex appeared.
- The deterministic example displayed the CHF 1,500 service-credit result.
- Calibration exposed ten editable inference controls plus the settlement
  firewall and change policy; both parties acknowledged the exact Constitution.
- Four stress artifacts displayed authority metadata and required eight exact
  simulated acknowledgements.
- Manifest preparation produced a canonical `sha256:` digest; both parties
  acknowledged that exact digest before disclosure review and fictional
  acceptance enabled the transition.
- The appointment transition reported integrity verification passed and remained
  explicitly simulated, non-institutional, unsigned, and without legal effect.
- Settlement required bilateral activation. One fictional party declined the
  proposal, and the later adjudication route continued with `not_settled` status.
- The sealed CHF 30,000 proposal term was absent from the merits-facing
  provisional determination and from the final dossier.
- The fictional human pre-assessment preceded the provisional determination.
- A distinct fictional human record modified the provisional artifact only after
  all four review checks; lifecycle status then became `closed`.
- The dossier opened at the cover even when the prior stage was more than 5,000
  pixels down the page.
- The dossier reported 12 of 12 artifacts available, zero pending artifacts,
  external validation pending, and complete actor, authority, lifecycle,
  execution, version, provenance, consequence, and legal-effect metadata.

### Responsive and print behavior

- Desktop pages had no page-level horizontal overflow.
- The 390 × 844 path had no page-level horizontal overflow across all stages.
- All six workflow stages remained visible in a two-column mobile grid.
- The 64-character manifest digest wrapped inside the mobile dossier.
- The print action invoked Chrome's native print-preview surface.
- The loaded print stylesheet contained ten presentation rules: application
  chrome is hidden, the dossier cover receives a page break, artifact cards avoid
  internal breaks, and open artifact contents remain visible.

Native print preview is browser chrome rather than DOM content, so the automated
browser session verified invocation and stylesheet behavior but did not claim a
pixel-level inspection of the operating-system preview. The local demonstration
procedure retains an explicit human print-preview check before a reviewer session.

## Integrity coverage

Automated tests cover:

- reserved `authoritative`, `validated`, and ordinary `appointed` state;
- exact protocol hash stability and mismatch rejection;
- Constitution and stress-artifact acknowledgement gates;
- failed execution ineligibility;
- stale-version and missing-reference rejection;
- settlement activation and merits-input separation;
- dossier incompleteness without invented lifecycle evidence;
- dossier completion at 12 artifacts; and
- omission of sealed proposal terms from dossier output.

## External-validation questions for the next cycle

No answer is asserted yet for any of these questions:

1. Can experts explain the commercial problem without presenter intervention?
2. Can they distinguish Party Alignment, calibration, stress testing, execution,
   and independent validation?
3. Do they understand what the exact manifest digest identifies and excludes?
4. Is the fictional human arbitrator visibly distinct from protocol output?
5. Is settlement/merits separation understood without technical explanation?
6. Which dossier artifacts are commercially valuable to counsel, institutions,
   design partners, and investors?
7. Which words or interactions overstate legal, technical, institutional,
   security, or validation properties?
8. What evidence would experts require before any later validation claim?

These questions must be answered with real reviewer evidence in the subsequent
validation and improvement cycle.
