// Pricing content for the landing page.
//
// Live paid packages (Basic / Pro / Enterprise) — names, per-duration prices,
// and feature bullets — are the backend's job (GET /v1/subscriptions/packages).
// This file holds only what the marketing site owns locally:
//   1. the always-local Free tier,
//   2. EN translations for the DB's Indonesian feature strings,
//   3. IDR formatting,
//   4. a fallback snapshot used when the API is unreachable at build/render.
//
// Prices are IDR (the real billing currency via mayar.id). `effective` is the
// actual sale price (discountedPrice ?? normalPrice); `normal` is the strike-
// through list price.

import type { ApiSubscriptionPackage } from "@/lib/api";
import type { Locale } from "@/app/[lang]/dictionaries";

export interface DisplayPrice {
  effective: number;
  normal: number;
}

/** One purchasable duration of a tier (1 / 3 / 6 / 12 months). */
export interface DurationPrice {
  months: number;
  price: DisplayPrice;
}

export interface DisplayFeature {
  id: string;
  en: string;
}

export interface DisplayTier {
  slug: string;
  name: string;
  highlighted: boolean;
  isFree: boolean;
  /** All durations the tier can be bought for, sorted ascending by months. */
  durations: DurationPrice[];
  /** Convenience accessors derived from `durations`. */
  monthly: DisplayPrice | null;
  yearly: DisplayPrice | null;
  features: DisplayFeature[];
}

/** The durations we surface on the marketing site. */
export const DURATION_MONTHS = [1, 3, 6, 12] as const;

/** Look up a tier's price for a given duration (null if not offered). */
export function priceForMonths(
  tier: DisplayTier,
  months: number
): DisplayPrice | null {
  return tier.durations.find((d) => d.months === months)?.price ?? null;
}

/** Attach `monthly`/`yearly` convenience fields from a `durations` list. */
function withConvenience(
  base: Omit<DisplayTier, "monthly" | "yearly">
): DisplayTier {
  const at = (m: number) =>
    base.durations.find((d) => d.months === m)?.price ?? null;
  return { ...base, monthly: at(1), yearly: at(12) };
}

/** Build a durations list from flat [months, normal, effective] tuples. */
function makeDurations(
  rows: readonly (readonly [number, number, number])[]
): DurationPrice[] {
  return rows
    .map(([months, normal, effective]) => ({
      months,
      price: { normal, effective },
    }))
    .sort((a, b) => a.months - b.months);
}

// EN translations for the Indonesian feature strings stored on each package.
// Unknown strings fall back to the raw Indonesian text so nothing disappears.
export const FEATURE_EN: Record<string, string> = {
  "Manajemen 1 outlet": "Manage 1 outlet",
  "Manajemen hingga 5 outlet": "Manage up to 5 outlets",
  "Outlet tidak terbatas": "Unlimited outlets",
  "Maksimal 2 karyawan": "Up to 2 staff",
  "Maksimal 5 karyawan": "Up to 5 staff",
  "Maksimal 25 karyawan": "Up to 25 staff",
  "Karyawan tidak terbatas": "Unlimited staff",
  "Booking dari Customer App": "Bookings from Customer App",
  "POS transaksi": "POS transactions",
  "POS transaksi (100/bulan)": "POS transactions (100/mo)",
  "Laporan basic": "Basic reports",
  "Laporan lengkap": "Full reports",
  "Export laporan": "Report export",
  "Laporan lengkap + export": "Full reports + export",
  "Priority support": "Priority support",
};

function translateFeature(id: string): DisplayFeature {
  return { id, en: FEATURE_EN[id] ?? id };
}

// The Free tier never lives in the subscriptions table — it's the trial/entry
// plan surfaced only for marketing.
export const FREE_TIER: DisplayTier = withConvenience({
  slug: "free",
  name: "Free",
  highlighted: false,
  isFree: true,
  durations: DURATION_MONTHS.map((months) => ({
    months,
    price: { effective: 0, normal: 0 },
  })),
  features: [
    "Manajemen 1 outlet",
    "Maksimal 2 karyawan",
    "Booking dari Customer App",
    "POS transaksi (100/bulan)",
    "Laporan basic",
  ].map(translateFeature),
});

// Snapshot of the seeded packages, used only when the API can't be reached.
// Keep in sync with prisma/seed.ts SUBSCRIPTION_PACKAGES.
export const FALLBACK_PAID_TIERS: DisplayTier[] = [
  {
    slug: "basic",
    name: "Basic",
    highlighted: false,
    isFree: false,
    // [months, normalPrice, effectivePrice]
    durations: makeDurations([
      [1, 89900, 69900],
      [3, 239900, 179900],
      [6, 519900, 389900],
      [12, 869900, 699900],
    ]),
    features: [
      "Manajemen 1 outlet",
      "Maksimal 5 karyawan",
      "Booking dari Customer App",
      "POS transaksi",
      "Laporan basic",
    ].map(translateFeature),
  },
  {
    slug: "pro",
    name: "Pro",
    highlighted: true,
    isFree: false,
    durations: makeDurations([
      [1, 159900, 69900],
      [3, 439900, 239900],
      [6, 869900, 499900],
      [12, 1569900, 869900],
    ]),
    features: [
      "Manajemen hingga 5 outlet",
      "Maksimal 25 karyawan",
      "Booking dari Customer App",
      "POS transaksi",
      "Laporan lengkap",
      "Export laporan",
    ].map(translateFeature),
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    highlighted: false,
    isFree: false,
    durations: makeDurations([
      [1, 229900, 199900],
      [3, 689900, 529900],
      [6, 1199900, 979900],
      [12, 2229900, 1859900],
    ]),
    features: [
      "Outlet tidak terbatas",
      "Karyawan tidak terbatas",
      "Booking dari Customer App",
      "POS transaksi",
      "Laporan lengkap + export",
      "Priority support",
    ].map(translateFeature),
  },
].map(withConvenience);

/** Normalize live packages into display tiers, sorted by the backend order. */
export function buildPaidTiers(pkgs: ApiSubscriptionPackage[]): DisplayTier[] {
  return [...pkgs]
    .filter((p) => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((p) => {
      const feats = Array.isArray(p.features) ? (p.features as string[]) : [];
      const durations: DurationPrice[] = [...p.prices]
        .map((row) => ({
          months: row.durationMonths,
          price: {
            effective: Number(
              row.effectivePrice ?? row.discountedPrice ?? row.normalPrice
            ),
            normal: Number(row.normalPrice),
          },
        }))
        .sort((a, b) => a.months - b.months);
      return withConvenience({
        slug: p.slug,
        name: p.name,
        highlighted: p.slug === "pro",
        isFree: false,
        durations,
        features: feats.map(translateFeature),
      });
    });
}

/** Full tier list (Free first) from live packages, or the fallback snapshot. */
export function buildAllTiers(
  pkgs: ApiSubscriptionPackage[] | null
): DisplayTier[] {
  const paid =
    pkgs && pkgs.length > 0 ? buildPaidTiers(pkgs) : FALLBACK_PAID_TIERS;
  return [FREE_TIER, ...paid];
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function featureLabel(f: DisplayFeature, locale: Locale): string {
  return locale === "id" ? f.id : f.en;
}
