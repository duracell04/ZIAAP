"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RefreshCcw, ShieldAlert } from "lucide-react";
import { GovernanceAlignment } from "@/components/case-upload";
import { ConstitutionBuilder } from "@/components/case-map";
import { CalibrationLab } from "@/components/reasoning-card";
import { AppointmentCeremony } from "@/components/evidence-card";
import { DisputePreview } from "@/components/decision-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  normalizeDecisionStatus, proposedDeterminationSchema, settlementProposalSchema,
  type ArbitratorConstitution, type ContractState, type LedgerEvent, type Topic,
} from "@/lib/case-model";
import { buildProtocolManifest, canAppoint, computeProtocolHash, humanDecisionCanSign, invalidateProtocolState } from "@/lib/protocol";

const steps = ["Governance Alignment", "Protocol Constitution", "Calibration Lab", "Freeze & Appoint", "Later Dispute"];
const stepNotes = ["Align contract", "Configure values", "Stress-test", "Version-lock", "Agent-first process"];

function newEvent(actor: string, action: string, objectId: string, detail: string, authorityClass: LedgerEvent["authorityClass"]): LedgerEvent {
  return { id: crypto.randomUUID(), timestamp: new Date().toISOString(), actor, action, objectId, detail, authorityClass };
}

export function DemoWorkspace({ initialState }: { initialState: ContractState }) {
  const [state, setState] = useState(initialState);
  const [step, setStep] = useState(0);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationNotice, setCalibrationNotice] = useState("");
  const [disputeBusy, setDisputeBusy] = useState(false);
  const [disputeNotice, setDisputeNotice] = useState("");

  function reset() {
    setState(structuredClone(initialState)); setStep(0); setCalibrationNotice(""); setDisputeNotice("");
  }

  function editExpectation(partyId: string, topic: Topic, value: string) {
    setState((current) => ({ ...current, parties: current.parties.map((party) => party.id === partyId ? { ...party, confirmed: false, expectations: { ...party.expectations, [topic]: value } } : party) }));
  }

  function confirmProfile(partyId: string) {
    setState((current) => ({
      ...current,
      parties: current.parties.map((party) => party.id === partyId ? { ...party, confirmed: !party.confirmed } : party),
      ledger: [...current.ledger, newEvent(partyId, "Updated governance profile confirmation", partyId, "Separate party assertion; not protocol appointment.", "advisory")],
    }));
  }

  function confirmClause(topic: Topic, party: "supplier" | "customer") {
    setState((current) => ({
      ...current,
      decisions: current.decisions.map((decision) => decision.topic === topic ? normalizeDecisionStatus({ ...decision, confirmations: { ...decision.confirmations, [party]: decision.confirmations[party] === decision.version ? null : decision.version } }) : decision),
      ledger: [...current.ledger, newEvent(party, "Updated contract-version confirmation", topic, "Exact contract text only; separate from appointment approval.", "advisory")],
    }));
  }

  function updatePrinciple(field: keyof ArbitratorConstitution["principles"], value: string) {
    setState((current) => {
      if (current.constitution.principles[field] === value) return current;
      const constitution = { ...current.constitution, principles: { ...current.constitution.principles, [field]: value } };
      const invalidated = invalidateProtocolState(current, constitution);
      return { ...invalidated, ledger: [...invalidated.ledger, newEvent("Parties", "Amended candidate constitution", field, "Version incremented; calibration and appointment approvals cleared.", "advisory")] };
    });
  }

  async function runCalibration(mode: "cached" | "live") {
    setCalibrating(true); setCalibrationNotice("");
    try {
      const response = await fetch("/api/calibrate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, constitution: state.constitution, scenarios: state.calibrationScenarios }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Calibration failed.");
      setState((current) => ({
        ...current, constitution: { ...current.constitution, status: "calibrated" },
        calibrationScenarios: current.calibrationScenarios.map((scenario) => {
          const match = payload.results.find((item: { scenarioId: string }) => item.scenarioId === scenario.id);
          return match ? { ...scenario, result: match.result, passed: match.result.passed, approvals: { supplier: false, customer: false } } : scenario;
        }),
        appointment: { ...current.appointment, status: "draft", manifestHash: null, confirmations: { supplier: null, customer: null } },
        ledger: [...current.ledger, newEvent("System", "Ran protocol calibration", current.constitution.id, payload.metadata.label, "administrative")],
      }));
      setCalibrationNotice(payload.metadata.notice ?? `${payload.metadata.label} completed.`);
    } catch (error) { setCalibrationNotice(error instanceof Error ? error.message : "Calibration failed."); }
    finally { setCalibrating(false); }
  }

  function approveScenario(id: string, party: "supplier" | "customer") {
    setState((current) => ({
      ...current,
      calibrationScenarios: current.calibrationScenarios.map((scenario) => scenario.id === id ? { ...scenario, approvals: { ...scenario.approvals, [party]: !scenario.approvals[party] } } : scenario),
      appointment: { ...current.appointment, status: "draft", manifestHash: null, confirmations: { supplier: null, customer: null } },
      ledger: [...current.ledger, newEvent(party, "Updated calibration approval", id, "Approval applies to the observed behavior of this exact scenario version.", "advisory")],
    }));
  }

  async function freezePackage() {
    const hash = await computeProtocolHash(buildProtocolManifest(state));
    setState((current) => ({
      ...current, constitution: { ...current.constitution, status: "frozen" },
      appointment: { ...current.appointment, status: "frozen", manifestHash: hash, constitutionVersion: current.constitution.version, confirmations: { supplier: null, customer: null }, frozenAt: new Date().toISOString() },
      ledger: [...current.ledger, newEvent("System", "Froze appointment manifest", current.appointment.id, hash, "administrative")],
    }));
  }

  function confirmHash(party: "supplier" | "customer") {
    setState((current) => {
      const hash = current.appointment.manifestHash;
      if (!hash) return current;
      const confirmations = { ...current.appointment.confirmations, [party]: current.appointment.confirmations[party] === hash ? null : hash };
      const partyApproved = confirmations.supplier === hash && confirmations.customer === hash;
      return { ...current, appointment: { ...current.appointment, confirmations, status: partyApproved ? "party_approved" : "frozen" }, ledger: [...current.ledger, newEvent(party, "Updated exact-hash approval", current.appointment.id, hash, "advisory")] };
    });
  }

  function setReviewFlag(field: "disclosuresReviewed" | "arbitratorAccepted", value: boolean) {
    setState((current) => ({ ...current, appointment: { ...current.appointment, [field]: value } }));
  }

  function appoint() {
    setState((current) => {
      if (!current.appointment.manifestHash || !canAppoint(current)) return current;
      const signature = `${current.constitution.humanArbitrator.name} · accepted ${new Date().toISOString()} · prototype signature`;
      return {
        ...current, matter: { ...current.matter, stage: "A0_PROTOCOL_APPOINTED" }, constitution: { ...current.constitution, status: "appointed" },
        appointment: { ...current.appointment, status: "appointed", simulatedSignature: signature },
        dispute: { ...current.dispute, appointmentHash: current.appointment.manifestHash, stage: "settlement" },
        settlement: { ...current.settlement, status: "awaiting_consent" },
        ledger: [...current.ledger, newEvent(current.constitution.humanArbitrator.name, "Accepted AI-native arbitration appointment", current.appointment.id, "Human legal actor; frozen ZIAAP protocol; simulated execution only.", "adjudicative")],
      };
    });
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
        settlement: { ...current.settlement, responses, status: settled ? "settled" : notSettled ? "not_settled" : "active", meritsRecord: settled ? ["A settlement was accepted by both parties."] : notSettled ? ["Settlement facilitation occurred and ended without settlement."] : [] },
        dispute: { ...current.dispute, stage: settled ? "closed" : notSettled ? "arbitration" : current.dispute.stage },
        ledger: [...current.ledger, newEvent(party, "Recorded sealed settlement response", current.dispute.id, response === "decline" ? "Settlement ended; content remains sealed." : "Response stored in sealed track.", "advisory")],
      };
    });
  }

  function updatePreliminary(value: string) {
    setState((current) => ({ ...current, humanDecision: { ...current.humanDecision, preliminaryAssessment: value } }));
  }

  async function runDetermination(mode: "cached" | "live") {
    setDisputeBusy(true); setDisputeNotice("");
    try {
      const response = await fetch("/api/dispute-preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, state }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Frozen protocol could not run.");
      const determination = proposedDeterminationSchema.parse(payload);
      setState((current) => ({ ...current, proposedDetermination: determination, dispute: { ...current.dispute, stage: "human_review" }, ledger: [...current.ledger, newEvent("Frozen ZIAAP protocol", "Produced provisional determination", determination.id, "No independent legal effect; human adoption required.", "adjudicative")] }));
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
      const signature = `${current.constitution.humanArbitrator.name} · signed ${new Date().toISOString()} · prototype award`;
      return { ...current, humanDecision: { ...current.humanDecision, simulatedSignature: signature }, dispute: { ...current.dispute, stage: "closed" }, matter: { ...current.matter, stage: "A3_HUMAN_AWARD_PREVIEW" }, ledger: [...current.ledger, newEvent(current.constitution.humanArbitrator.name, "Signed simulated human award", current.dispute.id, current.humanDecision.status, "adjudicative")] };
    });
  }

  return <main className="app-shell">
    <aside className="sidebar"><div className="wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>AI-native arbitrator</small></div></div><nav aria-label="Appointment workflow">{steps.map((label, index) => <button key={label} className={index === step ? "nav-step active" : "nav-step"} onClick={() => setStep(index)} aria-current={index === step ? "step" : undefined}><span>{index + 1}</span><div>{label}<small>{stepNotes[index]}</small></div></button>)}</nav><div className="sidebar-note"><ShieldAlert size={16} /><p>The human arbitrator holds legal office. The version-locked ZIAAP protocol runs the process agent-first. Only the human signs an award.</p></div><Button variant="ghost" onClick={reset}><RefreshCcw size={15} /> Reset demo</Button></aside>
    <section className="workspace"><header className="topbar"><div><Badge tone="red">{state.matter.stage}</Badge><span className="matter-id">{state.matter.id}</span></div><div className="topbar-status"><span><i className={state.constitution.status === "appointed" ? "dot done" : "dot"} />Protocol {state.constitution.status}</span><span><i className={state.appointment.status === "appointed" ? "dot done" : "dot"} />Appointment</span></div></header>
      <div className="content">
        {step === 0 && <GovernanceAlignment state={state} editExpectation={editExpectation} confirmProfile={confirmProfile} confirmClause={confirmClause} />}
        {step === 1 && <ConstitutionBuilder state={state} updatePrinciple={updatePrinciple} />}
        {step === 2 && <CalibrationLab state={state} running={calibrating} notice={calibrationNotice} runCalibration={runCalibration} approveScenario={approveScenario} />}
        {step === 3 && <AppointmentCeremony state={state} freezePackage={freezePackage} confirmHash={confirmHash} setReviewFlag={setReviewFlag} appoint={appoint} />}
        {step === 4 && <DisputePreview state={state} busy={disputeBusy} notice={disputeNotice} toggleSettlementConsent={toggleSettlementConsent} requestSettlement={requestSettlement} respondSettlement={respondSettlement} updatePreliminary={updatePreliminary} runDetermination={runDetermination} updateDecision={updateDecision} toggleChecklist={toggleChecklist} signDecision={signDecision} />}
      </div>
      <footer className="step-footer"><Button variant="secondary" disabled={step === 0} onClick={() => setStep((value) => value - 1)}><ArrowLeft size={16} /> Previous</Button><span>Stage {step + 1} of 5</span><Button disabled={step === 4} onClick={() => setStep((value) => value + 1)}>Continue <ArrowRight size={16} /></Button></footer>
    </section>
  </main>;
}
