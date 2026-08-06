import StatCard from "../../../shared/StatCard/StatCard";
import TrendChart, { TrendPoint } from "../../../shared/Trendchart/Trendchart";
import MetricBarList, {
  MetricBarItem,
} from "../../../shared/Metricbarlist.tsx/Metricbarlist";

export interface AnalyticsOverviewProps {
  totalViews: string;
  totalViewsChange?: string;
  inquiriesReceived: string;
  inquiriesChange?: string;
  conversionRate: string;
  conversionChange?: string;
  revenueTrend: TrendPoint[];
  viewsByListing: MetricBarItem[];
  topInquirySources: MetricBarItem[];
}

export default function AnalyticsOverview({
  totalViews,
  totalViewsChange,
  inquiriesReceived,
  inquiriesChange,
  conversionRate,
  conversionChange,
  revenueTrend,
  viewsByListing,
  topInquirySources,
}: AnalyticsOverviewProps) {
  return (
    <div className="space-y-5 p-6">
      <h1 className="text-lg font-bold text-gray-900">Analytics</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Views (30d)"
          value={totalViews}
          change={totalViewsChange}
        />
        <StatCard
          label="Inquiries Received"
          value={inquiriesReceived}
          change={inquiriesChange}
        />
        <StatCard
          label="Conversion Rate"
          value={conversionRate}
          change={conversionChange}
        />
      </div>

      {/* Trend chart */}
      <TrendChart title="Revenue Trend (12 months)" data={revenueTrend} />

      {/* Bar lists */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <MetricBarList title="Views by Listing" items={viewsByListing} />
        <MetricBarList title="Top Inquiry Sources" items={topInquirySources} />
      </div>
    </div>
  );
}