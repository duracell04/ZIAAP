import fixture from "@/data/demo-case.json";
import { contractStateSchema } from "@/lib/case-model";

export function getDemoState() {
  return contractStateSchema.parse(structuredClone(fixture));
}
