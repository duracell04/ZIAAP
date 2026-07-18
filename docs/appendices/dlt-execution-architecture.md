# DLT and Smart-Contract Execution Architecture

> **Historical, non-normative architecture appendix.** The
> [ZIAAP Operating Model](../product/operating-model.md) is canonical.

> **Future product architecture — not current MVP scope, not a smart-contract
> specification, and not a representation that any token, wallet signature, or
> automated transfer is legally effective in every deployment.**

## 1. Governing Principle

> **Blockchain is the integrity and execution rail. ZIAAP is the reasoning
> system. The appointed human arbitrator remains the legal authority.**

ZIAAP should not adopt the slogan “code is law.” The stronger architecture is:

> **Law governs the code. Code executes only determinate and authorised
> consequences. Arbitration resolves the uncertainty between them.**

This division separates three different forms of trust:

- **legal trust:** which commitments, rights, procedures, and remedies bind;
- **reasoning trust:** how contested evidence and interpretation are processed;
  and
- **execution trust:** whether an authorised and objectively defined transfer
  will occur as promised.

Automation can reduce delay and opportunistic non-performance, but it cannot
make disputed facts true, cure an invalid agreement, manufacture representative
authority, or guarantee recognition of an award.

## 2. Legal Reality Check

### 2.1 Automated contracting is not automatically valid everywhere

