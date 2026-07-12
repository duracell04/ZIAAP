import type { Topic } from "@/lib/case-model";

export const authorityRules: Record<Topic, string> = {
  uptime: "AI may compare and draft; deterministic code applies the confirmed formula.",
  liability: "AI may explain and draft; qualified review is required for mandatory-law effects.",
  legal_architecture: "AI may compare configurations; both parties select the architecture, protocol constitution, and human arbitrator.",
};
