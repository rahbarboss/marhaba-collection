import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { Notification } from "../types";

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

interface NotificationContextValue {
  notifications: Notification[];
  toasts: ToastNotification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  showToast: (
    type: ToastNotification["type"],
    message: string,
    duration?: number,
  ) => void;
  dismissToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "deal",
      title: "Flash Sale Live!",
      message: "Up to 50% off on Electronics. Grab it before it ends!",
      read: false,
      timestamp: Date.now() - 3600000,
    },
    {
      id: "n2",
      type: "general",
      title: "Welcome to Rahbar",
      message: "Discover premium products at exclusive prices.",
      read: false,
      timestamp: Date.now() - 7200000,
    },
  ]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addNotification = useCallback(
    (n: Omit<Notification, "id" | "timestamp" | "read">) => {
      const notification: Notification = {
        ...n,
        id: `notif-${Date.now()}`,
        timestamp: Date.now(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);
    },
    [],
  );

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastNotification["type"], message: string, duration = 4000) => {
      const id = `toast-${Date.now()}`;
      const toast: ToastNotification = { id, type, message, duration };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        toasts,
        unreadCount,
        addNotification,
        markRead,
        markAllRead,
        removeNotification,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  return ctx;
}
