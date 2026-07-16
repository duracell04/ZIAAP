import { Output, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { alignmentAnalysisSchema, partyProfileSchema } from "@/lib/case-model";
import { getDemoState } from "@/lib/demo-data";
import { executionFailure, failureResponse } from "@/lib/execution";

export const runtime = "nodejs";

const requestSchema = z.object({
  executionMode: z.enum(["illustrative", "live"]),
  parties: z.array(partyProfileSchema).length(2),
});

const liveOutputSchema = z.object({ findings: alignmentAnalysisSchema.shape.findings, sources: alignmentAnalysisSchema.shape.sources });

function illustrativeResponse() {
  const cached = getDemoState().analysis;
  return {
    ...cached,
    metadata: {
      ...cached.metadata,
      executionMode: "illustrative" as const, executionStatus: "illustrative_only" as const,
      label: "Illustrative analysis fixture" as const, artifactId: "alignment-illustrative-v1",
      generatedAt: new Date().toISOString(),
      provenance: "Curated offline synthetic fixture",
    },
  };
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid alignment-analysis request." }, { status: 400 });
  }

  if (parsed.data.executionMode === "illustrative") {
    return Response.json(illustrativeResponse());
  }

  if (process.env.ZIAAP_LIVE_EXECUTION_ENABLED !== "true") return failureResponse(executionFailure("live_execution_disabled", "Live execution is disabled in this concept environment.", false), 403);
  if (!process.env.OPENAI_API_KEY) return failureResponse(executionFailure("credentials_unavailable", "Live analysis credentials are unavailable.", false), 503);

  try {
    const fixture = getDemoState();
    const { output } = await generateText({
      model: openai(process.env.OPENAI_MODEL ?? "gpt-5-mini"),
      output: Output.object({ schema: liveOutputSchema }),
      abortSignal: AbortSignal.timeout(12_000),
      system: [
        "You are a contract-alignment analyst, not an adjudicator.",
        "Compare party expectations for only uptime, consequential-loss allocation, and legal architecture.",
        "Never merge Swiss and English law, select final terms, or state that a clause is enforceable.",
        "Return exactly three source-linked divergence findings with balanced party treatment.",
        "Preserve executable state patches on each option. The recommended uptime option uses thresholdBps 9950, shortfallStepBps 10, creditPercentPerStep 5, capPercent 100, and monthlyFeeChf 10000.",
      ].join(" "),
      prompt: JSON.stringify({
        draftClauses: fixture.clauses,
        partyProfiles: parsed.data.parties,
        curatedLegalSources: fixture.analysis.sources,
      }),
    });

    const analysis = alignmentAnalysisSchema.parse({
      ...output,
      metadata: {
        executionMode: "live", executionStatus: "executed_unverified", artifactId: crypto.randomUUID(),
        label: "Live AI analysis",
        generatedAt: new Date().toISOString(),
        sourceCoverage: "Live comparison grounded in the three curated legal questions; source verification remains visible.",
        provenance: `Live OpenAI execution using ${process.env.OPENAI_MODEL ?? "gpt-5-mini"}`,
      },
    });
    return Response.json(analysis);
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "AbortError" || error.message.toLowerCase().includes("timeout"));
    return failureResponse(executionFailure(timedOut ? "timeout" : "provider_failure", timedOut ? "Live analysis timed out." : "The live analysis provider failed or returned unusable output.", true), timedOut ? 504 : 502);
  }
}
