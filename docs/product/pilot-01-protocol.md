# ZIAAP Contract Alignment — Pilot 01 Protocol

**Version:** 1.0

**Decision date:** 2026-07-24, Europe/Zurich

**Status:** Canonical product and validation specification; no pilot activity,
product implementation, legal approval or market evidence is authorised or
created by this document

**Initial product:** ZIAAP Contract Alignment

**Initial domain:** Complex enterprise systems-integration master services
agreements and their statements of work, specifications, schedules and
change-control records

## 1. Decision, purpose and boundary

ZIAAP will pursue one initial commercial wedge:

> **Scenario-based pre-signature alignment for selected high-impact clauses in
> complex enterprise systems-integration MSAs.**

ZIAAP Contract Alignment converts selected clauses into concrete operational
scenarios, collects each party's independent expectations, identifies
materially different outcomes and produces a versioned record of what was
aligned, deliberately left open or incorporated into the contract.

Pilot 01 is specified to test one primary question:

> **Did the ZIAAP workflow expose a commercially material difference in
> expected contractual outcomes that the parties and their advisers had not
> already identified, and was the discovery worth the process cost?**

The current repository remains a C0 synthetic, client-local, resettable concept
demonstrator. This protocol does not implement the workflow, accept confidential
contracts, recruit participants, run retrospective matters, start live shadow
pilots, test prices or confer legal effect.

### Active product hierarchy

| Level | Canonical position | Status |
|---|---|---|
| Category thesis | Computational Private Ordering | Long-term thesis |
| Initial product | ZIAAP Contract Alignment | Sole active commercial wedge |
| Later platform extension | Contract lifecycle memory and event-triggered re-alignment | Deferred until I0 validation |
| Later escalation workspace | Purpose-segregated mediation support | Separate product, engagement and authority |
| Later export | Structured handover to independent counsel, experts, mediators, institutions or tribunals | Per-object authorised export; not AI arbitration |

I0 Flight Plan, I1 Cockpit, I2 Captain in Command and the six matter gates remain
the long-term architecture. Pilot 01 is limited to I0. Mediation is a separate
purpose-bound enclave and does not silently redefine I1.

### Supersession record

The 2026-07-24 product-direction decision supersedes, for current execution:

- the two-wedge comparison between contract alignment and tribunal case
  intelligence;
- mediation, arbitration or a combined lifecycle as the initial sales offer;
- the partner-owned arbitral institution as a canonical near-term plan;
- neutral-professional equity, platform revenue sharing, sales duties or
  outcome-linked economics; and
- wording that implies ZIAAP currently administers or decides disputes.

The earlier research remains available as dated historical input. It is not
deleted or re-presented as product, legal, market or investment evidence.
Computational Private Ordering, lifecycle re-alignment, segregated mediation and
structured arbitral handover remain later hypotheses that require a separate
decision after I0 evidence.

For conflicts between records:

1. this document controls the active product, Pilot 01 scope and validation
   design;
2. the operating model controls the long-term I0–I2 architecture;
3. the glossary and `lib/product-language.ts` control approved terminology and
   public wording; and
4. dated feedback and appendices remain non-normative research history where
   they conflict with the sources above.

## 2. Eligible matter and participant requirements

### Included agreement family

An eligible matter contains one identified version of a complex enterprise
systems-integration MSA and may include its associated:

- statement of work;
- technical specification;
- implementation, acceptance or milestone schedule;
- responsibility matrix;
- service-level schedule; and
- change-request or change-order record.

The three to five selected clauses may concern acceptance and user-acceptance
testing, readiness, milestone completion, customer or vendor dependencies, data
migration, integration responsibility, scope boundaries, change control, delay
attribution, remediation, service levels or credits, efforts standards,
third-party systems, transition or exit.

### Excluded matters

Pilot 01 excludes commodity SaaS terms, general industrial supply, construction,
M&A, financing, digital assets, employment, consumer contracts, active
mediation, active arbitration and active litigation. Industrial supply may be
considered only under a separately approved Pilot 02.

### Matter acceptance record

Before `MATTER_ACCEPTED`, a future authorised pilot must record:

- the exact contract and related-document versions;
- governing language and governing-law metadata without asking ZIAAP to give a
  jurisdiction-specific legal opinion;
- each data supplier's authority and lawful right to provide the material;
- at least one authorised business representative for each party;
- identified transaction counsel responsible for reviewing any proposed clause
  or annex;
- the participant, confidentiality, data-flow, retention and withdrawal terms;
- the approved model/provider/version, permitted purposes and no-training
  controls; and
- the accountable pilot owner, security owner and legal/privacy reviewers.

Missing, expired or conditional approval blocks acceptance. The current C0
environment cannot satisfy this record and must not receive a real contract.

## 3. Conceptual state machine

