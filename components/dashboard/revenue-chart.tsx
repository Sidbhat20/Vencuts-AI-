"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const donutColors = ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD"];

export function RevenueChart({ revenue, projectStatus }: { revenue: { month: string; value: number }[]; projectStatus: { name: string; value: number }[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-4 text-base font-semibold">Revenue Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={(value) => `${value}L`}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(value) => formatCurrency(Number(value) * 100000)} />
              <Area type="monotone" dataKey="value" stroke="#7C3AED" fill="url(#purpleGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-base font-semibold">Project Status</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={projectStatus} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={4}>
                {projectStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={donutColors[index % donutColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
          {projectStatus.map((item, idx) => (
            <span className="inline-flex items-center gap-1" key={item.name}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: donutColors[idx] }} />
              {item.name} ({item.value})
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
