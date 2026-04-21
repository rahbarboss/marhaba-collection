import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "../components/BadgeCustom";
import { formatINR } from "../components/PriceTag";
import { useBackendActor } from "../hooks/useBackendActor";
import type { Order, OrderStatus } from "../types";

type FilterTab = "all" | "active" | "delivered" | "cancelled";

const ACTIVE_STATUSES: OrderStatus[] = [
  "ordered",
  "packed",
  "shipped",
  "out_for_delivery",
];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return "Just now";
}

// ─── Backend Order → Frontend Order converter ─────────────────────────────────
function toFrontendOrder(o: import("../backend.d").Order): Order {
  const statusMap: Record<string, OrderStatus> = {
    ordered: "ordered",
    packed: "packed",
    shipped: "shipped",
    out_for_delivery: "out_for_delivery",
    delivered: "delivered",
    cancelled: "cancelled",
  };

  const paymentMap: Record<string, string> = {
    upi: "UPI",
    card: "Card",
    cod: "COD",
    wallet: "Wallet",
    split: "Split",
  };

  const status = statusMap[o.status] ?? "ordered";
  const paymentMethod = paymentMap[o.paymentMethod.__kind__] ?? "UPI";

  const statusOrder: OrderStatus[] = [
    "ordered",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];
  const currentIndex = statusOrder.indexOf(status);

  return {
    id: o.id.toString(),
    items: o.items.map((item) => ({
      product: {
        id: item.productId.toString(),
        name: item.name,
        description: "",
        category: "Electronics" as const,
        priceInPaise: Number(item.price),
        images: [item.image.getDirectURL()],
        rating: 4.5,
        reviewCount: 0,
        stock: 10,
        specifications: [],
        reviews: [],
        tags: [],
      },
      quantity: Number(item.quantity),
      priceInPaise: Number(item.price),
    })),
    totalInPaise: Number(o.totalAmount),
    discountInPaise: Number(o.discountAmount),
    couponCode: o.couponApplied ?? undefined,
    status,
    address: {
      name: o.address.name,
      phone: o.address.phone,
      line1: o.address.line1,
      line2: o.address.line2 || undefined,
      city: o.address.city,
      state: o.address.state,
      pincode: o.address.pincode,
    },
    paymentMethod,
    createdAt: Number(o.createdAt / BigInt(1_000_000)),
    updatedAt: Number(o.updatedAt / BigInt(1_000_000)),
    trackingSteps: statusOrder.map((s, idx) => ({
      status: s,
      label:
        s === "ordered"
          ? "Order Placed"
          : s === "packed"
            ? "Packed"
            : s === "shipped"
              ? "Shipped"
              : s === "out_for_delivery"
                ? "Out for Delivery"
                : "Delivered",
      completed: idx < currentIndex || (s === status && status === "delivered"),
      current: s === status && status !== "delivered",
      timestamp:
        o.trackingSteps.find((t) => t.status === s)?.timestamp !== undefined
          ? Number(
              o.trackingSteps.find((t) => t.status === s)!.timestamp! /
                BigInt(1_000_000),
            )
          : undefined,
    })),
  };
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function OrdersLoading() {
  return (
    <div className="space-y-3 px-4 pt-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden animate-pulse"
          style={{
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.22 0 0)",
          }}
        >
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <div
                className="h-3 w-28 rounded"
                style={{ background: "oklch(0.2 0 0)" }}
              />
              <div
                className="h-5 w-16 rounded-full"
                style={{ background: "oklch(0.2 0 0)" }}
              />
            </div>
            <div className="flex gap-2">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="h-12 w-12 rounded-xl"
                  style={{ background: "oklch(0.2 0 0)" }}
                />
              ))}
              <div className="flex-1 space-y-2 pt-1">
                <div
                  className="h-3 w-3/4 rounded"
                  style={{ background: "oklch(0.2 0 0)" }}
                />
                <div
                  className="h-3 w-1/2 rounded"
                  style={{ background: "oklch(0.2 0 0)" }}
                />
              </div>
            </div>
            <div className="flex justify-between pt-1">
              <div
                className="h-4 w-20 rounded"
                style={{ background: "oklch(0.2 0 0)" }}
              />
              <div
                className="h-7 w-24 rounded-full"
                style={{ background: "oklch(0.2 0 0)" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({ order, index }: { order: Order; index: number }) {
  const navigate = useNavigate();
  const isActive = ACTIVE_STATUSES.includes(order.status);
  const thumbItems = order.items.slice(0, 3);
  const extraCount = order.items.length - 3;
  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      data-ocid={`orders.item.${index + 1}`}
      className="led-strip rounded-2xl cursor-pointer"
      onClick={() => navigate({ to: "/orders/$id", params: { id: order.id } })}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.12 0 0)",
          border: "1px solid oklch(0.22 0 0)",
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div>
            <span className="text-xs text-muted-foreground font-mono">
              {order.id}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">
                {formatDate(order.createdAt)}
              </span>
              <span className="text-[11px] text-muted-foreground">·</span>
              <span className="text-[11px] text-muted-foreground">
                {timeAgo(order.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <div className="flex -space-x-2">
            {thumbItems.map((item) => (
              <div
                key={item.product.id}
                className="w-12 h-12 rounded-xl overflow-hidden border-2 border-card flex-shrink-0"
                style={{ zIndex: thumbItems.length }}
              >
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {extraCount > 0 && (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 border-card"
                style={{
                  background: "oklch(0.18 0 0)",
                  color: "oklch(0.72 0.26 90)",
                  zIndex: 0,
                }}
              >
                +{extraCount}
              </div>
            )}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {order.items[0].product.name}
              {order.items.length > 1 && ` +${order.items.length - 1} more`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid oklch(0.2 0 0)" }}
        >
          <div>
            <p className="text-xs text-muted-foreground">Total Paid</p>
            <p
              className="text-base font-bold"
              style={{ color: "oklch(0.675 0.25 178)" }}
            >
              {formatINR(order.totalInPaise - order.discountInPaise)}
            </p>
          </div>
          {isActive && (
            <button
              data-ocid={`orders.track_button.${index + 1}`}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth"
              style={{
                background: "oklch(0.675 0.25 178 / 0.15)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.3)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate({ to: "/orders/$id", params: { id: order.id } });
              }}
            >
              <MapPin className="w-3 h-3" />
              Track Order
            </button>
          )}
          {order.status === "delivered" && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Package className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Delivered</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyOrders({ tab }: { tab: FilterTab }) {
  const navigate = useNavigate();
  const msgs: Record<FilterTab, { title: string; subtitle: string }> = {
    all: {
      title: "No orders yet",
      subtitle: "Your premium shopping journey starts here",
    },
    active: {
      title: "No active orders",
      subtitle: "All your orders are settled",
    },
    delivered: {
      title: "No delivered orders",
      subtitle: "Completed orders will appear here",
    },
    cancelled: {
      title: "No cancelled orders",
      subtitle: "Great! Nothing was cancelled",
    },
  };
  const { title, subtitle } = msgs[tab];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      data-ocid="orders.empty_state"
    >
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-5"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.12), oklch(0.72 0.26 90 / 0.12))",
          boxShadow: "0 0 40px rgba(0,212,200,0.1)",
        }}
      >
        <ShoppingBag
          className="w-10 h-10"
          style={{ color: "oklch(0.675 0.25 178)" }}
        />
      </div>
      <h3 className="text-lg font-display font-bold text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>
      {tab === "all" && (
        <button
          type="button"
          data-ocid="orders.shop_now_button"
          className="btn-premium px-6 py-2.5 text-sm"
          onClick={() => navigate({ to: "/" })}
        >
          Start Shopping
        </button>
      )}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { actor, isFetching } = useBackendActor();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // Fetch orders from real backend — filtered by caller Principal automatically
  useEffect(() => {
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

  const tabs: { id: FilterTab; label: string; count?: number }[] = [
    { id: "all", label: "All", count: orders.length },
    {
      id: "active",
      label: "Active",
      count: orders.filter((o) => ACTIVE_STATUSES.includes(o.status)).length,
    },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  const filtered = useMemo(() => {
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

  return (
    <div className="flex flex-col min-h-full pb-6" data-ocid="orders.page">
      {/* Page Header */}
      <div
        className="px-4 pt-4 pb-3 sticky top-0 z-10"
        style={{
          background: "oklch(0.08 0 0)",
          borderBottom: "1px solid oklch(0.2 0 0)",
        }}
      >
        <h1 className="text-xl font-display font-bold text-foreground">
          My Orders
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {loading ? (
            <span className="flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading your orders...
            </span>
          ) : (
            `${orders.length} total order${orders.length !== 1 ? "s" : ""}`
          )}
        </p>

        {/* Filter Tabs */}
        <div
          className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar"
          data-ocid="orders.filter.tab"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-ocid={`orders.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth flex-shrink-0"
                style={
                  isActive
                    ? {
                        background: "oklch(0.675 0.25 178)",
                        color: "oklch(0.08 0 0)",
                      }
                    : {
                        background: "oklch(0.15 0 0)",
                        color: "oklch(0.55 0 0)",
                        border: "1px solid oklch(0.22 0 0)",
                      }
                }
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={
                      isActive
                        ? { background: "oklch(0.08 0 0 / 0.3)" }
                        : {
                            background: "oklch(0.2 0 0)",
                            color: "oklch(0.5 0 0)",
                          }
                    }
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 px-4 pt-4 space-y-3">
        {loading ? (
          <OrdersLoading />
        ) : (
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <EmptyOrders key="empty" tab={activeTab} />
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {filtered.map((order, i) => (
                  <OrderCard key={order.id} order={order} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
