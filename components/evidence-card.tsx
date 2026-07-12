import { Check, Fingerprint, LockKeyhole, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allStressTestsAcknowledged, canSimulateAppointment, partyAlignmentReady } from "@/lib/protocol";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; freezePackage: () => void; confirmHash: (party: "supplier" | "customer") => void;
  setReviewFlag: (field: "disclosuresReviewed" | "simulatedArbitratorAccepted", value: boolean) => void; appoint: () => void;
};

export function AppointmentCeremony({ state, freezePackage, confirmHash, setReviewFlag, appoint }: Props) {
  const hash = state.appointment.manifestHash;
  const alignmentReady = partyAlignmentReady(state);
  return <>
    <div className="page-intro"><span>Stage 4 · exact protocol manifest</span><h1>Prepare the simulation manifest.</h1><p>The digest identifies selected configuration and eligible simulation artifacts. It is not runtime attestation, provider-side proof, or a production signature.</p></div>
    <div className="readiness-grid"><Card><Badge tone={alignmentReady ? "green" : "amber"}>{alignmentReady ? "Ready" : "Incomplete"}</Badge><h2>Party alignment</h2><p>Both party profiles and every exact clause version confirmed.</p></Card><Card><Badge tone={allStressTestsAcknowledged(state.calibrationScenarios) ? "green" : "amber"}>{allStressTestsAcknowledged(state.calibrationScenarios) ? "Ready" : "Incomplete"}</Badge><h2>Stress-test artifacts</h2><p>All selected artifacts are eligible and acknowledged for the simulated ceremony.</p></Card></div>
    <Card className="freeze-card"><div className="freeze-heading"><div className="icon-box"><Fingerprint size={21} /></div><div><span>Arbitrator Constitution and Appointment Record</span><h2>Constitution version {state.constitution.version}</h2></div></div>
      {hash ? <div className="hash-box"><LockKeyhole size={17} /><div><small>EXACT PROTOCOL MANIFEST · SHA-256</small><code>{hash}</code></div></div> : <Button disabled={!alignmentReady || !allStressTestsAcknowledged(state.calibrationScenarios)} onClick={freezePackage}><LockKeyhole size={15} /> Prepare exact protocol manifest</Button>}
      {hash && <><div className="confirm-row hash-confirm"><span>Acknowledge exact hash for simulated ceremony · no legal effect</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} variant={state.appointment.simulatedAcknowledgements[party] === hash ? "secondary" : "ghost"} onClick={() => confirmHash(party)}>{state.appointment.simulatedAcknowledgements[party] === hash && <Check size={14} />} {party}</Button>)}</div></div>
      <div className="appointment-checks"><label className="checkline"><input type="checkbox" checked={state.appointment.disclosuresReviewed} onChange={(event) => setReviewFlag("disclosuresReviewed", event.target.checked)} /> Parties reviewed the fictional human arbitrator disclosure</label><p>{state.constitution.humanArbitrator.disclosure}</p><label className="checkline"><input type="checkbox" checked={state.appointment.simulatedArbitratorAccepted} onChange={(event) => setReviewFlag("simulatedArbitratorAccepted", event.target.checked)} /> Record simulated arbitrator acceptance</label></div>
      <Button disabled={!canSimulateAppointment(state)} onClick={appoint}><PenLine size={15} /> Simulate appointment under acknowledged manifest</Button></>}
    </Card>
    {state.lifecycleStatus === "appointment_simulated" && <div className="result success appointment-success"><Badge tone="green">Simulation only</Badge><strong>Simulated appointment under the acknowledged protocol manifest</strong><span>{state.appointment.simulatedAcceptanceRecord}</span><p>No institutional appointment, production identity verification, production signature, legal effect, or operative award.</p></div>}
  </>;
}
