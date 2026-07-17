"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Bot, Check, FileSearch, RefreshCcw, Scale, UserRoundCheck } from "lucide-react";
import { MinimalDemoShell } from "@/components/minimal-demo-shell";
import { MinimalSourceDrawer } from "@/components/minimal-source-drawer";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findMinimalDemoSources } from "@/lib/minimal-demo";

const aiWork = [
  "Compared the two expectations",
  "Applied the agreed calculation",
  "Structured facts and evidence",
  "Exposed uncertainty and contrary evidence",
  "Prepared an advisory proposal",
];

const humanWork = [
  "Confirmed the clear contractual wording",
  "Challenged a disputed AI inference",
  "Recorded an independent preliminary view",
  "Evaluated the missing evidence",
  "Modified and owned the simulated result",
];

export function MinimalOutcomeScreen() {
  const router = useRouter();
  const { state, dispatch } = useMinimalDemo();
  const { matter, trace } = state;
  const [sourcesOpen, setSourcesOpen] = useState(false);

  function restart() {
    dispatch({ type: "RESET" });
    router.push("/demo");
  }

  return (
    <MinimalDemoShell
      currentStep="outcome"
      eyebrow="Step 5 · complete trace"
      title="The system prepared the matter. The human changed the result."
      introduction="One clause now connects the parties’ expectations, the tested protocol, the later evidence, the objection, and the simulated human decision."
      businessValue="Receive a clearer, inspectable process while keeping consequential judgment under accountable human control."
    >
      <Card className="minimal-outcome-hero">
        <div>
          <Badge tone="blue">AI proposal · advisory only</Badge>
          <strong>15%</strong>
          <span>CHF 1,500</span>
        </div>
        <ArrowRight size={24} />
        <div className="human">
          <Badge tone="green">Human decision · simulated</Badge>
          <strong>10%</strong>
          <span>CHF 1,000</span>
        </div>
      </Card>

      <section className="minimal-trace" aria-labelledby="trace-title">
        <div className="minimal-section-heading">
          <div>
            <span>End-to-end connection</span>
            <h2 id="trace-title">Every visible change came from the recorded state.</h2>
          </div>
          <Button variant="ghost" onClick={() => setSourcesOpen(true)}>Show all sources</Button>
        </div>
        <ol>
          {trace.map((event) => (
            <li key={event.id}>
              <span>{String(event.sequence).padStart(2, "0")}</span>
              <div>
                <strong>{event.label}</strong>
                <p>{event.detail}</p>
                <small>{event.actor}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="minimal-work-split">
        <Card>
          <Bot size={21} />
          <span>AI-assisted work</span>
          <h2>Prepared for review</h2>
          <ul>{aiWork.map((item) => <li key={item}><Check size={13} /> {item}</li>)}</ul>
        </Card>
        <Card className="human">
          <UserRoundCheck size={21} />
          <span>Human-owned work</span>
          <h2>Retained responsibility</h2>
          <ul>{humanWork.map((item) => <li key={item}><Check size={13} /> {item}</li>)}</ul>
        </Card>
      </div>

      <div className="minimal-before-after">
        <Card>
          <FileSearch size={19} />
          <span>Without structured preparation</span>
          <h2>Reconstruct scattered facts, assumptions, calculations, and objections.</h2>
        </Card>
        <Card>
          <Scale size={19} />
          <span>With the ZIAAP concept</span>
          <h2>Review the source-linked question that genuinely requires judgment.</h2>
        </Card>
      </div>

      <details className="minimal-technical-details">
        <summary>Technical demonstration details</summary>
        <dl>
          <div><dt>Fixture</dt><dd>{matter.id}</dd></div>
          <div><dt>State schema</dt><dd>ziaap:minimal-demo:v1</dd></div>
          <div><dt>Execution</dt><dd>Curated deterministic transitions; no external model calls</dd></div>
          <div><dt>Legal effect</dt><dd>None</dd></div>
          <div><dt>Evidence status</dt><dd>Synthetic source excerpts; external comprehension evidence pending</dd></div>
        </dl>
      </details>

      <div className="minimal-outcome-actions">
        <Link className="button button-primary" href="/feedback">
          Leave professional feedback <ArrowRight size={16} />
        </Link>
        <Button variant="secondary" onClick={restart}>
          <RefreshCcw size={15} /> Restart simulation
        </Button>
      </div>

      {sourcesOpen && (
        <MinimalSourceDrawer
          sources={findMinimalDemoSources(matter, matter.sources.map((source) => source.id))}
          onClose={() => setSourcesOpen(false)}
        />
      )}
    </MinimalDemoShell>
  );
}
