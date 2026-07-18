import { Check, FileKey2, Fingerprint, LockKeyhole, PenLine, ShieldAlert } from "lucide-react";
import { AuthorityStrip } from "@/components/authority-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allStressTestsAcknowledged, buildProtocolManifest, canSimulateAppointment, constitutionAcknowledged, partyAlignmentReady } from "@/lib/protocol";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; busy: boolean; errorNotice: string;
  freezePackage: () => void; confirmHash: (party: "supplier" | "customer") => void;
  setReviewFlag: (field: "disclosuresReviewed" | "simulatedArbitratorAccepted", value: boolean) => void;
  appoint: () => void;
};

export type CeremonyNotice = {
  tone: "success" | "confirmation" | "instruction" | "error";
  text: string;
} | null;

export function deriveCeremonyNotice(state: ContractState, errorNotice: string): CeremonyNotice {
  const hash = state.appointment.manifestHash;
  const completed = ["appointment_simulated", "dispute_simulated", "closed"].includes(state.lifecycleStatus);
  const acknowledged = Boolean(hash && state.appointment.simulatedAcknowledgements.supplier === hash && state.appointment.simulatedAcknowledgements.customer === hash);

  if (completed) return { tone: "success", text: "Integrity verification passed. Simulated appointment recorded with no legal effect." };
  if (acknowledged) return { tone: "confirmation", text: "Both parties have acknowledged the current configuration manifest. Complete the remaining simulated ceremony checks to continue." };
  if (hash) return { tone: "instruction", text: "Configuration Manifest prepared. Both parties must acknowledge this exact digest before the fictional ceremony." };
  if (errorNotice) return { tone: "error", text: errorNotice };
  return null;
}

