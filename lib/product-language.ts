export const PRODUCT_PROMISE = "Test your dispute-resolution system before you sign the contract.";

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

export const LIFECYCLE_STAGES = [
  { id: "party_alignment", label: "Party Alignment" },
  { id: "protocol_constitution", label: "Protocol Constitution" },
  { id: "scenario_laboratory", label: "Scenario Laboratory" },
  { id: "configuration_manifest", label: "Configuration Manifest" },
  { id: "later_dispute", label: "Later Dispute" },
  { id: "audit_dossier", label: "Audit Dossier" },
] as const;

export const PUBLIC_DEMO_STEPS = [
  { id: "align", label: "Align", canonicalStages: ["party_alignment"] },
  {
    id: "test",
    label: "Test",
    canonicalStages: ["protocol_constitution", "scenario_laboratory", "configuration_manifest"],
  },
  { id: "dispute", label: "Dispute", canonicalStages: ["later_dispute"] },
  { id: "review", label: "Review", canonicalStages: ["later_dispute"] },
  { id: "outcome", label: "Outcome", canonicalStages: ["audit_dossier"] },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  canonicalStages: ReadonlyArray<(typeof LIFECYCLE_STAGES)[number]["id"]>;
}>;

export type LifecycleStage = (typeof LIFECYCLE_STAGES)[number]["id"];
export type PublicDemoStep = (typeof PUBLIC_DEMO_STEPS)[number]["id"];
export type MaturityLevel = "C0" | "C1" | "P1" | "P2" | "P3" | "V1" | "R1";
