# Product Requirements

## Hackathon MVP Scope Lock

**Status:** Normative implementation scope  
**Audience:** Product, design, engineering, legal reviewers, and demo presenters

This document controls what is built for the hackathon demo. Strategy and
roadmap material may explain the broader opportunity but cannot add MVP
requirements.

## 1. Product Wedge

> **ZIAAP turns a disputed commercial contract into a source-linked case state, resolves deterministic issues automatically, supports bilateral settlement, and escalates only residual adjudicative questions through a clean human handover.**

The prototype demonstrates one Swiss B2B software dispute from source documents
to either bilateral settlement or a clean human-ready escalation.

## 2. Visible Demo Flow

> **Documents in → structured case → mechanical result → settlement proposal → clean human escalation.**

The demo must show this as one coherent workflow:

1. Load the seeded contract, SLA, party statements, invoice, logs, correspondence, and evidence.
2. Present a structured case state containing the contract map, chronology, factual propositions, evidence, and authority classifications.
3. Calculate the SLA service credit with deterministic code and disclosed, confirmed inputs.
4. Generate a clearly non-binding settlement proposal.
5. Record a separate acceptance or rejection from each party.
6. Produce a settlement agreement only when both parties accept identical complete terms.
7. If settlement fails, exclude protected settlement content and generate a focused residual-issues handover for a human lawyer or arbitrator.
8. Show material changes, sources, corrections, decisions, and approvals in the case ledger.

## 3. Governing Human-Control Rule

> **Humans intervene at consent and legal-authority points, not at every processing step.**

The system may perform administrative work autonomously and invoke deterministic
calculations using confirmed inputs. Parties control factual corrections and
settlement acceptance. Contested legal interpretations, liability, credibility,
causation, disputed damages, remedies, and adjudicative decisions remain with an
authorised human.

## 4. Required Product Behaviours

### Source-linked case state

- Every material proposition links to a source passage or carries an explicit unsupported status.
- The interface distinguishes agreed, disputed, inferred, and missing propositions.
- Contract obligations, evidence, claims, defences, and events remain connected rather than becoming isolated summaries.

### Contestability

- Each party can correct an extraction, contest an inference, and provide additional evidence.
- Corrections preserve the previous state, actor, reason, source, and timestamp in the case ledger.
- AI-generated material never visually presents itself as an established human determination.

### Authority-based routing

- Each issue is classified as administrative, mechanical, advisory, or adjudicative.
- Escalation follows legal authority, disputed inputs, and procedural risk rather than model confidence alone.
- Human review packets contain the unresolved issue, relevant sources, both parties’ positions, uncertainty, and the requested decision.

### Deterministic calculation

- The SLA service-credit calculation uses deterministic code rather than language-model arithmetic.
- The formula, confirmed inputs, assumptions, intermediate values, and result are visible and reproducible.
- A disputed or missing material input blocks finalisation and routes the issue for correction or review.

### Bilateral settlement

- A proposal is advisory and visibly non-binding before acceptance.
- Each party acts separately on the same version of the complete terms.
- One rejection, missing acceptance, or version mismatch prevents agreement formation.

### Settlement and merits separation

- Offers, concessions, negotiation parameters, and settlement-only analysis remain in the settlement workspace.
- Failed-settlement content does not enter the Clean Merits Case Record unless separately authorised.
- The handover neutrally presents only merits sources, unresolved issues, competing arguments, and permitted procedural history.

## 5. Required Demo Outputs

- Contract Map
- Case Chronology
- Evidence Matrix
- Authority Matrix
- Mechanical Calculation
- Settlement Proposal
- Settlement Agreement after valid bilateral acceptance
- Clean Merits Case Record after failed settlement
- Residual-Issues Memorandum
- Case Ledger

## 6. Acceptance Criteria

The MVP is accepted when:

1. the seeded case loads reliably;
2. all material propositions are source-linked or explicitly unsupported;
3. epistemic and procedural states are visibly distinct;
4. parties can correct and contest material propositions;
5. authority routing matches the four defined classes;
6. the SLA calculation is reproducible from visible inputs;
7. settlement requires separate acceptance of identical terms;
8. rejected settlement material is absent from the clean merits handover;
9. the residual memorandum presents both parties’ positions neutrally;
10. material actions and state changes appear in the case ledger;
11. no output claims autonomous adjudicative authority; and
12. the complete flow can be demonstrated coherently within three minutes.

## 7. Explicit Non-Goals

The live hackathon build does not include:

- pre-dispute contract alignment or continuous contract monitoring;
- general-purpose legal advice or multi-jurisdiction coverage;
- autonomous liability, credibility, causation, damages, remedy, or award decisions;
- arbitrator appointment, institutional case administration, hearings, filings, or award issuance;
- production identity, e-signatures, payments, cryptography, or persistent multi-tenant storage;
- production integrations with arbitral institutions or enterprise contract systems;
- pricing, subscriptions, open-core distribution, certification, licensing, or other commercial infrastructure;
- outcome prediction or the complete contract-to-arbitration lifecycle.

## 8. Document Authority

The seven numbered documents form the core specification. Conflicts are resolved
in this order:

1. Project Charter and Legal Governance;
2. Product Requirements;
3. Service Blueprint, HCI and Information Architecture, and Technical Requirements;
4. supporting strategy appendices.

The [Competitive Strategy appendix](appendices/competitive-strategy.md) is
non-normative and cannot expand this scope.
