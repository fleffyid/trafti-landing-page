"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

type CookieDict = {
  title: string;
  desc: string;
  acceptAll: string;
  reject: string;
  settings: string;
  necessary: string;
  necessaryDesc: string;
  analytics: string;
  analyticsDesc: string;
  marketing: string;
  marketingDesc: string;
  save: string;
  learnMore: string;
};

const CONSENT_COOKIE = "trafti_cookie_consent";

export default function CookieBanner({
  dict,
  lang,
}: {
  dict: CookieDict;
  lang: Locale;
}) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = document.cookie
      .split("; ")
      .find((r) => r.startsWith(`${CONSENT_COOKIE}=`));
    if (!existing) setVisible(true);
  }, []);

  function saveConsent(value: string) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${CONSENT_COOKIE}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    setVisible(false);
  }

  function acceptAll() {
    saveConsent("all");
  }

  function reject() {
    saveConsent("necessary");
  }

  function savePreferences() {
    const val = [
      "necessary",
      analytics && "analytics",
      marketing && "marketing",
    ]
      .filter(Boolean)
      .join(",");
    saveConsent(val);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-[var(--bg-elev)] border border-[var(--border)] rounded-2xl shadow-xl shadow-black/10 p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="font-semibold text-[var(--primary)]">{dict.title}</p>
          <button
            onClick={reject}
            aria-label="Close"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          {dict.desc}{" "}
          <Link
            href={`/${lang}/privacy-policy#cookies`}
            className="underline hover:text-[var(--accent)]"
          >
            {dict.learnMore}
          </Link>
        </p>

        {/* Expanded settings */}
        {expanded && (
          <div className="mb-4 space-y-3 border border-[var(--border)] rounded-xl p-4">
            {/* Necessary (locked) */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--primary)]">
                  {dict.necessary}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {dict.necessaryDesc}
                </p>
              </div>
              <div
                className="w-10 h-5 bg-[var(--accent)] rounded-full flex-shrink-0"
                aria-label="Always on"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--primary)]">
                  {dict.analytics}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {dict.analyticsDesc}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`w-10 h-5 rounded-full flex-shrink-0 transition-colors ${analytics ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`}
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--primary)]">
                  {dict.marketing}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {dict.marketingDesc}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={marketing}
                onClick={() => setMarketing(!marketing)}
                className={`w-10 h-5 rounded-full flex-shrink-0 transition-colors ${marketing ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={acceptAll}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            {dict.acceptAll}
          </button>
          <button
            onClick={reject}
            className="border border-[var(--border)] text-sm font-medium text-[var(--primary)] px-4 py-2 rounded-full hover:bg-[var(--bg-muted)] transition-colors"
          >
            {dict.reject}
          </button>
          {expanded ? (
            <button
              onClick={savePreferences}
              className="border border-[var(--accent)] text-[var(--accent)] text-sm font-medium px-4 py-2 rounded-full hover:bg-[var(--sage-100)] transition-colors"
            >
              {dict.save}
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors ml-auto"
            >
              {dict.settings} <ChevronDown size={14} />
            </button>
          )}
          {expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] ml-auto"
            >
              <ChevronUp size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
