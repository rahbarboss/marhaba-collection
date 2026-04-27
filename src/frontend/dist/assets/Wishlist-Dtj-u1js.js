import { e as useWishlist, d as useCart, f as useNotifications, b as useLanguage, a as useNavigate, j as jsxRuntimeExports, X, g as ShoppingBag } from "./index-dBmmwt_c.js";
import { L as LEDBorderCard } from "./LEDBorderCard-B73CWeRW.js";
import { f as formatINR } from "./PriceTag-Bv1TpP2i.js";
import { H as Heart } from "./heart-DfryMSKG.js";
import { S as Star } from "./star-B5-fF_uf.js";
function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const { showToast } = useNotifications();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const goToProduct = (id) => navigate({ to: "/product/$id", params: { id } });
  const handleAddToCart = (productId) => {
    const item = items.find((i) => i.product.id === productId);
    if (!item) return;
    addItem(item.product, 1);
    showToast("success", t("addedToCart"));
  };
  const handleRemove = (productId) => {
    removeItem(productId);
    showToast("info", t("removedFromWishlist"));
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-full px-6 py-16 fade-in",
        "data-ocid": "wishlist.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-24 h-24 rounded-full flex items-center justify-center mb-6",
              style: {
                background: "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.15), oklch(0.675 0.25 178 / 0.1))",
                border: "2px solid oklch(0.72 0.26 90 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: "w-10 h-10",
                  style: { color: "oklch(0.72 0.26 90)" },
                  fill: "oklch(0.72 0.26 90 / 0.3)"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: "Your wishlist is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center mb-8 max-w-xs", children: "Save your favourite items here and come back to them anytime." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "wishlist.explore.button",
              onClick: () => navigate({ to: "/" }),
              className: "btn-premium px-8 py-3 rounded-full text-sm font-semibold",
              children: "Explore Products"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pt-4 pb-4 fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("wishlist") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " ",
        items.length === 1 ? "item" : "items"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: items.map((item, idx) => {
      const { product } = item;
      const inCart = isInCart(product.id);
      const discountPercent = product.originalPriceInPaise && product.originalPriceInPaise > product.priceInPaise ? Math.round(
        (product.originalPriceInPaise - product.priceInPaise) / product.originalPriceInPaise * 100
      ) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `wishlist.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LEDBorderCard, { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `wishlist.remove_button.${idx + 1}`,
              onClick: () => handleRemove(product.id),
              className: "absolute top-2 right-2 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-smooth hover:scale-110",
              style: {
                background: "oklch(0.08 0 0 / 0.8)",
                border: "1px solid oklch(0.3 0 0)"
              },
              "aria-label": "Remove from wishlist",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
            }
          ),
          discountPercent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "absolute top-2 left-2 z-30 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
              style: {
                background: "oklch(0.72 0.26 90)",
                color: "oklch(0.08 0 0)"
              },
              children: [
                "-",
                discountPercent,
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "block w-full",
              onClick: () => goToProduct(product.id),
              "aria-label": `View ${product.name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.images[0],
                  alt: product.name,
                  className: "w-full aspect-square object-cover rounded-t-[10px]",
                  loading: "lazy"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 flex flex-col flex-1 gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs font-medium text-foreground line-clamp-2 leading-snug text-left hover:opacity-80 transition-smooth",
              onClick: () => goToProduct(product.id),
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: "w-3 h-3",
                style: { color: "oklch(0.72 0.26 90)" },
                fill: "oklch(0.72 0.26 90)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              product.rating,
              " (",
              product.reviewCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-bold",
                style: { color: "oklch(0.675 0.25 178)" },
                children: formatINR(product.priceInPaise)
              }
            ),
            product.originalPriceInPaise && product.originalPriceInPaise > product.priceInPaise && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground line-through", children: formatINR(product.originalPriceInPaise) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `wishlist.add_to_cart.${idx + 1}`,
              onClick: () => handleAddToCart(product.id),
              disabled: product.stock === 0,
              className: "w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-smooth hover:scale-[1.02] disabled:opacity-50 mt-auto",
              style: inCart ? {
                background: "oklch(0.675 0.25 178 / 0.1)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.3)"
              } : {
                background: "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
                color: "oklch(0.08 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3 h-3" }),
                product.stock === 0 ? "Out of Stock" : inCart ? "In Bag" : t("addToCart")
              ]
            }
          )
        ] })
      ] }) }, product.id);
    }) })
  ] });
}
export {
  Wishlist as default
};
