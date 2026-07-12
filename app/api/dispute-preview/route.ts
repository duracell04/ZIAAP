import { Output, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { contractStateSchema, proposedDeterminationSchema } from "@/lib/case-model";
import { buildAdjudicationInput, buildProtocolManifest, computeProtocolHash } from "@/lib/protocol";

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
    proposedDisposition: "Recognise the CHF 1,500 contractual credit. Reserve all additional liability, causation, and limitation findings for the appointed human arbitrator's independent determination on a completed record.",
    materialStatus: "proposed_determination", independentLegalEffect: false,
    metadata: { mode: "cached", label: "Cached frozen-protocol determination" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const mode = body?.mode;
  const parsed = contractStateSchema.safeParse(body?.state);
  if (!parsed.success || (mode !== "cached" && mode !== "live")) return Response.json({ error: "Invalid dispute-preview request." }, { status: 400 });
  const state = parsed.data;
  if (state.appointment.status !== "appointed" || !state.appointment.manifestHash) return Response.json({ error: "A fully appointed protocol is required." }, { status: 409 });
  if (state.settlement.status === "settled") return Response.json({ error: "The dispute is settled; adjudication cannot continue." }, { status: 409 });
  const hash = await computeProtocolHash(buildProtocolManifest(state));
  if (hash !== state.appointment.manifestHash || state.dispute.appointmentHash !== hash) return Response.json({ error: "The active dispute is not bound to the frozen appointment package." }, { status: 409 });
  const cached = cachedDetermination(hash);
  if (mode === "cached") return Response.json(cached);

  const configuredModel = process.env.OPENAI_MODEL ?? "gpt-5-mini";
  if (!process.env.OPENAI_API_KEY || configuredModel !== state.constitution.protocolIdentity.model) {
    return Response.json({ ...cached, metadata: { mode: "fallback", label: "Cached frozen-protocol determination", notice: "The exact frozen model was unavailable; the validated same-manifest fixture was used. No substitute model acted under the appointment." } });
  }

  try {
    const { output } = await generateText({
      model: openai(configuredModel), output: Output.object({ schema: proposedDeterminationSchema.omit({ metadata: true }) }), abortSignal: AbortSignal.timeout(12_000),
      system: "Operate only as the version-locked ZIAAP decision protocol assisting the appointed human arbitrator. Produce a provisional determination without independent legal effect. Preserve equality, sources, objections, uncertainty, and mandatory human judgment. Never use settlement proposals, concessions, or responses.",
      prompt: JSON.stringify(buildAdjudicationInput(state, hash)),
    });
    return Response.json({ ...output, metadata: { mode: "live", label: "Live frozen-protocol determination" } });
  } catch {
    return Response.json({ ...cached, metadata: { mode: "fallback", label: "Cached frozen-protocol determination", notice: "Live processing failed; the validated same-manifest fixture was restored." } });
  }
}
