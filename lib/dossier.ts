import { buildAlignmentAnnex, type ContractState, type ExecutionStatus } from "@/lib/case-model";
import { buildProtocolManifest } from "@/lib/protocol";
import { calculateServiceCredit } from "@/lib/scenario";

export type DossierArtifact = {
  id: string;
  index: number;
  title: string;
  artifactType: string;
  actor: string;
  authorityStatus: "simulation_only";
  lifecycleMode: "simulation_only";
  executionStatus: ExecutionStatus;
  version: string;
  provenance: string;
  consequence: string;
  legalEffect: false;
  available: boolean;
  summary: string;
  details: Array<{ label: string; value: string }>;
};

function text(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

export function buildDemonstrationDossier(state: ContractState) {
  const annex = buildAlignmentAnnex(state);
  const uptimeDecision = state.decisions.find((decision) => decision.topic === "uptime")!;
  const calculation = calculateServiceCredit(uptimeDecision.serviceCreditRule, state.alignmentScenario.actualUptimeBps, state.alignmentScenario.inputsConfirmed);
  const manifest = buildProtocolManifest(state);
  const stressResults = state.calibrationScenarios.map((scenario) => scenario.result).filter(Boolean);
  const stressExecutionStatus: ExecutionStatus = stressResults.length !== state.calibrationScenarios.length
    ? "not_executed"
    : stressResults.some((result) => result?.executionStatus === "executed_unverified") ? "executed_unverified" : "illustrative_only";
  const common = { authorityStatus: "simulation_only" as const, lifecycleMode: "simulation_only" as const, legalEffect: false as const };

  const artifacts: DossierArtifact[] = [
    { ...common, id: "alignment-annex", index: 1, title: "Contract Governance Alignment Annex", artifactType: "agreed_contractual_text", actor: "Supplier and customer · simulated", executionStatus: "not_executed", version: `Decision versions ${state.decisions.map((decision) => decision.version).join("/")}`, provenance: "Selected and exact-version bilaterally confirmed terms", consequence: "Defines the synthetic contract-governance baseline", available: annex.ready, summary: annex.ready ? "All three selected terms are bilaterally confirmed and compiled into the Annex." : "Pending exact-version bilateral confirmation.", details: state.decisions.map((decision) => ({ label: decision.topic, value: decision.language })) },
    { ...common, id: "divergence-report", index: 2, title: "Divergence and Resolution Report", artifactType: "provisional_ai_analysis", actor: state.analysis.metadata.executionMode === "live" ? "Declared live model" : "Showcase curator", executionStatus: state.analysis.metadata.executionStatus, version: state.analysis.metadata.artifactId, provenance: state.analysis.metadata.provenance, consequence: "Explains how conflicting expectations map to selected options", available: true, summary: `${state.analysis.findings.length} source-linked divergences; AI-supported analysis, not legal advice.`, details: state.analysis.findings.map((finding) => ({ label: finding.title, value: `Selected: ${state.decisions.find((decision) => decision.topic === finding.topic)?.selectedOptionId}. Consequence: ${finding.consequence}` })) },
    { ...common, id: "formula-spec", index: 3, title: "Executable Formula and Evidence Specification", artifactType: "reproducible_calculation", actor: "Deterministic calculator", executionStatus: "not_executed", version: `Decision v${uptimeDecision.version}`, provenance: "Confirmed service-credit rule and synthetic scenario inputs", consequence: "Reproduces the contractual credit without deciding broader liability", available: calculation.status === "calculated", summary: calculation.status === "calculated" ? `CHF ${calculation.creditChf?.toLocaleString()} service credit under the confirmed formula.` : calculation.explanation, details: [{ label: "Formula", value: calculation.formula }, { label: "Evidence hierarchy", value: text(uptimeDecision.evidenceHierarchy) }, { label: "Explanation", value: calculation.explanation }] },
    { ...common, id: "constitution", index: 4, title: "Arbitrator Constitution", artifactType: "protocol_constitution", actor: "Supplier and customer · simulated", executionStatus: "not_executed", version: `Constitution v${state.constitution.version}`, provenance: "Relationship-specific inference-time configuration", consequence: "Configures protocol reasoning without modifying model weights", available: true, summary: "Twelve inspectable calibration decisions plus declared protocol identity and legal architecture.", details: [...Object.entries(state.constitution.principles).map(([label, value]) => ({ label, value })), { label: "Settlement firewall", value: text(state.constitution.settlementPolicy) }, { label: "Change policy", value: state.constitution.changePolicy }] },
    { ...common, id: "stress-report", index: 5, title: "Stress-Test and Simulation Report", artifactType: "calibration_result", actor: stressExecutionStatus === "executed_unverified" ? "Declared live model" : "Showcase curator", executionStatus: stressExecutionStatus, version: `Constitution v${state.constitution.version}`, provenance: "Four selected synthetic stress-test artifacts", consequence: "Supports simulated acknowledgement only; does not independently validate", available: stressResults.length === state.calibrationScenarios.length, summary: `${stressResults.length} of ${state.calibrationScenarios.length} stress artifacts available.`, details: state.calibrationScenarios.map((scenario) => ({ label: scenario.title, value: scenario.result ? `${scenario.result.executionStatus}: ${scenario.result.outcome}. ${scenario.result.limitations.join(" ")}` : "Not executed" })) },
    { ...common, id: "protocol-manifest", index: 6, title: "Protocol Manifest", artifactType: "exact_protocol_manifest", actor: "Showcase transition verifier", executionStatus: "not_executed", version: `Manifest v${state.appointment.manifestVersion}`, provenance: "Canonical selected protocol configuration and SHA-256 digest", consequence: "Supports internal simulation consistency and stale-state detection", available: Boolean(state.appointment.manifestHash), summary: state.appointment.manifestHash ?? "Manifest not prepared.", details: [{ label: "SHA-256", value: state.appointment.manifestHash ?? "Pending" }, { label: "Canonical contents", value: text(manifest) }, { label: "Boundary", value: "Not a build, dependency, provider, environment, runtime, identity, or signature attestation." }] },
    { ...common, id: "appointment-record", index: 7, title: "Simulated Appointment Record", artifactType: "appointment_record", actor: state.constitution.humanArbitrator.name, executionStatus: "not_executed", version: `Manifest v${state.appointment.manifestVersion}`, provenance: "Integrity-verified browser simulation transition", consequence: "Opens only the synthetic dispute route; creates no legal appointment", available: Boolean(state.appointment.simulatedAt), summary: state.appointment.simulatedAcceptanceRecord ?? "Simulated ceremony not completed.", details: [{ label: "Disclosure reviewed", value: String(state.appointment.disclosuresReviewed) }, { label: "Simulated acceptance", value: String(state.appointment.simulatedArbitratorAccepted) }, { label: "Timestamp", value: state.appointment.simulatedAt ?? "Pending" }] },
    { ...common, id: "later-dispute", index: 8, title: "Synthetic Later Dispute Record", artifactType: "synthetic_merits_record", actor: "Supplier and customer · simulated", executionStatus: "not_executed", version: state.dispute.id, provenance: "Curated synthetic claim, defence, evidence, objections, and missing evidence", consequence: "Defines the shared merits record bound to the manifest", available: Boolean(state.dispute.appointmentHash), summary: state.dispute.claim, details: [{ label: "Defence", value: state.dispute.defence }, { label: "Shared evidence", value: state.dispute.sharedEvidence.join(" · ") }, { label: "Missing evidence", value: state.dispute.missingEvidence.join(" · ") }] },
    { ...common, id: "settlement-status", index: 9, title: "Settlement Facilitation Status", artifactType: "sealed_settlement_status", actor: "Supplier and customer · simulated", executionStatus: "not_executed", version: "Settlement track v1", provenance: "Purpose-separated synthetic settlement track", consequence: "Reports status only; proposal content remains outside merits", available: Boolean(state.appointment.simulatedAt), summary: `Settlement status: ${state.settlement.status}.`, details: [{ label: "Consent", value: text(state.settlement.consents) }, { label: "Responses", value: text(state.settlement.responses) }, { label: "Merits-visible record", value: state.settlement.meritsRecord.join(" ") || "No settlement content in merits." }] },
    { ...common, id: "provisional-determination", index: 10, title: "Provisional Simulation-Only Determination", artifactType: "proposed_determination", actor: state.proposedDetermination?.metadata.executionMode === "live" ? "Declared live model" : "Showcase curator", executionStatus: state.proposedDetermination?.metadata.executionStatus ?? "not_executed", version: state.proposedDetermination?.metadata.artifactId ?? "Pending", provenance: state.proposedDetermination?.metadata.provenance ?? "No artifact selected", consequence: "Supports fictional human review only; cannot operate as an award", available: Boolean(state.proposedDetermination), summary: state.proposedDetermination?.proposedDisposition ?? "Protocol determination not yet produced.", details: [{ label: "Reasoning summary", value: state.proposedDetermination?.reasoningSummary ?? "Pending" }, { label: "Uncertainty", value: state.proposedDetermination?.uncertainty.join(" · ") ?? "Pending" }, { label: "Escalation", value: state.proposedDetermination?.escalationFlags.join(" · ") ?? "Pending" }] },
    { ...common, id: "human-decision", index: 11, title: "Simulated Human Decision Record", artifactType: "human_decision", actor: state.constitution.humanArbitrator.name, executionStatus: "not_executed", version: "Human simulation record v1", provenance: "Fictional independent pre-assessment, rationale, and review checklist", consequence: "Demonstrates human control; creates no signature, award, or legal effect", available: Boolean(state.humanDecision.simulatedSignature), summary: state.humanDecision.simulatedSignature ? `${state.humanDecision.status}: ${state.humanDecision.rationale}` : "Fictional human decision not yet recorded.", details: [{ label: "Pre-assessment", value: state.humanDecision.preliminaryAssessment || "Pending" }, { label: "Disposition", value: state.humanDecision.status }, { label: "Checklist", value: text(state.humanDecision.checklist) }] },
    { ...common, id: "authority-summary", index: 12, title: "Authority and Limitation Summary", artifactType: "authority_summary", actor: "ZIAAP showcase", executionStatus: "not_executed", version: "Review candidate", provenance: "Canonical authority model and artifact metadata", consequence: "Prevents simulation, execution, validation, and legal authority from being conflated", available: true, summary: "Synthetic · simulation_only · legalEffect false · external validation pending.", details: [{ label: "Unavailable statuses", value: "authoritative and validated are reserved and unreachable" }, { label: "No production properties", value: "No identity verification, institutional appointment, production signature, operative award, runtime attestation, or enforcement." }, { label: "Next cycle", value: "External expert comprehension and validation remain pending." }] },
  ];

  return {
    title: "ZIAAP Synthetic Demonstration Dossier",
    lifecycleStatus: state.lifecycleStatus,
    generatedFromState: true as const,
    externalValidation: "pending" as const,
    artifacts,
    availableCount: artifacts.filter((artifact) => artifact.available).length,
    complete: artifacts.every((artifact) => artifact.available),
  };
}
