# Product Requirements Document

## AI-Native Settlement and Arbitration-Readiness Service

**Status:** Hackathon implementation contract  
**Scope:** One seeded Swiss B2B software dispute  
**Audience:** Product, design, engineering, legal review, and demo presenters  
**Priority rule:** P0 requirements define the complete hackathon build. Roadmap ideas do not expand the MVP.

## 1. Product Outcome

> **Turn a disputed commercial contract into a structured, source-linked case, resolve one deterministic issue, support bilateral settlement, and transfer any unresolved adjudicative issue to a human through a clean handover.**

The prototype must demonstrate one coherent legal service rather than a collection of AI features.

```text
Seeded documents
-> structured case
-> source-linked facts and evidence
-> authority routing
-> deterministic service-credit calculation
-> non-binding settlement proposal
-> bilateral acceptance or rejection
-> settlement agreement or clean human handover
-> complete case ledger
```

The MVP ends when the parties settle or the unresolved matter is ready for human legal or arbitral review.

## 2. Users and Core Needs

| User | Core need | Product responsibility |
| --- | --- | --- |
| Initiating party | Present its claim, verify the record, and make a settlement decision | Show its position, sources, corrections, and settlement controls clearly |
| Responding party | Present its defence, contest propositions, and make an independent settlement decision | Provide equivalent structure, visibility, and controls |
| Human reviewer | Understand the remaining dispute without reconstructing the file | Receive a neutral, source-linked merits record and residual-issues memorandum |
| Demo operator | Run the complete workflow reliably | Load, reset, and advance the seeded case without hidden setup |

Production authentication and representative-authority verification are outside the hackathon build. The prototype uses an explicit role switch.

## 3. Seeded Demo Case

The MVP uses one fixed Swiss B2B software dispute:

- the supplier promised 99.9% monthly uptime;
- a documented outage occurred;
- the contractual service credit is calculated from confirmed inputs;
- the customer additionally claims CHF 60,000 in consequential losses;
- the supplier disputes causation, quantum, and evidentiary completeness;
- the service-credit issue is mechanical;
- consequential-loss liability remains reserved for human determination.

The case bundle contains:

- one commercial contract;
- one SLA or contractual schedule;
- one claimant statement;
- one respondent statement;
- one invoice;
- selected logs, correspondence, and supporting evidence.

## 4. Golden-Path User Journey

1. The operator loads the seeded case.
2. The parties review the contract map, chronology, claims, defences, and factual propositions.
3. A user opens a material proposition and sees the exact supporting source passage.
4. A party corrects or contests one proposition, and the case ledger records the change.
5. The system classifies each issue by authority and calculates the service credit with deterministic code.
6. The system generates a clearly labelled non-binding settlement proposal.
7. Each party independently accepts or rejects the same frozen version.
8. Matching acceptance produces a settlement agreement. Any rejection or mismatch produces a clean human handover.
9. The reviewer sees the merits record, competing positions, unresolved questions, and supporting sources without protected settlement content.
10. The operator opens the ledger and shows the complete material history.

## 5. Required Product Surfaces

The MVP contains six simple surfaces.

### 5.1 Case Overview

Shows:

- parties;
- claim amount;
- dispute summary;
- current workflow stage;
- key unresolved issue;
- role switch;
- load and reset controls.

### 5.2 Contract and Facts

Shows:

- relevant obligations and remedies;
- chronology;
- claims and defences;
- agreed, disputed, inferred, and missing propositions;
- correction and contestation controls.

### 5.3 Evidence and Authority

Shows:

- each material proposition;
- supporting and contrary sources;
- source passage and document location;
- administrative, mechanical, advisory, or adjudicative classification;
- review or escalation status.

### 5.4 Mechanical Calculation

Shows:

- contractual formula;
- formula version;
- inputs and their sources;
- confirmation status;
- intermediate values;
- result;
- any blocking disputed input.

### 5.5 Settlement Workspace

Shows:

- system-generated non-binding proposal;
- frozen proposal version;
- separate response control for each party;
- pending, accepted, rejected, or mismatched status;
- settlement agreement only after matching acceptance.

### 5.6 Human Handover and Case Ledger

Shows:

- clean merits record;
- unresolved issues;
- strongest relevant position for each party;
- missing evidence and uncertainty;
- requested human decision;
- chronological ledger of sources, corrections, classifications, calculations, responses, and generated outputs.

## 6. P0 Functional Requirements

| ID | Requirement | Acceptance test |
| --- | --- | --- |
| PRD-01 | The operator can load and reset the seeded case. | The same initial case state appears after every reset. |
| PRD-02 | The system presents one structured case state containing parties, documents, obligations, events, propositions, evidence, issues, calculations, settlement state, and ledger events. | All six surfaces read from the same case state. |
| PRD-03 | Every material proposition links to a source passage or carries an explicit unsupported status. | Selecting a proposition opens its document, location, and excerpt. |
| PRD-04 | Each party can correct an extraction, contest an inference, and add a short reason. | The visible state updates and the prior state remains recorded in the ledger. |
| PRD-05 | Every issue is classified as administrative, mechanical, advisory, or adjudicative. | The service credit routes to calculation and consequential-loss liability routes to human review. |
| PRD-06 | The service-credit result is calculated with deterministic code using visible inputs. | Reloading with unchanged inputs produces the same result and calculation trace. |
| PRD-07 | The system generates a clearly labelled non-binding settlement proposal. | The proposal carries advisory status and creates no agreement by itself. |
| PRD-08 | Settlement requires separate responses to the same frozen version from both parties. | One acceptance, one rejection, no response, or a version mismatch prevents settlement. |
| PRD-09 | Settlement-only content remains separate from the merits record. | A failed-settlement handover contains no offers, concessions, or private settlement parameters. |
| PRD-10 | Failed settlement produces a neutral residual-issues memorandum for human review. | The memorandum contains the unresolved issue, both positions, sources, gaps, and requested decision. |
| PRD-11 | Every material action creates a ledger event. | The ledger records actor, action, object, prior status, new status, source or reason, and timestamp. |
| PRD-12 | The interface states the legal and epistemic status of every material output. | AI analysis never appears as an established fact, binding settlement, or arbitral decision. |

