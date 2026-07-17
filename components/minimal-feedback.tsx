"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Clipboard, Download, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PUBLIC_DEMO_DISCLAIMER } from "@/lib/product-language";

const FEEDBACK_STORAGE_KEY = "ziaap:minimal-feedback:v1";

type FeedbackState = {
  perspective: string;
  explanation: string;
  humanControl: string;
  adoptionBarrier: string;
  potentialSaving: string;
};

const initialFeedback: FeedbackState = {
  perspective: "Business owner",
  explanation: "",
  humanControl: "",
  adoptionBarrier: "",
  potentialSaving: "",
};

export function MinimalFeedback() {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [prepared, setPrepared] = useState(false);
  const [notice, setNotice] = useState("");

  function update(field: keyof FeedbackState, value: string) {
    setPrepared(false);
    setNotice("");
    setFeedback((current) => ({ ...current, [field]: value }));
  }

  function serialize() {
    return JSON.stringify(
      {
        artifact: "ZIAAP hyper-minimal public concept",
        evidenceStatus: "Unverified participant response",
        ...feedback,
      },
      null,
      2,
    );
  }

  function prepare() {
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, serialize());
    setPrepared(true);
    setNotice("Feedback prepared locally. Nothing was sent.");
  }

  async function copy() {
    await navigator.clipboard.writeText(serialize());
    setNotice("Feedback copied to the clipboard. Nothing was sent.");
  }

  function download() {
    const blob = new Blob([serialize()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ziaap-concept-feedback.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Feedback downloaded as a local JSON file. Nothing was sent.");
  }

  const complete = Object.values(feedback).every((value) => value.trim().length > 0);

  return (
    <main className="minimal-feedback-page">
      <header>
        <Link href="/demo/outcome"><ArrowLeft size={15} /> Return to outcome</Link>
        <span>{PUBLIC_DEMO_DISCLAIMER}</span>
      </header>
      <section>
        <div className="minimal-feedback-intro">
          <MessageSquareText size={24} />
          <span>Professional feedback</span>
          <h1>What did you understand—and what would stop you using this approach?</h1>
          <p>
            These responses are stored only in your browser unless you choose to copy or download them.
            They are research input, not approval or validation.
          </p>
        </div>

        <Card className="minimal-feedback-form">
          <label>
            <span>Your perspective</span>
            <select value={feedback.perspective} onChange={(event) => update("perspective", event.target.value)}>
              <option>Business owner</option>
              <option>International trade professional</option>
              <option>In-house counsel</option>
              <option>Arbitrator</option>
              <option>Mediator</option>
              <option>Law firm</option>
              <option>Institution</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span>In one sentence, what do you understand ZIAAP to do?</span>
            <textarea value={feedback.explanation} onChange={(event) => update("explanation", event.target.value)} />
          </label>
          <label>
            <span>Which decisions or procedural steps must always remain under human control?</span>
            <textarea value={feedback.humanControl} onChange={(event) => update("humanControl", event.target.value)} />
          </label>
          <label>
            <span>What would prevent you or your organisation from using this process?</span>
            <textarea value={feedback.adoptionBarrier} onChange={(event) => update("adoptionBarrier", event.target.value)} />
          </label>
          <label>
            <span>Where could this save the greatest amount of time, cost, or uncertainty?</span>
            <textarea value={feedback.potentialSaving} onChange={(event) => update("potentialSaving", event.target.value)} />
          </label>
          <Button disabled={!complete} onClick={prepare}>
            <Check size={15} /> Prepare feedback locally
          </Button>
        </Card>

        {prepared && (
          <Card className="minimal-feedback-ready">
            <div>
              <Check size={20} />
              <div>
                <strong>Local feedback record ready</strong>
                <p>No response has been transmitted.</p>
              </div>
            </div>
            <div>
              <Button variant="secondary" onClick={copy}><Clipboard size={15} /> Copy responses</Button>
              <Button variant="secondary" onClick={download}><Download size={15} /> Download JSON</Button>
            </div>
          </Card>
        )}
        {notice && <p className="minimal-feedback-notice" role="status">{notice}</p>}
      </section>
    </main>
  );
}
