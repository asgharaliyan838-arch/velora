"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import products from "../data/products";

/* =========================================================
   DEAL HELPERS
========================================================= */

function getProductDiscount(product) {
  const explicitDiscount = Number(
    product?.discount || 0
  );

  if (explicitDiscount > 0) {
    return explicitDiscount;
  }

  const oldPrice = Number(
    product?.oldPrice || 0
  );

  const price = Number(
    product?.price || 0
  );

  if (
    oldPrice > price &&
    oldPrice > 0 &&
    price >= 0
  ) {
    return Math.min(
      100,
      Math.round(
        ((oldPrice - price) / oldPrice) * 100
      )
    );
  }

  return 0;
}

function isDealProduct(product) {
  return getProductDiscount(product) > 0;
}

/* =========================================================
   CATEGORY MATCHING
========================================================= */

function matchesCategory(product, selectedCategory) {
  const category = String(
    product?.category || ""
  ).toLowerCase();

  if (selectedCategory === "All") {
    return true;
  }

  if (selectedCategory === "__MEN__") {
    return (
      category.includes("men") &&
      !category.includes("women")
    );
  }

  if (selectedCategory === "__WOMEN__") {
    return category.includes("women");
  }

  if (selectedCategory === "__KIDS__") {
    return (
      category.includes("kid") ||
      category.includes("child")
    );
  }

  const selected = String(
    selectedCategory || ""
  ).toLowerCase();

  const categoryMap = {
    Jewellery: [
      "jewellery",
      "jewelry",
    ],

    Beauty: [
      "beauty",
      "skincare",
      "skin care",
      "cosmetic",
      "cosmetics",
    ],

    Watches: [
      "watch",
      "watches",
    ],

    Bags: [
      "bag",
      "bags",
      "wallet",
      "wallets",
    ],

    Shoes: [
      "shoe",
      "shoes",
      "footwear",
      "sandal",
      "sandals",
    ],

    Accessories: [
      "accessor",
    ],

    Perfumes: [
      "perfume",
      "perfumes",
      "fragrance",
      "fragrances",
    ],
  };

  const keywords =
    categoryMap[selectedCategory];

  if (keywords) {
    return keywords.some((keyword) =>
      category.includes(keyword)
    );
  }

  return category === selected;
}

/* =========================================================
   DEALS PAGE
========================================================= */

