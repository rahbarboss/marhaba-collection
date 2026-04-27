import { c as createLucideIcon, h as useParams, a as useNavigate, d as useCart, f as useNotifications, r as reactExports, j as jsxRuntimeExports, H as House, M as MessageCircle } from "./index-dBmmwt_c.js";
import { S as StatusBadge } from "./BadgeCustom-D3qHeYlv.js";
import { f as formatINR } from "./PriceTag-Bv1TpP2i.js";
import { P as Package } from "./package-urpyzQRm.js";
import { A as ArrowLeft } from "./arrow-left-BXebIsuP.js";
import { m as motion } from "./proxy-BdCiAwbM.js";
import { S as Star } from "./star-B5-fF_uf.js";
import { F as FileText } from "./file-text-CmLst6M7.js";
import { S as ShoppingCart } from "./shopping-cart-NAW4_HFu.js";
import { M as MapPin } from "./map-pin-CMby8k8L.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
];
const Loader = createLucideIcon("loader", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const SEED_ORDERS = [
  {
    id: "ORD-7F3A2B",
    items: [
      {
        product: {
          id: "p1",
          name: "Wireless Noise-Cancelling Headphones",
          description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality.",
          category: "Electronics",
          priceInPaise: 899900,
          originalPriceInPaise: 1299900,
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
          ],
          rating: 4.7,
          reviewCount: 312,
          stock: 10,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 1,
        priceInPaise: 899900
      },
      {
        product: {
          id: "p2",
          name: "Premium Leather Wallet",
          description: "Hand-crafted genuine leather wallet with RFID protection and multiple card slots.",
          category: "Fashion",
          priceInPaise: 249900,
          originalPriceInPaise: 399900,
          images: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400"
          ],
          rating: 4.5,
          reviewCount: 98,
          stock: 5,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 2,
        priceInPaise: 249900
      }
    ],
    totalInPaise: 1399700,
    discountInPaise: 15e4,
    couponCode: "SAVE15",
    status: "shipped",
    address: {
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      line1: "12, Boring Road",
      line2: "Near Gandhi Maidan",
      city: "Patna",
      state: "Bihar",
      pincode: "800001"
    },
    paymentMethod: "UPI",
    createdAt: Date.now() - 3 * 24 * 36e5,
    updatedAt: Date.now() - 1 * 24 * 36e5,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 3 * 24 * 36e5
      },
      {
        status: "packed",
        label: "Packed",
        completed: true,
        current: false,
        timestamp: Date.now() - 2 * 24 * 36e5
      },
      {
        status: "shipped",
        label: "Shipped",
        completed: false,
        current: true,
        timestamp: Date.now() - 1 * 24 * 36e5
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
  },
  {
    id: "ORD-2C8D1E",
    items: [
      {
        product: {
          id: "p3",
          name: "Gold-Plated Diamond Necklace",
          description: "Exquisite 22K gold-plated necklace with authentic diamond accents.",
          category: "Jewelry",
          priceInPaise: 4599900,
          images: [
            "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400"
          ],
          rating: 4.9,
          reviewCount: 45,
          stock: 3,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 1,
        priceInPaise: 4599900
      }
    ],
    totalInPaise: 4599900,
    discountInPaise: 0,
    status: "delivered",
    address: {
      name: "Priya Singh",
      phone: "+91 9334808340",
      line1: "45, Ashok Rajpath",
      city: "Patna",
      state: "Bihar",
      pincode: "800004"
    },
    paymentMethod: "Card",
    createdAt: Date.now() - 12 * 24 * 36e5,
    updatedAt: Date.now() - 5 * 24 * 36e5,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 12 * 24 * 36e5
      },
      {
        status: "packed",
        label: "Packed",
        completed: true,
        current: false,
        timestamp: Date.now() - 11 * 24 * 36e5
      },
      {
        status: "shipped",
        label: "Shipped",
        completed: true,
        current: false,
        timestamp: Date.now() - 9 * 24 * 36e5
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: true,
        current: false,
        timestamp: Date.now() - 6 * 24 * 36e5
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: true,
        current: false,
        timestamp: Date.now() - 5 * 24 * 36e5
      }
    ]
  },
  {
    id: "ORD-9E5F4C",
    items: [
      {
        product: {
          id: "p4",
          name: "Smart Fitness Watch Ultra",
          description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
          category: "Electronics",
          priceInPaise: 1299900,
          images: [
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
          ],
          rating: 4.6,
          reviewCount: 207,
          stock: 8,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 1,
        priceInPaise: 1299900
      },
      {
        product: {
          id: "p5",
          name: "Luxury Silk Saree",
          description: "Pure Banarasi silk saree with intricate zari work.",
          category: "Fashion",
          priceInPaise: 759900,
          images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"
          ],
          rating: 4.8,
          reviewCount: 134,
          stock: 4,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 1,
        priceInPaise: 759900
      },
      {
        product: {
          id: "p6",
          name: "Artisan Perfume Collection",
          description: "Set of 3 luxury fragrances inspired by Indian flora.",
          category: "Beauty",
          priceInPaise: 349900,
          images: [
            "https://images.unsplash.com/photo-1588776814546-1ffbb3e851a2?w=400"
          ],
          rating: 4.4,
          reviewCount: 89,
          stock: 12,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 2,
        priceInPaise: 349900
      }
    ],
    totalInPaise: 2759600,
    discountInPaise: 2e5,
    status: "out_for_delivery",
    address: {
      name: "Amit Sharma",
      phone: "+91 9876543211",
      line1: "67, Fraser Road",
      city: "Patna",
      state: "Bihar",
      pincode: "800001"
    },
    paymentMethod: "Wallet",
    createdAt: Date.now() - 2 * 24 * 36e5,
    updatedAt: Date.now() - 4 * 36e5,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 2 * 24 * 36e5
      },
      {
        status: "packed",
        label: "Packed",
        completed: true,
        current: false,
        timestamp: Date.now() - 30 * 36e5
      },
      {
        status: "shipped",
        label: "Shipped",
        completed: true,
        current: false,
        timestamp: Date.now() - 10 * 36e5
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: false,
        current: true,
        timestamp: Date.now() - 4 * 36e5
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: false,
        current: false
      }
    ]
  },
  {
    id: "ORD-4A6B8D",
    items: [
      {
        product: {
          id: "p7",
          name: "Ceramic Dinner Set (12 pieces)",
          description: "Premium hand-painted ceramic dinner set with 12 pieces.",
          category: "Home",
          priceInPaise: 549900,
          images: [
            "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400"
          ],
          rating: 4.3,
          reviewCount: 56,
          stock: 0,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 1,
        priceInPaise: 549900
      }
    ],
    totalInPaise: 549900,
    discountInPaise: 5e4,
    status: "cancelled",
    address: {
      name: "Sunita Devi",
      phone: "+91 9334808341",
      line1: "23, Kankarbagh Colony",
      city: "Patna",
      state: "Bihar",
      pincode: "800020"
    },
    paymentMethod: "COD",
    createdAt: Date.now() - 7 * 24 * 36e5,
    updatedAt: Date.now() - 6 * 24 * 36e5,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 7 * 24 * 36e5
      },
      { status: "packed", label: "Packed", completed: false, current: false },
      { status: "shipped", label: "Shipped", completed: false, current: false },
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
  },
  {
    id: "ORD-3B1F7E",
    items: [
      {
        product: {
          id: "p8",
          name: "Royal Blue Kurta Set",
          description: "Elegant cotton kurta set with intricate embroidery.",
          category: "Fashion",
          priceInPaise: 399900,
          images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
          ],
          rating: 4.6,
          reviewCount: 178,
          stock: 7,
          specifications: [],
          reviews: [],
          tags: []
        },
        quantity: 3,
        priceInPaise: 399900
      }
    ],
    totalInPaise: 1199700,
    discountInPaise: 1e5,
    status: "ordered",
    address: {
      name: "Vivek Mishra",
      phone: "+91 9876543212",
      line1: "8, Rajendra Nagar",
      city: "Patna",
      state: "Bihar",
      pincode: "800016"
    },
    paymentMethod: "UPI",
    createdAt: Date.now() - 6 * 36e5,
    updatedAt: Date.now() - 6 * 36e5,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: false,
        current: true,
        timestamp: Date.now() - 6 * 36e5
      },
      { status: "packed", label: "Packed", completed: false, current: false },
      { status: "shipped", label: "Shipped", completed: false, current: false },
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
  }
];
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function formatDateTime(ts) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function getEstimatedDelivery(createdAt, status) {
  const base = new Date(createdAt);
  let days = 5;
  if (status === "shipped") days = 2;
  if (status === "out_for_delivery") days = 0;
  if (status === "delivered") return "Delivered";
  base.setDate(base.getDate() + days);
  return base.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
const STEP_ICONS = {
  ordered: Package,
  packed: Package,
  shipped: Truck,
  out_for_delivery: MapPin,
  delivered: CircleCheckBig,
  cancelled: RotateCcw
};
function TrackingTimeline({ order }) {
  const steps = order.trackingSteps.filter((s) => s.status !== "cancelled");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "order_detail.tracking_timeline", className: "space-y-0", children: steps.map((step, idx) => {
    const Icon = STEP_ICONS[step.status] ?? Circle;
    const isLast = idx === steps.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0.6, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { delay: idx * 0.1, duration: 0.3 },
            className: "relative flex-shrink-0",
            children: step.current ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { scale: [1, 1.2, 1] },
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.8
                },
                className: "w-8 h-8 rounded-full flex items-center justify-center",
                style: {
                  background: "oklch(0.72 0.26 90 / 0.2)",
                  border: "2px solid oklch(0.72 0.26 90)",
                  boxShadow: "0 0 12px oklch(0.72 0.26 90 / 0.5)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Loader,
                  {
                    className: "w-3.5 h-3.5 animate-spin",
                    style: { color: "oklch(0.72 0.26 90)" }
                  }
                )
              }
            ) : step.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full flex items-center justify-center",
                style: {
                  background: "oklch(0.675 0.25 178 / 0.2)",
                  border: "2px solid oklch(0.675 0.25 178)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: "oklch(0.675 0.25 178)" }
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full flex items-center justify-center",
                style: {
                  background: "oklch(0.15 0 0)",
                  border: "2px solid oklch(0.25 0 0)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3 h-3 text-muted-foreground" })
              }
            )
          }
        ),
        !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-0.5 my-1 flex-1 min-h-[24px]",
            style: {
              background: step.completed ? "linear-gradient(180deg, oklch(0.675 0.25 178), oklch(0.675 0.25 178 / 0.3))" : "oklch(0.22 0 0)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 pb-4 ${isLast ? "" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: idx * 0.1 + 0.05, duration: 0.3 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-semibold",
                style: {
                  color: step.current ? "oklch(0.72 0.26 90)" : step.completed ? "oklch(0.675 0.25 178)" : "oklch(0.4 0 0)"
                },
                children: step.label
              }
            ),
            step.timestamp ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: formatDateTime(step.timestamp) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Pending" })
          ]
        }
      ) })
    ] }, step.status);
  }) });
}
function SectionCard({
  title,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.2 0 0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-4 py-3",
            style: { borderBottom: "1px solid oklch(0.18 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded-lg flex items-center justify-center",
                  style: { background: "oklch(0.675 0.25 178 / 0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: "w-3.5 h-3.5",
                      style: { color: "oklch(0.675 0.25 178)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: title })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4", children })
      ]
    }
  );
}
function MapSection({ order }) {
  const isActive = ["shipped", "out_for_delivery"].includes(order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.2 0 0)"
      },
      "data-ocid": "order_detail.map_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3",
            style: { borderBottom: "1px solid oklch(0.18 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 rounded-lg flex items-center justify-center",
                    style: { background: "oklch(0.675 0.25 178 / 0.15)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MapPin,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: "oklch(0.675 0.25 178)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Live Tracking" })
              ] }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-semibold px-2 py-0.5 rounded-full animate-pulse",
                  style: {
                    background: "oklch(0.72 0.26 90 / 0.15)",
                    color: "oklch(0.72 0.26 90)",
                    border: "1px solid oklch(0.72 0.26 90 / 0.3)"
                  },
                  children: "LIVE"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              title: "Delivery location map",
              src: "https://www.openstreetmap.org/export/embed.html?bbox=84.9376%2C25.4941%2C85.3376%2C25.6941&layer=mapnik&marker=25.5941%2C85.1376",
              className: "w-full",
              style: {
                height: 180,
                border: "none",
                filter: "saturate(0.7) brightness(0.85)"
              },
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              animate: { y: [0, -6, 0] },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut"
              },
              className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                    style: {
                      background: "oklch(0.72 0.26 90)",
                      boxShadow: "0 4px 16px oklch(0.72 0.26 90 / 0.6)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4", style: { color: "oklch(0.08 0 0)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full mx-auto -mt-1",
                    style: { background: "oklch(0.72 0.26 90 / 0.4)" }
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-3",
            style: { borderTop: "1px solid oklch(0.18 0 0)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "📍",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                order.address.city,
                ", ",
                order.address.state
              ] }),
              " · ",
              "Estimated delivery:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: { color: "oklch(0.675 0.25 178)" },
                  className: "font-semibold",
                  children: getEstimatedDelivery(order.createdAt, order.status)
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function generateInvoice(order) {
  const GST_RATE = 0.18;
  const net = order.totalInPaise - order.discountInPaise;
  const gst = Math.round(net * GST_RATE);
  const grandTotal = net + gst;
  const rows = order.items.map(
    (item, idx) => `<tr style="border-bottom:1px solid #1e293b">
          <td style="padding:8px 4px;color:#94a3b8">${idx + 1}</td>
          <td style="padding:8px 4px;color:#e2e8f0">${item.product.name}</td>
          <td style="padding:8px 4px;text-align:center;color:#94a3b8">${item.quantity}</td>
          <td style="padding:8px 4px;text-align:right;color:#00d4c8">${formatINR(item.priceInPaise)}</td>
          <td style="padding:8px 4px;text-align:right;color:#f5c242;font-weight:bold">${formatINR(item.priceInPaise * item.quantity)}</td>
        </tr>`
  ).join("");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Invoice ${order.id} – Rahbar</title>
<style>
  body{margin:0;padding:32px;background:#0f172a;color:#e2e8f0;font-family:system-ui,sans-serif}
  .brand{font-size:28px;font-weight:900;letter-spacing:-1px}
  .teal{color:#00d4c8} .gold{color:#f5c242}
  table{width:100%;border-collapse:collapse;margin-top:16px}
  th{background:#1e293b;color:#94a3b8;font-size:11px;text-transform:uppercase;padding:8px 4px;text-align:left}
  .summary-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1e293b}
  .total-box{background:#1e293b;border-radius:8px;padding:16px;margin-top:16px}
  .signature{font-style:italic;color:#94a3b8;font-size:12px;margin-top:4px}
</style>
</head>
<body>
<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px">
  <div>
    <div class="brand"><span class="teal">Rahbar</span></div>
    <p style="color:#94a3b8;margin:4px 0 0;font-size:13px">Premium Shopping Experience</p>
    <p class="signature">Rahbar Signature ✦</p>
  </div>
  <div style="text-align:right">
    <p style="color:#94a3b8;font-size:12px;margin:0">TAX INVOICE</p>
    <p style="font-size:18px;font-weight:700;color:#f5c242;margin:4px 0 0">${order.id}</p>
    <p style="color:#94a3b8;font-size:12px;margin:4px 0 0">${formatDate(order.createdAt)}</p>
  </div>
</div>
<hr style="border:none;border-top:1px solid #1e293b;margin-bottom:20px"/>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
  <div style="background:#1e293b;border-radius:8px;padding:12px">
    <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;margin:0 0 6px">Billing To</p>
    <p style="margin:0;font-weight:600">${order.address.name}</p>
    <p style="margin:4px 0 0;font-size:13px;color:#94a3b8">${`${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ""}`}</p>
    <p style="margin:2px 0 0;font-size:13px;color:#94a3b8">${order.address.city}, ${order.address.state} – ${order.address.pincode}</p>
    <p style="margin:4px 0 0;font-size:13px;color:#94a3b8">${order.address.phone}</p>
  </div>
  <div style="background:#1e293b;border-radius:8px;padding:12px">
    <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;margin:0 0 6px">Payment</p>
    <p style="margin:0;font-weight:600">${order.paymentMethod}</p>
    ${order.couponCode ? `<p style="margin:6px 0 0;font-size:12px;color:#f5c242">Coupon: ${order.couponCode}</p>` : ""}
    <p style="margin:6px 0 0;font-size:13px;color:#94a3b8">Status: <span style="color:#4ade80">Confirmed</span></p>
  </div>
</div>
<table>
  <thead><tr><th>#</th><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Rate</th><th style="text-align:right">Amount</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="total-box">
  <div class="summary-row"><span style="color:#94a3b8">Subtotal</span><span>${formatINR(order.totalInPaise)}</span></div>
  <div class="summary-row"><span style="color:#4ade80">Discount${order.couponCode ? ` (${order.couponCode})` : ""}</span><span style="color:#4ade80">-${formatINR(order.discountInPaise)}</span></div>
  <div class="summary-row"><span style="color:#94a3b8">GST (18%)</span><span>${formatINR(gst)}</span></div>
  <div style="display:flex;justify-content:space-between;padding:10px 0 0;font-size:18px;font-weight:800">
    <span>Grand Total</span><span class="gold">${formatINR(grandTotal)}</span>
  </div>
</div>
<p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:24px">Thank you for shopping with <span class="teal">Rahbar</span> · Built with ♥ in India</p>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Rahbar-Invoice-${order.id}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
function OrderDetailPage() {
  const { id } = useParams({ from: "/orders/$id" });
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useNotifications();
  const [reordered, setReordered] = reactExports.useState(false);
  const foundOrder = SEED_ORDERS.find((o) => o.id === id);
  if (!foundOrder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] px-6 text-center",
        "data-ocid": "order_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold text-foreground mb-2", children: "Order not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
            "We couldn't find order #",
            id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn-premium text-sm px-5 py-2",
              onClick: () => navigate({ to: "/orders" }),
              children: "Back to Orders"
            }
          )
        ]
      }
    );
  }
  const order = foundOrder;
  const net = order.totalInPaise - order.discountInPaise;
  const gst = Math.round(net * 0.18);
  const grandTotal = net + gst;
  const WHATSAPP_NUMBER = "919334808340";
  const whatsappMsg = encodeURIComponent(
    `Hi Rahbar Support 👋

I need help with my order:
*Order ID:* ${order.id}
*Status:* ${order.status}
*Total:* ${formatINR(grandTotal)}

Please assist me. Thank you!`
  );
  function handleReorder() {
    for (const item of order.items) {
      addItem(item.product, item.quantity);
    }
    setReordered(true);
    showToast("success", `${order.items.length} item(s) added to cart!`);
    setTimeout(() => navigate({ to: "/cart" }), 1200);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-full pb-24",
      "data-ocid": "order_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-0 z-10 flex items-center gap-3 px-4 py-3",
            style: {
              background: "oklch(0.08 0 0)",
              borderBottom: "1px solid oklch(0.2 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "order_detail.back_button",
                  className: "w-8 h-8 rounded-full flex items-center justify-center transition-smooth hover:bg-muted",
                  onClick: () => navigate({ to: "/orders" }),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate", children: order.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: "Order Details" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 pt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              className: "rounded-2xl px-4 py-4",
              style: {
                background: "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.08), oklch(0.72 0.26 90 / 0.06))",
                border: "1px solid oklch(0.675 0.25 178 / 0.2)"
              },
              "data-ocid": "order_detail.order_header",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Placed on" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-0.5", children: formatDate(order.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Est. Delivery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm font-bold mt-0.5",
                        style: {
                          color: order.status === "delivered" ? "#4ade80" : "oklch(0.72 0.26 90)"
                        },
                        children: getEstimatedDelivery(order.createdAt, order.status)
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider my-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 text-xs",
                      style: { color: "oklch(0.675 0.25 178)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          order.items.reduce((s, i) => s + i.quantity, 0),
                          " items"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Star,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: "oklch(0.72 0.26 90)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: { color: "oklch(0.72 0.26 90)" },
                        className: "font-semibold",
                        children: formatINR(grandTotal)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: order.paymentMethod })
                ] })
              ]
            }
          ),
          order.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05 },
              className: "rounded-2xl overflow-hidden",
              style: {
                background: "oklch(0.12 0 0)",
                border: "1px solid oklch(0.2 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 px-4 py-3",
                    style: { borderBottom: "1px solid oklch(0.18 0 0)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-6 h-6 rounded-lg flex items-center justify-center",
                          style: { background: "oklch(0.675 0.25 178 / 0.15)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Truck,
                            {
                              className: "w-3.5 h-3.5",
                              style: { color: "oklch(0.675 0.25 178)" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Tracking" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrackingTimeline, { order }) })
              ]
            }
          ),
          (order.status === "shipped" || order.status === "out_for_delivery") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapSection, { order })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Items Ordered", icon: Package, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "order_detail.items_list", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  "data-ocid": `order_detail.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.images[0],
                        alt: item.product.name,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-bold",
                          style: { color: "oklch(0.675 0.25 178)" },
                          children: formatINR(item.priceInPaise * item.quantity)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                        formatINR(item.priceInPaise),
                        " each"
                      ] })
                    ] })
                  ]
                },
                item.product.id
              )) }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.14 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Delivery Address", icon: House, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "order_detail.address_card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: order.address.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: [
                  order.address.line1,
                  order.address.line2 && `, ${order.address.line2}`,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  order.address.city,
                  ", ",
                  order.address.state,
                  " –",
                  " ",
                  order.address.pincode
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs mt-2",
                    style: { color: "oklch(0.675 0.25 178)" },
                    children: order.address.phone
                  }
                )
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.16 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Payment Summary", icon: FileText, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "space-y-2.5",
                  "data-ocid": "order_detail.payment_summary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(order.totalInPaise) })
                    ] }),
                    order.discountInPaise > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400", children: [
                        "Discount",
                        order.couponCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-xs font-mono", children: [
                          "(",
                          order.couponCode,
                          ")"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-semibold", children: [
                        "-",
                        formatINR(order.discountInPaise)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatINR(gst) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment Method" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-semibold",
                          style: { color: "oklch(0.675 0.25 178)" },
                          children: order.paymentMethod
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between pt-2.5",
                        style: { borderTop: "1px solid oklch(0.2 0 0)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground", children: "Grand Total" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-base font-bold",
                              style: { color: "oklch(0.72 0.26 90)" },
                              children: formatINR(grandTotal)
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 py-3 z-20 space-y-2",
            style: {
              background: "linear-gradient(to top, oklch(0.08 0 0) 60%, transparent)"
            },
            children: [
              order.status === "delivered" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  "data-ocid": "order_detail.reorder_button",
                  whileTap: { scale: 0.97 },
                  onClick: handleReorder,
                  disabled: reordered,
                  className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-smooth",
                  style: {
                    background: reordered ? "oklch(0.4 0 0)" : "linear-gradient(135deg, oklch(0.72 0.26 90), oklch(0.65 0.24 70))",
                    color: "oklch(0.08 0 0)",
                    boxShadow: reordered ? "none" : "0 4px 20px oklch(0.72 0.26 90 / 0.4)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                    reordered ? "Added to Cart!" : "Reorder All Items"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    "data-ocid": "order_detail.invoice_button",
                    whileTap: { scale: 0.96 },
                    onClick: () => generateInvoice(order),
                    className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold transition-smooth",
                    style: {
                      background: "oklch(0.675 0.25 178 / 0.15)",
                      color: "oklch(0.675 0.25 178)",
                      border: "1px solid oklch(0.675 0.25 178 / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
                      "Invoice"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.a,
                  {
                    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "data-ocid": "order_detail.whatsapp_button",
                    whileTap: { scale: 0.96 },
                    className: "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold transition-smooth",
                    style: {
                      background: "rgba(37,211,102,0.15)",
                      color: "#25d366",
                      border: "1px solid rgba(37,211,102,0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                      "WhatsApp"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  OrderDetailPage as default
};
