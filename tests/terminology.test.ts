import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  CANONICAL_PRODUCT_DEFINITION,
  CURRENT_ARTIFACT_CLASSIFICATION,
  CURRENT_MATURITY_LEVEL,
  DIGITAL_TWIN_BOUNDARY,
  LIFECYCLE_STAGES,
  MATTER_GATES,
  PROTOCOL_LAYERS,
  PUBLIC_DEMO_ARBITRATION_EXPLAINER,
  PUBLIC_DEMO_AUTHORITY_LINE,
  PUBLIC_DEMO_DESCRIPTION,
  PUBLIC_DEMO_DISCLAIMER,
  PUBLIC_DEMO_HEADLINE,
  PUBLIC_DEMO_STEPS,
  PRODUCT_PROMISE,
  RESOLUTION_OFFICER_DEFINITION,
} from "@/lib/product-language";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rules = JSON.parse(readFileSync(resolve(root, "config/terminology-rules.json"), "utf8")) as {
  requiredPhrases: string[];
  forbiddenPhrases: string[];
};

const narrativeFiles = [
  "README.md",
  "docs/00-product-charter.md",
  "docs/review/guided-reviewer-script.md",
  "docs/review/reviewer-questionnaire.md",
  "docs/review/expert-feedback-instructions.md",
  "docs/review/review-invitation.md",
  "docs/review/local-demonstration-procedure.md",
  "components/opening-experience.tsx",
  "components/demo-workspace.tsx",
  "components/dossier-view.tsx",
  "components/case-map.tsx",
  "components/reasoning-card.tsx",
  "components/evidence-card.tsx",
  "components/decision-panel.tsx",
  "components/minimal-demo-opening.tsx",
  "components/minimal-demo-shell.tsx",
  "components/minimal-align-screen.tsx",
  "components/minimal-test-screen.tsx",
  "components/minimal-dispute-screen.tsx",
  "components/minimal-review-screen.tsx",
  "components/minimal-outcome-screen.tsx",
  "components/minimal-feedback.tsx",
  "app/layout.tsx",
  "app/api/analyze/route.ts",
  "app/api/calibrate/route.ts",
  "app/api/dispute-preview/route.ts",
  "app/api/legal-source/route.ts",
  "data/demo-case.json",
  "lib/case-model.ts",
  "lib/dossier.ts",
  "lib/product-language.ts",
  "lib/prompts.ts",
  "lib/protocol.ts",
  "lib/minimal-demo.ts",
  "docs/review/public-demo-comprehension-script.md",
];

function read(path: string) {
  return readFileSync(resolve(root, path), "utf8");
}

describe("Sprint 0 product language", () => {
  it("locks the canonical proposition, current classification, and process-twin boundary", () => {
    expect(PRODUCT_PROMISE).toBe("Test your dispute-resolution system before you sign the contract.");
    expect(CANONICAL_PRODUCT_DEFINITION).toContain("AI Resolution Officer");
    expect(CANONICAL_PRODUCT_DEFINITION).toContain("human arbitrator who retains legal authority");
    expect(CURRENT_ARTIFACT_CLASSIFICATION.toLowerCase()).toContain("workflow and interaction fidelity");
    expect(CURRENT_MATURITY_LEVEL).toBe("C0");
    expect(RESOLUTION_OFFICER_DEFINITION).toContain("not a legal office");
    expect(DIGITAL_TWIN_BOUNDARY).toContain("not a predictor of the future result");
  });

  it("uses one three-layer and six-gate operating model in the expert experience", () => {
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
    const opening = read("components/opening-experience.tsx");
    const workspace = read("components/demo-workspace.tsx");
    expect(opening).toContain("MATTER_GATES.map");
    expect(workspace).toContain("MATTER_GATES.map");
  });

  it("projects the canonical lifecycle into one plain-language public walkthrough", () => {
    expect(PUBLIC_DEMO_HEADLINE).toBe("Agree the rules before the dispute.");
    expect(PUBLIC_DEMO_ARBITRATION_EXPLAINER).toContain("outside court");
    expect(PUBLIC_DEMO_DESCRIPTION).toContain("source-linked case");
    expect(PUBLIC_DEMO_AUTHORITY_LINE).toBe("AI prepares. Parties can challenge. A human arbitrator decides.");
    expect(PUBLIC_DEMO_DISCLAIMER).toBe("Synthetic demonstration · No legal effect · AI output is illustrative.");
    expect(PUBLIC_DEMO_STEPS.map((step) => step.label)).toEqual([
      "Align",
      "Test",
      "Dispute",
      "Review",
      "Outcome",
    ]);
    expect(new Set(PUBLIC_DEMO_STEPS.flatMap((step) => step.canonicalStages))).toEqual(
      new Set(LIFECYCLE_STAGES.map((stage) => stage.id)),
    );
  });

  it("keeps prohibited legacy claims out of normative public narratives", () => {
    const narratives = narrativeFiles.map((path) => `\nFILE:${path}\n${read(path)}`).join("\n").toLowerCase();
    for (const phrase of rules.forbiddenPhrases) {
      expect(narratives, `prohibited phrase: ${phrase}`).not.toContain(phrase.toLowerCase());
    }
    expect(read("data/demo-case.json")).toContain("fictional identity used only in this simulation-only concept demonstrator");
  });

  it("publishes every required phrase in canonical product materials", () => {
    const canonical = [
      read("README.md"),
      read("docs/00-product-charter.md"),
      read("docs/product/glossary.md"),
      read("lib/product-language.ts"),
    ].join("\n").toLowerCase();
    for (const phrase of rules.requiredPhrases) {
      expect(canonical, `required phrase: ${phrase}`).toContain(phrase.toLowerCase());
    }
  });

  it("links the charter to every required Sprint 0 artifact", () => {
    const charter = read("docs/00-product-charter.md");
    const links = [
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

  it("maps maturity, claims, and scorecard evidence without inventing approval", () => {
    const maturity = read("docs/product/maturity-model.md");
    for (const level of ["C0", "C1", "P1", "P2", "P3", "V1", "R1"]) expect(maturity).toContain(`| ${level} |`);

    const claims = read("docs/product/claims-register.md");
    const claimRows = claims.split(/\r?\n/).filter((line) => /^\| CL-\d{3} \|/.test(line));
    expect(claimRows).toHaveLength(12);
    for (const row of claimRows) {
      const fields = row.split("|").slice(1, -1).map((field) => field.trim());
      expect(fields).toHaveLength(9);
      expect(fields.every(Boolean)).toBe(true);
    }

    const scorecard = read("docs/product/release-scorecard.md");
    for (const dimension of ["Product", "Technical", "Legal", "UX", "Evaluation"]) expect(scorecard).toContain(`| ${dimension} |`);
    expect(scorecard).toContain("Product/founder approval");
    expect(scorecard).toContain("Legal-framing and authority-boundary review");
    expect(scorecard).not.toContain("Legal-lead approval");
    expect(scorecard).toContain("Sprint 0 corrected concept candidate, internally verified; external acceptance pending");
    expect(scorecard).toContain("Unchecked human-evidence items must remain pending");
  });
});
