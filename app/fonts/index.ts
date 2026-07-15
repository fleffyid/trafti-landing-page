import localFont from "next/font/local";

// Self-hosted fonts (no runtime request to Google, no build-time CDN fetch).
// Files live in ./*.woff2 — latin + latin-ext subsets cover Indonesian & English.

export const plusJakartaSans = localFont({
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  src: [
    {
      path: "./PlusJakartaSans-latin.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "./PlusJakartaSans-latin-ext.woff2",
      weight: "300 800",
      style: "normal",
    },
  ],
});

export const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  display: "swap",
  src: [
    {
      path: "./JetBrainsMono-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "./JetBrainsMono-latin-ext.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
});

export const instrumentSerif = localFont({
  variable: "--font-instrument-serif",
  display: "swap",
  src: [
    { path: "./InstrumentSerif-latin.woff2", weight: "400", style: "normal" },
    {
      path: "./InstrumentSerif-latin-ext.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./InstrumentSerif-Italic-latin.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./InstrumentSerif-Italic-latin-ext.woff2",
      weight: "400",
      style: "italic",
    },
  ],
});
