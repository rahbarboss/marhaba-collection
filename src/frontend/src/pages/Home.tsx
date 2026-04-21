import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Mic,
  MicOff,
  RefreshCw,
  Search,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LEDBorderCard } from "../components/LEDBorderCard";
import { PriceTag } from "../components/PriceTag";
import { RatingStars } from "../components/RatingStars";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useNotifications } from "../context/NotificationContext";
import { useWishlist } from "../context/WishlistContext";
import { sampleCategories } from "../data/sampleProducts";
import type { Product } from "../types";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(targetMs: number) {
  const calc = () => Math.max(0, targetMs - Date.now());
  const [remaining, setRemaining] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setRemaining(calc()), 1000);
    return () => clearInterval(id);
  });
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

// ─── UpdatingIndicator ────────────────────────────────────────────────────────
function UpdatingIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span
      className="flex items-center gap-1 text-[10px] font-medium"
      style={{ color: "oklch(0.675 0.25 178 / 0.85)" }}
      aria-live="polite"
      data-ocid="home.updating_indicator"
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{
          background: "oklch(0.675 0.25 178)",
          animation: "scale-pulse 1s ease-in-out infinite",
        }}
      />
      Updating…
    </span>
  );
}

// ─── SearchBar ────────────────────────────────────────────────────────────────
function SearchBar({ isUpdating }: { isUpdating: boolean }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const handleChange = (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        void navigate({ to: "/search", search: { q: val, category: "" } });
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      void navigate({ to: "/search", search: { q: query, category: "" } });
    }
  };

  const toggleVoice = () => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0]?.[0]?.transcript ?? "";
      setQuery(transcript);
      setListening(false);
      if (transcript.trim()) {
        void navigate({
          to: "/search",
          search: { q: transcript, category: "" },
        });
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 pb-3"
      data-ocid="home.search_form"
    >
      <div
        className="flex items-center gap-2 bg-muted/60 rounded-2xl px-4 py-2.5 border transition-smooth"
        style={{
          borderColor: listening ? "oklch(0.675 0.25 178)" : "oklch(0.25 0 0)",
          boxShadow: listening
            ? "0 0 0 3px oklch(0.675 0.25 178 / 0.25)"
            : undefined,
        }}
      >
        <Search size={16} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          data-ocid="home.search_input"
        />
        {/* Updating indicator inline with search bar */}
        <UpdatingIndicator visible={isUpdating} />
        <button
          type="button"
          onClick={toggleVoice}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
            listening ? "bg-primary/20" : "hover:bg-muted"
          }`}
          aria-label={listening ? "Stop voice search" : "Start voice search"}
          data-ocid="home.voice_search_button"
        >
          {listening ? (
            <MicOff size={15} style={{ color: "oklch(0.675 0.25 178)" }} />
          ) : (
            <Mic size={15} className="text-muted-foreground" />
          )}
        </button>
      </div>
    </form>
  );
}

// ─── HeroBanner ───────────────────────────────────────────────────────────────
function HeroBanner() {
  const navigate = useNavigate();
  const { banners } = useData();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Reset current index if banners count changes
  useEffect(() => {
    if (current >= banners.length) setCurrent(0);
  }, [banners.length, current]);

  useEffect(() => {
    if (isPaused || banners.length === 0) return;
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      3000,
    );
    return () => clearInterval(id);
  }, [isPaused, banners.length]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const prev = () => goTo((current - 1 + banners.length) % banners.length);
  const next = () => goTo((current + 1) % banners.length);

  const banner = banners[current];

  if (!banners.length) return null;

  return (
    <div
      className="relative mx-4 mb-4 rounded-2xl overflow-hidden"
      style={{ aspectRatio: "16/7" }}
      data-ocid="home.hero_banner"
    >
      {/* Background image with smooth transition */}
      {banners.map((b, i) => (
        <div
          key={b.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={b.imageUrl}
            alt={b.title}
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${b.bgColor ?? "from-[#0f2a2a] to-[#0f172a]"} opacity-80`}
          />
        </div>
      ))}

      {/* Content overlay */}
      {banner && (
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "oklch(0.72 0.26 90)" }}
          >
            {banner.subtitle}
          </p>
          <h2 className="text-xl font-display font-bold text-foreground mb-3 leading-tight">
            {banner.title}
          </h2>
          <button
            type="button"
            onClick={() => void navigate({ to: banner.ctaLink as "/" })}
            className="btn-premium self-start text-xs py-2 px-5"
            data-ocid="home.hero_cta_button"
          >
            {banner.ctaLabel}
          </button>
        </div>
      )}

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full glass flex items-center justify-center"
        aria-label="Previous banner"
        data-ocid="home.hero_prev_button"
      >
        <ChevronLeft size={14} className="text-foreground" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full glass flex items-center justify-center"
        aria-label="Next banner"
        data-ocid="home.hero_next_button"
      >
        <ChevronRight size={14} className="text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {banners.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Banner ${i + 1}`}
            data-ocid={`home.hero_dot.${i + 1}`}
            className="transition-smooth rounded-full"
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              background:
                i === current ? "oklch(0.72 0.26 90)" : "oklch(0.5 0 0 / 0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── CategoriesRow ────────────────────────────────────────────────────────────
