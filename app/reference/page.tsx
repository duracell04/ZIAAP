import type { Metadata } from "next";
import { DemoWorkspace } from "@/components/demo-workspace";
import { getDemoState } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Expert C0 reference · ZIAAP",
  description: "The preserved six-stage ZIAAP C0 technical concept reference.",
};

export default function ReferencePage() {
  return <DemoWorkspace initialState={getDemoState()} />;
}
