# ZIAAP

Zero-Instance Algorithmic Arbitration Protocol.

> **The parties design their dispute-resolution system while their interests are still aligned.**

ZIAAP lets contracting parties jointly configure, calibrate, version-lock, and
approve the decision protocol that will govern a later dispute.

## Canonical definition

> **An AI-native, ZIAAP-powered arbitrator is a human arbitrator legally
> appointed by the parties who conducts proceedings through a jointly
> configured, tested, and version-locked ZIAAP decision protocol.**

The allocation of responsibility is exact:

- **Appointed legal actor:** the human arbitrator;
- **Agreed procedural and reasoning system:** the ZIAAP protocol;
- **Operational experience:** agent-first and AI-native;
- **Protocol output:** a provisional proposed determination; and
- **Final enforceable authority:** the human arbitrator, who independently
  reviews, adopts or changes the reasoning, and signs the award.

Do not shorten this model to “AI arbitrator.” Software does not hold arbitral
office or sign an award.

## Demonstrated lifecycle

```text
Align contractual governance
→ configure an Arbitrator Constitution
→ stress-test four hypothetical disputes
→ approve behavior and freeze the exact manifest
→ separately approve and simulate appointment
→ bind a later dispute to that hash
→ optional sealed Settlement Facilitation
→ provisional ZIAAP determination
→ independent human adoption and signature
```

The Swiss SaaS fixture demonstrates a CHF 1,500 deterministic service credit,
blocked conclusions where maintenance evidence is disputed, mandatory-law
escalation, party-label symmetry, and a human-issued award preview.

Alignment, settlement, and arbitration are deliberately separate:

> **Alignment before conflict → optional sealed settlement facilitation →
> binding human-issued arbitration award.**

## Run locally

```powershell
pnpm.cmd install
pnpm.cmd dev
```

Open `http://localhost:3000`. Cached, schema-validated paths support the complete
offline demonstration. Live calls are optional and may act only under the exact
declared model identity. A different model may not silently substitute itself
under a frozen appointment.

## Repository map

- `app/` — Next.js workspace and separate alignment, calibration, settlement,
  legal-source, and dispute route handlers;
- `components/` — five-stage appointment and later-dispute interface;
- `lib/` — schemas, canonical manifest hashing, authority rules, and deterministic calculation;
- `data/` — one validated cross-border SaaS fixture;
- `docs/` — seven authoritative documents plus non-normative appendices; and
- `tests/` — schema, consent, hashing, firewall, appointment, and calculation tests.

## Document authority

1. [Project Charter](docs/01-project-charter.md)
2. [Service Blueprint](docs/02-service-blueprint.md)
3. [Legal Governance](docs/03-legal-governance.md)
4. [Product Requirements](docs/04-product-requirements.md)
5. [HCI and Information Architecture](docs/05-hci-information-architecture.md)
6. [Technical Requirements](docs/06-technical-requirements.md)
7. [Institutional Brand Book](docs/07-brand-book.md)

Appendices preserve future and strategic context but do not expand the MVP.
All confirmations and signatures in this prototype are simulations, not
production electronic signatures or a production arbitration service.
