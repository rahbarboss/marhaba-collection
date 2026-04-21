import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Split,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { formatINR } from "../components/PriceTag";
import { useCart } from "../context/CartContext";
import {
  applyCoupon,
  getBestCoupon,
  sampleCoupons,
} from "../data/sampleProducts";
import type { Coupon } from "../types";

const DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 4900;
const GST_RATE = 0.18;

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Card" },
  { id: "wallet", label: "Wallet" },
  { id: "cod", label: "COD" },
];

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [splitMethod1, setSplitMethod1] = useState("upi");
  const [splitMethod2, setSplitMethod2] = useState("card");
  const [splitPercent, setSplitPercent] = useState(50);
  const [showCoupons, setShowCoupons] = useState(false);

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

  const splitAmount1 = Math.round((grandTotal * splitPercent) / 100);
  const splitAmount2 = grandTotal - splitAmount1;

  const handleApplyCoupon = useCallback(
    (code: string) => {
      setCouponError("");
      setCouponSuccess("");
      const result = applyCoupon(code, subtotal);
      if (result.valid && result.coupon) {
        setAppliedCoupon(result.coupon);
        setCouponCode(result.coupon.code);
        setCouponSuccess(
          `Coupon applied! You save ${formatINR(result.discountInPaise)}`,
        );
      } else {
        setCouponError(result.message ?? "Invalid coupon");
      }
    },
    [subtotal],
  );

  const handleBestCoupon = useCallback(() => {
    const best = getBestCoupon(subtotal);
    if (best) {
      handleApplyCoupon(best.code);
    } else {
      setCouponError("No coupons available for your cart value");
    }
  }, [subtotal, handleApplyCoupon]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponSuccess("");
    setCouponError("");
  }, []);

  const handleCheckout = useCallback(() => {
    sessionStorage.setItem(
      "splitPayment",
      JSON.stringify({
        enabled: splitEnabled,
        method1: splitMethod1,
        method2: splitMethod2,
        amount1InPaise: splitAmount1,
        amount2InPaise: splitAmount2,
        percent: splitPercent,
      }),
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
    navigate,
  ]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 gap-6">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="relative"
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.675 0.25 178 / 0.1)",
              border: "2px solid oklch(0.675 0.25 178 / 0.2)",
            }}
          >
            <ShoppingBag
              className="w-14 h-14"
              style={{ color: "oklch(0.675 0.25 178)" }}
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{
              background: "oklch(0.72 0.26 90 / 0.15)",
              border: "1px solid oklch(0.72 0.26 90 / 0.3)",
              color: "oklch(0.72 0.26 90)",
            }}
          >
            0
          </motion.div>
        </motion.div>
        <div className="text-center" data-ocid="cart.empty_state">
          <h2 className="text-xl font-display font-bold text-foreground mb-2">
            Your bag is empty
          </h2>
          <p className="text-sm text-muted-foreground">
            Add items to unlock exclusive deals and offers
          </p>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate({ to: "/" })}
          className="btn-premium px-8 py-3 text-sm font-semibold"
          data-ocid="cart.start_shopping_button"
        >
          Start Shopping
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 pb-24" data-ocid="cart.page">
      {/* Header */}
      <div
        className="px-4 py-4 border-b flex items-center justify-between sticky top-0 z-20"
        style={{
          background: "oklch(0.12 0 0)",
          borderColor: "oklch(0.22 0 0)",
        }}
      >
        <h1 className="text-lg font-display font-bold text-foreground">
          My Bag{" "}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            ({items.length} items)
          </span>
        </h1>
      </div>

      {/* Cart Items */}
      <div className="px-4 pt-3 flex flex-col gap-3" data-ocid="cart.list">
        <AnimatePresence initial={false}>
          {items.map((item, idx) => {
            const itemTotal = item.product.priceInPaise * item.quantity;
            return (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25 }}
                className="led-strip rounded-xl overflow-hidden"
                data-ocid={`cart.item.${idx + 1}`}
              >
                <div className="card-premium p-3 flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                        {item.product.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1 flex-shrink-0"
                        aria-label={`Remove ${item.product.name}`}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className="text-sm font-bold"
                        style={{ color: "oklch(0.675 0.25 178)" }}
                      >
                        {formatINR(itemTotal)}
                      </span>
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: "1px solid oklch(0.3 0 0)" }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center transition-smooth hover:bg-muted"
                          data-ocid={`cart.decrease.${idx + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span
                          className="w-7 h-7 flex items-center justify-center text-xs font-bold border-x"
                          style={{ borderColor: "oklch(0.3 0 0)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="w-7 h-7 flex items-center justify-center transition-smooth hover:bg-muted disabled:opacity-40"
                          data-ocid={`cart.increase.${idx + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatINR(item.product.priceInPaise)} × {item.quantity}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Coupon Section */}
      <div className="px-4 mt-4">
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.22 0 0)",
          }}
          data-ocid="cart.coupon.section"
        >
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4" style={{ color: "oklch(0.72 0.26 90)" }} />
            <span className="text-sm font-semibold text-foreground">
              Coupons & Offers
            </span>
          </div>

          {appliedCoupon ? (
            <div
              className="flex items-center justify-between px-3 py-2 rounded-lg mb-3"
              style={{
                background: "oklch(0.675 0.25 178 / 0.08)",
                border: "1px solid oklch(0.675 0.25 178 / 0.3)",
              }}
            >
              <div>
                <p
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.675 0.25 178)" }}
                >
                  {appliedCoupon.code}
                </p>
                <p className="text-xs text-muted-foreground">{couponSuccess}</p>
              </div>
              <button
                type="button"
                onClick={removeCoupon}
                className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove coupon"
                data-ocid="cart.coupon.remove_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-2">
                <input
                  id="coupon-code-input"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 rounded-lg text-sm bg-input text-foreground placeholder:text-muted-foreground focus:outline-none border transition-colors"
                  style={{ borderColor: "oklch(0.28 0 0)" }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleApplyCoupon(couponCode)
                  }
                  data-ocid="cart.coupon.input"
                />
                <button
                  type="button"
                  onClick={() => handleApplyCoupon(couponCode)}
                  className="px-4 py-2 rounded-lg text-xs font-bold transition-smooth"
                  style={{
                    background: "oklch(0.675 0.25 178 / 0.15)",
                    color: "oklch(0.675 0.25 178)",
                    border: "1px solid oklch(0.675 0.25 178 / 0.3)",
                  }}
                  data-ocid="cart.coupon.apply_button"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p
                  className="text-xs mb-2"
                  style={{ color: "oklch(0.65 0.19 22)" }}
                  data-ocid="cart.coupon.error_state"
                >
                  {couponError}
                </p>
              )}

              <button
                type="button"
                onClick={handleBestCoupon}
                className="flex items-center gap-1.5 text-xs font-semibold transition-smooth mb-2"
                style={{ color: "oklch(0.72 0.26 90)" }}
                data-ocid="cart.coupon.best_button"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Auto-apply best coupon
              </button>

              <button
                type="button"
                onClick={() => setShowCoupons(!showCoupons)}
                className="text-xs text-muted-foreground flex items-center gap-1 transition-colors hover:text-foreground"
                data-ocid="cart.coupon.toggle"
              >
                {showCoupons ? "Hide" : "View"} available coupons
                <ChevronRight
                  className={`w-3 h-3 transition-transform ${showCoupons ? "rotate-90" : ""}`}
                />
              </button>

              <AnimatePresence>
                {showCoupons && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2 flex flex-col gap-2"
                  >
                    {sampleCoupons.map((c) => {
                      const eligible = subtotal >= c.minOrderInPaise;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => eligible && handleApplyCoupon(c.code)}
                          disabled={!eligible}
                          className="text-left px-3 py-2 rounded-lg border transition-smooth disabled:opacity-50"
                          style={{
                            borderColor: "oklch(0.28 0 0)",
                            background: "oklch(0.14 0 0)",
                          }}
                          data-ocid={`cart.coupon.option.${c.code.toLowerCase()}`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-bold"
                              style={{ color: "oklch(0.72 0.26 90)" }}
                            >
                              {c.code}
                            </span>
                            {eligible ? (
                              <span
                                className="text-[10px] px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: "oklch(0.675 0.25 178 / 0.1)",
                                  color: "oklch(0.675 0.25 178)",
                                }}
                              >
                                Eligible
                              </span>
                            ) : (
                              <span className="text-[10px] text-muted-foreground">
                                Min: {formatINR(c.minOrderInPaise)}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {c.description}
                          </p>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      {/* Split Payment Toggle */}
      <div className="px-4 mt-3">
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.22 0 0)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Split
                className="w-4 h-4"
                style={{ color: "oklch(0.675 0.25 178)" }}
              />
              <span className="text-sm font-semibold text-foreground">
                Split Payment
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSplitEnabled(!splitEnabled)}
              className="relative w-11 h-6 rounded-full transition-all duration-300"
              style={{
                background: splitEnabled
                  ? "oklch(0.675 0.25 178)"
                  : "oklch(0.25 0 0)",
              }}
              role="switch"
              aria-checked={splitEnabled}
              data-ocid="cart.split_payment.toggle"
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all duration-300 shadow-sm"
                style={{
                  left: splitEnabled ? "calc(100% - 1.375rem)" : "0.125rem",
                }}
              />
            </button>
          </div>

          <AnimatePresence>
            {splitEnabled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Split between two methods
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "oklch(0.675 0.25 178)" }}>
                        Method 1: {formatINR(splitAmount1)}
                      </span>
                      <span style={{ color: "oklch(0.72 0.26 90)" }}>
                        Method 2: {formatINR(splitAmount2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={splitPercent}
                      onChange={(e) => setSplitPercent(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(90deg, oklch(0.675 0.25 178) ${splitPercent}%, oklch(0.72 0.26 90) ${splitPercent}%)`,
                      }}
                      data-ocid="cart.split_payment.slider"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor="split-method1"
                        className="text-xs text-muted-foreground mb-1 block"
                      >
                        Method 1
                      </label>
                      <select
                        id="split-method1"
                        value={splitMethod1}
                        onChange={(e) => setSplitMethod1(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg text-xs bg-input text-foreground border focus:outline-none"
                        style={{ borderColor: "oklch(0.28 0 0)" }}
                        data-ocid="cart.split_payment.method1_select"
                      >
                        {PAYMENT_METHODS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="split-method2"
                        className="text-xs text-muted-foreground mb-1 block"
                      >
                        Method 2
                      </label>
                      <select
                        id="split-method2"
                        value={splitMethod2}
                        onChange={(e) => setSplitMethod2(e.target.value)}
                        className="w-full px-2 py-2 rounded-lg text-xs bg-input text-foreground border focus:outline-none"
                        style={{ borderColor: "oklch(0.28 0 0)" }}
                        data-ocid="cart.split_payment.method2_select"
                      >
                        {PAYMENT_METHODS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Price Summary */}
      <div className="px-4 mt-3">
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.22 0 0)",
          }}
          data-ocid="cart.price_summary"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Price Summary
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span className="text-foreground">{formatINR(subtotal)}</span>
            </div>
            {discountInPaise > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coupon Discount</span>
                <span style={{ color: "oklch(0.675 0.25 178)" }}>
                  -{formatINR(discountInPaise)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              {delivery === 0 ? (
                <span style={{ color: "oklch(0.675 0.25 178)" }}>Free</span>
              ) : (
                <span className="text-foreground">{formatINR(delivery)}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="text-foreground">{formatINR(gst)}</span>
            </div>
            <div className="section-divider my-1" />
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Grand Total</span>
              <span
                className="font-bold text-lg"
                style={{ color: "oklch(0.72 0.26 90)" }}
              >
                {formatINR(grandTotal)}
              </span>
            </div>
          </div>
          {delivery > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Add {formatINR(DELIVERY_THRESHOLD - afterDiscount)} more for{" "}
              <span style={{ color: "oklch(0.675 0.25 178)" }}>
                free delivery
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Checkout CTA */}
      <div className="px-4 mt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCheckout}
          className="w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-smooth shadow-glow-teal"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.58 0.25 200))",
            color: "oklch(0.08 0 0)",
          }}
          data-ocid="cart.checkout_button"
        >
          Proceed to Checkout
          <ChevronRight className="w-4 h-4" />
        </motion.button>
        {splitEnabled && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Split: {PAYMENT_METHODS.find((m) => m.id === splitMethod1)?.label}{" "}
            {formatINR(splitAmount1)} +{" "}
            {PAYMENT_METHODS.find((m) => m.id === splitMethod2)?.label}{" "}
            {formatINR(splitAmount2)}
          </p>
        )}
      </div>
    </div>
  );
}
