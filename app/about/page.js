"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#172033] via-[#202B40] to-[#FF6A00]">

        {/* Decorative circles */}

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF6A00]/30 blur-3xl" />

        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute right-[25%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}

            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur sm:text-sm">
              ✨ Welcome to Velora
            </span>

            {/* Heading */}

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Value <span className="text-[#FFB27A]">•</span> Aura
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:text-xl">
              A modern shopping experience built around
              value, variety, convenience and trust.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
              Where every choice brings value.
            </p>

            {/* CTA */}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/shop"
                className="rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold text-[#172033] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#FFF1E8] sm:text-base"
              >
                Start Shopping
              </Link>

              <Link
                href="/deals"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 sm:text-base"
              >
                Explore Deals
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          BRAND INTRO
      ========================================================= */}

      <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}

          <div>

            <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
              About Velora
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl lg:text-5xl">
              Shopping made simple,
              <span className="text-[#FF6A00]">
                {" "}better and smarter.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">

              <p>
                Velora is a modern online marketplace
                created to make everyday shopping easier,
                more convenient and more enjoyable.
              </p>

              <p>
                We bring different products and categories
                together in one place so customers can
                discover new styles, compare options and
                find products that match their needs.
              </p>

              <p>
                From everyday essentials to trending
                products and special deals, Velora focuses
                on giving shoppers a smooth experience
                from discovery to checkout.
              </p>

            </div>

            {/* Mini highlights */}

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="text-2xl">🛍️</div>
                <p className="mt-2 text-sm font-bold text-[#172033]">
                  Wide Selection
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="text-2xl">💰</div>
                <p className="mt-2 text-sm font-bold text-[#172033]">
                  Great Value
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="text-2xl">⚡</div>
                <p className="mt-2 text-sm font-bold text-[#172033]">
                  Easy Shopping
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="text-2xl">🤝</div>
                <p className="mt-2 text-sm font-bold text-[#172033]">
                  Customer First
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT BRAND CARD */}

          <div className="relative">

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6A00] to-[#FF8A3D] p-1 shadow-2xl">

              <div className="rounded-[22px] bg-[#172033] px-6 py-12 sm:px-10 sm:py-16">

                {/* Logo */}

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#FF6A00] shadow-xl sm:h-32 sm:w-32">

                  <span className="text-6xl font-black italic text-white sm:text-8xl">
                    V
                  </span>

                </div>

                <div className="mt-7 text-center">

                  <h3 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Velora
                  </h3>

                  <p className="mt-2 text-sm font-bold tracking-[0.25em] text-[#FFB27A]">
                    VALUE • AURA
                  </p>

                  <div className="mx-auto mt-7 h-px w-24 bg-white/20" />

                  <p className="mx-auto mt-7 max-w-md text-sm leading-6 text-white/60 sm:text-base">
                    Discover products.
                    Find great value.
                    Shop with confidence.
                  </p>

                </div>

              </div>

            </div>

            {/* Floating card */}

            <div className="absolute -bottom-5 -right-2 rounded-2xl border border-white bg-white px-5 py-4 shadow-xl sm:-right-5">

              <p className="text-xs font-semibold text-gray-400">
                Our promise
              </p>

              <p className="mt-1 text-sm font-extrabold text-[#172033]">
                Value in every choice.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          MISSION / VISION
      ========================================================= */}

      <section className="border-y border-gray-100 bg-white">

        <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-10">

          {/* MISSION */}

          <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 sm:p-8 lg:p-10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E8] text-2xl">
              🎯
            </div>

            <h2 className="mt-6 text-2xl font-black text-[#172033] sm:text-3xl">
              Our Mission
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Our mission is to make online shopping
              accessible, convenient and enjoyable by
              connecting customers with products that
              offer real value.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              We want every visit to Velora to help
              customers discover something useful,
              stylish or worth buying.
            </p>

          </div>

          {/* VISION */}

          <div className="rounded-2xl bg-gradient-to-br from-[#172033] to-[#27344C] p-6 sm:p-8 lg:p-10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🌟
            </div>

            <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">
              Our Vision
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              We envision Velora as a trusted destination
              where customers can discover products,
              explore new trends and shop confidently
              from one convenient marketplace.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Our goal is to continuously improve the
              shopping experience as Velora grows.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          WHY VELORA
      ========================================================= */}

      <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

        <div className="mx-auto max-w-2xl text-center">

          <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
            Why Velora
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
            More than just an online store
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
            We focus on making every part of your
            shopping journey simple and enjoyable.
          </p>

        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* CARD 1 */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E8] text-2xl transition group-hover:scale-110">
              🔎
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
              Easy Discovery
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Find products through categories,
              search, trending collections and
              specially selected deals.
            </p>

          </div>

          {/* CARD 2 */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F8FC] text-2xl transition group-hover:scale-110">
              💰
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
              Better Value
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Discover competitive prices, special
              offers and deals designed to help
              you shop smarter.
            </p>

          </div>

          {/* CARD 3 */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3EEFF] text-2xl transition group-hover:scale-110">
              ✨
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
              Fresh & Trending
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Explore new arrivals and trending
              products so you can keep discovering
              something new.
            </p>

          </div>

          {/* CARD 4 */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7DB] text-2xl transition group-hover:scale-110">
              🧭
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
              Simple Experience
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              A clean and straightforward shopping
              experience across desktop and mobile.
            </p>

          </div>

          {/* CARD 5 */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF8EE] text-2xl transition group-hover:scale-110">
              🤝
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
              Customer Focus
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              We believe a great marketplace starts
              with understanding what customers need.
            </p>

          </div>

          {/* CARD 6 */}

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFEAF0] text-2xl transition group-hover:scale-110">
              🛡️
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
              Built on Trust
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              We aim to build a marketplace where
              customers can shop with confidence.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          SHOPPING JOURNEY
      ========================================================= */}

      <section className="bg-white">

        <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
              How Velora Works
            </span>

            <h2 className="mt-3 text-3xl font-black text-[#172033] sm:text-4xl">
              From discovery to delivery
            </h2>

          </div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-4">

            {/* LINE */}

            <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gray-200 md:block" />

            {/* STEP 1 */}

            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6A00] text-lg font-black text-white shadow-lg">
                1
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#172033]">
                Discover
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore products, categories,
                trends and deals.
              </p>

            </div>

            {/* STEP 2 */}

            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#172033] text-lg font-black text-white shadow-lg">
                2
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#172033]">
                Choose
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Compare options and find
                what suits you best.
              </p>

            </div>

            {/* STEP 3 */}

            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6A00] text-lg font-black text-white shadow-lg">
                3
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#172033]">
                Order
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Place your order through
                our simple shopping experience.
              </p>

            </div>

            {/* STEP 4 */}

            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#172033] text-lg font-black text-white shadow-lg">
                4
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#172033]">
                Enjoy
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Receive your order and
                enjoy your Velora experience.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          {/* LEFT */}

          <div>

            <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
              Our Values
            </span>

            <h2 className="mt-3 text-3xl font-black text-[#172033] sm:text-4xl">
              What Velora stands for
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              Every part of Velora is built around
              creating a better shopping experience
              for our customers.
            </p>

          </div>

          {/* RIGHT */}

          <div className="grid gap-3 sm:grid-cols-2">

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#172033]">
                Value
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                We look for ways to bring meaningful
                value to every shopping decision.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#172033]">
                Quality
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                We aim to create a marketplace where
                customers can discover worthwhile products.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#172033]">
                Simplicity
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Shopping should feel easy, clear and
                enjoyable rather than complicated.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#172033]">
                Trust
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                We believe long-term customer trust is
                more important than a single transaction.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#172033]">

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FF6A00]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#FF6A00]/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1200px] px-4 py-14 text-center sm:px-6 sm:py-20">

          <span className="text-3xl">
            🛍️
          </span>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Ready to discover Velora?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Explore our latest products, discover
            trending styles and find amazing deals
            made for smarter shopping.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/shop"
              className="rounded-xl bg-[#FF6A00] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#FF8A3D] sm:text-base"
            >
              Shop Now
            </Link>

            <Link
              href="/deals"
              className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/20 sm:text-base"
            >
              View Deals
            </Link>

          </div>

          <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-white/30">
            VALUE • AURA
          </p>

        </div>

      </section>

    </main>
  );
}