"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Deadlines } from "@/components/dashboard/deadlines";
import { activityFeed, projectStatusBreakdown, revenueTrend } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={1245000}
          format="currency"
          subtext="This month"
          trend="23% vs last month"
          icon="revenue"
        />
        <StatCard title="Active Clients" value={8} format="number" subtext="3 in production" icon="clients" />
        <StatCard
          title="Pending Invoices"
          value={320000}
          format="currency"
          subtext="4 invoices overdue"
          trend="Collections lagging"
          trendColor="text-rose-600"
          icon="invoices"
        />
        <StatCard
          title="Leads Generated"
          value={47}
          format="number"
          subtext="This week"
          trend="12%"
          icon="leads"
        />
      </div>

      <RevenueChart revenue={revenueTrend} projectStatus={projectStatusBreakdown} />

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ActivityFeed items={activityFeed} />
        </div>
        <div className="lg:col-span-2">
          <Deadlines />
        </div>
      </div>
    </div>
  );
}
