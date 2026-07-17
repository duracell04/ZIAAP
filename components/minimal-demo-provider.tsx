"use client";

import { createContext, useContext, useEffect, useReducer, useSyncExternalStore, type Dispatch, type ReactNode } from "react";
import {
  MINIMAL_DEMO_STORAGE_KEY,
  createMinimalDemoState,
  minimalDemoReducer,
  minimalDemoStateSchema,
  type MinimalDemoAction,
  type MinimalDemoState,
} from "@/lib/minimal-demo";

type MinimalDemoContextValue = {
  state: MinimalDemoState;
  dispatch: Dispatch<MinimalDemoAction>;
  hydrated: boolean;
};

const MinimalDemoContext = createContext<MinimalDemoContextValue | null>(null);

function subscribeToClientHydration() {
  return () => undefined;
}

function initializeMinimalDemoState() {
  if (typeof window === "undefined") return createMinimalDemoState();
  const stored = window.sessionStorage.getItem(MINIMAL_DEMO_STORAGE_KEY);
  if (!stored) return createMinimalDemoState();
  try {
    const parsed = minimalDemoStateSchema.safeParse(JSON.parse(stored));
    if (parsed.success) return parsed.data;
  } catch {
    // Invalid or outdated browser state is cleared below.
  }
  window.sessionStorage.removeItem(MINIMAL_DEMO_STORAGE_KEY);
  return createMinimalDemoState();
}

export function MinimalDemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(minimalDemoReducer, undefined, initializeMinimalDemoState);
  const hydrated = useSyncExternalStore(subscribeToClientHydration, () => true, () => false);

  useEffect(() => {
    if (!hydrated) return;
    window.sessionStorage.setItem(MINIMAL_DEMO_STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  return (
    <MinimalDemoContext.Provider value={{ state, dispatch, hydrated }}>
      {children}
    </MinimalDemoContext.Provider>
  );
}

export function useMinimalDemo() {
  const context = useContext(MinimalDemoContext);
  if (!context) throw new Error("useMinimalDemo must be used inside MinimalDemoProvider");
  return context;
}
