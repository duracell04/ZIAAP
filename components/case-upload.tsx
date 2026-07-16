import { AlertTriangle, BookOpen, Calculator, Check, Database, Scale } from "lucide-react";
import { AuthorityStrip } from "@/components/authority-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildAlignmentAnnex, isBilateralConfirmation, type ContractState, type Topic } from "@/lib/case-model";
import { calculateServiceCredit } from "@/lib/scenario";

const topicLabels: Record<Topic, string> = {
  uptime: "Uptime, evidence & credits", liability: "Consequential loss & cap", legal_architecture: "Law, seat & procedure",
};

type Props = {
  state: ContractState; busy: boolean; notice: string; analysisActive: boolean;
  runAlignment: (mode: "illustrative" | "live") => void;
  editExpectation: (partyId: string, topic: Topic, value: string) => void;
  confirmProfile: (partyId: string) => void;
  selectOption: (topic: Topic, optionId: string) => void;
  editDecision: (topic: Topic, language: string) => void;
  updateAlignmentScenario: (field: "actualUptimeBps" | "inputsConfirmed", value: number | boolean) => void;
  confirmClause: (topic: Topic, party: "supplier" | "customer") => void;
};

export function GovernanceAlignment({ state, busy, notice, analysisActive, runAlignment, editExpectation, confirmProfile, selectOption, editDecision, updateAlignmentScenario, confirmClause }: Props) {
  const annex = buildAlignmentAnnex(state);
  const uptimeDecision = state.decisions.find((decision) => decision.topic === "uptime")!;
  const scenario = calculateServiceCredit(uptimeDecision.serviceCreditRule, state.alignmentScenario.actualUptimeBps, state.alignmentScenario.inputsConfirmed);

  return <>
    <div className="page-intro"><span>Stage 1 · before conflict</span><h1>Turn hidden expectations into agreed governance.</h1><p>Independent party positions are compared against the draft, sources, and commercial consequences. AI supports analysis; the parties alone select and confirm contractual text.</p></div>
    <AuthorityStrip executionStatus={analysisActive ? state.analysis.metadata.executionStatus : "failed"} actor={state.analysis.metadata.executionMode === "live" ? "Live model execution" : "Concept curator"} version={state.analysis.metadata.artifactId} consequence={analysisActive ? "May support simulated alignment" : "Acknowledgement and manifest preparation blocked"} provenance={state.analysis.metadata.provenance} />

    <Card className="draft-card"><div><BookOpen size={18} /><div><strong>Draft SaaS Agreement</strong><small>Shared source text · three clauses · synthetic matter</small></div></div><Badge>Source text</Badge></Card>
    <div className="party-grid">{state.parties.map((party) => <Card key={party.id} className="party-card">
      <div className="party-heading"><div className={`party-mark ${party.id}`}>{party.name.charAt(0)}</div><div><h2>{party.name}</h2><p>{party.role} · {party.jurisdiction}</p></div><Badge tone={party.confirmed ? "green" : "amber"}>{party.confirmed ? "Profile confirmed" : "Party assertion"}</Badge></div>
      {Object.entries(party.expectations).map(([topic, value]) => <label key={topic}><span>{topicLabels[topic as Topic]}</span><textarea value={value} onChange={(event) => editExpectation(party.id, topic as Topic, event.target.value)} /></label>)}
      <Button variant={party.confirmed ? "secondary" : "primary"} onClick={() => confirmProfile(party.id)}>{party.confirmed && <Check size={15} />} {party.confirmed ? "Profile confirmed" : "Confirm this profile"}</Button>
    </Card>)}</div>

    <div className="action-strip"><div><Database size={19} /><div><strong>Compare the independent expectations</strong><small>Two distinct actions · no silent fallback</small></div></div><div><Button variant="secondary" disabled={busy} onClick={() => runAlignment("illustrative")}>View illustrative example</Button><Button disabled={busy} onClick={() => runAlignment("live")}>{busy ? "Running…" : "Run live execution"}</Button></div></div>
    {notice && <p className={analysisActive ? "notice" : "warning"} role="status">{notice}</p>}
    {!analysisActive && <div className="warning"><AlertTriangle size={18} /><div><strong>No eligible analysis artifact is selected.</strong><p>The last valid artifact remains preserved below but is inactive. Deliberately select the illustrative example or complete a live run before simulated acknowledgement.</p></div></div>}

    <div className="material-legend"><Badge>Source text</Badge><Badge tone="amber">Party assertion</Badge><Badge tone="blue">AI-supported analysis</Badge><Badge tone="red">Legal constraint</Badge><Badge tone="green">Deterministic calculation</Badge><Badge>Proposed option</Badge><Badge tone="green">Agreed text</Badge></div>

    <div className={!analysisActive ? "stage-disabled matrix-list" : "matrix-list"}>{state.analysis.findings.map((finding) => {
      const decision = state.decisions.find((item) => item.topic === finding.topic)!;
      const selected = finding.options.find((option) => option.id === decision.selectedOptionId) ?? finding.options[0];
      return <Card key={finding.id} className="finding-card">
        <div className="finding-top"><div><span className="topic-kicker">{finding.dimension} divergence · {finding.authorityClass}</span><h2>{finding.title}</h2></div><Badge tone="blue">AI-supported analysis</Badge></div>
        <div className="position-grid"><div><small>Supplier position · party assertion</small><p>{finding.supplierPosition}</p></div><div><small>Customer position · party assertion</small><p>{finding.customerPosition}</p></div></div>
        <div className="consequence"><AlertTriangle size={17} /><div><small>Practical consequence</small><p>{finding.consequence}</p><small>Uncertainty: {finding.uncertainty}</small></div></div>
        <div className="source-row"><span><BookOpen size={13} /> Sources: {finding.sourceIds.join(", ")}</span><span>Authority: {finding.authorityClass}</span><span>Unresolved: {finding.unresolvedMatters.join("; ")}</span></div>
        <div className="option-row">{finding.options.map((option) => <button key={option.id} className={decision.selectedOptionId === option.id ? "option selected" : "option"} onClick={() => selectOption(finding.topic, option.id)}><span>{decision.selectedOptionId === option.id && <Check size={13} />}{option.label}</span><small>{option.tradeoff}</small></button>)}</div>
        <div className="option-detail"><Badge>Proposed option</Badge><dl><div><dt>Commercial consequence</dt><dd>{selected.commercialConsequence}</dd></div><div><dt>Evidence required</dt><dd>{selected.evidenceRequirements.join(" · ")}</dd></div><div><dt>Legal-review boundary</dt><dd>{selected.legalReviewBoundary}</dd></div><div><dt>Selection consequence</dt><dd>{selected.selectionConsequence}</dd></div></dl><div className="structured-term"><strong>Structured executable terms</strong><code>{JSON.stringify({ serviceCreditRule: selected.serviceCreditRule, evidenceHierarchy: selected.evidenceHierarchy, liabilityCapChf: selected.liabilityCapChf, legalArchitecture: selected.legalArchitecture }, null, 2)}</code></div></div>
        {finding.topic === "liability" && <Card className="legal-constraint"><Badge tone="red">Legal constraint · review required</Badge><p>{state.legalConstraint.source.passage}</p><small>{state.legalConstraint.reviewInstruction} No enforceability conclusion is made.</small></Card>}
        <label className="clause-editor"><span>Revised contractual language · version {decision.version}</span><textarea value={decision.language} onChange={(event) => editDecision(finding.topic, event.target.value)} /></label>
      </Card>;
    })}</div>

    <Card className="scenario-card"><div className="scenario-heading"><div className="icon-box"><Calculator size={20} /></div><div><span>Deterministic scenario test</span><h2>Apply the selected uptime formula.</h2><p>The model does not perform or validate this arithmetic.</p></div></div><div className="scenario-inputs"><div><small>Threshold</small><strong>{uptimeDecision.serviceCreditRule ? `${uptimeDecision.serviceCreditRule.thresholdBps / 100}%` : "—"}</strong></div><div><small>Actual uptime</small><input aria-label="Actual uptime basis points" type="number" min="0" max="10000" value={state.alignmentScenario.actualUptimeBps} onChange={(event) => updateAlignmentScenario("actualUptimeBps", Number(event.target.value))} /></div><div><small>Monthly fee</small><strong>CHF {uptimeDecision.serviceCreditRule?.monthlyFeeChf.toLocaleString() ?? "—"}</strong></div><div><small>Decision version</small><strong>v{state.alignmentScenario.decisionVersion}</strong></div></div><label className="checkline"><input type="checkbox" checked={state.alignmentScenario.inputsConfirmed} onChange={(event) => updateAlignmentScenario("inputsConfirmed", event.target.checked)} /> Material scenario inputs confirmed for this synthetic test</label><div className={scenario.status === "calculated" ? "result success" : "result blocked"}><Badge tone={scenario.status === "calculated" ? "green" : "amber"}>Deterministic calculation</Badge><strong>{scenario.status === "calculated" ? `CHF ${scenario.creditChf?.toLocaleString()} service credit` : "Calculation blocked"}</strong><span>{scenario.formula}</span><p>{scenario.explanation}</p></div></Card>

    <div className="section-heading"><div><span>Exact-version bilateral confirmation</span><h2>Confirm the selected language—not the analysis.</h2></div><p>Each confirmation applies only to the displayed decision version and has no appointment effect.</p></div>
    <div className="resolution-list">{state.decisions.map((decision) => <Card key={decision.topic} className="resolution-card compact"><div className="resolution-heading"><div><small className="topic-kicker">{topicLabels[decision.topic]}</small><Badge tone={isBilateralConfirmation(decision) ? "green" : "amber"}>{isBilateralConfirmation(decision) ? "Agreed contractual text" : "Awaiting confirmation"}</Badge></div><span className="version">VERSION {decision.version}</span></div><p>{decision.language}</p><div className="confirm-row"><span>Separate confirmation of exact version {decision.version}</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} variant={decision.confirmations[party] === decision.version ? "secondary" : "ghost"} onClick={() => confirmClause(decision.topic, party)}>{decision.confirmations[party] === decision.version && <Check size={14} />} {party}</Button>)}</div></div></Card>)}</div>

    <div className="section-heading"><div><span>Contract Governance Alignment Annex</span><h2>The artifact emerges from confirmed terms.</h2></div><p>It is not uploaded or independently authored by the AI.</p></div>
    {!annex.ready && <div className="warning"><AlertTriangle size={18} /><div><strong>Annex locked</strong><p>Both parties must confirm every exact clause version.</p></div></div>}
    <Card className={annex.ready ? "annex" : "annex locked"}><div className="annex-header"><div><Scale size={23} /><div><small>ZIAAP · SYNTHETIC · SIMULATION ONLY</small><h2>Contract Governance Alignment Annex</h2></div></div><Badge tone={annex.ready ? "green" : "amber"}>{annex.ready ? "Generated" : "Draft preview"}</Badge></div><p className="annex-lead">Generated from the parties’ selected and exact-version confirmed terms. No independent legal effect.</p>{annex.decisions.map((decision, index) => <section className="annex-section" key={decision.topic}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{topicLabels[decision.topic]} · v{decision.version}</small><h3>{decision.materialStatus === "agreed_contractual_text" ? "Bilaterally confirmed term" : "Unconfirmed draft"}</h3><p>{decision.language}</p><div className="structured-term">Option: {decision.selectedOptionId} · unresolved: {decision.unresolvedMatters.join("; ") || "none recorded"}</div></div></section>)}</Card>
  </>;
}
