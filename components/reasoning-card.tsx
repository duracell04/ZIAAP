import { Check, FlaskConical, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; running: boolean; notice: string;
  runValidation: (mode: "illustrative" | "live") => void;
  acknowledgeScenario: (id: string, party: "supplier" | "customer") => void;
};

export function ValidationLab({ state, running, notice, runValidation, acknowledgeScenario }: Props) {
  return <>
    <div className="page-intro"><span>Stage 3 · stress testing</span><h1>Inspect the calibrated protocol.</h1><p>Hypothetical results show observed behavior. They are illustrative or executed-unverified, never independently validated by this showcase.</p></div>
    <div className="action-strip"><div><FlaskConical size={19} /><div><strong>Four synthetic stress cases</strong><small>Mechanical · evidence · mandatory law · symmetry</small></div></div><div><Button variant="secondary" disabled={running} onClick={() => runValidation("illustrative")}>View illustrative example</Button><Button disabled={running} onClick={() => runValidation("live")}>{running ? "Running…" : "Run live execution"}</Button></div></div>
    {notice && <p className="notice" role="status">{notice}</p>}
    <div className="calibration-list">{state.calibrationScenarios.map((scenario) => <Card key={scenario.id} className="calibration-card">
      <div className="finding-top"><div><Badge tone={scenario.result ? "blue" : "amber"}>{scenario.result?.executionStatus ?? scenario.category}</Badge><h2>{scenario.title}</h2></div><span className="version">{scenario.id}</span></div>
      <p className="question">{scenario.question}</p><div className="calibration-columns"><div><small>Test record</small><ul>{scenario.facts.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Required safeguards</small><ul>{scenario.requiredSafeguards.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      {scenario.result ? <div className="calibration-result"><Badge tone="blue">Observed simulation behavior</Badge><strong>{scenario.result.outcome}</strong><p>{scenario.result.behavior}</p><p>{scenario.result.limitations.join(" ")}</p></div> : <div className="empty-result"><ShieldAlert size={16} /> No eligible artifact selected for Constitution version {state.constitution.version}</div>}
      <div className="confirm-row"><span>Acknowledge for simulated ceremony · no legal effect</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} disabled={!scenario.result || scenario.selectedArtifactId !== scenario.result.artifactId} variant={scenario.result && scenario.simulatedAcknowledgements[party] === scenario.result.artifactId ? "secondary" : "ghost"} onClick={() => acknowledgeScenario(scenario.id, party)}>{scenario.result && scenario.simulatedAcknowledgements[party] === scenario.result.artifactId && <Check size={14} />} {party}</Button>)}</div></div>
    </Card>)}</div>
  </>;
}
