import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  ClipboardCopy,
  Crown,
  Heart,
  Info,
  Languages,
  LogOut,
  Moon,
  Scale,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";
import { useNotifications } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";

const WHATSAPP_NUMBER = "919334808340";

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const notifIconMap: Record<string, string> = {
  order: "🚚",
  deal: "⚡",
  priceAlert: "📉",
  reward: "🎁",
  general: "📢",
};

export default function Account() {
  const { user, isLoggedIn, login, logout, isAdmin } = useUser();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, markRead, markAllRead, unreadCount } =
    useNotifications();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const inviteMessage = user
    ? `Join Rahbar using my code ${user.referralCode} and get 100 reward points! https://rahbar.app/invite?ref=${user.referralCode}`
    : "";

  const handleCopyReferral = () => {
    if (!user) return;
    navigator.clipboard.writeText(user.referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareInvite = () => {
    if (navigator.share) {
      navigator
        .share({ title: "Join Rahbar", text: inviteMessage })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(inviteMessage);
    }
    setShowShareModal(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setTimeout(() => {
      const ok = login({
        username: loginForm.username,
        password: loginForm.password,
      });
      if (!ok) setLoginError("Invalid credentials. Please try again.");
      setLoginLoading(false);
    }, 600);
  };

  const closeModal = () => setShowShareModal(false);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-12 fade-in">
        <div className="mb-8 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.675 0.25 178 / 0.2), oklch(0.72 0.26 90 / 0.2))",
              border: "2px solid oklch(0.675 0.25 178 / 0.4)",
            }}
          >
            <span
              className="text-3xl font-bold font-display"
              style={{ color: "oklch(0.675 0.25 178)" }}
            >
              M
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Welcome to Marhaba Collection
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div>
            <label
              htmlFor="login-username"
              className="text-xs text-muted-foreground mb-1 block"
            >
              Email / Username
            </label>
            <input
              id="login-username"
              data-ocid="account.login.input"
              type="text"
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm((f) => ({ ...f, username: e.target.value }))
              }
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
              style={{
                background: "oklch(0.12 0 0)",
                border: "1px solid oklch(0.25 0 0)",
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="text-xs text-muted-foreground mb-1 block"
            >
              Password
            </label>
            <input
              id="login-password"
              data-ocid="account.password.input"
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((f) => ({ ...f, password: e.target.value }))
              }
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
              style={{
                background: "oklch(0.12 0 0)",
                border: "1px solid oklch(0.25 0 0)",
              }}
              required
            />
          </div>
          {loginError && (
            <p
              data-ocid="account.login.error_state"
              className="text-xs"
              style={{ color: "oklch(0.65 0.19 22)" }}
            >
              {loginError}
            </p>
          )}
          <button
            data-ocid="account.login.submit_button"
            type="submit"
            disabled={loginLoading}
            className="btn-premium w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60"
          >
            {loginLoading ? "Signing in..." : t("login")}
          </button>

          {/* Admin Panel Button */}
          <button
            data-ocid="account.admin_panel_login.button"
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-widest transition-smooth hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.15), oklch(0.72 0.26 90 / 0.08))",
              border: "1.5px solid oklch(0.72 0.26 90 / 0.6)",
              color: "oklch(0.72 0.26 90)",
              boxShadow: "0 0 16px oklch(0.72 0.26 90 / 0.15)",
            }}
          >
            ⚙ ADMIN PANEL
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pb-4 fade-in">
      {/* Profile Header */}
      <div
        className="relative px-4 pt-5 pb-5 mx-3 mt-3 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.02 220), oklch(0.12 0 0))",
          border: "1px solid oklch(0.25 0 0)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.675 0.25 178), oklch(0.72 0.26 90))",
              color: "oklch(0.08 0 0)",
            }}
          >
            {user!.avatar ? (
              <img
                src={user!.avatar}
                alt={user!.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user!.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-lg text-foreground truncate">
                {user!.name}
              </h2>
              {isAdmin && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                  style={{
                    background: "oklch(0.72 0.26 90 / 0.15)",
                    color: "oklch(0.72 0.26 90)",
                    border: "1px solid oklch(0.72 0.26 90 / 0.3)",
                  }}
                >
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {user!.email}
            </p>
            {user!.phone && (
              <p className="text-xs text-muted-foreground">{user!.phone}</p>
            )}
          </div>
          <button
            type="button"
            data-ocid="account.edit_profile.button"
            className="flex-shrink-0 p-2 rounded-xl transition-smooth hover:scale-105"
            style={{
              background: "oklch(0.675 0.25 178 / 0.1)",
              border: "1px solid oklch(0.675 0.25 178 / 0.3)",
            }}
            aria-label="Edit profile"
          >
            <User
              className="w-4 h-4"
              style={{ color: "oklch(0.675 0.25 178)" }}
            />
          </button>
        </div>
        <div
          className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
          style={{ background: "oklch(0.675 0.25 178)" }}
        />
      </div>

      {/* Rewards & Referral Card */}
      <div
        className="mx-3 mt-3 rounded-2xl p-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.12), oklch(0.675 0.25 178 / 0.08))",
          border: "1px solid oklch(0.72 0.26 90 / 0.3)",
        }}
        data-ocid="account.rewards.card"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.26 90)" }}
            />
            <span
              className="font-semibold text-sm"
              style={{ color: "oklch(0.72 0.26 90)" }}
            >
              Rewards &amp; Referral
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.72 0.26 90 / 0.15)",
              border: "1px solid oklch(0.72 0.26 90 / 0.3)",
            }}
          >
            <Star
              className="w-3 h-3"
              style={{ color: "oklch(0.72 0.26 90)" }}
              fill="oklch(0.72 0.26 90)"
            />
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(0.72 0.26 90)" }}
            >
              {user!.rewardPoints.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground">pts</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-1.5">
          Your Referral Code
        </p>
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3"
          style={{
            background: "oklch(0.08 0 0 / 0.6)",
            border: "1px solid oklch(0.72 0.26 90 / 0.2)",
          }}
        >
          <span
            className="flex-1 font-mono text-xl font-bold tracking-widest"
            style={{ color: "oklch(0.72 0.26 90)" }}
          >
            {user!.referralCode}
          </span>
          <button
            type="button"
            data-ocid="account.referral.copy_button"
            onClick={handleCopyReferral}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth hover:scale-105"
            style={{
              background: "oklch(0.72 0.26 90 / 0.15)",
              color: "oklch(0.72 0.26 90)",
              border: "1px solid oklch(0.72 0.26 90 / 0.3)",
            }}
          >
            <ClipboardCopy className="w-3 h-3" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="account.invite_friends.button"
            onClick={() => setShowShareModal(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-smooth hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.26 90), oklch(0.65 0.22 75))",
              color: "oklch(0.08 0 0)",
            }}
          >
            <Share2 className="w-4 h-4" />
            {t("inviteFriends")}
          </button>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">Per referral</p>
            <p
              className="text-xs font-bold"
              style={{ color: "oklch(0.72 0.26 90)" }}
            >
              +100 pts
            </p>
          </div>
        </div>
      </div>

      {/* Language Toggle */}
      <div
        className="mx-3 mt-3 rounded-xl px-4 py-3 flex items-center justify-between"
        style={{
          background: "oklch(0.12 0 0)",
          border: "1px solid oklch(0.2 0 0)",
        }}
      >
        <div className="flex items-center gap-3">
          <Languages className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground font-medium">
            {t("language")}
          </span>
        </div>
        <div
          className="flex rounded-lg overflow-hidden"
          style={{ border: "1px solid oklch(0.25 0 0)" }}
          data-ocid="account.language.toggle"
        >
          <button
            type="button"
            data-ocid="account.language.en"
            onClick={() => setLanguage("en")}
            className="px-4 py-1.5 text-xs font-semibold transition-smooth"
            style={{
              background:
                language === "en" ? "oklch(0.675 0.25 178)" : "transparent",
              color: language === "en" ? "oklch(0.08 0 0)" : "oklch(0.55 0 0)",
            }}
          >
            En
          </button>
          <button
            type="button"
            data-ocid="account.language.hi"
            onClick={() => setLanguage("hi")}
            className="px-4 py-1.5 text-xs font-semibold transition-smooth"
            style={{
              background:
                language === "hi" ? "oklch(0.675 0.25 178)" : "transparent",
              color: language === "hi" ? "oklch(0.08 0 0)" : "oklch(0.55 0 0)",
            }}
          >
            हि
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="mx-3 mt-3" data-ocid="account.notifications.section">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2">
            <Bell
              className="w-4 h-4"
              style={{ color: "oklch(0.675 0.25 178)" }}
            />
            <span className="text-sm font-semibold text-foreground">
              {t("notifications")}
            </span>
            {unreadCount > 0 && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{
                  background: "oklch(0.675 0.25 178)",
                  color: "oklch(0.08 0 0)",
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              data-ocid="account.notifications.mark_all_read"
              onClick={markAllRead}
              className="text-xs transition-smooth hover:opacity-80"
              style={{ color: "oklch(0.675 0.25 178)" }}
            >
              Mark all read
            </button>
          )}
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid oklch(0.2 0 0)" }}
        >
          {notifications.length === 0 ? (
            <div
              data-ocid="account.notifications.empty_state"
              className="px-4 py-6 text-center text-muted-foreground text-sm"
              style={{ background: "oklch(0.11 0 0)" }}
            >
              No notifications yet
            </div>
          ) : (
            notifications.slice(0, 4).map((notif, idx) => (
              <button
                type="button"
                key={notif.id}
                data-ocid={`account.notifications.item.${idx + 1}`}
                onClick={() => markRead(notif.id)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left transition-smooth hover:bg-muted/30"
                style={{
                  background: notif.read
                    ? "oklch(0.11 0 0)"
                    : "oklch(0.675 0.25 178 / 0.05)",
                  borderBottom:
                    idx < Math.min(notifications.length, 4) - 1
                      ? "1px solid oklch(0.18 0 0)"
                      : "none",
                }}
              >
                <span className="text-base flex-shrink-0 mt-0.5">
                  {notifIconMap[notif.type] ?? "📢"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!notif.read && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "oklch(0.675 0.25 178)" }}
                        />
                      )}
                      <span className="text-[10px] text-muted-foreground">
                        {formatRelativeTime(notif.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notif.message}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mx-3 mt-3" data-ocid="account.quick_links.section">
        <p className="text-[10px] text-muted-foreground px-1 mb-2 font-semibold uppercase tracking-widest">
          Quick Links
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid oklch(0.2 0 0)" }}
        >
          {[
            {
              icon: ShoppingBag,
              label: t("myOrders"),
              path: "/orders",
              ocid: "account.my_orders.link",
            },
            {
              icon: Heart,
              label: t("wishlist"),
              path: "/wishlist",
              ocid: "account.wishlist.link",
            },
            {
              icon: Scale,
              label: t("compare"),
              path: "/compare",
              ocid: "account.compare.link",
            },
          ].map(({ icon: Icon, label, path, ocid }) => (
            <button
              type="button"
              key={path}
              data-ocid={ocid}
              onClick={() => navigate({ to: path })}
              className="w-full flex items-center gap-3 px-4 py-3.5 transition-smooth hover:bg-muted/30 text-left"
              style={{
                background: "oklch(0.11 0 0)",
                borderBottom: "1px solid oklch(0.18 0 0)",
              }}
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground">{label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
          <a
            data-ocid="account.whatsapp_support.link"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20help%20with%20my%20Rahbar%20order`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 transition-smooth hover:bg-muted/30"
            style={{ background: "oklch(0.11 0 0)" }}
          >
            <SiWhatsapp className="w-4 h-4" style={{ color: "#25D366" }} />
            <span className="flex-1 text-sm text-foreground">
              Help &amp; Support
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Admin Panel */}
      {isAdmin && (
        <div className="mx-3 mt-3">
          <button
            type="button"
            data-ocid="account.admin_panel.button"
            onClick={() => navigate({ to: "/admin" })}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-smooth hover:scale-[1.01]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.26 90 / 0.1), oklch(0.675 0.25 178 / 0.1))",
              border: "1px solid oklch(0.72 0.26 90 / 0.3)",
            }}
          >
            <Crown
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.26 90)" }}
            />
            <span
              className="flex-1 text-sm font-semibold"
              style={{ color: "oklch(0.72 0.26 90)" }}
            >
              {t("adminPanel")}
            </span>
            <ChevronRight
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.26 90)" }}
            />
          </button>
        </div>
      )}

      {/* Settings */}
      <div className="mx-3 mt-3" data-ocid="account.settings.section">
        <p className="text-[10px] text-muted-foreground px-1 mb-2 font-semibold uppercase tracking-widest">
          {t("settings")}
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid oklch(0.2 0 0)" }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3.5"
            style={{
              background: "oklch(0.11 0 0)",
              borderBottom: "1px solid oklch(0.18 0 0)",
            }}
          >
            <Moon className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 text-sm text-foreground">Dark Mode</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.675 0.25 178 / 0.1)",
                color: "oklch(0.675 0.25 178)",
                border: "1px solid oklch(0.675 0.25 178 / 0.3)",
              }}
            >
              Always On
            </span>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-smooth hover:bg-muted/30"
            style={{
              background: "oklch(0.11 0 0)",
              borderBottom: "1px solid oklch(0.18 0 0)",
            }}
          >
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 text-sm text-foreground">About Rahbar</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-smooth hover:bg-muted/30"
            style={{ background: "oklch(0.11 0 0)" }}
          >
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 text-sm text-foreground">
              Privacy Policy
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="mx-3 mt-4 mb-2">
        <button
          type="button"
          data-ocid="account.logout.button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-smooth hover:scale-[1.01]"
          style={{
            background: "oklch(0.55 0.19 22 / 0.1)",
            color: "oklch(0.65 0.19 22)",
            border: "1px solid oklch(0.55 0.19 22 / 0.3)",
          }}
        >
          <LogOut className="w-4 h-4" />
          {t("logout")}
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <dialog
          aria-label="Invite Friends"
          open
          className="fixed inset-0 z-50 flex items-end justify-center w-full max-w-none p-0 m-0 h-full"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
          }}
          data-ocid="account.share_modal.dialog"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
          }}
        >
          <div
            className="w-full max-w-sm mx-auto rounded-t-3xl p-6 slide-up"
            style={{
              background: "oklch(0.13 0 0)",
              border: "1px solid oklch(0.22 0 0)",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-foreground mb-1">
              Invite Friends
            </h3>
            <p className="text-xs text-muted-foreground mb-4 break-all leading-relaxed">
              {inviteMessage}
            </p>
            <div className="flex gap-3">
              <a
                data-ocid="account.share_whatsapp.button"
                href={`https://wa.me/?text=${encodeURIComponent(inviteMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
              <button
                type="button"
                data-ocid="account.share_copy.button"
                onClick={handleShareInvite}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "oklch(0.675 0.25 178 / 0.15)",
                  color: "oklch(0.675 0.25 178)",
                  border: "1px solid oklch(0.675 0.25 178 / 0.3)",
                }}
              >
                <ClipboardCopy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
            <button
              type="button"
              data-ocid="account.share_modal.close_button"
              onClick={closeModal}
              className="w-full mt-3 py-2.5 rounded-xl text-sm text-muted-foreground transition-smooth hover:text-foreground"
            >
              {t("cancel")}
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
