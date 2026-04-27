import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  Banner as BackendBanner,
  Product as BackendProduct,
} from "../backend.d";
import { useBackendActor } from "../hooks/useBackendActor";
import type { Banner, Product, ProductCategory } from "../types";

// ─── Converters ──────────────────────────────────────────────────────────────

const VALID_CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Jewelry",
];

export function toFrontendProduct(p: BackendProduct): Product {
  const category = VALID_CATEGORIES.includes(p.category as ProductCategory)
    ? (p.category as ProductCategory)
    : "Electronics";

  const price = Number(p.price);
  const originalPrice = Number(p.originalPrice);

  return {
    id: p.id.toString(),
    name: p.name,
    description: p.description,
    category,
    priceInPaise: price,
    originalPriceInPaise: originalPrice > price ? originalPrice : undefined,
    images: p.images.map((img) => img.getDirectURL()),
    rating: p.rating,
    reviewCount: Number(p.reviewCount),
    stock: Number(p.stock),
    specifications: p.specifications.map((s) => ({
      label: s.key,
      value: s.value,
    })),
    reviews: [],
    tags: [...p.tags],
    isFlashDeal: p.isFlashDeal,
    isFeatured: p.isTrending,
    discount:
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : undefined,
  };
}

export function toFrontendBanner(b: BackendBanner): Banner {
  return {
    id: b.id.toString(),
    title: b.title,
    subtitle: b.subtitle,
    imageUrl: b.image.getDirectURL(),
    ctaLabel: "Shop Now",
    ctaLink: b.linkUrl,
  };
}

// ─── Context types ────────────────────────────────────────────────────────────

interface DataContextValue {
  products: Product[];
  banners: Banner[];
  flashDeals: Product[];
  trendingProducts: Product[];
  isUpdating: boolean;
  refetch: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

// ─── Inner Provider (has access to actor) ─────────────────────────────────────

function DataProviderInner({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useBackendActor();
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    if (!isMounted.current) return;
    // Don't try to fetch until actor is ready
    if (!actor || isFetching) return;

    setIsUpdating(true);
    try {
      const [backendProducts, backendBanners] = await Promise.all([
        actor.getProducts(),
        actor.getBanners(),
      ]);

      if (!isMounted.current) return;

      // Always update from backend — even if empty (removes stale data)
      setProducts(backendProducts.map(toFrontendProduct));
      setBanners(
        backendBanners
          .filter((b) => b.isActive)
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map(toFrontendBanner),
      );
    } catch (err) {
      // Keep existing data on error; silently log
      console.warn("[DataContext] fetch failed:", err);
    } finally {
      if (isMounted.current) setIsUpdating(false);
    }
  }, [actor, isFetching]);

  // Initial fetch + 5-second polling
  useEffect(() => {
    isMounted.current = true;
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [fetchData]);

  const flashDeals = products.filter((p) => p.isFlashDeal);
  const trendingProducts = products.filter((p) => p.isFeatured);

  return (
    <DataContext.Provider
      value={{
        products,
        banners,
        flashDeals,
        trendingProducts,
        isUpdating,
        refetch: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// ─── Public Provider ──────────────────────────────────────────────────────────

export function DataProvider({ children }: { children: ReactNode }) {
  return <DataProviderInner>{children}</DataProviderInner>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
