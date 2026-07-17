"use client";

import { useEffect, useRef, useState, type Dispatch } from "react";
import type { MinimalDemoAction } from "@/lib/minimal-demo";

export function useDelayedDemoAction(dispatch: Dispatch<MinimalDemoAction>, delayMs = 700) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function run(action: MinimalDemoAction) {
    if (busy) return;
    setBusy(true);
    timer.current = setTimeout(() => {
      dispatch(action);
      setBusy(false);
      timer.current = null;
    }, delayMs);
  }

  return { busy, run };
}
