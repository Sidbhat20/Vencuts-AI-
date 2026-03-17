"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/clients/client-card";
import { clients } from "@/lib/mock-data";

export default function ClientsPage() {
  const [filter, setFilter] = useState<"All" | "Active" | "Paused" | "Completed">("All");

  const list = useMemo(() => {
    if (filter === "All") return clients;
    return clients.filter((client) => client.status === filter);
  }, [filter]);

  return (
    <div>
      <PageHeader title="Clients" actionLabel="Add Client" />
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
    </div>
  );
}
