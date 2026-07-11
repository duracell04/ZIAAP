"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, FileCheck2, GitCompareArrows, Landmark, Printer, RefreshCcw, Scale, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  alignmentAnalysisSchema, applyOption, buildAlignmentAnnex, isBilateralConfirmation, legalConstraintSchema, normalizeDecisionStatus, updateDecisionLanguage,
  type AlignmentAnalysis, type ContractState, type DivergenceFinding, type LedgerEvent, type Topic,
} from "@/lib/case-model";
import { calculateServiceCredit } from "@/lib/scenario";

const steps = ["Independent Party Intent", "Alignment & Legal Sources", "Scenario & Clause Resolution", "Alignment Annex & Future Event"];
const topicLabels: Record<Topic, string> = { uptime: "Uptime, evidence & credits", liability: "Consequential loss & cap", legal_architecture: "Law, seat & procedure" };

function newEvent(actor: string, action: string, objectId: string, detail: string, authorityClass: LedgerEvent["authorityClass"]): LedgerEvent {
  return { id: crypto.randomUUID(), timestamp: new Date().toISOString(), actor, action, objectId, detail, authorityClass };
}

export function DemoWorkspace({ initialState }: { initialState: ContractState }) {
  const [state, setState] = useState(initialState);
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [legalRetrieving, setLegalRetrieving] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState("");
  const [scenarioRun, setScenarioRun] = useState(false);
  const allProfilesConfirmed = state.parties.every((party) => party.confirmed);
  const allClausesConfirmed = state.decisions.every(isBilateralConfirmation);
  const uptimeDecision = state.decisions.find((decision) => decision.topic === "uptime")!;
  const scenario = useMemo(() => calculateServiceCredit(uptimeDecision.serviceCreditRule, state.futureEvent.actualUptimeBps, state.futureEvent.inputsConfirmed), [uptimeDecision.serviceCreditRule, state.futureEvent]);

  function reset() { setState(structuredClone(initialState)); setStep(0); setAnalysisNotice(""); setScenarioRun(false); }

  function editExpectation(partyId: string, topic: Topic, value: string) {
    setState((current) => ({ ...current, parties: current.parties.map((party) => party.id === partyId ? { ...party, confirmed: false, expectations: { ...party.expectations, [topic]: value } } : party) }));
  }

  function confirmProfile(partyId: string) {
    setState((current) => {
      const target = current.parties.find((party) => party.id === partyId)!;
      const confirmed = !target.confirmed;
      return { ...current, parties: current.parties.map((party) => party.id === partyId ? { ...party, confirmed } : party), ledger: [...current.ledger, newEvent(target.name, confirmed ? "Confirmed party assertion" : "Withdrew assertion confirmation", partyId, "Independent intent profile; not contract acceptance.", "advisory")] };
    });
  }

  async function analyze(mode: "cached" | "live") {
    setAnalyzing(true); setAnalysisNotice("");
    try {
      const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, parties: state.parties }) });
      const analysis = alignmentAnalysisSchema.parse(await response.json()) as AlignmentAnalysis;
      setState((current) => ({ ...current, analysis, ledger: [...current.ledger, newEvent("System", "Generated divergence analysis", "analysis", analysis.metadata.label, "administrative")] }));
      setAnalysisNotice(analysis.metadata.notice ?? `${analysis.metadata.label} loaded.`);
    } catch { setAnalysisNotice("Refresh failed. The last validated analysis remains visible."); }
    finally { setAnalyzing(false); }
  }

  async function retrieveLegalSource(mode: "cached" | "live") {
    setLegalRetrieving(true);
    try {
      const response = await fetch("/api/legal-source", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode }) });
      const legalConstraint = legalConstraintSchema.parse(await response.json());
      setState((current) => ({ ...current, legalConstraint, ledger: [...current.ledger, newEvent("System", "Retrieved targeted legal constraint", legalConstraint.id, legalConstraint.mode, "administrative")] }));
    } finally { setLegalRetrieving(false); }
  }

  function chooseOption(topic: Topic, option: DivergenceFinding["options"][number]) {
    setState((current) => ({ ...current, decisions: current.decisions.map((decision) => decision.topic === topic ? applyOption(decision, option) : decision), ledger: [...current.ledger, newEvent("Presenter", "Selected clause option", topic, `${option.id}; structured state propagated and confirmations reset if changed.`, "advisory")] }));
  }

  function editLanguage(topic: Topic, language: string) {
    setState((current) => ({ ...current, decisions: current.decisions.map((decision) => decision.topic === topic ? updateDecisionLanguage(decision, language) : decision) }));
  }

  function confirmClause(topic: Topic, party: "supplier" | "customer") {
    setState((current) => ({
      ...current,
      decisions: current.decisions.map((decision) => {
        if (decision.topic !== topic) return decision;
        return normalizeDecisionStatus({ ...decision, confirmations: { ...decision.confirmations, [party]: decision.confirmations[party] === decision.version ? null : decision.version } });
      }),
      ledger: [...current.ledger, newEvent(party === "supplier" ? "Helvetia Cloud AG" : "Northstar Retail Ltd", "Updated exact-version confirmation", topic, "Prototype confirmation; no digital signature or cryptographic claim.", "advisory")],
    }));
  }

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>Zero-instance alignment</small></div></div>
      <nav aria-label="Demo workflow">{steps.map((label, index) => <button key={label} className={index === step ? "nav-step active" : "nav-step"} onClick={() => setStep(index)} aria-current={index === step ? "step" : undefined}><span>{index + 1}</span><div>{label}<small>{index === 0 ? "Private assertions" : index === 1 ? "AI + legal source" : index === 2 ? "Resolve + execute" : "Persist + compress"}</small></div></button>)}</nav>
      <div className="sidebar-note"><ShieldAlert size={16} /><p>AI compares and drafts. Parties choose terms. Human authority resolves the legal remainder.</p></div>
      <Button variant="ghost" onClick={reset}><RefreshCcw size={15} /> Reset demo</Button>
    </aside>
    <section className="workspace">
      <header className="topbar"><div><Badge tone="red">I0 · Contract alignment</Badge><span className="matter-id">{state.matter.id}</span></div><div className="topbar-status"><span><i className={allProfilesConfirmed ? "dot done" : "dot"} />Profiles</span><span><i className={allClausesConfirmed ? "dot done" : "dot"} />Clauses</span></div></header>
      <div className="content">
        {step === 0 && <IntentView state={state} editExpectation={editExpectation} confirmProfile={confirmProfile} />}
        {step === 1 && <AlignmentView state={state} analyzing={analyzing} legalRetrieving={legalRetrieving} notice={analysisNotice} onAnalyze={analyze} onRetrieveLegal={retrieveLegalSource} />}
        {step === 2 && <ResolutionView state={state} scenario={scenario} scenarioRun={scenarioRun} setScenarioRun={setScenarioRun} setScenarioConfirmed={(value) => setState((current) => ({ ...current, futureEvent: { ...current.futureEvent, inputsConfirmed: value } }))} chooseOption={chooseOption} editLanguage={editLanguage} confirmClause={confirmClause} />}
        {step === 3 && <AnnexView state={state} allClausesConfirmed={allClausesConfirmed} scenario={scenario} />}
      </div>
      <footer className="step-footer"><Button variant="secondary" disabled={step === 0} onClick={() => setStep((value) => value - 1)}><ArrowLeft size={16} /> Previous</Button><span>Step {step + 1} of 4</span><Button disabled={step === 3} onClick={() => setStep((value) => value + 1)}>Continue <ArrowRight size={16} /></Button></footer>
    </section>
  </main>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <div className="page-intro"><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>; }

