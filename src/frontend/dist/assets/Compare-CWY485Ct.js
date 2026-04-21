import { c as createLucideIcon, d as useCart, a as useNavigate, r as reactExports, m as sampleProducts, j as jsxRuntimeExports, X } from "./index-DlPS0ULj.js";
import { u as ue } from "./index-a4L5ghAM.js";
import { f as formatINR } from "./PriceTag-CkD6WUie.js";
import { R as RatingStars } from "./RatingStars-DpZYHDL0.js";
import { P as Plus } from "./plus-DtB20UV2.js";
import { S as ShoppingCart } from "./shopping-cart-DFsHVsA2.js";
import "./star-5Y0DlRpL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "5", cy: "6", r: "3", key: "1qnov2" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7", key: "1yj91y" }],
  ["path", { d: "m15 9-3-3 3-3", key: "1lwv8l" }],
  ["circle", { cx: "19", cy: "18", r: "3", key: "1qljk2" }],
  ["path", { d: "M12 18H7a2 2 0 0 1-2-2V9", key: "16sdep" }],
  ["path", { d: "m9 15 3 3-3 3", key: "1m3kbl" }]
];
const GitCompareArrows = createLucideIcon("git-compare-arrows", __iconNode);
const LS_KEY = "rahbar_compare_ids";
function getCompareIds() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function setCompareIds(ids) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids.slice(0, 4)));
}
function addToCompare(id) {
  const ids = getCompareIds();
  if (ids.includes(id)) return true;
  if (ids.length >= 4) return false;
  setCompareIds([...ids, id]);
  return true;
}
function removeFromCompare(id) {
  setCompareIds(getCompareIds().filter((i) => i !== id));
}
function computeDiscount(p) {
  if (!p.originalPriceInPaise || p.originalPriceInPaise <= p.priceInPaise)
    return 0;
  return Math.round(
    (p.originalPriceInPaise - p.priceInPaise) / p.originalPriceInPaise * 100
  );
}
function ProductSlot({
  product,
  slot,
  isLowest,
  isHighestRating,
  isBestDiscount,
  onRemove,
  onAddToCart
}) {
  const navigate = useNavigate();
  const discount = computeDiscount(product);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "led-strip relative flex flex-col rounded-xl overflow-hidden",
      style: { minWidth: 160, background: "oklch(0.13 0.01 220)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            onKeyDown: (e) => e.key === "Enter" && onRemove(),
            "aria-label": "Remove from compare",
            "data-ocid": "compare.remove_button",
            className: "absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-smooth",
            style: { background: "oklch(0.2 0 0)", color: "oklch(0.7 0 0)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "block w-full aspect-square overflow-hidden",
            onClick: () => navigate({ to: "/product/$id", params: { id: product.id } }),
            onKeyDown: (e) => e.key === "Enter" && navigate({ to: "/product/$id", params: { id: product.id } }),
            "aria-label": `View ${product.name}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.images[0],
                alt: product.name,
                className: "w-full h-full object-cover transition-smooth hover:scale-105"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-semibold leading-tight line-clamp-2",
              style: { color: "oklch(0.92 0 0)" },
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] px-1.5 py-0.5 rounded-full w-fit",
              style: {
                background: "oklch(0.675 0.25 178 / 0.12)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.3)"
              },
              children: product.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm font-bold",
                style: {
                  color: isLowest ? "oklch(0.675 0.25 178)" : "oklch(0.85 0 0)"
                },
                children: [
                  isLowest && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[9px] mr-1 px-1 py-0.5 rounded",
                      style: { background: "oklch(0.675 0.25 178 / 0.2)" },
                      children: "BEST"
                    }
                  ),
                  formatINR(product.priceInPaise)
                ]
              }
            ),
            product.originalPriceInPaise && product.originalPriceInPaise > product.priceInPaise && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] line-through text-muted-foreground", children: formatINR(product.originalPriceInPaise) }),
            discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-[10px] font-bold",
                style: {
                  color: isBestDiscount ? "oklch(0.78 0.22 145)" : "oklch(0.72 0.26 90)"
                },
                children: [
                  isBestDiscount && "🏆 ",
                  "-",
                  discount,
                  "% off"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RatingStars, { rating: product.rating, size: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[10px] font-semibold",
                style: {
                  color: isHighestRating ? "oklch(0.72 0.26 90)" : "oklch(0.65 0 0)"
                },
                children: [
                  isHighestRating && "★ ",
                  product.rating.toFixed(1)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              "(",
              product.reviewCount.toLocaleString(),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onAddToCart,
              onKeyDown: (e) => e.key === "Enter" && onAddToCart(),
              "data-ocid": `compare.add_to_cart.${slot}`,
              className: "btn-premium w-full text-[10px] py-2 rounded-lg mt-1",
              disabled: product.stock === 0,
              style: product.stock === 0 ? { opacity: 0.5, cursor: "not-allowed" } : {},
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 10, className: "inline mr-1" }),
                product.stock === 0 ? "Out of Stock" : "Add to Cart"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AddSlot({ onAdd }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onAdd,
      onKeyDown: (e) => e.key === "Enter" && onAdd(),
      "data-ocid": "compare.add_product_slot",
      className: "flex flex-col items-center justify-center gap-3 rounded-xl transition-smooth",
      style: {
        minWidth: 140,
        minHeight: 280,
        background: "oklch(0.11 0.005 220)",
        border: "2px dashed oklch(0.25 0 0)",
        color: "oklch(0.45 0 0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center",
            style: {
              background: "oklch(0.675 0.25 178 / 0.1)",
              color: "oklch(0.675 0.25 178)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-center px-3", children: "Add Product" })
      ]
    }
  );
}
function SpecRow({
  label,
  values
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid items-start",
      style: {
        gridTemplateColumns: `80px repeat(${values.length}, minmax(140px, 1fr))`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky left-0 z-10 flex items-start py-2.5 px-2 text-[10px] font-semibold uppercase tracking-wide",
            style: {
              background: "oklch(0.10 0 0)",
              color: "oklch(0.5 0 0)",
              borderBottom: "1px solid oklch(0.18 0 0)",
              minHeight: 44
            },
            children: label
          }
        ),
        values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "py-2.5 px-3 text-xs",
            style: {
              borderBottom: "1px solid oklch(0.18 0 0)",
              color: v ? "oklch(0.82 0 0)" : "oklch(0.35 0 0)",
              background: i % 2 === 0 ? "oklch(0.115 0.005 220)" : "oklch(0.105 0 0)"
            },
            children: v ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "—" })
          },
          `${label}-${String(i)}`
        ))
      ]
    }
  );
}
function ProductSearchModal({
  existingIds,
  onSelect,
  onClose
}) {
  const [query, setQuery] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, []);
  const filtered = reactExports.useMemo(() => {
    const q = query.toLowerCase();
    return sampleProducts.filter(
      (p) => !existingIds.includes(p.id) && (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)))
    );
  }, [query, existingIds]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end justify-center",
      style: { background: "rgba(0,0,0,0.7)" },
      onClick: onClose,
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      role: "presentation",
      "data-ocid": "compare.search_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "dialog",
        {
          className: "w-full max-w-sm rounded-t-2xl p-4 fade-in border-0",
          style: { background: "oklch(0.14 0.005 220)" },
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          "aria-label": "Select product to compare",
          open: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", style: { color: "oklch(0.9 0 0)" }, children: "Select Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  onKeyDown: (e) => e.key === "Enter" && onClose(),
                  "data-ocid": "compare.close_button",
                  className: "w-7 h-7 rounded-full flex items-center justify-center",
                  style: { background: "oklch(0.2 0 0)", color: "oklch(0.7 0 0)" },
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                value: query,
                onChange: (e) => setQuery(e.target.value),
                placeholder: "Search products…",
                "data-ocid": "compare.search_input",
                className: "w-full text-sm rounded-lg px-3 py-2 mb-3 outline-none",
                style: {
                  background: "oklch(0.18 0 0)",
                  color: "oklch(0.9 0 0)",
                  border: "1px solid oklch(0.25 0 0)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto max-h-64 space-y-2 pr-1", children: [
              filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-6", children: "No products found" }),
              filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => onSelect(p),
                  onKeyDown: (ev) => ev.key === "Enter" && onSelect(p),
                  "data-ocid": `compare.search_result.${p.id}`,
                  className: "w-full flex items-center gap-3 p-2 rounded-xl transition-smooth text-left",
                  style: {
                    background: "oklch(0.17 0.005 220)",
                    border: "1px solid oklch(0.22 0 0)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: p.images[0],
                        alt: p.name,
                        className: "w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-medium truncate",
                          style: { color: "oklch(0.9 0 0)" },
                          children: p.name
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: p.category })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-bold flex-shrink-0",
                        style: { color: "oklch(0.675 0.25 178)" },
                        children: formatINR(p.priceInPaise)
                      }
                    )
                  ]
                },
                p.id
              ))
            ] })
          ]
        }
      )
    }
  );
}
function EmptyState() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-5 py-16 px-6 fade-in",
      "data-ocid": "compare.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-20 h-20 rounded-2xl flex items-center justify-center",
            style: {
              background: "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.15), oklch(0.72 0.26 90 / 0.15))",
              border: "1px solid oklch(0.675 0.25 178 / 0.25)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              GitCompareArrows,
              {
                size: 36,
                style: { color: "oklch(0.675 0.25 178)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-1 text-gradient", children: "Compare Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            "Select 2–4 products to compare side by side.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "View prices, specs, ratings and more."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "btn-premium px-8 py-3 text-sm",
            onClick: () => navigate({ to: "/" }),
            onKeyDown: (e) => e.key === "Enter" && navigate({ to: "/" }),
            "data-ocid": "compare.browse_button",
            children: "Browse Products"
          }
        )
      ]
    }
  );
}
function ComparePage() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [compareIds, setCompareIdsState] = reactExports.useState(
    () => getCompareIds()
  );
  const [showSearchModal, setShowSearchModal] = reactExports.useState(false);
  const products = reactExports.useMemo(
    () => compareIds.map((id) => sampleProducts.find((p) => p.id === id)).filter(Boolean),
    [compareIds]
  );
  reactExports.useEffect(() => {
    setCompareIds(compareIds);
  }, [compareIds]);
  const removeProduct = reactExports.useCallback((id) => {
    setCompareIdsState((prev) => prev.filter((i) => i !== id));
  }, []);
  const handleSelect = reactExports.useCallback((product) => {
    setCompareIdsState((prev) => {
      if (prev.includes(product.id) || prev.length >= 4) return prev;
      return [...prev, product.id];
    });
    setShowSearchModal(false);
  }, []);
  const handleAddToCart = reactExports.useCallback(
    (product) => {
      addItem(product, 1);
      ue.success(`${product.name} added to cart`, {
        style: {
          background: "oklch(0.14 0.005 220)",
          color: "oklch(0.9 0 0)",
          border: "1px solid oklch(0.675 0.25 178 / 0.3)"
        }
      });
    },
    [addItem]
  );
  const lowestPriceId = reactExports.useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((a, b) => a.priceInPaise <= b.priceInPaise ? a : b).id;
  }, [products]);
  const highestRatingId = reactExports.useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((a, b) => a.rating >= b.rating ? a : b).id;
  }, [products]);
  const bestDiscountId = reactExports.useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce(
      (a, b) => computeDiscount(a) >= computeDiscount(b) ? a : b
    ).id;
  }, [products]);
  const allSpecLabels = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    const labels = [];
    for (const p of products) {
      for (const s of p.specifications) {
        if (!seen.has(s.label)) {
          seen.add(s.label);
          labels.push(s.label);
        }
      }
    }
    return labels;
  }, [products]);
  const slotCount = products.length;
  const canAddMore = slotCount < 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "oklch(0.09 0 0)" },
      "data-ocid": "compare.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-0 z-20 px-4 py-3 flex items-center gap-3",
            style: {
              background: "oklch(0.12 0.005 220)",
              borderBottom: "1px solid oklch(0.2 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/" }),
                  onKeyDown: (e) => e.key === "Enter" && navigate({ to: "/" }),
                  "data-ocid": "compare.back_button",
                  className: "w-8 h-8 rounded-full flex items-center justify-center transition-smooth",
                  style: { background: "oklch(0.18 0 0)", color: "oklch(0.7 0 0)" },
                  "aria-label": "Go back",
                  children: "←"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-sm font-bold text-gradient", children: "Compare Products" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: slotCount === 0 ? "Add products to compare" : `${slotCount} product${slotCount > 1 ? "s" : ""} selected` })
              ] }),
              slotCount >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCompareIdsState([]),
                  onKeyDown: (e) => e.key === "Enter" && setCompareIdsState([]),
                  "data-ocid": "compare.clear_button",
                  className: "text-[10px] px-3 py-1.5 rounded-lg transition-smooth",
                  style: {
                    background: "oklch(0.65 0.19 22 / 0.15)",
                    color: "oklch(0.75 0.15 22)",
                    border: "1px solid oklch(0.65 0.19 22 / 0.3)"
                  },
                  children: "Clear All"
                }
              )
            ]
          }
        ),
        slotCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}),
        slotCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-3 p-4",
              style: {
                minWidth: `${(slotCount + (canAddMore ? 1 : 0)) * 168}px`
              },
              children: [
                products.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProductSlot,
                  {
                    product,
                    slot: idx + 1,
                    isLowest: lowestPriceId === product.id,
                    isHighestRating: highestRatingId === product.id,
                    isBestDiscount: bestDiscountId === product.id,
                    onRemove: () => removeProduct(product.id),
                    onAddToCart: () => handleAddToCart(product)
                  },
                  product.id
                )),
                canAddMore && /* @__PURE__ */ jsxRuntimeExports.jsx(AddSlot, { onAdd: () => setShowSearchModal(true) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 px-4 pb-3 flex-wrap", children: [
            { color: "oklch(0.675 0.25 178)", label: "Lowest Price" },
            { color: "oklch(0.72 0.26 90)", label: "Top Rated" },
            { color: "oklch(0.78 0.22 145)", label: "Best Discount" }
          ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                style: { background: color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: label })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mx-4 mb-4 rounded-xl overflow-hidden",
              style: { border: "1px solid oklch(0.2 0 0)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "px-3 py-2 text-[10px] font-bold uppercase tracking-wider",
                    style: {
                      background: "oklch(0.675 0.25 178 / 0.08)",
                      color: "oklch(0.675 0.25 178)",
                      borderBottom: "1px solid oklch(0.2 0 0)"
                    },
                    children: "Core Details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: "Price",
                      values: products.map((p) => {
                        const isLowest = lowestPriceId === p.id;
                        return `${formatINR(p.priceInPaise)}${isLowest ? " ✓" : ""}`;
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: "Discount",
                      values: products.map((p) => {
                        const d = computeDiscount(p);
                        const isBest = bestDiscountId === p.id;
                        return d > 0 ? `${d}%${isBest ? " 🏆" : ""}` : null;
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: "Rating",
                      values: products.map((p) => {
                        const isTop = highestRatingId === p.id;
                        return `${p.rating.toFixed(1)} ★ (${p.reviewCount.toLocaleString()})${isTop ? " ✓" : ""}`;
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: "Stock",
                      values: products.map(
                        (p) => p.stock > 0 ? `${p.stock} units` : "Out of Stock"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: "Category",
                      values: products.map((p) => p.category)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: "Tags",
                      values: products.map((p) => p.tags.slice(0, 3).join(", "))
                    }
                  )
                ] }),
                allSpecLabels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "px-3 py-2 text-[10px] font-bold uppercase tracking-wider",
                      style: {
                        background: "oklch(0.72 0.26 90 / 0.08)",
                        color: "oklch(0.72 0.26 90)",
                        borderBottom: "1px solid oklch(0.2 0 0)",
                        borderTop: "1px solid oklch(0.2 0 0)"
                      },
                      children: "Specifications"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: allSpecLabels.map((specLabel) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpecRow,
                    {
                      label: specLabel,
                      values: products.map((p) => {
                        const spec = p.specifications.find(
                          (s) => s.label === specLabel
                        );
                        return (spec == null ? void 0 : spec.value) ?? null;
                      })
                    },
                    specLabel
                  )) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-6 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              onKeyDown: (e) => e.key === "Enter" && navigate({ to: "/" }),
              "data-ocid": "compare.browse_more_button",
              className: "w-full py-3 rounded-xl text-sm font-semibold transition-smooth",
              style: {
                background: "oklch(0.675 0.25 178 / 0.1)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "inline mr-2" }),
                "Browse More Products"
              ]
            }
          ) })
        ] }),
        showSearchModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductSearchModal,
          {
            existingIds: compareIds,
            onSelect: handleSelect,
            onClose: () => setShowSearchModal(false)
          }
        )
      ]
    }
  );
}
export {
  addToCompare,
  ComparePage as default,
  getCompareIds,
  removeFromCompare,
  setCompareIds
};
