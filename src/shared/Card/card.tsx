"use client";

import Image from "next/image";
import {
  MapPin,
  Star,
  Ruler,
  Building2,
  ParkingCircle,
  ShieldCheck,
  Snowflake,
  BadgeCheck,
  Plus,
} from "lucide-react";

// ---------- Types ----------

export type PropertyStatus = "available" | "pending" | "reserved" | "sold";

export interface PropertyAgent {
  name: string;
  avatarUrl: string;
  verified?: boolean;
}

export interface PropertyCardProps {
  imageUrl: string;
  imageAlt?: string;
  status?: PropertyStatus;
  featured?: boolean;
  price: number;
  currency?: string; // e.g. "LE"
  pricePeriod?: string; // e.g. "yr", "mo"
  title: string;
  neighborhood: string;
  city: string;
  areaSqm: number;
  floors: number;
  rating: number;
  reviewsCount: number;
  amenities: string[]; // first 2 shown as chips, rest collapsed into "+N"
  agent: PropertyAgent;
  propertyType?: string; // top-right pill under Featured, e.g. "Retail"
  onClick?: () => void;
  className?: string;
}

// ---------- Config maps ----------

const statusStyles: Record<PropertyStatus, string> = {
  available: "bg-emerald-500/90 text-white",
  pending: "bg-amber-500/90 text-white",
  reserved: "bg-amber-500/90 text-white",
  sold: "bg-rose-500/90 text-white",
};

const statusLabels: Record<PropertyStatus, string> = {
  available: "Available",
  pending: "Pending",
  reserved: "Reserved",
  sold: "Sold",
};

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  parking: ParkingCircle,
  security: ShieldCheck,
  ac: Snowflake,
};

// ---------- Component ----------

export default function PropertyCard({
  imageUrl,
  imageAlt = "Property image",
  status = "available",
  featured = false,
  price,
  currency = "LE",
  pricePeriod = "yr",
  title,
  neighborhood,
  city,
  areaSqm,
  floors,
  rating,
  reviewsCount,
  amenities,
  agent,
  propertyType,
  onClick,
  className = "",
}: PropertyCardProps) {
  const visibleAmenities = amenities.slice(0, 2);
  const extraAmenitiesCount = Math.max(amenities.length - 2, 0);

  return (
    <div
      onClick={onClick}
      className={`group w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur ${statusStyles[status]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {statusLabels[status]}
          </span>

          {featured && (
            <span className="flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Featured
            </span>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/10 to-transparent p-3 pt-8">
          <p className="text-lg font-semibold text-white">
            {price.toLocaleString()} {currency}
            <span className="text-sm font-normal text-white/80">
              /{pricePeriod}
            </span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Title + type pill */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug text-gray-900">
            {title}
          </h3>
          {propertyType && (
            <span className="shrink-0 rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {propertyType}
            </span>
          )}
        </div>

        {/* Location */}
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5" />
          {neighborhood}, {city}
        </p>

        {/* Specs row */}
        <div className="mt-3 flex items-center justify-between border-b border-gray-100 pb-3 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4 text-gray-400" />
              {areaSqm} m²
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4 text-gray-400" />
              {floors} Floor{floors > 1 ? "s" : ""}
            </span>
          </div>

          <span className="flex items-center gap-1 font-medium text-gray-900">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {rating.toFixed(1)}
            <span className="font-normal text-gray-400">({reviewsCount})</span>
          </span>
        </div>

        {/* Amenities */}
        <div className="mt-3 flex flex-wrap gap-2">
          {visibleAmenities.map((amenity) => {
            const key = amenity.toLowerCase().replace(/\s+/g, "");
            const Icon = amenityIcons[key];
            return (
              <span
                key={amenity}
                className="flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {amenity}
              </span>
            );
          })}
          {extraAmenitiesCount > 0 && (
            <span className="flex items-center gap-0.5 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
              <Plus className="h-3 w-3" />
              {extraAmenitiesCount}
            </span>
          )}
        </div>

        {/* Agent */}
        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={agent.avatarUrl}
              alt={agent.name}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-700">{agent.name}</span>
          {agent.verified && (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
}