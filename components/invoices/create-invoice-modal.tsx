"use client";

import { useMemo, useState } from "react";
import { Client, Invoice } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  clients: Client[];
  onCreate: (invoice: Invoice) => void;
}

export function CreateInvoiceModal({ open, onClose, clients, onCreate }: CreateInvoiceModalProps) {
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [amount, setAmount] = useState("100000");
  const [description, setDescription] = useState("Monthly service retainer");
  const [dueDate, setDueDate] = useState("2026-03-30");

  const selectedClient = useMemo(() => clients.find((client) => client.id === clientId), [clientId, clients]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-violet-100 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">Create Invoice</h3>
        <div className="mt-4 space-y-3">
          <label className="text-sm text-gray-600">
            Client
            <select
              className="mt-1 h-10 w-full rounded-xl border border-gray-200 px-3 text-sm"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.company}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-gray-600">
            Amount
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label className="text-sm text-gray-600">
            Description
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label className="text-sm text-gray-600">
            Due Date
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const nextNo = `INV-${Math.floor(Math.random() * 900 + 100)}`;
              onCreate({
                id: `${Date.now()}`,
                invoiceNo: nextNo,
                clientId,
                clientName: selectedClient?.company ?? "Unknown",
                amount: Number(amount),
                dateIssued: "Today",
                dueDate,
                status: "Draft",
                description,
              });
              onClose();
            }}
          >
            Generate Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
