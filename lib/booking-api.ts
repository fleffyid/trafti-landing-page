// Client-side calls for the public online-booking flow. Unlike lib/api.ts
// (server-only, uses API_URL), these run in the browser from the booking
// wizard, so they use NEXT_PUBLIC_API_URL. Every endpoint here is public
// (no auth) on the trafti backend.

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://trafti.fleffy.id"
).replace(/\/$/, "");

/** A service offered at the outlet. `price` is IDR as a string (BigInt). */
export interface BookingService {
  id: string;
  name: string;
  description: string | null;
  priceType: string;
  price: string;
  durationMin: number;
}

/** A capster selectable at the outlet for the chosen services. */
export interface BookingStaff {
  id: string;
  name: string;
}

/** One bookable slot for a date (time is "HH:mm"). */
export interface BookingSlot {
  time: string;
  employeeId: string | null;
  isAvailable: boolean;
}

export type BookingPaymentMethod = "pay_at_venue" | "pay_via_app";

export interface CreateGuestBookingInput {
  serviceIds: string[];
  employeeId?: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  guest: { name: string; phone: string };
  paymentMethod: BookingPaymentMethod;
  notes?: string;
}

export interface GuestBookingResult {
  bookingId: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalPrice: string;
  invoiceUrl: string | null;
  statusToken: string;
}

export interface GuestBookingStatus {
  bookingId: string;
  bookingStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  invoiceUrl: string | null;
  invoiceExpiresAt: string | null;
}

/** Thrown on a non-2xx response, carrying the backend's message when present. */
export class BookingApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "BookingApiError";
  }
}

async function unwrap<T>(res: Response): Promise<T> {
  const json = (await res.json().catch(() => null)) as {
    data?: T;
    message?: string;
  } | null;
  if (!res.ok) {
    throw new BookingApiError(
      json?.message ?? "Terjadi kesalahan. Coba lagi.",
      res.status,
    );
  }
  return (json?.data as T) ?? (null as T);
}

export async function fetchOutletServices(
  outletId: string,
): Promise<BookingService[]> {
  const res = await fetch(
    `${API_BASE}/v1/public/outlets/${outletId}/services?limit=100`,
    { cache: "no-store" },
  );
  return unwrap<BookingService[]>(res);
}

export async function fetchOutletStaff(
  outletId: string,
  serviceIds: string[],
): Promise<BookingStaff[]> {
  const qs = serviceIds.length ? `?serviceIds=${serviceIds.join(",")}` : "";
  const res = await fetch(
    `${API_BASE}/v1/public/outlets/${outletId}/staff${qs}`,
    { cache: "no-store" },
  );
  return unwrap<BookingStaff[]>(res);
}

export async function fetchOutletSlots(
  outletId: string,
  date: string,
  employeeId?: string,
): Promise<BookingSlot[]> {
  const params = new URLSearchParams({ date });
  if (employeeId) params.set("employeeId", employeeId);
  const res = await fetch(
    `${API_BASE}/v1/public/outlets/${outletId}/slots?${params.toString()}`,
    { cache: "no-store" },
  );
  return unwrap<BookingSlot[]>(res);
}

export async function createGuestBooking(
  outletId: string,
  input: CreateGuestBookingInput,
): Promise<GuestBookingResult> {
  const res = await fetch(
    `${API_BASE}/v1/public/outlets/${outletId}/bookings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    },
  );
  return unwrap<GuestBookingResult>(res);
}

export async function fetchGuestBookingStatus(
  bookingId: string,
  token: string,
): Promise<GuestBookingStatus> {
  const res = await fetch(
    `${API_BASE}/v1/public/bookings/${bookingId}/status?token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );
  return unwrap<GuestBookingStatus>(res);
}
