import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "id"
        ? "Syarat & Ketentuan — trafti"
        : "Terms of Service — trafti",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  const lastUpdated = "23 Mei 2026";

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-3">
            {locale === "id" ? "Syarat & Ketentuan" : "Terms of Service"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {locale === "id" ? "Terakhir diperbarui:" : "Last updated:"}{" "}
            {lastUpdated}
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-[var(--text-secondary)] leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              1.{" "}
              {locale === "id" ? "Penerimaan Ketentuan" : "Acceptance of Terms"}
            </h2>
            <p>
              {locale === "id"
                ? "Dengan mengakses dan menggunakan platform trafti, kamu menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika kamu tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami."
                : "By accessing and using the trafti platform, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our services."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              2. {locale === "id" ? "Layanan" : "Services"}
            </h2>
            <p>
              {locale === "id"
                ? "trafti menyediakan platform manajemen barbershop dan salon yang mencakup sistem POS, booking online, manajemen karyawan, dan analytics. Layanan tersedia melalui aplikasi mobile dan dashboard web."
                : "trafti provides a barbershop and salon management platform that includes POS systems, online booking, staff management, and analytics. Services are available through mobile applications and web dashboard."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              3. {locale === "id" ? "Akun Pengguna" : "User Account"}
            </h2>
            <p>
              {locale === "id"
                ? "Kamu bertanggung jawab untuk menjaga kerahasiaan informasi akun dan kata sandi. Kamu setuju untuk segera memberitahu kami tentang penggunaan akun yang tidak sah."
                : "You are responsible for maintaining the confidentiality of your account information and password. You agree to immediately notify us of any unauthorized use of your account."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              4.{" "}
              {locale === "id"
                ? "Pembayaran & Berlangganan"
                : "Payment & Subscription"}
            </h2>
            <p>
              {locale === "id"
                ? "Paket berbayar ditagihkan sesuai siklus billing yang dipilih. Tidak ada refund untuk pembayaran yang sudah dilakukan. Kamu dapat membatalkan langganan kapan saja dan tetap dapat menggunakan layanan hingga akhir periode billing."
                : "Paid plans are billed according to your selected billing cycle. No refunds are provided for completed payments. You may cancel your subscription at any time and continue using the service until the end of the billing period."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              5. {locale === "id" ? "Larangan Penggunaan" : "Prohibited Use"}
            </h2>
            <p>
              {locale === "id"
                ? "Kamu tidak diperbolehkan menggunakan platform untuk tujuan ilegal, menyebarkan malware, melakukan reverse engineering, atau tindakan lain yang merugikan platform atau pengguna lain."
                : "You may not use the platform for illegal purposes, spread malware, perform reverse engineering, or take other actions that harm the platform or other users."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              6. {locale === "id" ? "Kontak" : "Contact"}
            </h2>
            <p>
              {locale === "id"
                ? "Untuk pertanyaan terkait syarat dan ketentuan ini, hubungi kami di legal@trafti.id"
                : "For questions regarding these terms of service, contact us at legal@trafti.id"}
            </p>
          </section>

          <div className="bg-[var(--bg-muted)] border border-[var(--border)] rounded-xl p-5 text-sm">
            <p>
              {locale === "id"
                ? "Konten lengkap Syarat & Ketentuan akan disediakan oleh tim Legal sebelum launch. Halaman ini berisi placeholder sementara."
                : "The complete Terms of Service content will be provided by the Legal team before launch. This page contains temporary placeholder content."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
