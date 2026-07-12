# Council of LLMs Concept

> **Future evaluation appendix — not current implementation scope.**

## 1. Relationship to the AI-Native Arbitrator

A future Council may implement internal roles inside a version-locked ZIAAP
decision protocol. It does not become a panel of legal arbitrators and does not
replace the appointed human arbitrator.

```text
Frozen constitution and shared case state
→ Evidence Clerk
→ Contract Analyst
→ Claimant Argument Tester
→ Respondent Argument Tester
→ Neutral Synthesis
→ Procedural Safeguard / Red Team
→ Proposed determination
→ Independent human arbitrator review and award
```

The public interface should emphasize institutional functions rather than
provider brands or raw model chat.

## 2. Candidate Roles

| Role | Function | Required status |
| --- | --- | --- |
| Evidence Clerk | Extract and classify source-linked material | AI extraction; correctable |
| Contract Analyst | Map clauses, obligations, formulas, and remedies | Preliminary legal analysis |
| Claimant Tester | Produce the strongest claimant case and weaknesses | Party-position simulation |
| Respondent Tester | Produce the strongest defence and weaknesses | Party-position simulation |
| Neutral Synthesis | Compare arguments and propose issue reasoning | Proposed determination only |
| Procedural Safeguard | Test sources, symmetry, settlement leakage, and human escalation | Safeguard report |

No role may issue or sign an award.

## 3. Shared-State Requirements

All roles must consume the same frozen manifest and structured case state. Each
output records role, provider/model version, prompt version, sources, uncertainty,
objections, and protocol hash. Uncontrolled prose handoffs and undisclosed model
substitution are prohibited.

Settlement agents must run in a separate state and model context. Merits roles
may receive only permitted status information or an executed settlement.

## 4. Evaluation Before Adoption

Before Council orchestration enters scope, measure:

- source coverage and unsupported-claim rate;
- party-label symmetry;
- counterargument quality;
- safeguard detection and settlement non-leakage;
- reproducibility under a fixed manifest;
- latency, cost, provider resilience, and failure recovery;
- whether multiple roles improve human independent review; and
- whether added complexity can be explained without suggesting multiple AI judges.

Adoption requires explicit changes to Product and Technical Requirements, new
calibration cases, a new manifest version, and fresh bilateral approval.
