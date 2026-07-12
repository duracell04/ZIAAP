import { ArrowRight, Compass, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const lifecycle = ["Align", "Calibrate", "Stress-test", "Manifest", "Simulate appointment", "Later dispute", "Human review"];

export function OpeningExperience({ beginGuided, explore }: { beginGuided: () => void; explore: () => void }) {
  return <main className="opening-shell">
    <header className="opening-nav"><div className="wordmark opening-wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>Dispute governance, designed early</small></div></div><Badge tone="red">Synthetic · simulation only</Badge></header>
    <section className="opening-hero">
      <div className="opening-copy"><span className="eyebrow">AI-native dispute governance and arbitration</span><h1>Design how disagreement will be handled—while interests are still aligned.</h1><p className="opening-definition">ZIAAP is an AI-native dispute-governance and arbitration protocol that parties configure, test, and acknowledge before conflict, then simulate applying under a human arbitrator when a later dispute arises.</p><div className="opening-actions"><Button onClick={beginGuided}>Begin guided demonstration <ArrowRight size={16} /></Button><Button variant="secondary" onClick={explore}><Compass size={16} /> Explore the workflow</Button></div></div>
      <aside className="opening-problem"><Sparkles size={20} /><span>Commercial problem</span><h2>Dispute clauses usually name a forum. They rarely align expectations about evidence, interpretation, remedies, or AI behavior.</h2><p>ZIAAP makes those governance choices visible before a dispute, then preserves independent human judgment when stakes become real.</p></aside>
    </section>
    <section className="role-split"><div><Scale size={22} /><span>Human arbitrator</span><h2>Owns procedure and judgment.</h2><p>Independently reviews, modifies, or rejects any protocol output. This prototype makes no legal appointment.</p></div><div><ShieldCheck size={22} /><span>ZIAAP protocol</span><h2>Structures the agreed process.</h2><p>Identifies configuration, evidence rules, stress artifacts, uncertainty, and provisional simulation output.</p></div></section>
    <section className="lifecycle-panel"><div><span className="eyebrow">Complete lifecycle</span><h2>Governance begins before conflict.</h2></div><ol>{lifecycle.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></section>
    <footer className="opening-disclosure"><ShieldCheck size={18} /><p><strong>What this prototype demonstrates:</strong> a curated, domain-neutral, synthetic journey with illustrative or executed-unverified artifacts and internal consistency checks. It provides no production identity verification, institutional appointment, signature, operative award, independent validation, or legal effect.</p></footer>
  </main>;
}
