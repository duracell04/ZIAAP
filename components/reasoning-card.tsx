import { Check, FlaskConical, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; running: boolean; notice: string;
  runValidation: (mode: "cached" | "live") => void;
  approveScenario: (id: string, party: "supplier" | "customer") => void;
};

export function ValidationLab({ state, running, notice, runValidation, approveScenario }: Props) {
  return <>
    <div className="page-intro"><span>Stage 3 · stress testing and validation</span><h1>Validate the calibrated protocol.</h1><p>The parties test the candidate runtime against hypothetical disputes. A result must observe every safeguard, and both parties must approve the observed behavior before version-locking.</p></div>
    <div className="action-strip"><div><FlaskConical size={19} /><div><strong>Four mandatory regression cases</strong><small>Mechanical · evidence · mandatory law · symmetry</small></div></div><div><Button variant="secondary" disabled={running} onClick={() => runValidation("cached")}>Run validated suite</Button><Button disabled={running} onClick={() => runValidation("live")}>{running ? "Testing…" : "Run live validation"}</Button></div></div>
    {notice && <p className="notice" role="status">{notice}</p>}
    <div className="calibration-list">{state.calibrationScenarios.map((scenario) => <Card key={scenario.id} className="calibration-card">
      <div className="finding-top"><div><Badge tone={scenario.passed ? "green" : "amber"}>{scenario.passed ? "Safeguards passed" : scenario.category}</Badge><h2>{scenario.title}</h2></div><span className="version">{scenario.id}</span></div>
      <p className="question">{scenario.question}</p><div className="calibration-columns"><div><small>Test record</small><ul>{scenario.facts.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Required safeguards</small><ul>{scenario.requiredSafeguards.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      {scenario.result ? <div className="calibration-result"><Badge tone="blue">Validation result</Badge><strong>{scenario.result.outcome}</strong><p>{scenario.result.behavior}</p></div> : <div className="empty-result"><ShieldAlert size={16} /> Not tested on constitution version {state.constitution.version}</div>}
      <div className="confirm-row"><span>Approve this exact observed behavior</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} disabled={!scenario.passed} variant={scenario.approvals[party] ? "secondary" : "ghost"} onClick={() => approveScenario(scenario.id, party)}>{scenario.approvals[party] && <Check size={14} />} {party}</Button>)}</div></div>
    </Card>)}</div>
  </>;
}
