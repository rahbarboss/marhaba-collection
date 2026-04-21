import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "../lib/utils";

interface LEDBorderCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  animationDuration?: number;
  borderWidth?: number;
  glowIntensity?: "low" | "medium" | "high";
}

export function LEDBorderCard({
  children,
  className,
  onClick,
  animationDuration = 3,
  borderWidth = 2,
  glowIntensity = "medium",
}: LEDBorderCardProps) {
  const glowMap = {
    low: "rgba(0,212,200,0.15)",
    medium: "rgba(0,212,200,0.3)",
    high: "rgba(0,212,200,0.5)",
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "relative rounded-xl overflow-hidden transition-smooth",
        onClick && "cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5",
        className,
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{
        boxShadow: `0 0 20px ${glowMap[glowIntensity]}, 0 4px 16px rgba(0,0,0,0.4)`,
      }}
    >
      {/* LED border layer */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          padding: `${borderWidth}px`,
          background: `linear-gradient(
            90deg,
            oklch(0.675 0.25 178),
            oklch(0.72 0.26 90),
            oklch(0.65 0.22 270),
            oklch(0.72 0.26 90),
            oklch(0.675 0.25 178)
          )`,
          backgroundSize: "300% 100%",
          animation: `led-flow ${animationDuration}s linear infinite`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Glow blur effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-0 opacity-40"
        style={{
          padding: `${borderWidth + 1}px`,
          background: `linear-gradient(
            90deg,
            oklch(0.675 0.25 178),
            oklch(0.72 0.26 90),
            oklch(0.675 0.25 178)
          )`,
          backgroundSize: "300% 100%",
          animation: `led-flow ${animationDuration}s linear infinite`,
          filter: "blur(4px)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Card content */}
      <div className="relative z-20 bg-card rounded-[10px] h-full">
        {children}
      </div>
    </div>
  );
}
