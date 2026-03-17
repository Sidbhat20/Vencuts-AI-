"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  FolderKanban,
  HandCoins,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  section: string;
  icon?: LucideIcon;
  imageIcon?: string;
};

const nav: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, section: "" },
  { label: "Clients", href: "/clients", icon: Users, section: "OPERATIONS" },
  { label: "Projects", href: "/projects", icon: FolderKanban, section: "OPERATIONS" },
  { label: "Team", href: "/team", icon: Briefcase, section: "OPERATIONS" },
  { label: "Invoices", href: "/invoices", icon: HandCoins, section: "FINANCE" },
  { label: "Finance", href: "/finance", icon: BarChart3, section: "FINANCE" },
  { label: "Lead Gen", href: "/leads", icon: FileText, section: "GROWTH" },
  { label: "Content Intel", href: "/content", icon: Building2, section: "GROWTH" },
  { label: "X Growth", href: "/x-growth", imageIcon: "/x-logo.png", section: "GROWTH" },
  { label: "LinkedIn", href: "/linkedin", imageIcon: "/linkedin-logo.png", section: "GROWTH" },
  { label: "Settings", href: "/settings", icon: Settings, section: "" },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const sections = ["", "OPERATIONS", "FINANCE", "GROWTH"];

  return (
    <aside className="h-full w-[260px] border-r border-gray-200 bg-white p-4">
      <div className="mb-6 px-2">
        <Image src="/vencuts-logo.jpeg" alt="Vencuts logo" width={156} height={40} className="h-10 w-auto rounded-md" priority />
        <p className="mt-1 text-[11px] text-gray-500">AI Operations Platform</p>
      </div>
      <nav className="space-y-4">
        {sections.map((section) => (
          <div key={section || "base"}>
            {section ? (
              <p className="mb-2 px-2 text-xs font-semibold tracking-wider text-gray-400">{section}</p>
            ) : null}
            <div className="space-y-1">
              {nav
                .filter((item) => item.section === section)
                .map((item) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      href={item.href}
                      key={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-full px-3 py-2 text-sm font-medium transition",
                        active
                          ? "bg-violet-600 text-white shadow-sm"
                          : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                      )}
                    >
                      {item.imageIcon ? (
                        <Image src={item.imageIcon} alt={`${item.label} logo`} width={18} height={18} className="h-[18px] w-[18px]" />
                      ) : Icon ? (
                        <Icon className="h-4.5 w-4.5" />
                      ) : null}
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
