import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MinimalDemoStage } from "@/components/minimal-demo-stage";
import { publicDemoStepIds, type PublicDemoStepId } from "@/lib/minimal-demo";

type DemoStagePageProps = {
  params: Promise<{ stage: string }>;
};

export const metadata: Metadata = {
  title: "Four-minute public concept · ZIAAP",
  description: "A deterministic synthetic walkthrough of alignment, AI-assisted preparation, party challenge, and human decision authority.",
};

export function generateStaticParams() {
  return publicDemoStepIds.map((stage) => ({ stage }));
}

export default async function DemoStagePage({ params }: DemoStagePageProps) {
  const { stage } = await params;
  if (!publicDemoStepIds.includes(stage as PublicDemoStepId)) notFound();
  return <MinimalDemoStage stage={stage as PublicDemoStepId} />;
}
