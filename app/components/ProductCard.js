"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import products from "../data/products";

export default function Product() {
  const [wishlist, setWishlist] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // LOAD WISHLIST FROM LOCAL STORAGE
  useEffect(() => {
    try {
      const saved = localStorage.getItem("veloraWishlist");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setWishlist(
            parsed.map((item) => {
              if (typeof item === "object") {
                return String(
                  item?.id ??
                    item?._id ??
                    item?.slug ??
                    item?.name
                );
              }

              return String(item);
            })
          );
        }
      }
    } catch (error) {
      console.error("Wishlist load error:", error);
    }
  }, []);

  const toggleWishlist = (id) => {
    const productId = String(id);

    setWishlist((prev) => {
      const isAlreadyWishlisted = prev.includes(productId);

      const nextWishlist = isAlreadyWishlisted
        ? prev.filter((item) => item !== productId)
        : [...prev, productId];

      try {
        localStorage.setItem(
          "veloraWishlist",
          JSON.stringify(nextWishlist)
        );
      } catch (error) {
        console.error("Wishlist save error:", error);
      }

      return nextWishlist;
    });
  };

  const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;

  return (
    <section className="w-full bg-white py-5 sm:py-14 lg:py-16">
      <div className="w-full px-2.5 sm:px-6 lg:px-8 xl:px-10">

        {/* SECTION HEADER */}
        <div className="mb-4 flex items-end justify-between sm:mb-10">
          <div>
            <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-[#FF6A00] sm:mb-1 sm:text-xs">
              Shop Now
            </p>

            <h2 className="text-lg font-extrabold tracking-tight text-[#172033] sm:text-3xl lg:text-4xl">
              Products
            </h2>

            <p className="mt-0.5 text-[9px] text-gray-500 sm:mt-1 sm:text-sm">
              Explore our latest collection
            </p>
          </div>

          {/* DESKTOP BUTTON */}
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="hidden text-sm font-bold text-[#172033] transition hover:text-[#FF6A00] sm:block"
          >
            {showAll ? "Show Less ↑" : "View All →"}
          </button>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid w-full grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-5 xl:gap-6">
          {products.map((product, index) => {
            const productId = String(product.id);
            const isWishlisted = wishlist.includes(productId);

            return (
              <div
                key={product.id}
                className={`group overflow-hidden rounded-md border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-xl ${
                  index >= 6 && !showAll ? "hidden sm:block" : ""
                }`}
              >

                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 sm:aspect-[4/5]">
                  <Link href={product.href} className="block h-full w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </Link>

                  {/* BADGE */}
                  {product.badge && (
                    <span className="absolute left-1 top-1 rounded bg-[#FF6A00] px-1.5 py-0.5 text-[8px] font-bold leading-none text-white sm:left-2 sm:top-2 sm:rounded-md sm:px-2 sm:py-1 sm:text-[10px]">
                      {product.badge}
                    </span>
                  )}

                  {/* DISCOUNT */}
                  {product.discount > 0 && (
                    <span className="absolute right-1 top-1 rounded bg-[#172033] px-1.5 py-0.5 text-[8px] font-bold leading-none text-white sm:right-2 sm:top-2 sm:rounded-md sm:px-2 sm:py-1 sm:text-[10px]">
                      -{product.discount}%
                    </span>
                  )}

                  {/* WISHLIST */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-110 sm:bottom-2 sm:right-2 sm:h-8 sm:w-8"
                  >
                    <span
                      className={`text-sm sm:text-base ${
                        isWishlisted
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {isWishlisted ? "♥" : "♡"}
                    </span>
                  </button>

                  {/* QUICK VIEW */}
                  <Link
                    href={product.href}
                    className="absolute bottom-1 left-1 rounded bg-white/95 px-1.5 py-1 text-[8px] font-bold leading-none text-[#172033] opacity-0 shadow transition group-hover:opacity-100 sm:bottom-2 sm:left-2 sm:rounded-md sm:px-2 sm:py-1 sm:text-[10px]"
                  >
                    Quick View
                  </Link>
                </div>

                {/* INFO */}
                <div className="p-1.5 sm:p-3 lg:p-3.5">

                  {/* PRODUCT NAME */}
                  <Link href={product.href}>
                    <h3 className="line-clamp-2 min-h-[26px] text-[11px] font-bold leading-[14px] text-[#172033] transition hover:text-[#FF6A00] sm:min-h-[32px] sm:text-sm sm:leading-4">
                      {product.name}
                    </h3>
                  </Link>

                  {/* RATING */}
                  <Link
                    href={`${product.href}#reviews`}
                    className="mt-0.5 flex items-center gap-1"
                  >
                    <span className="text-[9px] leading-none text-gray-300 sm:text-[11px]">
                      ★★★★★
                    </span>

                    {product.reviews > 0 ? (
                      <span className="text-[8px] text-gray-500 sm:text-[10px]">
                        {product.rating} ({product.reviews})
                      </span>
                    ) : (
                      <span className="text-[8px] text-gray-400 sm:text-[10px]">
                        0 reviews · Rate
                      </span>
                    )}
                  </Link>

                  {/* PRICE */}
                  <Link
                    href={product.href}
                    className="mt-0.5 block"
                  >
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-xs font-extrabold leading-4 text-[#FF6A00] sm:text-base">
                        {formatPrice(product.price)}
                      </span>

                      {product.oldPrice && (
                        <span className="text-[8px] text-gray-400 line-through sm:text-[10px]">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* COLORS */}
                  {product.colors?.length > 0 && (
                    <div className="mt-0.5 flex items-center gap-1 sm:mt-2 sm:gap-1.5">
                      <span className="mr-0.5 text-[8px] text-gray-400 sm:text-[9px]">
                        Colors:
                      </span>

                      {product.colors.slice(0, 4).map((color, index) => (
                        <span
                          key={`${color}-${index}`}
                          className="h-2.5 w-2.5 rounded-full border border-gray-200 sm:h-3.5 sm:w-3.5"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}

                  {/* SIZES / VARIANT */}
                  {product.sizes ? (
                    <div className="mt-0.5 flex items-center gap-1 overflow-hidden sm:mt-2">
                      <span className="mr-0.5 shrink-0 text-[8px] text-gray-400 sm:text-[9px]">
                        Sizes:
                      </span>

                      {product.sizes.slice(0, 4).map((size) => (
                        <span
                          key={size}
                          className="rounded border border-gray-200 px-1 py-0.5 text-[7px] font-semibold leading-none text-gray-500 sm:px-1.5 sm:py-0.5 sm:text-[8px]"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  ) : product.variantType ? (
                    <div className="mt-0.5 flex items-center gap-1 sm:mt-2">
                      <span className="mr-0.5 shrink-0 text-[8px] text-gray-400 sm:text-[9px]">
                        Variant:
                      </span>

                      <span className="truncate rounded border border-gray-200 px-1 py-0.5 text-[7px] font-semibold leading-none text-gray-500 sm:px-1.5 sm:py-0.5 sm:text-[8px]">
                        {product.variantType}
                      </span>
                    </div>
                  ) : null}

                  {/* VIEW PRODUCT */}
                  <Link
                    href={product.href}
                    className="mt-2.5 flex w-full items-center justify-center rounded-md bg-[#FF6A00] px-2 py-2.5 text-[10px] font-bold leading-none text-white transition hover:bg-[#E85F00] sm:mt-3.5 sm:rounded-lg sm:px-3 sm:py-3 sm:text-xs"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-5 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-md border border-[#172033] px-5 py-2 text-[10px] font-bold text-[#172033] transition hover:bg-[#172033] hover:text-white"
          >
            {showAll ? "Show Less ↑" : "View All Products →"}
          </button>
        </div>

      </div>
    </section>
  );
}