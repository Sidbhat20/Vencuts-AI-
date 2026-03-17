"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ClientCard } from "@/components/clients/client-card";
import { clients } from "@/lib/mock-data";
import { Client } from "@/lib/types";
import { useToast } from "@/components/providers/toast-provider";

export default function ClientsPage() {
  const { pushToast } = useToast();
  const [open, setOpen] = useState(false);
  const [clientList, setClientList] = useState<Client[]>(clients);
  const [filter, setFilter] = useState<"All" | "Active" | "Paused" | "Completed">("All");
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [monthlyRetainer, setMonthlyRetainer] = useState("100000");
  const [notes, setNotes] = useState("New client onboarded via dashboard.");

  const list = useMemo(() => {
    if (filter === "All") return clientList;
    return clientList.filter((client) => client.status === filter);
  }, [clientList, filter]);

  const resetForm = () => {
    setCompany("");
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setMonthlyRetainer("100000");
    setNotes("New client onboarded via dashboard.");
  };

  const addClient = () => {
    if (!company.trim() || !contactName.trim() || !contactEmail.trim()) {
      pushToast("Please fill company, contact name, and email");
      return;
    }

    const cleanedCompany = company.trim();
    const initials = cleanedCompany
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2);
    const nextShoot = new Date();
    nextShoot.setDate(nextShoot.getDate() + 7);

    const newClient: Client = {
      id: `${cleanedCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`,
      company: cleanedCompany,
      initials: initials || "VC",
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim() || "6383867668",
      status: "Active",
      monthlyRetainer: Number(monthlyRetainer) || 100000,
      videosDelivered: 0,
      videosTarget: 8,
      nextShootDate: nextShoot.toISOString().slice(0, 10),
      lastPaymentStatus: "Pending",
      totalRevenue: 0,
      satisfactionScore: 4.5,
      notes: notes.trim() || "New client onboarded via dashboard.",
    };

    setClientList((prev) => [newClient, ...prev]);
    setFilter("All");
    setOpen(false);
    resetForm();
    pushToast(`${newClient.company} added successfully`);
  };

  return (
    <div>
      <PageHeader title="Clients" actionLabel="Add Client" onAction={() => setOpen(true)} />
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Active", "Paused", "Completed"].map((item) => (
          <Button
            key={item}
            variant={filter === item ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(item as typeof filter)}
          >
            {item}
          </Button>
        ))}
      </div>
      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-violet-200 bg-violet-50 p-8 text-center text-sm text-violet-700">
          No clients found for this filter.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-violet-100 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Add Client</h3>
            <div className="mt-4 space-y-3">
              <label className="text-sm text-gray-600">
                Company Name
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="DreamEdge Media" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm text-gray-600">
                  Contact Name
                  <Input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="John" />
                </label>
                <label className="text-sm text-gray-600">
                  Contact Email
                  <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="john@company.com" />
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm text-gray-600">
                  Contact Phone
                  <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="6383867668" />
                </label>
                <label className="text-sm text-gray-600">
                  Monthly Retainer (INR)
                  <Input type="number" value={monthlyRetainer} onChange={(e) => setMonthlyRetainer(e.target.value)} />
                </label>
              </div>
              <label className="text-sm text-gray-600">
                Notes
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={addClient}>Add Client</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
