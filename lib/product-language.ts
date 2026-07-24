export const PRODUCT_PROMISE = "Align material contract expectations before you sign.";

export const CURRENT_PRODUCT_NAME = "ZIAAP Contract Alignment";

export const ZIAAP_ACRONYM_EXPANSION = "Zero-Instance Algorithmic Arbitration Protocol";

export const ZERO_INSTANCE_EXPLAINER =
  "“Zero Instance” describes the pre-conflict stage in which parties compare operational expectations and govern material differences before signing.";

export const ZIAAP_TAGLINE = "Contract alignment, made inspectable";

export const NORTH_STAR_AMBITION =
  "The same governed data model may later support lifecycle re-alignment, confidential mediation, and structured handover to independent human adjudication, with strict separation between commercial platform economics and neutral authority.";

export const CATEGORY_THESIS = "Computational Private Ordering";

export const NEUTRALITY_PRINCIPLE =
  "ZIAAP OpCo owns the software and commercial relationships but does not exercise mediation, appointment, adjudicative, or award authority.";

export const PILOT_01_DEFINITION =
  "Pilot 01 applies the ZIAAP alignment protocol to selected high-impact clauses in complex enterprise systems-integration MSAs. Its purpose is to test whether the protocol identifies commercially material differences in expected contractual outcomes that the parties and their advisers had not already recognised.";

export const OPERATING_PRINCIPLE =
  "Sell the narrow product. Preserve the larger architecture. Prove the bridge between them.";

export const BRAND_PROMISE =
  "Structure the scenarios. Preserve the originals. Let the parties decide.";

export const CANONICAL_PRODUCT_DEFINITION =
  "ZIAAP is a scenario-based contract-alignment system for complex commercial agreements. It converts selected clauses into concrete operational scenarios, collects the parties’ independent expectations, identifies materially different outcomes, and produces a versioned record of what was aligned, deliberately left open, or incorporated into the contract.";

export const PUBLIC_DEMO_HEADLINE = "Align expectations before you sign.";

export const PUBLIC_DEMO_PRODUCT_BOUNDARY =
  "The current product ends with a versioned alignment record. Lifecycle re-alignment, mediation support, and arbitral handover are future extensions.";

export const PUBLIC_DEMO_DESCRIPTION =
  "Turn selected clauses into operational scenarios, compare each party’s independently confirmed expectations, and record what was aligned or deliberately left open.";

export const PUBLIC_DEMO_AUTHORITY_LINE =
  "AI structures scenarios. Each party confirms its own position.";

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
    purpose: "Align contractual expectations and govern material open issues before conflict.",
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
    controls: "Approved data boundary, independent responses, corrections, bilateral dispositions and external adoption acts.",
    excludedAuthority: "No unilateral control over the counterparty's position or later neutral judgment.",
  },
  {
    actor: "ZIAAP OpCo",
    controls: "Software, product revenue, implementation, cybersecurity and technical operations.",
    excludedAuthority: "No mediation, appointment, adjudicative or award authority.",
  },
  {
    actor: "Alignment facilitators",
    controls: "Scoped I0 facilitation under separate, disclosed engagement terms.",
    excludedAuthority: "No later mediation or adjudication of a dispute arising from that engagement.",
  },
  {
    actor: "Independent professionals and institutions",
    controls: "Any later mediation, appointment, procedure, evidence assessment and human judgment under their own authority.",
    excludedAuthority: "No automatic access to I0 private material or platform economics that compromise independence.",
  },
  {
    actor: "Investors",
    controls: "Ordinary governance rights consistent with the future constitutional structure.",
    excludedAuthority: "No authority over appointments, live proceedings or case merits.",
  },
] as const;

export const PUBLIC_DEMO_STEPS = [
  {
    id: "align",
    label: "Align",
    contextLabel: "I0 · Gate 1",
    canonicalGates: ["alignment"],
    commercialStatus: "current_product",
    statusLabel: "ZIAAP Contract Alignment",
  },
  {
    id: "test",
    label: "Test scenarios",
    contextLabel: "I0 · Gate 2",
    canonicalGates: ["configuration"],
    commercialStatus: "current_product",
    statusLabel: "ZIAAP Contract Alignment",
  },
  {
    id: "dispute",
    label: "Structure dispute",
    contextLabel: "I1 · Gate 4",
    canonicalGates: ["case_production"],
    commercialStatus: "future_extension",
    statusLabel: "Future architecture",
  },
  {
    id: "review",
    label: "Human review",
    contextLabel: "I2 · Gate 5",
    canonicalGates: ["independent_adjudication"],
    commercialStatus: "future_extension",
    statusLabel: "Future architecture",
  },
  {
    id: "outcome",
    label: "Procedural record",
    contextLabel: "I2 · Gate 6",
    canonicalGates: ["award_black_box"],
    commercialStatus: "future_extension",
    statusLabel: "Future architecture",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  contextLabel: string;
  canonicalGates: ReadonlyArray<MatterGate>;
  commercialStatus: "current_product" | "future_extension";
  statusLabel: string;
}>;

export type ProtocolLayer = (typeof PROTOCOL_LAYERS)[number]["id"];
export type MatterGate = (typeof MATTER_GATES)[number]["id"];
export type PublicDemoStep = (typeof PUBLIC_DEMO_STEPS)[number]["id"];
export type MaturityLevel = "C0" | "C1" | "P1" | "P2" | "P3" | "V1" | "R1";
