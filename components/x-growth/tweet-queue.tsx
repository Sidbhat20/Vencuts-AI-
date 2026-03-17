import { TweetQueueItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";

export function TweetQueue({ queue, onGenerate }: { queue: TweetQueueItem[]; onGenerate: (slotId: string) => void }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-base font-semibold">Tweet Queue</h3>
      <div className="space-y-3">
        {queue.map((item) => (
          <div className="flex items-center justify-between rounded-xl border border-gray-100 p-3" key={item.id}>
            <div>
              <p className="text-sm font-medium">{item.time}</p>
              <p className="text-xs text-gray-500">{item.text || "Empty slot"}</p>
            </div>
            {item.status === "Empty" ? (
              <Button size="sm" onClick={() => onGenerate(item.id)}>
                Generate
              </Button>
            ) : (
              <StatusDot label={item.status} className="text-xs" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
