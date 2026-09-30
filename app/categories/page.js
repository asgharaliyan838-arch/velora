"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import products from "../data/products";

/*
========================================
CATEGORY CONFIG
========================================
*/

const categoryConfig = [
  {
    name: "Men",
    icon: "👔",
    description: "Men's fashion and everyday essentials",
    match: ["men", "men's", "mens", "male"],
    subcategories: [
      { name: "Men's Clothes" },
      { name: "Shalwar Kameez" },
      { name: "T-Shirts" },
      { name: "Shirts" },
      { name: "Pants & Trousers" },
      { name: "Kurtas" },
      { name: "Jeans" },
      { name: "Jackets & Coats" },
      { name: "Unstitched Fabric" },
      { name: "Sleepwear" },
      { name: "Sportswear" },
    ],
  },

  {
    name: "Women",
    icon: "👗",
    description: "Women's fashion, beauty and essentials",
    match: ["women", "women's", "womens", "female"],
    subcategories: [
      { name: "Women's Clothes" },
      { name: "Shalwar Kameez" },
      { name: "Dresses" },
      { name: "Abayas & Hijabs" },
      { name: "Kurtas" },
      { name: "Unstitched Fabric" },
      { name: "Sleepwear" },
    ],
  },

  {
    name: "Kids",
    icon: "🧸",
    description: "Cute and comfortable products for kids",
    match: ["kids", "kid", "children", "child"],
    subcategories: [
      { name: "Kids' Clothes" },
      { name: "Kids' Shoes" },
      { name: "T-Shirts" },
      { name: "Dresses" },
      { name: "Sportswear" },
    ],
  },

  {
    name: "Beauty & Skincare",
    icon: "💄",
    description: "Beauty, makeup and skincare essentials",
    match: [
      "beauty",
      "skincare",
      "skin care",
      "makeup",
      "cosmetics",
    ],
    subcategories: [
      { name: "Makeup" },
      { name: "Face Wash" },
      { name: "Skincare" },
      { name: "Lipstick" },
      { name: "Foundation" },
      { name: "Beauty Kits" },
    ],
  },

  {
    name: "Jewellery",
    icon: "💎",
    description: "Elegant jewellery for every occasion",
    match: ["jewellery", "jewelry"],
    subcategories: [
      { name: "Jewellery" },
      { name: "Bangles" },
      { name: "Bracelets" },
      { name: "Rings" },
      { name: "Necklaces" },
      { name: "Earrings" },
    ],
  },

  {
    name: "Watches",
    icon: "⌚",
    description: "Classic and modern watches",
    match: ["watches", "watch"],
    subcategories: [
      { name: "Men's Watches" },
      { name: "Women's Watches" },
      { name: "Classic Watches" },
      { name: "Smart Watches" },
    ],
  },

  {
    name: "Perfumes",
    icon: "🌸",
    description: "Fragrances and perfumes",
    match: [
      "perfumes",
      "perfume",
      "fragrance",
      "fragrances",
      "body spray",
      "body sprays",
    ],
    subcategories: [
      { name: "Men's Perfumes" },
      { name: "Women's Perfumes" },
      { name: "Perfumes" },
      { name: "Body Sprays" },
    ],
  },

  {
    name: "Bags & Wallets",
    icon: "👜",
    description: "Bags, wallets and everyday carry essentials",
    match: [
      "bags",
      "bag",
      "wallets",
      "wallet",
      "handbags",
      "handbag",
    ],
    subcategories: [
      { name: "Handbags" },
      { name: "Backpacks" },
      { name: "Wallets" },
      { name: "Clutches" },
      { name: "Crossbody Bags" },
    ],
  },

  {
    name: "Shoes",
    icon: "👟",
    description: "Shoes for men, women and kids",
    match: [
      "shoes",
      "shoe",
      "sneakers",
      "sneaker",
      "sandals",
      "sandal",
    ],
    subcategories: [
      { name: "Men's Shoes" },
      { name: "Women's Shoes" },
      { name: "Kids' Shoes" },
      { name: "Sneakers" },
      { name: "Sandals" },
    ],
  },

  {
    name: "Accessories",
    icon: "🕶️",
    description: "Complete your look with stylish accessories",
    match: [
      "accessories",
      "accessory",
      "sunglasses",
      "belts",
      "caps",
      "hats",
    ],
    subcategories: [
      { name: "Sunglasses" },
      { name: "Belts" },
      { name: "Caps & Hats" },
      { name: "Accessories" },
    ],
  },
];

/*
========================================
HELPERS
========================================
*/

function getProductId(product) {
  return String(
    product?.id ??
      product?._id ??
      product?.slug ??
      product?.name
  );
}

function formatPrice(price) {
  return `Rs. ${Number(price || 0).toLocaleString()}`;
}

function getImage(product) {
  if (product?.image) {
    return product.image;
  }

  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {
    return product.images[0];
  }

  return "/placeholder-product.png";
}

