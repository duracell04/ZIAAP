"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, FileSignature, Scale, ShieldCheck } from "lucide-react";
import { MinimalDemoShell } from "@/components/minimal-demo-shell";
import { MinimalSourceDrawer } from "@/components/minimal-source-drawer";
import { useDelayedDemoAction } from "@/components/use-delayed-demo-action";
import { useMinimalDemo } from "@/components/minimal-demo-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findMinimalDemoSources, type HumanReviewAction } from "@/lib/minimal-demo";

const reviewActions = [
  {
    id: "adopted",
    label: "Adopt",
    description: "Accept the 15% AI proposal with an independent human rationale.",
  },
  {
    id: "modified",
    label: "Modify",
    description: "Change the result to 10% because the evidence supports only the base credit.",
  },
  {
    id: "rejected",
    label: "Reject",
    description: "Decline the proposal and record why no proposed result should be used.",
  },
] as const satisfies ReadonlyArray<{
  id: Exclude<HumanReviewAction, "pending">;
  label: string;
  description: string;
}>;

export function MinimalReviewScreen() {
  const router = useRouter();
  const { state, dispatch } = useMinimalDemo();
  const { matter, review } = state;
  const { busy, run } = useDelayedDemoAction(dispatch, 650);
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  const sources = findMinimalDemoSources(matter, sourceIds);

  return (
    <MinimalDemoShell
      currentStep="review"
      eyebrow="Step 4 · human arbitrator workspace"
      title="Review the disputed question without surrendering judgment."
      introduction="The human records an independent preliminary view before seeing the AI proposal, then may adopt, modify, or reject it."
      businessValue="Use senior professional time for the contested judgment—not for rebuilding the file."
      role="Human arbitrator · simulated"
    >
      <div className="minimal-human-command">
        <ShieldCheck size={20} />
        <div>
          <span>Human in command</span>
          <strong>This simulated arbitrator remains responsible for the result.</strong>
        </div>
      </div>

      <Card className="minimal-preassessment-card">
        <Badge>Independent first view</Badge>
        <h2>Assess the evidence before revealing the AI proposal.</h2>
        <textarea
          aria-label="Preliminary human assessment"
          disabled={review.preliminaryRecorded}
          value={review.preliminaryAssessment}
          onChange={(event) => dispatch({ type: "SET_PRELIMINARY", value: event.target.value })}
        />
        {!review.preliminaryRecorded ? (
          <div className="minimal-primary-action">
            <Button
              disabled={!review.preliminaryAssessment.trim()}
              onClick={() => dispatch({ type: "RECORD_PRELIMINARY" })}
            >
              <Scale size={16} /> Record preliminary view
            </Button>
          </div>
        ) : (
          <p className="minimal-recorded"><Check size={14} /> Preliminary view recorded before AI disclosure.</p>
        )}
      </Card>

      {review.preliminaryRecorded && !review.proposalRevealed && (
        <div className="minimal-primary-action">
          <Button disabled={busy} onClick={() => run({ type: "REVEAL_PROPOSAL" })}>
            <Eye size={16} /> {busy ? "Preparing the advisory proposal…" : "Reveal the AI proposal"}
          </Button>
        </div>
      )}

      {review.proposalRevealed && (
        <>
          <Card className="minimal-proposal-card">
            <header>
              <div>
                <Badge tone="blue">{matter.review.proposal.label}</Badge>
                <h2>{matter.review.proposal.creditPercent}% credit · CHF {matter.review.proposal.creditChf.toLocaleString("en-US")}</h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSourceIds(["source-contract", "source-provider-log", "source-customer-record", "source-invoice"])}
              >
                Show source
              </Button>
            </header>
            <p>{matter.review.proposal.summary}</p>
            <div className="minimal-review-summary">
              <div>
                <span>Strongest customer point</span>
                <p>{matter.review.proposal.strongestCustomerPoint}</p>
              </div>
              <div>
                <span>Strongest provider point</span>
                <p>{matter.review.proposal.strongestProviderPoint}</p>
              </div>
              <div className="assumption">
                <span>Outcome-changing assumption</span>
                <p>{matter.review.proposal.assumption}</p>
              </div>
              <div className="objection">
                <span>Provider objection</span>
                <p>{matter.dispute.objection}</p>
              </div>
            </div>
          </Card>

          <section className="minimal-human-actions" aria-labelledby="human-action-title">
            <div className="minimal-section-heading">
              <div>
                <span>Human decision controls</span>
                <h2 id="human-action-title">Adopt, modify, or reject independently.</h2>
              </div>
            </div>
            <div>
              {reviewActions.map((action) => (
                <button
                  className={review.selectedAction === action.id ? "selected" : ""}
                  key={action.id}
                  onClick={() => dispatch({ type: "SELECT_HUMAN_ACTION", value: action.id })}
                >
                  <strong>{action.label}</strong>
                  <span>{action.description}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {review.proposalRevealed && ["adopted", "rejected"].includes(review.selectedAction) && (
        <p className="minimal-golden-path-note">
          This golden walkthrough demonstrates meaningful human modification. Select <strong>Modify</strong> to continue.
        </p>
      )}

      {review.selectedAction === "modified" && !review.decisionRecorded && (
        <Card className="minimal-decision-composer">
          <Badge tone="red">Human modification</Badge>
          <div className="minimal-decision-numbers">
            <span>AI proposed <strong>15% · CHF 1,500</strong></span>
            <ArrowRight size={18} />
            <span>Human decides <strong>10% · CHF 1,000</strong></span>
          </div>
          <label>
            <span>Independent human rationale</span>
            <textarea
              value={review.rationale}
              onChange={(event) => dispatch({ type: "SET_RATIONALE", value: event.target.value })}
            />
          </label>
          <Button
            variant="ghost"
            onClick={() => setSourceIds(["source-contract", "source-provider-log", "source-customer-record", "source-invoice"])}
          >
            Show source
          </Button>
          <div className="minimal-primary-action">
            <Button
              disabled={!review.rationale.trim()}
              onClick={() => dispatch({ type: "RECORD_DECISION" })}
            >
              <FileSignature size={16} /> Record simulated human decision
            </Button>
          </div>
        </Card>
      )}

      {review.decisionRecorded && (
        <Card className="minimal-recorded-decision">
          <Scale size={22} />
          <div>
            <Badge tone="green">Simulated human decision · non-operative</Badge>
            <h2>AI proposal modified from 15% to 10%.</h2>
            <p>{review.rationale}</p>
          </div>
          <Button onClick={() => router.push("/demo/outcome")}>
            See the outcome <ArrowRight size={16} />
          </Button>
        </Card>
      )}

      {sources.length > 0 && (
        <MinimalSourceDrawer sources={sources} onClose={() => setSourceIds([])} />
      )}
    </MinimalDemoShell>
  );
}
