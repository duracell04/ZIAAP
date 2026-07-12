import { z } from "zod";

export const topicSchema = z.enum(["uptime", "liability", "legal_architecture"]);
export const authoritySchema = z.enum(["administrative", "mechanical", "advisory", "adjudicative"]);
export const materialStatusSchema = z.enum([
  "source", "party_assertion", "provisional_ai_analysis", "legal_source", "draft",
  "agreed_contractual_text", "reproducible_calculation", "protocol_constitution",
  "calibration_result", "appointment_record", "sealed_settlement", "proposed_determination",
  "human_decision",
]);

export const serviceCreditRuleSchema = z.object({
  thresholdBps: z.number().int().min(0).max(10_000),
  shortfallStepBps: z.number().int().positive(),
  creditPercentPerStep: z.number().positive(),
  capPercent: z.number().positive().max(100),
  monthlyFeeChf: z.number().positive(),
});

export const evidenceHierarchySchema = z.object({
  primarySource: z.string(), secondarySource: z.string(),
  maintenanceNoticeHours: z.number().int().nonnegative(),
  maintenanceMonthlyCapHours: z.number().nonnegative(),
});

export const legalArchitectureSchema = z.object({
  substantiveLaw: z.literal("Swiss substantive law"),
  seat: z.literal("Zurich, Switzerland"),
  rules: z.literal("Swiss Rules of International Arbitration"),
  language: z.literal("English"),
  arbitrators: z.literal(1),
});

export const legalSourceSchema = z.object({
  id: z.string(), jurisdiction: z.string(), authority: z.string(), title: z.string(),
  url: z.string().url(), passage: z.string(), retrievalMode: z.enum(["curated", "omnilex"]),
  verificationStatus: z.enum(["verified", "review_required"]), materialStatus: z.literal("legal_source"),
});

export const legalConstraintSchema = z.object({
  id: z.string(), query: z.string(), headline: z.literal("Legal constraint identified"),
  source: legalSourceSchema, retrievedAt: z.string(),
  mode: z.enum(["live_omnilex", "cached_verified_fallback"]),
  reviewInstruction: z.literal("Targeted professional review required before signature."),
  conclusion: z.string(),
});

export const partyProfileSchema = z.object({
  id: z.enum(["supplier", "customer"]), name: z.string(), jurisdiction: z.string(), role: z.string(),
  confirmed: z.boolean(), materialStatus: z.literal("party_assertion"),
  expectations: z.record(topicSchema, z.string()),
});

export const clauseSchema = z.object({
  id: z.string(), topic: topicSchema, title: z.string(), sourcePassage: z.string(),
  version: z.number().int().positive(), proposedLanguage: z.string(), provenance: z.string(),
  materialStatus: z.literal("source"),
});

export const optionSchema = z.object({
  id: z.string(), label: z.string(), language: z.string(), tradeoff: z.string(),
  serviceCreditRule: serviceCreditRuleSchema.nullable(), evidenceHierarchy: evidenceHierarchySchema.nullable(),
  liabilityCapChf: z.number().positive().nullable(), legalArchitecture: legalArchitectureSchema.nullable(),
  unresolvedMatters: z.array(z.string()),
});

export const divergenceFindingSchema = z.object({
  id: z.string(), topic: topicSchema, dimension: z.enum(["semantic", "commercial", "legal"]),
  title: z.string(), supplierPosition: z.string(), customerPosition: z.string(), consequence: z.string(),
  uncertainty: z.string(), severity: z.enum(["material", "high"]), authorityClass: authoritySchema,
  materialStatus: z.literal("provisional_ai_analysis"), sourceIds: z.array(z.string()).min(1),
  options: z.array(optionSchema).min(1),
});

export const alignmentAnalysisSchema = z.object({
  findings: z.array(divergenceFindingSchema).length(3), sources: z.array(legalSourceSchema),
  metadata: z.object({
    mode: z.enum(["cached", "live", "fallback"]),
    label: z.enum(["Live AI analysis", "Cached verified fallback"]),
    generatedAt: z.string(), sourceCoverage: z.string(), notice: z.string().optional(),
  }),
});

export const confirmationSchema = z.object({ supplier: z.number().int().nullable(), customer: z.number().int().nullable() });
export const alignmentDecisionSchema = z.object({
  topic: topicSchema, selectedOptionId: z.string(), language: z.string(), version: z.number().int().positive(),
  materialStatus: z.enum(["draft", "agreed_contractual_text"]), serviceCreditRule: serviceCreditRuleSchema.nullable(),
  evidenceHierarchy: evidenceHierarchySchema.nullable(), liabilityCapChf: z.number().positive().nullable(),
  legalArchitecture: legalArchitectureSchema.nullable(), unresolvedMatters: z.array(z.string()), confirmations: confirmationSchema,
});

