"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import products from "../data/products";

export default function NewArrivalsPage() {
  /* =========================================================
     MAIN FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [colorFilter, setColorFilter] = useState("All");
  const [discountFilter, setDiscountFilter] = useState("All");

  const [customColor, setCustomColor] = useState("");
  const [customDiscount, setCustomDiscount] = useState("");

  const [sort, setSort] = useState("Newest");

  const [wishlist, setWishlist] = useState([]);

  const [visibleProducts, setVisibleProducts] = useState(12);

  const [showFilters, setShowFilters] = useState(false);

  /* =========================================================
     MOBILE TEMP FILTER STATES
     These only apply when "Done" is pressed
  ========================================================= */

  const [mobileCategory, setMobileCategory] = useState("All");
  const [mobilePriceFilter, setMobilePriceFilter] =
    useState("All");
  const [mobileColorFilter, setMobileColorFilter] =
    useState("All");
  const [mobileCustomColor, setMobileCustomColor] =
    useState("");
  const [mobileDiscountFilter, setMobileDiscountFilter] =
    useState("All");
  const [mobileCustomDiscount, setMobileCustomDiscount] =
    useState("");

  /* =========================================================
     NEW ARRIVALS
     Any product with isNewArrival: true automatically appears
  ========================================================= */

  const newProducts = useMemo(() => {
    return products.filter(
      (product) => product.isNewArrival === true
    );
  }, []);

  /* =========================================================
     CATEGORY BAR
  ========================================================= */

  const navbarCategories = [
    "All",
    "Men",
    "Women",
    "Kids",
    "Jewellery",
    "Beauty",
    "Watches",
    "Bags",
    "Shoes",
    "Perfumes",
    "Accessories",
  ];

  /* =========================================================
     FILTER CATEGORIES
     Includes main categories + any extra category in data
  ========================================================= */

  const categories = useMemo(() => {
    const mainCategories = [
      "Men",
      "Women",
      "Kids",
      "Jewellery",
      "Beauty",
      "Watches",
      "Bags",
      "Shoes",
      "Perfumes",
      "Accessories",
    ];

    const productCategories = newProducts
      .map((product) => product.category)
      .filter(Boolean);

    const extraCategories = productCategories.filter(
      (item) => !mainCategories.includes(item)
    );

    return [
      "All",
      ...mainCategories,
      ...new Set(extraCategories),
    ];
  }, [newProducts]);

  /* =========================================================
     COLORS
  ========================================================= */

  const allColors = useMemo(() => {
    return [
      ...new Set(
        newProducts.flatMap(
          (product) => product.colors || []
        )
      ),
    ];
  }, [newProducts]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  /* =========================================================
     PRICE FORMAT
  ========================================================= */

  const formatPrice = (price) => {
    return `Rs. ${Number(price || 0).toLocaleString()}`;
  };

  /* =========================================================
     OPEN MOBILE FILTERS
     Copy current filters into temporary mobile states
  ========================================================= */

  const openMobileFilters = () => {
    setMobileCategory(category);
    setMobilePriceFilter(priceFilter);
    setMobileColorFilter(colorFilter);
    setMobileCustomColor(customColor);
    setMobileDiscountFilter(discountFilter);
    setMobileCustomDiscount(customDiscount);

    setShowFilters(true);
  };

  /* =========================================================
     APPLY MOBILE FILTERS
  ========================================================= */

  const applyMobileFilters = () => {
    setCategory(mobileCategory);

    setPriceFilter(mobilePriceFilter);

    setColorFilter(mobileColorFilter);

    setCustomColor(mobileCustomColor);

    setDiscountFilter(mobileDiscountFilter);

    setCustomDiscount(mobileCustomDiscount);

    setVisibleProducts(12);

    setShowFilters(false);
  };

  /* =========================================================
     CLEAR MOBILE FILTERS
  ========================================================= */

  const clearMobileFilters = () => {
    setMobileCategory("All");
    setMobilePriceFilter("All");
    setMobileColorFilter("All");
    setMobileCustomColor("");
    setMobileDiscountFilter("All");
    setMobileCustomDiscount("");

    setCategory("All");
    setPriceFilter("All");
    setColorFilter("All");
    setCustomColor("");
    setDiscountFilter("All");
    setCustomDiscount("");

    setVisibleProducts(12);
  };

  /* =========================================================
     FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...newProducts];

    /* ---------------------------------------------------------
       CATEGORY FIRST
    --------------------------------------------------------- */

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    /* ---------------------------------------------------------
       SEARCH
       Searches inside selected category
    --------------------------------------------------------- */

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) => {
        const name =
          product.name?.toLowerCase() || "";

        const productCategory =
          product.category?.toLowerCase() || "";

        const badge =
          product.badge?.toLowerCase() || "";

        const description =
          product.description?.toLowerCase() || "";

        const colors = (product.colors || [])
          .map((color) =>
            String(color).toLowerCase()
          )
          .join(" ");

        const sizes = (product.sizes || [])
          .map((size) =>
            String(size).toLowerCase()
          )
          .join(" ");

        const variant =
          product.variantType?.toLowerCase() || "";

        return (
          name.includes(query) ||
          productCategory.includes(query) ||
          badge.includes(query) ||
          description.includes(query) ||
          colors.includes(query) ||
          sizes.includes(query) ||
          variant.includes(query)
        );
      });
    }

    /* ---------------------------------------------------------
       PRICE
    --------------------------------------------------------- */

    if (priceFilter === "Under 1500") {
      result = result.filter(
        (product) => product.price < 1500
      );
    }

    if (priceFilter === "1500 - 2500") {
      result = result.filter(
        (product) =>
          product.price >= 1500 &&
          product.price <= 2500
      );
    }

    if (priceFilter === "2500 - 4000") {
      result = result.filter(
        (product) =>
          product.price > 2500 &&
          product.price <= 4000
      );
    }

    if (priceFilter === "4000+") {
      result = result.filter(
        (product) => product.price > 4000
      );
    }

    /* ---------------------------------------------------------
       CUSTOM PRICE
    --------------------------------------------------------- */

    if (
      priceFilter !== "All" &&
      ![
        "Under 1500",
        "1500 - 2500",
        "2500 - 4000",
        "4000+",
      ].includes(priceFilter)
    ) {
      const customPrice = Number(priceFilter);

      if (!Number.isNaN(customPrice)) {
        result = result.filter(
          (product) =>
            product.price <= customPrice
        );
      }
    }

    /* ---------------------------------------------------------
       COLOR
    --------------------------------------------------------- */

    if (colorFilter !== "All") {
      const colorQuery = (
        customColor || colorFilter
      )
        .toLowerCase()
        .trim();

      if (colorQuery) {
        result = result.filter((product) =>
          (product.colors || []).some((color) =>
            String(color)
              .toLowerCase()
              .includes(colorQuery)
          )
        );
      }
    }

    /* ---------------------------------------------------------
       DISCOUNT
    --------------------------------------------------------- */

    if (customDiscount.trim() !== "") {
      const discountValue =
        Number(customDiscount);

      if (
        !Number.isNaN(discountValue) &&
        discountValue >= 0
      ) {
        result = result.filter(
          (product) =>
            Number(product.discount || 0) >=
            discountValue
        );
      }
    } else {
      if (discountFilter === "10%+") {
        result = result.filter(
          (product) =>
            Number(product.discount || 0) >= 10
        );
      }

      if (discountFilter === "20%+") {
        result = result.filter(
          (product) =>
            Number(product.discount || 0) >= 20
        );
      }

      if (discountFilter === "25%+") {
        result = result.filter(
          (product) =>
            Number(product.discount || 0) >= 25
        );
      }
    }

    /* ---------------------------------------------------------
       SORT
    --------------------------------------------------------- */

    if (sort === "Newest") {
      result.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
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
        (a, b) => a.price - b.price
      );
    }

    if (sort === "Price High") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "Discount") {
      result.sort(
        (a, b) =>
          Number(b.discount || 0) -
          Number(a.discount || 0)
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
    newProducts,
    search,
    category,
    priceFilter,
    colorFilter,
    discountFilter,
    customColor,
    customDiscount,
    sort,
  ]);

  /* =========================================================
     RESET PAGINATION WHEN FILTERS CHANGE
  ========================================================= */

  useEffect(() => {
    setVisibleProducts(12);
  }, [
    search,
    category,
    priceFilter,
    colorFilter,
    discountFilter,
    customColor,
    customDiscount,
    sort,
  ]);

  /* =========================================================
     MOBILE FILTER SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow = showFilters
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  /* =========================================================
     CLEAR ALL FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceFilter("All");
    setColorFilter("All");
    setDiscountFilter("All");
    setCustomColor("");
    setCustomDiscount("");
    setSort("Newest");

    setMobileCategory("All");
    setMobilePriceFilter("All");
    setMobileColorFilter("All");
    setMobileCustomColor("");
    setMobileDiscountFilter("All");
    setMobileCustomDiscount("");

    setVisibleProducts(12);
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
    priceFilter !== "All" ||
    colorFilter !== "All" ||
    discountFilter !== "All" ||
    customColor.trim() !== "" ||
    customDiscount.trim() !== "";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#172033]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#172033] via-[#202B40] to-[#FF6A00]">

        <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-16 lg:px-10 lg:py-20">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-white backdrop-blur sm:px-4 sm:py-2 sm:text-base">
              Just Arrived
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:text-7xl">
              New Arrivals
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-6 text-white/80 sm:text-lg sm:leading-7 lg:text-xl">
              Discover the latest styles, fresh
              collections and newest products added
              to Velora.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">

              <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#172033] sm:px-4 sm:text-base">
                Latest Products
              </span>

              <span className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur sm:px-4 sm:text-base">
                Fresh Styles
              </span>

              <span className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur sm:px-4 sm:text-base">
                New Deals
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORY BAR
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-[1600px] px-3 py-3 sm:px-8 lg:px-12">

          <div className="flex gap-2 overflow-x-auto pb-1">

            {navbarCategories.map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setVisibleProducts(12);
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition sm:px-5 sm:text-sm ${
                  category === item
                    ? "bg-[#FF6A00] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#172033] hover:text-white"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN SHOP AREA
      ===================================================== */}

      <section className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-6 sm:py-10 lg:px-10">

        {/* ===================================================
            SEARCH + SORT
        =================================================== */}

        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-xl">

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
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
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleProducts(12);
              }}
              placeholder={
                category === "All"
                  ? "Search new arrivals..."
                  : `Search in ${category}...`
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-base outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/10"
            />

          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={openMobileFilters}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold lg:hidden"
            >
              ☰ Filters
            </button>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#FF6A00] sm:min-w-[190px]"
            >

              <option value="Newest">
                Newest
              </option>

              <option value="Price Low">
                Price: Low to High
              </option>

              <option value="Price High">
                Price: High to Low
              </option>

              <option value="Discount">
                Best Discount
              </option>

              <option value="Rating">
                Top Rated
              </option>

            </select>

          </div>

        </div>

        {/* ===================================================
            RESULT HEADER
        =================================================== */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-extrabold sm:text-2xl">
              {category === "All"
                ? "Latest Products"
                : category}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                visibleProducts,
                filteredProducts.length
              )}{" "}
              of {filteredProducts.length} new arrivals
            </p>

          </div>

          {hasFilters && (

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg bg-[#FF6A00] px-3 py-2 text-sm font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
            >
              Clear All
            </button>

          )}

        </div>

        {/* ===================================================
            ACTIVE FILTER TAGS
        =================================================== */}

        {hasFilters && (

          <div className="mb-5 flex flex-wrap gap-2">

            {search && (

              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
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
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Category: {category} ×
              </button>

            )}

            {priceFilter !== "All" && (

              <button
                type="button"
                onClick={() =>
                  setPriceFilter("All")
                }
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Price:{" "}
                {[
                  "Under 1500",
                  "1500 - 2500",
                  "2500 - 4000",
                  "4000+",
                ].includes(priceFilter)
                  ? priceFilter
                  : `Up to Rs. ${priceFilter}`}{" "}
                ×
              </button>

            )}

            {colorFilter !== "All" && (

              <button
                type="button"
                onClick={() => {
                  setColorFilter("All");
                  setCustomColor("");
                }}
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Color:{" "}
                {customColor || colorFilter} ×
              </button>

            )}

            {discountFilter !== "All" && (

              <button
                type="button"
                onClick={() => {
                  setDiscountFilter("All");
                  setCustomDiscount("");
                }}
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Discount:{" "}
                {customDiscount
                  ? `${customDiscount}%+`
                  : discountFilter}{" "}
                ×
              </button>

            )}

          </div>

        )}

        {/* ===================================================
            SIDEBAR + PRODUCTS
        =================================================== */}

        <div className="flex gap-6">

          {/* =================================================
              DESKTOP FILTER SIDEBAR
          ================================================= */}

          <aside className="hidden w-56 shrink-0 lg:block xl:w-64">

            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5">

              {/* FILTER HEADER */}

              <div className="mb-6 flex items-center justify-between">

                <h3 className="text-base font-extrabold">
                  Filters
                </h3>

                {hasFilters && (

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-md bg-[#FF6A00] px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
                  >
                    Clear
                  </button>

                )}

              </div>

              {/* CATEGORY */}

              <FilterGroup title="Category">

                {categories.map((item) => (

                  <FilterOption
                    key={item}
                    label={item}
                    active={
                      category === item
                    }
                    onClick={() => {
                      setCategory(item);
                      setVisibleProducts(12);
                    }}
                  />

                ))}

              </FilterGroup>

              {/* PRICE */}

              <FilterGroup title="Price">

                {[
                  "Under 1500",
                  "1500 - 2500",
                  "2500 - 4000",
                  "4000+",
                ].map((item) => (

                  <FilterOption
                    key={item}
                    label={
                      item === "Under 1500"
                        ? "Under Rs. 1,500"
                        : item === "4000+"
                        ? "Rs. 4,000+"
                        : `Rs. ${item.replace(
                            "-",
                            "–"
                          )}`
                    }
                    active={
                      priceFilter === item
                    }
                    onClick={() => {
                      setPriceFilter(item);
                      setVisibleProducts(12);
                    }}
                  />

                ))}

                {/* CUSTOM PRICE */}

                <div className="mt-3">

                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Or enter maximum price
                  </p>

                  <input
                    type="number"
                    min="0"
                    value={
                      ![
                        "All",
                        "Under 1500",
                        "1500 - 2500",
                        "2500 - 4000",
                        "4000+",
                      ].includes(priceFilter)
                        ? priceFilter
                        : ""
                    }
                    onChange={(event) => {
                      setPriceFilter(
                        event.target.value ||
                          "All"
                      );
                      setVisibleProducts(12);
                    }}
                    placeholder="e.g. 3000"
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#FF6A00]"
                  />

                </div>

              </FilterGroup>

              {/* COLOR */}

              <FilterGroup title="Color">

                <FilterOption
                  label="All Colors"
                  active={
                    colorFilter === "All" &&
                    customColor === ""
                  }
                  onClick={() => {
                    setColorFilter("All");
                    setCustomColor("");
                    setVisibleProducts(12);
                  }}
                />

                {allColors.map((item) => (

                  <FilterOption
                    key={item}
                    label={item}
                    active={
                      colorFilter === item &&
                      customColor === ""
                    }
                    onClick={() => {
                      setColorFilter(item);
                      setCustomColor("");
                      setVisibleProducts(12);
                    }}
                    color={item}
                  />

                ))}

                {/* CUSTOM COLOR */}

                <div className="mt-3">

                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Or search color
                  </p>

                  <input
                    type="text"
                    value={customColor}
                    onChange={(event) => {
                      const value =
                        event.target.value;

                      setCustomColor(value);

                      if (value.trim()) {
                        setColorFilter("Custom");
                      } else {
                        setColorFilter("All");
                      }

                      setVisibleProducts(12);
                    }}
                    placeholder="e.g. Red, Black..."
                    className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#FF6A00]"
                  />

                </div>

              </FilterGroup>

              {/* DISCOUNT */}

              <FilterGroup title="Discount">

                {[
                  "10%+",
                  "20%+",
                  "25%+",
                ].map((item) => (

                  <FilterOption
                    key={item}
                    label={`${item} Off`}
                    active={
                      discountFilter === item &&
                      customDiscount === ""
                    }
                    onClick={() => {
                      setDiscountFilter(item);
                      setCustomDiscount("");
                      setVisibleProducts(12);
                    }}
                  />

                ))}

                {/* CUSTOM DISCOUNT */}

                <div className="mt-3">

                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Or enter discount
                  </p>

                  <div className="flex items-center gap-2">

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customDiscount}
                      onChange={(event) => {
                        setCustomDiscount(
                          event.target.value
                        );
                        setDiscountFilter(
                          "Custom"
                        );
                        setVisibleProducts(12);
                      }}
                      placeholder="e.g. 30"
                      className="h-10 min-w-0 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#FF6A00]"
                    />

                    <span className="text-sm font-bold text-gray-500">
                      %
                    </span>

                  </div>

                </div>

              </FilterGroup>

            </div>

          </aside>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="min-w-0 flex-1">

            {displayedProducts.length === 0 ? (

              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center">

                <div className="mb-4 text-5xl text-[#FF6A00]">
                  ✦
                </div>

                <h3 className="text-xl font-extrabold">
                  No New Arrivals Found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-gray-500">
                  {newProducts.length === 0
                    ? "There are currently no new arrival products. Add a product with isNewArrival: true in your products data."
                    : "No new products match your current search or filters."}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <>

                {/* PRODUCT GRID */}

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">

                  {displayedProducts.map(
                    (product) => {

                      const isWishlisted =
                        wishlist.includes(
                          product.id
                        );

                      return (

                        <article
                          key={product.id}
                          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
                        >

                          {/* IMAGE */}

                          <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

                            <Link
                              href={product.href}
                              className="block h-full"
                            >

                              <Image
                                src={
                                  product.image
                                }
                                alt={
                                  product.name
                                }
                                fill
                                className="object-cover transition duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                              />

                            </Link>

                            {/* BADGE */}

                            {product.badge && (

                              <span className="absolute left-2 top-2 rounded-md bg-[#FF6A00] px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                                {product.badge}
                              </span>

                            )}

                            {/* DISCOUNT */}

                            {product.discount > 0 && (

                              <span className="absolute right-2 top-2 rounded-md bg-[#172033] px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                                -{product.discount}%
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
                              className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-xl shadow-md transition hover:scale-110"
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
                                product.href
                              }
                              className="absolute bottom-2 left-2 hidden rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-[#172033] opacity-0 shadow transition group-hover:opacity-100 sm:block sm:text-sm"
                            >
                              Quick View
                            </Link>

                          </div>

                          {/* INFO */}

                          <div className="p-2.5 sm:p-3.5">

                            {/* CATEGORY */}

                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#18B7E8] sm:text-xs">
                              {product.category}
                            </p>

                            {/* NAME */}

                            <Link
                              href={
                                product.href
                              }
                            >

                              <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-[#172033] transition hover:text-[#FF6A00] sm:text-base">
                                {product.name}
                              </h3>

                            </Link>

                            {/* RATING */}

                            <Link
                              href={`${product.href}#reviews`}
                              className="mt-1 flex items-center gap-1"
                            >

                              <span className="text-xs tracking-[-1px] text-[#F59E0B] sm:text-sm">
                                ★★★★★
                              </span>

                              {product.reviews >
                              0 ? (

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
                                  0 reviews · Rate
                                </span>

                              )}

                            </Link>

                            {/* PRICE */}

                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">

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

                            {/* COLORS */}

                            {product.colors
                              ?.length >
                              0 && (

                              <div className="mt-2 flex items-center gap-1">

                                <span className="text-[10px] text-gray-400 sm:text-xs">
                                  Colors:
                                </span>

                                {product.colors
                                  .slice(0, 4)
                                  .map(
                                    (
                                      color,
                                      index
                                    ) => (

                                      <ColorDot
                                        key={`${color}-${index}`}
                                        color={
                                          color
                                        }
                                      />

                                    )
                                  )}

                              </div>

                            )}

                            {/* SIZE / VARIANT */}

                            {product.sizes
                              ?.length >
                            0 ? (

                              <div className="mt-2 flex items-center gap-1 overflow-hidden">

                                <span className="text-[10px] text-gray-400 sm:text-xs">
                                  Sizes:
                                </span>

                                {product.sizes
                                  .slice(0, 4)
                                  .map(
                                    (
                                      size
                                    ) => (

                                      <span
                                        key={
                                          size
                                        }
                                        className="rounded border border-gray-200 px-1 py-0.5 text-[9px] font-semibold text-gray-500 sm:px-1.5 sm:text-[10px]"
                                      >
                                        {size}
                                      </span>

                                    )
                                  )}

                              </div>

                            ) : product.variantType ? (

                              <div className="mt-2 flex items-center gap-1">

                                <span className="text-[10px] text-gray-400 sm:text-xs">
                                  Variant:
                                </span>

                                <span className="truncate rounded border border-gray-200 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500 sm:text-[10px]">
                                  {
                                    product.variantType
                                  }
                                </span>

                              </div>

                            ) : null}

                            {/* BUTTON */}

                            <Link
                              href={
                                product.href
                              }
                              className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#FF6A00] px-2 py-2.5 text-xs font-bold text-white transition hover:bg-[#eca06a] sm:text-sm"
                            >
                              View Product
                            </Link>

                          </div>

                        </article>

                      );
                    }
                  )}

                </div>

                {/* LOAD MORE */}

                {visibleProducts <
                  filteredProducts.length && (

                  <div className="mt-8 flex justify-center">

                    <button
                      type="button"
                      onClick={() =>
                        setVisibleProducts(
                          (previous) =>
                            previous + 12
                        )
                      }
                      className="rounded-xl border-2 border-[#172033] bg-white px-7 py-3 text-sm font-bold text-[#172033] transition hover:bg-[#172033] hover:text-white"
                    >
                      Load More Products
                    </button>

                  </div>

                )}

              </>

            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

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

          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">

              <div>

                <h3 className="text-xl font-extrabold">
                  Filters
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Refine your new arrivals
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl"
              >
                ×
              </button>

            </div>

            {/* CATEGORY */}

            <FilterGroup title="Category">

              {categories.map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  active={
                    mobileCategory === item
                  }
                  onClick={() =>
                    setMobileCategory(item)
                  }
                />

              ))}

            </FilterGroup>

            {/* PRICE */}

            <FilterGroup title="Price">

              {[
                "Under 1500",
                "1500 - 2500",
                "2500 - 4000",
                "4000+",
              ].map((item) => (

                <FilterOption
                  key={item}
                  label={
                    item === "Under 1500"
                      ? "Under Rs. 1,500"
                      : item === "4000+"
                      ? "Rs. 4,000+"
                      : `Rs. ${item.replace(
                          "-",
                          "–"
                        )}`
                  }
                  active={
                    mobilePriceFilter ===
                    item
                  }
                  onClick={() =>
                    setMobilePriceFilter(
                      item
                    )
                  }
                />

              ))}

              {/* CUSTOM PRICE */}

              <div className="mt-3">

                <p className="mb-2 text-xs font-semibold text-gray-500">
                  Or enter maximum price
                </p>

                <input
                  type="number"
                  min="0"
                  value={
                    ![
                      "All",
                      "Under 1500",
                      "1500 - 2500",
                      "2500 - 4000",
                      "4000+",
                    ].includes(
                      mobilePriceFilter
                    )
                      ? mobilePriceFilter
                      : ""
                  }
                  onChange={(event) =>
                    setMobilePriceFilter(
                      event.target.value ||
                        "All"
                    )
                  }
                  placeholder="e.g. 3000"
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#FF6A00]"
                />

              </div>

            </FilterGroup>

            {/* COLOR */}

            <FilterGroup title="Color">

              <FilterOption
                label="All Colors"
                active={
                  mobileColorFilter ===
                    "All" &&
                  mobileCustomColor === ""
                }
                onClick={() => {
                  setMobileColorFilter(
                    "All"
                  );
                  setMobileCustomColor("");
                }}
              />

              {allColors.map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  color={item}
                  active={
                    mobileColorFilter ===
                      item &&
                    mobileCustomColor === ""
                  }
                  onClick={() => {
                    setMobileColorFilter(
                      item
                    );
                    setMobileCustomColor("");
                  }}
                />

              ))}

              {/* CUSTOM COLOR */}

              <div className="mt-3">

                <p className="mb-2 text-xs font-semibold text-gray-500">
                  Or search color
                </p>

                <input
                  type="text"
                  value={mobileCustomColor}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setMobileCustomColor(
                      value
                    );

                    if (value.trim()) {
                      setMobileColorFilter(
                        "Custom"
                      );
                    } else {
                      setMobileColorFilter(
                        "All"
                      );
                    }
                  }}
                  placeholder="e.g. Red, Black..."
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#FF6A00]"
                />

              </div>

            </FilterGroup>

            {/* DISCOUNT */}

            <FilterGroup title="Discount">

              {[
                "10%+",
                "20%+",
                "25%+",
              ].map((item) => (

                <FilterOption
                  key={item}
                  label={`${item} Off`}
                  active={
                    mobileDiscountFilter ===
                      item &&
                    mobileCustomDiscount ===
                      ""
                  }
                  onClick={() => {
                    setMobileDiscountFilter(
                      item
                    );
                    setMobileCustomDiscount(
                      ""
                    );
                  }}
                />

              ))}

              {/* CUSTOM DISCOUNT */}

              <div className="mt-3">

                <p className="mb-2 text-xs font-semibold text-gray-500">
                  Or enter discount
                </p>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      mobileCustomDiscount
                    }
                    onChange={(event) => {
                      setMobileCustomDiscount(
                        event.target.value
                      );

                      setMobileDiscountFilter(
                        "Custom"
                      );
                    }}
                    placeholder="e.g. 30"
                    className="h-10 min-w-0 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#FF6A00]"
                  />

                  <span className="text-sm font-bold text-gray-500">
                    %
                  </span>

                </div>

              </div>

            </FilterGroup>

            {/* ACTIONS */}

            <div className="sticky bottom-0 mt-5 flex gap-2 border-t border-gray-200 bg-white pt-4">

              <button
                type="button"
                onClick={clearMobileFilters}
                className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold text-[#172033] transition hover:bg-gray-200"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={
                  applyMobileFilters
                }
                className="flex-1 rounded-xl bg-[#FF6A00] py-3 text-sm font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
              >
                Done
              </button>

            </div>

          </aside>

        </div>

      )}

    </main>
  );
}

