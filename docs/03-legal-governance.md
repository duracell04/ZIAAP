# Legal Governance

## Full-Lifecycle Authority, Consent, and Procedural Safeguards

**Status:** Normative governance specification; current implementation remains the
I0-first hackathon slice

**Principal legal framework:** Swiss law

**Comparative framework:** International arbitration standards and EU law where
territorially applicable

**Legal-status date:** 11 July 2026

> **The AI prepares and structures. The parties control commercial decisions.
> Lawyers verify consequential legal analysis. Human arbitrators decide
> disputes.**

This document converts the project's legal opinion into product and process
rules. It is not advice on a particular dispute, arbitration agreement,
representative mandate, settlement, professional retainer, or data-processing
arrangement. Governing law, seat, incorporated rules, territorial application,
authority instruments, and current legal status must be checked for each
deployment.

## 1. Governing Principle and Product Characterisation

Automation depends on legal effect and reserved authority, not model confidence.
Technical capability does not create legal personality, professional mandate,
corporate authority, arbitral office, or power to bind a party.

ZIAAP is an:

> **AI-assisted commercial dispute-resolution decision-support and
> process-structuring system.**

The system may organise, calculate, analyse, recommend, and draft. It may not
silently transform an assertion into a fact, a recommendation into a decision,
a calculation into legal entitlement, or a proposal into a binding settlement.

## 2. Sources of Legal and Procedural Authority

Every consequential action must identify the instrument and actor from which its
effect derives. The applicable hierarchy is:

| Source class | Function |
| --- | --- |
| Binding law | Statutes, treaties, and applicable binding judgments set mandatory boundaries. |
| Contractual allocation | The substantive contract, platform terms, processing terms, arbitration agreement, settlement agreement, and procedural agreements allocate authority subject to mandatory law. |
| Incorporated rules | Institutional or ad hoc rules bind only within the scope in which the parties or tribunal adopted them. |
| Professional duties | Duties of lawyers and arbitrators govern their own review, independence, secrecy, competence, and responsibility. |
| Recognised practice | Arbitral, evidentiary, and AI-governance guidance informs defensible process design but does not displace governing law. |
| Product control | ZIAAP safeguards implement the preceding sources and may be stricter than their legal minimum. |

Platform terms cannot create corporate or arbitral authority against a
non-consenting actor. The system must not merge Swiss and English law, invent a
hybrid legal system, or autonomously select governing law, seat, rules, or
language. Mandatory constraints remain separate from party-selected
architecture. [A1, arts. 116-117, 176-194; A2, arts. 353-399]

## 3. Four Authority Classes

| Class | Permitted system activity | Legal effect and adoption rule | Escalation boundary |
| --- | --- | --- | --- |
| Administrative | Receive, extract, index, classify, organise, build chronologies, link sources, and record status. | No independent legal effect. Originals remain preserved; transformations must be traceable, reversible, and correctable. | Escalate when classification resolves a disputed premise or changes a legal or procedural consequence. |
| Mechanical | Reproduce an agreed contractual or procedural formula using identified inputs. | Authoritative only to the extent the formula and inputs are accepted or lawfully determined and the implementation is verified. A correct result using disputed inputs is a scenario, not an entitlement. | Block a single authoritative result when any material formula, input, unit, period, exclusion, or rounding rule is disputed. |
| Advisory | Identify ambiguity, summarise arguments, research law, expose gaps, propose interpretations, draft documents, and recommend settlement terms. | Non-binding draft. Effect arises only through informed review and adoption by the competent party, lawyer, or tribunal. | Require qualified review for consequential legal analysis and human decision for contested rights. |
| Adjudicative | No autonomous role. AI may provide disclosed research, organisation, calculation, and drafting assistance. | Jurisdiction, procedure, evidence, credibility, disputed facts, law, liability, damages, costs, remedies, and awards remain human acts. | Always reserved to the appointed human tribunal or other legally authorised decision-maker. |

