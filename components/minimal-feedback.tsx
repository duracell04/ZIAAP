import Link from "next/link";
import { ArrowLeft, Check, MessageSquareText, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PUBLIC_DEMO_DISCLAIMER } from "@/lib/product-language";

const FEEDBACK_ENDPOINT = "https://formsubmit.co/enriquegeorg.zbinden@swisslegaltech.ch";
const FEEDBACK_RETURN_URL = "https://ziaap-26.vercel.app/feedback?sent=1";

type MinimalFeedbackProps = {
  submitted?: boolean;
};

export function MinimalFeedback({ submitted = false }: MinimalFeedbackProps) {
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
            Your responses are concept-research input, not approval or validation. They are submitted
            by email through the temporary FormSubmit service.
          </p>
        </div>

        {submitted && (
          <Card className="minimal-feedback-success" role="status" aria-live="polite">
            <Check size={20} />
            <strong>Thank you. Your feedback has been submitted.</strong>
          </Card>
        )}

        <form className="card minimal-feedback-form" method="POST" action={FEEDBACK_ENDPOINT}>
          <input type="hidden" name="_next" value={FEEDBACK_RETURN_URL} />
          <input type="hidden" name="_subject" value="New ZIAAP concept feedback" />
          <input type="hidden" name="_template" value="table" />
          <label className="minimal-feedback-honey" aria-hidden="true">
            Leave this field empty
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </label>

          <label>
            <span>Your email address</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>

          <label>
            <span>Your perspective</span>
            <select name="perspective" defaultValue="" required>
              <option value="" disabled>Select your perspective</option>
              <option value="Business owner">Business owner</option>
              <option value="International trade professional">International trade professional</option>
              <option value="In-house counsel">In-house counsel</option>
              <option value="Arbitrator">Arbitrator</option>
              <option value="Mediator">Mediator</option>
              <option value="Law firm">Law firm</option>
              <option value="Institution">Institution</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            <span>In one sentence, what do you understand ZIAAP to do?</span>
            <textarea name="explanation" required />
          </label>

          <label>
            <span>Which decisions or procedural steps must always remain under human control?</span>
            <textarea name="human_control" required />
          </label>

          <label>
            <span>What would prevent you or your organisation from using this process?</span>
            <textarea name="adoption_barrier" required />
          </label>

          <label>
            <span>Where could this save the greatest amount of time, cost, or uncertainty?</span>
            <textarea name="potential_saving" required />
          </label>

          <label>
            <span>Any additional thoughts, ideas, or suggestions for improvement? (Optional)</span>
            <textarea name="additional_comments" />
          </label>

          <aside className="minimal-feedback-privacy" aria-labelledby="feedback-privacy-title">
            <strong id="feedback-privacy-title">How this feedback is handled</strong>
            <p>
              <b>Controller:</b> Enrique Georg Zbinden, ZIAAP concept project.{" "}
              <b>Contact and rights requests:</b>{" "}
              <a href="mailto:enriquegeorg.zbinden@swisslegaltech.ch">
                enriquegeorg.zbinden@swisslegaltech.ch
              </a>
              .
            </p>
            <p>
              We collect your email, perspective, four required answers and any optional additional
              comments for concept research and possible submission-related follow-up. FormSubmit,
              operated by Devro LABS, processes the submission and states that it retains
              submissions for 30 days. Messages may remain in the project mailbox for up to 12
              months and will then be deleted unless continued retention is legally necessary.
            </p>
            <p>
              Your details will not be used for a newsletter or unrelated marketing. Do not submit
              confidential case information, privileged material, sensitive personal data or
              information about an identifiable dispute.
            </p>
          </aside>

          <label className="minimal-feedback-consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span>
              I consent to this processing and confirm that my response contains no confidential,
              privileged, case-specific or sensitive personal information.
            </span>
          </label>

          <button className="button button-primary" type="submit">
            <Send size={15} /> Submit feedback
          </button>
        </form>
      </section>
    </main>
  );
}
