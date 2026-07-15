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
      lang === "id" ? "Kebijakan Privasi — trafti" : "Privacy Policy — trafti",
  };
}

export default async function PrivacyPage({
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
          <h1
            className="serif text-4xl md:text-5xl font-normal text-[var(--fg)] leading-tight mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            {locale === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
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
              {locale === "id" ? "Data yang Kami Kumpulkan" : "Data We Collect"}
            </h2>
            <p>
              {locale === "id"
                ? "Kami mengumpulkan data yang kamu berikan secara langsung (nama, email, nomor telepon, data bisnis), data penggunaan platform, dan data teknis seperti alamat IP dan jenis perangkat."
                : "We collect data you provide directly (name, email, phone number, business data), platform usage data, and technical data such as IP address and device type."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              2.{" "}
              {locale === "id"
                ? "Tujuan Pengumpulan Data"
                : "Purpose of Data Collection"}
            </h2>
            <p>
              {locale === "id"
                ? "Data yang kami kumpulkan digunakan untuk: menyediakan dan meningkatkan layanan, mengirimkan komunikasi penting, analitik internal, dan kepatuhan hukum."
                : "Data we collect is used to: provide and improve services, send important communications, internal analytics, and legal compliance."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              3.{" "}
              {locale === "id"
                ? "Berbagi Data dengan Pihak Ketiga"
                : "Sharing Data with Third Parties"}
            </h2>
            <p>
              {locale === "id"
                ? "Kami tidak menjual data pribadimu. Kami dapat berbagi data dengan penyedia layanan terpercaya (payment gateway, hosting, analytics) yang membantu operasional kami."
                : "We do not sell your personal data. We may share data with trusted service providers (payment gateway, hosting, analytics) that help our operations."}
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold text-[var(--primary)] mb-3"
              id="cookies"
            >
              4. {locale === "id" ? "Cookie & Pelacakan" : "Cookies & Tracking"}
            </h2>
            <p>
              {locale === "id"
                ? "Kami menggunakan cookie yang diperlukan untuk fungsi platform (session, keamanan) dan cookie opsional untuk analytics (Google Analytics 4) dan marketing (Meta Pixel). Kamu dapat mengelola preferensi cookie melalui banner cookie di situs ini."
                : "We use necessary cookies for platform functionality (session, security) and optional cookies for analytics (Google Analytics 4) and marketing (Meta Pixel). You can manage cookie preferences through the cookie banner on this site."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              5. {locale === "id" ? "Hak Pengguna" : "User Rights"}
            </h2>
            <p>
              {locale === "id"
                ? "Sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP), kamu berhak mengakses, mengoreksi, menghapus data pribadi, serta mencabut persetujuan pemrosesan data."
                : "In accordance with Law No. 27 of 2022 on Personal Data Protection (UU PDP), you have the right to access, correct, delete personal data, and withdraw consent for data processing."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              6. {locale === "id" ? "Kontak DPO" : "DPO Contact"}
            </h2>
            <p>
              {locale === "id"
                ? "Untuk pertanyaan terkait privasi atau untuk menggunakan hak-hak kamu, hubungi Data Protection Officer kami di: privacy@trafti.id"
                : "For privacy inquiries or to exercise your rights, contact our Data Protection Officer at: privacy@trafti.id"}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--primary)] mb-3">
              7. {locale === "id" ? "Penyimpanan Data" : "Data Retention"}
            </h2>
            <p>
              {locale === "id"
                ? "Data form (kontak, demo request) disimpan di server Indonesia dengan retensi maksimum 24 bulan. Data transaksi bisnis disimpan sesuai ketentuan hukum yang berlaku."
                : "Form data (contact, demo request) is stored on Indonesian servers with a maximum retention of 24 months. Business transaction data is stored in accordance with applicable legal requirements."}
            </p>
          </section>

          <div className="bg-[var(--bg-muted)] border border-[var(--border)] rounded-xl p-5 text-sm">
            <p>
              {locale === "id"
                ? "Konten lengkap Kebijakan Privasi akan disediakan oleh tim Legal sebelum launch. Halaman ini berisi placeholder sementara."
                : "The complete Privacy Policy content will be provided by the Legal team before launch. This page contains temporary placeholder content."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