## 4. Consolidated Authority Matrix

| Activity | AI system | Commercial party / representative | Qualified lawyer | Human arbitrator | Result |
| --- | --- | --- | --- | --- | --- |
| Document extraction and chronology | Prepare and source-link | Correct or contest own material | Verify where consequential | Assess if relied on | Organisational aid, not evidence by itself |
| Fact classification | Label assertion, agreement, dispute, absence, or inference | Confirm, correct, object, and submit contrary evidence | Review legal significance | Determine disputed fact | No fact established solely by AI classification |
| Contractual calculation | Apply versioned formula and show scenarios | Confirm or dispute premises | Review legal meaning where material | Decide disputed premises | Computation; entitlement comes from accepted or decided premises |
| Legal research and interpretation | Retrieve, compare, and draft | State position and instructions | Verify and adopt consequential analysis | Decide contested law and meaning | Advisory until adopted by the competent human |
| Settlement proposal | Generate labelled options | Independently review and respond | Advise and verify releases or legal consequences | Facilitate only within lawful mandate and safeguards | Non-binding invitation to negotiate by default |
| Settlement acceptance and execution | Record declarations and frozen text | Authorised representatives accept and execute | Verify authority, form, and final terms where required | Record consent award if properly requested and empowered | Binding only if formation, authority, form, and validity requirements are met |
| Evidence assessment | Compare and flag inconsistencies | Challenge and provide evidence | Make submissions | Determine admissibility, weight, and credibility | Tribunal responsibility |
| Award drafting | Assist with language or structure if authorised | Receive procedural disclosure where required | Support submissions, not decision | Independently reason, verify, adopt, decide, and sign | Award is exclusively the tribunal's act |
| Award issuance | No role | No unilateral role | No role | Issue and sign | Final adjudicative act |

Swiss-seated international arbitration requires equality and the right to be
heard and leaves evidentiary and merits determinations to the tribunal within its
mandate. Comparable rules apply to domestic arbitration. [A1, arts. 182-190;
A2, arts. 373-393; A8, arts. 19, 27, 32-34]

## 5. Party Authority, Consent, and Bilateral Confirmation

Each party controls its own factual submissions, corrections, confirmations,
admissions, commercial risk tolerance, proposals, settlement decisions,
waivers, releases, and execution through an appropriately authorised person.
Authentication or account access does not itself prove representative authority.

The system must record as separate acts:

1. acceptance of platform terms and data-processing notices;
2. consent to participate in a process;
3. confirmation or correction of a factual statement;
4. approval of a formula or calculation input;
5. authority to transmit a notice, admission, or proposal;
6. commercial approval of a negotiated outcome;
7. contractual acceptance of the exact final terms;
8. waiver or release; and
9. signature or other legally required execution.

The interface must use distinct controls and legal text for those acts. Silence,
profile completion, continued use, or clicking a general-purpose control must
not be treated as consent to a consequential act.

### 5.1 Current I0 Bilateral Confirmation Protocol

- Each clause has a stable topic and integer version.
- Confirmation records the party and exact version.
- Agreement exists in the demo only when both parties confirm the same version.
- Editing language increments the version and clears prior confirmations.
- The final annex requires bilateral confirmation of every included clause.
- Demo confirmations record process state; they are not electronic signatures
  and do not independently prove a legally binding contract.

### 5.2 Representative Authority

Before a settlement, release, waiver, arbitration agreement, or material external
communication, the system must verify authority proportionate to the act and
record its basis, scope, conditions, validity period, and any collective-signature
requirement. Relevant evidence may include register entries, organisational
authority, a power of attorney, or a transaction-specific corporate approval.
The authority record must distinguish authority to negotiate, make proposals,
accept a settlement, sign a release, and conclude an arbitration agreement; none
may be inferred from another.
Swiss representation rules distinguish acts by authorised representatives from
acts without authority; a mandate requires special authority for settlement and
arbitration acts. [A3, arts. 32-40 and 396(3)]

