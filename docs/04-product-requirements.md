# Product Requirements

## Complete Synthetic Review Candidate

## 1. Objective

Enable arbitration experts, commercial lawyers, design partners, institutions,
and investors to understand ZIAAP with minimal presenter explanation while never
mistaking simulation for authority, execution for validation, or protocol output
for a human award.

## 2. Primary views

1. Opening experience;
2. Party Alignment;
3. Arbitral Reasoning Calibration;
4. Stress Testing;
5. Exact Protocol Manifest and Simulated Appointment;
6. Later Synthetic Dispute; and
7. Demonstration Dossier.

## 3. Opening requirements

Within approximately one minute, the viewer can identify the commercial problem,
pre-conflict rationale, human/protocol distinction, lifecycle, demonstrated
scope, and simulation boundary. The screen includes the canonical definition,
lifecycle diagram, **Begin guided demonstration**, **Explore the workflow**, and
visible synthetic/simulation-only disclosure.

## 4. Party Alignment requirements

The UI must connect draft clauses, independent expectations, three divergence
findings, source-linked issues, options and trade-offs, deterministic scenario
testing, revised language, exact-version bilateral confirmation, and a generated
Alignment Annex.

Every divergence shows topic, positions, dimension, consequence, uncertainty,
sources, authority, options, trade-offs, and unresolved matters. Every option
shows revised language, structured terms, commercial consequence, evidence,
legal-review boundary, deterministic result where relevant, and selection effect.

## 5. Authority requirements

- Enforce `simulation_only` and `legalEffect: false`.
- Keep execution and lifecycle status separate.
- Make `authoritative`, `validated`, and ordinary `appointed` unreachable.
- Label actor, status, version, consequence, provenance, and limitation on
  consequential artifacts.
- Use **Acknowledge for simulated ceremony** with no-effect copy.
- Show all six production limitations on downstream artifacts.

## 6. Execution and failure requirements

Provide distinct illustrative and live actions. Fixtures return
`illustrative_only`; successful live calls return `executed_unverified`; every
live error returns `failed` with a reason and no fallback success. Preserve prior
valid artifacts but require deliberate reselection. Disable unrestricted live
execution and retrieval in public deployments.

## 7. Integrity requirements

Use synchronous predicates only for UI readiness. Immediately before simulated
appointment mutation, an async command rebuilds and hashes the manifest and
checks every version, artifact, acknowledgement, disclosure, lifecycle, and
reference invariant. Rejection preserves state.

## 8. Accessibility and responsive requirements

Keyboard focus is visible; semantic controls and status regions are used; color
is never the sole status cue; desktop and mobile have no page-level horizontal
scroll; dense detail uses progressive disclosure; loading, stale, failed,
blocked, partial-confirmation, locked-Annex, and reset states are designed.

## 9. Acceptance criteria

The review candidate is ready only when type-check, lint, tests, production build,
desktop and mobile critical paths, loading/blocked/failure/reset/invalid-transition
flows, opening navigation, complete Stages 1–5, twelve-artifact dossier, and print
layout pass. Canonical documentation matches schemas, fixture, API metadata, UI
copy, tests, and reviewer materials. External validation remains pending.

## 10. Non-goals

No production case management, confidential data, identity, legal appointment,
signature, operative award, independent validation, institutional integration,
sovereign runtime, Council of LLMs, DLT, or enforcement.
