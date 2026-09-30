"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import products from "../data/products";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [priceFilter, setPriceFilter] = useState("All");
  const [colorFilter, setColorFilter] = useState("All");
  const [discountFilter, setDiscountFilter] = useState("All");

  const [customColor, setCustomColor] = useState("");
  const [customDiscount, setCustomDiscount] = useState("");

  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);

  /* MOBILE FILTER TEMP STATES */
  const [mobileCategory, setMobileCategory] = useState("All");
  const [mobilePriceFilter, setMobilePriceFilter] = useState("All");
  const [mobileColorFilter, setMobileColorFilter] = useState("All");
  const [mobileCustomColor, setMobileCustomColor] = useState("");
  const [mobileDiscountFilter, setMobileDiscountFilter] = useState("All");
  const [mobileCustomDiscount, setMobileCustomDiscount] = useState("");

  const categories = [
    "All",
    "Men",
    "Women",
    "Jewellery",
    "Beauty",
    "Watches",
    "Bags",
    "Shoes",
    "Accessories",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(
          (item) =>
            ![
              "Men",
              "Women",
              "Jewellery",
              "Beauty",
              "Watches",
              "Bags",
              "Shoes",
              "Accessories",
            ].includes(item)
        )
    ),
  ];

  const allColors = [
    ...new Set(
      products.flatMap((product) => product.colors || [])
    ),
  ];

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const formatPrice = (price) =>
    `Rs. ${price.toLocaleString()}`;

  const openMobileFilters = () => {
    setMobileCategory(category);
    setMobilePriceFilter(priceFilter);
    setMobileColorFilter(colorFilter);
    setMobileCustomColor(customColor);
    setMobileDiscountFilter(discountFilter);
    setMobileCustomDiscount(customDiscount);
    setShowFilters(true);
  };

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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* CATEGORY FIRST */
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    /* SEARCH INSIDE SELECTED CATEGORY */
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
          .map((color) => color.toLowerCase())
          .join(" ");

        const variant =
          product.variantType?.toLowerCase() || "";

        return (
          name.includes(query) ||
          productCategory.includes(query) ||
          badge.includes(query) ||
          description.includes(query) ||
          colors.includes(query) ||
          variant.includes(query)
        );
      });
    }

    /* PRICE */
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

    /* CUSTOM PRICE */
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
          (product) => product.price <= customPrice
        );
      }
    }

    /* COLOR */
    if (colorFilter !== "All") {
      const colorQuery = (
        customColor || colorFilter
      )
        .toLowerCase()
        .trim();

      if (colorQuery) {
        result = result.filter((product) =>
          (product.colors || []).some((color) =>
            color.toLowerCase().includes(colorQuery)
          )
        );
      }
    }

    /* CUSTOM DISCOUNT */
    if (customDiscount.trim() !== "") {
      const discountValue = Number(customDiscount);

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
      /* PRESET DISCOUNT */
      if (discountFilter === "10%+") {
        result = result.filter(
          (product) => product.discount >= 10
        );
      }

      if (discountFilter === "20%+") {
        result = result.filter(
          (product) => product.discount >= 20
        );
      }

      if (discountFilter === "25%+") {
        result = result.filter(
          (product) => product.discount >= 25
        );
      }
    }

    /* SORT */
    if (sort === "Newest") {
      result.sort((a, b) => b.id - a.id);
    }

    if (sort === "Top Rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "Price Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Highest Discount") {
      result.sort(
        (a, b) =>
          (b.discount || 0) - (a.discount || 0)
      );
    }

    return result;
  }, [
    search,
    category,
    sort,
    priceFilter,
    colorFilter,
    discountFilter,
    customColor,
    customDiscount,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("Featured");
    setPriceFilter("All");
    setColorFilter("All");
    setDiscountFilter("All");
    setCustomColor("");
    setCustomDiscount("");
    setVisibleProducts(12);
  };

  const hasFilters =
    search ||
    category !== "All" ||
    priceFilter !== "All" ||
    colorFilter !== "All" ||
    discountFilter !== "All" ||
    customColor ||
    customDiscount;

  return (
    <main className="min-h-screen bg-[#F8F9FB] text-[#172033]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#172033]">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FF6A00]/20 blur-3xl" />

        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-[#18B7E8]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1600px] px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF6A00] sm:text-sm">
            Velora Collection
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Shop Everything

            <span className="text-[#FF6A00]">
              {" "}You Love.
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-6 text-gray-300 sm:text-lg">
            Discover fashion, beauty, jewellery, watches and
            everyday essentials — all in one place.
          </p>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-[1600px] px-3 py-3 sm:px-8 lg:px-12">

          <div className="flex gap-2 overflow-x-auto pb-1">

            {categories.map((item) => (

              <button
                key={item}
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

      {/* SHOP */}

      <section className="mx-auto max-w-[1600px] px-3 py-5 sm:px-8 sm:py-8 lg:px-12">

        {/* SEARCH / SORT */}

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
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleProducts(12);
              }}
              placeholder={
                category === "All"
                  ? "Search all products..."
                  : `Search in ${category}...`
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-base outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/10"
            />

          </div>

          <div className="flex gap-2">

            <button
              onClick={openMobileFilters}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold lg:hidden"
            >
              ☰ Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#FF6A00] sm:min-w-[190px]"
            >
              <option>Featured</option>
              <option>Newest</option>
              <option>Top Rated</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
              <option>Highest Discount</option>
            </select>

          </div>

        </div>

        {/* RESULT */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-extrabold sm:text-2xl">
              {category === "All"
                ? "All Products"
                : category}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                visibleProducts,
                filteredProducts.length
              )}{" "}
              of {filteredProducts.length} products
            </p>

          </div>

          {hasFilters && (

            <button
              onClick={clearFilters}
              className="rounded-lg bg-[#FF6A00] px-3 py-2 text-sm font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
            >
              Clear All
            </button>

          )}

        </div>

        <div className="flex gap-6">

          {/* DESKTOP FILTER */}

          <aside className="hidden w-56 shrink-0 lg:block xl:w-64">

            <div className="sticky top-5 rounded-2xl border border-gray-200 bg-white p-5">

              <div className="mb-6 flex items-center justify-between">

                <h3 className="text-base font-extrabold">
                  Filters
                </h3>

                {hasFilters && (

                  <button
                    onClick={clearFilters}
                    className="rounded-md bg-[#FF6A00] px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
                  >
                    Clear
                  </button>

                )}

              </div>

              {/* CATEGORY */}

              <FilterGroup title="Category">

                {categories.slice(1).map((item) => (

                  <FilterOption
                    key={item}
                    label={item}
                    active={category === item}
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
                    active={priceFilter === item}
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
                    onChange={(e) => {
                      setPriceFilter(
                        e.target.value || "All"
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
                    onChange={(e) => {
                      const value = e.target.value;

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
                      onChange={(e) => {
                        setCustomDiscount(
                          e.target.value
                        );
                        setDiscountFilter("Custom");
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

          {/* PRODUCTS */}

          <div className="min-w-0 flex-1">

            {filteredProducts.length === 0 ? (

              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center">

                <div className="mb-4 text-5xl">
                  🔍
                </div>

                <h3 className="text-xl font-extrabold">
                  Not Found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-gray-500">
                  No products match your current search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#FF8A3D] active:bg-[#FFB27A]"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">

                  {filteredProducts
                    .slice(0, visibleProducts)
                    .map((product) => {

                      const isWishlisted =
                        wishlist.includes(product.id);

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
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                              />

                            </Link>

                            {/* BADGE FROM PRODUCTS DATA ONLY */}

                            {product.badge && (

                              <span className="absolute left-2 top-2 rounded-md bg-[#FF6A00] px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                                {product.badge}
                              </span>

                            )}

                            {/* DISCOUNT FROM PRODUCTS DATA */}

                            {product.discount > 0 && (

                              <span className="absolute right-2 top-2 rounded-md bg-[#172033] px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                                -{product.discount}%
                              </span>

                            )}

                            <button
                              onClick={() =>
                                toggleWishlist(
                                  product.id
                                )
                              }
                              aria-label="Wishlist"
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

                          </div>

                          {/* INFO */}

                          <div className="p-2.5 sm:p-3.5">

                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#18B7E8] sm:text-xs">
                              {product.category}
                            </p>

                            <Link href={product.href}>

                              <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-[#172033] transition hover:text-[#FF6A00] sm:text-base">
                                {product.name}
                              </h3>

                            </Link>

                            {/* RATING */}

                            <div className="mt-1 flex items-center gap-1">

                              <span className="text-xs tracking-[-1px] text-[#F59E0B] sm:text-sm">
                                ★★★★★
                              </span>

                              <span className="text-[10px] text-gray-500 sm:text-xs">
                                {product.rating} (
                                {product.reviews})
                              </span>

                            </div>

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

                            {product.colors?.length > 0 && (

                              <div className="mt-2 flex items-center gap-1">

                                {product.colors
                                  .slice(0, 4)
                                  .map(
                                    (
                                      color,
                                      index
                                    ) => (

                                      <ColorDot
                                        key={`${color}-${index}`}
                                        color={color}
                                      />

                                    )
                                  )}

                              </div>

                            )}

                            {/* SIZE / VARIANT */}

                            {product.sizes?.length > 0 ? (

                              <div className="mt-2 flex items-center gap-1 overflow-hidden">

                                <span className="text-[10px] text-gray-400 sm:text-xs">
                                  Sizes:
                                </span>

                                {product.sizes
                                  .slice(0, 4)
                                  .map(
                                    (size) => (

                                      <span
                                        key={size}
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
                                  {product.variantType}
                                </span>

                              </div>

                            ) : null}

                            {/* BUTTON */}

                            <Link
                              href={product.href}
                              className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#FF6A00] px-2 py-2.5 text-xs font-bold text-white transition hover:bg-[#eca06a] sm:text-sm"
                            >
                              View Product
                            </Link>

                          </div>

                        </article>

                      );

                    })}

                </div>

                {visibleProducts <
                  filteredProducts.length && (

                  <div className="mt-8 flex justify-center">

                    <button
                      onClick={() =>
                        setVisibleProducts(
                          (prev) => prev + 8
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

      {/* MOBILE FILTER */}

      {showFilters && (

        <div className="fixed inset-0 z-50 lg:hidden">

          <button
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close filters"
          />

          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">

            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">

              <div>

                <h3 className="text-xl font-extrabold">
                  Filters
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Refine your products
                </p>

              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl"
              >
                ×
              </button>

            </div>

            {/* CATEGORY */}

            <FilterGroup title="Category">

              {categories.slice(1).map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  active={mobileCategory === item}
                  onClick={() => {
                    setMobileCategory(item);
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
                    mobilePriceFilter === item
                  }
                  onClick={() => {
                    setMobilePriceFilter(item);
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
                    ].includes(mobilePriceFilter)
                      ? mobilePriceFilter
                      : ""
                  }
                  onChange={(e) => {
                    setMobilePriceFilter(
                      e.target.value || "All"
                    );
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
                  mobileColorFilter === "All" &&
                  mobileCustomColor === ""
                }
                onClick={() => {
                  setMobileColorFilter("All");
                  setMobileCustomColor("");
                }}
              />

              {allColors.map((item) => (

                <FilterOption
                  key={item}
                  label={item}
                  active={
                    mobileColorFilter === item &&
                    mobileCustomColor === ""
                  }
                  onClick={() => {
                    setMobileColorFilter(item);
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
                  onChange={(e) => {
                    const value = e.target.value;

                    setMobileCustomColor(value);

                    if (value.trim()) {
                      setMobileColorFilter("Custom");
                    } else {
                      setMobileColorFilter("All");
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
                    mobileDiscountFilter === item &&
                    mobileCustomDiscount === ""
                  }
                  onClick={() => {
                    setMobileDiscountFilter(item);
                    setMobileCustomDiscount("");
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
                    value={mobileCustomDiscount}
                    onChange={(e) => {
                      setMobileCustomDiscount(
                        e.target.value
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

            {/* DONE / CLEAR */}

            <div className="sticky bottom-0 mt-5 flex gap-2 border-t border-gray-200 bg-white pt-4">

              <button
                onClick={clearMobileFilters}
                className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold text-[#172033] transition hover:bg-gray-200"
              >
                Clear
              </button>

              <button
                onClick={applyMobileFilters}
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

/* FILTER GROUP */

function FilterGroup({ title, children }) {
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

/* FILTER OPTION */

function FilterOption({
  label,
  active,
  onClick,
}) {
  return (
    <button
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

/* COLOR DOT */

function ColorDot({ color }) {
  const colors = {
    Black: "#111827",
    White: "#FFFFFF",
    Navy: "#172033",
    Gray: "#9CA3AF",
    "Light Gray": "#D1D5DB",
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
    "Dark Gray": "#374151",
  };

  return (
    <span
      title={color}
      className="h-3 w-3 rounded-full border border-gray-200"
      style={{
        backgroundColor:
          colors[color] || "#D1D5DB",
      }}
    />
  );
}