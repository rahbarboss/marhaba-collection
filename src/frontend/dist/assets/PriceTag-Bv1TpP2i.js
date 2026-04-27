import { j as jsxRuntimeExports, i as cn } from "./index-dBmmwt_c.js";
const sizeClasses = {
  sm: {
    price: "text-sm font-bold",
    original: "text-xs",
    badge: "text-[10px] px-1.5 py-0.5"
  },
  md: {
    price: "text-base font-bold",
    original: "text-sm",
    badge: "text-xs px-2 py-0.5"
  },
  lg: {
    price: "text-xl font-bold",
    original: "text-sm",
    badge: "text-xs px-2 py-0.5"
  },
  xl: {
    price: "text-2xl font-bold",
    original: "text-base",
    badge: "text-sm px-2.5 py-1"
  }
};
function formatINR(paise) {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(rupees);
}
function PriceTag({
  priceInPaise,
  originalPriceInPaise,
  size = "md",
  showDiscount = true,
  className
}) {
  const classes = sizeClasses[size];
  const discountPercent = originalPriceInPaise && originalPriceInPaise > priceInPaise ? Math.round(
    (originalPriceInPaise - priceInPaise) / originalPriceInPaise * 100
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2 flex-wrap", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(classes.price),
        style: { color: "oklch(0.675 0.25 178)" },
        children: formatINR(priceInPaise)
      }
    ),
    originalPriceInPaise && originalPriceInPaise > priceInPaise && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(classes.original, "line-through text-muted-foreground"),
        children: formatINR(originalPriceInPaise)
      }
    ),
    showDiscount && discountPercent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(classes.badge, "rounded-full font-semibold"),
        style: {
          background: "oklch(0.72 0.26 90 / 0.15)",
          color: "oklch(0.72 0.26 90)",
          border: "1px solid oklch(0.72 0.26 90 / 0.3)"
        },
        children: [
          "-",
          discountPercent,
          "%"
        ]
      }
    )
  ] });
}
export {
  PriceTag as P,
  formatINR as f
};
