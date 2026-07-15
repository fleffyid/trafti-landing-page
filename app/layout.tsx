import type { Metadata } from "next";
import { instrumentSerif, plusJakartaSans, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | trafti",
    default: "trafti — Kelola Barbershop & Salon Lebih Mudah",
  },
  description:
    "trafti adalah platform manajemen barbershop dan salon terlengkap di Indonesia. POS, booking online, manajemen karyawan, dan analytics dalam satu aplikasi.",
  metadataBase: new URL("https://trafti.id"),
  icons: {
    icon: [
      { url: "/brand/logo-mark.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/brand/app-icon-merchant.png",
  },
  openGraph: {
    type: "website",
    siteName: "trafti",
    title: "trafti — Kelola Barbershop & Salon Lebih Mudah",
    description:
      "POS, booking online, manajemen karyawan, dan analytics dalam satu aplikasi.",
    images: [{ url: "/brand/app-icon-merchant.png", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "trafti — Kelola Barbershop & Salon Lebih Mudah",
    description:
      "POS, booking online, manajemen karyawan, dan analytics dalam satu aplikasi.",
    images: ["/brand/app-icon-merchant.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-theme="light"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
