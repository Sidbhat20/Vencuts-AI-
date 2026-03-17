"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-gray-900">
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:block">
        <Sidebar />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-[260px] max-w-[82vw] bg-white" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="md:ml-[260px]">
        <Topbar onMenuToggle={() => setOpen((prev) => !prev)} isMobileMenuOpen={open} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
