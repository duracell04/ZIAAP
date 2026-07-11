# Full Contract-to-Resolution Vision

> **Future product vision — not hackathon scope, not a build specification, and not an eighth core document.**

This appendix records the broader ZIAAP lifecycle from pre-signature contract
alignment through performance, dispute structuring, settlement, and human
determination. It explains how the current post-dispute prototype could fit into
a future product without changing the locked MVP.

The authoritative hackathon scope remains the seven numbered documents. In
particular, the [Product Requirements](../04-product-requirements.md) control the
live build and explicitly exclude pre-signature alignment and continuous
contract monitoring.

## 1. Current MVP and Future Vision

| Current hackathon MVP | Future lifecycle vision |
| --- | --- |
| Begins after a contract is signed and a dispute exists | Begins while the parties are negotiating a draft contract |
| Structures an existing dispute | Aligns expectations, records performance, and later structures any dispute |
| Demonstrates I1, M/S, I2, and handover into I3 | Connects I0, P0, I1, M/S, I2, and I3 |
| Uses one seeded Swiss B2B software dispute | May later support controlled jurisdiction and contract variants |
| Ends at bilateral settlement or clean human handover | Preserves continuity from drafting through final resolution |

### Locked hackathon workflow

```text
Existing signed contract + dispute
        ↓
Party submissions and evidence
        ↓
Source-linked contract map, chronology, claims, defences, and evidence matrix
        ↓
Party correction and contestation
        ↓
Administrative / Mechanical / Advisory / Adjudicative routing
        ↓
Deterministic mechanical calculation
        ↓
Non-binding settlement proposal
        ↓
Separate acceptance by both parties?
   ├─ Yes → Settlement agreement
   └─ No  → Settlement material firewalled
             ↓
             Residual-issues memorandum
             ↓
             Human lawyer, arbitrator, or tribunal
```

### Future contract-to-resolution workflow

```text
Draft contract and party expectations
        ↓
Commercial, legal, and semantic divergence analysis
        ↓
Alignment questions, legal consequence comparisons, and scenarios
        ↓
Party negotiation and explicit choices
        ↓
Revised contract + Structured Contract State + Alignment Annex
        ↓
Performance events, notices, evidence, milestones, and deviations
        ↓
Disagreement arises
        ↓
Structured dispute intake using the existing contract and performance state
        ↓
Mechanical resolution / bilateral settlement / residual case formation
        ↓
Human determination of reserved adjudicative questions
```

## 2. Legal-System Boundary

ZIAAP must never blend two national laws into a new hybrid legal order. It may
retrieve, compare, and explain possible consequences under identified legal
frameworks, but the parties or an authorised human choose the contractual and
procedural architecture.

For example, the system may state:

> Under Swiss law, this provision may produce consequence A. Under English law,
> it may produce consequence B. The parties currently appear to expect
> different results. Select or renegotiate the intended allocation and obtain
> qualified legal review where required.

The parties may make explicit choices about:

- governing law;
- arbitral seat and arbitration rules;
- courts or institutions with supporting roles;
- contract and proceeding language;
- mandatory rules that may apply regardless of contractual choice;
- interpretation standards;
- liability limitations and remedies;
- evidence, notice, and record requirements; and
- likely enforcement locations.

The system exposes divergences and records choices. It does not select governing
law, reconcile legal systems, waive rights, or create binding terms on behalf of
the parties.

## 3. Three Alignment Layers

### 3.1 Commercial alignment

Makes visible the outcomes and trade-offs the parties actually want, such as:

- speed versus formal control;
- price certainty versus flexibility;
- strict performance versus reasonable efforts;
- relationship preservation versus strong remedies; and
- predictable processes versus discretionary escalation.

### 3.2 Legal alignment

Makes the intended legal architecture explicit, including:

- governing law;
- liability regime;
- dispute-resolution mechanism;
- procedural rights;
- remedies; and
- mandatory legal constraints.

### 3.3 Semantic alignment

Finds terms and operational concepts that the parties may understand
differently, including:

- “material breach”;
- acceptable uptime;
- completion and acceptance;
- sufficient evidence of performance;
- notice effectiveness; and
- events triggering suspension or termination.

