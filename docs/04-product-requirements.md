# Product Requirements

## AI-Native Arbitrator Vertical Slice

This document controls the live implementation.

## 1. Product Wedge

> **Configure, test, freeze, and appoint the dispute-resolution protocol before conflict.**

The product serves two parties negotiating one seeded SaaS contract. It creates
a jointly approved Arbitrator Constitution and Appointment Record, then proves
continuity by applying the exact frozen protocol to one later outage.

## 2. Primary Views

1. **Governance Alignment** — independent expectations and exact contract text.
2. **Arbitral Reasoning Calibration** — legal actor, legal architecture, values, procedure, model, sources, tools, and change policy.
3. **Stress Testing and Validation** — four safeguarded hypothetical cases and bilateral behavior approval.
4. **Freeze and Appoint** — canonical hash, separate approvals, disclosure review, human acceptance, and simulated signature.
5. **Later Dispute** — shared record, optional sealed Settlement Facilitation, proposed determination, and independent human decision.

## 3. Functional Requirements

- Validate one shared state schema at fixture, API, and UI boundaries.
- Keep contract approval, validation approval, appointment approval, settlement consent, and human decision separate.
- Invalidate validation and appointment after any behavior-affecting amendment.
- Hash the canonical behavior manifest with SHA-256.
- Require every stress-test case to pass and receive separate approval from both parties.
- Require matching hash approvals, disclosure review, and human acceptance before appointment.
- Bind the later dispute to the appointed hash and reject mismatches.
- Prevent silent model, prompt, source, tool, or engine substitution.
- Preserve the CHF 1,500 deterministic calculation and block disputed premises.
- Activate Settlement Facilitation only with bilateral consent.
- Keep settlement proposal content and responses outside adjudication prompts and the merits ledger.
- Require a preliminary human assessment before revealing a protocol determination.
- Label every protocol determination provisional and without independent legal effect.
- Require review checks, independent reasons, a disposition, and human signature before displaying a final human decision.
- Preserve cached offline paths and visibly label live/fallback behavior.

## 4. Acceptance Criteria

The MVP is accepted when:

1. all five views complete in one coherent session;
2. the fixture and every route response validate;
3. edits increment the constitution and clear downstream authority;
4. all four validation categories are visible and separately approved;
5. identical state produces an identical hash and material changes do not;
6. stale approvals cannot appoint or govern a dispute;
7. both parties are treated symmetrically;
8. settlement cannot start unilaterally or leak into merits reasoning;
9. 99.2% uptime produces CHF 1,500 from the accepted formula;
10. disputed maintenance and mandatory law remain unresolved by automation;
11. a proposed determination cannot be exported or styled as an award;
12. a human decision cannot be signed without independent assessment, review, and rationale; and
13. the cached path works without network access.

## 5. Non-Goals

No production authentication, representative-authority service, database,
qualified e-signature, institutional case administration, legally operative
award, private mediation caucus, mediator persona, arbitrary contract ingestion,
broad jurisdiction coverage, model-weight fine-tuning, or Council-of-LLMs
orchestration is required.

Relationship-specific configuration must be called **arbitral reasoning
calibration**, not fine-tuning. It changes the inference-time protocol and
leaves the underlying model weights unchanged.

## 6. Document Authority

Conflicts are resolved in this order:

1. Project Charter and Legal Governance;
2. Product Requirements;
3. Service Blueprint, HCI, and Technical Requirements;
4. Brand Book for visual and linguistic implementation; and
5. non-normative appendices.
