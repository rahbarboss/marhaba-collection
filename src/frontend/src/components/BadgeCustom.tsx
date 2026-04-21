import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "gold"
  | "teal"
  | "success"
  | "error"
  | "warning"
  | "muted"
  | "outline"
  | "flash"
  | "trending"
  | "new"
  | "status";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground border border-border",
  primary: "bg-primary/20 text-primary border border-primary/30",
  secondary: "bg-secondary/20 text-secondary border border-secondary/30",
  gold: "border font-semibold",
  teal: "border font-semibold",
  success: "bg-green-500/15 text-green-400 border border-green-500/30",
  error: "bg-destructive/20 text-destructive border border-destructive/30",
  warning: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  muted: "bg-muted/60 text-muted-foreground",
  outline: "border border-border text-foreground bg-transparent",
  flash: "font-bold animate-pulse",
  trending: "font-semibold",
  new: "font-semibold",
  status: "font-medium",
};

const sizeStyles = {
  sm: "text-[10px] px-1.5 py-0.5 rounded-md",
  md: "text-xs px-2 py-0.5 rounded-md",
  lg: "text-sm px-2.5 py-1 rounded-lg",
};

export function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<
    string,
    { label: string; color: string; bg: string }
  > = {
    ordered: {
      label: "Ordered",
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    packed: { label: "Packed", color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
    shipped: {
      label: "Shipped",
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      color: "oklch(0.675 0.25 178)",
      bg: "rgba(0,212,200,0.15)",
    },
    delivered: {
      label: "Delivered",
      color: "#4ade80",
      bg: "rgba(74,222,128,0.15)",
    },
    cancelled: {
      label: "Cancelled",
      color: "#f87171",
      bg: "rgba(248,113,113,0.15)",
    },
    pending: {
      label: "Pending",
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    paid: { label: "Paid", color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
    failed: { label: "Failed", color: "#f87171", bg: "rgba(248,113,113,0.15)" },
    refunded: {
      label: "Refunded",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
  };

  const s = statusMap[status] ?? {
    label: status,
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.15)",
  };

  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.color}40`,
      }}
    >
      {s.label}
    </span>
  );
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  dot,
  icon,
}: BadgeProps) {
  const goldStyle =
    variant === "gold"
      ? {
          color: "oklch(0.72 0.26 90)",
          background: "oklch(0.72 0.26 90 / 0.15)",
          borderColor: "oklch(0.72 0.26 90 / 0.3)",
        }
      : variant === "teal"
        ? {
            color: "oklch(0.675 0.25 178)",
            background: "oklch(0.675 0.25 178 / 0.15)",
            borderColor: "oklch(0.675 0.25 178 / 0.3)",
          }
        : variant === "flash"
          ? {
              color: "oklch(0.72 0.26 90)",
              background: "oklch(0.72 0.26 90 / 0.1)",
              borderColor: "oklch(0.72 0.26 90 / 0.4)",
              border: "1px solid" as const,
            }
          : variant === "trending"
            ? {
                color: "oklch(0.675 0.25 178)",
                background: "oklch(0.675 0.25 178 / 0.1)",
                borderColor: "oklch(0.675 0.25 178 / 0.4)",
                border: "1px solid" as const,
              }
            : variant === "new"
              ? {
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.1)",
                  borderColor: "rgba(74,222,128,0.3)",
                  border: "1px solid" as const,
                }
              : undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      style={goldStyle}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "currentColor" }}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
