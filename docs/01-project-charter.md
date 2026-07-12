# Project Charter

## AI-Native Arbitrator Appointment Service

**Status:** Normative hackathon charter

**Date:** 12 July 2026

**Principal scenario:** Swiss supplier and UK customer negotiating a SaaS agreement

## 1. Purpose

ZIAAP demonstrates how two commercial parties can jointly design their future
dispute-resolution environment while their interests remain aligned. They align
contractual governance, configure an explicit decision constitution, test that
protocol against hypothetical disputes, approve the observed behavior, and
freeze the exact package before a dispute exists.

## 2. Canonical Product Characterisation

> **An AI-native, ZIAAP-powered arbitrator is a human arbitrator legally
> appointed by the parties who conducts proceedings through a jointly
> configured, tested, and version-locked ZIAAP decision protocol.**

The human arbitrator holds legal office, remains independent, owns the final
reasoning, and signs any award. The ZIAAP protocol performs the process
agent-first and may produce a proposed determination with no independent legal
effect.

### 2.1 Canonical Calibration Terminology

> **The parties align with each other, calibrate the AI-native arbitrator’s
> reasoning, validate it through stress tests, and then version-lock the
> approved arbitral runtime.**

The four formation concepts are distinct:

1. **Party alignment:** the parties clarify expectations and identify disagreement.
2. **Arbitral reasoning calibration:** the parties adjust the Constitution,
   reasoning instructions, exemplars, source hierarchy, evidentiary standards,
   uncertainty thresholds, escalation rules, and remedy boundaries.
3. **Stress testing and validation:** hypothetical cases test whether the
   calibrated runtime behaves as intended and observes every safeguard.
4. **Version-locking:** the parties approve and freeze the exact validated
   runtime configuration.

Arbitral reasoning calibration is technically **inference-time protocol
calibration**. It does not modify the underlying model’s weights. The term
**model fine-tuning** is reserved for additional training that changes model
weights and is outside the relationship-specific appointment process.

## 3. Product Thesis

Future dispute cost is partly a governance-design problem. Parties can reduce
later uncertainty by agreeing in advance on:

- contract meaning, formulas, evidence, and remedies;
- law, seat, rules, language, and the human arbitrator;
- interpretation, evidentiary treatment, fairness, commercial values, and discretion;
- escalation, amendment, model identity, tools, and retrieval boundaries; and
- the behavior demonstrated by agreed stress-test validation cases.

This creates a privately designed procedural constitution without pretending
that software itself holds arbitral office.

## 4. Required Lifecycle

```text
G0 Governance Alignment
→ C0 Arbitral Reasoning Calibration
→ T0 Stress Testing and Validation
→ A0 Freeze, Bilateral Approval, and Human Appointment
→ D0 Later Dispute Bound to the Frozen Hash
→ S0 Optional Sealed Settlement Facilitation
→ P0 Provisional Protocol Determination
→ H0 Independent Human Decision and Signature
```

Alignment is not mediation. Settlement Facilitation begins only after a dispute,
is voluntary and non-binding, and cannot impose an outcome. Arbitration is
adjudicative and ends only through a human-issued decision or a valid settlement.

## 5. Authority Model

| Class | Protocol activity | Legal effect |
| --- | --- | --- |
| Administrative | Extract, organise, compare, link, version, hash, and record | No independent legal effect |
| Mechanical | Apply a disclosed formula to confirmed inputs | Reproducible result; disputed inputs block authority |
| Advisory | Explain, draft, propose options, and facilitate settlement | Non-binding until adopted by the competent actor |
| Adjudicative assistance | Structure the record, reason under the frozen constitution, and propose a determination | Provisional only; the human arbitrator independently decides and signs |

## 6. Prototype Outputs

- Contract Governance Alignment Annex;
- versioned Arbitrator Constitution;
- four-case Stress-Test Validation Report with bilateral behavior approval;
- canonical SHA-256 protocol manifest;
- simulated Appointment Record and human acceptance;
- hash-bound later dispute record;
- optional sealed non-binding settlement proposal;
- provisional ZIAAP determination; and
- independently reasoned, simulated human award record.

## 7. Legal and Product Boundaries

- Never describe software alone as the appointed arbitrator.
- Never describe a proposed determination as an award or binding decision.
- Never let model confidence bypass evidence, mandatory law, objections, or human judgment.
- Never substitute a different model, prompt, retrieval pack, tool policy, or engine under an existing hash.
- Settlement content stays sealed from merits reasoning unless the parties execute a settlement or validly agree otherwise.
- The human arbitrator cannot rubber-stamp the protocol output; assessment, review, reasons, and signature are separate recorded acts.

## 8. Scope Lock

The MVP uses one seeded contract, one fictional human arbitrator, one declared
model identity, four stress-test cases, one later outage, one settlement
proposal, and one award preview. It excludes production signatures,
authentication, persistence, private caucuses, a mediator persona, arbitrary
contracts, institutional administration, production awards, and multi-model
Council orchestration.

## 9. Success Criteria

The prototype succeeds when a reviewer can see that:

1. parties align contract governance separately from protocol appointment;
2. every behavior-affecting edit creates a new version and clears approval;
3. stress-test validation covers mechanical correctness, disputed evidence, mandatory law, and party symmetry;
4. the exact package is hashed and separately approved;
5. the human arbitrator accepts the mandate and disclosure duties;
6. a later dispute cannot run under a mismatched appointment;
7. settlement activates only by bilateral consent and remains sealed;
8. the protocol proposal has no independent legal effect; and
9. only an independently reasoned human decision can be signed.
