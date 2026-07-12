import type { CalibrationScenario, ContractState } from "@/lib/case-model";
import { isBilateralConfirmation } from "@/lib/case-model";
import { isSimulationEligible } from "@/lib/execution";

export function canonicalize(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`;
}

export function buildProtocolManifest(state: Pick<ContractState, "lifecycleMode" | "legalEffect" | "syntheticData" | "matter" | "parties" | "decisions" | "alignmentScenario" | "constitution" | "calibrationScenarios">) {
  return {
    manifestKind: "Exact protocol manifest", manifestVersion: 1,
    lifecycleMode: state.lifecycleMode, legalEffect: state.legalEffect, syntheticData: state.syntheticData,
    matterId: state.matter.id,
    partyProfiles: state.parties.map((party) => ({ id: party.id, confirmed: party.confirmed })),
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
    alignmentScenario: state.alignmentScenario,
    stressTestArtifacts: state.calibrationScenarios.map((scenario) => ({
      id: scenario.id, title: scenario.title, category: scenario.category, facts: scenario.facts,
      evidence: scenario.evidence, question: scenario.question, requiredSafeguards: scenario.requiredSafeguards,
      acceptableBehavior: scenario.acceptableBehavior, selectedArtifactId: scenario.selectedArtifactId, result: scenario.result,
    })),
  };
}

export async function computeProtocolHash(manifest: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(canonicalize(manifest));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

export function allStressTestsAcknowledged(scenarios: CalibrationScenario[]) {
  return scenarios.every((scenario) => {
    const artifact = scenario.result;
    return Boolean(artifact && scenario.selectedArtifactId === artifact.artifactId
      && isSimulationEligible(artifact.executionStatus)
      && scenario.simulatedAcknowledgements.supplier === artifact.artifactId
      && scenario.simulatedAcknowledgements.customer === artifact.artifactId);
  });
}

export function partyAlignmentReady(state: ContractState) {
  return state.parties.every((party) => party.confirmed)
    && state.decisions.every(isBilateralConfirmation)
    && isSimulationEligible(state.analysis.metadata.executionStatus);
}

export function canPrepareManifest(state: ContractState) {
  return state.lifecycleMode === "simulation_only" && state.lifecycleStatus === "draft"
    && partyAlignmentReady(state) && allStressTestsAcknowledged(state.calibrationScenarios);
}

export function invalidateProtocolState(state: ContractState, constitution: ContractState["constitution"]): ContractState {
  return {
    ...state,
    lifecycleStatus: "draft", constitution: { ...constitution, version: state.constitution.version + 1 },
    calibrationScenarios: state.calibrationScenarios.map((scenario) => ({
      ...scenario, result: null, selectedArtifactId: null, simulatedAcknowledgements: { supplier: null, customer: null },
    })),
    appointment: {
      ...state.appointment, manifestHash: null,
      constitutionVersion: state.constitution.version + 1,
      simulatedAcknowledgements: { supplier: null, customer: null }, disclosuresReviewed: false,
      simulatedArbitratorAccepted: false, simulatedAcceptanceRecord: null, preparedAt: null, simulatedAt: null,
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

export function invalidatePreparedManifest(state: ContractState): ContractState {
  return {
    ...state, lifecycleStatus: "draft",
    appointment: { ...state.appointment, manifestHash: null, simulatedAcknowledgements: { supplier: null, customer: null }, disclosuresReviewed: false, simulatedArbitratorAccepted: false, simulatedAcceptanceRecord: null, preparedAt: null, simulatedAt: null },
    dispute: { ...state.dispute, appointmentHash: null, stage: "not_started" }, proposedDetermination: null,
  };
}

export function canSimulateAppointment(state: ContractState) {
  const hash = state.appointment.manifestHash;
  return Boolean(
    state.lifecycleStatus === "manifest_acknowledged" && hash
    && state.appointment.simulatedAcknowledgements.supplier === hash
    && state.appointment.simulatedAcknowledgements.customer === hash
    && state.appointment.disclosuresReviewed && state.appointment.simulatedArbitratorAccepted,
  );
}

export async function prepareProtocolManifest(state: ContractState): Promise<ContractState> {
  if (!canPrepareManifest(state)) return state;
  const hash = await computeProtocolHash(buildProtocolManifest(state));
  return { ...state, lifecycleStatus: "manifest_prepared", appointment: { ...state.appointment, manifestHash: hash, constitutionVersion: state.constitution.version, simulatedAcknowledgements: { supplier: null, customer: null }, preparedAt: new Date().toISOString() } };
}

export type TransitionResult = { ok: true; state: ContractState } | { ok: false; state: ContractState; reason: string };

export async function simulateAppointmentTransition(state: ContractState): Promise<TransitionResult> {
  const reject = (reason: string): TransitionResult => ({ ok: false, state, reason });
  if (state.lifecycleMode !== "simulation_only" || state.legalEffect !== false) return reject("The showcase permits simulation-only, no-legal-effect transitions.");
  if (!partyAlignmentReady(state)) return reject("Party profiles and exact clause versions must be confirmed.");
  if (!allStressTestsAcknowledged(state.calibrationScenarios)) return reject("Every selected stress-test artifact must be eligible and bilaterally acknowledged.");
  if (new Set(state.appointment.calibrationIds).size !== state.appointment.calibrationIds.length) return reject("Scenario references must be unique.");
  if (state.appointment.calibrationIds.length !== state.calibrationScenarios.length || state.appointment.calibrationIds.some((id) => !state.calibrationScenarios.some((scenario) => scenario.id === id))) return reject("Scenario references are missing or inconsistent.");
  if (state.appointment.constitutionVersion !== state.constitution.version) return reject("The Constitution version is stale.");
  if (state.lifecycleStatus !== "manifest_acknowledged") return reject("The exact protocol manifest has not been acknowledged.");
  const storedHash = state.appointment.manifestHash;
  if (!storedHash) return reject("The exact protocol manifest has not been prepared.");
  const recomputedHash = await computeProtocolHash(buildProtocolManifest(state));
  if (storedHash !== recomputedHash) return reject("The stored manifest hash does not match the current protocol manifest.");
  if (state.appointment.simulatedAcknowledgements.supplier !== recomputedHash || state.appointment.simulatedAcknowledgements.customer !== recomputedHash) return reject("Both parties must acknowledge the exact current manifest hash.");
  if (!state.appointment.disclosuresReviewed) return reject("The fictional arbitrator disclosure must be reviewed.");
  if (!state.appointment.simulatedArbitratorAccepted) return reject("Simulated arbitrator acceptance is required.");
  const now = new Date().toISOString();
  return { ok: true, state: { ...state, lifecycleStatus: "appointment_simulated", matter: { ...state.matter, stage: "A0_APPOINTMENT_SIMULATED" }, appointment: { ...state.appointment, simulatedAt: now, simulatedAcceptanceRecord: `${state.constitution.humanArbitrator.name} · simulated acceptance ${now} · no legal effect` }, dispute: { ...state.dispute, appointmentHash: recomputedHash, stage: "settlement" }, settlement: { ...state.settlement, status: "awaiting_consent" } } };
}

export function settlementCanActivate(state: ContractState) {
  return state.lifecycleStatus === "appointment_simulated" && state.settlement.consents.supplier && state.settlement.consents.customer;
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
