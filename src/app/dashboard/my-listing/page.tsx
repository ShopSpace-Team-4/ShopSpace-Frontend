import Link from "next/link";
import { Plus } from "lucide-react";
import ListingsTable from "@/app/_components/ListingTable/page";
import { apiFetch } from "@/lib/api/apiFetch";
import type { ListingsResponse } from "@/types/listing";

async function page() {
  const res = await apiFetch<ListingsResponse>("/listings");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Link
          href="/dashboard/add-listing"
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add New Listing
        </Link>
      </div>

      <ListingsTable listings={res.data.items} />
    </div>
  );
}

export default page;
