import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" };

export function Button({ className, variant = "primary", ...props }: Props) {
  return <button className={cn("button", `button-${variant}`, className)} {...props} />;
}
