"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  CreditCard,
  Eye,
  Hash,
  MapPin,
  Package,
  RotateCcw,
  Search,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showAllItems, setShowAllItems] = useState({});

  /* =========================================================
     HELPERS
  ========================================================= */

  const getOrderId = (order, index) => {
    return String(
      order?.orderId ??
        order?.id ??
        order?._id ??
        `VELORA-${index + 1}`
    );
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

  const getItemName = (item) => {
    return item?.name || item?.productName || "Product";
  };

  const getItemImage = (item) => {
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

  const getItemQuantity = (item) => {
    return Math.max(
      1,
      Number(item?.quantity || 1)
    );
  };

  const getItemPrice = (item) => {
    return Number(item?.price || 0);
  };

  const getOrderTotal = (order) => {
    if (
      order?.total !== undefined &&
      order?.total !== null
    ) {
      return Number(order.total || 0);
    }

    if (
      order?.grandTotal !== undefined &&
      order?.grandTotal !== null
    ) {
      return Number(order.grandTotal || 0);
    }

    return getOrderItems(order).reduce(
      (total, item) => {
        return (
          total +
          getItemPrice(item) *
            getItemQuantity(item)
        );
      },
      0
    );
  };

  const getOrderSubtotal = (order) => {
    if (
      order?.subtotal !== undefined &&
      order?.subtotal !== null
    ) {
      return Number(order.subtotal || 0);
    }

    return getOrderItems(order).reduce(
      (total, item) => {
        return (
          total +
          getItemPrice(item) *
            getItemQuantity(item)
        );
      },
      0
    );
  };

  const getOrderShipping = (order) => {
    return Number(
      order?.shipping ??
        order?.shippingFee ??
        0
    );
  };

  const getOrderDate = (order) => {
    return (
      order?.createdAt ||
      order?.orderDate ||
      order?.date ||
      order?.placedAt ||
      ""
    );
  };

  const getStatus = (order) => {
    const rawStatus = String(
      order?.status ||
        order?.orderStatus ||
        "Pending"
    ).trim();

    if (!rawStatus) {
      return "Pending";
    }

    return (
      rawStatus.charAt(0).toUpperCase() +
      rawStatus.slice(1).toLowerCase()
    );
  };

  const getPaymentMethod = (order) => {
    return (
      order?.paymentMethod ||
      order?.payment ||
      "Cash on Delivery"
    );
  };

  const getShippingAddress = (order) => {
    if (
      typeof order?.shippingAddress === "string"
    ) {
      return order.shippingAddress;
    }

    if (
      order?.shippingAddress &&
      typeof order.shippingAddress === "object"
    ) {
      const address = order.shippingAddress;

      return [
        address.fullName,
        address.address,
        address.city,
        address.area,
        address.postalCode,
        address.phone,
      ]
        .filter(Boolean)
        .join(", ");
    }

    if (typeof order?.address === "string") {
      return order.address;
    }

    return "Shipping address not available";
  };

  const getCustomerName = (order) => {
    if (
      order?.shippingAddress &&
      typeof order.shippingAddress === "object"
    ) {
      return (
        order.shippingAddress.fullName ||
        "Customer"
      );
    }

    return (
      order?.fullName ||
      order?.customerName ||
      "Customer"
    );
  };

  const getCustomerPhone = (order) => {
    if (
      order?.shippingAddress &&
      typeof order.shippingAddress === "object"
    ) {
      return (
        order.shippingAddress.phone || ""
      );
    }

    return order?.phone || "";
  };

  const getCustomerEmail = (order) => {
    if (
      order?.shippingAddress &&
      typeof order.shippingAddress === "object"
    ) {
      return (
        order.shippingAddress.email || ""
      );
    }

    return order?.email || "";
  };

  const getOrderNotes = (order) => {
    if (
      order?.shippingAddress &&
      typeof order.shippingAddress === "object"
    ) {
      return (
        order.shippingAddress.notes || ""
      );
    }

    return order?.notes || "";
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-PK").format(
      Number(value || 0)
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Date not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return "Date not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    const value = String(status).toLowerCase();

    if (value === "delivered") {
      return {
        wrapper:
          "bg-green-50 text-green-700 border-green-100",
        icon: Check,
      };
    }

    if (value === "shipped") {
      return {
        wrapper:
          "bg-blue-50 text-blue-700 border-blue-100",
        icon: Truck,
      };
    }

    if (value === "confirmed") {
      return {
        wrapper:
          "bg-cyan-50 text-cyan-700 border-cyan-100",
        icon: Check,
      };
    }

    if (
      value === "cancelled" ||
      value === "canceled"
    ) {
      return {
        wrapper:
          "bg-red-50 text-red-600 border-red-100",
        icon: X,
      };
    }

    return {
      wrapper:
        "bg-orange-50 text-orange-700 border-orange-100",
      icon: Clock3,
    };
  };

  /* =========================================================
     LOAD ORDERS
     
     IMPORTANT:
     Purane Cancelled / Canceled orders ko load hi nahi
     karna aur localStorage se bhi remove kar dena.
  ========================================================= */

  useEffect(() => {
    setMounted(true);

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("veloraOrders") || "[]"
      );

      if (!Array.isArray(savedOrders)) {
        setOrders([]);
        localStorage.setItem(
          "veloraOrders",
          JSON.stringify([])
        );
        return;
      }

      /*
        OLD CANCELLED ORDERS CLEANUP

        Agar pehle ke orders ka status:
        - Cancelled
        - Canceled

        hai to unko completely remove kar do.
      */
      const activeOrders = savedOrders.filter(
        (order) => {
          const status = String(
            order?.status ||
              order?.orderStatus ||
              ""
          )
            .trim()
            .toLowerCase();

          return (
            status !== "cancelled" &&
            status !== "canceled"
          );
        }
      );

      setOrders(activeOrders);

      /*
        Cleaned list ko localStorage mein save kar rahe hain.
        Is wajah se reload ke baad old cancelled orders
        dobara nahi aayenge.
      */
      if (
        activeOrders.length !==
        savedOrders.length
      ) {
        localStorage.setItem(
          "veloraOrders",
          JSON.stringify(activeOrders)
        );
      }
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      setOrders([]);

      try {
        localStorage.setItem(
          "veloraOrders",
          JSON.stringify([])
        );
      } catch {}
    }
  }, []);

  /* =========================================================
     STATUS OPTIONS
  ========================================================= */

  const statusOptions = [
    "All",
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  /* =========================================================
     FILTER ORDERS
  ========================================================= */

  const filteredOrders = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return orders.filter((order, index) => {
      const orderId = getOrderId(
        order,
        index
      ).toLowerCase();

      const status =
        getStatus(order).toLowerCase();

      const items = getOrderItems(order);

      const productNames = items
        .map((item) =>
          getItemName(item).toLowerCase()
        )
        .join(" ");

      const searchableText = [
        orderId,
        productNames,
        String(
          order?.paymentMethod || ""
        ).toLowerCase(),
        String(
          order?.customerName || ""
        ).toLowerCase(),
        ...items.map((item) =>
          String(
            item?.id ||
              item?._id ||
              item?.sku ||
              item?.category ||
              ""
          ).toLowerCase()
        ),
      ].join(" ");

      const matchesSearch =
        !searchValue ||
        searchableText.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        status ===
          statusFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [orders, search, statusFilter]);

  /* =========================================================
     TOGGLE DETAILS
  ========================================================= */

  const toggleDetails = (orderId) => {
    setExpandedOrder((current) =>
      current === orderId
        ? null
        : orderId
    );
  };

  /* =========================================================
     TOGGLE ALL ITEMS
  ========================================================= */

  const toggleAllItems = (orderId) => {
    setShowAllItems((current) => ({
      ...current,
      [orderId]: !current[orderId],
    }));
  };

  /* =========================================================
     REORDER
  ========================================================= */

  const reorder = (order) => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("veloraCart") || "[]"
      );

      const currentCart = Array.isArray(
        savedCart
      )
        ? savedCart
        : [];

      const orderItems =
        getOrderItems(order);

      const updatedCart = [
        ...currentCart,
        ...orderItems.map((item) => ({
          ...item,
          quantity: getItemQuantity(item),
          addedAt:
            new Date().toISOString(),
        })),
      ];

      localStorage.setItem(
        "veloraCart",
        JSON.stringify(updatedCart)
      );

      window.location.href = "/cart";
    } catch (error) {
      console.error(
        "Failed to reorder:",
        error
      );
    }
  };

  /* =========================================================
     CANCEL ORDER - COMPLETELY DELETE
  ========================================================= */

  const cancelOrder = (order) => {
    if (!order) {
      return;
    }

    const currentStatus = getStatus(
      order
    ).toLowerCase();

    /*
      Sirf Pending aur Confirmed orders cancel
      ho sakte hain.
    */
    if (
      currentStatus !== "pending" &&
      currentStatus !== "confirmed"
    ) {
      return;
    }

    const targetOrderId = String(
      order?.orderId ??
        order?.id ??
        order?._id ??
        ""
    );

    if (!targetOrderId) {
      return;
    }

    /*
      IMPORTANT:

      Cancelled status set nahi karna.

      Order ko array se completely remove karna.
    */
    const updatedOrders = orders.filter(
      (item, index) => {
        const itemId = String(
          item?.orderId ??
            item?.id ??
            item?._id ??
            `VELORA-${index + 1}`
        );

        return itemId !== targetOrderId;
      }
    );

    /*
      React state update.
      Is se immediately:
      3 -> 2
      2 -> 1
      1 -> 0
      ho jayega.
    */
    setOrders(updatedOrders);

    /*
      Agar cancelled order expanded tha to uski
      expanded state bhi remove.
    */
    setExpandedOrder((current) =>
      current === targetOrderId
        ? null
        : current
    );

    /*
      Show all items ki state bhi clean.
    */
    setShowAllItems((current) => {
      const updated = { ...current };

      delete updated[targetOrderId];

      return updated;
    });

    /*
      localStorage se completely delete.

      Is wajah se page reload karne ke baad
      cancelled order dobara nahi aayega.
    */
    try {
      localStorage.setItem(
        "veloraOrders",
        JSON.stringify(updatedOrders)
      );
    } catch (error) {
      console.error(
        "Failed to delete cancelled order:",
        error
      );
    }
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

            <div className="mt-8 h-10 w-60 rounded bg-slate-200" />

            <div className="mt-8 h-20 rounded-2xl bg-white" />

            <div className="mt-5 h-56 rounded-3xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     EMPTY ORDERS
  ========================================================= */

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-black text-[#FF6A00] transition hover:text-orange-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-100 bg-orange-50 transition group-hover:bg-orange-100">
              <ArrowLeft size={17} />
            </span>

            Back
          </Link>

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-xl text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 shadow-sm ring-8 ring-orange-50/50">
                <Package
                  size={43}
                  strokeWidth={1.8}
                  className="text-[#FF6A00]"
                />
              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                Velora Orders
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
                No Orders Yet
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                You haven't placed any orders yet.
                Start shopping and your orders will
                appear here.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <ShoppingBag size={18} />

                Start Shopping

                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* BACK */}

        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-black text-[#FF6A00] transition hover:text-orange-600"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-100 bg-orange-50 transition group-hover:bg-orange-100">
            <ArrowLeft size={17} />
          </span>

          Back
        </Link>

        {/* HEADER */}

        <div className="mt-7 flex flex-col gap-5 border-b border-orange-100 pb-7 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 ring-1 ring-orange-100">
                <Package
                  size={24}
                  className="text-[#FF6A00]"
                />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6A00]">
                  Velora Account
                </p>

                <h1 className="text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
                  My Orders
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Track and manage all your Velora
              orders in one place.
            </p>
          </div>

          {/* TOTAL ORDERS */}

          <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white px-6 py-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#FF6A00]">
              Total Orders
            </p>

            <p className="mt-0.5 text-2xl font-black text-[#172033]">
              {orders.length}
            </p>
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="mt-6 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* SEARCH */}

            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF6A00]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search order ID or product..."
                className="h-12 w-full rounded-xl border border-orange-100 bg-orange-50/40 pl-11 pr-11 text-sm font-medium text-[#172033] outline-none transition placeholder:text-slate-400 focus:border-[#FF6A00] focus:bg-white focus:ring-4 focus:ring-orange-50"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-orange-100 hover:text-[#FF6A00]"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* STATUS */}

            <div className="relative lg:w-52">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-orange-100 bg-orange-50/40 px-4 pr-10 text-sm font-bold text-[#172033] outline-none transition focus:border-[#FF6A00] focus:bg-white focus:ring-4 focus:ring-orange-50"
              >
                {statusOptions.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status === "All"
                        ? "All Orders"
                        : status}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#FF6A00]"
              />
            </div>
          </div>

          {/* SHOWING COUNT */}

          <div className="mt-4 flex flex-col gap-2 border-t border-orange-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs font-semibold text-slate-400">
              Showing{" "}
              <span className="font-black text-[#FF6A00]">
                {filteredOrders.length}
              </span>{" "}
              {filteredOrders.length === 1
                ? "order"
                : "orders"}{" "}
              of{" "}
              <span className="font-black text-[#FF6A00]">
                {orders.length}
              </span>{" "}
              {orders.length === 1
                ? "order"
                : "orders"}
            </p>

            {(search ||
              statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="w-fit text-xs font-black text-[#FF6A00] transition hover:text-orange-600 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* NO RESULTS */}

        {filteredOrders.length === 0 && (
          <div className="mt-6 rounded-3xl border border-orange-100 bg-white px-5 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <Search
                size={32}
                className="text-[#FF6A00]"
              />
            </div>

            <h2 className="mt-5 text-xl font-black text-[#172033]">
              No matching orders
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              No order matches your search.
              Try another product name or order ID.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="mt-6 rounded-xl bg-[#FF6A00] px-5 py-3 text-xs font-black text-white shadow-sm shadow-orange-100 transition hover:bg-orange-600"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ORDERS */}

        <div className="mt-6 space-y-5">

          {filteredOrders.map(
            (order, filteredIndex) => {

              const originalIndex =
                orders.findIndex(
                  (item) =>
                    item === order
                );

              const orderId =
                getOrderId(
                  order,
                  originalIndex
                );

              const orderItems =
                getOrderItems(order);

              const status =
                getStatus(order);

              const total =
                getOrderTotal(order);

              const subtotal =
                getOrderSubtotal(order);

              const shipping =
                getOrderShipping(order);

              const orderDate =
                getOrderDate(order);

              const payment =
                getPaymentMethod(order);

              const address =
                getShippingAddress(order);

              const customerName =
                getCustomerName(order);

              const customerPhone =
                getCustomerPhone(order);

              const customerEmail =
                getCustomerEmail(order);

              const orderNotes =
                getOrderNotes(order);

              const statusStyle =
                getStatusStyle(status);

              const StatusIcon =
                statusStyle.icon;

              const isExpanded =
                expandedOrder === orderId;

              const areAllItemsVisible =
                showAllItems[orderId] === true;

              const visibleItems =
                areAllItemsVisible ||
                isExpanded
                  ? orderItems
                  : orderItems.slice(0, 3);

              const lowerStatus =
                status.toLowerCase();

              const canCancel =
                lowerStatus === "pending" ||
                lowerStatus === "confirmed";

              const canReview =
                lowerStatus === "delivered";

              const totalQuantity =
                orderItems.reduce(
                  (sum, item) =>
                    sum +
                    getItemQuantity(item),
                  0
                );

              return (
                <article
                  key={`${orderId}-${filteredIndex}`}
                  className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition ${
                    isExpanded
                      ? "border-orange-200 shadow-md"
                      : "border-slate-200 hover:border-orange-100 hover:shadow-md"
                  }`}
                >

                  {/* ORDER HEADER */}

                  <div
                    className={`border-b px-4 py-5 sm:px-6 ${
                      isExpanded
                        ? "border-orange-100 bg-orange-50/30"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-3">

                        {/* ORDER ID */}

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Order ID
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-sm font-black text-[#172033]">
                            <Hash
                              size={13}
                              className="text-[#FF6A00]"
                            />

                            {orderId}
                          </p>
                        </div>

                        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                        {/* DATE */}

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Order Date
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#172033]">
                            <CalendarDays
                              size={14}
                              className="text-[#FF6A00]"
                            />

                            {formatDate(
                              orderDate
                            )}
                          </div>
                        </div>

                        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                        {/* ITEMS */}

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Items
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#172033]">
                            {totalQuantity}
                          </p>
                        </div>
                      </div>

                      {/* STATUS */}

                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-black ${statusStyle.wrapper}`}
                      >
                        <StatusIcon size={14} />

                        {status}
                      </div>
                    </div>
                  </div>

                  {/* PRODUCTS */}

                  <div className="p-4 sm:p-6">

                    <div className="space-y-3">

                      {visibleItems.map(
                        (
                          item,
                          itemIndex
                        ) => {

                          const image =
                            getItemImage(
                              item
                            );

                          const name =
                            getItemName(
                              item
                            );

                          const quantity =
                            getItemQuantity(
                              item
                            );

                          const price =
                            getItemPrice(
                              item
                            );

                          return (
                            <div
                              key={`${orderId}-item-${itemIndex}`}
                              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 transition hover:border-orange-100 hover:bg-orange-50/20 sm:gap-4 sm:p-4"
                            >

                              {/* IMAGE */}

                              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-100 sm:h-24 sm:w-24">
                                <Image
                                  src={image}
                                  alt={name}
                                  fill
                                  sizes="96px"
                                  className="object-contain p-1"
                                />
                              </div>

                              {/* NAME */}

                              <div className="min-w-0 flex-1">

                                <p className="line-clamp-2 text-sm font-black leading-5 text-[#172033]">
                                  {name}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2">

                                  {item?.selectedColor && (
                                    <span className="rounded-md border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold text-slate-500">
                                      Color:{" "}
                                      {
                                        item.selectedColor
                                      }
                                    </span>
                                  )}

                                  {item?.selectedSize && (
                                    <span className="rounded-md border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold text-slate-500">
                                      Size:{" "}
                                      {
                                        item.selectedSize
                                      }
                                    </span>
                                  )}

                                  <span className="rounded-md border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold text-slate-500">
                                    Qty:{" "}
                                    {quantity}
                                  </span>
                                </div>
                              </div>

                              {/* PRICE */}

                              <div className="shrink-0 text-right">

                                <p className="text-sm font-black text-[#172033]">
                                  Rs.{" "}
                                  {formatPrice(
                                    price *
                                      quantity
                                  )}
                                </p>

                                <p className="mt-1 text-[10px] font-semibold text-slate-400">
                                  Rs.{" "}
                                  {formatPrice(
                                    price
                                  )}{" "}
                                  each
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}

                    </div>

                    {/* VIEW MORE ITEMS */}

                    {orderItems.length > 3 && (
                      <button
                        type="button"
                        onClick={() =>
                          toggleAllItems(
                            orderId
                          )
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#FF6A00] transition hover:text-orange-600 hover:underline"
                      >
                        {areAllItemsVisible ? (
                          <>
                            Show Less
                            <ChevronUp
                              size={14}
                            />
                          </>
                        ) : (
                          <>
                            View{" "}
                            {orderItems.length -
                              3}{" "}
                            More Item
                            {orderItems.length -
                              3 >
                            1
                              ? "s"
                              : ""}
                            <ChevronDown
                              size={14}
                            />
                          </>
                        )}
                      </button>
                    )}

                    {/* COMPLETE DETAILS */}

                    {isExpanded && (
                      <div className="mt-5 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/40">

                        {/* DETAILS HEADER */}

                        <div className="border-b border-orange-100 bg-orange-50 px-4 py-4 sm:px-5">
                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6A00] text-white shadow-sm">
                              <Package
                                size={18}
                              />
                            </div>

                            <div>
                              <h3 className="text-sm font-black text-[#172033]">
                                Complete Order Details
                              </h3>

                              <p className="mt-0.5 text-[11px] text-slate-500">
                                Full information about
                                this order
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5">

                          {/* INFO CARDS */}

                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                            {/* ORDER DATE */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4">
                              <div className="flex items-center gap-2">
                                <CalendarDays
                                  size={16}
                                  className="text-[#FF6A00]"
                                />

                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                  Placed On
                                </p>
                              </div>

                              <p className="mt-2 text-sm font-bold text-[#172033]">
                                {formatDateTime(
                                  orderDate
                                )}
                              </p>
                            </div>

                            {/* PAYMENT */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4">
                              <div className="flex items-center gap-2">
                                <CreditCard
                                  size={16}
                                  className="text-[#FF6A00]"
                                />

                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                  Payment
                                </p>
                              </div>

                              <p className="mt-2 text-sm font-bold text-[#172033]">
                                {payment}
                              </p>
                            </div>

                            {/* ITEMS */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4">
                              <div className="flex items-center gap-2">
                                <ShoppingBag
                                  size={16}
                                  className="text-[#FF6A00]"
                                />

                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                  Total Items
                                </p>
                              </div>

                              <p className="mt-2 text-sm font-bold text-[#172033]">
                                {totalQuantity}
                              </p>
                            </div>

                            {/* TOTAL */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4">
                              <div className="flex items-center gap-2">
                                <Package
                                  size={16}
                                  className="text-[#FF6A00]"
                                />

                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                  Order Total
                                </p>
                              </div>

                              <p className="mt-2 text-sm font-black text-[#FF6A00]">
                                Rs.{" "}
                                {formatPrice(
                                  total
                                )}
                              </p>
                            </div>
                          </div>

                          {/* CUSTOMER + ADDRESS */}

                          <div className="mt-4 grid gap-4 lg:grid-cols-2">

                            {/* DELIVERY */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4">

                              <div className="flex items-center gap-2">
                                <MapPin
                                  size={17}
                                  className="text-[#FF6A00]"
                                />

                                <p className="text-xs font-black text-[#172033]">
                                  Delivery Information
                                </p>
                              </div>

                              <div className="mt-3 space-y-1.5 text-sm">

                                <p className="font-bold text-[#172033]">
                                  {customerName}
                                </p>

                                {customerPhone && (
                                  <p className="text-slate-500">
                                    {customerPhone}
                                  </p>
                                )}

                                {customerEmail && (
                                  <p className="break-all text-slate-500">
                                    {customerEmail}
                                  </p>
                                )}

                                <p className="pt-1 leading-6 text-slate-500">
                                  {address}
                                </p>
                              </div>
                            </div>

                            {/* ORDER SUMMARY */}

                            <div className="rounded-xl border border-orange-100 bg-white p-4">

                              <div className="flex items-center gap-2">
                                <ShoppingBag
                                  size={17}
                                  className="text-[#FF6A00]"
                                />

                                <p className="text-xs font-black text-[#172033]">
                                  Order Summary
                                </p>
                              </div>

                              <div className="mt-3 space-y-2.5 text-sm">

                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-500">
                                    Subtotal
                                  </span>

                                  <span className="font-bold text-[#172033]">
                                    Rs.{" "}
                                    {formatPrice(
                                      subtotal
                                    )}
                                  </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-500">
                                    Shipping
                                  </span>

                                  <span className="font-bold text-[#172033]">
                                    {shipping ===
                                    0
                                      ? "Free"
                                      : `Rs. ${formatPrice(
                                          shipping
                                        )}`}
                                  </span>
                                </div>

                                <div className="flex justify-between gap-4 border-t border-orange-100 pt-2.5">
                                  <span className="font-black text-[#172033]">
                                    Total
                                  </span>

                                  <span className="font-black text-[#FF6A00]">
                                    Rs.{" "}
                                    {formatPrice(
                                      total
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* NOTES */}

                          {orderNotes && (
                            <div className="mt-4 rounded-xl border border-orange-100 bg-white p-4">

                              <p className="text-xs font-black text-[#172033]">
                                Order Notes
                              </p>

                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                {orderNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* BASIC DETAILS */}

                    <div className="mt-5 grid gap-4 border-t border-orange-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">

                      {/* PAYMENT */}

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Payment
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#172033]">
                          {payment}
                        </p>
                      </div>

                      {/* ADDRESS */}

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Delivery Address
                        </p>

                        <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-600">
                          {address}
                        </p>
                      </div>

                      {/* TOTAL */}

                      <div className="sm:text-right">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Order Total
                        </p>

                        <p className="mt-1 text-xl font-black text-[#FF6A00]">
                          Rs.{" "}
                          {formatPrice(
                            total
                          )}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-5 flex flex-wrap gap-2.5">

                      {/* VIEW DETAILS */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleDetails(
                            orderId
                          )
                        }
                        className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-black transition ${
                          isExpanded
                            ? "border-orange-200 bg-orange-50 text-[#FF6A00]"
                            : "border-orange-100 bg-white text-[#172033] hover:border-orange-200 hover:bg-orange-50 hover:text-[#FF6A00]"
                        }`}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp
                              size={16}
                            />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <Eye size={15} />
                            View Details
                          </>
                        )}
                      </button>

                      {/* REORDER */}

                      <button
                        type="button"
                        onClick={() =>
                          reorder(order)
                        }
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-4 text-xs font-black text-white shadow-sm shadow-orange-100 transition hover:bg-orange-600"
                      >
                        <RotateCcw
                          size={15}
                        />

                        Reorder
                      </button>

                      {/* REVIEW */}

                      {canReview && (
                        <Link
                          href="/reviews"
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-orange-100 bg-white px-4 text-xs font-black text-[#172033] transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#FF6A00]"
                        >
                          <Star size={15} />

                          Review
                        </Link>
                      )}

                      {/* CANCEL */}

                      {canCancel && (
                        <button
                          type="button"
                          onClick={() =>
                            cancelOrder(
                              order
                            )
                          }
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 text-xs font-black text-red-500 transition hover:bg-red-50"
                        >
                          <X size={15} />

                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>

        {/* BOTTOM CTA */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-white">

          <div className="flex flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7">

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6A00]">
                Keep Shopping
              </p>

              <h2 className="mt-1 text-xl font-black text-[#172033]">
                Discover something new
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explore the latest products and
                deals from Velora.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-black text-white shadow-sm shadow-orange-100 transition hover:bg-orange-600"
            >
              Shop Now

              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}