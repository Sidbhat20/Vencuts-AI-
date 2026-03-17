"use client";

import { Activity, CircleDollarSign, Files, LucideIcon, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";

const iconMap: Record<"revenue" | "clients" | "invoices" | "leads", LucideIcon> = {
  revenue: CircleDollarSign,
  clients: Users2,
  invoices: Files,
  leads: Activity,
};

interface StatCardProps {
  title: string;
  value: number;
  format?: "currency" | "number";
  subtext: string;
  trend?: string;
  trendColor?: string;
  icon: "revenue" | "clients" | "invoices" | "leads";
}

export function StatCard({ title, value, format = "number", subtext, trend, trendColor = "text-emerald-600", icon }: StatCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="rounded-full bg-violet-50 p-2 text-violet-600">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900">
        <CountUp value={value} format={format} />
      </p>
      <p className="mt-1 text-sm text-gray-500">{subtext}</p>
      {trend ? <p className={`mt-2 text-xs font-medium ${trendColor}`}>{trend}</p> : null}
    </Card>
  );
}
