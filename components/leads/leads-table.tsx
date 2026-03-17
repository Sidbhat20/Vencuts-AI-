"use client";

import { Lead } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";

export function LeadsTable({ leads, onSendEmail }: { leads: Lead[]; onSendEmail: (lead: Lead) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[780px] text-left text-sm">
        <thead className="bg-violet-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Contact</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr className="border-t border-gray-100 hover:bg-violet-50" key={lead.id}>
              <td className="px-4 py-3 font-medium">{lead.name}</td>
              <td className="px-4 py-3">{lead.company}</td>
              <td className="px-4 py-3">{lead.email}</td>
              <td className="px-4 py-3">
                <StatusDot label={lead.status} />
              </td>
              <td className="px-4 py-3">{lead.lastContact}</td>
              <td className="px-4 py-3">
                <StatusDot label={lead.score} />
              </td>
              <td className="px-4 py-3">
                <Button size="sm" variant="outline" onClick={() => onSendEmail(lead)}>
                  Send Email
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
