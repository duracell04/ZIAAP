import { z } from "zod";
import fixture from "@/data/minimal-demo-case.json";

export const MINIMAL_DEMO_SCHEMA_VERSION = 1 as const;
export const MINIMAL_DEMO_STORAGE_KEY = "ziaap:minimal-demo:v1";

const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.string(),
  excerpt: z.string(),
});

const caseMapItemSchema = z.object({
  id: z.string(),
  status: z.enum(["Agreed", "Disputed", "Missing", "Mechanical"]),
  text: z.string(),
});

export const minimalDemoMatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  parties: z.object({ customer: z.string(), provider: z.string() }),
  monthlyFeeChf: z.number().positive(),
  clause: z.object({ id: z.string(), original: z.string(), revised: z.string() }),
  expectations: z.object({ customer: z.string(), provider: z.string() }),
  divergence: z.object({ title: z.string(), summary: z.string() }),
  protocol: z.object({
    trigger: z.string(),
    creditRule: z.string(),
    evidenceRule: z.string(),
    authorityRule: z.string(),
  }),
  scenarios: z.object({
    clear: z.object({
      id: z.string(),
      title: z.string(),
      facts: z.array(z.string()),
      result: z.string(),
      explanation: z.string(),
    }),
    missing: z.object({
      id: z.string(),
      title: z.string(),
      facts: z.array(z.string()),
      result: z.string(),
      explanation: z.string(),
    }),
  }),
  sources: z.array(sourceSchema),
  dispute: z.object({
    transition: z.string(),
    headline: z.string(),
    summary: z.string(),
    caseMap: z.array(caseMapItemSchema),
    inference: z.object({
      id: z.string(),
      proposition: z.string(),
      supportingEvidence: z.array(z.string()),
      contraryEvidence: z.array(z.string()),
      status: z.string(),
      uncertainty: z.string(),
    }),
    objection: z.string(),
  }),
  review: z.object({
    preliminaryAssessment: z.string(),
    proposal: z.object({
      label: z.string(),
      creditPercent: z.number(),
      creditChf: z.number(),
      summary: z.string(),
      strongestCustomerPoint: z.string(),
      strongestProviderPoint: z.string(),
      assumption: z.string(),
    }),
    humanDecision: z.object({
      creditPercent: z.number(),
      creditChf: z.number(),
      rationale: z.string(),
    }),
  }),
});

const traceEventSchema = z.object({
  id: z.string(),
  sequence: z.number().int().positive(),
  label: z.string(),
  detail: z.string(),
  actor: z.string(),
  sourceIds: z.array(z.string()),
});

export const minimalDemoStateSchema = z.object({
  schemaVersion: z.literal(MINIMAL_DEMO_SCHEMA_VERSION),
  matter: minimalDemoMatterSchema,
  alignment: z.object({
    compared: z.boolean(),
    wordingAdopted: z.boolean(),
    confirmations: z.object({ customer: z.boolean(), provider: z.boolean() }),
  }),
  protocol: z.object({
    clearScenarioRun: z.boolean(),
    missingScenarioRun: z.boolean(),
    confirmed: z.boolean(),
  }),
  dispute: z.object({
    structured: z.boolean(),
    contested: z.boolean(),
  }),
  review: z.object({
    preliminaryAssessment: z.string(),
    preliminaryRecorded: z.boolean(),
    proposalRevealed: z.boolean(),
    selectedAction: z.enum(["pending", "adopted", "modified", "rejected"]),
    rationale: z.string(),
    decisionRecorded: z.boolean(),
  }),
  trace: z.array(traceEventSchema),
});

export type MinimalDemoMatter = z.infer<typeof minimalDemoMatterSchema>;
export type MinimalDemoState = z.infer<typeof minimalDemoStateSchema>;
export type MinimalDemoSource = MinimalDemoMatter["sources"][number];
export type MinimalDemoTraceEvent = MinimalDemoState["trace"][number];
export type HumanReviewAction = MinimalDemoState["review"]["selectedAction"];

