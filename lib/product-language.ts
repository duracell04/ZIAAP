export const PRODUCT_PROMISE = "Test your dispute-resolution system before you sign the contract.";

export const NORTH_STAR_AMBITION =
  "ZIAAP aims to transform arbitration from a largely bespoke, document-driven professional service into a structured, technology-native production system. The parties align critical rules before conflict. Software organises the record and performs explicit calculations. AI maintains source-linked, structured and contestable analysis. Independent human arbitrators retain full authority over procedure, judgment and any future award. The objective is not to automate arbitral authority. It is to make professional authority usable across a substantially broader range of commercial disputes.";

export const CATEGORY_THESIS =
  "Traditional arbitration standardises procedural rules. ZIAAP also standardises the production environment through which a case is prepared, examined and decided.";

export const INSTITUTIONAL_THESIS =
  "The future ZIAAP institution is intended to be owned and professionally governed by participating arbitrator partners, supported by a shared engineering and case-administration platform.";

export const ECONOMIC_THESIS =
  "By reducing repeated reconstruction, administration and drafting, ZIAAP seeks to make independent human arbitration operationally faster, more predictable and economically viable for lower-value and higher-volume commercial disputes.";

export const OPERATING_PRINCIPLE =
  "Commercial aviation made safe flight scalable by standardising everything around the pilot. ZIAAP aims to make high-quality arbitration scalable by standardising everything around the arbitrator.";

export const BRAND_PROMISE =
  "Standardise the cockpit. Automate the instruments. Preserve the captain.";

export const CANONICAL_PRODUCT_DEFINITION =
  "ZIAAP helps parties align contractual meaning and test the observable behaviour of an agreed dispute-resolution process before signing, using a governed AI Resolution Officer to augment a properly appointed human arbitrator who retains legal authority.";

export const PUBLIC_DEMO_HEADLINE = "Agree the rules before the dispute.";

export const PUBLIC_DEMO_ARBITRATION_EXPLAINER =
  "Arbitration is a private way for businesses to resolve a dispute outside court with a neutral human decision-maker.";

export const PUBLIC_DEMO_DESCRIPTION =
  "ZIAAP helps businesses uncover different contract expectations, test the agreed dispute rules, and prepare a source-linked case for a human arbitrator if conflict occurs.";

export const PUBLIC_DEMO_AUTHORITY_LINE =
  "AI prepares. Parties can challenge. A human arbitrator decides.";

export const PUBLIC_DEMO_DISCLAIMER =
  "Synthetic demonstration · No legal effect · AI output is illustrative.";

export const CURRENT_ARTIFACT_CLASSIFICATION =
  "High-fidelity interactive concept demonstrator — workflow and interaction fidelity";

export const CURRENT_MATURITY_LEVEL = "C0" as const;

export const RESOLUTION_OFFICER_DEFINITION =
  "The AI Resolution Officer is a governed software capability. It is not a legal office, arbitral institution, arbitrator, or autonomous decision-maker.";

export const DIGITAL_TWIN_BOUNDARY =
  "A digital twin of the agreed dispute-resolution process and its observable behaviour, not a predictor of the future result.";

export const PROTOCOL_LAYERS = [
  {
    id: "i0",
    label: "I0 · Flight Plan",
    publicLabel: "Align before conflict",
    purpose: "Align contractual expectations and configure the governed protocol before conflict.",
  },
  {
    id: "i1",
    label: "I1 · Cockpit",
    publicLabel: "Structure the dispute",
    purpose: "Freeze the configuration and maintain a structured, contestable case state.",
  },
  {
    id: "i2",
    label: "I2 · Captain in Command",
    publicLabel: "Human judgment",
    purpose: "Preserve independent human adjudication and the inspectable procedural record.",
  },
] as const;

export const MATTER_GATES = [
  {
    id: "alignment",
    number: 1,
    label: "Alignment",
    layerId: "i0",
    purpose: "Resolve material differences in operational contract expectations.",
  },
  {
    id: "configuration",
    number: 2,
    label: "Configuration",
    layerId: "i0",
    purpose: "Assemble the Constitution, evidence policy, deterministic tools, scenario tests and permitted AI uses.",
  },
  {
    id: "appointment_configuration_freeze",
    number: 3,
    label: "Appointment & Configuration Freeze",
    layerId: "i1",
    purpose: "Identify the human arbitrator, freeze the configuration and record integrity evidence.",
  },
  {
    id: "case_production",
    number: 4,
    label: "Case Production",
    layerId: "i1",
    purpose: "Maintain the structured, versioned and contestable case state.",
  },
  {
    id: "independent_adjudication",
    number: 5,
    label: "Independent Adjudication",
    layerId: "i2",
    purpose: "Preserve independent human review with zero algorithmic presumption.",
  },
  {
    id: "award_black_box",
    number: 6,
    label: "Award & Black Box",
    demonstratorLabel: "Simulated Outcome & Procedural Black Box",
    layerId: "i2",
    purpose: "Produce any future human-signed award and preserve the procedural record.",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  number: number;
  label: string;
  demonstratorLabel?: string;
  layerId: (typeof PROTOCOL_LAYERS)[number]["id"];
  purpose: string;
}>;

export const CONTROL_ALLOCATION = [
  {
    actor: "Deploying customers and parties",
    controls: "Approved data boundary, submissions, corrections and objections, subject to law and formal data duties.",
    excludedAuthority: "No unilateral control over institutional procedure or human judgment.",
  },
  {
    actor: "ZIAAP engineering",
    controls: "Shared runtime, cybersecurity, retrieval, deterministic tools, evaluation systems and technical operations.",
    excludedAuthority: "No live-case merits authority or appointment authority.",
  },
  {
    actor: "Future ZIAAP institution",
    controls: "Institutional rules, administration, professional standards and operational safeguards.",
    excludedAuthority: "Does not decide the merits of a matter.",
  },
  {
    actor: "Arbitrator partners",
    controls: "Professional standards, procedural judgment and independent case decisions.",
    excludedAuthority: "No access to other arbitrators' confidential matters or case-revenue information.",
  },
  {
    actor: "Investors",
    controls: "Ordinary governance rights consistent with the future constitutional structure.",
    excludedAuthority: "No authority over appointments, live proceedings or case merits.",
  },
] as const;

export const PUBLIC_DEMO_STEPS = [
  { id: "align", label: "Align", contextLabel: "I0 · Gate 1", canonicalGates: ["alignment"] },
  {
    id: "test",
    label: "Test",
    contextLabel: "I0 · Gate 2 / I1 · Gate 3 integrity",
    canonicalGates: ["configuration", "appointment_configuration_freeze"],
  },
  { id: "dispute", label: "Dispute", contextLabel: "I1 · Gate 4", canonicalGates: ["case_production"] },
  { id: "review", label: "Review", contextLabel: "I2 · Gate 5", canonicalGates: ["independent_adjudication"] },
  { id: "outcome", label: "Outcome", contextLabel: "I2 · Gate 6", canonicalGates: ["award_black_box"] },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  contextLabel: string;
  canonicalGates: ReadonlyArray<MatterGate>;
}>;

export type ProtocolLayer = (typeof PROTOCOL_LAYERS)[number]["id"];
export type MatterGate = (typeof MATTER_GATES)[number]["id"];
export type PublicDemoStep = (typeof PUBLIC_DEMO_STEPS)[number]["id"];
export type MaturityLevel = "C0" | "C1" | "P1" | "P2" | "P3" | "V1" | "R1";
