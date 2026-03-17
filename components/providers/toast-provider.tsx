"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";

interface ToastItem {
  id: number;
  title: string;
  message?: string;
}

interface NotificationItem {
  id: number;
  title: string;
  message?: string;
  createdAt: number;
  read: boolean;
}

interface ToastContextValue {
  pushToast: (title: string, message?: string) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markAllAsRead: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const pushToast = useCallback((title: string, message?: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, title, message }]);
    setNotifications((prev) => [{ id, title, message, createdAt: Date.now(), read: false }, ...prev].slice(0, 50));
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const value = useMemo(
    () => ({ pushToast, notifications, unreadCount, markAllAsRead }),
    [pushToast, notifications, unreadCount, markAllAsRead]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[80] flex w-80 flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="animate-in slide-in-from-top rounded-xl border border-violet-200 bg-white p-4 shadow-md duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
                {toast.message ? <p className="mt-1 text-xs text-gray-500">{toast.message}</p> : null}
              </div>
              <button
                className="text-gray-400 transition hover:text-gray-700"
                onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
