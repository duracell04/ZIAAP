# ZIAAP Sovereign Arbitral Runtime

> **Future architecture and strategic capability map — not current MVP scope,
> a production deployment specification, a certification claim, or a guarantee
> that an award will be valid or enforceable in a particular jurisdiction.**

## Final Refined Value Proposition

### Definition

> **The ZIAAP Arbitral Runtime is a sovereign-deployable, case-isolated,
> version-governed, and auditable AI decision environment containing the
> appointed model, the parties’ agreed Constitution and exemplars, authorised
> legal sources, procedural workflows, tool permissions, evaluation suite, and
> cryptographically verifiable process record.**
>
> It supports an agent-first proceeding while preserving the appointed human
> arbitrator’s independent judgment, procedural duties, and non-delegable
> responsibility for the award. Controlled migration, disaster recovery, and
> manual fallback procedures preserve the arbitral mandate when technology
> changes or fails.

The runtime includes more than a locally hosted LLM:

```text
ZIAAP Arbitral Runtime
= Model
+ Constitution
+ Exemplars
+ Legal Corpus
+ Tools
+ Parameters
+ Evaluations
+ Audit Policy
+ Continuity Protocol
```

In this appendix, **sovereign-deployable** means that parties or an institution
can select and govern the deployment location, operators, keys, connectivity,
components, and data flows. It does not imply that every dependency is locally
produced, that a deployment is automatically compliant, or that self-hosting is
always the safest or most economical option. The runtime may be fully local,
institution-hosted, client-hosted, or operated as a controlled hybrid.

The human arbitrator holds legal office and remains responsible for the award.
The runtime may structure the proceeding, analyse the agreed record, expose
counterarguments, and produce a provisional determination. It cannot issue the
award or silently replace the appointed human decision-maker.

### Calibration terminology

The underlying model may be locally deployed or provider-hosted and may itself
have been technically fine-tuned for legal tasks. For each contractual
relationship, however, the parties perform **arbitral reasoning calibration**:
they adjust the inference-time protocol without modifying the model’s weights.
They then validate that calibrated protocol through stress tests before
version-locking the approved runtime.

For a fully local sovereign deployment, the clean formulation is:

> **The arbitrator operates a locally deployed LLM that may be technically
> fine-tuned for legal tasks. For each contractual relationship, the parties
> then calibrate the arbitral reasoning protocol without modifying the
> underlying model.**

---

## 1. Data Sovereignty and Confidentiality

1. **Controlled data location.** Contracts, evidence, submissions, and
   arbitral records remain within infrastructure selected by the institution or
   parties.
2. **Reduced third-party exposure.** Sensitive case information need not pass
   through general-purpose external AI APIs.
3. **Fewer external processors.** The deployment can reduce the number of cloud
   providers, gateways, subcontractors, and foreign infrastructure operators
   involved.
4. **Institution-controlled encryption.** The institution or enterprise can
   control encryption keys, key rotation, and access policies.
5. **Case-level isolation.** Each proceeding can receive its own model
   environment, document repository, retrieval index, logs, and permissions.
6. **Controlled-connectivity modes.** Highly sensitive proceedings can operate
   with minimal external connectivity and audited data-transfer points.
7. **Defined retention and deletion.** Case data can follow retention rules
   agreed by the parties or required by the institution.
8. **Reduced cross-border transfer complexity.** Local or Swiss-hosted
   deployment can limit the international transmission of personal and
   commercially sensitive data.
9. **Stronger trade-secret protection.** Technical information, pricing,
   source code, and internal business records remain within the selected
   security perimeter.
10. **Confidential settlement separation.** Settlement communications and
    other protected settlement information can remain technically separated
    from the merits environment.

These controls reduce exposure; they do not remove processors, international
dependencies, insider risk, disclosure obligations, or the need for
jurisdiction-specific data-transfer analysis.

---

## 2. Version-Governed Arbitral Continuity

11. **Identifiable appointed baseline.** The parties can identify the exact
    model weights, Constitution, exemplars, tools, and sources accepted at
    appointment.