## 6. Mechanical Calculations

Every material calculation must expose:

- the exact formula and formula version;
- each input, unit, period, source, and confirmation status;
- exclusions, assumptions, thresholds, and rounding rules;
- engine version and reproducible steps; and
- whether the result uses agreed, asserted, disputed, or tribunal-determined
  premises.

Where premises differ, the system must show labelled party scenarios and, where
possible, an agreed-facts-only scenario. It must not label an amount as due merely
because arithmetic is correct.

The current I0 outage preview remains unchanged: accepted inputs produce the
contractual CHF 3,000 service credit. A disputed input blocks an authoritative
result, and the CHF 60,000 consequential-loss claim remains for human review
because causation, classification, evidence, and legal effect are unresolved.

## 7. Consequential Legal Review

AI legal research, interpretation, drafting, and recommendations have no
independent legal effect. Qualified human legal review is required before
adopting a consequential conclusion concerning:

- jurisdiction, governing law, seat, rules, or limitation periods;
- mandatory law, enforceability, regulatory constraints, or professional duties;
- disputed contract meaning, evidence, causation, liability, or damages;
- remedies, costs, notices, admissions, waivers, releases, or final submissions;
  and
- settlement validity, authority, form, enforcement, or tax and regulatory
  consequences.

Effective review requires original-source access, current-law verification,
counterargument, correction authority, and recorded adoption of the particular
output and scope. A generic approval is insufficient. Swiss lawyers remain
responsible for professional care, independence, and secrecy in work they adopt.
[A5, arts. 12-13; A3, arts. 394 and 398]

## 8. Human Arbitral Authority and Non-Delegation

The arbitrator may use authorised AI assistance for document organisation,
chronology, legal research, argument comparison, calculations, and drafting.
The arbitrator must personally determine jurisdiction, procedure, admissibility
and weight of evidence, credibility, disputed facts, applicable law, contract
meaning, liability, damages, costs, remedies, and the reasoning and operative
part of the award.

AI may not hold arbitral office, deliberate in place of the tribunal, determine
the outcome, communicate a purported decision, or issue or sign an award. The
tribunal remains responsible for every adopted conclusion. Use of assistance
must also respect independence, confidentiality, party equality, the right to be
heard, applicable disclosure requirements, and the tribunal's procedural order.
[A1, arts. 180, 182, 184, 187, 189-190; A8, arts. 19, 27, 34; A9, arts. 20-24,
35-38]

## 9. Settlement Formation and Execution

Every system-generated proposal must be labelled:

> **System-generated, non-binding settlement proposal**

It is an invitation to negotiate unless an expressly agreed mechanism lawfully
provides otherwise. Acceptance of platform terms or procedural rules is not
acceptance of a settlement. A binding private settlement requires:

1. sufficiently definite final terms;
2. concordant assent to the same frozen version;
3. valid authority for every representative;
4. compliance with statutory and contractual form requirements;
5. absence of invalidating defects of consent; and
6. reliable evidence of execution.

The workflow must proceed through proposal, independent party review, separate
responses, final-term reconciliation, execution, and recorded legal effect. Any
material edit reopens review and acceptance. Swiss contract formation,
interpretation, form, defects of consent, and representation are governed in
particular by the Swiss Code of Obligations. [A3, arts. 1-2, 11-18, 23-31,
32-40]

Where written form and signature are required, the system must apply the
relevant rule. Under Swiss law, a qualified electronic signature with a
qualified electronic time stamp is generally equivalent to a handwritten
signature, subject to statutory or agreed exceptions. Other clicks and platform
confirmations must not be described as qualified signatures. [A3, art. 14(2bis);
A4]

A private settlement is not automatically an enforceable title or arbitral
award. Any consent-award, court-record, debt-acknowledgement, security, or other
enforcement strategy requires separate legal review in likely enforcement
jurisdictions. Blind matching or automated settlement is prohibited unless a
specific, reviewed agreement defines the mechanism, authority, revocation,
error, final terms, and binding effect.

