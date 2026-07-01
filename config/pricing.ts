export type PricingTier = {
  id: string;
  name: string;
  priceMonthly: { IDR: number; USD: number };
  priceYearly: { IDR: number; USD: number };
  highlighted: boolean;
  cta: { id: string; en: string };
  limits: {
    artists: number | "unlimited";
    transactions: number | "unlimited";
  };
  features: {
    label: { id: string; en: string };
    included: boolean | "coming_soon";
    note?: string;
  }[];
};

export const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: { IDR: 0, USD: 0 },
    priceYearly: { IDR: 0, USD: 0 },
    highlighted: false,
    cta: { id: "Mulai Gratis", en: "Start Free" },
    limits: { artists: 2, transactions: 100 },
    features: [
      { label: { id: "Maks. 2 Artist/Karyawan", en: "Up to 2 Artists/Staff" }, included: true },
      { label: { id: "Online Booking dari Customer App", en: "Online Booking from Customer App" }, included: true },
      { label: { id: "POS Basic", en: "Basic POS" }, included: true },
      { label: { id: "100 Transaksi/bulan", en: "100 Transactions/month" }, included: true },
      { label: { id: "Dashboard Analytics Basic", en: "Basic Analytics Dashboard" }, included: true },
      { label: { id: "Expense Tracking", en: "Expense Tracking" }, included: false },
      { label: { id: "Multi-Account Login", en: "Multi-Account Login" }, included: false },
      { label: { id: "Bluetooth Printer Support", en: "Bluetooth Printer Support" }, included: false },
      { label: { id: "Promo & Discount Management", en: "Promo & Discount Management" }, included: false },
      { label: { id: "Marketing Tools", en: "Marketing Tools" }, included: false },
      { label: { id: "Priority Support", en: "Priority Support" }, included: false },
      { label: { id: "Multi-Cabang", en: "Multi-Branch" }, included: "coming_soon" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: { IDR: 199000, USD: 14 },
    priceYearly: { IDR: 1990000, USD: 140 },
    highlighted: true,
    cta: { id: "Pilih Paket", en: "Choose Plan" },
    limits: { artists: 10, transactions: "unlimited" },
    features: [
      { label: { id: "Maks. 10 Artist/Karyawan", en: "Up to 10 Artists/Staff" }, included: true },
      { label: { id: "Online Booking dari Customer App", en: "Online Booking from Customer App" }, included: true },
      { label: { id: "POS Basic", en: "Basic POS" }, included: true },
      { label: { id: "Transaksi Unlimited", en: "Unlimited Transactions" }, included: true },
      { label: { id: "Dashboard Analytics Full", en: "Full Analytics Dashboard" }, included: true },
      { label: { id: "Expense Tracking", en: "Expense Tracking" }, included: true },
      { label: { id: "Multi-Account Login", en: "Multi-Account Login" }, included: true },
      { label: { id: "Bluetooth Printer Support", en: "Bluetooth Printer Support" }, included: true },
      { label: { id: "Promo & Discount Management", en: "Promo & Discount Management" }, included: true },
      { label: { id: "Marketing Tools", en: "Marketing Tools" }, included: false },
      { label: { id: "Priority Support", en: "Priority Support" }, included: false },
      { label: { id: "Multi-Cabang", en: "Multi-Branch" }, included: "coming_soon" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: { IDR: 499000, USD: 34 },
    priceYearly: { IDR: 4990000, USD: 340 },
    highlighted: false,
    cta: { id: "Pilih Paket", en: "Choose Plan" },
    limits: { artists: "unlimited", transactions: "unlimited" },
    features: [
      { label: { id: "Artist/Karyawan Unlimited", en: "Unlimited Artists/Staff" }, included: true },
      { label: { id: "Online Booking dari Customer App", en: "Online Booking from Customer App" }, included: true },
      { label: { id: "POS Basic", en: "Basic POS" }, included: true },
      { label: { id: "Transaksi Unlimited", en: "Unlimited Transactions" }, included: true },
      { label: { id: "Dashboard Analytics Full + Export", en: "Full Analytics Dashboard + Export" }, included: true },
      { label: { id: "Expense Tracking", en: "Expense Tracking" }, included: true },
      { label: { id: "Multi-Account Login", en: "Multi-Account Login" }, included: true },
      { label: { id: "Bluetooth Printer Support", en: "Bluetooth Printer Support" }, included: true },
      { label: { id: "Promo & Discount Management", en: "Promo & Discount Management" }, included: true },
      { label: { id: "Marketing Tools", en: "Marketing Tools" }, included: true },
      { label: { id: "Priority Support", en: "Priority Support" }, included: true },
      { label: { id: "Multi-Cabang", en: "Multi-Branch" }, included: "coming_soon" },
    ],
  },
];

export function formatPrice(
  tier: PricingTier,
  billing: "monthly" | "yearly",
  locale: "id" | "en"
): string {
  const currency = locale === "id" ? "IDR" : "USD";
  const amount =
    billing === "monthly"
      ? tier.priceMonthly[currency]
      : tier.priceYearly[currency];

  if (amount === 0) return locale === "id" ? "Gratis" : "Free";

  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
