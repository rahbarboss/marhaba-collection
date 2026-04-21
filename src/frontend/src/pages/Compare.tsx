import { useNavigate } from "@tanstack/react-router";
import { GitCompareArrows, Plus, ShoppingCart, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { formatINR } from "../components/PriceTag";
import { RatingStars } from "../components/RatingStars";
import { useCart } from "../context/CartContext";
import { sampleProducts } from "../data/sampleProducts";
import type { Product } from "../types";

const LS_KEY = "rahbar_compare_ids";

export function getCompareIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function setCompareIds(ids: string[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids.slice(0, 4)));
}

export function addToCompare(id: string): boolean {
  const ids = getCompareIds();
  if (ids.includes(id)) return true;
  if (ids.length >= 4) return false;
  setCompareIds([...ids, id]);
  return true;
}

export function removeFromCompare(id: string) {
  setCompareIds(getCompareIds().filter((i) => i !== id));
}

function computeDiscount(p: Product): number {
  if (!p.originalPriceInPaise || p.originalPriceInPaise <= p.priceInPaise)
    return 0;
  return Math.round(
    ((p.originalPriceInPaise - p.priceInPaise) / p.originalPriceInPaise) * 100,
  );
}

function ProductSlot({
  product,
  slot,
  isLowest,
  isHighestRating,
  isBestDiscount,
  onRemove,
  onAddToCart,
}: {
  product: Product;
  slot: number;
  isLowest: boolean;
  isHighestRating: boolean;
  isBestDiscount: boolean;
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  const navigate = useNavigate();
  const discount = computeDiscount(product);

  return (
    <div
      className="led-strip relative flex flex-col rounded-xl overflow-hidden"
      style={{ minWidth: 160, background: "oklch(0.13 0.01 220)" }}
    >
      <button
        type="button"
        onClick={onRemove}
        onKeyDown={(e) => e.key === "Enter" && onRemove()}
        aria-label="Remove from compare"
        data-ocid="compare.remove_button"
        className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-smooth"
        style={{ background: "oklch(0.2 0 0)", color: "oklch(0.7 0 0)" }}
      >
        <X size={12} />
      </button>

      <button
        type="button"
        className="block w-full aspect-square overflow-hidden"
        onClick={() =>
          navigate({ to: "/product/$id", params: { id: product.id } })
        }
        onKeyDown={(e) =>
          e.key === "Enter" &&
          navigate({ to: "/product/$id", params: { id: product.id } })
        }
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-smooth hover:scale-105"
        />
      </button>

      <div className="p-3 flex-1 flex flex-col gap-2">
        <p
          className="text-xs font-semibold leading-tight line-clamp-2"
          style={{ color: "oklch(0.92 0 0)" }}
        >
          {product.name}
        </p>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full w-fit"
          style={{
            background: "oklch(0.675 0.25 178 / 0.12)",
            color: "oklch(0.675 0.25 178)",
            border: "1px solid oklch(0.675 0.25 178 / 0.3)",
          }}
        >
          {product.category}
        </span>

        <div className="mt-auto">
          <p
            className="text-sm font-bold"
            style={{
              color: isLowest ? "oklch(0.675 0.25 178)" : "oklch(0.85 0 0)",
            }}
          >
            {isLowest && (
              <span
                className="text-[9px] mr-1 px-1 py-0.5 rounded"
                style={{ background: "oklch(0.675 0.25 178 / 0.2)" }}
              >
                BEST
              </span>
            )}
            {formatINR(product.priceInPaise)}
          </p>
          {product.originalPriceInPaise &&
            product.originalPriceInPaise > product.priceInPaise && (
              <p className="text-[10px] line-through text-muted-foreground">
                {formatINR(product.originalPriceInPaise)}
              </p>
            )}
          {discount > 0 && (
            <p
              className="text-[10px] font-bold"
              style={{
                color: isBestDiscount
                  ? "oklch(0.78 0.22 145)"
                  : "oklch(0.72 0.26 90)",
              }}
            >
              {isBestDiscount && "🏆 "}-{discount}% off
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <RatingStars rating={product.rating} size={10} />
          <span
            className="text-[10px] font-semibold"
            style={{
              color: isHighestRating
                ? "oklch(0.72 0.26 90)"
                : "oklch(0.65 0 0)",
            }}
          >
            {isHighestRating && "★ "}
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          onKeyDown={(e) => e.key === "Enter" && onAddToCart()}
          data-ocid={`compare.add_to_cart.${slot}`}
          className="btn-premium w-full text-[10px] py-2 rounded-lg mt-1"
          disabled={product.stock === 0}
          style={
            product.stock === 0 ? { opacity: 0.5, cursor: "not-allowed" } : {}
          }
        >
          <ShoppingCart size={10} className="inline mr-1" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function AddSlot({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      onKeyDown={(e) => e.key === "Enter" && onAdd()}
      data-ocid="compare.add_product_slot"
      className="flex flex-col items-center justify-center gap-3 rounded-xl transition-smooth"
      style={{
        minWidth: 140,
        minHeight: 280,
        background: "oklch(0.11 0.005 220)",
        border: "2px dashed oklch(0.25 0 0)",
        color: "oklch(0.45 0 0)",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "oklch(0.675 0.25 178 / 0.1)",
          color: "oklch(0.675 0.25 178)",
        }}
      >
        <Plus size={20} />
      </div>
      <p className="text-xs font-medium text-center px-3">Add Product</p>
    </button>
  );
}

function SpecRow({
  label,
  values,
}: {
  label: string;
  values: (string | null)[];
}) {
  return (
    <div
      className="grid items-start"
      style={{
        gridTemplateColumns: `80px repeat(${values.length}, minmax(140px, 1fr))`,
      }}
    >
      <div
        className="sticky left-0 z-10 flex items-start py-2.5 px-2 text-[10px] font-semibold uppercase tracking-wide"
        style={{
          background: "oklch(0.10 0 0)",
          color: "oklch(0.5 0 0)",
          borderBottom: "1px solid oklch(0.18 0 0)",
          minHeight: 44,
        }}
      >
        {label}
      </div>
      {values.map((v, i) => (
        <div
          key={`${label}-${String(i)}`}
          className="py-2.5 px-3 text-xs"
          style={{
            borderBottom: "1px solid oklch(0.18 0 0)",
            color: v ? "oklch(0.82 0 0)" : "oklch(0.35 0 0)",
            background:
              i % 2 === 0 ? "oklch(0.115 0.005 220)" : "oklch(0.105 0 0)",
          }}
        >
          {v ?? <span className="italic">—</span>}
        </div>
      ))}
    </div>
  );
}

function ProductSearchModal({
  existingIds,
  onSelect,
  onClose,
}: {
  existingIds: string[];
  onSelect: (product: Product) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sampleProducts.filter(
      (p) =>
        !existingIds.includes(p.id) &&
        (p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))),
    );
  }, [query, existingIds]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
      data-ocid="compare.search_modal"
    >
      <dialog
        className="w-full max-w-sm rounded-t-2xl p-4 fade-in border-0"
        style={{ background: "oklch(0.14 0.005 220)" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label="Select product to compare"
        open
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold" style={{ color: "oklch(0.9 0 0)" }}>
            Select Product
          </p>
          <button
            type="button"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Enter" && onClose()}
            data-ocid="compare.close_button"
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.2 0 0)", color: "oklch(0.7 0 0)" }}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          data-ocid="compare.search_input"
          className="w-full text-sm rounded-lg px-3 py-2 mb-3 outline-none"
          style={{
            background: "oklch(0.18 0 0)",
            color: "oklch(0.9 0 0)",
            border: "1px solid oklch(0.25 0 0)",
          }}
        />

        <div className="overflow-y-auto max-h-64 space-y-2 pr-1">
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">
              No products found
            </p>
          )}
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              onKeyDown={(ev) => ev.key === "Enter" && onSelect(p)}
              data-ocid={`compare.search_result.${p.id}`}
              className="w-full flex items-center gap-3 p-2 rounded-xl transition-smooth text-left"
              style={{
                background: "oklch(0.17 0.005 220)",
                border: "1px solid oklch(0.22 0 0)",
              }}
            >
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium truncate"
                  style={{ color: "oklch(0.9 0 0)" }}
                >
                  {p.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {p.category}
                </p>
              </div>
              <p
                className="text-xs font-bold flex-shrink-0"
                style={{ color: "oklch(0.675 0.25 178)" }}
              >
                {formatINR(p.priceInPaise)}
              </p>
            </button>
          ))}
        </div>
      </dialog>
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-16 px-6 fade-in"
      data-ocid="compare.empty_state"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.15), oklch(0.72 0.26 90 / 0.15))",
          border: "1px solid oklch(0.675 0.25 178 / 0.25)",
        }}
      >
        <GitCompareArrows
          size={36}
          style={{ color: "oklch(0.675 0.25 178)" }}
        />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-bold mb-1 text-gradient">
          Compare Products
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Select 2–4 products to compare side by side.
          <br />
          View prices, specs, ratings and more.
        </p>
      </div>
      <button
        type="button"
        className="btn-premium px-8 py-3 text-sm"
        onClick={() => navigate({ to: "/" })}
        onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/" })}
        data-ocid="compare.browse_button"
      >
        Browse Products
      </button>
    </div>
  );
}

