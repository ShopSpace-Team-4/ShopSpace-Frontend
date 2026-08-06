export interface OccupancyUnit {
  name: string;
  percentage: number; // 0-100
  status: string; // e.g. "Occupied", "Vacant"
}

export interface OccupancyListProps {
  title?: string;
  units: OccupancyUnit[];
  className?: string;
}

export default function OccupancyList({
  title = "Occupancy by Unit",
  units = [],
  className = "",
}: OccupancyListProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

      <div className="mt-4 space-y-4">
        {units.map((unit) => (
          <div key={unit.name}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{unit.name}</span>
              <span className="font-medium text-emerald-600">
                {unit.status}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-teal-500"
                style={{ width: `${Math.min(unit.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}