import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  CreditCard,
  FileText,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Smartphone,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { formatINR } from "../components/PriceTag";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import { applyCoupon } from "../data/sampleProducts";
import type { Coupon, Order, OrderAddress, OrderItem } from "../types";

const DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 4900;
const GST_RATE = 0.18;
const WHATSAPP_NUMBER = "+919334808340";

type PaymentType = "upi" | "card" | "wallet" | "cod";

interface UpiOption {
  id: string;
  label: string;
  color: string;
}

interface WalletOption {
  id: string;
  label: string;
  color: string;
}

const UPI_OPTIONS: UpiOption[] = [
  { id: "gpay", label: "Google Pay", color: "#4285F4" },
  { id: "phonepe", label: "PhonePe", color: "#6739B7" },
  { id: "paytm", label: "Paytm", color: "#00BAF2" },
  { id: "other_upi", label: "Other UPI", color: "#00d4c8" },
];

const WALLET_OPTIONS: WalletOption[] = [
  { id: "amazonpay", label: "Amazon Pay", color: "#FF9900" },
  { id: "mobikwik", label: "MobiKwik", color: "#1A75DB" },
  { id: "freecharge", label: "FreeCharge", color: "#E00000" },
];

interface SplitState {
  enabled: boolean;
  method1: string;
  method2: string;
  amount1InPaise: number;
  amount2InPaise: number;
  percent: number;
}

function generateOrderId(): string {
  return `RBR${Date.now().toString(36).toUpperCase()}`;
}

