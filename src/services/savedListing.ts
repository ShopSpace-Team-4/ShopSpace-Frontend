import { SavedListing } from "@/app/tenant/saved/page";
import { useQuery } from "@tanstack/react-query";
import { allEndPoints } from "../../api";
import { apiFetch } from "@/lib/api/apiFetch";

export function useGetListings() {
  return useQuery({
    queryKey: ["savedlisting"],
    queryFn: () => apiFetch<SavedListing[]>(allEndPoints.listing),
  });
}
