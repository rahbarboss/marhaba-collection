import { r as reactExports, j as jsxRuntimeExports, i as cn } from "./index-dBmmwt_c.js";
import { S as Star } from "./star-B5-fF_uf.js";
function RatingStars({
  rating,
  maxRating = 5,
  size = 14,
  showValue = false,
  showCount,
  className,
  interactive = false,
  onRate
}) {
  const [hovered, setHovered] = reactExports.useState(null);
  const displayRating = hovered ?? rating;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-1", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: maxRating }).map((_, i) => {
      const fill = displayRating >= i + 1 ? 1 : displayRating >= i + 0.5 ? 0.5 : 0;
      const starIndex = i + 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: interactive ? "button" : "button",
          disabled: !interactive,
          onClick: () => interactive && (onRate == null ? void 0 : onRate(starIndex)),
          onMouseEnter: () => interactive && setHovered(starIndex),
          onMouseLeave: () => interactive && setHovered(null),
          className: cn(
            "relative flex items-center justify-center",
            interactive && "cursor-pointer hover:scale-110 transition-transform"
          ),
          style: { width: size, height: size },
          "aria-label": `Rate ${starIndex} star`,
          children: fill === 0.5 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: size, height: size }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size,
                className: "absolute inset-0 text-muted-foreground/30",
                fill: "currentColor"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 overflow-hidden",
                style: { width: size / 2 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size,
                    style: { color: "oklch(0.72 0.26 90)" },
                    fill: "currentColor"
                  }
                )
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              size,
              style: {
                color: fill === 1 ? "oklch(0.72 0.26 90)" : "oklch(0.4 0 0)"
              },
              fill: "currentColor"
            }
          )
        },
        `star-${starIndex}`
      );
    }) }),
    showValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-xs font-semibold",
        style: { color: "oklch(0.72 0.26 90)" },
        children: rating.toFixed(1)
      }
    ),
    showCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      "(",
      showCount.toLocaleString(),
      ")"
    ] })
  ] });
}
export {
  RatingStars as R
};
