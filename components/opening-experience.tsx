import { ArrowRight, Compass, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CANONICAL_PRODUCT_DEFINITION,
  CATEGORY_THESIS,
  CURRENT_ARTIFACT_CLASSIFICATION,
  CURRENT_MATURITY_LEVEL,
  CURRENT_PRODUCT_NAME,
  MATTER_GATES,
  NORTH_STAR_AMBITION,
  OPERATING_PRINCIPLE,
  PROTOCOL_LAYERS,
  ZIAAP_TAGLINE,
} from "@/lib/product-language";

export function OpeningExperience({ beginGuided, explore }: { beginGuided: () => void; explore: () => void }) {
  return <main className="opening-shell">
    <header className="opening-nav"><div className="wordmark opening-wordmark"><span>Z</span><div><strong>ZIAAP</strong><small>{ZIAAP_TAGLINE}</small></div></div><div><Badge tone="blue">{CURRENT_MATURITY_LEVEL} · concept demonstrator</Badge><Badge tone="red">Synthetic · simulation only</Badge></div></header>
    <section className="opening-hero">
      <div className="opening-copy"><span className="eyebrow">{CATEGORY_THESIS} · {CURRENT_ARTIFACT_CLASSIFICATION}</span><h1>{CURRENT_PRODUCT_NAME}</h1><p className="opening-definition">{CANONICAL_PRODUCT_DEFINITION}</p><div className="opening-actions"><Button onClick={beginGuided}>Begin guided demonstration <ArrowRight size={16} /></Button><Button variant="secondary" onClick={explore}><Compass size={16} /> Explore the workflow</Button></div></div>
      <aside className="opening-problem"><Sparkles size={20} /><span>Active product strategy</span><h2>{OPERATING_PRINCIPLE}</h2><p>{NORTH_STAR_AMBITION}</p></aside>
    </section>
    <section className="role-split"><div><Scale size={22} /><span>Contracting parties</span><h2>Control their positions and any adoption.</h2><p>Each party independently confirms its own response. Only authorised external acts can incorporate wording into the contract.</p></div><div><ShieldCheck size={22} /><span>Governed software</span><h2>Structures scenarios without acquiring authority.</h2><p>Original responses, derived representations, approvals, versions, and legal-status claims remain distinct and inspectable.</p></div></section>
    <section className="lifecycle-panel"><div><span className="eyebrow">Long-term architecture · three layers · six gates</span><h2>Pilot 01 is I0-only; downstream layers remain deferred.</h2></div><ol>{MATTER_GATES.map((gate) => <li key={gate.id}><span>{PROTOCOL_LAYERS.find((layer) => layer.id === gate.layerId)?.id.toUpperCase()} · {String(gate.number).padStart(2, "0")}</span><strong>{"demonstratorLabel" in gate ? gate.demonstratorLabel : gate.label}</strong></li>)}</ol></section>
    <footer className="opening-disclosure"><ShieldCheck size={18} /><p><strong>What this C0 concept demonstrates:</strong> a curated synthetic journey with illustrative or live-unverified artifacts and internal consistency checks. High fidelity refers only to workflow and interaction fidelity. It provides no production identity verification, institutional appointment, signature, operative award, independent validation, or legal effect.</p></footer>
  </main>;
}
