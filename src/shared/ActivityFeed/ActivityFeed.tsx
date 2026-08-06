import { LucideIcon, MessageCircle, FileCheck2, Eye, Star } from "lucide-react";

export type ActivityType = "inquiry" | "contract" | "view" | "review";

export interface ActivityItem {
  type: ActivityType;
  message: string;
  time: string; // e.g. "2 hours ago"
}

export interface ActivityFeedProps {
  title?: string;
  activities: ActivityItem[];
  className?: string;
}

const activityIcons: Record<ActivityType, LucideIcon> = {
  inquiry: MessageCircle,
  contract: FileCheck2,
  view: Eye,
  review: Star,
};

const activityIconStyles: Record<ActivityType, string> = {
  inquiry: "bg-blue-50 text-blue-600",
  contract: "bg-emerald-50 text-emerald-600",
  view: "bg-purple-50 text-purple-600",
  review: "bg-amber-50 text-amber-600",
};

export default function ActivityFeed({
  title = "Recent Activity",
  activities = [],
  className = "",
}: ActivityFeedProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

      <div className="mt-3">
        {activities.map((activity, i) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={i}
              className={`flex items-start gap-3 py-3 ${
                i !== activities.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityIconStyles[activity.type]}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm text-gray-800">{activity.message}</p>
                <p className="mt-0.5 text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}