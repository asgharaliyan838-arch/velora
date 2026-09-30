
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Star,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
  Edit3,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  Settings,
  HelpCircle,
  ShoppingBag,
  Camera,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Mail,
  Phone,
  CalendarDays,
  BadgeCheck,
  WalletCards,
  MessageSquare,
} from "lucide-react";

export default function AccountPage() {
  /* --------------------------------
     ACCOUNT STATE
  -------------------------------- */

  const [activeSection, setActiveSection] = useState("overview");

  const [profile, setProfile] = useState({
    name: "Velora User",
    email: "user@example.com",
    phone: "",
    gender: "",
    dateOfBirth: "",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const [editingProfile, setEditingProfile] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [orders, setOrders] = useState([]);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [addresses, setAddresses] = useState([]);

  const [paymentMethods, setPaymentMethods] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [reviewCount, setReviewCount] =
    useState(0);

  const [toast, setToast] = useState("");

  /* --------------------------------
     ADDRESS FORM
  -------------------------------- */

  const emptyAddress = {
    id: "",
    label: "Home",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    isDefault: false,
  };

  const [addressForm, setAddressForm] =
    useState(emptyAddress);

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  /* --------------------------------
     PAYMENT FORM
  -------------------------------- */

  const emptyPayment = {
    id: "",
    type: "Card",
    holderName: "",
    last4: "",
    expiry: "",
    isDefault: false,
  };

  const [paymentForm, setPaymentForm] =
    useState(emptyPayment);

  const [showPaymentForm, setShowPaymentForm] =
    useState(false);

  /* --------------------------------
     LOAD ACCOUNT DATA
  -------------------------------- */

  useEffect(() => {
    try {
      const savedProfile =
        localStorage.getItem("veloraProfile");

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);

        if (parsed && typeof parsed === "object") {
          setProfile((prev) => ({
            ...prev,
            ...parsed,
          }));

          setTempProfile((prev) => ({
            ...prev,
            ...parsed,
          }));
        }
      }

      const savedOrders =
        localStorage.getItem("veloraOrders");

      if (savedOrders) {
        const parsedOrders =
          JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          setOrders(parsedOrders);
        }
      }

      const savedWishlist =
        localStorage.getItem("veloraWishlist");

      if (savedWishlist) {
        const parsedWishlist =
          JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setWishlistCount(
            parsedWishlist.length
          );
        }
      }

      const savedAddresses =
        localStorage.getItem("veloraAddresses");

      if (savedAddresses) {
        const parsedAddresses =
          JSON.parse(savedAddresses);

        if (Array.isArray(parsedAddresses)) {
          setAddresses(parsedAddresses);
        }
      }

      const savedPayments =
        localStorage.getItem(
          "veloraPaymentMethods"
        );

      if (savedPayments) {
        const parsedPayments =
          JSON.parse(savedPayments);

        if (Array.isArray(parsedPayments)) {
          setPaymentMethods(parsedPayments);
        }
      }

      const savedNotifications =
        localStorage.getItem(
          "veloraNotifications"
        );

      if (savedNotifications) {
        const parsedNotifications =
          JSON.parse(savedNotifications);

        if (Array.isArray(parsedNotifications)) {
          setNotifications(parsedNotifications);
        }
      }

      const savedReviews =
        localStorage.getItem("veloraReviews");

      if (savedReviews) {
        const parsedReviews =
          JSON.parse(savedReviews);

        if (Array.isArray(parsedReviews)) {
          setReviewCount(
            parsedReviews.length
          );
        }
      }
    } catch (error) {
      console.error(
        "Account data load error:",
        error
      );
    }
  }, []);

  /* --------------------------------
     SAVE PROFILE
  -------------------------------- */

  const saveProfile = () => {
    try {
      localStorage.setItem(
        "veloraProfile",
        JSON.stringify(tempProfile)
      );

      setProfile(tempProfile);
      setEditingProfile(false);

      showToast("Profile updated successfully.");
    } catch (error) {
      console.error(
        "Profile save error:",
        error
      );
    }
  };

  /* --------------------------------
     PASSWORD
  -------------------------------- */

  const updatePassword = () => {
    setPasswordMessage("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordMessage(
        "Please fill all password fields."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setPasswordMessage(
        "New passwords do not match."
      );
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage(
        "Password should be at least 6 characters."
      );
      return;
    }

    try {
      localStorage.setItem(
        "veloraPassword",
        passwordData.newPassword
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordMessage(
        "Password updated successfully."
      );
    } catch (error) {
      console.error(
        "Password update error:",
        error
      );
    }
  };

  /* --------------------------------
     TOAST
  -------------------------------- */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* --------------------------------
     ADDRESS
  -------------------------------- */

  const openNewAddress = () => {
    setAddressForm({
      ...emptyAddress,
      id: Date.now().toString(),
    });

    setShowAddressForm(true);
  };

  const saveAddress = () => {
    if (
      !addressForm.fullName ||
      !addressForm.phone ||
      !addressForm.address ||
      !addressForm.city
    ) {
      showToast(
        "Please fill the required address fields."
      );
      return;
    }

    try {
      let nextAddresses = [
        ...addresses,
      ];

      if (addressForm.isDefault) {
        nextAddresses =
          nextAddresses.map((item) => ({
            ...item,
            isDefault: false,
          }));
      }

      const existingIndex =
        nextAddresses.findIndex(
          (item) =>
            String(item.id) ===
            String(addressForm.id)
        );

      if (existingIndex !== -1) {
        nextAddresses[
          existingIndex
        ] = addressForm;
      } else {
        nextAddresses.push(addressForm);
      }

      localStorage.setItem(
        "veloraAddresses",
        JSON.stringify(nextAddresses)
      );

      setAddresses(nextAddresses);
      setShowAddressForm(false);
      setAddressForm(emptyAddress);

      showToast(
        "Address saved successfully."
      );
    } catch (error) {
      console.error(
        "Address save error:",
        error
      );
    }
  };

  const editAddress = (address) => {
    setAddressForm(address);
    setShowAddressForm(true);
  };

  const deleteAddress = (id) => {
    const nextAddresses =
      addresses.filter(
        (item) =>
          String(item.id) !== String(id)
      );

    setAddresses(nextAddresses);

    localStorage.setItem(
      "veloraAddresses",
      JSON.stringify(nextAddresses)
    );

    showToast("Address removed.");
  };

  /* --------------------------------
     PAYMENT METHODS
  -------------------------------- */

  const savePayment = () => {
    if (
      !paymentForm.holderName ||
      !paymentForm.last4
    ) {
      showToast(
        "Please complete payment details."
      );
      return;
    }

    try {
      let nextPayments = [
        ...paymentMethods,
      ];

      if (paymentForm.isDefault) {
        nextPayments =
          nextPayments.map((item) => ({
            ...item,
            isDefault: false,
          }));
      }

      const paymentToSave = {
        ...paymentForm,
        id:
          paymentForm.id ||
          Date.now().toString(),
        last4: String(
          paymentForm.last4
        ).slice(-4),
      };

      const existingIndex =
        nextPayments.findIndex(
          (item) =>
            String(item.id) ===
            String(paymentToSave.id)
        );

      if (existingIndex !== -1) {
        nextPayments[
          existingIndex
        ] = paymentToSave;
      } else {
        nextPayments.push(paymentToSave);
      }

      localStorage.setItem(
        "veloraPaymentMethods",
        JSON.stringify(nextPayments)
      );

      setPaymentMethods(nextPayments);
      setShowPaymentForm(false);
      setPaymentForm(emptyPayment);

      showToast(
        "Payment method saved."
      );
    } catch (error) {
      console.error(
        "Payment save error:",
        error
      );
    }
  };

  const deletePayment = (id) => {
    const nextPayments =
      paymentMethods.filter(
        (item) =>
          String(item.id) !== String(id)
      );

    setPaymentMethods(nextPayments);

    localStorage.setItem(
      "veloraPaymentMethods",
      JSON.stringify(nextPayments)
    );

    showToast(
      "Payment method removed."
    );
  };

  /* --------------------------------
     LOGOUT
  -------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem(
      "veloraLoggedIn"
    );

    localStorage.removeItem(
      "veloraUser"
    );

    showToast("You have been logged out.");

    setTimeout(() => {
      window.location.href = "/";
    }, 700);
  };

  /* --------------------------------
     ORDER HELPERS
  -------------------------------- */

  const getOrderStatus = (order) => {
    return String(
      order?.status ??
        order?.orderStatus ??
        "Processing"
    ).toLowerCase();
  };

  const getOrderItems = (order) => {
    if (Array.isArray(order?.items)) {
      return order.items;
    }

    if (Array.isArray(order?.products)) {
      return order.products;
    }

    return [];
  };

  const getOrderId = (order) => {
    return String(
      order?.id ??
        order?._id ??
        order?.orderId ??
        "—"
    );
  };

  const getOrderTotal = (order) => {
    const directTotal =
      Number(
        order?.total ??
          order?.grandTotal ??
          order?.amount ??
          0
      );

    if (directTotal > 0) {
      return directTotal;
    }

    return getOrderItems(order).reduce(
      (sum, item) => {
        const itemPrice =
          Number(item?.price ?? 0);

        const quantity =
          Number(
            item?.quantity ?? 1
          );

        return (
          sum +
          itemPrice * quantity
        );
      },
      0
    );
  };

  const formatStatus = (status) => {
    const value = String(
      status || ""
    ).toLowerCase();

    if (value === "delivered") {
      return "Delivered";
    }

    if (value === "completed") {
      return "Completed";
    }

    if (
      value === "cancelled" ||
      value === "canceled"
    ) {
      return "Cancelled";
    }

    if (
      value === "shipped" ||
      value === "out_for_delivery"
    ) {
      return "Shipped";
    }

    return "Processing";
  };

  const getStatusIcon = (status) => {
    const value = String(
      status || ""
    ).toLowerCase();

    if (
      value === "delivered" ||
      value === "completed"
    ) {
      return CheckCircle2;
    }

    if (
      value === "cancelled" ||
      value === "canceled"
    ) {
      return XCircle;
    }

    if (value === "shipped") {
      return Truck;
    }

    return Clock3;
  };

  const getStatusClass = (status) => {
    const value = String(
      status || ""
    ).toLowerCase();

    if (
      value === "delivered" ||
      value === "completed"
    ) {
      return "bg-green-50 text-green-600";
    }

    if (
      value === "cancelled" ||
      value === "canceled"
    ) {
      return "bg-red-50 text-red-600";
    }

    if (value === "shipped") {
      return "bg-blue-50 text-blue-600";
    }

    return "bg-orange-50 text-[#FF6A00]";
  };

  /* --------------------------------
     ORDER STATS
  -------------------------------- */

  const orderStats = useMemo(() => {
    let delivered = 0;
    let processing = 0;
    let cancelled = 0;

    orders.forEach((order) => {
      const status =
        getOrderStatus(order);

      if (
        status === "delivered" ||
        status === "completed"
      ) {
        delivered++;
      } else if (
        status === "cancelled" ||
        status === "canceled"
      ) {
        cancelled++;
      } else {
        processing++;
      }
    });

    return {
      total: orders.length,
      delivered,
      processing,
      cancelled,
    };
  }, [orders]);

  /* --------------------------------
     RECENT ORDERS
  -------------------------------- */

  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  /* --------------------------------
     NAVIGATION
  -------------------------------- */

  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: User,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      count: wishlistCount,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: CreditCard,
    },
    {
      id: "reviews",
      label: "My Reviews",
      icon: Star,
      count: reviewCount,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      count: notifications.length,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
  ];

  /* --------------------------------
     RENDER
  -------------------------------- */

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* --------------------------------
          TOAST
      -------------------------------- */}

      {toast && (
        <div className="fixed left-1/2 top-5 z-[100] w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* --------------------------------
          TOP HEADER
      -------------------------------- */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                My Account
              </p>

              <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                Welcome back,{" "}
                {profile.name || "User"}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your profile, orders,
                addresses and shopping preferences.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
              >
                <ShoppingBag size={17} />
                Continue Shopping
              </Link>

              <Link
                href="/help-center"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#e85d00]"
              >
                <HelpCircle size={17} />
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------
          ACCOUNT LAYOUT
      -------------------------------- */}

      <section className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* --------------------------------
              SIDEBAR
          -------------------------------- */}

          <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-5">
            {/* USER CARD */}

            <div className="border-b border-slate-100 bg-gradient-to-br from-orange-50 to-white p-5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FF6A00] text-xl font-black text-white">
                  {profile.name
                    ? profile.name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}

                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white">
                    <BadgeCheck size={11} />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="truncate font-black text-slate-900">
                    {profile.name ||
                      "Velora User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            {/* NAVIGATION */}

            <div className="p-2">
              {navigation.map((item) => {
                const Icon = item.icon;

                const active =
                  activeSection ===
                  item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        item.id
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
                      active
                        ? "bg-orange-50 text-[#FF6A00]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />

                      {item.label}
                    </span>

                    {item.count !==
                      undefined &&
                      item.count > 0 && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                            active
                              ? "bg-[#FF6A00] text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                  </button>
                );
              })}

              <div className="my-2 h-px bg-slate-100" />

              <Link
                href="/settings"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Settings size={18} />
                Settings
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* --------------------------------
              CONTENT
          -------------------------------- */}

          <div className="min-w-0">
            {/* --------------------------------
                OVERVIEW
            -------------------------------- */}

            {activeSection ===
              "overview" && (
              <div className="space-y-6">
                {/* QUICK STATS */}

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00]">
                      <Package size={20} />
                    </div>

                    <p className="mt-4 text-2xl font-black text-slate-900">
                      {orderStats.total}
                    </p>

                    <p className="text-xs font-bold text-slate-500">
                      Total Orders
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <CheckCircle2
                        size={20}
                      />
                    </div>

                    <p className="mt-4 text-2xl font-black text-slate-900">
                      {orderStats.delivered}
                    </p>

                    <p className="text-xs font-bold text-slate-500">
                      Delivered
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Truck size={20} />
                    </div>

                    <p className="mt-4 text-2xl font-black text-slate-900">
                      {orderStats.processing}
                    </p>

                    <p className="text-xs font-bold text-slate-500">
                      In Progress
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                      <Heart size={20} />
                    </div>

                    <p className="mt-4 text-2xl font-black text-slate-900">
                      {wishlistCount}
                    </p>

                    <p className="text-xs font-bold text-slate-500">
                      Wishlist
                    </p>
                  </div>
                </div>

                {/* PROFILE CARD */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                        Personal Information
                      </p>

                      <h2 className="mt-1 text-xl font-black text-slate-900">
                        Account Details
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setTempProfile(
                          profile
                        );
                        setEditingProfile(
                          true
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                    >
                      <Edit3 size={17} />
                      Edit Profile
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <User size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          Full Name
                        </span>
                      </div>

                      <p className="mt-2 font-bold text-slate-800">
                        {profile.name ||
                          "Not added"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Mail size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          Email
                        </span>
                      </div>

                      <p className="mt-2 break-all font-bold text-slate-800">
                        {profile.email ||
                          "Not added"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone size={16} />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          Phone
                        </span>
                      </div>

                      <p className="mt-2 font-bold text-slate-800">
                        {profile.phone ||
                          "Not added"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <CalendarDays
                          size={16}
                        />
                        <span className="text-xs font-bold uppercase tracking-wide">
                          Date of Birth
                        </span>
                      </div>

                      <p className="mt-2 font-bold text-slate-800">
                        {profile.dateOfBirth ||
                          "Not added"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RECENT ORDERS */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                        Orders
                      </p>

                      <h2 className="mt-1 text-xl font-black text-slate-900">
                        Recent Orders
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveSection(
                          "orders"
                        )
                      }
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#FF6A00] hover:underline"
                    >
                      View All
                      <ChevronRight
                        size={16}
                      />
                    </button>
                  </div>

                  {recentOrders.length >
                  0 ? (
                    <div className="mt-5 space-y-3">
                      {recentOrders
                        .slice(0, 3)
                        .map((order) => {
                          const status =
                            getOrderStatus(
                              order
                            );

                          const StatusIcon =
                            getStatusIcon(
                              status
                            );

                          return (
                            <div
                              key={getOrderId(
                                order
                              )}
                              className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div>
                                <p className="font-black text-slate-900">
                                  Order #
                                  {getOrderId(
                                    order
                                  )}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {
                                    getOrderItems(
                                      order
                                    ).length
                                  }{" "}
                                  item(s)
                                </p>
                              </div>

                              <div className="flex items-center justify-between gap-4 sm:justify-end">
                                <p className="font-black text-slate-900">
                                  Rs.{" "}
                                  {getOrderTotal(
                                    order
                                  ).toLocaleString()}
                                </p>

                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${getStatusClass(
                                    status
                                  )}`}
                                >
                                  <StatusIcon
                                    size={14}
                                  />
                                  {formatStatus(
                                    status
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                      <Package
                        size={32}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-black text-slate-800">
                        No orders yet
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Your recent orders will
                        appear here.
                      </p>

                      <Link
                        href="/shop"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-2.5 text-sm font-bold text-white"
                      >
                        Start Shopping
                        <ChevronRight
                          size={16}
                        />
                      </Link>
                    </div>
                  )}
                </div>

                {/* ACCOUNT SHORTCUTS */}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Wishlist",
                      text: "View your saved products.",
                      icon: Heart,
                      id: "wishlist",
                    },
                    {
                      title: "Addresses",
                      text: "Manage delivery addresses.",
                      icon: MapPin,
                      id: "addresses",
                    },
                    {
                      title: "Payment Methods",
                      text: "Manage your saved payment methods.",
                      icon: CreditCard,
                      id: "payments",
                    },
                    {
                      title: "Reviews",
                      text: "See your product reviews.",
                      icon: Star,
                      id: "reviews",
                    },
                    {
                      title: "Notifications",
                      text: "Check your latest notifications.",
                      icon: Bell,
                      id: "notifications",
                    },
                    {
                      title: "Security",
                      text: "Manage your password.",
                      icon: Lock,
                      id: "security",
                    },
                  ].map((item) => {
                    const Icon =
                      item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setActiveSection(
                            item.id
                          )
                        }
                        className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00] transition group-hover:bg-[#FF6A00] group-hover:text-white">
                          <Icon size={20} />
                        </div>

                        <h3 className="mt-4 font-black text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {item.text}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --------------------------------
                ORDERS
            -------------------------------- */}

            {activeSection ===
              "orders" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                      Orders
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                      My Orders
                    </h2>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">
                    {orders.length} Orders
                  </div>
                </div>

                {orders.length > 0 ? (
                  <div className="mt-6 space-y-4">
                    {orders.map((order) => {
                      const status =
                        getOrderStatus(
                          order
                        );

                      const StatusIcon =
                        getStatusIcon(
                          status
                        );

                      const items =
                        getOrderItems(
                          order
                        );

                      return (
                        <div
                          key={getOrderId(
                            order
                          )}
                          className="rounded-2xl border border-slate-200 p-4 sm:p-5"
                        >
                          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="font-black text-slate-900">
                                Order #
                                {getOrderId(
                                  order
                                )}
                              </p>

                              {order?.createdAt && (
                                <p className="mt-1 text-xs text-slate-500">
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <p className="font-black text-slate-900">
                                Rs.{" "}
                                {getOrderTotal(
                                  order
                                ).toLocaleString()}
                              </p>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${getStatusClass(
                                  status
                                )}`}
                              >
                                <StatusIcon
                                  size={14}
                                />
                                {formatStatus(
                                  status
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 space-y-3">
                            {items.length >
                            0 ? (
                              items
                                .slice(
                                  0,
                                  4
                                )
                                .map(
                                  (
                                    item,
                                    index
                                  ) => (
                                    <div
                                      key={`${getOrderId(
                                        order
                                      )}-${index}`}
                                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                                    >
                                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                                        {item?.image ? (
                                          <img
                                            src={
                                              item.image
                                            }
                                            alt={
                                              item?.name ||
                                              "Product"
                                            }
                                            className="h-full w-full object-contain"
                                          />
                                        ) : (
                                          <Package
                                            size={
                                              20
                                            }
                                            className="text-slate-300"
                                          />
                                        )}
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-bold text-slate-800">
                                          {item?.name ||
                                            "Product"}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                          Qty:{" "}
                                          {Number(
                                            item?.quantity ??
                                              1
                                          )}
                                        </p>
                                      </div>

                                      <p className="text-sm font-black text-slate-800">
                                        Rs.{" "}
                                        {(
                                          Number(
                                            item?.price ??
                                              0
                                          ) *
                                          Number(
                                            item?.quantity ??
                                              1
                                          )
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  )
                                )
                            ) : (
                              <p className="text-sm text-slate-500">
                                Order items unavailable.
                              </p>
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {status !==
                              "cancelled" &&
                              status !==
                                "canceled" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    showToast(
                                      "Order tracking will be connected to your backend."
                                    )
                                  }
                                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-[#FF6A00] hover:text-[#FF6A00]"
                                >
                                  <Truck
                                    size={16}
                                  />
                                  Track Order
                                </button>
                              )}

                            {(status ===
                              "delivered" ||
                              status ===
                                "completed") && (
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveSection(
                                    "reviews"
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-bold text-[#FF6A00]"
                              >
                                <Star
                                  size={16}
                                />
                                Review Products
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                    <ShoppingBag
                      size={38}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 font-black text-slate-900">
                      No orders found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Start shopping and your
                      orders will appear here.
                    </p>

                    <Link
                      href="/shop"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-black text-white"
                    >
                      Shop Now
                      <ChevronRight
                        size={17}
                      />
                    </Link>
                  </div>
                )}
              </section>
            )}

            {/* --------------------------------
                WISHLIST
            -------------------------------- */}

            {activeSection ===
              "wishlist" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                    Saved Products
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    My Wishlist
                  </h2>
                </div>

                <div className="mt-6 rounded-2xl bg-pink-50 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-pink-500">
                      <Heart size={22} />
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        {wishlistCount} Saved Product
                        {wishlistCount !== 1
                          ? "s"
                          : ""}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        View and manage all your saved
                        products.
                      </p>

                      <Link
                        href="/wishlist"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-bold text-white"
                      >
                        Open Wishlist
                        <ChevronRight
                          size={16}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* --------------------------------
                ADDRESSES
            -------------------------------- */}

            {activeSection ===
              "addresses" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                      Delivery
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                      My Addresses
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={openNewAddress}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-4 py-2.5 text-sm font-bold text-white"
                  >
                    <Plus size={17} />
                    Add Address
                  </button>
                </div>

                {addresses.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {addresses.map(
                      (address) => (
                        <div
                          key={address.id}
                          className="rounded-2xl border border-slate-200 p-5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <MapPin
                                size={18}
                                className="text-[#FF6A00]"
                              />

                              <h3 className="font-black text-slate-900">
                                {address.label ||
                                  "Address"}
                              </h3>
                            </div>

                            {address.isDefault && (
                              <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-black text-green-600">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="mt-4 space-y-1 text-sm text-slate-600">
                            <p className="font-bold text-slate-800">
                              {
                                address.fullName
                              }
                            </p>

                            <p>
                              {address.phone}
                            </p>

                            <p>
                              {
                                address.address
                              }
                            </p>

                            <p>
                              {address.area
                                ? `${address.area}, `
                                : ""}
                              {address.city}
                              {address.postalCode
                                ? ` - ${address.postalCode}`
                                : ""}
                            </p>
                          </div>

                          <div className="mt-5 flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                editAddress(
                                  address
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-[#FF6A00] hover:text-[#FF6A00]"
                            >
                              <Edit3
                                size={14}
                              />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteAddress(
                                  address.id
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                            >
                              <Trash2
                                size={14}
                              />
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                    <MapPin
                      size={36}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-3 font-black text-slate-900">
                      No addresses saved
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Add your delivery address for
                      faster checkout.
                    </p>

                    <button
                      type="button"
                      onClick={openNewAddress}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-bold text-white"
                    >
                      <Plus size={17} />
                      Add Address
                    </button>
                  </div>
                )}

                {/* ADDRESS MODAL */}

                {showAddressForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-black text-slate-900">
                            Add Delivery Address
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Enter your complete delivery
                            information.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setShowAddressForm(
                              false
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <input
                          value={
                            addressForm.fullName
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                fullName:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Full Name"
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <input
                          value={
                            addressForm.phone
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                phone:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Phone Number"
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <select
                          value={
                            addressForm.label
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                label:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        >
                          <option>
                            Home
                          </option>
                          <option>
                            Office
                          </option>
                          <option>
                            Other
                          </option>
                        </select>

                        <input
                          value={
                            addressForm.city
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                city:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="City"
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <input
                          value={
                            addressForm.area
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                area:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Area / Locality"
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <input
                          value={
                            addressForm.postalCode
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                postalCode:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Postal Code"
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <textarea
                          value={
                            addressForm.address
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                address:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Complete Address"
                          rows={4}
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00] sm:col-span-2"
                        />
                      </div>

                      <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm font-bold text-slate-700">
                        <input
                          type="checkbox"
                          checked={
                            addressForm.isDefault
                          }
                          onChange={(event) =>
                            setAddressForm(
                              (prev) => ({
                                ...prev,
                                isDefault:
                                  event
                                    .target
                                    .checked,
                              })
                            )
                          }
                          className="h-4 w-4 accent-[#FF6A00]"
                        />
                        Make this my default address
                      </label>

                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setShowAddressForm(
                              false
                            )
                          }
                          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={saveAddress}
                          className="flex-1 rounded-xl bg-[#FF6A00] px-4 py-3 text-sm font-bold text-white"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* --------------------------------
                PAYMENTS
            -------------------------------- */}

            {activeSection ===
              "payments" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                      Payments
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                      Payment Methods
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentForm({
                        ...emptyPayment,
                        id: Date.now().toString(),
                      });

                      setShowPaymentForm(
                        true
                      );
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-4 py-2.5 text-sm font-bold text-white"
                  >
                    <Plus size={17} />
                    Add Payment Method
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {paymentMethods.map(
                    (payment) => (
                      <div
                        key={payment.id}
                        className="rounded-2xl border border-slate-200 p-5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                            <WalletCards
                              size={20}
                            />
                          </div>

                          {payment.isDefault && (
                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-black text-green-600">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-5 font-black text-slate-900">
                          {payment.type ||
                            "Card"}{" "}
                          ••••{" "}
                          {payment.last4}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            payment.holderName
                          }
                        </p>

                        {payment.expiry && (
                          <p className="mt-1 text-xs text-slate-400">
                            Expires{" "}
                            {
                              payment.expiry
                            }
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            deletePayment(
                              payment.id
                            )
                          }
                          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                        >
                          <Trash2
                            size={14}
                          />
                          Remove
                        </button>
                      </div>
                    )
                  )}

                  {paymentMethods.length ===
                    0 && (
                    <div className="sm:col-span-2 rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                      <CreditCard
                        size={38}
                        className="mx-auto text-slate-300"
                      />

                      <h3 className="mt-3 font-black text-slate-900">
                        No payment methods
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Your saved payment methods will
                        appear here.
                      </p>
                    </div>
                  )}
                </div>

                {/* PAYMENT MODAL */}

                {showPaymentForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-black text-slate-900">
                            Add Payment Method
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Save a payment method for
                            future checkout.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setShowPaymentForm(
                              false
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="mt-6 space-y-4">
                        <select
                          value={
                            paymentForm.type
                          }
                          onChange={(event) =>
                            setPaymentForm(
                              (prev) => ({
                                ...prev,
                                type:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        >
                          <option>
                            Card
                          </option>
                          <option>
                            Debit Card
                          </option>
                          <option>
                            Credit Card
                          </option>
                        </select>

                        <input
                          value={
                            paymentForm.holderName
                          }
                          onChange={(event) =>
                            setPaymentForm(
                              (prev) => ({
                                ...prev,
                                holderName:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Card Holder Name"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <input
                          value={
                            paymentForm.last4
                          }
                          onChange={(event) =>
                            setPaymentForm(
                              (prev) => ({
                                ...prev,
                                last4:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          maxLength={4}
                          inputMode="numeric"
                          placeholder="Last 4 digits"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <input
                          value={
                            paymentForm.expiry
                          }
                          onChange={(event) =>
                            setPaymentForm(
                              (prev) => ({
                                ...prev,
                                expiry:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          placeholder="Expiry (MM/YY)"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                        />

                        <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                          <input
                            type="checkbox"
                            checked={
                              paymentForm.isDefault
                            }
                            onChange={(event) =>
                              setPaymentForm(
                                (prev) => ({
                                  ...prev,
                                  isDefault:
                                    event
                                      .target
                                      .checked,
                                })
                              )
                            }
                            className="h-4 w-4 accent-[#FF6A00]"
                          />
                          Make default payment method
                        </label>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setShowPaymentForm(
                              false
                            )
                          }
                          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={savePayment}
                          className="flex-1 rounded-xl bg-[#FF6A00] px-4 py-3 text-sm font-bold text-white"
                        >
                          Save Payment
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* --------------------------------
                REVIEWS
            -------------------------------- */}

            {activeSection ===
              "reviews" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                  Feedback
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  My Reviews
                </h2>

                <div className="mt-6 rounded-2xl bg-yellow-50 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-yellow-500">
                      <Star size={22} />
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        {reviewCount} Review
                        {reviewCount !== 1
                          ? "s"
                          : ""}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Product reviews you submit after
                        receiving your orders are saved here.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSection(
                            "orders"
                          )
                        }
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-white"
                      >
                        <MessageSquare
                          size={16}
                        />
                        Go to Delivered Orders
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* --------------------------------
                NOTIFICATIONS
            -------------------------------- */}

            {activeSection ===
              "notifications" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                  Updates
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  Notifications
                </h2>

                {notifications.length >
                0 ? (
                  <div className="mt-6 space-y-3">
                    {notifications.map(
                      (
                        notification,
                        index
                      ) => (
                        <div
                          key={
                            notification.id ??
                            index
                          }
                          className="flex gap-4 rounded-xl border border-slate-100 p-4"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF6A00]">
                            <Bell size={18} />
                          </div>

                          <div>
                            <p className="font-bold text-slate-900">
                              {notification.title ??
                                "Velora Notification"}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {notification.message ??
                                "You have a new update."}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                    <Bell
                      size={38}
                      className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-3 font-black text-slate-900">
                      No notifications
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      New order and account updates will
                      appear here.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* --------------------------------
                SECURITY
            -------------------------------- */}

            {activeSection ===
              "security" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div>
                  <p className="text-sm font-black uppercase tracking-wider text-[#FF6A00]">
                    Account Security
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Security & Password
                  </h2>
                </div>

                <div className="mt-6 rounded-2xl bg-green-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-600">
                      <ShieldCheck
                        size={22}
                      />
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        Keep your account secure
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Use a strong password and keep your
                        account details private.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 max-w-xl space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-800">
                      Current Password
                    </label>

                    <div className="relative">
                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={
                          passwordData.currentPassword
                        }
                        onChange={(event) =>
                          setPasswordData(
                            (prev) => ({
                              ...prev,
                              currentPassword:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-[#FF6A00]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) =>
                              !prev
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? (
                          <EyeOff
                            size={18}
                          />
                        ) : (
                          <Eye
                            size={18}
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-800">
                      New Password
                    </label>

                    <input
                      type="password"
                      value={
                        passwordData.newPassword
                      }
                      onChange={(event) =>
                        setPasswordData(
                          (prev) => ({
                            ...prev,
                            newPassword:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-800">
                      Confirm New Password
                    </label>

                    <input
                      type="password"
                      value={
                        passwordData.confirmPassword
                      }
                      onChange={(event) =>
                        setPasswordData(
                          (prev) => ({
                            ...prev,
                            confirmPassword:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  {passwordMessage && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                      {passwordMessage}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={updatePassword}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3 text-sm font-black text-white transition hover:bg-[#e85d00]"
                  >
                    <Lock size={17} />
                    Update Password
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------
          EDIT PROFILE MODAL
      -------------------------------- */}

      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingProfile(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Full Name
                </label>

                <input
                  value={tempProfile.name}
                  onChange={(event) =>
                    setTempProfile(
                      (prev) => ({
                        ...prev,
                        name:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Email
                </label>

                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(event) =>
                    setTempProfile(
                      (prev) => ({
                        ...prev,
                        email:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Phone
                </label>

                <input
                  value={tempProfile.phone}
                  onChange={(event) =>
                    setTempProfile(
                      (prev) => ({
                        ...prev,
                        phone:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Gender
                </label>

                <select
                  value={
                    tempProfile.gender
                  }
                  onChange={(event) =>
                    setTempProfile(
                      (prev) => ({
                        ...prev,
                        gender:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                >
                  <option value="">
                    Select Gender
                  </option>
                  <option value="Male">
                    Male
                  </option>
                  <option value="Female">
                    Female
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-800">
                  Date of Birth
                </label>

                <input
                  type="date"
                  value={
                    tempProfile.dateOfBirth
                  }
                  onChange={(event) =>
                    setTempProfile(
                      (prev) => ({
                        ...prev,
                        dateOfBirth:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6A00]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setEditingProfile(false)
                }
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveProfile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-black text-white"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

