import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CANONICAL_PRODUCT_DEFINITION,
  CATEGORY_THESIS,
  CURRENT_ARTIFACT_CLASSIFICATION,
  CURRENT_MATURITY_LEVEL,
  CURRENT_PRODUCT_NAME,
  DIGITAL_TWIN_BOUNDARY,
  MATTER_GATES,
  NEUTRALITY_PRINCIPLE,
  PILOT_01_DEFINITION,
  PROTOCOL_LAYERS,
  PUBLIC_DEMO_AUTHORITY_LINE,
  PUBLIC_DEMO_DESCRIPTION,
  PUBLIC_DEMO_DISCLAIMER,
  PUBLIC_DEMO_HEADLINE,
  PUBLIC_DEMO_PRODUCT_BOUNDARY,
  PUBLIC_DEMO_STEPS,
  PRODUCT_PROMISE,
  RESOLUTION_OFFICER_DEFINITION,
  ZERO_INSTANCE_EXPLAINER,
  ZIAAP_ACRONYM_EXPANSION,
  ZIAAP_TAGLINE,
} from "@/lib/product-language";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rules = JSON.parse(readFileSync(resolve(root, "config/terminology-rules.json"), "utf8")) as {
  requiredPhrases: string[];
  forbiddenPhrases: string[];
};

const activeNarrativeFiles = [
  "README.md",
  "docs/00-product-charter.md",
  "docs/product/pilot-01-protocol.md",
  "docs/product/operating-model.md",
  "docs/product/glossary.md",
  "docs/product/release-scorecard.md",
  "docs/reference/brand-book.md",
  "docs/reference/current-product-requirements.md",
  "docs/reference/current-technical-requirements.md",
  "docs/reference/current-service-blueprint.md",
  "docs/reference/current-legal-governance.md",
  "docs/reference/hci-information-architecture.md",
  "components/opening-experience.tsx",
  "components/minimal-demo-opening.tsx",
  "components/minimal-demo-shell.tsx",
  "components/minimal-align-screen.tsx",
  "components/minimal-test-screen.tsx",
  "components/minimal-dispute-screen.tsx",
  "components/minimal-review-screen.tsx",
  "components/minimal-outcome-screen.tsx",
  "app/layout.tsx",
  "lib/product-language.ts",
];

function read(path: string) {
  return readFileSync(resolve(root, path), "utf8");
}

function normalize(value: string) {
  return value.replace(/\s+/g, " ");
}

