"use client";

import { useMemo, useState } from "react";
import { Lead } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (leads: Lead[], industry: string) => void;
}

const firstNames = ["Arun", "Maya", "Sanjay", "Nisha", "Harsh", "Priyanka", "Kunal", "Farah", "Abhishek", "Ritika", "Dev", "Ishaan", "Lavanya", "Rohit", "Ananya", "Yash", "Shruti", "Manav", "Apoorva", "Gaurav"];
const lastNames = ["Prakash", "Krishnan", "Patel", "Reddy", "Kulkarni", "Das", "Bansal", "Khan", "Jain", "Menon", "Malhotra", "Goyal", "Rao", "Nanda", "Verma", "Shah", "Iyer", "Arora", "Mehta", "Gupta"];

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 16);
}

export function NewCampaignModal({ open, onClose, onGenerate }: NewCampaignModalProps) {
  const [industry, setIndustry] = useState("SaaS");

  const options = useMemo(() => ["SaaS", "FinTech", "EdTech", "D2C", "Healthcare", "Real Estate"], []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-violet-100 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">New Lead Campaign</h3>
        <p className="mt-1 text-sm text-gray-500">Select an industry and Vencuts AI will find 10-15 prospects instantly.</p>

        <div className="mt-4 space-y-3">
          <label className="text-sm text-gray-600">
            Industry
            <select
              className="mt-1 h-10 w-full rounded-xl border border-gray-200 px-3 text-sm"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="text-sm text-gray-600">
            Campaign Name
            <Input value={`${industry} Founder Outreach`} readOnly />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              const count = 12;
              const generated: Lead[] = Array.from({ length: count }, (_, i) => {
                const first = firstNames[(i * 3) % firstNames.length];
                const last = lastNames[(i * 5 + 2) % lastNames.length];
                const name = `${first} ${last}`;
                const company = `${industry}${i + 1} Labs`;
                const email = `${toSlug(first)}.${toSlug(last)}@${toSlug(company)}.in`;

                return {
                  id: `gen-${Date.now()}-${i}`,
                  name,
                  company,
                  email,
                  status: "New",
                  lastContact: "Never",
                  score: i < 4 ? "Hot" : i < 8 ? "Warm" : "Cold",
                };
              });

              onGenerate(generated, industry);
              onClose();
            }}
          >
            Find Clients
          </Button>
        </div>
      </div>
    </div>
  );
}