function getColorCode(color) {
  const value = String(color || "").toLowerCase();

  const colors = {
    black: "#111827",
    white: "#ffffff",
    red: "#ef4444",
    blue: "#3b82f6",
    navy: "#1e3a8a",
    green: "#22c55e",
    yellow: "#eab308",
    orange: "#f97316",
    pink: "#ec4899",
    purple: "#a855f7",
    brown: "#92400e",
    beige: "#d6c6a5",
    cream: "#fff7d6",
    grey: "#9ca3af",
    gray: "#9ca3af",
    maroon: "#7f1d1d",
    golden: "#d4a72c",
    gold: "#d4a72c",
    silver: "#c0c0c0",
  };

  for (const key of Object.keys(colors)) {
    if (value.includes(key)) {
      return colors[key];
    }
  }

  return "#d1d5db";
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[-_/]/g, " ")
    .replace(/\s+/g, " ");
}

/*
========================================
CATEGORY MATCHING
========================================
*/

function matchesCategory(product, category) {
  const productCategory = normalizeText(
    product?.category
  );

  const productName = normalizeText(
    product?.name
  );

  const productType = normalizeText(
    product?.type
  );

  const productGender = normalizeText(
    product?.gender
  );

  const combined = [
    productCategory,
    productName,
    productType,
    productGender,
  ]
    .filter(Boolean)
    .join(" ");

  if (category.name === "Men") {
    return (
      productCategory.includes("men") ||
      productGender === "men" ||
      productGender === "male" ||
      category.match.some((word) =>
        combined.includes(
          normalizeText(word)
        )
      )
    );
  }

  if (category.name === "Women") {
    return (
      productCategory.includes("women") ||
      productGender === "women" ||
      productGender === "female" ||
      category.match.some((word) =>
        combined.includes(
          normalizeText(word)
        )
      )
    );
  }

  if (category.name === "Kids") {
    return category.match.some((word) =>
      combined.includes(
        normalizeText(word)
      )
    );
  }

  return category.match.some((word) =>
    productCategory.includes(
      normalizeText(word)
    )
  );
}

/*
========================================
SUBCATEGORY MATCHING
========================================
*/

function matchesSubcategory(
  product,
  subcategory
) {
  if (!subcategory) {
    return true;
  }

  const target = normalizeText(
    subcategory
  );

  const category = normalizeText(
    product?.category
  );

  const name = normalizeText(
    product?.name
  );

  const type = normalizeText(
    product?.type
  );

  const tags = Array.isArray(product?.tags)
    ? product.tags
        .map((tag) =>
          normalizeText(tag)
        )
        .join(" ")
    : "";

  const searchable = [
    category,
    name,
    type,
    tags,
  ]
    .filter(Boolean)
    .join(" ");

  if (category === target) {
    return true;
  }

  if (type === target) {
    return true;
  }

  const aliases = {
    "mens clothes": [
      "men clothes",
      "mens clothing",
      "men clothing",
    ],

    "womens clothes": [
      "women clothes",
      "womens clothing",
      "women clothing",
    ],

    "kids clothes": [
      "kid clothes",
      "kids clothing",
      "children clothes",
      "children clothing",
    ],

    "shalwar kameez": [
      "shalwar kameez",
      "shalwar",
      "kameez",
    ],

    "pants and trousers": [
      "pants",
      "trousers",
    ],

    "jackets and coats": [
      "jacket",
      "jackets",
      "coat",
      "coats",
    ],

    "abayas and hijabs": [
      "abaya",
      "abayas",
      "hijab",
      "hijabs",
    ],

    "caps and hats": [
      "cap",
      "caps",
      "hat",
      "hats",
    ],

    "crossbody bags": [
      "crossbody",
    ],

    "body sprays": [
      "body spray",
      "body sprays",
    ],

    "beauty kits": [
      "beauty kit",
      "beauty kits",
    ],

    "face wash": [
      "face wash",
      "facewash",
    ],
  };

  const possibleMatches =
    aliases[target] || [target];

  return possibleMatches.some((word) =>
    searchable.includes(
      normalizeText(word)
    )
  );
}

/*
========================================
PRODUCT CARD
========================================
*/

