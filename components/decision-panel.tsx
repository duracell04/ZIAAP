import { CheckCircle2, FileSignature, Fingerprint, Scale, ShieldAlert } from "lucide-react";
import { AuthorityStrip } from "@/components/authority-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ContractState } from "@/lib/case-model";
import { buildStructuredCaseState } from "@/lib/operating-model";
import { humanDecisionCanRecord } from "@/lib/protocol";

type Checklist = keyof ContractState["humanDecision"]["checklist"];

type Props = {
  mode: "production" | "adjudication";
  state: ContractState;
  busy: boolean;
  notice: string;
  toggleSettlementConsent: (party: "supplier" | "customer") => void;
  requestSettlement: () => void;
  respondSettlement: (party: "supplier" | "customer", response: "accept" | "decline") => void;
  updatePreliminary: (value: string) => void;
  prepareReasoningMemorandum: (mode: "illustrative" | "live") => void;
  updateDecision: (field: "status" | "rationale", value: string) => void;
  requestMoreEvidence: () => void;
  toggleChecklist: (field: Checklist) => void;
  recordDecision: () => void;
};

export function DisputePreview({
  mode,
  state,
  busy,
  notice,
  toggleSettlementConsent,
  requestSettlement,
  respondSettlement,
  updatePreliminary,
  prepareReasoningMemorandum,
  updateDecision,
  requestMoreEvidence,
  toggleChecklist,
  recordDecision,
}: Props) {
  const simulationAvailable = ["appointment_simulated", "dispute_simulated", "closed"].includes(state.lifecycleStatus);
  const disputeOpen = state.lifecycleStatus === "appointment_simulated";
  const proposal = state.settlement.proposal;
  const reasoningMemorandum = state.reasoningMemorandum;
  const structuredCase = buildStructuredCaseState(state);
  const noticeFailed = /failed|disabled|unavailable|mismatch|timed out/i.test(notice);

  return <>
    {mode === "production"
      ? <div className="page-intro"><span>I1 · Cockpit · Gate 4 · Case Production</span><h1>Maintain one structured, versioned and contestable case state.</h1><p>Claims, defences, facts, evidence, gaps, calculations and objections remain separate and inspectable. Settlement content stays sealed from merits production.</p></div>
      : <div className="page-intro"><span>I2 · Captain in Command · Gate 5 · Independent Adjudication</span><h1>Independent merits review with zero algorithmic presumption.</h1><p>The fictional human records a preliminary view before the advisory memorandum appears, then may adopt, modify, reject or request more evidence. Nothing on this screen has legal effect.</p></div>}

    {!simulationAvailable && <div className="warning"><ShieldAlert size={18} /><div><strong>No fictional appointment record</strong><p>Complete Gate 3 and its integrity-verified fictional ceremony before opening this synthetic dispute.</p></div></div>}

    <div className={!simulationAvailable ? "stage-disabled" : ""}>
      <Card className="manifest-binding"><div><Fingerprint size={20} /><span>Frozen configuration identified</span><h2>Synthetic dispute bound to the simulated configuration record</h2></div><dl><div><dt>Configuration hash</dt><dd>{state.dispute.appointmentHash ?? "Not yet bound"}</dd></div><div><dt>Constitution</dt><dd>v{state.constitution.version}</dd></div><div><dt>Lifecycle</dt><dd>{state.lifecycleStatus}</dd></div><div><dt>Effect</dt><dd>Simulation only · no legal effect</dd></div></dl></Card>

      {mode === "production" && <>
        <Card className="structured-case-card">
          <div className="finding-top"><div><Badge tone="blue">Live decision environment</Badge><h2>Structured case state</h2></div><span className="version">Generated from authoritative client state</span></div>
          <p>The memorandum is not the case. It is one advisory artifact derived from this environment.</p>
          <div className="structured-case-flow" aria-label="Structured case state">
            <span>{structuredCase.claims.length} claim</span>
            <span>{structuredCase.defences.length} defence</span>
            <span>{structuredCase.facts.agreed.length} agreed fact</span>
            <span>{structuredCase.facts.disputed.length} disputed items</span>
            <span>{structuredCase.evidence.available.length} evidence items</span>
            <span>{structuredCase.evidence.missing.length} evidence gaps</span>
            <span>{structuredCase.calculations.length} deterministic calculation</span>
            <span>{structuredCase.objections.length} objections</span>
          </div>
        </Card>

        <Card className="dispute-record"><div className="finding-top"><div><Badge tone="red">Shared merits record</Badge><h2>Later SaaS outage</h2></div><span className="version">{state.dispute.id}</span></div><AuthorityStrip executionStatus="not_executed" actor="Supplier, customer, and concept curator" version="Synthetic dispute v1" consequence="Defines the shared merits record for the simulation" provenance="Curated synthetic claim, defence, evidence, objections, and gaps" /><div className="position-grid"><div><small>Customer claim · party assertion</small><p>{state.dispute.claim}</p></div><div><small>Supplier defence · party assertion</small><p>{state.dispute.defence}</p></div></div><div className="stress-input-grid"><div><small>Shared evidence</small><ul>{state.dispute.sharedEvidence.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Objections</small><ul>{state.dispute.objections.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Missing evidence</small><ul>{state.dispute.missingEvidence.map((item) => <li key={item}>{item}</li>)}</ul></div></div></Card>

        <Card className="settlement-card"><Badge tone="blue">Optional sealed simulation track</Badge><h2>Settlement Facilitation</h2><p>This track is separate from Alignment and merits reasoning. Proposal content and responses never enter `buildReasoningMemorandumInput`; only permitted status information may reach the shared record.</p><div className="confirm-row"><span>Bilateral simulation activation</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} disabled={!disputeOpen || Boolean(reasoningMemorandum)} variant={state.settlement.consents[party] ? "secondary" : "ghost"} onClick={() => toggleSettlementConsent(party)}>{state.settlement.consents[party] && <CheckCircle2 size={14} />} {party}</Button>)}</div></div><Button disabled={!disputeOpen || Boolean(reasoningMemorandum) || !state.settlement.consents.supplier || !state.settlement.consents.customer || Boolean(proposal)} onClick={requestSettlement}>{busy ? "Preparing sealed proposal…" : "Generate non-binding proposal"}</Button>
          {proposal && <div className="sealed-proposal"><Badge tone="red">Sealed from merits</Badge><h3>{proposal.label}</h3><ul>{proposal.terms.map((term) => <li key={term}>{term}</li>)}</ul><p>{proposal.basis}</p><div className="response-grid">{(["supplier", "customer"] as const).map((party) => <div key={party}><strong>{party}</strong><Button variant="secondary" disabled={!disputeOpen} onClick={() => respondSettlement(party, "accept")}>Accept</Button><Button variant="ghost" disabled={!disputeOpen} onClick={() => respondSettlement(party, "decline")}>Decline</Button><small>{state.settlement.responses[party]}</small></div>)}</div></div>}
          <div className="settlement-status"><span>Status</span><strong>{state.settlement.status}</strong><p>{state.settlement.status === "not_settled" ? "Facilitation ended without settlement. Proposal content remains outside merits." : state.settlement.status === "settled" ? "Synthetic settlement recorded; adjudication is closed." : "The merits record contains no settlement proposal or response content."}</p></div>
        </Card>
      </>}

      {mode === "adjudication" && <>
        <Card className="human-preassessment"><Badge>Human pre-assessment · first</Badge><h2>Record an independent initial view before revealing protocol output.</h2><p>This sequencing demonstrates human independence; it does not prove a real decision-maker performed the review. The text is fictional demonstration input and is excluded from the procedural black box.</p><label className="clause-editor"><span>Fictional preliminary assessment</span><textarea disabled={!disputeOpen || Boolean(reasoningMemorandum)} value={state.humanDecision.preliminaryAssessment} onChange={(event) => updatePreliminary(event.target.value)} placeholder="Fictional arbitrator’s preliminary issue assessment…" /></label><div className="action-row"><Button variant="secondary" disabled={!disputeOpen || state.settlement.status === "settled" || busy || !state.humanDecision.preliminaryAssessment.trim()} onClick={() => prepareReasoningMemorandum("illustrative")}>Reveal illustrative memorandum</Button><Button disabled={!disputeOpen || state.settlement.status === "settled" || busy || !state.humanDecision.preliminaryAssessment.trim()} onClick={() => prepareReasoningMemorandum("live")}>{busy ? "Running execution…" : "Prepare live memorandum"}</Button></div>{notice && <div className={noticeFailed ? "warning" : "notice"} role="status">{noticeFailed && <ShieldAlert size={16} />}<span>{notice}</span></div>}</Card>

        {reasoningMemorandum && <Card className="determination-card"><Badge tone="blue">Advisory reasoning memorandum · second</Badge><h2>{reasoningMemorandum.proposedDisposition}</h2><AuthorityStrip executionStatus={reasoningMemorandum.metadata.executionStatus} actor={reasoningMemorandum.metadata.executionMode === "live" ? "Declared live model" : "Concept curator"} version={reasoningMemorandum.metadata.artifactId} consequence="State-derived advisory input to fictional human review; never a verdict or award" provenance={reasoningMemorandum.metadata.provenance} /><p>{reasoningMemorandum.reasoningSummary}</p><div className="stress-input-grid"><div><small>Findings</small><ul>{reasoningMemorandum.findings.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Counterarguments</small><ul>{reasoningMemorandum.counterarguments.map((item) => <li key={item}>{item}</li>)}</ul></div><div><small>Uncertainty and escalation</small><ul>{[...reasoningMemorandum.uncertainty, ...reasoningMemorandum.escalationFlags].map((item) => <li key={item}>{item}</li>)}</ul></div></div><span className="version">Bound to {reasoningMemorandum.configurationHash}</span></Card>}

        {reasoningMemorandum && <Card className="human-decision"><Badge tone="red">Human control · third · no legal effect</Badge><h2>Independently control what happens to the advisory memorandum.</h2><div className="option-row">{(["adopted", "modified", "rejected"] as const).map((status) => <button key={status} className={state.humanDecision.status === status ? "option selected" : "option"} onClick={() => updateDecision("status", status)}><span>{status}</span><small>The fictional record preserves a distinct human rationale.</small></button>)}<button className={state.humanDecision.status === "rejected" && state.humanDecision.rationale.startsWith("Additional evidence") ? "option selected" : "option"} onClick={requestMoreEvidence}><span>request more evidence</span><small>Do not adopt the memorandum; return the matter to evidence production.</small></button></div><label className="clause-editor"><span>Independent simulated rationale</span><textarea value={state.humanDecision.rationale} onChange={(event) => updateDecision("rationale", event.target.value)} /></label><div className="review-checklist">{(Object.keys(state.humanDecision.checklist) as Checklist[]).map((field) => <label key={field} className="checkline"><input type="checkbox" checked={state.humanDecision.checklist[field]} onChange={() => toggleChecklist(field)} /> {field.replace(/([A-Z])/g, " $1")}</label>)}</div><Button disabled={!humanDecisionCanRecord(state)} onClick={recordDecision}><FileSignature size={15} /> Record simulated human decision</Button></Card>}

        {state.humanDecision.simulatedDecisionRecord && <div className="result success final-decision"><Badge tone="green">Simulated human decision · non-operative</Badge><strong>{state.humanDecision.status}</strong><span>{state.humanDecision.simulatedDecisionRecord}</span><p><Scale size={14} /> Fictional review record only · no production signature, award or legal effect.</p></div>}
      </>}
    </div>
  </>;
}
