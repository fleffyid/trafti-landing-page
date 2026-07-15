import {
  MERCHANT_CLOSED_TEST_URL,
  MERCHANT_PLAY_STORE_URL,
  MERCHANT_PLAY_STORE_LIVE,
  CUSTOMER_APP_LIVE,
} from "@/config/links";
import type { Locale } from "@/app/[lang]/dictionaries";

const GooglePlayGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
    <path d="M3.18 23.76c.31.17.67.19 1.01.07l12.14-7.03-2.8-2.79-10.35 9.75zm15.95-9.22L16.8 13.2l-12.1 7c-.28.16-.49.4-.63.68l.11-.1 14.95-16.25zM.73.73C.28 1.21 0 1.9 0 2.7v18.6c0 .8.28 1.49.73 1.97l.1.1L11.6 12.5v-.27L.83.63.73.73zm15.25 8.8L13.1 7.68 1.1.68C.84.52.57.46.3.5L15.98 9.53z" />
  </svg>
);

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.17-2.18 1.27-2.16 3.79.03 3.02 2.65 4.03 2.68 4.04l-.07.29zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const T = {
  id: {
    joinBeta: "Gabung Beta Tertutup",
    betaNote: "Uji coba tertutup — kuota terbatas",
    soonPlay: "Segera di Google Play",
    soonAppStore: "Segera di App Store",
    getOnPlay: "Ada di Google Play",
    comingSoon: "Segera hadir",
  },
  en: {
    joinBeta: "Join Closed Beta",
    betaNote: "Closed testing — limited seats",
    soonPlay: "Soon on Google Play",
    soonAppStore: "Soon on the App Store",
    getOnPlay: "Get it on Google Play",
    comingSoon: "Coming soon",
  },
};

/** Merchant app store CTA. Closed-beta button + a disabled public Play badge
 *  until the app clears review (MERCHANT_PLAY_STORE_LIVE). */
export function MerchantAppCTA({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const t = T[locale];
  return (
    <div className={`flex flex-col sm:flex-row items-start gap-3 ${className}`}>
      <a
        href={MERCHANT_CLOSED_TEST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
      >
        <GooglePlayGlyph />
        <span className="flex flex-col leading-tight text-left">
          {t.joinBeta}
          <span className="text-[11px] font-normal text-white/70">
            {t.betaNote}
          </span>
        </span>
      </a>

      {MERCHANT_PLAY_STORE_LIVE ? (
        <a
          href={MERCHANT_PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--bg-elev)] border border-[var(--border)] text-[var(--fg)] px-5 py-3 rounded-xl font-semibold text-sm hover:border-[var(--accent)] transition-colors"
        >
          <GooglePlayGlyph />
          {t.getOnPlay}
        </a>
      ) : (
        <span
          aria-disabled
          className="inline-flex items-center gap-2 border border-dashed border-[var(--border-strong)] text-[var(--fg-faint)] px-5 py-3 rounded-xl font-semibold text-sm cursor-not-allowed select-none"
        >
          <GooglePlayGlyph />
          {t.soonPlay}
        </span>
      )}
    </div>
  );
}

function StoreBadge({
  glyph,
  title,
  label,
}: {
  glyph: React.ReactNode;
  title: string;
  label: string;
}) {
  return (
    <span
      aria-disabled
      className="inline-flex items-center gap-2 bg-white/10 text-white/60 border border-white/15 px-5 py-3 rounded-xl font-semibold text-sm cursor-not-allowed select-none"
    >
      {glyph}
      <span className="flex flex-col leading-tight text-left">
        {title}
        <span className="text-[11px] font-normal text-white/40">{label}</span>
      </span>
    </span>
  );
}

/** Customer app badges — still in development, so both stores show a disabled
 *  "coming soon" state until CUSTOMER_APP_LIVE. */
export function CustomerAppBadges({ locale }: { locale: Locale }) {
  const t = T[locale];
  if (CUSTOMER_APP_LIVE) return null;
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <StoreBadge
        glyph={<AppleGlyph />}
        title={t.comingSoon}
        label={t.soonAppStore}
      />
      <StoreBadge
        glyph={<GooglePlayGlyph />}
        title={t.comingSoon}
        label={t.soonPlay}
      />
    </div>
  );
}
