import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Store, Smartphone, ArrowRight, LifeBuoy } from "lucide-react";
import { hasLocale, getDictionary, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "id"
        ? "Panduan & Tutorial — trafti"
        : "Guides & Tutorials — trafti",
    description:
      lang === "id"
        ? "Panduan langkah demi langkah menggunakan trafti Merchant App dan Customer App."
        : "Step-by-step guides for using the trafti Merchant App and Customer App.",
  };
}

type Step = { title: string; desc: string };

function StepList({
  steps,
  accentBadge,
}: {
  steps: Step[];
  accentBadge: string;
}) {
  return (
    <ol className="space-y-6">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <div
            className={`w-9 h-9 rounded-xl ${accentBadge} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}
          >
            {i + 1}
          </div>
          <div>
            <p className="font-semibold text-[var(--primary)] mb-1">
              {step.title}
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {step.desc}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = dict.docs;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-[var(--bg-muted)] text-center">
        <span className="inline-block bg-[var(--clay-100)] text-[var(--clay-600)] text-xs font-semibold px-3 py-1 rounded-full mb-5">
          {t.badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-5">
          {t.title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </section>

      {/* Merchant App guide */}
      <section className="py-20 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
              <Store size={22} className="text-[var(--accent)]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">
                {t.merchant.title}
              </h2>
              <p className="text-[var(--text-secondary)] mt-1">
                {t.merchant.subtitle}
              </p>
            </div>
          </div>
          <StepList steps={t.merchant.steps} accentBadge="bg-[var(--accent)]" />
        </div>
      </section>

      {/* Customer App guide */}
      <section className="py-20 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
              <Smartphone size={22} className="text-[var(--accent)]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">
                {t.customer.title}
              </h2>
              <p className="text-[var(--text-secondary)] mt-1">
                {t.customer.subtitle}
              </p>
            </div>
          </div>
          <StepList steps={t.customer.steps} accentBadge="bg-[var(--primary)]" />
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-16 px-6 bg-[var(--clay-600)] text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
          <LifeBuoy size={22} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">{t.help.title}</h2>
        <p className="text-white/70 max-w-lg mx-auto mb-6">{t.help.desc}</p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 bg-[var(--bg-elev)] text-[var(--clay-600)] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[var(--clay-100)] transition-colors"
        >
          {t.help.cta} <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
