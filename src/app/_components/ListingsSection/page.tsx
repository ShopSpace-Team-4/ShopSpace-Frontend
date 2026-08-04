import PropertyCard, { PropertyCardProps } from "../../../shared/Card/card";
import ViewAllButton from "../../../shared/Button/button";

export interface ListingsSectionProps {
  eyebrow?: string;
  heading: string;
  viewAllHref?: string;
  onViewAllClick?: () => void;
  listings: PropertyCardProps[];
  className?: string;
}

export default function ListingsSection({
  eyebrow = "Featured Listings",
  heading,
  viewAllHref,
  onViewAllClick,
  listings,
  className = "",
}: ListingsSectionProps) {
  return (
    <section className={`px-6 py-10 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            {heading}
          </h2>
        </div>

        <ViewAllButton href={viewAllHref} onClick={onViewAllClick} />
      </div>

      {/* Cards grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing, i) => (
          <PropertyCard key={i} {...listing} className="w-full max-w-none" />
        ))}
      </div>
    </section>
  );
}