function IntentView({ state, editExpectation, confirmProfile }: { state: ContractState; editExpectation: (party: string, topic: Topic, value: string) => void; confirmProfile: (party: string) => void }) {
  return <><PageIntro eyebrow="Before signature" title="Two parties think they agree." copy="ZIAAP compares what each party expects the same words to do—not merely what the draft says." />
    <Card className="draft-card"><div><BookOpen size={18} /><strong>Draft SaaS Agreement</strong><small>Version 0.7 · same source text for both parties</small></div><Badge>Source</Badge></Card>
    <div className="party-grid">{state.parties.map((party) => <Card key={party.id} className="party-card"><div className="party-heading"><div className={`party-mark ${party.id}`}>{party.name.charAt(0)}</div><div><h2>{party.name}</h2><p>{party.role} · {party.jurisdiction}</p></div><Badge tone={party.confirmed ? "green" : "amber"}>{party.confirmed ? "Party assertion confirmed" : "Party assertion"}</Badge></div>{Object.entries(party.expectations).map(([topic, value]) => <label key={topic}><span>{topicLabels[topic as Topic]}</span><textarea value={value} onChange={(event) => editExpectation(party.id, topic as Topic, event.target.value)} /></label>)}<Button variant={party.confirmed ? "secondary" : "primary"} onClick={() => confirmProfile(party.id)}>{party.confirmed ? <><Check size={16} /> Assertion confirmed</> : "Confirm this party’s expectation"}</Button></Card>)}</div>
  </>;
}

