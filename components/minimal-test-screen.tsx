"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Calculator, Check, FileSearch, Scale, Timer } from "lucide-react";
import { MinimalDemoShell } from "@/components/minimal-demo-shell";
import { MinimalSourceDrawer } from "@/components/minimal-source-drawer";
import { useDelayedDemoAction } from "@/components/use-delayed-demo-action";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findMinimalDemoSources } from "@/lib/minimal-demo";

const ruleIcons = [Timer, Calculator, FileSearch, Scale] as const;

export function MinimalTestScreen() {
  const router = useRouter();
  const { state, dispatch } = useMinimalDemo();
  const { matter, protocol } = state;
  const { busy, run } = useDelayedDemoAction(dispatch, 700);
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  const sources = findMinimalDemoSources(matter, sourceIds);
  const rules = [
    ["Trigger", matter.protocol.trigger],
    ["Credit", matter.protocol.creditRule],
    ["Evidence", matter.protocol.evidenceRule],
    ["Decision authority", matter.protocol.authorityRule],
  ] as const;

  return (
    <MinimalDemoShell
      currentStep="test"
      eyebrow="Step 2 · test before signing"
      title="See how the agreed rules behave before a real dispute."
      introduction="A clear rule should produce a clear result when the evidence is complete—and stop when important evidence is missing."
      businessValue="Know in advance which thresholds, records, and human decisions will matter."
    >
      <div className="minimal-rule-grid">
        {rules.map(([label, value], index) => {
          const Icon = ruleIcons[index];
          return (
            <Card key={label}>
              <Icon size={18} />
              <span>{label}</span>
              <p>{value}</p>
            </Card>
          );
        })}
      </div>

      <Card className="minimal-scenario-card">
        <header>
          <div>
            <Badge tone="blue">Scenario 1 · complete evidence</Badge>
            <h2>{matter.scenarios.clear.title}</h2>
          </div>
          <Button variant="ghost" onClick={() => setSourceIds(["source-contract", "source-invoice"])}>
            Show source
          </Button>
        </header>
        <ul>
          {matter.scenarios.clear.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
        {!protocol.clearScenarioRun ? (
          <div className="minimal-primary-action">
            <Button disabled={busy} onClick={() => run({ type: "RUN_CLEAR_SCENARIO" })}>
              {busy ? "Applying the agreed rule…" : "Run the clear scenario"}
            </Button>
          </div>
        ) : (
          <div className="minimal-scenario-result success">
            <Check size={20} />
            <div>
              <span>Illustrative deterministic result</span>
              <strong>{matter.scenarios.clear.result}</strong>
              <p>{matter.scenarios.clear.explanation}</p>
            </div>
          </div>
        )}
      </Card>

      {protocol.clearScenarioRun && (
        <Card className="minimal-scenario-card">
          <header>
            <div>
              <Badge tone="amber">Scenario 2 · incomplete evidence</Badge>
              <h2>{matter.scenarios.missing.title}</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => setSourceIds(["source-provider-log", "source-customer-record"])}
            >
              Show source
            </Button>
          </header>
          <ul>
            {matter.scenarios.missing.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          {!protocol.missingScenarioRun ? (
            <div className="minimal-primary-action">
              <Button disabled={busy} onClick={() => run({ type: "RUN_MISSING_SCENARIO" })}>
                {busy ? "Checking the evidence gap…" : "Test missing evidence"}
              </Button>
            </div>
          ) : (
            <div className="minimal-scenario-result warning">
              <AlertTriangle size={20} />
              <div>
                <span>Fail-closed result</span>
                <strong>{matter.scenarios.missing.result}</strong>
                <p>{matter.scenarios.missing.explanation}</p>
              </div>
            </div>
          )}
        </Card>
      )}

      {protocol.missingScenarioRun && !protocol.confirmed && (
        <Card className="minimal-protocol-confirm">
          <Badge>Simulation only</Badge>
          <h2>The protocol exposes both certainty and uncertainty.</h2>
          <p>
            Both businesses can now see the trigger, calculation, evidence hierarchy, and point reserved for human review.
          </p>
          <div className="minimal-primary-action">
            <Button onClick={() => dispatch({ type: "CONFIRM_PROTOCOL" })}>
              Confirm this simulated protocol <Check size={16} />
            </Button>
          </div>
        </Card>
      )}

      {protocol.confirmed && (
        <div className="minimal-next-panel">
          <div>
            <Badge tone="green">Protocol confirmed in the simulation</Badge>
            <h2>Now apply the same rule to a future incident.</h2>
          </div>
          <Button onClick={() => router.push("/demo/dispute")}>
            Jump to the future dispute <ArrowRight size={16} />
          </Button>
        </div>
      )}

      {sources.length > 0 && (
        <MinimalSourceDrawer sources={sources} onClose={() => setSourceIds([])} />
      )}
    </MinimalDemoShell>
  );
}
