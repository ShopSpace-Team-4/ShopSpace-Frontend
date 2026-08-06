"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export interface TrendPoint {
  label: string; // e.g. month index/name
  value: number;
}

export interface TrendChartProps {
  title?: string;
  data: TrendPoint[];
  className?: string;
}

export default function TrendChart({
  title = "Revenue Trend (12 months)",
  data,
  className = "",
}: TrendChartProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

      <div className="mt-4 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9ca3af" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#9ca3af" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              stroke="#4f46e5"
              strokeWidth={2}
              fill="url(#trendFill)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}