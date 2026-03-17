import { Card } from "@/components/ui/card";

const deadlines = [
  { title: "Freshworks shoot", date: "Mar 19", level: "bg-amber-500" },
  { title: "ScaleUp AI delivery", date: "Mar 21", level: "bg-rose-500" },
  { title: "BrightPath reel edit", date: "Mar 22", level: "bg-violet-500" },
];

export function Deadlines() {
  return (
    <Card>
      <h3 className="mb-4 text-base font-semibold">Upcoming Deadlines</h3>
      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div className="rounded-xl border border-gray-100 p-3" key={deadline.title}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
              <span className="inline-flex items-center gap-2 text-xs text-gray-500">
                <span className={`h-2.5 w-2.5 rounded-full ${deadline.level}`} />
                {deadline.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