export type MinimalDemoAction =
  | { type: "COMPARE_EXPECTATIONS" }
  | { type: "ADOPT_WORDING" }
  | { type: "RUN_CLEAR_SCENARIO" }
  | { type: "RUN_MISSING_SCENARIO" }
  | { type: "CONFIRM_PROTOCOL" }
  | { type: "STRUCTURE_DISPUTE" }
  | { type: "CONTEST_INFERENCE" }
  | { type: "SET_PRELIMINARY"; value: string }
  | { type: "RECORD_PRELIMINARY" }
  | { type: "REVEAL_PROPOSAL" }
  | { type: "SELECT_HUMAN_ACTION"; value: Exclude<HumanReviewAction, "pending"> }
  | { type: "SET_RATIONALE"; value: string }
  | { type: "RECORD_DECISION" }
  | { type: "HYDRATE"; state: MinimalDemoState }
  | { type: "RESET" };

function createTraceEvent(
  state: MinimalDemoState,
  label: string,
  detail: string,
  actor: string,
  sourceIds: string[],
): MinimalDemoTraceEvent {
  const sequence = state.trace.length + 1;
  return { id: `trace-${sequence}`, sequence, label, detail, actor, sourceIds };
}

function appendTrace(
  state: MinimalDemoState,
  label: string,
  detail: string,
  actor: string,
  sourceIds: string[] = [],
): MinimalDemoTraceEvent[] {
  return [...state.trace, createTraceEvent(state, label, detail, actor, sourceIds)];
}

export function createMinimalDemoState(): MinimalDemoState {
  const matter = minimalDemoMatterSchema.parse(fixture);
  return {
    schemaVersion: MINIMAL_DEMO_SCHEMA_VERSION,
    matter,
    alignment: {
      compared: false,
      wordingAdopted: false,
      confirmations: { customer: false, provider: false },
    },
    protocol: {
      clearScenarioRun: false,
      missingScenarioRun: false,
      confirmed: false,
    },
    dispute: {
      structured: false,
      contested: false,
    },
    review: {
      preliminaryAssessment: matter.review.preliminaryAssessment,
      preliminaryRecorded: false,
      proposalRevealed: false,
      selectedAction: "pending",
      rationale: "",
      decisionRecorded: false,
    },
    trace: [],
  };
}

