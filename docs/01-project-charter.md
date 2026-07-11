# Project Charter

## AI-Native Bilateral Contract Alignment Service

**Hackathon:** Omnilex Legal AI-Native Services Hackathon  
**Date:** 11 July 2026  
**Owner:** Enrique Georg Zbinden  
**Status:** I0-first hackathon scope locked

## 1. Purpose

The project demonstrates a narrow AI-native service that helps two commercial
parties discover and resolve differences in meaning, risk allocation, and legal
assumptions before signing a contract.

The system does not decide what the parties should agree. It exposes divergence,
links relevant sources, drafts alternatives, tests scenarios, and records the
terms each party separately confirms.

## 2. Problem

Two parties can sign the same words while expecting different outcomes.
Ambiguity commonly remains hidden in performance standards, measurements,
remedies, liability allocation, evidence duties, governing law, and dispute
procedure. The disagreement becomes visible only after performance fails, when
lawyers must reconstruct both the contract and the parties’ assumptions.

## 3. Product Thesis

> **ZIAAP makes the contract itself the beginning of the dispute-resolution system.**

The service creates a persistent, source-linked contract state before signature.
That state records agreed meaning, obligations, formulas, remedies, evidence
requirements, authority boundaries, and unresolved caveats so later events do
not require reconstruction from zero.

## 4. Reference Scenario

The seeded case is a cross-border SaaS draft between:

- **Helvetia Cloud AG**, a Swiss supplier; and
- **Northstar Retail Ltd**, a UK customer.

The prototype aligns three topics:

1. 99.5% uptime, evidence hierarchy, and a stepped service-credit formula;
2. consequential-loss treatment and liability caps; and
3. governing law, arbitral seat, rules, and proceeding language.

The selected fixture architecture uses Swiss substantive law, Zurich seat,
Swiss Rules, one arbitrator, and English proceedings, while reserving mandatory
laws that may apply irrespective of party choice.

## 5. Hackathon Workflow

```text
Draft contract
→ independent party profiles
→ alignment matrix
→ scenario and consequence test
→ agreed clause language
→ separate bilateral confirmation
→ Alignment Annex and structured contract state
→ compact future-outage preview
```

The future preview proves only that confirmed state can calculate one mechanical
service credit and isolate one residual causation question for human review.

## 6. Authority Model

| Class | System treatment | Authority |
| --- | --- | --- |
| Administrative | Extract, organise, compare, link, version, and record | System may execute within defined rules |
| Mechanical | Apply disclosed formula to confirmed inputs | Deterministic code; disputed inputs block execution |
| Advisory | Explain consequences and draft alternatives | Parties or qualified professionals decide |
| Adjudicative | Structure competing positions and evidence | Authorised human determines |

Humans intervene at consent and legal-authority points, not after every routine
AI action.

## 7. Required Outputs

- independent party intent profiles;
- source-linked Alignment Matrix;
- three divergence findings;
- clause options and scenario consequences;
- separately confirmed final language;
- Alignment Annex;
- structured contract state and ledger;
- deterministic future service-credit result; and
- residual human-review packet concerning gross negligence and the liability limitation.

## 8. Legal Boundaries

- ZIAAP compares legal configurations; it does not merge Swiss and English law.
- Parties select governing law, seat, rules, language, and final terms.
- AI does not declare a clause enforceable or provide a binding legal conclusion.
- Unresolved mandatory-law questions are visibly routed to qualified review.
- Demonstrative confirmations are not production electronic signatures.
- Adjudicative authority remains human-owned.

## 9. Scope Exclusions

The MVP excludes general uploads, arbitrary contracts, broad legal research,
authentication, production signatures, persistent multi-tenant storage,
performance monitoring, a complete settlement workflow, complete arbitration,
autonomous adjudication, multiple jurisdictions beyond the seeded comparison,
and Council-of-LLMs orchestration.

The former full post-dispute workflow is roadmap context. It is not a second live
product in this hackathon build.

## 10. Success Criteria

The prototype succeeds when judges can see that:

1. both parties independently state and confirm expectations;
2. semantic, commercial, and legal divergence is visibly separated;
3. every material finding has provenance and uncertainty;
4. the system never selects the final legal architecture;
5. exact clause versions require separate confirmation by both parties;
6. editing confirmed language invalidates prior confirmations;
7. the Alignment Annex records shared meaning and unresolved caveats;
8. 99.2% uptime produces a reproducible CHF 1,500 service credit from the accepted state;
9. the gross-negligence limitation question remains reserved for a human; and
10. the complete story is demonstrable in three minutes without network access.

## 11. Charter Statement

> ZIAAP reveals where parties expect different outcomes before they sign,
> supports them in selecting explicit contractual language, and preserves that
> shared meaning as a source-linked legal state. Automation follows legal effect;
> consent remains bilateral; adjudication remains human-owned.
