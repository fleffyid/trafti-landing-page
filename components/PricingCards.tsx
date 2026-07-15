"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import type { DisplayTier } from "@/config/pricing";
import { DURATION_MONTHS, formatIDR, featureLabel } from "@/config/pricing";
import type { Locale } from "@/app/[lang]/dictionaries";

export type PricingCardsStrings = {
  /** Full pill label per duration, e.g. { 1: "1 Bulan", 12: "12 Bulan" }. */
  durationLabels: Record<number, string>;
  /** Suffix after the per-month figure, e.g. "/bln" or "/mo". */
  perMonthSuffix: string;
  /** Prefix for the "billed total" line, e.g. "Ditagih" / "Billed". */
  billedPrefix: string;
  /** Heading above the duration selector. */
  chooseDuration: string;
  save: string;
  mostPopular: string;
  free: string;
  ctaFree: string;
  ctaPaid: string;
};

/** Savings (%) of a duration's per-month rate vs the 1-month rate. */
function savingsPct(tier: DisplayTier, months: number): number {
  const monthly = tier.monthly?.effective ?? 0;
  const row = tier.durations.find((d) => d.months === months);
  if (!monthly || !row || months === 1) return 0;
  const perMonth = row.price.effective / months;
  return Math.round((1 - perMonth / monthly) * 100);
}

export default function PricingCards({
  tiers,
  locale,
  strings,
}: {
  tiers: DisplayTier[];
  locale: Locale;
  strings: PricingCardsStrings;
}) {
  const [months, setMonths] = useState<number>(12);

  // Biggest savings across paid tiers for each duration — shown on the pills.
  const maxSaving = (m: number) =>
    Math.max(0, ...tiers.map((t) => savingsPct(t, m)));

  return (
    <>
      {/* Duration selector */}
      <div className="flex flex-col items-center mb-12">
        <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          {strings.chooseDuration}
        </p>
        <div className="inline-flex flex-wrap justify-center gap-1 bg-[var(--bg-elev)] border border-[var(--border)] rounded-2xl p-1">
          {DURATION_MONTHS.map((m) => {
            const active = months === m;
            const saving = maxSaving(m);
            return (
              <button
                key={m}
                onClick={() => setMonths(m)}
                aria-pressed={active}
                className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                  active
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
                }`}
              >
                {strings.durationLabels[m]}
                {saving > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[var(--sage-100)] text-[var(--accent)]"
                    }`}
                  >
                    -{saving}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {tiers.map((tier) => {
          const row = tier.durations.find((d) => d.months === months);
          const price = row?.price ?? tier.monthly;
          const isHighlighted = tier.highlighted;
          const isFree = tier.isFree || !price || price.effective === 0;
          const total = price?.effective ?? 0;
          const perMonth = Math.round(total / months);
          const hasDiscount = price ? price.normal > price.effective : false;
          const saving = savingsPct(tier, months);

          return (
            <div
              key={tier.slug}
              className={`rounded-2xl p-7 border-2 transition-all ${
                isHighlighted
                  ? "border-[var(--accent)] bg-[var(--primary)] shadow-2xl lg:scale-[1.03]"
                  : "border-[var(--border)] bg-[var(--bg-elev)]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-4 min-h-[1.75rem]">
                {isHighlighted && (
                  <span className="inline-block bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {strings.mostPopular}
                  </span>
                )}
                {!isFree && saving > 0 && (
                  <span
                    className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isHighlighted
                        ? "bg-white/15 text-white"
                        : "bg-[var(--sage-100)] text-[var(--accent)]"
                    }`}
                  >
                    {strings.save} {saving}%
                  </span>
                )}
              </div>

              <h2
                className={`text-xl font-bold mb-1 ${
                  isHighlighted ? "text-white" : "text-[var(--primary)]"
                }`}
              >
                {tier.name}
              </h2>

              <div className="mt-3 mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-bold ${
                      isHighlighted ? "text-white" : "text-[var(--primary)]"
                    }`}
                  >
                    {isFree ? strings.free : formatIDR(perMonth)}
                  </span>
                  {!isFree && (
                    <span
                      className={`text-sm ${
                        isHighlighted
                          ? "text-white/60"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {strings.perMonthSuffix}
                    </span>
                  )}
                </div>

                {/* Billed-total line — the actual charge for the duration. */}
                {!isFree && price && (
                  <p
                    className={`mt-1.5 text-sm ${
                      isHighlighted
                        ? "text-white/60"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {strings.billedPrefix}{" "}
                    <span className="font-semibold">{formatIDR(total)}</span>
                    {" · "}
                    {strings.durationLabels[months]}
                    {hasDiscount && (
                      <span className="line-through opacity-60 ml-1.5">
                        {formatIDR(price.normal)}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => {
                  const label = featureLabel(f, locale);
                  return (
                    <li key={label} className="flex items-start gap-2 text-sm">
                      <Check
                        size={15}
                        className="text-[var(--accent)] flex-shrink-0 mt-0.5"
                      />
                      <span
                        className={
                          isHighlighted
                            ? "text-white/90"
                            : "text-[var(--primary)]"
                        }
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={`/${locale}/for-business?plan=${tier.slug}&duration=${months}`}
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                  isHighlighted
                    ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                    : "border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--bg-muted)]"
                }`}
              >
                {isFree ? strings.ctaFree : strings.ctaPaid}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
