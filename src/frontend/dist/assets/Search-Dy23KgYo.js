import { m as useSearch, a as useNavigate, b as useLanguage, d as useCart, e as useWishlist, f as useNotifications, u as useData, r as reactExports, j as jsxRuntimeExports, S as Search, X, g as ShoppingBag } from "./index-dBmmwt_c.js";
import { L as LEDBorderCard } from "./LEDBorderCard-B73CWeRW.js";
import { f as formatINR } from "./PriceTag-Bv1TpP2i.js";
import { M as MicOff, a as Mic } from "./mic-DTBD7ByZ.js";
import { H as Heart } from "./heart-DfryMSKG.js";
import { S as Star } from "./star-B5-fF_uf.js";
const categories = [
  { id: "All", label: "All" },
  { id: "Electronics", label: "Electronics" },
  { id: "Fashion", label: "Fashion" },
  { id: "Home", label: "Home" },
  { id: "Beauty", label: "Beauty" },
  { id: "Sports", label: "Sports" },
  { id: "Jewelry", label: "Jewelry" }
];
const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "price_asc", label: "Price: Low–High" },
  { id: "price_desc", label: "Price: High–Low" },
  { id: "rating", label: "Top Rated" }
];
const priceFilters = [
  { id: "all", label: "All Prices" },
  { id: "under1k", label: "Under ₹1,000" },
  { id: "1k_5k", label: "₹1,000–₹5,000" },
  { id: "over5k", label: "Over ₹5,000" }
];
const voiceBars = [
  { id: "b1", h: 3 },
  { id: "b2", h: 5 },
  { id: "b3", h: 7 },
  { id: "b4", h: 4 },
  { id: "b5", h: 6 }
];
function UpdatingBadge({ visible }) {
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full",
      style: {
        background: "oklch(0.675 0.25 178 / 0.12)",
        color: "oklch(0.675 0.25 178 / 0.9)",
        border: "1px solid oklch(0.675 0.25 178 / 0.25)"
      },
      "aria-live": "polite",
      "data-ocid": "search.updating_indicator",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-block w-1.5 h-1.5 rounded-full",
            style: {
              background: "oklch(0.675 0.25 178)",
              animation: "scale-pulse 1s ease-in-out infinite"
            }
          }
        ),
        "Updating…"
      ]
    }
  );
}
function SearchPage() {
  const searchParams = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem, isInCart } = useCart();
  const { toggle: toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useNotifications();
  const { products, isUpdating } = useData();
  const [query, setQuery] = reactExports.useState(searchParams.q ?? "");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(searchParams.category || "All");
  const [priceFilter, setPriceFilter] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("relevance");
  const [isListening, setIsListening] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const recognitionRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 100);
  }, []);
  const startVoiceSearch = reactExports.useCallback(() => {
    const SpeechRecCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecCtor) {
      showToast("error", "Voice search not supported on this device");
      return;
    }
    const recognition = new SpeechRecCtor();
    recognition.lang = "en-IN";
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e) => {
      var _a, _b;
      const transcript = ((_b = (_a = e.results[0]) == null ? void 0 : _a[0]) == null ? void 0 : _b.transcript) ?? "";
      setQuery(transcript);
    };
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  }, [showToast]);
  const stopVoiceSearch = reactExports.useCallback(() => {
    var _a;
    (_a = recognitionRef.current) == null ? void 0 : _a.stop();
    setIsListening(false);
  }, []);
  const results = reactExports.useMemo(() => {
    let filtered = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (priceFilter === "under1k") {
      filtered = filtered.filter((p) => p.priceInPaise < 1e5);
    } else if (priceFilter === "1k_5k") {
      filtered = filtered.filter(
        (p) => p.priceInPaise >= 1e5 && p.priceInPaise <= 5e5
      );
    } else if (priceFilter === "over5k") {
      filtered = filtered.filter((p) => p.priceInPaise > 5e5);
    }
    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.priceInPaise - b.priceInPaise);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.priceInPaise - a.priceInPaise);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    return filtered;
  }, [query, selectedCategory, priceFilter, sortBy, products]);
  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    addItem(product, 1);
    showToast("success", t("addedToCart"));
  };
  const handleToggleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const inWl = isInWishlist(productId);
    toggleWishlist(product);
    showToast("info", inWl ? t("removedFromWishlist") : t("addedToWishlist"));
  };
  const goToProduct = (id) => navigate({ to: "/product/$id", params: { id } });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-3 pt-3 pb-2 sticky top-0 z-20",
        style: {
          background: "oklch(0.08 0 0 / 0.95)",
          backdropFilter: "blur(12px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-3 py-2.5 rounded-xl",
              style: {
                background: "oklch(0.12 0 0)",
                border: "1px solid oklch(0.25 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: inputRef,
                    "data-ocid": "search.search_input",
                    type: "text",
                    value: query,
                    onChange: (e) => setQuery(e.target.value),
                    placeholder: t("searchPlaceholder"),
                    className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
                  }
                ),
                query && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "search.clear_button",
                    onClick: () => setQuery(""),
                    className: "flex-shrink-0 transition-smooth hover:opacity-70",
                    "aria-label": "Clear search",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "search.voice_button",
                    onClick: isListening ? stopVoiceSearch : startVoiceSearch,
                    className: "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-smooth",
                    style: isListening ? {
                      background: "oklch(0.675 0.25 178)",
                      color: "oklch(0.08 0 0)"
                    } : {
                      background: "oklch(0.675 0.25 178 / 0.1)",
                      color: "oklch(0.675 0.25 178)"
                    },
                    "aria-label": isListening ? "Stop voice search" : "Start voice search",
                    children: isListening ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" })
                  }
                )
              ]
            }
          ),
          isListening && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 items-end h-4", children: voiceBars.map((bar) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-1 rounded-full",
                style: {
                  height: `${bar.h * 2}px`,
                  background: "oklch(0.675 0.25 178)",
                  animation: "scale-pulse 0.6s ease-in-out infinite"
                }
              },
              bar.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs",
                style: { color: "oklch(0.675 0.25 178)" },
                children: "Listening..."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-1",
        style: { scrollbarWidth: "none" },
        children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `search.category.${cat.id.toLowerCase()}`,
            onClick: () => setSelectedCategory(cat.id),
            className: "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth hover:scale-105",
            style: selectedCategory === cat.id ? {
              background: "oklch(0.675 0.25 178)",
              color: "oklch(0.08 0 0)"
            } : {
              background: "oklch(0.14 0 0)",
              color: "oklch(0.6 0 0)",
              border: "1px solid oklch(0.22 0 0)"
            },
            children: cat.label
          },
          cat.id
        ))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-1",
        style: { scrollbarWidth: "none" },
        children: priceFilters.map((pf) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `search.price_filter.${pf.id}`,
            onClick: () => setPriceFilter(pf.id),
            className: "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth hover:scale-105",
            style: priceFilter === pf.id ? {
              background: "oklch(0.72 0.26 90)",
              color: "oklch(0.08 0 0)"
            } : {
              background: "oklch(0.14 0 0)",
              color: "oklch(0.6 0 0)",
              border: "1px solid oklch(0.22 0 0)"
            },
            children: pf.label
          },
          pf.id
        ))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-2 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground truncate", children: [
          results.length,
          " result",
          results.length !== 1 ? "s" : "",
          query ? ` for "${query}"` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UpdatingBadge, { visible: isUpdating })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1.5 overflow-x-auto flex-shrink-0",
          style: { scrollbarWidth: "none" },
          children: sortOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `search.sort.${s.id}`,
              onClick: () => setSortBy(s.id),
              className: "flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-smooth",
              style: sortBy === s.id ? {
                background: "oklch(0.675 0.25 178 / 0.15)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.4)"
              } : {
                background: "oklch(0.14 0 0)",
                color: "oklch(0.5 0 0)",
                border: "1px solid oklch(0.2 0 0)"
              },
              children: s.label
            },
            s.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-3 pb-4", children: results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "search.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center mb-4",
              style: {
                background: "oklch(0.675 0.25 178 / 0.1)",
                border: "1px solid oklch(0.675 0.25 178 / 0.2)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  className: "w-8 h-8",
                  style: { color: "oklch(0.675 0.25 178 / 0.5)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: t("noResults") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 max-w-xs", children: "Try different keywords or explore our categories." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: ["iPhone", "Gold Ring", "Saree", "Sneakers"].map(
            (suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setQuery(suggestion),
                className: "px-3 py-1.5 rounded-full text-xs font-medium transition-smooth hover:scale-105",
                style: {
                  background: "oklch(0.675 0.25 178 / 0.08)",
                  color: "oklch(0.675 0.25 178)",
                  border: "1px solid oklch(0.675 0.25 178 / 0.25)"
                },
                children: suggestion
              },
              suggestion
            )
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: results.map((product, idx) => {
      const inCart = isInCart(product.id);
      const inWl = isInWishlist(product.id);
      const discountPercent = product.originalPriceInPaise && product.originalPriceInPaise > product.priceInPaise ? Math.round(
        (product.originalPriceInPaise - product.priceInPaise) / product.originalPriceInPaise * 100
      ) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `search.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LEDBorderCard, { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
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
          product.isFlashDeal && !discountPercent && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute top-2 left-2 z-30 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
              style: {
                background: "oklch(0.65 0.19 22)",
                color: "#fff"
              },
              children: "⚡ Deal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `search.wishlist_toggle.${idx + 1}`,
              onClick: () => handleToggleWishlist(product.id),
              className: "absolute top-2 right-2 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-smooth hover:scale-110",
              style: {
                background: "oklch(0.08 0 0 / 0.8)",
                border: "1px solid oklch(0.3 0 0)"
              },
              "aria-label": inWl ? "Remove from wishlist" : "Add to wishlist",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: "w-3.5 h-3.5",
                  style: {
                    color: inWl ? "oklch(0.72 0.26 90)" : "oklch(0.55 0 0)"
                  },
                  fill: inWl ? "oklch(0.72 0.26 90)" : "transparent"
                }
              )
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
              "data-ocid": `search.add_to_cart.${idx + 1}`,
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
    }) }) })
  ] });
}
export {
  SearchPage as default
};
