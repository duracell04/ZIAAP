import { describe, expect, it } from "vitest";
import { applyOption, buildAlignmentAnnex, contractStateSchema, isBilateralConfirmation, normalizeDecisionStatus, updateDecisionLanguage } from "@/lib/case-model";
import { getDemoState } from "@/lib/demo-data";

describe("lawyer-grade contract state", () => {
  it("validates the fixture and its explicit status vocabulary", () => {
    const state = contractStateSchema.parse(getDemoState());
    expect(state.analysis.findings).toHaveLength(3);
    expect(state.analysis.findings.every((finding) => finding.materialStatus === "provisional_ai_analysis" && finding.sourceIds.length > 0)).toBe(true);
    expect(state.residualReviewPacket).toMatchObject({ materialStatus: "reserved_for_human_review", noAutomatedConclusion: true });
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
});
