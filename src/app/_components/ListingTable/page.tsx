import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Pencil } from "lucide-react";

// ---------- Types ----------

export type ListingStatus = "available" | "pending" | "sold";

export interface ListingRow {
  id: string;
  imageUrl: string;
  title: string;
  neighborhood: string;
  city: string;
  category: string;
  areaSqm: number;
  price: number;
  currency?: string; // e.g. "LE"
  pricePeriod?: string; // e.g. "yr"
  status: ListingStatus;
}

export interface ListingsTableProps {
  title?: string;
  listings: ListingRow[];
  isLoading?: boolean;
  onAddNew?: () => void;
  onView?: (listing: ListingRow) => void;
  onEdit?: (listing: ListingRow) => void;
  addNewHref?: string;
  className?: string;
}

// ---------- Config ----------

const statusStyles: Record<ListingStatus, string> = {
  available: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  sold: "bg-rose-50 text-rose-600",
};

const statusDot: Record<ListingStatus, string> = {
  available: "bg-emerald-500",
  pending: "bg-amber-500",
  sold: "bg-rose-500",
};

const statusLabels: Record<ListingStatus, string> = {
  available: "Available",
  pending: "Pending",
  sold: "Sold",
};

// ---------- Component ----------

export default function ListingsTable({
  title = "My Listings",
  listings = [],
  isLoading = false,
  onAddNew,
  addNewHref,
  onView,
  onEdit,
  className = "",
}: ListingsTableProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {addNewHref ? (
          <Link
            href={addNewHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add New Listing
          </Link>
        ) : (
          onAddNew && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add New Listing
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
              <th className="px-5 py-3 font-medium">Property</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Area</th>
              <th className="px-5 py-3 font-medium">Price/yr</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-4" colSpan={6}>
                    <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
                  </td>
                </tr>
              ))}

            {!isLoading && listings.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  No listings yet.
                </td>
              </tr>
            )}

            {!isLoading &&
              listings.map((listing) => (
                <tr
                  key={listing.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
                >
                  {/* Property */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={listing.imageUrl}
                          alt={listing.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {listing.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {listing.neighborhood}, {listing.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3 text-gray-600">
                    {listing.category}
                  </td>

                  {/* Area */}
                  <td className="px-5 py-3 text-gray-600">
                    {listing.areaSqm} m²
                  </td>

                  {/* Price */}
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {listing.price.toLocaleString()}{" "}
                    {listing.currency ?? "LE"}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3">
                    <span
                      className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[listing.status]
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          statusDot[listing.status]
                        }`}
                      />
                      {statusLabels[listing.status]}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView?.(listing)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        aria-label="View listing"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit?.(listing)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Edit listing"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}