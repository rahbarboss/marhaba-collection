import { useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star, X } from "lucide-react";
import { LEDBorderCard } from "../components/LEDBorderCard";
import { formatINR } from "../components/PriceTag";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useNotifications } from "../context/NotificationContext";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const { showToast } = useNotifications();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const goToProduct = (id: string) =>
    navigate({ to: "/product/$id", params: { id } });

  const handleAddToCart = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (!item) return;
    addItem(item.product, 1);
    showToast("success", t("addedToCart"));
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
    showToast("info", t("removedFromWishlist"));
  };

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-full px-6 py-16 fade-in"
        data-ocid="wishlist.empty_state"
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.15), oklch(0.675 0.25 178 / 0.1))",
            border: "2px solid oklch(0.72 0.26 90 / 0.3)",
          }}
        >
          <Heart
            className="w-10 h-10"
            style={{ color: "oklch(0.72 0.26 90)" }}
            fill="oklch(0.72 0.26 90 / 0.3)"
          />
        </div>
        <h2 className="text-xl font-display font-bold text-foreground mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-xs">
          Save your favourite items here and come back to them anytime.
        </p>
        <button
          type="button"
          data-ocid="wishlist.explore.button"
          onClick={() => navigate({ to: "/" })}
          className="btn-premium px-8 py-3 rounded-full text-sm font-semibold"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="px-3 pt-4 pb-4 fade-in">
      <div className="flex items-center justify-between mb-4 px-1">
        <h1 className="font-display font-bold text-xl text-foreground">
          {t("wishlist")}
        </h1>
        <span className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => {
          const { product } = item;
          const inCart = isInCart(product.id);
          const discountPercent =
            product.originalPriceInPaise &&
            product.originalPriceInPaise > product.priceInPaise
              ? Math.round(
                  ((product.originalPriceInPaise - product.priceInPaise) /
                    product.originalPriceInPaise) *
                    100,
                )
              : null;

          return (
            <div key={product.id} data-ocid={`wishlist.item.${idx + 1}`}>
              <LEDBorderCard className="flex flex-col">
                <div className="relative">
                  <button
                    type="button"
                    data-ocid={`wishlist.remove_button.${idx + 1}`}
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                    style={{
                      background: "oklch(0.08 0 0 / 0.8)",
                      border: "1px solid oklch(0.3 0 0)",
                    }}
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>

                  {discountPercent && (
                    <span
                      className="absolute top-2 left-2 z-30 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        background: "oklch(0.72 0.26 90)",
                        color: "oklch(0.08 0 0)",
                      }}
                    >
                      -{discountPercent}%
                    </span>
                  )}

                  <button
                    type="button"
                    className="block w-full"
                    onClick={() => goToProduct(product.id)}
                    aria-label={`View ${product.name}`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-t-[10px]"
                      loading="lazy"
                    />
                  </button>
                </div>

                <div className="p-2.5 flex flex-col flex-1 gap-1.5">
                  <button
                    type="button"
                    className="text-xs font-medium text-foreground line-clamp-2 leading-snug text-left hover:opacity-80 transition-smooth"
                    onClick={() => goToProduct(product.id)}
                  >
                    {product.name}
                  </button>

                  <div className="flex items-center gap-1">
                    <Star
                      className="w-3 h-3"
                      style={{ color: "oklch(0.72 0.26 90)" }}
                      fill="oklch(0.72 0.26 90)"
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "oklch(0.675 0.25 178)" }}
                    >
                      {formatINR(product.priceInPaise)}
                    </p>
                    {product.originalPriceInPaise &&
                      product.originalPriceInPaise > product.priceInPaise && (
                        <p className="text-[10px] text-muted-foreground line-through">
                          {formatINR(product.originalPriceInPaise)}
                        </p>
                      )}
                  </div>

                  <button
                    type="button"
                    data-ocid={`wishlist.add_to_cart.${idx + 1}`}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-smooth hover:scale-[1.02] disabled:opacity-50 mt-auto"
                    style={
                      inCart
                        ? {
                            background: "oklch(0.675 0.25 178 / 0.1)",
                            color: "oklch(0.675 0.25 178)",
                            border: "1px solid oklch(0.675 0.25 178 / 0.3)",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
                            color: "oklch(0.08 0 0)",
                          }
                    }
                  >
                    <ShoppingBag className="w-3 h-3" />
                    {product.stock === 0
                      ? "Out of Stock"
                      : inCart
                        ? "In Bag"
                        : t("addToCart")}
                  </button>
                </div>
              </LEDBorderCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
