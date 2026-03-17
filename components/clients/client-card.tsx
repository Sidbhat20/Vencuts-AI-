import Link from "next/link";
import { Client } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusDot } from "@/components/ui/status-dot";

export function ClientCard({ client }: { client: Client }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
          {client.initials}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{client.company}</p>
          <p className="text-sm text-gray-500">{client.contactName}</p>
        </div>
      </div>
      <StatusDot label={client.status} />
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>Monthly retainer: {formatCurrency(client.monthlyRetainer)}</p>
        <p>
          Videos this month: {client.videosDelivered}/{client.videosTarget} delivered
        </p>
        <p>Next shoot: {client.nextShootDate}</p>
      </div>
      <div className="mt-3">
        <StatusDot label={client.lastPaymentStatus} />
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm font-medium text-violet-700">
        <Link href={`/clients/${client.id}`}>View</Link>
        <button type="button">Edit</button>
        <button type="button">Invoice</button>
      </div>
    </Card>
  );
}
