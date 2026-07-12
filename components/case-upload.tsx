import { BookOpen, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isBilateralConfirmation, type ContractState, type Topic } from "@/lib/case-model";

const topicLabels: Record<Topic, string> = {
  uptime: "Uptime, evidence & credits", liability: "Consequential loss & cap", legal_architecture: "Law, seat & procedure",
};

type Props = {
  state: ContractState;
  editExpectation: (partyId: string, topic: Topic, value: string) => void;
  confirmProfile: (partyId: string) => void;
  confirmClause: (topic: Topic, party: "supplier" | "customer") => void;
};

export function GovernanceAlignment({ state, editExpectation, confirmProfile, confirmClause }: Props) {
  return <>
    <div className="page-intro"><span>Stage 1 · before conflict</span><h1>Align the contractual governance.</h1><p>The parties align the contract and procedural architecture before they configure the decision protocol. These controls approve terms—not the arbitrator appointment.</p></div>
    <Card className="draft-card"><div><BookOpen size={18} /><strong>Draft SaaS Agreement</strong><small>Shared source text · independent party expectations</small></div><Badge>Source</Badge></Card>
    <div className="party-grid">{state.parties.map((party) => <Card key={party.id} className="party-card">
      <div className="party-heading"><div className={`party-mark ${party.id}`}>{party.name.charAt(0)}</div><div><h2>{party.name}</h2><p>{party.role} · {party.jurisdiction}</p></div><Badge tone={party.confirmed ? "green" : "amber"}>{party.confirmed ? "Profile confirmed" : "Party assertion"}</Badge></div>
      {Object.entries(party.expectations).map(([topic, value]) => <label key={topic}><span>{topicLabels[topic as Topic]}</span><textarea value={value} onChange={(event) => editExpectation(party.id, topic as Topic, event.target.value)} /></label>)}
      <Button variant={party.confirmed ? "secondary" : "primary"} onClick={() => confirmProfile(party.id)}>{party.confirmed && <Check size={15} />} {party.confirmed ? "Profile confirmed" : "Confirm this profile"}</Button>
    </Card>)}</div>
    <div className="section-heading"><div><span>Contract governance annex</span><h2>Approve the exact contract versions.</h2></div><p>The final appointment package incorporates these terms.</p></div>
    <div className="resolution-list">{state.decisions.map((decision) => <Card key={decision.topic} className="resolution-card compact">
      <div className="resolution-heading"><div><small className="topic-kicker">{topicLabels[decision.topic]}</small><Badge tone={isBilateralConfirmation(decision) ? "green" : "amber"}>{isBilateralConfirmation(decision) ? "Agreed contractual text" : "Awaiting bilateral confirmation"}</Badge></div><span className="version">VERSION {decision.version}</span></div>
      <p>{decision.language}</p>
      <div className="confirm-row"><span>Separate confirmation of version {decision.version}</span><div>{(["supplier", "customer"] as const).map((party) => <Button key={party} variant={decision.confirmations[party] === decision.version ? "secondary" : "ghost"} onClick={() => confirmClause(decision.topic, party)}>{decision.confirmations[party] === decision.version && <Check size={14} />} {party}</Button>)}</div></div>
    </Card>)}</div>
  </>;
}
