"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, RefreshCcw, ShieldAlert } from "lucide-react";
import { GovernanceAlignment } from "@/components/case-upload";
import { ConstitutionBuilder } from "@/components/case-map";
import { ValidationLab } from "@/components/reasoning-card";
import { AppointmentCeremony } from "@/components/evidence-card";
import { DisputePreview } from "@/components/decision-panel";
import { DossierView } from "@/components/dossier-view";
import { OpeningExperience } from "@/components/opening-experience";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  alignmentAnalysisSchema, applyOption, normalizeDecisionStatus, reasoningMemorandumSchema, settlementProposalSchema, updateDecisionLanguage,
  type ArbitratorConstitution, type ContractState, type LedgerEvent, type Topic,
} from "@/lib/case-model";
import { humanDecisionCanRecord, invalidatePreparedManifest, invalidateProtocolState, partyAlignmentReady, prepareProtocolManifest, simulateAppointmentTransition } from "@/lib/protocol";

const steps = ["Party Alignment", "Protocol Constitution", "Scenario Laboratory", "Configuration Manifest", "Later Dispute", "Audit Dossier"];
const stepNotes = ["Clarify expectations", "Configure protocol", "Inspect behaviour", "Acknowledge exact manifest", "Human-controlled simulation", "Inspect twelve artifacts"];

function newEvent(actor: string, action: string, objectId: string, detail: string, authorityClass: LedgerEvent["authorityClass"]): LedgerEvent {
  return { id: crypto.randomUUID(), timestamp: new Date().toISOString(), actor, action, objectId, detail, authorityClass };
}

