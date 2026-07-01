import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";

type FooterDict = {
  tagline: string;
  product: string;
  company: string;
  legal: string;
  links: {
    features: string;
    pricing: string;
    forBusiness: string;
    forCustomer: string;
    docs: string;
    about: string;
    contact: string;
    terms: string;
    privacy: string;
  };
  copyright: string;
  followUs: string;
};

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: FooterDict;
}) {
  const p = (path: string) => `/${lang}${path}`;

  return (
    <footer className="bg-[var(--ink-900)] text-[var(--ink-300)] text-sm">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="leading-none mb-3">
            <span
              className="serif text-[22px] text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              trafti
            </span>
            <em
              className="serif not-italic text-[22px]"
              style={{ color: "var(--clay-400)", letterSpacing: "-0.02em" }}
            >
              .
            </em>
          </p>
          <p className="text-[var(--ink-500)] leading-relaxed text-sm">
            {dict.tagline}
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px]"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px]"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <p className="text-white font-semibold mb-4">{dict.product}</p>
          <ul className="space-y-3">
            <li>
              <Link
                href={p("/features")}
                className="hover:text-white transition-colors"
              >
                {dict.links.features}
              </Link>
            </li>
            <li>
              <Link
                href={p("/pricing")}
                className="hover:text-white transition-colors"
              >
                {dict.links.pricing}
              </Link>
            </li>
            <li>
              <Link
                href={p("/for-business")}
                className="hover:text-white transition-colors"
              >
                {dict.links.forBusiness}
              </Link>
            </li>
            <li>
              <Link
                href={p("/for-customer")}
                className="hover:text-white transition-colors"
              >
                {dict.links.forCustomer}
              </Link>
            </li>
            <li>
              <Link
                href={p("/docs")}
                className="hover:text-white transition-colors"
              >
                {dict.links.docs}
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-white font-semibold mb-4">{dict.company}</p>
          <ul className="space-y-3">
            <li>
              <Link
                href={p("/about")}
                className="hover:text-white transition-colors"
              >
                {dict.links.about}
              </Link>
            </li>
            <li>
              <Link
                href={p("/contact")}
                className="hover:text-white transition-colors"
              >
                {dict.links.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-white font-semibold mb-4">{dict.legal}</p>
          <ul className="space-y-3">
            <li>
              <Link
                href={p("/terms-of-service")}
                className="hover:text-white transition-colors"
              >
                {dict.links.terms}
              </Link>
            </li>
            <li>
              <Link
                href={p("/privacy-policy")}
                className="hover:text-white transition-colors"
              >
                {dict.links.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[var(--ink-500)] text-xs">{dict.copyright}</p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href={p("/terms-of-service")}
              className="hover:text-white transition-colors"
            >
              {dict.links.terms}
            </Link>
            <Link
              href={p("/privacy-policy")}
              className="hover:text-white transition-colors"
            >
              {dict.links.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
