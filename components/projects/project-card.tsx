import { Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusDot } from "@/components/ui/status-dot";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-4">
      <p className="text-sm font-semibold text-gray-900">{project.name}</p>
      <p className="mt-0.5 text-xs text-gray-500">{project.clientName}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[10px] font-semibold text-violet-700">
            {project.editorInitials}
          </span>
          {project.editorName}
        </span>
        <span>{project.dueDate}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <StatusDot label={project.priority} className="text-xs" />
        <StatusDot label={project.status} className="text-xs" />
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-100">
        <div className="h-full rounded-full bg-violet-600" style={{ width: `${project.progress}%` }} />
      </div>
    </Card>
  );
}
