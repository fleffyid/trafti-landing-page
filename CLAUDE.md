@AGENTS.md

# trafti Landing Page — Project Context

## Product

trafti is a two-sided marketplace for barbershop/salon/grooming businesses in Indonesia. This repo is the **public landing page** (company profile + merchant acquisition funnel). Full PRD: `specs/prd.md`.

## Tech Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| Framework     | Next.js 14+ (App Router)                          |
| Styling       | Tailwind CSS                                      |
| UI Components | ShadcnUI                                          |
| Localization  | next-intl (subpath routing: `/id/...`, `/en/...`) |
| Analytics     | GA4 + Meta Pixel via Google Tag Manager           |
| SEO           | Next.js Metadata API, sitemap.xml, robots.txt     |
| Hosting       | Vercel                                            |
| Forms         | Server Actions + Resend/SendGrid                  |

## Site Map

```
/                   Home (Landing)
/features           Platform feature details
/pricing            Subscription plans for merchants
/for-business       B2B page for barbershop owners
/for-customer       B2C page → redirect to app stores
/about              Company story, mission, vision
/contact            Contact form + demo request
/terms-of-service   Legal — content from Legal team
/privacy-policy     Legal — content from Legal team
/[id|en]/...        i18n routing (ID default, EN secondary)
```

## Key File Conventions

- `src/config/pricing.ts` — **single source of truth** for all pricing data (hardcoded MVP values, easy to update without logic changes)
- `messages/id.json` & `messages/en.json` — all copy/translations (no hardcoded text in components)
- Design tokens → Tailwind config extension + ShadcnUI theme

## Brand & Design

- **Logo**: "trafti" — the period is a signature brand element
- **Primary color**: `#0F172A` (deep ink)
- **Accent**: `#16A34A` (fresh green) — used for CTA buttons
- **Surface**: `#FFFFFF` / Muted: `#F8FAFC`
- **Border**: `#E2E8F0`
- **Text secondary**: `#64748B`
- **Font**: Inter / Geist Sans (variable, weight 400–800)
- **Icons**: Lucide Icons (outline 1.5–2px stroke, rounded)
- **ID tagline**: "trafti dari janji sampai jambul." / **EN**: "Look sharp in minutes."
- **Tone ID**: friendly, gaul tapi profesional — pakai "kamu" bukan "Anda" (kecuali legal pages)
- **Tone EN**: confident, modern, no-jargon, active voice

## Pricing Tiers (MVP Hardcoded)

| Tier                    | Monthly IDR | Yearly IDR   | Monthly USD | Yearly USD |
| ----------------------- | ----------- | ------------ | ----------- | ---------- |
| Free                    | Rp 0        | Rp 0         | $0          | $0         |
| Growth _(Most Popular)_ | Rp 199.000  | Rp 1.990.000 | $14         | $140       |
| Pro                     | Rp 499.000  | Rp 4.990.000 | $34         | $340       |

- IDR for locale ID, USD for locale EN (use `Intl.NumberFormat`, no live rate fetch)
- Yearly = 17% savings vs monthly
- Pricing config schema: `{ id, name, priceMonthly, priceYearly, currency, features[], highlighted: boolean, cta, limits{} }`

## i18n Rules

- Default locale: **Indonesian (ID)**, subpath `/id/...`
- English: `/en/...`
- Browser language detection on first visit → persist via cookie `NEXT_LOCALE`
- `Intl.NumberFormat` / `Intl.DateTimeFormat` for all numbers/dates
- Hreflang tags required on every page for SEO

## SEO Requirements

- SSR or SSG for all public pages
- Unique `<title>` (≤60 chars) and `<meta description>` (≤155 chars) per page
- OG + Twitter Card metadata (og:image 1200×630)
- JSON-LD structured data: `Organization`, `WebSite`, `Product`, `FAQPage`
- 1× H1 per page, logical H2/H3 hierarchy
- `next/image` with alt text, AVIF/WebP format, lazy loading

## Performance Targets (Core Web Vitals)

- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO

## Analytics Events to Track

- `cta_click_hero_primary`, `cta_click_hero_secondary`
- `cta_click_pricing_[tier]`
- `language_switched`
- `form_submitted_contact`, `form_submitted_demo_request`
- `download_appstore_click`, `download_playstore_click`
- `scroll_depth` (25%, 50%, 75%, 100%)

## Cookie Consent (Cookie Banner)

- Bottom sticky banner (NOT modal blocker), first visit only
- Strictly necessary cookies: always active (no opt-in needed)
- Analytics (GA4) + Marketing (Meta Pixel) cookies: **opt-in**
- 3 buttons: "Terima Semua", "Tolak", "Pengaturan"
- "Pengaturan": expands categories — Necessary [locked], Analytics [toggle], Marketing [toggle]
- Consent stored in cookie `trafti_cookie_consent` (12-month expiry)
- Link to `/privacy-policy#cookies`

## Accessibility

- WCAG 2.1 AA
- Semantic HTML, keyboard navigation, ARIA attributes
- Color contrast ≥ 4.5:1 for body text
- Touch targets minimum 44×44px

## Out of Scope (MVP)

- Blog / CMS
- Live chat (WhatsApp link only)
- Customer login portal on web
- A/B testing infrastructure
- Multi-currency beyond IDR & USD
