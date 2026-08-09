import Image from "next/image";

// ---------- Types ----------

export type LeaseStatus = "active" | "ended";

export interface LeaseItem {
  id: string;
  imageUrl: string;
  title: string;
  period: string; // e.g. "Jan 2024 – Present"
  price: number;
  currency?: string; // e.g. "LE"
  pricePeriod?: string; // e.g. "yr"
  status: LeaseStatus;
  contractUrl?: string;
}

export interface LeaseHistoryListProps {
  title?: string;
  leases: LeaseItem[];
  onContractClick?: (lease: LeaseItem) => void;
  className?: string;
}

// ---------- Config ----------

const statusStyles: Record<LeaseStatus, string> = {
  active: "text-emerald-600",
  ended: "text-gray-400",
};

const statusLabels: Record<LeaseStatus, string> = {
  active: "Active",
  ended: "Ended",
};

// ---------- Component ----------

export default function LeaseHistoryList({
  title = "Lease History",
  leases = [],
  onContractClick,
  className = "",
}: LeaseHistoryListProps) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      <div className="mt-5 space-y-3">
        {leases.length === 0 && (
          <p className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
            No leases yet.
          </p>
        )}

        {leases.map((lease) => (
          <div
            key={lease.id}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={lease.imageUrl}
                  alt={lease.title}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {lease.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{lease.period}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {lease.price.toLocaleString()} {lease.currency ?? "LE"}
                  <span className="text-xs font-normal text-gray-400">
                    /{lease.pricePeriod ?? "yr"}
                  </span>
                </p>
                <p
                  className={`mt-0.5 text-xs font-medium ${statusStyles[lease.status]}`}
                >
                  {statusLabels[lease.status]}
                </p>
              </div>

              <button
                onClick={() => onContractClick?.(lease)}
                className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Contract
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}