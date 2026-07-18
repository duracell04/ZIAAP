import { Check, FlaskConical, ShieldAlert, SlidersHorizontal } from "lucide-react";
import { AuthorityStrip } from "@/components/authority-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { constitutionAcknowledged } from "@/lib/protocol";
import type { ContractState } from "@/lib/case-model";

type Props = {
  state: ContractState; running: boolean; notice: string;
  embedded?: boolean;
  runValidation: (mode: "illustrative" | "live") => void;
  acknowledgeScenario: (id: string, party: "supplier" | "customer") => void;
};

export function ValidationLab({ state, running, notice, embedded = false, runValidation, acknowledgeScenario }: Props) {
  const failedSelection = state.calibrationScenarios.some((scenario) => scenario.result && !scenario.selectedArtifactId);
  const acknowledgedCount = state.calibrationScenarios.filter((scenario) => scenario.result && scenario.simulatedAcknowledgements.supplier === scenario.result.artifactId && scenario.simulatedAcknowledgements.customer === scenario.result.artifactId).length;
  return <>
    {embedded
      ? <div className="section-heading gate-section-heading"><div><span>Gate 2 · Configuration · scenario tests</span><h2>Observe how the exact Constitution behaves under pressure.</h2></div><p>Tests report behavior and limitations without independently validating a model or outcome.</p></div>
      : <div className="page-intro"><span>Gate 2 · Configuration</span><h1>Observe how the exact Constitution behaves under pressure.</h1><p>Scenario testing exercises the configured control plane against synthetic cases and reports observed behaviour, safeguards, and limitations without independently validating the model or outcome.</p></div>}

    <div className="stage-distinction compact"><Card><SlidersHorizontal size={19} /><span>Calibration is configuration</span><h2>Constitution v{state.constitution.version}</h2><p>{constitutionAcknowledged(state) ? "Exact version acknowledged by both parties." : "Both parties must acknowledge the exact Constitution version."}</p></Card><Card><FlaskConical size={19} /><span>Stress testing is observation</span><h2>{acknowledgedCount} of 4 artifacts acknowledged</h2><p>Each artifact retains its own execution status and limitations.</p></Card></div>

    {!constitutionAcknowledged(state) && <div className="warning"><ShieldAlert size={18} /><div><strong>Constitution acknowledgement incomplete</strong><p>You may inspect stress artifacts, but manifest preparation remains blocked until both parties acknowledge Constitution v{state.constitution.version}.</p></div></div>}

    <div className="action-strip"><div><FlaskConical size={19} /><div><strong>Four synthetic stress cases</strong><small>Mechanical · evidence · mandatory law · symmetry</small></div></div><div><Button variant="secondary" disabled={running} onClick={() => runValidation("illustrative")}>View illustrative example</Button><Button disabled={running} onClick={() => runValidation("live")}>{running ? "Running execution…" : "Run live execution"}</Button></div></div>
    {notice && <div className={failedSelection ? "warning" : "notice"} role="status">{failedSelection && <ShieldAlert size={16} />}<div>{notice}{failedSelection && <p>The prior artifacts remain visible but inactive. Deliberately select the illustrative example or successfully rerun live execution.</p>}</div></div>}

    <div className="calibration-list">{state.calibrationScenarios.map((scenario) => {
      const result = scenario.result;
      const selected = Boolean(result && scenario.selectedArtifactId === result.artifactId);
      return <Card key={scenario.id} className="calibration-card">
        <div className="finding-top"><div><Badge tone={selected ? "blue" : result ? "amber" : "amber"}>{selected ? result?.executionStatus : result ? "inactive artifact" : "not_executed"}</Badge><h2>{scenario.title}</h2><p>{scenario.acceptableBehavior}</p></div><span className="version">{scenario.id}</span></div>
        <p className="question">{scenario.question}</p>
        <div className="stress-input-grid"><div><small>Hypothetical facts</small><ul>{scenario.facts.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Evidence supplied</small><ul>{scenario.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Required safeguards</small><ul>{scenario.requiredSafeguards.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        {result ? <><AuthorityStrip executionStatus={selected ? result.executionStatus : "failed"} actor={result.actor} version={result.version} consequence={selected ? result.consequence : "Inactive after failed execution; acknowledgement blocked"} provenance={result.provenance} /><div className="calibration-result"><Badge tone="blue">Observed simulation behavior</Badge><strong>{result.outcome}</strong><p>{result.summary}</p><p>{result.behavior}</p><div className="safeguard-list"><small>Safeguards observed</small>{result.safeguardsObserved.map((item) => <span key={item}><Check size={12} />{item}</span>)}</div><p className="limitation"><strong>Limitations:</strong> {result.limitations.join(" ")}</p></div></> : <div className="empty-result"><ShieldAlert size={16} /> No execution artifact for Constitution version {state.constitution.version}</div>}
        <div className="confirm-row"><span>Acknowledge for simulated ceremony · no legal or authoritative effect</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} disabled={!result || !selected} variant={result && scenario.simulatedAcknowledgements[party] === result.artifactId ? "secondary" : "ghost"} onClick={() => acknowledgeScenario(scenario.id, party)}>{result && scenario.simulatedAcknowledgements[party] === result.artifactId && <Check size={14} />} {party}</Button>)}</div></div>
      </Card>;
    })}</div>
  </>;
}
