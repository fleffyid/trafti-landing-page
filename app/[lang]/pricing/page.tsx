import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "../dictionaries";
import { getSubscriptionPackages } from "@/lib/api";
import { buildAllTiers } from "@/config/pricing";
import PricingCards from "@/components/PricingCards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: isEn ? "Pricing" : "Harga",
    description: isEn
      ? "Simple, transparent pricing for barbershops and salons. Start free, upgrade anytime. No contract."
      : "Harga transparan untuk barbershop & salon. Mulai gratis, upgrade kapan saja. Tanpa kontrak.",
    alternates: { canonical: `/${lang}/pricing` },
  };
}

const faqItems = {
  id: [
    { q: "Bisakah saya ganti tier kapan saja?", a: "Ya, kamu bisa upgrade atau downgrade paket kapan saja. Perubahan berlaku di siklus billing berikutnya." },
    { q: "Apakah ada refund jika saya cancel?", a: "Kami tidak menyediakan refund untuk pembayaran yang sudah dilakukan, namun kamu bisa menggunakan layanan hingga akhir periode." },
    { q: "Apakah ada free trial untuk paket berbayar?", a: "Paket Free tersedia untuk mulai tanpa biaya. Kamu bisa upgrade ke Basic, Pro, atau Enterprise kapan saja." },
    { q: "Metode pembayaran apa yang didukung?", a: "Pembayaran langganan diproses lewat mayar.id — transfer bank, kartu, QRIS, dan e-wallet." },
    { q: "Apakah bisa cancel kapan saja?", a: "Tentu. Tidak ada kontrak. Kamu bisa cancel kapan saja dan tidak dikenakan biaya tambahan." },
    { q: "Apakah tersedia faktur pajak?", a: "Ya, invoice tersedia untuk semua paket berbayar. Hubungi tim support untuk informasi lebih lanjut." },
  ],
  en: [
    { q: "Can I switch tiers anytime?", a: "Yes, you can upgrade or downgrade your plan anytime. Changes take effect in the next billing cycle." },
    { q: "Is there a refund if I cancel?", a: "We don't offer refunds for completed payments, but you can use the service until the end of your period." },
    { q: "Is there a free trial for paid plans?", a: "The Free plan lets you start at no cost. You can upgrade to Basic, Pro, or Enterprise at any time." },
    { q: "What payment methods are supported?", a: "Subscription billing runs through mayar.id — bank transfer, cards, QRIS, and e-wallets." },
    { q: "Can I cancel anytime?", a: "Absolutely. No contract. Cancel anytime with no extra fees." },
    { q: "Are tax invoices available?", a: "Yes, invoices are available for all paid plans. Contact our support team for more details." },
  ],
};

const copy = {
  id: {
    title: "Pilih Paket yang Tepat untuk Bisnismu",
    subtitle: "Mulai gratis, upgrade kapan saja. Tidak ada kontrak.",
    faqTitle: "FAQ Pricing",
    chooseDuration: "Pilih durasi langganan",
    durationLabels: { 1: "1 Bulan", 3: "3 Bulan", 6: "6 Bulan", 12: "12 Bulan" },
    perMonthSuffix: "/bln",
    billedPrefix: "Ditagih",
    save: "Hemat",
    mostPopular: "PALING POPULER",
    free: "Gratis",
    ctaFree: "Mulai Gratis",
    ctaPaid: "Pilih Paket",
  },
  en: {
    title: "Choose the Right Plan for Your Business",
    subtitle: "Start free, upgrade anytime. No contract.",
    faqTitle: "Pricing FAQ",
    chooseDuration: "Choose your billing duration",
    durationLabels: {
      1: "1 Month",
      3: "3 Months",
      6: "6 Months",
      12: "12 Months",
    },
    perMonthSuffix: "/mo",
    billedPrefix: "Billed",
    save: "Save",
    mostPopular: "MOST POPULAR",
    free: "Free",
    ctaFree: "Start Free",
    ctaPaid: "Choose Plan",
  },
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = copy[locale];

  const packages = await getSubscriptionPackages();
  const tiers = buildAllTiers(packages);
  const faqs = faqItems[locale];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-[var(--bg-muted)] text-center">
        <h1
          className="serif text-4xl md:text-5xl font-normal text-[var(--fg)] leading-tight mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t.title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">{t.subtitle}</p>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-6 bg-[var(--bg-elev)]">
        <PricingCards
          tiers={tiers}
          locale={locale}
          strings={{
            chooseDuration: t.chooseDuration,
            durationLabels: t.durationLabels,
            perMonthSuffix: t.perMonthSuffix,
            billedPrefix: t.billedPrefix,
            save: t.save,
            mostPopular: t.mostPopular,
            free: t.free,
            ctaFree: t.ctaFree,
            ctaPaid: t.ctaPaid,
          }}
        />
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-2xl mx-auto">
          <h2
            className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] text-center mb-10"
            style={{ letterSpacing: "-0.015em" }}
          >
            {t.faqTitle}
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group border border-[var(--border)] rounded-xl bg-[var(--bg-elev)] overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-medium text-[var(--primary)] hover:bg-[var(--bg-muted)] transition-colors">
                  {item.q}
                  <span className="text-[var(--text-secondary)] group-open:rotate-180 transition-transform text-lg leading-none">
                    ↓
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
