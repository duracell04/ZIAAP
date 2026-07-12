import { contractStateSchema, settlementProposalSchema } from "@/lib/case-model";
import { buildProtocolManifest, computeProtocolHash, settlementCanActivate } from "@/lib/protocol";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = contractStateSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid settlement-facilitation request." }, { status: 400 });
  const state = parsed.data;
  if (!settlementCanActivate(state)) return Response.json({ error: "Separate consent from both parties is required." }, { status: 409 });
  const hash = await computeProtocolHash(buildProtocolManifest(state));
  if (hash !== state.appointment.manifestHash) return Response.json({ error: "The frozen appointment package does not match the active state." }, { status: 409 });

  const proposal = settlementProposalSchema.parse({
    id: "settlement-proposal-001", label: "System-generated, non-binding settlement proposal",
    terms: [
      "Supplier provides the contractual CHF 1,500 service credit.",
      "Supplier pays CHF 30,000 without admission of liability.",
      "The parties continue the service with a jointly monitored remediation plan.",
      "Each party bears its own legal costs for the settled issues.",
    ],
    basis: "Generated only from the shared claim, defence, contract state, and shared evidence. Acceptance requires matching affirmative responses.",
    sourceScope: "Shared case record only", materialStatus: "sealed_settlement",
  });
  return Response.json(proposal);
}
