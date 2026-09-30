
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  User,
  Wallet,
  Building2,
  Smartphone,
} from "lucide-react";

const SHIPPING_FEE = 250;
const FREE_SHIPPING_LIMIT = 5000;

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

const PAYMENT_METHODS = [
  {
    id: "Cash on Delivery",
    title: "Cash on Delivery",
    description: "Pay when your order arrives.",
    icon: Package,
  },
  {
    id: "EasyPaisa",
    title: "EasyPaisa",
    description: "Pay securely using EasyPaisa.",
    icon: Smartphone,
  },
  {
    id: "JazzCash",
    title: "JazzCash",
    description: "Pay securely using JazzCash.",
    icon: Smartphone,
  },
  {
    id: "Bank Transfer",
    title: "Bank Transfer",
    description: "Transfer payment directly to our bank account.",
    icon: Building2,
  },
  {
    id: "Credit / Debit Card",
    title: "Credit / Debit Card",
    description: "Pay securely using your bank card.",
    icon: CreditCard,
  },
];

function getItemPrice(item) {
  return Number(item?.price) || 0;
}

function getItemQuantity(item) {
  return Math.max(1, Number(item?.quantity) || 1);
}

function getItemImage(item) {
  if (item?.image) return item.image;

  if (Array.isArray(item?.images) && item.images.length > 0) {
    return item.images[0];
  }

  return "/placeholder.png";
}

function getItemName(item) {
  return item?.name || item?.title || "Product";
}

