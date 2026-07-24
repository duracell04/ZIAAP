"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Check, CircleDotDashed, FileStack, MessageSquareWarning } from "lucide-react";
import { MinimalDemoShell } from "@/components/minimal-demo-shell";
import { MinimalSourceDrawer } from "@/components/minimal-source-drawer";
import { useDelayedDemoAction } from "@/components/use-delayed-demo-action";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findMinimalDemoSources } from "@/lib/minimal-demo";

const caseTone = {
  Agreed: "green",
  Disputed: "red",
  Missing: "amber",
  Mechanical: "blue",
} as const;

export function MinimalDisputeScreen() {
  const router = useRouter();
  const { state, dispatch } = useMinimalDemo();
  const { matter, dispute } = state;
  const { busy, run } = useDelayedDemoAction(dispatch, 750);
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  const sources = findMinimalDemoSources(matter, sourceIds);

  return (
    <MinimalDemoShell
      currentStep="dispute"
      eyebrow={`${matter.dispute.transition} · deferred future architecture`}
      title={matter.dispute.headline}
      introduction={matter.dispute.summary}
      businessValue="This later hypothesis would start from an authorised export, not automatic access to private alignment material."
      role="CloudProvider view"
    >
      <Card className="minimal-source-stack">
        <div>
          <FileStack size={21} />
          <div>
            <span>Four synthetic source items</span>
            <h2>Contract, provider log, customer chronology, and invoice</h2>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => setSourceIds(matter.sources.map((source) => source.id))}
        >
          Show sources
        </Button>
      </Card>

      {!dispute.structured && (
        <div className="minimal-primary-action">
          <Button disabled={busy} onClick={() => run({ type: "STRUCTURE_DISPUTE" })}>
            <CircleDotDashed size={16} />
            {busy ? "Structuring facts, evidence, and issues…" : "Structure the case"}
          </Button>
        </div>
      )}

      {dispute.structured && (
        <>
          <section className="minimal-case-map" aria-labelledby="case-map-title">
            <div className="minimal-section-heading">
              <div>
                <span>Case map</span>
                <h2 id="case-map-title">What is agreed, disputed, missing, or mechanical?</h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSourceIds(matter.sources.map((source) => source.id))}
              >
                Show sources
              </Button>
            </div>
            <div>
              {matter.dispute.caseMap.map((item) => (
                <Card className={`minimal-case-item ${item.status.toLowerCase()}`} key={item.id}>
                  <Badge tone={caseTone[item.status]}>{item.status}</Badge>
                  <p>{item.text}</p>
                </Card>
              ))}
            </div>
          </section>

          <Card className={dispute.contested ? "minimal-inference-card contested" : "minimal-inference-card"}>
            <header>
              <div>
                <Badge tone="blue">AI inference · not an established fact</Badge>
                <h2>{matter.dispute.inference.proposition}</h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSourceIds(["source-provider-log", "source-customer-record"])}
              >
                Show source
              </Button>
            </header>
            <div className="minimal-evidence-columns">
              <div>
                <span>Supporting evidence</span>
                <ul>{matter.dispute.inference.supportingEvidence.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <span>Contrary evidence</span>
                <ul>{matter.dispute.inference.contraryEvidence.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <div className="minimal-uncertainty">
              <AlertTriangle size={17} />
              <div>
                <strong>{matter.dispute.inference.status}</strong>
                <p>{matter.dispute.inference.uncertainty}</p>
              </div>
            </div>

            {!dispute.contested ? (
              <div className="minimal-primary-action">
                <Button onClick={() => dispatch({ type: "CONTEST_INFERENCE" })}>
                  <MessageSquareWarning size={16} /> Contest this inference
                </Button>
              </div>
            ) : (
              <div className="minimal-objection">
                <Badge tone="red">Contested by CloudProvider</Badge>
                <p>{matter.dispute.objection}</p>
                <span><Check size={14} /> This objection will follow the issue into human review.</span>
              </div>
            )}
          </Card>
        </>
      )}

      {dispute.contested && (
        <div className="minimal-next-panel">
          <div>
            <Badge tone="green">Party challenge recorded</Badge>
            <h2>The AI inference is now visibly contested.</h2>
          </div>
          <Button onClick={() => router.push("/demo/review")}>
            Prepare human review <ArrowRight size={16} />
          </Button>
        </div>
      )}

      {sources.length > 0 && (
        <MinimalSourceDrawer sources={sources} onClose={() => setSourceIds([])} />
      )}
    </MinimalDemoShell>
  );
}
