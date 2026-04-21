import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  GitCompare,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/BadgeCustom";
import { PriceTag, formatINR } from "../components/PriceTag";
import { RatingStars } from "../components/RatingStars";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  getProductById,
  getProductsByCategory,
  sampleProducts,
} from "../data/sampleProducts";
import { cn } from "../lib/utils";
import { addToCompare } from "../pages/Compare";
import type { Product, Review } from "../types";

/* ─── Small reusable sub-components ─────────────────────────── */

function GallerySection({
  product,
  wishlisted,
  onToggleWishlist,
}: {
  product: Product;
  wishlisted: boolean;
  onToggleWishlist: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const images =
    product.images.length > 0
      ? product.images
      : ["/assets/images/placeholder.svg"];

  const prev = () =>
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative select-none">
      {/* Main image */}
      <div
        className="relative overflow-hidden bg-card"
        style={{ aspectRatio: "4/3" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              data-ocid="product.gallery_prev"
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110"
            >
              <ChevronLeft size={16} className="text-foreground" />
            </button>
            <button
              type="button"
              onClick={next}
              data-ocid="product.gallery_next"
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110"
            >
              <ChevronRight size={16} className="text-foreground" />
            </button>
          </>
        )}

        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold" size="md">
              -{product.discount}% OFF
            </Badge>
          </div>
        )}

        {/* Flash deal badge */}
        {product.isFlashDeal && (
          <div className="absolute top-3 left-3 mt-7">
            <Badge variant="flash" size="sm">
              ⚡ Flash Deal
            </Badge>
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 glass px-2 py-1 rounded-full">
          <ZoomIn size={10} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">
            Pinch to zoom
          </span>
        </div>
      </div>

      {/* Wishlist button */}
      <motion.button
        data-ocid="product.wishlist_button"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={onToggleWishlist}
        whileTap={{ scale: 0.85 }}
        className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-smooth"
      >
        <Heart
          size={16}
          fill={wishlisted ? "oklch(0.72 0.26 90)" : "none"}
          style={{ color: wishlisted ? "oklch(0.72 0.26 90)" : "currentColor" }}
        />
      </motion.button>

      {/* Share button */}
      <button
        type="button"
        data-ocid="product.share_button"
        aria-label="Share product"
        className="absolute top-14 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110"
      >
        <Share2 size={14} className="text-muted-foreground" />
      </button>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              type="button"
              key={img}
              data-ocid={`product.thumbnail.${i + 1}`}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-smooth",
                i === activeIdx
                  ? "border-primary shadow-glow-teal"
                  : "border-border opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={img}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StockIndicator({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
        <span className="text-sm text-red-400 font-medium">Out of Stock</span>
      </div>
    );
  }
  if (stock < 5) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
        <span className="text-sm text-green-400">In Stock</span>
        <span
          className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
          style={{
            color: "oklch(0.72 0.26 90)",
            background: "oklch(0.72 0.26 90 / 0.12)",
          }}
        >
          Only {stock} left!
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
      <span className="text-sm text-green-400">In Stock</span>
    </div>
  );
}

