import { describe, expect, it } from "vitest";
import { deriveCeremonyNotice } from "@/components/evidence-card";
import { getDemoState } from "@/lib/demo-data";

describe("state-derived ceremony notice", () => {
  it("uses the approved precedence without persisting success copy", () => {
    const state = getDemoState();
    expect(deriveCeremonyNotice(state, "")).toBeNull();
    expect(deriveCeremonyNotice(state, "Preparation failed.")).toEqual({ tone: "error", text: "Preparation failed." });

    const hash = "sha256:test";
    state.appointment.manifestHash = hash;
    state.lifecycleStatus = "manifest_prepared";
    expect(deriveCeremonyNotice(state, "Hidden by prepared state.")).toEqual({
      tone: "instruction",
      text: "Configuration Manifest prepared. Both parties must acknowledge this exact digest before the fictional ceremony.",
    });

    state.appointment.simulatedAcknowledgements = { supplier: hash, customer: hash };
    state.lifecycleStatus = "manifest_acknowledged";
    expect(deriveCeremonyNotice(state, "Hidden by acknowledged state.")).toEqual({
      tone: "confirmation",
      text: "Both parties have acknowledged the current configuration manifest. Complete the remaining simulated ceremony checks to continue.",
    });

    state.lifecycleStatus = "appointment_simulated";
    expect(deriveCeremonyNotice(state, "Hidden by completed state.")).toEqual({
      tone: "success",
      text: "Integrity verification passed. Simulated appointment recorded with no legal effect.",
    });
  });
});
