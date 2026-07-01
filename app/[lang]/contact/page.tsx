"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import type { Locale } from "../dictionaries";

export default function ContactPage() {
  const params = useParams();
  const locale = (params.lang as Locale) ?? "id";

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "sales",
    message: "",
  });

  const t = {
    id: {
      title: "Hubungi Kami",
      subtitle:
        "Ada pertanyaan atau ingin request demo? Tim kami siap membantu.",
      name: "Nama Lengkap",
      email: "Email",
      phone: "Nomor Telepon",
      typeLabel: "Jenis Kebutuhan",
      types: [
        "Sales / Berlangganan",
        "Support / Bantuan Teknis",
        "Partnership / Kerjasama",
      ],
      message: "Pesan",
      submit: "Kirim Pesan",
      successTitle: "Pesan Terkirim!",
      successDesc: "Tim kami akan menghubungi kamu dalam 1×24 jam kerja.",
      address: "Jl. Rapi No. 1, Jakarta Selatan, DKI Jakarta 12345",
      phone_val: "+62 21 1234 5678",
      email_val: "hello@trafti.id",
      hours: "Senin – Jumat, 09:00 – 18:00 WIB",
    },
    en: {
      title: "Contact Us",
      subtitle:
        "Have a question or want to request a demo? Our team is ready to help.",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      typeLabel: "Type of Inquiry",
      types: [
        "Sales / Subscription",
        "Support / Technical Help",
        "Partnership / Collaboration",
      ],
      message: "Message",
      submit: "Send Message",
      successTitle: "Message Sent!",
      successDesc: "Our team will reach out to you within 1 business day.",
      address: "Jl. Rapi No. 1, South Jakarta, DKI Jakarta 12345",
      phone_val: "+62 21 1234 5678",
      email_val: "hello@trafti.id",
      hours: "Monday – Friday, 9 AM – 6 PM WIB",
    },
  }[locale];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-16">
      <section className="py-20 px-6 bg-[var(--bg-muted)] text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4">
          {t.title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-[var(--clay-100)] border border-[var(--clay-100)] rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto mb-4 text-xl">
                  ✓
                </div>
                <h2 className="font-bold text-[var(--primary)] text-xl mb-2">
                  {t.successTitle}
                </h2>
                <p className="text-[var(--text-secondary)]">{t.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1.5">
                    {t.name}
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder={t.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1.5">
                    {t.email}
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="email@contoh.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1.5">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="+62 8xx-xxxx-xxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1.5">
                    {t.typeLabel}
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors bg-white"
                  >
                    {t.types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1.5">
                    {t.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--primary)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    placeholder={t.message + "..."}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  {t.submit}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--primary)] text-sm mb-0.5">
                  {locale === "id" ? "Alamat" : "Address"}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t.address}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--primary)] text-sm mb-0.5">
                  {locale === "id" ? "Telepon" : "Phone"}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t.phone_val}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--primary)] text-sm mb-0.5">
                  Email
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t.email_val}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--clay-100)] flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--primary)] text-sm mb-0.5">
                  {locale === "id" ? "Jam Operasional" : "Office Hours"}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {t.hours}
                </p>
              </div>
            </div>

            {/* Google Maps placeholder */}
            <div className="w-full h-52 bg-[var(--bg-muted)] rounded-2xl border border-[var(--border)] flex items-center justify-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Google Maps
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