export function minimalDemoReducer(state: MinimalDemoState, action: MinimalDemoAction): MinimalDemoState {
  switch (action.type) {
    case "COMPARE_EXPECTATIONS":
      if (state.alignment.compared) return state;
      return {
        ...state,
        alignment: { ...state.alignment, compared: true },
        trace: appendTrace(
          state,
          "Party divergence found",
          state.matter.divergence.summary,
          "Illustrative AI comparison",
          ["source-contract"],
        ),
      };
    case "ADOPT_WORDING":
      if (!state.alignment.compared || state.alignment.wordingAdopted) return state;
      return {
        ...state,
        alignment: {
          compared: true,
          wordingAdopted: true,
          confirmations: { customer: true, provider: true },
        },
        trace: appendTrace(
          state,
          "Clear wording confirmed in the simulation",
          state.matter.clause.revised,
          "CustomerCo and CloudProvider · simulated",
          ["source-contract"],
        ),
      };
    case "RUN_CLEAR_SCENARIO":
      if (!state.alignment.wordingAdopted || state.protocol.clearScenarioRun) return state;
      return {
        ...state,
        protocol: { ...state.protocol, clearScenarioRun: true },
        trace: appendTrace(
          state,
          "Clear scenario tested",
          state.matter.scenarios.clear.result,
          "Deterministic scenario",
          ["source-contract", "source-invoice"],
        ),
      };
    case "RUN_MISSING_SCENARIO":
      if (!state.protocol.clearScenarioRun || state.protocol.missingScenarioRun) return state;
      return {
        ...state,
        protocol: { ...state.protocol, missingScenarioRun: true },
        trace: appendTrace(
          state,
          "Missing evidence exposed",
          state.matter.scenarios.missing.result,
          "Deterministic scenario",
          ["source-provider-log", "source-customer-record"],
        ),
      };
    case "CONFIRM_PROTOCOL":
      if (!state.protocol.missingScenarioRun || state.protocol.confirmed) return state;
      return {
        ...state,
        protocol: { ...state.protocol, confirmed: true },
        trace: appendTrace(
          state,
          "Dispute protocol confirmed in the simulation",
          "The trigger, credit, evidence, and human-authority rules are fixed for the future dispute.",
          "CustomerCo and CloudProvider · simulated",
          ["source-contract"],
        ),
      };
    case "STRUCTURE_DISPUTE":
      if (!state.protocol.confirmed || state.dispute.structured) return state;
      return {
        ...state,
        dispute: { ...state.dispute, structured: true },
        trace: appendTrace(
          state,
          "Future dispute structured",
          state.matter.dispute.summary,
          "Illustrative AI preparation",
          state.matter.sources.map((source) => source.id),
        ),
      };
    case "CONTEST_INFERENCE":
      if (!state.dispute.structured || state.dispute.contested) return state;
      return {
        ...state,
        dispute: { ...state.dispute, contested: true },
        trace: appendTrace(
          state,
          "Provider objection recorded",
          state.matter.dispute.objection,
          "CloudProvider",
          ["source-provider-log", "source-customer-record"],
        ),
      };
    case "SET_PRELIMINARY":
      if (state.review.preliminaryRecorded) return state;
      return {
        ...state,
        review: { ...state.review, preliminaryAssessment: action.value },
      };
    case "RECORD_PRELIMINARY":
      if (
        !state.dispute.contested ||
        state.review.preliminaryRecorded ||
        !state.review.preliminaryAssessment.trim()
      ) {
        return state;
      }
      return {
        ...state,
        review: { ...state.review, preliminaryRecorded: true },
        trace: appendTrace(
          state,
          "Independent preliminary assessment recorded",
          state.review.preliminaryAssessment,
          "Human arbitrator · simulated",
          ["source-provider-log", "source-customer-record"],
        ),
      };
    case "REVEAL_PROPOSAL":
      if (!state.review.preliminaryRecorded || state.review.proposalRevealed) return state;
      return {
        ...state,
        review: { ...state.review, proposalRevealed: true },
        trace: appendTrace(
          state,
          "AI proposal disclosed after human pre-assessment",
          state.matter.review.proposal.summary,
          "Illustrative AI proposal",
          ["source-contract", "source-provider-log", "source-customer-record", "source-invoice"],
        ),
      };
    case "SELECT_HUMAN_ACTION":
      if (!state.review.proposalRevealed || state.review.decisionRecorded) return state;
      return {
        ...state,
        review: {
          ...state.review,
          selectedAction: action.value,
          rationale: action.value === "modified" ? state.matter.review.humanDecision.rationale : "",
        },
      };
    case "SET_RATIONALE":
      if (state.review.decisionRecorded || state.review.selectedAction !== "modified") return state;
      return {
        ...state,
        review: { ...state.review, rationale: action.value },
      };
    case "RECORD_DECISION":
      if (
        state.review.selectedAction !== "modified" ||
        !state.review.rationale.trim() ||
        state.review.decisionRecorded
      ) {
        return state;
      }
      return {
        ...state,
        review: { ...state.review, decisionRecorded: true },
        trace: appendTrace(
          state,
          "Simulated human decision recorded",
          `${state.matter.review.humanDecision.creditPercent}% credit · CHF ${state.matter.review.humanDecision.creditChf.toLocaleString("en-US")}. ${state.review.rationale}`,
          "Human arbitrator · simulated",
          ["source-contract", "source-provider-log", "source-customer-record", "source-invoice"],
        ),
      };
    case "HYDRATE": {
      const parsed = minimalDemoStateSchema.safeParse(action.state);
      return parsed.success ? parsed.data : createMinimalDemoState();
    }
    case "RESET":
      return createMinimalDemoState();
    default:
      return state;
  }
}

export const publicDemoStepIds = ["align", "test", "dispute", "review", "outcome"] as const;
export type PublicDemoStepId = (typeof publicDemoStepIds)[number];

export function canAccessPublicDemoStep(state: MinimalDemoState, step: PublicDemoStepId): boolean {
  switch (step) {
    case "align":
      return true;
    case "test":
      return state.alignment.wordingAdopted;
    case "dispute":
      return state.protocol.confirmed;
    case "review":
      return state.dispute.contested;
    case "outcome":
      return state.review.decisionRecorded;
  }
}

export function getFurthestPublicDemoStep(state: MinimalDemoState): PublicDemoStepId {
  if (state.review.decisionRecorded) return "outcome";
  if (state.dispute.contested) return "review";
  if (state.protocol.confirmed) return "dispute";
  if (state.alignment.wordingAdopted) return "test";
  return "align";
}

export function findMinimalDemoSources(
  matter: MinimalDemoMatter,
  sourceIds: string[],
): MinimalDemoSource[] {
  const requested = new Set(sourceIds);
  return matter.sources.filter((source) => requested.has(source.id));
}
