import { DemoWorkspace } from "@/components/demo-workspace";
import { getDemoState } from "@/lib/demo-data";

export default function Home() {
  return <DemoWorkspace initialState={getDemoState()} />;
}
