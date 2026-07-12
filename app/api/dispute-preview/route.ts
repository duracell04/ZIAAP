import { Output, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { contractStateSchema, proposedDeterminationSchema } from "@/lib/case-model";
import { buildAdjudicationInput, buildProtocolManifest, computeProtocolHash } from "@/lib/protocol";
import { executionFailure, failureResponse } from "@/lib/execution";

export const runtime = "nodejs";

function cachedDetermination(hash: string) {
  return proposedDeterminationSchema.parse({
    id: "determination-outage-001", appointmentHash: hash,
    issues: ["Contractual service credit", "Maintenance exclusion", "Causation and claimed loss", "Effect of the liability limitation"],
    findings: [
      "The confirmed 99.2% uptime input produces a CHF 1,500 service credit under the frozen formula.",
      "The maintenance exclusion cannot be determined on the current record because notice evidence is incomplete.",
      "Gross negligence, causation, and the mandatory-law effect on the limitation require independent human judgment.",
    ],
    sourceIds: ["source-draft-sla", "source-co-100", "source-swiss-model-clause"],
    counterarguments: ["Supplier disputes causation and gross negligence.", "Customer disputes timely maintenance notice and reliance on the limitation."],
    uncertainty: ["The authenticated maintenance notice log is missing.", "The complete incident-response timeline is incomplete."],
    escalationFlags: ["mandatory_law", "disputed_fact", "causation", "human_independent_judgment"],
    reasoningSummary: "The frozen protocol resolves the mechanical credit, preserves disputed propositions, and presents the residual issues without using settlement content.",
    proposedDisposition: "Illustrate the CHF 1,500 contractual credit. Reserve all additional liability, causation, and limitation issues for future independent human determination on a completed record.",
    materialStatus: "proposed_determination", independentLegalEffect: false,
    metadata: { executionMode: "illustrative", executionStatus: "illustrative_only", artifactId: "determination-illustrative-v1", label: "Illustrative protocol determination", provenance: "Curated offline synthetic fixture" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const executionMode = body?.executionMode;
  const parsed = contractStateSchema.safeParse(body?.state);
  if (!parsed.success || (executionMode !== "illustrative" && executionMode !== "live")) return Response.json({ error: "Invalid dispute-preview request." }, { status: 400 });
  const state = parsed.data;
  if (state.lifecycleStatus !== "appointment_simulated" || !state.appointment.manifestHash) return Response.json({ error: "A simulated appointment under the acknowledged protocol manifest is required." }, { status: 409 });
  if (state.settlement.status === "settled") return Response.json({ error: "The dispute is settled; adjudication cannot continue." }, { status: 409 });
  const hash = await computeProtocolHash(buildProtocolManifest(state));
  if (hash !== state.appointment.manifestHash || state.dispute.appointmentHash !== hash) return Response.json({ error: "The active dispute is not bound to the frozen appointment package." }, { status: 409 });
  const cached = cachedDetermination(hash);
  if (executionMode === "illustrative") return Response.json(cached);

  const configuredModel = process.env.OPENAI_MODEL ?? "gpt-5-mini";
  if (process.env.ZIAAP_LIVE_EXECUTION_ENABLED !== "true") return failureResponse(executionFailure("live_execution_disabled", "Live execution is disabled in this showcase environment.", false), 403);
  if (!process.env.OPENAI_API_KEY) return failureResponse(executionFailure("credentials_unavailable", "Live execution credentials are unavailable.", false), 503);
  if (configuredModel !== state.constitution.protocolIdentity.model) return failureResponse(executionFailure("model_mismatch", "The available model does not match the declared protocol manifest.", false), 409);

  try {
    const { output } = await generateText({
      model: openai(configuredModel), output: Output.object({ schema: proposedDeterminationSchema.omit({ metadata: true }) }), abortSignal: AbortSignal.timeout(12_000),
      system: "Operate only as the simulation-only ZIAAP protocol identified by the exact manifest. Produce a provisional synthetic determination without independent legal effect. Preserve equality, sources, objections, uncertainty, and future mandatory human judgment. Never use settlement proposals, concessions, or responses.",
      prompt: JSON.stringify(buildAdjudicationInput(state, hash)),
    });
    return Response.json({ ...output, metadata: { executionMode: "live", executionStatus: "executed_unverified", artifactId: crypto.randomUUID(), label: "Live protocol determination", provenance: `Live OpenAI execution using ${configuredModel}` } });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "AbortError" || error.message.toLowerCase().includes("timeout"));
    return failureResponse(executionFailure(timedOut ? "timeout" : "provider_failure", timedOut ? "Live determination timed out." : "The live provider failed or returned unusable output.", true), timedOut ? 504 : 502);
  }
}
