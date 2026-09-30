"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Zap,
  Maximize2,
  X,
  Truck,
} from "lucide-react";

import products from "../../data/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const routeSlug = params?.slug ? String(params.slug) : "";

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [wishlist, setWishlist] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const [buyMessage, setBuyMessage] = useState("");

  const [activeInfo, setActiveInfo] = useState("description");
  const [showAllRelated, setShowAllRelated] = useState(false);

  const [canReview, setCanReview] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [productReviews, setProductReviews] = useState([]);

  const [showImageViewer, setShowImageViewer] = useState(false);

  /* =========================================================
     PRODUCT HELPERS
  ========================================================= */

  const getProductId = (item) => {
    return String(item?.id ?? item?._id ?? "");
  };

  const getProductSlug = (item) => {
    if (item?.slug) {
      return String(item.slug);
    }

    if (item?.href) {
      const cleanHref = String(item.href).split("?")[0];
      const parts = cleanHref.split("/").filter(Boolean);

      return parts[parts.length - 1] || "";
    }

    return "";
  };

  const getProductImages = (item) => {
    if (!item) return [];

    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images.filter(Boolean);
    }

    if (item.image) {
      return [item.image];
    }

    return [];
  };

  /* =========================================================
     FIND PRODUCT
  ========================================================= */

  useEffect(() => {
    if (!routeSlug) return;

    const foundProduct = products.find((item) => {
      const id = getProductId(item);
      const slug = getProductSlug(item);

      return (
        id === routeSlug ||
        slug === routeSlug ||
        String(item?.slug || "") === routeSlug ||
        String(item?.href || "").endsWith(`/${routeSlug}`)
      );
    });

    if (foundProduct) {
      setProduct(foundProduct);

      const productImages = getProductImages(foundProduct);

      setSelectedImage(productImages[0] || "");

      setSelectedColor(
        Array.isArray(foundProduct.colors)
          ? foundProduct.colors[0] || ""
          : ""
      );

      setSelectedSize(
        Array.isArray(foundProduct.sizes)
          ? foundProduct.sizes[0] || ""
          : ""
      );
    } else {
      setProduct(null);
    }
  }, [routeSlug]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  useEffect(() => {
    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("veloraWishlist") || "[]"
      );

      if (Array.isArray(savedWishlist)) {
        setWishlist(savedWishlist);
      }
    } catch {
      setWishlist([]);
    }
  }, []);

  /* =========================================================
     REVIEWS
  ========================================================= */

  useEffect(() => {
    if (!product) return;

    const currentProductId = getProductId(product);

    try {
      const savedReviews = JSON.parse(
        localStorage.getItem("veloraReviews") || "{}"
      );

      if (
        savedReviews &&
        typeof savedReviews === "object" &&
        Array.isArray(savedReviews[currentProductId])
      ) {
        setProductReviews(savedReviews[currentProductId]);
      } else {
        setProductReviews([]);
      }
    } catch {
      setProductReviews([]);
    }
  }, [product]);

  /* =========================================================
     CHECK WHETHER USER CAN REVIEW
  ========================================================= */

  useEffect(() => {
    if (!product) return;

    const currentProductId = getProductId(product);

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("veloraOrders") || "[]"
      );

      if (!Array.isArray(savedOrders)) {
        setCanReview(false);
        return;
      }

      const delivered = savedOrders.some((order) => {
        const orderStatus = String(
          order?.status || order?.orderStatus || ""
        ).toLowerCase();

        const completed =
          orderStatus === "delivered" ||
          orderStatus === "completed" ||
          orderStatus === "success";

        if (!completed) return false;

        const orderItems = Array.isArray(order?.items)
          ? order.items
          : [];

        return orderItems.some((item) => {
          return (
            getProductId(item) === currentProductId ||
            String(item?.productId || "") === currentProductId
          );
        });
      });

      setCanReview(delivered);
    } catch {
      setCanReview(false);
    }
  }, [product]);

  /* =========================================================
     IMAGE VIEWER BODY LOCK + ESCAPE
  ========================================================= */

  useEffect(() => {
    if (!showImageViewer) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowImageViewer(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showImageViewer]);

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const images = useMemo(() => {
    return getProductImages(product);
  }, [product]);

  const productId = getProductId(product);

  const isWishlisted = wishlist.some(
    (id) => String(id) === String(productId)
  );

  const price = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || 0);

  const calculatedDiscount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const discount = Number(
    product?.discount ?? calculatedDiscount ?? 0
  );

  const originalRating = Number(product?.rating || 0);
  const originalReviews = Number(product?.reviews || 0);

  const colors = Array.isArray(product?.colors)
    ? product.colors
    : [];

  const sizes = Array.isArray(product?.sizes)
    ? product.sizes
    : [];

  const localReviewCount = productReviews.length;

  const localReviewRating =
    localReviewCount > 0
      ? productReviews.reduce(
          (sum, review) =>
            sum + Number(review?.rating || 0),
          0
        ) / localReviewCount
      : 0;

  const totalReviewCount =
    originalReviews + localReviewCount;

  const displayRating =
    totalReviewCount > 0
      ? (
          (originalRating * originalReviews +
            localReviewRating * localReviewCount) /
          totalReviewCount
        ).toFixed(1)
      : originalRating.toFixed(1);

  /* =========================================================
     RELATED PRODUCTS
  ========================================================= */

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const currentId = getProductId(product);

    const sameCategory = products.filter((item) => {
      if (getProductId(item) === currentId) {
        return false;
      }

      if (!product.category || !item.category) {
        return false;
      }

      return (
        String(item.category).toLowerCase() ===
        String(product.category).toLowerCase()
      );
    });

    if (sameCategory.length >= 4) {
      return sameCategory;
    }

    const fallback = products.filter(
      (item) => getProductId(item) !== currentId
    );

    return [...sameCategory, ...fallback].filter(
      (item, index, array) =>
        index ===
        array.findIndex(
          (x) =>
            getProductId(x) === getProductId(item)
        )
    );
  }, [product]);

  const visibleRelatedProducts = showAllRelated
    ? relatedProducts
    : relatedProducts.slice(0, 5);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = () => {
    if (!productId) return;

    const id = String(productId);

    setWishlist((previous) => {
      const exists = previous.some(
        (item) => String(item) === id
      );

      const updated = exists
        ? previous.filter(
            (item) => String(item) !== id
          )
        : [...previous, id];

      try {
        localStorage.setItem(
          "veloraWishlist",
          JSON.stringify(updated)
        );
      } catch {}

      return updated;
    });
  };

  /* =========================================================
     QUANTITY
  ========================================================= */

  const decreaseQuantity = () => {
    setQuantity((value) => Math.max(1, value - 1));
  };

  const increaseQuantity = () => {
    setQuantity((value) => value + 1);
  };

  /* =========================================================
     SAVE PRODUCT TO CART
  ========================================================= */

  const saveProductToCart = () => {
    if (!product) return false;

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("veloraCart") || "[]"
      );

      const cart = Array.isArray(savedCart)
        ? savedCart
        : [];

      const existingIndex = cart.findIndex((item) => {
        const existingProductId = String(
          item?.productId ??
            item?.id ??
            item?._id ??
            ""
        );

        return (
          existingProductId === String(productId) &&
          String(item?.selectedColor || "") ===
            String(selectedColor || "") &&
          String(item?.selectedSize || "") ===
            String(selectedSize || "")
        );
      });

      const cartItem = {
        ...product,
        productId,
        quantity,
        selectedColor,
        selectedSize,
        price,
        addedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        cart[existingIndex] = {
          ...cart[existingIndex],
          quantity:
            Number(cart[existingIndex]?.quantity || 0) +
            quantity,
        };
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
      );

      return true;
    } catch {
      return false;
    }
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = () => {
    const success = saveProductToCart();

    if (success) {
      setCartMessage("Added to cart successfully.");

      setTimeout(() => {
        router.push("/cart");
      }, 400);
    }
  };

  /* =========================================================
     BUY NOW
  ========================================================= */

  const buyNow = () => {
    const success = saveProductToCart();

    if (success) {
      router.push("/cart");
    }
  };

  /* =========================================================
     SUBMIT REVIEW
  ========================================================= */

  const submitReview = () => {
    if (!productId) return;

    if (!canReview) {
      setReviewMessage(
        "You can review this product after it has been delivered."
      );
      return;
    }

    if (!reviewText.trim()) {
      setReviewMessage("Please write your review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: ratingValue,
      text: reviewText.trim(),
      date: new Date().toISOString(),
    };

    try {
      const savedReviews = JSON.parse(
        localStorage.getItem("veloraReviews") || "{}"
      );

      const allReviews =
        savedReviews &&
        typeof savedReviews === "object"
          ? savedReviews
          : {};

      const currentReviews = Array.isArray(
        allReviews[productId]
      )
        ? allReviews[productId]
        : [];

      const updatedReviews = [
        ...currentReviews,
        newReview,
      ];

      allReviews[productId] = updatedReviews;

      localStorage.setItem(
        "veloraReviews",
        JSON.stringify(allReviews)
      );

      setProductReviews(updatedReviews);
      setReviewText("");
      setRatingValue(5);

      setReviewMessage(
        "Your review has been submitted successfully."
      );
    } catch {
      setReviewMessage(
        "Something went wrong. Please try again."
      );
    }
  };

  /* =========================================================
     LOADING / NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-black text-[#172033]">
            Product not found
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            The product you are looking for does not exist.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <ArrowLeft size={17} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC] pb-16">

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1700px] px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00] transition hover:text-[#eba573]"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN PRODUCT AREA
        ===================================================== */}

        <section className="mx-auto max-w-[1700px] px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8">

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] xl:gap-8">

            {/* =================================================
                LEFT PRODUCT GALLERY
            ================================================= */}

            <div className="min-w-0">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">

                <div className="grid gap-3 lg:grid-cols-[86px_minmax(0,1fr)]">

                  {/* THUMBNAILS */}

                  <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col">

                    {images.map((image, index) => {
                      const active =
                        selectedImage === image;

                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedImage(image)
                          }
                          className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 transition sm:h-24 sm:w-24 lg:h-[76px] lg:w-[76px] ${
                            active
                              ? "border-[#FF6A00] ring-2 ring-orange-100"
                              : "border-slate-200 hover:border-orange-300"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            sizes="96px"
                            className="object-contain p-1"
                          />
                        </button>
                      );
                    })}

                  </div>

                  {/* MAIN IMAGE */}

                  <div className="order-1 min-w-0 lg:order-2">

                    <button
                      type="button"
                      onClick={() =>
                        setShowImageViewer(true)
                      }
                      className="group relative block h-[440px] w-full overflow-hidden rounded-2xl bg-slate-50 sm:h-[540px] lg:h-[620px] xl:h-[700px]"
                      aria-label="Open product image fullscreen"
                    >

                      {selectedImage ? (
                        <Image
                          src={selectedImage}
                          alt={product.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 75vw"
                          className="object-contain p-2 transition duration-300 group-hover:scale-[1.025] sm:p-4"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No image available
                        </div>
                      )}

                      {discount > 0 && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#FF6A00] px-3 py-1.5 text-xs font-black text-white shadow-sm">
                          -{discount}%
                        </span>
                      )}

                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs font-bold text-[#172033] shadow-md backdrop-blur transition group-hover:bg-white sm:text-sm">
                        <Maximize2 size={16} />

                        <span className="hidden sm:inline">
                          Fullscreen
                        </span>
                      </span>

                    </button>

                  </div>
                </div>

                {/* =================================================
                    PRODUCT HIGHLIGHTS
                ================================================= */}

                <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                        Product Highlights
                      </p>

                      <h3 className="mt-1 text-base font-black text-[#172033] sm:text-lg">
                        Everything you need to know
                      </h3>
                    </div>

                    <Zap
                      size={20}
                      className="shrink-0 text-[#FF6A00]"
                    />

                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">

                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">

                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#FF6A00]">
                        <Check size={14} />
                      </span>

                      <div>
                        <p className="text-xs font-bold text-[#172033]">
                          {product.category ||
                            "Premium Product"}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                          Product category
                        </p>
                      </div>

                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">

                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#FF6A00]">
                        <Star
                          size={13}
                          fill="currentColor"
                        />
                      </span>

                      <div>
                        <p className="text-xs font-bold text-[#172033]">
                          {displayRating}/5 Rating
                        </p>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                          Based on {totalReviewCount}{" "}
                          review
                          {totalReviewCount === 1
                            ? ""
                            : "s"}
                        </p>
                      </div>

                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">

                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#FF6A00]">
                        <Check size={14} />
                      </span>

                      <div>
                        <p className="text-xs font-bold text-[#172033]">
                          {colors.length > 0
                            ? `${colors.length} Color${
                                colors.length > 1
                                  ? "s"
                                  : ""
                              }`
                            : "Multiple Options"}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                          Choose your preferred option
                        </p>
                      </div>

                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">

                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#FF6A00]">
                        <Check size={14} />
                      </span>

                      <div>
                        <p className="text-xs font-bold text-[#172033]">
                          {sizes.length > 0
                            ? `${sizes.length} Size${
                                sizes.length > 1
                                  ? "s"
                                  : ""
                              }`
                            : "Size Options Available"}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                          Select the size that fits you
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* =================================================
                RIGHT PRODUCT DETAILS
            ================================================= */}

            <div className="lg:sticky lg:top-5">

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                {/* BADGE */}

                {product.badge && (
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-black text-[#FF6A00]">
                    <Zap size={13} />
                    {product.badge}
                  </div>
                )}

                {/* TITLE */}

                <h1 className="text-2xl font-black leading-tight text-[#172033] sm:text-3xl">
                  {product.name}
                </h1>

                {/* RATING */}

                <div className="mt-4 flex flex-wrap items-center gap-3">

                  <div className="flex items-center gap-1">
                    <Star
                      size={17}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-black text-[#172033]">
                      {displayRating}
                    </span>
                  </div>

                  <span className="text-sm text-slate-400">
                    |
                  </span>

                  <span className="text-sm text-slate-500">
                    {totalReviewCount} review
                    {totalReviewCount === 1
                      ? ""
                      : "s"}
                  </span>

                  {product.category && (
                    <>
                      <span className="text-sm text-slate-400">
                        |
                      </span>

                      <span className="text-sm font-semibold text-slate-500">
                        {product.category}
                      </span>
                    </>
                  )}

                </div>

                {/* PRICE */}

                <div className="mt-6 flex flex-wrap items-end gap-3">

                  <span className="text-3xl font-black text-[#FF6A00]">
                    Rs. {price.toLocaleString()}
                  </span>

                  {oldPrice > price && (
                    <span className="pb-1 text-base font-semibold text-slate-400 line-through">
                      Rs. {oldPrice.toLocaleString()}
                    </span>
                  )}

                  {discount > 0 && (
                    <span className="mb-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-black text-green-600">
                      {discount}% OFF
                    </span>
                  )}

                </div>

                {/* DESCRIPTION */}

                {product.description && (
                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                )}

                <div className="my-6 h-px bg-slate-100" />

                {/* COLOR */}

                {colors.length > 0 && (
                  <div>

                    <div className="mb-3 flex items-center justify-between">

                      <p className="text-sm font-black text-[#172033]">
                        Color
                      </p>

                      <span className="text-xs font-semibold text-slate-500">
                        {selectedColor || "Select"}
                      </span>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      {colors.map((color) => {
                        const active =
                          selectedColor === color;

                        return (
                          <button
                            key={color}
                            type="button"
                            onClick={() =>
                              setSelectedColor(color)
                            }
                            className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                              active
                                ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                                : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"
                            }`}
                          >
                            {color}
                          </button>
                        );
                      })}

                    </div>
                  </div>
                )}

                {/* SIZE */}

                {sizes.length > 0 && (
                  <div className="mt-6">

                    <div className="mb-3 flex items-center justify-between">

                      <p className="text-sm font-black text-[#172033]">
                        Size
                      </p>

                      <span className="text-xs font-semibold text-slate-500">
                        {selectedSize || "Select"}
                      </span>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      {sizes.map((size) => {
                        const active =
                          selectedSize === size;

                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              setSelectedSize(size)
                            }
                            className={`min-w-12 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                              active
                                ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00]"
                                : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}

                    </div>
                  </div>
                )}

                {/* QUANTITY + WISHLIST */}

                <div className="mt-6 flex items-center gap-3">

                  <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="flex h-full w-11 items-center justify-center text-slate-500 transition hover:text-[#FF6A00]"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="w-9 text-center text-sm font-black text-[#172033]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="flex h-full w-11 items-center justify-center text-slate-500 transition hover:text-[#FF6A00]"
                    >
                      <Plus size={17} />
                    </button>

                  </div>

                  <button
                    type="button"
                    onClick={toggleWishlist}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                      isWishlisted
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:text-red-500"
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={20}
                      fill={
                        isWishlisted
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                </div>

                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={addToCart}
                  className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#FF6A00] bg-white px-5 text-sm font-black text-[#FF6A00] transition hover:bg-orange-50"
                >
                  <ShoppingCart size={19} />
                  Add to Cart
                </button>

                {/* BUY NOW */}

                <button
                  type="button"
                  onClick={buyNow}
                  className="mt-3 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-5 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
                >
                  <Zap size={19} />
                  Buy Now
                </button>

                {/* MESSAGES */}

                {cartMessage && (
                  <div className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-center text-xs font-bold text-green-700">
                    {cartMessage}
                  </div>
                )}

                {buyMessage && (
                  <div className="mt-3 rounded-xl bg-orange-50 px-4 py-3 text-center text-xs font-bold text-[#FF6A00]">
                    {buyMessage}
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            PRODUCT INFORMATION
        ===================================================== */}

        <section className="mx-auto mt-7 max-w-[1700px] px-4 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* TABS */}

            <div className="flex overflow-x-auto border-b border-slate-200">

              {[
                ["description", "Description"],
                ["information", "Product Information"],
                ["shipping", "Shipping & Returns"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveInfo(key)}
                  className={`shrink-0 border-b-2 px-5 py-4 text-sm font-black transition ${
                    activeInfo === key
                      ? "border-[#FF6A00] text-[#FF6A00]"
                      : "border-transparent text-slate-500 hover:text-[#172033]"
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>

            <div className="p-5 sm:p-7">

              {/* DESCRIPTION */}

              {activeInfo === "description" && (
                <div>

                  <h2 className="text-xl font-black text-[#172033]">
                    Product Description
                  </h2>

                  <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
                    {product.description ||
                      `Discover ${product.name}, designed to bring quality, comfort and style to your everyday shopping experience.`}
                  </p>

                </div>
              )}

              {/* INFORMATION */}

              {activeInfo === "information" && (
                <div>

                  <h2 className="text-xl font-black text-[#172033]">
                    Product Information
                  </h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-black text-[#172033]">
                        {product.category || "—"}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-400">
                        Available Colors
                      </p>

                      <p className="mt-1 text-sm font-black text-[#172033]">
                        {colors.length > 0
                          ? colors.join(", ")
                          : "—"}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-400">
                        Available Sizes
                      </p>

                      <p className="mt-1 text-sm font-black text-[#172033]">
                        {sizes.length > 0
                          ? sizes.join(", ")
                          : "—"}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-400">
                        Product Rating
                      </p>

                      <p className="mt-1 text-sm font-black text-[#172033]">
                        {displayRating}/5
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-400">
                        Reviews
                      </p>

                      <p className="mt-1 text-sm font-black text-[#172033]">
                        {totalReviewCount}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-400">
                        Discount
                      </p>

                      <p className="mt-1 text-sm font-black text-[#172033]">
                        {discount > 0
                          ? `${discount}% OFF`
                          : "No discount"}
                      </p>

                    </div>

                  </div>
                </div>
              )}

              {/* SHIPPING */}

              {activeInfo === "shipping" && (
                <div>

                  <h2 className="text-xl font-black text-[#172033]">
                    Shipping & Returns
                  </h2>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 p-5">

                      <Truck
                        size={22}
                        className="text-[#FF6A00]"
                      />

                      <h3 className="mt-3 text-sm font-black text-[#172033]">
                        Delivery
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Your order will be dispatched according to
                        product availability and delivery location.
                      </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 p-5">

                      <RotateCcw
                        size={22}
                        className="text-green-600"
                      />

                      <h3 className="mt-3 text-sm font-black text-[#172033]">
                        Returns
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Return eligibility may vary depending on
                        the product and applicable store policy.
                      </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 p-5">

                      <ShieldCheck
                        size={22}
                        className="text-[#18B7E8]"
                      />

                      <h3 className="mt-3 text-sm font-black text-[#172033]">
                        Secure Shopping
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Velora is designed to provide a secure and
                        simple shopping experience.
                      </p>

                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* =====================================================
            REVIEWS
        ===================================================== */}

        <section className="mx-auto mt-7 max-w-[1700px] px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                  Customer Reviews
                </p>

                <h2 className="mt-1 text-xl font-black text-[#172033]">
                  What customers say
                </h2>

              </div>

              <div className="flex items-center gap-2">

                <Star
                  size={21}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-lg font-black text-[#172033]">
                  {displayRating}
                </span>

                <span className="text-sm text-slate-500">
                  ({totalReviewCount})
                </span>

              </div>

            </div>

            {/* EXISTING REVIEWS */}

            {productReviews.length > 0 && (
              <div className="mt-6 space-y-3">

                {productReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl bg-slate-50 p-4"
                  >

                    <div className="flex items-center gap-1">

                      {Array.from({ length: 5 }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={14}
                            className={
                              index <
                              Number(review.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }
                          />
                        )
                      )}

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {review.text}
                    </p>

                    <p className="mt-2 text-[11px] font-semibold text-slate-400">
                      {review.date
                        ? new Date(
                            review.date
                          ).toLocaleDateString()
                        : ""}
                    </p>

                  </div>
                ))}

              </div>
            )}

            {/* REVIEW FORM */}

            <div className="mt-7 border-t border-slate-100 pt-6">

              {canReview ? (
                <>

                  <h3 className="text-base font-black text-[#172033]">
                    Write a Review
                  </h3>

                  <div className="mt-4">

                    <p className="mb-2 text-xs font-bold text-slate-500">
                      Your Rating
                    </p>

                    <div className="flex gap-1">

                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() =>
                            setRatingValue(rating)
                          }
                          aria-label={`Rate ${rating} stars`}
                        >
                          <Star
                            size={22}
                            className={
                              rating <= ratingValue
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }
                          />
                        </button>
                      ))}

                    </div>
                  </div>

                  <textarea
                    value={reviewText}
                    onChange={(event) =>
                      setReviewText(event.target.value)
                    }
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#FF6A00] focus:ring-4 focus:ring-orange-50"
                  />

                  <button
                    type="button"
                    onClick={submitReview}
                    className="mt-3 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-black text-white transition hover:bg-orange-600"
                  >
                    Submit Review
                  </button>

                </>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  You can write a review after this product has
                  been delivered to you.
                </div>
              )}

              {reviewMessage && (
                <p className="mt-3 rounded-xl bg-orange-50 px-4 py-3 text-xs font-bold text-[#FF6A00]">
                  {reviewMessage}
                </p>
              )}

            </div>
          </div>
        </section>

        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        {relatedProducts.length > 0 && (
          <section className="mx-auto mt-7 max-w-[1700px] px-4 sm:px-6 lg:px-8">

            <div className="mb-5 flex items-end justify-between gap-4">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                  You May Also Like
                </p>

                <h2 className="mt-1 text-2xl font-black text-[#172033]">
                  Related Products
                </h2>

              </div>

              {relatedProducts.length > 5 && (
                <button
                  type="button"
                  onClick={() =>
                    setShowAllRelated((value) => !value)
                  }
                  className="text-sm font-black text-[#FF6A00] hover:underline"
                >
                  {showAllRelated
                    ? "Show Less"
                    : "View All"}
                </button>
              )}

            </div>

            {/* 5 PRODUCTS PER ROW ON LARGE DESKTOP */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

              {visibleRelatedProducts.map(
                (relatedProduct) => {

                  const relatedImages =
                    getProductImages(
                      relatedProduct
                    );

                  const relatedImage =
                    relatedImages[0] ||
                    "/product-1.jfif";

                  const relatedSlug =
                    getProductSlug(
                      relatedProduct
                    );

                  const relatedPrice =
                    Number(
                      relatedProduct?.price || 0
                    );

                  const relatedOldPrice =
                    Number(
                      relatedProduct?.oldPrice || 0
                    );

                  const relatedDiscount =
                    relatedOldPrice > relatedPrice
                      ? Math.round(
                          ((relatedOldPrice -
                            relatedPrice) /
                            relatedOldPrice) *
                            100
                        )
                      : Number(
                          relatedProduct?.discount || 0
                        );

                  return (
                    <Link
                      key={getProductId(
                        relatedProduct
                      )}
                      href={`/product/${relatedSlug}`}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                      <div className="relative aspect-square overflow-hidden bg-slate-50">

                        <Image
                          src={relatedImage}
                          alt={relatedProduct.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-contain p-2 transition duration-300 group-hover:scale-105"
                        />

                        {relatedDiscount > 0 && (
                          <span className="absolute left-2 top-2 rounded-full bg-[#FF6A00] px-2 py-1 text-[10px] font-black text-white">
                            -{relatedDiscount}%
                          </span>
                        )}

                      </div>

                      <div className="p-3">

                        <p className="line-clamp-2 text-xs font-bold leading-5 text-[#172033] sm:text-sm">
                          {relatedProduct.name}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">

                          <span className="text-sm font-black text-[#FF6A00]">
                            Rs.{" "}
                            {relatedPrice.toLocaleString()}
                          </span>

                          {relatedOldPrice >
                            relatedPrice && (
                            <span className="text-[11px] font-semibold text-slate-400 line-through">
                              Rs.{" "}
                              {relatedOldPrice.toLocaleString()}
                            </span>
                          )}

                        </div>

                        <div className="mt-2 flex items-center gap-1">

                          <Star
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />

                          <span className="text-[11px] font-bold text-slate-500">
                            {Number(
                              relatedProduct?.rating || 0
                            ).toFixed(1)}
                          </span>

                        </div>

                      </div>
                    </Link>
                  );
                }
              )}

            </div>
          </section>
        )}

      </main>

      {/* =======================================================
          FULLSCREEN IMAGE VIEWER
      ======================================================= */}

      {showImageViewer && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
        >

          {/* CLOSE */}

          <button
            type="button"
            onClick={() =>
              setShowImageViewer(false)
            }
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close fullscreen viewer"
          >
            <X size={23} />
          </button>

          {/* IMAGE */}

          <div className="relative h-full w-full">

            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-contain p-6 sm:p-12 lg:p-20"
              />
            )}

          </div>

          {/* FULLSCREEN THUMBNAILS */}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl bg-white/10 p-2 backdrop-blur">

              {images.map((image, index) => (
                <button
                  key={`${image}-fullscreen-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                    selectedImage === image
                      ? "border-[#FF6A00]"
                      : "border-white/30"
                  }`}
                >

                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />

                </button>
              ))}

            </div>
          )}

        </div>
      )}

    </>
  );
}