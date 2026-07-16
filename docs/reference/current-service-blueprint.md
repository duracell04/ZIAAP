# Current Concept Service Blueprint

> Reference description of the existing C0 synthetic implementation. The
> product charter, glossary, and roadmap are canonical where they differ.

## Synthetic, simulation-only journey

## 1. Actors

| Actor | Concept role | Authority boundary |
|---|---|---|
| Supplier and customer | State expectations, select options, confirm exact versions, and acknowledge eligible artifacts | Actions are simulated; identity, capacity, and consent are not proven |
| AI Resolution Officer | Compare, structure, calculate, test, explain, and prepare provisional reviewable analysis | Governed software capability; no legal office, signature, validation verdict, or independent legal effect |
| Fictional human arbitrator | Demonstrate disclosure, review, independent judgment, and decision controls | No institutional or legal appointment occurs |
| Concept curator | Supplies synthetic curated simulations | Fixtures are `illustrative_only`, not live executions or independently validated evidence |

## 2. End-to-end blueprint

The opening explains the proposition, current C0 maturity, roles, lifecycle, and
limits. The lifecycle then uses exactly six stages:

| Stage | Viewer action | System action | Gate | Artifact |
|---|---|---|---|---|
| Party Alignment | Confirm expectations, inspect divergences, choose and confirm terms | Link sources, display options, and run a deterministic scenario | Exact versions confirmed | Alignment Annex |
| Protocol Constitution | Configure inference-time principles, sources, tools, safeguards, and change policy | Increment the Constitution on change; weights remain unchanged | Exact Constitution acknowledged | Constitution record |
| Scenario Laboratory | Choose a curated simulation or declared live execution; acknowledge exact artifacts | Report observable behaviour, provenance, and limitations | Eligible selected artifacts acknowledged | Scenario artifacts |
| Configuration Manifest | Inspect and acknowledge the exact synthetic configuration digest | Rebuild and hash the selected configuration | Async integrity verifier | Configuration Manifest |
| Later Dispute | Complete the fictional appointment subsection, assemble a shared record, optionally activate settlement, and exercise human control | Verify configuration binding and preserve the settlement firewall | Matching manifest and completed fictional human review controls | Provisional software analysis and simulated human record |
| Audit Dossier | Inspect the projected lifecycle record | Project available and pending evidence without inventing completion | State-derived availability | Synthetic Audit Dossier |

The current C0 component layout still places the fictional ceremony beside the
manifest. The canonical lifecycle treats it as the first gated subsection of
Later Dispute; Sprint 4 completes that structural move.

## 3. Party Alignment service sequence

```text
Draft contract
→ independent party expectations
→ divergence analysis
→ source-linked issues
→ options and trade-offs
→ deterministic scenario testing
→ revised language
→ exact-version bilateral confirmation
→ Alignment Annex
```

Each divergence shows both positions, semantic/commercial/legal dimension,
practical consequence, uncertainty, sources, authority class, options,
trade-offs, and unresolved matters. Each option shows revised language,
structured terms, commercial effect, evidence, review boundary, deterministic
result where relevant, and selection consequence.

## 4. Execution service states

Two actions are distinct:

- **View illustrative example** returns `illustrative_only` and is presented as
  a curated simulation.
- **Run live execution** returns `executed_unverified` only after a successful
  declared configuration execution.

Live model mismatch, unavailable credentials/configuration, timeout, provider
failure, or invalid output returns `failed`. The prior valid artifact is
preserved but inactive; the viewer must deliberately select an eligible
artifact. No live failure returns fixture success.

## 5. Configuration Manifest preparation

Readiness is displayed synchronously. Mutation occurs only through an async
command that rebuilds the manifest, recomputes SHA-256, and verifies party
profiles, exact clause versions, selected execution artifacts and status,
bilateral artifact acknowledgements, Constitution version, lifecycle status,
exact-digest acknowledgements, disclosure review, fictional acceptance, and
complete unique scenario references.

Rejection preserves the prior state. These checks support internal synthetic
change detection only, not actor identity, consent, provenance, runtime
attestation, or legal authority.

## 6. Invalidation

Expectation changes make analysis stale. Contract, scenario, Constitution, or
artifact changes clear downstream digest, acknowledgements, disclosure,
fictional acceptance, dispute binding, and decision state. Revoking a digest
acknowledgement returns the lifecycle to `manifest_prepared`. Reset restores the
initial fixture.

## 7. Settlement firewall

Settlement begins only after separate bilateral simulated consent. Proposal
content and responses remain outside merits input. Only occurrence, termination
status, or a completed synthetic settlement enters the shared record.

## 8. Safe failure table

| Condition | Behaviour |
|---|---|
| Invalid request | Reject `400` |
| Live disabled | Explicit `failed`, `403` |
| Model mismatch or lifecycle conflict | Explicit `failed`, `409` |
| Invalid output | Explicit `failed`, `422` |
| Provider failure | Explicit `failed`, `502` |
| Credentials/config unavailable | Explicit `failed`, `503` |
| Timeout | Explicit `failed`, `504` |
| Digest or reference mismatch | Reject transition; preserve state |

## 9. Evidence handoff

The Git tag `prototype-showcase-v1.0-review-candidate` preserves the prior frozen
candidate and its twelve-artifact dossier. The current working classification is
C0 high-fidelity interactive concept demonstrator, with fidelity limited to
workflow and interaction.

No participation, finding, comprehension result, usability result, commercial
interest, or independent validation is simulated. Those evidence fields remain
pending until real sessions occur and are audited.
