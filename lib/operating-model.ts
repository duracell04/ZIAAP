import type { ContractState } from "@/lib/case-model";
import { MATTER_GATES, type MatterGate } from "@/lib/product-language";
import {
  allStressTestsAcknowledged,
  constitutionAcknowledged,
  partyAlignmentReady,
} from "@/lib/protocol";
import { calculateServiceCredit } from "@/lib/scenario";

export type GateRequirement = {
  id: string;
  label: string;
  satisfied: boolean;
};

export type GateReadiness = {
  gate: (typeof MATTER_GATES)[number];
  status: "blocked" | "ready" | "in_progress" | "complete";
  entryRequirements: GateRequirement[];
  completionRequirements: GateRequirement[];
  currentBoundary: string;
};

function isManifestAcknowledged(state: ContractState) {
  const hash = state.appointment.manifestHash;
  return Boolean(
    hash
      && state.appointment.simulatedAcknowledgements.supplier === hash
      && state.appointment.simulatedAcknowledgements.customer === hash,
  );
}

function isGateComplete(state: ContractState, gate: MatterGate): boolean {
  switch (gate) {
    case "alignment":
      return partyAlignmentReady(state);
    case "configuration":
      return partyAlignmentReady(state)
        && constitutionAcknowledged(state)
        && allStressTestsAcknowledged(state.calibrationScenarios);
    case "appointment_configuration_freeze":
      return Boolean(
        isGateComplete(state, "configuration")
          && state.appointment.manifestHash
          && isManifestAcknowledged(state)
          && state.appointment.simulatedAt,
      );
    case "case_production":
      return isGateComplete(state, "appointment_configuration_freeze")
        && (Boolean(state.reasoningMemorandum) || state.settlement.status === "settled");
    case "independent_adjudication":
      return state.settlement.status === "settled"
        || Boolean(
          isGateComplete(state, "case_production")
            && state.humanDecision.simulatedDecisionRecord,
        );
    case "award_black_box":
      return state.lifecycleStatus === "closed" && state.ledger.length > 0;
  }
}

function requirement(id: string, label: string, satisfied: boolean): GateRequirement {
  return { id, label, satisfied };
}

