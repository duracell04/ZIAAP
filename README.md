# ZIAAP

Zero-Instance Algorithmic Arbitration Protocol.

> **ZIAAP makes the contract itself the beginning of the dispute-resolution system.**

ZIAAP’s company vision is bilateral contract alignment plus a persistent,
source-linked legal state that continues from drafting through performance and
any later dispute.

**Company USP:** ZIAAP is a zero-instance, authority-aware contract-to-resolution
protocol that aligns party meaning before signature and preserves the agreed
legal state throughout performance and any later dispute.

**Hackathon USP:** ZIAAP reveals where two parties think the same draft means
different things, helps them resolve the divergence, and turns the agreed
meaning into executable and arbitration-ready contract state.

**UVP:** ZIAAP reduces future dispute cost by resolving hidden contractual
misalignment before signature and carrying the agreed meaning forward, so
lawyers and arbitrators do not reconstruct the parties’ expectations later.

## Hackathon build compass

The hackathon proves one narrow I0-first vertical slice:

> **Draft contract → independent party profiles → alignment matrix → scenario test → agreed clause language → Alignment Annex → compact future-dispute preview**

The seeded demo aligns a Swiss SaaS supplier and UK customer on uptime, loss
allocation, and arbitral architecture. A later outage then proves continuity:
the agreed state calculates a CHF 1,500 service credit mechanically, while the
effect of gross negligence on the liability limitation is reserved for human review.

Run locally:

```powershell
pnpm.cmd install
pnpm.cmd dev
```

Open `http://localhost:3000`. Cached verified analysis and legal sources are the
reliable demo default. Live AI and OmniLex retrieval are optional buttons with
honest fallback labels.

## Repository map

- `app/` — Next.js workspace and structured analysis API
- `components/` — the four-view legal interface and owned UI primitives
- `lib/` — schemas, authority rules, AI boundary, and deterministic calculation
- `data/` — one reliable cross-border SaaS fixture
- `docs/` — seven authoritative documents plus non-normative appendices
- `tests/` — schema, consent, and deterministic-calculation tests

## Core documents

1. [Project Charter](docs/01-project-charter.md)
2. [Service Blueprint](docs/02-service-blueprint.md)
3. [Legal Governance](docs/03-legal-governance.md)
4. [Product Requirements](docs/04-product-requirements.md)
5. [HCI and Information Architecture](docs/05-hci-information-architecture.md)
6. [Technical Requirements](docs/06-technical-requirements.md)
7. [Institutional Brand Book](docs/07-brand-book.md)

## Supporting appendices

- [Competitive Strategy](docs/appendices/competitive-strategy.md)
- [Council of LLMs Concept](docs/appendices/council-of-llms-concept.md)
- [Full Contract-to-Resolution Vision](docs/appendices/full-lifecycle-vision.md)

The seven numbered documents govern the prototype. Appendices record strategy
and future ideas but cannot expand the MVP.