```text
MATTER_ACCEPTED
→ CLAUSES_SELECTED
→ SCENARIOS_APPROVED
→ RESPONSES_SEALED
→ RESPONSES_CONFIRMED
→ DIVERGENCE_REVEALED
→ RESOLVED | CONSCIOUSLY_OPEN | DEFERRED
→ NON_BINDING_RECORD | INTERPRETIVE_ANNEX | INCORPORATED_TERM
→ VERSION_LOCKED
```

Every transition requires an attributable human act by the authorised role.
Model output is a proposal artifact. It cannot reveal a response, commit
authoritative state, select a disposition, assign legal effect or lock a
version.

| State | Required human act | Exit condition |
|---|---|---|
| `MATTER_ACCEPTED` | Pilot owner accepts the complete eligibility and rights record | One immutable source version and all required approvals are current |
| `CLAUSES_SELECTED` | Both parties approve three to five high-impact clauses | Exact clause text, source location and selection rationale are recorded |
| `SCENARIOS_APPROVED` | Both parties approve five to ten bounded operational scenarios | Actors, trigger, dependency, expected outcome and materiality rationale are inspectable |
| `RESPONSES_SEALED` | Each party independently submits its original answers | Neither party can inspect the other's answer and no unilateral reveal is possible |
| `RESPONSES_CONFIRMED` | Each party accepts, corrects or rejects every AI-normalised representation | Original text remains immutable and each accepted representation is attributable |
| `DIVERGENCE_REVEALED` | Both parties authorise the same comparison release | Material results are disclosed symmetrically; private exploratory text remains private unless separately authorised |
| `RESOLVED` | Both parties approve the recorded operational resolution | Exact approved wording and authority are recorded |
| `CONSCIOUSLY_OPEN` | Both parties acknowledge the open point and its treatment | Reason, operating assumption, review trigger and escalation process are explicit |
| `DEFERRED` | Both parties record that no present resolution is adopted | Owner, deadline or triggering event and default non-binding treatment are explicit |
| `NON_BINDING_RECORD` | Parties approve the output package for negotiation use | No external incorporation evidence is claimed |
| `INTERPRETIVE_ANNEX` | Authorised parties adopt an annex through their external process | ZIAAP records the external act and exact version; the label alone has no effect |
| `INCORPORATED_TERM` | Authorised parties complete the applicable external amendment or execution process | Evidence of the external act is attached to the exact version |
| `VERSION_LOCKED` | Authorised parties approve the package and digest | Contents, statuses, permissions, approvals and superseded predecessors are fixed |

A single matter may contain objects with different adoption levels. A deferred
or consciously open object cannot be relabelled resolved merely because the
matter reaches `VERSION_LOCKED`.

### Proposal, confirmation and reveal rules

- The original party response is immutable and party-authored.
- AI normalisation is stored as a separate derived proposal with model identity,
  provenance and limitations.
- A party may accept, correct or reject the derived proposal before reveal.
- Correction creates a new attributable representation; it never overwrites
  the original response or rejected proposal.
- Comparison uses only party-confirmed representations.
- Both parties receive the same comparison release at the same logical time.
- Material divergence includes different expected outcomes, triggers,
  responsibility allocations, dependencies, remedies or timing.
- The workflow may record alignment, divergence, deliberate openness or
  incompleteness; it must not force every scenario into agreement.

### Failure, withdrawal and version rules

| Condition | Required handling |
|---|---|
| Withdrawal before reveal | Stop the matter; do not reveal the counterparty response; apply the approved retention and deletion schedule |
| Withdrawal after reveal | Stop new processing; preserve only the authorised record required by the pilot charter, law or a valid hold |
| Incomplete bilateral participation | Do not reveal; mark the matter incomplete and exclude it from completed-pilot denominators |
| Missing or disputed authority | Pause all consequential transitions until authority is resolved; otherwise close without adoption |
| Failed or rejected normalisation | Preserve the proposal and disposition; use corrected party text or the original response, never an invented confirmation |
| Stale confirmation | Invalidate affected comparisons, outputs and approvals; require fresh confirmation |
| Source or scenario change | Open a new version; do not mutate or inherit the earlier locked record silently |
| Confidentiality, privilege or security incident | Stop affected work, preserve the incident record, revoke access where required and follow the approved response process |
| Unauthorised reveal or transition | Treat as a hard stop; do not repair the evidence by reconstructing consent after the event |

## 4. Legal-status schedule

Legal effect, record kind, access and permitted use are orthogonal. No single
status label determines admissibility, weight, interpretation, enforceability,
privilege or confidentiality under applicable law.

### Required fields

