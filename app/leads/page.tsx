"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { LeadPipeline } from "@/components/leads/lead-pipeline";
import { LeadsTable } from "@/components/leads/leads-table";
import { leads as seedLeads } from "@/lib/mock-data";
import { useToast } from "@/components/providers/toast-provider";
import { Lead } from "@/lib/types";
import { NewCampaignModal } from "@/components/leads/new-campaign-modal";

export default function LeadsPage() {
  const [leadList, setLeadList] = useState<Lead[]>(seedLeads);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const { pushToast } = useToast();

  const dynamicStats = useMemo(
    () => [
      { label: "Total Leads Scraped", value: `${leadList.length}` },
      { label: "Emails Sent", value: "156" },
      { label: "Open Rate", value: "42%" },
      { label: "Reply Rate", value: "8.3%" },
      { label: "Meetings Booked", value: "6" },
    ],
    [leadList.length]
  );

  return (
    <div>
      <PageHeader title="Lead Generation" actionLabel="New Campaign" onAction={() => setCampaignOpen(true)} />
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dynamicStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
            <p className="mt-2 text-xl font-semibold">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="mb-4">
        <LeadPipeline />
      </div>
      <LeadsTable leads={leadList} onSendEmail={(lead) => pushToast(`Personalized email sent to ${lead.name}`)} />
      <NewCampaignModal
        open={campaignOpen}
        onClose={() => setCampaignOpen(false)}
        onGenerate={(newLeads, industry) => {
          setLeadList((prev) => [...newLeads, ...prev]);
          pushToast(`Found ${newLeads.length} ${industry} clients`, "You can send email immediately from the table.");
        }}
      />
    </div>
  );
}
