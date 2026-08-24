"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/apiFetch";
import { allEndPoints } from "../../api";
import { Item, ListingsResponse } from "@/types/listing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ListingMeta {
  categories: string[];
  amenities: string[];
  statuses: string[];
}

export async function getListingsMeta() {
  return apiFetch<{ success: boolean; data: ListingMeta }>(allEndPoints.listing);
}

export interface CreateListingPayload {
  title: string;
  category: string;
  areaSqm: number;
  city: string;
  district: string;
  address: string;
  description: string;
  amenities: string[];
  numberOfFloors: number;
  floorNumber: number;
  availableFrom?: string;
  minimumLeaseTerm?: string;
  annualRent: number;
  currency?: string;
  securityDepositMonths: number;
}

export async function createListing(payload: CreateListingPayload) {
  return apiFetch<{ message: string; status: number; data: Item }>(
    allEndPoints.listings,
    {
      method: "POST",
      body: JSON.stringify({ currency: "EGP", ...payload }),
    },
  );
}

// Multipart upload can't go through apiFetch (it forces a JSON content-type),
// so this talks to the backend directly using the same httpOnly cookie token.
export async function uploadListingMedia(listingId: string, formData: FormData) {
  if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not configured");

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}${allEndPoints.listingMedia(listingId)}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Media upload failed: ${response.status}`);
  }

  return response.json() as Promise<{
    message: string;
    status: number;
    data: { id: string; media: Item["media"]; thumbnailUrl?: string };
  }>;
}

export async function publishListing(listingId: string) {
  return apiFetch<{ message: string; status: number; data: { id: string; status: string } }>(
    allEndPoints.listingStatus(listingId),
    { method: "PATCH", body: JSON.stringify({ status: "AVAILABLE" }) },
  );
}

export interface BrowseListingsParams {
  city?: string;
  district?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  status?: string;
  amenities?: string[];
  page?: number;
  limit?: number;
  sort?: string;
}

export async function getListings(params: BrowseListingsParams = {}) {
  const query = new URLSearchParams();

  if (params.city) query.set("city", params.city);
  if (params.district) query.set("district", params.district);
  if (params.category) query.set("category", params.category);
  if (params.priceMin != null) query.set("priceMin", String(params.priceMin));
  if (params.priceMax != null) query.set("priceMax", String(params.priceMax));
  if (params.sizeMin != null) query.set("sizeMin", String(params.sizeMin));
  if (params.sizeMax != null) query.set("sizeMax", String(params.sizeMax));
  if (params.status) query.set("status", params.status);
  if (params.amenities?.length) {
    params.amenities.forEach((a) => query.append("amenities", a));
  }
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 100));
  if (params.sort) query.set("sort", params.sort);

  return apiFetch<ListingsResponse>(`${allEndPoints.listings}?${query.toString()}`);
}

export async function getListingById(id: string) {
  return apiFetch<{ message: string; status: number; data: Item }>(
    allEndPoints.listingById(id),
  );
}

export async function saveListing(id: string) {
  return apiFetch<{ message: string; status: number }>(
    `${allEndPoints.listingById(id)}/save`,
    { method: "POST" },
  );
}

export async function unsaveListing(id: string) {
  return apiFetch<{ message: string; status: number }>(
    `${allEndPoints.listingById(id)}/save`,
    { method: "DELETE" },
  );
}