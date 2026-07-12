import type { CalibrationScenario, ContractState } from "@/lib/case-model";

export function canonicalize(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`;
}

export function buildProtocolManifest(state: Pick<ContractState, "matter" | "decisions" | "constitution" | "calibrationScenarios">) {
  return {
    matterId: state.matter.id,
    contractDecisions: state.decisions.map((decision) => ({
      topic: decision.topic, selectedOptionId: decision.selectedOptionId, language: decision.language,
      version: decision.version, serviceCreditRule: decision.serviceCreditRule,
      evidenceHierarchy: decision.evidenceHierarchy, liabilityCapChf: decision.liabilityCapChf,
      legalArchitecture: decision.legalArchitecture, unresolvedMatters: decision.unresolvedMatters,
    })),
    constitution: {
      id: state.constitution.id, version: state.constitution.version,
      materialStatus: state.constitution.materialStatus, legalArchitecture: state.constitution.legalArchitecture,
      humanArbitrator: state.constitution.humanArbitrator, principles: state.constitution.principles,
      settlementPolicy: state.constitution.settlementPolicy, protocolIdentity: state.constitution.protocolIdentity,
      changePolicy: state.constitution.changePolicy,
    },
    calibration: state.calibrationScenarios.map((scenario) => ({
      id: scenario.id, title: scenario.title, category: scenario.category, facts: scenario.facts,
      evidence: scenario.evidence, question: scenario.question, requiredSafeguards: scenario.requiredSafeguards,
      acceptableBehavior: scenario.acceptableBehavior, result: scenario.result,
    })),
  };
}

export async function computeProtocolHash(manifest: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(canonicalize(manifest));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

export function allCalibrationApproved(scenarios: CalibrationScenario[]) {
  return scenarios.every((scenario) => scenario.passed && scenario.approvals.supplier && scenario.approvals.customer);
}

export function invalidateProtocolState(state: ContractState, constitution: ContractState["constitution"]): ContractState {
  return {
    ...state,
    constitution: { ...constitution, version: state.constitution.version + 1, status: "candidate" },
    calibrationScenarios: state.calibrationScenarios.map((scenario) => ({
      ...scenario, result: null, passed: false, approvals: { supplier: false, customer: false },
    })),
    appointment: {
      ...state.appointment, status: "draft", manifestHash: null,
      constitutionVersion: state.constitution.version + 1,
      confirmations: { supplier: null, customer: null }, disclosuresReviewed: false,
      arbitratorAccepted: false, simulatedSignature: null, frozenAt: null,
    },
    dispute: { ...state.dispute, appointmentHash: null, stage: "not_started" },
    proposedDetermination: null,
    humanDecision: {
      preliminaryAssessment: "", status: "pending", rationale: "",
      checklist: { sourcesReviewed: false, objectionsReviewed: false, calibrationChecked: false, independentJudgment: false },
      simulatedSignature: null, materialStatus: "human_decision",
    },
  };
}

export function canAppoint(state: ContractState) {
  const hash = state.appointment.manifestHash;
  return Boolean(
    hash && state.appointment.confirmations.supplier === hash && state.appointment.confirmations.customer === hash
    && state.appointment.disclosuresReviewed && state.appointment.arbitratorAccepted,
  );
}

export function settlementCanActivate(state: ContractState) {
  return state.appointment.status === "appointed" && state.settlement.consents.supplier && state.settlement.consents.customer;
}

export function buildAdjudicationInput(state: ContractState, appointmentHash: string) {
  return {
    constitution: state.constitution,
    appointmentHash,
    contractDecisions: state.decisions,
    dispute: state.dispute,
    legalSources: state.analysis.sources,
  };
}

export function humanDecisionCanSign(state: ContractState) {
  const decision = state.humanDecision;
  return Boolean(
    state.proposedDetermination && decision.preliminaryAssessment.trim() && decision.rationale.trim()
    && decision.status !== "pending" && Object.values(decision.checklist).every(Boolean),
  );
}
