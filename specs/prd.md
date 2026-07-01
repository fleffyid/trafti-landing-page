# PRD — trafti Landing Page (Company Profile)

| Item              | Detail                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Product**       | trafti — Landing Page & Company Profile                                                                                                   |
| **Document Type** | Product Requirements Document (PRD)                                                                                                       |
| **Version**       | 1.1                                                                                                                                       |
| **Owner**         | Senior Product Manager                                                                                                                    |
| **Status**        | Approved for Engineering Kick-off                                                                                                         |
| **Last Updated**  | 23 May 2026                                                                                                                               |
| **Changelog**     | v1.1 — Resolved open questions: hardcoded pricing tiers, internal content ownership, brand guideline from scratch, cookie banner strategy |

---

## 1. Overview

### 1.1 Background

trafti adalah marketplace dua sisi untuk industri barbershop, salon, dan grooming services di Indonesia. Platform menghubungkan pemilik usaha (B2B) dengan pelanggan akhir (B2C) melalui aplikasi mobile. Landing page berperan sebagai pintu masuk utama untuk akuisisi merchant (barbershop owner) dan sumber kredibilitas brand.

### 1.2 Goals

1. Menjadi sales conversion funnel utama untuk merchant subscription (Owner → Sign Up).
2. Membangun trust & brand authority di mata calon merchant dan calon investor.
3. Mendapat peringkat organik (SEO) untuk keyword "aplikasi barbershop", "POS salon", "booking barbershop Indonesia".
4. Mengarahkan customer ke download Customer App di App Store & Play Store.

### 1.3 Non-Goals

- Tidak menyediakan registrasi/onboarding merchant langsung di web (registrasi terjadi via mobile dashboard app).
- Tidak menyediakan dashboard atau fitur transaksional di web pada fase ini.
- Tidak ada blog/CMS pada MVP (akan dipertimbangkan di fase berikutnya).

---

## 2. Target Audience

### 2.1 Primary Persona — Pemilik Barbershop / Salon

- Usia 25–45, owner 1–5 cabang.
- Pain points: pencatatan transaksi manual, tidak ada channel booking online, kesulitan akuisisi customer baru, sulit melacak kinerja artist/karyawan.
- Channel: organic search, Instagram ads, referral.

### 2.2 Secondary Persona — Customer (End User)

- Usia 18–40, urban, value time-saving.
- Datang ke landing page biasanya dari iklan atau pencarian "booking barbershop".
- Goal: mengunduh Customer App.

### 2.3 Tertiary Persona — Investor / Press

- Mencari informasi company, vision, traction.

---

## 3. Tech Stack

| Layer                 | Technology                                                 |
| --------------------- | ---------------------------------------------------------- |
| Framework             | Next.js 14+ (App Router)                                   |
| Styling               | Tailwind CSS                                               |
| UI Components         | ShadcnUI                                                   |
| Localization          | next-intl atau next-i18next                                |
| Analytics             | Google Analytics 4, Meta Pixel                             |
| SEO                   | Next.js Metadata API, sitemap.xml, robots.txt              |
| Hosting               | Vercel (recommended)                                       |
| CMS (opsional fase 2) | Sanity / Contentlayer untuk artikel                        |
| Form Handling         | Server Actions + Resend/SendGrid untuk email notifications |

---

## 4. Site Map & Page Inventory

```
/                           → Home (Landing)
/features                   → Detail fitur platform
/pricing                    → Paket subscription untuk merchant
/for-business               → Untuk pemilik barbershop (B2B page)
/for-customer               → Untuk customer (B2C page, redirect ke store)
/about                      → Tentang perusahaan
/contact                    → Kontak & demo request
/terms-of-service           → Terms of Service
/privacy-policy             → Privacy Policy
/[id|en]/...                → Versi lokal (i18n routing)
```

---

## 5. Detailed Page Requirements

### 5.1 Home Page (`/`)

**Sections (top → bottom):**

