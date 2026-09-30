"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  UserCheck,
  AlertCircle,
  Scale,
  RefreshCw,
  Mail,
} from "lucide-react";

const sections = [
  {
    id: "introduction",
    icon: FileText,
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to Velora. These Terms & Conditions govern your use of the
          Velora website, services, and any purchases made through our
          platform.
        </p>

        <p>
          By accessing or using Velora, you agree to follow these Terms &
          Conditions. If you do not agree with any part of these terms, please
          do not use our website or services.
        </p>
      </>
    ),
  },

  {
    id: "eligibility",
    icon: UserCheck,
    title: "2. Eligibility",
    content: (
      <>
        <p>
          You must provide accurate information when using Velora and placing
          an order.
        </p>

        <p>
          If you are using Velora on behalf of another person, you confirm that
          you have permission to do so.
        </p>
      </>
    ),
  },

  {
    id: "account",
    icon: UserCheck,
    title: "3. Account & Registration",
    content: (
      <>
        <p>
          Some features of Velora may require you to create an account. You
          are responsible for keeping your account information accurate and
          secure.
        </p>

        <p>
          You are responsible for activities performed through your account.
          If you believe your account has been accessed without permission,
          please contact us.
        </p>
      </>
    ),
  },

  {
    id: "products",
    icon: ShoppingBag,
    title: "4. Products & Product Information",
    content: (
      <>
        <p>
          We try to display product names, descriptions, images, colors, sizes,
          prices, and other information as accurately as possible.
        </p>

        <p>
          However, colors may appear slightly different depending on your
          device or screen settings. Product availability may also change
          without prior notice.
        </p>

        <p>
          Velora reserves the right to correct product information, including
          descriptions, pricing, availability, and images, when necessary.
        </p>
      </>
    ),
  },

  {
    id: "prices",
    icon: CreditCard,
    title: "5. Prices & Payments",
    content: (
      <>
        <p>
          All prices displayed on Velora are shown for the relevant product at
          the time of purchase.
        </p>

        <p>
          Prices, discounts, offers, and promotions may change at any time.
        </p>

        <p>
          You agree to provide valid and accurate payment information when
          required. An order may not be processed if payment information is
          incomplete, invalid, or cannot be verified.
        </p>
      </>
    ),
  },

  {
    id: "orders",
    icon: ShoppingBag,
    title: "6. Orders & Order Acceptance",
    content: (
      <>
        <p>
          Adding an item to your cart does not guarantee that the item will
          remain available.
        </p>

        <p>
          After you place an order, Velora may review and verify the order
          before accepting it.
        </p>

        <p>
          We reserve the right to cancel or refuse an order in situations such
          as product unavailability, pricing errors, suspicious activity, or
          incorrect order information.
        </p>
      </>
    ),
  },

  {
    id: "shipping",
    icon: Truck,
    title: "7. Shipping & Delivery",
    content: (
      <>
        <p>
          Delivery times may vary depending on the destination, product
          availability, courier service, weather, and other circumstances.
        </p>

        <p>
          Any delivery estimate displayed on Velora is an estimate and should
          not always be considered a guaranteed delivery date.
        </p>

        <p>
          You are responsible for providing a complete and accurate delivery
          address and contact information.
        </p>
      </>
    ),
  },

  {
    id: "returns",
    icon: RotateCcw,
    title: "8. Returns & Refunds",
    content: (
      <>
        <p>
          Returns and refunds are subject to Velora's applicable return
          conditions and the individual product's eligibility.
        </p>

        <p>
          Products may need to be returned in their original condition,
          including applicable packaging, tags, or accessories.
        </p>

        <p>
          Refund processing times may vary depending on the payment method and
          verification process.
        </p>
      </>
    ),
  },

  {
    id: "cancellations",
    icon: AlertCircle,
    title: "9. Order Cancellations",
    content: (
      <>
        <p>
          You may request cancellation of an order before it reaches a stage
          where cancellation is no longer possible.
        </p>

        <p>
          Once an order has been processed, shipped, or otherwise moved beyond
          the cancellation stage, cancellation may not be available.
        </p>

        <p>
          Velora may also cancel an order when necessary due to availability,
          payment, pricing, fraud prevention, or other operational reasons.
        </p>
      </>
    ),
  },

  {
    id: "promotions",
    icon: RefreshCw,
    title: "10. Promotions & Discounts",
    content: (
      <>
        <p>
          Promotional offers, discount codes, vouchers, and special deals may
          have specific conditions and expiry dates.
        </p>

        <p>
          Unless explicitly stated otherwise, promotional offers cannot be
          combined with other offers.
        </p>

        <p>
          Velora reserves the right to modify or end a promotion at any time.
        </p>
      </>
    ),
  },

  {
    id: "responsibilities",
    icon: ShieldCheck,
    title: "11. User Responsibilities",
    content: (
      <>
        <p>
          You agree to use Velora only for lawful purposes and in a way that
          does not harm the website, other users, or our services.
        </p>

        <p>You must not:</p>

        <ul className="space-y-3 pl-1">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
            <span>Use the website for fraudulent or unlawful activities.</span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
            <span>Attempt to gain unauthorized access to our systems.</span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
            <span>
              Interfere with the operation or security of the website.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
            <span>Submit false or misleading information.</span>
          </li>

          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" />
            <span>
              Use automated methods to abuse or overload the website.
            </span>
          </li>
        </ul>
      </>
    ),
  },

  {
    id: "reviews",
    icon: FileText,
    title: "12. Reviews & User Content",
    content: (
      <>
        <p>
          If Velora allows users to submit reviews, comments, images, or other
          content, you are responsible for the content you submit.
        </p>

        <p>
          Content must not be illegal, abusive, misleading, defamatory,
          offensive, or infringe another person's rights.
        </p>

        <p>
          Velora may remove content that violates these Terms & Conditions or
          applicable rules.
        </p>
      </>
    ),
  },

  {
    id: "intellectual-property",
    icon: ShieldCheck,
    title: "13. Intellectual Property",
    content: (
      <>
        <p>
          The Velora name, logo, website design, graphics, text, branding,
          layouts, and other original materials are protected by applicable
          intellectual property laws.
        </p>

        <p>
          You may not copy, reproduce, distribute, modify, or commercially use
          Velora's protected content without appropriate permission.
        </p>
      </>
    ),
  },

  {
    id: "privacy",
    icon: ShieldCheck,
    title: "14. Privacy",
    content: (
      <>
        <p>
          Your use of Velora may involve the collection and processing of
          certain information required to provide our services.
        </p>

        <p>
          Please review our Privacy Policy to understand how information may be
          collected, used, stored, and protected.
        </p>

        <Link
          href="/privacy"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 font-bold text-[#FF6A00] transition hover:bg-orange-100"
        >
          View Privacy Policy
          <ChevronRight size={17} />
        </Link>
      </>
    ),
  },

  {
    id: "third-party",
    icon: FileText,
    title: "15. Third-Party Services & Links",
    content: (
      <>
        <p>
          Velora may contain links or integrations to third-party websites,
          services, payment providers, or other platforms.
        </p>

        <p>
          Third-party services may have their own terms, policies, and
          practices. Velora is not responsible for the content or policies of
          third-party websites.
        </p>
      </>
    ),
  },

  {
    id: "availability",
    icon: RefreshCw,
    title: "16. Website Availability",
    content: (
      <>
        <p>
          We aim to keep Velora available and working properly, but we cannot
          guarantee that the website will always be available, uninterrupted,
          or error-free.
        </p>

        <p>
          Temporary interruptions may occur because of maintenance, technical
          issues, updates, network problems, or circumstances outside our
          control.
        </p>
      </>
    ),
  },

  {
    id: "liability",
    icon: AlertCircle,
    title: "17. Limitation of Liability",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, Velora will not be
          responsible for indirect, incidental, or consequential losses arising
          from your use of the website or services.
        </p>

        <p>
          Nothing in these Terms & Conditions is intended to exclude any
          responsibility that cannot legally be excluded under applicable law.
        </p>
      </>
    ),
  },

  {
    id: "indemnification",
    icon: Scale,
    title: "18. Indemnification",
    content: (
      <>
        <p>
          You agree to use Velora responsibly and to the extent permitted by
          applicable law, be responsible for losses or claims resulting from
          your violation of these Terms & Conditions or misuse of the website.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    icon: RefreshCw,
    title: "19. Changes to These Terms",
    content: (
      <>
        <p>
          Velora may update these Terms & Conditions from time to time to
          reflect changes in our services, policies, or applicable requirements.
        </p>

        <p>
          Updated terms will become effective when published on this page,
          unless a different effective date is stated.
        </p>

        <p>
          We recommend checking this page periodically for the latest version.
        </p>
      </>
    ),
  },

  {
    id: "law",
    icon: Scale,
    title: "20. Governing Law",
    content: (
      <>
        <p>
          These Terms & Conditions are intended to be interpreted in accordance
          with the applicable laws and regulations governing Velora and its
          operations.
        </p>

        <p>
          Any dispute will be handled according to the applicable legal
          jurisdiction and laws.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    icon: Mail,
    title: "21. Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding these Terms &
          Conditions, please contact Velora through the contact details
          provided on our website.
        </p>

        <Link
          href="/help-center"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-lg"
        >
          Visit Help Center
          <ChevronRight size={18} />
        </Link>
      </>
    ),
  },
];