| Field | Required meaning |
|---|---|
| `recordId` | Stable identifier for the object |
| `recordKind` | The kind of source, proposal, comparison, resolution or adopted record |
| `legalEffect` | `none`, `non_binding`, `interpretive` or `externally_incorporated` |
| `author` | Identified person or system that created the object |
| `actingCapacity` | Party representative, counsel, facilitator, system proposal or other declared role |
| `authorityEvidence` | Evidence and limit of authority; never inferred from account access alone |
| `originalText` | Immutable party-authored or source text where applicable |
| `derivedText` | Separately stored AI-normalised or facilitator-drafted representation |
| `confirmationDisposition` | Pending, accepted, corrected or rejected, with actor and time |
| `permittedUse` | Exact purpose, such as negotiation only; later use requires an independent basis and export decision |
| `confidentialityClaim` | Private, shared, privilege claim or without-prejudice claim; a claim is not a system guarantee |
| `governingVersion` | Contract, scenario, model and protocol versions |
| `effectivePeriod` | Start, end and supersession status where applicable |
| `approvals` | Attributable approvals, external adoption evidence and limitations |
| `provenance` | Sources, generation method, model identity and transformation history |
| `supersedes` | Prior object or version displaced by the current record |

### Record kinds

| `recordKind` | Meaning | Prohibited inference |
|---|---|---|
| `private_exploratory_response` | Party-private draft or working statement | Shared position, admission or agreement |
| `sealed_party_response` | Submitted original response held from the counterparty | Confirmation, disclosure or contractual adoption |
| `disclosed_party_position` | Party-authorised position released through the bilateral reveal | Agreement or objective contractual meaning |
| `ai_normalisation` | Machine-derived representation of a response | Party authorship, accuracy or acceptance |
| `party_confirmed_position` | Representation accepted or corrected by its party | Bilateral agreement or binding amendment |
| `identified_divergence` | Material difference between confirmed positions | Fault, breach or adjudicated interpretation |
| `acknowledged_assumption` | Bilaterally acknowledged operating assumption | Incorporated contractual term unless separately adopted |
| `consciously_unresolved_issue` | Specific open point knowingly preserved with a treatment rule | Accidental omission or hidden agreement |
| `agreed_operating_outcome` | Operational scenario outcome approved by both parties | Legal incorporation without the external act |
| `interpretive_annex` | Exact annex adopted through the parties' external process | Universal admissibility, weight or enforceability |
| `incorporated_contract_term` | ZIAAP record of an externally effective incorporation act | Legal effect created by ZIAAP or its label |

The public promise is limited to this:

> **ZIAAP does not prevent a party from later changing its position. It makes
> the history, consistency, authority and recorded legal status of that
> position inspectable.**

## 5. Neutrality and role charter

| Role | Permitted economics and work | Excluded authority or combination |
|---|---|---|
| ZIAAP OpCo | Owns IP, licenses software, delivers implementation and alignment services, and receives product revenue | No appointment, mediation, evidence assessment, adjudication or award authority |
| Alignment facilitator | Fixed salary or disclosed fee; scopes and operates I0 without choosing party outcomes | Cannot mediate or adjudicate a dispute arising from the same engagement |
| Party business representative | States, confirms and approves that party's operational expectations within recorded authority | Cannot bind the counterparty or assign legal status unilaterally |
| Transaction counsel | Reviews authority, legal wording and any external adoption process for its client | ZIAAP does not replace professional duties or conflict rules |
| Independent mediator | Separate engagement and fixed disclosed professional fee; controls any later mediation process | No outcome-linked fee, automatic access to I0 private material or later adjudicative role under the default design |
| Independent arbitrator | Professional fee under the applicable independent appointment mechanism | No ZIAAP equity, platform revenue share, sales duty, referral commission or compensation affected by ZIAAP use |
| Arbitral institution | Its own institutional and administrative fees, rules, appointment and administration | No OpCo control over appointment, procedure or neutral judgment |

Any later neutral engagement requires separate contracts and invoices,
independent appointment, written disclosures, technical access isolation and
neutral control over whether and how authorised ZIAAP material is used.
Disclosure does not automatically cure an impermissible role or economic
relationship.

## 6. Data, access and retention architecture

### Access domains

```text
Party A private workspace ─┐
                           ├─ authorised comparison service
Party B private workspace ─┘              ↓
                                  bilateral shared record

Operator/security domain ─ metadata and support only

Future mediation enclave ─ separate keys, permissions and retrieval
Future neutral workspace  ─ per-object authorised export only
```

- Party-private drafts and sealed responses are inaccessible to the other party.
- OpCo personnel receive only access necessary for an approved operational or
  security purpose; access is attributable and reviewable.
- Shared results contain only the material authorised for bilateral reveal.
- No model memory, vector index, retrieval store or conversation context is
  shared automatically between alignment, mediation and adjudicative purposes.
- Every later export identifies the object, destination, purpose, authority,
  legal/confidentiality status, governing version and export approver.
- Provider training on pilot material is prohibited unless a later, separately
  approved research purpose and valid rights record expressly authorise it.

