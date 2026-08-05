import Hero from "./_components/Hero/page";
import ListingsSection from "./_components/ListingsSection/page";
import TestimonialsSection from "./_components/TestimonialsSection/page";

import HeroStats from "@/Compontents/HeroStats/HeroStats";
import AIAdvisor from "@/Compontents/AIAdvisor/AIAdvisor";

export default function Home() {
  return (
   <>
      <HeroStats />
      <AIAdvisor />
    <>
      <Hero />
      <ListingsSection
        eyebrow="Featured Listings"
        heading="Premium Spaces, Ready to Rent"
        viewAllHref="/listings"
        listings={[
          {
            imageUrl: "/images/mall-escalator.jpg",
            status: "available",
            featured: true,
            price: 85000,
            currency: "LE",
            pricePeriod: "yr",
            title: "Prime Corner Unit – Al Olaya",
            neighborhood: "Miami",
            city: "Alexandria",
            areaSqm: 120,
            floors: 1,
            rating: 4.8,
            reviewsCount: 24,
            amenities: ["Parking", "Security", "AC", "Elevator", "Storage"],
            propertyType: "Retail",
            agent: {
              name: "Abdullah Al-Rashid",
              avatarUrl: "/images/agent-1.jpg",
              verified: true,
            },
          },
        ]}
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
            rating: 5,
            quote:
              "ShopSpace's AI advisor saved me months of research. It analyzed foot traffic patterns and suggested a location I wouldn't have considered — we doubled our expected first-month revenue.",
            authorName: "Rania Khalil",
            authorRole: "Founder, Bloom Café",
            authorAvatarUrl: "/images/rania.jpg",
          },
          {
            rating: 5,
            quote:
              "As a landlord managing 14 properties, ShopSpace has become my primary tenant acquisition channel. Verified profiles and digital contracts cut my vacancy time in half.",
            authorName: "Ahmed Al-Sayed",
            authorRole: "Commercial Property Investor",
            authorAvatarUrl: "/images/ahmed.jpg",
          },
          {
            rating: 5,
            quote:
              "The market analytics feature is incredible. I spotted emerging neighborhoods before anyone else — that competitive edge is priceless when starting a new business.",
            authorName: "Layla Al-Mansouri",
            authorRole: "Retail Entrepreneur",
            authorAvatarUrl: "/images/layla.jpg",
          },
        ]}
      />
    </>
  );
}