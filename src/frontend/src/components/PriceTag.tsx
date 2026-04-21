import { cn } from "../lib/utils";

interface PriceTagProps {
  priceInPaise: number;
  originalPriceInPaise?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscount?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    price: "text-sm font-bold",
    original: "text-xs",
    badge: "text-[10px] px-1.5 py-0.5",
  },
  md: {
    price: "text-base font-bold",
    original: "text-sm",
    badge: "text-xs px-2 py-0.5",
  },
  lg: {
    price: "text-xl font-bold",
    original: "text-sm",
    badge: "text-xs px-2 py-0.5",
  },
  xl: {
    price: "text-2xl font-bold",
    original: "text-base",
    badge: "text-sm px-2.5 py-1",
  },
};

export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function PriceTag({
  priceInPaise,
  originalPriceInPaise,
  size = "md",
  showDiscount = true,
  className,
}: PriceTagProps) {
  const classes = sizeClasses[size];
  const discountPercent =
    originalPriceInPaise && originalPriceInPaise > priceInPaise
      ? Math.round(
          ((originalPriceInPaise - priceInPaise) / originalPriceInPaise) * 100,
        )
      : null;

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span
        className={cn(classes.price)}
        style={{ color: "oklch(0.675 0.25 178)" }}
      >
        {formatINR(priceInPaise)}
      </span>
      {originalPriceInPaise && originalPriceInPaise > priceInPaise && (
        <span
          className={cn(classes.original, "line-through text-muted-foreground")}
        >
          {formatINR(originalPriceInPaise)}
        </span>
      )}
      {showDiscount && discountPercent && (
        <span
          className={cn(classes.badge, "rounded-full font-semibold")}
          style={{
            background: "oklch(0.72 0.26 90 / 0.15)",
            color: "oklch(0.72 0.26 90)",
            border: "1px solid oklch(0.72 0.26 90 / 0.3)",
          }}
        >
          -{discountPercent}%
        </span>
      )}
    </div>
  );
}
