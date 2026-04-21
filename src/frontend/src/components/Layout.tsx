import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ClipboardList,
  Home,
  MessageCircle,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useNotifications } from "../context/NotificationContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();
  const { unreadCount, toasts, dismissToast } = useNotifications();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const isAdmin = location.pathname.startsWith("/admin");

  const navItems = [
    { path: "/", label: t("home"), icon: Home, ocid: "nav.home" },
    {
      path: "/cart",
      label: t("bag"),
      icon: ShoppingBag,
      badge: count,
      ocid: "nav.bag",
    },
    {
      path: "/orders",
      label: t("orders"),
      icon: ClipboardList,
      ocid: "nav.orders",
    },
    { path: "/account", label: t("account"), icon: User, ocid: "nav.account" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate({
        to: "/search",
        search: { q: searchQuery, category: "" },
      });
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  if (isAdmin) {
    return (
      <div className="h-full flex flex-col bg-background overflow-hidden">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden relative">
      {/* Top Header */}
      <header className="flex-shrink-0 bg-card border-b border-border/50 px-4 py-3 z-20 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
              }}
            >
              <span className="text-[#0f172a] font-bold text-sm font-display">
                M
              </span>
            </div>
            <span className="text-foreground font-display font-bold text-lg tracking-tight text-gradient">
              Marhaba Collection
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-smooth"
              aria-label="Search"
              data-ocid="header.search_button"
            >
              <Search size={18} />
            </button>
            <Link
              to="/account"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-smooth"
              aria-label="Notifications"
              data-ocid="header.notifications_button"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Expandable search bar */}
        {showSearch && (
          <form
            onSubmit={handleSearch}
            className="mt-3 flex items-center gap-2 fade-in"
          >
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-muted/50 border border-primary/40 rounded-full pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth"
                data-ocid="header.search_input"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
              data-ocid="header.search_close_button"
            >
              <X size={16} />
            </button>
          </form>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 flex-shrink-0 bg-card border-t border-border/50 z-20">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-smooth group relative ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={item.ocid}
              >
                <div className="relative">
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/919334808340?text=${encodeURIComponent("Hi! I need help with my Rahbar order.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-20 right-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-30 transition-smooth hover:scale-110"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.float_button"
      >
        <MessageCircle size={22} fill="white" color="white" />
      </a>

      {/* Toast notifications */}
      {toasts.length > 0 && (
        <div className="absolute top-16 left-0 right-0 z-50 flex flex-col gap-2 px-4 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-lg fade-in pointer-events-auto ${
                toast.type === "success"
                  ? "bg-primary text-primary-foreground"
                  : toast.type === "error"
                    ? "bg-destructive text-destructive-foreground"
                    : toast.type === "warning"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-card text-card-foreground border border-border"
              }`}
              data-ocid="layout.toast"
            >
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 opacity-70 hover:opacity-100"
                data-ocid="layout.toast_close"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
