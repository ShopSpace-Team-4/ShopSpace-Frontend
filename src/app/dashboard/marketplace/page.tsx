"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyCard, { PropertyStatus } from "@/shared/Card/card";
import { getListings } from "@/actions/listings";
import type { Item } from "@/types/listing";

const amenityOptions = [
  { code: "PARKING", label: "Parking" },
  { code: "SECURITY", label: "Security" },
  { code: "AC", label: "AC" },
  { code: "STORAGE", label: "Storage" },
  { code: "LOADING_DOCK", label: "Loading Dock" },
];

const PRICE_MIN = 30_000;
const PRICE_MAX = 1_000_000;

const statusMap: Record<Item["status"], PropertyStatus> = {
  AVAILABLE: "available",
  PENDING: "pending",
  RENTED: "reserved",
  EXPIRED: "sold",
};

function toTitleCase(code: string) {
  return code
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function MarketplacePage() {
  const router = useRouter();
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minArea, setMinArea] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleAmenity = (code: string) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchListings() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getListings({
          status: "AVAILABLE",
          priceMax: maxPrice,
          sizeMin: minArea || undefined,
          amenities: selectedAmenities.size > 0 ? Array.from(selectedAmenities) : undefined,
          limit: 100,
        });
        if (!cancelled) setItems(response.data.items);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load listings.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchListings();

    return () => {
      cancelled = true;
    };
    // Re-fetch whenever a filter changes; the backend applies the filtering.
  }, [maxPrice, minArea, selectedAmenities]);

  const cards = useMemo(
    () =>
      items.map((item) => ({
        item,
        cardProps: {
          imageUrl: item.thumbnailUrl || "/images/listing-1.jpg",
          status: statusMap[item.status] ?? "available",
          price: item.annualRent,
          currency: item.currency,
          pricePeriod: "yr",
          title: item.title,
          neighborhood: item.district,
          city: item.city,
          areaSqm: item.areaSqm,
          floors: item.numberOfFloors || 1,
          rating: 4.8,
          reviewsCount: 0,
          amenities: item.amenities.map(toTitleCase),
          agent: {
            name: "Listing Owner",
            avatarUrl: "/images/agent-1.jpg",
            verified: false,
          },
          propertyType: item.category,
        },
      })),
    [items],
  );

  return (
    <div className="flex gap-6">
      {/* Filters sidebar */}
      <aside className="flex w-[240px] shrink-0 flex-col gap-4">
        {/* Price Range */}
        <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-5">
          <p className="text-[13px] font-bold text-(--text-primary)">Price Range</p>
          <p className="mt-4 text-xs text-(--text-tertiary)">
            Max: EGP {maxPrice.toLocaleString()} / year
          </p>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-(--bg-sunken) accent-(--brand-primary)"
          />
          <div className="mt-1 flex justify-between text-[11px] text-(--text-tertiary)">
            <span>EGP 30K</span>
            <span>EGP 1M</span>
          </div>
        </div>

        {/* Minimum Area */}
        <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-5">
          <p className="text-[13px] font-bold text-(--text-primary)">Minimum Area (m²)</p>
          <input
            type="range"
            min={0}
            max={400}
            step={10}
            value={minArea}
            onChange={(e) => setMinArea(Number(e.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-(--bg-sunken) accent-(--brand-primary)"
          />
          <div className="mt-1 flex justify-between text-[11px] text-(--text-tertiary)">
            <span>Any</span>
            <span>{minArea}+ m²</span>
          </div>
        </div>

        <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-5">
          <p className="text-[13px] font-bold text-(--text-primary)">Amenities</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {amenityOptions.map(({ code, label }) => {
              const isChecked = selectedAmenities.has(code);
              return (
                <label
                  key={code}
                  className="flex items-center gap-2.5 text-[13px] text-(--text-secondary) cursor-pointer"
                >
                  <span
                    onClick={() => toggleAmenity(code)}
                    className={[
                      "flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border",
                      isChecked
                        ? "border-(--brand-primary) bg-(--brand-primary)"
                        : "border-[#767676] bg-(--bg-elevated)",
                    ].join(" ")}
                  >
                    {isChecked && (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                        <path
                          d="M2.5 6.5L4.5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {label}
                </label>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        {isLoading && (
          <p className="mt-10 text-center text-sm text-(--text-tertiary)">
            Loading listings…
          </p>
        )}

        {!isLoading && error && (
          <p className="mt-10 text-center text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map(({ item, cardProps }) => (
                <PropertyCard
                  key={item.id}
                  {...cardProps}
                  onClick={() => router.push(`/dashboard/marketplace/${item.id}`)}
                />
              ))}
            </div>

            {cards.length === 0 && (
              <p className="mt-10 text-center text-sm text-(--text-tertiary)">
                No listings match your filters. Try widening your search.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}