import type { ServiceCreditRule } from "@/lib/case-model";

export type ServiceCreditResult = {
  status: "calculated" | "blocked";
  materialStatus: "reproducible_calculation";
  formula: string;
  completeSteps: number | null;
  creditPercent: number | null;
  creditChf: number | null;
  explanation: string;
};

export function calculateServiceCredit(rule: ServiceCreditRule | null, actualUptimeBps: number | null, inputsConfirmed: boolean): ServiceCreditResult {
  if (!rule || actualUptimeBps === null || !inputsConfirmed) {
    return { status: "blocked", materialStatus: "reproducible_calculation", formula: "monthly fee × complete shortfall steps × credit per step", completeSteps: null, creditPercent: null, creditChf: null, explanation: "Calculation is blocked until the executable rule and every material input are confirmed." };
  }
  const shortfallBps = Math.max(0, rule.thresholdBps - actualUptimeBps);
  const completeSteps = Math.floor(shortfallBps / rule.shortfallStepBps);
  const creditPercent = Math.min(rule.capPercent, completeSteps * rule.creditPercentPerStep);
  const creditChf = Math.round(rule.monthlyFeeChf * creditPercent) / 100;
  return {
    status: "calculated",
    materialStatus: "reproducible_calculation",
    formula: `${completeSteps} × ${rule.creditPercentPerStep}% × CHF ${rule.monthlyFeeChf.toLocaleString()}`,
    completeSteps,
    creditPercent,
    creditChf,
    explanation: `${(actualUptimeBps / 100).toFixed(2)}% is ${shortfallBps / 100} percentage points below the ${(rule.thresholdBps / 100).toFixed(2)}% threshold.`,
  };
}
