import type { Metadata } from "next";
import { MinimalFeedback } from "@/components/minimal-feedback";

export const metadata: Metadata = {
  title: "Professional concept feedback · ZIAAP",
  description: "Submit low-risk concept feedback about the ZIAAP public walkthrough.",
};

type FeedbackPageProps = {
  searchParams: Promise<{ sent?: string | string[] }>;
};

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const { sent } = await searchParams;
  return <MinimalFeedback submitted={sent === "1"} />;
}
