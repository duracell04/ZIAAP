import { BookOpenCheck, Check, FileText, Printer, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildDemonstrationDossier, type DossierArtifact } from "@/lib/dossier";
import type { ContractState } from "@/lib/case-model";

function ArtifactMetadata({ artifact }: { artifact: DossierArtifact }) {
  return <div className="artifact-metadata"><span><small>Actor</small>{artifact.actor}</span><span><small>Authority</small>{artifact.authorityStatus}</span><span><small>Lifecycle</small>{artifact.lifecycleMode}</span><span><small>Execution</small>{artifact.executionStatus}</span><span><small>Version</small>{artifact.version}</span><span><small>Legal effect</small>false</span></div>;
}

export function DossierView({ state }: { state: ContractState }) {
  const dossier = buildDemonstrationDossier(state);
  return <>
    <div className="page-intro dossier-intro"><span>Stage 6 · Audit Dossier</span><h1>One state-derived record of the complete synthetic journey.</h1><p>Twelve artifacts make the commercial, procedural, technical, and authority story inspectable. Missing lifecycle evidence remains visibly pending; the dossier never invents completion.</p></div>
    <div className="dossier-toolbar"><div><Badge tone={dossier.complete ? "green" : "amber"}>{dossier.complete ? "Complete synthetic dossier" : `${dossier.availableCount} of 12 available`}</Badge><span className="version">External validation: {dossier.externalValidation}</span></div><Button variant="secondary" onClick={() => window.print()}><Printer size={15} /> Print presentation dossier</Button></div>

    <Card className="dossier-cover"><div><span>ZIAAP · C0 CONCEPT DEMONSTRATOR</span><h2>{dossier.title}</h2><p>Workflow and interaction fidelity · synthetic · simulation-only · no legal effect</p></div><div className="dossier-score"><strong>{dossier.availableCount}</strong><span>of 12 artifacts available</span></div></Card>

    <div className="dossier-summary"><Card><BookOpenCheck size={20} /><span>Commercial story</span><h2>Align before conflict.</h2><p>Expose divergent expectations, compare options, confirm exact language, and generate an Alignment Annex.</p></Card><Card><FileText size={20} /><span>Protocol story</span><h2>Configure, test, and identify.</h2><p>Configure inference-time rules, inspect Scenario Laboratory behaviour, and hash the Configuration Manifest.</p></Card><Card><ShieldAlert size={20} /><span>Authority story</span><h2>Simulation never becomes authority.</h2><p>Human control, settlement separation, and legal-effect boundaries remain visible throughout.</p></Card></div>

    <div className="dossier-index">{dossier.artifacts.map((artifact) => <a key={artifact.id} href={`#dossier-${artifact.id}`} className={artifact.available ? "available" : "pending"}><span>{String(artifact.index).padStart(2, "0")}</span><strong>{artifact.title}</strong><small>{artifact.available ? "Available" : "Pending"}</small></a>)}</div>

    <div className="dossier-artifacts">{dossier.artifacts.map((artifact) => <Card key={artifact.id} id={`dossier-${artifact.id}`} className={artifact.available ? "dossier-artifact" : "dossier-artifact pending"}><header><div><span>{String(artifact.index).padStart(2, "0")} · {artifact.artifactType.replaceAll("_", " ")}</span><h2>{artifact.title}</h2></div><Badge tone={artifact.available ? "green" : "amber"}>{artifact.available ? <><Check size={11} /> Available</> : "Pending lifecycle evidence"}</Badge></header><ArtifactMetadata artifact={artifact} /><p className="artifact-summary">{artifact.summary}</p><div className="artifact-boundary"><div><small>Provenance</small><p>{artifact.provenance}</p></div><div><small>Consequence</small><p>{artifact.consequence}</p></div><div><small>Boundary</small><p>Synthetic data · no identity verification · no institutional appointment · no production signature · no operative award</p></div></div><details open><summary>Inspect artifact contents</summary><dl>{artifact.details.map((detail) => <div key={`${artifact.id}-${detail.label}`}><dt>{detail.label}</dt><dd><pre>{detail.value}</pre></dd></div>)}</dl></details></Card>)}</div>

    <Card className="external-validation-note"><ShieldAlert size={20} /><div><Badge tone="amber">External validation pending</Badge><h2>C0 concept evidence, not independent validation.</h2><p>No expert reviewer participation, comprehension result, usability result, or independent evaluation is claimed. Those questions remain explicit Gate C1 evidence requirements.</p></div></Card>
  </>;
}
