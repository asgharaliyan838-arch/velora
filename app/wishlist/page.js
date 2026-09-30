
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import products from "../data/products";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("veloraWishlist");

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      }
    } catch (error) {
      console.error("Wishlist load error:", error);
    }

    return [];
  });

  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("veloraCart");

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      }
    } catch (error) {
      console.error("Cart load error:", error);
    }

    return [];
  });

  const [sort, setSort] = useState("Default");
  const [message, setMessage] = useState("");

  const getProductId = (product, index) => {
    return String(
      product?.id ??
        product?._id ??
        product?.slug ??
        product?.name ??
        index
    );
  };

  const getProductDiscount = (product) => {
    const explicitDiscount = Number(product?.discount || 0);

    if (explicitDiscount > 0) {
      return explicitDiscount;
    }

    const oldPrice = Number(product?.oldPrice || 0);
    const price = Number(product?.price || 0);

    if (oldPrice > price && oldPrice > 0) {
      return Math.round(
        ((oldPrice - price) / oldPrice) * 100
      );
    }

    return 0;
  };

  const getProductPrice = (product) => {
    return Number(product?.price || 0);
  };

  const getOldPrice = (product) => {
    const oldPrice = Number(product?.oldPrice || 0);
    const price = getProductPrice(product);

    return oldPrice > price ? oldPrice : 0;
  };

  const getProductImage = (product) => {
    if (Array.isArray(product?.images) && product.images.length > 0) {
      return product.images[0];
    }

    return product?.image || "/placeholder-product.png";
  };

  const getProductRating = (product) => {
    const rating = Number(product?.rating || 0);

    return rating > 0 ? rating : 4.5;
  };

  const getProductColors = (product) => {
    if (Array.isArray(product?.colors)) {
      return product.colors;
    }

    if (typeof product?.colors === "string") {
      return [product.colors];
    }

    return [];
  };

  const wishlistProducts = useMemo(() => {
    const wishlistIds = new Set(
      wishlist.map((item) => {
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

    const matched = products
      .map((product, index) => ({
        product,
        id: getProductId(product, index),
      }))
      .filter(({ id }) => wishlistIds.has(id));

    /*
      If localStorage contains complete product objects
      instead of IDs, use them as a fallback.
    */

    if (matched.length === 0 && wishlist.length > 0) {
      const objectItems = wishlist.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          !Array.isArray(item)
      );

      return objectItems.map((product, index) => ({
        product,
        id: getProductId(product, index),
      }));
    }

    return matched;
  }, [wishlist]);

  const sortedProducts = useMemo(() => {
    const list = [...wishlistProducts];

    if (sort === "Price Low") {
      list.sort(
        (a, b) =>
          getProductPrice(a.product) -
          getProductPrice(b.product)
      );
    }

    if (sort === "Price High") {
      list.sort(
        (a, b) =>
          getProductPrice(b.product) -
          getProductPrice(a.product)
      );
    }

    if (sort === "Discount") {
      list.sort(
        (a, b) =>
          getProductDiscount(b.product) -
          getProductDiscount(a.product)
      );
    }

    if (sort === "Rating") {
      list.sort(
        (a, b) =>
          getProductRating(b.product) -
          getProductRating(a.product)
      );
    }

    return list;
  }, [wishlistProducts, sort]);

  const saveWishlist = (nextWishlist) => {
    setWishlist(nextWishlist);

    try {
      localStorage.setItem(
        "veloraWishlist",
        JSON.stringify(nextWishlist)
      );
    } catch (error) {
      console.error("Wishlist save error:", error);
    }
  };

  const removeFromWishlist = (id) => {
    const nextWishlist = wishlist.filter((item) => {
      const itemId =
        typeof item === "object"
          ? String(
              item?.id ??
                item?._id ??
                item?.slug ??
                item?.name
            )
          : String(item);

      return itemId !== String(id);
    });

    saveWishlist(nextWishlist);

    setMessage("Removed from wishlist.");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const clearWishlist = () => {
    saveWishlist([]);

    setMessage("Wishlist cleared.");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const saveCart = (nextCart) => {
    setCart(nextCart);

    try {
      localStorage.setItem(
        "veloraCart",
        JSON.stringify(nextCart)
      );
    } catch (error) {
      console.error("Cart save error:", error);
    }
  };

  const addToCart = (product) => {
    const productId = String(
      product?.id ??
        product?._id ??
        product?.slug ??
        product?.name
    );

    const existingIndex = cart.findIndex((item) => {
      const itemId =
        typeof item === "object"
          ? String(
              item?.id ??
                item?._id ??
                item?.slug ??
                item?.name
            )
          : String(item);

      return itemId === productId;
    });

    let nextCart;

    if (existingIndex !== -1) {
      nextCart = cart.map((item, index) => {
        if (index !== existingIndex) {
          return item;
        }

        if (
          item &&
          typeof item === "object" &&
          !Array.isArray(item)
        ) {
          return {
            ...item,
            quantity: Number(item.quantity || 1) + 1,
          };
        }

        return item;
      });
    } else {
      nextCart = [
        ...cart,
        {
          ...product,
          id: productId,
          quantity: 1,
        },
      ];
    }

    saveCart(nextCart);

    setMessage("Added to cart.");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#172033] via-[#202B40] to-[#FF6A00]">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF6A00]/30 blur-3xl" />

        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur sm:text-sm">
              ❤️ Your Favorites
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              My Wishlist
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Keep the products you love in one place
              and come back whenever you're ready.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">

        {/* MESSAGE */}

        {message && (
          <div className="fixed right-4 top-24 z-[60] rounded-xl bg-[#172033] px-5 py-3 text-sm font-bold text-white shadow-xl">
            {message}
          </div>
        )}

        {/* =======================================================
            TOP BAR
        ======================================================= */}

        {wishlistProducts.length > 0 && (
          <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">

            <div>

              <p className="text-sm font-extrabold text-[#172033] sm:text-base">
                {wishlistProducts.length}{" "}
                {wishlistProducts.length === 1
                  ? "Product"
                  : "Products"}{" "}
                Saved
              </p>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Your favorite products are waiting for you.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-600 outline-none transition focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/10"
              >
                <option value="Default">
                  Sort: Default
                </option>
                <option value="Price Low">
                  Price: Low to High
                </option>
                <option value="Price High">
                  Price: High to Low
                </option>
                <option value="Discount">
                  Highest Discount
                </option>
                <option value="Rating">
                  Highest Rating
                </option>
              </select>

              <button
                type="button"
                onClick={clearWishlist}
                className="h-10 rounded-xl border border-red-100 bg-red-50 px-4 text-sm font-extrabold text-red-500 transition hover:bg-red-100"
              >
                Clear Wishlist
              </button>

            </div>

          </div>
        )}

        {/* =======================================================
            EMPTY STATE
        ======================================================= */}

        {wishlistProducts.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm sm:py-20">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF1E8] text-5xl">
              ♡
            </div>

            <h2 className="mt-7 text-2xl font-black text-[#172033] sm:text-3xl">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              You haven't saved any products yet.
              Explore Velora and add your favorite
              products to your wishlist.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/shop"
                className="rounded-xl bg-[#FF6A00] px-7 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#E85D00]"
              >
                Start Shopping
              </Link>

              <Link
                href="/deals"
                className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-extrabold text-[#172033] transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
              >
                Explore Deals
              </Link>

            </div>

          </div>
        ) : (
          /* =====================================================
             PRODUCT GRID
             ===================================================== */

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

            {sortedProducts.map(({ product, id }) => {

              const discount =
                getProductDiscount(product);

              const price =
                getProductPrice(product);

              const oldPrice =
                getOldPrice(product);

              const rating =
                getProductRating(product);

              const image =
                getProductImage(product);

              const colors =
                getProductColors(product);

              return (
                <article
                  key={id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-square overflow-hidden bg-gray-100">

                    <Link
                      href={`/product/${product?.slug ?? id}`}
                      className="block h-full w-full"
                    >

                      <Image
                        src={image}
                        alt={
                          product?.name ||
                          "Velora product"
                        }
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                    </Link>

                    {/* DISCOUNT */}

                    {discount > 0 && (
                      <span className="absolute left-3 top-3 rounded-lg bg-[#FF6A00] px-2.5 py-1 text-[10px] font-black text-white shadow-md sm:text-xs">
                        -{discount}%
                      </span>
                    )}

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(id)
                      }
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg text-red-500 shadow-md backdrop-blur transition hover:scale-110 hover:bg-red-50"
                    >
                      ♥
                    </button>

                  </div>

                  {/* DETAILS */}

                  <div className="p-3.5 sm:p-5">

                    {/* CATEGORY */}

                    {product?.category && (
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#FF6A00] sm:text-xs">
                        {product.category}
                      </p>
                    )}

                    {/* NAME */}

                    <Link
                      href={`/product/${product?.slug ?? id}`}
                    >
                      <h3 className="mt-1.5 line-clamp-2 min-h-[40px] text-sm font-extrabold leading-5 text-[#172033] transition hover:text-[#FF6A00] sm:text-base">
                        {product?.name ||
                          "Velora Product"}
                      </h3>
                    </Link>

                    {/* RATING */}

                    <div className="mt-2 flex items-center gap-1.5">

                      <span className="text-xs tracking-tight text-[#F59E0B] sm:text-sm">
                        ★★★★★
                      </span>

                      <span className="text-[10px] font-semibold text-gray-400 sm:text-xs">
                        {rating.toFixed(1)}
                      </span>

                    </div>

                    {/* PRICE */}

                    <div className="mt-3 flex flex-wrap items-end gap-2">

                      <span className="text-lg font-black text-[#FF6A00] sm:text-xl">
                        Rs.{" "}
                        {price.toLocaleString()}
                      </span>

                      {oldPrice > price && (
                        <span className="text-xs font-semibold text-gray-400 line-through sm:text-sm">
                          Rs.{" "}
                          {oldPrice.toLocaleString()}
                        </span>
                      )}

                    </div>

                    {/* SAVING */}

                    {oldPrice > price && (
                      <p className="mt-1 text-[10px] font-bold text-green-600 sm:text-xs">
                        Save Rs.{" "}
                        {(
                          oldPrice - price
                        ).toLocaleString()}
                      </p>
                    )}

                    {/* COLORS */}

                    {colors.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">

                        {colors
                          .slice(0, 4)
                          .map((color, colorIndex) => (
                            <span
                              key={`${color}-${colorIndex}`}
                              className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-[9px] font-semibold text-gray-500 sm:text-[10px]"
                            >
                              {String(color)}
                            </span>
                          ))}

                        {colors.length > 4 && (
                          <span className="text-[10px] font-bold text-gray-400">
                            +{colors.length - 4}
                          </span>
                        )}

                      </div>
                    )}

                    {/* ACTIONS */}

                    <div className="mt-4 flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(product)
                        }
                        className="flex-1 rounded-xl bg-[#172033] px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#FF6A00] sm:text-sm"
                      >
                        Add to Cart
                      </button>

                      <Link
                        href={`/product/${product?.slug ?? id}`}
                        className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-extrabold text-[#172033] transition hover:border-[#FF6A00] hover:text-[#FF6A00] sm:text-sm"
                      >
                        View
                      </Link>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}

      {wishlistProducts.length > 0 && (
        <section className="bg-white">

          <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

            <div className="rounded-3xl bg-gradient-to-br from-[#172033] to-[#27344C] px-6 py-12 text-center shadow-xl sm:px-10 sm:py-16">

              <span className="text-3xl">
                🛍️
              </span>

              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                Find something new
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Keep exploring Velora and discover more
                products you'll love.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  href="/shop"
                  className="rounded-xl bg-[#FF6A00] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#E85D00] sm:text-base"
                >
                  Continue Shopping
                </Link>

                <Link
                  href="/deals"
                  className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20 sm:text-base"
                >
                  View Deals
                </Link>

              </div>

              <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-white/30">
                VALUE • AURA
              </p>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}

