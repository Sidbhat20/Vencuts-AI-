"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const integrations = ["Stripe", "Razorpay", "Gmail", "Instagram", "X", "LinkedIn", "YouTube"];

export default function SettingsPage() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    Stripe: true,
    Razorpay: true,
    Gmail: true,
    Instagram: false,
    X: true,
    LinkedIn: true,
    YouTube: false,
  });

  return (
    <div>
      <PageHeader title="Settings" />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Profile</h3>
          <div className="mt-3 space-y-2">
            <Input defaultValue="Vencuts Media" />
            <Input defaultValue="ops@vencuts.in" />
            <div className="rounded-xl border border-dashed border-violet-200 bg-violet-50 p-4 text-sm text-violet-700">Logo upload area</div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">Integrations</h3>
          <div className="mt-3 grid gap-2">
            {integrations.map((item) => (
              <label key={item} className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2 text-sm">
                <span>{item}</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-violet-600"
                  checked={connected[item]}
                  onChange={() => setConnected((prev) => ({ ...prev, [item]: !prev[item] }))}
                />
              </label>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">Notifications</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <label className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2">Email reminders<input type="checkbox" className="accent-violet-600" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2">Payment alerts<input type="checkbox" className="accent-violet-600" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2">Content schedule<input type="checkbox" className="accent-violet-600" /></label>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">AI Configuration</h3>
          <div className="mt-3 space-y-2">
            <select className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm">
              <option>Claude Sonnet 4</option>
              <option>GPT-4o</option>
            </select>
            <label className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2 text-sm">
              Auto-pilot content posting
              <input type="checkbox" className="accent-violet-600" />
            </label>
            <div className="rounded-xl border border-gray-100 p-3 text-sm text-gray-600">
              Invite Link: https://vencuts.in/invite/ops-team
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
