"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import products from "../data/products";

export default function TrendingPage() {
  /* =========================================================
     MAIN FILTER STATES
  ========================================================= */

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Preset + custom filters
  const [priceFilter, setPriceFilter] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const [colorFilter, setColorFilter] = useState("All Colors");
  const [customColor, setCustomColor] = useState("");

  const [discountFilter, setDiscountFilter] = useState("");
  const [customDiscount, setCustomDiscount] = useState("");

  const [sort, setSort] = useState("Trending");
  const [wishlist, setWishlist] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  /* =========================================================
     FILTER SEARCH STATES
  ========================================================= */

  const [categorySearch, setCategorySearch] = useState("");

  /* =========================================================
     TRENDING PRODUCTS
  ========================================================= */

  const trendingProducts = useMemo(() => {
    return products.filter(
      (product) => product.isTrending === true
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

    const productCategories = trendingProducts
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
  }, [trendingProducts]);

  /* =========================================================
     SEARCHABLE CATEGORY OPTIONS
  ========================================================= */

  const filteredCategories = useMemo(() => {
    const query = categorySearch.toLowerCase().trim();

    if (!query) return categories;

    return categories.filter((item) =>
      String(item).toLowerCase().includes(query)
    );
  }, [categories, categorySearch]);

  /* =========================================================
     PRESET FILTER OPTIONS
  ========================================================= */

  const priceOptions = [
    "All Prices",
    "Under Rs. 1,500",
    "Rs. 1500 – 2500",
    "Rs. 2500 – 4000",
    "Rs. 4,000+",
  ];

  const colorOptions = [
    "All Colors",
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

  const discountOptions = [
    "No Discount Filter",
    "10%+ Off",
    "20%+ Off",
    "25%+ Off",
  ];

  /* =========================================================
     FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...trendingProducts];

    /* =======================================================
       CATEGORY
    ======================================================= */

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    /* =======================================================
       SEARCH
    ======================================================= */

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const productCategory =
          product.category?.toLowerCase() || "";
        const badge = product.badge?.toLowerCase() || "";
        const description =
          product.description?.toLowerCase() || "";

        const colors = (product.colors || [])
          .map((color) => String(color).toLowerCase())
          .join(" ");

        const sizes = (product.sizes || [])
          .map((size) => String(size).toLowerCase())
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

    /* =======================================================
       PRICE PRESET
    ======================================================= */

    if (priceFilter === "Under Rs. 1,500") {
      result = result.filter(
        (product) =>
          Number(product.price || 0) < 1500
      );
    }

    if (priceFilter === "Rs. 1500 – 2500") {
      result = result.filter((product) => {
        const price = Number(product.price || 0);

        return price >= 1500 && price <= 2500;
      });
    }

    if (priceFilter === "Rs. 2500 – 4000") {
      result = result.filter((product) => {
        const price = Number(product.price || 0);

        return price >= 2500 && price <= 4000;
      });
    }

    if (priceFilter === "Rs. 4,000+") {
      result = result.filter(
        (product) =>
          Number(product.price || 0) >= 4000
      );
    }

    /* =======================================================
       CUSTOM MAXIMUM PRICE
    ======================================================= */

    if (customPrice.trim() !== "") {
      const maxPrice = Number(customPrice);

      if (!Number.isNaN(maxPrice) && maxPrice >= 0) {
        result = result.filter(
          (product) =>
            Number(product.price || 0) <= maxPrice
        );
      } else {
        result = [];
      }
    }

    /* =======================================================
       COLOR PRESET
    ======================================================= */

    if (
      colorFilter &&
      colorFilter !== "All Colors"
    ) {
      const query = colorFilter.toLowerCase().trim();

      result = result.filter((product) =>
        (product.colors || []).some((color) =>
          String(color)
            .toLowerCase()
            .includes(query)
        )
      );
    }

    /* =======================================================
       CUSTOM COLOR
    ======================================================= */

    if (customColor.trim() !== "") {
      const query = customColor.toLowerCase().trim();

      result = result.filter((product) =>
        (product.colors || []).some((color) =>
          String(color)
            .toLowerCase()
            .includes(query)
        )
      );
    }

    /* =======================================================
       DISCOUNT PRESET
    ======================================================= */

    if (discountFilter === "10%+ Off") {
      result = result.filter(
        (product) =>
          Number(product.discount || 0) >= 10
      );
    }

    if (discountFilter === "20%+ Off") {
      result = result.filter(
        (product) =>
          Number(product.discount || 0) >= 20
      );
    }

    if (discountFilter === "25%+ Off") {
      result = result.filter(
        (product) =>
          Number(product.discount || 0) >= 25
      );
    }

    /* =======================================================
       CUSTOM DISCOUNT
    ======================================================= */

    if (customDiscount.trim() !== "") {
      const minDiscount = Number(customDiscount);

      if (
        !Number.isNaN(minDiscount) &&
        minDiscount >= 0
      ) {
        result = result.filter(
          (product) =>
            Number(product.discount || 0) >=
            minDiscount
        );
      } else {
        result = [];
      }
    }

    /* =======================================================
       SORT
    ======================================================= */

    if (sort === "Trending") {
      result.sort((a, b) => {
        if (a.rating && b.rating) {
          return b.rating - a.rating;
        }

        return (
          Number(b.id || 0) -
          Number(a.id || 0)
        );
      });
    }

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

    if (sort === "Discount") {
      result.sort(
        (a, b) =>
          (b.discount || 0) -
          (a.discount || 0)
      );
    }

    if (sort === "Rating") {
      result.sort(
        (a, b) =>
          (b.rating || 0) -
          (a.rating || 0)
      );
    }

    return result;
  }, [
    trendingProducts,
    search,
    category,
    priceFilter,
    customPrice,
    colorFilter,
    customColor,
    discountFilter,
    customDiscount,
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
    priceFilter,
    customPrice,
    colorFilter,
    customColor,
    discountFilter,
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

    setPriceFilter("");
    setCustomPrice("");

    setColorFilter("All Colors");
    setCustomColor("");

    setDiscountFilter("");
    setCustomDiscount("");

    setSort("Trending");

    setCategorySearch("");

    setVisibleProducts(12);
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
    priceFilter !== "" ||
    customPrice.trim() !== "" ||
    (colorFilter !== "" &&
      colorFilter !== "All Colors") ||
    customColor.trim() !== "" ||
    discountFilter !== "" ||
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
              Trending Now
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:text-7xl">
              Trending Products
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-6 text-white/80 sm:text-lg sm:leading-7 lg:text-xl">
              Discover the products customers are
              loving right now. Explore trending styles,
              popular picks and best-selling products
              on Velora.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">

              <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#172033] sm:px-4 sm:text-base">
                Popular Picks
              </span>

              <span className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur sm:px-4 sm:text-base">
                Hot Trends
              </span>

              <span className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur sm:px-4 sm:text-base">
                Best Sellers
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

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

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
          MAIN
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
                  ? "Search trending products..."
                  : `Search in ${category}...`
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-base outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/10"
            />

          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={() =>
                setShowFilters(true)
              }
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold transition hover:border-[#FF6A00] hover:text-[#FF6A00] lg:hidden"
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

              <option value="Trending">
                Trending
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

            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              {category === "All"
                ? "Trending Products"
                : category}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                visibleProducts,
                filteredProducts.length
              )}{" "}
              of{" "}
              {filteredProducts.length}{" "}
              trending products
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

            {priceFilter && (

              <button
                type="button"
                onClick={() =>
                  setPriceFilter("")
                }
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Price: {priceFilter} ×
              </button>

            )}

            {customPrice.trim() !== "" && (

              <button
                type="button"
                onClick={() =>
                  setCustomPrice("")
                }
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Price: Rs.{" "}
                {Number(
                  customPrice
                ).toLocaleString()}{" "}
                or less ×
              </button>

            )}

            {colorFilter !== "All Colors" &&
              colorFilter !== "" && (

                <button
                  type="button"
                  onClick={() =>
                    setColorFilter("All Colors")
                  }
                  className="flex items-center gap-1.5 rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
                >

                  <span
                    className="h-3 w-3 rounded-full border border-gray-300"
                    style={{
                      backgroundColor:
                        getColorCode(
                          colorFilter
                        ),
                    }}
                  />

                  Color: {colorFilter} ×

                </button>

              )}

            {customColor.trim() !== "" && (

              <button
                type="button"
                onClick={() =>
                  setCustomColor("")
                }
                className="flex items-center gap-1.5 rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >

                <span
                  className="h-3 w-3 rounded-full border border-gray-300"
                  style={{
                    backgroundColor:
                      getColorCode(
                        customColor
                      ),
                  }}
                />

                Color: {customColor} ×

              </button>

            )}

            {discountFilter && (

              <button
                type="button"
                onClick={() =>
                  setDiscountFilter("")
                }
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Discount: {discountFilter} ×
              </button>

            )}

            {customDiscount.trim() !== "" && (

              <button
                type="button"
                onClick={() =>
                  setCustomDiscount("")
                }
                className="rounded-full bg-[#FFF1E8] px-3 py-1.5 text-xs font-semibold text-[#FF6A00] ring-1 ring-[#FFD7BD]"
              >
                Discount: {customDiscount}%+ ×
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

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <FilterGroup
                title="Category"
                searchable
                searchValue={categorySearch}
                onSearchChange={setCategorySearch}
                searchPlaceholder="Search category..."
              >

                {filteredCategories.map((item) => (

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

              {/* =================================================
                  PRICE
              ================================================= */}

              <FilterGroup title="Price">

                {priceOptions.map((item) => (

                  <FilterOption
                    key={item}
                    label={item}
                    active={
                      item === "All Prices"
                        ? priceFilter === ""
                        : priceFilter === item
                    }
                    onClick={() => {
                      if (
                        item === "All Prices"
                      ) {
                        setPriceFilter("");
                      } else {
                        setPriceFilter(item);
                      }

                      setVisibleProducts(12);
                    }}
                  />

                ))}

                <div className="mt-3">

                  <p className="mb-2 text-[10px] font-semibold text-gray-400">
                    Or enter maximum price
                  </p>

                  <FilterInput
                    title=""
                    value={customPrice}
                    onChange={(value) => {
                      if (
                        value === "" ||
                        /^\d*$/.test(value)
                      ) {
                        setCustomPrice(value);
                        setVisibleProducts(12);
                      }
                    }}
                    placeholder="Enter maximum price..."
                    prefix="Rs."
                  />

                </div>

              </FilterGroup>

              {/* =================================================
                  COLOR
              ================================================= */}

              <FilterGroup title="Color">

                {colorOptions.map((item) => (

                  <FilterOption
                    key={item}
                    label={item}
                    active={
                      colorFilter === item
                    }
                    onClick={() => {
                      setColorFilter(item);
                      setVisibleProducts(12);
                    }}
                  />

                ))}

                <div className="mt-3">

                  <p className="mb-2 text-[10px] font-semibold text-gray-400">
                    Or search color
                  </p>

                  <FilterInput
                    title=""
                    value={customColor}
                    onChange={(value) => {
                      setCustomColor(value);
                      setVisibleProducts(12);
                    }}
                    placeholder="Search color..."
                  />

                </div>

              </FilterGroup>

              {/* =================================================
                  DISCOUNT
              ================================================= */}

              <FilterGroup title="Discount">

                {discountOptions.map((item) => (

                  <FilterOption
                    key={item}
                    label={item}
                    active={
                      item ===
                      "No Discount Filter"
                        ? discountFilter === ""
                        : discountFilter === item
                    }
                    onClick={() => {
                      if (
                        item ===
                        "No Discount Filter"
                      ) {
                        setDiscountFilter("");
                      } else {
                        setDiscountFilter(item);
                      }

                      setVisibleProducts(12);
                    }}
                  />

                ))}

                <div className="mt-3">

                  <p className="mb-2 text-[10px] font-semibold text-gray-400">
                    Or enter discount
                  </p>

                  <FilterInput
                    title=""
                    value={customDiscount}
                    onChange={(value) => {
                      if (
                        value === "" ||
                        /^\d*$/.test(value)
                      ) {
                        setCustomDiscount(value);
                        setVisibleProducts(12);
                      }
                    }}
                    placeholder="Enter discount..."
                    suffix="%+"
                  />

                </div>

              </FilterGroup>

            </div>

          </aside>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="min-w-0 flex-1">

            {displayedProducts.length > 0 ? (

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
                            className="block h-full w-full"
                          >

                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />

                          </Link>

                          {product.badge && (

                            <span className="absolute left-2 top-2 rounded-md bg-[#FF6A00] px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                              {product.badge}
                            </span>

                          )}

                          {product.discount > 0 && (

                            <span className="absolute right-2 top-2 rounded-md bg-[#172033] px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                              -{product.discount}%
                            </span>

                          )}

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

                          <Link
                            href={product.href}
                            className="absolute bottom-2 left-2 hidden rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-[#172033] opacity-0 shadow transition group-hover:opacity-100 sm:block"
                          >
                            Quick View
                          </Link>

                        </div>

                        {/* INFO */}

                        <div className="p-2.5 sm:p-3.5">

                          {product.category && (

                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#18B7E8] sm:text-xs">
                              {product.category}
                            </p>

                          )}

                          <Link href={product.href}>

                            <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-[#172033] transition hover:text-[#FF6A00] sm:text-base">
                              {product.name}
                            </h3>

                          </Link>

                          <Link
                            href={`${product.href}#reviews`}
                            className="mt-1 flex items-center gap-1"
                          >

                            <span className="text-xs tracking-[-1px] text-[#F59E0B] sm:text-sm">
                              ★★★★★
                            </span>

                            {product.reviews > 0 ? (

                              <span className="text-[10px] text-gray-500 sm:text-xs">
                                {product.rating} (
                                {product.reviews})
                              </span>

                            ) : (

                              <span className="text-[10px] text-gray-400 sm:text-xs">
                                0 reviews · Rate
                              </span>

                            )}

                          </Link>

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

                          {product.colors?.length > 0 && (

                            <div className="mt-2 flex items-center gap-1 overflow-hidden">

                              <span className="shrink-0 text-[10px] text-gray-400 sm:text-xs">
                                Colors:
                              </span>

                              {product.colors
                                .slice(0, 4)
                                .map((color) => (

                                  <span
                                    key={color}
                                    title={color}
                                    className="h-3 w-3 shrink-0 rounded-full border border-gray-200 sm:h-3.5 sm:w-3.5"
                                    style={{
                                      backgroundColor:
                                        getColorCode(
                                          color
                                        ),
                                    }}
                                  />

                                ))}

                            </div>

                          )}

                          {product.sizes?.length > 0 ? (

                            <div className="mt-2 flex items-center gap-1 overflow-hidden">

                              <span className="shrink-0 text-[10px] text-gray-400 sm:text-xs">
                                Sizes:
                              </span>

                              {product.sizes
                                .slice(0, 4)
                                .map((size) => (

                                  <span
                                    key={size}
                                    className="rounded border border-gray-200 px-1 py-0.5 text-[9px] font-semibold text-gray-500 sm:px-1.5 sm:text-[10px]"
                                  >
                                    {size}
                                  </span>

                                ))}

                            </div>

                          ) : product.variantType ? (

                            <div className="mt-2 flex items-center gap-1">

                              <span className="shrink-0 text-[10px] text-gray-400 sm:text-xs">
                                Variant:
                              </span>

                              <span className="truncate rounded border border-gray-200 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500 sm:text-[10px]">
                                {product.variantType}
                              </span>

                            </div>

                          ) : null}

                          <Link
                            href={product.href}
                            className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#FF6A00] px-2 py-2.5 text-xs font-bold text-white transition hover:bg-[#FF8A3D] sm:text-sm"
                          >
                            View Product
                          </Link>

                        </div>

                      </article>

                    );
                  }
                )}

              </div>

            ) : (

              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1E8] text-3xl font-bold text-[#FF6A00] shadow-sm ring-1 ring-[#FFD7BD]">
                  ✦
                </div>

                <h3 className="text-xl font-extrabold">
                  No Trending Products Found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-gray-500">
                  We couldn't find any trending
                  products matching your search
                  or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
                >
                  Clear Filters
                </button>

              </div>

            )}

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
                  className="rounded-xl border-2 border-[#172033] bg-white px-7 py-3 text-sm font-bold text-[#172033] transition hover:bg-[#172033] hover:text-white"
                >
                  Load More Products
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {showFilters && (

        <div className="fixed inset-0 z-[100] lg:hidden">

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setShowFilters(false)
            }
            className="absolute inset-0 bg-black/50"
          />

          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">

            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">

              <div>

                <h3 className="text-xl font-extrabold">
                  Filters
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Refine trending products
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

            <FilterGroup
              title="Category"
              searchable
              searchValue={categorySearch}
              onSearchChange={setCategorySearch}
              searchPlaceholder="Search category..."
            >

              {filteredCategories.map((item) => (

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

              {priceOptions.map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  active={
                    item === "All Prices"
                      ? priceFilter === ""
                      : priceFilter === item
                  }
                  onClick={() => {
                    if (
                      item === "All Prices"
                    ) {
                      setPriceFilter("");
                    } else {
                      setPriceFilter(item);
                    }

                    setVisibleProducts(12);
                  }}
                />

              ))}

              <div className="mt-3">

                <p className="mb-2 text-[10px] font-semibold text-gray-400">
                  Or enter maximum price
                </p>

                <FilterInput
                  title=""
                  value={customPrice}
                  onChange={(value) => {
                    if (
                      value === "" ||
                      /^\d*$/.test(value)
                    ) {
                      setCustomPrice(value);
                      setVisibleProducts(12);
                    }
                  }}
                  placeholder="Enter maximum price..."
                  prefix="Rs."
                />

              </div>

            </FilterGroup>

            {/* COLOR */}

            <FilterGroup title="Color">

              {colorOptions.map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  active={
                    colorFilter === item
                  }
                  onClick={() => {
                    setColorFilter(item);
                    setVisibleProducts(12);
                  }}
                />

              ))}

              <div className="mt-3">

                <p className="mb-2 text-[10px] font-semibold text-gray-400">
                  Or search color
                </p>

                <FilterInput
                  title=""
                  value={customColor}
                  onChange={(value) => {
                    setCustomColor(value);
                    setVisibleProducts(12);
                  }}
                  placeholder="Search color..."
                />

              </div>

            </FilterGroup>

            {/* DISCOUNT */}

            <FilterGroup title="Discount">

              {discountOptions.map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  active={
                    item ===
                    "No Discount Filter"
                      ? discountFilter === ""
                      : discountFilter === item
                  }
                  onClick={() => {
                    if (
                      item ===
                      "No Discount Filter"
                    ) {
                      setDiscountFilter("");
                    } else {
                      setDiscountFilter(item);
                    }

                    setVisibleProducts(12);
                  }}
                />

              ))}

              <div className="mt-3">

                <p className="mb-2 text-[10px] font-semibold text-gray-400">
                  Or enter discount
                </p>

                <FilterInput
                  title=""
                  value={customDiscount}
                  onChange={(value) => {
                    if (
                      value === "" ||
                      /^\d*$/.test(value)
                    ) {
                      setCustomDiscount(value);
                      setVisibleProducts(12);
                    }
                  }}
                  placeholder="Enter discount..."
                  suffix="%+"
                />

              </div>

            </FilterGroup>

            <div className="sticky bottom-0 mt-5 flex gap-2 border-t border-gray-200 bg-white pt-4">

              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold text-[#172033] transition hover:bg-gray-200"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
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
  searchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
}) {
  return (
    <div className="mb-6 border-b border-gray-100 pb-5 last:border-0">

      {title && (
        <div className="mb-3 flex items-center justify-between gap-2">

          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#172033]">
            {title}
          </h4>

        </div>
      )}

      {searchable && (

        <div className="relative mb-3">

          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="15"
            height="15"
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
            value={searchValue}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder={searchPlaceholder}
            className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-xs outline-none transition focus:border-[#FF6A00] focus:bg-white focus:ring-2 focus:ring-[#FF6A00]/10"
          />

        </div>

      )}

      <div className="space-y-2.5">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   FILTER INPUT
========================================================= */

function FilterInput({
  title,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  helper,
}) {
  return (
    <div className="mb-6 border-b border-gray-100 pb-5 last:border-0">

      {title && (

        <div className="mb-3">

          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#172033]">
            {title}
          </h4>

        </div>

      )}

      <div className="relative">

        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
            {prefix}
          </span>
        )}

        <input
          type="text"
          inputMode={
            title === "Price" ||
            title === "Discount" ||
            prefix === "Rs." ||
            suffix === "%+"
              ? "numeric"
              : "text"
          }
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`h-9 w-full rounded-lg border border-gray-200 bg-gray-50 text-xs outline-none transition focus:border-[#FF6A00] focus:bg-white focus:ring-2 focus:ring-[#FF6A00]/10 ${
            prefix
              ? "pl-10"
              : "pl-3"
          } ${
            suffix
              ? "pr-10"
              : "pr-3"
          }`}
        />

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
            {suffix}
          </span>
        )}

      </div>

      {helper && (
        <p className="mt-1.5 text-[10px] leading-4 text-gray-400">
          {helper}
        </p>
      )}

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
   COLOR HELPER
========================================================= */

function getColorCode(color) {
  const colors = {
    Black: "#111827",
    White: "#FFFFFF",
    Beige: "#D6B48A",
    Navy: "#172033",
    Gray: "#9CA3AF",
    "Light Gray": "#D1D5DB",
    "Dark Gray": "#374151",
    Blue: "#3B82F6",
    Purple: "#7C3AED",
    Lavender: "#C4B5FD",
    Pink: "#F9A8D4",
    Tan: "#C2A878",
    Cyan: "#18B7E8",
    Gold: "#D6B48A",
    Silver: "#E5E7EB",
    "Yellow Gold": "#FDE68A",
    Yellow: "#FBBF24",
    Green: "#34D399",
    Brown: "#8B5E3C",
    Red: "#EF4444",
    Orange: "#F97316",
    Maroon: "#7F1D1D",
    Cream: "#FFF7D6",
  };

  const matchedColor = Object.keys(colors).find(
    (item) =>
      item.toLowerCase() ===
      String(color).trim().toLowerCase()
  );

  return (
    colors[matchedColor] || "#E5E7EB"
  );
}