12. **Protection against silent model changes.** External providers cannot
    change the appointed model’s behaviour during the contractual relationship
    without a governed update.
13. **Version-locked reasoning environment.** The runtime can record the model,
    tokenizer, inference engine, prompts, parameters, retrieval configuration,
    and evaluation suite.
14. **Cryptographic identification.** Hashes can establish which runtime
    components and documents were used at a particular time.
15. **Governed updates.** Material changes become explicit procedural events
    requiring defined approval and documentation.
16. **Forensic examinability.** The relevant environment, inputs, outputs, and
    configuration can be substantially reconstructed for audit or challenge.
17. **Behavioural regression testing.** Proposed updates can be tested against
    the original stress tests and exemplars.
18. **Equal-version treatment.** Both parties can verify that the same approved
    runtime was applied throughout the proceeding.
19. **Preservation of the appointed Constitution.** Hardware or software
    migration does not automatically change the parties’ agreed interpretive
    principles.
20. **Documented legal-source updates.** New legislation and decisions can
    enter through a governed legal-corpus update without silently replacing the
    appointed model.

Version-locking identifies the approved baseline. It does not guarantee
bit-for-bit reproducibility across every hardware stack or make an obsolete or
insecure component safe to operate indefinitely.

---

## 3. Hardware and Software Migration

21. **Hardware Migration Protocol.** The Constitution can define how the
    runtime moves to new hardware when legacy GPUs or drivers reach end of
    life.
22. **Compatibility testing.** New infrastructure can be evaluated against the
    original runtime benchmarks before deployment.
23. **Material-difference disclosure.** Any significant behavioural change
    resulting from migration must be documented and disclosed.
24. **Rollback capability.** Previous validated runtime versions remain
    available where technically, securely, and legally appropriate.
25. **Software Bill of Materials.** Models, libraries, drivers, containers, and
    dependencies can be catalogued for audit and security review.
26. **Dependency governance.** Third-party libraries and tools can be approved,
    monitored, patched, and replaced under a defined procedure.
27. **Durable model licensing.** Core deployments can prioritise models whose
    weights, licence terms, provenance, and permitted uses are suitable for
    long-term institutional operation.
28. **Long-term archival format.** Runtime components, case records, and
    evaluation results can be stored in formats designed for future forensic
    access.

A migration is a governed change, not a promise that old hardware, vulnerable
software, or expired licences will be preserved unchanged.

---

## 4. Hallucination and Reliability Governance

29. **Controlled legal retrieval.** The model can be restricted to authorised
    legal databases, contract materials, and case evidence.
30. **Jurisdiction-specific source boundaries.** Research can be limited to the
    governing law and sources relevant to the dispute.
31. **Source-linked propositions.** Material factual and legal conclusions can
    require links to supporting evidence or legal authority.
32. **Explicit insufficiency states.** The runtime can return “insufficient
    evidence” or “unresolved legal question” instead of forcing a conclusion.
33. **Structured reasoning outputs.** Claims, evidence, rules, inferences,
    counterarguments, and dispositions can follow defined schemas.
34. **Stable inference settings.** Decoding parameters, tool permissions, and
    reasoning budgets can be controlled and recorded.
35. **Adversarial testing.** The runtime can be tested for prompt injection,
    fabricated authorities, evidentiary manipulation, and biased framing.
36. **Multi-model verification.** Separately governed models can perform
    extraction, legal research, deliberation, citation checking, and
    contradiction detection.
37. **Human escalation thresholds.** Missing evidence, low confidence, source
    conflict, and unusual legal issues can automatically enter human review.
38. **Fail-closed workflow design.** Critical tool or retrieval failures can
    pause the process rather than allowing unsupported reasoning to continue.
39. **Case-specific stress testing.** The parties can test the runtime against
    hypothetical disputes before adopting it.
40. **Continuous evaluation.** Performance can be measured throughout the
    runtime lifecycle without silently changing the appointed decision
    protocol.

