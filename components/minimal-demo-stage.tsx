import { MinimalAlignScreen } from "@/components/minimal-align-screen";
import { MinimalDisputeScreen } from "@/components/minimal-dispute-screen";
import { MinimalOutcomeScreen } from "@/components/minimal-outcome-screen";
import { MinimalReviewScreen } from "@/components/minimal-review-screen";
import { MinimalTestScreen } from "@/components/minimal-test-screen";
import type { PublicDemoStepId } from "@/lib/minimal-demo";

export function MinimalDemoStage({ stage }: { stage: PublicDemoStepId }) {
  switch (stage) {
    case "align":
      return <MinimalAlignScreen />;
    case "test":
      return <MinimalTestScreen />;
    case "dispute":
      return <MinimalDisputeScreen />;
    case "review":
      return <MinimalReviewScreen />;
    case "outcome":
      return <MinimalOutcomeScreen />;
  }
}
