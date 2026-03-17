import { Card } from "@/components/ui/card";

const stages = [
  { label: "Scraped", value: 234 },
  { label: "Contacted", value: 156 },
  { label: "Opened", value: 65 },
  { label: "Replied", value: 13 },
  { label: "Meeting", value: 6 },
  { label: "Won", value: 2 },
];

export function LeadPipeline() {
  return (
    <Card>
      <h3 className="mb-4 text-base font-semibold">Lead Pipeline Funnel</h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {stages.map((stage, index) => (
          <div className="rounded-xl border border-violet-100 bg-violet-50 p-3 text-center" key={stage.label}>
            <p className="text-lg font-semibold text-violet-700">{stage.value}</p>
            <p className="text-xs text-gray-500">{stage.label}</p>
            {index < stages.length - 1 ? <p className="mt-1 text-xs text-violet-300">→</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
