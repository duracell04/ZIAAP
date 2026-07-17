import { describe, expect, it } from "vitest";
import {
  MINIMAL_DEMO_SCHEMA_VERSION,
  MINIMAL_DEMO_STORAGE_KEY,
  canAccessPublicDemoStep,
  createMinimalDemoState,
  findMinimalDemoSources,
  getFurthestPublicDemoStep,
  minimalDemoReducer,
  minimalDemoStateSchema,
  type MinimalDemoAction,
  type MinimalDemoState,
} from "@/lib/minimal-demo";

function apply(state: MinimalDemoState, ...actions: MinimalDemoAction[]) {
  return actions.reduce(minimalDemoReducer, state);
}

function completePublicDemo() {
  return apply(
    createMinimalDemoState(),
    { type: "COMPARE_EXPECTATIONS" },
    { type: "ADOPT_WORDING" },
    { type: "RUN_CLEAR_SCENARIO" },
    { type: "RUN_MISSING_SCENARIO" },
    { type: "CONFIRM_PROTOCOL" },
    { type: "STRUCTURE_DISPUTE" },
    { type: "CONTEST_INFERENCE" },
    { type: "RECORD_PRELIMINARY" },
    { type: "REVEAL_PROPOSAL" },
    { type: "SELECT_HUMAN_ACTION", value: "modified" },
    { type: "RECORD_DECISION" },
  );
}

describe("hyper-minimal public demonstration", () => {
  it("starts as an isolated, versioned, schema-valid synthetic state", () => {
    const state = createMinimalDemoState();
    expect(state.schemaVersion).toBe(MINIMAL_DEMO_SCHEMA_VERSION);
    expect(MINIMAL_DEMO_STORAGE_KEY).toBe("ziaap:minimal-demo:v1");
    expect(minimalDemoStateSchema.safeParse(state).success).toBe(true);
    expect(state.matter).toMatchObject({
      monthlyFeeChf: 10000,
      parties: { customer: "CustomerCo", provider: "CloudProvider" },
    });
    expect(state.trace).toEqual([]);
  });

  it("rejects persisted state from another schema version", () => {
    const outdated = { ...createMinimalDemoState(), schemaVersion: 999 };
    expect(minimalDemoStateSchema.safeParse(outdated).success).toBe(false);
  });

  it("guards the public route sequence from authoritative state", () => {
    let state = createMinimalDemoState();
    expect(getFurthestPublicDemoStep(state)).toBe("align");
    expect(canAccessPublicDemoStep(state, "test")).toBe(false);

    state = apply(state, { type: "COMPARE_EXPECTATIONS" }, { type: "ADOPT_WORDING" });
    expect(getFurthestPublicDemoStep(state)).toBe("test");
    expect(canAccessPublicDemoStep(state, "test")).toBe(true);
    expect(canAccessPublicDemoStep(state, "dispute")).toBe(false);

    state = apply(
      state,
      { type: "RUN_CLEAR_SCENARIO" },
      { type: "RUN_MISSING_SCENARIO" },
      { type: "CONFIRM_PROTOCOL" },
    );
    expect(getFurthestPublicDemoStep(state)).toBe("dispute");

    state = apply(state, { type: "STRUCTURE_DISPUTE" }, { type: "CONTEST_INFERENCE" });
    expect(getFurthestPublicDemoStep(state)).toBe("review");
    expect(canAccessPublicDemoStep(state, "outcome")).toBe(false);
  });

  it("fails closed when actions are attempted before their prerequisites", () => {
    const initial = createMinimalDemoState();
    const attempted = apply(
      initial,
      { type: "RUN_CLEAR_SCENARIO" },
      { type: "CONFIRM_PROTOCOL" },
      { type: "STRUCTURE_DISPUTE" },
      { type: "CONTEST_INFERENCE" },
      { type: "REVEAL_PROPOSAL" },
      { type: "RECORD_DECISION" },
    );
    expect(attempted).toEqual(initial);
  });

  it("keeps the revised rule, scenarios, proposal, and human modification numerically consistent", () => {
    const state = completePublicDemo();
    expect(state.matter.clause.revised).toContain("10% of the monthly fee");
    expect(state.matter.clause.revised).toContain("additional complete two hours adds 5%");
    expect(state.matter.scenarios.clear.result).toBe("15% service credit · CHF 1,500");
    expect(state.matter.scenarios.missing.result).toBe("Human review required");
    expect(state.matter.review.proposal).toMatchObject({ creditPercent: 15, creditChf: 1500 });
    expect(state.matter.review.humanDecision).toMatchObject({ creditPercent: 10, creditChf: 1000 });
    expect(state.review).toMatchObject({ selectedAction: "modified", decisionRecorded: true });
    expect(getFurthestPublicDemoStep(state)).toBe("outcome");
  });

  it("propagates the party objection into the recorded review trace", () => {
    const state = completePublicDemo();
    const objection = state.trace.find((event) => event.label === "Provider objection recorded");
    const preliminary = state.trace.find((event) => event.label === "Independent preliminary assessment recorded");
    const proposal = state.trace.find((event) => event.label === "AI proposal disclosed after human pre-assessment");
    const decision = state.trace.find((event) => event.label === "Simulated human decision recorded");

    expect(objection?.detail).toBe(state.matter.dispute.objection);
    expect(preliminary!.sequence).toBeLessThan(proposal!.sequence);
    expect(proposal!.sequence).toBeLessThan(decision!.sequence);
    expect(decision?.detail).toContain("10% credit · CHF 1,000");
  });

  it("exposes only the requested curated source records", () => {
    const state = createMinimalDemoState();
    expect(findMinimalDemoSources(state.matter, ["source-provider-log", "source-invoice"]).map((source) => source.id))
      .toEqual(["source-provider-log", "source-invoice"]);
  });

  it("resets without retaining any walkthrough completion state", () => {
    const completed = completePublicDemo();
    expect(minimalDemoReducer(completed, { type: "RESET" })).toEqual(createMinimalDemoState());
  });
});
