"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#172033]">

      {/* TOP HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">

            <Link
              href="/"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF6A00] text-2xl font-black italic text-white shadow-md transition hover:scale-105"
            >
              V
            </Link>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6A00] sm:text-xs">
                Velora • Value • Aura
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight text-[#FF6A00] sm:text-3xl lg:text-4xl">
                Privacy Policy
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Your privacy matters to Velora
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

        {/* INTRO CARD */}
        <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">

          <div className="h-1.5 w-full bg-gradient-to-r from-[#FF6A00] to-orange-300" />

          <div className="p-5 sm:p-8 lg:p-10">

            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 sm:p-6">
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                At{" "}
                <strong className="font-extrabold text-[#FF6A00]">
                  Velora
                </strong>
                , we respect your privacy and are committed to protecting
                your personal information. This Privacy Policy explains
                what information we collect, how we use it, how we protect
                it, and the choices available to you when you use our
                website and services.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-[#FF6A00]">
                Privacy & Security
              </span>

              <span className="text-xs text-gray-400">
                Last Updated: September 13, 2026
              </span>
            </div>

          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[240px_1fr]">

          {/* TABLE OF CONTENTS */}
          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">

            <div className="border-b border-gray-100 px-3 pb-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#FF6A00]">
                Quick Navigation
              </p>

              <h2 className="mt-1 text-base font-extrabold text-[#172033]">
                On This Page
              </h2>
            </div>

            <nav className="mt-3 space-y-1">

              <a
                href="#information"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Information We Collect
              </a>

              <a
                href="#use"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                How We Use Information
              </a>

              <a
                href="#cookies"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Cookies
              </a>

              <a
                href="#orders"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Orders & Payments
              </a>

              <a
                href="#sharing"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Information Sharing
              </a>

              <a
                href="#security"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Security
              </a>

              <a
                href="#rights"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Your Rights
              </a>

              <a
                href="#children"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Children's Privacy
              </a>

              <a
                href="#retention"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Data Retention
              </a>

              <a
                href="#third-party"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Third-Party Services
              </a>

              <a
                href="#marketing"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Marketing
              </a>

              <a
                href="#changes"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Policy Changes
              </a>

              <a
                href="#contact"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              >
                Contact Us
              </a>

            </nav>
          </aside>

          {/* POLICY CONTENT */}
          <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* 01 */}
            <section
              id="information"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="01" title="Information We Collect" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                We may collect information that you provide directly to us
                when you create an account, place an order, contact us, or
                otherwise use Velora.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <InfoCard title="Personal Information">
                  <ul className="space-y-2 text-sm leading-6 text-gray-600">
                    <li>• Name</li>
                    <li>• Email address</li>
                    <li>• Phone number</li>
                    <li>• Shipping and billing address</li>
                    <li>• Account information</li>
                  </ul>
                </InfoCard>

                <InfoCard title="Shopping Information">
                  <ul className="space-y-2 text-sm leading-6 text-gray-600">
                    <li>• Products viewed</li>
                    <li>• Wishlist items</li>
                    <li>• Cart information</li>
                    <li>• Orders and purchases</li>
                    <li>• Customer support communications</li>
                  </ul>
                </InfoCard>

              </div>

              <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="font-extrabold text-[#FF6A00]">
                  Automatically Collected Information
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  When you use our website, certain technical information
                  may be collected automatically, such as browser type,
                  device information, approximate location, IP address,
                  pages visited, and website usage information.
                </p>
              </div>
            </section>

            {/* 02 */}
            <section
              id="use"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="02" title="How We Use Your Information" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                We may use collected information for legitimate business
                and service purposes, including:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {[
                  "Process and deliver your orders",
                  "Create and manage your account",
                  "Provide customer support",
                  "Communicate about orders and deliveries",
                  "Improve our website and shopping experience",
                  "Personalize products and recommendations",
                  "Send promotional offers when permitted",
                  "Prevent fraud and unauthorized activity",
                  "Maintain website security",
                  "Comply with applicable legal requirements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-orange-100 hover:bg-orange-50"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-[#FF6A00]">
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </section>

            {/* 03 */}
            <section
              id="cookies"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading
                number="03"
                title="Cookies & Similar Technologies"
              />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                Velora may use cookies and similar technologies to help
                the website function correctly, remember preferences,
                understand website usage, and improve the shopping
                experience.
              </p>

              <div className="mt-6 space-y-3">

                <InfoCard title="Essential Cookies">
                  <p className="text-sm leading-6 text-gray-600">
                    Help provide essential website functionality such as
                    sessions, security, and shopping features.
                  </p>
                </InfoCard>

                <InfoCard title="Preference Cookies">
                  <p className="text-sm leading-6 text-gray-600">
                    Remember choices such as preferences and settings.
                  </p>
                </InfoCard>

                <InfoCard title="Analytics Technologies">
                  <p className="text-sm leading-6 text-gray-600">
                    May help us understand how visitors use the website
                    so we can improve its performance and experience.
                  </p>
                </InfoCard>

              </div>
            </section>

            {/* 04 */}
            <section
              id="orders"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="04" title="Orders & Payments" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                When you place an order, we need certain information to
                process and fulfill it. This may include your name,
                contact details, delivery address, selected products,
                order information, and payment-related information.
              </p>

              <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-5 sm:p-6">

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-lg text-white">
                    🔒
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#FF6A00]">
                      Payment Security
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      Where third-party payment providers are used,
                      payment information may be processed directly by
                      those providers according to their own privacy
                      policies and security practices. Velora does not
                      need to store your complete payment card details
                      when the payment provider handles that information
                      directly.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* 05 */}
            <section
              id="sharing"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="05" title="Information Sharing" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                We do not sell your personal information simply because
                you use Velora. We may share necessary information with
                trusted parties when required to provide our services.
              </p>

              <div className="mt-6 space-y-3">

                {[
                  [
                    "Delivery Partners",
                    "Information necessary to deliver your order to the requested address.",
                  ],
                  [
                    "Payment Providers",
                    "Information required to process and verify payments.",
                  ],
                  [
                    "Technology Providers",
                    "Services that help us operate hosting, analytics, security, and website infrastructure.",
                  ],
                  [
                    "Customer Support",
                    "Information needed to respond to questions, complaints, returns, and other requests.",
                  ],
                  [
                    "Legal Requirements",
                    "Information may be disclosed when required by applicable law or a valid legal process.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                  >
                    <h3 className="font-extrabold text-[#FF6A00]">
                      {title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-7 text-gray-600">
                      {text}
                    </p>
                  </div>
                ))}

              </div>
            </section>

            {/* 06 */}
            <section
              id="security"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="06" title="Data Security" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                We take reasonable technical and organizational measures
                to protect personal information against unauthorized
                access, loss, misuse, alteration, or disclosure.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">

                <SecurityCard
                  icon="🔒"
                  title="Account Security"
                  text="Security measures help protect account information."
                />

                <SecurityCard
                  icon="🛡️"
                  title="Secure Systems"
                  text="We use reasonable safeguards for our systems and data."
                />

                <SecurityCard
                  icon="🔐"
                  title="Limited Access"
                  text="Access to personal information is limited where appropriate."
                />

              </div>

              <p className="mt-5 rounded-xl bg-gray-50 p-4 text-xs leading-6 text-gray-500">
                No method of transmitting or storing information can be
                guaranteed to be completely secure. We therefore cannot
                guarantee absolute security.
              </p>
            </section>

            {/* 07 */}
            <section
              id="rights"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="07" title="Your Privacy Rights" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                Depending on applicable law and your location, you may
                have rights concerning your personal information.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {[
                  "Request access to personal information we hold about you.",
                  "Request correction of inaccurate information.",
                  "Request deletion of certain personal information.",
                  "Request information about how your data is used.",
                  "Manage certain communication preferences.",
                  "Withdraw consent where processing is based on consent.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-gray-100 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-black text-[#FF6A00]">
                      ✓
                    </span>

                    <span className="text-sm leading-6 text-gray-600">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              <p className="mt-5 text-sm leading-7 text-gray-500">
                Some requests may be subject to applicable legal
                limitations or verification requirements.
              </p>
            </section>

            {/* 08 */}
            <section
              id="children"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="08" title="Children's Privacy" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                Velora is intended for general audiences and is not
                specifically directed toward children. We do not
                knowingly collect personal information from children in
                circumstances where such collection is prohibited by
                applicable law.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                If you believe a child has provided personal information
                to us improperly, please contact us so that we can review
                the situation and take appropriate action.
              </p>
            </section>

            {/* 09 */}
            <section
              id="retention"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="09" title="Data Retention" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                We retain personal information for as long as reasonably
                necessary to provide our services, maintain business and
                transaction records, resolve disputes, enforce
                agreements, prevent fraud, and comply with legal
                obligations.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                When information is no longer reasonably required, we may
                delete it, anonymize it, or securely dispose of it,
                subject to applicable legal requirements.
              </p>
            </section>

            {/* 10 */}
            <section
              id="third-party"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading
                number="10"
                title="Third-Party Services & Links"
              />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                Our website may contain links to third-party websites,
                payment services, social media platforms, or other
                external services.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Third-party services operate under their own privacy
                policies and terms. We recommend reviewing their policies
                before providing personal information to them.
              </p>
            </section>

            {/* 11 */}
            <section
              id="marketing"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading
                number="11"
                title="Marketing Communications"
              />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                If you choose to receive promotional communications from
                Velora, we may send information about new products,
                discounts, promotions, and special offers.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                You may be able to unsubscribe from promotional emails or
                other marketing communications by following the
                unsubscribe instructions provided in those communications
                or by contacting us.
              </p>
            </section>

            {/* 12 */}
            <section
              id="changes"
              className="border-b border-gray-100 p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading
                number="12"
                title="Changes to This Privacy Policy"
              />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                We may update this Privacy Policy from time to time to
                reflect changes in our services, technology, business
                practices, or applicable legal requirements.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                When changes are made, the updated policy will be posted
                on this page and the "Last Updated" date may be changed.
              </p>
            </section>

            {/* 13 */}
            <section
              id="contact"
              className="p-5 sm:p-8 lg:p-10"
            >
              <SectionHeading number="13" title="Contact Us" />

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                If you have questions, concerns, or requests regarding
                this Privacy Policy or the handling of your personal
                information, please contact Velora through our available
                customer support channels.
              </p>

              <div className="mt-6 overflow-hidden rounded-3xl bg-[#172033]">

                <div className="h-1.5 bg-[#FF6A00]" />

                <div className="p-6 sm:p-8">

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                    Velora
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    We value your privacy.
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
                    For privacy-related questions or requests, please
                    visit our Help Center or contact our support team.
                  </p>

                  <Link
                    href="/help-center"
                    className="mt-6 inline-flex rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#E85F00] hover:shadow-xl"
                  >
                    Visit Help Center
                  </Link>

                </div>
              </div>
            </section>

          </article>
        </div>

        {/* FOOTER LINKS */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold text-gray-500">

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
              href="/terms"
              className="transition hover:text-[#FF6A00]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/settings"
              className="transition hover:text-[#FF6A00]"
            >
              Settings
            </Link>

          </div>

          <div className="mx-auto mt-4 h-px max-w-xl bg-gray-100" />

          <p className="mt-4 text-center text-xs text-gray-400">
            © 2026 Velora. All rights reserved.
          </p>

        </div>

      </div>
    </main>
  );
}


/* =========================
   REUSABLE UI COMPONENTS
========================= */

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xs font-black text-[#FF6A00]">
        {number}
      </div>

      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#FF6A00]">
          Privacy
        </p>

        <h2 className="mt-1 text-xl font-black tracking-tight text-[#FF6A00] sm:text-2xl">
          {title}
        </h2>
      </div>

    </div>
  );
}


function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:border-orange-100 hover:bg-orange-50">
      <h3 className="font-extrabold text-[#FF6A00]">
        {title}
      </h3>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}


function SecurityCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-0.5 hover:border-orange-100 hover:shadow-sm">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
        {icon}
      </div>

      <h3 className="mt-4 font-extrabold text-[#FF6A00]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-gray-500">
        {text}
      </p>

    </div>
  );
}