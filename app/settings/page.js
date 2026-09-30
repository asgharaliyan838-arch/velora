"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const COUNTRIES = [
  { name: "Afghanistan", currency: "AFN", symbol: "؋" },
  { name: "Albania", currency: "ALL", symbol: "L" },
  { name: "Algeria", currency: "DZD", symbol: "دج" },
  { name: "Argentina", currency: "ARS", symbol: "$" },
  { name: "Australia", currency: "AUD", symbol: "$" },
  { name: "Austria", currency: "EUR", symbol: "€" },
  { name: "Bahrain", currency: "BHD", symbol: ".د.ب" },
  { name: "Bangladesh", currency: "BDT", symbol: "৳" },
  { name: "Belgium", currency: "EUR", symbol: "€" },
  { name: "Brazil", currency: "BRL", symbol: "R$" },
  { name: "Canada", currency: "CAD", symbol: "$" },
  { name: "China", currency: "CNY", symbol: "¥" },
  { name: "Denmark", currency: "DKK", symbol: "kr" },
  { name: "Egypt", currency: "EGP", symbol: "E£" },
  { name: "Finland", currency: "EUR", symbol: "€" },
  { name: "France", currency: "EUR", symbol: "€" },
  { name: "Germany", currency: "EUR", symbol: "€" },
  { name: "Greece", currency: "EUR", symbol: "€" },
  { name: "Hong Kong", currency: "HKD", symbol: "$" },
  { name: "India", currency: "INR", symbol: "₹" },
  { name: "Indonesia", currency: "IDR", symbol: "Rp" },
  { name: "Ireland", currency: "EUR", symbol: "€" },
  { name: "Italy", currency: "EUR", symbol: "€" },
  { name: "Japan", currency: "JPY", symbol: "¥" },
  { name: "Jordan", currency: "JOD", symbol: "د.ا" },
  { name: "Kenya", currency: "KES", symbol: "KSh" },
  { name: "Kuwait", currency: "KWD", symbol: "د.ك" },
  { name: "Malaysia", currency: "MYR", symbol: "RM" },
  { name: "Mexico", currency: "MXN", symbol: "$" },
  { name: "Morocco", currency: "MAD", symbol: "د.م." },
  { name: "Netherlands", currency: "EUR", symbol: "€" },
  { name: "New Zealand", currency: "NZD", symbol: "$" },
  { name: "Nigeria", currency: "NGN", symbol: "₦" },
  { name: "Norway", currency: "NOK", symbol: "kr" },
  { name: "Oman", currency: "OMR", symbol: "ر.ع." },
  { name: "Pakistan", currency: "PKR", symbol: "₨" },
  { name: "Philippines", currency: "PHP", symbol: "₱" },
  { name: "Poland", currency: "PLN", symbol: "zł" },
  { name: "Portugal", currency: "EUR", symbol: "€" },
  { name: "Qatar", currency: "QAR", symbol: "ر.ق" },
  { name: "Romania", currency: "RON", symbol: "lei" },
  { name: "Russia", currency: "RUB", symbol: "₽" },
  { name: "Saudi Arabia", currency: "SAR", symbol: "﷼" },
  { name: "Singapore", currency: "SGD", symbol: "$" },
  { name: "South Africa", currency: "ZAR", symbol: "R" },
  { name: "South Korea", currency: "KRW", symbol: "₩" },
  { name: "Spain", currency: "EUR", symbol: "€" },
  { name: "Sri Lanka", currency: "LKR", symbol: "Rs" },
  { name: "Sweden", currency: "SEK", symbol: "kr" },
  { name: "Switzerland", currency: "CHF", symbol: "CHF" },
  { name: "Thailand", currency: "THB", symbol: "฿" },
  { name: "Turkey", currency: "TRY", symbol: "₺" },
  { name: "United Arab Emirates", currency: "AED", symbol: "د.إ" },
  { name: "United Kingdom", currency: "GBP", symbol: "£" },
  { name: "United States", currency: "USD", symbol: "$" },
  { name: "Vietnam", currency: "VND", symbol: "₫" },
];

const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
];

const DEFAULT_SETTINGS = {
  notifications: true,
  emailNotifications: true,
  orderUpdates: true,
  offers: true,
  darkMode: false,
  language: "en",
  currency: "PKR",
  country: "Pakistan",
  sorting: "Featured",
};

