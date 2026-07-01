import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, CalendarCheck, Star } from "lucide-react";
import { hasLocale, getDictionary, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "id" ? "Untuk Pelanggan — trafti" : "For Customers — trafti",
    description:
      lang === "id"
        ? "Download Customer App trafti dan booking barbershop favoritmu kapan saja, di mana saja."
        : "Download the trafti Customer App and book your favorite barbershop anytime, anywhere.",
  };
}

export default async function ForCustomerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const steps = [
    { icon: Search, title: dict.forCustomer.steps[0] },
    { icon: CalendarCheck, title: dict.forCustomer.steps[1] },
    { icon: Star, title: dict.forCustomer.steps[2] },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-[var(--primary)] text-center">
        <span className="inline-block bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-5">
          {dict.forCustomer.badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          {dict.forCustomer.title}
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-12">
          {dict.forCustomer.subtitle}
        </p>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-white text-[var(--primary)] px-7 py-4 rounded-2xl font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.17-2.18 1.27-2.16 3.79.03 3.02 2.65 4.03 2.68 4.04l-.07.29zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-70">
                {locale === "id" ? "Download di" : "Download on the"}
              </div>
              <div>{dict.forCustomer.appStore}</div>
            </div>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-white text-[var(--primary)] px-7 py-4 rounded-2xl font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M3.18 23.76c.31.17.67.19 1.01.07l12.14-7.03-2.8-2.79-10.35 9.75zm15.95-9.22L16.8 13.2l-12.1 7c-.28.16-.49.4-.63.68l.11-.1 14.95-16.25zM.73.73C.28 1.21 0 1.9 0 2.7v18.6c0 .8.28 1.49.73 1.97l.1.1L11.6 12.5v-.27L.83.63.73.73zm15.25 8.8L13.1 7.68 1.1.68C.84.52.57.46.3.5L15.98 9.53z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-70">
                {locale === "id" ? "Dapatkan di" : "Get it on"}
              </div>
              <div>{dict.forCustomer.playStore}</div>
            </div>
          </a>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-14">
            {locale === "id"
              ? "Cara Menggunakan Customer App"
              : "How to Use the Customer App"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--clay-100)] flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-[var(--accent)]" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center mx-auto -mt-2 mb-3">
                    {i + 1}
                  </div>
                  <p className="font-medium text-[var(--primary)]">
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App mockup + QR */}
      <section className="py-20 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-[var(--border)] rounded-2xl aspect-[9/16] max-w-xs mx-auto flex items-center justify-center">
            <p className="text-sm text-[var(--text-secondary)]">
              {locale === "id" ? "Screenshot App" : "App Screenshot"}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              {dict.forCustomer.downloadTitle}
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              {locale === "id"
                ? "Scan QR code di bawah ini atau cari 'trafti Customer' di App Store dan Play Store."
                : "Scan the QR code below or search 'trafti Customer' on the App Store and Play Store."}
            </p>
            <div className="w-32 h-32 bg-[var(--border)] rounded-xl flex items-center justify-center mb-6">
              <p className="text-xs text-[var(--text-secondary)] text-center">
                QR Code
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--primary)]/90 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.17-2.18 1.27-2.16 3.79.03 3.02 2.65 4.03 2.68 4.04l-.07.29zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {dict.forCustomer.appStore}
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--primary)]/90 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M3.18 23.76c.31.17.67.19 1.01.07l12.14-7.03-2.8-2.79-10.35 9.75zm15.95-9.22L16.8 13.2l-12.1 7c-.28.16-.49.4-.63.68l.11-.1 14.95-16.25zM.73.73C.28 1.21 0 1.9 0 2.7v18.6c0 .8.28 1.49.73 1.97l.1.1L11.6 12.5v-.27L.83.63.73.73zm15.25 8.8L13.1 7.68 1.1.68C.84.52.57.46.3.5L15.98 9.53z" />
                </svg>
                {dict.forCustomer.playStore}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
