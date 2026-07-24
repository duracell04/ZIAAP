"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Check, FileCheck2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import {
  PUBLIC_DEMO_AUTHORITY_LINE,
  PUBLIC_DEMO_DESCRIPTION,
  PUBLIC_DEMO_DISCLAIMER,
  PUBLIC_DEMO_HEADLINE,
  PUBLIC_DEMO_PRODUCT_BOUNDARY,
  PUBLIC_DEMO_STEPS,
  OPERATING_PRINCIPLE,
  ZERO_INSTANCE_EXPLAINER,
  ZIAAP_ACRONYM_EXPANSION,
  ZIAAP_TAGLINE,
} from "@/lib/product-language";

export function MinimalDemoOpening() {
  const router = useRouter();
  const { dispatch, hydrated } = useMinimalDemo();

  function start() {
    dispatch({ type: "RESET" });
    router.push("/demo/align");
  }

  return (
    <main className="minimal-opening">
      <header className="minimal-opening-nav">
        <div className="minimal-wordmark">
          <span>Z</span>
          <div>
            <strong>ZIAAP</strong>
            <small>{ZIAAP_TAGLINE}</small>
          </div>
        </div>
        <span className="minimal-opening-status">Four-minute synthetic walkthrough</span>
      </header>

      <div className="minimal-disclaimer" role="note">
        {PUBLIC_DEMO_DISCLAIMER}
      </div>

      <section className="minimal-opening-hero">
        <div>
          <span className="minimal-eyebrow">For business owners and trade partners</span>
          <h1>{PUBLIC_DEMO_HEADLINE}</h1>
          <p className="minimal-opening-description">{PUBLIC_DEMO_DESCRIPTION}</p>
          <p className="minimal-aviation-line">{OPERATING_PRINCIPLE}</p>
          <div className="minimal-arbitration-explainer">
            <FileCheck2 size={19} />
            <p>{PUBLIC_DEMO_PRODUCT_BOUNDARY}</p>
          </div>
          <Button disabled={!hydrated} onClick={start}>
            Start the 4-minute simulation <ArrowRight size={16} />
          </Button>
        </div>

        <aside className="minimal-authority-card">
          <ShieldCheck size={22} />
          <span>Who does what</span>
          <h2>{PUBLIC_DEMO_AUTHORITY_LINE}</h2>
          <ul>
            <li><Check size={14} /> Each party answers independently.</li>
            <li><Check size={14} /> Original and normalised text stay separate.</li>
            <li><Check size={14} /> Both parties approve any shared result.</li>
            <li><Check size={14} /> External counsel controls contract adoption.</li>
          </ul>
        </aside>
      </section>

      <section className="minimal-opening-steps" aria-labelledby="walkthrough-title">
        <div>
          <span className="minimal-eyebrow">Current product and future architecture</span>
          <h2 id="walkthrough-title">Start with contract alignment; treat later dispute support as deferred.</h2>
        </div>
        <ol>
          {PUBLIC_DEMO_STEPS.map((step, index) => (
            <li key={step.id}>
              <span>{index + 1}</span>
              <div>
                <small>{step.contextLabel}</small>
                <strong>{step.label}</strong>
                <small>{step.statusLabel}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="minimal-opening-footer">
        <div className="minimal-name-explainer">
          <p><strong>ZIAAP stands for {ZIAAP_ACRONYM_EXPANSION}.</strong></p>
          <p>{ZERO_INSTANCE_EXPLAINER}</p>
        </div>
      </footer>
    </main>
  );
}
