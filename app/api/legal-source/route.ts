import { z } from "zod";
import { getCachedLegalConstraint, retrieveGrossNegligenceConstraint } from "@/lib/omnilex";

export const runtime = "nodejs";

const requestSchema = z.object({ mode: z.enum(["cached", "live"]) });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid legal-source request." }, { status: 400 });
  if (parsed.data.mode === "cached") return Response.json(getCachedLegalConstraint());
  try {
    return Response.json(await retrieveGrossNegligenceConstraint());
  } catch {
    return Response.json(getCachedLegalConstraint("Live OmniLex retrieval was unavailable; cached verified fallback shown."));
  }
}
