"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <div className="md:hidden fixed left-4 top-4 z-40">
        <button
          className="rounded-lg border border-gray-200 bg-white p-2"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:block">
        <Sidebar />
      </div>

      {open ? (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-[260px] bg-white" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="md:ml-[260px]">
        <Topbar />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
