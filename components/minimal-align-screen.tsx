"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Check, GitCompareArrows } from "lucide-react";
import { MinimalDemoShell } from "@/components/minimal-demo-shell";
import { MinimalSourceDrawer } from "@/components/minimal-source-drawer";
import { useDelayedDemoAction } from "@/components/use-delayed-demo-action";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findMinimalDemoSources } from "@/lib/minimal-demo";

export function MinimalAlignScreen() {
  const router = useRouter();
  const { state, dispatch } = useMinimalDemo();
  const { matter, alignment } = state;
  const { busy, run } = useDelayedDemoAction(dispatch, 650);
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  const sources = findMinimalDemoSources(matter, sourceIds);

  return (
    <MinimalDemoShell
      currentStep="align"
      eyebrow="Step 1 · before conflict"
      title="Do both businesses understand this clause the same way?"
      introduction="One vague phrase can hide two commercially different expectations. Compare them before either party has a dispute."
      businessValue="Resolve a costly misunderstanding while both sides still want the transaction to succeed."
    >
      <Card className="minimal-clause-card">
        <div>
          <Badge>Original contract clause</Badge>
          <h2>Service credit for a “material outage”</h2>
        </div>
        <blockquote>{matter.clause.original}</blockquote>
        <Button variant="ghost" onClick={() => setSourceIds(["source-contract"])}>
          Show source
        </Button>
      </Card>

      <div className="minimal-comparison">
        <Card className="minimal-party-statement customer">
          <span>CustomerCo expects</span>
          <h2>Serious loss · more than 4 hours</h2>
          <p>{matter.expectations.customer}</p>
        </Card>
        <Card className="minimal-party-statement provider">
          <span>CloudProvider expects</span>
          <h2>Complete outage · more than 8 hours</h2>
          <p>{matter.expectations.provider}</p>
        </Card>
      </div>

      {!alignment.compared && (
        <div className="minimal-primary-action">
          <Button disabled={busy} onClick={() => run({ type: "COMPARE_EXPECTATIONS" })}>
            <GitCompareArrows size={16} />
            {busy ? "Comparing the two expectations…" : "Compare expectations"}
          </Button>
        </div>
      )}

      {alignment.compared && (
        <Card className="minimal-divergence-card">
          <AlertTriangle size={20} />
          <div>
            <Badge tone="amber">Material divergence found</Badge>
            <h2>{matter.divergence.title}</h2>
            <p>{matter.divergence.summary}</p>
            <Button variant="ghost" onClick={() => setSourceIds(["source-contract"])}>
              Show source
            </Button>
          </div>
        </Card>
      )}

      {alignment.compared && !alignment.wordingAdopted && (
        <section className="minimal-revised-preview">
          <span>Clear simulated wording</span>
          <h2>Define the trigger, credit, and evidence rule.</h2>
          <p>{matter.clause.revised}</p>
          <div className="minimal-primary-action">
            <Button onClick={() => dispatch({ type: "ADOPT_WORDING" })}>
              Use the clear wording in this simulation <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      )}

      {alignment.wordingAdopted && (
        <Card className="minimal-agreed-card">
          <div className="minimal-agreed-heading">
            <div>
              <Badge tone="green">Simulated wording confirmed</Badge>
              <h2>The ambiguity is now an explicit rule.</h2>
            </div>
            <div className="minimal-confirmations">
              <span><Check size={14} /> CustomerCo</span>
              <span><Check size={14} /> CloudProvider</span>
            </div>
          </div>
          <p>{matter.clause.revised}</p>
          <Button variant="ghost" onClick={() => setSourceIds(["source-contract"])}>
            Show source
          </Button>
          <div className="minimal-primary-action">
            <Button onClick={() => router.push("/demo/test")}>
              Test the agreement <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      )}

      {sources.length > 0 && (
        <MinimalSourceDrawer sources={sources} onClose={() => setSourceIds([])} />
      )}
    </MinimalDemoShell>
  );
}