1. **Navbar** — Logo trafti, menu (Features, Pricing, For Business, For Customer), language switcher (ID/EN), CTA "Mulai Gratis".
2. **Hero Section**
   - Headline besar: "Kelola barbershop & salon Anda. Tanpa repot."
   - Sub-headline: penjelasan singkat value proposition.
   - 2 CTA: "Daftarkan Toko Saya" (primary, → /pricing) & "Download Customer App" (secondary).
   - Hero visual: mockup dashboard mobile + customer app side-by-side.
3. **Trusted By / Social Proof** — Logo merchant atau jumlah barbershop terdaftar, jumlah booking diproses.
4. **Features Overview**
   - Grid 6 fitur utama dengan icon + headline + deskripsi singkat (POS, Manajemen Karyawan, Online Booking, Customer Loyalty, Analytics, Multi-Cabang).
5. **How It Works**
   - 3 langkah: (1) Daftar & Subscribe, (2) Setup Toko, (3) Terima Booking dari App.
6. **For Merchant Section** — Detail benefit untuk owner barbershop, screenshot dashboard.
7. **For Customer Section** — Detail benefit untuk customer, screenshot customer app, link ke App Store & Play Store.
8. **Testimonials** — 3–5 quotes dari merchant aktual + foto + nama toko.
9. **Pricing Preview** — Highlight 3 paket subscription dengan CTA "Lihat Semua Paket".
10. **FAQ** — Accordion 8–10 pertanyaan umum.
11. **Final CTA Section** — Banner besar dengan tombol "Mulai Sekarang".
12. **Footer** — Sitemap, sosial media, kontak, copyright, link Terms & Privacy.

**Acceptance Criteria:**

- Hero LCP < 2.5s pada koneksi 4G.
- Semua CTA terhubung ke analytics event tracking (`cta_click_hero`, `cta_click_pricing`, dll).
- Bahasa default ID, language switcher persistent via cookie.

### 5.2 Features Page (`/features`)

- Detail granular setiap fitur dengan screenshot/illustration per fitur.
- Minimum 6 fitur utama dengan section terpisah, alternating layout (image left/right).
- Setiap fitur ada anchor link untuk deep-linking.

### 5.3 Pricing Page (`/pricing`)

**Catatan**: Pricing tier final masih dalam riset market. Untuk MVP, gunakan hardcoded values di bawah ini sebagai placeholder. Struktur tier dibuat **freemium-based** (lihat juga PRD Merchant App). Semua angka hardcoded harus mudah diubah via single config file (`src/config/pricing.ts`).

#### Tier Structure (Hardcoded MVP)

| Item                                      | Free  | Growth                   | Pro                      |
| ----------------------------------------- | ----- | ------------------------ | ------------------------ |
| **Harga Bulanan (IDR)**                   | Rp 0  | Rp 199.000               | Rp 499.000               |
| **Harga Tahunan (IDR)**                   | Rp 0  | Rp 1.990.000 (hemat 17%) | Rp 4.990.000 (hemat 17%) |
| **Harga Bulanan (USD)**                   | $0    | $14                      | $34                      |
| **Harga Tahunan (USD)**                   | $0    | $140                     | $340                     |
| Jumlah Artist/Karyawan                    | 2     | 10                       | Unlimited                |
| Online Booking dari Customer App          | ✅    | ✅                       | ✅                       |
| POS Basic                                 | ✅    | ✅                       | ✅                       |
| Transaksi/bulan                           | 100   | Unlimited                | Unlimited                |
| Dashboard Analytics                       | Basic | Full                     | Full + Export            |
| Expense Tracking                          | ❌    | ✅                       | ✅                       |
| Multi-Account Login (multi-role)          | ❌    | ✅                       | ✅                       |
| Bluetooth Printer Support                 | ❌    | ✅                       | ✅                       |
| Promo & Discount Management               | ❌    | ✅                       | ✅                       |
| Custom Operational Hours                  | ❌    | ✅                       | ✅                       |
| Marketing Tools (broadcast, banner promo) | ❌    | ❌                       | ✅                       |
| Priority Support                          | ❌    | ❌                       | ✅                       |
| Multi-Cabang (Phase 2)                    | ❌    | ❌                       | ❌ (coming soon)         |