## 10. Settlement, Merits, Privilege, and Deliberation Firewall

Swiss law does not supply a universal automatic "without prejudice" protection
for every commercial negotiation. Confidentiality and non-use protections must
therefore be created through applicable agreements, institutional or mediation
rules, procedural orders, professional secrecy, and technical controls.

The architecture must maintain separate purpose and access domains for:

1. merits submissions and evidence;
2. settlement proposals, ranges, concessions, and facilitator communications;
3. privileged legal advice and party strategy;
4. procedural audit information;
5. tribunal-assistance materials and deliberations; and
6. security and enforcement records.

Settlement content may enter the merits record only under an identified legal or
agreed exception, with notice and a human ruling where disputed. The central
ledger should store sealed references or event proofs rather than protected
substance. By default, only the final executed settlement—or information
necessary to determine a dispute about its formation, validity, or performance—
may enter a later merits process, unless the parties validly agree otherwise.
The present hackathon does not implement negotiation; these are mandatory
controls for any later settlement module. [A6, arts. 3-6, 26-28, 34-38; A10,
art. 9(2)]

## 11. Evidence, Provenance, and Epistemic Controls

The system must keep distinct:

- original evidence;
- extracted text or structured data;
- party assertions;
- agreed facts;
- disputed facts;
- missing information;
- AI-generated inferences;
- legal analysis; and
- deterministic calculations.

Original documents remain the evidence. A ledger entry, extraction, summary, or
model output does not make its underlying proposition true. Every material
output must expose its source and relevant passage, submitter, epistemic type,
procedural and evidence status, AI involvement, human-review status, authority
class, version, corrections, objections, and adoption or rejection. An AI
inference must never visually resemble an established fact.

## 12. Equality, Notice, and Contestability

Every party affected by a material output must receive intelligible notice and a
reasonable opportunity to:

- access relevant sources and understand how the proposition will be used;
- correct extraction errors and factual records;
- challenge classifications, inferences, calculations, and legal assumptions;
- dispute formula inputs and provide contrary evidence or authority;
- identify missing context, confidentiality, or privilege concerns;
- record an objection and receive its procedural disposition; and
- request review by the competent human.

Controls and information must be symmetrical unless a lawful procedural basis
requires otherwise. After tribunal constitution, equal treatment and the right
to be heard are mandatory in Swiss arbitration. A material, undisclosed AI
proposition must not influence the tribunal's decision. Because procedural
objections may need to be raised promptly to avoid waiver, the interface must
identify the output under review, state any applicable response period, and
preserve the objection and its time. [A1, art. 182(3); A2, art. 373(4); A8,
arts. 19 and 32]

## 13. Mandatory Human Escalation and Safe Failure

Escalation must be triggered by legal effect, absent authority, material contest,
evidentiary uncertainty, or professional and procedural consequence. Hard
triggers must be deterministic and must not depend solely on the model whose
output is under review.

The system must block automation and route the matter to the competent human for:

- disputed material facts or contract meaning;
- missing decisive evidence, credibility, or evidentiary weight;
- jurisdiction, applicable law, limitation, or conflicting legal authority;
- privilege, confidentiality, settlement leakage, or data-protection risk;
- causation, consequential loss, liability, damages, costs, or remedies;
- missing or uncertain representative authority;
- settlement formation, validity, release scope, form, or enforceability;
- unverifiable or obsolete sources, inconsistent calculations, or failed
  mandatory checks;
- a material objection by either party; and
- any attempted adjudicative output.

Safe failure preserves the last valid state, marks the unresolved issue, prevents
misleading adoption, and creates a source-linked human-review packet. Model
confidence never overrides a hard escalation trigger.

## 14. Audit Ledger

The ledger must let an independent authorised reader reconstruct source,
version, actor, authority, notice, response, correction, review, adoption,
override, escalation, and final human decision. Each event records what it
evidences and what it does not.

