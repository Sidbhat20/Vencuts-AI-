"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { TrendCard } from "@/components/content/trend-card";
import { ContentGenerator } from "@/components/content/content-generator";
import { trendingContent } from "@/lib/mock-data";
import { useToast } from "@/components/providers/toast-provider";
import { ContentTrend } from "@/lib/types";

const ideaHooks = [
  "What founders miss about short-form retention in 2026.",
  "The one editing rule that increased average watch time by 31%.",
  "How small teams can ship 5 videos/week without burnout.",
  "Stop posting more. Start sequencing narratives instead.",
  "From raw clips to revenue: a practical content operating model.",
  "3 hook styles that consistently drive demo requests.",
];

const platforms: ContentTrend["platform"][] = ["LinkedIn", "X", "Instagram", "YouTube"];
const nicheTags = ["#founders", "#AI", "#storytelling", "#business"];

export default function ContentPage() {
  const { pushToast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [trendList, setTrendList] = useState<ContentTrend[]>(trendingContent);

  const generateIdeas = () => {
    if (generating) return;
    setGenerating(true);
    pushToast("Idea generation started");

    setTimeout(() => {
      const nextIdeas: ContentTrend[] = Array.from({ length: 3 }, (_, index) => {
        const hook = ideaHooks[Math.floor(Math.random() * ideaHooks.length)];
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const nicheTag = nicheTags[Math.floor(Math.random() * nicheTags.length)];
        const likes = 800 + Math.floor(Math.random() * 9600);
        const shares = 120 + Math.floor(Math.random() * 1300);
        const comments = 35 + Math.floor(Math.random() * 420);
        const viralScore = Number((7.8 + Math.random() * 1.8).toFixed(1));

        return {
          id: `gen-${Date.now()}-${index}`,
          platform,
          preview: hook,
          likes,
          shares,
          comments,
          viralScore,
          nicheTag,
        };
      });

      setTrendList((prev) => [...nextIdeas, ...prev]);
      setGenerating(false);
      pushToast("3 fresh content ideas generated", "Use as Template is ready on each card.");
    }, 1200);
  };

  return (
    <div>
      <PageHeader title="Content Intelligence" actionLabel={generating ? "Generating..." : "Generate Ideas"} onAction={generateIdeas} />
      <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trendList.map((trend) => (
          <TrendCard key={trend.id} trend={trend} onUse={() => pushToast(`Template saved from ${trend.platform}`)} />
        ))}
      </div>
      <ContentGenerator />
    </div>
  );
}
