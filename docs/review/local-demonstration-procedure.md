# ZIAAP Review-Candidate Local Demonstration Procedure

## Prerequisites

- Node.js 20.9 or later;
- pnpm 9;
- checkout of `prototype-showcase-v1.0-review-candidate`; and
- no confidential or real dispute data.

The deterministic review path needs no provider credentials.

## Clean setup and verification

```powershell
git status --short
pnpm.cmd install --frozen-lockfile
pnpm.cmd typecheck
pnpm.cmd lint
pnpm.cmd test
pnpm.cmd build
pnpm.cmd dev
```

Open `http://localhost:3000`.

## Public-review policy

Leave `ZIAAP_LIVE_EXECUTION_ENABLED` and `ZIAAP_LIVE_RETRIEVAL_ENABLED`
unset or false. Do not expose `OPENAI_API_KEY` to the browser or recording.
**Run live execution** should demonstrate an explicit fail-closed state.

## Complete deterministic path

### 1. Party Alignment

1. Begin guided demonstration.
2. Confirm both profiles.
3. Select **View illustrative example**.
4. Inspect sources, options, consequences, and legal boundary.
5. Verify the CHF 1,500 deterministic calculation.
6. Confirm supplier and customer on all three exact versions.
7. Verify the Alignment Annex changes from pending to generated.

### 2. Arbitral Reasoning Calibration

1. Inspect all ten editable inference controls.
2. Inspect settlement firewall and change policy.
3. Confirm model weights remain unchanged.
4. Acknowledge Constitution v1 as supplier and customer.

### 3. Stress Testing

1. Select **View illustrative example**.
2. Inspect facts, evidence, safeguards, observed behavior, limitations, status,
   provenance, and consequence.
3. Acknowledge all four artifacts as supplier and customer.

### 4. Exact Manifest and Simulated Appointment

1. Confirm all three readiness cards are ready.
2. Inspect full canonical manifest contents and exclusions.
3. Prepare the Exact protocol manifest.
4. Acknowledge the exact hash as both parties.
5. Review fictional disclosure and record fictional acceptance.
6. Simulate appointment under the acknowledged manifest.

### 5. Later Synthetic Dispute

1. Verify manifest binding and shared merits record.
2. Activate settlement as both parties and generate the sealed proposal.
3. Decline as one party so adjudication can continue.
4. Record a fictional preliminary assessment.
5. Select **View illustrative example** for the provisional determination.
6. Select modified, enter an independent rationale, complete all four review
   checks, and record the simulated human decision.

### 6. Dossier

1. Open dossier.
2. Confirm `12 of 12 artifacts available`.
3. Inspect metadata and contents for each artifact.
4. Confirm sealed proposal terms are absent from merits-facing artifacts.
5. Confirm external validation is pending.
6. Use **Print presentation dossier** and inspect print preview.

## Failure and reset path

1. Reset.
2. Select **Run live execution** on Party Alignment.
3. Confirm an explicit failed state, preserved but inactive findings, and no
   fallback success.
4. Deliberately select **View illustrative example** to recover.
5. Reset and confirm the initial state.

## Troubleshooting

- Install failure: record it as an environment failure, separately from source.
- Live succeeds unexpectedly: stop and disable live policy before expert review.
- Fixture/schema/build failure: record the source failure and do not conduct a
  session against that checkout.
- Dossier count below 12: complete the declined-settlement adjudication path.

## Handoff

Use the guided script, questionnaire, and a new findings-log copy. External
sessions and feedback analysis belong to the next cycle; no result is claimed by
the review candidate itself.
