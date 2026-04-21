import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import type { Product, WishlistItem } from "../types";

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

interface WishlistContextValue {
  items: WishlistItem[];
  count: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggle: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction,
): WishlistState {
  switch (action.type) {
    case "ADD":
      if (state.items.some((i) => i.product.id === action.product.id))
        return state;
      return {
        items: [
          ...state.items,
          { product: action.product, addedAt: Date.now() },
        ],
      };
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const addItem = useCallback((product: Product) => {
    dispatch({ type: "ADD", product });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  const toggle = useCallback(
    (product: Product) => {
      if (state.items.some((i) => i.product.id === product.id)) {
        dispatch({ type: "REMOVE", productId: product.id });
      } else {
        dispatch({ type: "ADD", product });
      }
    },
    [state.items],
  );

  const isInWishlist = useCallback(
    (productId: string) => state.items.some((i) => i.product.id === productId),
    [state.items],
  );

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        count: state.items.length,
        addItem,
        removeItem,
        toggle,
        isInWishlist,
        clear,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
