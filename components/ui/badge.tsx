import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, tone = "neutral", ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "red" | "blue" | "green" | "amber" }) {
  return <span className={cn("badge", `badge-${tone}`, className)} {...props} />;
}
