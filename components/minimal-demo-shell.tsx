"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Check, LockKeyhole, RotateCcw, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import {
  PUBLIC_DEMO_DISCLAIMER,
  PUBLIC_DEMO_STEPS,
  type PublicDemoStep,
} from "@/lib/product-language";
import {
  canAccessPublicDemoStep,
  getFurthestPublicDemoStep,
  type PublicDemoStepId,
} from "@/lib/minimal-demo";

type MinimalDemoShellProps = {
  children: ReactNode;
  currentStep: PublicDemoStepId;
  eyebrow: string;
  title: string;
  introduction: string;
  businessValue: string;
  role?: string;
};

export function MinimalDemoShell({
  children,
  currentStep,
  eyebrow,
  title,
  introduction,
  businessValue,
  role = "Business walkthrough",
}: MinimalDemoShellProps) {
  const { state, dispatch, hydrated } = useMinimalDemo();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated || canAccessPublicDemoStep(state, currentStep)) return;
    router.replace(`/demo/${getFurthestPublicDemoStep(state)}`);
  }, [currentStep, hydrated, router, state]);

  if (!hydrated || !canAccessPublicDemoStep(state, currentStep)) {
    return (
      <main className="minimal-loading">
        <span>ZIAAP</span>
        <p>Restoring the synthetic walkthrough…</p>
      </main>
    );
  }

  function resetDemo() {
    dispatch({ type: "RESET" });
    router.push("/demo");
  }

  const furthestStep = getFurthestPublicDemoStep(state);
  const furthestIndex = PUBLIC_DEMO_STEPS.findIndex((step) => step.id === furthestStep);

  return (
    <main className={currentStep === "review" ? "minimal-app minimal-app-review" : "minimal-app"}>
      <header className="minimal-topbar">
        <Link className="minimal-wordmark" href="/demo" aria-label="ZIAAP public demonstration opening">
          <span>Z</span>
          <div>
            <strong>ZIAAP</strong>
            <small>Clear dispute governance</small>
          </div>
        </Link>
        <div className="minimal-role">
          <Scale size={15} />
          <span>{role}</span>
        </div>
      </header>

      <div className="minimal-disclaimer" role="note">
        {PUBLIC_DEMO_DISCLAIMER}
      </div>

      <nav className="minimal-stepper" aria-label="Public demonstration progress">
        {PUBLIC_DEMO_STEPS.map((step, index) => {
          const id = step.id as PublicDemoStep;
          const accessible = canAccessPublicDemoStep(state, id);
          const active = id === currentStep;
          const completed = !active && index < furthestIndex && accessible;
          const content = (
            <>
              <span>{completed ? <Check size={13} /> : accessible ? index + 1 : <LockKeyhole size={12} />}</span>
              <strong>{step.label}</strong>
            </>
          );

          return accessible ? (
            <Link
              aria-current={active ? "step" : undefined}
              className={active ? "active" : completed ? "completed" : ""}
              href={`/demo/${id}`}
              key={id}
            >
              {content}
            </Link>
          ) : (
            <span aria-disabled="true" className="locked" key={id}>
              {content}
            </span>
          );
        })}
      </nav>

      <section className="minimal-stage">
        <header className="minimal-stage-intro">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </header>

        <aside className="minimal-business-value">
          <strong>Why this matters to your business</strong>
          <p>{businessValue}</p>
        </aside>

        {children}
      </section>

      <footer className="minimal-footer">
        <span>Step {PUBLIC_DEMO_STEPS.findIndex((step) => step.id === currentStep) + 1} of 5</span>
        <Button variant="ghost" onClick={resetDemo}>
          <RotateCcw size={14} /> Restart
        </Button>
      </footer>
    </main>
  );
}
