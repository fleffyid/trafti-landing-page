"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  Clock,
  MapPin,
  Loader2,
  CalendarDays,
  User,
  CreditCard,
} from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { PublicOutlet } from "@/lib/api";
import {
  fetchOutletServices,
  fetchOutletStaff,
  fetchOutletSlots,
  createGuestBooking,
  fetchGuestBookingStatus,
  BookingApiError,
  type BookingService,
  type BookingStaff,
  type BookingSlot,
  type BookingPaymentMethod,
  type GuestBookingResult,
} from "@/lib/booking-api";

const DAYS_AHEAD = 14;
const STATUS_POLL_MS = 5000;

const COPY = {
  id: {
    steps: ["Layanan", "Kapster", "Jadwal", "Data", "Bayar", "Konfirmasi"],
    pickServices: "Pilih Layanan",
    pickServicesSub: "Pilih satu atau lebih layanan.",
    pickStaff: "Pilih Kapster",
    pickStaffSub: "Pilih kapster favoritmu, atau biar kami yang atur.",
    anyStaff: "Siapa saja yang tersedia",
    pickSchedule: "Pilih Tanggal & Waktu",
    noSlots: "Tidak ada slot tersedia di tanggal ini.",
    closedDay: "Tutup",
    yourDetails: "Data Kamu",
    name: "Nama Lengkap",
    phone: "Nomor WhatsApp",
    payment: "Metode Pembayaran",
    payAtVenue: "Bayar di Tempat",
    payAtVenueDesc: "Bayar langsung di outlet saat kedatangan.",
    payViaApp: "Bayar Online Sekarang",
    payViaAppDesc: "Bayar via transfer/e-wallet untuk mengunci slot.",
    review: "Ringkasan Booking",
    notes: "Catatan (opsional)",
    notesPlaceholder: "Contoh: tolong rapikan bagian samping",
    total: "Total",
    duration: "Durasi",
    minutes: "menit",
    services: "Layanan",
    staff: "Kapster",
    schedule: "Jadwal",
    customer: "Pelanggan",
    back: "Kembali",
    next: "Lanjut",
    confirm: "Buat Booking",
    submitting: "Memproses…",
    successTitle: "Booking Berhasil!",
    successDesc: "Sampai jumpa di outlet. Tunjukkan nomor booking ini saat datang.",
    bookingNumber: "Nomor Booking",
    payPendingTitle: "Selesaikan Pembayaran",
    payPendingDesc:
      "Selesaikan pembayaran untuk mengonfirmasi booking. Halaman ini akan otomatis diperbarui.",
    payNow: "Bayar Sekarang",
    waitingPayment: "Menunggu pembayaran…",
    paidTitle: "Pembayaran Berhasil!",
    expiredTitle: "Pembayaran Kedaluwarsa",
    expiredDesc: "Slot dilepas. Silakan buat booking baru.",
    bookAgain: "Booking Lagi",
    loadError: "Gagal memuat data. Coba lagi.",
    retry: "Coba lagi",
    at: "di",
  },
  en: {
    steps: ["Services", "Barber", "Schedule", "Details", "Payment", "Confirm"],
    pickServices: "Choose Services",
    pickServicesSub: "Pick one or more services.",
    pickStaff: "Choose a Barber",
    pickStaffSub: "Pick your favourite barber, or let us assign one.",
    anyStaff: "Anyone available",
    pickSchedule: "Pick a Date & Time",
    noSlots: "No slots available on this date.",
    closedDay: "Closed",
    yourDetails: "Your Details",
    name: "Full Name",
    phone: "WhatsApp Number",
    payment: "Payment Method",
    payAtVenue: "Pay at Venue",
    payAtVenueDesc: "Pay in person at the outlet on arrival.",
    payViaApp: "Pay Online Now",
    payViaAppDesc: "Pay by transfer/e-wallet to lock your slot.",
    review: "Booking Summary",
    notes: "Notes (optional)",
    notesPlaceholder: "e.g. please tidy up the sides",
    total: "Total",
    duration: "Duration",
    minutes: "min",
    services: "Services",
    staff: "Barber",
    schedule: "Schedule",
    customer: "Customer",
    back: "Back",
    next: "Next",
    confirm: "Confirm Booking",
    submitting: "Processing…",
    successTitle: "Booking Confirmed!",
    successDesc: "See you at the outlet. Show this booking number on arrival.",
    bookingNumber: "Booking Number",
    payPendingTitle: "Complete Payment",
    payPendingDesc:
      "Complete payment to confirm your booking. This page updates automatically.",
    payNow: "Pay Now",
    waitingPayment: "Waiting for payment…",
    paidTitle: "Payment Successful!",
    expiredTitle: "Payment Expired",
    expiredDesc: "The slot was released. Please make a new booking.",
    bookAgain: "Book Again",
    loadError: "Failed to load. Please try again.",
    retry: "Retry",
    at: "at",
  },
};

