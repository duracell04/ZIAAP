import { Check, Cpu, Scale, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AuthorityStrip } from "@/components/authority-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ArbitratorConstitution, ContractState } from "@/lib/case-model";

type Principle = keyof ArbitratorConstitution["principles"];
type Props = {
  state: ContractState;
  updatePrinciple: (field: Principle, value: string) => void;
  acknowledgeConstitution: (party: "supplier" | "customer") => void;
};

const principleLabels: Record<Principle, { label: string; description: string }> = {
  interpretation: { label: "Interpretation", description: "How text, structure, purpose, and ambiguity are handled." },
  evidence: { label: "Evidence", description: "What sources may support a proposition and how disputes are preserved." },
  fairness: { label: "Procedural fairness", description: "Notice, response rights, equality, and contestability." },
  commercialValues: { label: "Commercial values", description: "Predictability, continuity, proportionality, and agreed risk allocation." },
  remedyBoundaries: { label: "Remedy boundaries", description: "Limits on mechanical and discretionary relief." },
  discretion: { label: "Controlled discretion", description: "When alternatives must be exposed instead of collapsed." },
  uncertainty: { label: "Uncertainty", description: "Confidence limits, missing evidence, and insufficiency states." },
  escalation: { label: "Human escalation", description: "Questions reserved for independent human judgment." },
  modelAndToolPolicy: { label: "Model and tool policy", description: "Declared identity, permitted tools, and fail-closed mismatch handling." },
  sourceHierarchy: { label: "Source hierarchy", description: "Priority among agreed text, law, sources, evidence, and assertions." },
};

export function ConstitutionBuilder({ state, updatePrinciple, acknowledgeConstitution }: Props) {
  const constitution = state.constitution;
  const acknowledged = (party: "supplier" | "customer") => constitution.simulatedAcknowledgements[party] === constitution.version;

  return <>
    <div className="page-intro"><span>Stage 2 · Protocol Constitution</span><h1>Configure how the protocol should reason—before testing what it does.</h1><p>Arbitral reasoning calibration is an inference-time activity inside the Protocol Constitution. It sets relationship-specific instructions, sources, tools, safeguards, and boundaries without training or fine-tuning the underlying model.</p></div>
    <AuthorityStrip executionStatus="not_executed" actor="Supplier and customer · simulated" version={`Constitution v${constitution.version}`} consequence="Controls the next synthetic stress-test configuration" provenance="Party-configured synthetic Constitution" />

    <div className="stage-distinction"><Card><SlidersHorizontal size={20} /><span>Calibration asks</span><h2>What rules and values should guide the protocol?</h2><p>Configuration input. No model execution occurs on this screen.</p></Card><Card><Cpu size={20} /><span>Stress testing asks next</span><h2>What behavior does that exact configuration produce?</h2><p>Observed output with execution status and limitations—not validation.</p></Card></div>

    <div className="definition-banner"><Scale size={21} /><div><strong>Human authority remains external to the protocol</strong><p>A properly appointed human could conduct proceedings through an acknowledged ZIAAP protocol. This concept uses a fictional record, simulation only, and makes no legal appointment.</p></div></div>

    <div className="constitution-grid"><Card className="constitution-summary"><Badge tone="blue">Constitution v{constitution.version}</Badge><h2>{constitution.humanArbitrator.name}</h2><p>{constitution.humanArbitrator.role} · fictional demonstration record</p><dl><div><dt>Law</dt><dd>{constitution.legalArchitecture.substantiveLaw}</dd></div><div><dt>Seat</dt><dd>{constitution.legalArchitecture.seat}</dd></div><div><dt>Rules</dt><dd>{constitution.legalArchitecture.rules}</dd></div><div><dt>Language</dt><dd>{constitution.legalArchitecture.language}</dd></div></dl><div className="warning"><ShieldCheck size={17} /><div><strong>Human legal authority</strong><p>The protocol may structure and propose. A future properly appointed human would retain procedure, judgment, and any legally operative signature.</p></div></div></Card>
      <Card className="protocol-identity"><Badge>Declared protocol identity</Badge><h2>{constitution.protocolIdentity.model}</h2><dl><div><dt>Provider</dt><dd>{constitution.protocolIdentity.provider}</dd></div><div><dt>Prompt</dt><dd>{constitution.protocolIdentity.promptVersion}</dd></div><div><dt>Retrieval</dt><dd>{constitution.protocolIdentity.retrievalPack}</dd></div><div><dt>Engine</dt><dd>{constitution.protocolIdentity.engineVersion}</dd></div></dl><p>{constitution.protocolIdentity.toolPolicy}</p><small>Identity declaration only · not provider-side execution proof</small></Card></div>

    <div className="section-heading"><div><span>Ten inference-level controls</span><h2>Make reasoning choices inspectable.</h2></div><p>Editing any control creates a new Constitution version and invalidates downstream artifacts.</p></div>
    <div className="principle-grid">{(Object.keys(constitution.principles) as Principle[]).map((field, index) => <label key={field} className="principle-editor"><div><span>{String(index + 1).padStart(2, "0")} · {principleLabels[field].label}</span><small>{principleLabels[field].description}</small></div><textarea value={constitution.principles[field]} onChange={(event) => updatePrinciple(field, event.target.value)} /></label>)}</div>

    <div className="governance-policy-grid"><Card className="firewall-card"><Badge tone="red">11 · Settlement firewall</Badge><h2>{constitution.settlementPolicy.activation}</h2><p>{constitution.settlementPolicy.firewall}. {constitution.settlementPolicy.meritsDisclosure}.</p></Card><Card className="change-card"><Badge tone="amber">12 · Change policy</Badge><h2>Behavior-affecting change means a new version.</h2><p>{constitution.changePolicy}</p></Card></div>

    <Card className="constitution-ack"><div><Badge tone={acknowledged("supplier") && acknowledged("customer") ? "green" : "amber"}>Exact version acknowledgement</Badge><h2>Acknowledge Constitution v{constitution.version} for the simulated ceremony.</h2><p>This acknowledges only the displayed synthetic configuration. It proves no identity, consent, appointment, validation, or legal effect.</p></div><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} variant={acknowledged(party) ? "secondary" : "ghost"} onClick={() => acknowledgeConstitution(party)}>{acknowledged(party) && <Check size={14} />} {party}</Button>)}</div></Card>
  </>;
}
