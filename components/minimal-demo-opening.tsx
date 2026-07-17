"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Check, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import {
  PUBLIC_DEMO_ARBITRATION_EXPLAINER,
  PUBLIC_DEMO_AUTHORITY_LINE,
  PUBLIC_DEMO_DESCRIPTION,
  PUBLIC_DEMO_DISCLAIMER,
  PUBLIC_DEMO_HEADLINE,
  PUBLIC_DEMO_STEPS,
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
            <small>Clear dispute governance</small>
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
          <div className="minimal-arbitration-explainer">
            <Scale size={19} />
            <p>{PUBLIC_DEMO_ARBITRATION_EXPLAINER}</p>
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
            <li><Check size={14} /> Businesses agree the rules.</li>
            <li><Check size={14} /> AI organises and proposes.</li>
            <li><Check size={14} /> Parties can challenge.</li>
            <li><Check size={14} /> The human arbitrator remains responsible.</li>
          </ul>
        </aside>
      </section>

      <section className="minimal-opening-steps" aria-labelledby="walkthrough-title">
        <div>
          <span className="minimal-eyebrow">One connected business story</span>
          <h2 id="walkthrough-title">See the complete idea without learning a legal platform.</h2>
        </div>
        <ol>
          {PUBLIC_DEMO_STEPS.map((step, index) => (
            <li key={step.id}>
              <span>{index + 1}</span>
              <strong>{step.label}</strong>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
