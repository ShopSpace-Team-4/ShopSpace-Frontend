export type ListingStatus = "AVAILABLE" | "PENDING" | "SOLD";

export interface Item {
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
  numberOfFloors: number;
  floorNumber: number;
  availableFrom: string;
  minimumLeaseTerm: string;
  annualRent: number;
  annualRentWithVat: number;
  currency: string;
  securityDepositMonths: number;
  status: ListingStatus;
  media: Array<{
    _id: string;
    mediaType: string;
    url: string;
    sortOrder: number;
  }>;
  thumbnailUrl?: string;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ListingRow = Item;

export interface ListingsResponse {
  data: {
    items: Item[];
  };
}
