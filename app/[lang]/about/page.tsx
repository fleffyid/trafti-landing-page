import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "id" ? "Tentang trafti" : "About trafti",
    description:
      lang === "id"
        ? "trafti didirikan dengan misi membantu pemilik barbershop dan salon Indonesia berkembang lebih mudah."
        : "trafti was founded with the mission of helping Indonesian barbershop and salon owners grow more easily.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-[var(--bg-muted)] text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-5">
          {locale === "id" ? "Tentang trafti" : "About trafti"}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          {locale === "id"
            ? "Kami percaya setiap pemilik barbershop berhak punya alat yang sama canggihnya dengan bisnis besar."
            : "We believe every barbershop owner deserves tools just as powerful as those used by large businesses."}
        </p>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-[var(--bg-elev)]">
        <div className="max-w-3xl mx-auto prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-5">
            {locale === "id" ? "Cerita Kami" : "Our Story"}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
            {locale === "id"
              ? "trafti lahir dari frustrasi nyata. Kami melihat ribuan pemilik barbershop di Indonesia masih mencatat transaksi di buku tulis, menerima booking via WhatsApp yang kacau, dan kesulitan memahami performa bisnis mereka sendiri."
              : "trafti was born from real frustration. We saw thousands of barbershop owners in Indonesia still recording transactions in notebooks, managing bookings through chaotic WhatsApp messages, and struggling to understand their own business performance."}
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
            {locale === "id"
              ? "Kami percaya masalah ini bisa diselesaikan dengan teknologi yang tepat — bukan yang rumit dan mahal, tapi yang sederhana, terjangkau, dan benar-benar membantu."
              : "We believe these problems can be solved with the right technology — not complex and expensive, but simple, affordable, and genuinely helpful."}
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {locale === "id"
              ? "Itulah mengapa kami membangun trafti — platform manajemen barbershop dan salon yang dirancang khusus untuk pasar Indonesia."
              : "That's why we built trafti — a barbershop and salon management platform designed specifically for the Indonesian market."}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-[var(--bg-muted)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[var(--bg-elev)] p-8 rounded-2xl border border-[var(--border)]">
            <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
              {locale === "id" ? "Misi" : "Mission"}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {locale === "id"
                ? "Memberdayakan setiap pemilik barbershop dan salon di Indonesia dengan teknologi yang mudah digunakan, terjangkau, dan berdampak nyata pada pertumbuhan bisnis mereka."
                : "Empowering every barbershop and salon owner in Indonesia with technology that's easy to use, affordable, and has a real impact on their business growth."}
            </p>
          </div>
          <div className="bg-[var(--primary)] p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3">
              {locale === "id" ? "Visi" : "Vision"}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {locale === "id"
                ? "Menjadi platform manajemen barbershop dan salon #1 di Asia Tenggara — menghubungkan jutaan merchant dengan pelanggan mereka."
                : "Becoming the #1 barbershop and salon management platform in Southeast Asia — connecting millions of merchants with their customers."}
            </p>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="py-20 px-6 bg-[var(--bg-elev)] text-center">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
          {locale === "id" ? "Tim Kami" : "Our Team"}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {locale === "id"
            ? "Kami adalah tim kecil yang passionate terhadap teknologi dan industri barbershop Indonesia."
            : "We're a small team passionate about technology and the Indonesian barbershop industry."}
        </p>
        <div className="inline-block bg-[var(--bg-muted)] rounded-2xl px-8 py-5 text-sm text-[var(--text-secondary)] border border-[var(--border)]">
          {locale === "id"
            ? "Foto tim akan segera hadir."
            : "Team photos coming soon."}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[var(--clay-600)] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          {locale === "id"
            ? "Mau Bergabung dalam Perjalanan Ini?"
            : "Want to Join This Journey?"}
        </h2>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 bg-[var(--bg-elev)] text-[var(--clay-600)] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[var(--clay-100)] transition-colors"
        >
          {locale === "id" ? "Hubungi Kami" : "Contact Us"}{" "}
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
