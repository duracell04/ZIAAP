# ZIAAP Alpha Local Demonstration Procedure

## Prerequisites

- Node.js 20.9 or later;
- pnpm 9;
- repository checkout at the review commit; and
- no confidential or real dispute data.

The deterministic review path needs no provider credentials.

## Clean setup

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

## Environment policy

Leave these unset or false for representative public-review behavior:

```text
ZIAAP_LIVE_EXECUTION_ENABLED
ZIAAP_LIVE_RETRIEVAL_ENABLED
```

Do not expose `OPENAI_API_KEY` to the browser or screen recording. The reviewer
should use **View illustrative example**. Selecting **Run live execution** should
produce the designed fail-closed state.

## Pre-session check

1. Opening loads without an error overlay.
2. Synthetic/simulation-only disclosure is visible.
3. Both entry actions work.
4. Party Alignment displays three divergences.
5. Illustrative action selects `illustrative_only`.
6. Live action fails explicitly and returns no fixture success.
7. Reset returns the original synthetic state.
8. Mobile width has no page-level horizontal overflow.

## Deterministic demonstration path

1. Begin guided demonstration.
2. Confirm both party profiles.
3. Select **View illustrative example**.
4. Inspect sources, options, consequences, and legal boundary.
5. Verify the CHF 1,500 deterministic calculation.
6. Confirm supplier and customer on all three exact versions.
7. Verify the Alignment Annex changes from locked preview to generated.
8. Return to the opening and reset.

## Troubleshooting

- Port busy: stop the existing local process or use the URL printed by Next.js.
- Install failure: record it as an environment failure; do not describe source
  checks as failed unless they were actually run.
- Live action succeeds unexpectedly: stop the review and disable the live policy.
- Fixture/schema error: record the source failure and do not continue the session.

## Stop condition

After at least five real representative sessions, provide completed questionnaires
and findings logs to the implementation team. Do not continue Stage 2–5 completion
without that feedback.
