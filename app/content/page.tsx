"use client";

import { PageHeader } from "@/components/layout/page-header";
import { TrendCard } from "@/components/content/trend-card";
import { ContentGenerator } from "@/components/content/content-generator";
import { trendingContent } from "@/lib/mock-data";
import { useToast } from "@/components/providers/toast-provider";

export default function ContentPage() {
  const { pushToast } = useToast();

  return (
    <div>
      <PageHeader title="Content Intelligence" actionLabel="Generate Ideas" onAction={() => pushToast("Idea generation started")} />
      <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trendingContent.map((trend) => (
          <TrendCard key={trend.id} trend={trend} onUse={() => pushToast(`Template saved from ${trend.platform}`)} />
        ))}
      </div>
      <ContentGenerator />
    </div>
  );
}
