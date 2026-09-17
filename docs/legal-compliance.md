# Legal and compliance mapping

This document maps Belgian/EU consumer and e-commerce law requirements — and the merchant-information checklist requested by ING/PAY.nl as part of onboarding — to where each is implemented on this website. It also lists what remains a TODO, and what falls outside this repository's scope (the application at `app.repero.ai`).

The primary legal reference is the Belgian Code of Economic Law (CDE), particularly Book VI (market practices and consumer protection), read together with the EU Consumer Rights Directive it transposes. ACM (the Dutch consumer/markets authority) requirements are treated as an additional merchant-onboarding checklist requested by PAY.nl/ING, not as the primary legal basis — Belgian/EU law governs the actual content of the pages.

Do not copy Dutch, US, or generic SaaS terms without adapting them to Belgian/EU law. Do not invent company facts; unresolved facts are marked `TODO:` in `src/config/company.ts` and rendered visibly (amber highlight) on the pages that use them.

## 1. Permanent company/contact information

| Requirement | Implementation |
| --- | --- |
| Legal/trade name, legal form, registered address, company number, VAT number, contact details, permanently and easily accessible | `/en/legal` and `/fr/mentions-legales` (`src/pages/en/legal.astro`, `src/pages/fr/mentions-legales.astro`), sourced from `src/config/company.ts`. Linked from the footer on every page (`src/components/Footer.astro`), satisfying "permanent accessibility." |
| Contact email visible site-wide | Footer now shows `COMPANY_EMAIL_CONTACT` on every page. |
| Hosting provider disclosure | Included informationally on the Legal Notice page (Cloudflare Pages). Not asserted as a Belgian legal requirement — included for transparency only. |

**Outstanding TODOs** (in `src/config/company.ts`, rendered as visible amber `TODO:` text on `/en/legal`, `/fr/mentions-legales`, `/en/terms`, `/fr/terms`, `/en/privacy`, `/fr/privacy`):
- Legal company name (exact KBO/BCE registration name)
- Legal form (BV/SRL, NV/SA, etc.)
- Registered office address
- KBO/BCE company registration number
- VAT number
- Phone number (recommended, not strictly mandatory)

A "publication director" field was deliberately **not** added — that is a French legal-notice (LCEN) convention with no established Belgian CDE equivalent identified for this type of site. Do not add it without a specific Belgian legal source.

## 2. Terms of Service (SaaS subscription terms)

`/en/terms` and `/fr/terms` (`src/pages/en/terms.astro`, `src/pages/fr/terms.astro`) were rewritten in place rather than duplicated into a separate "SaaS Terms" document, to keep one governing Terms document.

| Requirement | Implementation |
| --- | --- |
| Identity of the service provider | Section 1, pulled from `company.ts` |
| Description of the paid, subscription-based service | Section 2, Section 8 |
| Total price, recurring nature, billing period, duration, renewal, cancellation must be disclosed **before purchase**, not only buried in Terms | Section 8 states these must be presented at checkout/point of purchase; the actual checkout implementation lives in `app.repero.ai` — see Section 5 of this document for the checklist that flow must satisfy |
| 14-day right of withdrawal for consumers (Book VI CDE / Consumer Rights Directive) | Section 9, with an explicit consumer/B2B split (9.1, 9.6) |
| Express-request mechanism for immediate performance during the withdrawal period | Section 9.3 — requires an explicit, separate request, not implied by purchase or account access |
| Proportionate payment on withdrawal after partial performance vs. loss of the right only on full performance + acknowledgment | Sections 9.4 and 9.5 — deliberately does **not** state the right disappears merely because access was granted |
| Official model withdrawal form | Section 9.7 |
| Governing law / out-of-court redress | Section 17 — Belgian law; the Belgian Consumer Mediation Service is mentioned as an available, optional redress channel, not as a legal or contractual obligation (no source establishes the latter) |
| No claim that Terms override mandatory consumer rights | Sections 7 and 14 add explicit carve-outs referencing Section 9 |

**Outstanding TODOs:** legal owner name (`COMPANY_LEGAL_NAME`) and registration number in Sections 1, 9.7, 12, 15.

**Note on legal classification:** the service is treated conservatively as a *digital/online service contract*, not automatically as "digital content not supplied on a tangible medium" (a distinct category with its own, stricter withdrawal-loss conditions). Before removing this conservative framing, confirm precisely how `app.repero.ai` delivers and licenses the service.

## 3. Privacy Policy

`/en/privacy` and `/fr/privacy` were already reasonably complete (GDPR legal bases, data categories, retention, rights, international transfers). Changes made:
- Pulled company identity from `company.ts` (Section 1) instead of duplicated, drifting text.
- Corrected Section 8 (cookies), which previously claimed the site used "analytics" cookies with no supporting code. It now accurately states this marketing site sets no non-essential cookies today, and links to the new Cookie Policy.

## 4. Cookie Policy (new)

`/en/cookies` and `/fr/politique-cookies` (`src/pages/en/cookies.astro`, `src/pages/fr/politique-cookies.astro`).