At minimum, record document and output identifiers, versions, formula and engine
or model identifiers, actor and role, authority basis, authentication method,
timestamp, notice, objection, correction, approval or rejection, execution, and
handover. Protect integrity through append-only or equivalently tamper-evident
controls, access logging, exportability, and tested retention rules.

Do not place privileged advice, settlement ranges and concessions, party
strategy, tribunal deliberations, hidden model reasoning, or irrelevant
behavioural telemetry in the operational ledger. Use sealed references where
the existence or integrity of protected material must be proved.

## 15. Responsibility and Liability

Responsibility follows control, undertaking, and adoption:

| Actor | Primary responsibility |
| --- | --- |
| Provider | System performance, tested calculations, security, accurate capability and limitation disclosures, change control, and promised service quality. |
| Service operator | Proper process administration, identity and permission controls, notices, escalation, segregation, and incident handling. |
| Parties and representatives | Accuracy of their submissions, commercial instructions, and evidence of representative authority. |
| Qualified lawyers | Professional verification and consequential legal advice or submissions they adopt. |
| Human arbitrators | Personal exercise of the arbitral mandate, procedural fairness, independent reasoning, and the award. |
| Model, hosting, and subservice providers | Their contractual and applicable regulatory responsibilities, without displacing the deploying provider's or operator's duties. |

Disclaimers do not replace appropriate safeguards, professional review, secure
design, or the personal exercise of an arbitral mandate. AI involvement does not
itself invalidate a settlement or award; risk arises from defects such as absent
consent or authority, unequal treatment, inability to present a case,
non-disclosure, improper delegation, excess of mandate, defective constitution,
or public-policy incompatibility. [A1, art. 190(2); A11, art. V]

## 16. Data Protection, Confidentiality, and Security

Controller, joint-controller, and processor roles must be allocated functionally
for each purpose, not merely by contract label. Case data must be processed for
specified purposes, minimised, accurate, secured, and retained only as long as
necessary. The design must include:

- role- and matter-based least-privilege access and strong authentication;
- encryption in transit and at rest with domain separation for protected stores;
- processor and subprocessor controls, confidentiality duties, and audit rights;
- documented cross-border transfer mechanisms and onward-transfer controls;
- retention, litigation-hold, export, correction, deletion, and incident rules;
- protection for employee, witness, special-category, criminal-allegation, and
  commercially confidential information; and
- exclusion of dispute data from general model training by default.

The Swiss FADP applies to personal data of natural persons in scope; GDPR and EU
transfer requirements may additionally apply where their territorial tests are
met. Data-protection impact assessment and privacy-by-design review are required
where the applicable risk threshold is reached. [A7, arts. 6-9, 16, 19,
21-25; A12, arts. 3, 5, 9-10, 22, 24-36, 44-49]

## 17. AI-Regulatory Classification and Change Control

As of 11 July 2026, Switzerland has no overarching AI-specific statute. Existing
contract, arbitration, professional, data-protection, confidentiality, and other
sectoral law continues to apply. Switzerland signed the Council of Europe AI
Convention on 27 March 2025, and a consultation draft for its domestic
implementation is planned by the end of 2026. [A13; A14]

EU AI Act coverage depends on territorial nexus and each module's actual intended
purpose. An arbitrator-facing system intended to assist substantive application
of law in legally binding alternative dispute resolution presents the clearest
potential Annex III high-risk case; narrow preparatory or administrative tools
must be assessed separately, including any Article 6(3) exclusion and its
documentation requirements. Final human responsibility does not by itself remove
all regulatory obligations. [A15, arts. 2, 6 and Annex III point 8(a)]

The Council approved the 2026 AI Act simplification regulation on 29 June 2026,
including fixed delayed application dates, but Official Journal publication,
entry into force, corrections, and final guidance must be rechecked before those
new dates are relied upon. [A16]