#### Layout Requirements

- Toggle **Monthly / Yearly** di atas tabel (Yearly highlight "Hemat 17%").
- 3 pricing card berdampingan di desktop, vertical stack di mobile.
- Card "Growth" diberi badge "MOST POPULAR" sebagai default recommendation.
- Tabel perbandingan fitur lengkap di bawah card (toggle "View All Features").
- Pricing dalam **IDR untuk locale ID**, **USD untuk locale EN** (gunakan formatting `intl`, bukan fetch live rate).
- FAQ pricing-specific minimal 6 pertanyaan: ganti tier, refund policy, free trial, payment method, cancel anytime, faktur pajak.
- CTA per tier:
  - Free: "Mulai Gratis" → halaman info download Merchant App.
  - Growth & Pro: "Pilih Paket" → halaman info download Merchant App + label paket yang dipilih dipassing via deep link / query param.

#### Implementasi

- Pricing tersimpan di `src/config/pricing.ts` sebagai TypeScript object.
- Setiap tier punya: `id`, `name`, `priceMonthly`, `priceYearly`, `currency`, `features[]`, `highlighted: boolean`, `cta`, `limits{}`.
- Jika tim Business update pricing → cukup ubah 1 file, deploy.

### 5.4 For Business Page (`/for-business`)

- Long-form copy untuk merchant.
- Benefit-focused: increase revenue, reduce no-show, manajemen karyawan.
- Case study / success story (kosong di MVP, ditambahkan post-launch).
- Form "Request Demo" → email ke sales team.

### 5.5 For Customer Page (`/for-customer`)

- Singkat, fokus mengarahkan ke download.
- Tombol App Store & Play Store besar dengan QR code di desktop.
- Screenshot app flow: browse → book → review.

### 5.6 About Page (`/about`)

- Mission, vision, story singkat company.
- Team photos (opsional MVP).
- Press / media mentions section (opsional).

### 5.7 Contact Page (`/contact`)

- Form: nama, email, telepon, jenis kebutuhan (Sales/Support/Partnership), pesan.
- Info alamat kantor, telepon, email, jam operasional.
- Embed Google Maps.
- reCAPTCHA v3 anti-spam.

### 5.8 Terms of Service (`/terms-of-service`)

- Konten legal disediakan oleh tim Legal.
- Layout: typography-focused, ToC sidebar di desktop, sticky header.
- Last updated date wajib ditampilkan.

### 5.9 Privacy Policy (`/privacy-policy`)

- Konten legal disediakan oleh tim Legal.
- Cover: data yang dikumpulkan, tujuan, sharing dengan pihak ketiga, hak user, kontak DPO.
- Layout sama dengan Terms.

---

## 6. Localization (i18n)

### 6.1 Scope

- Dua bahasa: **Indonesia (default)** dan **English**.
- URL strategy: subpath routing → `/id/...` dan `/en/...`. Tanpa prefix di-redirect ke default (ID).
- Language switcher di navbar & footer.
- Browser language detection saat first visit, persist via cookie `NEXT_LOCALE`.

### 6.2 Content

- Semua copy translatable (no hardcoded text).
- Translation file disimpan di `messages/id.json` & `messages/en.json`.
- Tanggal, mata uang, dan angka di-format sesuai locale (`Intl.NumberFormat`, `Intl.DateTimeFormat`).
- Hreflang tag wajib untuk SEO multi-language.

### 6.3 Acceptance Criteria

- Tidak ada teks yang ter-render dalam bahasa salah ketika user switch.
- SEO: hreflang valid, sitemap include kedua locale.

---

## 7. SEO Requirements

### 7.1 Technical SEO