export const humanArbitratorSchema = z.object({
  id: z.string(), name: z.string(), role: z.literal("Sole human arbitrator"), fictional: z.literal(true),
  disclosure: z.string(),
});

export const protocolIdentitySchema = z.object({
  provider: z.literal("OpenAI"), model: z.string(), promptVersion: z.string(), retrievalPack: z.string(),
  toolPolicy: z.string(), engineVersion: z.string(),
});

export const arbitratorConstitutionSchema = z.object({
  id: z.string(), version: z.number().int().positive(),
  status: z.enum(["candidate", "calibrated", "frozen", "appointed"]),
  materialStatus: z.literal("protocol_constitution"), legalArchitecture: legalArchitectureSchema,
  humanArbitrator: humanArbitratorSchema,
  principles: z.object({
    interpretation: z.string(), evidence: z.string(), fairness: z.string(), commercialValues: z.string(),
    remedyBoundaries: z.string(), discretion: z.string(), escalation: z.string(),
  }),
  settlementPolicy: z.object({
    activation: z.literal("Separate bilateral consent after a dispute exists"),
    firewall: z.literal("Settlement content is sealed from merits reasoning"),
    meritsDisclosure: z.literal("Only occurrence, termination status, or a signed settlement may enter the merits record"),
  }),
  protocolIdentity: protocolIdentitySchema,
  changePolicy: z.literal("Any behavior-affecting change creates a new version, reruns calibration, and requires fresh bilateral approval."),
});

export const calibrationResultSchema = z.object({
  summary: z.string(), behavior: z.string(), safeguardsObserved: z.array(z.string()).min(1),
  outcome: z.string(), passed: z.boolean(), materialStatus: z.literal("calibration_result"),
});

export const calibrationScenarioSchema = z.object({
  id: z.string(), title: z.string(), category: z.enum(["mechanical", "evidence", "mandatory_law", "symmetry"]),
  facts: z.array(z.string()).min(1), evidence: z.array(z.string()).min(1), question: z.string(),
  requiredSafeguards: z.array(z.string()).min(1), acceptableBehavior: z.string(),
  result: calibrationResultSchema.nullable(), passed: z.boolean(),
  approvals: z.object({ supplier: z.boolean(), customer: z.boolean() }),
});

export const appointmentRecordSchema = z.object({
  id: z.string(), materialStatus: z.literal("appointment_record"),
  status: z.enum(["draft", "frozen", "party_approved", "appointed"]),
  manifestHash: z.string().nullable(), constitutionVersion: z.number().int().positive(),
  calibrationIds: z.array(z.string()), confirmations: z.object({ supplier: z.string().nullable(), customer: z.string().nullable() }),
  disclosuresReviewed: z.boolean(), arbitratorAccepted: z.boolean(),
  simulatedSignature: z.string().nullable(), frozenAt: z.string().nullable(),
});

export const disputeSessionSchema = z.object({
  id: z.string(), appointmentHash: z.string().nullable(), stage: z.enum(["not_started", "settlement", "arbitration", "human_review", "closed"]),
  claim: z.string(), defence: z.string(), sharedEvidence: z.array(z.string()), objections: z.array(z.string()),
  missingEvidence: z.array(z.string()), actualUptimeBps: z.number().int(), inputsConfirmed: z.boolean(), claimedLossChf: z.number().positive(),
});

export const settlementProposalSchema = z.object({
  id: z.string(), label: z.literal("System-generated, non-binding settlement proposal"), terms: z.array(z.string()),
  basis: z.string(), sourceScope: z.literal("Shared case record only"), materialStatus: z.literal("sealed_settlement"),
});

export const settlementTrackSchema = z.object({
  status: z.enum(["not_started", "awaiting_consent", "active", "not_settled", "settled"]),
  consents: z.object({ supplier: z.boolean(), customer: z.boolean() }), proposal: settlementProposalSchema.nullable(),
  responses: z.object({ supplier: z.enum(["pending", "accept", "decline"]), customer: z.enum(["pending", "accept", "decline"]) }),
  sealed: z.literal(true), meritsRecord: z.array(z.string()),
});