function ProductCard({ product }) {
  const [wishlist, setWishlist] =
    useState(false);

  const productId =
    getProductId(product);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "veloraWishlist"
        );

      if (!saved) return;

      const parsed =
        JSON.parse(saved);

      if (!Array.isArray(parsed)) return;

      const exists = parsed.some(
        (item) => {
          const itemId =
            typeof item === "object"
              ? getProductId(item)
              : String(item);

          return itemId === productId;
        }
      );

      setWishlist(exists);
    } catch (error) {
      console.error(
        "Wishlist load error:",
        error
      );
    }
  }, [productId]);

  const toggleWishlist = () => {
    try {
      const saved =
        localStorage.getItem(
          "veloraWishlist"
        );

      let current = [];

      if (saved) {
        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {
          current = parsed;
        }
      }

      const exists = current.some(
        (item) => {
          const itemId =
            typeof item === "object"
              ? getProductId(item)
              : String(item);

          return itemId === productId;
        }
      );

      let nextWishlist;

      if (exists) {
        nextWishlist =
          current.filter((item) => {
            const itemId =
              typeof item === "object"
                ? getProductId(item)
                : String(item);

            return itemId !== productId;
          });

        setWishlist(false);
      } else {
        nextWishlist = [
          ...current,
          productId,
        ];

        setWishlist(true);
      }

      localStorage.setItem(
        "veloraWishlist",
        JSON.stringify(
          nextWishlist
        )
      );
    } catch (error) {
      console.error(
        "Wishlist save error:",
        error
      );
    }
  };

  const image =
    getImage(product);

  const href =
    product?.href ||
    `/product/${
      product?.slug ??
      product?.id
    }`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}

      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

        <Link
          href={href}
          className="block h-full w-full"
        >
          <Image
            src={image}
            alt={
              product?.name ||
              "Velora product"
            }
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* BADGE */}

        {product?.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-[#FF6A00] px-2 py-1 text-[9px] font-black text-white sm:text-[10px]">
            {product.badge}
          </span>
        )}

        {/* DISCOUNT */}

        {product?.discount > 0 && (
          <span className="absolute right-2 top-2 rounded-md bg-[#172033] px-2 py-1 text-[9px] font-black text-white sm:text-[10px]">
            -{product.discount}%
          </span>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={
            wishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-lg shadow-md transition hover:scale-110"
        >
          <span
            className={
              wishlist
                ? "text-red-500"
                : "text-gray-500"
            }
          >
            {wishlist
              ? "♥"
              : "♡"}
          </span>
        </button>

        {/* QUICK VIEW */}

        <Link
          href={href}
          className="absolute bottom-2 left-2 hidden rounded-md bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-[#172033] shadow transition hover:bg-[#FF6A00] hover:text-white sm:block"
        >
          Quick View
        </Link>

      </div>

      {/* INFO */}

      <div className="p-2.5 sm:p-3.5">

        <Link href={href}>
          <h3 className="line-clamp-2 min-h-[34px] text-xs font-bold leading-4 text-[#172033] transition hover:text-[#FF6A00] sm:min-h-[40px] sm:text-sm sm:leading-5">
            {product?.name}
          </h3>
        </Link>

        {/* CATEGORY */}

        {product?.category && (
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-wide text-gray-400 sm:text-[9px]">
            {product.category}
          </p>
        )}

        {/* PRICE */}

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">

          <span className="text-sm font-extrabold text-[#FF6A00] sm:text-base">
            {formatPrice(
              product?.price
            )}
          </span>

          {product?.oldPrice && (
            <span className="text-[9px] text-gray-400 line-through sm:text-[10px]">
              {formatPrice(
                product.oldPrice
              )}
            </span>
          )}

        </div>

        {/* COLORS */}

        {product?.colors?.length >
          0 && (
          <div className="mt-2 flex items-center gap-1 overflow-hidden">

            <span className="shrink-0 text-[8px] text-gray-400 sm:text-[9px]">
              Colors:
            </span>

            {product.colors
              .slice(0, 4)
              .map(
                (color, index) => (
                  <span
                    key={`${color}-${index}`}
                    title={color}
                    className="h-3 w-3 shrink-0 rounded-full border border-gray-200 sm:h-3.5 sm:w-3.5"
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

        {/* SIZE */}

        {product?.sizes?.length >
        0 ? (
          <div className="mt-2 flex items-center gap-1 overflow-hidden">

            <span className="shrink-0 text-[8px] text-gray-400 sm:text-[9px]">
              Sizes:
            </span>

            {product.sizes
              .slice(0, 4)
              .map((size) => (
                <span
                  key={size}
                  className="rounded border border-gray-200 px-1 py-0.5 text-[8px] font-semibold text-gray-500 sm:px-1.5 sm:text-[9px]"
                >
                  {size}
                </span>
              ))}

          </div>
        ) : product?.variantType ? (
          <div className="mt-2 flex items-center gap-1">

            <span className="shrink-0 text-[8px] text-gray-400 sm:text-[9px]">
              Variant:
            </span>

            <span className="truncate rounded border border-gray-200 px-1.5 py-0.5 text-[8px] font-semibold text-gray-500 sm:text-[9px]">
              {product.variantType}
            </span>

          </div>
        ) : null}

        {/* VIEW PRODUCT */}

        <Link
          href={href}
          className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#172033] px-2 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#FF6A00] sm:text-xs"
        >
          View Product
        </Link>

      </div>
    </article>
  );
}

/*
========================================
FILTER OPTION
========================================
*/

function FilterOption({
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-orange-50 text-[#FF6A00]"
          : "text-slate-600 hover:bg-slate-50 hover:text-[#FF6A00]"
      }`}
    >
      {label}
    </button>
  );
}

/*
========================================
CATEGORY PAGE
========================================
*/

export default function CategoriesPage() {
  /*
  ========================================
  URL PARAMS
  ========================================
  */

  const searchParams =
    useSearchParams();

  const urlCategory =
    searchParams.get("category");

  const urlSubcategory =
    searchParams.get("subcategory");

  /*
  ========================================
  STATES
  ========================================
  */

  const [activeCategory, setActiveCategory] =
    useState("Men");

  const [activeSubcategory, setActiveSubcategory] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("Featured");

  const [visibleProducts, setVisibleProducts] =
    useState(12);

  const [mobileSubcategories, setMobileSubcategories] =
    useState(false);

  const [mobileFilters, setMobileFilters] =
    useState(false);

  const [priceFilter, setPriceFilter] =
    useState("All");

  const [discountFilter, setDiscountFilter] =
    useState("All");

  const [colorFilter, setColorFilter] =
    useState("All");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [customDiscount, setCustomDiscount] =
    useState("");

  const [colorSearch, setColorSearch] =
    useState("");

  /*
  ========================================
  SYNC URL WITH PAGE
  ========================================
  */

  useEffect(() => {
    if (urlCategory) {
      const matchingCategory =
        categoryConfig.find(
          (category) =>
            category.name ===
            urlCategory
        );

      if (matchingCategory) {
        setActiveCategory(
          matchingCategory.name
        );
      }
    }

    if (urlSubcategory) {
      setActiveSubcategory(
        urlSubcategory
      );
    } else {
      setActiveSubcategory("");
    }

    setSearch("");
    setSort("Featured");

    setPriceFilter("All");
    setDiscountFilter("All");
    setColorFilter("All");

    setMinPrice("");
    setMaxPrice("");
    setCustomDiscount("");
    setColorSearch("");

    setVisibleProducts(12);
  }, [
    urlCategory,
    urlSubcategory,
  ]);

  /*
  ========================================
  SELECTED CATEGORY
  ========================================
  */

  const selectedCategory =
    categoryConfig.find(
      (category) =>
        category.name ===
        activeCategory
    ) || categoryConfig[0];

  /*
  ========================================
  CATEGORY PRODUCTS
  ========================================
  */

  const categoryProducts = useMemo(() => {
    return products.filter((product) =>
      matchesCategory(
        product,
        selectedCategory
      )
    );
  }, [selectedCategory]);

  /*
  ========================================
  SUBCATEGORY PRODUCTS
  ========================================
  */

  const subcategoryProducts =
    useMemo(() => {
      if (!activeSubcategory) {
        return categoryProducts;
      }

      return categoryProducts.filter(
        (product) =>
          matchesSubcategory(
            product,
            activeSubcategory
          )
      );
    }, [
      categoryProducts,
      activeSubcategory,
    ]);

  /*
  ========================================
  AVAILABLE COLORS
  ========================================
  */

  const availableColors =
    useMemo(() => {
      const colors = [];

      subcategoryProducts.forEach(
        (product) => {
          if (
            Array.isArray(
              product?.colors
            )
          ) {
            product.colors.forEach(
              (color) => {
                const value =
                  String(
                    color
                  ).trim();

                if (
                  value &&
                  !colors.some(
                    (item) =>
                      item.toLowerCase() ===
                      value.toLowerCase()
                  )
                ) {
                  colors.push(value);
                }
              }
            );
          }
        }
      );

      return colors;
    }, [subcategoryProducts]);

  /*
  ========================================
  SEARCH COLORS
  ========================================
  */

  const searchedColors =
    useMemo(() => {
      const query =
        colorSearch
          .toLowerCase()
          .trim();

      if (!query) {
        return availableColors;
      }

      return availableColors.filter(
        (color) =>
          color
            .toLowerCase()
            .includes(query)
      );
    }, [
      availableColors,
      colorSearch,
    ]);

  /*
  ========================================
  FILTER + SORT
  ========================================
  */

  const filteredProducts =
    useMemo(() => {
      let result = [
        ...subcategoryProducts,
      ];

      /*
      SEARCH
      */

      if (search.trim()) {
        const query =
          search
            .toLowerCase()
            .trim();

        result = result.filter(
          (product) => {
            const searchable = [
              product?.name,
              product?.category,
              product?.badge,
              product?.variantType,
              ...(product?.colors ||
                []),
              ...(product?.sizes ||
                []),
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchable.includes(
              query
            );
          }
        );
      }

      /*
      QUICK PRICE FILTER
      */

      if (
        priceFilter !== "All"
      ) {
        result = result.filter(
          (product) => {
            const price =
              Number(
                product?.price ||
                  0
              );

            if (
              priceFilter ===
              "Under 1000"
            ) {
              return price < 1000;
            }

            if (
              priceFilter ===
              "1000 - 2500"
            ) {
              return (
                price >= 1000 &&
                price <= 2500
              );
            }

            if (
              priceFilter ===
              "2500 - 5000"
            ) {
              return (
                price > 2500 &&
                price <= 5000
              );
            }

            if (
              priceFilter ===
              "5000+"
            ) {
              return price > 5000;
            }

            return true;
          }
        );
      }

      /*
      CUSTOM PRICE SEARCH
      */

      const minimum =
        minPrice === ""
          ? null
          : Number(minPrice);

      const maximum =
        maxPrice === ""
          ? null
          : Number(maxPrice);

      if (
        minimum !== null &&
        !Number.isNaN(minimum)
      ) {
        result = result.filter(
          (product) =>
            Number(
              product?.price || 0
            ) >= minimum
        );
      }

      if (
        maximum !== null &&
        !Number.isNaN(maximum)
      ) {
        result = result.filter(
          (product) =>
            Number(
              product?.price || 0
            ) <= maximum
        );
      }

      /*
      DISCOUNT FILTER
      */

      if (
        discountFilter !== "All"
      ) {
        result = result.filter(
          (product) => {
            const discount =
              Number(
                product?.discount ||
                  0
              );

            if (
              discountFilter ===
              "Any Discount"
            ) {
              return discount > 0;
            }

            if (
              discountFilter ===
              "10%+"
            ) {
              return discount >= 10;
            }

            if (
              discountFilter ===
              "20%+"
            ) {
              return discount >= 20;
            }

            if (
              discountFilter ===
              "30%+"
            ) {
              return discount >= 30;
            }

            return true;
          }
        );
      }

      /*
      CUSTOM DISCOUNT SEARCH
      */

      if (
        customDiscount !== ""
      ) {
        const requiredDiscount =
          Number(
            customDiscount
          );

        if (
          !Number.isNaN(
            requiredDiscount
          )
        ) {
          result = result.filter(
            (product) =>
              Number(
                product?.discount ||
                  0
              ) >=
              requiredDiscount
          );
        }
      }

      /*
      COLOUR FILTER
      */

      if (
        colorFilter !== "All"
      ) {
        result = result.filter(
          (product) => {
            if (
              !Array.isArray(
                product?.colors
              )
            ) {
              return false;
            }

            return product.colors.some(
              (color) =>
                normalizeText(
                  color
                ) ===
                normalizeText(
                  colorFilter
                )
            );
          }
        );
      }

      /*
      SORT
      */

      if (
        sort === "Price Low"
      ) {
        result.sort(
          (a, b) =>
            Number(
              a?.price || 0
            ) -
            Number(
              b?.price || 0
            )
        );
      }

      if (
        sort === "Price High"
      ) {
        result.sort(
          (a, b) =>
            Number(
              b?.price || 0
            ) -
            Number(
              a?.price || 0
            )
        );
      }

      if (
        sort === "Discount"
      ) {
        result.sort(
          (a, b) =>
            Number(
              b?.discount || 0
            ) -
            Number(
              a?.discount || 0
            )
        );
      }

      if (sort === "Newest") {
        result.sort((a, b) => {
          if (
            a?.createdAt &&
            b?.createdAt
          ) {
            return (
              new Date(
                b.createdAt
              ) -
              new Date(
                a.createdAt
              )
            );
          }

          return (
            Number(
              b?.id || 0
            ) -
            Number(
              a?.id || 0
            )
          );
        });
      }

      return result;
    }, [
      subcategoryProducts,
      search,
      sort,
      priceFilter,
      discountFilter,
      colorFilter,
      minPrice,
      maxPrice,
      customDiscount,
    ]);

  /*
  ========================================
  RESET VISIBLE PRODUCTS
  ========================================
  */

  useEffect(() => {
    setVisibleProducts(12);
  }, [
    activeCategory,
    activeSubcategory,
    search,
    sort,
    priceFilter,
    discountFilter,
    colorFilter,
    minPrice,
    maxPrice,
    customDiscount,
  ]);

  /*
  ========================================
  CHANGE CATEGORY
  ========================================
  */

  const changeCategory = (
    categoryName
  ) => {
    setActiveCategory(
      categoryName
    );

    setActiveSubcategory("");
    setSearch("");
    setSort("Featured");

    setPriceFilter("All");
    setDiscountFilter("All");
    setColorFilter("All");

    setMinPrice("");
    setMaxPrice("");
    setCustomDiscount("");
    setColorSearch("");

    setVisibleProducts(12);
    setMobileSubcategories(false);
    setMobileFilters(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  ========================================
  CHANGE SUBCATEGORY
  ========================================
  */

  const changeSubcategory = (
    subcategoryName
  ) => {
    setActiveSubcategory(
      subcategoryName
    );

    setSearch("");
    setSort("Featured");

    setPriceFilter("All");
    setDiscountFilter("All");
    setColorFilter("All");

    setMinPrice("");
    setMaxPrice("");
    setCustomDiscount("");
    setColorSearch("");

    setVisibleProducts(12);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  ========================================
  CLEAR ALL FILTERS
  ========================================
  */

  const clearFilters = () => {
    setActiveSubcategory("");
    setSearch("");
    setSort("Featured");

    setPriceFilter("All");
    setDiscountFilter("All");
    setColorFilter("All");

    setMinPrice("");
    setMaxPrice("");
    setCustomDiscount("");
    setColorSearch("");
  };

  /*
  ========================================
  SHOWING PRODUCTS
  ========================================
  */

  const displayedProducts =
    filteredProducts.slice(
      0,
      visibleProducts
    );

  /*
  ========================================
  PAGE
  ========================================
  */

  return (
    <main className="min-h-screen bg-[#f7f8fa]">

      {/* =================================
          HERO
      ================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff4e9] via-[#f8fafc] to-[#eaf8ff]">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

          <div className="max-w-3xl">

            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FF6A00] sm:text-xs">
              Velora Categories
            </span>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-[#172033] sm:text-5xl lg:text-6xl">
              Shop by{" "}
              <span className="text-[#FF6A00]">
                Category
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
              Explore everything on
              Velora, organized so you
              can find the products you
              want faster.
            </p>

            {/* SEARCH */}

            <div className="mt-6 flex max-w-2xl overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-r from-gray-50 via-white to-orange-50 shadow-sm">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder={`Search ${selectedCategory.name.toLowerCase()} products...`}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                className="shrink-0 bg-[#FF6A00] px-5 text-xs font-bold text-white transition hover:bg-[#e85f00] sm:px-7 sm:text-sm"
              >
                Search
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =================================
          CATEGORY SELECTOR
      ================================= */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

            {categoryConfig.map(
              (category) => {
                const active =
                  category.name ===
                  activeCategory;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      changeCategory(
                        category.name
                      )
                    }
                    className={`flex min-w-fit items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition sm:px-4 sm:py-3 sm:text-sm ${
                      active
                        ? "border-[#FF6A00] bg-[#FF6A00] text-white shadow-md"
                        : "border-gray-200 bg-white text-[#172033] hover:border-orange-200 hover:bg-orange-50 hover:text-[#FF6A00]"
                    }`}
                  >
                    <span className="text-base sm:text-lg">
                      {category.icon}
                    </span>

                    {category.name}
                  </button>
                );
              }
            )}

          </div>
        </div>
      </section>

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <section className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

        {/* CATEGORY HEADER */}

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                {selectedCategory.icon}
              </div>

              <div>

                <h2 className="text-xl font-black text-[#172033] sm:text-2xl">

                  {selectedCategory.name}

                  {activeSubcategory && (
                    <>
                      {" "}
                      /{" "}
                      <span className="text-[#FF6A00]">
                        {activeSubcategory}
                      </span>
                    </>
                  )}

                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {
                    selectedCategory.description
                  }
                </p>

                <p className="mt-1.5 text-[10px] font-semibold text-gray-400 sm:text-xs">
                  {
                    filteredProducts.length
                  }{" "}
                  {filteredProducts.length ===
                  1
                    ? "product"
                    : "products"}{" "}
                  available
                </p>

              </div>
            </div>

            {/* SORT */}

            <div className="flex items-center gap-2">

              <span className="hidden text-xs font-semibold text-gray-400 sm:block">
                Sort by
              </span>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-[#172033] outline-none focus:border-[#FF6A00] sm:w-auto"
              >

                <option value="Featured">
                  Featured
                </option>

                <option value="Newest">
                  Newest
                </option>

                <option value="Price Low">
                  Price Low
                </option>

                <option value="Price High">
                  Price High
                </option>

                <option value="Discount">
                  Discount
                </option>

              </select>

            </div>

          </div>

          {/* =================================
              SUBCATEGORIES
          ================================= */}

          <div className="mt-5 border-t border-gray-100 pt-5">

            <button
              type="button"
              onClick={() =>
                setMobileSubcategories(
                  (previous) =>
                    !previous
                )
              }
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-3 text-left text-xs font-bold text-[#172033] lg:hidden"
            >

              <span>
                Browse Subcategories
              </span>

              <span>
                {mobileSubcategories
                  ? "▲"
                  : "▼"}
              </span>

            </button>

            <div
              className={`${
                mobileSubcategories
                  ? "block"
                  : "hidden"
              } mt-3 lg:mt-0 lg:block`}
            >

              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={() =>
                    changeSubcategory(
                      ""
                    )
                  }
                  className={`rounded-lg border px-3 py-2 text-[10px] font-bold transition sm:px-3.5 sm:text-xs ${
                    activeSubcategory ===
                    ""
                      ? "border-[#FF6A00] bg-[#FF6A00] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#FF6A00] hover:bg-orange-50 hover:text-[#FF6A00]"
                  }`}
                >
                  All Products
                </button>

                {selectedCategory.subcategories.map(
                  (subcategory) => (
                    <button
                      key={
                        subcategory.name
                      }
                      type="button"
                      onClick={() =>
                        changeSubcategory(
                          subcategory.name
                        )
                      }
                      className={`rounded-lg border px-3 py-2 text-[10px] font-bold transition sm:px-3.5 sm:text-xs ${
                        activeSubcategory ===
                        subcategory.name
                          ? "border-[#FF6A00] bg-[#FF6A00] text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#FF6A00] hover:bg-orange-50 hover:text-[#FF6A00]"
                      }`}
                    >
                      {
                        subcategory.name
                      }
                    </button>
                  )
                )}

              </div>
            </div>
          </div>

        </div>

        {/* =================================
            MOBILE FILTER
        ================================= */}

        <div className="mt-5 lg:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileFilters(
                (previous) =>
                  !previous
              )
            }
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#172033] shadow-sm"
          >

            <span>
              Filter Products
            </span>

            <span className="text-[#FF6A00]">
              {mobileFilters
                ? "▲"
                : "▼"}
            </span>

          </button>

        </div>

        {/* =================================
            PRODUCTS + SIDEBAR
        ================================= */}

        <div className="mt-5 flex items-start gap-5">

          {/* =================================
              FILTER SIDEBAR
          ================================= */}

          <aside
            className={`${
              mobileFilters
                ? "block"
                : "hidden"
            } w-full shrink-0 lg:sticky lg:top-24 lg:block lg:w-60 xl:w-64`}
          >

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

              {/* FILTER HEADER */}

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">

                <h3 className="text-lg font-black text-[#172033]">
                  Filters
                </h3>

                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="text-sm font-bold text-[#FF6A00] transition hover:text-[#e85f00] hover:underline"
                >
                  Clear All
                </button>

              </div>

              {/* =================================
                  PRICE
              ================================= */}

              <div className="border-b border-gray-100 py-4">

                <h4 className="mb-2.5 text-sm font-black uppercase tracking-wide text-[#172033]">
                  Price
                </h4>

                <div className="mb-3 grid grid-cols-2 gap-2">

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(
                        e.target.value
                      )
                    }
                    placeholder="Min Rs."
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-2.5 text-xs font-semibold text-[#172033] outline-none focus:border-[#FF6A00]"
                  />

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(
                        e.target.value
                      )
                    }
                    placeholder="Max Rs."
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-2.5 text-xs font-semibold text-[#172033] outline-none focus:border-[#FF6A00]"
                  />

                </div>

                <div className="space-y-1">

                  <FilterOption
                    label="All Prices"
                    active={
                      priceFilter ===
                      "All"
                    }
                    onClick={() =>
                      setPriceFilter(
                        "All"
                      )
                    }
                  />

                  <FilterOption
                    label="Under Rs. 1,000"
                    active={
                      priceFilter ===
                      "Under 1000"
                    }
                    onClick={() =>
                      setPriceFilter(
                        "Under 1000"
                      )
                    }
                  />

                  <FilterOption
                    label="Rs. 1,000 - 2,500"
                    active={
                      priceFilter ===
                      "1000 - 2500"
                    }
                    onClick={() =>
                      setPriceFilter(
                        "1000 - 2500"
                      )
                    }
                  />

                  <FilterOption
                    label="Rs. 2,500 - 5,000"
                    active={
                      priceFilter ===
                      "2500 - 5000"
                    }
                    onClick={() =>
                      setPriceFilter(
                        "2500 - 5000"
                      )
                    }
                  />

                  <FilterOption
                    label="Rs. 5,000+"
                    active={
                      priceFilter ===
                      "5000+"
                    }
                    onClick={() =>
                      setPriceFilter(
                        "5000+"
                      )
                    }
                  />

                </div>
              </div>

              {/* =================================
                  DISCOUNT
              ================================= */}

              <div className="border-b border-gray-100 py-4">

                <h4 className="mb-2.5 text-sm font-black uppercase tracking-wide text-[#172033]">
                  Discount
                </h4>

                <div className="mb-3 flex gap-2">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      customDiscount
                    }
                    onChange={(e) =>
                      setCustomDiscount(
                        e.target.value
                      )
                    }
                    placeholder="Search discount %"
                    className="min-w-0 flex-1 rounded-lg border border-gray-200 px-2.5 py-2.5 text-xs font-semibold text-[#172033] outline-none focus:border-[#FF6A00]"
                  />

                  <span className="flex items-center rounded-lg bg-orange-50 px-2.5 text-sm font-black text-[#FF6A00]">
                    %
                  </span>

                </div>

                <div className="grid grid-cols-3 gap-1.5">

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter(
                        "All"
                      )
                    }
                    className={`rounded-lg border px-1 py-2.5 text-xs font-bold transition ${
                      discountFilter ===
                      "All"
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    All
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter(
                        "Any Discount"
                      )
                    }
                    className={`rounded-lg border px-1 py-2.5 text-xs font-bold transition ${
                      discountFilter ===
                      "Any Discount"
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    Sale
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter(
                        "10%+"
                      )
                    }
                    className={`rounded-lg border px-1 py-2.5 text-xs font-bold transition ${
                      discountFilter ===
                      "10%+"
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    10%+
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter(
                        "20%+"
                      )
                    }
                    className={`rounded-lg border px-1 py-2.5 text-xs font-bold transition ${
                      discountFilter ===
                      "20%+"
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    20%+
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter(
                        "30%+"
                      )
                    }
                    className={`rounded-lg border px-1 py-2.5 text-xs font-bold transition ${
                      discountFilter ===
                      "30%+"
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                    }`}
                  >
                    30%+
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDiscountFilter(
                        "All"
                      );
                      setCustomDiscount(
                        "50"
                      );
                    }}
                    className="rounded-lg border border-gray-200 px-1 py-2.5 text-xs font-bold text-gray-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#FF6A00]"
                  >
                    50%+
                  </button>

                </div>

              </div>

              {/* =================================
                  COLOUR
              ================================= */}

              <div className="py-4">

                <h4 className="mb-2.5 text-sm font-black uppercase tracking-wide text-[#172033]">
                  Colour
                </h4>

                <div className="mb-3">

                  <input
                    type="text"
                    value={colorSearch}
                    onChange={(e) =>
                      setColorSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search colour..."
                    className="w-full rounded-lg border border-gray-200 px-2.5 py-2.5 text-xs font-semibold text-[#172033] outline-none focus:border-[#FF6A00]"
                  />

                </div>

                <div className="grid grid-cols-2 gap-1.5">

                  <button
                    type="button"
                    onClick={() =>
                      setColorFilter(
                        "All"
                      )
                    }
                    className={`flex items-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-bold transition ${
                      colorFilter ===
                      "All"
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                        : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                    }`}
                  >

                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-[8px]">
                      ✓
                    </span>

                    <span className="truncate">
                      All
                    </span>

                  </button>

                  {searchedColors.map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          setColorFilter(
                            color
                          )
                        }
                        className={`flex items-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-bold transition ${
                          colorFilter ===
                          color
                            ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                            : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                        }`}
                      >

                        <span
                          className="h-4 w-4 shrink-0 rounded-full border border-gray-200"
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
                    )
                  )}

                </div>

                {searchedColors.length ===
                  0 && (
                  <p className="mt-2 px-1 text-xs text-gray-400">
                    No matching colours
                    found.
                  </p>
                )}

              </div>

            </div>
          </aside>

          {/* =================================
              PRODUCTS AREA
          ================================= */}

          <div className="min-w-0 flex-1">

            {/* ACTIVE FILTERS */}

            {(activeSubcategory ||
              priceFilter !== "All" ||
              discountFilter !== "All" ||
              colorFilter !== "All" ||
              minPrice !== "" ||
              maxPrice !== "" ||
              customDiscount !== "") && (
              <div className="mb-4 flex flex-wrap items-center gap-2">

                {activeSubcategory && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSubcategory(
                        ""
                      )
                    }
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-[#FF6A00]"
                  >
                    {
                      activeSubcategory
                    }{" "}
                    ×
                  </button>
                )}

                {priceFilter !==
                  "All" && (
                  <button
                    type="button"
                    onClick={() =>
                      setPriceFilter(
                        "All"
                      )
                    }
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-[#FF6A00]"
                  >
                    {priceFilter} ×
                  </button>
                )}

                {(minPrice !== "" ||
                  maxPrice !==
                    "") && (
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-[#FF6A00]"
                  >
                    Price Range ×
                  </button>
                )}

                {discountFilter !==
                  "All" && (
                  <button
                    type="button"
                    onClick={() =>
                      setDiscountFilter(
                        "All"
                      )
                    }
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-[#FF6A00]"
                  >
                    {
                      discountFilter
                    }{" "}
                    ×
                  </button>
                )}

                {customDiscount !==
                  "" && (
                  <button
                    type="button"
                    onClick={() =>
                      setCustomDiscount(
                        ""
                      )
                    }
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-[#FF6A00]"
                  >
                    {customDiscount}%+ ×
                  </button>
                )}

                {colorFilter !==
                  "All" && (
                  <button
                    type="button"
                    onClick={() =>
                      setColorFilter(
                        "All"
                      )
                    }
                    className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-[#FF6A00]"
                  >
                    {colorFilter} ×
                  </button>
                )}

              </div>
            )}

            {/* =================================
                PRODUCTS
            ================================= */}

            {displayedProducts.length ===
            0 ? (

              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center">

                <div className="mb-4 text-5xl">
                  🔍
                </div>

                <h3 className="text-xl font-black text-[#172033]">
                  No products found
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm">
                  There are no products
                  matching your selected
                  filters in{" "}
                  {
                    selectedCategory.name
                  }
                  {activeSubcategory
                    ? ` → ${activeSubcategory}`
                    : ""}.
                </p>

                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="mt-5 rounded-xl bg-[#FF6A00] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#e85f00] sm:text-sm"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <>

                {/* PRODUCTS GRID */}

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 xl:gap-5 2xl:grid-cols-5">

                  {displayedProducts.map(
                    (product) => (
                      <ProductCard
                        key={getProductId(
                          product
                        )}
                        product={
                          product
                        }
                      />
                    )
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
                            previous +
                            12
                        )
                      }
                      className="rounded-xl bg-[#172033] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#FF6A00] sm:px-9 sm:py-3.5 sm:text-sm"
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

    </main>
  );
}