Local deployment does not eliminate hallucinations. It gives ZIAAP control over
the systems used to identify, measure, reduce, and respond to them. Adding
models also adds dependencies and attack surface; each verifier must therefore
have a defined role, manifest, access boundary, and failure policy.

---

## 5. Auditability and Procedural Legitimacy

41. **Complete process logging.** Model calls, retrieved sources, tool actions,
    corrections, approvals, and overrides can be recorded.
42. **Evidence chain of custody.** Each piece of evidence can be traced from
    submission through extraction, interpretation, and final use.
43. **Data lineage.** Conclusions can show which materials, transformations,
    and human interventions contributed to them.
44. **AI and human attribution.** The record can distinguish AI-generated
    proposals from conclusions adopted, modified, or rejected by the
    arbitrator.
45. **Procedural conformity evidence.** The runtime can provide evidence that
    the agreed process and safeguards were followed.
46. **Contestable reasoning.** Parties can challenge facts, sources, inferences,
    and legal interpretations at a granular level.
47. **Due-process checkpoints.** The system can require that each party has an
    opportunity to respond before a material proposition is relied upon.
48. **Symmetrical party treatment.** Equivalent rules, interfaces, and
    evidentiary structures can be applied to both sides.
49. **Independent audit access.** Approved experts can inspect the deployed
    environment without depending entirely on an external API provider.
50. **Process auditability.** The runtime can demonstrate what the system did,
    which sources it used, and which steps were followed.
51. **Structured substantive review.** Source-linked reasoning cards provide a
    human-reviewable justification layer beyond raw technical logs.
52. **Procedural fallback record.** If the runtime fails, the existing
    structured case file remains available for conventional human-led
    arbitration.

Versioning and auditability strengthen the evidentiary record. They do not
guarantee that an award will survive every challenge or enforcement objection.
Technical logs can record observable events, but they do not expose a complete
causal account of a model’s internal reasoning.

---

## 6. Neutrality, Bias, and Party Alignment

53. **Jointly authored Constitution.** The parties can agree on procedural
    values, interpretive principles, and limits before a dispute arises.
54. **Approved exemplars.** Hypothetical cases can reveal how the runtime treats
    recurring contractual problems.
55. **Bias testing before appointment.** The parties can test for
    jurisdictional, linguistic, evidentiary, and cultural asymmetries.
56. **Evidentiary symmetry.** The runtime can apply equivalent analytical
    structures to each party’s submissions.
57. **Neutrality-oriented optimisation.** The system can prioritise restraint,
    uncertainty disclosure, and adversarial balance over conversational
    engagement.
58. **Visible alternative interpretations.** The runtime can present competing
    legal and factual constructions instead of one dominant answer.
59. **Counterargument requirements.** Every proposed disposition can include
    the strongest opposing argument and the evidence supporting it.
60. **Documented configuration authority.** The protocol records who approved
    each value, rule, exemplar, and later amendment.
61. **Separation of common values from party advantage.** The Constitution can
    distinguish legitimate shared procedural principles from rules designed to
    favour one party.
62. **Human independence preserved.** The appointed arbitrator may reject the
    AI’s proposed analysis where independent judgment requires a different
    conclusion.

Joint configuration creates a testable common procedure; it does not prove that
the resulting system is neutral. Neutrality remains an institutional,
procedural, technical, and human governance obligation.

---

## 7. Regulatory and Institutional Readiness

63. **EU AI Act readiness.** The runtime can support risk management, logging,
    technical documentation, human oversight, accuracy testing, and
    cybersecurity controls where the Act applies.
64. **Swiss data-protection governance.** Deployment can support privacy by
    design, access control, processing records, and data-protection impact
    assessment where required.
65. **Ciarb Guideline mapping.** The architecture can be mapped to principles
    including transparency, confidentiality, independent verification, and
    non-delegation of arbitral responsibility.
66. **Human oversight by design.** The arbitrator retains the capacity to
    understand, question, override, suspend, and discontinue AI use.
67. **Institutional procedural orders.** Rules governing AI use can be
    incorporated into the arbitration agreement or an applicable procedural
    order.
