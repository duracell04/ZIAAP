import { Output, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { alignmentAnalysisSchema, partyProfileSchema } from "@/lib/case-model";
import { getDemoState } from "@/lib/demo-data";

export const runtime = "nodejs";

const requestSchema = z.object({
  mode: z.enum(["cached", "live"]),
  parties: z.array(partyProfileSchema).length(2),
});

const liveOutputSchema = alignmentAnalysisSchema.omit({ metadata: true });

function cachedResponse(notice?: string) {
  const cached = getDemoState().analysis;
  return {
    ...cached,
    metadata: {
      ...cached.metadata,
      mode: notice ? ("fallback" as const) : ("cached" as const),
      label: "Cached verified fallback" as const,
      generatedAt: new Date().toISOString(),
      notice,
    },
  };
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid alignment-analysis request." }, { status: 400 });
  }

  if (parsed.data.mode === "cached") {
    return Response.json(cachedResponse());
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(cachedResponse("Live analysis is unavailable; the validated cached analysis was restored."));
  }

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
        mode: "live",
        label: "Live AI analysis",
        generatedAt: new Date().toISOString(),
        sourceCoverage: "Live comparison grounded in the three curated legal questions; source verification remains visible.",
      },
    });
    return Response.json(analysis);
  } catch {
    return Response.json(cachedResponse("Live analysis timed out or failed schema validation; the validated cached analysis was restored."));
  }
}
