import { ActivityItem } from "@/lib/types";
import { BellRing, CheckCircle2, FileText, MessageSquare, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

const iconMap = {
  invoice: FileText,
  lead: MessageSquare,
  delivery: CheckCircle2,
  payment: Wallet,
  content: BellRing,
  project: BellRing,
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="h-full">
      <h3 className="mb-4 text-base font-semibold">Recent Activity Feed</h3>
      <div className="space-y-3">
        {items.slice(0, 10).map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div className="flex gap-3 rounded-xl p-2 hover:bg-violet-50" key={item.id}>
              <div className="mt-0.5 rounded-full bg-violet-100 p-2 text-violet-600">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm text-gray-800">{item.text}</p>
                <p className="text-xs text-gray-400">{item.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
