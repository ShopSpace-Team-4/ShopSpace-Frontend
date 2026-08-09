import Image from "next/image";

// ---------- Types ----------

export type RequestStatus = "under-review" | "approved" | "declined";

export interface RequestItem {
  id: string;
  imageUrl: string;
  title: string;
  note: string; // e.g. "Awaiting landlord response"
  status: RequestStatus;
  time: string; // e.g. "2 days ago"
}

export interface RequestsListProps {
  title?: string;
  requests: RequestItem[];
  onItemClick?: (request: RequestItem) => void;
  className?: string;
}

// ---------- Config ----------

const statusStyles: Record<RequestStatus, string> = {
  "under-review": "text-amber-600",
  approved: "text-emerald-600",
  declined: "text-rose-600",
};

const statusLabels: Record<RequestStatus, string> = {
  "under-review": "Under Review",
  approved: "Approved",
  declined: "Declined",
};

// ---------- Component ----------

export default function RequestsList({
  title = "My Requests",
  requests,
  onItemClick,
  className = "",
}: RequestsListProps) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      <div className="mt-5 space-y-3">
        {requests.length === 0 && (
          <p className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
            No requests yet.
          </p>
        )}

        {requests.map((request) => (
          <div
            key={request.id}
            onClick={() => onItemClick?.(request)}
            className={`flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
              onItemClick ? "cursor-pointer" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={request.imageUrl}
                  alt={request.title}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {request.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">{request.note}</p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`text-xs font-semibold ${statusStyles[request.status]}`}
              >
                {statusLabels[request.status]}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">{request.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}