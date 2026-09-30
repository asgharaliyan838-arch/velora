
"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Trending", href: "/trending" },
    { name: "Deals", href: "/deals" },
    { name: "Build Your Look", href: "/build-your-look" },
  ];

  const customerLinks = [
    { name: "My Account", href: "/account" },
    { name: "My Orders", href: "/account/orders" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Cart", href: "/cart" },
    { name: "Settings", href: "/settings" },
    { name: "Help Center", href: "/help-center" },
  ];

  const informationLinks = [
    { name: "About Velora", href: "/about" },
    { name: "Contact Us", href: "/help-center" },
    { name: "Shipping Information", href: "/help-center" },
    { name: "Returns & Refunds", href: "/help-center" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="mt-16 overflow-hidden bg-slate-950 text-white">

      {/* =========================================================
          FEATURES BAR
      ========================================================= */}
      <div className="border-b border-white/10 bg-slate-900/95">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

          {/* Fast Delivery */}
          <div className="group flex items-center gap-3 border-b border-r border-white/10 px-4 py-5 transition hover:bg-white/[0.03] sm:px-5 md:border-b-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:scale-105 group-hover:bg-orange-500/15">
              <Truck size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Fast Delivery
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Quick & reliable shipping
              </p>
            </div>
          </div>

          {/* Secure Shopping */}
          <div className="group flex items-center gap-3 border-b border-white/10 px-4 py-5 transition hover:bg-white/[0.03] sm:px-5 md:border-b-0 md:border-r">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition group-hover:scale-105 group-hover:bg-cyan-500/15">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Secure Shopping
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Safe & protected checkout
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="group flex items-center gap-3 border-r border-white/10 px-4 py-5 transition hover:bg-white/[0.03] sm:px-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 transition group-hover:scale-105 group-hover:bg-pink-500/15">
              <Headphones size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                24/7 Support
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                We're here to help
              </p>
            </div>
          </div>

          {/* Payments */}
          <div className="group flex items-center gap-3 px-4 py-5 transition hover:bg-white/[0.03] sm:px-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:scale-105 group-hover:bg-emerald-500/15">
              <CreditCard size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                Easy Payments
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Convenient payment options
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* =====================================================
              BRAND
          ===================================================== */}
          <div className="lg:col-span-2">

            {/* Logo */}
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6A00] to-[#F97316] shadow-lg shadow-orange-500/10 transition duration-300 group-hover:scale-105 group-hover:shadow-orange-500/20">
                <span className="text-3xl font-black italic text-white">
                  V
                </span>

                <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
              </div>

              <div>
                <div className="text-3xl font-black tracking-tight text-white">
                  Velora
                </div>

                <div className="text-[10px] font-bold tracking-[0.28em] text-cyan-400">
                  VALUE • AURA
                </div>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Discover fashion, beauty, jewellery, watches, perfumes,
              accessories and more — all in one place. Shop smarter,
              discover more and experience the world of Velora.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-4">

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <Mail size={16} />
                </span>

                <span className="transition hover:text-white">
                  support@velora.com
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <Phone size={16} />
                </span>

                <span className="transition hover:text-white">
                  +92 300 0000000
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <MapPin size={16} />
                </span>

                <span className="transition hover:text-white">
                  Karachi, Pakistan
                </span>
              </div>

            </div>

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}
            <div className="mt-8">

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Follow Velora
              </p>

              <div className="flex items-center gap-3">

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[19px] w-[19px]"
                  >
                    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.55.45-1 1-1z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white hover:shadow-lg hover:shadow-pink-500/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[19px] w-[19px]"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.7"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Twitter"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[17px] w-[17px]"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.964 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[20px] w-[20px]"
                  >
                    <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3.01 3.01 0 0 0 .5 6.2 31.24 31.24 0 0 0 0 12a31.24 31.24 0 0 0 .5 5.8 3.01 3.01 0 0 0 2.12 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.57a3.01 3.01 0 0 0 2.12-2.13A31.24 31.24 0 0 0 24 12a31.24 31.24 0 0 0-.5-5.8ZM9.75 15.5v-7L16 12l-6.25 3.5Z" />
                  </svg>
                </a>

              </div>

            </div>

          </div>

          {/* =====================================================
              QUICK LINKS
          ===================================================== */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Quick Links
            </h3>

            <div className="mt-2 h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-cyan-400" />

            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-orange-400"
                  >
                    <ArrowRight
                      size={13}
                      className="text-slate-600 transition group-hover:text-orange-400"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* =====================================================
              CUSTOMER
          ===================================================== */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Customer
            </h3>

            <div className="mt-2 h-1 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

            <ul className="mt-6 space-y-3.5">
              {customerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-cyan-400"
                  >
                    <ArrowRight
                      size={13}
                      className="text-slate-600 transition group-hover:text-cyan-400"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* =====================================================
              INFORMATION
          ===================================================== */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Information
            </h3>

            <div className="mt-2 h-1 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />

            <ul className="mt-6 space-y-3.5">
              {informationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-pink-400"
                  >
                    <ArrowRight
                      size={13}
                      className="text-slate-600 transition group-hover:text-pink-400"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

        </div>

        {/* =========================================================
            NEWSLETTER
        ========================================================= */}
        <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/[0.08] via-white/[0.03] to-cyan-500/[0.08]">

          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 p-6 sm:p-7 md:flex-row md:items-center md:justify-between md:p-8">

            <div>

              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <Mail size={18} />
                </div>

                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Stay Updated with Velora
                </h3>

              </div>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
                Get updates about new arrivals, exclusive deals,
                special offers and the latest from Velora.
              </p>

            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md"
            >

              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-l-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-500/60 focus:bg-black/30"
              />

              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-r-xl bg-gradient-to-r from-[#FF6A00] to-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/10 transition hover:opacity-90 hover:shadow-orange-500/20 active:scale-[0.98]"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================= */}
      <div className="border-t border-white/10 bg-black/20">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Velora. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">

            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <span className="text-slate-700">
              •
            </span>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>

            <span className="text-slate-700">
              •
            </span>

            <Link
              href="/help-center"
              className="transition hover:text-white"
            >
              Help Center
            </Link>

          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 md:justify-end">

            Made with

            <Heart
              size={13}
              className="fill-pink-500 text-pink-500"
            />

            for Velora shoppers

          </div>

        </div>

      </div>

    </footer>
  );
}