68. **Defined disclosure duties.** The parties can know which model, tools, and
    legal sources are being used, subject to justified security and
    confidentiality limits.
69. **Independent validation.** The runtime can undergo third-party testing
    before appointment and periodic reassessment afterward.
70. **Certification readiness.** Governance, evaluation, and technical
    documentation can support future institutional or regulatory conformity
    assessment or certification schemes.

The correct public claim is **regulatory readiness** or **guideline-aligned
design** until the exact role, jurisdiction, provider/deployer status, and use
case have been legally classified and any required conformity assessment has
occurred. Legally consequential ADR uses may fall within the EU AI Act’s
high-risk framework; a private deployment is not exempt merely because it is
locally hosted.

---

## 8. Multi-Model and Hybrid Orchestration

71. **Task-specialised models.** Different models can handle extraction,
    translation, research, deliberation, verification, and drafting.
72. **Controlled model routing.** Sensitive or consequential tasks can remain
    local while lower-risk tasks use approved external services.
73. **Hybrid deployment options.** ZIAAP can support fully local,
    institution-hosted, client-hosted, and controlled hybrid environments.
74. **Selective cloud use.** Non-sensitive workloads can use external models
    where performance or cost advantages justify them and the appointment
    permits it.
75. **Local control of the decision core.** The legally consequential reasoning
    environment remains under the governance specified in the appointment.
76. **Model substitution without workflow replacement.** Individual models can
    be upgraded while preserving the case schema, Constitution, audit
    structure, and evaluation suite—but only through the amendment and
    recalibration process.
77. **Independent verification models.** A second system can check citations
    and calculations without controlling the final recommendation.
78. **Model-agnostic architecture.** ZIAAP can evaluate suitable sovereign and
    open-weight systems alongside proprietary systems without treating any
    model family as inherently qualified for arbitral use.

Multi-model Council orchestration remains future work. No model may be silently
substituted under an existing appointment, even if its interface is compatible
or benchmark performance appears superior.

---

## 9. Interoperability and Standardisation

79. **Exportable case ledger.** The complete record can be exported in
    documented, structured formats.
80. **Portable proposition graph.** Claims, evidence, rules, inferences, and
    objections can move between compatible systems.
81. **Authority Matrix interoperability.** Human and AI decision boundaries can
    be represented in a standardised machine-readable form.
82. **Open interfaces.** Approved legal databases, document systems, smart
    contracts, and institutional platforms can connect through governed APIs
    or MCP servers.
83. **Vendor portability.** Institutions can preserve their case structures and
    governance rules when changing underlying model providers.
84. **Institutional integration.** The runtime can connect to existing case
    management, evidence, identity, and signing systems.
85. **Structured archival records.** Future courts, auditors, or successor
    institutions can interpret the preserved procedural record.

Interoperability requires documented schemas, stable identifiers, validation,
access controls, and migration tests. “Open interface” does not mean unrestricted
network access to confidential case data.

---

## 10. Operational Resilience and Failure Management

86. **Disaster recovery.** Encrypted backups, mirrored environments, and tested
    recovery procedures protect active proceedings.
87. **Standby runtime.** A validated secondary environment can take over after
    infrastructure failure.
88. **Defined recovery objectives.** Institutions can establish maximum
    acceptable downtime and data-loss thresholds.
89. **Emergency brake.** The arbitrator or authorised institution can suspend
    the runtime when integrity or fairness is in doubt.
90. **Manual arbitration fallback.** The human arbitrator retains full authority
    to continue the proceeding without the AI system.
91. **Failure detection.** Contradictions, retrieval failure, anomalous outputs,
    and security incidents can trigger automatic escalation.
92. **Security incident isolation.** Compromised components can be disconnected
    while preserving the case record.
93. **Continuity of arbitral mandate.** A technical failure does not terminate
    the arbitrator’s legal authority.
94. **Defined responsibility allocation.** Contracts can allocate operational
    responsibilities among ZIAAP, the institution, the arbitrator,
    infrastructure providers, and parties, subject to mandatory law and rules
    that prevent or limit exclusions of liability.
