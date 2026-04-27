import { c as createLucideIcon, u as useData, r as reactExports, j as jsxRuntimeExports, a as useNavigate, b as useLanguage, S as Search, L as Link, d as useCart, e as useWishlist, f as useNotifications, g as ShoppingBag } from "./index-dBmmwt_c.js";
import { L as LEDBorderCard } from "./LEDBorderCard-B73CWeRW.js";
import { P as PriceTag } from "./PriceTag-Bv1TpP2i.js";
import { R as RatingStars } from "./RatingStars-Bxuoj_c0.js";
import { s as sampleCategories } from "./sampleProducts-BY_RAjCR.js";
import { M as MicOff, a as Mic } from "./mic-DTBD7ByZ.js";
import { C as ChevronLeft } from "./chevron-left-DcLSJgdZ.js";
import { C as ChevronRight } from "./chevron-right-Bgh55iko.js";
import { Z as Zap } from "./zap-DOSvLy36.js";
import { m as motion } from "./proxy-BdCiAwbM.js";
import { H as Heart } from "./heart-DfryMSKG.js";
import "./star-B5-fF_uf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function useCountdown(targetMs) {
  const calc = () => Math.max(0, targetMs - Date.now());
  const [remaining, setRemaining] = reactExports.useState(calc);
  reactExports.useEffect(() => {
    const id = setInterval(() => setRemaining(calc()), 1e3);
    return () => clearInterval(id);
  });
  const h = Math.floor(remaining / 36e5);
  const m = Math.floor(remaining % 36e5 / 6e4);
  const s = Math.floor(remaining % 6e4 / 1e3);
  const pad = (n) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}
