"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/providers/toast-provider";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/projects": "Projects",
  "/team": "Team",
  "/invoices": "Invoices",
  "/finance": "Financial Overview",
  "/leads": "Lead Generation",
  "/content": "Content Intelligence",
  "/x-growth": "X Growth",
  "/linkedin": "LinkedIn Intelligence",
  "/settings": "Settings",
  "/profile": "Venkataswaran Profile",
};

export function Topbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { notifications, unreadCount, markAllAsRead } = useToast();
  const parent = pathname.split("/")[1];
  const rootPath = parent ? `/${parent}` : "/";
  const title = titles[rootPath] || "Vencuts";

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const notificationItems = useMemo(() => notifications.slice(0, 12), [notifications]);

  const getRelativeTime = (timestamp: number) => {
    const delta = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
    if (delta < 60) return `${delta}s ago`;
    if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
    if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
    return `${Math.floor(delta / 86400)}d ago`;
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400">Vencuts / {title}</p>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-gray-100 px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-gray-400" />
          <input className="w-48 bg-transparent text-sm outline-none" placeholder="Search" />
        </div>
        <div className="relative" ref={menuRef}>
          <button
            className="relative rounded-full border border-gray-200 p-2 text-gray-600 transition hover:bg-violet-50"
            onClick={() => {
              const nextOpen = !open;
              setOpen(nextOpen);
              if (nextOpen) markAllAsRead();
            }}
            type="button"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : null}
          </button>

          {open ? (
            <div className="absolute right-0 mt-2 w-[340px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-sm font-semibold text-gray-900">Activity Notifications</p>
                <span className="text-xs text-gray-400">Recent actions</span>
              </div>
              {notificationItems.length ? (
                <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                  {notificationItems.map((item) => (
                    <div key={item.id} className="rounded-lg border border-gray-100 bg-gray-50 p-2.5">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      {item.message ? <p className="mt-0.5 text-xs text-gray-600">{item.message}</p> : null}
                      <p className="mt-1 text-[11px] text-gray-400">{getRelativeTime(item.createdAt)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3 text-center text-xs text-gray-500">
                  No activity yet. Your actions like sending emails and using templates will appear here.
                </div>
              )}
            </div>
          ) : null}
        </div>
        <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white transition hover:scale-105">
          VK
        </Link>
      </div>
    </header>
  );
}
