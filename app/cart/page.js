"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Tag,
  X,
} from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  /* =========================================================
     LOAD CART
  ========================================================= */

  useEffect(() => {
    setMounted(true);

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("veloraCart") || "[]"
      );

      if (Array.isArray(savedCart)) {
        setCart(savedCart);
      }
    } catch {
      setCart([]);
    }
  }, []);

  /* =========================================================
     SAVE CART
  ========================================================= */

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
      );
    } catch {}
  }, [cart, mounted]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getProductId = (item) => {
    return String(
      item?.productId ??
        item?.id ??
        item?._id ??
        ""
    );
  };

  const getProductHref = (item) => {
    if (item?.href) {
      return String(item.href);
    }

    if (item?.slug) {
      return `/product/${item.slug}`;
    }

    if (item?.productId) {
      return `/product/${item.productId}`;
    }

    if (item?.id) {
      return `/product/${item.id}`;
    }

    return "/shop";
  };

  const getProductImage = (item) => {
    if (item?.image) {
      return item.image;
    }

    if (
      Array.isArray(item?.images) &&
      item.images.length > 0
    ) {
      return item.images[0];
    }

    return "/product-1.jfif";
  };

  const getItemPrice = (item) => {
    return Number(item?.price || 0);
  };

  const getItemQuantity = (item) => {
    return Math.max(
      1,
      Number(item?.quantity || 1)
    );
  };

  /* =========================================================
     QUANTITY
  ========================================================= */

  const updateQuantity = (index, change) => {
    setCart((previous) =>
      previous.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        const currentQuantity =
          getItemQuantity(item);

        return {
          ...item,
          quantity: Math.max(
            1,
            currentQuantity + change
          ),
        };
      })
    );
  };

  /* =========================================================
     REMOVE ITEM
  ========================================================= */

  const removeItem = (index) => {
    setCart((previous) =>
      previous.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  /* =========================================================
     CLEAR CART
  ========================================================= */

  const clearCart = () => {
    setCart([]);
  };

  /* =========================================================
     PRICING
  ========================================================= */

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return (
        total +
        getItemPrice(item) *
          getItemQuantity(item)
      );
    }, 0);
  }, [cart]);

  const shipping = useMemo(() => {
    if (subtotal <= 0) {
      return 0;
    }

    if (subtotal >= 5000) {
      return 0;
    }

    return 250;
  }, [subtotal]);

  const discount = 0;

  const total = Math.max(
    0,
    subtotal + shipping - discount
  );

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => {
      return (
        total +
        getItemQuantity(item)
      );
    }, 0);
  }, [cart]);

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-PK").format(
      Number(value || 0)
    );
  };

  /* =========================================================
     COUPON
  ========================================================= */

  const applyCoupon = () => {
    const trimmedCoupon = coupon.trim();

    if (!trimmedCoupon) {
      setCouponMessage(
        "Please enter a coupon code."
      );
      return;
    }

    setCouponMessage(
      "Coupon system will be available soon."
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-20 rounded bg-slate-200" />

            <div className="mt-8 h-10 w-56 rounded bg-slate-200" />

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
              <div className="h-[500px] rounded-3xl bg-white" />
              <div className="h-[500px] rounded-3xl bg-white" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl px-1 py-2 text-sm font-black text-[#FF6A00] transition hover:text-orange-600"
          >
            <ArrowLeft size={19} />
            Back
          </button>

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-xl text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-orange-50 ring-8 ring-orange-50/60">
                <ShoppingBag
                  size={46}
                  strokeWidth={1.8}
                  className="text-[#FF6A00]"
                />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                Velora Shopping
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
                Your Cart Is Empty
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                Your shopping bag is waiting for
                something special. Explore Velora
                and discover products you'll love.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <ShoppingBag size={18} />
                Start Shopping
                <ArrowRight size={17} />
              </Link>

              <div className="mx-auto mt-10 h-px max-w-sm bg-slate-200" />

              <p className="mt-5 text-xs font-semibold text-slate-400">
                Discover quality products at
                amazing prices with Velora.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN CART
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="group inline-flex items-center gap-2 rounded-xl px-1 py-2 text-sm font-black text-[#FF6A00] transition hover:text-orange-600"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 transition group-hover:bg-orange-100">
            <ArrowLeft size={17} />
          </span>

          Back
        </button>

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mt-7 flex flex-col gap-5 border-b border-slate-200 pb-7 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <ShoppingBag
                  size={23}
                  className="text-[#FF6A00]"
                />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                  Velora
                </p>

                <h1 className="text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
                  Shopping Cart
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Review your selected products before
              continuing to checkout.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Cart
              </p>

              <p className="mt-0.5 text-sm font-black text-[#172033]">
                {totalItems}{" "}
                {totalItems === 1
                  ? "Item"
                  : "Items"}
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">
                Clear Cart
              </span>
              <span className="sm:hidden">
                Clear
              </span>
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start xl:gap-8">

          {/* ===================================================
              CART ITEMS
          =================================================== */}

          <section className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {/* Cart Header */}

              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-5 sm:px-6">
                <div>
                  <h2 className="text-lg font-black text-[#172033]">
                    Cart Items
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Your selected products
                  </p>
                </div>

                <span className="rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-black text-[#FF6A00]">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "Item"
                    : "Items"}
                </span>
              </div>

              {/* Products */}

              <div className="divide-y divide-slate-100">
                {cart.map((item, index) => {
                  const price = getItemPrice(item);

                  const quantity =
                    getItemQuantity(item);

                  const productName =
                    item?.name ||
                    item?.productName ||
                    "Product";

                  const image =
                    getProductImage(item);

                  const href =
                    getProductHref(item);

                  const itemTotal =
                    price * quantity;

                  return (
                    <div
                      key={`${getProductId(
                        item
                      )}-${index}`}
                      className="group relative p-4 transition hover:bg-slate-50/60 sm:p-5 lg:p-6"
                    >
                      <div className="flex gap-4 sm:gap-5">

                        {/* Product Image */}

                        <Link
                          href={href}
                          className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 sm:h-32 sm:w-32"
                        >
                          <Image
                            src={image}
                            alt={productName}
                            fill
                            sizes="128px"
                            className="object-contain p-2 transition duration-300 group-hover:scale-105"
                          />
                        </Link>

                        {/* Product Content */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">
                              <Link
                                href={href}
                                className="line-clamp-2 text-sm font-black leading-5 text-[#172033] transition hover:text-[#FF6A00] sm:text-base sm:leading-6"
                              >
                                {productName}
                              </Link>

                              {/* Variants */}

                              {(item?.selectedColor ||
                                item?.selectedSize) && (
                                <div className="mt-2.5 flex flex-wrap gap-2">
                                  {item?.selectedColor && (
                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                                      Color:{" "}
                                      {
                                        item.selectedColor
                                      }
                                    </span>
                                  )}

                                  {item?.selectedSize && (
                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                                      Size:{" "}
                                      {
                                        item.selectedSize
                                      }
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Desktop Remove */}

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(index)
                              }
                              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500 sm:flex"
                              aria-label={`Remove ${productName}`}
                            >
                              <X size={18} />
                            </button>
                          </div>

                          {/* Bottom Row */}

                          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">

                            {/* Quantity */}

                            <div>
                              <p className="mb-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Quantity
                              </p>

                              <div className="flex h-10 items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      index,
                                      -1
                                    )
                                  }
                                  disabled={
                                    quantity <= 1
                                  }
                                  className="flex h-full w-10 items-center justify-center text-slate-500 transition hover:bg-orange-50 hover:text-[#FF6A00] disabled:cursor-not-allowed disabled:opacity-30"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={15} />
                                </button>

                                <span className="flex h-full min-w-10 items-center justify-center border-x border-slate-200 px-2 text-sm font-black text-[#172033]">
                                  {quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      index,
                                      1
                                    )
                                  }
                                  className="flex h-full w-10 items-center justify-center text-slate-500 transition hover:bg-orange-50 hover:text-[#FF6A00]"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={15} />
                                </button>
                              </div>
                            </div>

                            {/* Price */}

                            <div className="text-right">
                              <p className="text-[11px] font-medium text-slate-400">
                                Rs.{" "}
                                {formatPrice(
                                  price
                                )}{" "}
                                each
                              </p>

                              <p className="mt-0.5 text-lg font-black text-[#172033]">
                                Rs.{" "}
                                {formatPrice(
                                  itemTotal
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Mobile Remove */}

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(index)
                            }
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-500 sm:hidden"
                          >
                            <Trash2 size={14} />
                            Remove item
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Footer */}

              <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-4 sm:px-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-black text-[#172033] transition hover:text-[#FF6A00]"
                >
                  <ArrowLeft size={17} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </section>

          {/* ===================================================
              ORDER SUMMARY
          =================================================== */}

          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {/* Summary Header */}

              <div className="border-b border-slate-100 bg-white px-5 py-5 sm:px-6">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                  Checkout
                </p>

                <h2 className="mt-1 text-xl font-black text-[#172033]">
                  Order Summary
                </h2>
              </div>

              <div className="p-5 sm:p-6">

                {/* Coupon */}

                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-black text-[#172033]">
                    <Tag
                      size={16}
                      className="text-[#FF6A00]"
                    />
                    Have a coupon?
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(event) => {
                        setCoupon(
                          event.target.value
                        );
                        setCouponMessage("");
                      }}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter"
                        ) {
                          applyCoupon();
                        }
                      }}
                      placeholder="Enter coupon code"
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-[#172033] outline-none transition placeholder:text-slate-400 focus:border-[#FF6A00] focus:ring-4 focus:ring-orange-50"
                    />

                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-[#172033] px-4 text-sm font-black text-white transition hover:bg-slate-800"
                    >
                      Apply
                    </button>
                  </div>

                  {couponMessage && (
                    <p className="mt-2.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Price Details */}

                <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-bold text-[#172033]">
                      Rs.{" "}
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Shipping
                    </span>

                    <span
                      className={`font-bold ${
                        shipping === 0
                          ? "text-green-600"
                          : "text-[#172033]"
                      }`}
                    >
                      {shipping === 0
                        ? "FREE"
                        : `Rs. ${formatPrice(
                            shipping
                          )}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Discount
                      </span>

                      <span className="font-bold text-green-600">
                        - Rs.{" "}
                        {formatPrice(
                          discount
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Free Shipping */}

                {subtotal > 0 &&
                  subtotal < 5000 && (
                    <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#FF6A00] shadow-sm">
                          <ShoppingBag
                            size={14}
                          />
                        </div>

                        <p className="text-xs font-semibold leading-5 text-orange-700">
                          Add Rs.{" "}
                          {formatPrice(
                            5000 - subtotal
                          )}{" "}
                          more to unlock{" "}
                          <span className="font-black">
                            FREE SHIPPING
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                {subtotal >= 5000 && (
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4 text-xs font-bold text-green-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                      <Check size={15} />
                    </span>

                    You've unlocked FREE
                    SHIPPING!
                  </div>
                )}

                {/* Total */}

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-[11px] leading-4 text-slate-400">
                        Inclusive of applicable
                        charges
                      </p>
                    </div>

                    <p className="text-2xl font-black text-[#FF6A00]">
                      Rs.{" "}
                      {formatPrice(total)}
                    </p>
                  </div>
                </div>

                {/* Checkout Button */}

                <Link
                  href="/checkout"
                  className="mt-6 flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-5 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Link>

                <p className="mt-4 text-center text-[10px] font-medium leading-5 text-slate-400">
                  By proceeding to checkout, you
                  agree to Velora's terms and
                  conditions.
                </p>
              </div>
            </div>

            {/* Secure Checkout Note */}

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                <Check
                  size={15}
                  className="text-green-500"
                />
                Secure checkout experience
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}