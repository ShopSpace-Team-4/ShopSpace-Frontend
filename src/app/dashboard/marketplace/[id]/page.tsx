"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Building2,
  Star,
  Wallet,
  Heart,
  MessageCircle,
  Sparkles,
  BadgeCheck,
  Check,
} from "lucide-react";
import { getListingById } from "@/lib/listings";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const listing = getListingById(params.id);
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-sm text-(--text-secondary)">
          We couldn&apos;t find that listing.
        </p>
        <Link
          href="/dashboard/marketplace"
          className="text-sm font-medium text-(--brand-primary) hover:underline"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Back link */}
      <Link
        href="/dashboard/marketplace"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-(--brand-primary) hover:underline"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back to Marketplace
      </Link>

      {/* Main layout */}
      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left column */}
        <div className="flex w-full flex-col gap-4 lg:max-w-[760px]">
          {/* Gallery */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-(--bg-sunken)">
            <Image
              src={listing.images[activeImage]}
              alt={listing.title}
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          {listing.images.length > 1 && (
            <div className="flex gap-2">
              {listing.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={[
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2",
                    index === activeImage
                      ? "border-(--brand-primary)"
                      : "border-transparent",
                  ].join(" ")}
                >
                  <Image
                    src={img}
                    alt={`${listing.title} photo ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Info card */}
          <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-(--status-success-subtle) px-2.5 py-1 text-[11px] font-semibold tracking-wide text-(--status-success-text)">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--status-success)/80" />
                    {listing.status === "available" ? "Available" : listing.status}
                  </span>
                  <span className="rounded-full border border-(--border-base) px-2.5 py-1 text-[11px] font-semibold tracking-wide text-(--text-secondary)">
                    {listing.propertyType}
                  </span>
                  {listing.featured && (
                    <span className="rounded-full bg-(--brand-primary-subtle) px-2.5 py-1 text-[11px] font-semibold tracking-wide text-(--brand-primary)">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <h1 className="mt-2.5 text-2xl font-extrabold tracking-[-0.4px] text-(--text-primary)">
                  {listing.title}
                </h1>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-(--text-tertiary)">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {listing.neighborhood}, {listing.city}
                </p>
              </div>

              <button
                type="button"
                aria-label="Save listing"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--bg-sunken) transition-colors hover:bg-(--border-base) cursor-pointer"
              >
                <Heart className="h-[18px] w-[18px] text-(--text-tertiary)" strokeWidth={1.75} />
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-5 grid grid-cols-2 gap-y-4 border-y border-(--border-base) py-5 sm:grid-cols-4">
              <Stat icon={<Ruler className="h-5 w-5" />} label="Area" value={`${listing.areaSqm} m²`} />
              <Stat
                icon={<Building2 className="h-5 w-5" />}
                label="Floors"
                value={`${listing.floors} Floor${listing.floors > 1 ? "s" : ""}`}
              />
              <Stat
                icon={<Star className="h-5 w-5 fill-amber-400 text-amber-400" />}
                label="Rating"
                value={`${listing.rating.toFixed(1)}/5 (${listing.reviewsCount})`}
              />
              <Stat icon={<Wallet className="h-5 w-5" />} label="Deposit" value={listing.deposit} />
            </div>

            {/* Description */}
            <h2 className="mt-5 text-base font-bold text-(--text-primary)">Description</h2>
            <p className="mt-3 text-sm leading-[24px] text-(--text-secondary)">
              {listing.description}
            </p>

            {/* Amenities */}
            <h2 className="mt-5 text-base font-bold text-(--text-primary)">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-1.5 rounded-md bg-(--bg-sunken) px-3.5 py-2 text-[13px] font-medium text-(--text-secondary)"
                >
                  <Check className="h-3.5 w-3.5 text-(--brand-accent)" strokeWidth={2} />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-7">
            <h2 className="text-base font-bold text-(--text-primary)">Location</h2>
            <div className="relative mt-4 flex h-60 items-center justify-center overflow-hidden rounded-[10px] bg-linear-to-br from-(--brand-primary-subtle) to-sky-100">
              <span className="flex items-center gap-1.5 rounded-full bg-(--brand-primary) px-4 py-2 text-[13px] font-semibold text-(--text-inverse) shadow-[0_4px_20px_rgba(37,99,235,0.28)]">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                {listing.neighborhood}, {listing.city}
              </span>
            </div>
          </div>
        </div>

        {/* Right column (sticky sidebar) */}
        <div className="flex w-full flex-col gap-4 lg:sticky lg:top-7 lg:max-w-[360px]">
          {/* Price + CTAs */}
          <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-6 shadow-[0_4px_12px_rgba(15,23,42,0.07),0_2px_6px_rgba(15,23,42,0.04)]">
            <p className="text-3xl font-extrabold text-(--brand-primary)">
              {listing.price.toLocaleString()} {listing.currency}
            </p>
            <p className="mt-1 pb-5 text-[13px] text-(--text-tertiary)">
              per {listing.pricePeriod === "yr" ? "year" : listing.pricePeriod} + VAT
            </p>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-(--brand-primary) px-7 py-3 text-[15px] font-semibold text-(--text-inverse) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-(--brand-primary-hover) cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2} />
              Contact Landlord
            </button>

            <button
              type="button"
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full bg-(--brand-accent) px-5 py-2.5 text-sm font-semibold text-(--text-inverse) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-(--brand-accent-hover) cursor-pointer"
            >
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              Ask AI Advisor About This
            </button>
          </div>

          {/* About the landlord */}
          <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-5">
            <p className="text-[13px] font-bold text-(--text-primary)">About the Landlord</p>

            <div className="mt-3.5 flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-(--brand-primary-subtle)">
                <Image
                  src={listing.agent.avatarUrl}
                  alt={listing.agent.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-(--text-primary)">{listing.agent.name}</p>
                {listing.agent.verified && (
                  <span className="mt-1 flex w-fit items-center gap-1 rounded-full bg-(--brand-accent-subtle) px-2.5 py-1 text-[11px] font-semibold tracking-wide text-(--brand-accent-hover)">
                    <BadgeCheck className="h-3 w-3" strokeWidth={2} />
                    Verified Landlord
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2">
              <AgentStat label="Response Rate" value={listing.agentStats.responseRate} />
              <AgentStat label="Avg Response" value={listing.agentStats.avgResponse} />
              <AgentStat label="Listed Since" value={listing.agentStats.listedSince} />
              <AgentStat label="Active Units" value={String(listing.agentStats.activeUnits)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-(--text-primary)">
      <span className="text-(--text-primary)">{icon}</span>
      <span className="text-[11px] text-(--text-tertiary)">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function AgentStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-(--bg-sunken) px-3 py-2.5">
      <p className="text-[10px] text-(--text-tertiary)">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-(--text-primary)">{value}</p>
    </div>
  );
}