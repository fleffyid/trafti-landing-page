import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  Users,
  CalendarCheck,
  Star,
  BarChart2,
  Building2,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { hasLocale, getDictionary, type Locale } from "./dictionaries";
import { buildAllTiers, formatIDR } from "@/config/pricing";
import { getPublicStats, getSubscriptionPackages } from "@/lib/api";
import { MerchantAppCTA, CustomerAppBadges } from "@/components/AppBadges";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang === "en") {
    return {
      title: "trafti — Manage Your Barbershop & Salon Effortlessly",
      description:
        "trafti is an all-in-one barbershop and salon management platform. Online booking, POS, staff management, and analytics in one app.",
      alternates: {
        canonical: "/en",
        languages: { id: "/id", en: "/en" },
      },
    };
  }
  return {
    title: "trafti — Kelola Barbershop & Salon Lebih Mudah",
    description:
      "trafti adalah platform manajemen barbershop dan salon terlengkap. Booking online, POS, manajemen karyawan, dan analytics dalam satu aplikasi.",
    alternates: {
      canonical: "/id",
      languages: { id: "/id", en: "/en" },
    },
  };
}

const featureIcons = [
  CreditCard,
  Users,
  CalendarCheck,
  Star,
  BarChart2,
  Building2,
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const locale = lang as Locale;

  // Live data (both resilient — null on failure, handled at render).
  const [stats, packages] = await Promise.all([
    getPublicStats(),
    getSubscriptionPackages(),
  ]);
  const tiers = buildAllTiers(packages);
  const nf = new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US");
  const statItems = [
    {
      value: stats ? nf.format(stats.merchants) : "—",
      label: dict.trustedBy.merchants,
    },
    {
      value: stats ? nf.format(stats.bookings) : "—",
      label: dict.trustedBy.bookings,
    },
    {
      value: stats ? nf.format(stats.cities) : "—",
      label: dict.trustedBy.cities,
    },
  ];

  return (
    <div className="pt-16">
      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--bg-muted)] pt-20 pb-28 px-6">
        {/* background accent */}
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "var(--accent)" }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 bg-[var(--sage-100)] text-[var(--sage-600)] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-[var(--sage-100)]">
            {dict.hero.tagline}
          </span>
          <h1
            className="serif text-4xl md:text-6xl font-normal text-[var(--fg)] leading-tight mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            {dict.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            {dict.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/pricing`}
              className="bg-[var(--sage-600)] hover:bg-[var(--sage-700)] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:-translate-y-px"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/for-customer`}
              className="bg-[var(--bg-elev)] text-[var(--fg)] px-8 py-3.5 rounded-full font-semibold text-base border border-[var(--border)] hover:border-[var(--sage-600)] hover:text-[var(--sage-600)] transition-colors"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div
            className="mt-16 bg-[var(--bg-elev)] rounded-2xl border border-[var(--border)] p-6 max-w-2xl mx-auto text-left"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-[var(--sage-500)]" />
              <span className="ml-2 text-xs text-[var(--text-secondary)] font-mono">
                trafti Dashboard — Hari ini
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                {
                  label:
                    locale === "id" ? "Booking Hari Ini" : "Today's Bookings",
                  value: "12",
                },
                {
                  label: locale === "id" ? "Omzet" : "Revenue",
                  value: locale === "id" ? "Rp 1,8Jt" : "$120",
                },
                { label: locale === "id" ? "Antrian" : "Queue", value: "3" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[var(--bg-muted)] rounded-xl p-3 text-center"
                >
                  <p className="text-xl font-bold text-[var(--primary)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                {
                  name: "Ahmad",
                  service: locale === "id" ? "Potong + Cuci" : "Cut + Wash",
                  time: "10:00",
                  status: "done",
                },
                {
                  name: "Budi",
                  service: locale === "id" ? "Fade Cut" : "Fade Cut",
                  time: "10:30",
                  status: "active",
                },
                {
                  name: "Candra",
                  service: locale === "id" ? "Cukur Jenggot" : "Beard Trim",
                  time: "11:00",
                  status: "upcoming",
                },
              ].map((b) => (
                <div key={b.name} className="flex items-center gap-3 text-sm">
                  <div className="w-7 h-7 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--primary)] font-semibold text-xs flex-shrink-0">
                    {b.name[0]}
                  </div>
                  <span className="text-[var(--primary)] font-medium flex-1">
                    {b.name}
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    {b.service}
                  </span>
                  <span className="text-[var(--text-secondary)]">{b.time}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      b.status === "done"
                        ? "bg-[var(--sage-100)] text-[var(--sage-700)]"
                        : b.status === "active"
                          ? "bg-[var(--sage-100)] text-[var(--sage-700)]"
                          : "bg-[var(--ink-50)] text-[var(--ink-500)]"
                    }`}
                  >
                    {b.status === "done"
                      ? locale === "id"
                        ? "Selesai"
                        : "Done"
                      : b.status === "active"
                        ? locale === "id"
                          ? "Berlangsung"
                          : "Active"
                        : locale === "id"
                          ? "Menunggu"
                          : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trusted By ─────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-medium text-[var(--text-secondary)] mb-8 uppercase tracking-widest">
            {dict.trustedBy.label}
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            {statItems.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-[var(--primary)]">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Features Overview ──────────────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] mb-4"
              style={{ letterSpacing: "-0.015em" }}
            >
              {dict.features.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              {dict.features.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.features.items.map((item, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--sage-100)] flex items-center justify-center mb-4 group-hover:bg-[var(--sage-600)] transition-colors">
                    <Icon
                      size={20}
                      className="text-[var(--sage-600)] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-semibold text-[var(--primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/features`}
              className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-3 transition-all"
            >
              {locale === "id" ? "Lihat Semua Fitur" : "See All Features"}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] mb-4"
              style={{ letterSpacing: "-0.015em" }}
            >
              {dict.howItWorks.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              {dict.howItWorks.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.howItWorks.steps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < 2 && (
                  <div
                    aria-hidden
                    className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-[var(--border)]"
                  />
                )}
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center mx-auto mb-5 text-sm">
                  {step.step}
                </div>
                <h3 className="font-semibold text-[var(--primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. For Merchant ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block bg-[var(--sage-100)] text-[var(--sage-600)] text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-[var(--sage-100)]">
              {dict.forMerchant.badge}
            </span>
            <h2
              className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] mb-4 leading-tight"
              style={{ letterSpacing: "-0.015em" }}
            >
              {dict.forMerchant.title}
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              {dict.forMerchant.subtitle}
            </p>
            <ul className="space-y-3 mb-8">
              {dict.forMerchant.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check
                    size={16}
                    className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-[var(--primary)]">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/for-business`}
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              {dict.forMerchant.cta} <ArrowRight size={15} />
            </Link>
            <MerchantAppCTA locale={locale} className="mt-6" />
          </div>
          {/* Merchant app screenshot */}
          <div className="flex justify-center">
            <Image
              src="/screenshots/merchant-1.png"
              alt={
                locale === "id"
                  ? "Dashboard bisnis di aplikasi trafti Merchant"
                  : "Business dashboard in the trafti Merchant app"
              }
              width={330}
              height={716}
              className="h-auto w-auto max-h-[540px] rounded-[28px]"
            />
          </div>
        </div>
      </section>

      {/* ── 6. For Customer ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--primary)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Customer app — still in development */}
          <div className="bg-white/10 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center order-2 md:order-1">
            <div className="text-center">
              <Image
                src="/brand/app-icon-customer.png"
                alt="trafti Customer app icon"
                width={112}
                height={112}
                className="mx-auto mb-4 rounded-[22px] shadow-lg"
              />
              <p className="text-white/70 text-sm font-medium">
                {locale === "id"
                  ? "Aplikasi Customer segera hadir"
                  : "Customer app coming soon"}
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {dict.forCustomer.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {dict.forCustomer.title}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              {dict.forCustomer.subtitle}
            </p>
            <ol className="space-y-3 mb-8">
              {dict.forCustomer.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-white/90 text-sm">{step}</span>
                </li>
              ))}
            </ol>
            <CustomerAppBadges locale={locale} />
          </div>
        </div>
      </section>

      {/* ── 7. Testimonials ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] mb-4"
              style={{ letterSpacing: "-0.015em" }}
            >
              {dict.testimonials.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              {dict.testimonials.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.testimonials.items.map((t) => (
              <div
                key={t.name}
                className="bg-[var(--bg-muted)] rounded-2xl p-6 border border-[var(--border)]"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-[var(--primary)] text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--primary)] text-sm">
                      {t.name}
                    </p>
                    <p className="text-[var(--text-secondary)] text-xs">
                      {t.shop}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Pricing Preview ────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="serif text-3xl md:text-4xl font-normal text-[var(--fg)] mb-4"
              style={{ letterSpacing: "-0.015em" }}
            >
              {dict.pricingPreview.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              {dict.pricingPreview.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {tiers.map((tier) => {
              const isHighlighted = tier.highlighted;
              const price = tier.monthly;
              const hasDiscount = price ? price.normal > price.effective : false;
              return (
                <div
                  key={tier.slug}
                  className={`rounded-2xl p-7 border-2 transition-all ${
                    isHighlighted
                      ? "border-[var(--accent)] bg-[var(--primary)] text-white lg:scale-[1.03] shadow-xl"
                      : "border-[var(--border)] bg-[var(--bg-elev)]"
                  }`}
                >
                  {isHighlighted && (
                    <span className="inline-block bg-[var(--accent)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {dict.pricingPreview.mostPopular}
                    </span>
                  )}
                  <h3
                    className={`font-bold text-lg mb-1 ${isHighlighted ? "text-white" : "text-[var(--primary)]"}`}
                  >
                    {tier.name}
                  </h3>
                  <div className="mt-2 mb-6">
                    {hasDiscount && price && (
                      <p
                        className={`text-xs line-through ${isHighlighted ? "text-white/40" : "text-[var(--text-secondary)]"}`}
                      >
                        {formatIDR(price.normal)}
                      </p>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-3xl font-bold ${isHighlighted ? "text-white" : "text-[var(--primary)]"}`}
                      >
                        {tier.isFree || !price || price.effective === 0
                          ? dict.pricingPreview.free
                          : formatIDR(price.effective)}
                      </span>
                      {price && price.effective > 0 && (
                        <span
                          className={`text-sm ${isHighlighted ? "text-white/60" : "text-[var(--text-secondary)]"}`}
                        >
                          {dict.pricingPreview.perMonth}
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {tier.features.slice(0, 5).map((f) => (
                      <li
                        key={f.id}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 flex-shrink-0 text-[var(--accent)]"
                        />
                        <span
                          className={
                            isHighlighted
                              ? "text-white/90"
                              : "text-[var(--primary)]"
                          }
                        >
                          {locale === "id" ? f.id : f.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/pricing`}
                    className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                      isHighlighted
                        ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
                        : "bg-[var(--bg-muted)] hover:bg-[var(--sage-600)] hover:text-white text-[var(--fg)] border border-[var(--border)] hover:border-[var(--sage-600)]"
                    }`}
                  >
                    {tier.isFree
                      ? dict.pricingPreview.ctaFree
                      : dict.pricingPreview.ctaPaid}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:gap-3 transition-all"
            >
              {dict.pricingPreview.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="serif text-3xl md:text-4xl font-normal text-[var(--fg)]"
              style={{ letterSpacing: "-0.015em" }}
            >
              {dict.faq.title}
            </h2>
          </div>
          <div className="space-y-3">
            {dict.faq.items.map((item, i) => (
              <details
                key={i}
                className="group border border-[var(--border)] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-medium text-[var(--fg)] hover:bg-[var(--bg-muted)] transition-colors">
                  {item.q}
                  <ChevronDown
                    size={16}
                    className="text-[var(--text-secondary)] flex-shrink-0 group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--accent)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {dict.finalCta.title}
          </h2>
          <p className="text-white/80 text-lg mb-10">
            {dict.finalCta.subtitle}
          </p>
          <Link
            href={`/${locale}/pricing`}
            className="inline-block bg-[var(--bg-elev)] text-[var(--sage-600)] px-10 py-4 rounded-full font-bold text-base hover:bg-[var(--sage-100)] transition-colors"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            {dict.finalCta.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
