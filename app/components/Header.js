"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryRef = useRef(null);
  const mobileCategoryRef = useRef(null);
  const desktopMenuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Trending", href: "/trending" },
    { name: "Deals", href: "/deals", deal: true },
    { name: "Build Your Look", href: "/build-your-look" },
    { name: "About", href: "/about" },
    { name: "Help Center", href: "/help-center" },
  ];

  // ================= ALL CATEGORIES =================
  const categories = [
    {
      name: "Clothing",
      description: "Men, women & kids fashion",
      items: [
        { name: "Men's Clothes" },
        { name: "Women's Clothes" },
        { name: "Kids' Clothes" },
        { name: "Shalwar Kameez" },
        { name: "T-Shirts" },
        { name: "Shirts" },
        { name: "Pants & Trousers" },
        { name: "Dresses" },
        { name: "Abayas & Hijabs" },
        { name: "Kurtas" },
        { name: "Jeans" },
        { name: "Jackets & Coats" },
        { name: "Unstitched Fabric" },
        { name: "Sleepwear" },
        { name: "Sportswear" },
      ],
    },

    {
      name: "Beauty & Skincare",
      description: "Makeup & personal care",
      items: [
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
      description: "Elegant jewellery & accessories",
      items: [
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
      description: "Men's & women's watches",
      items: [
        { name: "Men's Watches" },
        { name: "Women's Watches" },
        { name: "Classic Watches" },
        { name: "Smart Watches" },
      ],
    },

    {
      name: "Perfumes",
      description: "Fragrances for everyone",
      items: [
        { name: "Men's Perfumes" },
        { name: "Women's Perfumes" },
        { name: "Perfumes" },
        { name: "Body Sprays" },
      ],
    },

    {
      name: "Bags & Wallets",
      description: "Bags, wallets & clutches",
      items: [
        { name: "Handbags" },
        { name: "Backpacks" },
        { name: "Wallets" },
        { name: "Clutches" },
        { name: "Crossbody Bags" },
      ],
    },

    {
      name: "Shoes",
      description: "Footwear for all ages",
      items: [
        { name: "Men's Shoes" },
        { name: "Women's Shoes" },
        { name: "Kids' Shoes" },
        { name: "Sneakers" },
        { name: "Sandals" },
      ],
    },

    {
      name: "Accessories",
      description: "Complete your look",
      items: [
        { name: "Sunglasses" },
        { name: "Belts" },
        { name: "Caps & Hats" },
        { name: "Accessories" },
      ],
    },
  ];

  // ================= SEARCH =================
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/");
    } else {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }

    setMobileMenu(false);
    setSearchOpen(false);
  };

  // ================= CATEGORY CLICK =================
  const handleCategoryClick = (categoryName, subCategoryName = "") => {
    const params = new URLSearchParams();

    if (categoryName === "Clothing") {
      if (subCategoryName === "Men's Clothes") {
        params.set("category", "Men");
      } else if (subCategoryName === "Women's Clothes") {
        params.set("category", "Women");
      } else if (subCategoryName === "Kids' Clothes") {
        params.set("category", "Kids");
      } else if (subCategoryName) {
        params.set("subcategory", subCategoryName);
      } else {
        params.set("category", "Men");
      }
    } else {
      params.set("category", categoryName);

      if (subCategoryName) {
        params.set("subcategory", subCategoryName);
      }
    }

    router.push(`/categories?${params.toString()}`);

    setCategoryOpen(false);
    setActiveCategory(null);
    setDesktopMenu(false);
    setMobileMenu(false);
    setSearchOpen(false);
  };

  // ================= CLOSE DROPDOWNS ON OUTSIDE CLICK =================
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideDesktopCategory =
        categoryRef.current?.contains(event.target);

      const clickedInsideMobileCategory =
        mobileCategoryRef.current?.contains(event.target);

      const clickedInsideDesktopMenu =
        desktopMenuRef.current?.contains(event.target);

      if (!clickedInsideDesktopCategory && !clickedInsideMobileCategory) {
        setCategoryOpen(false);
        setActiveCategory(null);
      }

      if (!clickedInsideDesktopMenu) {
        setDesktopMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeDesktopMenu = () => {
    setDesktopMenu(false);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setCategoryOpen(false);
    setActiveCategory(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDesktopMenu(false);
  };

  const handleDemoSignup = () => {
    setIsLoggedIn(true);
    setDesktopMenu(false);
    setMobileMenu(false);
  };

  const handleMobileSignup = () => {
    setIsLoggedIn(true);
    closeMobileMenu();
  };

  const handleMobileLogout = () => {
    setIsLoggedIn(false);
    closeMobileMenu();
  };

  const toggleCategory = (name) => {
    setActiveCategory((prev) => (prev === name ? null : name));
  };

  const closeCategories = () => {
    setCategoryOpen(false);
    setActiveCategory(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* ================= MARQUEE ================= */}
      <style jsx>{`
        @keyframes veloraMarquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .velora-marquee {
          animation: veloraMarquee 30s linear infinite;
          white-space: nowrap;
          width: max-content;
        }

        .velora-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ================= TOP BAR ================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FF6A00] via-[#FF6A00] to-[#F97316] text-white">
        <div className="flex h-11 items-center overflow-hidden">
          <div className="velora-marquee flex shrink-0 items-center text-[14px] font-bold">
            <div className="flex shrink-0 items-center gap-8 pr-8">
              <span>✨ Welcome to Velora — Value • Aura</span>
              <span>🚚 Fast Delivery • Secure Shopping</span>
              <span>🛍️ Discover New Styles Every Day</span>
              <span>🔥 Hot Deals & Amazing Prices</span>
              <span>💙 Shop Smart. Shop Velora.</span>
            </div>

            <div className="flex shrink-0 items-center gap-8 pr-8">
              <span>✨ Welcome to Velora — Value • Aura</span>
              <span>🚚 Fast Delivery • Secure Shopping</span>
              <span>🛍️ Discover New Styles Every Day</span>
              <span>🔥 Hot Deals & Amazing Prices</span>
              <span>💙 Shop Smart. Shop Velora.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <div className="border-b border-gray-100 bg-white">
        <div className="flex h-[82px] w-full items-center gap-5 px-4 sm:px-6 lg:px-8">
          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setSearchOpen(false);
            }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00] lg:hidden"
            aria-label="Open menu"
          >
            {mobileMenu ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* LOGO */}
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#FF6A00] shadow-md shadow-orange-200 transition duration-300 group-hover:scale-105">
              <span className="text-[24px] font-black italic text-white">
                V
              </span>

              <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#18B7E8]" />
            </div>

            <div className="hidden leading-none sm:block">
              <div className="text-[29px] font-extrabold tracking-tight text-[#1F2937]">
                <span className="text-[#FF6A00]">V</span>elora
              </div>

              <div className="mt-1 text-[10px] font-bold tracking-[0.28em] text-gray-400">
                VALUE • AURA
              </div>
            </div>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden min-w-0 flex-1 lg:block">
            <form
              onSubmit={handleSearch}
              className="mx-auto flex h-[52px] w-full overflow-hidden rounded-xl border border-gray-200 bg-[#F7F8FA] transition focus-within:border-[#FF6A00] focus-within:bg-white focus-within:shadow-sm"
            >
              <div className="flex items-center pl-4 text-[#18B7E8]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="min-w-0 flex-1 bg-transparent px-3 text-[16px] text-gray-800 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="m-1 flex min-w-[105px] items-center justify-center rounded-lg bg-[#FF6A00] px-5 text-[16px] font-bold text-white transition hover:bg-[#E85B00] active:scale-95"
              >
                Search
              </button>
            </form>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href="/wishlist"
              className="group flex h-[52px] w-[52px] items-center justify-center rounded-xl text-[#EC4899] transition hover:bg-pink-50"
              title="Wishlist"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
              </svg>
            </Link>

            <Link
              href="/cart"
              className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-xl text-[#18B7E8] transition hover:bg-cyan-50"
              title="Cart"
            >
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF6A00] px-1 text-[10px] font-bold text-white ring-2 ring-white">
                0
              </span>
            </Link>

            <Link
              href="/account"
              className="ml-1 flex h-[52px] items-center gap-2 rounded-xl bg-[#FFF3EA] px-3.5 text-gray-700 transition hover:bg-[#FFE6D4]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6A00] text-white">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.8-3.3 3.2-5 7-5s6.2 1.7 7 5" />
                </svg>
              </span>

              <div className="hidden leading-tight xl:block">
                <p className="text-[12px] font-medium text-gray-400">
                  Welcome
                </p>

                <p className="text-[15px] font-bold text-gray-800">
                  Account
                </p>
              </div>
            </Link>
          </div>

          {/* MOBILE SEARCH */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMobileMenu(false);
            }}
            className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF3EA] text-[#FF6A00] lg:hidden"
            aria-label="Search"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>

          {/* MOBILE CART */}
          <Link
            href="/cart"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF3EA] text-[#18B7E8] lg:hidden"
            aria-label="Cart"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF6A00] px-1 text-[9px] font-bold text-white">
              0
            </span>
          </Link>
        </div>

        {/* MOBILE SEARCH */}
        {searchOpen && (
          <div className="border-t border-gray-100 px-4 py-3 lg:hidden">
            <form
              onSubmit={handleSearch}
              className="flex h-[52px] overflow-hidden rounded-xl border border-gray-200 bg-[#F7F8FA] focus-within:border-[#FF6A00]"
            >
              <div className="flex items-center pl-3 text-[#18B7E8]">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
              </div>

              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent px-3 text-[16px] outline-none"
              />

              <button
                type="submit"
                className="bg-[#FF6A00] px-5 text-[15px] font-bold text-white"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ================= DESKTOP NAVIGATION ================= */}
      <div className="hidden border-b border-gray-100 bg-white lg:block">
        <div className="flex h-[55px] w-full items-center px-4 sm:px-6 lg:px-8">
          {/* DESKTOP 3-LINE MENU */}
          <div ref={desktopMenuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setDesktopMenu(!desktopMenu);
                setCategoryOpen(false);
                setActiveCategory(null);
              }}
              className="flex h-[42px] w-[48px] items-center justify-center rounded-lg text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
              aria-label="Open menu"
              title="Menu"
            >
              {desktopMenu ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* DESKTOP MENU DROPDOWN */}
            {desktopMenu && (
              <div className="absolute left-0 top-[50px] z-[60] w-[300px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                <div className="bg-gradient-to-r from-[#FF6A00] to-[#F97316] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-[18px] font-extrabold text-white">
                        Velora Menu
                      </h3>

                      <p className="mt-0.5 text-[12px] text-white/80">
                        Everything you need
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  {!isLoggedIn ? (
                    <button
                      type="button"
                      onClick={handleDemoSignup}
                      className="flex w-full items-center gap-3 rounded-xl bg-orange-50 px-4 py-3 text-left text-[15px] font-bold text-[#FF6A00] transition hover:bg-orange-100"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6A00] text-white">
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="12" cy="8" r="3.5" />
                          <path d="M5 20c.8-3.3 3.2-5 7-5s6.2 1.7 7 5" />
                          <path d="M19 8v6M16 11h6" />
                        </svg>
                      </span>

                      <span>
                        <span className="block">Sign Up</span>
                        <span className="block text-[11px] font-medium text-orange-400">
                          Create your Velora account
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-left text-[15px] font-bold text-red-500 transition hover:bg-red-100"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white">
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M10 17l5-5-5-5" />
                          <path d="M15 12H3" />
                          <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                        </svg>
                      </span>

                      <span>
                        <span className="block">Logout</span>
                        <span className="block text-[11px] font-medium text-red-400">
                          Sign out of your account
                        </span>
                      </span>
                    </button>
                  )}

                  <div className="my-2 border-t border-gray-100" />

                  <Link
                    href="/account"
                    onClick={closeDesktopMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-[#FF6A00]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M5 20c.8-3.3 3.2-5 7-5s6.2 1.7 7 5" />
                      </svg>
                    </span>
                    Account
                  </Link>

                  <Link
                    href="/orders"
                    onClick={closeDesktopMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-500"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M6 3h12v18H6z" />
                        <path d="M9 7h6M9 11h6M9 15h4" />
                      </svg>
                    </span>
                    My Orders
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={closeDesktopMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-pink-50 hover:text-pink-500"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
                      </svg>
                    </span>
                    Wishlist
                  </Link>

                  <Link
                    href="/settings"
                    onClick={closeDesktopMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-purple-50 hover:text-purple-500"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4.4h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 .3 1.9 1.7 1.7 0 0 0 1.5 1Z" />
                      </svg>
                    </span>
                    Settings
                  </Link>

                  <Link
                    href="/help-center"
                    onClick={closeDesktopMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-cyan-50 hover:text-[#18B7E8]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-[#18B7E8]">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9.5 9a2.5 2.5 0 1 1 4.6 1.4c-.8 1-2.1 1.4-2.1 2.8" />
                        <path d="M12 17h.01" />
                      </svg>
                    </span>
                    Help Center
                  </Link>

                  <div className="my-2 border-t border-gray-100" />

                  <Link
                    href="/about"
                    onClick={closeDesktopMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-yellow-50 hover:text-[#D99000]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-[#D99000]">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 10v6" />
                        <path d="M12 7h.01" />
                      </svg>
                    </span>
                    About Velora
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ================= NAVIGATION ================= */}
          <nav className="flex h-full flex-1 items-center justify-center gap-1">
            {navItems.map((item) => {
              if (item.name === "Categories") {
                return (
                  <div
                    key={item.name}
                    ref={categoryRef}
                    className="relative h-full"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryOpen(!categoryOpen);
                        setActiveCategory(null);
                        setDesktopMenu(false);
                      }}
                      className="group relative flex h-full items-center gap-2 rounded-lg px-4 text-[16px] font-semibold text-gray-600 transition hover:bg-orange-50 hover:text-[#FF6A00]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="7"
                            height="7"
                            rx="1"
                          />
                          <rect
                            x="14"
                            y="3"
                            width="7"
                            height="7"
                            rx="1"
                          />
                          <rect
                            x="3"
                            y="14"
                            width="7"
                            height="7"
                            rx="1"
                          />
                          <rect
                            x="14"
                            y="14"
                            width="7"
                            height="7"
                            rx="1"
                          />
                        </svg>
                      </span>

                      Categories

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform duration-200 ${
                          categoryOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>

                      <span className="absolute bottom-0 left-4 right-4 h-[3px] origin-center scale-x-0 rounded-full bg-[#FF6A00] transition duration-300 group-hover:scale-x-100" />
                    </button>

                    {categoryOpen && (
                      <div className="absolute left-0 top-full z-50 w-[760px] rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
                          <div>
                            <h3 className="text-[18px] font-extrabold text-gray-800">
                              Shop Categories
                            </h3>

                            <p className="mt-1 text-[13px] text-gray-400">
                              Choose a category to explore products
                            </p>
                          </div>

                          <Link
                            href="/categories"
                            onClick={closeCategories}
                            className="rounded-lg bg-[#FFF3EA] px-3 py-2 text-[13px] font-bold text-[#FF6A00] transition hover:bg-[#FFE6D4]"
                          >
                            View All
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((category) => {
                            const isActive =
                              activeCategory === category.name;

                            return (
                              <div
                                key={category.name}
                                className={`overflow-hidden rounded-xl border transition ${
                                  isActive
                                    ? "border-[#FF6A00] shadow-sm"
                                    : "border-gray-100"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleCategory(category.name)
                                  }
                                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                                    isActive
                                      ? "bg-orange-50"
                                      : "bg-white hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                                      <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                      >
                                        <path d="M6 4h12l2 5-2 11H6L4 9l2-5Z" />
                                        <path d="M9 9a3 3 0 0 0 6 0" />
                                      </svg>
                                    </span>

                                    <span>
                                      <span className="block text-[14px] font-bold text-gray-700">
                                        {category.name}
                                      </span>

                                      <span className="block text-[11px] text-gray-400">
                                        {category.description}
                                      </span>
                                    </span>
                                  </div>

                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`shrink-0 transition-transform ${
                                      isActive ? "rotate-180" : ""
                                    }`}
                                  >
                                    <path d="m6 9 6 6 6-6" />
                                  </svg>
                                </button>

                                {isActive && (
                                  <div className="border-t border-gray-100 bg-[#F7F8FA] p-3">
                                    <div className="grid grid-cols-2 gap-1">
                                      {category.items.map((subCategory) => (
                                        <button
                                          key={subCategory.name}
                                          type="button"
                                          onClick={() =>
                                            handleCategoryClick(
                                              category.name,
                                              subCategory.name
                                            )
                                          }
                                          className="rounded-lg px-3 py-2.5 text-left text-[12px] font-semibold text-gray-600 transition hover:bg-white hover:text-[#FF6A00]"
                                        >
                                          {subCategory.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <Link
                          href="/categories"
                          onClick={closeCategories}
                          className="mt-4 flex items-center justify-center rounded-xl bg-[#FF6A00] py-3 text-[14px] font-bold text-white transition hover:bg-[#E85B00]"
                        >
                          Explore All Categories →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setCategoryOpen(false);
                    setActiveCategory(null);
                    setDesktopMenu(false);
                  }}
                  className={`group relative flex h-full items-center gap-2 rounded-lg px-4 text-[16px] font-semibold transition hover:bg-gray-50 ${
                    item.deal
                      ? "text-[#FF6A00]"
                      : "text-gray-600 hover:text-[#FF6A00]"
                  }`}
                >
                  {item.name === "Home" && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="m3 10 9-7 9 7" />
                        <path d="M5 9v11h14V9" />
                        <path d="M9 20v-6h6v6" />
                      </svg>
                    </span>
                  )}

                  {item.name === "Shop" && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M5 8h14l1 13H4L5 8Z" />
                        <path d="M8 8a4 4 0 0 1 8 0" />
                      </svg>
                    </span>
                  )}

                  {item.name === "New Arrivals" && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
                        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
                      </svg>
                    </span>
                  )}

                  {item.name === "Trending" && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M13 2s1 4-2 7c-1.5 1.5-2 3-1 5 0 0-4-2-4-6-3 3-4 7-2 11 2 4 6 5 8 5 5 0 9-3 9-9 0-4-2-7-8-13Z" />
                      </svg>
                    </span>
                  )}

                  {item.deal && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13 2 4 14h6l-1 8 9-13h-6l1-7Z" />
                      </svg>
                    </span>
                  )}

                  {/* BUILD YOUR LOOK */}
                  {item.name === "Build Your Look" && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M12 3v18" />
                        <path d="M5 7h14" />
                        <path d="M7 7v5" />
                        <path d="M17 7v5" />
                        <path d="M4 12h6" />
                        <path d="M14 12h6" />
                        <path d="M8 12v7" />
                        <path d="M16 12v7" />
                      </svg>
                    </span>
                  )}

                  {item.name}

                  <span className="absolute bottom-0 left-4 right-4 h-[3px] origin-center scale-x-0 rounded-full bg-[#FF6A00] transition duration-300 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </nav>

          {/* NAV RIGHT BADGE */}
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#FFF8D9] px-4 py-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-[#D99000]">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="8" />
              </svg>
            </span>

            <span className="text-[14px] font-bold text-[#D99000]">
              Hot Deals Every Day
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ======================= MOBILE MENU ==================== */}
      {/* ========================================================= */}

      {mobileMenu && (
        <div className="max-h-[calc(100vh-125px)] overflow-y-auto border-t border-gray-100 bg-white shadow-xl lg:hidden">
          <div className="px-4 py-4">
            {/* MOBILE MENU HEADER */}
            <div className="mb-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#FF6A00] to-[#F97316] px-4 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>

                <div>
                  <p className="text-[17px] font-extrabold">Velora Menu</p>

                  <p className="text-[11px] text-white/80">
                    Everything you need
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 transition hover:bg-white/25"
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* ================= MOBILE ACCOUNT ================= */}
            <div className="mb-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
              <div className="mb-2 flex items-center gap-2 px-1">
                <span className="text-[13px] font-extrabold uppercase tracking-wide text-gray-500">
                  My Account
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* ACCOUNT */}
                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-xl bg-orange-50 px-2 py-3 text-[#FF6A00] transition active:scale-[0.98]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.8-3.3 3.2-5 7-5s6.2 1.7 7 5" />
                    </svg>
                  </span>

                  <span className="text-[13px] font-bold">Account</span>
                </Link>

                {/* WISHLIST */}
                <Link
                  href="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-xl bg-pink-50 px-2 py-3 text-pink-500 transition active:scale-[0.98]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M20.8 8.8c0 5.4-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
                    </svg>
                  </span>

                  <span className="text-[13px] font-bold">Wishlist</span>
                </Link>

                {/* CART */}
                <Link
                  href="/cart"
                  onClick={closeMobileMenu}
                  className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-xl bg-cyan-50 px-2 py-3 text-[#18B7E8] transition active:scale-[0.98]"
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
                      <circle cx="9" cy="20" r="1" />
                      <circle cx="18" cy="20" r="1" />
                    </svg>

                    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF6A00] px-1 text-[8px] font-bold text-white">
                      0
                    </span>
                  </span>

                  <span className="text-[13px] font-bold">Cart</span>
                </Link>
              </div>
            </div>

            {/* ================= MAIN NAVIGATION ================= */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-[13px] font-extrabold uppercase tracking-wide text-gray-500">
                  Navigation
                </p>
              </div>

              <nav>
                {navItems.map((item) => {
                  /* MOBILE CATEGORIES */
                  if (item.name === "Categories") {
                    return (
                      <div key={item.name} ref={mobileCategoryRef}>
                        <button
                          type="button"
                          onClick={() => {
                            setCategoryOpen(!categoryOpen);
                            setActiveCategory(null);
                          }}
                          className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-4 text-left text-[15px] font-bold text-gray-700 transition active:bg-orange-50"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="7"
                                  height="7"
                                  rx="1"
                                />
                                <rect
                                  x="14"
                                  y="3"
                                  width="7"
                                  height="7"
                                  rx="1"
                                />
                                <rect
                                  x="3"
                                  y="14"
                                  width="7"
                                  height="7"
                                  rx="1"
                                />
                                <rect
                                  x="14"
                                  y="14"
                                  width="7"
                                  height="7"
                                  rx="1"
                                />
                              </svg>
                            </span>

                            Categories
                          </span>

                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-transform duration-200 ${
                              categoryOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        {categoryOpen && (
                          <div className="border-b border-gray-100 bg-[#F7F8FA] p-3">
                            <div className="space-y-2">
                              {categories.map((category) => {
                                const isActive =
                                  activeCategory === category.name;

                                return (
                                  <div
                                    key={category.name}
                                    className="overflow-hidden rounded-xl border border-gray-100 bg-white"
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleCategory(category.name)
                                      }
                                      className={`flex w-full items-center justify-between px-3 py-3.5 text-left transition ${
                                        isActive
                                          ? "bg-orange-50"
                                          : "bg-white"
                                      }`}
                                    >
                                      <span className="flex min-w-0 items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                                          <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                          >
                                            <path d="M6 4h12l2 5-2 11H6L4 9l2-5Z" />
                                            <path d="M9 9a3 3 0 0 0 6 0" />
                                          </svg>
                                        </span>

                                        <span className="min-w-0">
                                          <span className="block truncate text-[14px] font-bold text-gray-700">
                                            {category.name}
                                          </span>

                                          <span className="mt-0.5 block truncate text-[11px] text-gray-400">
                                            {category.description}
                                          </span>
                                        </span>
                                      </span>

                                      <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className={`shrink-0 transition-transform ${
                                          isActive ? "rotate-180" : ""
                                        }`}
                                      >
                                        <path d="m6 9 6 6 6-6" />
                                      </svg>
                                    </button>

                                    {isActive && (
                                      <div className="border-t border-gray-100 bg-gray-50 p-2">
                                        <div className="grid grid-cols-2 gap-1.5">
                                          {category.items.map(
                                            (subCategory) => (
                                              <button
                                                key={subCategory.name}
                                                type="button"
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category.name,
                                                    subCategory.name
                                                  )
                                                }
                                                className="rounded-lg bg-white px-3 py-3 text-left text-[12px] font-semibold text-gray-600 shadow-sm transition active:bg-orange-50 active:text-[#FF6A00]"
                                              >
                                                {subCategory.name}
                                              </button>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <Link
                              href="/categories"
                              onClick={closeMobileMenu}
                              className="mt-3 block rounded-xl bg-[#FF6A00] py-3.5 text-center text-[14px] font-bold text-white"
                            >
                              View All Categories
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between border-b border-gray-100 px-4 py-4 text-[15px] font-bold transition active:bg-orange-50 ${
                        item.deal ? "text-[#FF6A00]" : "text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {/* HOME */}
                        {item.name === "Home" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="m3 10 9-7 9 7" />
                              <path d="M5 9v11h14V9" />
                              <path d="M9 20v-6h6v6" />
                            </svg>
                          </span>
                        )}

                        {/* SHOP */}
                        {item.name === "Shop" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M5 8h14l1 13H4L5 8Z" />
                              <path d="M8 8a4 4 0 0 1 8 0" />
                            </svg>
                          </span>
                        )}

                        {/* NEW ARRIVALS */}
                        {item.name === "New Arrivals" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
                              <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
                            </svg>
                          </span>
                        )}

                        {/* TRENDING */}
                        {item.name === "Trending" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M13 2s1 4-2 7c-1.5 1.5-2 3-1 5 0 0-4-2-4-6-3 3-4 7-2 11 2 4 6 5 8 5 5 0 9-3 9-9 0-4-2-7-8-13Z" />
                            </svg>
                          </span>
                        )}

                        {/* DEALS */}
                        {item.deal && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#FF6A00]">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M13 2 4 14h6l-1 8 9-13h-6l1-7Z" />
                            </svg>
                          </span>
                        )}

                        {/* BUILD YOUR LOOK */}
                        {item.name === "Build Your Look" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M12 3v18" />
                              <path d="M5 7h14" />
                              <path d="M7 7v5" />
                              <path d="M17 7v5" />
                              <path d="M4 12h6" />
                              <path d="M14 12h6" />
                              <path d="M8 12v7" />
                              <path d="M16 12v7" />
                            </svg>
                          </span>
                        )}

                        {/* ABOUT */}
                        {item.name === "About" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-[#D99000]">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 10v6" />
                              <path d="M12 7h.01" />
                            </svg>
                          </span>
                        )}

                        {/* HELP CENTER */}
                        {item.name === "Help Center" && (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-[#18B7E8]">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <circle cx="12" cy="12" r="9" />
                              <path d="M9.5 9a2.5 2.5 0 1 1 4.6 1.4c-.8 1-2.1 1.4-2.1 2.8" />
                              <path d="M12 17h.01" />
                            </svg>
                          </span>
                        )}

                        {item.name}
                      </span>

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-400"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ================= MOBILE EXTRA ACCOUNT OPTIONS ================= */}
            <div className="mt-3 rounded-2xl border border-gray-100 bg-gray-50 p-3">
              <div className="mb-2 px-1">
                <p className="text-[13px] font-extrabold uppercase tracking-wide text-gray-500">
                  Quick Access
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* MY ORDERS */}
                <Link
                  href="/orders"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3.5 text-blue-500 transition active:scale-[0.98]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M6 3h12v18H6z" />
                      <path d="M9 7h6M9 11h6M9 15h4" />
                    </svg>
                  </span>

                  <span className="text-[13px] font-bold">My Orders</span>
                </Link>

                {/* SETTINGS */}
                <Link
                  href="/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-purple-50 px-3 py-3.5 text-purple-500 transition active:scale-[0.98]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4.4h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1Z" />
                    </svg>
                  </span>

                  <span className="text-[13px] font-bold">Settings</span>
                </Link>
              </div>
            </div>

            {/* ================= MOBILE SIGN UP / LOGOUT ================= */}
            {!isLoggedIn ? (
              <button
                type="button"
                onClick={handleMobileSignup}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] py-4 text-[15px] font-extrabold text-white shadow-sm transition active:scale-[0.99]"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.8-3.3 3.2-5 7-5s6.2 1.7 7 5" />
                  <path d="M19 8v6M16 11h6" />
                </svg>

                Create Account
              </button>
            ) : (
              <button
                type="button"
                onClick={handleMobileLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-4 text-[15px] font-extrabold text-red-500 transition active:scale-[0.99]"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                </svg>

                Logout
              </button>
            )}

            {/* ================= MOBILE BOTTOM BANNER ================= */}
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#18B7E8] to-[#159BD0] px-4 py-4 text-white">
              <div>
                <p className="text-[13px] font-medium opacity-90">
                  Shop smarter with
                </p>

                <p className="text-[19px] font-extrabold">Velora</p>
              </div>

              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}