import { legalConstraintSchema, type LegalConstraint } from "@/lib/case-model";
import { getDemoState } from "@/lib/demo-data";

const tokenEndpoint = "https://api.omnilex.ai/mcp/oauth/token";
const articleId = "ch-fedlex--220--100";

function parseSseJson(payload: string) {
  const dataLine = payload.split(/\r?\n/).find((line) => line.startsWith("data:"));
  if (!dataLine) throw new Error("OmniLex returned no MCP data event.");
  return JSON.parse(dataLine.slice(5).trim());
}

async function getToken(signal: AbortSignal) {
  const clientId = process.env.OMNILEX_MCP_CLIENT_ID;
  const clientSecret = process.env.OMNILEX_MCP_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("OmniLex credentials are not configured.");
  const body = new URLSearchParams({ grant_type: "client_credentials", client_id: clientId, client_secret: clientSecret, scope: "mcp" });
  const response = await fetch(tokenEndpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, signal, cache: "no-store" });
  if (!response.ok) throw new Error(`OmniLex token request failed with ${response.status}.`);
  const token = (await response.json()) as { access_token?: string };
  if (!token.access_token) throw new Error("OmniLex returned no access token.");
  return token.access_token;
}

export async function retrieveGrossNegligenceConstraint(): Promise<LegalConstraint> {
  const signal = AbortSignal.timeout(10_000);
  const token = await getToken(signal);
  const endpoint = process.env.OMNILEX_MCP_URL;
  if (!endpoint) throw new Error("OmniLex MCP URL is not configured.");
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: { name: "get_article", arguments: { id: articleId, preferences: { language: "en" } } },
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json, text/event-stream", "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`OmniLex MCP request failed with ${response.status}.`);
  const envelope = parseSseJson(await response.text());
  const text = envelope?.result?.content?.find((item: { type?: string }) => item.type === "text")?.text;
  if (!text) throw new Error("OmniLex returned no article content.");
  const article = JSON.parse(text) as { id: string; citation: string; title: string; content: string; url: string };
  return legalConstraintSchema.parse({
    id: "constraint-co-100",
    query: "Swiss Code of Obligations Article 100 advance limitation intentional or gross negligence",
    headline: "Legal constraint identified",
    source: {
      id: article.id,
      jurisdiction: "Switzerland",
      authority: "Federal legislation retrieved through OmniLex",
      title: `${article.citation} — ${article.title}`,
      url: article.url,
      passage: article.content,
      retrievalMode: "omnilex",
      verificationStatus: "review_required",
      materialStatus: "legal_source",
    },
    retrievedAt: new Date().toISOString(),
    mode: "live_omnilex",
    reviewInstruction: "Targeted professional review required before signature.",
    conclusion: "No enforceability conclusion is made. The constraint is isolated for qualified review.",
  });
}

export function getCachedLegalConstraint(notice?: string): LegalConstraint {
  const cached = getDemoState().legalConstraint;
  return legalConstraintSchema.parse({ ...cached, retrievedAt: new Date().toISOString(), conclusion: notice ? `${cached.conclusion} ${notice}` : cached.conclusion });
}
