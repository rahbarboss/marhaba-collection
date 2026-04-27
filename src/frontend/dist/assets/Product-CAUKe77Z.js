import { c as createLucideIcon, h as useParams, a as useNavigate, d as useCart, e as useWishlist, r as reactExports, j as jsxRuntimeExports, B as Bell, i as cn } from "./index-dBmmwt_c.js";
import { u as ue } from "./index-Cn_Wwf5u.js";
import { B as Badge } from "./BadgeCustom-D3qHeYlv.js";
import { P as PriceTag, f as formatINR } from "./PriceTag-Bv1TpP2i.js";
import { R as RatingStars } from "./RatingStars-Bxuoj_c0.js";
import { g as getProductById, a as getProductsByCategory, b as sampleProducts } from "./sampleProducts-BY_RAjCR.js";
import { addToCompare } from "./Compare-DRjUiLeD.js";
import { m as motion } from "./proxy-BdCiAwbM.js";
import { C as ChevronLeft } from "./chevron-left-DcLSJgdZ.js";
import { S as ShoppingCart } from "./shopping-cart-NAW4_HFu.js";
import { A as AnimatePresence } from "./index-Dz8DKVGH.js";
import { C as ChevronRight } from "./chevron-right-Bgh55iko.js";
import { H as Heart } from "./heart-DfryMSKG.js";
import { S as Share2 } from "./share-2-qxB5n_rF.js";
import { M as Minus } from "./minus-Ll7LRK16.js";
import { P as Plus } from "./plus-Cmd2BdZr.js";
import { S as Star } from "./star-B5-fF_uf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
];
const GitCompare = createLucideIcon("git-compare", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function GallerySection({
  product,
  wishlisted,
  onToggleWishlist
}) {
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const images = product.images.length > 0 ? product.images : ["/assets/images/placeholder.svg"];
  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden bg-card",
        style: { aspectRatio: "4/3" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: images[activeIdx],
              alt: product.name,
              className: "w-full h-full object-cover",
              initial: { opacity: 0, scale: 1.04 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 }
            },
            activeIdx
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                "data-ocid": "product.gallery_prev",
                "aria-label": "Previous image",
                className: "absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16, className: "text-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: next,
                "data-ocid": "product.gallery_next",
                "aria-label": "Next image",
                className: "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-foreground" })
              }
            )
          ] }),
          product.discount && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "gold", size: "md", children: [
            "-",
            product.discount,
            "% OFF"
          ] }) }),
          product.isFlashDeal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 mt-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "flash", size: "sm", children: "⚡ Flash Deal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 flex items-center gap-1 glass px-2 py-1 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 10, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Pinch to zoom" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        "data-ocid": "product.wishlist_button",
        "aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
        onClick: onToggleWishlist,
        whileTap: { scale: 0.85 },
        className: "absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-smooth",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heart,
          {
            size: 16,
            fill: wishlisted ? "oklch(0.72 0.26 90)" : "none",
            style: { color: wishlisted ? "oklch(0.72 0.26 90)" : "currentColor" }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": "product.share_button",
        "aria-label": "Share product",
        className: "absolute top-14 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14, className: "text-muted-foreground" })
      }
    ),
    images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": `product.thumbnail.${i + 1}`,
        onClick: () => setActiveIdx(i),
        className: cn(
          "flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-smooth",
          i === activeIdx ? "border-primary shadow-glow-teal" : "border-border opacity-60 hover:opacity-100"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: img,
            alt: `View ${i + 1}`,
            className: "w-full h-full object-cover"
          }
        )
      },
      img
    )) })
  ] });
}
function StockIndicator({ stock }) {
  if (stock === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-500 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-red-400 font-medium", children: "Out of Stock" })
    ] });
  }
  if (stock < 5) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-green-400", children: "In Stock" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-semibold px-1.5 py-0.5 rounded-full",
          style: {
            color: "oklch(0.72 0.26 90)",
            background: "oklch(0.72 0.26 90 / 0.12)"
          },
          children: [
            "Only ",
            stock,
            " left!"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-green-400", children: "In Stock" })
  ] });
}
function SpecsTable({ specs }) {
  if (!specs.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Specifications" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: specs.map((spec, specIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "grid grid-cols-2 gap-2 px-4 py-2.5 text-xs",
          specIdx % 2 === 0 ? "bg-muted/20" : "bg-transparent"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: spec.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: spec.value })
        ]
      },
      spec.label
    )) })
  ] });
}
function QuantitySelector({
  quantity,
  stock,
  onDecrement,
  onIncrement
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": "product.qty_minus",
        onClick: onDecrement,
        disabled: quantity <= 1,
        "aria-label": "Decrease quantity",
        className: cn(
          "w-9 h-9 rounded-l-lg border border-r-0 flex items-center justify-center transition-smooth",
          quantity <= 1 ? "border-border text-muted-foreground/40 cursor-not-allowed" : "border-primary/40 text-primary hover:bg-primary/10"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-9 border border-primary/40 flex items-center justify-center text-sm font-semibold text-foreground", children: quantity }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": "product.qty_plus",
        onClick: onIncrement,
        disabled: quantity >= stock,
        "aria-label": "Increase quantity",
        className: cn(
          "w-9 h-9 rounded-r-lg border border-l-0 flex items-center justify-center transition-smooth",
          quantity >= stock ? "border-border text-muted-foreground/40 cursor-not-allowed" : "border-primary/40 text-primary hover:bg-primary/10"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
      }
    )
  ] });
}
function RatingBreakdown({ reviews }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length
  }));
  const total = reviews.length || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: counts.map(({ star, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-4 text-right", children: star }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        size: 10,
        fill: "oklch(0.72 0.26 90)",
        style: { color: "oklch(0.72 0.26 90)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full rounded-full",
        style: { background: "oklch(0.72 0.26 90)" },
        initial: { width: 0 },
        whileInView: { width: `${count / total * 100}%` },
        viewport: { once: true },
        transition: { duration: 0.6, delay: (5 - star) * 0.06 }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground w-4", children: count })
  ] }, star)) });
}
function ReviewCard({ review, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `product.review.${index + 1}`,
      className: "card-premium p-3 space-y-1.5",
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.08 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                style: {
                  background: "oklch(0.675 0.25 178 / 0.15)",
                  color: "oklch(0.675 0.25 178)"
                },
                children: review.userName.charAt(0)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: review.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: review.date })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex flex-col items-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RatingStars, { rating: review.rating, size: 11 }),
            review.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", size: "sm", children: "✓ Verified" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: review.comment })
      ]
    }
  );
}
function WriteReviewForm({
  onSubmit
}) {
  const [rating, setRating] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a rating");
      return;
    }
    if (comment.trim().length < 10) {
      ue.error("Review must be at least 10 characters");
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "card-premium p-3 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Write a Review" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your Rating" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RatingStars,
        {
          "data-ocid": "product.review_rating",
          rating,
          size: 22,
          interactive: true,
          onRate: setRating
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "review-comment",
          className: "text-xs text-muted-foreground",
          children: "Your Review"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "review-comment",
          "data-ocid": "product.review_textarea",
          value: comment,
          onChange: (e) => setComment(e.target.value),
          placeholder: "Share your experience with this product...",
          rows: 3,
          className: "w-full bg-muted/20 border border-input rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-smooth"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        "data-ocid": "product.review_submit",
        className: "w-full py-2 rounded-lg text-xs font-semibold transition-smooth",
        style: {
          background: "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
          color: "oklch(0.08 0 0)"
        },
        children: "Submit Review"
      }
    )
  ] });
}
function SimilarProducts({
  currentId,
  category
}) {
  const navigate = useNavigate();
  const products = getProductsByCategory(category).filter((p) => p.id !== currentId).slice(0, 6);
  if (!products.length) {
    const others = sampleProducts.filter((p) => p.id !== currentId).slice(0, 4);
    if (!others.length) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SimilarProductsList, { products: others, navigate });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SimilarProductsList, { products, navigate });
}
function SimilarProductsList({
  products,
  navigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground px-4", children: "Similar Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide", children: products.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        "data-ocid": `product.similar.${i + 1}`,
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.08 },
        onClick: () => navigate({ to: "/product/$id", params: { id: p.id } }),
        className: "flex-shrink-0 w-32 card-premium overflow-hidden text-left transition-smooth hover:scale-[1.02]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "led-strip rounded-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: p.images[0],
              alt: p.name,
              className: "w-full h-24 object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-foreground line-clamp-2 leading-tight", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-[11px] font-bold mt-1",
                style: { color: "oklch(0.675 0.25 178)" },
                children: formatINR(p.priceInPaise)
              }
            )
          ] })
        ] })
      },
      p.id
    )) })
  ] });
}
function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addItem, isInCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [localReviews, setLocalReviews] = reactExports.useState(
    (product == null ? void 0 : product.reviews) ?? []
  );
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl", children: "🔍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This product doesn't exist or has been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "product.back_button",
          onClick: () => navigate({ to: "/" }),
          className: "btn-premium text-sm",
          children: "Go Back Home"
        }
      )
    ] });
  }
  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const outOfStock = product.stock === 0;
  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, quantity);
    ue.success(`${product.name} added to cart`, {
      description: `Qty: ${quantity} · ${formatINR(product.priceInPaise * quantity)}`
    });
  };
  const handleToggleWishlist = () => {
    toggle(product);
    ue(wishlisted ? "Removed from wishlist" : "Added to wishlist ♥", {
      style: {
        background: "oklch(0.12 0 0)",
        color: "oklch(0.95 0 0)",
        border: "1px solid oklch(0.25 0 0)"
      }
    });
  };
  const handleNotifyMe = () => {
    ue.success("You'll be notified when back in stock!", {
      icon: "🔔"
    });
  };
  const handleAddToCompare = () => {
    if (product) {
      addToCompare(product.id);
    }
    ue.info("Added to comparison list", { icon: "⚖️" });
  };
  const handleReviewSubmit = (rating, comment) => {
    const newReview = {
      id: `r-${Date.now()}`,
      userId: "guest",
      userName: "You",
      rating,
      comment,
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      verified: false
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    ue.success("Review submitted!");
  };
  const avgRating = localReviews.length > 0 ? localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length : product.rating;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col pb-28",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 glass px-3 py-2 flex items-center gap-2 border-b border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "product.back_button",
              onClick: () => navigate({ to: "/" }),
              "aria-label": "Go back",
              className: "w-8 h-8 rounded-full hover:bg-muted/40 flex items-center justify-center transition-smooth",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18, className: "text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "flex-1 text-sm font-semibold text-foreground truncate min-w-0", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "product.cart_nav_button",
              onClick: () => navigate({ to: "/cart" }),
              "aria-label": "Go to cart",
              className: "w-8 h-8 rounded-full hover:bg-muted/40 flex items-center justify-center transition-smooth",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 16, className: "text-primary" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GallerySection,
          {
            product,
            wishlisted,
            onToggleWishlist: handleToggleWishlist
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "teal", size: "sm", children: product.category }),
            product.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", size: "sm", children: [
              "#",
              tag
            ] }, tag))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground leading-snug", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            RatingStars,
            {
              rating: avgRating,
              size: 14,
              showValue: true,
              showCount: product.reviewCount + localReviews.length
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PriceTag,
            {
              priceInPaise: product.priceInPaise,
              originalPriceInPaise: product.originalPriceInPaise,
              size: "xl",
              showDiscount: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StockIndicator, { stock: product.stock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
          !outOfStock && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Qty:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QuantitySelector,
              {
                quantity,
                stock: product.stock,
                onDecrement: () => setQuantity((q) => Math.max(1, q - 1)),
                onIncrement: () => setQuantity((q) => Math.min(product.stock, q + 1))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SpecsTable, { specs: product.specifications }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
            "Reviews (",
            localReviews.length,
            ")"
          ] }),
          localReviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-3 flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-3xl font-black",
                  style: { color: "oklch(0.72 0.26 90)" },
                  children: avgRating.toFixed(1)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RatingStars, { rating: avgRating, size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
                localReviews.length,
                " reviews"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingBreakdown, { reviews: localReviews }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            localReviews.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review, index: i }, review.id)),
            localReviews.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "product.reviews_empty_state",
                className: "text-center py-6 text-muted-foreground text-sm",
                children: "No reviews yet. Be the first to review!"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WriteReviewForm, { onSubmit: handleReviewSubmit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider mx-4 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SimilarProducts, { currentId: product.id, category: product.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed bottom-[64px] left-0 right-0 z-30 px-4 pb-3 pt-2 glass border-t border-border/30 space-y-2",
            style: { maxWidth: "430px", margin: "0 auto" },
            children: [
              outOfStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "product.out_of_stock_button",
                    disabled: true,
                    className: "w-full py-3.5 rounded-xl text-sm font-bold opacity-40 cursor-not-allowed",
                    style: {
                      background: "oklch(0.22 0 0)",
                      color: "oklch(0.55 0 0)",
                      border: "1px solid oklch(0.3 0 0)"
                    },
                    children: "OUT OF STOCK"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "product.notify_me_button",
                    onClick: handleNotifyMe,
                    className: "w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth hover:scale-[1.02]",
                    style: {
                      background: "oklch(0.72 0.26 90 / 0.12)",
                      color: "oklch(0.72 0.26 90)",
                      border: "1px solid oklch(0.72 0.26 90 / 0.35)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 15 }),
                      "Notify Me When Back in Stock"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  "data-ocid": "product.add_to_cart_button",
                  onClick: handleAddToCart,
                  whileTap: { scale: 0.97 },
                  className: "w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-smooth shadow-glow-teal",
                  style: {
                    background: inCart ? "linear-gradient(135deg, oklch(0.6 0.25 200), oklch(0.55 0.2 220))" : "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
                    color: "oklch(0.08 0 0)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 16 }),
                    inCart ? "UPDATE CART" : "ADD TO CART"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "product.compare_button",
                  onClick: handleAddToCompare,
                  className: "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-smooth hover:bg-muted/30",
                  style: {
                    color: "oklch(0.55 0 0)",
                    border: "1px solid oklch(0.3 0 0)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { size: 12 }),
                    "Add to Compare"
                  ]
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
export {
  ProductPage as default
};