export function AppointmentCeremony({ state, busy, errorNotice, freezePackage, confirmHash, setReviewFlag, appoint }: Props) {
  const hash = state.appointment.manifestHash;
  const alignmentReady = partyAlignmentReady(state);
  const calibrationReady = constitutionAcknowledged(state);
  const stressReady = allStressTestsAcknowledged(state.calibrationScenarios);
  const manifest = buildProtocolManifest(state);
  const manifestAcknowledged = Boolean(hash && state.appointment.simulatedAcknowledgements.supplier === hash && state.appointment.simulatedAcknowledgements.customer === hash);
  const ceremonyNotice = deriveCeremonyNotice(state, errorNotice);

  return <>
    <div className="page-intro"><span>I1 · Cockpit · Gate 3 · Appointment & Configuration Freeze</span><h1>Freeze the selected configuration before the synthetic matter proceeds.</h1><p>The digest binds selected configuration and eligible synthetic artifacts. It supports internal change detection only—not actor identity, provider execution, runtime attestation, signature or legal appointment. The appointment interaction is explicitly fictional and has no legal effect.</p></div>
    <AuthorityStrip executionStatus="not_executed" actor="Concept transition verifier" version={`Manifest v${state.appointment.manifestVersion}`} consequence={hash ? "Exact configuration prepared for simulated acknowledgement" : "Preparation blocked until all prior gates pass"} provenance="Canonical JSON and browser-side SHA-256 for internal simulation consistency" />

    <div className="readiness-grid triple"><Card><Badge tone={alignmentReady ? "green" : "amber"}>{alignmentReady ? "Ready" : "Incomplete"}</Badge><h2>Gate 1 · Alignment</h2><p>Both profiles and every exact clause version confirmed.</p></Card><Card><Badge tone={calibrationReady ? "green" : "amber"}>{calibrationReady ? "Ready" : "Incomplete"}</Badge><h2>Control plane</h2><p>Exact Constitution version {state.constitution.version} acknowledged by both parties.</p></Card><Card><Badge tone={stressReady ? "green" : "amber"}>{stressReady ? "Ready" : "Incomplete"}</Badge><h2>Scenario artifacts</h2><p>Four eligible exact artifacts acknowledged for simulation.</p></Card></div>

    <Card className="manifest-card"><div className="manifest-heading"><div><FileKey2 size={21} /><span>Configuration Manifest</span><h2>Manifest version {state.appointment.manifestVersion}</h2></div><Badge tone={hash ? "green" : "amber"}>{hash ? state.lifecycleStatus : "not prepared"}</Badge></div><div className="manifest-scope"><div><small>Identifies</small><p>Contract decisions · legal architecture · Constitution · declared model/prompt/retrieval/tool/engine · scenario artifacts · fictional human record · change policy</p></div><div><small>Does not establish</small><p>Build or dependency attestation · provider-side proof · deployed environment · runtime attestation · actor identity · production signature</p></div></div><details className="manifest-details" open><summary>Inspect full canonical manifest contents</summary><pre>{JSON.stringify(manifest, null, 2)}</pre></details></Card>

    <Card className="freeze-card"><div className="freeze-heading"><div className="icon-box"><Fingerprint size={21} /></div><div><span>Digest and simulated ceremony</span><h2>Constitution version {state.constitution.version}</h2></div></div>
      {hash ? <div className="hash-box"><LockKeyhole size={17} /><div><small>CONFIGURATION MANIFEST · SHA-256</small><code>{hash}</code></div></div> : <Button disabled={busy || !alignmentReady || !calibrationReady || !stressReady} onClick={freezePackage}><LockKeyhole size={15} /> {busy ? "Preparing manifest…" : "Prepare Configuration Manifest"}</Button>}
      {hash && <><div className="confirm-row hash-confirm"><span>Acknowledge exact hash for simulated ceremony · no legal effect</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} variant={state.appointment.simulatedAcknowledgements[party] === hash ? "secondary" : "ghost"} onClick={() => confirmHash(party)}>{state.appointment.simulatedAcknowledgements[party] === hash && <Check size={14} />} {party}</Button>)}</div></div>
      <div className="appointment-checks"><label className="checkline"><input type="checkbox" checked={state.appointment.disclosuresReviewed} onChange={(event) => setReviewFlag("disclosuresReviewed", event.target.checked)} /> Parties reviewed the fictional human-arbitrator disclosure</label><p>{state.constitution.humanArbitrator.disclosure}</p><label className="checkline"><input type="checkbox" checked={state.appointment.simulatedArbitratorAccepted} onChange={(event) => setReviewFlag("simulatedArbitratorAccepted", event.target.checked)} /> Record fictional arbitrator acceptance for this simulation</label></div>
      <div className="ceremony-status"><span><i className={manifestAcknowledged ? "dot done" : "dot"} /> Exact hash acknowledged</span><span><i className={state.appointment.disclosuresReviewed ? "dot done" : "dot"} /> Disclosure reviewed</span><span><i className={state.appointment.simulatedArbitratorAccepted ? "dot done" : "dot"} /> Simulated acceptance</span></div>
      <Button disabled={busy || !canSimulateAppointment(state)} onClick={appoint}><PenLine size={15} /> {busy ? "Verifying exact state…" : "Simulate appointment under acknowledged manifest"}</Button></>}
      {ceremonyNotice && <div className={ceremonyNotice.tone === "success" || ceremonyNotice.tone === "confirmation" ? "notice" : "warning"} role={ceremonyNotice.tone === "error" ? "alert" : "status"}>{ceremonyNotice.tone === "instruction" || ceremonyNotice.tone === "error" ? <ShieldAlert size={16} /> : null}<span>{ceremonyNotice.text}</span></div>}
    </Card>
    {state.lifecycleStatus === "appointment_simulated" || state.lifecycleStatus === "dispute_simulated" || state.lifecycleStatus === "closed" ? <div className="result success appointment-success"><Badge tone="green">Simulation only</Badge><strong>Simulated appointment under the acknowledged protocol manifest</strong><span>{state.appointment.simulatedAcceptanceRecord}</span><p>No institutional appointment, production identity verification, production signature, legal effect, or operative award.</p></div> : null}
  </>;
}
