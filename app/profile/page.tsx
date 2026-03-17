import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-2xl font-semibold text-white">
          VK
        </div>
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-900">Venkataswaran</h2>
        <p className="text-center text-sm text-gray-500">Founder, Vencuts Media</p>
      </Card>

      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
            <p className="mt-1 text-sm text-gray-800">vk@vencuts.in</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
            <p className="mt-1 text-sm text-gray-800">6383867668</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Role</p>
            <p className="mt-1 text-sm text-gray-800">Agency Admin</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Location</p>
            <p className="mt-1 text-sm text-gray-800">Chennai, India</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
