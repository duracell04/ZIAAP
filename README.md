# ZIAAP

Zero-Instance Algorithmic Arbitration Protocol.

This repository contains the lean scaffold and governing documents for the
hackathon prototype. Application behavior, framework setup, AI, persistence,
authentication, and deployment are not implemented yet.

## Hackathon build compass

> **ZIAAP turns a disputed commercial contract into a source-linked case state, resolves deterministic issues automatically, supports bilateral settlement, and escalates only residual adjudicative questions through a clean human handover.**

The visible demo flow is:

> **Documents in → structured case → mechanical result → settlement proposal → clean human escalation.**

**Humans intervene at consent and legal-authority points, not at every processing step.**

The seven numbered documents are the authoritative specification. Supporting
appendices provide strategy and design ideas but cannot expand the hackathon
scope.

## Repository map

- `docs/` — seven authoritative documents plus non-normative supporting appendices
- `app/` — Next.js pages and API route placeholders
- `components/` — reusable interface component placeholders
- `lib/` — application and domain-logic placeholders
- `data/` — the single demo-case placeholder
- `public/` — public brand assets and demo documents

## Core documents

1. [Project Charter](docs/01-project-charter.md)
2. [Service Blueprint and Legal Process Specification](docs/02-service-blueprint.md)
3. [Legal Governance](docs/03-legal-governance.md)
4. [Product Requirements](docs/04-product-requirements.md)
5. [HCI and Information Architecture](docs/05-hci-information-architecture.md)
6. [Technical Requirements](docs/06-technical-requirements.md)
7. [Institutional Brand Book and Legal Interface Design System](docs/07-brand-book.md)

## Supporting appendices

- [Competitive Strategy](docs/appendices/competitive-strategy.md)
- [Council of LLMs Concept](docs/appendices/council-of-llms-concept.md)
