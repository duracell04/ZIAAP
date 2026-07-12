import { Check, Fingerprint, LockKeyhole, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allCalibrationApproved, canAppoint } from "@/lib/protocol";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; freezePackage: () => void; confirmHash: (party: "supplier" | "customer") => void;
  setReviewFlag: (field: "disclosuresReviewed" | "arbitratorAccepted", value: boolean) => void; appoint: () => void;
};

export function AppointmentCeremony({ state, freezePackage, confirmHash, setReviewFlag, appoint }: Props) {
  const hash = state.appointment.manifestHash;
  const alignmentReady = state.parties.every((party) => party.confirmed) && state.decisions.every((decision) => decision.confirmations.supplier === decision.version && decision.confirmations.customer === decision.version);
  return <>
    <div className="page-intro"><span>Stage 4 · freeze and appoint</span><h1>Turn tested governance into an appointment.</h1><p>The package binds the agreed contract state, constitution, protocol identity, and approved calibration results to one tamper-evident hash.</p></div>
    <div className="readiness-grid"><Card><Badge tone={alignmentReady ? "green" : "amber"}>{alignmentReady ? "Ready" : "Incomplete"}</Badge><h2>Contract governance</h2><p>Both party profiles and every exact clause version confirmed.</p></Card><Card><Badge tone={allCalibrationApproved(state.calibrationScenarios) ? "green" : "amber"}>{allCalibrationApproved(state.calibrationScenarios) ? "Ready" : "Incomplete"}</Badge><h2>Calibration suite</h2><p>All four safeguards passed and behavior approved by both parties.</p></Card></div>
    <Card className="freeze-card"><div className="freeze-heading"><div className="icon-box"><Fingerprint size={21} /></div><div><span>Arbitrator Constitution and Appointment Record</span><h2>Constitution version {state.constitution.version}</h2></div></div>
      {hash ? <div className="hash-box"><LockKeyhole size={17} /><div><small>FROZEN MANIFEST HASH</small><code>{hash}</code></div></div> : <Button disabled={!alignmentReady || !allCalibrationApproved(state.calibrationScenarios)} onClick={freezePackage}><LockKeyhole size={15} /> Freeze exact appointment package</Button>}
      {hash && <><div className="confirm-row hash-confirm"><span>Separate approval of this exact hash</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} variant={state.appointment.confirmations[party] === hash ? "secondary" : "ghost"} onClick={() => confirmHash(party)}>{state.appointment.confirmations[party] === hash && <Check size={14} />} {party}</Button>)}</div></div>
      <div className="appointment-checks"><label className="checkline"><input type="checkbox" checked={state.appointment.disclosuresReviewed} onChange={(event) => setReviewFlag("disclosuresReviewed", event.target.checked)} /> Parties reviewed the human arbitrator’s disclosure</label><p>{state.constitution.humanArbitrator.disclosure}</p><label className="checkline"><input type="checkbox" checked={state.appointment.arbitratorAccepted} onChange={(event) => setReviewFlag("arbitratorAccepted", event.target.checked)} /> {state.constitution.humanArbitrator.name} accepts the appointment and independent-decision duty</label></div>
      <Button disabled={!canAppoint(state)} onClick={appoint}><PenLine size={15} /> Complete simulated appointment</Button></>}
    </Card>
    {state.appointment.status === "appointed" && <div className="result success appointment-success"><Badge tone="green">Appointed</Badge><strong>{state.constitution.humanArbitrator.name}</strong><span>{state.appointment.simulatedSignature}</span><p>Prototype execution record only—not a production electronic signature or arbitral appointment service.</p></div>}
  </>;
}
