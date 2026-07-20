# Public Feedback Pilot Governance

**Status:** Temporary low-risk concept-research pilot

**Risk classification:** Medium privacy and reputational risk

## Purpose and boundary

The public feedback form collects a participant's email address, perspective
and four required answers, plus any optional additional comments, for ZIAAP
concept research and possible submission-related follow-up. It is not a
newsletter, marketing list, production research backend, confidential matter
channel or evidence of product, legal-framing or comprehension approval.

Participants must not submit confidential case information, privileged
material, sensitive personal data or information about an identifiable
dispute.

## Controller, processor and retention

- **Controller:** Enrique Georg Zbinden, ZIAAP concept project.
- **Contact and rights requests:**
  [enriquegeorg.zbinden@swisslegaltech.ch](mailto:enriquegeorg.zbinden@swisslegaltech.ch).
- **Temporary processor/recipient:** FormSubmit, operated by Devro LABS.
- **FormSubmit retention:** FormSubmit states that submissions are retained for
  30 days.
- **Project mailbox retention:** Messages may remain in the project mailbox for
  up to 12 months and will then be deleted unless continued retention is
  legally necessary.
- **Other use:** No newsletter or unrelated marketing.

The project remains responsible for selecting, instructing and monitoring any
processor. FormSubmit's public materials provide limited clarity about its
legal identity, processing locations, infrastructure, subprocessors,
international transfers, contractual processor terms and security
commitments. Its public privacy document is dated 17 January 2019 and its
statement that it does not collect personally identifiable information is
difficult to reconcile with processing forms that contain email addresses.

FormSubmit is therefore accepted only as a temporary processor for this
low-risk pilot. It must be replaced by a processor with clearer contractual,
security, subprocessor, location and international-transfer terms, or undergo
formal privacy-governance approval, before broader institutional testing.

Sources:

- [FormSubmit documentation](https://formsubmit.co/documentation)
- [Swiss FDPIC information duties](https://www.edoeb.admin.ch/en/duty-to-provide-information)
- [Swiss FDPIC outsourcing guidance](https://www.edoeb.admin.ch/en/outsourcing-of-data-processing)

## Submission and delivery meaning

The browser posts the form directly to FormSubmit. A redirect to
`/feedback?sent=1` permits only:

> **Thank you. Your feedback has been submitted.**

The redirect does not prove mailbox delivery. Delivery is established only by
the controlled production acceptance test in which the activated FormSubmit
endpoint sends a later submission to the project mailbox.

CAPTCHA remains enabled. The form also uses a honeypot, requires the
participant email and perspective, requires all four core answers, offers one
optional open-comments field, and requires express consent to the disclosed
processing and content restriction.

## Public address exposure

The active FormSubmit action uses the random-like identifier supplied after
mailbox activation and no longer exposes the project mailbox in the form
action. The controller contact
`enriquegeorg.zbinden@swisslegaltech.ch` remains public in the rendered
disclosure and repository source so participants can exercise their rights.

Earlier naked FormSubmit recipient addresses remain persistent in Git history,
forks, mirrors and archives. No Git history rewrite is attempted because that
would create disproportionate release risk and would not remove copies that
already exist outside the canonical repository.

## Approval status

Root publication is an operational pilot decision only. Product/founder,
legal-framing, privacy-governance and unfamiliar-reader acceptance remain
pending. Feedback submissions are research inputs and must not be counted as
approval or validation without applying the separate review protocol.
