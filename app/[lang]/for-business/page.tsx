import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Clock,
  BarChart2,
} from "lucide-react";
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
        ? "trafti untuk Pemilik Barbershop & Salon"
        : "trafti for Barbershop & Salon Owners",
    description:
      lang === "id"
        ? "Tingkatkan omzet barbershop kamu dengan trafti — platform manajemen barbershop & salon terlengkap di Indonesia."
        : "Grow your barbershop revenue with trafti — the most complete barbershop & salon management platform in Indonesia.",
  };
}

export default async function ForBusinessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const benefits = [
    {
      icon: TrendingUp,
      title: locale === "id" ? "Tingkatkan Omzet" : "Grow Revenue",
      desc:
        locale === "id"
          ? "Booking online 24/7 berarti kamu tidak pernah kehilangan pelanggan karena tidak bisa dihubungi. Rata-rata merchant tumbuh 40% dalam 3 bulan."
          : "24/7 online booking means you never lose customers because you couldn't be reached. Merchants grow an average of 40% in 3 months.",
    },
    {
      icon: UserCheck,
      title: locale === "id" ? "Kurangi No-Show" : "Reduce No-Shows",
      desc:
        locale === "id"
          ? "Sistem reminder otomatis mengirim notifikasi ke pelanggan H-1 dan H-2 jam sebelum jadwal. No-show turun rata-rata 60%."
          : "Automatic reminder system sends notifications to customers 1 day and 2 hours before their appointment. No-shows drop by an average of 60%.",
    },
    {
      icon: Clock,
      title:
        locale === "id" ? "Hemat Waktu Operasional" : "Save Operational Time",
      desc:
        locale === "id"
          ? "Automasi pembayaran, laporan, dan jadwal karyawan. Hemat 3–5 jam per hari yang bisa digunakan untuk fokus melayani pelanggan."
          : "Automate payments, reports, and staff scheduling. Save 3–5 hours per day that can be spent focusing on serving customers.",
    },
    {
      icon: BarChart2,
      title:
        locale === "id" ? "Data-Driven Decisions" : "Data-Driven Decisions",
      desc:
        locale === "id"
          ? "Analytics real-time membantu kamu memahami layanan terlaris, jam puncak, dan kinerja karyawan untuk keputusan bisnis yang lebih baik."
          : "Real-time analytics help you understand top services, peak hours, and staff performance for better business decisions.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[var(--clay-100)] text-[var(--accent)] text-xs font-semibold px-3 py-1 rounded-full mb-5 border border-[var(--clay-100)]">
            {dict.forMerchant.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-5 leading-tight">
            {dict.forMerchant.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10">
            {dict.forMerchant.subtitle}
          </p>
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
          >
            {locale === "id" ? "Lihat Paket" : "See Plans"}{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-14">
            {locale === "id"
              ? "Mengapa Merchant Memilih trafti"
              : "Why Merchants Choose trafti"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="flex gap-5 p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--primary)] mb-2">
                      {b.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-10">
            {locale === "id"
              ? "Semua yang Kamu Dapatkan"
              : "Everything You Get"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dict.forMerchant.benefits.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 bg-[var(--bg-elev)] p-4 rounded-xl border border-[var(--border)]"
              >
                <Check
                  size={16}
                  className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-[var(--primary)]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo request CTA */}
      <section className="py-20 px-6 bg-[var(--primary)]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {locale === "id"
              ? "Mau Lihat Demo Langsung?"
              : "Want to See a Live Demo?"}
          </h2>
          <p className="text-white/70 mb-8">
            {locale === "id"
              ? "Tim kami siap menjelaskan cara kerja trafti dan membantu setup toko kamu."
              : "Our team is ready to walk you through trafti and help set up your shop."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
          >
            {locale === "id" ? "Request Demo" : "Request a Demo"}{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
