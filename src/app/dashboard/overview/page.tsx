import { Wallet, Briefcase, BarChart3, MessageSquare } from "lucide-react";
import StatCard from "../../../shared/StatCard/StatCard";
import RevenueChart, {
  RevenuePoint,
} from "../../../shared/RevenueChart/RevenueChart";
import OccupancyList, {
  OccupancyUnit,
} from "../../../shared/OccupancyList/OccupancyList";
import ActivityFeed, {
  ActivityItem,
} from "../../../shared/ActivityFeed/ActivityFeed";

export interface DashboardOverviewProps {
  userName: string;
  totalRevenue: string;
  revenueChange?: string;
  activeListings: number;
  activeListingsChange?: string;
  occupancyRate: string;
  occupancyChange?: string;
  pendingInquiries: number;
  pendingInquiriesChange?: string;
  revenueData: RevenuePoint[];
  revenueYear?: string;
  occupancyUnits: OccupancyUnit[];
  activities: ActivityItem[];
}

export default function DashboardOverview({
  userName,
  totalRevenue,
  revenueChange,
  activeListings,
  activeListingsChange,
  occupancyRate,
  occupancyChange,
  pendingInquiries,
  pendingInquiriesChange,
  revenueData,
  revenueYear,
  occupancyUnits,
  activities,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-5 p-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Good morning, {userName} 👋
        </h1>
        <p className="mt-0.5 text-sm text-gray-400">
          Here&apos;s how your portfolio is performing today
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          iconClassName="bg-amber-50 text-amber-600"
          label="Total Revenue"
          value={totalRevenue}
          change={revenueChange}
          changeType="positive"
        />
        <StatCard
          icon={Briefcase}
          iconClassName="bg-gray-100 text-gray-600"
          label="Active Listings"
          value={String(activeListings)}
          change={activeListingsChange}
          changeType="positive"
        />
        <StatCard
          icon={BarChart3}
          iconClassName="bg-blue-50 text-blue-600"
          label="Occupancy Rate"
          value={occupancyRate}
          change={occupancyChange}
          changeType="positive"
        />
        <StatCard
          icon={MessageSquare}
          iconClassName="bg-purple-50 text-purple-600"
          label="Pending Inquiries"
          value={String(pendingInquiries)}
          change={pendingInquiriesChange}
          changeType="positive"
        />
      </div>

      {/* Chart + Occupancy */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RevenueChart title="Monthly Revenue" year={revenueYear} data={revenueData} />
        <OccupancyList title="Occupancy by Unit" units={occupancyUnits} />
      </div>

      {/* Activity feed */}
      <ActivityFeed title="Recent Activity" activities={activities} />
    </div>
  );
}