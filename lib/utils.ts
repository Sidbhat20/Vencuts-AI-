import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function getStatusDot(status: string) {
  if (["Paid", "Active", "Available"].includes(status)) return "bg-emerald-500";
  if (["Pending", "Paused", "On Shoot", "Medium", "Warm"].includes(status)) return "bg-amber-500";
  if (["Overdue", "High", "Hot"].includes(status)) return "bg-rose-500";
  if (["In Edit", "Draft"].includes(status)) return "bg-violet-500";
  return "bg-slate-400";
}

export function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
