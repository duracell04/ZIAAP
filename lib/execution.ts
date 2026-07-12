import type { ExecutionStatus } from "@/lib/case-model";

export type ExecutionFailureCode =
  | "model_mismatch" | "credentials_unavailable" | "live_execution_disabled"
  | "timeout" | "invalid_output" | "provider_failure" | "configuration_unavailable";

export type ExecutionFailure = {
  executionStatus: "failed";
  code: ExecutionFailureCode;
  reason: string;
  retryable: boolean;
};

export function isSimulationEligible(status: ExecutionStatus) {
  return status === "illustrative_only" || status === "executed_unverified";
}

export function executionFailure(code: ExecutionFailureCode, reason: string, retryable: boolean) {
  return { executionStatus: "failed", code, reason, retryable } satisfies ExecutionFailure;
}

export function failureResponse(failure: ExecutionFailure, status: number) {
  return Response.json(failure, { status });
}
