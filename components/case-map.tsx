import { Scale, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ArbitratorConstitution, ContractState } from "@/lib/case-model";

type Principle = keyof ArbitratorConstitution["principles"];
type Props = { state: ContractState; updatePrinciple: (field: Principle, value: string) => void };

const principleLabels: Record<Principle, string> = {
  interpretation: "Interpretive principles", evidence: "Evidentiary standards", fairness: "Procedural fairness",
  commercialValues: "Commercial values", remedyBoundaries: "Remedy boundaries", discretion: "Controlled discretion", escalation: "Human escalation",
};

export function ConstitutionBuilder({ state, updatePrinciple }: Props) {
  const constitution = state.constitution;
  return <>
    <div className="page-intro"><span>Stage 2 · arbitral reasoning calibration</span><h1>Calibrate the reasoning protocol.</h1><p>The parties adjust the Constitution, instructions, sources, evidence standards, escalation rules, and remedies at inference time. The underlying model weights remain unchanged.</p></div>
    <div className="definition-banner"><Scale size={21} /><div><strong>Future product concept · human authority</strong><p>A properly appointed human could conduct proceedings through an acknowledged ZIAAP protocol. This showcase uses a fictional record, simulation only, and makes no appointment.</p></div></div>
    <div className="constitution-grid"><Card className="constitution-summary"><Badge tone="blue">Constitution v{constitution.version}</Badge><h2>{constitution.humanArbitrator.name}</h2><p>{constitution.humanArbitrator.role}</p><dl><div><dt>Law</dt><dd>{constitution.legalArchitecture.substantiveLaw}</dd></div><div><dt>Seat</dt><dd>{constitution.legalArchitecture.seat}</dd></div><div><dt>Rules</dt><dd>{constitution.legalArchitecture.rules}</dd></div><div><dt>Language</dt><dd>{constitution.legalArchitecture.language}</dd></div></dl><div className="warning"><ShieldCheck size={17} /><div><strong>Human legal authority</strong><p>The protocol may propose a determination. Only the human arbitrator may independently adopt and sign an award.</p></div></div></Card>
      <Card className="protocol-identity"><Badge>Version-locked identity</Badge><h2>{constitution.protocolIdentity.model}</h2><dl><div><dt>Provider</dt><dd>{constitution.protocolIdentity.provider}</dd></div><div><dt>Prompt</dt><dd>{constitution.protocolIdentity.promptVersion}</dd></div><div><dt>Retrieval</dt><dd>{constitution.protocolIdentity.retrievalPack}</dd></div><div><dt>Engine</dt><dd>{constitution.protocolIdentity.engineVersion}</dd></div></dl><p>{constitution.protocolIdentity.toolPolicy}</p></Card></div>
    <div className="principle-grid">{(Object.keys(constitution.principles) as Principle[]).map((field) => <label key={field} className="principle-editor"><span>{principleLabels[field]}</span><textarea value={constitution.principles[field]} onChange={(event) => updatePrinciple(field, event.target.value)} /></label>)}</div>
    <Card className="firewall-card"><Badge tone="red">Settlement firewall</Badge><h2>{constitution.settlementPolicy.activation}</h2><p>{constitution.settlementPolicy.firewall}. {constitution.settlementPolicy.meritsDisclosure}.</p></Card>
    <p className="change-policy">{constitution.changePolicy}</p>
  </>;
}