AI may identify and explain divergence. The parties decide whether and how to
resolve it, with qualified legal review where the decision requires it.

## 4. Lifecycle Architecture

### I0: Contract Alignment

The parties provide a draft contract, commercial assumptions, intended legal
architecture, and relevant constraints. The system identifies ambiguity,
compares authorised legal scenarios, generates alignment questions, and records
the parties’ explicit choices.

### P0: Performance State

After signature, the service records contract events, notices, milestones,
evidence, approvals, deviations, and amendments. This creates a traceable record
without deciding that a breach or legal consequence has occurred.

### I1: Dispute Structuring

When disagreement arises, claims, defences, facts, evidence, chronology,
contractual obligations, and legal issues are assembled into one source-linked,
contestable case state. This is where the current hackathon prototype begins.

### M/S: Mechanical and Settlement Track

The system applies agreed formulas to confirmed inputs and develops non-binding
settlement options. Each party retains separate authority to accept or reject
the complete settlement terms.

### I2: Residual Case Formation

If settlement fails, protected negotiation material is removed from the merits
record, resolved matters are preserved, and only genuinely adjudicative issues
remain in a balanced, source-linked handover.

### I3: Human Determination

A qualified lawyer, arbitrator, or arbitral tribunal receives the residual case
and exercises legally reserved judgment. The human decision-maker controls any
determination of disputed liability, credibility, causation, damages, remedies,
or award.

## 5. Candidate I0 Outputs

The following are roadmap artefacts, not current deliverables:

| Artefact | Possible purpose |
| --- | --- |
| Structured Contract State | Machine-readable parties, obligations, definitions, remedies, procedures, and evidence duties |
| Alignment Annex | Human-readable record of material assumptions, choices, and confirmed shared meanings |
| Ambiguity Register | Source-linked terms, clauses, or scenarios for which party expectations diverge |
| Scenario Results | Non-binding comparison of how selected events may interact with proposed terms |
| Selected Legal Architecture | Recorded party choices concerning governing law, seat, rules, language, and related provisions |
| Evidence Requirements | Agreed records, notices, measurements, and proof expected during performance |

These outputs remain drafts until the parties complete the required approvals
and legal formalities. Their existence does not prove enforceability or replace
independent legal advice.

## 6. Authority and Information Rules

- AI may extract, compare, identify divergence, generate questions, and model scenarios.
- Parties decide commercial preferences and whether to adopt proposed contractual language.
- Qualified humans address contested legal interpretation and jurisdiction-specific consequences.
- Mandatory-law constraints remain visible even where the parties select a different governing architecture.
- No output becomes binding merely because it appears in the structured state.
- Provenance, corrections, versions, approvals, and unresolved disagreements remain auditable.
- Confidential negotiation material must have defined access and retention treatment.

## 7. Adoption Criteria

I0 or P0 should enter product scope only after the core documents are explicitly
revised to define:

1. the supported contract type, jurisdictions, languages, and user roles;
2. authoritative sources and qualified-human review triggers;
3. the legal status and approval process for each candidate output;
4. the structured schemas for contracts, alignment choices, performance events, and amendments;
5. versioning, correction, signature, evidence, and provenance rules;
6. privacy, privilege, confidentiality, retention, and access controls;
7. failure modes for conflicting laws, incomplete information, and unresolved party divergence;
8. acceptance tests proving that the system does not make party-controlled or adjudicative choices; and
9. a narrow demonstrable use case that does not compromise the post-dispute MVP.

Adoption requires deliberate updates to the Project Charter, Product
Requirements, Legal Governance, HCI specification, and Technical Requirements.
An appendix alone cannot authorise implementation.

## 8. Hackathon Boundary

For the current prototype:

- the contract is already signed;
- the dispute has already arisen;
- no pre-signature alignment interface is built;
- no cross-jurisdiction legal comparison engine is built;
- no performance-monitoring workflow is built;
- no Alignment Annex is generated; and
- no additional lifecycle stages are added to the application.

The full lifecycle is retained here so that the prototype can demonstrate a
credible wedge into the broader vision without pretending to implement that
vision today.