## 7. Role and Permission Rules

| Action | Initiating party | Responding party | Human reviewer | Demo operator |
| --- | ---: | ---: | ---: | ---: |
| View shared merits record | Yes | Yes | Yes | Yes |
| Correct own submitted information | Yes | Yes | No | Demo control only |
| Contest a material proposition | Yes | Yes | View | Demo control only |
| View source passages | Yes | Yes | Yes | Yes |
| View mechanical calculation | Yes | Yes | Yes | Yes |
| Respond to settlement proposal | Own response only | Own response only | No | Demo control only |
| View settlement-only material | Own and shared proposal state | Own and shared proposal state | No | Yes for demonstration |
| View clean human handover | Yes | Yes | Yes | Yes |
| Issue a binding adjudicative decision | No | No | Outside MVP | No |

Both parties receive equivalent information structures and interaction controls.

## 8. Product and HCI Rules

The interface must:

- present evidence before recommendations;
- distinguish established facts, party assertions, disputes, missing information, AI inferences, and calculations;
- use plain legal status labels;
- show both parties symmetrically;
- keep the main workflow visible without requiring a chatbot conversation;
- use deliberate confirmation for settlement responses and material corrections;
- keep the human owner of any consequential decision explicit.

## 9. Data and AI Requirements

### Shared case state

All surfaces operate on one versioned case object. A material update changes the case state and creates a ledger event.

### Structured AI output

AI functions return defined fields rather than free-form application state. At minimum, outputs identify:

- proposition or conclusion;
- source references;
- status;
- authority class;
- uncertainty or missing information;
- generated-by metadata.

### Bounded AI functions

The MVP may use AI for:

- extraction;
- classification;
- source linking;
- chronology drafting;
- issue structuring;
- settlement drafting;
- handover drafting.

Application logic controls workflow state, permissions, settlement formation rules, record separation, and calculations.

### Deterministic services

Normal application code controls:

- service-credit arithmetic;
- version matching;
- bilateral acceptance state;
- authority-routing rules where predefined;
- ledger-event creation;
- settlement and merits separation.

### Demo fallback

The seeded structured result must remain available when a live model call fails. The demo must complete from cached or precomputed case data without changing the visible legal workflow.

A production local-model deployment and model-diverse AI council remain roadmap architecture rather than hackathon requirements.

## 10. Success Metrics

The MVP succeeds when:

1. the complete golden path runs in three minutes or less;
2. 100% of material propositions are source-linked or explicitly unsupported;
3. the deterministic calculation reproduces the same result from the same inputs;
4. settlement cannot form without matching bilateral acceptance;
5. failed-settlement information remains absent from the human merits handover;
6. the consequential-loss issue remains visibly reserved for human determination;
7. every demonstrated material action appears in the ledger;
8. the workflow completes reliably through live, cached, or seeded execution.

## 11. Explicit Non-Goals

The hackathon MVP excludes:

- pre-signature alignment and contract simulation;
- arbitrary disputes and multi-jurisdiction coverage;
- general-purpose legal research or advice;
- autonomous findings on liability, credibility, causation, disputed damages, remedies, or awards;
- arbitrator appointment, hearings, filings, institutional administration, or award issuance;
- production authentication, identity verification, electronic signatures, payments, or cryptography;
- production storage, multi-tenancy, enterprise integrations, and notification systems;
- outcome prediction;
- a production local-model stack or multi-agent AI council;
- commercial billing and subscription infrastructure.

## 12. Optional P1 Polish

P1 work begins only after the complete P0 demo passes reliably three consecutive times.

Possible P1 additions are:

- live document upload for the seeded file types;
- live model extraction with seeded fallback;
- downloadable settlement or handover document;
- improved transitions and responsive layout;
- a concise explanation of the broader production architecture.

## 13. Definition of Done

The product is hackathon-ready when:

- all twelve P0 requirements pass;
- the six surfaces form one coherent workflow;
- the same case can demonstrate both settlement and failed-settlement branches;
- every visible material conclusion has a status and provenance;
- no protected settlement content leaks into the merits handover;
- no interface element implies autonomous adjudicative authority;
- the demo has been reset and completed successfully three consecutive times;
- one presenter can explain the problem, workflow, legal safeguards, and value within three minutes.

## 14. Specification Authority

The Project Charter defines the locked hackathon purpose and boundaries. Legal Governance defines authority, consent, and procedural safeguards. This PRD translates those rules into the product behaviours that must be implemented and demonstrated.