function formatIDR(value: string | number): string {
  const n = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function nowHHMM(): string {
  const d = new Date();
  return `${`${d.getHours()}`.padStart(2, "0")}:${`${d.getMinutes()}`.padStart(2, "0")}`;
}

export default function BookingWizard({
  outlet,
  locale,
}: {
  outlet: PublicOutlet;
  locale: Locale;
}) {
  const t = COPY[locale] ?? COPY.id;

  const [step, setStep] = useState(0);

  // Step 0 — services
  const [services, setServices] = useState<BookingService[] | null>(null);
  const [servicesError, setServicesError] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Step 1 — staff
  const [staff, setStaff] = useState<BookingStaff[] | null>(null);
  const [staffId, setStaffId] = useState<string | null>(null); // null = any

  // Step 2 — date & time
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<BookingSlot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [time, setTime] = useState<string | null>(null);

  // Step 3 — guest
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Step 4 — payment
  const [payment, setPayment] = useState<BookingPaymentMethod | null>(null);
  const [notes, setNotes] = useState("");

  // Step 5 — submit
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<GuestBookingResult | null>(null);
  const [payStatus, setPayStatus] = useState<string>("unpaid");

  const selected = useMemo(
    () => (services ?? []).filter((s) => selectedIds.includes(s.id)),
    [services, selectedIds],
  );
  const totalPrice = useMemo(
    () => selected.reduce((sum, s) => sum + Number(s.price), 0),
    [selected],
  );
  const totalDuration = useMemo(
    () => selected.reduce((sum, s) => sum + s.durationMin, 0),
    [selected],
  );

  // Load services (mount + retry). setState lives in the promise callbacks, so
  // the effect never sets state synchronously (avoids cascading renders).
  const loadServices = useCallback(() => {
    return fetchOutletServices(outlet.id)
      .then((data) => {
        setServices(data);
        setServicesError(false);
      })
      .catch(() => setServicesError(true));
  }, [outlet.id]);
  useEffect(() => {
    void loadServices();
  }, [loadServices]);

  // Bookable dates: next N days, skipping the outlet's closed weekdays.
  const dates = useMemo(() => {
    const closed = new Set(
      (outlet.operatingHours ?? [])
        .filter((h) => h.isClosed)
        .map((h) => h.dayOfWeek),
    );
    const out: Date[] = [];
    const start = new Date();
    for (let i = 0; i < DAYS_AHEAD; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (!closed.has(d.getDay())) out.push(d);
    }
    return out;
  }, [outlet.operatingHours]);

  // Fetch staff when entering the barber step (depends on chosen services).
  async function goToStaff() {
    setStep(1);
    setStaff(null);
    try {
      setStaff(await fetchOutletStaff(outlet.id, selectedIds));
    } catch {
      setStaff([]);
    }
  }

  const loadSlots = useCallback(
    async (forDate: string, forStaff: string | null) => {
      setSlotsLoading(true);
      setSlots(null);
      try {
        const data = await fetchOutletSlots(
          outlet.id,
          forDate,
          forStaff ?? undefined,
        );
        setSlots(data);
      } catch {
        setSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    },
    [outlet.id],
  );

  function selectDate(key: string) {
    setDate(key);
    setTime(null);
    void loadSlots(key, staffId);
  }

  // Filter out past slots when the selected date is today.
  const visibleSlots = useMemo(() => {
    if (!slots) return null;
    const isToday = date === toDateKey(new Date());
    const cutoff = nowHHMM();
    return slots.filter((s) => (isToday ? s.time > cutoff : true));
  }, [slots, date]);

  const canSubmit =
    selectedIds.length > 0 &&
    date !== null &&
    time !== null &&
    name.trim().length > 0 &&
    phone.trim().length >= 6 &&
    payment !== null;

  async function submit() {
    if (!canSubmit || !date || !time || !payment) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await createGuestBooking(outlet.id, {
        serviceIds: selectedIds,
        employeeId: staffId ?? undefined,
        bookingDate: date,
        startTime: time,
        guest: { name: name.trim(), phone: phone.trim() },
        paymentMethod: payment,
        notes: notes.trim() || undefined,
      });
      setResult(res);
      setPayStatus(res.paymentStatus);
    } catch (err) {
      setSubmitError(
        err instanceof BookingApiError ? err.message : t.loadError,
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Poll payment status while a pay-via-app booking is unpaid.
  useEffect(() => {
    if (
      !result ||
      result.paymentMethod !== "pay_via_app" ||
      payStatus === "paid" ||
      payStatus === "expired"
    ) {
      return;
    }
    const id = setInterval(async () => {
      try {
        const s = await fetchGuestBookingStatus(
          result.bookingId,
          result.statusToken,
        );
        setPayStatus(s.paymentStatus);
        if (s.bookingStatus === "cancelled") setPayStatus("expired");
      } catch {
        /* keep polling */
      }
    }, STATUS_POLL_MS);
    return () => clearInterval(id);
  }, [result, payStatus]);

  // ── Result screens ─────────────────────────────────────────────────────────
  if (result) {
    const isPayApp = result.paymentMethod === "pay_via_app";
    const paid = payStatus === "paid" || !isPayApp;
    const expired = payStatus === "expired";

    return (
      <Shell outlet={outlet} locale={locale}>
        <div className="max-w-md mx-auto text-center py-8">
          {expired ? (
            <ResultCard
              tone="muted"
              title={t.expiredTitle}
              desc={t.expiredDesc}
              icon={<Clock size={22} />}
            >
              <button
                onClick={() => window.location.reload()}
                className="mt-6 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {t.bookAgain}
              </button>
            </ResultCard>
          ) : paid ? (
            <ResultCard
              tone="accent"
              title={isPayApp ? t.paidTitle : t.successTitle}
              desc={t.successDesc}
              icon={<Check size={22} />}
            >
              <div className="mt-6 rounded-xl bg-[var(--bg-muted)] border border-[var(--border)] px-4 py-3">
                <p className="text-xs text-[var(--text-secondary)]">
                  {t.bookingNumber}
                </p>
                <p className="font-mono font-semibold text-[var(--primary)] break-all">
                  {result.bookingId}
                </p>
              </div>
            </ResultCard>
          ) : (
            <ResultCard
              tone="accent"
              title={t.payPendingTitle}
              desc={t.payPendingDesc}
              icon={<CreditCard size={22} />}
            >
              {result.invoiceUrl && (
                <a
                  href={result.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  {t.payNow}
                </a>
              )}
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <Loader2 size={14} className="animate-spin" />
                {t.waitingPayment}
              </p>
            </ResultCard>
          )}
        </div>
      </Shell>
    );
  }

  // ── Wizard body ────────────────────────────────────────────────────────────
  return (
    <Shell outlet={outlet} locale={locale}>
      <Stepper steps={t.steps} current={step} />

      <div className="mt-6 min-h-[280px]">
        {step === 0 && (
          <Section title={t.pickServices} subtitle={t.pickServicesSub}>
            {servicesError ? (
              <RetryBlock label={t.loadError} retry={t.retry} onRetry={loadServices} />
            ) : services === null ? (
              <SkeletonList />
            ) : (
              <div className="space-y-2">
                {services.map((s) => {
                  const checked = selectedIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() =>
                        setSelectedIds((prev) =>
                          checked
                            ? prev.filter((id) => id !== s.id)
                            : [...prev, s.id],
                        )
                      }
                      className={`w-full flex items-center gap-3 text-left border rounded-xl px-4 py-3 transition-colors ${
                        checked
                          ? "border-[var(--accent)] bg-[var(--sage-100)]"
                          : "border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border ${
                          checked
                            ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                            : "border-[var(--border)]"
                        }`}
                      >
                        {checked && <Check size={13} />}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-[var(--primary)]">
                          {s.name}
                        </span>
                        <span className="block text-xs text-[var(--text-secondary)]">
                          {s.durationMin} {t.minutes}
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-[var(--primary)]">
                        {formatIDR(s.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Section>
        )}

        {step === 1 && (
          <Section title={t.pickStaff} subtitle={t.pickStaffSub}>
            {staff === null ? (
              <SkeletonList />
            ) : (
              <div className="space-y-2">
                <StaffRow
                  label={t.anyStaff}
                  active={staffId === null}
                  onClick={() => setStaffId(null)}
                />
                {staff.map((b) => (
                  <StaffRow
                    key={b.id}
                    label={b.name}
                    active={staffId === b.id}
                    onClick={() => setStaffId(b.id)}
                  />
                ))}
              </div>
            )}
          </Section>
        )}

        {step === 2 && (
          <Section title={t.pickSchedule}>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {dates.map((d) => {
                const key = toDateKey(d);
                const active = date === key;
                return (
                  <button
                    key={key}
                    onClick={() => selectDate(key)}
                    className={`flex flex-col items-center flex-shrink-0 w-16 py-2 rounded-xl border transition-colors ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-[var(--border)] text-[var(--primary)] hover:border-[var(--accent)]"
                    }`}
                  >
                    <span className="text-[11px] uppercase opacity-80">
                      {d.toLocaleDateString(
                        locale === "id" ? "id-ID" : "en-US",
                        { weekday: "short" },
                      )}
                    </span>
                    <span className="text-lg font-semibold leading-tight">
                      {d.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              {!date ? null : slotsLoading ? (
                <SkeletonGrid />
              ) : !visibleSlots || visibleSlots.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)] py-6 text-center">
                  {t.noSlots}
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {visibleSlots.map((s) => {
                    const active = time === s.time;
                    return (
                      <button
                        key={s.time}
                        disabled={!s.isAvailable}
                        onClick={() => setTime(s.time)}
                        className={`py-2 rounded-lg border text-sm transition-colors ${
                          active
                            ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                            : s.isAvailable
                              ? "border-[var(--border)] text-[var(--primary)] hover:border-[var(--accent)]"
                              : "border-[var(--border)] text-[var(--text-secondary)] opacity-40 cursor-not-allowed line-through"
                        }`}
                      >
                        {s.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </Section>
        )}

        {step === 3 && (
          <Section title={t.yourDetails}>
            <div className="space-y-4">
              <Field label={t.name}>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder={t.name}
                />
              </Field>
              <Field label={t.phone}>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="+62 8xx-xxxx-xxxx"
                />
              </Field>
            </div>
          </Section>
        )}

        {step === 4 && (
          <Section title={t.payment}>
            <div className="space-y-2">
              {outlet.paymentOptions.payAtVenue && (
                <PayOption
                  active={payment === "pay_at_venue"}
                  title={t.payAtVenue}
                  desc={t.payAtVenueDesc}
                  onClick={() => setPayment("pay_at_venue")}
                />
              )}
              {outlet.paymentOptions.payViaApp && (
                <PayOption
                  active={payment === "pay_via_app"}
                  title={t.payViaApp}
                  desc={t.payViaAppDesc}
                  onClick={() => setPayment("pay_via_app")}
                />
              )}
            </div>
            <div className="mt-4">
              <Field label={t.notes}>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder={t.notesPlaceholder}
                />
              </Field>
            </div>
          </Section>
        )}

        {step === 5 && (
          <Section title={t.review}>
            <div className="rounded-xl border border-[var(--border)] divide-y divide-[var(--border)]">
              <SummaryRow icon={<Check size={15} />} label={t.services}>
                {selected.map((s) => (
                  <div key={s.id} className="flex justify-between gap-4">
                    <span>{s.name}</span>
                    <span className="font-medium">{formatIDR(s.price)}</span>
                  </div>
                ))}
              </SummaryRow>
              <SummaryRow icon={<User size={15} />} label={t.staff}>
                {staffId
                  ? (staff?.find((b) => b.id === staffId)?.name ?? "-")
                  : t.anyStaff}
              </SummaryRow>
              <SummaryRow icon={<CalendarDays size={15} />} label={t.schedule}>
                {date} · {time}
              </SummaryRow>
              <SummaryRow icon={<User size={15} />} label={t.customer}>
                {name} · {phone}
              </SummaryRow>
            </div>
            {submitError && (
              <p className="mt-3 text-sm text-red-600">{submitError}</p>
            )}
          </Section>
        )}
      </div>

      {/* Sticky footer: totals + navigation */}
      <div className="mt-6 border-t border-[var(--border)] pt-4">
        {selectedIds.length > 0 && (
          <div className="flex justify-between text-sm mb-3">
            <span className="text-[var(--text-secondary)]">
              {t.total} · {totalDuration} {t.minutes}
            </span>
            <span className="font-semibold text-[var(--primary)]">
              {formatIDR(totalPrice)}
            </span>
          </div>
        )}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 px-4 py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--primary)] hover:border-[var(--accent)] transition-colors"
            >
              <ChevronLeft size={16} />
              {t.back}
            </button>
          )}
          {step < 5 ? (
            <button
              disabled={!stepValid(step)}
              onClick={() => (step === 0 ? goToStaff() : setStep((s) => s + 1))}
              className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              {t.next}
            </button>
          ) : (
            <button
              disabled={!canSubmit || submitting}
              onClick={submit}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? t.submitting : t.confirm}
            </button>
          )}
        </div>
      </div>
    </Shell>
  );

  // Per-step "Next" gating.
  function stepValid(s: number): boolean {
    switch (s) {
      case 0:
        return selectedIds.length > 0;
      case 2:
        return time !== null;
      case 3:
        return name.trim().length > 0 && phone.trim().length >= 6;
      case 4:
        return payment !== null;
      default:
        return true;
    }
  }
}

// ── Presentational helpers ────────────────────────────────────────────────────

function Shell({
  outlet,
  locale,
  children,
}: {
  outlet: PublicOutlet;
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = COPY[locale] ?? COPY.id;
  return (
    <div className="pt-16">
      <section className="py-10 px-6 bg-[var(--bg-muted)] text-center">
        <h1
          className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {outlet.name}
        </h1>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <MapPin size={14} />
          {outlet.address}, {outlet.city}
        </p>
      </section>
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <p className="sr-only">
            {t.pickServices} {t.at} {outlet.name}
          </p>
          {children}
        </div>
      </section>
    </div>
  );
}

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((label, i) => (
        <div key={label} className="flex-1">
          <div
            className={`h-1 rounded-full transition-colors ${
              i <= current ? "bg-[var(--accent)]" : "bg-[var(--border)]"
            }`}
          />
          <span
            className={`mt-1.5 block text-[10px] text-center transition-colors ${
              i === current
                ? "text-[var(--accent)] font-medium"
                : "text-[var(--text-secondary)]"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--primary)]">{title}</h2>
      {subtitle && (
        <p className="text-sm text-[var(--text-secondary)] mb-4">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--primary)] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function StaffRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 text-left border rounded-xl px-4 py-3 transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--sage-100)]"
          : "border-[var(--border)] hover:border-[var(--accent)]"
      }`}
    >
      <span className="w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center flex-shrink-0">
        <User size={15} className="text-[var(--text-secondary)]" />
      </span>
      <span className="text-sm font-medium text-[var(--primary)]">{label}</span>
      {active && <Check size={16} className="ml-auto text-[var(--accent)]" />}
    </button>
  );
}

function PayOption({
  active,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border rounded-xl px-4 py-3 transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--sage-100)]"
          : "border-[var(--border)] hover:border-[var(--accent)]"
      }`}
    >
      <span className="block text-sm font-medium text-[var(--primary)]">
        {title}
      </span>
      <span className="block text-xs text-[var(--text-secondary)]">{desc}</span>
    </button>
  );
}

function SummaryRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 px-4 py-3 text-sm">
      <span className="w-6 h-6 rounded-md bg-[var(--sage-100)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-xs text-[var(--text-secondary)] mb-0.5">{label}</p>
        <div className="text-[var(--primary)] space-y-0.5">{children}</div>
      </div>
    </div>
  );
}

function ResultCard({
  tone,
  title,
  desc,
  icon,
  children,
}: {
  tone: "accent" | "muted";
  title: string;
  desc: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] p-8">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
          tone === "accent"
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--bg-muted)] text-[var(--text-secondary)]"
        }`}
      >
        {icon}
      </div>
      <h2 className="font-bold text-[var(--primary)] text-xl mb-2">{title}</h2>
      <p className="text-[var(--text-secondary)] text-sm">{desc}</p>
      {children}
    </div>
  );
}

function RetryBlock({
  label,
  retry,
  onRetry,
}: {
  label: string;
  retry: string;
  onRetry: () => void;
}) {
  return (
    <div className="text-center py-8">
      <p className="text-sm text-[var(--text-secondary)] mb-3">{label}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:border-[var(--accent)] transition-colors"
      >
        {retry}
      </button>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-14 rounded-xl bg-[var(--bg-muted)] animate-pulse"
        />
      ))}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-9 rounded-lg bg-[var(--bg-muted)] animate-pulse"
        />
      ))}
    </div>
  );
}
