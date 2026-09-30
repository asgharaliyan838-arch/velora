
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const helpCategories = [
    {
      id: "Orders",
      icon: "📦",
      title: "Orders & Tracking",
      description:
        "Get help with placing orders, checking order status and tracking deliveries.",
    },
    {
      id: "Shipping",
      icon: "🚚",
      title: "Shipping & Delivery",
      description:
        "Learn about delivery times, shipping options and delivery updates.",
    },
    {
      id: "Returns",
      icon: "↩️",
      title: "Returns & Refunds",
      description:
        "Find information about returns, refunds and damaged or incorrect products.",
    },
    {
      id: "Payments",
      icon: "💳",
      title: "Payments",
      description:
        "Learn about payment methods, checkout and payment-related issues.",
    },
    {
      id: "Account",
      icon: "👤",
      title: "Account",
      description:
        "Get help with your account, sign in and managing your information.",
    },
    {
      id: "Shopping",
      icon: "🛍️",
      title: "Shopping on Velora",
      description:
        "Learn how to search products, use filters and find what you need.",
    },
  ];

  const faqs = [
    {
      id: 1,
      category: "Orders",
      question: "How can I place an order?",
      answer:
        "Browse products through the Shop page, open the product you want, select the available options and follow the ordering or checkout process.",
    },
    {
      id: 2,
      category: "Orders",
      question: "How can I check my order status?",
      answer:
        "You can check your order status from your account or the order tracking option available for your order once your order has been processed.",
    },
    {
      id: 3,
      category: "Orders",
      question: "Can I cancel my order?",
      answer:
        "Order cancellation may depend on the current status of your order. If cancellation is available, you can request it before the order is processed for delivery.",
    },

    {
      id: 4,
      category: "Shipping",
      question: "How long does delivery take?",
      answer:
        "Delivery time can vary depending on the product, seller and delivery location. Your expected delivery information will be provided during the ordering process.",
    },
    {
      id: 5,
      category: "Shipping",
      question: "How can I track my delivery?",
      answer:
        "Once tracking information becomes available, you can use the tracking details associated with your order to check its delivery status.",
    },
    {
      id: 6,
      category: "Shipping",
      question: "Do you deliver to my area?",
      answer:
        "Delivery availability can vary depending on the product and location. Available delivery information will be shown during the ordering process.",
    },

    {
      id: 7,
      category: "Returns",
      question: "Can I return a product?",
      answer:
        "Return eligibility can depend on the product, its condition and the applicable return policy. Check the return information for your order or contact support if you need assistance.",
    },
    {
      id: 8,
      category: "Returns",
      question: "What if I receive a damaged product?",
      answer:
        "If your product arrives damaged, keep the product and packaging in its original condition and contact support as soon as possible with your order details.",
    },
    {
      id: 9,
      category: "Returns",
      question: "How do refunds work?",
      answer:
        "If your return or refund request is approved, the refund process depends on the payment method and the specific order situation.",
    },

    {
      id: 10,
      category: "Payments",
      question: "What payment methods are available?",
      answer:
        "Available payment methods may vary depending on your location and the checkout options provided for your order.",
    },
    {
      id: 11,
      category: "Payments",
      question: "What should I do if my payment fails?",
      answer:
        "If a payment fails, check your payment details and try again. If the issue continues, contact support for assistance.",
    },
    {
      id: 12,
      category: "Payments",
      question: "Is my payment information secure?",
      answer:
        "Velora aims to provide a secure shopping experience. Always make payments through the official checkout process and never share sensitive payment information with anyone.",
    },

    {
      id: 13,
      category: "Account",
      question: "How can I create an account?",
      answer:
        "Use the account or sign-up option available on Velora and follow the instructions to create your account.",
    },
    {
      id: 14,
      category: "Account",
      question: "I forgot my password. What should I do?",
      answer:
        "Use the password recovery option on the sign-in page and follow the instructions to reset your password.",
    },
    {
      id: 15,
      category: "Account",
      question: "Can I update my account information?",
      answer:
        "Yes. Sign in to your Velora account and open the available account settings to update your information.",
    },

    {
      id: 16,
      category: "Shopping",
      question: "How can I find a product?",
      answer:
        "Use the search bar, browse categories or explore sections such as New Arrivals, Trending and Deals to find products.",
    },
    {
      id: 17,
      category: "Shopping",
      question: "Can I filter products?",
      answer:
        "Yes. Product pages can provide filters such as category, price, color, discount and sorting options to help you find products faster.",
    },
    {
      id: 18,
      category: "Shopping",
      question: "Where can I find discounted products?",
      answer:
        "Visit the Deals page to explore products currently available with discounts or special offers.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" ||
        faq.category === activeCategory;

      const matchesSearch =
        !searchText ||
        faq.question.toLowerCase().includes(searchText) ||
        faq.answer.toLowerCase().includes(searchText) ||
        faq.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const selectCategory = (category) => {
    setActiveCategory(category);
    setOpenFaq(null);

    setTimeout(() => {
      document
        .getElementById("faqs")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const clearSearch = () => {
    setSearch("");
    setActiveCategory("All");
    setOpenFaq(null);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#172033] via-[#202B40] to-[#FF6A00]">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF6A00]/30 blur-3xl" />

        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute right-[25%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur sm:text-sm">
              💬 Velora Help Center
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              How can we{" "}
              <span className="text-[#FFB27A]">
                help?
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Find answers, get shopping help and learn
              everything you need to know about Velora.
            </p>

            {/* SEARCH */}

            <div className="mx-auto mt-8 max-w-2xl">

              <div className="relative">

                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setActiveCategory("All");
                    setOpenFaq(null);
                  }}
                  placeholder="Search for help..."
                  className="h-14 w-full rounded-2xl border border-white/20 bg-white px-12 pr-12 text-sm text-[#172033] shadow-2xl outline-none transition placeholder:text-gray-400 focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/20 sm:text-base"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
                  >
                    ×
                  </button>
                )}

              </div>

              {search && (
                <p className="mt-3 text-left text-xs font-semibold text-white/60">
                  Showing {filteredFaqs.length}{" "}
                  {filteredFaqs.length === 1
                    ? "result"
                    : "results"}{" "}
                  for "{search}"
                </p>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          HELP CATEGORIES
      ========================================================= */}

      <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

        <div className="mx-auto max-w-2xl text-center">

          <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
            Help Topics
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
            What do you need help with?
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
            Choose a topic to find the answers you need.
          </p>

        </div>

        {/* CATEGORY BUTTONS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {helpCategories.map((item) => {

            const isActive =
              activeCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  selectCategory(item.id)
                }
                className={`group rounded-2xl border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
                  isActive
                    ? "border-[#FF6A00] bg-[#FFF8F3] shadow-md"
                    : "border-gray-100 bg-white"
                }`}
              >

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition group-hover:scale-110 ${
                    isActive
                      ? "bg-[#FF6A00] text-white"
                      : "bg-[#FFF1E8]"
                  }`}
                >
                  {item.icon}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">

                  <h3 className="text-xl font-extrabold text-[#172033]">
                    {item.title}
                  </h3>

                  {isActive && (
                    <span className="rounded-full bg-[#FF6A00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                      Active
                    </span>
                  )}

                </div>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                <div
                  className={`mt-5 text-sm font-extrabold ${
                    isActive
                      ? "text-[#D94F00]"
                      : "text-[#FF6A00]"
                  }`}
                >
                  View answers →
                </div>

              </button>
            );
          })}

        </div>

      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}

      <section
        id="faqs"
        className="scroll-mt-20 border-y border-gray-100 bg-white"
      >

        <div className="mx-auto w-full max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

          <div className="text-center">

            <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
              {activeCategory === "All"
                ? "Popular questions"
                : `${activeCategory} questions`}
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              {search
                ? `Search results for "${search}"`
                : "Find quick answers to common questions about Velora."}
            </p>

          </div>

          {/* ACTIVE FILTER */}

          {(activeCategory !== "All" || search) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

              {activeCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setOpenFaq(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFF1E8] px-4 py-2 text-xs font-bold text-[#D94F00]"
                >
                  {activeCategory}
                  <span className="text-sm">
                    ×
                  </span>
                </button>
              )}

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600"
                >
                  Search: "{search}"
                  <span className="text-sm">
                    ×
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={clearSearch}
                className="rounded-full px-4 py-2 text-xs font-extrabold text-[#FF6A00] hover:bg-[#FFF1E8]"
              >
                Clear all
              </button>

            </div>
          )}

          {/* FAQ LIST */}

          <div className="mt-10 space-y-3">

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {

                const isOpen = openFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition ${
                      isOpen
                        ? "border-[#FF6A00]/40 shadow-md"
                        : "border-gray-100 shadow-sm"
                    }`}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(
                          isOpen ? null : faq.id
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >

                      <div className="min-w-0">

                        <span className="mb-2 inline-flex rounded-full bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-gray-400">
                          {faq.category}
                        </span>

                        <p className="text-sm font-extrabold text-[#172033] sm:text-base">
                          {faq.question}
                        </p>

                      </div>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-light transition ${
                          isOpen
                            ? "rotate-45 bg-[#FF6A00] text-white"
                            : "bg-[#FFF1E8] text-[#FF6A00]"
                        }`}
                      >
                        +
                      </span>

                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >

                      <div className="overflow-hidden">

                        <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6">

                          <p className="text-sm leading-7 text-gray-500 sm:text-base">
                            {faq.answer}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-6 py-14 text-center">

                <div className="text-5xl">
                  🔎
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-[#172033]">
                  No help articles found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We couldn't find anything matching your
                  search. Try different keywords or browse
                  another help category.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-6 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#E85D00]"
                >
                  Show All Questions
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =========================================================
          SHOPPING GUIDE
      ========================================================= */}

      <section className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          {/* LEFT */}

          <div>

            <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#FF6A00]">
              Shopping Guide
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
              Shopping on Velora is simple
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
              Follow these simple steps to discover
              products, choose what you love and complete
              your shopping experience.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#E85D00]"
            >
              Start Shopping
            </Link>

          </div>

          {/* RIGHT */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF1E8] text-xl">
                🔎
              </div>

              <h3 className="mt-4 font-extrabold text-[#172033]">
                1. Discover
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Search products or explore categories,
                new arrivals, trending products and deals.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F8FC] text-xl">
                🛍️
              </div>

              <h3 className="mt-4 font-extrabold text-[#172033]">
                2. Choose
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Check product details, prices, available
                options and choose what suits you.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3EEFF] text-xl">
                🛒
              </div>

              <h3 className="mt-4 font-extrabold text-[#172033]">
                3. Order
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Follow the available ordering and
                checkout options to complete your purchase.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF8EE] text-xl">
                📦
              </div>

              <h3 className="mt-4 font-extrabold text-[#172033]">
                4. Enjoy
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep track of your order and enjoy your
                Velora shopping experience.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          CONTACT SUPPORT
      ========================================================= */}

      <section className="bg-white">

        <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

          <div className="rounded-3xl bg-gradient-to-br from-[#172033] to-[#27344C] px-6 py-12 text-center shadow-xl sm:px-10 sm:py-16">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              💬
            </div>

            <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
              Still need help?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              If you couldn't find the answer you're looking
              for, our support team is here to help you with
              your questions.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setOpenFaq(null);

                  setTimeout(() => {
                    document
                      .getElementById("faqs")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 50);
                }}
                className="rounded-xl bg-[#FF6A00] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#E85D00] sm:text-base"
              >
                Browse FAQs
              </button>

              <Link
                href="/shop"
                className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20 sm:text-base"
              >
                Continue Shopping
              </Link>

            </div>

            <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-white/30">
              VALUE • AURA
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

