# Project Charter

## AI-Native Settlement and Arbitration-Readiness Service

**Hackathon:** Omnilex Legal AI-Native Services Hackathon  
**Date:** 11 July 2026  
**Owner:** Enrique Georg Zbinden  
**Status:** Hackathon scope locked  
**Document purpose:** Define the problem, product thesis, target users, value proposition, MVP boundaries, and governing principles for the hackathon prototype.

---

## 1. Project Purpose

The project will demonstrate a narrow AI-native legal service that converts a disputed commercial contract into a structured, auditable case file and routes the matter toward either:

1. a bilaterally accepted settlement; or
2. a clean handover for human legal or arbitral review.

The prototype focuses exclusively on the post-dispute workflow.

It structures documents, facts, evidence, contractual obligations, calculations, settlement options, and unresolved legal issues. It does not adjudicate disputed substantive matters and does not issue an arbitral award.

---

## 2. Problem

Commercial disputes are expensive before formal adjudication even begins.

Contracts, correspondence, invoices, system records, and party statements are usually stored across separate documents and systems. Lawyers and decision-makers must repeatedly reconstruct:

* what the contract required;
* what happened;
* which facts are agreed;
* which facts are disputed;
* what evidence supports each proposition;
* which matters can be calculated mechanically;
* which matters can be settled;
* which questions require human legal judgment.

This creates duplicated work, unnecessary legal cost, slow case preparation, weak source traceability, and avoidable escalation.

Settlement work is also frequently disconnected from the underlying merits record. When settlement fails, the legal team must reconstruct the case again for arbitration or litigation.

---

## 3. Product Thesis

> A legal service should be delivered as a transparent process rather than as a chatbot response.

The system converts a commercial contract dispute into a structured legal workflow.

It automates administrative and mechanical work, supports advisory settlement activity, and transfers only genuinely adjudicative questions to an authorised human decision-maker.

The system therefore separates four authority classes:

| Authority class | System role | Legal effect |
| --- | --- | --- |
| **Administrative** | Organise, extract, classify, retrieve, and record | Procedural operation |
| **Mechanical** | Apply an agreed formula to verified inputs | Provisional result, subject to correction and applicable party agreement |
| **Advisory** | Analyse, model, draft, and propose | Non-binding unless accepted by the parties or adopted by an authorised human |
| **Adjudicative** | Structure evidence and prepare balanced arguments | Final authority remains human-owned |

---

## 4. Target Users

The primary users are:

* general counsel;
* commercial managers;
* SME founders;
* external counsel;
* claims teams;
* lawyers or arbitrators receiving unresolved matters.

The prototype is designed for users handling a defined commercial contract dispute rather than for general legal research or open-ended legal advice.

---

## 5. Value Proposition

The service delivers:

### Faster case structuring

Documents are converted into a structured case state containing contracts, obligations, claims, defences, facts, evidence, calculations, and unresolved issues.

### Defensible outputs

Every material proposition links back to a source document and relevant passage.

### Reduced human-review load

Administrative and mechanical tasks are automated while human attention is reserved for consent, disputed legal conclusions, and adjudicative decisions.

### Safer settlement

Settlement proposals remain non-binding until separately accepted by both parties.

### Clean escalation

When settlement fails, confidential negotiation material remains outside the tribunal-visible merits record.

### Arbitration readiness

The system produces a neutral, source-linked handover package for a lawyer or arbitrator.

---

## 6. Reference Scenario

The hackathon prototype will use one seeded Swiss B2B software dispute.

A software provider promised **99.9% monthly uptime**. Following a serious outage:

* the customer claims contractual service credits;
* the customer additionally claims CHF 60,000 in consequential losses;
* the supplier accepts that downtime occurred;
* the supplier disputes causation, the loss amount, and the completeness of the customer’s evidence.

This scenario demonstrates all four authority classes:

| Issue | Authority class | Prototype treatment |
| --- | --- | --- |
| Document organisation | Administrative | Extract and link documents automatically |
| SLA service credit | Mechanical | Calculate from confirmed contractual inputs |
| Commercial settlement | Advisory | Generate a non-binding proposal |
| Consequential-loss liability | Adjudicative | Prepare balanced materials for human review |

---

## 7. Hackathon MVP

### 7.1 Inputs

The prototype receives:

* one commercial contract;
* one SLA or contractual schedule;
* one claimant statement;
* one respondent statement;
* one invoice;
* a small evidence bundle;
* selected system logs and correspondence.

### 7.2 System Actions

The system will:

1. extract the parties, contractual obligations, dates, amounts, formulae, and remedies;
2. build a source-linked case chronology;
3. separate agreed, disputed, inferred, and missing facts;
4. connect each material factual proposition to its source;
5. classify each issue as administrative, mechanical, advisory, or adjudicative;
6. calculate one mechanical contractual issue from confirmed inputs;
7. generate a non-binding settlement proposal;
8. record separate acceptance or rejection by each party;
9. isolate confidential settlement information from the merits record;
10. prepare unresolved issues for human legal or arbitral review;
11. record sources, corrections, approvals, and actions in a case ledger.

### 7.3 Outputs

The MVP will produce:

* **Contract Map**
* **Case Chronology**
* **Evidence Matrix**
* **Authority Matrix**
* **Mechanical Calculation**
* **Settlement Proposal**
* **Settlement Agreement**, following bilateral acceptance
* **Clean Merits Case Record**
* **Residual-Issues Memorandum**
* **Case Ledger**

