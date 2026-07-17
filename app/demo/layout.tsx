import type { ReactNode } from "react";
import { MinimalDemoProvider } from "@/components/minimal-demo-provider";

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <MinimalDemoProvider>{children}</MinimalDemoProvider>;
}