function generatePDFInvoice(order: Order) {
  const sep1 = "─".repeat(50);
  const sep2 = "═".repeat(50);
  const itemLines = order.items.map(
    (item) =>
      `${item.product.name.substring(0, 30).padEnd(30)} x${item.quantity}  ${formatINR(item.priceInPaise * item.quantity)}`,
  );
  const parts: string[] = [
    "RAHBAR \u2014 Premium Shopping",
    "Order Invoice",
    "",
    `Order ID: ${order.id}`,
    `Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`,
    "",
    "DELIVERY ADDRESS",
    order.address.name,
    order.address.line1,
    `${order.address.city}, ${order.address.state} - ${order.address.pincode}`,
    `Phone: ${order.address.phone}`,
    "",
    "ORDER ITEMS",
    sep1,
    ...itemLines,
    sep1,
    "",
    `Subtotal: ${formatINR(order.totalInPaise + order.discountInPaise)}`,
    order.discountInPaise > 0
      ? `Discount (${order.couponCode ?? ""}): -${formatINR(order.discountInPaise)}`
      : "",
    `GST (18%): ${formatINR(Math.round((order.totalInPaise / 1.18) * 0.18))}`,
    `GRAND TOTAL: ${formatINR(order.totalInPaise)}`,
    "",
    `Payment Method: ${order.paymentMethod}`,
    "",
    sep2,
    "Rahbar Verified \u2713",
    "Thank you for shopping with Rahbar!",
    `For support, contact us on WhatsApp: ${WHATSAPP_NUMBER}`,
  ];

  const content = parts.filter(Boolean).join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Rahbar_Invoice_${order.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function openWhatsApp(order: Order) {
  const itemsList = order.items
    .map((i) => `${i.product.name} x${i.quantity}`)
    .join(", ");
  const msg = encodeURIComponent(
    `Hi! I placed an order on Rahbar.\n\nOrder ID: ${order.id}\nItems: ${itemsList}\nTotal: ${formatINR(order.totalInPaise)}\nPayment: ${order.paymentMethod}\n\nPlease confirm! \uD83D\uDED2`,
  );
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${msg}`,
    "_blank",
  );
}

function InputField({
  id,
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span style={{ color: "oklch(0.65 0.19 22)" }}> *</span>}
      </label>
      <input
        id={id}
        {...props}
        className="w-full px-3 py-2.5 rounded-lg text-sm bg-input text-foreground placeholder:text-muted-foreground border transition-colors focus:outline-none"
        style={{ borderColor: "oklch(0.28 0 0)" }}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { showToast, addNotification } = useNotifications();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Bihar");
  const [pincode, setPincode] = useState("");

  const [paymentType, setPaymentType] = useState<PaymentType>("upi");
  const [selectedUpi, setSelectedUpi] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("amazonpay");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [splitState, setSplitState] = useState<SplitState | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("splitPayment");
      if (raw) setSplitState(JSON.parse(raw) as SplitState);
      const couponRaw = sessionStorage.getItem("appliedCoupon");
      if (couponRaw) setAppliedCoupon(JSON.parse(couponRaw) as Coupon);
    } catch {
      /* ignore */
    }
  }, []);

  const subtotal = items.reduce(
    (s, i) => s + i.product.priceInPaise * i.quantity,
    0,
  );
  const discountInPaise = appliedCoupon
    ? applyCoupon(appliedCoupon.code, subtotal).discountInPaise
    : 0;
  const afterDiscount = subtotal - discountInPaise;
  const delivery = afterDiscount >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const gst = Math.round(afterDiscount * GST_RATE);
  const grandTotal = afterDiscount + delivery + gst;

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (v: string) => {
    const clean = v.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  };

  const getPaymentLabel = useCallback(() => {
    if (splitState?.enabled) {
      const m1 = splitState.method1.toUpperCase();
      const m2 = splitState.method2.toUpperCase();
      return `Split: ${m1} + ${m2}`;
    }
    if (paymentType === "upi")
      return UPI_OPTIONS.find((u) => u.id === selectedUpi)?.label ?? "UPI";
    if (paymentType === "card") return "Credit/Debit Card";
    if (paymentType === "wallet")
      return (
        WALLET_OPTIONS.find((w) => w.id === selectedWallet)?.label ?? "Wallet"
      );
    return "Cash on Delivery";
  }, [splitState, paymentType, selectedUpi, selectedWallet]);

  const handlePlaceOrder = useCallback(async () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !line1.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      showToast("error", "Please fill in all required address fields");
      return;
    }
    if (paymentType === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      showToast("error", "Please enter complete card details");
      return;
    }

    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 2000));

    const address: OrderAddress = { name, phone, line1, city, state, pincode };
    const orderItems: OrderItem[] = items.map((i) => ({
      product: i.product,
      quantity: i.quantity,
      priceInPaise: i.product.priceInPaise,
    }));

    const order: Order = {
      id: generateOrderId(),
      items: orderItems,
      totalInPaise: grandTotal,
      discountInPaise,
      couponCode: appliedCoupon?.code,
      status: "ordered",
      address,
      paymentMethod: getPaymentLabel(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      trackingSteps: [
        {
          status: "ordered",
          label: "Order Placed",
          completed: true,
          current: true,
          timestamp: Date.now(),
        },
        {
          status: "packed",
          label: "Order Packed",
          completed: false,
          current: false,
        },
        {
          status: "shipped",
          label: "Shipped",
          completed: false,
          current: false,
        },
        {
          status: "out_for_delivery",
          label: "Out for Delivery",
          completed: false,
          current: false,
        },
        {
          status: "delivered",
          label: "Delivered",
          completed: false,
          current: false,
        },
      ],
    };

    setIsPlacing(false);
    setPlaced(true);
    setPlacedOrder(order);
    clearCart();
    sessionStorage.removeItem("splitPayment");
    sessionStorage.removeItem("appliedCoupon");

    addNotification({
      type: "order",
      title: "Order Placed Successfully!",
      message: `Your order ${order.id} has been placed. Total: ${formatINR(order.totalInPaise)}`,
      link: `/orders/${order.id}`,
    });

    showToast("success", `Order ${order.id} placed! Opening WhatsApp...`);
    setTimeout(() => openWhatsApp(order), 1000);
  }, [
    name,
    phone,
    line1,
    city,
    state,
    pincode,
    paymentType,
    cardNumber,
    cardExpiry,
    cardCvv,
    items,
    grandTotal,
    discountInPaise,
    appliedCoupon,
    getPaymentLabel,
    showToast,
    addNotification,
    clearCart,
  ]);

  // Success state
  if (placed && placedOrder) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-6 text-center"
        data-ocid="checkout.success_state"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.675 0.25 178 / 0.15)",
            border: "2px solid oklch(0.675 0.25 178)",
          }}
        >
          <Check
            className="w-12 h-12"
            style={{ color: "oklch(0.675 0.25 178)" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-display font-bold text-foreground mb-1">
            Order Placed!
          </h2>
          <p className="text-xs text-muted-foreground mb-2">
            Order ID:{" "}
            <span style={{ color: "oklch(0.72 0.26 90)" }}>
              {placedOrder.id}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Total paid:{" "}
            <span className="font-bold text-foreground">
              {formatINR(placedOrder.totalInPaise)}
            </span>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-2 w-full"
        >
          <button
            type="button"
            onClick={() => generatePDFInvoice(placedOrder)}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth"
            style={{
              background: "oklch(0.72 0.26 90 / 0.15)",
              color: "oklch(0.72 0.26 90)",
              border: "1px solid oklch(0.72 0.26 90 / 0.3)",
            }}
            data-ocid="checkout.download_invoice_button"
          >
            <FileText className="w-4 h-4" />
            Download Invoice
          </button>
          <button
            type="button"
            onClick={() => openWhatsApp(placedOrder)}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth"
            style={{ background: "#25D366", color: "#fff" }}
            data-ocid="checkout.whatsapp_button"
          >
            <MessageCircle className="w-4 h-4" />
            Share on WhatsApp
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/orders" })}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth"
            style={{
              background: "oklch(0.675 0.25 178 / 0.15)",
              color: "oklch(0.675 0.25 178)",
              border: "1px solid oklch(0.675 0.25 178 / 0.3)",
            }}
            data-ocid="checkout.view_orders_button"
          >
            Track My Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-28" data-ocid="checkout.page">
      {/* Header */}
      <div
        className="px-4 py-4 border-b flex items-center gap-3 sticky top-0 z-20"
        style={{
          background: "oklch(0.12 0 0)",
          borderColor: "oklch(0.22 0 0)",
        }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/cart" })}
          className="p-1.5 rounded-lg transition-smooth hover:bg-muted"
          aria-label="Back to cart"
          data-ocid="checkout.back_button"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">
          Checkout
        </h1>
        <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Shield
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.675 0.25 178)" }}
          />
          Secure
        </div>
      </div>

      {/* Delivery Address */}
      <Section
        title="Delivery Address"
        icon={
          <MapPin
            className="w-4 h-4"
            style={{ color: "oklch(0.675 0.25 178)" }}
          />
        }
      >
        <div className="flex flex-col gap-3">
          <div className="col-span-2">
            <InputField
              id="checkout-name"
              label="Full Name"
              required
              placeholder="Gulab Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="checkout.name_input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              id="checkout-phone"
              label="Phone"
              required
              placeholder="9876543210"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-ocid="checkout.phone_input"
            />
            <InputField
              id="checkout-email"
              label="Email (optional)"
              placeholder="you@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="checkout.email_input"
            />
          </div>
          <InputField
            id="checkout-line1"
            label="Address Line 1"
            required
            placeholder="Street / Locality / Colony"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            data-ocid="checkout.address_input"
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              id="checkout-city"
              label="City"
              required
              placeholder="Patna"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              data-ocid="checkout.city_input"
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="checkout-state"
                className="text-xs font-medium text-muted-foreground"
              >
                State <span style={{ color: "oklch(0.65 0.19 22)" }}>*</span>
              </label>
              <select
                id="checkout-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-input text-foreground border focus:outline-none"
                style={{ borderColor: "oklch(0.28 0 0)" }}
                data-ocid="checkout.state_select"
              >
                {[
                  "Bihar",
                  "Jharkhand",
                  "UP",
                  "Delhi",
                  "Maharashtra",
                  "Karnataka",
                  "Tamil Nadu",
                  "West Bengal",
                  "Rajasthan",
                  "Gujarat",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <InputField
            id="checkout-pincode"
            label="Pincode"
            required
            placeholder="800001"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            data-ocid="checkout.pincode_input"
          />
        </div>
      </Section>

      {/* Payment Method */}
      <Section
        title="Payment Method"
        icon={
          <CreditCard
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.26 90)" }}
          />
        }
      >
        {splitState?.enabled ? (
          <SplitPaymentDisplay splitState={splitState} />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-2">
              {(["upi", "card", "wallet", "cod"] as PaymentType[]).map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPaymentType(type)}
                    className="flex flex-col items-center py-2.5 px-1 rounded-xl text-[10px] font-semibold transition-smooth gap-1.5"
                    style={{
                      background:
                        paymentType === type
                          ? "oklch(0.675 0.25 178 / 0.12)"
                          : "oklch(0.14 0 0)",
                      border: `1px solid ${paymentType === type ? "oklch(0.675 0.25 178 / 0.4)" : "oklch(0.25 0 0)"}`,
                      color:
                        paymentType === type
                          ? "oklch(0.675 0.25 178)"
                          : "oklch(0.55 0 0)",
                    }}
                    data-ocid={`checkout.payment_method.${type}`}
                  >
                    {type === "upi" && <Smartphone className="w-4 h-4" />}
                    {type === "card" && <CreditCard className="w-4 h-4" />}
                    {type === "wallet" && <Wallet className="w-4 h-4" />}
                    {type === "cod" && <Phone className="w-4 h-4" />}
                    {type === "upi"
                      ? "UPI"
                      : type === "card"
                        ? "Card"
                        : type === "wallet"
                          ? "Wallet"
                          : "COD"}
                  </button>
                ),
              )}
            </div>

            <AnimatePresence mode="wait">
              {paymentType === "upi" && (
                <motion.div
                  key="upi"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden flex flex-col gap-3"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {UPI_OPTIONS.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setSelectedUpi(u.id)}
                        className="py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-smooth flex items-center gap-2"
                        style={{
                          background:
                            selectedUpi === u.id
                              ? `${u.color}18`
                              : "oklch(0.14 0 0)",
                          border: `1px solid ${selectedUpi === u.id ? u.color : "oklch(0.25 0 0)"}`,
                          color:
                            selectedUpi === u.id ? u.color : "oklch(0.55 0 0)",
                        }}
                        data-ocid={`checkout.upi_option.${u.id}`}
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: u.color }}
                        />
                        {u.label}
                      </button>
                    ))}
                  </div>
                  <InputField
                    id="checkout-upi-id"
                    label="UPI ID"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    data-ocid="checkout.upi_id_input"
                  />
                </motion.div>
              )}

              {paymentType === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden flex flex-col gap-3"
                >
                  <InputField
                    id="checkout-card-number"
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    maxLength={19}
                    data-ocid="checkout.card_number_input"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      id="checkout-card-expiry"
                      label="Expiry (MM/YY)"
                      placeholder="12/26"
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      maxLength={5}
                      data-ocid="checkout.card_expiry_input"
                    />
                    <InputField
                      id="checkout-card-cvv"
                      label="CVV"
                      placeholder="\u2022\u2022\u2022"
                      type="password"
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(
                          e.target.value.replace(/\D/g, "").slice(0, 3),
                        )
                      }
                      maxLength={3}
                      data-ocid="checkout.card_cvv_input"
                    />
                  </div>
                </motion.div>
              )}

              {paymentType === "wallet" && (
                <motion.div
                  key="wallet"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden grid grid-cols-3 gap-2"
                >
                  {WALLET_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWallet(w.id)}
                      className="py-2.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-smooth"
                      style={{
                        background:
                          selectedWallet === w.id
                            ? `${w.color}18`
                            : "oklch(0.14 0 0)",
                        border: `1px solid ${selectedWallet === w.id ? w.color : "oklch(0.25 0 0)"}`,
                        color:
                          selectedWallet === w.id ? w.color : "oklch(0.55 0 0)",
                      }}
                      data-ocid={`checkout.wallet_option.${w.id}`}
                    >
                      {w.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {paymentType === "cod" && (
                <motion.div
                  key="cod"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-3 py-2.5 rounded-xl text-xs text-muted-foreground"
                    style={{
                      background: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                    }}
                  >
                    Pay in cash when your order arrives. No extra charges.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Section>

      {/* Order Summary */}
      <Section
        title="Order Summary"
        icon={
          <FileText
            className="w-4 h-4"
            style={{ color: "oklch(0.675 0.25 178)" }}
          />
        }
      >
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {item.product.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  x{item.quantity}
                </p>
              </div>
              <span className="text-xs font-bold text-foreground flex-shrink-0">
                {formatINR(item.product.priceInPaise * item.quantity)}
              </span>
            </div>
          ))}
          <div className="section-divider my-1" />
          {discountInPaise > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">
                Coupon ({appliedCoupon?.code})
              </span>
              <span style={{ color: "oklch(0.675 0.25 178)" }}>
                -{formatINR(discountInPaise)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Delivery</span>
            {delivery === 0 ? (
              <span style={{ color: "oklch(0.675 0.25 178)" }}>Free</span>
            ) : (
              <span className="text-foreground">{formatINR(delivery)}</span>
            )}
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="text-foreground">{formatINR(gst)}</span>
          </div>
          <div className="section-divider my-1" />
          <div className="flex justify-between text-sm font-bold">
            <span className="text-foreground">Total</span>
            <span style={{ color: "oklch(0.72 0.26 90)" }}>
              {formatINR(grandTotal)}
            </span>
          </div>
        </div>
      </Section>

      {/* Place Order */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-6 pt-3"
        style={{
          background:
            "linear-gradient(to top, oklch(0.08 0 0) 60%, transparent)",
        }}
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePlaceOrder}
          disabled={isPlacing || items.length === 0}
          className="w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-smooth disabled:opacity-60"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.26 90), oklch(0.65 0.26 70))",
            color: "oklch(0.08 0 0)",
            boxShadow: "0 4px 20px oklch(0.72 0.26 90 / 0.4)",
          }}
          data-ocid="checkout.place_order_button"
        >
          {isPlacing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>Place Order — {formatINR(grandTotal)}</>
          )}
        </motion.button>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 mt-4">
      <div
        className="rounded-xl p-4"
        style={{
          background: "oklch(0.12 0 0)",
          border: "1px solid oklch(0.22 0 0)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function SplitPaymentDisplay({ splitState }: { splitState: SplitState }) {
  const methodLabels: Record<string, string> = {
    upi: "UPI",
    card: "Card",
    wallet: "Wallet",
    cod: "COD",
  };
  return (
    <div
      className="px-3 py-3 rounded-xl text-sm"
      style={{
        background: "oklch(0.675 0.25 178 / 0.06)",
        border: "1px solid oklch(0.675 0.25 178 / 0.2)",
      }}
      data-ocid="checkout.split_payment_display"
    >
      <p className="text-xs text-muted-foreground mb-2">Split Payment Active</p>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <span className="text-xs font-medium text-foreground">
            {methodLabels[splitState.method1] ?? splitState.method1} (
            {splitState.percent}%)
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.675 0.25 178)" }}
          >
            {formatINR(splitState.amount1InPaise)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs font-medium text-foreground">
            {methodLabels[splitState.method2] ?? splitState.method2} (
            {100 - splitState.percent}%)
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.72 0.26 90)" }}
          >
            {formatINR(splitState.amount2InPaise)}
          </span>
        </div>
      </div>
    </div>
  );
}
