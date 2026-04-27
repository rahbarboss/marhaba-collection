import { c as createLucideIcon, k as useBackendActor, r as reactExports, j as jsxRuntimeExports, a as useNavigate, g as ShoppingBag } from "./index-dBmmwt_c.js";
import { S as StatusBadge } from "./BadgeCustom-D3qHeYlv.js";
import { f as formatINR } from "./PriceTag-Bv1TpP2i.js";
import { L as LoaderCircle } from "./loader-circle-DnkUIfr7.js";
import { A as AnimatePresence } from "./index-Dz8DKVGH.js";
import { m as motion } from "./proxy-BdCiAwbM.js";
import { C as ChevronRight } from "./chevron-right-Bgh55iko.js";
import { M as MapPin } from "./map-pin-CMby8k8L.js";
import { P as Package } from "./package-urpyzQRm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const ACTIVE_STATUSES = [
  "ordered",
  "packed",
  "shipped",
  "out_for_delivery"
];
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 36e5);
  const d = Math.floor(diff / 864e5);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return "Just now";
}
function toFrontendOrder(o) {
  const statusMap = {
    ordered: "ordered",
    packed: "packed",
    shipped: "shipped",
    out_for_delivery: "out_for_delivery",
    delivered: "delivered",
    cancelled: "cancelled"
  };
  const paymentMap = {
    upi: "UPI",
    card: "Card",
    cod: "COD",
    wallet: "Wallet",
    split: "Split"
  };
  const status = statusMap[o.status] ?? "ordered";
  const paymentMethod = paymentMap[o.paymentMethod.__kind__] ?? "UPI";
  const statusOrder = [
    "ordered",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered"
  ];
  const currentIndex = statusOrder.indexOf(status);
  return {
    id: o.id.toString(),
    items: o.items.map((item) => ({
      product: {
        id: item.productId.toString(),
        name: item.name,
        description: "",
        category: "Electronics",
        priceInPaise: Number(item.price),
        images: [item.image.getDirectURL()],
        rating: 4.5,
        reviewCount: 0,
        stock: 10,
        specifications: [],
        reviews: [],
        tags: []
      },
      quantity: Number(item.quantity),
      priceInPaise: Number(item.price)
    })),
    totalInPaise: Number(o.totalAmount),
    discountInPaise: Number(o.discountAmount),
    couponCode: o.couponApplied ?? void 0,
    status,
    address: {
      name: o.address.name,
      phone: o.address.phone,
      line1: o.address.line1,
      line2: o.address.line2 || void 0,
      city: o.address.city,
      state: o.address.state,
      pincode: o.address.pincode
    },
    paymentMethod,
    createdAt: Number(o.createdAt / BigInt(1e6)),
    updatedAt: Number(o.updatedAt / BigInt(1e6)),
    trackingSteps: statusOrder.map((s, idx) => {
      var _a;
      return {
        status: s,
        label: s === "ordered" ? "Order Placed" : s === "packed" ? "Packed" : s === "shipped" ? "Shipped" : s === "out_for_delivery" ? "Out for Delivery" : "Delivered",
        completed: idx < currentIndex || s === status && status === "delivered",
        current: s === status && status !== "delivered",
        timestamp: ((_a = o.trackingSteps.find((t) => t.status === s)) == null ? void 0 : _a.timestamp) !== void 0 ? Number(
          o.trackingSteps.find((t) => t.status === s).timestamp / BigInt(1e6)
        ) : void 0
      };
    })
  };
}
function OrdersLoading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 px-4 pt-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-2xl overflow-hidden animate-pulse",
      style: {
        background: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.22 0 0)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 w-28 rounded",
              style: { background: "oklch(0.2 0 0)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-5 w-16 rounded-full",
              style: { background: "oklch(0.2 0 0)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          [1, 2].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-12 w-12 rounded-xl",
              style: { background: "oklch(0.2 0 0)" }
            },
            j
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-3 w-3/4 rounded",
                style: { background: "oklch(0.2 0 0)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-3 w-1/2 rounded",
                style: { background: "oklch(0.2 0 0)" }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 w-20 rounded",
              style: { background: "oklch(0.2 0 0)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-7 w-24 rounded-full",
              style: { background: "oklch(0.2 0 0)" }
            }
          )
        ] })
      ] })
    },
    i
  )) });
}
function OrderCard({ order, index }) {
  const navigate = useNavigate();
  const isActive = ACTIVE_STATUSES.includes(order.status);
  const thumbItems = order.items.slice(0, 3);
  const extraCount = order.items.length - 3;
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.35 },
      "data-ocid": `orders.item.${index + 1}`,
      className: "led-strip rounded-2xl cursor-pointer",
      onClick: () => navigate({ to: "/orders/$id", params: { id: order.id } }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.22 0 0)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: order.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: formatDate(order.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: timeAgo(order.createdAt) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2", children: [
                thumbItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-12 h-12 rounded-xl overflow-hidden border-2 border-card flex-shrink-0",
                    style: { zIndex: thumbItems.length },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.images[0],
                        alt: "",
                        className: "w-full h-full object-cover"
                      }
                    )
                  },
                  item.product.id
                )),
                extraCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 border-card",
                    style: {
                      background: "oklch(0.18 0 0)",
                      color: "oklch(0.72 0.26 90)",
                      zIndex: 0
                    },
                    children: [
                      "+",
                      extraCount
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-3 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                  order.items[0].product.name,
                  order.items.length > 1 && ` +${order.items.length - 1} more`
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  itemCount,
                  " item",
                  itemCount !== 1 ? "s" : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-4 py-3",
                style: { borderTop: "1px solid oklch(0.2 0 0)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Paid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-base font-bold",
                        style: { color: "oklch(0.675 0.25 178)" },
                        children: formatINR(order.totalInPaise - order.discountInPaise)
                      }
                    )
                  ] }),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      "data-ocid": `orders.track_button.${index + 1}`,
                      type: "button",
                      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth",
                      style: {
                        background: "oklch(0.675 0.25 178 / 0.15)",
                        color: "oklch(0.675 0.25 178)",
                        border: "1px solid oklch(0.675 0.25 178 / 0.3)"
                      },
                      onClick: (e) => {
                        e.stopPropagation();
                        navigate({ to: "/orders/$id", params: { id: order.id } });
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                        "Track Order"
                      ]
                    }
                  ),
                  order.status === "delivered" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3 text-green-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "Delivered" })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function EmptyOrders({ tab }) {
  const navigate = useNavigate();
  const msgs = {
    all: {
      title: "No orders yet",
      subtitle: "Your premium shopping journey starts here"
    },
    active: {
      title: "No active orders",
      subtitle: "All your orders are settled"
    },
    delivered: {
      title: "No delivered orders",
      subtitle: "Completed orders will appear here"
    },
    cancelled: {
      title: "No cancelled orders",
      subtitle: "Great! Nothing was cancelled"
    }
  };
  const { title, subtitle } = msgs[tab];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      className: "flex flex-col items-center justify-center py-16 px-6 text-center",
      "data-ocid": "orders.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-24 h-24 rounded-3xl flex items-center justify-center mb-5",
            style: {
              background: "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.12), oklch(0.72 0.26 90 / 0.12))",
              boxShadow: "0 0 40px rgba(0,212,200,0.1)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShoppingBag,
              {
                className: "w-10 h-10",
                style: { color: "oklch(0.675 0.25 178)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-bold text-foreground mb-1", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: subtitle }),
        tab === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "orders.shop_now_button",
            className: "btn-premium px-6 py-2.5 text-sm",
            onClick: () => navigate({ to: "/" }),
            children: "Start Shopping"
          }
        )
      ]
    }
  );
}
function OrdersPage() {
  const { actor, isFetching } = useBackendActor();
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("all");
  reactExports.useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!actor || isFetching) return;
      setLoading(true);
      try {
        const backendOrders = await actor.getMyOrders();
        if (!cancelled) {
          setOrders(backendOrders.map(toFrontendOrder));
        }
      } catch (err) {
        console.warn("[Orders] getMyOrders failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);
  const tabs = [
    { id: "all", label: "All", count: orders.length },
    {
      id: "active",
      label: "Active",
      count: orders.filter((o) => ACTIVE_STATUSES.includes(o.status)).length
    },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length
    }
  ];
  const filtered = reactExports.useMemo(() => {
    switch (activeTab) {
      case "active":
        return orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
      case "delivered":
        return orders.filter((o) => o.status === "delivered");
      case "cancelled":
        return orders.filter((o) => o.status === "cancelled");
      default:
        return orders;
    }
  }, [activeTab, orders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full pb-6", "data-ocid": "orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 pt-4 pb-3 sticky top-0 z-10",
        style: {
          background: "oklch(0.08 0 0)",
          borderBottom: "1px solid oklch(0.2 0 0)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "My Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
            "Loading your orders..."
          ] }) : `${orders.length} total order${orders.length !== 1 ? "s" : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar",
              "data-ocid": "orders.filter.tab",
              children: tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `orders.tab.${tab.id}`,
                    onClick: () => setActiveTab(tab.id),
                    className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth flex-shrink-0",
                    style: isActive ? {
                      background: "oklch(0.675 0.25 178)",
                      color: "oklch(0.08 0 0)"
                    } : {
                      background: "oklch(0.15 0 0)",
                      color: "oklch(0.55 0 0)",
                      border: "1px solid oklch(0.22 0 0)"
                    },
                    children: [
                      tab.label,
                      tab.count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                          style: isActive ? { background: "oklch(0.08 0 0 / 0.3)" } : {
                            background: "oklch(0.2 0 0)",
                            color: "oklch(0.5 0 0)"
                          },
                          children: tab.count
                        }
                      )
                    ]
                  },
                  tab.id
                );
              })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-4 pt-4 space-y-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersLoading, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyOrders, { tab: activeTab }, "empty") : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "space-y-3",
        children: filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i }, order.id))
      },
      activeTab
    ) }) })
  ] });
}
export {
  OrdersPage as default
};