Maintain a module-level register of intended purpose, provider/deployer roles,
territorial analysis, risk classification, training-data use, human oversight,
and applicable obligations. Reassess it after any change to purpose, model,
workflow, user group, decision effect, jurisdiction, or law.

## 18. Lifecycle Control Gates

| Stage | Required gate | Block or escalation condition |
| --- | --- | --- |
| I0 contract alignment | Independent party profiles, versioned language, bilateral confirmation, sources, and caveats | Different versions, missing source, inferred consent, or unresolved mandatory-law issue |
| P0 performance | Verified source and measurement method | Contested measurement, exclusion, or data integrity |
| I1 dispute structuring | Separated assertions and inferences; correction and objection rights | Material factual dispute, missing decisive evidence, or source failure |
| MS settlement | Settlement firewall, non-binding labels, authority, frozen final terms, and execution proof | Merits leakage, authority gap, unmatched terms, unresolved form or validity issue |
| I2 residual case | Source-linked party positions and human-review packet | Unanswered material objection, privilege issue, or unequal access |
| I3 human determination | Valid tribunal mandate, fair procedure, independent review, and human issuance | Delegated adjudication, undisclosed material AI use, inability to respond, or defective award act |

These gates define future-safe architecture. They do not mean the hackathon
implements performance monitoring, dispute intake, settlement, arbitration
administration, or adjudication. The authoritative current build remains the
narrow `I0_CONTRACT_ALIGNMENT` slice defined by the [Service Blueprint](02-service-blueprint.md),
[Product Requirements](04-product-requirements.md), and
[Technical Requirements](06-technical-requirements.md).

## 19. Prohibited Claims and Interface States

The product, documentation, prompts, and generated material must not describe
ZIAAP as:

- an AI judge or autonomous arbitrator;
- an autonomous legal adviser or source of binding legal advice;
- a contracting agent with inherent authority;
- a creator of hybrid law or autonomous selector of governing law;
- a system that turns arithmetic into legal entitlement;
- a mechanism that binds parties by silence, general platform assent, or model
  confidence;
- a provider of universal "without prejudice" protection; or
- a guarantor of validity, enforceability, regulatory compliance, or award
  recognition.

Required interface states include **AI extraction**, **party assertion**,
**agreed fact**, **disputed fact**, **AI inference**, **scenario calculation**,
**AI legal analysis**, **non-binding proposal**, **qualified review required**,
and **human decision**.

## 20. Open Legal and Deployment Questions

Before production use, determine and document:

- governing law, seat, applicable institutional rules, and enforcement states;
- whether the service undertaking constitutes regulated legal advice,
  representation, mediation, or institutional arbitration administration;
- each representative's governing company law, register status, collective
  signature, mandate, insurance consent, and transaction limits;
- settlement form, execution, release, tax, enforcement, and consent-award
  requirements;
- privilege, professional secrecy, confidentiality, disclosure, retention, and
  litigation-hold rules in every relevant jurisdiction;
- controller/processor roles, sensitive-data treatment, subprocessors, transfer
  mechanisms, and breach duties;
- module-level EU AI Act classification and applicable dates; and
- the disclosure, consent, confidentiality, security, and non-delegation protocol
  for any tribunal use of AI.

## 21. Authorities

The references below support the operative rules but do not replace a current,
case-specific legal analysis.

