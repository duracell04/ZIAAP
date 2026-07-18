import { describe, expect, it } from "vitest";
import type { ContractState, ExecutionStatus } from "@/lib/case-model";
import { getDemoState } from "@/lib/demo-data";
import {
  buildProceduralBlackBox,
  buildReasoningMemorandumInput,
  buildStructuredCaseState,
  getActiveMatterGate,
  getGateReadiness,
} from "@/lib/operating-model";
import {
  invalidateProtocolState,
  prepareProtocolManifest,
  simulateAppointmentTransition,
} from "@/lib/protocol";

function artifact(id: string, executionStatus: ExecutionStatus = "illustrative_only") {
  return {
    summary: "Observed behavior",
    behavior: "Preserved safeguards",
    safeguardsObserved: ["notice"],
    outcome: "Illustrative outcome",
    limitations: ["Not independently evaluated"],
    artifactId: id,
    executionStatus,
    materialStatus: "calibration_result" as const,
    actor: "Concept curator",
    version: "1.0",
    provenance: "Synthetic test fixture",
    consequence: "Simulation acknowledgement only",
    legalEffect: false as const,
  };
}

function configuredState() {
  const state = getDemoState();
  state.parties.forEach((party) => { party.confirmed = true; });
  state.decisions.forEach((decision) => {
    decision.confirmations = { supplier: decision.version, customer: decision.version };
    decision.materialStatus = "agreed_contractual_text";
  });
  state.constitution.simulatedAcknowledgements = {
    supplier: state.constitution.version,
    customer: state.constitution.version,
  };
  state.calibrationScenarios.forEach((scenario) => {
    const result = artifact(`${scenario.id}-fixture`);
    scenario.result = result;
    scenario.selectedArtifactId = result.artifactId;
    scenario.simulatedAcknowledgements = {
      supplier: result.artifactId,
      customer: result.artifactId,
    };
  });
  return state;
}

async function appointedState() {
  const prepared = await prepareProtocolManifest(configuredState());
  const hash = prepared.appointment.manifestHash!;
  prepared.lifecycleStatus = "manifest_acknowledged";
  prepared.appointment.simulatedAcknowledgements = { supplier: hash, customer: hash };
  prepared.appointment.disclosuresReviewed = true;
  prepared.appointment.simulatedArbitratorAccepted = true;
  const transition = await simulateAppointmentTransition(prepared);
  if (!transition.ok) throw new Error(transition.reason);
  return transition.state;
}

function addReasoningMemorandum(state: ContractState) {
  const configurationHash = state.appointment.manifestHash!;
  state.reasoningMemorandum = {
    id: "reasoning-memorandum",
    configurationHash,
    issues: ["Contractual service credit"],
    findings: ["The deterministic rule produces a synthetic credit."],
    sourceIds: ["source-draft-sla"],
    counterarguments: ["Maintenance remains disputed."],
    uncertainty: ["Notice evidence is incomplete."],
    escalationFlags: ["human_independent_judgment"],
    reasoningSummary: "Mechanical calculation separated from contested merits.",
    proposedDisposition: "Illustrate the credit and reserve contested merits.",
    materialStatus: "reasoning_memorandum",
    independentLegalEffect: false,
    metadata: {
      executionMode: "illustrative",
      executionStatus: "illustrative_only",
      artifactId: "reasoning-memorandum-v1",
      label: "Illustrative reasoning memorandum",
      provenance: "Curated offline synthetic fixture",
    },
  };
}

describe("canonical operating-model projections", () => {
  it("derives the active gate and readiness from existing structured state", () => {
    const initial = getDemoState();
    expect(getActiveMatterGate(initial)).toBe("alignment");
    expect(getGateReadiness(initial, "alignment").status).toBe("in_progress");

    const configured = configuredState();
    expect(getGateReadiness(configured, "alignment").status).toBe("complete");
    expect(getGateReadiness(configured, "configuration").status).toBe("complete");
    expect(getActiveMatterGate(configured)).toBe("appointment_configuration_freeze");
  });

  it("projects a source-linked case state with separated mechanical calculation", async () => {
    const state = await appointedState();
    const caseState = buildStructuredCaseState(state);
    expect(caseState).toMatchObject({
      generatedFromState: true,
      legalEffect: false,
      claims: [{ party: "customer" }],
      defences: [{ party: "supplier" }],
      calculations: [{ authorityClass: "mechanical" }],
    });
    expect(caseState.evidence.available.length).toBeGreaterThan(0);
    expect(caseState.evidence.missing.length).toBeGreaterThan(0);
    expect(caseState.objections).toEqual(state.dispute.objections);
  });

  it("builds the advisory input without sealed settlement content", async () => {
    const state = await appointedState();
    state.settlement.proposal = {
      id: "sealed",
      label: "System-generated, non-binding settlement proposal",
      terms: ["SECRET TERM"],
      basis: "SECRET CONCESSION",
      sourceScope: "Shared case record only",
      materialStatus: "sealed_settlement",
    };
    const input = buildReasoningMemorandumInput(state, state.appointment.manifestHash!);
    const serialized = JSON.stringify(input);
    expect(input.configurationHash).toBe(state.appointment.manifestHash);
    expect(serialized).not.toContain("SECRET TERM");
    expect(serialized).not.toContain("SECRET CONCESSION");
    expect(input.instruction).toContain("no arbitral authority");
  });

  it("clears the memorandum when a behavior-affecting configuration changes", async () => {
    const state = await appointedState();
    addReasoningMemorandum(state);
    const amended = invalidateProtocolState(state, {
      ...state.constitution,
      principles: { ...state.constitution.principles, fairness: "Changed" },
    });
    expect(amended.reasoningMemorandum).toBeNull();
    expect(amended.appointment.manifestHash).toBeNull();
  });

  it("generates the procedural black box from events without private deliberation", async () => {
    const state = await appointedState();
    addReasoningMemorandum(state);
    state.humanDecision.preliminaryAssessment = "Private fictional working view";
    state.humanDecision.rationale = "Private fictional rationale";
    state.ledger.push({
      id: "event-2",
      timestamp: "2026-07-18T12:00:00.000Z",
      actor: "Human arbitrator · simulated",
      action: "Recorded simulated decision",
      objectId: state.dispute.id,
      authorityClass: "advisory",
      detail: "modified",
    });
    const blackBox = buildProceduralBlackBox(state);
    const serialized = JSON.stringify(blackBox);
    expect(blackBox.generatedFromRecordedEvents).toBe(true);
    expect(blackBox.privateDeliberationIncluded).toBe(false);
    expect(blackBox.events).toHaveLength(state.ledger.length);
    expect(serialized).not.toContain("Private fictional working view");
    expect(serialized).not.toContain("Private fictional rationale");
  });
});