function UpdatingIndicator({ visible }) {
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "flex items-center gap-1 text-[10px] font-medium",
      style: { color: "oklch(0.675 0.25 178 / 0.85)" },
      "aria-live": "polite",
      "data-ocid": "home.updating_indicator",
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
function SearchBar({ isUpdating }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = reactExports.useState("");
  const [listening, setListening] = reactExports.useState(false);
  const debounceRef = reactExports.useRef(null);
  const recognitionRef = reactExports.useRef(null);
  const handleChange = (val) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        void navigate({ to: "/search", search: { q: val, category: "" } });
      }, 500);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      void navigate({ to: "/search", search: { q: query, category: "" } });
    }
  };
  const toggleVoice = () => {
    var _a;
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      (_a = recognitionRef.current) == null ? void 0 : _a.stop();
      setListening(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.onresult = (e) => {
      var _a2, _b;
      const transcript = ((_b = (_a2 = e.results[0]) == null ? void 0 : _a2[0]) == null ? void 0 : _b.transcript) ?? "";
      setQuery(transcript);
      setListening(false);
      if (transcript.trim()) {
        void navigate({
          to: "/search",
          search: { q: transcript, category: "" }
        });
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "form",
    {
      onSubmit: handleSubmit,
      className: "px-4 pb-3",
      "data-ocid": "home.search_form",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 bg-muted/60 rounded-2xl px-4 py-2.5 border transition-smooth",
          style: {
            borderColor: listening ? "oklch(0.675 0.25 178)" : "oklch(0.25 0 0)",
            boxShadow: listening ? "0 0 0 3px oklch(0.675 0.25 178 / 0.25)" : void 0
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: query,
                onChange: (e) => handleChange(e.target.value),
                placeholder: t("searchPlaceholder"),
                className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0",
                "data-ocid": "home.search_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(UpdatingIndicator, { visible: isUpdating }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: toggleVoice,
                className: `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${listening ? "bg-primary/20" : "hover:bg-muted"}`,
                "aria-label": listening ? "Stop voice search" : "Start voice search",
                "data-ocid": "home.voice_search_button",
                children: listening ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { size: 15, style: { color: "oklch(0.675 0.25 178)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 15, className: "text-muted-foreground" })
              }
            )
          ]
        }
      )
    }
  );
}
function HeroBanner() {
  const navigate = useNavigate();
  const { banners } = useData();
  const [current, setCurrent] = reactExports.useState(0);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (current >= banners.length) setCurrent(0);
  }, [banners.length, current]);
  reactExports.useEffect(() => {
    if (isPaused || banners.length === 0) return;
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      3e3
    );
    return () => clearInterval(id);
  }, [isPaused, banners.length]);
  const goTo = (idx) => {
    setCurrent(idx);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5e3);
  };
  const prev = () => goTo((current - 1 + banners.length) % banners.length);
  const next = () => goTo((current + 1) % banners.length);
  const banner = banners[current];
  if (!banners.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative mx-4 mb-4 rounded-2xl overflow-hidden",
      style: { aspectRatio: "16/7" },
      "data-ocid": "home.hero_banner",
      children: [
        banners.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-700",
            style: { opacity: i === current ? 1 : 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: b.imageUrl,
                  alt: b.title,
                  loading: i === 0 ? "eager" : "lazy",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `absolute inset-0 bg-gradient-to-r ${b.bgColor ?? "from-[#0f2a2a] to-[#0f172a]"} opacity-80`
                }
              )
            ]
          },
          b.id
        )),
        banner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-4 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-semibold uppercase tracking-widest mb-1",
              style: { color: "oklch(0.72 0.26 90)" },
              children: banner.subtitle
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-3 leading-tight", children: banner.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void navigate({ to: banner.ctaLink }),
              className: "btn-premium self-start text-xs py-2 px-5",
              "data-ocid": "home.hero_cta_button",
              children: banner.ctaLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: prev,
            className: "absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full glass flex items-center justify-center",
            "aria-label": "Previous banner",
            "data-ocid": "home.hero_prev_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 14, className: "text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: next,
            className: "absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full glass flex items-center justify-center",
            "aria-label": "Next banner",
            "data-ocid": "home.hero_next_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5", children: banners.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goTo(i),
            "aria-label": `Banner ${i + 1}`,
            "data-ocid": `home.hero_dot.${i + 1}`,
            className: "transition-smooth rounded-full",
            style: {
              width: i === current ? 16 : 6,
              height: 6,
              background: i === current ? "oklch(0.72 0.26 90)" : "oklch(0.5 0 0 / 0.6)"
            }
          },
          b.id
        )) })
      ]
    }
  );
}
function CategoriesRow() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeId, setActiveId] = reactExports.useState(null);
  const categories = sampleCategories;
  const handleCategory = (cat) => {
    setActiveId(cat.id);
    void navigate({
      to: "/search",
      search: { q: "", category: cat.name }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-5", "data-ocid": "home.categories_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-4 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-bold text-foreground", children: t("categories") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-hide no-scrollbar", children: categories.map((cat, i) => {
      const isActive = activeId === cat.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleCategory(cat),
          "data-ocid": `home.category.${i + 1}`,
          className: "flex-shrink-0 flex flex-col items-center gap-1.5 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-smooth",
                style: {
                  background: isActive ? "oklch(0.675 0.25 178 / 0.2)" : "oklch(0.15 0 0)",
                  border: `1.5px solid ${isActive ? "oklch(0.675 0.25 178)" : "oklch(0.25 0 0)"}`,
                  boxShadow: isActive ? "0 0 12px oklch(0.675 0.25 178 / 0.3)" : void 0,
                  transform: isActive ? "scale(1.08)" : "scale(1)"
                },
                children: cat.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-medium whitespace-nowrap",
                style: {
                  color: isActive ? "oklch(0.675 0.25 178)" : "oklch(0.6 0 0)"
                },
                children: cat.name
              }
            )
          ]
        },
        cat.id
      );
    }) })
  ] });
}
function FlashDealTimer({ endsAt }) {
  const { h, m, s } = useCountdown(endsAt);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: ["h", "m", "s"].map((label, i) => {
    const unit = label === "h" ? h : label === "m" ? m : s;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "inline-flex items-center justify-center w-7 h-6 rounded-md text-xs font-mono font-bold",
          style: {
            background: "oklch(0.72 0.26 90 / 0.15)",
            color: "oklch(0.72 0.26 90)",
            border: "1px solid oklch(0.72 0.26 90 / 0.3)"
          },
          children: unit
        }
      ),
      i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "mx-0.5 font-bold text-xs",
          style: { color: "oklch(0.72 0.26 90)" },
          children: ":"
        }
      )
    ] }, label);
  }) });
}
function ProductCard({ product, size = "md", index }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const { showToast } = useNotifications();
  const { t } = useLanguage();
  const inWishlist = isInWishlist(product.id);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product, 1);
    showToast("success", t("addedToCart"));
  };
  const handleWishlist = (e) => {
    e.stopPropagation();
    toggle(product);
    showToast(
      "info",
      inWishlist ? t("removedFromWishlist") : t("addedToWishlist")
    );
  };
  const isSmall = size === "sm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.3 },
      "data-ocid": `home.product.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        LEDBorderCard,
        {
          onClick: () => void navigate({ to: "/product/$id", params: { id: product.id } }),
          glowIntensity: "medium",
          animationDuration: 3 + index % 3 * 0.5,
          className: isSmall ? "w-32" : "w-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative overflow-hidden rounded-t-[10px]",
                style: { aspectRatio: isSmall ? "1/1" : "4/3" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: product.images[0],
                      alt: product.name,
                      loading: "lazy",
                      className: "w-full h-full object-cover"
                    }
                  ),
                  product.discount && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                      style: {
                        background: "oklch(0.72 0.26 90 / 0.9)",
                        color: "oklch(0.1 0 0)"
                      },
                      children: [
                        "-",
                        product.discount,
                        "%"
                      ]
                    }
                  ),
                  product.isFlashDeal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5",
                      style: {
                        background: "oklch(0.65 0.25 16 / 0.9)",
                        color: "oklch(0.98 0 0)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 8, fill: "currentColor" }),
                        "FLASH"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleWishlist,
                      className: "absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110",
                      "aria-label": inWishlist ? t("removeFromWishlist") : t("addToWishlist"),
                      "data-ocid": `home.wishlist_button.${index}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Heart,
                        {
                          size: 14,
                          fill: inWishlist ? "oklch(0.72 0.26 90)" : "transparent",
                          style: {
                            color: inWishlist ? "oklch(0.72 0.26 90)" : "oklch(0.6 0 0)"
                          }
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-2.5 ${isSmall ? "pb-2" : "pb-3"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `font-medium text-foreground truncate mb-1 ${isSmall ? "text-xs" : "text-sm"}`,
                  children: product.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RatingStars,
                {
                  rating: product.rating,
                  size: isSmall ? 10 : 11,
                  showValue: true,
                  showCount: isSmall ? void 0 : product.reviewCount,
                  className: "mb-1.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceTag,
                {
                  priceInPaise: product.priceInPaise,
                  originalPriceInPaise: product.originalPriceInPaise,
                  size: isSmall ? "sm" : "sm",
                  showDiscount: false,
                  className: "mb-2"
                }
              ),
              !isSmall && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleAddToCart,
                  disabled: product.stock === 0,
                  className: "w-full py-1.5 rounded-lg text-xs font-semibold transition-smooth",
                  style: {
                    background: product.stock === 0 ? "oklch(0.25 0 0)" : "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
                    color: product.stock === 0 ? "oklch(0.45 0 0)" : "oklch(0.08 0 0)",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer"
                  },
                  "data-ocid": `home.add_to_cart_button.${index}`,
                  children: product.stock === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center gap-1", children: t("outOfStock") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 11 }),
                    t("addToCart")
                  ] })
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
function FlashDeals() {
  const { t } = useLanguage();
  const { flashDeals } = useData();
  const earliest = flashDeals.reduce(
    (min, p) => p.flashDealEndsAt && p.flashDealEndsAt < min ? p.flashDealEndsAt : min,
    Date.now() + 24 * 36e5
  );
  if (!flashDeals.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-5 mx-4", "data-ocid": "home.flash_deals_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between mb-3 px-4 py-2.5 rounded-xl",
        style: {
          background: "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.12), oklch(0.72 0.26 90 / 0.05))",
          border: "1px solid oklch(0.72 0.26 90 / 0.2)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Zap,
              {
                size: 16,
                fill: "oklch(0.72 0.26 90)",
                style: { color: "oklch(0.72 0.26 90)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-display font-bold",
                style: { color: "oklch(0.72 0.26 90)" },
                children: t("flashDeals")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FlashDealTimer, { endsAt: earliest })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: flashDeals.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductCard,
      {
        product,
        size: "md",
        index: i + 1
      },
      product.id
    )) })
  ] });
}
function TrendingProducts() {
  const { t } = useLanguage();
  const { trendingProducts } = useData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-5", "data-ocid": "home.trending_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🔥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-bold text-foreground", children: t("trendingProducts") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/search",
          search: { q: "", category: "trending" },
          className: "text-xs font-medium",
          style: { color: "oklch(0.675 0.25 178)" },
          children: t("viewAll")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar", children: trendingProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, size: "md", index: i + 1 }) }, product.id)) })
  ] });
}
function RecentlyViewed({
  products
}) {
  const { t } = useLanguage();
  if (!products.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-5", "data-ocid": "home.recently_viewed_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-4 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-bold text-foreground", children: t("recentlyViewed") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, size: "sm", index: i + 1 }) }, product.id)) })
  ] });
}
function PullToRefreshIndicator({ visible }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-center py-2 transition-smooth overflow-hidden",
      style: {
        height: visible ? 40 : 0,
        opacity: visible ? 1 : 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RefreshCw,
          {
            size: 16,
            className: "text-primary",
            style: {
              animation: visible ? "spin-slow 1s linear infinite" : void 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2", children: "Refreshing…" })
      ]
    }
  );
}
function HomePage() {
  const { products, isUpdating, refetch } = useData();
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [touchStart, setTouchStart] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const recentlyViewed = products.slice(0, 4);
  const triggerRefresh = reactExports.useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 1500);
  }, [refreshing, refetch]);
  const handleTouchStart = (e) => {
    var _a, _b;
    const scrollTop = ((_a = containerRef.current) == null ? void 0 : _a.scrollTop) ?? 0;
    if (scrollTop === 0) {
      setTouchStart(((_b = e.touches[0]) == null ? void 0 : _b.clientY) ?? null);
    }
  };
  const handleTouchMove = (e) => {
    var _a;
    if (touchStart === null) return;
    const currentY = ((_a = e.touches[0]) == null ? void 0 : _a.clientY) ?? 0;
    if (currentY - touchStart > 60) {
      triggerRefresh();
      setTouchStart(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "min-h-full",
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      "data-ocid": "home.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PullToRefreshIndicator, { visible: refreshing }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { isUpdating }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBanner, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mx-4 mb-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoriesRow, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mx-4 mb-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlashDeals, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mx-4 mb-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingProducts, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mx-4 mb-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RecentlyViewed, { products: recentlyViewed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
      ]
    }
  );
}
export {
  HomePage as default
};