function SpecsTable({ specs }: { specs: Product["specifications"] }) {
  if (!specs.length) return null;
  return (
    <div className="card-premium overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Specifications
        </h3>
      </div>
      <div>
        {specs.map((spec, specIdx) => (
          <div
            key={spec.label}
            className={cn(
              "grid grid-cols-2 gap-2 px-4 py-2.5 text-xs",
              specIdx % 2 === 0 ? "bg-muted/20" : "bg-transparent",
            )}
          >
            <span className="text-muted-foreground font-medium">
              {spec.label}
            </span>
            <span className="text-foreground font-medium">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuantitySelector({
  quantity,
  stock,
  onDecrement,
  onIncrement,
}: {
  quantity: number;
  stock: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center gap-0">
      <button
        type="button"
        data-ocid="product.qty_minus"
        onClick={onDecrement}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className={cn(
          "w-9 h-9 rounded-l-lg border border-r-0 flex items-center justify-center transition-smooth",
          quantity <= 1
            ? "border-border text-muted-foreground/40 cursor-not-allowed"
            : "border-primary/40 text-primary hover:bg-primary/10",
        )}
      >
        <Minus size={14} />
      </button>
      <div className="w-12 h-9 border border-primary/40 flex items-center justify-center text-sm font-semibold text-foreground">
        {quantity}
      </div>
      <button
        type="button"
        data-ocid="product.qty_plus"
        onClick={onIncrement}
        disabled={quantity >= stock}
        aria-label="Increase quantity"
        className={cn(
          "w-9 h-9 rounded-r-lg border border-l-0 flex items-center justify-center transition-smooth",
          quantity >= stock
            ? "border-border text-muted-foreground/40 cursor-not-allowed"
            : "border-primary/40 text-primary hover:bg-primary/10",
        )}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const total = reviews.length || 1;

  return (
    <div className="space-y-1.5">
      {counts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-4 text-right">
            {star}
          </span>
          <Star
            size={10}
            fill="oklch(0.72 0.26 90)"
            style={{ color: "oklch(0.72 0.26 90)" }}
          />
          <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "oklch(0.72 0.26 90)" }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(count / total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (5 - star) * 0.06 }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground w-4">{count}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      data-ocid={`product.review.${index + 1}`}
      className="card-premium p-3 space-y-1.5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: "oklch(0.675 0.25 178 / 0.15)",
              color: "oklch(0.675 0.25 178)",
            }}
          >
            {review.userName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {review.userName}
            </p>
            <p className="text-[10px] text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <RatingStars rating={review.rating} size={11} />
          {review.verified && (
            <Badge variant="success" size="sm">
              ✓ Verified
            </Badge>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {review.comment}
      </p>
    </motion.div>
  );
}

function WriteReviewForm({
  onSubmit,
}: { onSubmit: (rating: number, comment: string) => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="card-premium p-3 space-y-3">
      <h4 className="text-sm font-semibold text-foreground">Write a Review</h4>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Your Rating</p>
        <RatingStars
          data-ocid="product.review_rating"
          rating={rating}
          size={22}
          interactive
          onRate={setRating}
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="review-comment"
          className="text-xs text-muted-foreground"
        >
          Your Review
        </label>
        <textarea
          id="review-comment"
          data-ocid="product.review_textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={3}
          className="w-full bg-muted/20 border border-input rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-smooth"
        />
      </div>
      <button
        type="submit"
        data-ocid="product.review_submit"
        className="w-full py-2 rounded-lg text-xs font-semibold transition-smooth"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
          color: "oklch(0.08 0 0)",
        }}
      >
        Submit Review
      </button>
    </form>
  );
}

function SimilarProducts({
  currentId,
  category,
}: {
  currentId: string;
  category: string;
}) {
  const navigate = useNavigate();
  const products = getProductsByCategory(category)
    .filter((p) => p.id !== currentId)
    .slice(0, 6);

  if (!products.length) {
    const others = sampleProducts.filter((p) => p.id !== currentId).slice(0, 4);
    if (!others.length) return null;
    return <SimilarProductsList products={others} navigate={navigate} />;
  }

  return <SimilarProductsList products={products} navigate={navigate} />;
}

function SimilarProductsList({
  products,
  navigate,
}: {
  products: Product[];
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground px-4">
        Similar Products
      </h3>
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {products.map((p, i) => (
          <motion.button
            key={p.id}
            data-ocid={`product.similar.${i + 1}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() =>
              navigate({ to: "/product/$id", params: { id: p.id } })
            }
            className="flex-shrink-0 w-32 card-premium overflow-hidden text-left transition-smooth hover:scale-[1.02]"
          >
            <div className="led-strip rounded-xl overflow-hidden">
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-24 object-cover"
              />
              <div className="p-2">
                <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight">
                  {p.name}
                </p>
                <p
                  className="text-[11px] font-bold mt-1"
                  style={{ color: "oklch(0.675 0.25 178)" }}
                >
                  {formatINR(p.priceInPaise)}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main ProductPage ──────────────────────────────────────── */

export default function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();

  const product = getProductById(id);

  const { addItem, isInCart } = useCart();
  const { toggle, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [localReviews, setLocalReviews] = useState<Review[]>(
    product?.reviews ?? [],
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
        <p className="text-4xl">🔍</p>
        <h2 className="text-lg font-semibold text-foreground">
          Product not found
        </h2>
        <p className="text-sm text-muted-foreground">
          This product doesn't exist or has been removed.
        </p>
        <button
          type="button"
          data-ocid="product.back_button"
          onClick={() => navigate({ to: "/" })}
          className="btn-premium text-sm"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `Qty: ${quantity} · ${formatINR(product.priceInPaise * quantity)}`,
    });
  };

  const handleToggleWishlist = () => {
    toggle(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ♥", {
      style: {
        background: "oklch(0.12 0 0)",
        color: "oklch(0.95 0 0)",
        border: "1px solid oklch(0.25 0 0)",
      },
    });
  };

  const handleNotifyMe = () => {
    toast.success("You'll be notified when back in stock!", {
      icon: "🔔",
    });
  };

  const handleAddToCompare = () => {
    if (product) {
      addToCompare(product.id);
    }
    toast.info("Added to comparison list", { icon: "⚖️" });
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    const newReview: Review = {
      id: `r-${Date.now()}`,
      userId: "guest",
      userName: "You",
      rating,
      comment,
      date: new Date().toISOString().slice(0, 10),
      verified: false,
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    toast.success("Review submitted!");
  };

  const avgRating =
    localReviews.length > 0
      ? localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length
      : product.rating;

  return (
    <motion.div
      className="flex flex-col pb-28"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Back nav */}
      <div className="sticky top-0 z-20 glass px-3 py-2 flex items-center gap-2 border-b border-border/30">
        <button
          type="button"
          data-ocid="product.back_button"
          onClick={() => navigate({ to: "/" })}
          aria-label="Go back"
          className="w-8 h-8 rounded-full hover:bg-muted/40 flex items-center justify-center transition-smooth"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <h1 className="flex-1 text-sm font-semibold text-foreground truncate min-w-0">
          {product.name}
        </h1>
        <button
          type="button"
          data-ocid="product.cart_nav_button"
          onClick={() => navigate({ to: "/cart" })}
          aria-label="Go to cart"
          className="w-8 h-8 rounded-full hover:bg-muted/40 flex items-center justify-center transition-smooth"
        >
          <ShoppingCart size={16} className="text-primary" />
        </button>
      </div>

      {/* Gallery */}
      <GallerySection
        product={product}
        wishlisted={wishlisted}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Product info */}
      <div className="px-4 pt-4 space-y-3">
        {/* Category + Brand badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="teal" size="sm">
            {product.category}
          </Badge>
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="muted" size="sm">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Name */}
        <h2 className="text-lg font-bold text-foreground leading-snug">
          {product.name}
        </h2>

        {/* Rating row */}
        <div className="flex items-center gap-3">
          <RatingStars
            rating={avgRating}
            size={14}
            showValue
            showCount={product.reviewCount + localReviews.length}
          />
        </div>

        {/* Price */}
        <PriceTag
          priceInPaise={product.priceInPaise}
          originalPriceInPaise={product.originalPriceInPaise}
          size="xl"
          showDiscount
        />

        {/* Stock */}
        <StockIndicator stock={product.stock} />

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {/* Divider */}
        <div className="section-divider" />

        {/* Quantity + CTA */}
        {!outOfStock && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Qty:</span>
            <QuantitySelector
              quantity={quantity}
              stock={product.stock}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
              onIncrement={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
            />
          </div>
        )}
      </div>

      {/* Specs */}
      <div className="px-4 pt-3">
        <SpecsTable specs={product.specifications} />
      </div>

      {/* Reviews */}
      <div className="px-4 pt-4 space-y-3">
        <div className="section-divider" />
        <h3 className="text-sm font-semibold text-foreground">
          Reviews ({localReviews.length})
        </h3>

        {localReviews.length > 0 && (
          <div className="card-premium p-3 flex gap-4">
            <div className="text-center">
              <p
                className="text-3xl font-black"
                style={{ color: "oklch(0.72 0.26 90)" }}
              >
                {avgRating.toFixed(1)}
              </p>
              <RatingStars rating={avgRating} size={12} />
              <p className="text-[10px] text-muted-foreground mt-1">
                {localReviews.length} reviews
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <RatingBreakdown reviews={localReviews} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          {localReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
          {localReviews.length === 0 && (
            <div
              data-ocid="product.reviews_empty_state"
              className="text-center py-6 text-muted-foreground text-sm"
            >
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>

        <WriteReviewForm onSubmit={handleReviewSubmit} />
      </div>

      {/* Similar products */}
      <div className="pt-4">
        <div className="section-divider mx-4 mb-4" />
        <SimilarProducts currentId={product.id} category={product.category} />
      </div>

      {/* ── Fixed bottom CTA ─────────────────────────────────── */}
      <div
        className="fixed bottom-[64px] left-0 right-0 z-30 px-4 pb-3 pt-2 glass border-t border-border/30 space-y-2"
        style={{ maxWidth: "430px", margin: "0 auto" }}
      >
        {outOfStock ? (
          <div className="space-y-2">
            <button
              type="button"
              data-ocid="product.out_of_stock_button"
              disabled
              className="w-full py-3.5 rounded-xl text-sm font-bold opacity-40 cursor-not-allowed"
              style={{
                background: "oklch(0.22 0 0)",
                color: "oklch(0.55 0 0)",
                border: "1px solid oklch(0.3 0 0)",
              }}
            >
              OUT OF STOCK
            </button>
            <button
              type="button"
              data-ocid="product.notify_me_button"
              onClick={handleNotifyMe}
              className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-smooth hover:scale-[1.02]"
              style={{
                background: "oklch(0.72 0.26 90 / 0.12)",
                color: "oklch(0.72 0.26 90)",
                border: "1px solid oklch(0.72 0.26 90 / 0.35)",
              }}
            >
              <Bell size={15} />
              Notify Me When Back in Stock
            </button>
          </div>
        ) : (
          <motion.button
            data-ocid="product.add_to_cart_button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-smooth shadow-glow-teal"
            style={{
              background: inCart
                ? "linear-gradient(135deg, oklch(0.6 0.25 200), oklch(0.55 0.2 220))"
                : "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
              color: "oklch(0.08 0 0)",
            }}
          >
            <ShoppingCart size={16} />
            {inCart ? "UPDATE CART" : "ADD TO CART"}
          </motion.button>
        )}

        {/* Compare chip */}
        <div className="flex justify-center">
          <button
            type="button"
            data-ocid="product.compare_button"
            onClick={handleAddToCompare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-smooth hover:bg-muted/30"
            style={{
              color: "oklch(0.55 0 0)",
              border: "1px solid oklch(0.3 0 0)",
            }}
          >
            <GitCompare size={12} />
            Add to Compare
          </button>
        </div>
      </div>
    </motion.div>
  );
}
