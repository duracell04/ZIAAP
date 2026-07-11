# Council of LLMs Concept

> **Supporting ideas appendix — not a build specification or committed hackathon scope.**

This appendix records a possible role-based, multi-model reasoning architecture
for future evaluation. The authoritative MVP remains defined by the seven
numbered documents, especially the Product Requirements. Nothing here requires
the prototype to use multiple providers, implement every role, or expose a
council workspace in the live demo.

## 1. Concept

The Council of LLMs is a role-based arbitration reasoning system, not a vote in
which several models compete and one answer wins.

```text
Case documents
   ↓
Evidence Clerk
   ↓
Contract / Clause Analyst
   ↓
Claimant-side Counsel Model
   ↓
Respondent-side Counsel Model
   ↓
Neutral Tribunal Analyst
   ↓
Procedural Safeguard / Red Team
   ↓
Human Review Packet + Case Ledger
```

The system decomposes legal reasoning into institutional roles. Its output is
not an automated award, but an arbitration-ready reasoning record for human
review.

## 2. Possible Workspace Output

A document bundle could be transformed into a structured workspace containing:

1. facts;
2. evidence;
3. claims;
4. defences;
5. contract clauses;
6. AI extractions;
7. AI inferences;
8. contested propositions;
9. missing evidence;
10. a settlement proposal;
11. human-review issues; and
12. an arbitration-ready report.

The interface should display the shared case state rather than raw model chat
messages. This keeps the product aligned with legal infrastructure rather than
a chatbot metaphor.

## 3. Institutional Roles

### 3.1 Evidence Clerk

Extracts parties, dates, amounts, clauses, correspondence, invoices, SLA data,
accepted and disputed facts, and missing documents.

**Interface status:** AI extraction.

### 3.2 Contract Analyst

Identifies obligations, breach conditions, notice requirements, limitation
clauses, remedies, arbitration provisions, payment terms, and SLA formulas.

**Interface status:** AI legal analysis / preliminary interpretation.

### 3.3 Claimant Counsel

Builds the strongest claimant position, including its theory, supporting facts
and clauses, damages theory, evidence strength, weaknesses, and missing support.

**Interface status:** party-position simulation.

### 3.4 Respondent Counsel

Builds the strongest respondent position, including defences, contractual
limitations, causation and evidence objections, alternative interpretations,
settlement leverage, and weaknesses.

**Interface status:** party-position simulation.

### 3.5 Neutral Tribunal Analyst

Compares both sides and proposes an issue tree, the strongest arguments for each
side, unresolved factual questions, legal uncertainty, possible outcomes,
human-review points, and a draft non-binding reasoning memorandum.

**Interface status:** AI inference / proposed disposition.

Use **proposed disposition**, never “AI decision.” The output has no independent
adjudicative effect.

### 3.6 Procedural Safeguard / Red Team

Checks for:

- unsupported conclusions;
- unfair asymmetry between the parties;
- missing source citations;
- overconfident language;
- AI inference presented as fact;
- human-only authority mistakenly automated; and
- settlement material leaking into merits reasoning.

**Interface status:** procedural safeguard.

This role is particularly valuable because it tests the system against the
project’s procedural and authority boundaries before human handover.

## 4. Illustrative Provider Allocation

The following is an experiment hypothesis, not a fixed architecture:

| Provider | Possible role |
| --- | --- |
| OpenAI | Evidence extraction, structured data, and neutral synthesis |
| Anthropic | Claimant and respondent argument generation |
| Mistral | Contradiction checks, classification, and red-team review |
| OmniLex | Legal source retrieval and authority grounding |

The interface should emphasize institutional roles—Evidence Clerk, Contract
Analyst, Claimant Analysis, Respondent Analysis, Neutral Synthesis, and
Procedural Safeguard—rather than provider brands. A later technical evaluation
should determine whether multiple providers add enough quality and resilience
to justify latency, orchestration complexity, and cost.

## 5. Shared Case State

All roles should read from and write structured outputs into one shared case
state rather than passing uncontrolled prose between models.

```ts
type CaseState = {
  matter: {
    id: string
    title: string
    stage:
      | "I0_CONTRACT_ALIGNMENT"
      | "P0_PERFORMANCE"
      | "I1_DISPUTE_STRUCTURING"
      | "MS_RESOLUTION"
      | "I2_RESIDUAL_CASE"
      | "I3_HUMAN_DETERMINATION"
  }
  parties: Party[]
  documents: DocumentRecord[]
  facts: FactRecord[]
  clauses: ClauseRecord[]
  claims: ClaimRecord[]
  defences: DefenceRecord[]
  evidence: EvidenceRecord[]
  issues: IssueRecord[]
  councilOutputs: CouncilOutput[]
  settlement: SettlementState
  authorityMatrix: AuthorityRecord[]
  ledger: LedgerEvent[]
}
```

This sketch is conceptual. The Technical Requirements document must define the
actual types, validation rules, provenance model, and orchestration contract if
the idea enters implementation scope. Stage names follow the non-normative
[Full Contract-to-Resolution Vision](full-lifecycle-vision.md). The hackathon
prototype now implements a narrow `I0_CONTRACT_ALIGNMENT` slice; Council
orchestration remains outside scope.

## 6. Optional Council Reasoning Workspace

One possible central screen could contain:

- **Left:** case navigation;
- **Center:** issue tree, claimant argument, respondent argument, neutral analysis, and safeguard warnings;
- **Right:** source trace, evidence references, and human-review status; and
- **Bottom:** case ledger.

This is an optional presentation concept. It must not displace the six-screen
MVP flow unless Product Requirements are explicitly revised.

## 7. Demonstration Idea: Proposition Lifecycle

A strong demonstration could show one proposition moving through visible legal
and epistemic states:

```text
AI extraction
→ AI inference
→ contested by respondent
→ missing evidence flagged
→ human review required
→ final human decision
```

Example proposition:

> “Supplier breached the SLA by failing to maintain 99.5% uptime.”

| Stage | Example treatment |
| --- | --- |
| AI extraction | SLA report shows 99.2% uptime. |
| AI inference | This may constitute breach under clause 4.2. |
| Respondent contestation | A maintenance window should be excluded. |
| Missing evidence | The scheduled-maintenance notice has not been uploaded. |
| Human review | Required before a breach conclusion can be adopted. |
| Final human decision | The arbitrator accepts or rejects the proposition after reviewing the evidence. |

This lifecycle makes transparency, contestability, uncertainty, provenance,
and human authority visible in one sequence.

## 8. Evaluation Before Adoption

Before moving this concept into the MVP, evaluate whether it materially improves
the three-minute demonstration over a simpler single-model or fixture-backed
workflow. The decision should consider:

- output quality and symmetry;
- source coverage and unsupported-claim rate;
- reproducibility and structured-output reliability;
- total latency and failure recovery;
- provider cost and rate limits;
- complexity added to the UI and narration; and
- whether the procedural-safeguard role catches meaningful errors.

The default remains the simplest architecture that reliably demonstrates the
normative MVP. This council becomes implementation scope only through an
explicit Product Requirements and Technical Requirements update.
