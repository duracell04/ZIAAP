import { Badge } from "@/components/ui/badge";
import type { ExecutionStatus } from "@/lib/case-model";

export function AuthorityStrip({ executionStatus, actor, version, consequence, provenance }: { executionStatus: ExecutionStatus; actor: string; version: string; consequence: string; provenance: string }) {
  return <div className="authority-strip" aria-label="Artifact authority and limitations">
    <div><Badge tone="red">simulation_only</Badge><Badge tone={executionStatus === "failed" ? "amber" : executionStatus === "executed_unverified" ? "blue" : undefined}>{executionStatus}</Badge><Badge>Synthetic data</Badge><Badge>No legal effect</Badge></div>
    <dl><div><dt>Actor</dt><dd>{actor}</dd></div><div><dt>Version</dt><dd>{version}</dd></div><div><dt>Consequence</dt><dd>{consequence}</dd></div><div><dt>Provenance</dt><dd>{provenance}</dd></div></dl>
    <p>No production identity verification · no institutional appointment · no production signature · no legally operative award</p>
  </div>;
}
