"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { tweetQueue as seedQueue, tweetTemplates } from "@/lib/mock-data";
import { TweetQueueItem } from "@/lib/types";
import { ViralTemplates } from "@/components/x-growth/viral-templates";
import { TweetQueue } from "@/components/x-growth/tweet-queue";
import { useToast } from "@/components/providers/toast-provider";

const stats = [
  { label: "Followers", value: "2,847" },
  { label: "Tweets Today", value: "8/15 scheduled" },
  { label: "Avg Engagement", value: "3.2%" },
  { label: "Best Performing", value: "Why your startup does not need a CMO (2.4K likes)" },
];

export default function XGrowthPage() {
  const [queue, setQueue] = useState<TweetQueueItem[]>(seedQueue);
  const { pushToast } = useToast();

  return (
    <div>
      <PageHeader title="X (Twitter) Growth" />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}><p className="text-xs text-gray-500">{stat.label}</p><p className="mt-2 text-sm font-semibold">{stat.value}</p></Card>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="mb-3 text-lg font-semibold">Viral Tweet Templates</h3>
        <ViralTemplates
          templates={tweetTemplates}
          onSchedule={(text) => {
            setQueue((prev) => {
              const emptyIndex = prev.findIndex((item) => item.status === "Empty");
              if (emptyIndex === -1) return prev;
              const copy = [...prev];
              copy[emptyIndex] = { ...copy[emptyIndex], text, status: "Scheduled" };
              return copy;
            });
            pushToast("Tweet scheduled from template");
          }}
        />
      </div>
      <TweetQueue
        queue={queue}
        onGenerate={(slotId) => {
          setQueue((prev) =>
            prev.map((item) =>
              item.id === slotId
                ? {
                    ...item,
                    text: "AI-generated tweet: Startups do not need more content ideas, they need distribution rituals.",
                    status: "Scheduled",
                  }
                : item
            )
          );
          pushToast("Mock tweet generated and scheduled");
        }}
      />
    </div>
  );
}
