// Server-side client for the trafti backend (NestJS). Called only from Server
// Components. Every call is resilient: on any failure (network, non-2xx, bad
// JSON) it returns `null` so the page can fall back to a static snapshot and
// the build never breaks when the API is unreachable.

const API_BASE = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://trafti.fleffy.id"
).replace(/\/$/, "");

/** One duration row of a package. BigInt amounts arrive as strings over JSON. */
export interface ApiPackagePrice {
  durationMonths: number;
  normalPrice: string;
  discountedPrice: string | null;
  effectivePrice: string;
}

export interface ApiSubscriptionPackage {
  id: string;
  name: string;
  slug: string;
  prices: ApiPackagePrice[];
  maxOutlets: number;
  maxEmployees: number;
  platformFeeRate: number;
  features: unknown;
  isActive: boolean;
  sortOrder: number;
}

/** Raw live aggregate figures from GET /v1/public/stats. */
export interface PublicStats {
  merchants: number;
  outlets: number;
  bookings: number;
  cities: number;
}

/** Weekly operating hours row for an outlet (dayOfWeek 0=Sunday). */
export interface OutletOperatingHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

/** Which payment methods the outlet accepts (drives the booking payment step). */
export interface OutletPaymentOptions {
  payAtVenue: boolean;
  payViaApp: boolean;
}

/** Public outlet profile behind a booking link (GET /v1/public/outlets/by-slug/:slug). */
export interface PublicOutlet {
  id: string;
  name: string;
  slug: string | null;
  address: string;
  city: string;
  province: string;
  logoUrl: string | null;
  operatingHours?: OutletOperatingHour[];
  paymentOptions: OutletPaymentOptions;
}

async function apiGet<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T };
    return json.data ?? null;
  } catch {
    return null;
  }
}

export function getSubscriptionPackages(): Promise<
  ApiSubscriptionPackage[] | null
> {
  return apiGet<ApiSubscriptionPackage[]>("/v1/subscriptions/packages", 3600);
}

export function getPublicStats(): Promise<PublicStats | null> {
  return apiGet<PublicStats>("/v1/public/stats", 900);
}

/**
 * Raw outlet shape as returned by the backend. Payment flags live inside a
 * stringified `settings` blob rather than a typed `paymentOptions` object, so
 * we normalize below.
 */
interface RawOutlet {
  id: string;
  name: string;
  slug: string | null;
  address: string;
  city: string;
  province: string;
  logoUrl: string | null;
  settings?: string | null;
  operatingHours?: OutletOperatingHour[];
}

/** Parse the stringified `settings` blob into the outlet's payment options. */
function parsePaymentOptions(settings?: string | null): OutletPaymentOptions {
  try {
    const parsed = JSON.parse(settings ?? "{}") as {
      bookingPayAtOutletEnabled?: boolean;
      bookingPayViaAppEnabled?: boolean;
    };
    return {
      payAtVenue: parsed.bookingPayAtOutletEnabled ?? false,
      payViaApp: parsed.bookingPayViaAppEnabled ?? false,
    };
  } catch {
    // Bad/missing settings: fall back to pay-at-venue so the flow still works.
    return { payAtVenue: true, payViaApp: false };
  }
}

/** Resolve the outlet behind a public booking link. Returns null when unknown. */
export async function getOutletBySlug(
  slug: string,
): Promise<PublicOutlet | null> {
  const raw = await apiGet<RawOutlet>(
    `/v1/public/outlets/by-slug/${encodeURIComponent(slug)}`,
    300,
  );
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    address: raw.address,
    city: raw.city,
    province: raw.province,
    logoUrl: raw.logoUrl,
    operatingHours: raw.operatingHours,
    paymentOptions: parsePaymentOptions(raw.settings),
  };
}
