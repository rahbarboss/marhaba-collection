import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import type { ToastNotification } from "../context/NotificationContext";

interface ToastProps {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styleMap = {
  success: {
    bg: "bg-[#0f2a1a] border-green-500/40",
    icon: "text-green-400",
    text: "text-green-100",
  },
  error: {
    bg: "bg-[#2a0f0f] border-red-500/40",
    icon: "text-red-400",
    text: "text-red-100",
  },
  warning: {
    bg: "bg-[#2a1f0f] border-yellow-500/40",
    icon: "text-yellow-400",
    text: "text-yellow-100",
  },
  info: {
    bg: "bg-card border-primary/40",
    icon: "text-primary",
    text: "text-foreground",
  },
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = iconMap[toast.type];
  const styles = styleMap[toast.type];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 border shadow-lg fade-in ${styles.bg}`}
      data-ocid="toast.container"
    >
      <Icon size={18} className={`flex-shrink-0 ${styles.icon}`} />
      <span className={`flex-1 text-sm font-medium ${styles.text}`}>
        {toast.message}
      </span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
        data-ocid="toast.close_button"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="absolute top-16 inset-x-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
