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
  Zap,
  Bell,
  Shield,
  Printer,
  Tag,
  Clock,
  ArrowRight,
} from "lucide-react";
import { hasLocale, getDictionary, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "id" ? "Fitur Lengkap trafti" : "trafti Features",
    description:
      lang === "id"
        ? "Jelajahi semua fitur trafti — POS, booking online, manajemen karyawan, analytics, dan lebih banyak lagi."
        : "Explore all trafti features — POS, online booking, staff management, analytics, and more.",
  };
}

const featureGroups = (locale: Locale) => [
  {
    id: "pos",
    icon: CreditCard,
    title: locale === "id" ? "Point of Sale (POS)" : "Point of Sale (POS)",
    desc:
      locale === "id"
        ? "Kasir digital yang cepat, akurat, dan mudah digunakan. Terima pembayaran tunai, QRIS, dan dompet digital. Cetak struk via Bluetooth printer."
        : "Fast, accurate, and easy-to-use digital cashier. Accept cash, QRIS, and digital wallet payments. Print receipts via Bluetooth printer.",
    bullets:
      locale === "id"
        ? [
            "Proses transaksi dalam hitungan detik",
            "Mendukung berbagai metode pembayaran",
            "Riwayat transaksi lengkap",
            "Void & refund mudah",
          ]
        : [
            "Process transactions in seconds",
            "Supports multiple payment methods",
            "Complete transaction history",
            "Easy void & refund",
          ],
  },
  {
    id: "staff",
    icon: Users,
    title: locale === "id" ? "Manajemen Karyawan" : "Staff Management",
    desc:
      locale === "id"
        ? "Atur jadwal, hitung komisi, dan pantau performa setiap artist secara real-time. Tidak ada lagi salah hitung gaji."
        : "Schedule shifts, calculate commissions, and monitor each artist's performance in real-time. No more payroll mistakes.",
    bullets:
      locale === "id"
        ? [
            "Jadwal karyawan fleksibel",
            "Komisi otomatis per layanan",
            "Laporan performa individu",
            "Multi-role access control",
          ]
        : [
            "Flexible staff scheduling",
            "Automatic commission per service",
            "Individual performance reports",
            "Multi-role access control",
          ],
  },
  {
    id: "booking",
    icon: CalendarCheck,
    title: locale === "id" ? "Online Booking" : "Online Booking",
    desc:
      locale === "id"
        ? "Terima booking dari Customer App 24/7. Konfirmasi otomatis, pengingat otomatis ke pelanggan, dan manajemen antrian cerdas."
        : "Accept bookings from the Customer App 24/7. Automatic confirmation, automatic reminders to customers, and smart queue management.",
    bullets:
      locale === "id"
        ? [
            "Booking real-time tanpa konfirmasi manual",
            "Reminder otomatis ke pelanggan",
            "Manajemen kapasitas cerdas",
            "Integrasi kalender",
          ]
        : [
            "Real-time booking without manual confirmation",
            "Automatic customer reminders",
            "Smart capacity management",
            "Calendar integration",
          ],
  },
  {
    id: "loyalty",
    icon: Star,
    title: locale === "id" ? "Customer Loyalty" : "Customer Loyalty",
    desc:
      locale === "id"
        ? "Bangun loyalitas pelanggan dengan sistem poin, promo eksklusif, dan notifikasi push. Pelanggan lama lebih mudah kembali."
        : "Build customer loyalty with a points system, exclusive promos, and push notifications. Make returning easier for existing customers.",
    bullets:
      locale === "id"
        ? [
            "Program poin reward",
            "Promo & diskon terjadwal",
            "Push notification ke pelanggan",
            "Riwayat kunjungan pelanggan",
          ]
        : [
            "Reward points program",
            "Scheduled promos & discounts",
            "Push notifications to customers",
            "Customer visit history",
          ],
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: locale === "id" ? "Analytics & Laporan" : "Analytics & Reports",
    desc:
      locale === "id"
        ? "Pantau omzet harian, mingguan, dan bulanan. Lihat layanan terlaris, karyawan terprodukif, dan tren bisnis — dari HP atau laptop."
        : "Monitor daily, weekly, and monthly revenue. See top services, most productive staff, and business trends — from your phone or laptop.",
    bullets:
      locale === "id"
        ? [
            "Dashboard real-time",
            "Laporan keuangan detail",
            "Analisis layanan & produk",
            "Export ke CSV/PDF (Pro)",
          ]
        : [
            "Real-time dashboard",
            "Detailed financial reports",
            "Service & product analysis",
            "Export to CSV/PDF (Pro)",
          ],
  },
  {
    id: "multi-branch",
    icon: Building2,
    title: locale === "id" ? "Multi-Cabang" : "Multi-Branch",
    desc:
      locale === "id"
        ? "Kelola lebih dari satu cabang dalam satu akun. Laporan terpusat, transfer karyawan antar cabang, dan kontrol penuh dari satu dashboard."
        : "Manage multiple branches under one account. Centralized reports, cross-branch staff transfers, and full control from one dashboard.",
    bullets:
      locale === "id"
        ? [
            "Satu akun untuk semua cabang",
            "Laporan per cabang & gabungan",
            "Transfer karyawan antar cabang",
            "Kontrol hak akses per cabang",
          ]
        : [
            "One account for all branches",
            "Per-branch & combined reports",
            "Cross-branch staff transfers",
            "Per-branch access control",
          ],
  },
];

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const groups = featureGroups(locale);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-[var(--bg-muted)] text-center">
        <h1
          className="serif text-4xl md:text-5xl font-normal text-[var(--fg)] leading-tight mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          {locale === "id"
            ? "Semua Fitur dalam Satu Platform"
            : "All Features in One Platform"}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          {locale === "id"
            ? "Dirancang khusus untuk barbershop dan salon Indonesia."
            : "Built specifically for Indonesian barbershops and salons."}
        </p>
      </section>

      {/* Feature sections alternating */}
      {groups.map((group, i) => {
        const Icon = group.icon;
        const isEven = i % 2 === 0;
        return (
          <section
            key={group.id}
            id={group.id}
            className={`py-20 px-6 ${isEven ? "bg-[var(--bg-elev)]" : "bg-[var(--bg-muted)]"}`}
          >
            <div
              className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={!isEven ? "md:order-2" : ""}>
                <div className="w-12 h-12 rounded-xl bg-[var(--sage-100)] flex items-center justify-center mb-5">
                  <Icon size={24} className="text-[var(--sage-600)]" />
                </div>
                <h2
                  className="serif text-2xl md:text-3xl font-normal text-[var(--fg)] mb-3"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {group.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {group.desc}
                </p>
                <ul className="space-y-2">
                  {group.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-[var(--fg)]"
                    >
                      <span className="text-[var(--sage-600)] mt-0.5">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`bg-[var(--border)] rounded-2xl aspect-video flex items-center justify-center ${!isEven ? "md:order-1" : ""}`}
              >
                <div className="text-center text-[var(--text-secondary)]">
                  <Icon size={40} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">
                    {locale === "id" ? "Ilustrasi" : "Illustration"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--sage-600)] text-center">
        <h2
          className="serif text-3xl font-normal text-white mb-4"
          style={{ letterSpacing: "-0.015em" }}
        >
          {locale === "id"
            ? "Coba Semua Fitur Ini Gratis"
            : "Try All These Features for Free"}
        </h2>
        <Link
          href={`/${locale}/pricing`}
          className="inline-flex items-center gap-2 bg-[var(--bg-elev)] text-[var(--sage-600)] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[var(--sage-100)] transition-colors"
        >
          {locale === "id" ? "Lihat Paket" : "See Plans"}{" "}
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
