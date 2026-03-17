import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { StatusDot } from "@/components/ui/status-dot";
import { teamMembers } from "@/lib/mock-data";

const stats = [
  { label: "Total Members", value: "6" },
  { label: "Videos Edited Today", value: "8" },
  { label: "Avg Edit Time", value: "3.2 hrs" },
  { label: "Utilization", value: "78%" },
];

export default function TeamPage() {
  return (
    <div>
      <PageHeader title="Team" actionLabel="Add Member" />
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
            <p className="mt-2 text-xl font-semibold">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">{member.initials}</div>
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <StatusDot label={member.status} />
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>Videos this week: {member.videosPerWeek}</p>
              <p>Avg edit time: {member.avgEditHours} hrs</p>
              <p>Current: {member.currentAssignment}</p>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {member.output7Days.map((value, idx) => (
                <span className="w-full rounded-t bg-violet-300" key={idx} style={{ height: `${value * 12}px` }} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
