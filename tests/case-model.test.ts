import { describe, expect, it } from "vitest";
import { applyOption, buildAlignmentAnnex, contractStateSchema, isBilateralConfirmation, normalizeDecisionStatus, updateDecisionLanguage } from "@/lib/case-model";
import { getDemoState } from "@/lib/demo-data";

describe("lawyer-grade contract state", () => {
  it("validates the fixture and its explicit status vocabulary", () => {
    const state = contractStateSchema.parse(getDemoState());
    expect(state.analysis.findings).toHaveLength(3);
    expect(state.analysis.findings.every((finding) => finding.materialStatus === "provisional_ai_analysis" && finding.sourceIds.length > 0)).toBe(true);
    expect(state).toMatchObject({ lifecycleMode: "simulation_only", lifecycleStatus: "draft", legalEffect: false, syntheticData: true });
    expect(state.constitution).toMatchObject({ materialStatus: "protocol_constitution" });
    expect(state.calibrationScenarios).toHaveLength(4);
    expect(state.appointment.manifestHash).toBeNull();
    expect(state.proposedDetermination).toBeNull();
  });

  it("requires both parties to confirm the exact clause version", () => {
    const decision = getDemoState().decisions[0];
    expect(isBilateralConfirmation({ ...decision, confirmations: { supplier: 1, customer: null } })).toBe(false);
    expect(isBilateralConfirmation({ ...decision, confirmations: { supplier: 1, customer: 1 } })).toBe(true);
    expect(isBilateralConfirmation({ ...decision, version: 2, confirmations: { supplier: 1, customer: 1 } })).toBe(false);
  });

  it("invalidates confirmations when accepted language changes", () => {
    const decision = normalizeDecisionStatus({ ...getDemoState().decisions[0], confirmations: { supplier: 1, customer: 1 } });
    const updated = updateDecisionLanguage(decision, `${decision.language} Updated.`);
    expect(updated).toMatchObject({ version: 2, confirmations: { supplier: null, customer: null }, materialStatus: "draft" });
  });

  it("propagates selected option state into the generated Annex", () => {
    const state = getDemoState();
    const uptime = state.decisions[0];
    const alternative = state.analysis.findings[0].options[1];
    state.decisions[0] = applyOption(uptime, alternative);
    const annex = buildAlignmentAnnex(state);
    expect(annex.decisions[0].serviceCreditRule).toEqual(alternative.serviceCreditRule);
    expect(annex.decisions[0].language).toBe(alternative.language);
    expect(annex.generatedFromState).toBe(true);
  });

  it("rejects reserved authoritative, validated, and ordinary appointed state", () => {
    const authoritative = structuredClone(getDemoState()) as unknown as Record<string, unknown>;
    authoritative.lifecycleMode = "authoritative";
    expect(contractStateSchema.safeParse(authoritative).success).toBe(false);

    const validated = structuredClone(getDemoState());
    validated.analysis.metadata.executionStatus = "validated";
    expect(contractStateSchema.safeParse(validated).success).toBe(false);

    const appointed = structuredClone(getDemoState()) as unknown as { appointment: Record<string, unknown> };
    appointed.appointment.status = "appointed";
    expect(contractStateSchema.safeParse(appointed).success).toBe(false);
  });

  it("resets cleanly after a failed-artifact selection attempt", () => {
    const original = getDemoState();
    const failed = structuredClone(original);
    failed.calibrationScenarios[0].result = {
      summary: "Failed", behavior: "No usable output", safeguardsObserved: ["none"], outcome: "Failure",
      limitations: ["Provider failed"], artifactId: "failed", executionStatus: "failed", materialStatus: "calibration_result",
      actor: "Provider", version: "1.0", provenance: "Failed synthetic attempt", consequence: "Acknowledgement blocked", legalEffect: false,
    };
    failed.calibrationScenarios[0].selectedArtifactId = null;
    expect(contractStateSchema.safeParse(failed).success).toBe(true);
    expect(getDemoState()).toEqual(original);
  });
});
