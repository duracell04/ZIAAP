# Product Requirements Document

## I0 Pre-Signature Bilateral Contract-Alignment Engine

**Status:** Authoritative hackathon implementation contract  
**Scope:** One seeded Swiss-UK B2B SaaS contract before signature, plus one compact future-event continuity preview  
**Audience:** Product, design, engineering, legal review, and demo presenters  
**Priority rule:** P0 requirements define the complete hackathon build. Post-dispute settlement and full arbitral workflows remain roadmap architecture.

## 1. Product Outcome

> **ZIAAP tests whether two parties expect the same contract language to produce the same legal and commercial outcome before they sign.**

The hackathon prototype demonstrates one narrow legal service:

```text
Draft contract
→ independent Party A expectations
→ independent Party B expectations
→ divergence detection
→ legal and commercial consequence analysis
→ scenario testing
→ revised clause options
→ bilateral confirmation of the same frozen clause version
→ Alignment Annex and structured contract state
→ future-event preview
→ deterministic service-credit result
→ one residual legal issue routed to a qualified human
```

The prototype proves that the contract itself can become the beginning of the dispute-resolution system.

## 2. Locked USP and UVP

### USP

> **ZIAAP is a zero-instance, authority-aware contract protocol that identifies hidden divergence between party expectations before signature, records the agreed resolution as structured contract state, and carries that state into future performance and dispute resolution.**

### UVP

> **ZIAAP reduces future dispute cost by resolving hidden contractual misalignment before signature and preserving the agreed meaning, evidence rules and authority boundaries for later use.**

## 3. Users

| User | Core need | Product responsibility |
| --- | --- | --- |
| Swiss supplier representative | State intended performance, risk allocation and evidence expectations independently | Preserve a private intent profile until comparison is authorised |
| UK customer representative | State expected remedies, measurement rules and legal architecture independently | Provide equivalent structure and controls |
| Qualified legal reviewer | Review consequential legal constraints and unresolved legal questions | Receive a focused source-linked review packet |
| Demo operator | Run the seeded workflow reliably | Load, reset and advance the complete vertical slice |

Production authentication, corporate-authority verification and electronic signature are outside P0. The prototype uses explicit role switching and records demo confirmations as process state.

## 4. Seeded Contract Scope

The MVP uses one fixed Swiss-UK SaaS contract and only three subject areas:

1. **Uptime, measurement and service credits**
2. **Liability cap and consequential loss**
3. **Governing law, arbitral seat, language and rules**

The seeded draft contains plausible ambiguity and hidden expectation divergence. The later outage preview uses the exact state confirmed during I0.

## 5. Golden-Path User Journey

1. The operator loads the seeded draft contract.
2. Party A completes its private intent profile for the three clause groups.
3. Party B independently completes its private intent profile.
4. The system compares both profiles against the draft and creates an Alignment Matrix.
5. Each material divergence shows both expectations, the source clause, commercial consequence, relevant legal constraint and authority class.
6. The system runs one realistic outage scenario and shows how the original draft produces different outcomes under the parties’ assumptions.
7. The system proposes revised clause options.
8. Each party separately reviews and confirms the same frozen clause version.
9. Any material edit increments the version and clears earlier confirmations.
10. Matching confirmations generate an Alignment Annex and persistent structured contract state.
11. The product fast-forwards to a later outage.
12. Deterministic code calculates the agreed CHF 3,000 service credit from the confirmed formula and inputs.
13. A CHF 60,000 consequential-loss question is isolated for qualified human determination.
14. The ledger shows the complete provenance, version and confirmation history.

## 6. Required Product Surfaces

### 6.1 Independent Party Intent

For each party and clause group, capture:

- expected outcome;
- intended interpretation;
- commercial risk tolerance;
- preferred evidence and measurement method;
- preferred governing-law and arbitral architecture;
- short rationale;
- completion status.

One party’s private profile remains unavailable to the other until the comparison stage.

### 6.2 Alignment Matrix

For every material divergence, show:

- Party A expectation;
- Party B expectation;
- source contract text and location;
- divergence type and materiality;
- commercial consequence;
- one linked legal constraint where relevant;
- administrative, mechanical, advisory or adjudicative classification;
- correction or contestation controls;
- resolution status.

### 6.3 Scenario and Clause Resolution

Show:

- seeded outage facts;
- the result under Party A’s assumptions;
- the result under Party B’s assumptions;
- the reason for the difference;
- revised clause options;
- formula, inputs, exclusions and evidence hierarchy;
- frozen clause version;
- separate confirmation state for both parties.

### 6.4 Alignment Annex and Future Preview

The Alignment Annex contains:

- agreed clause text;
- stable clause identifier and version;
- formula and units;
- required inputs;
- measurement and evidence hierarchy;
- remedy;
- governing law, seat, language and rules;
- authority class;
- unresolved matters;
- party confirmations;
- source links;
- version history.

The continuity preview then displays:

- the exact confirmed state used;
- future outage inputs and sources;
- deterministic service-credit trace and result;
- one residual legal question;
- both relevant positions;
- missing evidence or assumptions;
- the required human decision.

## 7. P0 Functional Requirements

