import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/app/[lang]/dictionaries";
import { SUPPORT_EMAIL, SOCIAL } from "@/config/links";

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
          <p className="flex items-center gap-2 leading-none mb-3">
            <Image
              src="/brand/logo-mark-ondark.svg"
              alt="trafti"
              width={20}
              height={28}
              className="h-7 w-auto"
            />
            <span
              className="serif text-[22px] text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              trafti
            </span>
            <em
              className="serif not-italic text-[22px]"
              style={{ color: "var(--sage-500)", letterSpacing: "-0.02em" }}
            >
              .
            </em>
          </p>
          <p className="text-[var(--ink-500)] leading-relaxed text-sm">
            {dict.tagline}
          </p>
          {/* Support email — social channels not live yet, so we lead with a
              real way to reach us and only render icons once handles exist. */}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 mt-5 text-[var(--ink-300)] hover:text-white transition-colors text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[16px] h-[16px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            {SUPPORT_EMAIL}
          </a>
          {(SOCIAL.instagram || SOCIAL.twitter || SOCIAL.youtube) && (
            <div className="flex gap-3 mt-5">
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
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
              )}
            </div>
          )}
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
