import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";
import { Layout } from "./components/Layout";
import { LoadingPage } from "./components/LoadingSpinner";
import { PhoneFrame } from "./components/PhoneFrame";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { LanguageProvider } from "./context/LanguageContext";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
import { WishlistProvider } from "./context/WishlistContext";

// Lazy load pages
const HomePage = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/Product"));
const CartPage = lazy(() => import("./pages/Cart"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const OrdersPage = lazy(() => import("./pages/Orders"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetail"));
const AccountPage = lazy(() => import("./pages/Account"));
const WishlistPage = lazy(() => import("./pages/Wishlist"));
const ComparePage = lazy(() => import("./pages/Compare"));
const SearchPage = lazy(() => import("./pages/Search"));
const AdminPage = lazy(() => import("./pages/Admin"));

function AppShell() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <UserProvider>
      <LanguageProvider>
        <DataProvider>
          <CartProvider>
            <WishlistProvider>
              <NotificationProvider>
                <PhoneFrame>
                  <Layout>
                    <Suspense fallback={<LoadingPage />}>
                      <Outlet />
                    </Suspense>
                  </Layout>
                </PhoneFrame>
              </NotificationProvider>
            </WishlistProvider>
          </CartProvider>
        </DataProvider>
      </LanguageProvider>
    </UserProvider>
  );
}

// Route definitions
const rootRoute = createRootRoute({ component: AppShell });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrdersPage,
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: OrderDetailPage,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: WishlistPage,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: ComparePage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) ?? "",
    category: (search.category as string) ?? "",
  }),
  component: SearchPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  ordersRoute,
  orderDetailRoute,
  accountRoute,
  wishlistRoute,
  compareRoute,
  searchRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