95. **Operational prerequisites.** Deployments must account for hardware,
    specialised staff, cybersecurity, maintenance, physical security, and
    continuity costs.

Recovery must be tested, not merely documented. A standby environment is not
appointment-compatible until its manifest and material behaviour pass the
applicable migration and regression procedure.

---

## 11. Economic Advantages

96. **Predictable infrastructure costs.** Institutions can estimate capacity,
    storage, and inference costs more reliably.
97. **Reduced exposure to token-price changes.** Active proceedings are less
    vulnerable to external API pricing decisions.
98. **Cost predictability for fixed-fee services.** Stable operating costs can
    support capped or fixed-price arbitration models.
99. **Economies at sufficient utilisation.** High-volume institutional
    deployments can lower average inference costs.
100. **Reserved computational capacity.** Institutions can ensure that active
     proceedings receive dedicated resources.
101. **Reduced external rate limits.** ZIAAP controls workload scheduling,
     concurrency, and context allocation.
102. **Capitalised institutional infrastructure.** Investment builds a reusable
     institutional asset rather than purchasing only transient API access.
103. **Selective use of premium models.** Expensive external models can be
     reserved for narrow, approved tasks where their performance advantage is
     material.
104. **Transparent client costing.** Parties can see how infrastructure, human
     review, and case complexity affect pricing.
105. **Commercial scalability.** The same governed runtime architecture can
     support multiple institutions, jurisdictions, and deployment tiers while
     retaining case isolation.

Local deployment is usually a premium control and security proposition. It
becomes cheaper than cloud inference only under suitable utilisation and
operational conditions. Total cost of ownership must include engineering,
security, energy, redundancy, licensing, compliance, and specialist support.

---

## 12. Strategic and Commercial Advantages

106. **Defensible institutional moat.** The value lies in the integrated
     protocol, evaluation suite, governance, legal corpus, and correction
     history.
107. **Compounding arbitral intelligence.** Approved, appropriately sanitised
     corrections and evaluations can improve future runtime releases without
     silently training on confidential cases.
108. **Institution-owned knowledge.** Institutions retain control over their
     accumulated procedural and analytical expertise, subject to party rights,
     confidentiality, and applicable law.
109. **White-label deployment.** Arbitral institutions and law firms can operate
     branded ZIAAP environments.
110. **Client-hosted enterprise deployment.** Large organisations can operate
     the runtime inside their own infrastructure where the neutrality,
     independence, and access-control model permits it.
111. **Swiss sovereign deployment proposition.** ZIAAP can offer a
     Swiss-controlled infrastructure option for international disputes without
     claiming that deployment location alone creates neutrality.
112. **Long-term supplier independence.** The product is less exposed to a
     single provider’s discontinuation, acquisition, or regional restrictions.
113. **Stronger contractual commitments.** ZIAAP can promise defined deployment
     location, version control, access rules, and retention behaviour.
114. **Institutional procurement credibility.** The deployment model directly
     addresses confidentiality, control, continuity, and audit concerns.
115. **Licensable arbitral appliance.** The runtime can become a B2B
     infrastructure product rather than only a case-by-case legal service.
116. **Full-lifecycle differentiation.** ZIAAP begins with alignment before
     conflict and continues through settlement, arbitration, and controlled
     execution.
117. **Party-configured appointment.** The parties test and approve the
     reasoning Constitution before a dispute exists.
118. **Infrastructure-standard potential.** ZIAAP can become an operating layer
     through which institutions deploy governed AI-native arbitration.

Any reuse of corrections, evaluations, or institutional knowledge must be
designed around confidentiality, purpose limitation, privilege, intellectual
property, and explicit authority. Case data is not a default training corpus.

---

## 13. Future Cryptographic Capabilities

119. **Runtime attestation.** Cryptographic proofs can demonstrate which
     approved runtime version executed a process.
120. **Tamper-evident records.** Hashes can reveal unauthorised changes to
     documents, configurations, or procedural records.