- Server-side rendering (SSR) atau Static Site Generation (SSG) untuk semua halaman publik.
- `sitemap.xml` auto-generated, submit ke Google Search Console.
- `robots.txt` ada dan benar.
- Canonical URL di setiap halaman.
- Open Graph & Twitter Card metadata di setiap halaman (judul, deskripsi, og:image 1200×630).
- Structured data JSON-LD: `Organization`, `WebSite`, `Product` (untuk pricing), `FAQPage` untuk FAQ section.
- Sitelinks Search Box markup di home.

### 7.2 On-Page SEO

- Setiap halaman punya unique `<title>` (≤60 char) dan `<meta description>` (≤155 char).
- Heading hierarchy benar: 1× H1 per page, H2/H3 nested logically.
- Image: alt text wajib, lazy loading via `next/image`, format AVIF/WebP.
- Internal linking antar halaman.
- URL clean: lowercase, dash-separated, no query params untuk konten utama.

### 7.3 Performance (Core Web Vitals)

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- Lighthouse score ≥ 90 untuk Performance, Accessibility, Best Practices, SEO.

### 7.4 Target Keywords (Primary)

- "aplikasi barbershop"
- "POS salon"
- "booking barbershop online"
- "manajemen barbershop"
- "aplikasi salon Indonesia"

---

## 8. Design & UX Requirements

### 8.1 Design Principles

- **Modern, clean, premium** — kompetitor seperti Fresha, Mangomint, Booksy sebagai benchmark.
- Light mode default, dark mode optional (nice-to-have, bukan blocker MVP).
- Typography: sans-serif modern (Inter / Geist).
- Color palette: 1 primary, 1 accent, neutral grays. Final palette ditentukan tim Design.

### 8.2 Responsive Design

- Mobile-first, breakpoints: 640px, 768px, 1024px, 1280px, 1536px.
- Test pada device aktual: iPhone SE (smallest), iPhone 14 Pro, iPad, MacBook 13", desktop 1920px.
- Touch target minimum 44×44 px.

### 8.3 Accessibility

- WCAG 2.1 AA compliance.
- Semantic HTML.
- Keyboard navigation untuk semua interactive element.
- Alt text untuk image, label untuk form, ARIA attribute sesuai kebutuhan.
- Color contrast ≥ 4.5:1 untuk body text.

### 8.4 Komponen Library (ShadcnUI)

- Button, Input, Form, Dialog, Accordion (FAQ), Tabs, Card, Select (language switcher), Sheet (mobile nav), Sonner (toast notification).

### 8.5 Brand Guideline (Created from Scratch)

Karena brand guideline dibuat dari nol, halaman ini juga berfungsi sebagai **first source of brand identity**. Wajib include:

#### Logo

- **Wordmark**: "trafti" (dengan period/titik sebagai signature element — period berfungsi sebagai mark visual yang konsisten).
- **Variants**: full logo (wordmark + tagline), wordmark only, symbol only (titik bulat / dot mark).
- **File format**: SVG (primary), PNG fallback @1x @2x @3x.
- **Clear space**: minimum padding setara dengan tinggi huruf "R".
- **Minimum size**: 24px di digital, 12mm di print.

#### Color Palette (Recommended Starting Point)

| Role           | Hex                     | Usage                                                       |
| -------------- | ----------------------- | ----------------------------------------------------------- |
| Primary        | `#0F172A` (deep ink)    | Header, primary text, brand authority                       |
| Accent         | `#16A34A` (fresh green) | CTA button, highlights — green untuk "fresh, clean, growth" |
| Surface        | `#FFFFFF`               | Background utama                                            |
| Surface Muted  | `#F8FAFC`               | Section background alternatif                               |
| Border         | `#E2E8F0`               | Divider, card border                                        |
| Text Primary   | `#0F172A`               | Body text                                                   |
| Text Secondary | `#64748B`               | Caption, helper text                                        |
| Success        | `#22C55E`               | Success state                                               |
| Warning        | `#F59E0B`               | Warning                                                     |
| Error          | `#EF4444`               | Error                                                       |

**Note**: Palette di atas adalah **starting point**. Tim Design boleh propose alternatif, dilampirkan sebagai brand guideline v1.0 terpisah.

