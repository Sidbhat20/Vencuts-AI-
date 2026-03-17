import { ContentTrend } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TrendCard({ trend, onUse }: { trend: ContentTrend; onUse: () => void }) {
  return (
    <Card className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">{trend.platform}</span>
        <span className="rounded-full bg-violet-50 px-2 py-1 text-xs text-violet-700">Viral {trend.viralScore}/10</span>
      </div>
      <p className="line-clamp-3 text-sm text-gray-700">{trend.preview}</p>
      <p className="mt-2 text-xs text-gray-500">
        {trend.likes} likes • {trend.shares} shares • {trend.comments} comments
      </p>
      <p className="mt-1 text-xs text-violet-600">{trend.nicheTag}</p>
      <Button className="mt-3 w-full" variant="outline" onClick={onUse}>
        Use as Template
      </Button>
    </Card>
  );
}