function createOrderId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `VEL-${random}`;
}

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [paymentDetails, setPaymentDetails] = useState({
    accountName: "",
    accountNumber: "",
    transactionId: "",
    bankName: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedCart = localStorage.getItem("veloraCart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + getItemPrice(item) * getItemQuantity(item);
    }, 0);
  }, [cart]);

  const shipping = useMemo(() => {
    if (subtotal <= 0) return 0;

    return subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_FEE;
  }, [subtotal]);

  const total = subtotal + shipping;

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + getItemQuantity(item);
    }, 0);
  }, [cart]);

  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_LIMIT) * 100,
    100
  );

  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_LIMIT - subtotal,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handlePaymentDetailChange(event) {
    const { name, value } = event.target;

    setPaymentDetails((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function selectPaymentMethod(method) {
    setPaymentMethod(method);

    setErrors((previous) => ({
      ...previous,
      payment: "",
      accountName: "",
      accountNumber: "",
      transactionId: "",
      bankName: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    /*
     * Online payment validation.
     *
     * NOTE:
     * This is front-end/demo validation only.
     * Real payment processing should be connected
     * to an actual payment gateway/backend.
     */

    if (
      paymentMethod === "EasyPaisa" ||
      paymentMethod === "JazzCash"
    ) {
      if (!paymentDetails.accountName.trim()) {
        newErrors.accountName = "Account name is required.";
      }

      if (!paymentDetails.accountNumber.trim()) {
        newErrors.accountNumber =
          "Mobile/account number is required.";
      } else if (
        paymentDetails.accountNumber.replace(/\D/g, "").length < 10
      ) {
        newErrors.accountNumber =
          "Enter a valid mobile/account number.";
      }

      if (!paymentDetails.transactionId.trim()) {
        newErrors.transactionId =
          "Transaction ID is required.";
      }
    }

    if (paymentMethod === "Bank Transfer") {
      if (!paymentDetails.accountName.trim()) {
        newErrors.accountName = "Account holder name is required.";
      }

      if (!paymentDetails.bankName.trim()) {
        newErrors.bankName = "Bank name is required.";
      }

      if (!paymentDetails.transactionId.trim()) {
        newErrors.transactionId =
          "Transaction/reference ID is required.";
      }
    }

    if (paymentMethod === "Credit / Debit Card") {
      if (!paymentDetails.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required.";
      }

      const cleanCardNumber =
        paymentDetails.cardNumber.replace(/\s/g, "");

      if (!cleanCardNumber) {
        newErrors.cardNumber = "Card number is required.";
      } else if (cleanCardNumber.length < 12) {
        newErrors.cardNumber = "Enter a valid card number.";
      }

      if (!paymentDetails.expiry.trim()) {
        newErrors.expiry = "Expiry date is required.";
      }

      if (!paymentDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required.";
      } else if (paymentDetails.cvv.length < 3) {
        newErrors.cvv = "Enter a valid CVV.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function updateCartItemQuantity(index, newQuantity) {
    const quantity = Math.max(1, Number(newQuantity) || 1);

    const updatedCart = cart.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            quantity,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "veloraCart",
      JSON.stringify(updatedCart)
    );
  }

  function removeCartItem(index) {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "veloraCart",
      JSON.stringify(updatedCart)
    );
  }

  function getSavedPaymentDetails() {
    /*
     * Never store real card CVV/card information in localStorage.
     *
     * For this frontend demo, card details are intentionally
     * excluded from the saved order.
     */

    if (paymentMethod === "Cash on Delivery") {
      return {};
    }

    if (
      paymentMethod === "EasyPaisa" ||
      paymentMethod === "JazzCash"
    ) {
      return {
        accountName: paymentDetails.accountName.trim(),
        accountNumber: paymentDetails.accountNumber.trim(),
        transactionId: paymentDetails.transactionId.trim(),
      };
    }

    if (paymentMethod === "Bank Transfer") {
      return {
        accountName: paymentDetails.accountName.trim(),
        bankName: paymentDetails.bankName.trim(),
        transactionId: paymentDetails.transactionId.trim(),
      };
    }

    if (paymentMethod === "Credit / Debit Card") {
      const cleanCardNumber =
        paymentDetails.cardNumber.replace(/\s/g, "");

      return {
        cardName: paymentDetails.cardName.trim(),
        cardLast4: cleanCardNumber.slice(-4),
        expiry: paymentDetails.expiry.trim(),
      };
    }

    return {};
  }

  function handlePlaceOrder(event) {
    event.preventDefault();

    if (placingOrder || orderPlaced) return;

    if (!cart.length) {
      router.push("/shop");
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setPlacingOrder(true);

    try {
      const orderId = createOrderId();

      const newOrder = {
        id: orderId,
        orderId,
        status: "Pending",
        createdAt: new Date().toISOString(),

        items: cart.map((item) => ({
          ...item,
          quantity: getItemQuantity(item),
        })),

        subtotal,
        shipping,
        total,

        paymentMethod,

        paymentDetails: getSavedPaymentDetails(),

        shippingAddress: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
          notes: form.notes.trim(),
        },
      };

      let existingOrders = [];

      try {
        const savedOrders =
          localStorage.getItem("veloraOrders");

        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);

          if (Array.isArray(parsedOrders)) {
            existingOrders = parsedOrders;
          }
        }
      } catch (error) {
        console.error(
          "Failed to read existing orders:",
          error
        );
      }

      const updatedOrders = [
        newOrder,
        ...existingOrders,
      ];

      localStorage.setItem(
        "veloraOrders",
        JSON.stringify(updatedOrders)
      );

      localStorage.removeItem("veloraCart");

      setCart([]);
      setOrderPlaced(true);

      setTimeout(() => {
        router.push(
          `/orders?success=true&order=${orderId}`
        );
      }, 700);
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      setPlacingOrder(false);

      alert(
        "Something went wrong while placing your order. Please try again."
      );
    }
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-8 h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </main>
    );
  }

  if (!cart.length && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center px-4 py-12 sm:px-6">
          <div className="w-full rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <ShoppingBag
                size={34}
                className="text-[#FF6A00]"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black text-[#172033] sm:text-3xl">
              Your Cart Is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              You need to add some products to your cart
              before you can continue to checkout.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF6A00] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600"
            >
              Start Shopping
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-black text-[#FF6A00] transition hover:text-orange-600"
          >
            <ArrowLeft size={19} />
            Back
          </button>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span>Cart</span>
                <ChevronRight size={14} />
                <span className="text-[#FF6A00]">
                  Checkout
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
                Secure Checkout
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Complete your details and place your Velora
                order.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-xs font-bold text-green-700">
              <Lock size={15} />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_390px]">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Customer Information */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <User
                    size={21}
                    className="text-[#FF6A00]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-black text-[#172033]">
                    Customer Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Enter your contact information.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  error={errors.fullName}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="03XX XXXXXXX"
                  required
                  error={errors.phone}
                  icon={<Phone size={16} />}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  error={errors.email}
                  className="sm:col-span-2"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <MapPin
                    size={21}
                    className="text-[#FF6A00]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-black text-[#172033]">
                    Shipping Address
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <InputField
                  label="Complete Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House / Flat / Street / Area"
                  required
                  error={errors.address}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Karachi"
                    required
                    error={errors.city}
                  />

                  <InputField
                    label="Postal Code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#172033]">
                    Delivery Notes
                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special instructions for delivery..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF6A00] focus:ring-4 focus:ring-orange-50"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <CreditCard
                    size={21}
                    className="text-[#FF6A00]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-black text-[#172033]">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Select your preferred payment option.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;

                  const active =
                    paymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        selectPaymentMethod(method.id)
                      }
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition ${
                        active
                          ? "border-[#FF6A00] bg-orange-50/50"
                          : "border-slate-200 hover:border-orange-200"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            active
                              ? "bg-[#FF6A00] text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-black text-[#172033]">
                            {method.title}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {method.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          active
                            ? "border-[#FF6A00]"
                            : "border-slate-300"
                        }`}
                      >
                        {active && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6A00]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* EasyPaisa Details */}
              {paymentMethod === "EasyPaisa" && (
                <div className="mt-5 rounded-2xl border border-green-100 bg-green-50/50 p-4 sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                      <Wallet
                        size={21}
                        className="text-green-700"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#172033]">
                        EasyPaisa Payment
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Enter your EasyPaisa payment details.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <InputField
                      label="Account Name"
                      name="accountName"
                      value={paymentDetails.accountName}
                      onChange={handlePaymentDetailChange}
                      placeholder="Name on EasyPaisa account"
                      required
                      error={errors.accountName}
                    />

                    <InputField
                      label="EasyPaisa Mobile Number"
                      name="accountNumber"
                      type="tel"
                      value={paymentDetails.accountNumber}
                      onChange={handlePaymentDetailChange}
                      placeholder="03XX XXXXXXX"
                      required
                      error={errors.accountNumber}
                    />

                    <InputField
                      label="Transaction ID"
                      name="transactionId"
                      value={paymentDetails.transactionId}
                      onChange={handlePaymentDetailChange}
                      placeholder="Enter transaction/reference ID"
                      required
                      error={errors.transactionId}
                    />
                  </div>
                </div>
              )}

              {/* JazzCash Details */}
              {paymentMethod === "JazzCash" && (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                      <Wallet
                        size={21}
                        className="text-blue-700"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#172033]">
                        JazzCash Payment
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Enter your JazzCash payment details.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <InputField
                      label="Account Name"
                      name="accountName"
                      value={paymentDetails.accountName}
                      onChange={handlePaymentDetailChange}
                      placeholder="Name on JazzCash account"
                      required
                      error={errors.accountName}
                    />

                    <InputField
                      label="JazzCash Mobile Number"
                      name="accountNumber"
                      type="tel"
                      value={paymentDetails.accountNumber}
                      onChange={handlePaymentDetailChange}
                      placeholder="03XX XXXXXXX"
                      required
                      error={errors.accountNumber}
                    />

                    <InputField
                      label="Transaction ID"
                      name="transactionId"
                      value={paymentDetails.transactionId}
                      onChange={handlePaymentDetailChange}
                      placeholder="Enter transaction/reference ID"
                      required
                      error={errors.transactionId}
                    />
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {paymentMethod === "Bank Transfer" && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                      <Building2
                        size={21}
                        className="text-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#172033]">
                        Bank Transfer
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Enter your transfer information.
                      </p>
                    </div>
                  </div>

                  {/* Demo Bank Information */}
                  <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Velora Bank Details
                    </p>

                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Bank
                        </span>

                        <span className="font-bold text-[#172033]">
                          Your Bank Name
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Account Name
                        </span>

                        <span className="font-bold text-[#172033]">
                          Velora
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">
                          Account Number
                        </span>

                        <span className="font-bold text-[#172033]">
                          XXXX-XXXX-XXXX
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <InputField
                      label="Account Holder Name"
                      name="accountName"
                      value={paymentDetails.accountName}
                      onChange={handlePaymentDetailChange}
                      placeholder="Enter account holder name"
                      required
                      error={errors.accountName}
                    />

                    <InputField
                      label="Bank Name"
                      name="bankName"
                      value={paymentDetails.bankName}
                      onChange={handlePaymentDetailChange}
                      placeholder="Enter your bank name"
                      required
                      error={errors.bankName}
                    />

                    <InputField
                      label="Transaction / Reference ID"
                      name="transactionId"
                      value={paymentDetails.transactionId}
                      onChange={handlePaymentDetailChange}
                      placeholder="Enter transfer reference"
                      required
                      error={errors.transactionId}
                    />
                  </div>
                </div>
              )}

              {/* Card Payment */}
              {paymentMethod === "Credit / Debit Card" && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                      <CreditCard
                        size={21}
                        className="text-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#172033]">
                        Card Payment
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Enter your card information.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <InputField
                      label="Cardholder Name"
                      name="cardName"
                      value={paymentDetails.cardName}
                      onChange={handlePaymentDetailChange}
                      placeholder="Name on card"
                      required
                      error={errors.cardName}
                    />

                    <InputField
                      label="Card Number"
                      name="cardNumber"
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentDetailChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                      error={errors.cardNumber}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Expiry"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={handlePaymentDetailChange}
                        placeholder="MM/YY"
                        required
                        error={errors.expiry}
                      />

                      <InputField
                        label="CVV"
                        name="cvv"
                        type="password"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentDetailChange}
                        placeholder="CVV"
                        required
                        error={errors.cvv}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500">
                    <Lock
                      size={15}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <span>
                      Your full card number and CVV are not
                      saved with the order.
                    </span>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                <Lock
                  size={15}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <span>
                  Your order information is securely stored
                  and used only for processing your order.
                </span>
              </div>
            </section>

            {/* Mobile place order */}
            <div className="lg:hidden">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                totalItems={totalItems}
                freeShippingProgress={freeShippingProgress}
                remainingForFreeShipping={
                  remainingForFreeShipping
                }
                cart={cart}
                updateCartItemQuantity={
                  updateCartItemQuantity
                }
                removeCartItem={removeCartItem}
              />

              <button
                type="submit"
                disabled={placingOrder || orderPlaced}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder ? (
                  <>
                    <Spinner />
                    Placing Order...
                  </>
                ) : orderPlaced ? (
                  <>
                    <Check size={19} />
                    Order Placed
                  </>
                ) : (
                  <>
                    Place Order
                    <ChevronRight size={19} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                totalItems={totalItems}
                freeShippingProgress={freeShippingProgress}
                remainingForFreeShipping={
                  remainingForFreeShipping
                }
                cart={cart}
                updateCartItemQuantity={
                  updateCartItemQuantity
                }
                removeCartItem={removeCartItem}
              />

              <button
                type="submit"
                disabled={placingOrder || orderPlaced}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6A00] px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder ? (
                  <>
                    <Spinner />
                    Placing Order...
                  </>
                ) : orderPlaced ? (
                  <>
                    <Check size={19} />
                    Order Placed
                  </>
                ) : (
                  <>
                    Place Order
                    <ChevronRight size={19} />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                <Lock size={14} />
                Safe & Secure Checkout
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
  icon,
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-bold text-[#172033]">
        {label}

        {required && (
          <span className="ml-1 text-[#FF6A00]">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-50"
              : "border-slate-200 focus:border-[#FF6A00] focus:ring-orange-50"
          }`}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function OrderSummary({
  subtotal,
  shipping,
  total,
  totalItems,
  freeShippingProgress,
  remainingForFreeShipping,
  cart,
  updateCartItemQuantity,
  removeCartItem,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#172033]">
              Order Summary
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <ShoppingBag
            size={21}
            className="text-[#FF6A00]"
          />
        </div>

        {/* Free shipping */}
        {subtotal > 0 &&
          subtotal < FREE_SHIPPING_LIMIT && (
            <div className="mt-5 rounded-xl bg-orange-50 p-4">
              <div className="flex items-start gap-2">
                <Truck
                  size={17}
                  className="mt-0.5 shrink-0 text-[#FF6A00]"
                />

                <p className="text-xs font-semibold leading-5 text-slate-600">
                  Add{" "}
                  <span className="font-black text-[#FF6A00]">
                    Rs.{" "}
                    {remainingForFreeShipping.toLocaleString()}
                  </span>{" "}
                  more to get free delivery.
                </p>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#FF6A00] transition-all"
                  style={{
                    width: `${freeShippingProgress}%`,
                  }}
                />
              </div>
            </div>
          )}

        {subtotal >= FREE_SHIPPING_LIMIT && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3.5 text-xs font-bold text-green-700">
            <Check size={16} />
            You unlocked free delivery!
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="max-h-[430px] overflow-y-auto px-5 sm:px-6">
        <div className="divide-y divide-slate-100">
          {cart.map((item, index) => {
            const price = getItemPrice(item);
            const quantity = getItemQuantity(item);

            return (
              <div
                key={`${item?.id || item?._id || index}-${index}`}
                className="py-5"
              >
                <div className="flex gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={getItemImage(item)}
                      alt={getItemName(item)}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#172033]">
                      {getItemName(item)}
                    </h3>

                    <p className="mt-1 text-sm font-black text-[#FF6A00]">
                      Rs. {price.toLocaleString()}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartItemQuantity(
                              index,
                              quantity - 1
                            )
                          }
                          disabled={quantity <= 1}
                          className="flex h-7 w-7 items-center justify-center text-sm font-bold text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-7 min-w-8 items-center justify-center border-x border-slate-200 px-2 text-xs font-black text-[#172033]">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartItemQuantity(
                              index,
                              quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center text-sm font-bold text-slate-500 transition hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeCartItem(index)
                        }
                        className="text-xs font-bold text-red-500 transition hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prices */}
      <div className="border-t border-slate-100 p-5 sm:p-6">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span>Subtotal</span>

            <span className="font-bold text-slate-700">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-500">
            <span>Delivery</span>

            {shipping === 0 ? (
              <span className="font-bold text-green-600">
                Free
              </span>
            ) : (
              <span className="font-bold text-slate-700">
                Rs. {shipping.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="my-5 h-px bg-slate-100" />

        <div className="flex items-center justify-between">
          <span className="text-base font-black text-[#172033]">
            Total
          </span>

          <span className="text-xl font-black text-[#FF6A00]">
            Rs. {total.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

