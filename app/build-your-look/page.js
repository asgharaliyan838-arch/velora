"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import products from "../data/products";

export default function BuildYourLook() {
const [selectedProduct, setSelectedProduct] = useState(null);
const [userPhoto, setUserPhoto] = useState(null);
const [photoUrl, setPhotoUrl] = useState("");
const [tryOnMode, setTryOnMode] = useState(false);
const [showProducts, setShowProducts] = useState(false);
const [search, setSearch] = useState("");

const fileInputRef = useRef(null);

/* ----------------------------- */
/* Search Products */
/* ----------------------------- */

const filteredProducts = useMemo(() => {
if (!search.trim()) {
return products;
}


const query = search.toLowerCase();

return products.filter((product) => {
  const name = String(product.name || "").toLowerCase();
  const category = String(product.category || "").toLowerCase();
  const color = String(product.color || "").toLowerCase();

  return (
    name.includes(query) ||
    category.includes(query) ||
    color.includes(query)
  );
});


}, [search]);

/* ----------------------------- */
/* Upload Photo */
/* ----------------------------- */

const handlePhotoUpload = (event) => {
const file = event.target.files?.[0];


if (!file) return;

if (!file.type.startsWith("image/")) {
  alert("Please upload an image.");
  return;
}

if (file.size > 10 * 1024 * 1024) {
  alert("Please upload an image smaller than 10MB.");
  return;
}

if (photoUrl) {
  URL.revokeObjectURL(photoUrl);
}

const newUrl = URL.createObjectURL(file);

setUserPhoto(file);
setPhotoUrl(newUrl);
setTryOnMode(false);


};

/* ----------------------------- */
/* Change Photo */
/* ----------------------------- */

const changePhoto = () => {
fileInputRef.current?.click();
};

/* ----------------------------- */
/* Clear Photo */
/* ----------------------------- */

const clearPhoto = () => {
if (photoUrl) {
URL.revokeObjectURL(photoUrl);
}


setUserPhoto(null);
setPhotoUrl("");
setTryOnMode(false);

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}


};

/* ----------------------------- */
/* Select Product */
/* ----------------------------- */

const selectProduct = (product) => {
setSelectedProduct(product);
setTryOnMode(false);
setShowProducts(false);


window.scrollTo({
  top: 0,
  behavior: "smooth",
});


};

/* ----------------------------- */
/* Change Product */
/* ----------------------------- */

const changeProduct = () => {
setShowProducts(true);


window.scrollTo({
  top: document.body.scrollHeight,
  behavior: "smooth",
});

};

/* ----------------------------- */
/* Clear Product */
/* ----------------------------- */

const clearProduct = () => {
setSelectedProduct(null);
setTryOnMode(false);
};

/* ----------------------------- */
/* Try On */
/* ----------------------------- */

const handleTryOn = () => {
if (!selectedProduct) {
alert("Please select a product first.");
return;
}


if (!userPhoto) {
  alert("Please upload your photo first.");
  return;
}

/*
  Backend / AI Virtual Try-On
  will be connected later.
*/

setTryOnMode(true);


};

/* ----------------------------- */
/* Cleanup */
/* ----------------------------- */

useEffect(() => {
return () => {
if (photoUrl) {
URL.revokeObjectURL(photoUrl);
}
};
}, [photoUrl]);

const price = Number(selectedProduct?.price) || 0;
const oldPrice = Number(selectedProduct?.oldPrice) || 0;
const discount = Number(selectedProduct?.discount) || 0;