121. **Trusted execution environments.** Sensitive computations may be
     performed inside hardware-backed secure environments after appropriate
     threat modelling and vendor assessment.
122. **Selective disclosure.** Parties may prove defined facts without
     revealing unnecessary underlying information.
123. **Zero-knowledge research roadmap.** Future systems may attest that
     specified inputs and rules were processed without exposing confidential
     evidence.
124. **Post-quantum migration planning.** Long-term archives and signatures can
     incorporate migration paths toward post-quantum cryptographic standards.

Cryptographic attestation can prove defined technical events and data
integrity. It does not establish legal identity by itself, prove that the input
was true, prove that the process was fair, or show that a legal interpretation
was normatively correct.

---

## 14. Core Product Boundaries

The ZIAAP Arbitral Runtime should make the following limitations explicit:

- Local deployment does not inherently eliminate hallucinations.
- Version-locking does not guarantee identical token-by-token outputs across
  all future hardware.
- Technical logs provide process traceability, not complete access to the
  model’s internal causal reasoning.
- A frozen model still requires governed updates to legal sources and security
  components.
- Data sovereignty transfers operational and compliance responsibility to
  ZIAAP and the deploying institution.
- Open-weight models may still have licensing and supply-chain dependencies.
- High-quality local deployment requires substantial infrastructure and
  specialist expertise.
- The AI may structure, analyse, and recommend; the human arbitrator retains
  the legal mandate and responsibility for the award.
- The runtime strengthens procedural evidence but does not immunise an award
  from annulment or enforcement challenges.
- Technology failure activates continuity and manual fallback procedures
  rather than terminating the arbitration.
- Cryptographic integrity is not the same as truth, authority, fairness, or
  legal validity.
- Regulatory classification and obligations must be assessed for the actual
  system, actors, deployment, jurisdiction, and intended use.

---

## Final Strategic Positioning

> **ZIAAP does not sell a local LLM. It provides an appointable, sovereign, and
> governed arbitral intelligence environment.**

Its central advantages are:

1. **Sovereignty:** the parties and institution control the case environment.
2. **Continuity:** the appointed reasoning system remains identifiable and
   version-governed.
3. **Inspectability:** evidence, sources, AI actions, and human decisions remain
   traceable.
4. **Contestability:** parties can challenge material facts and inferences.
5. **Neutrality:** the system can be jointly tested and configured before
   conflict.
6. **Resilience:** human authority and manual fallback survive technical
   failure.
7. **Scalability:** institutions can deploy the runtime as reusable arbitration
   infrastructure.

### Core Promise

> **A stable, inspectable, and sovereign AI-native arbitration environment,
> configured before conflict and governed throughout the life of the
> contractual relationship.**

## Selected Governance References

- [Regulation (EU) 2024/1689 (EU AI Act)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
  classifies certain legally consequential uses by alternative dispute
  resolution bodies as high-risk and establishes requirements including risk
  management, documentation, logging, human oversight, accuracy, robustness,
  and cybersecurity, subject to the Regulation’s scope and transition rules.
- [Ciarb Guideline on the Use of AI in Arbitration (updated September
  2025)](https://www.ciarb.org/media/bpndtcgu/guideline-on-the-use-of-ai-in-arbitration_updated-sept-2025.pdf)
  addresses confidentiality, disclosure, tribunal control, independent human
  analysis, and verification of AI-generated outputs.
- [Swiss FDPIC: AI and data
  protection](https://www.edoeb.admin.ch/en/ai-and-data-protection) confirms
  that the technology-neutral Federal Act on Data Protection applies to
  AI-supported processing.
- [Swiss FDPIC: Data protection impact
  assessment](https://www.edoeb.admin.ch/en/data-protection-impact-assessment)
  explains the high-risk threshold for a DPIA under Swiss data-protection law.

These references are governance inputs, not a complete legal analysis. Each
production deployment requires advice on the applicable arbitration law,
institutional rules, data law, AI regulation, cybersecurity obligations,
evidence rules, professional duties, and enforcement jurisdictions.
