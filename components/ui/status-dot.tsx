import { cn, getStatusDot } from "@/lib/utils";

interface StatusDotProps {
  label: string;
  className?: string;
}

export function StatusDot({ label, className }: StatusDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-gray-600", className)}>
      <span className={cn("h-2.5 w-2.5 rounded-full", getStatusDot(label))} />
      {label}
    </span>
  );
}