#### Typography

- **Display & Heading**: Inter / Geist Sans (variable font, weight 400–800).
- **Body**: Inter (weight 400, 500).
- **Mono** (jika perlu): JetBrains Mono.
- **Hierarchy**:
  - H1: 48–64px desktop, 32–40px mobile, weight 700, tracking -0.02em
  - H2: 36–40px desktop, 28px mobile, weight 700
  - H3: 24px, weight 600
  - Body: 16px, weight 400, line-height 1.6
  - Small: 14px

#### Iconography

- Style: **outline 1.5–2px stroke**, rounded corners.
- Library: Lucide Icons (consistent dengan ShadcnUI).
- Brand-specific icon (POS, scissor, calendar) di-custom oleh tim Design.

#### Voice & Tone

- **Indonesia**: friendly, gaul tapi tetap profesional. "Kamu", bukan "Anda" — kecuali di legal pages.
- **English**: confident, modern, no-jargon. Active voice.
- **Brand attributes**: Reliable, Fresh, Efficient, Approachable.
- **Tagline pilihan**: "trafti dari janji sampai jambul." (ID) / "Look sharp in minutes." (EN).

#### Deliverable

- Brand guideline disusun sebagai dokumen terpisah (`brand-guideline-v1.0.pdf`) di-handover oleh tim Design **sebelum sprint 1**.
- Semua design token (color, font, spacing, radius) diimplementasikan sebagai **Tailwind config extension** + ShadcnUI theme. Single source of truth.

### 8.6 Content Ownership (Internal)

Semua copywriting di landing page **dibuat internal** oleh tim Product/Marketing. Tidak ada agency eksternal di MVP.

**Workflow:**

1. PM draft outline copy per halaman (key message, call-out, CTA).
2. Marketing/Content writer refine ke bahasa publish-ready (ID).
3. Bilingual reviewer (internal) translate ke EN, bukan literal translation — tone-adapted.
4. Final review oleh PM sebelum push ke development.

**Source of truth**: Notion / Google Docs file `trafti-Landing-Copy-v1.ID-EN.docx`, dengan struktur per-section, per-locale, ID translation key match dengan `messages/id.json` dan `messages/en.json`.

**Versi control**: setiap perubahan copy production harus via PR ke file translation, di-review minimal 1 PM + 1 Marketing.

---

## 9. Analytics & Tracking

### 9.1 Events to Track

- `page_view` (otomatis)
- `cta_click_hero_primary` / `cta_click_hero_secondary`
- `cta_click_pricing_[tier]`
- `language_switched`
- `form_submitted_contact`
- `form_submitted_demo_request`
- `download_appstore_click`
- `download_playstore_click`
- `scroll_depth` (25%, 50%, 75%, 100%)

### 9.2 Tools

- Google Analytics 4 (primary)
- Meta Pixel (ads conversion tracking)
- Google Tag Manager (manage tags centrally)
- Hotjar atau Microsoft Clarity (heatmap & session recording — opsional)

---

## 10. Compliance & Legal

### 10.1 Privacy & Cookie Compliance

**Cookie Banner Strategy** (decided): gunakan pendekatan **hybrid minimum-viable** — cukup untuk Indonesia (UU PDP) dan future-proof untuk visitor dari Eropa.

**Implementasi:**

- Banner muncul pada first visit, bottom sticky, **bukan** modal blocker.
- Default state: **strictly necessary cookies aktif** (functional, session, security) — tidak perlu opt-in (legal basis: legitimate interest).
- Analytics & marketing cookies (GA4, Meta Pixel, GTM) **opt-in** via tombol "Terima Semua" atau via toggle granular di "Pengaturan Cookie".
- 3 tombol: "Terima Semua", "Tolak", "Pengaturan".
- "Pengaturan" expand: kategori cookies (Necessary [locked on], Analytics [toggle], Marketing [toggle]).
- Pilihan user disimpan di cookie `trafti_cookie_consent` (12 bulan expiry).
- Link "Kebijakan Cookie" ke `/privacy-policy#cookies`.

