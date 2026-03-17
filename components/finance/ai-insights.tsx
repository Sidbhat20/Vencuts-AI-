import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AiInsights() {
  return (
    <Card className="border-violet-200 bg-violet-50">
      <div className="mb-3 flex items-center gap-2 text-violet-700">
        <Sparkles className="h-4 w-4" />
        <h3 className="text-base font-semibold">AI Financial Insights</h3>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>Cred Creators generated 2.4x more revenue per hour than average. Consider similar premium clients.</li>
        <li>Software expenses increased 32% this quarter. Review subscriptions for unused tools.</li>
        <li>BrightPath has the highest profit margin at 72%. Their project scope is most efficient.</li>
        <li>Payment collection averages 14 days. Automated reminders could reduce this to 7 days.</li>
      </ul>
    </Card>
  );
}