- **[A1]** Swiss Federal Act on Private International Law (PILA), SR 291,
  especially arts. 116-117 and 176-194, [Fedlex](https://www.fedlex.admin.ch/eli/cc/1988/1776_1776_1776/en).
- **[A2]** Swiss Civil Procedure Code (CPC), SR 272, especially Part 3,
  arts. 353-399, [Fedlex](https://www.fedlex.admin.ch/eli/cc/2010/262/en).
- **[A3]** Swiss Code of Obligations (CO), SR 220, especially arts. 1-2,
  11-18, 23-40, 97-101, 394, 396, and 398,
  [Fedlex](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en).
- **[A4]** Federal Act on Electronic Signatures (ZertES), SR 943.03,
  [Fedlex](https://www.fedlex.admin.ch/eli/cc/2016/752/en), read with CO
  art. 14(2bis).
- **[A5]** Federal Act on the Free Movement of Lawyers (BGFA), SR 935.61,
  arts. 12-13, [Fedlex](https://www.fedlex.admin.ch/eli/cc/2002/153/en).
- **[A6]** Swiss Bar Association, *Swiss Code of Professional Conduct*,
  1 July 2023, arts. 3-6, 26-28 and 34-38.
- **[A7]** Federal Act on Data Protection (FADP), SR 235.1, especially
  arts. 6-9, 16, 19 and 21-25,
  [Fedlex](https://www.fedlex.admin.ch/eli/cc/2022/491/en).
- **[A8]** Swiss Rules of International Arbitration, June 2021, especially
  arts. 16(3), 19, 27 and 32-34,
  [Swiss Arbitration Centre](https://www.swissarbitration.org/centre/arbitration/arbitration-rules/).
- **[A9]** ICC Rules of Arbitration, in force 1 June 2026, especially arts.
  20-24 and 35-38,
  [International Chamber of Commerce](https://iccwbo.org/dispute-resolution/dispute-resolution-services/arbitration/rules-procedure/2026-arbitration-rules/).
- **[A10]** IBA Rules on the Taking of Evidence in International Arbitration,
  17 December 2020, especially arts. 3-9,
  [International Bar Association](https://www.ibanet.org/resources).
- **[A11]** Convention on the Recognition and Enforcement of Foreign Arbitral
  Awards, 1958, especially art. V,
  [UNCITRAL](https://uncitral.un.org/en/texts/arbitration/conventions/foreign_arbitral_awards).
- **[A12]** Regulation (EU) 2016/679 (GDPR), especially arts. 3, 5, 9-10,
  22, 24-36 and 44-49,
  [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj).
- **[A13]** Swiss Federal Chancellery, *Regulation of AI*, current status and
  implementation programme, accessed 11 July 2026,
  [Federal Chancellery](https://www.bk.admin.ch/en/regulation).
- **[A14]** Council of Europe Framework Convention on Artificial Intelligence
  and Human Rights, Democracy and the Rule of Law, CETS No. 225,
  [Council of Europe](https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence).
- **[A15]** Regulation (EU) 2024/1689 (EU AI Act), especially arts. 2, 6,
  9-15, 16-27, 43, 49, 72-73 and Annex III point 8(a),
  [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj).
- **[A16]** Council of the European Union, *Artificial intelligence: Council
  gives final green light to simplify and streamline rules*, 29 June 2026,
  [Council of the EU](https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/).
- **[A17]** SVAMC, *Guidelines on the Use of Artificial Intelligence in
  Arbitration*, 2024, Guidelines 1-6,
  [Silicon Valley Arbitration & Mediation Center](https://svamc.org/ai-guidelines/).
- **[A18]** CIArb, *Guideline on the Use of AI in Arbitration*, updated
  September 2025, [Chartered Institute of Arbitrators](https://www.ciarb.org/).
- **[A19]** ISO/IEC 42001:2023, AI management systems; ISO/IEC 23894:2023,
  AI risk management; and ISO/IEC 42005:2025, AI system impact assessment,
  [ISO](https://www.iso.org/artificial-intelligence/ai-standards).
- **[A20]** NIST, *Artificial Intelligence Risk Management Framework 1.0*,
  January 2023, [NIST](https://www.nist.gov/itl/ai-risk-management-framework).

## 22. Final Governance Rule

> **Every consequential proposition must be traceable to a source, attributable
> to an actor, contestable by the affected party, reviewed by the competent
> human, decided only by lawful authority, and reconstructable later without
> exposing privileged advice, settlement confidences, or tribunal
> deliberations.**
