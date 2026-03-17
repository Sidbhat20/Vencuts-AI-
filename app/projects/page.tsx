"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/projects/kanban-board";
import { projects } from "@/lib/mock-data";
import { StatusDot } from "@/components/ui/status-dot";

export default function ProjectsPage() {
  const [view, setView] = useState<"kanban" | "table">("kanban");

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <PageHeader title="Projects" actionLabel="New Project" />
        <Button variant="outline" size="sm" onClick={() => setView((prev) => (prev === "kanban" ? "table" : "kanban"))}>
          {view === "kanban" ? "Table View" : "Kanban View"}
        </Button>
      </div>

      {view === "kanban" ? (
        <KanbanBoard projects={projects} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-violet-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Editor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-gray-100 hover:bg-violet-50">
                  <td className="px-4 py-3 font-medium">{project.name}</td>
                  <td className="px-4 py-3">{project.clientName}</td>
                  <td className="px-4 py-3">{project.editorName}</td>
                  <td className="px-4 py-3"><StatusDot label={project.status} /></td>
                  <td className="px-4 py-3">{project.dueDate}</td>
                  <td className="px-4 py-3"><StatusDot label={project.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
