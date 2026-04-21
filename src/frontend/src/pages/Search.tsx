import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Heart,
  Mic,
  MicOff,
  Search as SearchIcon,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LEDBorderCard } from "../components/LEDBorderCard";
import { formatINR } from "../components/PriceTag";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useNotifications } from "../context/NotificationContext";
import { useWishlist } from "../context/WishlistContext";
import type { ProductCategory } from "../types";

type SortOption = "relevance" | "price_asc" | "price_desc" | "rating";
type PriceFilter = "all" | "under1k" | "1k_5k" | "over5k";

const categories: Array<{ id: ProductCategory | "All"; label: string }> = [
  { id: "All", label: "All" },
  { id: "Electronics", label: "Electronics" },
  { id: "Fashion", label: "Fashion" },
  { id: "Home", label: "Home" },
  { id: "Beauty", label: "Beauty" },
  { id: "Sports", label: "Sports" },
  { id: "Jewelry", label: "Jewelry" },
];

const sortOptions: Array<{ id: SortOption; label: string }> = [
  { id: "relevance", label: "Relevance" },
  { id: "price_asc", label: "Price: Low–High" },
  { id: "price_desc", label: "Price: High–Low" },
  { id: "rating", label: "Top Rated" },
];

const priceFilters: Array<{ id: PriceFilter; label: string }> = [
  { id: "all", label: "All Prices" },
  { id: "under1k", label: "Under ₹1,000" },
  { id: "1k_5k", label: "₹1,000–₹5,000" },
  { id: "over5k", label: "Over ₹5,000" },
];

interface VoiceRecognition extends EventTarget {
  lang: string;
  onresult: ((e: VoiceSpeechEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}
interface VoiceSpeechEvent extends Event {
  results: SpeechRecognitionResultList;
}

const voiceBars = [
  { id: "b1", h: 3 },
  { id: "b2", h: 5 },
  { id: "b3", h: 7 },
  { id: "b4", h: 4 },
  { id: "b5", h: 6 },
];

// ─── UpdatingIndicator ────────────────────────────────────────────────────────
function UpdatingBadge({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span
      className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
      style={{
        background: "oklch(0.675 0.25 178 / 0.12)",
        color: "oklch(0.675 0.25 178 / 0.9)",
        border: "1px solid oklch(0.675 0.25 178 / 0.25)",
      }}
      aria-live="polite"
      data-ocid="search.updating_indicator"
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

export default function SearchPage() {
  const searchParams = useSearch({ from: "/search" });
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem, isInCart } = useCart();
  const { toggle: toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useNotifications();
  const { products, isUpdating } = useData();

  const [query, setQuery] = useState(searchParams.q ?? "");
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "All"
  >((searchParams.category as ProductCategory) || "All");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isListening, setIsListening] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<VoiceRecognition | null>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const startVoiceSearch = useCallback(() => {
    const SpeechRecCtor = (window.SpeechRecognition ||
      window.webkitSpeechRecognition) as
      | (new () => VoiceRecognition)
      | undefined;
    if (!SpeechRecCtor) {
      showToast("error", "Voice search not supported on this device");
      return;
    }
    const recognition = new SpeechRecCtor();
    recognition.lang = "en-IN";
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript ?? "";
      setQuery(transcript);
    };
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  }, [showToast]);

  const stopVoiceSearch = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const results = useMemo(() => {
    let filtered = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (priceFilter === "under1k") {
      filtered = filtered.filter((p) => p.priceInPaise < 100000);
    } else if (priceFilter === "1k_5k") {
      filtered = filtered.filter(
        (p) => p.priceInPaise >= 100000 && p.priceInPaise <= 500000,
      );
    } else if (priceFilter === "over5k") {
      filtered = filtered.filter((p) => p.priceInPaise > 500000);
    }

    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.priceInPaise - b.priceInPaise);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.priceInPaise - a.priceInPaise);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [query, selectedCategory, priceFilter, sortBy, products]);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    addItem(product, 1);
    showToast("success", t("addedToCart"));
  };

