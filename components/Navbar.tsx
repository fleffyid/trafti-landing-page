"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

type NavDict = {
  features: string;
  pricing: string;
  forBusiness: string;
  forCustomer: string;
  docs: string;
  cta: string;
  lang: string;
};

export default function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: NavDict;
}) {
  const [open, setOpen] = useState(false);
  const otherLang: Locale = lang === "id" ? "en" : "id";

  const links = [
    { label: dict.features, href: `/${lang}/features` },
    { label: dict.pricing, href: `/${lang}/pricing` },
    { label: dict.forBusiness, href: `/${lang}/for-business` },
    { label: dict.forCustomer, href: `/${lang}/for-customer` },
    { label: dict.docs, href: `/${lang}/docs` },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--bg-elev)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-0 leading-none"
        >
          <span
            className="serif text-[22px] text-[var(--fg)] tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            trafti
          </span>
          <em
            className="serif not-italic text-[22px]"
            style={{ color: "var(--clay-600)", letterSpacing: "-0.02em" }}
          >
            .
          </em>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--fg-muted)]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-[var(--fg)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`/${otherLang}`}
            className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors px-2 py-1 rounded"
          >
            {otherLang.toUpperCase()}
          </Link>
          <Link
            href={`/${lang}/pricing`}
            className="bg-[var(--clay-600)] hover:bg-[var(--clay-700)] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all hover:-translate-y-px"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            {dict.cta}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--fg)]"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-elev)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[var(--fg)] py-1"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
              <Link
                href={`/${otherLang}`}
                className="text-sm font-medium text-[var(--fg-muted)]"
                onClick={() => setOpen(false)}
              >
                {otherLang.toUpperCase()}
              </Link>
              <Link
                href={`/${lang}/pricing`}
                onClick={() => setOpen(false)}
                className="bg-[var(--clay-600)] hover:bg-[var(--clay-700)] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
              >
                {dict.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
