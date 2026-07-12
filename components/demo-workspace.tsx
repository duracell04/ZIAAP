"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RefreshCcw, ShieldAlert } from "lucide-react";
import { GovernanceAlignment } from "@/components/case-upload";
import { ConstitutionBuilder } from "@/components/case-map";
import { ValidationLab } from "@/components/reasoning-card";
import { AppointmentCeremony } from "@/components/evidence-card";
import { DisputePreview } from "@/components/decision-panel";
import { OpeningExperience } from "@/components/opening-experience";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  alignmentAnalysisSchema, applyOption, normalizeDecisionStatus, proposedDeterminationSchema, settlementProposalSchema, updateDecisionLanguage,
  type ArbitratorConstitution, type ContractState, type LedgerEvent, type Topic,
} from "@/lib/case-model";
import { humanDecisionCanSign, invalidatePreparedManifest, invalidateProtocolState, prepareProtocolManifest, simulateAppointmentTransition } from "@/lib/protocol";

const steps = ["Party Alignment", "Arbitral Reasoning Calibration", "Stress Testing", "Protocol Manifest and Simulated Appointment", "Later Synthetic Dispute"];
const stepNotes = ["Clarify expectations", "Calibrate protocol", "Inspect behavior", "Acknowledge exact manifest", "Human-controlled simulation"];

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
  const [disputeBusy, setDisputeBusy] = useState(false);
  const [disputeNotice, setDisputeNotice] = useState("");

  function reset() {
    setState(structuredClone(initialState)); setStep(0); setAnalysisActive(true); setAlignmentNotice(""); setCalibrationNotice(""); setDisputeNotice("");
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
        ledger: [...current.ledger, newEvent("System", "Ran stress-test validation", current.constitution.id, payload.metadata.label, "administrative")],
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
    setState(await prepareProtocolManifest(state));
  }

  function confirmHash(party: "supplier" | "customer") {
    setState((current) => {
      const hash = current.appointment.manifestHash;
      if (!hash) return current;
      const simulatedAcknowledgements = { ...current.appointment.simulatedAcknowledgements, [party]: current.appointment.simulatedAcknowledgements[party] === hash ? null : hash };
      const acknowledged = simulatedAcknowledgements.supplier === hash && simulatedAcknowledgements.customer === hash;
      return { ...current, lifecycleStatus: acknowledged ? "manifest_acknowledged" : "manifest_prepared", appointment: { ...current.appointment, simulatedAcknowledgements }, ledger: [...current.ledger, newEvent(party, "Updated exact-hash simulated acknowledgement", current.appointment.id, hash, "advisory")] };
    });
  }

  function setReviewFlag(field: "disclosuresReviewed" | "simulatedArbitratorAccepted", value: boolean) {
    setState((current) => ({ ...current, appointment: { ...current.appointment, [field]: value } }));
  }

  async function appoint() {
    const result = await simulateAppointmentTransition(state);
    if (result.ok) setState(result.state);
    else setCalibrationNotice(result.reason);
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

  async function runDetermination(executionMode: "illustrative" | "live") {
    setDisputeBusy(true); setDisputeNotice("");
    try {
      const response = await fetch("/api/dispute-preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ executionMode, state }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.reason ?? payload.error ?? "Protocol execution failed.");
      const determination = proposedDeterminationSchema.parse(payload);
      setState((current) => ({ ...current, lifecycleStatus: "dispute_simulated", proposedDetermination: determination, dispute: { ...current.dispute, stage: "human_review" }, ledger: [...current.ledger, newEvent("ZIAAP simulation protocol", "Produced provisional simulation-only determination", determination.id, "No independent legal effect; future human judgment remains required.", "advisory")] }));
      setDisputeNotice(determination.metadata.notice ?? determination.metadata.label);
    } catch (error) { setDisputeNotice(error instanceof Error ? error.message : "Frozen protocol could not run."); }
    finally { setDisputeBusy(false); }
  }

  function updateDecision(field: "status" | "rationale", value: string) {
    setState((current) => ({ ...current, humanDecision: { ...current.humanDecision, [field]: value, simulatedSignature: null } }));
  }

  function toggleChecklist(field: keyof ContractState["humanDecision"]["checklist"]) {
    setState((current) => ({ ...current, humanDecision: { ...current.humanDecision, checklist: { ...current.humanDecision.checklist, [field]: !current.humanDecision.checklist[field] }, simulatedSignature: null } }));
  }

  function signDecision() {
    setState((current) => {
      if (!humanDecisionCanSign(current)) return current;
      const signature = `${current.constitution.humanArbitrator.name} · simulated decision record ${new Date().toISOString()} · no legal effect`;
      return { ...current, lifecycleStatus: "closed", humanDecision: { ...current.humanDecision, simulatedSignature: signature }, dispute: { ...current.dispute, stage: "closed" }, matter: { ...current.matter, stage: "H0_SIMULATED_HUMAN_DECISION" }, ledger: [...current.ledger, newEvent(current.constitution.humanArbitrator.name, "Recorded simulated human decision", current.dispute.id, current.humanDecision.status, "advisory")] };
    });
  }

  if (experience === "opening") return <OpeningExperience beginGuided={() => { setExperience("guided"); setStep(0); }} explore={() => { setExperience("explore"); setStep(0); }} />;

  return <main className="app-shell">
    <aside className="sidebar"><div className="wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>Dispute governance protocol</small></div></div><nav aria-label="Showcase workflow">{steps.map((label, index) => <button key={label} className={index === step ? "nav-step active" : "nav-step"} onClick={() => setStep(index)} aria-current={index === step ? "step" : undefined}><span>{index + 1}</span><div>{label}<small>{stepNotes[index]}</small></div></button>)}</nav><div className="sidebar-note"><ShieldAlert size={16} /><p>Synthetic data · simulation only · no legal effect. The fictional human arbitrator and protocol remain distinct.</p></div><Button variant="ghost" onClick={() => setExperience("opening")}><ArrowLeft size={15} /> Return to introduction</Button><Button variant="ghost" onClick={reset}><RefreshCcw size={15} /> Reset demo</Button></aside>
    <section className="workspace"><header className="topbar"><div><Badge tone="red">{state.lifecycleMode}</Badge><span className="matter-id">{state.matter.id}</span></div><div className="topbar-status"><span><i className={state.appointment.manifestHash ? "dot done" : "dot"} />Exact manifest</span><span><i className={state.lifecycleStatus === "appointment_simulated" ? "dot done" : "dot"} />{state.lifecycleStatus}</span></div></header>
      <div className="content">
        {step === 0 && <GovernanceAlignment state={state} busy={alignmentBusy} notice={alignmentNotice} analysisActive={analysisActive} runAlignment={runAlignment} editExpectation={editExpectation} confirmProfile={confirmProfile} selectOption={selectOption} editDecision={editDecision} updateAlignmentScenario={updateAlignmentScenario} confirmClause={confirmClause} />}
        {step === 1 && <ConstitutionBuilder state={state} updatePrinciple={updatePrinciple} />}
        {step === 2 && <ValidationLab state={state} running={calibrating} notice={calibrationNotice} runValidation={runValidation} acknowledgeScenario={acknowledgeScenario} />}
        {step === 3 && <AppointmentCeremony state={state} freezePackage={freezePackage} confirmHash={confirmHash} setReviewFlag={setReviewFlag} appoint={appoint} />}
        {step === 4 && <DisputePreview state={state} busy={disputeBusy} notice={disputeNotice} toggleSettlementConsent={toggleSettlementConsent} requestSettlement={requestSettlement} respondSettlement={respondSettlement} updatePreliminary={updatePreliminary} runDetermination={runDetermination} updateDecision={updateDecision} toggleChecklist={toggleChecklist} signDecision={signDecision} />}
      </div>
      <footer className="step-footer"><Button variant="secondary" disabled={step === 0} onClick={() => setStep((value) => value - 1)}><ArrowLeft size={16} /> Previous</Button><span>Stage {step + 1} of 5</span><Button disabled={step === 4} onClick={() => setStep((value) => value + 1)}>Continue <ArrowRight size={16} /></Button></footer>
    </section>
  </main>;
}
