import { c as createLucideIcon, a as useNavigate, d as useCart, f as useNotifications, r as reactExports, n as applyCoupon, j as jsxRuntimeExports, M as MessageCircle } from "./index-DlPS0ULj.js";
import { f as formatINR } from "./PriceTag-CkD6WUie.js";
import { m as motion } from "./proxy-WUnn3icv.js";
import { C as Check, S as Shield } from "./shield-DYoXQhB-.js";
import { F as FileText } from "./file-text-9vclcQ2x.js";
import { C as ChevronLeft } from "./chevron-left-DBUeLXlU.js";
import { M as MapPin } from "./map-pin-UjxhfJQk.js";
import { C as CreditCard } from "./credit-card-C2xveg2v.js";
import { A as AnimatePresence } from "./index-CxIgKL95.js";
import { L as LoaderCircle } from "./loader-circle-BZJc9q0k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const DELIVERY_THRESHOLD = 5e4;
const DELIVERY_FEE = 4900;
const GST_RATE = 0.18;
const WHATSAPP_NUMBER = "+919334808340";
const UPI_OPTIONS = [
  { id: "gpay", label: "Google Pay", color: "#4285F4" },
  { id: "phonepe", label: "PhonePe", color: "#6739B7" },
  { id: "paytm", label: "Paytm", color: "#00BAF2" },
  { id: "other_upi", label: "Other UPI", color: "#00d4c8" }
];
const WALLET_OPTIONS = [
  { id: "amazonpay", label: "Amazon Pay", color: "#FF9900" },
  { id: "mobikwik", label: "MobiKwik", color: "#1A75DB" },
  { id: "freecharge", label: "FreeCharge", color: "#E00000" }
];
function generateOrderId() {
  return `RBR${Date.now().toString(36).toUpperCase()}`;
}
function generatePDFInvoice(order) {
  const sep1 = "─".repeat(50);
  const sep2 = "═".repeat(50);
  const itemLines = order.items.map(
    (item) => `${item.product.name.substring(0, 30).padEnd(30)} x${item.quantity}  ${formatINR(item.priceInPaise * item.quantity)}`
  );
  const parts = [
    "RAHBAR — Premium Shopping",
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
    order.discountInPaise > 0 ? `Discount (${order.couponCode ?? ""}): -${formatINR(order.discountInPaise)}` : "",
    `GST (18%): ${formatINR(Math.round(order.totalInPaise / 1.18 * 0.18))}`,
    `GRAND TOTAL: ${formatINR(order.totalInPaise)}`,
    "",
    `Payment Method: ${order.paymentMethod}`,
    "",
    sep2,
    "Rahbar Verified ✓",
    "Thank you for shopping with Rahbar!",
    `For support, contact us on WhatsApp: ${WHATSAPP_NUMBER}`
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
function openWhatsApp(order) {
  const itemsList = order.items.map((i) => `${i.product.name} x${i.quantity}`).join(", ");
  const msg = encodeURIComponent(
    `Hi! I placed an order on Rahbar.

Order ID: ${order.id}
Items: ${itemsList}
Total: ${formatINR(order.totalInPaise)}
Payment: ${order.paymentMethod}

Please confirm! 🛒`
  );
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${msg}`,
    "_blank"
  );
}
function InputField({
  id,
  label,
  required,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id, className: "text-xs font-medium text-muted-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.65 0.19 22)" }, children: " *" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        ...props,
        className: "w-full px-3 py-2.5 rounded-lg text-sm bg-input text-foreground placeholder:text-muted-foreground border transition-colors focus:outline-none",
        style: { borderColor: "oklch(0.28 0 0)" }
      }
    )
  ] });
}
function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { showToast, addNotification } = useNotifications();
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [line1, setLine1] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [state, setState] = reactExports.useState("Bihar");
  const [pincode, setPincode] = reactExports.useState("");
  const [paymentType, setPaymentType] = reactExports.useState("upi");
  const [selectedUpi, setSelectedUpi] = reactExports.useState("gpay");
  const [upiId, setUpiId] = reactExports.useState("");
  const [selectedWallet, setSelectedWallet] = reactExports.useState("amazonpay");
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [cardExpiry, setCardExpiry] = reactExports.useState("");
  const [cardCvv, setCardCvv] = reactExports.useState("");
  const [splitState, setSplitState] = reactExports.useState(null);
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const [isPlacing, setIsPlacing] = reactExports.useState(false);
  const [placed, setPlaced] = reactExports.useState(false);
  const [placedOrder, setPlacedOrder] = reactExports.useState(null);
  reactExports.useEffect(() => {
    try {
      const raw = sessionStorage.getItem("splitPayment");
      if (raw) setSplitState(JSON.parse(raw));
      const couponRaw = sessionStorage.getItem("appliedCoupon");
      if (couponRaw) setAppliedCoupon(JSON.parse(couponRaw));
    } catch {
    }
  }, []);
  const subtotal = items.reduce(
    (s, i) => s + i.product.priceInPaise * i.quantity,
    0
  );
  const discountInPaise = appliedCoupon ? applyCoupon(appliedCoupon.code, subtotal).discountInPaise : 0;
  const afterDiscount = subtotal - discountInPaise;
  const delivery = afterDiscount >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const gst = Math.round(afterDiscount * GST_RATE);
  const grandTotal = afterDiscount + delivery + gst;
  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => {
    const clean = v.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  };
  const getPaymentLabel = reactExports.useCallback(() => {
    var _a, _b;
    if (splitState == null ? void 0 : splitState.enabled) {
      const m1 = splitState.method1.toUpperCase();
      const m2 = splitState.method2.toUpperCase();
      return `Split: ${m1} + ${m2}`;
    }
    if (paymentType === "upi")
      return ((_a = UPI_OPTIONS.find((u) => u.id === selectedUpi)) == null ? void 0 : _a.label) ?? "UPI";
    if (paymentType === "card") return "Credit/Debit Card";
    if (paymentType === "wallet")
      return ((_b = WALLET_OPTIONS.find((w) => w.id === selectedWallet)) == null ? void 0 : _b.label) ?? "Wallet";
    return "Cash on Delivery";
  }, [splitState, paymentType, selectedUpi, selectedWallet]);
  const handlePlaceOrder = reactExports.useCallback(async () => {
    if (!name.trim() || !phone.trim() || !line1.trim() || !city.trim() || !pincode.trim()) {
      showToast("error", "Please fill in all required address fields");
      return;
    }
    if (paymentType === "card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      showToast("error", "Please enter complete card details");
      return;
    }
    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 2e3));
    const address = { name, phone, line1, city, state, pincode };
    const orderItems = items.map((i) => ({
      product: i.product,
      quantity: i.quantity,
      priceInPaise: i.product.priceInPaise
    }));
    const order = {
      id: generateOrderId(),
      items: orderItems,
      totalInPaise: grandTotal,
      discountInPaise,
      couponCode: appliedCoupon == null ? void 0 : appliedCoupon.code,
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
          timestamp: Date.now()
        },
        {
          status: "packed",
          label: "Order Packed",
          completed: false,
          current: false
        },
        {
          status: "shipped",
          label: "Shipped",
          completed: false,
          current: false
        },
        {
          status: "out_for_delivery",
          label: "Out for Delivery",
          completed: false,
          current: false
        },
        {
          status: "delivered",
          label: "Delivered",
          completed: false,
          current: false
        }
      ]
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
      link: `/orders/${order.id}`
    });
    showToast("success", `Order ${order.id} placed! Opening WhatsApp...`);
    setTimeout(() => openWhatsApp(order), 1e3);
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
    clearCart
  ]);
  if (placed && placedOrder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[80vh] px-6 gap-6 text-center",
        "data-ocid": "checkout.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { type: "spring", stiffness: 180, damping: 15 },
              className: "w-24 h-24 rounded-full flex items-center justify-center",
              style: {
                background: "oklch(0.675 0.25 178 / 0.15)",
                border: "2px solid oklch(0.675 0.25 178)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Check,
                {
                  className: "w-12 h-12",
                  style: { color: "oklch(0.675 0.25 178)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Order Placed!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
                  "Order ID:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.26 90)" }, children: placedOrder.id })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Total paid:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: formatINR(placedOrder.totalInPaise) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 },
              className: "flex flex-col gap-2 w-full",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => generatePDFInvoice(placedOrder),
                    className: "w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth",
                    style: {
                      background: "oklch(0.72 0.26 90 / 0.15)",
                      color: "oklch(0.72 0.26 90)",
                      border: "1px solid oklch(0.72 0.26 90 / 0.3)"
                    },
                    "data-ocid": "checkout.download_invoice_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
                      "Download Invoice"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => openWhatsApp(placedOrder),
                    className: "w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth",
                    style: { background: "#25D366", color: "#fff" },
                    "data-ocid": "checkout.whatsapp_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                      "Share on WhatsApp"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/orders" }),
                    className: "w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth",
                    style: {
                      background: "oklch(0.675 0.25 178 / 0.15)",
                      color: "oklch(0.675 0.25 178)",
                      border: "1px solid oklch(0.675 0.25 178 / 0.3)"
                    },
                    "data-ocid": "checkout.view_orders_button",
                    children: "Track My Order"
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-28", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-4 border-b flex items-center gap-3 sticky top-0 z-20",
        style: {
          background: "oklch(0.12 0 0)",
          borderColor: "oklch(0.22 0 0)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/cart" }),
              className: "p-1.5 rounded-lg transition-smooth hover:bg-muted",
              "aria-label": "Back to cart",
              "data-ocid": "checkout.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Shield,
              {
                className: "w-3.5 h-3.5",
                style: { color: "oklch(0.675 0.25 178)" }
              }
            ),
            "Secure"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        title: "Delivery Address",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MapPin,
          {
            className: "w-4 h-4",
            style: { color: "oklch(0.675 0.25 178)" }
          }
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "checkout-name",
              label: "Full Name",
              required: true,
              placeholder: "Gulab Kumar",
              value: name,
              onChange: (e) => setName(e.target.value),
              "data-ocid": "checkout.name_input"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                id: "checkout-phone",
                label: "Phone",
                required: true,
                placeholder: "9876543210",
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                "data-ocid": "checkout.phone_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                id: "checkout-email",
                label: "Email (optional)",
                placeholder: "you@email.com",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                "data-ocid": "checkout.email_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "checkout-line1",
              label: "Address Line 1",
              required: true,
              placeholder: "Street / Locality / Colony",
              value: line1,
              onChange: (e) => setLine1(e.target.value),
              "data-ocid": "checkout.address_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                id: "checkout-city",
                label: "City",
                required: true,
                placeholder: "Patna",
                value: city,
                onChange: (e) => setCity(e.target.value),
                "data-ocid": "checkout.city_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "checkout-state",
                  className: "text-xs font-medium text-muted-foreground",
                  children: [
                    "State ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.65 0.19 22)" }, children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "checkout-state",
                  value: state,
                  onChange: (e) => setState(e.target.value),
                  className: "w-full px-3 py-2.5 rounded-lg text-sm bg-input text-foreground border focus:outline-none",
                  style: { borderColor: "oklch(0.28 0 0)" },
                  "data-ocid": "checkout.state_select",
                  children: [
                    "Bihar",
                    "Jharkhand",
                    "UP",
                    "Delhi",
                    "Maharashtra",
                    "Karnataka",
                    "Tamil Nadu",
                    "West Bengal",
                    "Rajasthan",
                    "Gujarat"
                  ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "checkout-pincode",
              label: "Pincode",
              required: true,
              placeholder: "800001",
              maxLength: 6,
              value: pincode,
              onChange: (e) => setPincode(e.target.value.replace(/\D/g, "")),
              "data-ocid": "checkout.pincode_input"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        title: "Payment Method",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CreditCard,
          {
            className: "w-4 h-4",
            style: { color: "oklch(0.72 0.26 90)" }
          }
        ),
        children: (splitState == null ? void 0 : splitState.enabled) ? /* @__PURE__ */ jsxRuntimeExports.jsx(SplitPaymentDisplay, { splitState }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: ["upi", "card", "wallet", "cod"].map(
            (type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPaymentType(type),
                className: "flex flex-col items-center py-2.5 px-1 rounded-xl text-[10px] font-semibold transition-smooth gap-1.5",
                style: {
                  background: paymentType === type ? "oklch(0.675 0.25 178 / 0.12)" : "oklch(0.14 0 0)",
                  border: `1px solid ${paymentType === type ? "oklch(0.675 0.25 178 / 0.4)" : "oklch(0.25 0 0)"}`,
                  color: paymentType === type ? "oklch(0.675 0.25 178)" : "oklch(0.55 0 0)"
                },
                "data-ocid": `checkout.payment_method.${type}`,
                children: [
                  type === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }),
                  type === "card" && /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                  type === "wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
                  type === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                  type === "upi" ? "UPI" : type === "card" ? "Card" : type === "wallet" ? "Wallet" : "COD"
                ]
              },
              type
            )
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            paymentType === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "overflow-hidden flex flex-col gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: UPI_OPTIONS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedUpi(u.id),
                      className: "py-2.5 px-3 rounded-xl text-xs font-semibold text-left transition-smooth flex items-center gap-2",
                      style: {
                        background: selectedUpi === u.id ? `${u.color}18` : "oklch(0.14 0 0)",
                        border: `1px solid ${selectedUpi === u.id ? u.color : "oklch(0.25 0 0)"}`,
                        color: selectedUpi === u.id ? u.color : "oklch(0.55 0 0)"
                      },
                      "data-ocid": `checkout.upi_option.${u.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2 h-2 rounded-full flex-shrink-0",
                            style: { background: u.color }
                          }
                        ),
                        u.label
                      ]
                    },
                    u.id
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputField,
                    {
                      id: "checkout-upi-id",
                      label: "UPI ID",
                      placeholder: "yourname@upi",
                      value: upiId,
                      onChange: (e) => setUpiId(e.target.value),
                      "data-ocid": "checkout.upi_id_input"
                    }
                  )
                ]
              },
              "upi"
            ),
            paymentType === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "overflow-hidden flex flex-col gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputField,
                    {
                      id: "checkout-card-number",
                      label: "Card Number",
                      placeholder: "1234 5678 9012 3456",
                      value: cardNumber,
                      onChange: (e) => setCardNumber(formatCard(e.target.value)),
                      maxLength: 19,
                      "data-ocid": "checkout.card_number_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InputField,
                      {
                        id: "checkout-card-expiry",
                        label: "Expiry (MM/YY)",
                        placeholder: "12/26",
                        value: cardExpiry,
                        onChange: (e) => setCardExpiry(formatExpiry(e.target.value)),
                        maxLength: 5,
                        "data-ocid": "checkout.card_expiry_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      InputField,
                      {
                        id: "checkout-card-cvv",
                        label: "CVV",
                        placeholder: "\\u2022\\u2022\\u2022",
                        type: "password",
                        value: cardCvv,
                        onChange: (e) => setCardCvv(
                          e.target.value.replace(/\D/g, "").slice(0, 3)
                        ),
                        maxLength: 3,
                        "data-ocid": "checkout.card_cvv_input"
                      }
                    )
                  ] })
                ]
              },
              "card"
            ),
            paymentType === "wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "overflow-hidden grid grid-cols-3 gap-2",
                children: WALLET_OPTIONS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedWallet(w.id),
                    className: "py-2.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-smooth",
                    style: {
                      background: selectedWallet === w.id ? `${w.color}18` : "oklch(0.14 0 0)",
                      border: `1px solid ${selectedWallet === w.id ? w.color : "oklch(0.25 0 0)"}`,
                      color: selectedWallet === w.id ? w.color : "oklch(0.55 0 0)"
                    },
                    "data-ocid": `checkout.wallet_option.${w.id}`,
                    children: w.label
                  },
                  w.id
                ))
              },
              "wallet"
            ),
            paymentType === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "px-3 py-2.5 rounded-xl text-xs text-muted-foreground",
                    style: {
                      background: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)"
                    },
                    children: "Pay in cash when your order arrives. No extra charges."
                  }
                )
              },
              "cod"
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        title: "Order Summary",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileText,
          {
            className: "w-4 h-4",
            style: { color: "oklch(0.675 0.25 178)" }
          }
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.product.images[0],
                alt: item.product.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: item.product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                "x",
                item.quantity
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground flex-shrink-0", children: formatINR(item.product.priceInPaise * item.quantity) })
          ] }, item.product.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider my-1" }),
          discountInPaise > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Coupon (",
              appliedCoupon == null ? void 0 : appliedCoupon.code,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.675 0.25 178)" }, children: [
              "-",
              formatINR(discountInPaise)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
            delivery === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.675 0.25 178)" }, children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(delivery) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(gst) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.26 90)" }, children: formatINR(grandTotal) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-6 pt-3",
        style: {
          background: "linear-gradient(to top, oklch(0.08 0 0) 60%, transparent)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.97 },
            onClick: handlePlaceOrder,
            disabled: isPlacing || items.length === 0,
            className: "w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-smooth disabled:opacity-60",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.26 90), oklch(0.65 0.26 70))",
              color: "oklch(0.08 0 0)",
              boxShadow: "0 4px 20px oklch(0.72 0.26 90 / 0.4)"
            },
            "data-ocid": "checkout.place_order_button",
            children: isPlacing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Processing..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Place Order — ",
              formatINR(grandTotal)
            ] })
          }
        )
      }
    )
  ] });
}
function Section({
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-4",
      style: {
        background: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.22 0 0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: title })
        ] }),
        children
      ]
    }
  ) });
}
function SplitPaymentDisplay({ splitState }) {
  const methodLabels = {
    upi: "UPI",
    card: "Card",
    wallet: "Wallet",
    cod: "COD"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-3 py-3 rounded-xl text-sm",
      style: {
        background: "oklch(0.675 0.25 178 / 0.06)",
        border: "1px solid oklch(0.675 0.25 178 / 0.2)"
      },
      "data-ocid": "checkout.split_payment_display",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Split Payment Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground", children: [
              methodLabels[splitState.method1] ?? splitState.method1,
              " (",
              splitState.percent,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold",
                style: { color: "oklch(0.675 0.25 178)" },
                children: formatINR(splitState.amount1InPaise)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground", children: [
              methodLabels[splitState.method2] ?? splitState.method2,
              " (",
              100 - splitState.percent,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold",
                style: { color: "oklch(0.72 0.26 90)" },
                children: formatINR(splitState.amount2InPaise)
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  CheckoutPage as default
};
