import { describe, expect, it } from "vitest";
import { calculateServiceCredit } from "@/lib/scenario";
import type { ServiceCreditRule } from "@/lib/case-model";

const rule: ServiceCreditRule = { thresholdBps: 9950, shortfallStepBps: 10, creditPercentPerStep: 5, capPercent: 100, monthlyFeeChf: 10000 };

describe("deterministic SLA scenario", () => {
  it("calculates CHF 1,500 for three complete 0.1-point shortfall steps", () => {
    const result = calculateServiceCredit(rule, 9920, true);
    expect(result).toMatchObject({ status: "calculated", completeSteps: 3, creditPercent: 15, creditChf: 1500, materialStatus: "reproducible_calculation" });
  });

  it("counts only complete 0.1-point steps", () => {
    expect(calculateServiceCredit(rule, 9929, true).completeSteps).toBe(2);
  });

  it("enforces the contractual 100% cap", () => {
    expect(calculateServiceCredit(rule, 7000, true).creditChf).toBe(10000);
  });

  it("blocks calculation when inputs are disputed", () => {
    expect(calculateServiceCredit(rule, 9920, false)).toMatchObject({ status: "blocked", creditChf: null });
  });
});
