import { Card } from "@/components/ui/card";

const suggestions = [
  "Comment on Arjun Malhotra's product-led growth post",
  "Comment on Neha Singh's founder burnout discussion",
  "Comment on Ravi K's video ROI case study",
  "Comment on Pallavi R's hiring content framework",
  "Comment on Kunal J's inbound strategy thread",
];

export function EngagementPanel() {
  return (
    <Card className="border-violet-200 bg-violet-50">
      <h3 className="text-base font-semibold text-violet-700">AI Comment Strategy</h3>
      <p className="mt-1 text-sm text-gray-600">Comment on these 5 posts today for maximum reach:</p>
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {suggestions.map((item) => (
          <li className="rounded-lg bg-white/70 p-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <label className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" className="h-4 w-4 accent-violet-600" />
        Auto-engage (simulated)
      </label>
    </Card>
  );
}
