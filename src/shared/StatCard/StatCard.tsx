import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  icon?: LucideIcon; // omit for a simpler text-only card
  iconClassName?: string; // background/color for the icon chip
  label: string;
  value: string;
  change?: string; // e.g. "+12.4%"
  changeType?: "positive" | "negative" | "neutral";
  className?: string;
}

const changeStyles: Record<"positive" | "negative" | "neutral", string> = {
  positive: "text-emerald-600",
  negative: "text-rose-600",
  neutral: "text-gray-500",
};

export default function StatCard({
  icon: Icon,
  iconClassName = "bg-amber-50 text-amber-600",
  label,
  value,
  change,
  changeType = "positive",
  className = "",
}: StatCardProps) {
  if (!Icon) {
    // Simple text-only variant (label on top, no icon chip)
    return (
      <div
        className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
      >
        <p className="text-xs text-gray-400">{label}</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <span
            className={`mt-2 inline-block text-xs font-medium ${changeStyles[changeType]}`}
          >
            {change}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>

        {change && (
          <span className={`text-xs font-medium ${changeStyles[changeType]}`}>
            {change}
          </span>
        )}
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-xs text-gray-400">{label}</p>
    </div>
  );
}