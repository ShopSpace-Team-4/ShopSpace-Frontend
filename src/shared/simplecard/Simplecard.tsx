"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

export interface SimplePropertyCardProps {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  title: string;
  neighborhood: string;
  city: string;
  price: number;
  currency?: string; // e.g. "LE"
  pricePeriod?: string; // e.g. "yr"
  areaSqm: number;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
  className?: string;
}

export default function SimplePropertyCard({
  id,
  imageUrl,
  imageAlt = "Property image",
  title,
  neighborhood,
  city,
  price,
  currency = "LE",
  pricePeriod = "yr",
  areaSqm,
  isFavorited = false,
  onToggleFavorite,
  onClick,
  className = "",
}: SimplePropertyCardProps) {
  return (
    <div
      onClick={() => onClick?.(id)}
      className={`w-full max-w-[260px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Image */}
      <div className="relative h-36 w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="260px"
          className="object-cover"
        />

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(id);
          }}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-transform hover:scale-105"
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              isFavorited ? "fill-rose-500 text-rose-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-gray-400">
          {neighborhood}, {city}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-blue-600">
            {price.toLocaleString()} {currency}
            <span className="text-xs font-normal text-blue-400">
              /{pricePeriod}
            </span>
          </p>
          <span className="text-xs text-gray-400">{areaSqm} m²</span>
        </div>
      </div>
    </div>
  );
}