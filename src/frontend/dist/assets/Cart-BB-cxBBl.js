import { c as createLucideIcon, a as useNavigate, d as useCart, r as reactExports, n as applyCoupon, o as getBestCoupon, j as jsxRuntimeExports, g as ShoppingBag, X, p as sampleCoupons } from "./index-DlPS0ULj.js";
import { f as formatINR } from "./PriceTag-CkD6WUie.js";
import { m as motion } from "./proxy-WUnn3icv.js";
import { A as AnimatePresence } from "./index-CxIgKL95.js";
import { M as Minus } from "./minus-BOqMCmtt.js";
import { P as Plus } from "./plus-DtB20UV2.js";
import { C as ChevronRight } from "./chevron-right-CgObv-T_.js";
import { C as CreditCard } from "./credit-card-C2xveg2v.js";
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M8 3H3v5", key: "15dfkv" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3", key: "1qrqzj" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }]
];
const Split = createLucideIcon("split", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const DELIVERY_THRESHOLD = 5e4;
const DELIVERY_FEE = 4900;
const GST_RATE = 0.18;
const PAYMENT_METHODS = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Card" },
  { id: "wallet", label: "Wallet" },
  { id: "cod", label: "COD" }
];
function CartPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCart();
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const [couponError, setCouponError] = reactExports.useState("");
  const [couponSuccess, setCouponSuccess] = reactExports.useState("");
  const [splitEnabled, setSplitEnabled] = reactExports.useState(false);
  const [splitMethod1, setSplitMethod1] = reactExports.useState("upi");
  const [splitMethod2, setSplitMethod2] = reactExports.useState("card");
  const [splitPercent, setSplitPercent] = reactExports.useState(50);
  const [showCoupons, setShowCoupons] = reactExports.useState(false);
  const subtotal = items.reduce(
    (s, i) => s + i.product.priceInPaise * i.quantity,
    0
  );
  const discountInPaise = appliedCoupon ? applyCoupon(appliedCoupon.code, subtotal).discountInPaise : 0;
  const afterDiscount = subtotal - discountInPaise;
  const delivery = afterDiscount >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const gst = Math.round(afterDiscount * GST_RATE);
  const grandTotal = afterDiscount + delivery + gst;
  const splitAmount1 = Math.round(grandTotal * splitPercent / 100);
  const splitAmount2 = grandTotal - splitAmount1;
  const handleApplyCoupon = reactExports.useCallback(
    (code) => {
      setCouponError("");
      setCouponSuccess("");
      const result = applyCoupon(code, subtotal);
      if (result.valid && result.coupon) {
        setAppliedCoupon(result.coupon);
        setCouponCode(result.coupon.code);
        setCouponSuccess(
          `Coupon applied! You save ${formatINR(result.discountInPaise)}`
        );
      } else {
        setCouponError(result.message ?? "Invalid coupon");
      }
    },
    [subtotal]
  );
  const handleBestCoupon = reactExports.useCallback(() => {
    const best = getBestCoupon(subtotal);
    if (best) {
      handleApplyCoupon(best.code);
    } else {
      setCouponError("No coupons available for your cart value");
    }
  }, [subtotal, handleApplyCoupon]);
  const removeCoupon = reactExports.useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponSuccess("");
    setCouponError("");
  }, []);
  const handleCheckout = reactExports.useCallback(() => {
    sessionStorage.setItem(
      "splitPayment",
      JSON.stringify({
        enabled: splitEnabled,
        method1: splitMethod1,
        method2: splitMethod2,
        amount1InPaise: splitAmount1,
        amount2InPaise: splitAmount2,
        percent: splitPercent
      })
    );
    if (appliedCoupon) {
      sessionStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
    } else {
      sessionStorage.removeItem("appliedCoupon");
    }
    navigate({ to: "/checkout" });
  }, [
    splitEnabled,
    splitMethod1,
    splitMethod2,
    splitAmount1,
    splitAmount2,
    splitPercent,
    appliedCoupon,
    navigate
  ]);
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[70vh] px-6 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.7, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", stiffness: 200, damping: 16 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-28 h-28 rounded-full flex items-center justify-center",
                style: {
                  background: "oklch(0.675 0.25 178 / 0.1)",
                  border: "2px solid oklch(0.675 0.25 178 / 0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ShoppingBag,
                  {
                    className: "w-14 h-14",
                    style: { color: "oklch(0.675 0.25 178)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { y: [0, -8, 0] },
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2.5,
                  ease: "easeInOut"
                },
                className: "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm",
                style: {
                  background: "oklch(0.72 0.26 90 / 0.15)",
                  border: "1px solid oklch(0.72 0.26 90 / 0.3)",
                  color: "oklch(0.72 0.26 90)"
                },
                children: "0"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", "data-ocid": "cart.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: "Your bag is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add items to unlock exclusive deals and offers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.97 },
          onClick: () => navigate({ to: "/" }),
          className: "btn-premium px-8 py-3 text-sm font-semibold",
          "data-ocid": "cart.start_shopping_button",
          children: "Start Shopping"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-24", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-4 py-4 border-b flex items-center justify-between sticky top-0 z-20",
        style: {
          background: "oklch(0.12 0 0)",
          borderColor: "oklch(0.22 0 0)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-display font-bold text-foreground", children: [
          "My Bag",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: [
            "(",
            items.length,
            " items)"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3 flex flex-col gap-3", "data-ocid": "cart.list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: items.map((item, idx) => {
      const itemTotal = item.product.priceInPaise * item.quantity;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20, height: 0 },
          transition: { duration: 0.25 },
          className: "led-strip rounded-xl overflow-hidden",
          "data-ocid": `cart.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-3 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.product.images[0],
                alt: item.product.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight line-clamp-2", children: item.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(item.product.id),
                    className: "text-muted-foreground hover:text-destructive transition-colors p-1 flex-shrink-0",
                    "aria-label": `Remove ${item.product.name}`,
                    "data-ocid": `cart.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: { color: "oklch(0.675 0.25 178)" },
                    children: formatINR(itemTotal)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center rounded-lg overflow-hidden",
                    style: { border: "1px solid oklch(0.3 0 0)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                          className: "w-7 h-7 flex items-center justify-center transition-smooth hover:bg-muted",
                          "data-ocid": `cart.decrease.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-7 h-7 flex items-center justify-center text-xs font-bold border-x",
                          style: { borderColor: "oklch(0.3 0 0)" },
                          children: item.quantity
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                          disabled: item.quantity >= item.product.stock,
                          className: "w-7 h-7 flex items-center justify-center transition-smooth hover:bg-muted disabled:opacity-40",
                          "data-ocid": `cart.increase.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                formatINR(item.product.priceInPaise),
                " × ",
                item.quantity
              ] })
            ] })
          ] })
        },
        item.product.id
      );
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4",
        style: {
          background: "oklch(0.12 0 0)",
          border: "1px solid oklch(0.22 0 0)"
        },
        "data-ocid": "cart.coupon.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4", style: { color: "oklch(0.72 0.26 90)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Coupons & Offers" })
          ] }),
          appliedCoupon ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-3 py-2 rounded-lg mb-3",
              style: {
                background: "oklch(0.675 0.25 178 / 0.08)",
                border: "1px solid oklch(0.675 0.25 178 / 0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-bold",
                      style: { color: "oklch(0.675 0.25 178)" },
                      children: appliedCoupon.code
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: couponSuccess })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: removeCoupon,
                    className: "p-1 rounded text-muted-foreground hover:text-destructive transition-colors",
                    "aria-label": "Remove coupon",
                    "data-ocid": "cart.coupon.remove_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "coupon-code-input",
                  value: couponCode,
                  onChange: (e) => setCouponCode(e.target.value.toUpperCase()),
                  placeholder: "Enter coupon code",
                  className: "flex-1 px-3 py-2 rounded-lg text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none border transition-colors",
                  style: { borderColor: "oklch(0.28 0 0)" },
                  onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon(couponCode),
                  "data-ocid": "cart.coupon.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleApplyCoupon(couponCode),
                  className: "px-4 py-2 rounded-lg text-xs font-bold transition-smooth",
                  style: {
                    background: "oklch(0.675 0.25 178 / 0.15)",
                    color: "oklch(0.675 0.25 178)",
                    border: "1px solid oklch(0.675 0.25 178 / 0.3)"
                  },
                  "data-ocid": "cart.coupon.apply_button",
                  children: "Apply"
                }
              )
            ] }),
            couponError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mb-2",
                style: { color: "oklch(0.65 0.19 22)" },
                "data-ocid": "cart.coupon.error_state",
                children: couponError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleBestCoupon,
                className: "flex items-center gap-1.5 text-xs font-semibold transition-smooth mb-2",
                style: { color: "oklch(0.72 0.26 90)" },
                "data-ocid": "cart.coupon.best_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                  "Auto-apply best coupon"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowCoupons(!showCoupons),
                className: "text-xs text-muted-foreground flex items-center gap-1 transition-colors hover:text-foreground",
                "data-ocid": "cart.coupon.toggle",
                children: [
                  showCoupons ? "Hide" : "View",
                  " available coupons",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      className: `w-3 h-3 transition-transform ${showCoupons ? "rotate-90" : ""}`
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showCoupons && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "overflow-hidden mt-2 flex flex-col gap-2",
                children: sampleCoupons.map((c) => {
                  const eligible = subtotal >= c.minOrderInPaise;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => eligible && handleApplyCoupon(c.code),
                      disabled: !eligible,
                      className: "text-left px-3 py-2 rounded-lg border transition-smooth disabled:opacity-50",
                      style: {
                        borderColor: "oklch(0.28 0 0)",
                        background: "oklch(0.14 0 0)"
                      },
                      "data-ocid": `cart.coupon.option.${c.code.toLowerCase()}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-bold",
                              style: { color: "oklch(0.72 0.26 90)" },
                              children: c.code
                            }
                          ),
                          eligible ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-[10px] px-1.5 py-0.5 rounded-full",
                              style: {
                                background: "oklch(0.675 0.25 178 / 0.1)",
                                color: "oklch(0.675 0.25 178)"
                              },
                              children: "Eligible"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                            "Min: ",
                            formatINR(c.minOrderInPaise)
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: c.description })
                      ]
                    },
                    c.code
                  );
                })
              }
            ) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4",
        style: {
          background: "oklch(0.12 0 0)",
          border: "1px solid oklch(0.22 0 0)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Split,
                {
                  className: "w-4 h-4",
                  style: { color: "oklch(0.675 0.25 178)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Split Payment" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSplitEnabled(!splitEnabled),
                className: "relative w-11 h-6 rounded-full transition-all duration-300",
                style: {
                  background: splitEnabled ? "oklch(0.675 0.25 178)" : "oklch(0.25 0 0)"
                },
                role: "switch",
                "aria-checked": splitEnabled,
                "data-ocid": "cart.split_payment.toggle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all duration-300 shadow-sm",
                    style: {
                      left: splitEnabled ? "calc(100% - 1.375rem)" : "0.125rem"
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: splitEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Split between two methods" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.675 0.25 178)" }, children: [
                      "Method 1: ",
                      formatINR(splitAmount1)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.72 0.26 90)" }, children: [
                      "Method 2: ",
                      formatINR(splitAmount2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "range",
                      min: 10,
                      max: 90,
                      value: splitPercent,
                      onChange: (e) => setSplitPercent(Number(e.target.value)),
                      className: "w-full h-2 rounded-full appearance-none cursor-pointer",
                      style: {
                        background: `linear-gradient(90deg, oklch(0.675 0.25 178) ${splitPercent}%, oklch(0.72 0.26 90) ${splitPercent}%)`
                      },
                      "data-ocid": "cart.split_payment.slider"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "split-method1",
                        className: "text-xs text-muted-foreground mb-1 block",
                        children: "Method 1"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "split-method1",
                        value: splitMethod1,
                        onChange: (e) => setSplitMethod1(e.target.value),
                        className: "w-full px-2 py-2 rounded-lg text-xs bg-input text-foreground border focus:outline-none",
                        style: { borderColor: "oklch(0.28 0 0)" },
                        "data-ocid": "cart.split_payment.method1_select",
                        children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.id, children: m.label }, m.id))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "split-method2",
                        className: "text-xs text-muted-foreground mb-1 block",
                        children: "Method 2"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "split-method2",
                        value: splitMethod2,
                        onChange: (e) => setSplitMethod2(e.target.value),
                        className: "w-full px-2 py-2 rounded-lg text-xs bg-input text-foreground border focus:outline-none",
                        style: { borderColor: "oklch(0.28 0 0)" },
                        "data-ocid": "cart.split_payment.method2_select",
                        children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.id, children: m.label }, m.id))
                      }
                    )
                  ] })
                ] })
              ] })
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4",
        style: {
          background: "oklch(0.12 0 0)",
          border: "1px solid oklch(0.22 0 0)"
        },
        "data-ocid": "cart.price_summary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Price Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Subtotal (",
                items.reduce((s, i) => s + i.quantity, 0),
                " items)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(subtotal) })
            ] }),
            discountInPaise > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Coupon Discount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.675 0.25 178)" }, children: [
                "-",
                formatINR(discountInPaise)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery" }),
              delivery === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.675 0.25 178)" }, children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(delivery) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(gst) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider my-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Grand Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-bold text-lg",
                  style: { color: "oklch(0.72 0.26 90)" },
                  children: formatINR(grandTotal)
                }
              )
            ] })
          ] }),
          delivery > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "Add ",
            formatINR(DELIVERY_THRESHOLD - afterDiscount),
            " more for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.675 0.25 178)" }, children: "free delivery" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97 },
          onClick: handleCheckout,
          className: "w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-smooth shadow-glow-teal",
          style: {
            background: "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.58 0.25 200))",
            color: "oklch(0.08 0 0)"
          },
          "data-ocid": "cart.checkout_button",
          children: [
            "Proceed to Checkout",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ),
      splitEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground mt-2", children: [
        "Split: ",
        (_a = PAYMENT_METHODS.find((m) => m.id === splitMethod1)) == null ? void 0 : _a.label,
        " ",
        formatINR(splitAmount1),
        " +",
        " ",
        (_b = PAYMENT_METHODS.find((m) => m.id === splitMethod2)) == null ? void 0 : _b.label,
        " ",
        formatINR(splitAmount2)
      ] })
    ] })
  ] });
}
export {
  CartPage as default
};
