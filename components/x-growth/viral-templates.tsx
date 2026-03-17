import { TweetTemplate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ViralTemplates({ templates, onSchedule }: { templates: TweetTemplate[]; onSchedule: (tweet: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <p className="text-xs uppercase tracking-wide text-violet-600">{template.type}</p>
          <p className="mt-2 text-sm text-gray-700">{template.preview}</p>
          <p className="mt-2 text-xs text-gray-500">Prediction: {template.prediction}</p>
          <Button className="mt-3" variant="outline" onClick={() => onSchedule(template.preview)}>
            Schedule
          </Button>
        </Card>
      ))}
    </div>
  );
}
