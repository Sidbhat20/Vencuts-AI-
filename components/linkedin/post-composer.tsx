"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PostComposer({ onSchedule }: { onSchedule: (text: string) => void }) {
  const [aiPrompt, setAiPrompt] = useState("Generate post about founder-led marketing");
  const [content, setContent] = useState("A founder who shows up consistently becomes the category reference point.\n\nMost teams overthink polish and underinvest in cadence.");
  const [time, setTime] = useState("2026-03-20T10:30");

  return (
    <Card>
      <h3 className="mb-3 font-semibold">Post Composer</h3>
      <div className="space-y-3">
        <Input value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Generate post about..." />
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-32" />
        <Input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} />
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
          <p className="text-xs text-gray-500">Preview</p>
          <p className="mt-1 whitespace-pre-line text-sm text-gray-700">{content}</p>
        </div>
        <Button onClick={() => onSchedule(content)}>Schedule</Button>
      </div>
    </Card>
  );
}