export function DemoWorkspace({ initialState }: { initialState: ContractState }) {
  const [state, setState] = useState(initialState);
  const [experience, setExperience] = useState<"opening" | "guided" | "explore">("opening");
  const [step, setStep] = useState(0);
  const [alignmentBusy, setAlignmentBusy] = useState(false);
  const [alignmentNotice, setAlignmentNotice] = useState("");
  const [analysisActive, setAnalysisActive] = useState(true);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationNotice, setCalibrationNotice] = useState("");
  const [pendingStep, setPendingStep] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [experience, step]);
  const [appointmentBusy, setAppointmentBusy] = useState(false);
  const [appointmentError, setAppointmentError] = useState("");
  const [disputeBusy, setDisputeBusy] = useState(false);
  const [disputeNotice, setDisputeNotice] = useState("");
  const alignmentReady = partyAlignmentReady(state);
  const visiblePendingStep = alignmentReady ? null : pendingStep;

  function reset() {
    setState(structuredClone(initialState)); setStep(0); setPendingStep(null); setAnalysisActive(true); setAlignmentNotice(""); setCalibrationNotice(""); setAppointmentError(""); setDisputeNotice("");
  }

  function requestStep(target: number) {
    if (step === 0 && target > 0 && !alignmentReady) {
      setPendingStep(target);
      return;
    }
    setPendingStep(null);
    setStep(target);
  }

  function continueForExploration() {
    if (experience !== "explore" || visiblePendingStep === null) return;
    setStep(visiblePendingStep);
    setPendingStep(null);
  }

  function editExpectation(partyId: string, topic: Topic, value: string) {
    setAnalysisActive(false);
    setState((current) => { const base = invalidatePreparedManifest(current); return { ...base, parties: base.parties.map((party) => party.id === partyId ? { ...party, confirmed: false, expectations: { ...party.expectations, [topic]: value } } : party) }; });
  }

  function confirmProfile(partyId: string) {
    setState((current) => { const base = invalidatePreparedManifest(current); return {
      ...base,
      parties: base.parties.map((party) => party.id === partyId ? { ...party, confirmed: !party.confirmed } : party),
      ledger: [...base.ledger, newEvent(partyId, "Updated governance profile confirmation", partyId, "Separate party assertion; not protocol appointment.", "advisory")],
    }; });
  }

  function confirmClause(topic: Topic, party: "supplier" | "customer") {
    setState((current) => { const base = invalidatePreparedManifest(current); return {
      ...base,
      decisions: base.decisions.map((decision) => decision.topic === topic ? normalizeDecisionStatus({ ...decision, confirmations: { ...decision.confirmations, [party]: decision.confirmations[party] === decision.version ? null : decision.version } }) : decision),
      ledger: [...base.ledger, newEvent(party, "Updated contract-version confirmation", topic, "Exact contract text only; separate from appointment approval.", "advisory")],
    }; });
  }

  async function runAlignment(executionMode: "illustrative" | "live") {
    setAlignmentBusy(true); setAlignmentNotice("");
    try {
      const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ executionMode, parties: state.parties }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.reason ?? "Alignment execution failed.");
      const analysis = alignmentAnalysisSchema.parse(payload);
      setState((current) => ({ ...invalidatePreparedManifest(current), analysis }));
      setAnalysisActive(true); setAlignmentNotice(`${analysis.metadata.label} selected. It has no independent legal effect.`);
    } catch (error) {
      setAnalysisActive(false); setAlignmentNotice(error instanceof Error ? error.message : "Alignment execution failed.");
    } finally { setAlignmentBusy(false); }
  }

  function selectOption(topic: Topic, optionId: string) {
    setState((current) => {
      const option = current.analysis.findings.find((finding) => finding.topic === topic)?.options.find((item) => item.id === optionId);
      if (!option) return current;
      const base = invalidatePreparedManifest(current);
      const decisions = base.decisions.map((decision) => decision.topic === topic ? applyOption(decision, option) : decision);
      const selected = decisions.find((decision) => decision.topic === topic)!;
      return { ...base, decisions, alignmentScenario: topic === "uptime" ? { ...base.alignmentScenario, selectedOptionId: optionId, decisionVersion: selected.version } : base.alignmentScenario };
    });
  }

  function editDecision(topic: Topic, language: string) {
    setState((current) => { const base = invalidatePreparedManifest(current); const decisions = base.decisions.map((decision) => decision.topic === topic ? updateDecisionLanguage(decision, language) : decision); const uptime = decisions.find((decision) => decision.topic === "uptime")!; return { ...base, decisions, alignmentScenario: { ...base.alignmentScenario, decisionVersion: uptime.version } }; });
  }

  function updateAlignmentScenario(field: "actualUptimeBps" | "inputsConfirmed", value: number | boolean) {
    setState((current) => ({ ...invalidatePreparedManifest(current), alignmentScenario: { ...current.alignmentScenario, [field]: value } }));
  }

  function updatePrinciple(field: keyof ArbitratorConstitution["principles"], value: string) {
    setState((current) => {
      if (current.constitution.principles[field] === value) return current;
      const constitution = { ...current.constitution, principles: { ...current.constitution.principles, [field]: value } };
      const invalidated = invalidateProtocolState(current, constitution);
      return { ...invalidated, ledger: [...invalidated.ledger, newEvent("Parties", "Amended calibrated protocol", field, "Version incremented; validation and appointment approvals cleared.", "advisory")] };
    });
  }

  function acknowledgeConstitution(party: "supplier" | "customer") {
    setState((current) => {
      const base = invalidatePreparedManifest(current);
      const version = base.constitution.version;
      const simulatedAcknowledgements = {
        ...base.constitution.simulatedAcknowledgements,
        [party]: base.constitution.simulatedAcknowledgements[party] === version ? null : version,
      };
      return { ...base, constitution: { ...base.constitution, simulatedAcknowledgements }, ledger: [...base.ledger, newEvent(party, "Updated exact Constitution acknowledgement", base.constitution.id, `Constitution v${version} · simulated ceremony only · no legal effect`, "advisory")] };
    });
  }

  async function runValidation(executionMode: "illustrative" | "live") {
    setCalibrating(true); setCalibrationNotice("");
    try {
      const response = await fetch("/api/calibrate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ executionMode, constitution: state.constitution, scenarios: state.calibrationScenarios }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.reason ?? payload.error ?? "Stress-test execution failed.");
      setState((current) => ({
        ...current,
        calibrationScenarios: current.calibrationScenarios.map((scenario) => {
          const match = payload.results.find((item: { scenarioId: string }) => item.scenarioId === scenario.id);
          return match ? { ...scenario, result: match.result, selectedArtifactId: match.result.artifactId, simulatedAcknowledgements: { supplier: null, customer: null } } : scenario;
        }),
        lifecycleStatus: "draft", appointment: { ...current.appointment, manifestHash: null, simulatedAcknowledgements: { supplier: null, customer: null } },
        ledger: [...current.ledger, newEvent("System", "Ran stress-test execution", current.constitution.id, payload.metadata.label, "administrative")],
      }));
      setCalibrationNotice(payload.metadata.notice ?? `${payload.metadata.label} completed.`);
    } catch (error) {
      setState((current) => ({ ...current, calibrationScenarios: current.calibrationScenarios.map((scenario) => ({ ...scenario, selectedArtifactId: null, simulatedAcknowledgements: { supplier: null, customer: null } })) }));
      setCalibrationNotice(error instanceof Error ? error.message : "Execution failed.");
    }
    finally { setCalibrating(false); }
  }

  function acknowledgeScenario(id: string, party: "supplier" | "customer") {
    setState((current) => ({
      ...current,
      calibrationScenarios: current.calibrationScenarios.map((scenario) => scenario.id === id && scenario.result ? { ...scenario, simulatedAcknowledgements: { ...scenario.simulatedAcknowledgements, [party]: scenario.simulatedAcknowledgements[party] === scenario.result.artifactId ? null : scenario.result.artifactId } } : scenario),
      lifecycleStatus: "draft", appointment: { ...current.appointment, manifestHash: null, simulatedAcknowledgements: { supplier: null, customer: null } },
      ledger: [...current.ledger, newEvent(party, "Updated simulated artifact acknowledgement", id, "No legal or authoritative effect.", "advisory")],
    }));
  }

  async function freezePackage() {
    setAppointmentBusy(true); setAppointmentError("");
    try {
      const next = await prepareProtocolManifest(state);
      setState(next);
      if (!next.appointment.manifestHash) setAppointmentError("Manifest preparation remains blocked by an incomplete prior gate.");
    } catch (error) {
      setAppointmentError(error instanceof Error ? error.message : "Manifest preparation failed.");
    } finally { setAppointmentBusy(false); }
  }

  function confirmHash(party: "supplier" | "customer") {
    setAppointmentError("");
    setState((current) => {
      const hash = current.appointment.manifestHash;
      if (!hash) return current;
      const simulatedAcknowledgements = { ...current.appointment.simulatedAcknowledgements, [party]: current.appointment.simulatedAcknowledgements[party] === hash ? null : hash };
      const acknowledged = simulatedAcknowledgements.supplier === hash && simulatedAcknowledgements.customer === hash;
      return { ...current, lifecycleStatus: acknowledged ? "manifest_acknowledged" : "manifest_prepared", appointment: { ...current.appointment, simulatedAcknowledgements }, ledger: [...current.ledger, newEvent(party, "Updated exact-hash simulated acknowledgement", current.appointment.id, hash, "advisory")] };
    });
  }

  function setReviewFlag(field: "disclosuresReviewed" | "simulatedArbitratorAccepted", value: boolean) {
    setAppointmentError("");
    setState((current) => ({ ...current, appointment: { ...current.appointment, [field]: value } }));
  }

  async function appoint() {
    setAppointmentBusy(true); setAppointmentError("");
    const result = await simulateAppointmentTransition(state);
    if (result.ok) setState(result.state);
    else setAppointmentError(result.reason);
    setAppointmentBusy(false);
  }

  function toggleSettlementConsent(party: "supplier" | "customer") {
    setState((current) => ({ ...current, settlement: { ...current.settlement, consents: { ...current.settlement.consents, [party]: !current.settlement.consents[party] }, proposal: null, responses: { supplier: "pending", customer: "pending" }, status: "awaiting_consent" } }));
  }

  async function requestSettlement() {
    setDisputeBusy(true); setDisputeNotice("");
    try {
      const response = await fetch("/api/settlement-preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Settlement facilitation failed.");
      const proposal = settlementProposalSchema.parse(payload);
      setState((current) => ({ ...current, settlement: { ...current.settlement, status: "active", proposal }, ledger: [...current.ledger, newEvent("Settlement protocol", "Generated sealed non-binding proposal", proposal.id, "Proposal content excluded from merits ledger.", "advisory")] }));
    } catch (error) { setDisputeNotice(error instanceof Error ? error.message : "Settlement facilitation failed."); }
    finally { setDisputeBusy(false); }
  }

  function respondSettlement(party: "supplier" | "customer", response: "accept" | "decline") {
    setState((current) => {
      const responses = { ...current.settlement.responses, [party]: response };
      const settled = responses.supplier === "accept" && responses.customer === "accept";
      const notSettled = responses.supplier === "decline" || responses.customer === "decline";
      return {
        ...current,
        lifecycleStatus: settled ? "closed" : current.lifecycleStatus,
        settlement: { ...current.settlement, responses, status: settled ? "settled" : notSettled ? "not_settled" : "active", meritsRecord: settled ? ["A synthetic settlement was accepted by both parties in the simulation."] : notSettled ? ["Settlement facilitation occurred and ended without settlement."] : [] },
        dispute: { ...current.dispute, stage: settled ? "closed" : notSettled ? "arbitration" : current.dispute.stage },
        ledger: [...current.ledger, newEvent(party, "Recorded sealed settlement response", current.dispute.id, response === "decline" ? "Settlement ended; content remains sealed." : "Response stored in sealed track.", "advisory")],
      };
    });
  }

  function updatePreliminary(value: string) {
    setState((current) => ({ ...current, humanDecision: { ...current.humanDecision, preliminaryAssessment: value } }));
  }

  async function prepareReasoningMemorandum(executionMode: "illustrative" | "live") {
    setDisputeBusy(true); setDisputeNotice("");
    try {
      const response = await fetch("/api/dispute-preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ executionMode, state }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.reason ?? payload.error ?? "Protocol execution failed.");
      const reasoningMemorandum = reasoningMemorandumSchema.parse(payload);
      setState((current) => ({ ...current, lifecycleStatus: "dispute_simulated", reasoningMemorandum, dispute: { ...current.dispute, stage: "human_review" }, ledger: [...current.ledger, newEvent("ZIAAP simulation protocol", "Prepared advisory reasoning memorandum", reasoningMemorandum.id, "State-derived analysis only · no independent legal effect · future human judgment remains required.", "advisory")] }));
      setDisputeNotice(reasoningMemorandum.metadata.notice ?? reasoningMemorandum.metadata.label);
    } catch (error) { setDisputeNotice(error instanceof Error ? error.message : "Frozen protocol could not run."); }
    finally { setDisputeBusy(false); }
  }

  function updateDecision(field: "status" | "rationale", value: string) {
    setState((current) => ({ ...current, humanDecision: { ...current.humanDecision, [field]: value, simulatedDecisionRecord: null } }));
  }

  function toggleChecklist(field: keyof ContractState["humanDecision"]["checklist"]) {
    setState((current) => ({ ...current, humanDecision: { ...current.humanDecision, checklist: { ...current.humanDecision.checklist, [field]: !current.humanDecision.checklist[field] }, simulatedDecisionRecord: null } }));
  }

  function recordDecision() {
    setState((current) => {
      if (!humanDecisionCanRecord(current)) return current;
      const decisionRecord = `${current.constitution.humanArbitrator.name} · simulated decision record ${new Date().toISOString()} · no legal effect`;
      return { ...current, lifecycleStatus: "closed", humanDecision: { ...current.humanDecision, simulatedDecisionRecord: decisionRecord }, dispute: { ...current.dispute, stage: "closed" }, matter: { ...current.matter, stage: "H0_SIMULATED_HUMAN_DECISION" }, ledger: [...current.ledger, newEvent(current.constitution.humanArbitrator.name, "Recorded simulated human decision", current.dispute.id, current.humanDecision.status, "advisory")] };
    });
  }

  if (experience === "opening") return <OpeningExperience beginGuided={() => { setExperience("guided"); setStep(0); }} explore={() => { setExperience("explore"); setStep(0); }} />;

  return <main className="app-shell">
    <aside className="sidebar"><div className="wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>C0 concept demonstrator</small></div></div><nav aria-label="Concept workflow">{steps.map((label, index) => <button key={label} className={index === step ? "nav-step active" : "nav-step"} onClick={() => requestStep(index)} aria-current={index === step ? "step" : undefined}><span>{index + 1}</span><div>{label}<small>{stepNotes[index]}</small></div></button>)}</nav><div className="sidebar-note"><ShieldAlert size={16} /><p>Synthetic data · simulation only · no legal effect. The AI Resolution Officer is software; human legal authority remains external.</p></div><Button variant="ghost" onClick={() => { setPendingStep(null); setExperience("opening"); }}><ArrowLeft size={15} /> Return to introduction</Button><Button variant="ghost" onClick={reset}><RefreshCcw size={15} /> Reset demo</Button></aside>
    <section className="workspace"><header className="topbar"><div><Badge tone="red">{state.lifecycleMode}</Badge><span className="matter-id">{state.matter.id}</span></div><div className="topbar-status"><span><i className={state.appointment.manifestHash ? "dot done" : "dot"} />Exact manifest</span><span><i className={["appointment_simulated", "dispute_simulated", "closed"].includes(state.lifecycleStatus) ? "dot done" : "dot"} />{state.lifecycleStatus}</span></div></header>
      <div className="content">
        {experience === "explore" && step > 0 && !alignmentReady && <div className="exploration-incomplete" role="status"><ShieldAlert size={17} /><div><strong>Exploration only · Stage 1 incomplete</strong><p>You may inspect this stage, but the simulated protocol cannot become ready until both profiles, an eligible analysis, and all three exact clause versions are confirmed.</p></div></div>}
        {step === 0 && <GovernanceAlignment state={state} busy={alignmentBusy} notice={alignmentNotice} analysisActive={analysisActive} runAlignment={runAlignment} editExpectation={editExpectation} confirmProfile={confirmProfile} selectOption={selectOption} editDecision={editDecision} updateAlignmentScenario={updateAlignmentScenario} confirmClause={confirmClause} navigationNotice={visiblePendingStep === null ? "" : experience === "guided" ? "Complete all seven readiness conditions before continuing in the guided demonstration." : `Acknowledge this warning before opening ${steps[visiblePendingStep]} without completing the simulated alignment gate.`} explorationTargetLabel={experience === "explore" && visiblePendingStep !== null ? steps[visiblePendingStep] : null} continueForExploration={continueForExploration} />}
        {step === 1 && <ConstitutionBuilder state={state} updatePrinciple={updatePrinciple} acknowledgeConstitution={acknowledgeConstitution} />}
        {step === 2 && <ValidationLab state={state} running={calibrating} notice={calibrationNotice} runValidation={runValidation} acknowledgeScenario={acknowledgeScenario} />}
        {step === 3 && <AppointmentCeremony state={state} busy={appointmentBusy} errorNotice={appointmentError} freezePackage={freezePackage} confirmHash={confirmHash} setReviewFlag={setReviewFlag} appoint={appoint} />}
        {step === 4 && <DisputePreview state={state} busy={disputeBusy} notice={disputeNotice} toggleSettlementConsent={toggleSettlementConsent} requestSettlement={requestSettlement} respondSettlement={respondSettlement} updatePreliminary={updatePreliminary} prepareReasoningMemorandum={prepareReasoningMemorandum} updateDecision={updateDecision} toggleChecklist={toggleChecklist} recordDecision={recordDecision} />}
        {step === 5 && <DossierView state={state} />}
      </div>
      <footer className="step-footer"><Button variant="secondary" disabled={step === 0} onClick={() => requestStep(step - 1)}><ArrowLeft size={16} /> Previous</Button><span>Stage {step + 1} of 6</span><Button disabled={step === 5} onClick={() => requestStep(step + 1)}>{step === 4 ? "Open Audit Dossier" : "Continue"} <ArrowRight size={16} /></Button></footer>
    </section>
  </main>;
}
