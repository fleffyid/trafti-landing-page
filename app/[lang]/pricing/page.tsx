"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Clock, ArrowRight } from "lucide-react";
import { pricingTiers, formatPrice } from "@/config/pricing";
import { useParams } from "next/navigation";
import type { Locale } from "../dictionaries";

const faqItems = {
  id: [
    { q: "Bisakah saya ganti tier kapan saja?", a: "Ya, kamu bisa upgrade atau downgrade paket kapan saja. Perubahan berlaku di siklus billing berikutnya." },
    { q: "Apakah ada refund jika saya cancel?", a: "Kami tidak menyediakan refund untuk pembayaran yang sudah dilakukan, namun kamu bisa menggunakan layanan hingga akhir periode." },
    { q: "Apakah ada free trial untuk paket berbayar?", a: "Paket Free tersedia selamanya tanpa batas waktu. Kamu bisa upgrade ke Growth atau Pro kapan saja." },
    { q: "Metode pembayaran apa yang didukung?", a: "Kami menerima transfer bank, kartu kredit/debit, QRIS, GoPay, OVO, dan Dana." },
    { q: "Apakah bisa cancel kapan saja?", a: "Tentu. Tidak ada kontrak. Kamu bisa cancel kapan saja dan tidak dikenakan biaya tambahan." },
    { q: "Apakah tersedia faktur pajak?", a: "Ya, invoice dan faktur pajak tersedia untuk semua paket berbayar. Hubungi tim support untuk informasi lebih lanjut." },
  ],
  en: [
    { q: "Can I switch tiers anytime?", a: "Yes, you can upgrade or downgrade your plan anytime. Changes take effect in the next billing cycle." },
    { q: "Is there a refund if I cancel?", a: "We don't offer refunds for completed payments, but you can use the service until the end of your period." },
    { q: "Is there a free trial for paid plans?", a: "The Free plan is available forever with no time limit. You can upgrade to Growth or Pro at any time." },
    { q: "What payment methods are supported?", a: "We accept bank transfers, credit/debit cards, QRIS, GoPay, OVO, and Dana." },
    { q: "Can I cancel anytime?", a: "Absolutely. No contract. Cancel anytime with no extra fees." },
    { q: "Are tax invoices available?", a: "Yes, invoices and tax receipts are available for all paid plans. Contact our support team for more details." },
  ],
};

export default function PricingPage() {
  const params = useParams();
  const locale = (params.lang as Locale) ?? "id";
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const t = {
    id: {
      title: "Pilih Paket yang Tepat untuk Bisnismu",
      subtitle: "Mulai gratis, upgrade kapan saja. Tidak ada kontrak.",
      monthly: "Bulanan",
      yearly: "Tahunan",
      save: "Hemat 17%",
      mostPopular: "PALING POPULER",
      perMonth: "/bln",
      perYear: "/thn",
      ctaFree: "Mulai Gratis",
      ctaPaid: "Pilih Paket",
      comingSoon: "Segera",
      compareTitle: "Perbandingan Fitur Lengkap",
      faqTitle: "FAQ Pricing",
    },
    en: {
      title: "Choose the Right Plan for Your Business",
      subtitle: "Start free, upgrade anytime. No contract.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "Save 17%",
      mostPopular: "MOST POPULAR",
      perMonth: "/mo",
      perYear: "/yr",
      ctaFree: "Start Free",
      ctaPaid: "Choose Plan",
      comingSoon: "Coming Soon",
      compareTitle: "Full Feature Comparison",
      faqTitle: "Pricing FAQ",
    },
  }[locale];

  const faqs = faqItems[locale];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-[var(--bg-muted)] text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4">{t.title}</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-8">{t.subtitle}</p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-1 bg-[var(--bg-elev)] border border-[var(--border)] rounded-full p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              billing === "monthly"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
            }`}
          >
            {t.monthly}
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
              billing === "yearly"
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
            }`}
          >
            {t.yearly}
            <span className="bg-[var(--clay-100)] text-[var(--clay-600)] text-xs px-2 py-0.5 rounded-full font-semibold">
              {t.save}
            </span>
          </button>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {pricingTiers.map((tier) => {
            const price = formatPrice(tier, billing, locale);
            const isHighlighted = tier.highlighted;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-7 border-2 transition-all ${
                  isHighlighted
                    ? "border-[var(--accent)] bg-[var(--primary)] shadow-2xl scale-[1.03]"
                    : "border-[var(--border)]"
                }`}
              >
                {isHighlighted && (
                  <span className="inline-block bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {t.mostPopular}
                  </span>
                )}
                <h2 className={`text-xl font-bold mb-1 ${isHighlighted ? "text-white" : "text-[var(--primary)]"}`}>
                  {tier.name}
                </h2>
                <div className="flex items-baseline gap-1 mb-7">
                  <span className={`text-4xl font-bold ${isHighlighted ? "text-white" : "text-[var(--primary)]"}`}>
                    {price}
                  </span>
                  {tier.priceMonthly.IDR > 0 && (
                    <span className={`text-sm ${isHighlighted ? "text-white/60" : "text-[var(--text-secondary)]"}`}>
                      {billing === "monthly" ? t.perMonth : t.perYear}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => {
                    const label = locale === "id" ? f.label.id : f.label.en;
                    if (f.included === "coming_soon") {
                      return (
                        <li key={label} className="flex items-center gap-2 text-sm">
                          <Clock size={14} className={isHighlighted ? "text-white/40" : "text-[var(--text-secondary)]"} />
                          <span className={isHighlighted ? "text-white/40" : "text-[var(--text-secondary)]"}>{label}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 ml-auto">{t.comingSoon}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={label} className="flex items-center gap-2 text-sm">
                        {f.included ? (
                          <Check size={14} className="text-[var(--accent)] flex-shrink-0" />
                        ) : (
                          <Minus size={14} className={`flex-shrink-0 ${isHighlighted ? "text-white/30" : "text-[var(--border)]"}`} />
                        )}
                        <span
                          className={
                            !f.included
                              ? isHighlighted ? "text-white/30" : "text-[var(--border)]"
                              : isHighlighted ? "text-white/90" : "text-[var(--primary)]"
                          }
                        >
                          {label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={`/${locale}/for-business?plan=${tier.id}`}
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                    isHighlighted
                      ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                      : "border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--bg-muted)]"
                  }`}
                >
                  {tier.id === "free" ? t.ctaFree : t.ctaPaid}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--primary)] text-center mb-10">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="group border border-[var(--border)] rounded-xl bg-[var(--bg-elev)] overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-medium text-[var(--primary)] hover:bg-[var(--bg-muted)] transition-colors">
                  {item.q}
                  <span className="text-[var(--text-secondary)] group-open:rotate-180 transition-transform text-lg leading-none">
                    ↓
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