The UNCITRAL Model Law on Automated Contracting was adopted in 2024 to give
legislatures a model framework for recognising automation, AI, smart contracts,
machine-to-machine transactions, computer code, dynamic information, and the
attribution of automated outputs. It preserves party autonomy within mandatory
law and expressly does not form a complete code for AI governance or automated
contracting. It is a **model law for enactment**, not a treaty that by itself
makes every automated transaction valid in every jurisdiction.
([UNCITRAL Model Law on Automated Contracting](https://uncitral.un.org/en/mlac))

Every deployment must determine:

- whether relevant states enacted compatible rules;
- the law governing formation, authority, mistake, attribution, and performance;
- required disclosures about automation;
- how unexpected or erroneous outputs are allocated; and
- which mandatory consumer, employment, insolvency, sanctions, financial,
  competition, or public-policy rules remain applicable.

### 2.2 A wallet signature is not necessarily a legal identity or formal signature

Under Swiss law, the electronic signature equated with a handwritten signature
is subject to specific requirements, including a qualified certificate from a
recognised certification service provider and a qualified timestamp. OFCOM also
warns that cross-border recognition is not automatic.
([OFCOM electronic signature guidance](https://www.bakom.admin.ch/en/electronic-signature))

A blockchain transaction signature proves, at most, that the transaction was
authorised using a particular private key. Treating that key as a named company,
an authorised representative, or a signature satisfying a prescribed legal form
requires separate identity, mandate, corporate-authority, and form analysis.

For ZIAAP, the execution package should link rather than conflate:

1. verified legal identity;
2. evidence of representative authority;
3. the legally appropriate signature method;
4. the blockchain address and key-governance policy; and
5. the hash of the document or instruction being authorised.

### 2.3 An on-chain disposition is not a substitute for an arbitral award

Under the Swiss Rules, awards are written, signed by the arbitrators, and
notified through the prescribed process. The Swiss Arbitration Centre Practice
Note calls for signed originals and notes that some national courts may reject
enforcement where an award is presented solely in digital form.
([Swiss Rules Practice Note](https://www.swissarbitration.org/wp-content/uploads/2024/12/Swiss-Rules-of-International-Arbitration-Practice-Note-10.10.2024.pdf))

An on-chain authorisation can implement a contractually agreed consequence, but
it should not be represented as the award itself. Execution design must also
address correction, interpretation, challenge, suspension, set-aside, insolvency,
sanctions, and enforcement rules that may affect whether or when a transfer is
permitted.

### 2.4 Switzerland’s DLT framework is enabling, not universal token recognition

Switzerland’s DLT legislation created infrastructure for ledger-based securities,
tokenised assets, and regulated DLT trading facilities. It did not transform
every contractual claim, escrow balance, licence, or off-chain asset into a
legally recognised token merely because a smart contract refers to it.
([State Secretariat for International Finance](https://www.sif.admin.ch/en/dlt-blockchain-en))

Asset-by-asset analysis remains necessary for ownership, custody, segregation,
bankruptcy treatment, licensing, anti-money-laundering duties, transfer
restrictions, and the legal effect of the ledger entry. FINMA also identifies
technology, custody, supervision, and insolvency risks for cryptobased assets.
([FINMA custody guidance](https://www.finma.ch/en/news/2026/01/20260112-mm-am-01-26/))

## 3. Four Connected Layers

### 3.1 Legal Constitution

The human-readable and properly executed agreement remains the highest
contractual layer. It defines:

- parties, authority, rights, and obligations;
- governing law, seat, rules, and language;
- the appointed human arbitrator and ZIAAP protocol;
- interpretation, evidence, notice, hearing, and challenge rights;
- remedies, limitations, emergency rules, and mandatory-law reservations;
- the relationship between prose, structured data, and execution code;
- permitted assets, networks, custodians, or escrow arrangements;
- oracle sources and contestation windows;
- pause, correction, migration, and termination rights; and
- the conditions under which an automated action is authorised.

The hierarchy should be explicit:

```text
Mandatory law and binding public authority
        ↓
Human-readable signed agreement and arbitration clause
        ↓
Valid human arbitral and court orders
        ↓
Frozen ZIAAP Constitution and structured contract state
        ↓
Smart-contract code and execution adapters
```

Code may implement a defined consequence. It may not silently amend the legal
agreement or resolve a conflict between the layers.

### 3.2 ZIAAP Decision Protocol

The parties align, calibrate the arbitral reasoning protocol, validate it
through stress tests, and version-lock the exact runtime that will structure a
later dispute. It governs reasoning behavior, not asset custody.
It may:

- classify inputs as agreed, asserted, disputed, missing, or externally verified;
- apply confirmed mechanical rules;
- request evidence and preserve party responses;
- compare interpretations and counterarguments;
- propose non-binding settlement terms in a sealed environment;
- produce a provisional determination; and
- generate an execution instruction for human review.

The protocol may never use possession of a key or control of escrow as evidence
that its legal reasoning is correct.

### 3.3 Off-Chain Evidence and Case State

Contracts, evidence, submissions, personal data, legal advice, settlement
communications, and detailed awards remain in encrypted off-chain stores with
purpose-based access controls. The case state records provenance, versions,
objections, adoption, and the links between off-chain records and on-chain
commitments.

The settlement store remains separate from merits, privilege, deliberation,
security, and execution stores. A public ledger never becomes the case file.

### 3.4 Smart-Contract Execution Layer

The execution layer should be a narrow state machine, not a legal reasoning
engine. Candidate functions include:

- anchor an approved manifest hash;
- hold or reference escrowed assets;
- register authorised oracle and attestation policies;
- receive an objectively verifiable event;
- open a contestation period;
- pause a pending action;
- record that a ZIAAP proceeding was opened;
- execute a settlement signed by all required parties;
- execute a remedy authorised under the human arbitral process;
- apply a timelock, multisignature threshold, or suspension flag; and
- migrate to an approved replacement contract.

It should not decide good faith, reasonableness, credibility, defectiveness,
causation, gross negligence, proportionality, or enforceability.

## 4. Event Classification and the Oracle Boundary

Smart contracts cannot read off-chain reality without an oracle or attestation.
Ethereum’s documentation describes the oracle problem as the correctness,
availability, integrity, and accountability risk introduced when external data
is supplied to deterministic on-chain code.
([Ethereum oracle documentation](https://ethereum.org/developers/docs/oracles/))

ZIAAP should classify every proposed automation trigger before deployment:

| Class | Example | Default treatment |
| --- | --- | --- |
| A — On-chain fact | Escrow balance reached the agreed amount | May execute after finality and policy checks |
| B — Authoritative external record | A named bank confirms cleared payment | Execute only through the agreed authenticated oracle and contestation window |
| C — Bilaterally confirmable event | Both parties approve milestone completion | Execute after matching authorised confirmations |
| D — Contestable operational fact | Goods arrived late or an outage falls within maintenance | Freeze and open the ZIAAP evidence process |
| E — Legal or evaluative question | Material breach, good faith, causation, gross negligence | Human arbitral determination; never direct oracle execution |

The governing rule is:

> **Simple verified facts may enter execution. Contested or interpretive facts
> enter the AI-native arbitration process.**

An oracle policy must specify source, authentication, data schema, freshness,
quorum, aggregation, fallback, downtime, correction, dispute window, liability,
and the maximum value it is authorised to release.

## 5. Realistic Lifecycle State Machine

```text
DRAFT
  ↓ legal review, authority verification, code review
SIGNED_AND_FUNDED
  ↓ activation conditions satisfied
ACTIVE
  ↓ proposed performance event
PENDING_VERIFICATION
  ├─ verified + contestation window expires → EXECUTABLE
  ├─ party contests → DISPUTE_HOLD
  └─ oracle/security failure → SAFETY_PAUSE

DISPUTE_HOLD
  ↓ shared evidence window and hash-bound ZIAAP process
SETTLEMENT_OFFERED or PROPOSED_DETERMINATION
  ├─ matching signed settlement → SETTLEMENT_AUTHORISED
  └─ independent human award → AWARD_AUTHORISED

SETTLEMENT_AUTHORISED / AWARD_AUTHORISED
  ↓ identity, scope, stay, timelock, key, and compliance checks
EXECUTION_PENDING
  ├─ no blocking event → EXECUTED
  └─ challenge, court order, sanctions, key compromise, or chain failure → SUSPENDED
```

“Final” in a smart-contract state means final under the agreed execution policy,
not immune from mandatory legal remedies or public authority.

## 6. Contract Formation and Activation Package

The production activation package should contain:

- signed legal contract and arbitration agreement;
- party and representative authority records;
- human arbitrator appointment or appointment mechanism;
- frozen ZIAAP Constitution and stress-test validation report;
- structured obligations and evidence requirements;
- smart-contract source, compiler, deployment, and audit identifiers;
- network, asset, token, custody, and oracle specifications;
- emergency, pause, upgrade, and recovery policies;
- address-to-identity and key-governance records;
- canonical hashes connecting all artefacts; and
- a plain-language disclosure of what will and will not execute automatically.

The blockchain should normally receive commitments to these artefacts rather
than their confidential contents. A chain timestamp proves inclusion or ordering
under that network’s rules; it should not automatically be described as a
qualified legal timestamp or proof of valid execution.

## 7. Performance and Dispute Hold

Every automated obligation should define both its success path and its dispute
path:

```text
Obligation: Supplier delivers component X by 30 September.
Evidence policy: Signed receipt plus named inspection certificate.
Execution: Release 80% of the milestone after verification and a 72-hour objection window.
Dispute switch: Any timely objection freezes release and opens the evidence process.
Fallback: Oracle unavailability or conflicting attestations produce a safety pause, not release.
```

The dispute switch must atomically prevent the contested action from continuing.
It should snapshot or reference:

- the controlling contract and protocol hashes;
- the pending obligation and amount;
- the event, oracle, and attestation versions;
- the objection and its authorised actor;
- the asset state and custody location; and
- the deadline and procedure for the next step.

Automation already completed before a valid objection may not be technically
reversible. The legal agreement must address mistaken execution, restitution,
recovery, and loss allocation rather than assuming every transfer can be rolled
back.

## 8. Arbitration and the Award-to-Execution Bridge

ZIAAP structures the shared record and produces a proposed determination. The
human arbitrator preserves the right to be heard, independently reviews the
analysis, adopts or changes the reasons and disposition, and signs the award in
the legally appropriate form.

The execution bridge should use a narrow, structured instruction such as:

```text
ExecutionInstruction
- matter ID and appointment hash
- signed award or settlement hash
- authorised asset and maximum amount
- source and destination identifiers
- interest formula and calculation date
- required authorisers and threshold
- earliest execution time
- suspension and expiry status
- network and smart-contract version
```

The human arbitrator should not normally be the sole custodian of assets or the
sole controller of a release key. A safer design is a threshold arrangement in
which execution requires an arbitrator-authorised instruction plus independent
operational or custody checks. This avoids turning the arbitrator into an
unreviewed payment operator and limits the consequences of a compromised key.

Before execution, the bridge must verify:

1. the instruction falls within the award and tribunal mandate;
2. the human signature and identity are valid;
3. correction or interpretation requests have been handled as required;
4. no known court or tribunal suspension applies;
5. any contractually agreed delay or notice period has expired;
6. sanctions, AML, custody, and asset-transfer controls permit the action;
7. the destination and amount are independently checked;
8. the correct contract, network, and asset versions are active; and
9. the transaction remains within a configured value limit.

The system must not imply that a private challenge period replaces statutory
set-aside or enforcement rights.

## 9. Security and Operational Controls

A production execution layer requires at least:

- independently audited smart-contract code;
- least-privilege roles and threshold authorisation;
- hardware-backed key storage and tested key rotation;
- emergency pause with a narrowly defined, auditable authority;
- timelocks for high-value or upgrade actions;
- per-action and aggregate value limits;
- replay, re-entrancy, front-running, overflow, and oracle-manipulation protection;
- chain-finality and reorganisation policy;
- monitored oracle freshness and divergence;
- upgrade, migration, rollback, and abandoned-chain procedures;
- incident response, notification, and recovery playbooks;
- reconciliation between on-chain state, custodian state, and legal records; and
- tested continuity if the chain, custodian, oracle, or ZIAAP service is unavailable.

Administrative upgrade power can undermine credible commitment if one operator
can rewrite the rules. Upgrade authority must therefore be disclosed, limited,
multilateral where appropriate, delayed, and linked to the legal amendment
process.

## 10. Privacy and On-Chain Data Minimisation

Do not place readable contracts, party statements, settlement offers, legal
advice, personal data, confidential evidence, deliberation, internal model
reasoning, or commercially sensitive awards on a public chain.

Even hashes and metadata can create privacy risk:

- predictable documents may be vulnerable to dictionary matching;
- timestamps and transaction relationships can reveal commercial activity;
- addresses can become linked to legal identities;
- immutable data may conflict with correction, retention, or deletion duties;
  and
- a hash can remain personal data where it is linkable to a person or record.

Use salted or keyed commitments where appropriate, minimise event metadata,
separate public and permissioned records, and keep the mapping between hashes and
documents in controlled off-chain storage. A later zero-knowledge design must
also address verifier correctness, trusted setup where relevant, revocation,
freshness, and the legal meaning of the fact proved.

## 11. Candidate Use Cases

### Integrity anchoring

Anchor hashes for the signed contract, Constitution, validation suite, protocol
identity, evidence submissions, procedural orders, settlement execution, and
signed award. This supports tamper detection, not proof that the contents are
true or legally valid.

### Programmable escrow

Hold a narrowly defined asset under a reviewed custody and insolvency structure.
Release it for Class A–C events or after an authorised settlement or award.

### Structured obligation monitoring

Track deadlines, confirmations, measurements, and documentary attestations.
Open dispute mode rather than executing when a material input is contested.

### Ledger-based asset instructions

Where the asset and legal framework support ledger transfer, execute a valid
instruction for payment, collateral, securities, or access rights. The ledger
entry’s legal effect must be established for that asset and jurisdiction.

### Privacy-preserving compliance proofs

In later phases, prove a threshold or status—such as adequate collateral or a
valid licence—without disclosing the full underlying record, provided that data
freshness, issuer authority, and revocation are verifiable.

## 12. Adoption Roadmap

### Phase 0 — Integrity sandbox

- testnet or permissioned-ledger hash anchoring only;
- no asset custody or automatic transfer;
- canonical document commitments and verification UI;
- threat model, privacy review, and smart-contract audit plan.

### Phase 1 — Reversible execution pilot

- one low-value B2B escrow scenario;
- regulated or contractually controlled custody;
- bilateral confirmation and deterministic Class A–C events only;
- dispute hold, emergency pause, value caps, and manual recovery;
- no autonomous award execution.

### Phase 2 — Award instruction bridge

- one reviewed jurisdiction and asset type;
- human-signed structured execution instruction;
- multisignature or custodian approval;
- suspension, correction, sanctions, and challenge-status checks;
- full reconciliation and incident response.

### Phase 3 — Advanced attestations

- multiple oracle sources and formal data policies;
- zero-knowledge or privacy-preserving proofs where proportionate;
- institution, court, custodian, and qualified-signature integrations;
- certified protocol and smart-contract release process.

Each phase requires explicit revision of the seven core documents before it
enters product scope.

## 13. Adoption Gates

DLT execution must not enter production until ZIAAP can answer, for the exact
deployment:

1. What legal obligation authorises each automated action?
2. Which prose rule prevails if code and contract differ?
3. What identity and authority stand behind every address and key?
4. Which asset is controlled, by whom, and with what insolvency treatment?
5. Which events may execute automatically and which must freeze?
6. How is oracle correctness, availability, correction, and liability governed?
7. Who may pause, upgrade, migrate, or recover, and under what procedure?
8. What prevents settlement or privileged content from becoming public or entering merits?
9. What human or public-authority action can suspend execution?
10. How are mistaken or irreversible transfers remedied?
11. What regulatory licences, AML, sanctions, tax, and reporting duties apply?
12. Can an independent reviewer reconstruct the legal, protocol, and execution chain?

## 14. Final Architecture Rule

> **The ledger may prove integrity and move an authorised asset. It does not
> determine contested reality, interpret the contract, or replace the human
> arbitrator’s legally responsible judgment.**

The long-term product vision is therefore an AI-native contractual operating
system: parties align governance before signature, record performance during the
relationship, route uncertainty through the appointed ZIAAP-powered arbitrator,
and execute only those consequences that are legally and technically fit for
automation.