  const handleToggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const inWl = isInWishlist(productId);
    toggleWishlist(product);
    showToast("info", inWl ? t("removedFromWishlist") : t("addedToWishlist"));
  };

  const goToProduct = (id: string) =>
    navigate({ to: "/product/$id", params: { id } });

  return (
    <div className="flex flex-col h-full fade-in">
      {/* Search Bar */}
      <div
        className="px-3 pt-3 pb-2 sticky top-0 z-20"
        style={{
          background: "oklch(0.08 0 0 / 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{
            background: "oklch(0.12 0 0)",
            border: "1px solid oklch(0.25 0 0)",
          }}
        >
          <SearchIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            data-ocid="search.search_input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
          />
          {query && (
            <button
              type="button"
              data-ocid="search.clear_button"
              onClick={() => setQuery("")}
              className="flex-shrink-0 transition-smooth hover:opacity-70"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          <button
            type="button"
            data-ocid="search.voice_button"
            onClick={isListening ? stopVoiceSearch : startVoiceSearch}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-smooth"
            style={
              isListening
                ? {
                    background: "oklch(0.675 0.25 178)",
                    color: "oklch(0.08 0 0)",
                  }
                : {
                    background: "oklch(0.675 0.25 178 / 0.1)",
                    color: "oklch(0.675 0.25 178)",
                  }
            }
            aria-label={
              isListening ? "Stop voice search" : "Start voice search"
            }
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </div>
        {isListening && (
          <div className="flex items-center gap-2 mt-2 px-1">
            <div className="flex gap-0.5 items-end h-4">
              {voiceBars.map((bar) => (
                <div
                  key={bar.id}
                  className="w-1 rounded-full"
                  style={{
                    height: `${bar.h * 2}px`,
                    background: "oklch(0.675 0.25 178)",
                    animation: "scale-pulse 0.6s ease-in-out infinite",
                  }}
                />
              ))}
            </div>
            <span
              className="text-xs"
              style={{ color: "oklch(0.675 0.25 178)" }}
            >
              Listening...
            </span>
          </div>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="px-3 pb-2">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              data-ocid={`search.category.${cat.id.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat.id)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth hover:scale-105"
              style={
                selectedCategory === cat.id
                  ? {
                      background: "oklch(0.675 0.25 178)",
                      color: "oklch(0.08 0 0)",
                    }
                  : {
                      background: "oklch(0.14 0 0)",
                      color: "oklch(0.6 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                    }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter Chips */}
      <div className="px-3 pb-2">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {priceFilters.map((pf) => (
            <button
              type="button"
              key={pf.id}
              data-ocid={`search.price_filter.${pf.id}`}
              onClick={() => setPriceFilter(pf.id)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth hover:scale-105"
              style={
                priceFilter === pf.id
                  ? {
                      background: "oklch(0.72 0.26 90)",
                      color: "oklch(0.08 0 0)",
                    }
                  : {
                      background: "oklch(0.14 0 0)",
                      color: "oklch(0.6 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                    }
              }
            >
              {pf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + Result Count + Updating indicator */}
      <div className="px-3 pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-muted-foreground truncate">
            {results.length} result{results.length !== 1 ? "s" : ""}
            {query ? ` for "${query}"` : ""}
          </span>
          <UpdatingBadge visible={isUpdating} />
        </div>
        <div
          className="flex gap-1.5 overflow-x-auto flex-shrink-0"
          style={{ scrollbarWidth: "none" }}
        >
          {sortOptions.map((s) => (
            <button
              type="button"
              key={s.id}
              data-ocid={`search.sort.${s.id}`}
              onClick={() => setSortBy(s.id)}
              className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-smooth"
              style={
                sortBy === s.id
                  ? {
                      background: "oklch(0.675 0.25 178 / 0.15)",
                      color: "oklch(0.675 0.25 178)",
                      border: "1px solid oklch(0.675 0.25 178 / 0.4)",
                    }
                  : {
                      background: "oklch(0.14 0 0)",
                      color: "oklch(0.5 0 0)",
                      border: "1px solid oklch(0.2 0 0)",
                    }
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {results.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="search.empty_state"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "oklch(0.675 0.25 178 / 0.1)",
                border: "1px solid oklch(0.675 0.25 178 / 0.2)",
              }}
            >
              <SearchIcon
                className="w-8 h-8"
                style={{ color: "oklch(0.675 0.25 178 / 0.5)" }}
              />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              {t("noResults")}
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs">
              Try different keywords or explore our categories.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["iPhone", "Gold Ring", "Saree", "Sneakers"].map(
                (suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-smooth hover:scale-105"
                    style={{
                      background: "oklch(0.675 0.25 178 / 0.08)",
                      color: "oklch(0.675 0.25 178)",
                      border: "1px solid oklch(0.675 0.25 178 / 0.25)",
                    }}
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((product, idx) => {
              const inCart = isInCart(product.id);
              const inWl = isInWishlist(product.id);
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
                <div key={product.id} data-ocid={`search.item.${idx + 1}`}>
                  <LEDBorderCard className="flex flex-col">
                    <div className="relative">
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
                      {product.isFlashDeal && !discountPercent && (
                        <span
                          className="absolute top-2 left-2 z-30 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{
                            background: "oklch(0.65 0.19 22)",
                            color: "#fff",
                          }}
                        >
                          ⚡ Deal
                        </span>
                      )}
                      <button
                        type="button"
                        data-ocid={`search.wishlist_toggle.${idx + 1}`}
                        onClick={() => handleToggleWishlist(product.id)}
                        className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                        style={{
                          background: "oklch(0.08 0 0 / 0.8)",
                          border: "1px solid oklch(0.3 0 0)",
                        }}
                        aria-label={
                          inWl ? "Remove from wishlist" : "Add to wishlist"
                        }
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          style={{
                            color: inWl
                              ? "oklch(0.72 0.26 90)"
                              : "oklch(0.55 0 0)",
                          }}
                          fill={inWl ? "oklch(0.72 0.26 90)" : "transparent"}
                        />
                      </button>

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
                          product.originalPriceInPaise >
                            product.priceInPaise && (
                            <p className="text-[10px] text-muted-foreground line-through">
                              {formatINR(product.originalPriceInPaise)}
                            </p>
                          )}
                      </div>

                      <button
                        type="button"
                        data-ocid={`search.add_to_cart.${idx + 1}`}
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
        )}
      </div>
    </div>
  );
}
