import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/projects/project-card";

const columns: Project["status"][] = ["Shooting", "Editing", "Review", "Delivered"];

export function KanbanBoard({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {columns.map((col) => (
        <div className="rounded-xl border border-gray-200 bg-violet-50/50 p-3" key={col}>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">{col}</h3>
          <div className="space-y-3">
            {projects
              .filter((project) => project.status === col)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