export default function TermsPage() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-orange-100 bg-white">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl" />

        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

          <Link
            href="/"
            className="mb-7 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-orange-50 hover:text-[#FF6A00]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="max-w-4xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#FF6A00] sm:text-sm">
              <FileText size={16} />
              Legal Information
            </div>

            <h1 className="text-4xl font-black tracking-tight text-[#FF6A00] sm:text-5xl lg:text-6xl">
              Terms & Conditions
            </h1>

            <div className="mt-4 h-1.5 w-20 rounded-full bg-[#FF6A00]" />

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
              Please read these terms carefully before using Velora. They
              explain the rules and conditions that apply when you browse our
              website, create an account, or place an order.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Last Updated
                </p>

                <p className="mt-1 text-sm font-extrabold text-[#FF6A00]">
                  September 2026
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Website
                </p>

                <p className="mt-1 text-sm font-extrabold text-[#FF6A00]">
                  Velora
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Sections
                </p>

                <p className="mt-1 text-sm font-extrabold text-[#FF6A00]">
                  21 Terms
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

        <div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="h-1.5 bg-[#FF6A00]" />

              <div className="p-4">

                <div className="mb-4 px-2">

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                    Quick Navigation
                  </p>

                  <h2 className="mt-1 text-lg font-black text-[#FF6A00]">
                    Contents
                  </h2>

                </div>

                <div className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto pr-1">

                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
                    >
                      <span className="pr-2">
                        {section.title}
                      </span>

                      <ChevronRight
                        size={15}
                        className="shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </button>
                  ))}

                </div>

              </div>
            </div>
          </aside>

          {/* TERMS CONTENT */}
          <div className="space-y-5">

            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="h-1 bg-gradient-to-r from-[#FF6A00] to-orange-200" />

                  <div className="p-5 sm:p-7 lg:p-8">

                    {/* SECTION HEADER */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6A00] ring-1 ring-orange-100">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                          Velora Terms
                        </p>

                        <h2 className="mt-1 text-xl font-black tracking-tight text-[#FF6A00] sm:text-2xl">
                          {section.title}
                        </h2>

                        <div className="mt-3 h-1 w-12 rounded-full bg-[#FF6A00]" />

                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7">

                      {section.content}

                    </div>

                  </div>
                </article>
              );
            })}

            {/* FINAL NOTE */}
            <div className="overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-sm">

              <div className="h-1.5 bg-gradient-to-r from-[#FF6A00] to-orange-200" />

              <div className="bg-gradient-to-br from-orange-50 via-white to-cyan-50 p-6 sm:p-8">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#FF6A00] shadow-sm ring-1 ring-orange-100">
                    <ShieldCheck size={22} />
                  </div>

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                      Velora
                    </p>

                    <h2 className="mt-1 text-xl font-black text-[#FF6A00] sm:text-2xl">
                      Thank You for Choosing Velora
                    </h2>

                    <div className="mt-3 h-1 w-12 rounded-full bg-[#FF6A00]" />

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      We want your shopping experience to be simple, secure,
                      and enjoyable. If you have any questions about these
                      Terms & Conditions, our Help Center is available to
                      assist you.
                    </p>

                    <Link
                      href="/help-center"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-lg"
                    >
                      Go to Help Center
                      <ChevronRight size={17} />
                    </Link>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER LINKS */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold text-slate-500">

            <Link
              href="/"
              className="transition hover:text-[#FF6A00]"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="transition hover:text-[#FF6A00]"
            >
              About
            </Link>

            <Link
              href="/help-center"
              className="transition hover:text-[#FF6A00]"
            >
              Help Center
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-[#FF6A00]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/settings"
              className="transition hover:text-[#FF6A00]"
            >
              Settings
            </Link>

          </div>

          <div className="mx-auto mt-5 h-px max-w-xl bg-slate-100" />

          <p className="mt-4 text-center text-xs text-slate-400">
            © 2026 Velora. All rights reserved.
          </p>

        </div>

      </section>

    </main>
  );
}