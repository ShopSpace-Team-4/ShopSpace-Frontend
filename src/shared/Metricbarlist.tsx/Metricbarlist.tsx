export interface MetricBarItem {
  label: string;
  value: string; // display value, e.g. "1420" or "52%"
  percentage: number; // 0-100, drives the bar width
}

export interface MetricBarListProps {
  title: string;
  items: MetricBarItem[];
  barGradient?: string; // Tailwind gradient classes for the bar fill
  className?: string;
}

export default function MetricBarList({
  title,
  items = [],
  barGradient = "bg-gradient-to-r from-blue-500 to-teal-400",
  className = "",
}: MetricBarListProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${barGradient}`}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}