The detailed hackathon scope, including the six-screen interface, acceptance tests, authority-routing model, and three-minute demonstration sequence, is defined in the accompanying scope document.

---

## 8. Human Control

Human authority remains explicit throughout the workflow.

### Party-controlled decisions

The parties retain authority over:

* factual corrections;
* acceptance of settlement terms;
* waiver or release of rights;
* approval of consequential commercial actions.

### Human legal review

A lawyer or other qualified reviewer remains responsible for:

* contested legal interpretations;
* jurisdictional conclusions;
* limitation-period decisions;
* evidentiary disputes;
* substantive liability analysis;
* final legal submissions.

### Human arbitral authority

A human arbitrator or tribunal remains responsible for:

* determining disputed liability;
* assessing credibility;
* resolving contested damages;
* interpreting open-textured legal standards;
* determining remedies;
* issuing any arbitral award.

The system may structure, analyse, compare, and draft. It does not independently exercise adjudicative authority.

---

## 9. Scope Exclusions

The hackathon prototype will not include:

* pre-signature contract alignment;
* full contract simulation;
* complete party-specific environments;
* production arbitrator appointment;
* procedural hearings;
* evidence rulings;
* a full arbitrator decision composer;
* autonomous findings on liability or credibility;
* comprehensive case-outcome prediction;
* live court or authority filings;
* payment execution;
* production e-signatures;
* consent awards;
* multiple jurisdictions;
* complete limitation-period automation;
* institutional case administration;
* production-grade identity verification;
* production-grade cryptography;
* multi-tenant case management;
* persistent production storage;
* general-purpose legal coverage.

These capabilities belong to the broader project roadmap rather than the hackathon build.
Their possible relationship to the post-dispute service is described in the
non-normative [Full Contract-to-Resolution Vision](appendices/full-lifecycle-vision.md).
That appendix records a future product direction and does not expand this Charter’s hackathon scope.

---

## 10. Fundamental Legal Principles

### Human-owned adjudication

Binding legal authority remains with authorised human decision-makers.

### Explicit consent

Settlement becomes binding only through separate, affirmative acceptance by both parties.

### Contestability

Users can correct extracted facts, contest AI inferences, and provide additional evidence.

### Procedural equality

The system presents both parties’ evidence and arguments through equivalent structures.

### Settlement confidentiality

Confidential settlement positions remain separate from the merits record used for human adjudicative review.

### Source traceability

Every material proposition should be linked to its contractual, factual, evidentiary, or legal source.

### Visible legal effect

Each output must clearly state whether it is administrative, provisional, advisory, accepted, rejected, or reserved for human determination.

### Escalation by authority

Issues escalate because of their legal nature, uncertainty, or disputed inputs, rather than simply because the AI expresses low confidence.

---

## 11. Fundamental Product Principles

### Structured workflow before conversation

The primary product is a case workspace, not a blank chatbot.

### Evidence before recommendation

Users should see the underlying clauses, facts, and evidence before viewing the preferred settlement proposal or legal position.

### Deterministic calculations

Numerical calculations use deterministic code. AI may extract and explain the inputs, but the formula and result must remain reproducible.

### Visible epistemic status

An established fact, party assertion, disputed proposition, missing fact, and AI inference must appear as different states.

### Symmetrical reasoning

The system prepares the strongest relevant arguments for both parties.

### Human review at material authority points

Human intervention is concentrated at consent and adjudicative decision points rather than inserted into every administrative action.

### Auditability by design

Provenance, status changes, corrections, approvals, and timestamps form part of the core case state.

### Clear separation of records

The confidential settlement workspace and the tribunal-visible merits record remain logically separated.

---

## 12. Business Model

The service can be offered through:

* a fixed fee per dispute;
* a subscription covering a defined number of active matters;
* separately priced human legal review;
* separately priced arbitral or institutional escalation;
* white-label licensing to law firms, claims teams, and dispute-resolution providers.

The commercial logic is based on scaling legal production without scaling junior legal headcount proportionally.

Efficiency becomes operating margin rather than lost billable time.

---

## 13. Success Criteria

The prototype is successful when a judge can observe one coherent legal service from source documents to either settlement or human-ready escalation.

The MVP must demonstrate that:

1. the seeded case loads reliably;
2. core contract and case information is extracted into structured data;
3. every material proposition links to a source;
4. agreed, disputed, inferred, and missing facts are visibly separated;
5. issues are correctly routed through the Authority Matrix;
6. the mechanical calculation is reproducible;
7. settlement requires separate acceptance by both parties;
8. rejected settlement information remains outside the merits handover;
9. the human-handover memorandum presents both parties’ arguments neutrally;
10. every correction, approval, and action appears in the case ledger;
11. the system never presents itself as a court, AI judge, or autonomous arbitrator;
12. the complete workflow can be demonstrated clearly within three minutes.

---

## 14. Charter Statement

> The hackathon project will demonstrate an AI-native legal service that converts a commercial contract dispute into a structured, source-linked, and auditable case.

> The system will automate administrative and mechanical work, support non-binding settlement, and prepare unresolved adjudicative issues for human review.

> Every material conclusion will be traceable. Every AI inference will remain contestable. Every binding settlement will require explicit consent. Every adjudicative decision will remain human-owned.
