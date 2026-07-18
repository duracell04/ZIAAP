import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const publicComponentFiles = [
  "components/minimal-demo-opening.tsx",
  "components/minimal-demo-provider.tsx",
  "components/minimal-demo-shell.tsx",
  "components/minimal-demo-stage.tsx",
  "components/minimal-align-screen.tsx",
  "components/minimal-test-screen.tsx",
  "components/minimal-dispute-screen.tsx",
  "components/minimal-review-screen.tsx",
  "components/minimal-outcome-screen.tsx",
  "components/minimal-source-drawer.tsx",
  "components/minimal-feedback.tsx",
  "components/use-delayed-demo-action.ts",
];

function read(path: string) {
  return readFileSync(resolve(root, path), "utf8");
}

describe("hyper-minimal public surface", () => {
  it("publishes the opening, stage, feedback, and preserved reference routes", () => {
    for (const path of [
      "app/demo/page.tsx",
      "app/demo/[stage]/page.tsx",
      "app/feedback/page.tsx",
      "app/reference/page.tsx",
    ]) {
      expect(existsSync(resolve(root, path)), path).toBe(true);
    }
  });

  it("promotes the public walkthrough at the root while preserving the expert reference", () => {
    const rootPage = read("app/page.tsx");
    const referencePage = read("app/reference/page.tsx");
    expect(rootPage).toContain('redirect("/demo")');
    expect(rootPage).not.toContain("DemoWorkspace");
    expect(referencePage).toContain("DemoWorkspace");
    expect(referencePage).toContain("getDemoState");
  });

  it("submits complete feedback through the bounded FormSubmit pilot", () => {
    const feedback = read("components/minimal-feedback.tsx");
    const page = read("app/feedback/page.tsx");
    expect(feedback).toContain('method="POST"');
    expect(feedback).toContain("https://formsubmit.co/enriquegeorg.zbinden@slta.ch");
    expect(feedback).toContain('type="email" name="email" autoComplete="email" required');
    expect(feedback).toContain('<select name="perspective" defaultValue="" required>');
    expect(feedback).toContain('<option value="" disabled>Select your perspective</option>');
    for (const name of ["explanation", "human_control", "adoption_barrier", "potential_saving"]) {
      expect(feedback).toContain(`name="${name}" required`);
    }
    expect(feedback).toContain('name="consent" value="yes" required');
    expect(feedback).toContain('name="_next" value={FEEDBACK_RETURN_URL}');
    expect(feedback).toContain('name="_subject" value="New ZIAAP concept feedback"');
    expect(feedback).toContain('name="_template" value="table"');
    expect(feedback).toContain('name="_honey"');
    expect(feedback).not.toContain("_captcha");
    expect(feedback).not.toContain("localStorage");
    expect(feedback).not.toContain("clipboard");
    expect(feedback).not.toContain("Download JSON");
    expect(feedback).toContain("Thank you. Your feedback has been submitted.");
    expect(feedback).not.toMatch(/feedback (?:has been )?delivered/i);
    expect(page).toContain('submitted={sent === "1"}');
  });

  it("records the temporary processor risk and public-address exposure", () => {
    const governance = read("docs/product/feedback-pilot-governance.md");
    const normalizedGovernance = governance.replace(/\s+/g, " ");
    expect(normalizedGovernance).toContain("Medium privacy and reputational risk");
    expect(normalizedGovernance).toContain("FormSubmit, operated by Devro LABS");
    expect(normalizedGovernance).toContain("retained for 30 days");
    expect(normalizedGovernance).toContain("up to 12 months");
    expect(normalizedGovernance).toContain("must not submit confidential case information");
    expect(normalizedGovernance).toContain("persistent in Git history, forks, mirrors");
    expect(normalizedGovernance).toContain("must be replaced by a processor");
    expect(normalizedGovernance).toContain("does not prove mailbox delivery");
  });

  it("does not call APIs, fetch remote data, or expose a live execution action", () => {
    const publicSurface = publicComponentFiles.map(read).join("\n");
    expect(publicSurface).not.toContain("fetch(");
    expect(publicSurface).not.toContain("XMLHttpRequest");
    expect(publicSurface).not.toContain("WebSocket");
    expect(publicSurface).not.toContain("/api/");
    expect(publicSurface).not.toContain("Run live execution");
  });

  it("keeps sources, uncertainty, contest, and human authority visibly distinct", () => {
    const dispute = read("components/minimal-dispute-screen.tsx");
    const review = read("components/minimal-review-screen.tsx");
    const outcome = read("components/minimal-outcome-screen.tsx");
    const fixture = read("data/minimal-demo-case.json");
    expect(dispute).toContain("AI inference · not an established fact");
    expect(dispute).toContain("Contested by CloudProvider");
    expect(fixture).toContain("Human review required");
    expect(review).toContain("Human in command");
    expect(fixture).toContain("AI-proposed outcome · advisory only");
    expect(review).toContain("Simulated human decision · non-operative");
    expect(outcome).toContain("Human decision · simulated");
  });

  it("uses restrained aviation framing and projects each public step to canonical gates", () => {
    const opening = read("components/minimal-demo-opening.tsx");
    const shell = read("components/minimal-demo-shell.tsx");
    const language = read("lib/product-language.ts");
    expect(opening).toContain("OPERATING_PRINCIPLE");
    expect(opening).not.toMatch(/cockpit dashboard|aircraft control|take off|landing/i);
    expect(shell).toContain("currentStepDefinition.contextLabel");
    expect(language).toContain("canonicalGates");
    expect(language).not.toContain("canonicalStages");
  });

  it("explains the ZIAAP name once in the public opening footer", () => {
    const opening = read("components/minimal-demo-opening.tsx");
    const shell = read("components/minimal-demo-shell.tsx");
    const expertOpening = read("components/opening-experience.tsx");
    const language = read("lib/product-language.ts");

    expect(language).toContain(
      'ZIAAP_ACRONYM_EXPANSION = "Zero-Instance Algorithmic Arbitration Protocol"',
    );
    expect(opening).toContain("<strong>ZIAAP stands for {ZIAAP_ACRONYM_EXPANSION}.</strong>");
    expect(opening).toContain("{ZERO_INSTANCE_EXPLAINER}");
    expect(opening).toContain('<footer className="minimal-opening-footer">');
    expect(opening.indexOf('className="minimal-name-explainer"')).toBeGreaterThan(
      opening.indexOf('className="minimal-opening-steps"'),
    );
    expect(opening.indexOf('className="minimal-name-explainer"')).toBeGreaterThan(
      opening.indexOf("<h1>{PUBLIC_DEMO_HEADLINE}</h1>"),
    );
    expect(shell).not.toContain("ZIAAP_ACRONYM_EXPANSION");
    expect(shell).not.toContain("ZERO_INSTANCE_EXPLAINER");
    expect(opening).toContain("{ZIAAP_TAGLINE}");
    expect(shell).toContain("{ZIAAP_TAGLINE}");
    expect(expertOpening).toContain("{ZIAAP_TAGLINE}");
  });

  it("provides semantic keyboard access and a non-overflowing mobile step projection", () => {
    const shell = read("components/minimal-demo-shell.tsx");
    const drawer = read("components/minimal-source-drawer.tsx");
    const styles = read("app/globals.css");
    expect(shell).toContain('aria-label="Public demonstration progress"');
    expect(shell).toContain('aria-current={active ? "step" : undefined}');
    expect(drawer).toContain('role="dialog"');
    expect(drawer).toContain('aria-modal="true"');
    expect(drawer).toContain("dialogRef.current?.focus()");
    expect(drawer).toContain("previousFocus?.focus()");
    expect(drawer).toContain('aria-label="Close source drawer"');
    expect(drawer).toContain('event.key === "Escape"');
    expect(styles).toContain("@media (max-width: 620px)");
    expect(styles).toMatch(/\.minimal-name-explainer\s*\{[^}]*max-width: 100%;[^}]*font-size: 11px;/);
    expect(styles).toMatch(/\.minimal-stepper\s*\{\s*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/);
  });

  it("persists only the versioned walkthrough state and resets invalid browser data", () => {
    const provider = read("components/minimal-demo-provider.tsx");
    expect(provider).toContain("window.sessionStorage.getItem(MINIMAL_DEMO_STORAGE_KEY)");
    expect(provider).toContain("minimalDemoStateSchema.safeParse");
    expect(provider).toContain("window.sessionStorage.removeItem(MINIMAL_DEMO_STORAGE_KEY)");
    expect(provider).toContain("window.sessionStorage.setItem(MINIMAL_DEMO_STORAGE_KEY");
  });

  it("keeps one clause, one objection, one advisory proposal, and one human modification in the fixture", () => {
    const fixture = JSON.parse(read("data/minimal-demo-case.json")) as {
      clause: { original: string; revised: string };
      dispute: { objection: string };
      review: {
        proposal: { creditPercent: number; creditChf: number };
        humanDecision: { creditPercent: number; creditChf: number };
      };
    };
    expect(Object.keys(fixture.clause)).toEqual(["id", "original", "revised"]);
    expect(fixture.dispute.objection).toContain("assumption is disputed");
    expect(fixture.review.proposal).toMatchObject({ creditPercent: 15, creditChf: 1500 });
    expect(fixture.review.humanDecision).toMatchObject({ creditPercent: 10, creditChf: 1000 });
  });
});