export function getGateReadiness(state: ContractState, gate: MatterGate): GateReadiness {
  const gateDefinition = MATTER_GATES.find((candidate) => candidate.id === gate);
  if (!gateDefinition) throw new Error(`Unknown matter gate: ${gate}`);

  let entryRequirements: GateRequirement[] = [];
  let completionRequirements: GateRequirement[] = [];
  let currentBoundary = "Synthetic C0 projection only · no legal effect.";

  switch (gate) {
    case "alignment":
      completionRequirements = [
        requirement("party_profiles", "Both synthetic party profiles are confirmed", state.parties.every((party) => party.confirmed)),
        requirement("eligible_analysis", "A declared illustrative or live-unverified comparison is active", ["illustrative_only", "executed_unverified"].includes(state.analysis.metadata.executionStatus)),
        requirement("contract_terms", "Every exact clause version is bilaterally confirmed", state.decisions.every((decision) => decision.confirmations.supplier === decision.version && decision.confirmations.customer === decision.version)),
      ];
      break;
    case "configuration":
      entryRequirements = [
        requirement("alignment_complete", "Gate 1 · Alignment is complete", isGateComplete(state, "alignment")),
      ];
      completionRequirements = [
        requirement("constitution_acknowledged", "The exact Constitution version is bilaterally acknowledged", constitutionAcknowledged(state)),
        requirement("scenario_artifacts", "Every selected scenario artifact is eligible and bilaterally acknowledged", allStressTestsAcknowledged(state.calibrationScenarios)),
      ];
      currentBoundary = "The Constitution controls software permissions and workflow; it does not create legal enforceability.";
      break;
    case "appointment_configuration_freeze":
      entryRequirements = [
        requirement("configuration_complete", "Gate 2 · Configuration is complete", isGateComplete(state, "configuration")),
      ];
      completionRequirements = [
        requirement("manifest_prepared", "The exact configuration manifest is prepared", Boolean(state.appointment.manifestHash)),
        requirement("manifest_acknowledged", "Both parties acknowledge the exact configuration hash", isManifestAcknowledged(state)),
        requirement("appointment_simulated", "The fictional appointment transition is recorded", Boolean(state.appointment.simulatedAt)),
      ];
      currentBoundary = "The appointment is fictional and the hash proves internal change detection only.";
      break;
    case "case_production":
      entryRequirements = [
        requirement("configuration_frozen", "Gate 3 · Appointment & Configuration Freeze is complete", isGateComplete(state, "appointment_configuration_freeze")),
      ];
      completionRequirements = [
        requirement("dispute_bound", "The synthetic dispute is bound to the frozen configuration", Boolean(state.dispute.appointmentHash)),
        requirement("case_structured", "Claims, defences, evidence, gaps and objections are represented in structured state", Boolean(state.dispute.claim && state.dispute.defence && state.dispute.sharedEvidence.length)),
        requirement("production_complete", "A reasoning memorandum is derived or the sealed settlement track closes the matter", Boolean(state.reasoningMemorandum) || state.settlement.status === "settled"),
      ];
      currentBoundary = "Settlement content remains sealed from merits production.";
      break;
    case "independent_adjudication":
      entryRequirements = [
        requirement("case_production_complete", "Gate 4 · Case Production is complete", isGateComplete(state, "case_production")),
      ];
      completionRequirements = [
        requirement("preliminary_assessment", "A fictional human preliminary assessment is recorded before disclosure", Boolean(state.humanDecision.preliminaryAssessment.trim())),
        requirement("advisory_memorandum", "The advisory reasoning memorandum is available", Boolean(state.reasoningMemorandum)),
        requirement("human_control", "A simulated human disposition and checklist are recorded", Boolean(state.humanDecision.simulatedDecisionRecord)),
      ];
      currentBoundary = "The memorandum has zero algorithmic presumption; the human retains independent judgment.";
      break;
    case "award_black_box":
      entryRequirements = [
        requirement("matter_resolved", "The simulated matter is closed by human review or sealed settlement", Boolean(state.humanDecision.simulatedDecisionRecord) || state.settlement.status === "settled"),
      ];
      completionRequirements = [
        requirement("closed_state", "The synthetic lifecycle is closed", state.lifecycleStatus === "closed"),
        requirement("recorded_events", "The procedural record is generated from recorded events", state.ledger.length > 0),
      ];
      currentBoundary = "This gate is a Simulated Outcome & Procedural Black Box, never an award.";
      break;
  }

  const entrySatisfied = entryRequirements.every((item) => item.satisfied);
  const completionSatisfied = completionRequirements.every((item) => item.satisfied);
  const progressMade = completionRequirements.some((item) => item.satisfied);
  const status = completionSatisfied
    ? "complete"
    : !entrySatisfied
      ? "blocked"
      : progressMade
        ? "in_progress"
        : "ready";

  return {
    gate: gateDefinition,
    status,
    entryRequirements,
    completionRequirements,
    currentBoundary,
  };
}

export function getActiveMatterGate(state: ContractState): MatterGate {
  if (state.settlement.status === "settled") return "award_black_box";
  return MATTER_GATES.find((gate) => !isGateComplete(state, gate.id))?.id ?? "award_black_box";
}

