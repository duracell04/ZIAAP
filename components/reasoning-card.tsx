import { Check, FlaskConical, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; running: boolean; notice: string;
  runCalibration: (mode: "cached" | "live") => void;
  approveScenario: (id: string, party: "supplier" | "customer") => void;
};

export function CalibrationLab({ state, running, notice, runCalibration, approveScenario }: Props) {
  return <>
    <div className="page-intro"><span>Stage 3 · calibration lab</span><h1>Stress-test before appointment.</h1><p>The parties test the candidate protocol while their interests remain aligned. A result must pass its safeguards and both parties must approve the observed behavior.</p></div>
    <div className="action-strip"><div><FlaskConical size={19} /><div><strong>Four mandatory regression cases</strong><small>Mechanical · evidence · mandatory law · symmetry</small></div></div><div><Button variant="secondary" disabled={running} onClick={() => runCalibration("cached")}>Run validated suite</Button><Button disabled={running} onClick={() => runCalibration("live")}>{running ? "Testing…" : "Run live calibration"}</Button></div></div>
    {notice && <p className="notice" role="status">{notice}</p>}
    <div className="calibration-list">{state.calibrationScenarios.map((scenario) => <Card key={scenario.id} className="calibration-card">
      <div className="finding-top"><div><Badge tone={scenario.passed ? "green" : "amber"}>{scenario.passed ? "Safeguards passed" : scenario.category}</Badge><h2>{scenario.title}</h2></div><span className="version">{scenario.id}</span></div>
      <p className="question">{scenario.question}</p><div className="calibration-columns"><div><small>Test record</small><ul>{scenario.facts.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Required safeguards</small><ul>{scenario.requiredSafeguards.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      {scenario.result ? <div className="calibration-result"><Badge tone="blue">Calibration result</Badge><strong>{scenario.result.outcome}</strong><p>{scenario.result.behavior}</p></div> : <div className="empty-result"><ShieldAlert size={16} /> Not tested on constitution version {state.constitution.version}</div>}
      <div className="confirm-row"><span>Approve this exact observed behavior</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} disabled={!scenario.passed} variant={scenario.approvals[party] ? "secondary" : "ghost"} onClick={() => approveScenario(scenario.id, party)}>{scenario.approvals[party] && <Check size={14} />} {party}</Button>)}</div></div>
    </Card>)}</div>
  </>;
}
