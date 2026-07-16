# Current Concept Product Requirements

> Reference requirements for the existing C0 implementation. The Concept
> Integrity Release roadmap controls maturity and lifecycle terminology.

## C0 high-fidelity interactive concept demonstrator

High fidelity is limited to workflow and interaction fidelity.

## 1. Objective

Enable arbitration experts, commercial lawyers, design partners, institutions,
and investors to understand ZIAAP with minimal presenter explanation while never
mistaking simulation for authority, execution for independent validation, the AI
Resolution Officer for a legal actor, or software output for a human decision.

## 2. Primary experience and six stages

The opening experience precedes the lifecycle and explains the proposition,
current maturity, role boundaries, and limitations. The lifecycle stages are:

1. Party Alignment;
2. Protocol Constitution;
3. Scenario Laboratory;
4. Configuration Manifest;
5. Later Dispute; and
6. Audit Dossier.

Arbitral reasoning calibration is an activity inside Protocol Constitution.
Stress testing is an activity inside Scenario Laboratory. The fictional
appointment simulation belongs at the start of Later Dispute, after the verified
and acknowledged Configuration Manifest.

## 3. Opening requirements

Within approximately one minute, the viewer can identify the before-signing
commercial problem, human/software distinction, six-stage lifecycle, C0
classification, workflow-and-interaction fidelity qualification, process-twin
boundary, and simulation-only limitations. The screen includes the canonical
definition, **Begin guided demonstration**, and **Explore the workflow**.

## 4. Party Alignment requirements

The UI connects draft clauses, independent expectations, divergence findings,
source-linked issues, options and trade-offs, deterministic scenario testing,
revised language, exact-version bilateral confirmation, and a generated
Alignment Annex.

Every divergence shows topic, positions, dimension, consequence, uncertainty,
sources, authority, options, trade-offs, and unresolved matters. Every option
shows revised language, structured terms, commercial consequence, evidence,
legal-review boundary, deterministic result where relevant, and selection effect.

## 5. Authority requirements

- Enforce `simulation_only` and `legalEffect: false`.
- Keep execution and lifecycle status separate.
- Make `authoritative`, `validated`, and unqualified `appointed` unreachable.
- Label actor, status, version, consequence, provenance, and limitation on
  consequential artifacts.
- Qualify acknowledgements and fictional ceremonies as simulated and without
  legal effect.
- Keep human legal authority and the governed-software role visible.

## 6. Execution and failure requirements

Provide distinct curated-simulation and live actions. Fixtures return
`illustrative_only`; successful declared live calls return
`executed_unverified`; every live error returns `failed` with a reason and no
fallback success. Preserve prior valid artifacts but require deliberate
reselection. Disable unrestricted live execution and retrieval in public
deployments.

## 7. Integrity requirements

Use synchronous predicates only for UI readiness. Immediately before a material
ceremony mutation, an async command rebuilds and hashes the Configuration
Manifest and checks every version, artifact, acknowledgement, disclosure,
lifecycle, and reference invariant. Rejection preserves state. These controls
support only internal synthetic consistency.

## 8. Accessibility and responsive requirements

Keyboard focus is visible; semantic controls and status regions are used; colour
is never the sole status cue; desktop and mobile have no page-level horizontal
scroll; dense detail uses progressive disclosure; loading, stale, failed,
blocked, partial-confirmation, locked-Annex, and reset states are designed.

## 9. Acceptance criteria

The C0 concept baseline requires typecheck, lint, tests, production build,
desktop and mobile critical paths, failure/reset/invalid-transition flows,
opening navigation, the complete six-stage illustrative journey, Audit Dossier,
and print layout. Canonical documentation must match schemas, fixtures, API
metadata, UI copy, tests, and reviewer materials. Real comprehension, usability,
commercial, and independent-validation evidence remains pending.

## 10. Non-goals

No production case management, confidential data, identity, legal appointment,
signature, operative award, independent validation, institutional integration,
sovereign runtime, Council of LLMs, DLT, or enforcement is included.
