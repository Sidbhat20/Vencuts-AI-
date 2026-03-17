"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { CreateInvoiceModal } from "@/components/invoices/create-invoice-modal";
import { InvoiceTable } from "@/components/invoices/invoice-table";
import { clients, invoices as seedInvoices } from "@/lib/mock-data";
import { Invoice } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/providers/toast-provider";

export default function InvoicesPage() {
  const [open, setOpen] = useState(false);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(seedInvoices);
  const { pushToast } = useToast();

  const totals = useMemo(() => {
    const outstanding = invoiceList.filter((invoice) => invoice.status === "Pending" || invoice.status === "Overdue").reduce((sum, invoice) => sum + invoice.amount, 0);
    const paid = invoiceList.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
    const overdueCount = invoiceList.filter((invoice) => invoice.status === "Overdue").length;
    return { outstanding, paid, overdueCount };
  }, [invoiceList]);

  return (
    <div>
      <PageHeader title="Invoices" actionLabel="Create Invoice" onAction={() => setOpen(true)} />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Card className="bg-rose-50 border-rose-100"><p className="text-xs text-rose-600">Total Outstanding</p><p className="text-xl font-semibold">{formatCurrency(totals.outstanding)}</p></Card>
        <Card className="bg-emerald-50 border-emerald-100"><p className="text-xs text-emerald-600">Paid This Month</p><p className="text-xl font-semibold">{formatCurrency(totals.paid)}</p></Card>
        <Card className="bg-rose-50 border-rose-100"><p className="text-xs text-rose-600">Overdue</p><p className="text-xl font-semibold">{totals.overdueCount} invoices</p></Card>
        <Card><p className="text-xs text-gray-500">Average Payment Time</p><p className="text-xl font-semibold">12 days</p></Card>
      </div>
      <InvoiceTable
        invoices={invoiceList}
        onRemind={(invoice) => pushToast(`Payment reminder sent to ${invoice.clientName}`)}
        onMarkAsPaid={(invoiceId) => {
          setInvoiceList((prev) => prev.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: "Paid" } : invoice)));
          pushToast("Invoice marked as paid");
        }}
      />
      <CreateInvoiceModal
        open={open}
        onClose={() => setOpen(false)}
        clients={clients}
        onCreate={(invoice) => {
          setInvoiceList((prev) => [invoice, ...prev]);
          pushToast("Draft invoice generated");
        }}
      />
    </div>
  );
}
