import ViewAllButton from "@/shared/Button/button";
import PropertyCard, { PropertyCardProps } from "@/shared/Card/card";

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
    // 1. زودنا المسافة الرأسية لـ py-16 أو py-24 عشان السكشن يتنفس
    <section className={`py-16 sm:py-24 ${className}`}>
      {/* 2. حطينا كل حاجة جوه Container بيوسطن المحتوى وميخليهوش يفرش على الشاشات الكبيرة */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3. خلينا الـ Header متجاوب (عمودي في الموبايل، وأفقي في الشاشات الأكبر) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {heading}
            </h2>
          </div>

          <ViewAllButton href={viewAllHref} onClick={onViewAllClick} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing, i) => (
            <PropertyCard key={i} {...listing} className="w-full max-w-none" />
          ))}
        </div>
      </div>
    </section>
  );
}
