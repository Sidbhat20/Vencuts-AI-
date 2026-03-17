"use client";

import { useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { clients, invoices, projects, activityFeed } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { StatusDot } from "@/components/ui/status-dot";
import { Button } from "@/components/ui/button";

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"Overview" | "Projects" | "Invoices" | "Activity">("Overview");

  const client = useMemo(() => clients.find((item) => item.id === id), [id]);
  if (!client) return notFound();

  const clientProjects = projects.filter((project) => project.clientId === client.id);
  const clientInvoices = invoices.filter((invoice) => invoice.clientId === client.id);

  return (
    <div>
      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-2xl font-semibold">{client.company}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <StatusDot label={client.status} />
          <span>Retainer: {formatCurrency(client.monthlyRetainer)}</span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["Overview", "Projects", "Invoices", "Activity"].map((item) => (
          <Button key={item} size="sm" variant={tab === item ? "default" : "outline"} onClick={() => setTab(item as typeof tab)}>
            {item}
          </Button>
        ))}
      </div>

      {tab === "Overview" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold">Contact Info</h3>
            <p className="mt-2 text-sm text-gray-600">{client.contactName}</p>
            <p className="text-sm text-gray-600">{client.contactEmail}</p>
            <p className="text-sm text-gray-600">{client.contactPhone}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold">Client Metrics</h3>
            <p className="mt-2 text-sm text-gray-600">Total Revenue: {formatCurrency(client.totalRevenue)}</p>
            <p className="text-sm text-gray-600">Satisfaction Score: {client.satisfactionScore}/5</p>
            <p className="text-sm text-gray-600">Notes: {client.notes}</p>
          </div>
        </div>
      ) : null}

      {tab === "Projects" ? (
        <div className="space-y-3">
          {clientProjects.map((project) => (
            <div className="rounded-xl border border-gray-200 bg-white p-4" key={project.id}>
              <p className="font-medium">{project.name}</p>
              <p className="text-sm text-gray-500">Due {project.dueDate}</p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Invoices" ? (
        <div className="space-y-3">
          {clientInvoices.map((invoice) => (
            <div className="rounded-xl border border-gray-200 bg-white p-4" key={invoice.id}>
              <div className="flex items-center justify-between">
                <p className="font-medium">{invoice.invoiceNo}</p>
                <StatusDot label={invoice.status} />
              </div>
              <p className="text-sm text-gray-500">{formatCurrency(invoice.amount)} • Due {invoice.dueDate}</p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "Activity" ? (
        <div className="space-y-3">
          {activityFeed.slice(0, 8).map((activity) => (
            <div className="rounded-xl border border-gray-200 bg-white p-4" key={activity.id}>
              <p className="text-sm text-gray-700">{activity.text}</p>
              <p className="text-xs text-gray-400">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
