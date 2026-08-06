"use client";

import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface RevenuePoint {
  month: string; // e.g. "J", "F", "M"...
  value: number;
}

export interface RevenueChartProps {
  title?: string;
  year?: string;
  data: RevenuePoint[];
  className?: string;
}

export default function RevenueChart({
  title = "Monthly Revenue",
  year,
  data,
  className = "",
}: RevenueChartProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {year && (
          <span className="text-xs font-medium text-emerald-600">{year}</span>
        )}
      </div>

      <div className="mt-4 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #f3f4f6",
                fontSize: 12,
              }}
              labelStyle={{ color: "#111827" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#revenueFill)"
              dot={{ r: 3, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}