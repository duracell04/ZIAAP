import type { Metadata } from "next";
import { MinimalFeedback } from "@/components/minimal-feedback";

export const metadata: Metadata = {
  title: "Professional concept feedback · ZIAAP",
  description: "Prepare a local, unsubmitted response to the ZIAAP public concept walkthrough.",
};

export default function FeedbackPage() {
  return <MinimalFeedback />;
}
