"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Building2,
  Wallet,
  Heart,
  MessageCircle,
  Sparkles,
  Check,
} from "lucide-react";
import { getListingById, saveListing, unsaveListing } from "@/actions/listings";
import type { Item } from "@/types/listing";

function toTitleCase(code: string) {
  return code
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const statusLabel: Record<Item["status"], string> = {
  AVAILABLE: "Available",
  PENDING: "Pending",
  RENTED: "Rented",
  EXPIRED: "Expired",
};

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [listing, setListing] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchListing() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getListingById(params.id);
        if (!cancelled) {
          setListing(response.data);
          setIsSaved(Boolean(response.data.isSaved));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "We couldn't load that listing.",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    if (params.id) fetchListing();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleToggleSave = async () => {
    if (!listing || isSaving) return;
    setIsSaving(true);
    const nextSaved = !isSaved;
    setIsSaved(nextSaved); // optimistic
    try {
      if (nextSaved) {
        await saveListing(listing.id);
      } else {
        await unsaveListing(listing.id);
      }
    } catch {
      setIsSaved(!nextSaved); // revert on failure
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-sm text-(--text-secondary)">Loading listing…</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-sm text-(--text-secondary)">
          {error || "We couldn't find that listing."}
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

  const images =
    listing.media.length > 0 ?
      listing.media.map((m) => m.url)
    : listing.thumbnailUrl ?
      [listing.thumbnailUrl]
    : ["/images/listing-1.jpg"];

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
              src={images[activeImage]}
              alt={listing.title}
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={img + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={[
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2",
                    index === activeImage ?
                      "border-(--brand-primary)"
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
                    {statusLabel[listing.status]}
                  </span>
                  <span className="rounded-full border border-(--border-base) px-2.5 py-1 text-[11px] font-semibold tracking-wide text-(--text-secondary)">
                    {listing.category}
                  </span>
                </div>

                <h1 className="mt-2.5 text-2xl font-extrabold tracking-[-0.4px] text-(--text-primary)">
                  {listing.title}
                </h1>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-(--text-tertiary)">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {listing.district}, {listing.city}
                </p>
              </div>

              <button
                type="button"
                aria-label="Save listing"
                onClick={handleToggleSave}
                disabled={isSaving}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--bg-sunken) transition-colors hover:bg-(--border-base) cursor-pointer disabled:cursor-not-allowed"
              >
                <Heart
                  className={[
                    "h-[18px] w-[18px]",
                    isSaved ? "fill-rose-500 text-rose-500" : "text-(--text-tertiary)",
                  ].join(" ")}
                  strokeWidth={1.75}
                />
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-5 grid grid-cols-2 gap-y-4 border-y border-(--border-base) py-5 sm:grid-cols-4">
              <Stat icon={<Ruler className="h-5 w-5" />} label="Area" value={`${listing.areaSqm} m²`} />
              <Stat
                icon={<Building2 className="h-5 w-5" />}
                label="Floors"
                value={`${listing.numberOfFloors} Floor${listing.numberOfFloors > 1 ? "s" : ""}`}
              />
              <Stat
                icon={<Building2 className="h-5 w-5" />}
                label="Floor #"
                value={listing.floorNumber === 0 ? "Ground" : String(listing.floorNumber)}
              />
              <Stat
                icon={<Wallet className="h-5 w-5" />}
                label="Deposit"
                value={`${listing.securityDepositMonths} month${listing.securityDepositMonths > 1 ? "s" : ""}`}
              />
            </div>

            {/* Description */}
            <h2 className="mt-5 text-base font-bold text-(--text-primary)">Description</h2>
            <p className="mt-3 text-sm leading-[24px] text-(--text-secondary)">
              {listing.description}
            </p>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <>
                <h2 className="mt-5 text-base font-bold text-(--text-primary)">Amenities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-1.5 rounded-md bg-(--bg-sunken) px-3.5 py-2 text-[13px] font-medium text-(--text-secondary)"
                    >
                      <Check className="h-3.5 w-3.5 text-(--brand-accent)" strokeWidth={2} />
                      {toTitleCase(amenity)}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Location */}
          <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-7">
            <h2 className="text-base font-bold text-(--text-primary)">Location</h2>
            <div className="relative mt-4 flex h-60 items-center justify-center overflow-hidden rounded-[10px] bg-linear-to-br from-(--brand-primary-subtle) to-sky-100">
              <span className="flex items-center gap-1.5 rounded-full bg-(--brand-primary) px-4 py-2 text-[13px] font-semibold text-(--text-inverse) shadow-[0_4px_20px_rgba(37,99,235,0.28)]">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                {listing.district}, {listing.city}
              </span>
            </div>
            <p className="mt-3 text-sm text-(--text-tertiary)">{listing.address}</p>
          </div>
        </div>

        {/* Right column (sticky sidebar) */}
        <div className="flex w-full flex-col gap-4 lg:sticky lg:top-7 lg:max-w-[360px]">
          {/* Price + CTAs */}
          <div className="rounded-[18px] border border-(--border-base) bg-(--bg-elevated) p-6 shadow-[0_4px_12px_rgba(15,23,42,0.07),0_2px_6px_rgba(15,23,42,0.04)]">
            <p className="text-3xl font-extrabold text-(--brand-primary)">
              {listing.annualRentWithVat.toLocaleString()} {listing.currency}
            </p>
            <p className="mt-1 text-[13px] text-(--text-tertiary)">
              {listing.annualRent.toLocaleString()} {listing.currency} + VAT, per year
            </p>
            <p className="pb-5 text-[11px] text-(--text-tertiary)">
              Minimum lease term: {listing.minimumLeaseTerm || "—"}
            </p>

            {listing.whatsappLink ?
              <a
                href={listing.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-(--brand-primary) px-7 py-3 text-[15px] font-semibold text-(--text-inverse) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-(--brand-primary-hover)"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
                Contact Landlord
              </a>
            : <button
                type="button"
                disabled
                className="flex w-full items-center justify-center gap-2 rounded-full bg-(--bg-sunken) px-7 py-3 text-[15px] font-semibold text-(--text-tertiary)"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
                Contact unavailable
              </button>
            }

            <button
              type="button"
              onClick={() => {
                const query = new URLSearchParams({
                  listingId: listing.id,
                  title: listing.title,
                }).toString();
                router.push(`/Ai/Chat?${query}`);
              }}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full bg-(--brand-accent) px-5 py-2.5 text-sm font-semibold text-(--text-inverse) shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-(--brand-accent-hover) cursor-pointer"
            >
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              Ask AI Advisor About This
            </button>
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