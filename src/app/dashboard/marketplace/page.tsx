"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/shared/Card/card";
import { listings } from "@/lib/listings";

const amenityOptions = ["Parking", "Security", "AC", "Storage", "Loading Dock"];

const PRICE_MIN = 30_000;
const PRICE_MAX = 300_000;

export default function MarketplacePage() {
  const router = useRouter();
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minArea, setMinArea] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(amenity)) {
        next.delete(amenity);
      } else {
        next.add(amenity);
      }
      return next;
    });
  };

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      if (listing.price > maxPrice) return false;
      if (listing.areaSqm < minArea) return false;
      if (selectedAmenities.size > 0) {
        const hasAll = [...selectedAmenities].every((a) => listing.amenities.includes(a));
        if (!hasAll) return false;
      }
      return true;
    });
  }, [maxPrice, minArea, selectedAmenities]);

  return (
    <div className="flex gap-6">
      {/* Filters sidebar */}
      <aside className="flex w-[240px] shrink-0 flex-col gap-4">
        {/* Price Range */}
        <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-5">
          <p className="text-[13px] font-bold text-(--text-primary)">Price Range</p>
          <p className="mt-4 text-xs text-(--text-tertiary)">
            Max: SAR {maxPrice.toLocaleString()} / year
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
            <span>SAR 30K</span>
            <span>SAR 300K</span>
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
            {amenityOptions.map((amenity) => {
              const isChecked = selectedAmenities.has(amenity);
              return (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 text-[13px] text-(--text-secondary) cursor-pointer"
                >
                  <span
                    onClick={() => toggleAmenity(amenity)}
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
                  {amenity}
                </label>
              );
            })}
          </div>
        </div>
      </aside>

      
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <PropertyCard
              key={listing.id}
              {...listing}
              onClick={() => router.push(`/dashboard/marketplace/${listing.id}`)}
            />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <p className="mt-10 text-center text-sm text-(--text-tertiary)">
            No listings match your filters. Try widening your search.
          </p>
        )}
      </div>
    </div>
  );
}