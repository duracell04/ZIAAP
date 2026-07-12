import { z } from "zod";
import { getCachedLegalConstraint, retrieveGrossNegligenceConstraint } from "@/lib/omnilex";
import { executionFailure, failureResponse } from "@/lib/execution";

export const runtime = "nodejs";

const requestSchema = z.object({ executionMode: z.enum(["illustrative", "live"]) });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid legal-source request." }, { status: 400 });
  if (parsed.data.executionMode === "illustrative") return Response.json(getCachedLegalConstraint());
  if (process.env.ZIAAP_LIVE_RETRIEVAL_ENABLED !== "true") return failureResponse(executionFailure("live_execution_disabled", "Live legal-source retrieval is disabled in this showcase environment.", false), 403);
  try {
    return Response.json(await retrieveGrossNegligenceConstraint());
  } catch {
    return failureResponse(executionFailure("provider_failure", "Live legal-source retrieval failed. The illustrative source was not silently substituted.", true), 502);
  }
}