export default function DealsPage() {
  /* =========================================================
     MAIN STATES
  ========================================================= */

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Price
  const [priceRange, setPriceRange] =
    useState("");

  const [priceFilter, setPriceFilter] =
    useState("");

  // Color
  const [colorFilter, setColorFilter] =
    useState("");

  // Discount
  const [discountRange, setDiscountRange] =
    useState("");

  const [discountFilter, setDiscountFilter] =
    useState("");

  const [sort, setSort] =
    useState("Discount");

  const [wishlist, setWishlist] =
    useState([]);

  const [visibleProducts, setVisibleProducts] =
    useState(12);

  const [showFilters, setShowFilters] =
    useState(false);

  /* =========================================================
     DEAL PRODUCTS

     Product becomes a deal when:

     1. discount > 0

     OR

     2. oldPrice > price

     So when you add a new deal product in products.js,
     it automatically appears here.
  ========================================================= */

  const dealProducts = useMemo(() => {
    return products.filter(isDealProduct);
  }, []);

  /* =========================================================
     FIXED CATEGORY NAVIGATION

     No duplicate Men / Women / Kids.
     Shoes included.
  ========================================================= */

  const categoryNav = useMemo(() => {
    return [
      {
        label: "All",
        value: "All",
      },
      {
        label: "Men",
        value: "__MEN__",
      },
      {
        label: "Women",
        value: "__WOMEN__",
      },
      {
        label: "Jewellery",
        value: "Jewellery",
      },
      {
        label: "Beauty",
        value: "Beauty",
      },
      {
        label: "Watches",
        value: "Watches",
      },
      {
        label: "Bags",
        value: "Bags",
      },
      {
        label: "Shoes",
        value: "Shoes",
      },
      {
        label: "Accessories",
        value: "Accessories",
      },
      {
        label: "Perfumes",
        value: "Perfumes",
      },
      {
        label: "Kids",
        value: "__KIDS__",
      },
    ];
  }, []);

  /* =========================================================
     PRICE RANGE OPTIONS
  ========================================================= */

  const priceOptions = [
    {
      label: "Under Rs. 1,500",
      value: "under1500",
    },
    {
      label: "Rs. 1500 – 2500",
      value: "1500-2500",
    },
    {
      label: "Rs. 2500 – 4000",
      value: "2500-4000",
    },
    {
      label: "Rs. 4,000+",
      value: "4000plus",
    },
  ];

  /* =========================================================
     COLOR OPTIONS
  ========================================================= */

  const colorOptions = [
    "Black",
    "White",
    "Beige",
    "Navy",
    "Gray",
    "Purple",
    "Lavender",
    "Blue",
    "Tan",
    "Light Gray",
    "Pink",
    "Dark Gray",
    "Cyan",
    "Gold",
    "Silver",
    "Yellow Gold",
    "Yellow",
    "Green",
    "Brown",
  ];

  /* =========================================================
     DISCOUNT OPTIONS
  ========================================================= */

  const discountOptions = [
    {
      label: "10%+ Off",
      value: "10",
    },
    {
      label: "20%+ Off",
      value: "20",
    },
    {
      label: "25%+ Off",
      value: "25",
    },
  ];

  /* =========================================================
     FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...dealProducts];

    /* =======================================================
       CATEGORY
    ======================================================= */

    if (category !== "All") {
      result = result.filter((product) =>
        matchesCategory(
          product,
          category
        )
      );
    }

    /* =======================================================
       SEARCH

       Searches:
       name
       category
       badge
       description
       variant
       colors
       sizes
    ======================================================= */

    if (search.trim()) {
      const query = search
        .toLowerCase()
        .trim();

      result = result.filter((product) => {
        return [
          product.name,
          product.category,
          product.badge,
          product.description,
          product.variantType,
          ...(product.colors || []),
          ...(product.sizes || []),
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(query)
          );
      });
    }

    /* =======================================================
       FIXED PRICE RANGE
    ======================================================= */

    if (priceRange === "under1500") {
      result = result.filter(
        (product) =>
          Number(product.price || 0) <
          1500
      );
    }

    if (priceRange === "1500-2500") {
      result = result.filter((product) => {
        const price = Number(
          product.price || 0
        );

        return (
          price >= 1500 &&
          price <= 2500
        );
      });
    }

    if (priceRange === "2500-4000") {
      result = result.filter((product) => {
        const price = Number(
          product.price || 0
        );

        return (
          price >= 2500 &&
          price <= 4000
        );
      });
    }

    if (priceRange === "4000plus") {
      result = result.filter(
        (product) =>
          Number(product.price || 0) >=
          4000
      );
    }

    /* =======================================================
       CUSTOM MAXIMUM PRICE

       Example:
       3000 = Rs. 3000 or less
    ======================================================= */

    if (priceFilter.trim()) {
      const maximumPrice =
        Number(priceFilter);

      if (
        Number.isFinite(maximumPrice) &&
        maximumPrice >= 0
      ) {
        result = result.filter(
          (product) =>
            Number(product.price || 0) <=
            maximumPrice
        );
      }
    }

    /* =======================================================
       COLOR

       Fixed color + custom color search
    ======================================================= */

    if (colorFilter.trim()) {
      const colorQuery =
        colorFilter
          .toLowerCase()
          .trim();

      result = result.filter(
        (product) => {
          const colors =
            Array.isArray(product.colors)
              ? product.colors
              : [];

          return colors.some((color) =>
            String(color)
              .toLowerCase()
              .includes(colorQuery)
          );
        }
      );
    }

    /* =======================================================
       FIXED DISCOUNT
    ======================================================= */

    if (discountRange) {
      const minimumDiscount =
        Number(discountRange);

      result = result.filter(
        (product) =>
          getProductDiscount(product) >=
          minimumDiscount
      );
    }

    /* =======================================================
       CUSTOM DISCOUNT

       Example:
       35 = 35% or more
       70 = 70% or more
    ======================================================= */

    if (discountFilter.trim()) {
      const minimumDiscount =
        Number(discountFilter);

      if (
        Number.isFinite(minimumDiscount) &&
        minimumDiscount >= 0
      ) {
        result = result.filter(
          (product) =>
            getProductDiscount(product) >=
            minimumDiscount
        );
      }
    }

    /* =======================================================
       SORT
    ======================================================= */

    if (sort === "Discount") {
      result.sort(
        (a, b) =>
          getProductDiscount(b) -
          getProductDiscount(a)
      );
    }

    if (sort === "Newest") {
      result.sort((a, b) => {
        if (
          a.createdAt &&
          b.createdAt
        ) {
          return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
          );
        }

        return (
          Number(b.id || 0) -
          Number(a.id || 0)
        );
      });
    }

    if (sort === "Price Low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "Price High") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "Rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [
    dealProducts,
    search,
    category,
    priceRange,
    priceFilter,
    colorFilter,
    discountRange,
    discountFilter,
    sort,
  ]);

  /* =========================================================
     RESET PAGINATION
  ========================================================= */

  useEffect(() => {
    setVisibleProducts(12);
  }, [
    search,
    category,
    priceRange,
    priceFilter,
    colorFilter,
    discountRange,
    discountFilter,
    sort,
  ]);

  /* =========================================================
     MOBILE BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [showFilters]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter(
            (item) => item !== id
          )
        : [...previous, id]
    );
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");

    setPriceRange("");
    setPriceFilter("");

    setColorFilter("");

    setDiscountRange("");
    setDiscountFilter("");

    setSort("Discount");
  };

  /* =========================================================
     PRICE FORMAT
  ========================================================= */

  const formatPrice = (price) => {
    return `Rs. ${Number(
      price || 0
    ).toLocaleString()}`;
  };

  /* =========================================================
     DISPLAY PRODUCTS
  ========================================================= */

  const displayedProducts =
    filteredProducts.slice(
      0,
      visibleProducts
    );

  /* =========================================================
     ACTIVE FILTER CHECK
  ========================================================= */

  const hasFilters =
    search.trim() !== "" ||
    category !== "All" ||
    priceRange !== "" ||
    priceFilter.trim() !== "" ||
    colorFilter.trim() !== "" ||
    discountRange !== "" ||
    discountFilter.trim() !== "";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#172033] via-[#202B40] to-[#FF6A00]">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6A00]/30 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur sm:px-4 sm:py-2 sm:text-sm">
              🔥 Limited Time Offers
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Hot Deals
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-6 text-white/80 sm:text-lg sm:leading-7 lg:text-xl">
              Discover amazing discounts,
              limited-time offers and
              incredible prices at Velora.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">

              <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#172033] sm:px-4 sm:text-base">
                ⚡ Best Prices
              </span>

              <span className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur sm:px-4 sm:text-base">
                🏷️ Big Discounts
              </span>

              <span className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur sm:px-4 sm:text-base">
                🛍️ Shop & Save
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* =================================================
          CATEGORY NAVIGATION
      ================================================= */}

      <section className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">

        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-10">

          <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-hide">

            {categoryNav.map((item) => {
              const active =
                category === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setCategory(
                      item.value
                    )
                  }
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition sm:px-5 ${
                    active
                      ? "bg-[#FF6A00] text-white shadow-sm"
                      : "text-gray-600 hover:bg-[#FFF1E8] hover:text-[#FF6A00]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-6 sm:py-8 lg:px-10">

        {/* =================================================
            SEARCH / SORT
        ================================================= */}

        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-xl">

              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder={
                  category === "All"
                    ? "Search deals..."
                    : `Search in ${category}...`
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/10 sm:text-base"
              />

            </div>

            {/* MOBILE FILTER + SORT */}

            <div className="flex w-full gap-2 lg:w-auto">

              <button
                type="button"
                onClick={() =>
                  setShowFilters(true)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-bold text-[#172033] transition hover:border-[#FF6A00] hover:text-[#FF6A00] lg:hidden"
              >
                ☰ Filters
              </button>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target.value
                  )
                }
                className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#172033] outline-none focus:border-[#FF6A00] lg:w-48"
              >
                <option value="Discount">
                  Best Deals
                </option>

                <option value="Newest">
                  Newest
                </option>

                <option value="Price Low">
                  Price: Low to High
                </option>

                <option value="Price High">
                  Price: High to Low
                </option>

                <option value="Rating">
                  Top Rated
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="flex gap-6">

          {/* =================================================
              DESKTOP FILTER SIDEBAR
          ================================================= */}

          <aside className="hidden w-64 shrink-0 lg:block">

            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-base font-extrabold text-[#172033]">
                  Filters
                </h2>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-md bg-[#FF6A00] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#FF8A3D]"
                  >
                    Clear
                  </button>
                )}

              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div className="border-b border-gray-100 pb-5">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Category
                </h3>

                <div className="space-y-1.5">

                  {categoryNav
                    .filter(
                      (item) =>
                        item.value !==
                        "All"
                    )
                    .map((item) => (

                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setCategory(
                            item.value
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                          category ===
                          item.value
                            ? "bg-[#FFF1E8] font-bold text-[#FF6A00]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#FF6A00]"
                        }`}
                      >

                        <span>
                          {item.label}
                        </span>

                        {category ===
                          item.value && (
                          <span className="font-bold">
                            ✓
                          </span>
                        )}

                      </button>

                    ))}

              </div>

              <button
                type="button"
                onClick={() =>
                  setCategory("All")
                }
                className={`mt-2 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                  category === "All"
                    ? "bg-[#FFF1E8] text-[#FF6A00]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                All Categories
              </button>

              </div>

              {/* =================================================
                  PRICE
              ================================================= */}

              <div className="border-b border-gray-100 py-5">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Price
                </h3>

                <div className="space-y-1.5">

                  {priceOptions.map(
                    (option) => {

                      const active =
                        priceRange ===
                        option.value;

                      return (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          onClick={() => {
                            setPriceRange(
                              active
                                ? ""
                                : option.value
                            );

                            if (!active) {
                              setPriceFilter(
                                ""
                              );
                            }
                          }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                            active
                              ? "bg-[#FFF1E8] text-[#FF6A00]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#FF6A00]"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    }
                  )}

                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Or enter maximum price
                </p>

                <div className="relative mt-2">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={priceFilter}
                    onChange={(event) => {
                      setPriceFilter(
                        event.target.value
                      );

                      if (
                        event.target.value
                      ) {
                        setPriceRange("");
                      }
                    }}
                    placeholder="e.g. 3000"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#FF6A00] focus:bg-white"
                  />

                </div>

              </div>

              {/* =================================================
                  COLOR
              ================================================= */}

              <div className="border-b border-gray-100 py-5">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Color
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setColorFilter("")
                  }
                  className={`mb-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                    colorFilter === ""
                      ? "bg-[#FFF1E8] text-[#FF6A00]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[10px]">
                    {colorFilter === ""
                      ? "✓"
                      : ""}
                  </span>

                  All Colors
                </button>

                <div className="grid grid-cols-2 gap-1">

                  {colorOptions.map(
                    (color) => {

                      const active =
                        colorFilter
                          .toLowerCase()
                          .trim() ===
                        color
                          .toLowerCase();

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setColorFilter(
                              active
                                ? ""
                                : color
                            )
                          }
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold transition ${
                            active
                              ? "bg-[#FFF1E8] text-[#FF6A00]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >

                          <span
                            className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-200"
                            style={{
                              backgroundColor:
                                getColorCode(
                                  color
                                ),
                            }}
                          />

                          <span className="truncate">
                            {color}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Or search color
                </p>

                <input
                  type="text"
                  value={colorFilter}
                  onChange={(event) =>
                    setColorFilter(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Red, Black..."
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-[#FF6A00] focus:bg-white"
                />

              </div>

              {/* =================================================
                  DISCOUNT
              ================================================= */}

              <div className="pt-5">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Discount
                </h3>

                <div className="space-y-1.5">

                  {discountOptions.map(
                    (option) => {

                      const active =
                        discountRange ===
                        option.value;

                      return (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          onClick={() => {
                            setDiscountRange(
                              active
                                ? ""
                                : option.value
                            );

                            if (!active) {
                              setDiscountFilter(
                                ""
                              );
                            }
                          }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                            active
                              ? "bg-[#FFF1E8] text-[#FF6A00]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-[#FF6A00]"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    }
                  )}

                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Or enter discount
                </p>

                <div className="relative mt-2">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountFilter}
                    onChange={(event) => {
                      setDiscountFilter(
                        event.target.value
                      );

                      if (
                        event.target.value
                      ) {
                        setDiscountRange(
                          ""
                        );
                      }
                    }}
                    placeholder="e.g. 30"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-3 pr-9 text-sm outline-none transition focus:border-[#FF6A00] focus:bg-white"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                    %
                  </span>

                </div>

              </div>

            </div>

          </aside>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="min-w-0 flex-1">

            {/* RESULTS HEADER */}

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-extrabold tracking-tight text-[#172033] sm:text-3xl">
                  Deals & Offers
                </h2>

                <p className="mt-0.5 text-sm text-gray-500 sm:text-base">
                  Showing{" "}
                  {displayedProducts.length}{" "}
                  of{" "}
                  {filteredProducts.length}{" "}
                  deals
                </p>

              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="hidden rounded-lg bg-[#FF6A00] px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#FF8A3D] sm:block"
                >
                  Clear Filters
                </button>
              )}

            </div>

            {/* =================================================
                ACTIVE FILTERS
            ================================================= */}

            {hasFilters && (
              <div className="mb-4 flex flex-wrap gap-2">

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    Search: {search} ×
                  </button>
                )}

                {category !== "All" && (
                  <button
                    type="button"
                    onClick={() =>
                      setCategory("All")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    {category ===
                    "__MEN__"
                      ? "Men"
                      : category ===
                        "__WOMEN__"
                      ? "Women"
                      : category ===
                        "__KIDS__"
                      ? "Kids"
                      : category}{" "}
                    ×
                  </button>
                )}

                {priceRange && (
                  <button
                    type="button"
                    onClick={() =>
                      setPriceRange("")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    {
                      priceOptions.find(
                        (option) =>
                          option.value ===
                          priceRange
                      )?.label
                    }{" "}
                    ×
                  </button>
                )}

                {priceFilter && (
                  <button
                    type="button"
                    onClick={() =>
                      setPriceFilter("")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    Price ≤ Rs.{" "}
                    {Number(
                      priceFilter
                    ).toLocaleString()}{" "}
                    ×
                  </button>
                )}

                {colorFilter && (
                  <button
                    type="button"
                    onClick={() =>
                      setColorFilter("")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    Color: {colorFilter} ×
                  </button>
                )}

                {discountRange && (
                  <button
                    type="button"
                    onClick={() =>
                      setDiscountRange("")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    {
                      discountOptions.find(
                        (option) =>
                          option.value ===
                          discountRange
                      )?.label
                    }{" "}
                    ×
                  </button>
                )}

                {discountFilter && (
                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter("")
                    }
                    className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-sm font-semibold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]"
                  >
                    {discountFilter}%+ Off ×
                  </button>
                )}

              </div>
            )}

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {displayedProducts.length >
            0 ? (

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

                {displayedProducts.map(
                  (product) => {

                    const isWishlisted =
                      wishlist.includes(
                        product.id
                      );

                    const discount =
                      getProductDiscount(
                        product
                      );

                    return (
                      <div
                        key={product.id}
                        className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-xl"
                      >

                        {/* IMAGE */}

                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 sm:aspect-[4/5]">

                          <Link
                            href={
                              product.href ||
                              "#"
                            }
                            className="block h-full w-full"
                          >

                            <Image
                              src={
                                product.image
                              }
                              alt={
                                product.name ||
                                "Product"
                              }
                              fill
                              className="object-cover transition duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                          </Link>

                          {/* DEAL BADGE */}

                          <span className="absolute left-1 top-1 rounded bg-[#FF6A00] px-1.5 py-1 text-xs font-extrabold leading-none text-white shadow-sm sm:left-2 sm:top-2 sm:rounded-md sm:px-2 sm:py-1.5 sm:text-sm">
                            DEAL
                          </span>

                          {/* DISCOUNT */}

                          {discount > 0 && (
                            <span className="absolute right-1 top-1 rounded bg-[#172033] px-1.5 py-1 text-xs font-bold leading-none text-white shadow-sm sm:right-2 sm:top-2 sm:rounded-md sm:px-2 sm:py-1.5 sm:text-sm">
                              -{discount}%
                            </span>
                          )}

                          {/* WISHLIST */}

                          <button
                            type="button"
                            onClick={() =>
                              toggleWishlist(
                                product.id
                              )
                            }
                            aria-label={
                              isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-lg shadow-md transition hover:scale-110 sm:bottom-2 sm:right-2 sm:h-8 sm:w-8"
                          >
                            <span
                              className={
                                isWishlisted
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }
                            >
                              {isWishlisted
                                ? "♥"
                                : "♡"}
                            </span>
                          </button>

                          {/* QUICK VIEW */}

                          <Link
                            href={
                              product.href ||
                              "#"
                            }
                            className="absolute bottom-2 left-2 hidden rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-[#172033] opacity-0 shadow transition group-hover:opacity-100 sm:block sm:text-sm"
                          >
                            Quick View
                          </Link>

                        </div>

                        {/* INFO */}

                        <div className="p-2 sm:p-3">

                          {/* NAME */}

                          <Link
                            href={
                              product.href ||
                              "#"
                            }
                          >
                            <h3 className="line-clamp-2 min-h-[28px] text-sm font-bold leading-[14px] text-[#172033] transition hover:text-[#FF6A00] sm:min-h-[34px] sm:text-lg sm:leading-4">
                              {product.name}
                            </h3>
                          </Link>

                          {/* CATEGORY */}

                          {product.category && (
                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs">
                              {
                                product.category
                              }
                            </p>
                          )}

                          {/* RATING */}

                          <Link
                            href={`${product.href || "#"}#reviews`}
                            className="mt-1 flex items-center gap-1"
                          >
                            <span className="text-xs leading-none text-[#FFB27A] sm:text-sm">
                              ★★★★★
                            </span>

                            {Number(
                              product.reviews ||
                                0
                            ) > 0 ? (
                              <span className="text-[10px] text-gray-500 sm:text-xs">
                                {
                                  product.rating
                                }{" "}
                                (
                                {
                                  product.reviews
                                }
                                )
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400 sm:text-xs">
                                0 reviews ·
                                Rate
                              </span>
                            )}
                          </Link>

                          {/* PRICE */}

                          <div className="mt-1 flex flex-wrap items-center gap-1">

                            <span className="text-base font-extrabold text-[#FF6A00] sm:text-lg">
                              {formatPrice(
                                product.price
                              )}
                            </span>

                            {product.oldPrice && (
                              <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                                {formatPrice(
                                  product.oldPrice
                                )}
                              </span>
                            )}

                          </div>

                          {/* SAVING */}

                          {product.oldPrice &&
                            Number(
                              product.oldPrice
                            ) >
                              Number(
                                product.price ||
                                  0
                              ) && (
                              <p className="mt-1 text-[10px] font-bold text-green-600 sm:text-xs">
                                Save{" "}
                                {formatPrice(
                                  Number(
                                    product.oldPrice
                                  ) -
                                    Number(
                                      product.price ||
                                        0
                                    )
                                )}
                              </p>
                            )}

                          {/* COLORS */}

                          {product.colors
                            ?.length > 0 && (
                            <div className="mt-1.5 flex items-center gap-1 overflow-hidden sm:mt-2">

                              <span className="shrink-0 text-[10px] font-medium text-gray-400 sm:text-xs">
                                Colors:
                              </span>

                              {product.colors
                                .slice(0, 4)
                                .map(
                                  (color) => (
                                    <span
                                      key={
                                        color
                                      }
                                      title={
                                        color
                                      }
                                      className="h-2.5 w-2.5 shrink-0 rounded-full border border-gray-200 sm:h-3.5 sm:w-3.5"
                                      style={{
                                        backgroundColor:
                                          getColorCode(
                                            color
                                          ),
                                      }}
                                    />
                                  )
                                )}

                            </div>
                          )}

                          {/* SIZES / VARIANT */}

                          {product.sizes
                            ?.length > 0 ? (
                            <div className="mt-1.5 flex items-center gap-1 overflow-hidden sm:mt-2">

                              <span className="shrink-0 text-[10px] font-medium text-gray-400 sm:text-xs">
                                Sizes:
                              </span>

                              {product.sizes
                                .slice(0, 4)
                                .map(
                                  (size) => (
                                    <span
                                      key={
                                        size
                                      }
                                      className="rounded border border-gray-200 px-1 py-0.5 text-[9px] font-semibold leading-none text-gray-500 sm:px-1.5 sm:text-[10px]"
                                    >
                                      {size}
                                    </span>
                                  )
                                )}

                            </div>
                          ) : product.variantType ? (
                            <div className="mt-1.5 flex items-center gap-1 sm:mt-2">

                              <span className="shrink-0 text-[10px] font-medium text-gray-400 sm:text-xs">
                                Variant:
                              </span>

                              <span className="truncate rounded border border-gray-200 px-1 py-0.5 text-[9px] font-semibold text-gray-500 sm:px-1.5 sm:text-[10px]">
                                {
                                  product.variantType
                                }
                              </span>

                            </div>
                          ) : null}

                          {/* VIEW PRODUCT */}

                          <Link
                            href={
                              product.href ||
                              "#"
                            }
                            className="mt-2 flex w-full items-center justify-center rounded-md bg-[#172033] px-2 py-2 text-xs font-bold text-white transition hover:bg-[#FF6A00] sm:mt-3 sm:rounded-lg sm:py-2.5 sm:text-sm"
                          >
                            View Product
                          </Link>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="rounded-xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1E8] text-3xl text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]">
                  🔎
                </div>

                <h3 className="mt-4 text-xl font-extrabold text-[#172033]">
                  No Deals Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-gray-500 sm:text-base">
                  We couldn't find any
                  deals matching your
                  search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#FF6A00] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
                >
                  Clear Filters
                </button>

              </div>
            )}

            {/* =================================================
                LOAD MORE
            ================================================= */}

            {visibleProducts <
              filteredProducts.length && (
              <div className="mt-8 flex justify-center sm:mt-10">

                <button
                  type="button"
                  onClick={() =>
                    setVisibleProducts(
                      (previous) =>
                        previous + 12
                    )
                  }
                  className="rounded-lg border border-[#172033] bg-white px-6 py-2.5 text-sm font-bold text-[#172033] transition hover:bg-[#172033] hover:text-white sm:px-8 sm:py-3 sm:text-base"
                >
                  Load More Deals
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =================================================
          MOBILE FILTER DRAWER
      ================================================= */}

      {showFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* OVERLAY */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setShowFilters(false)
            }
            className="absolute inset-0 bg-black/50"
          />

          {/* DRAWER */}

          <div className="absolute inset-x-0 bottom-0 flex max-h-[90vh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">

              <div>

                <h2 className="text-lg font-extrabold text-[#172033]">
                  Filters
                </h2>

                <p className="mt-0.5 text-xs text-gray-400">
                  Refine your deals
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-gray-600 transition hover:bg-gray-200"
              >
                ✕
              </button>

            </div>

            {/* SCROLLABLE CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div className="border-b border-gray-100 pb-6">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Category
                </h3>

                <div className="grid grid-cols-2 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setCategory("All")
                    }
                    className={`rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition ${
                      category === "All"
                        ? "border-[#FF6A00] bg-[#FFF1E8] text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-[#FF6A00]"
                    }`}
                  >
                    All
                  </button>

                  {categoryNav
                    .filter(
                      (item) =>
                        item.value !==
                        "All"
                    )
                    .map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setCategory(
                            item.value
                          )
                        }
                        className={`rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition ${
                          category ===
                          item.value
                            ? "border-[#FF6A00] bg-[#FFF1E8] text-[#FF6A00]"
                            : "border-gray-200 text-gray-600 hover:border-[#FF6A00]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}

                </div>

              </div>

              {/* =================================================
                  PRICE
              ================================================= */}

              <div className="border-b border-gray-100 py-6">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Price
                </h3>

                <div className="space-y-1.5">

                  {priceOptions.map(
                    (option) => {

                      const active =
                        priceRange ===
                        option.value;

                      return (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          onClick={() => {
                            setPriceRange(
                              active
                                ? ""
                                : option.value
                            );

                            if (!active) {
                              setPriceFilter(
                                ""
                              );
                            }
                          }}
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                            active
                              ? "bg-[#FFF1E8] text-[#FF6A00]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    }
                  )}

                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Or enter maximum price
                </p>

                <div className="relative mt-2">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={priceFilter}
                    onChange={(event) => {
                      setPriceFilter(
                        event.target.value
                      );

                      if (
                        event.target.value
                      ) {
                        setPriceRange("");
                      }
                    }}
                    placeholder="e.g. 3000"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#FF6A00] focus:bg-white"
                  />

                </div>

              </div>

              {/* =================================================
                  COLOR
              ================================================= */}

              <div className="border-b border-gray-100 py-6">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Color
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setColorFilter("")
                  }
                  className={`mb-2 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                    colorFilter === ""
                      ? "bg-[#FFF1E8] text-[#FF6A00]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[10px]">
                    {colorFilter === ""
                      ? "✓"
                      : ""}
                  </span>

                  All Colors
                </button>

                <div className="grid grid-cols-2 gap-1">

                  {colorOptions.map(
                    (color) => {

                      const active =
                        colorFilter
                          .toLowerCase()
                          .trim() ===
                        color
                          .toLowerCase();

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setColorFilter(
                              active
                                ? ""
                                : color
                            )
                          }
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold transition ${
                            active
                              ? "bg-[#FFF1E8] text-[#FF6A00]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >

                          <span
                            className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-200"
                            style={{
                              backgroundColor:
                                getColorCode(
                                  color
                                ),
                            }}
                          />

                          <span className="truncate">
                            {color}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Or search color
                </p>

                <input
                  type="text"
                  value={colorFilter}
                  onChange={(event) =>
                    setColorFilter(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Red, Black..."
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none transition focus:border-[#FF6A00] focus:bg-white"
                />

              </div>

              {/* =================================================
                  DISCOUNT
              ================================================= */}

              <div className="py-6">

                <h3 className="mb-3 text-sm font-bold text-[#172033]">
                  Discount
                </h3>

                <div className="space-y-1.5">

                  {discountOptions.map(
                    (option) => {

                      const active =
                        discountRange ===
                        option.value;

                      return (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          onClick={() => {
                            setDiscountRange(
                              active
                                ? ""
                                : option.value
                            );

                            if (!active) {
                              setDiscountFilter(
                                ""
                              );
                            }
                          }}
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                            active
                              ? "bg-[#FFF1E8] text-[#FF6A00]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    }
                  )}

                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Or enter discount
                </p>

                <div className="relative mt-2">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountFilter}
                    onChange={(event) => {
                      setDiscountFilter(
                        event.target.value
                      );

                      if (
                        event.target.value
                      ) {
                        setDiscountRange(
                          ""
                        );
                      }
                    }}
                    placeholder="e.g. 30"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-3 pr-9 text-sm outline-none transition focus:border-[#FF6A00] focus:bg-white"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                    %
                  </span>

                </div>

              </div>

            </div>

            {/* BOTTOM ACTIONS */}

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-gray-100 bg-white px-5 py-4">

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg bg-[#FF6A00] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#FF8A3D]"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="rounded-lg bg-[#172033] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#FF6A00]"
              >
                Apply Filters
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

/* =========================================================
   COLOR HELPER
========================================================= */

function getColorCode(color) {
  const normalized = String(
    color || ""
  )
    .trim()
    .toLowerCase();

  const colors = {
    black: "#111827",
    white: "#FFFFFF",
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#22C55E",
    yellow: "#EAB308",
    orange: "#F97316",
    pink: "#EC4899",
    purple: "#A855F7",
    brown: "#92400E",
    beige: "#D6C2A5",
    gray: "#9CA3AF",
    grey: "#9CA3AF",
    "light gray": "#D1D5DB",
    "dark gray": "#374151",
    navy: "#172033",
    maroon: "#800000",
    cream: "#FFFDD0",
    gold: "#D4AF37",
    silver: "#C0C0C0",
    lavender: "#C4B5FD",
    tan: "#C2A878",
    cyan: "#18B7E8",
    "yellow gold": "#D4AF37",
  };

  if (
    /^#[0-9a-f]{3,8}$/i.test(normalized)
  ) {
    return normalized;
  }

  return (
    colors[normalized] ||
    "#E5E7EB"
  );
}