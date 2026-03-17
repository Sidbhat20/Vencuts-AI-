"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { linkedInPosts } from "@/lib/mock-data";
import { PostComposer } from "@/components/linkedin/post-composer";
import { EngagementPanel } from "@/components/linkedin/engagement-panel";
import { useToast } from "@/components/providers/toast-provider";

const stats = [
  { label: "Profile Views", value: "1,247 this week" },
  { label: "Post Impressions", value: "34,500" },
  { label: "Connection Requests", value: "23 pending" },
  { label: "SSI Score", value: "72/100" },
];

export default function LinkedInPage() {
  const [scheduled, setScheduled] = useState<string[]>([]);
  const { pushToast } = useToast();

  return (
    <div>
      <PageHeader title="LinkedIn Intelligence" />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}><p className="text-xs text-gray-500">{stat.label}</p><p className="mt-2 text-sm font-semibold">{stat.value}</p></Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card>
            <h3 className="mb-3 text-base font-semibold">Top Performing Posts</h3>
            <div className="space-y-3">
              {linkedInPosts.map((post) => (
                <div className="rounded-xl border border-gray-100 p-3" key={post.id}>
                  <p className="font-medium">{post.author} • {post.headline}</p>
                  <p className="mt-1 text-sm text-gray-600">{post.preview}</p>
                  <p className="mt-1 text-xs text-gray-500">{post.reactions} reactions • {post.comments} comments • {post.reposts} reposts</p>
                  <Button className="mt-2" size="sm" variant="outline" onClick={() => pushToast("Adaptation added to drafts")}>Adapt for Vencuts</Button>
                </div>
              ))}
            </div>
          </Card>
          <PostComposer
            onSchedule={(text) => {
              setScheduled((prev) => [text, ...prev]);
              pushToast("LinkedIn post scheduled");
            }}
          />
          {scheduled.length > 0 ? (
            <Card>
              <h3 className="font-semibold">Scheduled Drafts</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                {scheduled.slice(0, 3).map((item, index) => (
                  <li key={index} className="rounded-lg bg-violet-50 p-2">{item.slice(0, 120)}...</li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
        <EngagementPanel />
      </div>
    </div>
  );
}