Confirmed by repository grep: no analytics, tracking, or cookie-setting code exists anywhere in `src/**`, `functions/**`, or `public/**`. The policy states this plainly and commits to updating the policy and obtaining consent before adding any future cookie that requires it.

**TODO — compliance blocker before launch:** `app.repero.ai` (the authenticated application) necessarily uses cookies or similar mechanisms (session, auth) and is a separate codebase not audited here. It is **not** legally separate from Repero AI merely because it lives in a different repository — it is the same service/provider. A dedicated cookie/privacy audit of `app.repero.ai` must be completed, and its findings either folded into this policy or published as an application-specific disclosure, before the Cookie Policy can be considered complete for the service as a whole. The Cookie Policy pages state the scope limitation (website only, application discloses its own cookies within itself); this internal task item is tracked here rather than as a visible admission on the public page.

## 5. Checkout requirements for app.repero.ai (documentation only — not implemented in this repo)

Checkout, billing, and subscription management are handled by the application (`app.repero.ai`), outside this repository. This site's Terms (Section 8) commit to these disclosures being made at checkout; this section documents what that flow must actually do to comply with Belgian/EU e-commerce law and to satisfy the ACM/PAY.nl-style merchant checklist. None of this can be satisfied by Terms-of-Service text alone — Belgian/EU law and the ACM checklist both require these facts to be presented at the point of purchase, not only in a separate document.

- **Total price**, inclusive of VAT and any mandatory fees, shown before the order is placed.
- **Recurring nature and billing period** (e.g., "billed monthly," "billed annually") stated clearly, not only in fine print.
- **Minimum duration / commitment period**, if any, disclosed before purchase.
- **Renewal mechanics**: whether the subscription auto-renews, and how/when the customer is notified before renewal, if required.
- **Cancellation method**: a clear, easy way to cancel, described at or before checkout — the application should make this at least as easy as subscribing (a live requirement in several EU member states' consumer-protection enforcement).
- **Unambiguous payment-obligation button label**: the order button must be labelled with wording that unambiguously indicates a payment obligation (e.g., "Subscribe and pay," "Order with obligation to pay") — a generic "Continue" or "Submit" is not sufficient under the Consumer Rights Directive's Article 8(2) button rule as transposed into Belgian law.
- **Pre-contractual confirmation on a durable medium**: confirmation of the order (including price, recurrence, duration, and withdrawal-right information) delivered in a way the customer can keep (e.g., email), not only shown transiently on screen.
- **Express-request + acknowledgment checkboxes for immediate performance**: to align with Terms Section 9.3–9.5, checkout must capture (a) an explicit, separate request from the consumer for the service to start immediately, and (b) an acknowledgment that full performance during the withdrawal period extinguishes the right of withdrawal — implemented as distinct, affirmative UI steps, not pre-ticked boxes or implied consent.
- **B2C/B2B distinction at checkout**, if the application distinguishes consumer and business customers, so the correct withdrawal-rights treatment (Terms Section 9.1 vs. 9.6) is presented to the right audience.

## 6. ACM / PAY.nl merchant onboarding checklist

This section is a direct cross-reference for the ACM-style checklist requested during PAY.nl/ING onboarding. It restates items above in checklist form and notes where each currently stands.

- [x] Publicly accessible company identity (name, address, registration number, VAT, contact) — page built; **factual values are TODO** in `src/config/company.ts`.
- [x] Publicly accessible Terms & Conditions describing the service, pricing model, and subscription mechanics — `/en/terms`, `/fr/terms`.
- [x] Right of withdrawal / cooling-off information, including the model withdrawal form — `/en/terms` §9, `/fr/terms` §9.
- [x] Privacy Policy describing data processing — `/en/privacy`, `/fr/privacy`.
- [x] Cookie Policy — `/en/cookies`, `/fr/politique-cookies` — **scope limited to this website; app.repero.ai audit is a TODO** (see Section 4 above).
- [ ] Checkout-time price/recurrence/cancellation disclosure, payment-obligation button label, durable-medium order confirmation — **not implemented in this repository**; documented as a requirement for `app.repero.ai` in Section 5 above.
- [ ] Complete company identity facts (legal name, form, address, KBO/BCE number, VAT number) — **TODO**, business-supplied.
- [ ] Cookie/privacy audit of `app.repero.ai` — **TODO**, out of this repository's scope.
- [ ] Verification of the model withdrawal form wording and the Belgian Consumer Mediation Service's current contact details against the authoritative SPF Economie text before relying on this content as final — recommended before public launch, since legal text should be checked against the current official source rather than taken solely from this implementation.

## Maintenance rules

- Do not claim certifications, uptime guarantees, data residency commitments, subprocessor lists, or refund policies beyond what is already stated in the Terms/Privacy Policy.
- Do not describe Repero AI as itself being the underlying foundation model; keep the "may rely on third-party AI providers" framing.
- When company facts in `src/config/company.ts` are filled in, remove the corresponding `legal-todo` styling only once the value is a confirmed fact, not a guess.
- Review this document whenever the Terms, Privacy Policy, Cookie Policy, or checkout flow changes materially.