/* =========================================================
   FILTER GROUP
========================================================= */

function FilterGroup({
  title,
  children,
}) {
  return (
    <div className="mb-6 border-b border-gray-100 pb-5 last:border-0">

      <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#172033]">
        {title}
      </h4>

      <div className="space-y-2.5">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   FILTER OPTION
========================================================= */

function FilterOption({
  label,
  active,
  onClick,
  color,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 text-left text-sm"
    >

      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          active
            ? "border-[#FF6A00] bg-[#FF6A00] text-white"
            : "border-gray-300"
        }`}
      >
        {active && "✓"}
      </span>

      {color && (
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-200"
          style={{
            backgroundColor:
              getColorCode(color),
          }}
        />
      )}

      <span
        className={
          active
            ? "font-bold text-[#172033]"
            : "text-gray-500"
        }
      >
        {label}
      </span>

    </button>
  );
}

/* =========================================================
   COLOR DOT
========================================================= */

function ColorDot({ color }) {
  return (
    <span
      title={color}
      className="h-3 w-3 rounded-full border border-gray-200"
      style={{
        backgroundColor:
          getColorCode(color),
      }}
    />
  );
}

/* =========================================================
   COLOR HELPER
========================================================= */

function getColorCode(color) {
  const colors = {
    Black: "#111827",
    White: "#FFFFFF",
    Navy: "#172033",
    Gray: "#9CA3AF",
    "Light Gray": "#D1D5DB",
    "Dark Gray": "#374151",
    Blue: "#2563EB",
    Pink: "#F9A8D4",
    Purple: "#7C3AED",
    Lavender: "#C4B5FD",
    Beige: "#D6B48A",
    Tan: "#C2A878",
    Gold: "#D6B48A",
    "Yellow Gold": "#FDE68A",
    Brown: "#8B5E3C",
    Green: "#34D399",
    Yellow: "#FBBF24",
    Silver: "#E5E7EB",
    Cyan: "#18B7E8",
  };

  return (
    colors[color] || "#D1D5DB"
  );
}