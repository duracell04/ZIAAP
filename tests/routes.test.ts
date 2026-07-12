import { afterEach, describe, expect, it } from "vitest";
import { POST as analyze } from "@/app/api/analyze/route";
import { POST as calibrate } from "@/app/api/calibrate/route";
import { getDemoState } from "@/lib/demo-data";

const originalEnv = { ...process.env };
afterEach(() => { process.env = { ...originalEnv }; });

function request(path: string, body: unknown) {
  return new Request(`http://localhost${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

describe("fail-closed execution routes", () => {
  it("returns illustrative output only through the explicit illustrative action", async () => {
    const state = getDemoState();
    const response = await analyze(request("/api/analyze", { executionMode: "illustrative", parties: state.parties }));
    const payload = await response.json();
    expect(response.status).toBe(200);
    expect(payload.metadata).toMatchObject({ executionMode: "illustrative", executionStatus: "illustrative_only", label: "Illustrative analysis fixture" });
  });

  it("does not return fallback success when live execution is disabled", async () => {
    delete process.env.ZIAAP_LIVE_EXECUTION_ENABLED;
    const state = getDemoState();
    const response = await calibrate(request("/api/calibrate", { executionMode: "live", constitution: state.constitution, scenarios: state.calibrationScenarios }));
    const payload = await response.json();
    expect(response.status).toBe(403);
    expect(payload).toMatchObject({ executionStatus: "failed", code: "live_execution_disabled" });
    expect(payload).not.toHaveProperty("results");
  });

  it("fails on model mismatch without returning an illustrative artifact", async () => {
    process.env.ZIAAP_LIVE_EXECUTION_ENABLED = "true";
    process.env.OPENAI_API_KEY = "test-key";
    process.env.OPENAI_MODEL = "different-model";
    const state = getDemoState();
    const response = await calibrate(request("/api/calibrate", { executionMode: "live", constitution: state.constitution, scenarios: state.calibrationScenarios }));
    const payload = await response.json();
    expect(response.status).toBe(409);
    expect(payload).toMatchObject({ executionStatus: "failed", code: "model_mismatch" });
    expect(payload).not.toHaveProperty("results");
  });
});
