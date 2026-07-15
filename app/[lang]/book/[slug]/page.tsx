import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "../../dictionaries";
import { getOutletBySlug } from "@/lib/api";
import { ONLINE_BOOKING_LIVE } from "@/config/links";
import BookingWizard from "@/components/BookingWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isEn = lang === "en";
  const outlet = await getOutletBySlug(slug);
  const name = outlet?.name ?? (isEn ? "Book Appointment" : "Buat Booking");
  return {
    title: isEn ? `Book at ${name}` : `Booking di ${name}`,
    description: isEn
      ? `Book your appointment at ${name} online in a few taps.`
      : `Buat janji di ${name} secara online dalam beberapa langkah.`,
    alternates: { canonical: `/${lang}/book/${slug}` },
    // Booking pages are per-outlet utilities, not marketing content.
    robots: { index: false, follow: false },
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  if (!ONLINE_BOOKING_LIVE) notFound();

  const outlet = await getOutletBySlug(slug);
  if (!outlet) notFound();

  return <BookingWizard outlet={outlet} locale={lang as Locale} />;
}
