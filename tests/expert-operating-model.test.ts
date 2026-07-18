import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function read(path: string) {
  return readFileSync(resolve(root, path), "utf8");
}

describe("expert six-gate composition", () => {
  it("uses six existing screens with Configuration combining control-plane and scenario work", () => {
    const workspace = read("components/demo-workspace.tsx");
    expect(workspace).toContain("const steps = MATTER_GATES.map");
    expect(workspace).toContain("step === 1");
    expect(workspace).toContain("<ConstitutionBuilder");
    expect(workspace).toContain("<ValidationLab embedded");
    expect(workspace).toContain('mode="production"');
    expect(workspace).toContain('mode="adjudication"');
  });

  it("separates structured case production from independent adjudication", () => {
    const panel = read("components/decision-panel.tsx");
    expect(panel).toContain("The memorandum is not the case.");
    expect(panel).toContain("request more evidence");
    expect(panel.indexOf("Human pre-assessment · first")).toBeLessThan(
      panel.indexOf("Advisory reasoning memorandum · second"),
    );
    expect(panel.indexOf("Advisory reasoning memorandum · second")).toBeLessThan(
      panel.indexOf("Human control · third"),
    );
  });

  it("presents Gate 6 as a simulated outcome and event-derived black box", () => {
    const dossier = read("components/dossier-view.tsx");
    expect(dossier).toContain("Simulated Outcome & Procedural Black Box");
    expect(dossier).toContain("buildProceduralBlackBox");
    expect(dossier).toContain("Generated from recorded events");
    expect(dossier).toContain("private deliberation included: no");
  });
});
