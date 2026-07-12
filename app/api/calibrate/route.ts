import { Output, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { arbitratorConstitutionSchema, calibrationResultSchema, calibrationScenarioSchema } from "@/lib/case-model";
import { executionFailure, failureResponse } from "@/lib/execution";

export const runtime = "nodejs";

const requestSchema = z.object({
  executionMode: z.enum(["illustrative", "live"]), constitution: arbitratorConstitutionSchema,
  scenarios: z.array(calibrationScenarioSchema).length(4),
});

const generatedResultSchema = calibrationResultSchema.omit({ artifactId: true, executionStatus: true });
const outputSchema = z.object({
  results: z.array(z.object({ scenarioId: z.string(), result: generatedResultSchema })).length(4),
});

function cachedResults(scenarios: z.infer<typeof calibrationScenarioSchema>[]) {
  return scenarios.map((scenario) => {
    const content = {
      mechanical: {
        summary: "The protocol used the accepted formula and confirmed inputs.",
        behavior: "Separated the CHF 1,500 calculation from disputed liability and displayed every arithmetic step.",
        outcome: "CHF 1,500 reproducible service credit; no broader liability conclusion.",
      },
      evidence: {
        summary: "The protocol detected a disputed premise and stopped authoritative calculation.",
        behavior: "Preserved both positions, requested the notice record, and required an opportunity for both parties to respond.",
        outcome: "No maintenance exclusion determined until the missing evidence is addressed.",
      },
      mandatory_law: {
        summary: "The protocol isolated the mandatory-law constraint.",
        behavior: "Compared the positions without asserting enforceability and flagged independent human judgment.",
        outcome: "Provisional issue structure for the human arbitrator; no autonomous legal conclusion.",
      },
      symmetry: {
        summary: "The mirrored run applied equivalent procedural treatment.",
        behavior: "Source scrutiny, notice, response rights, and escalation remained unchanged after party labels were swapped.",
        outcome: "Symmetry check passed with no role-based preference.",
      },
    }[scenario.category];
    return {
      scenarioId: scenario.id,
      result: { ...content, safeguardsObserved: scenario.requiredSafeguards, limitations: ["Curated synthetic fixture; not independently evaluated."], artifactId: `${scenario.id}-illustrative-v1`, executionStatus: "illustrative_only" as const, materialStatus: "calibration_result" as const },
    };
  });
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid validation request." }, { status: 400 });
  const illustrative = () => ({ results: cachedResults(parsed.data.scenarios), metadata: { executionMode: "illustrative", executionStatus: "illustrative_only", label: "Illustrative stress-test fixture", provenance: "Curated offline synthetic fixture" } });
  if (parsed.data.executionMode === "illustrative") return Response.json(illustrative());

  const configuredModel = process.env.OPENAI_MODEL ?? "gpt-5-mini";
  if (process.env.ZIAAP_LIVE_EXECUTION_ENABLED !== "true") return failureResponse(executionFailure("live_execution_disabled", "Live execution is disabled in this showcase environment.", false), 403);
  if (!process.env.OPENAI_API_KEY) return failureResponse(executionFailure("credentials_unavailable", "Live execution credentials are unavailable.", false), 503);
  if (configuredModel !== parsed.data.constitution.protocolIdentity.model) return failureResponse(executionFailure("model_mismatch", "The available model does not match the declared protocol configuration.", false), 409);

  try {
    const { output } = await generateText({
      model: openai(configuredModel), output: Output.object({ schema: outputSchema }), abortSignal: AbortSignal.timeout(12_000),
      system: "Exercise a candidate ZIAAP decision protocol against supplied hypothetical scenarios. Report observed behavior and limitations without assigning a validation or authoritative pass verdict. Do not decide a real dispute or modify model weights.",
      prompt: JSON.stringify({ constitution: parsed.data.constitution, scenarios: parsed.data.scenarios }),
    });
    return Response.json({ results: output.results.map((item) => ({ ...item, result: { ...item.result, artifactId: `${item.scenarioId}-live-${crypto.randomUUID()}`, executionStatus: "executed_unverified" } })), metadata: { executionMode: "live", executionStatus: "executed_unverified", label: "Live stress-test execution", provenance: `Live OpenAI execution using ${configuredModel}` } });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "AbortError" || error.message.toLowerCase().includes("timeout"));
    return failureResponse(executionFailure(timedOut ? "timeout" : "provider_failure", timedOut ? "Live stress-test execution timed out." : "The live provider failed or returned unusable output.", true), timedOut ? 504 : 502);
  }
}