**Rationale**: full GDPR-compliant CMP (Cookiebot, OneTrust) overkill untuk MVP yang fokus market Indonesia. Implementasi custom dengan ShadcnUI dialog sudah cukup memenuhi UU PDP dan basic GDPR. Upgrade ke CMP profesional jika ekspansi serius ke Eropa.

### 10.2 Legal Documents

- Terms of Service & Privacy Policy konten disediakan tim Legal **sebelum launch**.
- Wajib cover: data yang dikumpulkan, tujuan, sharing pihak ketiga, hak user (akses/koreksi/hapus), kontak DPO/PIC.
- Compliance dengan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) Indonesia.
- Data form (contact, demo request) disimpan di server SG/Indonesia dengan retensi maksimum 24 bulan.

---

## 11. Out of Scope (MVP)

- Blog / artikel CMS.
- Live chat (akan menggunakan WhatsApp link sederhana di MVP).
- Customer portal / login di web.
- A/B testing infrastructure (akan ditambahkan post-launch).
- Multi-currency display selain IDR & USD.

---

## 12. Success Metrics

| Metric                                                         | Target (3 bulan post-launch) |
| -------------------------------------------------------------- | ---------------------------- |
| Unique monthly visitors                                        | 30,000                       |
| Merchant lead conversion rate (visitor → demo request/sign-up) | ≥ 2%                         |
| Customer app download attribution dari landing                 | ≥ 5,000/bulan                |
| Lighthouse Performance                                         | ≥ 90                         |
| Average session duration                                       | ≥ 1m 30s                     |
| Bounce rate                                                    | ≤ 55%                        |

---

## 13. Timeline (Indicative)

| Phase                            | Duration           |
| -------------------------------- | ------------------ |
| Design (wireframe → hi-fi)       | 2 minggu           |
| Copywriting (ID + EN)            | 1 minggu (paralel) |
| Development                      | 3 minggu           |
| QA & Content Population          | 1 minggu           |
| SEO Setup, Analytics, Pre-launch | 3 hari             |
| Soft Launch & Iteration          | 1 minggu           |
| **Total**                        | **±7–8 minggu**    |

---

## 14. Resolved Decisions (v1.1)

| #   | Question                  | Decision                                                                                                                                                                                                                                                     |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Pricing tier sudah final? | **Belum.** Gunakan hardcoded values di section 5.3 sebagai placeholder MVP. Pricing disimpan di single config file (`src/config/pricing.ts`) sehingga mudah diubah tanpa redeploy logic. Riset market di-execute paralel oleh tim Business.                  |
| 2   | Vendor copywriting?       | **Internal.** Tim Product + Marketing menulis semua copy. Workflow & source-of-truth file detailnya di section 8.6.                                                                                                                                          |
| 3   | Brand guideline?          | **Buat dari nol.** Section 8.5 sudah berisi starting point (logo direction, palette, typography, tone). Dokumen brand guideline v1.0 final di-handover tim Design sebelum sprint 1.                                                                          |
| 4   | Domain final?             | **Belum ditentukan.** Rekomendasi prioritas cek availability: `traftiid` (best, primary market match), `traftiapp` (modern, SaaS-feel), `rapiapp.com` (fallback, lebih searchable). Lakukan trademark search untuk "trafti" di DJKI sebelum domain purchase. |
| 5   | Cookie banner strategy?   | **Hybrid minimum-viable** (lihat section 10.1). Custom implementation dengan ShadcnUI, opt-in untuk analytics/marketing cookies, strictly necessary by default. Upgrade ke CMP profesional jika ekspansi Eropa.                                              |

## 15. Remaining Open Questions

1. Apakah ada plan untuk feature flag system (LaunchDarkly / posthog) untuk gradual rollout pricing change?
2. Apakah perlu A/B testing pricing display (monthly default vs yearly default)?
3. Domain selection deadline kapan? (Blocker untuk SEO setup dan email setup.)
