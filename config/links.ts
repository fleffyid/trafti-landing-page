// External links & contact points. Single source of truth so the closed-beta /
// GA switch and the support address live in one place.

// Merchant app (the one currently in CLOSED testing on Google Play).
export const MERCHANT_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=trafti.app.merchant";
export const MERCHANT_CLOSED_TEST_URL =
  "https://play.google.com/apps/testing/trafti.app.merchant";

// Flip to true once the merchant app clears review and is public on Google Play.
// While false the UI shows a "Join closed beta" CTA + a disabled public badge.
export const MERCHANT_PLAY_STORE_LIVE = false;

// Customer app is still in development — no store listing yet.
export const CUSTOMER_APP_LIVE = false;

// Public per-outlet online booking (/[lang]/book/[slug]). Backend public
// endpoints are live; flip to false to take the web booking form offline.
export const ONLINE_BOOKING_LIVE = true;

// Support / contact. Social channels don't exist yet, so keep them empty and
// the UI hides the icons until a real handle lands here.
export const SUPPORT_EMAIL = "traftiapp@gmail.com";
export const SOCIAL = {
  instagram: "",
  twitter: "",
  youtube: "",
} as const;
