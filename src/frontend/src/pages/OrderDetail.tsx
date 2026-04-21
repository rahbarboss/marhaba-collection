import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  FileText,
  Home,
  Loader,
  MapPin,
  MessageCircle,
  Package,
  RotateCcw,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { StatusBadge } from "../components/BadgeCustom";
import { formatINR } from "../components/PriceTag";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationContext";
import type { Order, OrderStatus } from "../types";

// ─── Re-use seed data (same as Orders.tsx) ────────────────────────────────────
const SEED_ORDERS: Order[] = [
  {
    id: "ORD-7F3A2B",
    items: [
      {
        product: {
          id: "p1",
          name: "Wireless Noise-Cancelling Headphones",
          description:
            "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality.",
          category: "Electronics",
          priceInPaise: 899900,
          originalPriceInPaise: 1299900,
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          ],
          rating: 4.7,
          reviewCount: 312,
          stock: 10,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 1,
        priceInPaise: 899900,
      },
      {
        product: {
          id: "p2",
          name: "Premium Leather Wallet",
          description:
            "Hand-crafted genuine leather wallet with RFID protection and multiple card slots.",
          category: "Fashion",
          priceInPaise: 249900,
          originalPriceInPaise: 399900,
          images: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
          ],
          rating: 4.5,
          reviewCount: 98,
          stock: 5,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 2,
        priceInPaise: 249900,
      },
    ],
    totalInPaise: 1399700,
    discountInPaise: 150000,
    couponCode: "SAVE15",
    status: "shipped",
    address: {
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      line1: "12, Boring Road",
      line2: "Near Gandhi Maidan",
      city: "Patna",
      state: "Bihar",
      pincode: "800001",
    },
    paymentMethod: "UPI",
    createdAt: Date.now() - 3 * 24 * 3600000,
    updatedAt: Date.now() - 1 * 24 * 3600000,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 3 * 24 * 3600000,
      },
      {
        status: "packed",
        label: "Packed",
        completed: true,
        current: false,
        timestamp: Date.now() - 2 * 24 * 3600000,
      },
      {
        status: "shipped",
        label: "Shipped",
        completed: false,
        current: true,
        timestamp: Date.now() - 1 * 24 * 3600000,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: false,
        current: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: "ORD-2C8D1E",
    items: [
      {
        product: {
          id: "p3",
          name: "Gold-Plated Diamond Necklace",
          description:
            "Exquisite 22K gold-plated necklace with authentic diamond accents.",
          category: "Jewelry",
          priceInPaise: 4599900,
          images: [
            "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400",
          ],
          rating: 4.9,
          reviewCount: 45,
          stock: 3,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 1,
        priceInPaise: 4599900,
      },
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
      pincode: "800004",
    },
    paymentMethod: "Card",
    createdAt: Date.now() - 12 * 24 * 3600000,
    updatedAt: Date.now() - 5 * 24 * 3600000,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 12 * 24 * 3600000,
      },
      {
        status: "packed",
        label: "Packed",
        completed: true,
        current: false,
        timestamp: Date.now() - 11 * 24 * 3600000,
      },
      {
        status: "shipped",
        label: "Shipped",
        completed: true,
        current: false,
        timestamp: Date.now() - 9 * 24 * 3600000,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: true,
        current: false,
        timestamp: Date.now() - 6 * 24 * 3600000,
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: true,
        current: false,
        timestamp: Date.now() - 5 * 24 * 3600000,
      },
    ],
  },
  {
    id: "ORD-9E5F4C",
    items: [
      {
        product: {
          id: "p4",
          name: "Smart Fitness Watch Ultra",
          description:
            "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
          category: "Electronics",
          priceInPaise: 1299900,
          images: [
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
          ],
          rating: 4.6,
          reviewCount: 207,
          stock: 8,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 1,
        priceInPaise: 1299900,
      },
      {
        product: {
          id: "p5",
          name: "Luxury Silk Saree",
          description: "Pure Banarasi silk saree with intricate zari work.",
          category: "Fashion",
          priceInPaise: 759900,
          images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
          ],
          rating: 4.8,
          reviewCount: 134,
          stock: 4,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 1,
        priceInPaise: 759900,
      },
      {
        product: {
          id: "p6",
          name: "Artisan Perfume Collection",
          description: "Set of 3 luxury fragrances inspired by Indian flora.",
          category: "Beauty",
          priceInPaise: 349900,
          images: [
            "https://images.unsplash.com/photo-1588776814546-1ffbb3e851a2?w=400",
          ],
          rating: 4.4,
          reviewCount: 89,
          stock: 12,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 2,
        priceInPaise: 349900,
      },
    ],
    totalInPaise: 2759600,
    discountInPaise: 200000,
    status: "out_for_delivery",
    address: {
      name: "Amit Sharma",
      phone: "+91 9876543211",
      line1: "67, Fraser Road",
      city: "Patna",
      state: "Bihar",
      pincode: "800001",
    },
    paymentMethod: "Wallet",
    createdAt: Date.now() - 2 * 24 * 3600000,
    updatedAt: Date.now() - 4 * 3600000,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 2 * 24 * 3600000,
      },
      {
        status: "packed",
        label: "Packed",
        completed: true,
        current: false,
        timestamp: Date.now() - 30 * 3600000,
      },
      {
        status: "shipped",
        label: "Shipped",
        completed: true,
        current: false,
        timestamp: Date.now() - 10 * 3600000,
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: false,
        current: true,
        timestamp: Date.now() - 4 * 3600000,
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: "ORD-4A6B8D",
    items: [
      {
        product: {
          id: "p7",
          name: "Ceramic Dinner Set (12 pieces)",
          description:
            "Premium hand-painted ceramic dinner set with 12 pieces.",
          category: "Home",
          priceInPaise: 549900,
          images: [
            "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400",
          ],
          rating: 4.3,
          reviewCount: 56,
          stock: 0,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 1,
        priceInPaise: 549900,
      },
    ],
    totalInPaise: 549900,
    discountInPaise: 50000,
    status: "cancelled",
    address: {
      name: "Sunita Devi",
      phone: "+91 9334808341",
      line1: "23, Kankarbagh Colony",
      city: "Patna",
      state: "Bihar",
      pincode: "800020",
    },
    paymentMethod: "COD",
    createdAt: Date.now() - 7 * 24 * 3600000,
    updatedAt: Date.now() - 6 * 24 * 3600000,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: true,
        current: false,
        timestamp: Date.now() - 7 * 24 * 3600000,
      },
      { status: "packed", label: "Packed", completed: false, current: false },
      { status: "shipped", label: "Shipped", completed: false, current: false },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: false,
        current: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: false,
        current: false,
      },
    ],
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
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
          ],
          rating: 4.6,
          reviewCount: 178,
          stock: 7,
          specifications: [],
          reviews: [],
          tags: [],
        },
        quantity: 3,
        priceInPaise: 399900,
      },
    ],
    totalInPaise: 1199700,
    discountInPaise: 100000,
    status: "ordered",
    address: {
      name: "Vivek Mishra",
      phone: "+91 9876543212",
      line1: "8, Rajendra Nagar",
      city: "Patna",
      state: "Bihar",
      pincode: "800016",
    },
    paymentMethod: "UPI",
    createdAt: Date.now() - 6 * 3600000,
    updatedAt: Date.now() - 6 * 3600000,
    trackingSteps: [
      {
        status: "ordered",
        label: "Order Placed",
        completed: false,
        current: true,
        timestamp: Date.now() - 6 * 3600000,
      },
      { status: "packed", label: "Packed", completed: false, current: false },
      { status: "shipped", label: "Shipped", completed: false, current: false },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: false,
        current: false,
      },
      {
        status: "delivered",
        label: "Delivered",
        completed: false,
        current: false,
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getEstimatedDelivery(createdAt: number, status: OrderStatus): string {
  const base = new Date(createdAt);
  let days = 5;
  if (status === "shipped") days = 2;
  if (status === "out_for_delivery") days = 0;
  if (status === "delivered") return "Delivered";
  base.setDate(base.getDate() + days);
  return base.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STEP_ICONS: Record<OrderStatus, typeof Package> = {
  ordered: Package,
  packed: Package,
  shipped: Truck,
  out_for_delivery: MapPin,
  delivered: CheckCircle,
  cancelled: RotateCcw,
};

// ─── Tracking Timeline ────────────────────────────────────────────────────────
function TrackingTimeline({ order }: { order: Order }) {
  const steps = order.trackingSteps.filter((s) => s.status !== "cancelled");

  return (
    <div data-ocid="order_detail.tracking_timeline" className="space-y-0">
      {steps.map((step, idx) => {
        const Icon = STEP_ICONS[step.status] ?? Circle;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.status} className="flex gap-3">
            {/* Connector column */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="relative flex-shrink-0"
              >
                {step.current ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.8,
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "oklch(0.72 0.26 90 / 0.2)",
                      border: "2px solid oklch(0.72 0.26 90)",
                      boxShadow: "0 0 12px oklch(0.72 0.26 90 / 0.5)",
                    }}
                  >
                    <Loader
                      className="w-3.5 h-3.5 animate-spin"
                      style={{ color: "oklch(0.72 0.26 90)" }}
                    />
                  </motion.div>
                ) : step.completed ? (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "oklch(0.675 0.25 178 / 0.2)",
                      border: "2px solid oklch(0.675 0.25 178)",
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(0.675 0.25 178)" }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "oklch(0.15 0 0)",
                      border: "2px solid oklch(0.25 0 0)",
                    }}
                  >
                    <Circle className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
              {!isLast && (
                <div
                  className="w-0.5 my-1 flex-1 min-h-[24px]"
                  style={{
                    background: step.completed
                      ? "linear-gradient(180deg, oklch(0.675 0.25 178), oklch(0.675 0.25 178 / 0.3))"
                      : "oklch(0.22 0 0)",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-4 ${isLast ? "" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.05, duration: 0.3 }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: step.current
                      ? "oklch(0.72 0.26 90)"
                      : step.completed
                        ? "oklch(0.675 0.25 178)"
                        : "oklch(0.4 0 0)",
                  }}
                >
                  {step.label}
                </p>
                {step.timestamp ? (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {formatDateTime(step.timestamp)}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Pending
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon: Icon,
  children,
}: { title: string; icon: typeof Package; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.2 0 0)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: "oklch(0.675 0.25 178 / 0.15)" }}
        >
          <Icon
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.675 0.25 178)" }}
          />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

// ─── Map Section ──────────────────────────────────────────────────────────────
function MapSection({ order }: { order: Order }) {
  const isActive = ["shipped", "out_for_delivery"].includes(order.status);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.2 0 0)",
      }}
      data-ocid="order_detail.map_section"
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.675 0.25 178 / 0.15)" }}
          >
            <MapPin
              className="w-3.5 h-3.5"
              style={{ color: "oklch(0.675 0.25 178)" }}
            />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Live Tracking
          </h3>
        </div>
        {isActive && (
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full animate-pulse"
            style={{
              background: "oklch(0.72 0.26 90 / 0.15)",
              color: "oklch(0.72 0.26 90)",
              border: "1px solid oklch(0.72 0.26 90 / 0.3)",
            }}
          >
            LIVE
          </span>
        )}
      </div>
      <div className="relative">
        <iframe
          title="Delivery location map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=84.9376%2C25.4941%2C85.3376%2C25.6941&layer=mapnik&marker=25.5941%2C85.1376"
          className="w-full"
          style={{
            height: 180,
            border: "none",
            filter: "saturate(0.7) brightness(0.85)",
          }}
          loading="lazy"
        />
        {/* Delivery pin overlay */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: "oklch(0.72 0.26 90)",
              boxShadow: "0 4px 16px oklch(0.72 0.26 90 / 0.6)",
            }}
          >
            <Package className="w-4 h-4" style={{ color: "oklch(0.08 0 0)" }} />
          </div>
          <div
            className="w-2 h-2 rounded-full mx-auto -mt-1"
            style={{ background: "oklch(0.72 0.26 90 / 0.4)" }}
          />
        </motion.div>
      </div>
      <div
        className="px-4 py-3"
        style={{ borderTop: "1px solid oklch(0.18 0 0)" }}
      >
        <p className="text-xs text-muted-foreground">
          📍{" "}
          <span className="text-foreground font-medium">
            {order.address.city}, {order.address.state}
          </span>
          {" · "}Estimated delivery:{" "}
          <span
            style={{ color: "oklch(0.675 0.25 178)" }}
            className="font-semibold"
          >
            {getEstimatedDelivery(order.createdAt, order.status)}
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── PDF Invoice Generation ───────────────────────────────────────────────────
function generateInvoice(order: Order) {
  const GST_RATE = 0.18;
  const net = order.totalInPaise - order.discountInPaise;
  const gst = Math.round(net * GST_RATE);
  const grandTotal = net + gst;

  const rows = order.items
    .map(
      (item, idx) =>
        `<tr style="border-bottom:1px solid #1e293b">
          <td style="padding:8px 4px;color:#94a3b8">${idx + 1}</td>
          <td style="padding:8px 4px;color:#e2e8f0">${item.product.name}</td>
          <td style="padding:8px 4px;text-align:center;color:#94a3b8">${item.quantity}</td>
          <td style="padding:8px 4px;text-align:right;color:#00d4c8">${formatINR(item.priceInPaise)}</td>
          <td style="padding:8px 4px;text-align:right;color:#f5c242;font-weight:bold">${formatINR(item.priceInPaise * item.quantity)}</td>
        </tr>`,
    )
    .join("");

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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrderDetailPage() {
  const { id } = useParams({ from: "/orders/$id" });
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useNotifications();
  const [reordered, setReordered] = useState(false);

  const foundOrder = SEED_ORDERS.find((o) => o.id === id);

  if (!foundOrder) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
        data-ocid="order_detail.error_state"
      >
        <Package className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-display font-bold text-foreground mb-2">
          Order not found
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          We couldn't find order #{id}
        </p>
        <button
          type="button"
          className="btn-premium text-sm px-5 py-2"
          onClick={() => navigate({ to: "/orders" })}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const order = foundOrder;
  const net = order.totalInPaise - order.discountInPaise;
  const gst = Math.round(net * 0.18);
  const grandTotal = net + gst;
  const WHATSAPP_NUMBER = "919334808340";
  const whatsappMsg = encodeURIComponent(
    `Hi Rahbar Support 👋\n\nI need help with my order:\n*Order ID:* ${order.id}\n*Status:* ${order.status}\n*Total:* ${formatINR(grandTotal)}\n\nPlease assist me. Thank you!`,
  );

  function handleReorder() {
    for (const item of order.items) {
      addItem(item.product, item.quantity);
    }
    setReordered(true);
    showToast("success", `${order.items.length} item(s) added to cart!`);
    setTimeout(() => navigate({ to: "/cart" }), 1200);
  }

  return (
    <div
      className="flex flex-col min-h-full pb-24"
      data-ocid="order_detail.page"
    >
      {/* Sticky Header */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3"
        style={{
          background: "oklch(0.08 0 0)",
          borderBottom: "1px solid oklch(0.2 0 0)",
        }}
      >
        <button
          type="button"
          data-ocid="order_detail.back_button"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth hover:bg-muted"
          onClick={() => navigate({ to: "/orders" })}
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-mono truncate">
            {order.id}
          </p>
          <p className="text-sm font-semibold text-foreground leading-tight">
            Order Details
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-4 pt-4 space-y-3">
        {/* Order Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl px-4 py-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.08), oklch(0.72 0.26 90 / 0.06))",
            border: "1px solid oklch(0.675 0.25 178 / 0.2)",
          }}
          data-ocid="order_detail.order_header"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Placed on</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Est. Delivery</p>
              <p
                className="text-sm font-bold mt-0.5"
                style={{
                  color:
                    order.status === "delivered"
                      ? "#4ade80"
                      : "oklch(0.72 0.26 90)",
                }}
              >
                {getEstimatedDelivery(order.createdAt, order.status)}
              </p>
            </div>
          </div>
          <div className="section-divider my-3" />
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "oklch(0.675 0.25 178)" }}
            >
              <Package className="w-3.5 h-3.5" />
              <span>
                {order.items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.72 0.26 90)" }}
              />
              <span
                style={{ color: "oklch(0.72 0.26 90)" }}
                className="font-semibold"
              >
                {formatINR(grandTotal)}
              </span>
            </div>
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {order.paymentMethod}
            </span>
          </div>
        </motion.div>

        {/* Tracking Timeline */}
        {order.status !== "cancelled" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.12 0 0)",
              border: "1px solid oklch(0.2 0 0)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.675 0.25 178 / 0.15)" }}
              >
                <Truck
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.675 0.25 178)" }}
                />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                Tracking
              </h3>
            </div>
            <div className="px-4 pt-4 pb-2">
              <TrackingTimeline order={order} />
            </div>
          </motion.div>
        )}

        {/* Live Map */}
        {(order.status === "shipped" ||
          order.status === "out_for_delivery") && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MapSection order={order} />
          </motion.div>
        )}

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <SectionCard title="Items Ordered" icon={Package}>
            <div className="space-y-3" data-ocid="order_detail.items_list">
              {order.items.map((item, idx) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3"
                  data-ocid={`order_detail.item.${idx + 1}`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.675 0.25 178)" }}
                    >
                      {formatINR(item.priceInPaise * item.quantity)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {formatINR(item.priceInPaise)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <SectionCard title="Delivery Address" icon={Home}>
            <div data-ocid="order_detail.address_card">
              <p className="text-sm font-semibold text-foreground">
                {order.address.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {order.address.line1}
                {order.address.line2 && `, ${order.address.line2}`}
                <br />
                {order.address.city}, {order.address.state} –{" "}
                {order.address.pincode}
              </p>
              <p
                className="text-xs mt-2"
                style={{ color: "oklch(0.675 0.25 178)" }}
              >
                {order.address.phone}
              </p>
            </div>
          </SectionCard>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <SectionCard title="Payment Summary" icon={FileText}>
            <div
              className="space-y-2.5"
              data-ocid="order_detail.payment_summary"
            >
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatINR(order.totalInPaise)}
                </span>
              </div>
              {order.discountInPaise > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">
                    Discount
                    {order.couponCode && (
                      <span className="ml-1 text-xs font-mono">
                        ({order.couponCode})
                      </span>
                    )}
                  </span>
                  <span className="text-green-400 font-semibold">
                    -{formatINR(order.discountInPaise)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">{formatINR(gst)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.675 0.25 178)" }}
                >
                  {order.paymentMethod}
                </span>
              </div>
              <div
                className="flex justify-between pt-2.5"
                style={{ borderTop: "1px solid oklch(0.2 0 0)" }}
              >
                <span className="text-base font-bold text-foreground">
                  Grand Total
                </span>
                <span
                  className="text-base font-bold"
                  style={{ color: "oklch(0.72 0.26 90)" }}
                >
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>
          </SectionCard>
        </motion.div>
      </div>

      {/* Fixed Bottom Actions */}
      <div
        className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 py-3 z-20 space-y-2"
        style={{
          background:
            "linear-gradient(to top, oklch(0.08 0 0) 60%, transparent)",
        }}
      >
        {/* Reorder */}
        {order.status === "delivered" && (
          <motion.button
            type="button"
            data-ocid="order_detail.reorder_button"
            whileTap={{ scale: 0.97 }}
            onClick={handleReorder}
            disabled={reordered}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-smooth"
            style={{
              background: reordered
                ? "oklch(0.4 0 0)"
                : "linear-gradient(135deg, oklch(0.72 0.26 90), oklch(0.65 0.24 70))",
              color: "oklch(0.08 0 0)",
              boxShadow: reordered
                ? "none"
                : "0 4px 20px oklch(0.72 0.26 90 / 0.4)",
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            {reordered ? "Added to Cart!" : "Reorder All Items"}
          </motion.button>
        )}

        {/* Download Invoice + WhatsApp */}
        <div className="flex gap-2">
          <motion.button
            type="button"
            data-ocid="order_detail.invoice_button"
            whileTap={{ scale: 0.96 }}
            onClick={() => generateInvoice(order)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold transition-smooth"
            style={{
              background: "oklch(0.675 0.25 178 / 0.15)",
              color: "oklch(0.675 0.25 178)",
              border: "1px solid oklch(0.675 0.25 178 / 0.3)",
            }}
          >
            <FileText className="w-4 h-4" />
            Invoice
          </motion.button>
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="order_detail.whatsapp_button"
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold transition-smooth"
            style={{
              background: "rgba(37,211,102,0.15)",
              color: "#25d366",
              border: "1px solid rgba(37,211,102,0.3)",
            }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </motion.a>
        </div>
      </div>
    </div>
  );
}