describe("canonical product language", () => {
  it("defines Contract Alignment without transferring authority to software", () => {
    expect(CURRENT_PRODUCT_NAME).toBe("ZIAAP Contract Alignment");
    expect(CATEGORY_THESIS).toBe("Computational Private Ordering");
    expect(PRODUCT_PROMISE).toBe("Align material contract expectations before you sign.");
    expect(CANONICAL_PRODUCT_DEFINITION).toContain("scenario-based contract-alignment system");
    expect(CANONICAL_PRODUCT_DEFINITION).toContain("selected clauses");
    expect(CANONICAL_PRODUCT_DEFINITION).toContain("deliberately left open");
    expect(PILOT_01_DEFINITION).toContain("enterprise systems-integration MSAs");
    expect(NEUTRALITY_PRINCIPLE).toContain("does not exercise mediation");
    expect(NEUTRALITY_PRINCIPLE).toContain("adjudicative");
    expect(CURRENT_ARTIFACT_CLASSIFICATION.toLowerCase()).toContain("workflow and interaction fidelity");
    expect(CURRENT_MATURITY_LEVEL).toBe("C0");
    expect(RESOLUTION_OFFICER_DEFINITION).toContain("not a legal office");
  });

  it("preserves the Zero Instance name and process-twin boundary as architecture", () => {
    expect(ZIAAP_ACRONYM_EXPANSION).toBe("Zero-Instance Algorithmic Arbitration Protocol");
    expect(ZERO_INSTANCE_EXPLAINER).toContain("pre-conflict stage");
    expect(ZIAAP_TAGLINE).toBe("Contract alignment, made inspectable");
    expect(DIGITAL_TWIN_BOUNDARY).toContain("not a predictor of the future result");

    const glossary = read("docs/product/glossary.md");
    const operatingModel = read("docs/product/operating-model.md");
    expect(glossary).toContain("it does not grant AI arbitral authority");
    expect(glossary).toContain("Do not hyphenate the standalone concept");
    expect(operatingModel).toContain("Independent human arbitrators");
    expect(operatingModel).toContain("does not grant AI arbitral authority");
  });

  it("retains the three-layer and six-gate long-term architecture", () => {
    expect(PROTOCOL_LAYERS.map((layer) => layer.label)).toEqual([
      "I0 · Flight Plan",
      "I1 · Cockpit",
      "I2 · Captain in Command",
    ]);
    expect(MATTER_GATES.map((gate) => gate.label)).toEqual([
      "Alignment",
      "Configuration",
      "Appointment & Configuration Freeze",
      "Case Production",
      "Independent Adjudication",
      "Award & Black Box",
    ]);
    expect(read("components/opening-experience.tsx")).toContain("MATTER_GATES.map");
    expect(read("components/demo-workspace.tsx")).toContain("MATTER_GATES.map");
  });

  it("marks the public walkthrough as two current steps and three future extensions", () => {
    expect(PUBLIC_DEMO_HEADLINE).toBe("Align expectations before you sign.");
    expect(PUBLIC_DEMO_PRODUCT_BOUNDARY).toContain("current product ends with a versioned alignment record");
    expect(PUBLIC_DEMO_DESCRIPTION).toContain("operational scenarios");
    expect(PUBLIC_DEMO_AUTHORITY_LINE).toBe("AI structures scenarios. Each party confirms its own position.");
    expect(PUBLIC_DEMO_DISCLAIMER).toBe("Synthetic demonstration · No legal effect · AI output is illustrative.");
    expect(PUBLIC_DEMO_STEPS.map((step) => step.label)).toEqual([
      "Align",
      "Test scenarios",
      "Structure dispute",
      "Human review",
      "Procedural record",
    ]);
    expect(PUBLIC_DEMO_STEPS.map((step) => step.commercialStatus)).toEqual([
      "current_product",
      "current_product",
      "future_extension",
      "future_extension",
      "future_extension",
    ]);
    expect(PUBLIC_DEMO_STEPS.flatMap((step) => step.canonicalGates)).toEqual([
      "alignment",
      "configuration",
      "case_production",
      "independent_adjudication",
      "award_black_box",
    ]);
    expect(PUBLIC_DEMO_STEPS.flatMap((step) => step.canonicalGates)).not.toContain(
      "appointment_configuration_freeze",
    );
  });

  it("keeps prohibited claims out of active public and normative surfaces", () => {
    const narratives = activeNarrativeFiles
      .map((path) => `\nFILE:${path}\n${read(path)}`)
      .join("\n")
      .toLowerCase();
    for (const phrase of rules.forbiddenPhrases) {
      expect(narratives, `prohibited phrase: ${phrase}`).not.toContain(phrase.toLowerCase());
    }
  });

  it("publishes every required phrase in canonical product materials", () => {
    const canonical = normalize([
      read("README.md"),
      read("docs/00-product-charter.md"),
      read("docs/product/pilot-01-protocol.md"),
      read("docs/product/glossary.md"),
      read("lib/product-language.ts"),
    ].join("\n")).toLowerCase();
    for (const phrase of rules.requiredPhrases) {
      expect(canonical, `required phrase: ${phrase}`).toContain(normalize(phrase).toLowerCase());
    }
  });

  it("links the charter to every canonical strategy artifact", () => {
    const charter = read("docs/00-product-charter.md");
    const links = [
      "docs/product/pilot-01-protocol.md",
      "docs/product/operating-model.md",
      "docs/product/maturity-model.md",
      "docs/product/glossary.md",
      "docs/product/claims-register.md",
      "docs/product/release-scorecard.md",
      "docs/roadmap/ZIAAP_Concept_to_Validated_Product_Technical_Roadmap_v1.1.md",
    ];
    for (const target of links) {
      expect(existsSync(resolve(root, target))).toBe(true);
      expect(charter).toContain(target.replace(/^docs\//, ""));
    }
  });

  it("specifies Pilot 01 scope, state, status taxonomy, failure paths and thresholds", () => {
    const protocol = read("docs/product/pilot-01-protocol.md");
    const normalized = normalize(protocol);
    for (const state of [
      "MATTER_ACCEPTED",
      "CLAUSES_SELECTED",
      "SCENARIOS_APPROVED",
      "RESPONSES_SEALED",
      "RESPONSES_CONFIRMED",
      "DIVERGENCE_REVEALED",
      "RESOLVED",
      "CONSCIOUSLY_OPEN",
      "DEFERRED",
      "NON_BINDING_RECORD",
      "INTERPRETIVE_ANNEX",
      "INCORPORATED_TERM",
      "VERSION_LOCKED",
    ]) expect(protocol).toContain(state);
    for (const recordKind of [
      "private_exploratory_response",
      "sealed_party_response",
      "disclosed_party_position",
      "ai_normalisation",
      "party_confirmed_position",
      "identified_divergence",
      "acknowledged_assumption",
      "consciously_unresolved_issue",
      "agreed_operating_outcome",
      "interpretive_annex",
      "incorporated_contract_term",
    ]) expect(protocol).toContain(recordKind);
    for (const excluded of [
      "commodity SaaS terms",
      "general industrial supply",
      "construction",
      "employment",
      "consumer contracts",
      "active mediation",
      "active arbitration",
    ]) expect(normalized).toContain(excluded);
    expect(normalized).toContain("three to five high-impact clauses");
    expect(normalized).toContain("five to ten bounded operational scenarios");
    expect(normalized).toContain("Every transition requires an attributable human act");
    expect(normalized).toContain("at least two of four Track B matters");
    expect(normalized).toContain("median party participation is below 90 minutes");
    expect(normalized).toContain("at least half of material divergences");
    expect(normalized).toContain("one authorised paid follow-on commitment");
    expect(protocol).toContain("| Hold | A data or authority failure, premature reveal");
  });

  it("maps claims and scorecard evidence without inventing approval", () => {
    const maturity = read("docs/product/maturity-model.md");
    for (const level of ["C0", "C1", "P1", "P2", "P3", "V1", "R1"]) {
      expect(maturity).toContain(`| ${level} |`);
    }

    const claims = read("docs/product/claims-register.md");
    const claimRows = claims.split(/\r?\n/).filter((line) => /^\| CL-\d{3} \|/.test(line));
    expect(claimRows).toHaveLength(29);
    for (const id of ["CL-025", "CL-026", "CL-027", "CL-028", "CL-029"]) {
      expect(claims).toContain(`| ${id} |`);
    }
    for (const row of claimRows) {
      const fields = row.split("|").slice(1, -1).map((field) => field.trim());
      expect(fields).toHaveLength(9);
      expect(fields.every(Boolean)).toBe(true);
    }

    const scorecard = read("docs/product/release-scorecard.md");
    expect(scorecard).toContain("Product-direction decision | Approved 2026-07-24");
    expect(scorecard).toContain("Legal-framing and authority-boundary review | Pending");
    expect(scorecard).toContain("Four Track B shadow matters | Not started; not authorised");
    expect(scorecard).toContain("Unchecked human-evidence items must remain pending");
  });

  it("preserves old strategy as dated history and rebaselines downstream roadmap work", () => {
    const historicalPlan = read("docs/product/feedback-disposition-and-validation-plan.md");
    expect(historicalPlan).toContain("Supersession notice — 2026-07-24");
    expect(normalize(historicalPlan)).toContain(
      "preserved as historical research input and not authoritative for current product selection or Pilot 01",
    );
    expect(historicalPlan).toContain("pilot-01-protocol.md");

    const roadmap = read("docs/roadmap/ZIAAP_Concept_to_Validated_Product_Technical_Roadmap_v1.1.md");
    expect(roadmap).toContain("Sprint 13: Vertical rule pack for enterprise systems integration");
    expect(roadmap).toContain("Sprints 20 to 28 only after an I0 Go/Narrow decision");
    expect(roadmap).toContain("Sprint 31: ZIAAP Contract Alignment Pilot 01");
    expect(roadmap).toContain("Sprint 32: Contract-platform integrations");
  });

  it("uses the corrected fact-specific legal and regulatory formulations", () => {
    const governance = normalize(read("docs/reference/current-legal-governance.md"));
    expect(governance).toContain("fact-sensitive standards");
    expect(governance).toContain("does not make an award automatically invalid");
    expect(governance).toContain("Article 107");
    expect(governance).toContain("does not impose universal physical destruction");
    expect(governance).toContain("took effect on 1 March 2026");
    for (const article of ["Article 11", "Article 23", "Article 45", "Article 46", "Article 82"]) {
      expect(governance).toContain(article);
    }
    expect(governance).toContain("Articles 2 and 17");
    expect(governance).toContain("intended purpose and actual influence");
    expect(governance).toContain("cannot be made ancillary merely by calling it administrative software");
  });

  it("keeps superseded six-stage labels out of current normative surfaces", () => {
    const currentNormative = activeNarrativeFiles.map(read).join("\n");
    for (const legacyStage of [
      "Party Alignment",
      "Protocol Constitution",
      "Scenario Laboratory",
      "Later Synthetic Dispute",
      "Audit Dossier",
    ]) {
      expect(currentNormative, legacyStage).not.toContain(legacyStage);
    }
  });
});
