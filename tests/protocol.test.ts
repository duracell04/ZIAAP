import { describe, expect, it } from "vitest";
import { getDemoState } from "@/lib/demo-data";
import type { ContractState, ExecutionStatus } from "@/lib/case-model";
import {
  allStressTestsAcknowledged, buildAdjudicationInput, buildProtocolManifest, canSimulateAppointment,
  canonicalize, computeProtocolHash, invalidateProtocolState, prepareProtocolManifest,
  simulateAppointmentTransition,
} from "@/lib/protocol";

function artifact(id: string, executionStatus: ExecutionStatus = "illustrative_only") {
  return { summary: "Observed behavior", behavior: "Preserved safeguards", safeguardsObserved: ["notice"], outcome: "Illustrative outcome", limitations: ["Not independently evaluated"], artifactId: id, executionStatus, materialStatus: "calibration_result" as const, actor: "Showcase curator", version: "1.0", provenance: "Synthetic test fixture", consequence: "Simulation acknowledgement only", legalEffect: false as const };
}

function readyState() {
  const state = getDemoState();
  state.parties.forEach((party) => { party.confirmed = true; });
  state.decisions.forEach((decision) => { decision.confirmations = { supplier: decision.version, customer: decision.version }; decision.materialStatus = "agreed_contractual_text"; });
  state.constitution.simulatedAcknowledgements = { supplier: state.constitution.version, customer: state.constitution.version };
  state.calibrationScenarios.forEach((scenario) => {
    const result = artifact(`${scenario.id}-fixture`);
    scenario.result = result; scenario.selectedArtifactId = result.artifactId;
    scenario.simulatedAcknowledgements = { supplier: result.artifactId, customer: result.artifactId };
  });
  return state;
}

async function acknowledgedState() {
  const prepared = await prepareProtocolManifest(readyState());
  const hash = prepared.appointment.manifestHash!;
  prepared.lifecycleStatus = "manifest_acknowledged";
  prepared.appointment.simulatedAcknowledgements = { supplier: hash, customer: hash };
  prepared.appointment.disclosuresReviewed = true;
  prepared.appointment.simulatedArbitratorAccepted = true;
  return prepared;
}

describe("simulation-only exact protocol manifest", () => {
  it("canonicalizes keys and changes the digest after behavior-affecting edits", async () => {
    expect(canonicalize({ b: 2, a: 1 })).toBe(canonicalize({ a: 1, b: 2 }));
    const state = readyState();
    const original = await computeProtocolHash(buildProtocolManifest(state));
    state.constitution.principles.fairness += " Additional response round.";
    expect(await computeProtocolHash(buildProtocolManifest(state))).not.toBe(original);
  });

  it("accepts illustrative and executed-unverified artifacts for simulated acknowledgement", () => {
    const state = readyState();
    state.calibrationScenarios[0].result = artifact("live", "executed_unverified");
    state.calibrationScenarios[0].selectedArtifactId = "live";
    state.calibrationScenarios[0].simulatedAcknowledgements = { supplier: "live", customer: "live" };
    expect(allStressTestsAcknowledged(state.calibrationScenarios)).toBe(true);
  });

  it("blocks failed execution acknowledgement and manifest preparation", async () => {
    const state = readyState();
    state.calibrationScenarios[0].result = artifact("failed", "failed");
    state.calibrationScenarios[0].selectedArtifactId = null;
    state.calibrationScenarios[0].simulatedAcknowledgements = { supplier: null, customer: null };
    expect(allStressTestsAcknowledged(state.calibrationScenarios)).toBe(false);
    expect((await prepareProtocolManifest(state)).lifecycleStatus).toBe("draft");
  });

  it("performs the integrity-enforcing simulated appointment transition", async () => {
    const state = await acknowledgedState();
    const result = await simulateAppointmentTransition(state);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.state).toMatchObject({ lifecycleMode: "simulation_only", lifecycleStatus: "appointment_simulated", legalEffect: false });
  });

  it.each([
    ["stale manifest", (state: ContractState) => { state.decisions[0].language += " changed"; }],
    ["Constitution edit", (state: ContractState) => { state.constitution.principles.fairness += " changed"; }],
    ["scenario-result edit", (state: ContractState) => { state.calibrationScenarios[0].result!.behavior += " changed"; }],
    ["forged matching stored fields", (state: ContractState) => { state.appointment.manifestHash = "sha256:forged"; state.appointment.simulatedAcknowledgements = { supplier: "sha256:forged", customer: "sha256:forged" }; }],
    ["inconsistent Constitution version", (state: ContractState) => { state.appointment.constitutionVersion += 1; }],
  ])("rejects %s and preserves prior state", async (_label, mutate) => {
    const state = await acknowledgedState(); mutate(state);
    const before = structuredClone(state);
    const result = await simulateAppointmentTransition(state);
    expect(result.ok).toBe(false); expect(result.state).toBe(state); expect(state).toEqual(before);
  });

  it("rejects revoked acknowledgement and direct UI bypass", async () => {
    const revoked = await acknowledgedState(); revoked.appointment.simulatedAcknowledgements.customer = null;
    expect(canSimulateAppointment(revoked)).toBe(false);
    expect((await simulateAppointmentTransition(revoked)).ok).toBe(false);
    const bypass = readyState(); bypass.appointment.disclosuresReviewed = true; bypass.appointment.simulatedArbitratorAccepted = true;
    expect((await simulateAppointmentTransition(bypass)).ok).toBe(false);
  });

  it("rejects duplicate and missing scenario references", async () => {
    const duplicate = await acknowledgedState(); duplicate.appointment.calibrationIds[1] = duplicate.appointment.calibrationIds[0];
    expect((await simulateAppointmentTransition(duplicate)).ok).toBe(false);
    const missing = await acknowledgedState(); missing.appointment.calibrationIds.pop();
    expect((await simulateAppointmentTransition(missing)).ok).toBe(false);
  });

  it("invalidates manifest, stress artifacts, and dispute binding after Constitution amendment", async () => {
    const state = await acknowledgedState(); state.dispute.appointmentHash = state.appointment.manifestHash;
    const amended = invalidateProtocolState(state, { ...state.constitution, principles: { ...state.constitution.principles, fairness: "Changed" } });
    expect(amended.lifecycleStatus).toBe("draft"); expect(amended.appointment.manifestHash).toBeNull();
    expect(amended.calibrationScenarios.every((scenario) => scenario.result === null && scenario.selectedArtifactId === null)).toBe(true);
    expect(amended.dispute.appointmentHash).toBeNull();
  });

  it("constructs adjudication input without sealed settlement content", () => {
    const state = getDemoState();
    state.settlement.proposal = { id: "sealed", label: "System-generated, non-binding settlement proposal", terms: ["SECRET TERM"], basis: "SECRET CONCESSION", sourceScope: "Shared case record only", materialStatus: "sealed_settlement" };
    const serialized = JSON.stringify(buildAdjudicationInput(state, "sha256:test"));
    expect(serialized).not.toContain("SECRET TERM"); expect(serialized).not.toContain("SECRET CONCESSION");
  });
});
