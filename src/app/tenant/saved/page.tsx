"use client";

import { useState } from "react";
import SimpCard, {
  SimplePropertyCardProps,
} from "../../../shared/simplecard/Simplecard";

type SavedListing = Omit<SimplePropertyCardProps, "onToggleFavorite" | "onClick">;

// بيانات تجريبية مؤقتة — استبدليها لاحقًا ببيانات جايه من الـ API
const savedListings: SavedListing[] = [
  {
    id: "1",
    imageUrl: "/LoginImg.jpg",
    title: "Prime Corner Unit",
    neighborhood: "Mandra",
    city: "Alexandria",
    price: 85000,
    currency: "LE",
    pricePeriod: "yr",
    areaSqm: 120,
    isFavorited: true,
  },
];

function Page() {
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(
    new Set(savedListings.filter((l) => l.isFavorited).map((l) => l.id))
  );

  function handleToggleFavorite(id: string) {
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Saved Listings</h1>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {savedListings.map((listing) => (
          <SimpCard
            key={listing.id}
            {...listing}
            isFavorited={favoritedIds.has(listing.id)}
            onToggleFavorite={handleToggleFavorite}
            onClick={(id: string) => console.log("Open listing:", id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;