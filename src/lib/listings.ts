import { PropertyCardProps } from "@/shared/Card/card";

export interface AgentStats {
  responseRate: string; // e.g. "98%"
  avgResponse: string; // e.g. "< 2 hrs"
  listedSince: string; // e.g. "2022"
  activeUnits: number;
}

export type ListingBase = Omit<PropertyCardProps, "onClick" | "className">;

export interface Listing extends ListingBase {
  id: string;
  images: string[]; // gallery, first item is the hero image (matches imageUrl)
  description: string;
  deposit: string; // e.g. "3 months"
  agentStats: AgentStats;
}

export const listings: Listing[] = [
  {
    id: "prime-corner-unit-al-olaya",
    imageUrl: "/images/listing-1.jpg",
    images: [
      "/images/listing-1.jpg",
      "/images/listing-1-2.jpg",
      "/images/listing-1-3.jpg",
      "/images/listing-1-4.jpg",
    ],
    status: "available",
    featured: true,
    price: 85000,
    currency: "SAR",
    pricePeriod: "yr",
    title: "Prime Corner Unit",
    neighborhood: "King Fahd Road, Al Olaya",
    city: "Riyadh",
    areaSqm: 120,
    floors: 1,
    rating: 4.8,
    reviewsCount: 24,
    amenities: ["Parking", "Security", "AC", "Storage", "Loading Dock"],
    agent: { name: "Abdullah Al-Rashid", avatarUrl: "/images/agent-1.jpg", verified: true },
    propertyType: "Retail",
    deposit: "3 months",
    description:
      "This premium corner unit on King Fahd Road offers exceptional visibility with floor-to-ceiling windows spanning two street frontages. The space features polished concrete floors, exposed ductwork with industrial-chic aesthetics, and a flexible open floor plan suitable for retail, showroom, or service businesses. Located in the heart of Al Olaya's commercial district, this unit benefits from 15,000+ daily foot traffic and proximity to major hotels and corporate offices.",
    agentStats: {
      responseRate: "98%",
      avgResponse: "< 2 hrs",
      listedSince: "2022",
      activeUnits: 6,
    },
  },
  {
    id: "cafe-restaurant-unit-tahlia",
    imageUrl: "/images/listing-2.jpg",
    images: ["/images/listing-2.jpg", "/images/listing-2-2.jpg", "/images/listing-2-3.jpg"],
    status: "pending",
    price: 120000,
    currency: "SAR",
    pricePeriod: "yr",
    title: "Café & Restaurant Unit",
    neighborhood: "Tahlia Street, Al Sulaimaniyah",
    city: "Riyadh",
    areaSqm: 200,
    floors: 2,
    rating: 4.7,
    reviewsCount: 18,
    amenities: ["Kitchen Exhaust", "Grease Trap", "Storage"],
    agent: { name: "Mohammed Al-Dosari", avatarUrl: "/images/agent-2.jpg", verified: false },
    propertyType: "F&B",
    deposit: "6 months",
    description:
      "A ready-to-fit-out café and restaurant space on the vibrant Tahlia Street strip. Comes with existing kitchen exhaust ducting and a grease trap already installed, cutting down on setup time and cost. The two-floor layout allows for a ground-floor dining area with additional seating or private dining upstairs.",
    agentStats: {
      responseRate: "91%",
      avgResponse: "< 6 hrs",
      listedSince: "2023",
      activeUnits: 3,
    },
  },
  {
    id: "showroom-space-al-malqa",
    imageUrl: "/images/listing-3.jpg",
    images: ["/images/listing-3.jpg", "/images/listing-3-2.jpg"],
    status: "available",
    price: 95000,
    currency: "SAR",
    pricePeriod: "yr",
    title: "Showroom Space",
    neighborhood: "Al Malqa District",
    city: "Riyadh",
    areaSqm: 150,
    floors: 1,
    rating: 4.6,
    reviewsCount: 12,
    amenities: ["Parking", "Security", "AC", "Storage"],
    agent: { name: "Abdullah Al-Rashid", avatarUrl: "/images/agent-1.jpg", verified: true },
    propertyType: "Retail",
    deposit: "3 months",
    description:
      "Bright, open-plan showroom in the fast-growing Al Malqa District. Large frontage glazing gives excellent street visibility, and the space is fitted with track lighting suitable for retail display. Ample nearby parking and easy access from the ring road make it a strong pick for a flagship storefront.",
    agentStats: {
      responseRate: "95%",
      avgResponse: "< 3 hrs",
      listedSince: "2021",
      activeUnits: 6,
    },
  },
  {
    id: "compact-office-suite-olaya",
    imageUrl: "/images/listing-4.jpg",
    images: ["/images/listing-4.jpg", "/images/listing-4-2.jpg", "/images/listing-4-3.jpg"],
    status: "available",
    featured: true,
    price: 60000,
    currency: "SAR",
    pricePeriod: "yr",
    title: "Compact Office Suite",
    neighborhood: "Al Olaya District",
    city: "Riyadh",
    areaSqm: 80,
    floors: 1,
    rating: 4.9,
    reviewsCount: 31,
    amenities: ["Security", "AC", "Wi-Fi", "Loading Dock"],
    agent: { name: "Mohammed Al-Dosari", avatarUrl: "/images/agent-2.jpg", verified: true },
    propertyType: "Office",
    deposit: "2 months",
    description:
      "A move-in-ready office suite ideal for a small team or professional practice. High-speed fiber internet is already wired in, and the building offers 24/7 security and dedicated loading access for deliveries or equipment. Central Al Olaya location puts you minutes from most major corporate clients.",
    agentStats: {
      responseRate: "99%",
      avgResponse: "< 1 hr",
      listedSince: "2020",
      activeUnits: 6,
    },
  },
  {
    id: "warehouse-unit-industrial-city",
    imageUrl: "/images/listing-5.jpg",
    images: ["/images/listing-5.jpg", "/images/listing-5-2.jpg"],
    status: "reserved",
    price: 150000,
    currency: "SAR",
    pricePeriod: "yr",
    title: "Warehouse Unit",
    neighborhood: "2nd Industrial City",
    city: "Riyadh",
    areaSqm: 320,
    floors: 1,
    rating: 4.5,
    reviewsCount: 9,
    amenities: ["Loading Dock", "Storage", "Security"],
    agent: { name: "Abdullah Al-Rashid", avatarUrl: "/images/agent-1.jpg", verified: true },
    propertyType: "Warehouse",
    deposit: "6 months",
    description:
      "Large-span warehouse unit with a dedicated loading dock and 24-hour on-site security patrol. High ceiling clearance suits palletized racking or light manufacturing. Positioned within the 2nd Industrial City for easy truck access to the ring road and major logistics routes.",
    agentStats: {
      responseRate: "88%",
      avgResponse: "< 8 hrs",
      listedSince: "2019",
      activeUnits: 6,
    },
  },
  {
    id: "boutique-retail-front-tahlia",
    imageUrl: "/images/listing-6.jpg",
    images: ["/images/listing-6.jpg", "/images/listing-6-2.jpg", "/images/listing-6-3.jpg"],
    status: "available",
    price: 110000,
    currency: "SAR",
    pricePeriod: "yr",
    title: "Boutique Retail Front",
    neighborhood: "Tahlia Street",
    city: "Riyadh",
    areaSqm: 140,
    floors: 1,
    rating: 4.8,
    reviewsCount: 20,
    amenities: ["Parking", "AC", "Wi-Fi"],
    agent: { name: "Mohammed Al-Dosari", avatarUrl: "/images/agent-2.jpg", verified: false },
    propertyType: "Retail",
    deposit: "3 months",
    description:
      "Stylish boutique storefront on one of Riyadh's most walkable retail streets. Recently renovated with fresh flooring and a modern shopfront facade, this unit is well suited for fashion, beauty, or lifestyle concepts looking for strong walk-in traffic.",
    agentStats: {
      responseRate: "93%",
      avgResponse: "< 4 hrs",
      listedSince: "2023",
      activeUnits: 3,
    },
  },
];

export function getListingById(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id);
}