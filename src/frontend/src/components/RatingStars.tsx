import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
  showCount?: number;
  className?: string;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 14,
  showValue = false,
  showCount,
  className,
  interactive = false,
  onRate,
}: RatingStarsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayRating = hovered ?? rating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const fill =
            displayRating >= i + 1 ? 1 : displayRating >= i + 0.5 ? 0.5 : 0;
          const starIndex = i + 1;
          return (
            <button
              key={`star-${starIndex}`}
              type={interactive ? "button" : "button"}
              disabled={!interactive}
              onClick={() => interactive && onRate?.(starIndex)}
              onMouseEnter={() => interactive && setHovered(starIndex)}
              onMouseLeave={() => interactive && setHovered(null)}
              className={cn(
                "relative flex items-center justify-center",
                interactive &&
                  "cursor-pointer hover:scale-110 transition-transform",
              )}
              style={{ width: size, height: size }}
              aria-label={`Rate ${starIndex} star`}
            >
              {fill === 0.5 ? (
                <div className="relative" style={{ width: size, height: size }}>
                  <Star
                    size={size}
                    className="absolute inset-0 text-muted-foreground/30"
                    fill="currentColor"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: size / 2 }}
                  >
                    <Star
                      size={size}
                      style={{ color: "oklch(0.72 0.26 90)" }}
                      fill="currentColor"
                    />
                  </div>
                </div>
              ) : (
                <Star
                  size={size}
                  style={{
                    color:
                      fill === 1 ? "oklch(0.72 0.26 90)" : "oklch(0.4 0 0)",
                  }}
                  fill="currentColor"
                />
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span
          className="text-xs font-semibold"
          style={{ color: "oklch(0.72 0.26 90)" }}
        >
          {rating.toFixed(1)}
        </span>
      )}
      {showCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({showCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
