import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { FinanceCharts } from "@/components/finance/finance-charts";
import { AiInsights } from "@/components/finance/ai-insights";
import { clients, monthlyFinance } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function FinancePage() {
  const latest = monthlyFinance[4];
  const margin = ((latest.profit / latest.revenue) * 100).toFixed(1);

  return (
    <div>
      <PageHeader title="Financial Overview" />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Card><p className="text-xs text-gray-500">Monthly Revenue</p><p className="text-xl font-semibold">{formatCurrency(latest.revenue)}</p></Card>
        <Card><p className="text-xs text-gray-500">Monthly Expenses</p><p className="text-xl font-semibold">{formatCurrency(latest.expenses)}</p></Card>
        <Card><p className="text-xs text-gray-500">Net Profit</p><p className="text-xl font-semibold">{formatCurrency(latest.profit)}</p></Card>
        <Card><p className="text-xs text-gray-500">Profit Margin</p><p className="text-xl font-semibold">{margin}%</p></Card>
      </div>
      <FinanceCharts
        data={monthlyFinance}
        clientRevenue={clients
          .slice()
          .sort((a, b) => b.totalRevenue - a.totalRevenue)
          .slice(0, 5)
          .map((client) => ({ client: client.company, value: client.totalRevenue }))}
      />
      <div className="mt-4">
        <AiInsights />
      </div>
    </div>
  );
}