return ( <main className="min-h-screen bg-slate-50">


  {/* ================================================= */}
  {/* HERO */}
  {/* ================================================= */}

  <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 px-4 py-12 sm:py-16">

    <div className="relative z-10 mx-auto max-w-7xl text-center text-white">

      <div className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur">
        Velora Virtual Try-On
      </div>

      <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
        Build Your Look
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-orange-50 sm:text-base">
        Choose a product, upload your photo, and see how it could look
        before you buy.
      </p>

    </div>

    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

    <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

  </section>

  {/* ================================================= */}
  {/* HOW IT WORKS */}
  {/* ================================================= */}

  <section className="border-b border-slate-200 bg-white">

    <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

      <Step
        number="01"
        title="Choose Product"
        text="Select the product you want to try."
      />

      <Step
        number="02"
        title="Upload Photo"
        text="Upload a clear photo of yourself."
      />

      <Step
        number="03"
        title="Try It On"
        text="Preview the look before buying."
      />

    </div>

  </section>

  {/* ================================================= */}
  {/* MAIN */}
  {/* ================================================= */}

  <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">

      {/* ================================================= */}
      {/* PREVIEW AREA */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

          <div className="flex items-center justify-between gap-3">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Your Try-On Preview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Upload your photo and select a product to begin.
              </p>
            </div>

            {selectedProduct && (
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                Product Selected
              </span>
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* PREVIEW */}
        {/* ================================================= */}

        <div className="relative min-h-[480px] overflow-hidden bg-slate-100 sm:min-h-[620px]">

          {!userPhoto ? (

            <div className="flex min-h-[480px] flex-col items-center justify-center px-4 text-center sm:min-h-[620px]">

              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-sm">
                📸
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Upload Your Photo
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Use a clear front-facing photo for the best virtual
                try-on experience.
              </p>

              <button
                onClick={changePhoto}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
              >
                Upload Photo
              </button>

            </div>

          ) : (

            <div className="relative h-[480px] w-full overflow-hidden bg-slate-100 sm:h-[620px]">

              {/* FULL PHOTO AREA */}

              <img
                src={photoUrl}
                alt="Your uploaded photo"
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* Selected Product Preview */}

              {tryOnMode && selectedProduct?.image && (

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="absolute inset-0 bg-black/5" />

                  <div className="relative z-10 rounded-xl border border-white/50 bg-white/90 px-5 py-4 text-center shadow-lg backdrop-blur">

                    <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-lg bg-slate-100">

                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name || "Selected product"}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />

                    </div>

                    <p className="text-sm font-bold text-slate-900">
                      Virtual Try-On Ready
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      AI try-on can be connected here.
                    </p>

                  </div>

                </div>

              )}

              {/* Product selected but not tried */}

              {!tryOnMode && selectedProduct && (

                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur">

                  <div className="flex items-center gap-3">

                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">

                      {selectedProduct.image && (
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.name || "Product"}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      )}

                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {selectedProduct.name || "Selected Product"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Click Try It On to continue
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* PHOTO CONTROLS */}
        {/* ================================================= */}

        {userPhoto && (

          <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row">

            <button
              onClick={changePhoto}
              className="flex-1 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Change Photo
            </button>

            <button
              onClick={clearPhoto}
              className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Clear Photo
            </button>

          </div>

        )}

      </div>

      {/* ================================================= */}
      {/* PRODUCT / CONTROLS */}
      {/* ================================================= */}

      <aside className="h-fit space-y-5">

        {/* Upload */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h3 className="text-lg font-bold text-slate-900">
            1. Your Photo
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Upload a clear photo to see your virtual look.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <button
            onClick={changePhoto}
            className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-center transition hover:border-orange-300 hover:bg-orange-50"
          >

            <div className="text-2xl">
              {userPhoto ? "✅" : "📷"}
            </div>

            <p className="mt-2 text-sm font-bold text-slate-800">
              {userPhoto
                ? "Photo Uploaded"
                : "Click to Upload Photo"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG or WEBP
            </p>

          </button>

          {/* Photo Buttons */}

          {userPhoto && (

            <div className="mt-3 grid grid-cols-2 gap-2">

              <button
                onClick={changePhoto}
                className="rounded-xl bg-slate-900 px-3 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                Change Photo
              </button>

              <button
                onClick={clearPhoto}
                className="rounded-xl border border-slate-200 px-3 py-3 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Clear Photo
              </button>

            </div>

          )}

        </div>

        {/* Selected Product */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Choose Product
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Select something you want to try.
              </p>
            </div>

            <button
              onClick={changeProduct}
              className="text-xs font-bold text-orange-500"
            >
              {showProducts ? "Close" : "Browse"}
            </button>

          </div>

          {selectedProduct ? (

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">

              <div className="relative aspect-square bg-slate-100">

                {selectedProduct.image && (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name || "Product"}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                )}

                {discount > 0 && (
                  <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    {discount}% OFF
                  </span>
                )}

              </div>

              <div className="p-4">

                <h4 className="font-bold text-slate-900">
                  {selectedProduct.name || "Product"}
                </h4>

                {selectedProduct.color && (
                  <p className="mt-1 text-xs text-slate-500">
                    Colour:{" "}
                    <span className="font-semibold text-slate-700">
                      {selectedProduct.color}
                    </span>
                  </p>
                )}

                <div className="mt-2 flex items-center gap-2">

                  <span className="text-lg font-extrabold text-orange-600">
                    Rs. {price.toLocaleString()}
                  </span>

                  {oldPrice > price && (
                    <span className="text-xs text-slate-400 line-through">
                      Rs. {oldPrice.toLocaleString()}
                    </span>
                  )}

                </div>

                {/* PRODUCT BUTTONS */}

                <div className="mt-4 grid grid-cols-2 gap-2">

                  <button
                    onClick={changeProduct}
                    className="rounded-lg bg-orange-500 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600"
                  >
                    Change Product
                  </button>

                  <button
                    onClick={clearProduct}
                    className="rounded-lg border border-slate-200 py-2.5 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Clear Product
                  </button>

                </div>

              </div>

            </div>

          ) : (

            <button
              onClick={changeProduct}
              className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-200 py-8 text-center transition hover:border-orange-300 hover:bg-orange-50"
            >

              <div className="text-3xl">
                👕
              </div>

              <p className="mt-2 text-sm font-bold text-slate-800">
                Select a Product
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Browse Velora products
              </p>

            </button>

          )}

        </div>

        {/* Try On */}

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">

          <h3 className="text-lg font-bold text-slate-900">
            3. Try It On
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-600">
            Once your photo and product are selected, start your
            virtual try-on.
          </p>

          <button
            onClick={handleTryOn}
            disabled={!selectedProduct || !userPhoto}
            className={`mt-4 w-full rounded-xl py-3.5 text-sm font-extrabold transition ${
              selectedProduct && userPhoto
                ? "bg-orange-500 text-white shadow-sm hover:bg-orange-600"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            ✨ Try It On
          </button>

          {!selectedProduct && (
            <p className="mt-2 text-center text-[11px] text-slate-500">
              Select a product first
            </p>
          )}

          {selectedProduct && !userPhoto && (
            <p className="mt-2 text-center text-[11px] text-slate-500">
              Upload your photo first
            </p>
          )}

        </div>

        {/* Buy */}

        {selectedProduct && (

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-end justify-between gap-3">

              <div>

                <p className="text-xs font-semibold text-slate-500">
                  Selected Product
                </p>

                <p className="mt-1 line-clamp-2 text-sm font-bold text-slate-900">
                  {selectedProduct.name || "Product"}
                </p>

              </div>

              <p className="whitespace-nowrap text-lg font-extrabold text-orange-600">
                Rs. {price.toLocaleString()}
              </p>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  alert("Add to Cart connected here.")
                }
                className="rounded-xl border border-orange-200 bg-orange-50 py-3 text-sm font-bold text-orange-600 transition hover:bg-orange-100"
              >
                Add to Cart
              </button>

              <Link
                href="/cart"
                className="rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Buy Now
              </Link>

            </div>

          </div>

        )}

      </aside>

    </div>

  </section>

  {/* ================================================= */}
  {/* PRODUCT SELECTOR */}
  {/* ================================================= */}

  {showProducts && (

    <section className="border-t border-slate-200 bg-white px-4 py-10">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Choose Your Product
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              Select Something to Try
            </h2>

          </div>

          <div className="relative w-full sm:w-72">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            />

          </div>

        </div>

        {filteredProducts.length > 0 ? (

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {filteredProducts.map((product) => (

              <button
                key={product.id}
                onClick={() => selectProduct(product)}
                className={`group overflow-hidden rounded-2xl border bg-white text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  selectedProduct?.id === product.id
                    ? "border-orange-500 ring-2 ring-orange-100"
                    : "border-slate-200"
                }`}
              >

                <div className="relative aspect-square overflow-hidden bg-slate-100">

                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  )}

                  {Number(product.discount) > 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                      {product.discount}% OFF
                    </span>
                  )}

                </div>

                <div className="p-3">

                  <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold text-slate-900">
                    {product.name || "Product"}
                  </h3>

                  {product.color && (
                    <p className="mt-1 text-xs text-slate-500">
                      {product.color}
                    </p>
                  )}

                  <div className="mt-2">

                    <span className="text-sm font-extrabold text-orange-600">
                      Rs.{" "}
                      {Number(
                        product.price || 0
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="mt-3 rounded-lg bg-orange-50 py-2 text-center text-xs font-bold text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                    Try This Product
                  </div>

                </div>

              </button>

            ))}

          </div>

        ) : (

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 py-16 text-center">

            <div className="text-4xl">
              🔍
            </div>

            <h3 className="mt-3 text-lg font-bold text-slate-900">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try another product name or category.
            </p>

          </div>

        )}

      </div>

    </section>

  )}

  {/* ================================================= */}
  {/* PRIVACY NOTE */}
  {/* ================================================= */}

  <section className="mx-auto max-w-7xl px-4 pb-10">

    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">

      <p className="text-xs leading-5 text-slate-500">
        🔒 Your uploaded photo is used only for the try-on experience
        on this page. A production version should process images
        securely through your backend/AI service.
      </p>

    </div>

  </section>

</main>


);
}

/* ================================================= */
/* STEP COMPONENT */
/* ================================================= */

function Step({ number, title, text }) {
return ( <div className="flex items-center gap-4 px-5 py-5 sm:px-8">


  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-black text-orange-600">
    {number}
  </div>

  <div>

    <h3 className="text-sm font-bold text-slate-900">
      {title}
    </h3>

    <p className="mt-1 text-xs text-slate-500">
      {text}
    </p>

  </div>

</div>


);
}
