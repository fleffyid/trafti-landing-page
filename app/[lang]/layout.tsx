import { notFound } from "next/navigation";
import { hasLocale, getDictionary, locales, type Locale } from "./dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar lang={lang as Locale} dict={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang as Locale} dict={dict.footer} />
      <CookieBanner dict={dict.cookie} lang={lang as Locale} />
    </>
  );
}