function AlignmentView({ state, analyzing, legalRetrieving, notice, onAnalyze, onRetrieveLegal }: { state: ContractState; analyzing: boolean; legalRetrieving: boolean; notice: string; onAnalyze: (mode: "cached" | "live") => void; onRetrieveLegal: (mode: "cached" | "live") => void }) {
  return <><PageIntro eyebrow="One convincing AI step" title="Expose three material divergences." copy="The comparison is provisional analysis. Sources, uncertainty, and authority remain visible." />
    <div className="action-strip"><div><Sparkles size={18} /><div><strong>{state.analysis.metadata.label}</strong><small>{state.analysis.metadata.sourceCoverage}</small></div></div><div><Button variant="secondary" disabled={analyzing} onClick={() => onAnalyze("cached")}>Cached fallback</Button><Button disabled={analyzing} onClick={() => onAnalyze("live")}><Sparkles size={15} />{analyzing ? "Analyzing…" : "Run live AI analysis"}</Button></div></div>
    {notice && <p className="notice" role="status">{notice}</p>}
    <div className="matrix-list">{state.analysis.findings.map((finding) => <Card key={finding.id} className="finding-card"><div className="finding-top"><div><Badge tone="blue">Provisional AI analysis</Badge><h2>{finding.title}</h2></div><Badge tone="red">{finding.severity}</Badge></div><div className="position-grid"><div><small>Party assertion · supplier</small><p>{finding.supplierPosition}</p></div><div><small>Party assertion · customer</small><p>{finding.customerPosition}</p></div></div><div className="consequence"><GitCompareArrows size={18} /><div><strong>Material consequence</strong><p>{finding.consequence}</p><small>{finding.uncertainty}</small></div></div><div className="source-row"><span><Scale size={14} /> {finding.authorityClass}</span>{finding.sourceIds.map((id) => { const source = state.analysis.sources.find((item) => item.id === id); return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer">{source.title}</a> : null; })}</div></Card>)}</div>
    <Card className="legal-constraint"><div className="finding-top"><div><Badge tone="red">Legal source</Badge><h2>{state.legalConstraint.headline}</h2></div><Badge tone={state.legalConstraint.mode === "live_omnilex" ? "green" : "amber"}>{state.legalConstraint.mode === "live_omnilex" ? "Live OmniLex retrieval" : "Cached verified fallback"}</Badge></div><p>{state.legalConstraint.source.passage}</p><a href={state.legalConstraint.source.url} target="_blank" rel="noreferrer">{state.legalConstraint.source.title}</a><div className="warning"><ShieldAlert size={18} /><div><strong>{state.legalConstraint.reviewInstruction}</strong><p>{state.legalConstraint.conclusion}</p></div></div><div className="legal-actions"><Button variant="secondary" disabled={legalRetrieving} onClick={() => onRetrieveLegal("cached")}>Cached source</Button><Button disabled={legalRetrieving} onClick={() => onRetrieveLegal("live")}>{legalRetrieving ? "Retrieving…" : "Retrieve live through OmniLex"}</Button></div></Card>
  </>;
}

type ResolutionProps = { state: ContractState; scenario: ReturnType<typeof calculateServiceCredit>; scenarioRun: boolean; setScenarioRun: (value: boolean) => void; setScenarioConfirmed: (value: boolean) => void; chooseOption: (topic: Topic, option: DivergenceFinding["options"][number]) => void; editLanguage: (topic: Topic, language: string) => void; confirmClause: (topic: Topic, party: "supplier" | "customer") => void };

function ResolutionView({ state, scenario, scenarioRun, setScenarioRun, setScenarioConfirmed, chooseOption, editLanguage, confirmClause }: ResolutionProps) {
  const rule = state.decisions.find((decision) => decision.topic === "uptime")?.serviceCreditRule;
  return <><PageIntro eyebrow="Consent + deterministic consequence" title="Resolve language. Execute the agreed rule." copy="AI drafts. Parties confirm the exact version. Deterministic code consumes the structured state." />
    <div className="resolution-list">{state.decisions.map((decision) => { const finding = state.analysis.findings.find((item) => item.topic === decision.topic)!; return <Card key={decision.topic} className="resolution-card"><div className="resolution-heading"><div><small className="topic-kicker">{topicLabels[decision.topic]}</small><Badge tone={decision.materialStatus === "agreed_contractual_text" ? "green" : "amber"}>{decision.materialStatus === "agreed_contractual_text" ? "Agreed contractual text" : "Draft"}</Badge><h2>{finding.title}</h2></div><span className="version">VERSION {decision.version}</span></div><div className="option-row">{finding.options.map((option) => <button key={option.id} className={decision.selectedOptionId === option.id ? "option selected" : "option"} onClick={() => chooseOption(decision.topic, option)}><span>{decision.selectedOptionId === option.id && <Check size={14} />}{option.label}</span><small>{option.tradeoff}</small></button>)}</div><label className="clause-editor"><span>AI-assisted clause draft</span><textarea value={decision.language} onChange={(event) => editLanguage(decision.topic, event.target.value)} /></label><div className="confirm-row"><span>Demonstrative bilateral confirmation · version {decision.version}</span><div><Button variant={decision.confirmations.supplier === decision.version ? "secondary" : "ghost"} onClick={() => confirmClause(decision.topic, "supplier")}>{decision.confirmations.supplier === decision.version && <Check size={14} />} Supplier</Button><Button variant={decision.confirmations.customer === decision.version ? "secondary" : "ghost"} onClick={() => confirmClause(decision.topic, "customer")}>{decision.confirmations.customer === decision.version && <Check size={14} />} Customer</Button></div></div></Card>; })}</div>
    <Card className="scenario-card"><div className="scenario-heading"><div className="icon-box"><Sparkles size={21} /></div><div><span>Scenario test · seeded demonstration data</span><h2>A later outage records 99.2% uptime</h2><p>The calculation reads the selected executable contract state.</p></div></div><div className="scenario-inputs"><div><small>Actual</small><strong>99.2%</strong></div><div><small>Threshold</small><strong>{((rule?.thresholdBps ?? 0) / 100).toFixed(1)}%</strong></div><div><small>Monthly fee</small><strong>CHF {(rule?.monthlyFeeChf ?? 0).toLocaleString()}</strong></div><div><small>Rule</small><strong>{rule?.creditPercentPerStep ?? 0}% / 0.1</strong></div></div><label className="checkline"><input type="checkbox" checked={state.futureEvent.inputsConfirmed} onChange={(event) => setScenarioConfirmed(event.target.checked)} /> Inputs confirmed by the contract state</label><Button onClick={() => setScenarioRun(true)}>Run deterministic calculation</Button>{scenarioRun && <div className={scenario.status === "calculated" ? "result success" : "result blocked"}><Badge tone="green">Reproducible calculation</Badge><strong>{scenario.status === "calculated" ? `CHF ${scenario.creditChf?.toLocaleString()} service credit` : "Calculation blocked"}</strong><span>{scenario.formula}</span><p>{scenario.explanation}</p></div>}</Card>
  </>;
}

function AnnexView({ state, allClausesConfirmed, scenario }: { state: ContractState; allClausesConfirmed: boolean; scenario: ReturnType<typeof calculateServiceCredit> }) {
  const annex = buildAlignmentAnnex(state);
  const rule = state.decisions.find((decision) => decision.topic === "uptime")?.serviceCreditRule;
  return <><PageIntro eyebrow="Persistent contract state" title="Agreement becomes executable infrastructure." copy="The Annex is generated from the actual selected state. The future event consumes that same state." />
    {!allClausesConfirmed && <div className="warning"><ShieldAlert size={19} /><div><strong>Annex not final</strong><p>Both parties must confirm the same version of all clauses.</p></div></div>}
    <Card className={annex.ready ? "annex" : "annex locked"}><div className="annex-header"><div><Landmark size={23} /><div><small>ALIGNMENT ANNEX · {state.matter.id}</small><h2>{state.matter.title}</h2></div></div><Button variant="ghost" onClick={() => window.print()}><Printer size={15} /> Print</Button></div><p className="annex-lead">Generated from the selected structured state. Confirmations are prototype simulations, not digital signatures.</p>{annex.decisions.map((decision, index) => <section key={decision.topic} className="annex-section"><span>0{index + 1}</span><div><Badge tone={decision.materialStatus === "agreed_contractual_text" ? "green" : "amber"}>{decision.materialStatus === "agreed_contractual_text" ? "Agreed contractual text" : "Draft"}</Badge><h3>{topicLabels[decision.topic]}</h3><p>{decision.language}</p>{decision.serviceCreditRule && <p className="structured-term"><strong>Executable rule:</strong> 5% per complete 0.1-point shortfall below 99.5%; CHF 10,000 fee; 100% cap.</p>}{decision.evidenceHierarchy && <p className="structured-term"><strong>Evidence:</strong> {decision.evidenceHierarchy.primarySource}; fallback {decision.evidenceHierarchy.secondarySource}.</p>}{decision.liabilityCapChf && <p className="structured-term"><strong>Cap:</strong> CHF {decision.liabilityCapChf.toLocaleString()} with mandatory-law reservation.</p>}{decision.legalArchitecture && <p className="structured-term"><strong>Architecture:</strong> {decision.legalArchitecture.substantiveLaw}; {decision.legalArchitecture.seat}; {decision.legalArchitecture.rules}; {decision.legalArchitecture.language}; one arbitrator.</p>}<small>Version {decision.version} · Supplier {decision.confirmations.supplier === decision.version ? "confirmed" : "pending"} · Customer {decision.confirmations.customer === decision.version ? "confirmed" : "pending"}</small></div></section>)}</Card>
    <div className="continuity-grid"><Card><Badge tone="green">Reproducible calculation</Badge><h2>CHF {scenario.creditChf?.toLocaleString() ?? "—"} service credit</h2><div className="big-number">{scenario.completeSteps ?? "—"} × {rule?.creditPercentPerStep ?? 0}%</div><p>Calculated from the accepted rule and saved evidence hierarchy—not from a new AI interpretation.</p><small><CheckCircle2 size={14} /> Persistent state consumed directly</small></Card><Card><Badge tone="red">Reserved for human review</Badge><h2>Gross-negligence limitation</h2><p>{state.residualReviewPacket.issue}</p><ul>{state.residualReviewPacket.evidenceNeeded.map((item) => <li key={item}>{item}</li>)}</ul><small><Scale size={14} /> No automated conclusion</small></Card></div>
    <Card className="ledger"><div className="ledger-title"><FileCheck2 size={18} /><div><h2>Case ledger</h2><p>Sources, assertions, versions, consent, and authority</p></div></div>{state.ledger.slice(-6).reverse().map((event) => <div key={event.id} className="ledger-row"><span>{new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span><div><strong>{event.action}</strong><small>{event.actor} · {event.detail}</small></div><Badge>{event.authorityClass}</Badge></div>)}</Card>
  </>;
}
