"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface GeneratedContent {
  hook: string;
  script: string;
  caption: string;
  hashtags: string;
  bestTime: string;
}

export function ContentGenerator() {
  const [prompt, setPrompt] = useState("How founders can use video for trust");
  const [platforms, setPlatforms] = useState<string[]>(["LinkedIn", "X"]);
  const [tone, setTone] = useState("Storytelling");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);

  const generate = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        hook: "Most founders are one video away from becoming the face customers trust.",
        script:
          "Start with a customer pain story. Show one specific transformation in 30 seconds. End with a clear CTA to book a strategy call.",
        caption:
          "Founders who show up consistently win attention before they run ads. Here is a practical video framework your team can execute this week.",
        hashtags: "#founders #AI #storytelling #business #videoMarketing",
        bestTime: "Best posting time: Tuesday, 10:30 AM",
      });
      setLoading(false);
    }, 1500);
  };

  const toneOptions = ["Professional", "Casual", "Bold", "Storytelling"];

  return (
    <Card className="border-violet-200">
      <h3 className="mb-3 font-semibold">AI Content Generator</h3>
      <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Generate content about..." />
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {["LinkedIn", "X", "Instagram", "YouTube"].map((platform) => (
          <button
            className={`rounded-full border px-3 py-1 ${platforms.includes(platform) ? "border-violet-300 bg-violet-100 text-violet-700" : "border-gray-200 text-gray-600"}`}
            key={platform}
            onClick={() =>
              setPlatforms((prev) =>
                prev.includes(platform) ? prev.filter((item) => item !== platform) : [...prev, platform]
              )
            }
            type="button"
          >
            {platform}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {toneOptions.map((option) => (
          <button
            className={`rounded-full px-3 py-1 text-sm ${tone === option ? "bg-violet-600 text-white" : "bg-violet-50 text-violet-700"}`}
            key={option}
            onClick={() => setTone(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <Button className="mt-4" onClick={generate}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Generate
      </Button>
      {result ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Card className="p-3"><p className="text-xs text-gray-500">Hook</p><p className="text-sm">{result.hook}</p></Card>
          <Card className="p-3"><p className="text-xs text-gray-500">Script body</p><p className="text-sm">{result.script}</p></Card>
          <Card className="p-3"><p className="text-xs text-gray-500">Caption</p><p className="text-sm">{result.caption}</p></Card>
          <Card className="p-3"><p className="text-xs text-gray-500">Hashtags</p><p className="text-sm">{result.hashtags}</p></Card>
          <Card className="p-3 md:col-span-2"><p className="text-xs text-gray-500">Timing</p><p className="text-sm">{result.bestTime}</p></Card>
        </div>
      ) : null}
    </Card>
  );
}
