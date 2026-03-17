"use client";

import { Invoice } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import { Button } from "@/components/ui/button";

interface InvoiceTableProps {
  invoices: Invoice[];
  onRemind: (invoice: Invoice) => void;
  onMarkAsPaid: (invoiceId: string) => void;
}

export function InvoiceTable({ invoices, onRemind, onMarkAsPaid }: InvoiceTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="bg-violet-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Invoice #</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date Issued</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr className="border-t border-gray-100 hover:bg-violet-50" key={invoice.id}>
              <td className="px-4 py-3 font-medium">{invoice.invoiceNo}</td>
              <td className="px-4 py-3">{invoice.clientName}</td>
              <td className="px-4 py-3">{formatCurrency(invoice.amount)}</td>
              <td className="px-4 py-3">{invoice.dateIssued}</td>
              <td className="px-4 py-3">{invoice.dueDate}</td>
              <td className="px-4 py-3">
                <StatusDot label={invoice.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" type="button">
                    View
                  </Button>
                  {invoice.status !== "Paid" ? (
                    <>
                      <Button size="sm" variant="ghost" type="button" onClick={() => onRemind(invoice)}>
                        Remind
                      </Button>
                      <Button size="sm" variant="outline" type="button" onClick={() => onMarkAsPaid(invoice.id)}>
                        Mark as Paid
                      </Button>
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