| ID | Requirement | Acceptance test |
| --- | --- | --- |
| PRD-01 | The operator can load and reset the seeded contract state. | Every reset restores the same draft, profiles, versions and ledger baseline. |
| PRD-02 | Both parties can complete separate intent profiles for all three clause groups. | Each profile persists independently and carries party, clause and version identifiers. |
| PRD-03 | The system compares the two profiles with the source draft. | The Alignment Matrix identifies every seeded material divergence. |
| PRD-04 | Every divergence links to the exact source clause or is marked unsupported. | Selecting the source opens its document location and excerpt. |
| PRD-05 | Every divergence states its commercial consequence, legal constraint and authority class. | All seeded divergences display the required fields. |
| PRD-06 | The outage scenario produces separate outcomes under the parties’ original assumptions. | The result changes because of visible interpretation or formula differences. |
| PRD-07 | The system proposes revised language for each unresolved clause group. | Each option is labelled AI-assisted and remains non-binding. |
| PRD-08 | Clause language is versioned and frozen before confirmation. | Editing a clause creates a new version and clears earlier confirmations. |
| PRD-09 | Agreement exists only when both parties confirm the same version. | Missing, mismatched or stale confirmations prevent annex generation. |
| PRD-10 | The system generates a structured Alignment Annex from confirmed versions. | Every annex clause maps to the frozen text, formula, evidence rule, authority class and confirmations. |
| PRD-11 | The future preview uses the exact confirmed contract state. | The preview references the same clause and formula versions as the annex. |
| PRD-12 | The service credit is calculated with deterministic code. | Identical confirmed inputs always reproduce CHF 3,000 and the same trace. |
| PRD-13 | The residual consequential-loss issue routes to a qualified human. | No interface state presents an autonomous legal determination. |
| PRD-14 | Every material action creates a ledger event. | The ledger records actor, object, prior state, new state, source or reason, version and timestamp. |
| PRD-15 | AI outputs remain contestable and visibly distinct from confirmed contract state. | Users can correct or contest outputs, and status labels remain explicit. |

## 8. Roles and Authority

| Activity | System | Parties | Qualified human |
| --- | --- | --- | --- |
| Extraction and comparison | Automated, source-linked and contestable | Correct or contest | Review only where consequential |
| Divergence identification | Automated and advisory | Add context or dispute | Review legal significance where required |
| Scenario calculation | Deterministic | Confirm or dispute inputs | Resolve consequential disputed premises |
| Clause drafting | AI-assisted | Select, edit and negotiate alignment | Review consequential legal architecture |
| Clause acceptance | Record exact version | Both parties separately confirm | Verify authority or form outside P0 |
| Routine future calculation | Automated from agreed state | Inspect and contest inputs | Review exceptions |
| Contested legal judgment | Prepare focused packet | State positions | Determine the issue |

Human attention is concentrated at contractual consent, consequential legal review and adjudicative authority points.

## 9. HCI Rules

The interface must:

- use a structured workspace rather than a blank chatbot;
- preserve private intent until comparison is authorised;
- present both parties symmetrically;
- show source text before recommendations;
- distinguish draft language, party expectations, AI analysis, scenario results and confirmed state;
- expose uncertainty and assumptions;
- make correction and contestation available on material outputs;
- require deliberate confirmation of a frozen version;
- show that demo confirmation is not an electronic signature;
- identify the human owner of consequential decisions.

## 10. Data and AI Requirements

All surfaces operate on one versioned `ContractAlignmentState` containing:

- contract and clause versions;
- private party-intent profiles;
- divergences;
- legal constraints;
- scenarios;
- revised clause options;
- party confirmations;
- Alignment Annex;
- future-event inputs and calculations;
- residual human-review issue;
- ledger events.

AI may support extraction, comparison, divergence explanation, legal-source linking, clause drafting and human-packet drafting. Application code controls permissions, visibility, versioning, confirmation matching, state transitions, deterministic calculations and ledger creation.

The seeded structured result must remain available when a live model or retrieval call fails.

## 11. Explicit Non-Goals

P0 excludes:

- post-dispute claimant and respondent intake;
- settlement proposal workspaces;
- bilateral dispute settlement;
- settlement agreement generation;
- settlement-merits firewalls;
- full merits case records;
- post-dispute evidence reconstruction;
- complete arbitral handover or case administration;
- autonomous legal advice or adjudication;
- production identity verification, signatures, payments, storage or integrations;
- arbitrary contracts, jurisdictions or scenarios.

These remain roadmap capabilities. The compact continuity preview exists only to prove that the I0 structured contract state remains useful later.

## 12. Success Metrics

The MVP succeeds when:

1. the complete golden path runs in three minutes or less;
2. all seeded material divergences are detected and source-linked;
3. the original draft visibly produces different scenario outcomes under the two parties’ assumptions;
4. both parties must confirm the same frozen version;
5. any edit invalidates stale confirmations;
6. the Alignment Annex is generated only from bilaterally confirmed clauses;
7. the future preview uses the exact annex state;
8. the deterministic calculation reproduces CHF 3,000;
9. the consequential-loss issue remains reserved for a qualified human;
10. every material action is reconstructable from the ledger;
11. the demo remains reliable through live, cached or seeded execution.

## 13. Definition of Done

The product is hackathon-ready when all P0 acceptance tests pass, the four surfaces form one coherent I0-first workflow, the seeded case resets reliably, the demo completes successfully three consecutive times, and one presenter can explain the problem, alignment process, future continuity and authority safeguards within three minutes.

## 14. Specification Authority

The Project Charter defines the locked I0-first purpose. Legal Governance defines authority, consent and escalation. This PRD defines the product behaviour to implement and demonstrate.

> **Draft → independent party expectations → divergence matrix → legal source → scenario test → revised clause → bilateral confirmation → Alignment Annex → future mechanical result → residual human decision.**
