import { describe, expect, it } from "vitest";
import { getDemoState } from "@/lib/demo-data";
import { buildDemonstrationDossier } from "@/lib/dossier";
import { prepareProtocolManifest, simulateAppointmentTransition } from "@/lib/protocol";

async function completeSyntheticJourney() {
  const state = getDemoState();
  state.parties.forEach((party) => { party.confirmed = true; });
  state.decisions.forEach((decision) => { decision.confirmations = { supplier: decision.version, customer: decision.version }; decision.materialStatus = "agreed_contractual_text"; });
  state.constitution.simulatedAcknowledgements = { supplier: state.constitution.version, customer: state.constitution.version };
  state.calibrationScenarios.forEach((scenario) => {
    const artifactId = `${scenario.id}-illustrative-v1`;
    scenario.result = { summary: "Observed behavior", behavior: "Safeguards preserved", safeguardsObserved: scenario.requiredSafeguards, outcome: scenario.acceptableBehavior, limitations: ["Not independently evaluated"], artifactId, executionStatus: "illustrative_only", materialStatus: "calibration_result", actor: "Concept curator", version: "1.0", provenance: "Curated offline synthetic scenario fixture", consequence: "Eligible for simulated acknowledgement only", legalEffect: false };
    scenario.selectedArtifactId = artifactId;
    scenario.simulatedAcknowledgements = { supplier: artifactId, customer: artifactId };
  });
  const prepared = await prepareProtocolManifest(state);
  const hash = prepared.appointment.manifestHash!;
  prepared.lifecycleStatus = "manifest_acknowledged";
  prepared.appointment.simulatedAcknowledgements = { supplier: hash, customer: hash };
  prepared.appointment.disclosuresReviewed = true;
  prepared.appointment.simulatedArbitratorAccepted = true;
  const transition = await simulateAppointmentTransition(prepared);
  if (!transition.ok) throw new Error(transition.reason);
  const complete = transition.state;
  complete.settlement.status = "not_settled";
  complete.settlement.consents = { supplier: true, customer: true };
  complete.settlement.responses = { supplier: "decline", customer: "pending" };
  complete.settlement.proposal = { id: "sealed", label: "System-generated, non-binding settlement proposal", terms: ["SECRET SETTLEMENT TERM"], basis: "SECRET CONCESSION", sourceScope: "Shared case record only", materialStatus: "sealed_settlement" };
  complete.settlement.meritsRecord = ["Settlement facilitation ended without settlement."];
  complete.reasoningMemorandum = { id: "reasoning-memorandum", configurationHash: hash, issues: ["credit"], findings: ["CHF 1,500"], sourceIds: ["source-draft-sla"], counterarguments: ["causation disputed"], uncertainty: ["notice record missing"], escalationFlags: ["human_judgment"], reasoningSummary: "Mechanical credit only; residual issues reserved.", proposedDisposition: "Illustrate the credit and reserve residual issues.", materialStatus: "reasoning_memorandum", independentLegalEffect: false, metadata: { executionMode: "illustrative", executionStatus: "illustrative_only", artifactId: "reasoning-memorandum-illustrative-v1", label: "Illustrative reasoning memorandum", provenance: "Curated offline synthetic fixture" } };
  complete.humanDecision = { preliminaryAssessment: "Independent fictional view", status: "modified", rationale: "The fictional human record modifies the provisional reasoning.", checklist: { sourcesReviewed: true, objectionsReviewed: true, calibrationChecked: true, independentJudgment: true }, simulatedDecisionRecord: "simulated decision record · no legal effect", materialStatus: "human_decision" };
  complete.lifecycleStatus = "closed";
  complete.dispute.stage = "closed";
  return complete;
}

describe("state-derived demonstration dossier", () => {
  it("shows pending artifacts without inventing completion", () => {
    const dossier = buildDemonstrationDossier(getDemoState());
    expect(dossier.artifacts).toHaveLength(12);
    expect(dossier.complete).toBe(false);
    expect(dossier.externalValidation).toBe("pending");
    expect(dossier.artifacts.find((artifact) => artifact.id === "appointment-record")?.available).toBe(false);
  });

  it("produces all twelve artifacts after the complete synthetic journey", async () => {
    const dossier = buildDemonstrationDossier(await completeSyntheticJourney());
    expect(dossier.complete).toBe(true);
    expect(dossier.availableCount).toBe(12);
    expect(dossier.artifacts.every((artifact) => artifact.lifecycleMode === "simulation_only" && artifact.legalEffect === false)).toBe(true);
    expect(dossier.artifacts.some((artifact) => artifact.executionStatus === "validated")).toBe(false);
  });

  it("keeps sealed settlement proposal content out of the dossier and merits-facing artifacts", async () => {
    const serialized = JSON.stringify(buildDemonstrationDossier(await completeSyntheticJourney()));
    expect(serialized).not.toContain("SECRET SETTLEMENT TERM");
    expect(serialized).not.toContain("SECRET CONCESSION");
  });
});
