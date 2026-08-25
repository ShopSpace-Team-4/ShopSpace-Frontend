import Navbar from "@/shared/Navbar/navbar";
import Hero from "./_components/Hero/page";
import HeroStats from "./_components/HeroStats/page";
import AIAdvisor from "./_components/AIAdvisor/page";
import ListingsSection from "./_components/ListingsSection/page";
import TestimonialsSection from "./_components/TestimonialsSection/page";
import Footer from "@/shared/Footer/Footer";
import { getListings } from "@/actions/listings";
import type { PropertyCardProps, PropertyStatus } from "@/shared/Card/card";
import type { Item } from "@/types/listing";

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

function toCardProps(item: Item): PropertyCardProps {
  return {
    imageUrl: item.thumbnailUrl || "/images/mall-escalator.jpg",
    status: statusMap[item.status] ?? "available",
    featured: true,
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
    propertyType: item.category,
    agent: {
      name: "Listing Owner",
      avatarUrl: "/images/agent-1.jpg",
      verified: false,
    },
  };
}

export default async function Home() {
  let featuredListings: PropertyCardProps[] = [];
  let activeListingsCount: number | undefined;

  try {
    const response = await getListings({
      status: "AVAILABLE",
      limit: 3,
      sort: "createdAt:desc",
    });
    featuredListings = response.data.items.map(toCardProps);
    activeListingsCount = response.data.meta.total;
  } catch {
    // Landing page still renders fine with an empty featured section
    // if the API is briefly unavailable.
    featuredListings = [];
  }

  return (
    <>
      <Navbar />
      <Hero />
      <HeroStats activeListingsCount={activeListingsCount} />
      <AIAdvisor />
      <ListingsSection
        eyebrow="Featured Listings"
        heading="Premium Spaces, Ready to Rent"
        viewAllHref="/dashboard/marketplace"
        listings={featuredListings}
      />
      <TestimonialsSection
        eyebrow="Social Proof"
        heading="Trusted by Entrepreneurs & Property Owners"
        stats={[
          { value: "4.9", label: "App Store Rating" },
          { value: "99%", label: "Satisfaction Score" },
        ]}
        testimonials={[
          {
            id: 1,
            rating: 5,
            quote:
              "ShopSpace's AI advisor saved me months of research. It analyzed foot traffic patterns and suggested a location I wouldn't have considered — we doubled our expected first-month revenue.",
            authorName: "Rania Khalil",
            authorRole: "Founder, Bloom Café",
            authorAvatarUrl: "/images/rania.jpg",
          },
          {
            id: 2,
            rating: 5,
            quote:
              "As a landlord managing 14 properties, ShopSpace has become my primary tenant acquisition channel. Verified profiles and digital contracts cut my vacancy time in half.",
            authorName: "Ahmed Al-Sayed",
            authorRole: "Commercial Property Investor",
            authorAvatarUrl: "/images/ahmed.jpg",
          },
          {
            id: 3,
            rating: 5,
            quote:
              "The market analytics feature is incredible. I spotted emerging neighborhoods before anyone else — that competitive edge is priceless when starting a new business.",
            authorName: "Layla Al-Mansouri",
            authorRole: "Retail Entrepreneur",
            authorAvatarUrl: "/images/layla.jpg",
          },
        ]}
      />
      <Footer />
    </>
  );
}