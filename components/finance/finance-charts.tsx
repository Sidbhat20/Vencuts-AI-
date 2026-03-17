"use client";

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { MonthlyFinance } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const expenseData = [
  { name: "Salaries", value: 45 },
  { name: "Equipment", value: 20 },
  { name: "Software", value: 15 },
  { name: "Office", value: 10 },
  { name: "Marketing", value: 10 },
];

const expenseColors = ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"];

export function FinanceCharts({ data, clientRevenue }: { data: MonthlyFinance[]; clientRevenue: { client: string; value: number }[] }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold">Revenue vs Expenses</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 100000)}L`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#C4B5FD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold">Profit Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 100000)}L`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line dataKey="profit" stroke="#7C3AED" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold">Revenue by Client</h3>
          <div className="space-y-3">
            {clientRevenue.map((item) => (
              <div key={item.client}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.client}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(item.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-violet-100">
                  <div className="h-2 rounded-full bg-violet-600" style={{ width: `${Math.min((item.value / 3600000) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 font-semibold">Expense Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                  {expenseData.map((entry, idx) => (
                    <Cell key={entry.name} fill={expenseColors[idx]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