export const proposedDeterminationSchema = z.object({
  id: z.string(), appointmentHash: z.string(), issues: z.array(z.string()), findings: z.array(z.string()),
  sourceIds: z.array(z.string()), counterarguments: z.array(z.string()), uncertainty: z.array(z.string()),
  escalationFlags: z.array(z.string()), reasoningSummary: z.string(), proposedDisposition: z.string(),
  materialStatus: z.literal("proposed_determination"), independentLegalEffect: z.literal(false),
  metadata: z.object({ mode: z.enum(["cached", "live", "fallback"]), label: z.string(), notice: z.string().optional() }),
});

export const humanDecisionSchema = z.object({
  preliminaryAssessment: z.string(), status: z.enum(["pending", "adopted", "modified", "rejected"]), rationale: z.string(),
  checklist: z.object({ sourcesReviewed: z.boolean(), objectionsReviewed: z.boolean(), calibrationChecked: z.boolean(), independentJudgment: z.boolean() }),
  simulatedSignature: z.string().nullable(), materialStatus: z.literal("human_decision"),
});

export const ledgerEventSchema = z.object({
  id: z.string(), timestamp: z.string(), actor: z.string(), action: z.string(), objectId: z.string(),
  authorityClass: authoritySchema, detail: z.string(),
});

export const contractStateSchema = z.object({
  matter: z.object({ id: z.string(), title: z.string(), stage: z.string() }),
  parties: z.array(partyProfileSchema).length(2), clauses: z.array(clauseSchema).length(3),
  analysis: alignmentAnalysisSchema, decisions: z.array(alignmentDecisionSchema).length(3), legalConstraint: legalConstraintSchema,
  constitution: arbitratorConstitutionSchema, calibrationScenarios: z.array(calibrationScenarioSchema).length(4),
  appointment: appointmentRecordSchema, dispute: disputeSessionSchema, settlement: settlementTrackSchema,
  proposedDetermination: proposedDeterminationSchema.nullable(), humanDecision: humanDecisionSchema,
  ledger: z.array(ledgerEventSchema),
});

export type Topic = z.infer<typeof topicSchema>;
export type ServiceCreditRule = z.infer<typeof serviceCreditRuleSchema>;
export type PartyProfile = z.infer<typeof partyProfileSchema>;
export type DivergenceFinding = z.infer<typeof divergenceFindingSchema>;
export type AlignmentAnalysis = z.infer<typeof alignmentAnalysisSchema>;
export type AlignmentDecision = z.infer<typeof alignmentDecisionSchema>;
export type ArbitratorConstitution = z.infer<typeof arbitratorConstitutionSchema>;
export type CalibrationScenario = z.infer<typeof calibrationScenarioSchema>;
export type ContractState = z.infer<typeof contractStateSchema>;
export type LedgerEvent = z.infer<typeof ledgerEventSchema>;
export type LegalConstraint = z.infer<typeof legalConstraintSchema>;
export type ProposedDetermination = z.infer<typeof proposedDeterminationSchema>;

export function isBilateralConfirmation(decision: AlignmentDecision) {
  return decision.confirmations.supplier === decision.version && decision.confirmations.customer === decision.version;
}

export function normalizeDecisionStatus(decision: AlignmentDecision): AlignmentDecision {
  return { ...decision, materialStatus: isBilateralConfirmation(decision) ? "agreed_contractual_text" : "draft" };
}

export function updateDecisionLanguage(decision: AlignmentDecision, language: string): AlignmentDecision {
  if (language === decision.language) return decision;
  return normalizeDecisionStatus({ ...decision, language, version: decision.version + 1, confirmations: { supplier: null, customer: null } });
}

export function applyOption(decision: AlignmentDecision, option: z.infer<typeof optionSchema>): AlignmentDecision {
  const changed = decision.selectedOptionId !== option.id || decision.language !== option.language;
  return normalizeDecisionStatus({
    ...decision, selectedOptionId: option.id, language: option.language,
    version: changed ? decision.version + 1 : decision.version,
    confirmations: changed ? { supplier: null, customer: null } : decision.confirmations,
    serviceCreditRule: option.serviceCreditRule, evidenceHierarchy: option.evidenceHierarchy,
    liabilityCapChf: option.liabilityCapChf, legalArchitecture: option.legalArchitecture,
    unresolvedMatters: option.unresolvedMatters,
  });
}

export function buildAlignmentAnnex(state: ContractState) {
  return {
    matter: state.matter,
    parties: state.parties.map(({ id, name, jurisdiction }) => ({ id, name, jurisdiction })),
    decisions: state.decisions.map(normalizeDecisionStatus), legalConstraint: state.legalConstraint,
    ready: state.decisions.every(isBilateralConfirmation), generatedFromState: true as const,
  };
}
