// lib/mappers/listing.ts
import { PropertyCardProps, PropertyStatus } from "@/shared/Card/card";

// شكل البيانات الراجعة من GET /listings (item واحد جوه items[])
export interface BackendListing {
  id: string;
  landlordId: string;
  title: string;
  category: string;
  areaSqm: number;
  city: string;
  district: string;
  address: string;
  description: string;
  amenities: string[];
  numberOfFloors?: number;
  annualRent: number;
  annualRentWithVat: number;
  currency: string;
  status: "PENDING" | "AVAILABLE" | "RENTED" | "EXPIRED";
  media: { _id: string; mediaType: string; url: string; sortOrder: number }[];
  thumbnailUrl: string | null;
  isSaved?: boolean;
  createdAt: string;
  updatedAt: string;
}

// تحويل حالة الباك اند لحالة الكارد (الكارد مش عنده PENDING/RENTED/EXPIRED أصلاً)
const statusMap: Record<BackendListing["status"], PropertyStatus> = {
  PENDING: "pending",
  AVAILABLE: "available",
  RENTED: "reserved", // مفيش "rented" في الكارد، أقرب حاجة "reserved"
  EXPIRED: "sold",     // مفيش "expired"، أقرب حاجة بصريًا "sold"
};

// تحويل "PARKING" -> "Parking" عشان تتعرض حلوة وتتطابق مع amenityIcons (parking/security/ac)
function formatAmenity(raw: string): string {
  return raw
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function mapListingToCardProps(item: BackendListing): PropertyCardProps {
  return {
    imageUrl: item.thumbnailUrl || "/images/placeholder-listing.jpg",
    imageAlt: item.title,
    status: statusMap[item.status],
    featured: false, // الباك اند مفيهوش مفهوم "featured" دلوقتي
    price: item.annualRent,
    currency: item.currency, // "EGP"
    pricePeriod: "yr",
    title: item.title,
    neighborhood: item.district,
    city: item.city,
    areaSqm: item.areaSqm,
    floors: item.numberOfFloors || 1,
    rating: 0,          // مش موجود في الباك اند لسه
    reviewsCount: 0,     // مش موجود في الباك اند لسه
    amenities: item.amenities.map(formatAmenity),
    agent: {
      name: "Landlord",           // مفيش اسم حقيقي راجع من endpoint البحث
      avatarUrl: "/images/agent-placeholder.jpg",
      verified: false,
    },
    propertyType: item.category,
  };
}