function CategoriesRow() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const categories = sampleCategories;

  const handleCategory = (cat: (typeof categories)[number]) => {
    setActiveId(cat.id);
    void navigate({
      to: "/search",
      search: { q: "", category: cat.name },
    });
  };

  return (
    <section className="mb-5" data-ocid="home.categories_section">
      <div className="flex items-center justify-between px-4 mb-3">
        <h3 className="text-sm font-display font-bold text-foreground">
          {t("categories")}
        </h3>
      </div>
      <div className="flex gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-hide no-scrollbar">
        {categories.map((cat, i) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat)}
              data-ocid={`home.category.${i + 1}`}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 transition-smooth"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-smooth"
                style={{
                  background: isActive
                    ? "oklch(0.675 0.25 178 / 0.2)"
                    : "oklch(0.15 0 0)",
                  border: `1.5px solid ${isActive ? "oklch(0.675 0.25 178)" : "oklch(0.25 0 0)"}`,
                  boxShadow: isActive
                    ? "0 0 12px oklch(0.675 0.25 178 / 0.3)"
                    : undefined,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                }}
              >
                {cat.icon}
              </div>
              <span
                className="text-[10px] font-medium whitespace-nowrap"
                style={{
                  color: isActive ? "oklch(0.675 0.25 178)" : "oklch(0.6 0 0)",
                }}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─── FlashDealTimer ───────────────────────────────────────────────────────────
function FlashDealTimer({ endsAt }: { endsAt: number }) {
  const { h, m, s } = useCountdown(endsAt);
  return (
    <div className="flex items-center gap-1">
      {(["h", "m", "s"] as const).map((label, i) => {
        const unit = label === "h" ? h : label === "m" ? m : s;
        return (
          <span key={label}>
            <span
              className="inline-flex items-center justify-center w-7 h-6 rounded-md text-xs font-mono font-bold"
              style={{
                background: "oklch(0.72 0.26 90 / 0.15)",
                color: "oklch(0.72 0.26 90)",
                border: "1px solid oklch(0.72 0.26 90 / 0.3)",
              }}
            >
              {unit}
            </span>
            {i < 2 && (
              <span
                className="mx-0.5 font-bold text-xs"
                style={{ color: "oklch(0.72 0.26 90)" }}
              >
                :
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  size?: "sm" | "md";
  index: number;
}

function ProductCard({ product, size = "md", index }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const { showToast } = useNotifications();
  const { t } = useLanguage();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product, 1);
    showToast("success", t("addedToCart"));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(product);
    showToast(
      "info",
      inWishlist ? t("removedFromWishlist") : t("addedToWishlist"),
    );
  };

  const isSmall = size === "sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      data-ocid={`home.product.${index}`}
    >
      <LEDBorderCard
        onClick={() =>
          void navigate({ to: "/product/$id", params: { id: product.id } })
        }
        glowIntensity="medium"
        animationDuration={3 + (index % 3) * 0.5}
        className={isSmall ? "w-32" : "w-full"}
      >
        <div className="relative">
          {/* Product image */}
          <div
            className="relative overflow-hidden rounded-t-[10px]"
            style={{ aspectRatio: isSmall ? "1/1" : "4/3" }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Discount badge */}
            {product.discount && (
              <span
                className="absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.72 0.26 90 / 0.9)",
                  color: "oklch(0.1 0 0)",
                }}
              >
                -{product.discount}%
              </span>
            )}
            {/* Flash deal badge */}
            {product.isFlashDeal && (
              <span
                className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                style={{
                  background: "oklch(0.65 0.25 16 / 0.9)",
                  color: "oklch(0.98 0 0)",
                }}
              >
                <Zap size={8} fill="currentColor" />
                FLASH
              </span>
            )}
            {/* Wishlist button */}
            <button
              type="button"
              onClick={handleWishlist}
              className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full glass flex items-center justify-center transition-smooth hover:scale-110"
              aria-label={
                inWishlist ? t("removeFromWishlist") : t("addToWishlist")
              }
              data-ocid={`home.wishlist_button.${index}`}
            >
              <Heart
                size={14}
                fill={inWishlist ? "oklch(0.72 0.26 90)" : "transparent"}
                style={{
                  color: inWishlist ? "oklch(0.72 0.26 90)" : "oklch(0.6 0 0)",
                }}
              />
            </button>
          </div>

          {/* Product info */}
          <div className={`p-2.5 ${isSmall ? "pb-2" : "pb-3"}`}>
            <p
              className={`font-medium text-foreground truncate mb-1 ${isSmall ? "text-xs" : "text-sm"}`}
            >
              {product.name}
            </p>
            <RatingStars
              rating={product.rating}
              size={isSmall ? 10 : 11}
              showValue
              showCount={isSmall ? undefined : product.reviewCount}
              className="mb-1.5"
            />
            <PriceTag
              priceInPaise={product.priceInPaise}
              originalPriceInPaise={product.originalPriceInPaise}
              size={isSmall ? "sm" : "sm"}
              showDiscount={false}
              className="mb-2"
            />
            {!isSmall && (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full py-1.5 rounded-lg text-xs font-semibold transition-smooth"
                style={{
                  background:
                    product.stock === 0
                      ? "oklch(0.25 0 0)"
                      : "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.6 0.25 200))",
                  color:
                    product.stock === 0 ? "oklch(0.45 0 0)" : "oklch(0.08 0 0)",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                }}
                data-ocid={`home.add_to_cart_button.${index}`}
              >
                {product.stock === 0 ? (
                  <span className="flex items-center justify-center gap-1">
                    {t("outOfStock")}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <ShoppingBag size={11} />
                    {t("addToCart")}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </LEDBorderCard>
    </motion.div>
  );
}

// ─── FlashDeals ───────────────────────────────────────────────────────────────
function FlashDeals() {
  const { t } = useLanguage();
  const { flashDeals } = useData();

  const earliest = flashDeals.reduce(
    (min, p) =>
      p.flashDealEndsAt && p.flashDealEndsAt < min ? p.flashDealEndsAt : min,
    Date.now() + 24 * 3600000,
  );

  if (!flashDeals.length) return null;

  return (
    <section className="mb-5 mx-4" data-ocid="home.flash_deals_section">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3 px-4 py-2.5 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.12), oklch(0.72 0.26 90 / 0.05))",
          border: "1px solid oklch(0.72 0.26 90 / 0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <Zap
            size={16}
            fill="oklch(0.72 0.26 90)"
            style={{ color: "oklch(0.72 0.26 90)" }}
          />
          <span
            className="text-sm font-display font-bold"
            style={{ color: "oklch(0.72 0.26 90)" }}
          >
            {t("flashDeals")}
          </span>
        </div>
        <FlashDealTimer endsAt={earliest} />
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-2 gap-3">
        {flashDeals.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            size="md"
            index={i + 1}
          />
        ))}
      </div>
    </section>
  );
}

// ─── TrendingProducts ─────────────────────────────────────────────────────────
function TrendingProducts() {
  const { t } = useLanguage();
  const { trendingProducts } = useData();

  return (
    <section className="mb-5" data-ocid="home.trending_section">
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🔥</span>
          <h3 className="text-sm font-display font-bold text-foreground">
            {t("trendingProducts")}
          </h3>
        </div>
        <Link
          to="/search"
          search={{ q: "", category: "trending" }}
          className="text-xs font-medium"
          style={{ color: "oklch(0.675 0.25 178)" }}
        >
          {t("viewAll")}
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {trendingProducts.map((product, i) => (
          <div key={product.id} className="flex-shrink-0 w-40">
            <ProductCard product={product} size="md" index={i + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── RecentlyViewed ───────────────────────────────────────────────────────────
function RecentlyViewed({
  products,
}: {
  products: Product[];
}) {
  const { t } = useLanguage();
  if (!products.length) return null;

  return (
    <section className="mb-5" data-ocid="home.recently_viewed_section">
      <div className="flex items-center justify-between px-4 mb-3">
        <h3 className="text-sm font-display font-bold text-foreground">
          {t("recentlyViewed")}
        </h3>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {products.map((product, i) => (
          <div key={product.id} className="flex-shrink-0">
            <ProductCard product={product} size="sm" index={i + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PullToRefresh ────────────────────────────────────────────────────────────
function PullToRefreshIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex items-center justify-center py-2 transition-smooth overflow-hidden"
      style={{
        height: visible ? 40 : 0,
        opacity: visible ? 1 : 0,
      }}
    >
      <RefreshCw
        size={16}
        className="text-primary"
        style={{
          animation: visible ? "spin-slow 1s linear infinite" : undefined,
        }}
      />
      <span className="text-xs text-muted-foreground ml-2">Refreshing…</span>
    </div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { products, isUpdating, refetch } = useData();
  const [refreshing, setRefreshing] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show the first 4 products as "recently viewed"
  const recentlyViewed = products.slice(0, 4);

  const triggerRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 1500);
  }, [refreshing, refetch]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const scrollTop = containerRef.current?.scrollTop ?? 0;
    if (scrollTop === 0) {
      setTouchStart(e.touches[0]?.clientY ?? null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentY = e.touches[0]?.clientY ?? 0;
    if (currentY - touchStart > 60) {
      triggerRefresh();
      setTouchStart(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      data-ocid="home.page"
    >
      {/* Pull-to-refresh indicator */}
      <PullToRefreshIndicator visible={refreshing} />

      {/* Smart Search bar + Updating indicator */}
      <div className="pt-3">
        <SearchBar isUpdating={isUpdating} />
      </div>

      {/* Hero Banner Carousel */}
      <HeroBanner />

      {/* Section divider */}
      <div className="section-divider mx-4 mb-5" />

      {/* Categories */}
      <CategoriesRow />

      {/* Section divider */}
      <div className="section-divider mx-4 mb-5" />

      {/* Flash Deals */}
      <FlashDeals />

      {/* Section divider */}
      <div className="section-divider mx-4 mb-5" />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Section divider */}
      <div className="section-divider mx-4 mb-5" />

      {/* Recently Viewed */}
      <RecentlyViewed products={recentlyViewed} />

      {/* Bottom padding for nav */}
      <div className="h-4" />
    </div>
  );
}
