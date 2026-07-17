import type { Metadata } from "next";
import { MinimalDemoOpening } from "@/components/minimal-demo-opening";
import { PUBLIC_DEMO_DESCRIPTION, PUBLIC_DEMO_HEADLINE } from "@/lib/product-language";

export const metadata: Metadata = {
  title: `${PUBLIC_DEMO_HEADLINE} · ZIAAP`,
  description: PUBLIC_DEMO_DESCRIPTION,
};

export default function DemoOpeningPage() {
  return <MinimalDemoOpening />;
}