const TEXT = {
  en: {
    settings: "Settings",
    subtitle: "Manage your Velora account and preferences",
    account: "Account",
    notifications: "Notifications",
    appearance: "Appearance",
    preferences: "Preferences",
    privacy: "Privacy & Security",
    backHome: "Back to Home",

    accountInfo: "Account Information",
    accountInfoDesc: "View and update your name, email and account details",
    wishlist: "Wishlist",
    wishlistDesc: "Manage your saved products",
    cart: "Shopping Cart",
    cartDesc: "View products currently in your cart",

    notificationsDesc: "Choose which notifications you want to receive",
    enableNotifications: "Notifications",
    enableNotificationsDesc: "Enable or disable Velora notifications",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive important updates through email",
    orderUpdates: "Order Updates",
    orderUpdatesDesc: "Get updates about your orders and delivery",
    offers: "Offers & Promotions",
    offersDesc: "Receive new deals, discounts and special offers",

    appearanceDesc: "Customize how Velora looks",
    darkMode: "Dark Mode",
    darkModeDesc: "Use a darker appearance across the website",

    preferencesDesc: "Set your shopping preferences",
    language: "Language",
    currency: "Currency",
    country: "Country / Region",
    sorting: "Product Sorting",

    privacyDesc: "Keep your account and personal information secure",
    password: "Change Password",
    passwordDesc: "Update your account password",
    privacySettings: "Privacy Settings",
    privacySettingsDesc: "Manage your privacy preferences",
    delete: "Delete Account",
    deleteDesc: "Permanently delete your Velora account",

    signOut: "Sign Out",
    signOutDesc: "Sign out from your Velora account on this device.",
    cancel: "Cancel",
    confirmSignOut: "Are you sure you want to sign out?",
    yesSignOut: "Yes, Sign Out",
    save: "Save Changes",
    saved: "Saved",
    deleteWarning:
      "This action cannot be undone. Your account and associated data may be permanently removed.",
  },

  ur: {
    settings: "ترتیبات",
    subtitle: "اپنے Velora اکاؤنٹ اور ترجیحات کو مینیج کریں",
    account: "اکاؤنٹ",
    notifications: "اطلاعات",
    appearance: "ظاہری شکل",
    preferences: "ترجیحات",
    privacy: "پرائیویسی اور سیکیورٹی",
    backHome: "ہوم پر واپس جائیں",

    accountInfo: "اکاؤنٹ کی معلومات",
    accountInfoDesc: "اپنا نام، ای میل اور اکاؤنٹ کی معلومات دیکھیں اور اپڈیٹ کریں",
    wishlist: "پسندیدہ اشیاء",
    wishlistDesc: "اپنی محفوظ کی ہوئی مصنوعات مینیج کریں",
    cart: "شاپنگ کارٹ",
    cartDesc: "اپنی کارٹ میں موجود مصنوعات دیکھیں",

    notificationsDesc: "منتخب کریں کہ آپ کون سی اطلاعات وصول کرنا چاہتے ہیں",
    enableNotifications: "اطلاعات",
    enableNotificationsDesc: "Velora کی اطلاعات کو آن یا آف کریں",
    emailNotifications: "ای میل اطلاعات",
    emailNotificationsDesc: "اہم اپڈیٹس ای میل کے ذریعے حاصل کریں",
    orderUpdates: "آرڈر اپڈیٹس",
    orderUpdatesDesc: "اپنے آرڈر اور ڈیلیوری کی اپڈیٹس حاصل کریں",
    offers: "آفرز اور پروموشنز",
    offersDesc: "نئی ڈیلز، ڈسکاؤنٹس اور خصوصی آفرز حاصل کریں",

    appearanceDesc: "Velora کی ظاہری شکل کو تبدیل کریں",
    darkMode: "ڈارک موڈ",
    darkModeDesc: "پوری ویب سائٹ کو ڈارک موڈ میں استعمال کریں",

    preferencesDesc: "اپنی شاپنگ ترجیحات سیٹ کریں",
    language: "زبان",
    currency: "کرنسی",
    country: "ملک / علاقہ",
    sorting: "مصنوعات کی ترتیب",

    privacyDesc: "اپنے اکاؤنٹ اور ذاتی معلومات کو محفوظ رکھیں",
    password: "پاس ورڈ تبدیل کریں",
    passwordDesc: "اپنے اکاؤنٹ کا پاس ورڈ اپڈیٹ کریں",
    privacySettings: "پرائیویسی سیٹنگز",
    privacySettingsDesc: "اپنی پرائیویسی ترجیحات مینیج کریں",
    delete: "اکاؤنٹ ڈیلیٹ کریں",
    deleteDesc: "اپنا Velora اکاؤنٹ مستقل طور پر ڈیلیٹ کریں",

    signOut: "سائن آؤٹ",
    signOutDesc: "اس ڈیوائس سے اپنے Velora اکاؤنٹ سے سائن آؤٹ کریں۔",
    cancel: "منسوخ",
    confirmSignOut: "کیا آپ واقعی سائن آؤٹ کرنا چاہتے ہیں؟",
    yesSignOut: "ہاں، سائن آؤٹ کریں",
    save: "تبدیلیاں محفوظ کریں",
    saved: "محفوظ ہو گیا",
    deleteWarning:
      "یہ عمل واپس نہیں کیا جا سکتا۔ آپ کا اکاؤنٹ اور متعلقہ ڈیٹا مستقل طور پر حذف ہو سکتا ہے۔",
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedSettings = localStorage.getItem("veloraSettings");

      if (savedSettings) {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...JSON.parse(savedSettings),
        });
      }
    } catch {
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  const languageText = useMemo(() => {
    return TEXT[settings.language] || TEXT.en;
  }, [settings.language]);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("veloraSettings", JSON.stringify(settings));

    document.documentElement.classList.toggle(
      "dark",
      Boolean(settings.darkMode)
    );

    document.documentElement.lang = settings.language;

    document.documentElement.dir =
      settings.language === "ur" ||
      settings.language === "ar"
        ? "rtl"
        : "ltr";

    window.dispatchEvent(
      new CustomEvent("velora-settings-change", {
        detail: settings,
      })
    );
  }, [settings, mounted]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem("veloraSettings", JSON.stringify(settings));

    window.dispatchEvent(
      new CustomEvent("velora-settings-change", {
        detail: settings,
      })
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const signOut = () => {
    /*
      Agar tum Firebase / Supabase / NextAuth use kar rahe ho,
      yahan uska actual signOut function call karo.

      Abhi local demo authentication keys clear ki ja rahi hain.
    */

    localStorage.removeItem("veloraUser");
    localStorage.removeItem("veloraToken");
    localStorage.removeItem("veloraAuth");
    localStorage.removeItem("veloraCart");
    localStorage.removeItem("veloraWishlist");

    window.dispatchEvent(new Event("velora-auth-change"));

    window.location.href = "/";
  };

  const deleteAccount = () => {
    /*
      Real backend mein yahan API request honi chahiye.
      Example:
      await fetch("/api/account/delete", { method: "DELETE" })

      Frontend-only project mein temporary local account data clear:
    */

    localStorage.removeItem("veloraUser");
    localStorage.removeItem("veloraToken");
    localStorage.removeItem("veloraAuth");
    localStorage.removeItem("veloraCart");
    localStorage.removeItem("veloraWishlist");

    window.location.href = "/";
  };

  const Toggle = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        enabled
          ? "bg-[#FF6A00]"
          : "bg-gray-300 dark:bg-gray-600"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  const Row = ({
    title,
    description,
    children,
    danger = false,
  }) => (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="min-w-0">
        <h3
          className={`text-sm font-bold ${
            danger
              ? "text-red-600"
              : "text-[#172033] dark:text-white"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {children}
    </div>
  );

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f7f8fa] dark:bg-[#0f172a]" />
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#172033] transition-colors dark:bg-[#0b1120] dark:text-white">

      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00] text-xl font-black italic text-white shadow-sm"
            >
              V
            </Link>

            <div>
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                {languageText.settings}
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {languageText.subtitle}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        <div className="grid gap-5 lg:grid-cols-[250px_1fr]">

          {/* SIDEBAR */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]">

            <div className="p-4">

              <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {languageText.settings}
              </p>

              <nav className="mt-3 space-y-1">

                <a
                  href="#account"
                  className="flex items-center gap-3 rounded-xl bg-orange-50 px-3 py-3 text-sm font-bold text-[#FF6A00] dark:bg-orange-950/30"
                >
                  👤
                  {languageText.account}
                </a>

                <a
                  href="#notifications"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-[#FF6A00] dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  🔔
                  {languageText.notifications}
                </a>

                <a
                  href="#appearance"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-[#FF6A00] dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  🎨
                  {languageText.appearance}
                </a>

                <a
                  href="#preferences"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-[#FF6A00] dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  ⚙️
                  {languageText.preferences}
                </a>

                <a
                  href="#privacy"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-[#FF6A00] dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  🔒
                  {languageText.privacy}
                </a>

              </nav>
            </div>

            <div className="border-t border-gray-100 p-4 dark:border-gray-800">

              <Link
                href="/"
                className="flex items-center gap-2 px-2 py-2 text-sm font-bold text-gray-500 transition hover:text-[#FF6A00]"
              >
                ← {languageText.backHome}
              </Link>

            </div>
          </aside>

          {/* SETTINGS */}
          <div className="space-y-5">

            {/* ACCOUNT */}
            <section
              id="account"
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]"
            >
              <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                <h2 className="text-lg font-extrabold">
                  {languageText.account}
                </h2>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">

                <Link
                  href="/account"
                  className="flex items-center justify-between p-5 transition hover:bg-gray-50 dark:hover:bg-gray-800 sm:p-6"
                >
                  <div>
                    <h3 className="text-sm font-bold">
                      {languageText.accountInfo}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {languageText.accountInfoDesc}
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center justify-between p-5 transition hover:bg-gray-50 dark:hover:bg-gray-800 sm:p-6"
                >
                  <div>
                    <h3 className="text-sm font-bold">
                      {languageText.wishlist}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {languageText.wishlistDesc}
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center justify-between p-5 transition hover:bg-gray-50 dark:hover:bg-gray-800 sm:p-6"
                >
                  <div>
                    <h3 className="text-sm font-bold">
                      {languageText.cart}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {languageText.cartDesc}
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </Link>

              </div>
            </section>

            {/* NOTIFICATIONS */}
            <section
              id="notifications"
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]"
            >
              <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-6">

                <h2 className="text-lg font-extrabold">
                  {languageText.notifications}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {languageText.notificationsDesc}
                </p>

              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">

                <Row
                  title={languageText.enableNotifications}
                  description={languageText.enableNotificationsDesc}
                >
                  <Toggle
                    enabled={settings.notifications}
                    onChange={(v) =>
                      updateSetting("notifications", v)
                    }
                  />
                </Row>

                <Row
                  title={languageText.emailNotifications}
                  description={languageText.emailNotificationsDesc}
                >
                  <Toggle
                    enabled={settings.emailNotifications}
                    onChange={(v) =>
                      updateSetting("emailNotifications", v)
                    }
                  />
                </Row>

                <Row
                  title={languageText.orderUpdates}
                  description={languageText.orderUpdatesDesc}
                >
                  <Toggle
                    enabled={settings.orderUpdates}
                    onChange={(v) =>
                      updateSetting("orderUpdates", v)
                    }
                  />
                </Row>

                <Row
                  title={languageText.offers}
                  description={languageText.offersDesc}
                >
                  <Toggle
                    enabled={settings.offers}
                    onChange={(v) =>
                      updateSetting("offers", v)
                    }
                  />
                </Row>

              </div>
            </section>

            {/* APPEARANCE */}
            <section
              id="appearance"
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]"
            >

              <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-6">

                <h2 className="text-lg font-extrabold">
                  {languageText.appearance}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {languageText.appearanceDesc}
                </p>

              </div>

              <Row
                title={languageText.darkMode}
                description={languageText.darkModeDesc}
              >
                <Toggle
                  enabled={settings.darkMode}
                  onChange={(v) =>
                    updateSetting("darkMode", v)
                  }
                />
              </Row>

            </section>

            {/* PREFERENCES */}
            <section
              id="preferences"
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]"
            >

              <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-6">

                <h2 className="text-lg font-extrabold">
                  {languageText.preferences}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {languageText.preferencesDesc}
                </p>

              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                {/* LANGUAGE */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {languageText.language}
                  </label>

                  <select
                    value={settings.language}
                    onChange={(e) =>
                      updateSetting("language", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#FF6A00] dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    {LANGUAGES.map((language) => (
                      <option
                        key={language.code}
                        value={language.code}
                      >
                        {language.native} — {language.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CURRENCY */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {languageText.currency}
                  </label>

                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      updateSetting("currency", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#FF6A00] dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    {Array.from(
                      new Map(
                        COUNTRIES.map((country) => [
                          country.currency,
                          country,
                        ])
                      ).values()
                    ).map((country) => (
                      <option
                        key={country.currency}
                        value={country.currency}
                      >
                        {country.currency} — {country.symbol}
                      </option>
                    ))}
                  </select>
                </div>

                {/* COUNTRY */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {languageText.country}
                  </label>

                  <select
                    value={settings.country}
                    onChange={(e) => {
                      const selected = COUNTRIES.find(
                        (country) =>
                          country.name === e.target.value
                      );

                      setSettings((prev) => ({
                        ...prev,
                        country: e.target.value,
                        currency:
                          selected?.currency || prev.currency,
                      }));

                      setSaved(false);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#FF6A00] dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    {COUNTRIES.map((country) => (
                      <option
                        key={country.name}
                        value={country.name}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SORT */}
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {languageText.sorting}
                  </label>

                  <select
                    value={settings.sorting}
                    onChange={(e) =>
                      updateSetting("sorting", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#FF6A00] dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  >
                    <option value="Featured">
                      Featured
                    </option>

                    <option value="Newest">
                      Newest
                    </option>

                    <option value="Price Low to High">
                      Price Low to High
                    </option>

                    <option value="Price High to Low">
                      Price High to Low
                    </option>

                    <option value="Discount">
                      Discount
                    </option>
                  </select>
                </div>

              </div>

              {/* SAVE */}
              <div className="flex justify-end border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">

                <button
                  type="button"
                  onClick={saveSettings}
                  className="rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98]"
                >
                  {saved ? `✓ ${languageText.saved}` : languageText.save}
                </button>

              </div>

            </section>

            {/* PRIVACY */}
            <section
              id="privacy"
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111827]"
            >

              <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-6">

                <h2 className="text-lg font-extrabold">
                  {languageText.privacy}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {languageText.privacyDesc}
                </p>

              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">

                <button
                  type="button"
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800 sm:p-6"
                >
                  <div>
                    <h3 className="text-sm font-bold">
                      {languageText.password}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {languageText.passwordDesc}
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-gray-50 dark:hover:bg-gray-800 sm:p-6"
                >
                  <div>
                    <h3 className="text-sm font-bold">
                      {languageText.privacySettings}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {languageText.privacySettingsDesc}
                    </p>
                  </div>

                  <span className="text-gray-400">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-red-50 dark:hover:bg-red-950/20 sm:p-6"
                >
                  <div>
                    <h3 className="text-sm font-bold text-red-600">
                      {languageText.delete}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {languageText.deleteDesc}
                    </p>
                  </div>

                  <span className="text-red-400">→</span>
                </button>

              </div>
            </section>

            {/* SIGN OUT */}
            <section className="rounded-2xl border border-red-100 bg-white p-5 dark:border-red-950 dark:bg-[#111827] sm:p-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-sm font-extrabold">
                    {languageText.signOut}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {languageText.signOutDesc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLogout(true)}
                  className="rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                >
                  {languageText.signOut}
                </button>

              </div>
            </section>

          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#111827]">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-950">
              🚪
            </div>

            <h2 className="text-xl font-extrabold">
              {languageText.signOut}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {languageText.confirmSignOut}
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold dark:border-gray-700"
              >
                {languageText.cancel}
              </button>

              <button
                type="button"
                onClick={signOut}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700"
              >
                {languageText.yesSignOut}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#111827]">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-950">
              ⚠️
            </div>

            <h2 className="text-xl font-extrabold text-red-600">
              {languageText.delete}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {languageText.deleteWarning}
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowDelete(false)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold dark:border-gray-700"
              >
                {languageText.cancel}
              </button>

              <button
                type="button"
                onClick={deleteAccount}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700"
              >
                {languageText.delete}
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}