### Retention rule

No pilot may begin with an undefined retention policy. Its charter must
separately define content and security-log retention, deletion or cryptographic
sealing, preservation holds, executed-contract records, deletion authority,
verification evidence and re-review triggers. Applicable law, professional
duties and valid party agreements control. Failed mediation content is not
subject to a universal physical-destruction rule.

## 7. Outputs

The version-locked output package contains:

1. **Alignment Matrix** — scenario-level alignment confirmed by the parties;
2. **Divergence Register** — material confirmed differences and their
   disposition;
3. **Conscious Openness Register** — open issues, reasons, operating treatment,
   review triggers and escalation paths;
4. **Revised wording or scenario annex** — exact proposed or externally adopted
   language with status clearly marked;
5. **Legal-status schedule** — every object's record kind, legal effect,
   permitted use and confidentiality claim;
6. **Versioned alignment record** — sources, original and derived text,
   approvals, provenance, digest and supersession links; and
7. **Lifecycle review triggers** — events that should prompt re-alignment or a
   separately governed escalation.

The package is not a legal opinion, proof of true subjective intention,
guarantee of evidentiary treatment or substitute for transaction counsel.

## 8. Validation tracks

This document specifies both tracks and runs neither.

### Track A — retrospective reconstruction

Use five to ten completed systems-integration MSA disputes that are public,
sanitised or otherwise lawfully and contractually available for the exact
research use. For each matter, record whether the protocol could have:

- generated a scenario exposing the ambiguity that later became material;
- distinguished original misalignment from unforeseeable later change;
- produced commercially usable alternative drafting; and
- preserved context that later became expensive to reconstruct.

Every matter requires a rights and consent record, de-identification review,
expert reference and blind scoring where feasible. Track A is exploratory and
does not establish prevention, causation or market demand.

### Track B — future live shadow cohort

Run, only after separate approval, four active systems-integration MSA
negotiations without independent legal effect. Fewer than four completed
matters is Inconclusive for the commercial decision gate. Ordinary negotiation
and counsel review remain controlling; any external incorporation occurs
outside ZIAAP.

## 9. Measurement and decision framework

| Metric | Required observation |
|---|---|
| Material scenarios | Count approved and rejected, with clause and rationale |
| Previously unrecognised divergence | Confirm independently that parties and advisers had not already recorded the difference |
| Divergence disposition | Resolved, consciously open or deferred without collapsing categories |
| Drafting or process change | Exact revised wording or future decision mechanism attributable to the discovery |
| Participation time | Party time from onboarding through confirmation, reported per party and matter |
| Counsel-review time | Review, correction, drafting and authority-verification time |
| Negotiation delay | Calendar and working-time impact attributable to the protocol |
| Usefulness | Role-specific rating plus qualitative reason; never reported as validation alone |
| Willingness to pay or repeat | Stated response distinguished from an authorised paid follow-on commitment |
| Delivery economics | Facilitator, counsel, model, infrastructure, security, support and rework effort |

### Initial management thresholds

A **Go** requires all of the following:

- no unresolved governance hard stop;
- at least two of four Track B matters reveal a previously unrecognised material
  divergence;
- median party participation is below 90 minutes;
- at least half of material divergences produce revised drafting or an explicit
  future decision mechanism; and
- at least one authorised paid follow-on commitment from a design partner for
  a subsequent engagement with the same service/software boundary.

These are management thresholds, not market evidence or a superiority claim.

| Decision | Rule |
|---|---|
| Go | Every threshold passes and no hard stop remains |
| Narrow | A predeclared clause subset or participant segment independently meets every threshold and has no hard stop |
| Refine | No hard stop or data-rights failure exists, but one bounded protocol change and one predeclared retest are needed |
| Hold | A data or authority failure, premature reveal, unauthorised transition, false legal-status assignment, unresolved hard stop or failed retest occurs |

Hard stops also include AI mutation of authoritative state, unilateral reveal,
invented authority evidence, acceptance of stale confirmation, unauthorised data
use, cross-purpose memory or retrieval leakage, and representation that ZIAAP
created legal effect.

## 10. Evidence and approval register

| Record | Initial status |
|---|---|
| Product-direction decision | Approved for strategy on 2026-07-24 |
| Pilot protocol legal-framing review | Pending |
| Privacy and data-flow review | Pending |
| Security architecture and testing | Pending |
| Participant and matter recruitment | Not started; not authorised by this branch |
| Track A rights-cleared matter set | Pending |
| Track A results | Not started |
| Track B pilot charters | Pending; execution not authorised |
| Track B results | Not started |
| Pricing and willingness-to-pay evidence | Not established |
| Usability and workflow evidence | Not established |
| Go, Narrow, Refine or Hold decision | Pending |

No positive result, approval, legal conclusion, security property or commercial
evidence is inferred from this specification.
