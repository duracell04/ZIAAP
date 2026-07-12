import { describe, expect, it } from "vitest";
import { getDemoState } from "@/lib/demo-data";
import {
  allCalibrationApproved, buildAdjudicationInput, buildProtocolManifest, canAppoint, canonicalize, computeProtocolHash,
  humanDecisionCanSign, invalidateProtocolState, settlementCanActivate,
} from "@/lib/protocol";

describe("version-locked ZIAAP appointment", () => {
  it("canonicalizes object keys and produces a stable SHA-256 hash", async () => {
    expect(canonicalize({ b: 2, a: 1 })).toBe(canonicalize({ a: 1, b: 2 }));
    const state = getDemoState();
    const first = await computeProtocolHash(buildProtocolManifest(state));
    const second = await computeProtocolHash(buildProtocolManifest(structuredClone(state)));
    expect(first).toBe(second);
    expect(first).toMatch(/^sha256:[a-f0-9]{64}$/);
  });

  it("changes the manifest hash when a behavior-affecting principle changes", async () => {
    const state = getDemoState();
    const original = await computeProtocolHash(buildProtocolManifest(state));
    state.constitution.principles.fairness += " Additional response round.";
    expect(await computeProtocolHash(buildProtocolManifest(state))).not.toBe(original);
  });

  it("invalidates calibration, appointment, and dispute binding after amendment", () => {
    const state = getDemoState();
    state.appointment.status = "appointed";
    state.appointment.manifestHash = "sha256:test";
    state.dispute.appointmentHash = "sha256:test";
    const amended = invalidateProtocolState(state, { ...state.constitution, principles: { ...state.constitution.principles, fairness: "Changed" } });
    expect(amended.constitution.version).toBe(2);
    expect(amended.calibrationScenarios.every((scenario) => !scenario.passed && scenario.result === null)).toBe(true);
    expect(amended.appointment).toMatchObject({ status: "draft", manifestHash: null, simulatedSignature: null });
    expect(amended.dispute.appointmentHash).toBeNull();
  });

  it("requires every calibration pass and bilateral behavior approval", () => {
    const state = getDemoState();
    expect(allCalibrationApproved(state.calibrationScenarios)).toBe(false);
    for (const scenario of state.calibrationScenarios) {
      scenario.passed = true;
      scenario.approvals = { supplier: true, customer: true };
    }
    expect(allCalibrationApproved(state.calibrationScenarios)).toBe(true);
  });

  it("requires exact-hash party approval plus human acceptance", () => {
    const state = getDemoState();
    state.appointment.manifestHash = "sha256:appointed";
    state.appointment.confirmations = { supplier: "sha256:appointed", customer: "sha256:appointed" };
    state.appointment.disclosuresReviewed = true;
    state.appointment.arbitratorAccepted = true;
    expect(canAppoint(state)).toBe(true);
    state.appointment.confirmations.customer = "sha256:stale";
    expect(canAppoint(state)).toBe(false);
  });

  it("keeps settlement bilateral and human award signing independently gated", () => {
    const state = getDemoState();
    state.appointment.status = "appointed";
    state.settlement.consents = { supplier: true, customer: false };
    expect(settlementCanActivate(state)).toBe(false);
    state.settlement.consents.customer = true;
    expect(settlementCanActivate(state)).toBe(true);

    state.proposedDetermination = {
      id: "d", appointmentHash: "h", issues: ["issue"], findings: ["finding"], sourceIds: ["source"],
      counterarguments: ["counter"], uncertainty: ["uncertain"], escalationFlags: ["human"],
      reasoningSummary: "summary", proposedDisposition: "proposal", materialStatus: "proposed_determination",
      independentLegalEffect: false, metadata: { mode: "cached", label: "cached" },
    };
    state.humanDecision = {
      preliminaryAssessment: "Independent view", status: "adopted", rationale: "Reviewed and adopted for these reasons.",
      checklist: { sourcesReviewed: true, objectionsReviewed: true, calibrationChecked: true, independentJudgment: true },
      simulatedSignature: null, materialStatus: "human_decision",
    };
    expect(humanDecisionCanSign(state)).toBe(true);
    state.humanDecision.checklist.independentJudgment = false;
    expect(humanDecisionCanSign(state)).toBe(false);
  });

  it("constructs adjudication input without sealed settlement content", () => {
    const state = getDemoState();
    state.settlement.proposal = {
      id: "sealed", label: "System-generated, non-binding settlement proposal", terms: ["SECRET TERM"],
      basis: "SECRET CONCESSION", sourceScope: "Shared case record only", materialStatus: "sealed_settlement",
    };
    const serialized = JSON.stringify(buildAdjudicationInput(state, "sha256:test"));
    expect(serialized).not.toContain("SECRET TERM");
    expect(serialized).not.toContain("SECRET CONCESSION");
    expect(buildAdjudicationInput(state, "sha256:test")).not.toHaveProperty("settlement");
  });
});
