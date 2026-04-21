import { cn } from "../lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "teal" | "gold" | "white" | "muted";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: { spinner: 16, border: 2 },
  md: { spinner: 28, border: 3 },
  lg: { spinner: 44, border: 4 },
  xl: { spinner: 64, border: 5 },
};

const colorMap = {
  teal: { border: "rgba(0,212,200,0.15)", top: "oklch(0.675 0.25 178)" },
  gold: { border: "rgba(245,194,66,0.15)", top: "oklch(0.72 0.26 90)" },
  white: { border: "rgba(255,255,255,0.15)", top: "white" },
  muted: { border: "rgba(255,255,255,0.08)", top: "rgba(255,255,255,0.3)" },
};

export function LoadingSpinner({
  size = "md",
  variant = "teal",
  className,
  label,
}: LoadingSpinnerProps) {
  const { spinner, border } = sizeMap[size];
  const colors = colorMap[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div
        className="rounded-full animate-spin"
        style={{
          width: spinner,
          height: spinner,
          borderWidth: border,
          borderStyle: "solid",
          borderColor: colors.border,
          borderTopColor: colors.top,
        }}
      />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}

export function LoadingPage({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      className="flex-1 flex items-center justify-center min-h-[60vh]"
      data-ocid="page.loading_state"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.15), oklch(0.72 0.26 90 / 0.15))",
            boxShadow: "0 0 30px rgba(0,212,200,0.2)",
          }}
        >
          <span
            className="text-2xl font-display font-bold text-gradient animate-scale-pulse"
            style={{ fontFamily: "var(--font-display)" }}
          >
            R
          </span>
        </div>
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-5 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}