export default function ComparePage() {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [compareIds, setCompareIdsState] = useState<string[]>(() =>
    getCompareIds(),
  );
  const [showSearchModal, setShowSearchModal] = useState(false);

  const products = useMemo(
    () =>
      compareIds
        .map((id) => sampleProducts.find((p) => p.id === id))
        .filter(Boolean) as Product[],
    [compareIds],
  );

  useEffect(() => {
    setCompareIds(compareIds);
  }, [compareIds]);

  const removeProduct = useCallback((id: string) => {
    setCompareIdsState((prev) => prev.filter((i) => i !== id));
  }, []);

  const handleSelect = useCallback((product: Product) => {
    setCompareIdsState((prev) => {
      if (prev.includes(product.id) || prev.length >= 4) return prev;
      return [...prev, product.id];
    });
    setShowSearchModal(false);
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product, 1);
      toast.success(`${product.name} added to cart`, {
        style: {
          background: "oklch(0.14 0.005 220)",
          color: "oklch(0.9 0 0)",
          border: "1px solid oklch(0.675 0.25 178 / 0.3)",
        },
      });
    },
    [addItem],
  );

  const lowestPriceId = useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((a, b) => (a.priceInPaise <= b.priceInPaise ? a : b))
      .id;
  }, [products]);

  const highestRatingId = useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((a, b) => (a.rating >= b.rating ? a : b)).id;
  }, [products]);

  const bestDiscountId = useMemo(() => {
    if (products.length < 2) return null;
    return products.reduce((a, b) =>
      computeDiscount(a) >= computeDiscount(b) ? a : b,
    ).id;
  }, [products]);

  const allSpecLabels = useMemo(() => {
    const seen = new Set<string>();
    const labels: string[] = [];
    for (const p of products) {
      for (const s of p.specifications) {
        if (!seen.has(s.label)) {
          seen.add(s.label);
          labels.push(s.label);
        }
      }
    }
    return labels;
  }, [products]);

  const slotCount = products.length;
  const canAddMore = slotCount < 4;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.09 0 0)" }}
      data-ocid="compare.page"
    >
      <div
        className="sticky top-0 z-20 px-4 py-3 flex items-center gap-3"
        style={{
          background: "oklch(0.12 0.005 220)",
          borderBottom: "1px solid oklch(0.2 0 0)",
        }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/" })}
          data-ocid="compare.back_button"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth"
          style={{ background: "oklch(0.18 0 0)", color: "oklch(0.7 0 0)" }}
          aria-label="Go back"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-gradient">Compare Products</h1>
          <p className="text-[10px] text-muted-foreground">
            {slotCount === 0
              ? "Add products to compare"
              : `${slotCount} product${slotCount > 1 ? "s" : ""} selected`}
          </p>
        </div>
        {slotCount >= 2 && (
          <button
            type="button"
            onClick={() => setCompareIdsState([])}
            onKeyDown={(e) => e.key === "Enter" && setCompareIdsState([])}
            data-ocid="compare.clear_button"
            className="text-[10px] px-3 py-1.5 rounded-lg transition-smooth"
            style={{
              background: "oklch(0.65 0.19 22 / 0.15)",
              color: "oklch(0.75 0.15 22)",
              border: "1px solid oklch(0.65 0.19 22 / 0.3)",
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {slotCount === 0 && <EmptyState />}

      {slotCount > 0 && (
        <div className="fade-in">
          <div className="overflow-x-auto pb-2">
            <div
              className="flex gap-3 p-4"
              style={{
                minWidth: `${(slotCount + (canAddMore ? 1 : 0)) * 168}px`,
              }}
            >
              {products.map((product, idx) => (
                <ProductSlot
                  key={product.id}
                  product={product}
                  slot={idx + 1}
                  isLowest={lowestPriceId === product.id}
                  isHighestRating={highestRatingId === product.id}
                  isBestDiscount={bestDiscountId === product.id}
                  onRemove={() => removeProduct(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
              {canAddMore && <AddSlot onAdd={() => setShowSearchModal(true)} />}
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 pb-3 flex-wrap">
            {[
              { color: "oklch(0.675 0.25 178)", label: "Lowest Price" },
              { color: "oklch(0.72 0.26 90)", label: "Top Rated" },
              { color: "oklch(0.78 0.22 145)", label: "Best Discount" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mx-4 mb-4 rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(0.2 0 0)" }}
          >
            <div
              className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: "oklch(0.675 0.25 178 / 0.08)",
                color: "oklch(0.675 0.25 178)",
                borderBottom: "1px solid oklch(0.2 0 0)",
              }}
            >
              Core Details
            </div>
            <div className="overflow-x-auto">
              <SpecRow
                label="Price"
                values={products.map((p) => {
                  const isLowest = lowestPriceId === p.id;
                  return `${formatINR(p.priceInPaise)}${isLowest ? " ✓" : ""}`;
                })}
              />
              <SpecRow
                label="Discount"
                values={products.map((p) => {
                  const d = computeDiscount(p);
                  const isBest = bestDiscountId === p.id;
                  return d > 0 ? `${d}%${isBest ? " 🏆" : ""}` : null;
                })}
              />
              <SpecRow
                label="Rating"
                values={products.map((p) => {
                  const isTop = highestRatingId === p.id;
                  return `${p.rating.toFixed(1)} ★ (${p.reviewCount.toLocaleString()})${isTop ? " ✓" : ""}`;
                })}
              />
              <SpecRow
                label="Stock"
                values={products.map((p) =>
                  p.stock > 0 ? `${p.stock} units` : "Out of Stock",
                )}
              />
              <SpecRow
                label="Category"
                values={products.map((p) => p.category)}
              />
              <SpecRow
                label="Tags"
                values={products.map((p) => p.tags.slice(0, 3).join(", "))}
              />
            </div>

            {allSpecLabels.length > 0 && (
              <>
                <div
                  className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "oklch(0.72 0.26 90 / 0.08)",
                    color: "oklch(0.72 0.26 90)",
                    borderBottom: "1px solid oklch(0.2 0 0)",
                    borderTop: "1px solid oklch(0.2 0 0)",
                  }}
                >
                  Specifications
                </div>
                <div className="overflow-x-auto">
                  {allSpecLabels.map((specLabel) => (
                    <SpecRow
                      key={specLabel}
                      label={specLabel}
                      values={products.map((p) => {
                        const spec = p.specifications.find(
                          (s) => s.label === specLabel,
                        );
                        return spec?.value ?? null;
                      })}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="px-4 pb-6 pt-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/" })}
              data-ocid="compare.browse_more_button"
              className="w-full py-3 rounded-xl text-sm font-semibold transition-smooth"
              style={{
                background: "oklch(0.675 0.25 178 / 0.1)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.25)",
              }}
            >
              <Plus size={14} className="inline mr-2" />
              Browse More Products
            </button>
          </div>
        </div>
      )}

      {showSearchModal && (
        <ProductSearchModal
          existingIds={compareIds}
          onSelect={handleSelect}
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </div>
  );
}
