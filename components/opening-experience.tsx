import { ArrowRight, Compass, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CANONICAL_PRODUCT_DEFINITION,
  CURRENT_ARTIFACT_CLASSIFICATION,
  CURRENT_MATURITY_LEVEL,
  DIGITAL_TWIN_BOUNDARY,
  LIFECYCLE_STAGES,
  PRODUCT_PROMISE,
} from "@/lib/product-language";

export function OpeningExperience({ beginGuided, explore }: { beginGuided: () => void; explore: () => void }) {
  return <main className="opening-shell">
    <header className="opening-nav"><div className="wordmark opening-wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>Dispute governance, designed early</small></div></div><div><Badge tone="blue">{CURRENT_MATURITY_LEVEL} · concept demonstrator</Badge><Badge tone="red">Synthetic · simulation only</Badge></div></header>
    <section className="opening-hero">
      <div className="opening-copy"><span className="eyebrow">{CURRENT_ARTIFACT_CLASSIFICATION}</span><h1>{PRODUCT_PROMISE}</h1><p className="opening-definition">{CANONICAL_PRODUCT_DEFINITION}</p><div className="opening-actions"><Button onClick={beginGuided}>Begin guided demonstration <ArrowRight size={16} /></Button><Button variant="secondary" onClick={explore}><Compass size={16} /> Explore the workflow</Button></div></div>
      <aside className="opening-problem"><Sparkles size={20} /><span>Process twin boundary</span><h2>{DIGITAL_TWIN_BOUNDARY}</h2><p>Dispute clauses usually name a forum but leave evidence, interpretation, remedies, AI behaviour, and change policy underspecified.</p></aside>
    </section>
    <section className="role-split"><div><Scale size={22} /><span>Human arbitrator</span><h2>Retains legal authority and judgment.</h2><p>A properly appointed human independently reviews, modifies, or rejects software-supported analysis. This concept makes no legal appointment.</p></div><div><ShieldCheck size={22} /><span>AI Resolution Officer</span><h2>Governed software capability.</h2><p>Structures, compares, retrieves, calculates, tests, challenges, explains, and prepares reviewable analysis. It is not an arbitrator or autonomous decision-maker.</p></div></section>
    <section className="lifecycle-panel"><div><span className="eyebrow">Six-stage lifecycle</span><h2>Governance begins before conflict.</h2></div><ol>{LIFECYCLE_STAGES.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong></li>)}</ol></section>
    <footer className="opening-disclosure"><ShieldCheck size={18} /><p><strong>What this C0 concept demonstrates:</strong> a curated synthetic journey with illustrative or live-unverified artifacts and internal consistency checks. High fidelity refers only to workflow and interaction fidelity. It provides no production identity verification, institutional appointment, signature, operative award, independent validation, or legal effect.</p></footer>
  </main>;
}