export function buildStructuredCaseState(state: ContractState) {
  const uptimeDecision = state.decisions.find((decision) => decision.topic === "uptime");
  const calculation = calculateServiceCredit(
    uptimeDecision?.serviceCreditRule ?? null,
    state.dispute.actualUptimeBps,
    state.dispute.inputsConfirmed,
  );
  const agreedFacts = state.dispute.inputsConfirmed
    ? [{
        id: "actual_uptime",
        proposition: `The confirmed synthetic uptime input is ${state.dispute.actualUptimeBps} basis points.`,
        sourceRefs: state.dispute.sharedEvidence,
      }]
    : [];
  const disputedFacts = [
    ...(!state.dispute.inputsConfirmed
      ? [{
          id: "actual_uptime",
          proposition: `The asserted synthetic uptime input is ${state.dispute.actualUptimeBps} basis points and remains unconfirmed.`,
          sourceRefs: state.dispute.sharedEvidence,
        }]
      : []),
    ...state.dispute.objections.map((objection, index) => ({
      id: `objection-${index + 1}`,
      proposition: objection,
      sourceRefs: state.dispute.sharedEvidence,
    })),
  ];

  return {
    matter: state.matter,
    configuration: {
      constitutionId: state.constitution.id,
      constitutionVersion: state.constitution.version,
      configurationHash: state.appointment.manifestHash,
      sourceHierarchy: state.constitution.principles.sourceHierarchy,
    },
    contract: state.decisions.map((decision) => ({
      topic: decision.topic,
      language: decision.language,
      version: decision.version,
      materialStatus: decision.materialStatus,
    })),
    claims: [{
      id: `${state.dispute.id}-claim`,
      party: "customer",
      proposition: state.dispute.claim,
      sourceRefs: state.dispute.sharedEvidence,
    }],
    defences: [{
      id: `${state.dispute.id}-defence`,
      party: "supplier",
      proposition: state.dispute.defence,
      sourceRefs: state.dispute.sharedEvidence,
    }],
    facts: { agreed: agreedFacts, disputed: disputedFacts },
    evidence: {
      available: state.dispute.sharedEvidence,
      missing: state.dispute.missingEvidence,
      legalSources: state.analysis.sources,
    },
    applicableRules: {
      legalArchitecture: state.constitution.legalArchitecture,
      contractRules: state.decisions,
      constitutionPrinciples: state.constitution.principles,
    },
    calculations: [{
      id: "service-credit",
      authorityClass: "mechanical" as const,
      status: calculation.status,
      formula: calculation.formula,
      resultChf: calculation.creditChf,
      explanation: calculation.explanation,
    }],
    objections: state.dispute.objections,
    uncertainty: Array.from(new Set([
      ...state.dispute.missingEvidence,
      ...(state.reasoningMemorandum?.uncertainty ?? []),
    ])),
    possibleDispositions: state.reasoningMemorandum
      ? [state.reasoningMemorandum.proposedDisposition]
      : [],
    humanInterventions: {
      preliminaryAssessmentRecorded: Boolean(state.humanDecision.preliminaryAssessment.trim()),
      reasoningMemorandumDisclosed: Boolean(state.reasoningMemorandum),
      dispositionStatus: state.humanDecision.status,
      reviewChecklist: state.humanDecision.checklist,
      simulatedDecisionRecorded: Boolean(state.humanDecision.simulatedDecisionRecord),
    },
    generatedFromState: true as const,
    legalEffect: false as const,
  };
}

export function buildReasoningMemorandumInput(
  state: ContractState,
  configurationHash: string,
) {
  const caseState = buildStructuredCaseState(state);
  return {
    configurationHash,
    constitution: state.constitution,
    contract: caseState.contract,
    claims: caseState.claims,
    defences: caseState.defences,
    facts: caseState.facts,
    evidence: caseState.evidence,
    applicableRules: caseState.applicableRules,
    calculations: caseState.calculations,
    objections: caseState.objections,
    uncertainty: caseState.uncertainty,
    instruction: "Prepare source-linked advisory analysis with explicit counterarguments, uncertainty and escalation. Exercise no arbitral authority.",
  };
}

export function buildProceduralBlackBox(state: ContractState) {
  return {
    matterId: state.matter.id,
    configurationIdentity: {
      configurationHash: state.appointment.manifestHash,
      constitutionVersion: state.constitution.version,
      selectedScenarioIds: state.appointment.calibrationIds,
    },
    partyObjections: [...state.dispute.objections],
    humanControls: {
      preliminaryAssessmentRecordedBeforeDisclosure: Boolean(
        state.humanDecision.preliminaryAssessment.trim()
          && state.reasoningMemorandum,
      ),
      reasoningMemorandumStatus: state.reasoningMemorandum?.materialStatus ?? "not_produced",
      dispositionStatus: state.humanDecision.status,
      reviewChecklist: { ...state.humanDecision.checklist },
      simulatedDecisionRecorded: Boolean(state.humanDecision.simulatedDecisionRecord),
    },
    events: [...state.ledger]
      .sort((left, right) => left.timestamp.localeCompare(right.timestamp))
      .map((event) => ({ ...event })),
    generatedFromRecordedEvents: true as const,
    privateDeliberationIncluded: false as const,
    legalEffect: false as const,
    boundary: "Synthetic procedural record only; it is not an award, signature, runtime attestation or proof of legal validity.",
  };
}
